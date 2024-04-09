package com.example.employeemanagement.expection;

public class ClientDoesNotExist extends Exception{
    public ClientDoesNotExist(String msg){
        super(msg);
    }
}
