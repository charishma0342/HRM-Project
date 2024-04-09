package com.example.employeemanagement.response;

import lombok.*;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDetails {
    private Integer employeeId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String phoneNumber;
    private List<String> skills;
    private Date joiningDate;
    private Date exitDate;
    private boolean isActive;
}
