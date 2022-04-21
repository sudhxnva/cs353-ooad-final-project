package com.cs353.ooadproj;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cs353.ooadproj.Product;
import com.cs353.ooadproj.ProductRepository;

@RestController
public class ProductController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final ProductRepository productRepository;
    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @CrossOrigin()
    @GetMapping("/products")//Retrieve Products
    public List<Product> all() {
        LOG.info("Getting all products");
        return productRepository.findAll();
    }

    @CrossOrigin()
    @PostMapping("/products")//Add Products
    public Product newProduct(@RequestBody Product newProduct) {
        LOG.info("Adding new product");
        return productRepository.save(newProduct);
    }

    @CrossOrigin()
    @GetMapping("/product/{id}")//View single product
    public Product oneProduct(@PathVariable String id) {
        LOG.info("Getting product with ID : {}.",id);
        return productRepository.findById(id).get();
    }

    //TODO
    @CrossOrigin()
    @PostMapping("/product/{id}")//Edit product merchant
    Product editProduct(@RequestBody Product newProduct, @PathVariable String id) {
        LOG.info("Edited product with ID : {}.",id);
        Product oldProduct = productRepository.findById(id).get();//Very hacky workaround pls check
        oldProduct.setDescription(newProduct.getDescription());
        oldProduct.setPrice(newProduct.getPrice());
        oldProduct.setImages(newProduct.getImages());
        oldProduct.setTags(newProduct.getTags());
        oldProduct.setTitle(newProduct.getTitle());
        return productRepository.save(oldProduct);
    }

    @CrossOrigin()
    @DeleteMapping("/product/{id}")//Delete one product
    void deleteProduct(@PathVariable String id) {
        LOG.info("Deleting product with ID : {}.",id);
        productRepository.deleteById(id);
    }
}
