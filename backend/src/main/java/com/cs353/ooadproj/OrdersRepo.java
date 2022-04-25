package com.cs353.ooadproj;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrdersRepo extends MongoRepository<Order, String> {
    List<Order> findByUserId (String userId);

}
