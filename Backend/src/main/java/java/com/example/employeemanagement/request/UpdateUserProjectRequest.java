package com.example.employeemanagement.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserProjectRequest {
    private Integer employeeId;
    private Integer projectId;
    private String mode;
}
