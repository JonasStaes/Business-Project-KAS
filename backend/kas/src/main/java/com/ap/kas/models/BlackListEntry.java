package com.ap.kas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * This class is used to store BlackList entries in the database.
 */
@Data
@Entity
@Table(name = "tblBlackList")
@NoArgsConstructor
public class BlackListEntry {
    
    @Id
    @Column(name = "blacklist_entry_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String nacebel;

    public BlackListEntry(String nacebel) {
        this.nacebel = nacebel;
    }
}