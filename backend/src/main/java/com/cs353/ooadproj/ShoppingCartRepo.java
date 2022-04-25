package com.cs353.ooadproj;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


interface ShoppingCartRepo extends MongoRepository<ShoppingCart, String> {
    ShoppingCart findByUserId(String userId);

}
