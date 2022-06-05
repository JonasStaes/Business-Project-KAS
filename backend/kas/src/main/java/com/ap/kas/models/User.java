package com.ap.kas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * This class is used to store Users in the database.
 */
@Data
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "tblUsers")
public class User{

    @Id
    @Column (name = "user_id")
    @GeneratedValue (generator = "uuid")
    @GenericGenerator (name = "uuid", strategy = "uuid2")
    protected String id;

    protected String name;

    protected String email;

    protected Boolean active;

    protected String password;
    
    public User(String name, String email, Boolean active, String password){
        this.name = name;
        this.email = email;
        this.active = active;
        this.password = password;
    }
}