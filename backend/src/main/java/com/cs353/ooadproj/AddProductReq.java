package com.cs353.ooadproj;

import lombok.Data;

@Data
public class AddProductReq {
    private String reviewBody;
    private String username;
    private String userId;
    private int rating;
}
