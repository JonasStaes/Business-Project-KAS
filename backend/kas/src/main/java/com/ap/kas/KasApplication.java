package com.ap.kas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.ap.kas")
public class KasApplication {

	public static void main(String[] args) {
		SpringApplication.run(KasApplication.class, args);
	}

}
