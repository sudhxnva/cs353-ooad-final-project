package com.cs353.ooadproj;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.ArrayList;

@Data
@Document
public class ShoppingCart {
    @Id
    @GeneratedValue()
    private String id;
    private String userId;
    private List<LineItem> lineItems;
    private double totalCost;
}
