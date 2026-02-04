package com.ssit.atlas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SsitAtlasApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsitAtlasApplication.class, args);
	}

}
