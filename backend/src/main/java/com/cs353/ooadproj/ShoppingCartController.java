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
    @GetMapping("/cart/")
    public List<LineItem> all(@RequestParam String userId) {
        log.info("GETTING ITEMS FROM CART");
        ShoppingCart shoppingCartOptional = shoppingCartRepo.findByUserId(userId);
        return shoppingCartOptional.getLineItems();
    }

    @CrossOrigin()
    @PostMapping("/cart/")
    public void addLineItem(@RequestBody NewLineItemReq newLineItemReq) {
        log.info("Getting line item");
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(newLineItemReq.getUserId());
        List<LineItem> lineItems = shoppingCart.getLineItems();
        lineItems.add(newLineItemReq.getLineItem());
        shoppingCart.setLineItems(lineItems);
        shoppingCartRepo.save(shoppingCart);
    }

    @CrossOrigin()
    @DeleteMapping("/cart/")
    public void deleteLineItem(@RequestParam String userId, @RequestParam String lineItemId) {
        log.info("Deleting item with ID : {1}",lineItemId);
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        List<LineItem> lineItems = shoppingCart.getLineItems();
        for (LineItem lineItem:lineItems) {
            if (lineItem.getId().equals(lineItemId)) {
                lineItems.remove(lineItem);
                log.info("DELETED ITEM FROM ITEM LIst");
            }
        }

    }

}
