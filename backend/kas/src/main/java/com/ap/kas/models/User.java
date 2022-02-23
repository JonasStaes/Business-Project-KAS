package com.ap.kas.models;


import java.util.Objects;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table (name = "user" )
public class User{

    @Id
    @Column (name = "user_id")
    @GeneratedValue (generator = "uuid")
    @GenericGenerator (name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String email;

    private Roles role; 

    private Boolean active;

    public User () {}
    
    public User(String name, String email, Roles role, Boolean active ){
        this.name = name;
        this.email = email;
        this.role = role;
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    
    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && email == user.email && role == user.role && active == user.active;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, role, active);
    }

    @Override
    public String toString() {
        return "User [active=" + active + ", email=" + email + ", id=" + id + ", name=" + name + ", role=" + role + "]";
    }

    

    









}