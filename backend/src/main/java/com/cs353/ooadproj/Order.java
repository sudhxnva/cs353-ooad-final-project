package com.cs353.ooadproj;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Order {
    @Id
    private String id;
    private String userId;
    private List<LineItem> lineItems;
    private double totalCost;
    private String address;
    private String deliveryDate;//could be data datatype

}
