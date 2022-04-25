package com.cs353.ooadproj;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Document
@Data
public class User {
    @Id
    @GeneratedValue()
    private String id;
    private String username;
    private String email;
    private String passhash;
}
