package com.cs353.ooadproj;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepo extends MongoRepository<User, String> {
    User findByUsername(String username);
}
