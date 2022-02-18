package com.ap.kas.models;

import java.io.File;
import java.time.Duration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Credit_Request")
public class CreditRequest {
    
    @Id
    @Column(name = "credit_request_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private float requestedAmount; 

    private float totalAmount;

    private Duration duration; 

    private String accountability; 
    
    //private File[] files;

    public CreditRequest() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getRequestedAmount() {
        return requestedAmount;
    }

    public void setRequestedAmount(float requestedAmount) {
        this.requestedAmount = requestedAmount;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public String getAccountability() {
        return accountability;
    }
    
    public void setAccountability(String accountability) {
        this.accountability = accountability;
    }

    // public File[] getFiles() {
    //     return files;
    // }
    
    // public void setFiles(File[] files) {
    //     this.files = files;
    // }
}
