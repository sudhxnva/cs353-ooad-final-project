package com.cs353.ooadproj;

public class UserInvalidException extends RuntimeException {

    UserInvalidException(String username) {
        super("Invalid User: " + username);
    }
}
