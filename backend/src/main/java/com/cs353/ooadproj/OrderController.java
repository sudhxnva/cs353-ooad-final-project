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
public class OrderController {
    private final ShoppingCartRepo shoppingCartRepo;
    private final UsersRepo usersRepo;
    private final ProductsRepository productsRepository;
    private final OrdersRepo ordersRepo;
    OrderController(ShoppingCartRepo shoppingCartRepo, UsersRepo usersRepo, ProductsRepository productsRepository, OrdersRepo ordersRepo) {
        this.shoppingCartRepo = shoppingCartRepo;
        this.usersRepo = usersRepo;
        this.productsRepository = productsRepository;
        this.ordersRepo = ordersRepo;
    }

    @CrossOrigin()
    @GetMapping("/orders/{id}")
    List<Order> all(@PathVariable String id) {
        log.info("Getting order for user {}",id);
        List<Order> orders = new ArrayList<>();
        if(ordersRepo.findByUserId(id)!=null) {
            orders=ordersRepo.findByUserId(id);
            return orders;
        }
        else {
            return orders;
        }

    }

    @CrossOrigin()
    @PostMapping("/orders/{id}")
    public Order addOrder(@PathVariable String cartId,@RequestBody NewOrderReq newOrderReq) {
        log.info("Saving order for cart {}",cartId);
        ShoppingCart shoppingCart = shoppingCartRepo.findById(cartId).get();
        Order order = new Order();
        order.setLineItems(shoppingCart.getLineItems());
        order.setUserId(shoppingCart.getUserId());
        order.setAddress(newOrderReq.getAddress());
        order.setDeliveryDate(newOrderReq.getDeliveryDate());
        order.setTotalCost(shoppingCart.getTotalCost());
        return ordersRepo.save(order);

    }

}