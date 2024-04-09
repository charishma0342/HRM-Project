package com.example.employeemanagement.expection;

public class UserDoesNotExist extends Exception{
    public UserDoesNotExist(String msg){
        super(msg);
    }
}
