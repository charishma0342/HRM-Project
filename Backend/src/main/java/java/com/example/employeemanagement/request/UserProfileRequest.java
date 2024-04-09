package com.example.employeemanagement.request;

import com.example.employeemanagement.request.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequest {
    private String userName;
    private UserType userType;
}
