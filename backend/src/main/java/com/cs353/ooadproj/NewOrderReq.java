package com.cs353.ooadproj;

import lombok.Data;

import java.util.Date;

@Data
public class NewOrderReq {
    private String address;
    private String deliveryDate;
}
