package com.cs353.ooadproj;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Review {

    private @Id @GeneratedValue Long id;
    private Long productId;
    private Long userId;
    private String reviewBody;
    private int rating;

}
