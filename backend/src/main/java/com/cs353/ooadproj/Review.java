package com.cs353.ooadproj;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

@Data
public class Review {
    private String username;
    private String userId;
    private String reviewBody;
    private int rating;

}
