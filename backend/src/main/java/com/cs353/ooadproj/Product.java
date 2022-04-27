package com.cs353.ooadproj;

import java.util.List;
//import java.util.Objects;

import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Product {

    @Id
    private String id;
    private String title;
    private Double price;
    private String description;
    private List<String> images;
    private List<String> tags;
    private List<Review> reviews;

}
