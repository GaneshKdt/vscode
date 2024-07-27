package com.nmims.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.nmims.dao.QuickBloxDao;

@Configuration
//@EnableWebMvc //Enable SpringMVC
@ComponentScan({"com.nmims"})
@PropertySource("file:c:/NMIMS_PROPERTY_FILE/ngasce.properties")
@PropertySource(value="file:c:/NMIMS_PROPERTY_FILE/application.properties", ignoreResourceNotFound = true)
@PropertySource(value="file:${catalina.base}/conf/application.properties", ignoreResourceNotFound = true)
@EnableAspectJAutoProxy
public class WebConfig extends WebMvcConfigurerAdapter {
	
	@Bean(name = "quickBloxDao")
	public QuickBloxDao quickBloxDao(BasicDataSource dataSource) {
		QuickBloxDao bean = new QuickBloxDao();
		bean.setDataSource(dataSource);
		return bean;
	}
}