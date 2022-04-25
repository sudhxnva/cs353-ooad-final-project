package com.cs353.ooadproj;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
@Data
public class LineItem {
    @Id
    private String id;
    private int quantity;
    private Product product;

}
