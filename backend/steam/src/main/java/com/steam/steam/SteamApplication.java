package com.steam.steam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SteamApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(SteamApplication.class);
		ApplicationContext context = app.run(SteamApplication.class, args);
		DataLoader dataLoader = context.getBean(DataLoader.class);
		dataLoader.run();
	}
}