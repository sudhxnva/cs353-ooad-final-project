package com.cs353.ooadproj;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@Slf4j
public class UserController {
    private final  UsersRepo usersRepo;

    public UserController(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    @CrossOrigin()
    @GetMapping("/users")//Retrieve Products
    public List<User> getUsers() {
        log.info("Getting all products");
        return usersRepo.findAll();
    }

    @CrossOrigin()
    @GetMapping("/users/{id}")//View single product
    public User getUser(@PathVariable String id) {
        log.info("Getting user #{}",id);
        return usersRepo.findById(id).get();
    }

    @CrossOrigin()
    @PostMapping("/users")
    public User addUser(@RequestBody NewUserRequest user) {
        log.info("Adding user to database");
        PasswordAuthentication passwordAuthentication = new PasswordAuthentication();
        String passHash = passwordAuthentication.hash(user.getPassword());
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setPasshash(passHash);
        log.info(String.valueOf(newUser));
        usersRepo.save(newUser);
        return newUser;
    }

    @CrossOrigin()
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest user) {
        log.info("Authenticating...");
        PasswordAuthentication passwordAuthentication = new PasswordAuthentication();
        User dbUser = usersRepo.findByUsername(user.getUsername());
        Boolean valid = passwordAuthentication.authenticate(user.getPassword(), dbUser.getPasshash());
        if(valid){
            log.info("User is valid!");
            return dbUser;
        }
        else{
            log.warn("Invalid user!");
            throw new UserInvalidException(user.getUsername());
        }
    }
}
