package com.example.employeemanagement.collections;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;


@Entity
@Table( name  = "ADMINISTRATOR")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Administrator {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;

    @Column(name = "MIDDLE_NAME", nullable = false)
    private String middleName;

    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;

    @Column(name = "PHONE_NUMBER", nullable = false)
    private String phoneNumber;

    @Column(name = "skills")
    private String skills;

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
}
