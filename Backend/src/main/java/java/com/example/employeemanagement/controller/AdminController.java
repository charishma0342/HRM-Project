package com.example.employeemanagement.controller;

import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.response.ErrorResponse;
import com.example.employeemanagement.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/admin")
public class AdminController {

    @Autowired
    private AdministratorService administratorService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> fetchAdminDetails(@PathVariable(value = "userId")String userId){
        try {
            return new ResponseEntity<>(administratorService.findByUsername(userId), HttpStatus.OK);
        } catch (UserDoesNotExist e){
            return new ResponseEntity<>(new ErrorResponse(userId + " entered is Invalid"), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials "+userId), HttpStatus.UNAUTHORIZED);
        }
    }
}
