package com.example.employeemanagement.expection;

public class ProjectNotFound extends Exception{
    public ProjectNotFound(String msg){
        super(msg);
    }
}
