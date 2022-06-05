package com.ap.kas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * This class runs the main application
 */
@RestController
@SpringBootApplication
public class KasApplication {

	public static void main(String[] args) {
		SpringApplication.run(KasApplication.class, args);
	}

	@GetMapping("/")
	public String sayHello() {
		return "hello world!";
	}

}
