package com.api.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:config.properties")
public class AuthTokenServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthTokenServiceApplication.class, args);
	}

}
