package com.cs353.ooadproj;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @CrossOrigin()
    @GetMapping("/products")//Retrieve Products
    List<Product> all(){;}

    @CrossOrigin()
    @PostMapping("/products")//Add Products
    Product newProduct(@RequestBody Product newProduct){;}

    @CrossOrigin()
    @GetMapping("/product/{id}")//View single product
    Product oneProduct(@PathVariable Long id){;}

    @CrossOrigin()
    @PostMapping("/product/{id}")//Edit product merchant
    Product editProduct(@RequestBody Product newProduct, @PathVariable Long id){;}

    @CrossOrigin()
    @DeleteMapping("/product/{id}")//Delete one product
    void deleteProduct(@PathVariable Long id){;}

}
