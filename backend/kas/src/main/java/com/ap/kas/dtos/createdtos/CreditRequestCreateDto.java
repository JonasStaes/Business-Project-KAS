package com.ap.kas.dtos.createdtos;

import java.io.File;
import java.time.Duration;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreditRequestCreateDto {
    
    @NotBlank
    private String name;

    private float requestedAmount; 

    private float totalAmount;

    @NotNull
    private Duration duration; 

    @NotBlank
    private String accountability; 
    
    private File[] files;

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

    public File[] getFiles() {
        return files;
    }

    public void setFiles(File[] files) {
        this.files = files;
    }
}
