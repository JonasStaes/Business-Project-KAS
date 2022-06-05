package com.ap.kas.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This object is used to store Customer information  in the database.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "tblInformation")
public class CustomerInfo {
    
    @Id
    @Column(name = "information_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String birthPlace;

    private LocalDate birthDate;

    private int phoneNr;

    private int socialRegistryNr;
}
