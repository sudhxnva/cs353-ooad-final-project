package com.cs353.ooadproj;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


 interface ProductsRepository extends MongoRepository<Product, String> {

}
