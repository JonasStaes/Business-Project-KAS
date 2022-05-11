package com.ap.kas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tblWhiteList")
@NoArgsConstructor
public class WhiteListEntry {
    
    @Id
    @Column(name = "whitelist_entry_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String nacebel;

    public WhiteListEntry(String nacebel) {
        this.nacebel = nacebel;
    }
}