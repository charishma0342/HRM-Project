package com.example.employeemanagement.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddProjectRequest {
    private String name;
    private String description;
    private String goals;
    private String clientName;
    private String requiredSkills;
    private Integer teamLeaderId;
    private Date startDate;
    private Date endDate;
    private boolean isActive;
    private boolean isCompleted;
    private Integer forecast;
}
