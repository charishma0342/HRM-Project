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
public class EmployeeProfileResponse {
    private Integer employeeId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String emailId;
    private String phoneNumber;
    private List<String> acquiredSkills;
    private Date joiningDate;
    private Date exitDate;
    private String skillDomain;
    private String type;
    private String ctc;
    private String location;
    private boolean isActive;
    private double overallRating;
    private String currentProjectName;
    private List<EmployeeProjectResponse> pastProjects;
    private List<EmployeeProjectResponse> activeProjects;
    private List<EmployeeProjectResponse> futureProjects;
}
