package com.cs353.ooadproj;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
@Data
public class LineItem {
//    @Id
//    @GeneratedValue()
//    private String id;
    @Id
    private ObjectId _id = new ObjectId();
    private String trueId = _id.toHexString();
    private int quantity;
    private Product product;

}
