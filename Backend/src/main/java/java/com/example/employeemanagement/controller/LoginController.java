package com.example.employeemanagement.controller;

import com.example.employeemanagement.request.LoginRequest;
import com.example.employeemanagement.response.ErrorResponse;
import com.example.employeemanagement.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping()
    public ResponseEntity<?> authenticateClient(@RequestBody LoginRequest loginRequest){
        String username = loginRequest.getUserName();
        try {
            return new ResponseEntity<>(loginService.authenticate(loginRequest), HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials "+username), HttpStatus.UNAUTHORIZED);
        }
    }
}
