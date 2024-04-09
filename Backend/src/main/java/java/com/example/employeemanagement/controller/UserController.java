package com.example.employeemanagement.controller;

import com.example.employeemanagement.expection.UserDoesNotExist;
import com.example.employeemanagement.request.AddEmployeeReviewRequest;
import com.example.employeemanagement.request.GetUserRequest;
import com.example.employeemanagement.request.UpdateUserProjectRequest;
import com.example.employeemanagement.response.ErrorResponse;
import com.example.employeemanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{userId}/profile")
    public ResponseEntity<?> fetchUserDetails(@PathVariable(value = "userId")Integer userId){
        try {
            return new ResponseEntity<>(employeeService.findByUsername(userId), HttpStatus.OK);
        } catch (UserDoesNotExist e){
            return new ResponseEntity<>(new ErrorResponse(userId + " entered is Invalid"), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials "+userId), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/get/all/users")
    public ResponseEntity<?> fetchAllUserDetails(){
        try {
            return new ResponseEntity<>(employeeService.findAllUsers(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/get/users")
    public ResponseEntity<?> fetchUserDetails(@RequestBody GetUserRequest getUserRequest){
        try {
            return new ResponseEntity<>(employeeService.findUsers(getUserRequest.getSkillDomain(), getUserRequest.getLocation()), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/get/update/project")
    public ResponseEntity<?> updateUserProject(@RequestBody UpdateUserProjectRequest updateUserProjectRequest){
        try {
            employeeService.updateUserProject(updateUserProjectRequest);
            return new ResponseEntity<>(employeeService.findByUsername(updateUserProjectRequest.getEmployeeId()), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/add/review")
    public ResponseEntity<?> addReviewDetails(@RequestBody AddEmployeeReviewRequest addEmployeeReviewRequest){
        try {
            return new ResponseEntity<>(employeeService.addReview(addEmployeeReviewRequest), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }


}
