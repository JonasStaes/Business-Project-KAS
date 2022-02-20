package com.ap.kas.models;

import java.time.Period;
import java.util.Objects;

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

    private float financedAmount; 

    private float totalAmount;

    private Period duration; 

    private String accountability; 
    
    //private File[] files;

    public CreditRequest() {}

    public CreditRequest(String name, float financedAmount, float totalAmount, Period duration, String accountability) {
        this.name = name;
        this.financedAmount = financedAmount;
        this.totalAmount = totalAmount;
        this.duration = duration;
        this.accountability = accountability;
    }

    public int getId() { return this.id; }

    public void setId(int id) { this.id = id; }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public float getFinancedAmount() { return this.financedAmount; }

    public void setFinancedAmount(float financedAmount) { this.financedAmount = financedAmount; }

    public float getTotalAmount() { return this.totalAmount; }

    public void setTotalAmount(float totalAmount) { this.totalAmount = totalAmount; }

    public Period getDuration() { return this.duration; }

    public void setDuration(Period duration) { this.duration = duration; }

    public String getAccountability() { return this.accountability; }

    public void setAccountability(String accountability) { this.accountability = accountability; }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CreditRequest)) {
            return false;
        }
        CreditRequest creditRequest = (CreditRequest) o;
        return id == creditRequest.id && Objects.equals(name, creditRequest.name) && financedAmount == creditRequest.financedAmount && totalAmount == creditRequest.totalAmount && Objects.equals(duration, creditRequest.duration) && Objects.equals(accountability, creditRequest.accountability);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, financedAmount, totalAmount, duration, accountability);
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", financedAmount='" + getFinancedAmount() + "'" +
            ", totalAmount='" + getTotalAmount() + "'" +
            ", duration='" + getDuration() + "'" +
            ", accountability='" + getAccountability() + "'" +
            "}";
    }
}
