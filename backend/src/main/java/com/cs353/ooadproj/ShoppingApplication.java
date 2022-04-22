package com.cs353.ooadproj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class ShoppingApplication  {

    @Autowired
    ProductRepository productRepository;

    public static void main(String... args) {
        SpringApplication.run(ShoppingApplication.class, args);
    }
}