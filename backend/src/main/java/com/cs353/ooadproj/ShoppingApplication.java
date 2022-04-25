package com.cs353.ooadproj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
public class ShoppingApplication  {

    private final ProductsRepository productsRepository;
    ShoppingApplication(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public static void main(String... args) {
        SpringApplication.run(ShoppingApplication.class, args);
    }
}