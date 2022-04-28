package com.cs353.ooadproj;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@Slf4j
public class ProductController {
    private final ProductsRepository productsRepository;
    public ProductController(ProductsRepository productsRepository){
        this.productsRepository = productsRepository;
    }

    @CrossOrigin()
    @GetMapping("/products")//Retrieve Products
    public List<Product> all() {
        log.info("Getting all products");
        return productsRepository.findAll();
    }

    @CrossOrigin()
    @PostMapping("/products")//Add Products
    public Product newProduct(@RequestBody Product newProduct) {
        log.info("Adding new product");
        return productsRepository.save(newProduct);
    }

    @CrossOrigin()
    @GetMapping("/products/{id}")//View single product
    public Product oneProduct(@PathVariable String id) {
        log.info("Getting product with ID : {}.",id);
        return productsRepository.findById(id).get();
    }

    //TODO
    @CrossOrigin()
    @PutMapping("/products/{id}")//Edit product merchant
    Product editProduct(@RequestBody Product newProduct, @PathVariable String id) {
        log.info("Edited product with ID : {}.",id);
        Product product = productsRepository.findById(id).get();
        product.setTitle(newProduct.getTitle());
        product.setImages(newProduct.getImages());
        product.setDescription(newProduct.getDescription());
        product.setTags(newProduct.getTags());
        product.setPrice(newProduct.getPrice());
        return productsRepository.save(product);
    }

    @CrossOrigin()
    @DeleteMapping("/products/{id}")//Delete one product
    void deleteProduct(@PathVariable String id) {
        log.info("Deleting product with ID : {}.",id);
        productsRepository.deleteById(id);
    }

    //TODO
    @CrossOrigin()
    @PostMapping("/products/{id}/review")
    Product addProductReview(@PathVariable String id, @RequestBody AddProductReq addProductReq) {
        log.info("Adding review to product with ID : {}.",id);
        Product product = productsRepository.findById(id).get();//Very hacky workaround pls check
        List<Review> reviews = product.getReviews();
        Review review = new Review();
        review.setReviewBody(addProductReq.getReviewBody());
        review.setUsername(addProductReq.getUsername());
        review.setUserId(addProductReq.getUserId());
        review.setRating(addProductReq.getRating());
        reviews.add(review);
        product.setReviews(reviews);
        return productsRepository.save(product);
    }
}
