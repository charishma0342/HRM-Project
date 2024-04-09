package com.example.employeemanagement.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddEmployeeReviewRequest {
    private int employeeId;
    private int projectId;
    private String review;
    private double rating;
}
