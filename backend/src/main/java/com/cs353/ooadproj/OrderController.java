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

import javax.sound.sampled.Line;

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
    @PostMapping("/orders/{cartId}")
    public Order addOrder(@PathVariable String cartId,@RequestBody NewOrderReq newOrderReq) {
        log.info("Saving order for cart {}",cartId);
        ShoppingCart shoppingCart = shoppingCartRepo.findById(cartId).get();
        Order order = new Order();
        order.setLineItems(shoppingCart.getLineItems());
        order.setUserId(shoppingCart.getUserId());
        order.setAddress(newOrderReq.getAddress());
        order.setDeliveryDate(newOrderReq.getDeliveryDate());
        order.setTotalCost(shoppingCart.getTotalCost()*1.18);
        shoppingCart.setLineItems(new ArrayList<LineItem>());
        shoppingCart.setTotalCost(0.0);
        shoppingCartRepo.save(shoppingCart);
        return ordersRepo.save(order);

    }

    @CrossOrigin()
    @DeleteMapping("/orders/{orderId}")
    public List<Order> deleteOrder(@PathVariable String orderId) {
        log.info("Deleting order with id {}",orderId);
        Order order = ordersRepo.findById(orderId).get();
        ordersRepo.deleteById(orderId);
        return ordersRepo.findByUserId(order.getUserId());
    }

}
