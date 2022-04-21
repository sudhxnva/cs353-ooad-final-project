package com.cs353.ooadproj;

import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;


@Entity
public class ShoppingCart {
    private @Id @GeneratedValue Long id;
    private Long userId;
    private List<LineItem> lineItems;
    private double totalCost;

    public ShoppingCart(Long userId){
        this.userId = userId;
        this.totalCost = 0.0;
    }
    public ShoppingCart(Long userId, List<LineItem> lineItems, double totalCost) {
        this.userId = userId;
        this.lineItems = lineItems;
        this.totalCost = totalCost;
    }

    public void addItem(LineItem lineItem) {
        lineItems.add(lineItem);
        totalCost+=(lineItem.getProduct().getPrice()*lineItem.getQuantity());
    }

    public void removeItem(LineItem lineItem){
        lineItems.remove(lineItem);
        totalCost-=(lineItem.getProduct().getPrice()*lineItem.getQuantity());
        //lineItems.removeIf(lineItem -> lineItem.getId()==id);

    }
}
