package com.ap.kas.models;

import java.time.Period;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tblCreditRequests")
@NoArgsConstructor
public class CreditRequest {
    
    @Id
    @Column(name = "credit_request_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private float totalAmount; 

    private float financedAmount;

    private Period duration; 

    private String investmentType;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Customer customer;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String approvalNote;

    private boolean isSuspicious;

    public CreditRequest(String name, float totalAmount, float requestedAmount, Period duration, String investmentType, Customer customer) {
        this.name = name;
        this.totalAmount = totalAmount;
        this.financedAmount = requestedAmount;
        this.investmentType = investmentType;
        this.duration = duration;
        this.customer = customer;
    }
}
