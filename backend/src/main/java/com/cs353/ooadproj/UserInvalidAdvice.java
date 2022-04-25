package com.cs353.ooadproj;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class UserInvalidAdvice {

    @ResponseBody
    @ExceptionHandler(UserInvalidException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    String employeeNotFoundHandler(UserInvalidException ex) {
        return ex.getMessage();
    }
}
