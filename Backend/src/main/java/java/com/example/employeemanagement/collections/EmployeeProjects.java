package com.example.employeemanagement.collections;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table( name  = "EMPLOYEE_PROJECTS")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeProjects {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "EMPLOYEE_ID", nullable = false)
    @JsonIgnore
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PROJECT_ID", nullable = false)
    @JsonIgnore
    private Projects project;

    @Column(name = "START_DATE")
    private Date startDate;

    @Column(name = "END_DATE")
    private Date endDate;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_completed")
    private boolean isCompleted;

    @Column(name = "RATING")
    private Double rating;

    @Column(name = "REVIEW")
    private String review;
}
