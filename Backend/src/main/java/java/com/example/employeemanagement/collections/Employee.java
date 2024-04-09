package com.example.employeemanagement.collections;

import com.example.employeemanagement.collections.enums.EmploymentType;
import com.example.employeemanagement.collections.enums.SkillDomain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Table( name  = "EMPLOYEE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "MIDDLE_NAME")
    private String middleName;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "skills")
    private String skills;

    @Column(name = "PHONE_NUMBER", nullable = false)
    private String phoneNumber;

    @Column(name = "EMAIL_ID", unique = true)
    private String emailId;

    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @Column(name = "USERNAME", unique = true)
    private String userName;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "JOINING_DATE")
    private Date joiningDate;

    @Column(name = "EXIT_DATE")
    private Date exitDate;

    @Column(name = "IS_ACTIVE")
    private boolean isActive;

    @Column(name = "SKILL_DOMAIN")
    private String skillDomain;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "CTC")
    private String ctc;

    @Column(name = "LOCATION")
    private String location;
}
