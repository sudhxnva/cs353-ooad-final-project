package com.cs353.ooadproj;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Review {

    private @Id @GeneratedValue Long id;
    private Long userId;
    private String reviewBody;
    private int rating;

    public Review(Long userId, String reviewBody, int rating) {
        this.userId = userId;
        this.reviewBody = reviewBody;
        this.rating = rating;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getReviewBody() {
        return reviewBody;
    }

    public void setReviewBody(String reviewBody) {
        this.reviewBody = reviewBody;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
