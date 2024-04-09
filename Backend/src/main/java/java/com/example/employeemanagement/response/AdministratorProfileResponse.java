package com.example.employeemanagement.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorProfileResponse {
    private String id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String emailId;
    private String phoneNumber;
    private List<String> acquiredSkills;
    private Date joiningDate;
    private Date exitDate;
    private boolean isActive;
}
