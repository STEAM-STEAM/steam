package com.steam.steam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class SteamApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(SteamApplication.class, args);
		DataLoader dataLoader = context.getBean(DataLoader.class);
		dataLoader.run();
	}
}
