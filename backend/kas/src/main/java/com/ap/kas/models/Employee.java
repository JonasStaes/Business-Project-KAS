package com.ap.kas.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
/**
 * This object is used to store Employees in the database.
 * <p>
 * Inherits from the User object.
 */
@Entity
@Table(name = "tblEmployees")
@PrimaryKeyJoinColumn(name = "employeeId")
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Getter @Setter @ToString(callSuper = true)
public class Employee extends User {
    
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @JoinTable(name = "tblRole", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    protected Set<Role> roles = new HashSet<Role>(); 

    public Employee(String name, String email, Boolean active, String password) {
        super(name, email, active, password);
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }
}
