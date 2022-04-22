package com.cs353.ooadproj;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ShoppingCartController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final ShoppingCart shoppingCart;
    public ShoppingCartController(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    @CrossOrigin()
    @GetMapping("/cart/")
    public List<LineItem> all() {
        LOG.info("Getting items in cart");
        return shoppingCart.getLineItems();
    }

    @CrossOrigin()
    @DeleteMapping("/cart/{id}")
    public void deleteLineItem(@PathVariable Long id) {
        LOG.info("Deleting item with ID : {}",id);
        LineItem lineItem = shoppingCart.getLineItemById(id);
        shoppingCart.removeItem(lineItem);
    }

}
