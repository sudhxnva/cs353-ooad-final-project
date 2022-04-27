package com.cs353.ooadproj;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
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
    public ShoppingCart all(@PathVariable String id) {
        log.info("Getting cart #{}", id);
        ShoppingCart shoppingCartOptional = shoppingCartRepo.findByUserId(id);
        if(shoppingCartOptional!=null) {
            return shoppingCartOptional;
        }
        else {
            ShoppingCart shoppingCart = new ShoppingCart();
            List<LineItem> lineItems = new ArrayList<>();
            shoppingCart.setUserId(id);
            shoppingCart.setLineItems(lineItems);
            shoppingCart.setTotalCost(0.0);
            shoppingCartRepo.save(shoppingCart);
            return shoppingCart;
        }
    }

    @CrossOrigin()
    @PostMapping("/cart")
    public ShoppingCart addLineItem(@RequestBody NewLineItemReq newLineItemReq) {
        log.info("Adding line item");
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(newLineItemReq.getUserId());
        log.info(String.valueOf(shoppingCart));
        if(shoppingCart!=null) {
            log.info("Getting shopping cart for user #{}",newLineItemReq.getUserId());
            List<LineItem> lineItems = shoppingCart.getLineItems();
            lineItems.add(newLineItemReq.getLineItem());
            double newCost = newLineItemReq.getLineItem().getQuantity()*newLineItemReq.getLineItem().getProduct().getPrice();
            double totalCost = shoppingCart.getTotalCost();
            totalCost+=newCost;
            shoppingCart.setTotalCost(totalCost);
            shoppingCart.setLineItems(lineItems);
            shoppingCartRepo.save(shoppingCart);
            return shoppingCart;
        }
        else {
            log.info("Shopping cart doesn't exist for user #{}, creating a new one...",newLineItemReq.getUserId());
            ShoppingCart newShoppingCart = new ShoppingCart();
            newShoppingCart.setUserId(newLineItemReq.getUserId());
            List<LineItem> lineItems = new ArrayList<>();
            lineItems.add(newLineItemReq.getLineItem());
            double totalCost = newLineItemReq.getLineItem().getQuantity()*newLineItemReq.getLineItem().getProduct().getPrice();
            newShoppingCart.setTotalCost(totalCost);
            newShoppingCart.setLineItems(lineItems);
            shoppingCartRepo.save(newShoppingCart);
            return newShoppingCart;
        }
    }

    @CrossOrigin()
    @DeleteMapping("/cart/{id}")
    public ShoppingCart deleteLineItem(@RequestParam String userId, @PathVariable String id) {
        log.info("Deleting line item #{}",id);
        ShoppingCart shoppingCart = shoppingCartRepo.findByUserId(userId);
        List<LineItem> lineItems = shoppingCart.getLineItems();
        List<LineItem> temp = new ArrayList<>();
        double totalCost = shoppingCart.getTotalCost();
        for (LineItem lineItem:lineItems) {
            if (lineItem.getTrueId().equals(id)) {
                totalCost-= lineItem.getQuantity()*lineItem.getProduct().getPrice();
            }
        }
        shoppingCart.setTotalCost(totalCost);
        lineItems.removeIf(lineItem -> lineItem.getTrueId().equals(id));
        log.info("Removed item #{} from cart",id);
        shoppingCart.setLineItems(lineItems);
        shoppingCartRepo.save(shoppingCart);
        return shoppingCart;
    }

}
