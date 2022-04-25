package com.cs353.ooadproj;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
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
        log.info("Getting cart #{1}", id);
        ShoppingCart shoppingCartOptional = shoppingCartRepo.findByUserId(id);
        return shoppingCartOptional.getLineItems();
    }

    @CrossOrigin()
    @PostMapping("/cart")
    public void addLineItem(@RequestBody NewLineItemReq newLineItemReq) {
        log.info("Adding line item");
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(newLineItemReq.getUserId());
        List<LineItem> lineItems = shoppingCart.getLineItems();
        lineItems.add(newLineItemReq.getLineItem());
        shoppingCart.setLineItems(lineItems);
        shoppingCartRepo.save(shoppingCart);
    }

    @CrossOrigin()
    @DeleteMapping("/cart/{id}")
    public void deleteLineItem(@RequestParam String userId, @PathVariable String id) {
        log.info("Deleting line item #{1}",id);
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        List<LineItem> lineItems = shoppingCart.getLineItems();
        for (LineItem lineItem:lineItems) {
            if (lineItem.getId().equals(id)) {
                lineItems.remove(lineItem);
                log.info("Deleted line item #{1}", id);
            }
        }

    }

}
