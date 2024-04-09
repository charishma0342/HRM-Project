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
public class ProjectResponse {
    private Integer projectId;
    private String projectName;
    private String projectDescription;
    private String goals;
    private List<String> skillsRequired;
    private EmployeeDetails teamLeader;
    private Date startDate;
    private Date endDate;
    private String clientName;
    private boolean isActive;
    private boolean isCompleted;
    private Integer forecast;
    private List<EmployeeDetails> employees;
}
