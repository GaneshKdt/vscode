package com.nmims.helper;

import org.apache.commons.codec.digest.HmacUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class QuickBloxManager {
	
	@Value("${QuickBloxBaseUrl}")
	private String quickBloxBaseUrl;
	
	private static final Logger logger = LoggerFactory.getLogger(QuickBloxManager.class);
	
	public HttpHeaders getHeaders()
	{
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		headers.add("Accept", "application/json");
		return headers;
	}
	
	public String generateSignature(String randomNumber,String timeInSeconds,String admin,String adminName)
	{
		String algorithm="HmacSHA1";
		String data="";
		if(admin.equalsIgnoreCase("Y"))
		{
			data="application_id=96578&auth_key=OnM7DOGzk8FSeHs&nonce="+randomNumber+"&timestamp="+timeInSeconds+"&user[login]="+adminName+"&user[password]=quickblox";
		}
		else
		{
			data="application_id=96578&auth_key=OnM7DOGzk8FSeHs&nonce="+randomNumber+"&timestamp="+timeInSeconds;
		}
		String key="rxqqVcmABVkOuxU";
		String hmac = new HmacUtils(algorithm, key).hmacHex(data);
		return hmac;
	}
	
	public String createSession(String admin,String adminName) throws Exception
	{
		try
		{
			String createSessionUrl= quickBloxBaseUrl+"session.json";
			HttpHeaders headers = getHeaders();
//			Date d=new Date();
//			TimeStamp t=new TimeStamp(d);
//			long unixTime=t.getSeconds();
			long unixTime= System.currentTimeMillis()/1000L;
			int randomNum = ThreadLocalRandom.current().nextInt(1000,100000);
			JsonObject requestBody = new JsonObject();
			requestBody.addProperty("application_id", "96578");
			requestBody.addProperty("auth_key", "OnM7DOGzk8FSeHs");
			requestBody.addProperty("timestamp", Long.toString(unixTime));
			requestBody.addProperty("nonce", Integer.toString(randomNum));
			requestBody.addProperty("signature", generateSignature(Integer.toString(randomNum),Long.toString(unixTime),admin,adminName));
			if(admin.equalsIgnoreCase("Y"))
			{
				JsonObject userBody = new JsonObject();
				userBody.addProperty("login", adminName);
				userBody.addProperty("password", "quickblox");
				requestBody.add("user", userBody);
			}
			HttpEntity<String> requestEntity = new HttpEntity<String>(requestBody.toString(),headers);
			RestTemplate restTemplate =new RestTemplate();
			long t1=System.currentTimeMillis();
			ResponseEntity<String> response=restTemplate.exchange(createSessionUrl, HttpMethod.POST, requestEntity, String.class);
			long t2=System.currentTimeMillis();
			long t3=t2-t1;
			logger.info("Response time from session creation api in milli seconds:"+t3);
			logger.info("Response body from session creation api: "+response.getBody());
			JsonObject json = new JsonParser().parse(response.getBody()).getAsJsonObject();
			if("201".equalsIgnoreCase(Integer.toString(response.getStatusCodeValue())))
			{
				String token=json.get("session").getAsJsonObject().get("token").getAsString();
				return token;
			}
			throw new Exception(response.getBody());
		}
		catch(HttpClientErrorException httpex)
		{
			String body=httpex.getResponseBodyAsString();
			String status=httpex.getStatusCode().toString();
			logger.info("HttpClientException in session creation: "+httpex);
			logger.info("body in session creation: "+body);
			logger.info("status in session creation: "+status);
			throw new Exception(body);
		}
		catch(Exception e)
		{
			logger.info("Exception in session creation: "+e);
			throw new Exception(e.getMessage());
		}
		
	}
	
	public String createUser(String token,String sapid,String fullName) throws Exception
	{
		try
		{
			String userCreationUrl = quickBloxBaseUrl+"users.json";
			HttpHeaders headers = getHeaders();
			headers.add("QB-Token",token);
			JsonObject user = new JsonObject();
			user.addProperty("login", sapid);
			user.addProperty("password", "quickblox");
			user.addProperty("full_name", fullName);
			JsonObject requestBody = new JsonObject();
			requestBody.add("user", user);
			HttpEntity<String> requestEntity = new HttpEntity<String>(requestBody.toString(),headers);
			RestTemplate restTemplate = new RestTemplate();
			long t1=System.currentTimeMillis();
			ResponseEntity<String> response=restTemplate.exchange(userCreationUrl, HttpMethod.POST, requestEntity, String.class);
			long t2=System.currentTimeMillis();
			long t3=t2-t1;
			logger.info("Response time from user creation api in milli seconds:"+t3);
			logger.info("Response body from user creation api: "+response.getBody());
			JsonObject json = new JsonParser().parse(response.getBody()).getAsJsonObject();
			if("201".equalsIgnoreCase(Integer.toString(response.getStatusCodeValue())))
			{
				String userId=json.get("user").getAsJsonObject().get("id").getAsString();
				logger.info("user id:"+userId);
				return userId;
			}
			throw new Exception(response.getBody());
		}
		catch(HttpClientErrorException httpex)
		{
			String body=httpex.getResponseBodyAsString();
			String status=httpex.getStatusCode().toString();
			logger.info("HttpClientException in user creation: "+httpex);
			logger.info("body in user creation: "+body);
			logger.info("status in user creation: "+status);
			throw new Exception(body);
		}
		catch(Exception e)
		{
			logger.info("Exception in user creation: "+e);
			throw new Exception(e.getMessage());
		}
		
	}
	
	public String createGroup(String token,String groupName,String ids) throws Exception
	{
		try
		{
			String groupCreationUrl=quickBloxBaseUrl+"chat/Dialog.json";
			HttpHeaders headers = getHeaders();
			headers.add("QB-Token", token);
			JsonObject requestBody = new JsonObject();
			requestBody.addProperty("type", "2");
			requestBody.addProperty("occupants_ids", ids);
			requestBody.addProperty("name", groupName);
			HttpEntity<String> requestEntity = new HttpEntity<String>(requestBody.toString(),headers);
			RestTemplate restTemplate = new RestTemplate();
			long t1=System.currentTimeMillis();
			ResponseEntity<String> response=restTemplate.exchange(groupCreationUrl, HttpMethod.POST, requestEntity, String.class);
			long t2=System.currentTimeMillis();
			long t3=t2-t1;
			logger.info("Response time from group creation api in milli seconds:"+t3);
			logger.info("Response body from group creation api: "+response.getBody());
			JsonObject json = new JsonParser().parse(response.getBody()).getAsJsonObject();
			if("201".equalsIgnoreCase(Integer.toString(response.getStatusCodeValue())))
			{
				String groupId=json.get("_id").getAsString();
				logger.info("group id: "+groupId);
				return groupId;
			}
			throw new Exception(response.getBody());
		}
		catch(HttpClientErrorException httpex)
		{
			String body=httpex.getResponseBodyAsString();
			String status=httpex.getStatusCode().toString();
			logger.info("HttpClientException in group creation: "+httpex);
			logger.info("body in group creation: "+body);
			logger.info("status in group creation: "+status);
			throw new Exception(body);
		}
		catch(Exception e)
		{
			logger.info("Exception in group creation: "+e);
			throw new Exception(e.getMessage());
		}
		
	}
	
	public String updateGroup(String token,String groupId,ArrayList<String> userIds) throws Exception
	{
		try
		{
			String updateGroupUrl=quickBloxBaseUrl+"chat/Dialog/"+groupId+".json";
			HttpHeaders headers=getHeaders();
			headers.add("QB-Token", token);
			JsonObject requestBody = new JsonObject();
			JsonObject push_all = new JsonObject();
			JsonArray ids = new JsonArray();
			for(int i=0;i<=userIds.size()-1;i++)
			{
				int number=Integer.parseInt(userIds.get(i));
				ids.add(number);
			}
			push_all.add("occupants_ids", ids);
			requestBody.add("push_all", push_all);
			HttpEntity<String> requestEntity = new HttpEntity<String>(requestBody.toString(),headers);
			RestTemplate restTemplate = new RestTemplate();
			long t1=System.currentTimeMillis();
			ResponseEntity<String> response=restTemplate.exchange(updateGroupUrl, HttpMethod.PUT, requestEntity, String.class);
			long t2=System.currentTimeMillis();
			long t3=t2-t1;
			logger.info("Response time from update group api in milli seconds:"+t3);
			logger.info("Response body from update group api: "+response.getBody());
			JsonObject json = new JsonParser().parse(response.getBody()).getAsJsonObject();
			if("200".equalsIgnoreCase(Integer.toString(response.getStatusCodeValue())))
			{
				String id=json.get("_id").getAsString();
				logger.info("group id: "+id);
				return id;
			}
			throw new Exception(response.getBody());
		}
		catch(HttpClientErrorException httpex)
		{
			String body=httpex.getResponseBodyAsString();
			String status=httpex.getStatusCode().toString();
			logger.info("HttpClientException in update group: "+httpex);
			logger.info("body in update group: "+body);
			logger.info("status in update group: "+status);
			throw new Exception(body);
		}
		catch(Exception e)
		{
			logger.info("Exception in update group: "+e);
			throw new Exception(e.getMessage());
		}
		
	}
	
	public String checkIfUserExist(String loginId,String token) throws Exception
	{
		try
		{
			String checkIfUserExistUrl="https://api.quickblox.com/users/by_login.json?login="+loginId;
			HttpHeaders headers=getHeaders();
			headers.add("QB-Token", token);
			HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
			RestTemplate restTemplate = new RestTemplate();
			long t1=System.currentTimeMillis();
			ResponseEntity<String> response=restTemplate.exchange(checkIfUserExistUrl, HttpMethod.GET, requestEntity, String.class);
			long t2=System.currentTimeMillis();
			long t3=t2-t1;
			logger.info("Response time from check if user exist api in milli seconds:"+t3);
			logger.info("Response body from check if user exist api: "+response.getBody());
			JsonObject json = new JsonParser().parse(response.getBody()).getAsJsonObject();
			if("200".equalsIgnoreCase(Integer.toString(response.getStatusCodeValue())))
			{
				String id=json.get("user").getAsJsonObject().get("id").getAsString();
				return id;
			}
			throw new Exception(response.getBody());
		}
		catch(HttpClientErrorException httpex)
		{
			String body=httpex.getResponseBodyAsString();
			String status=httpex.getStatusCode().toString();
			if(status.contains("404"))
			{
				logger.info("user id:"+loginId+" does not exist:"+body);
				return "No user found";
			}
			logger.info("HttpClientException in check if user exist: "+httpex);
			logger.info("body in check if user exist: "+body);
			logger.info("status in check if user exist: "+status);
			throw new Exception(body);
		}
		catch(Exception e)
		{
			logger.info("Exception in check if user exist: "+e);
			throw new Exception(e.getMessage());
		}
	}

}
