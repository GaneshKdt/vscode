package com.nmims;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication(exclude = WebServicesAutoConfiguration.class)
@EnableEurekaClient
@EnableAutoConfiguration(exclude = {WebServicesAutoConfiguration.class})
@PropertySource("file:C:\\NMIMS_PROPERTY_FILE\\ngasce.properties")
public class ChatsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatsApplication.class, args);
	}

}
