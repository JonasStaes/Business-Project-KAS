package com.ap.kas.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * This class is used to store Customers in the database.
 * <p>
 * This class has an Address object and a CustomerInfo object linked to it.
 * <p>
 * Inherits from the User class
 */
@Entity
@Table(name = "tblCustomers")
@PrimaryKeyJoinColumn(name = "customerId")
@NoArgsConstructor 
@EqualsAndHashCode(callSuper = true)
@Getter @Setter @ToString(callSuper = true)
public class Customer extends User {
    
    private String companyNr;

    @Enumerated(EnumType.STRING)
    private Role role = Role.KLANT;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "information_id")
    private CustomerInfo personalInfo;

    private int customerScore = 50;

    public Customer(String name, String email, Boolean active, String password, String companyNr) {
        super(name, email, active, password);
        this.companyNr = companyNr;
    }

    
}
