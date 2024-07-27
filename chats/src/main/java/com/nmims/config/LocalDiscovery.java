package com.nmims.config;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Profile;

@Profile("prod")
@EnableDiscoveryClient
public class LocalDiscovery  {
	 
}
