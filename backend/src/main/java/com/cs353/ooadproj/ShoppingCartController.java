package com.cs353.ooadproj;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@RestController
public class ShoppingCartController {
    private final ShoppingCartRepo shoppingCartRepo;
    private final UsersRepo usersRepo;
    private final ProductsRepository productsRepository;
    ShoppingCartController(ShoppingCartRepo shoppingCartRepo, UsersRepo usersRepo, ProductsRepository productsRepository) {
        this.shoppingCartRepo = shoppingCartRepo;
        this.usersRepo = usersRepo;
        this.productsRepository = productsRepository;
    }

    @CrossOrigin()
    @GetMapping("/cart/{id}")
    public List<LineItem> all(@PathVariable String id) {
        log.info("Getting cart #{}", id);
        ShoppingCart shoppingCartOptional = shoppingCartRepo.findByUserId(id);
        if(shoppingCartOptional!=null) {
            return shoppingCartOptional.getLineItems();
        }
        else {
            ShoppingCart shoppingCart = new ShoppingCart();
            List<LineItem> lineItems = new ArrayList<>();
            shoppingCart.setUserId(id);
            shoppingCart.setLineItems(lineItems);
            shoppingCartRepo.save(shoppingCart);
            return lineItems;
        }
    }

    @CrossOrigin()
    @PostMapping("/cart")
    public void addLineItem(@RequestBody NewLineItemReq newLineItemReq) {
        log.info("Adding line item");
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(newLineItemReq.getUserId());
        if(shoppingCart!=null) {
            List<LineItem> lineItems = shoppingCart.getLineItems();
            lineItems.add(newLineItemReq.getLineItem());
            shoppingCart.setLineItems(lineItems);
            shoppingCartRepo.save(shoppingCart);
        }
        else {
            ShoppingCart newshoppingCart = new ShoppingCart();
            newshoppingCart.setUserId(newLineItemReq.getUserId());
            List<LineItem> lineItems = new ArrayList<>();
            lineItems.add(newLineItemReq.getLineItem());
            newshoppingCart.setLineItems(lineItems);
            shoppingCartRepo.save(newshoppingCart);
        }
    }

    @CrossOrigin()
    @DeleteMapping("/cart/{id}")
    public void deleteLineItem(@RequestParam String userId, @PathVariable String id) {
        log.info("Deleting line item #{}",id);
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        List<LineItem> lineItems = shoppingCart.getLineItems();
        for (LineItem lineItem:lineItems) {
            if (lineItem.getId().equals(id)) {
                lineItems.remove(lineItem);
                log.info("Deleted line item #{}", id);
            }
        }

    }

}
