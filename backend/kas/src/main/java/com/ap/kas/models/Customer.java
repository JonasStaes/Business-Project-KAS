package com.ap.kas.models;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "tblCustomers")
@NoArgsConstructor 
@EqualsAndHashCode(callSuper = true)
@Getter @Setter @ToString(callSuper = true)
public class Customer extends User {
    
    private int companyNr;

    private final Roles role = Roles.KLANT;

    public Customer(String name, String email, Boolean active, String password, int companyNr) {
        super(name, email, active, password);
        this.companyNr = companyNr;
    }
}
