package com.ap.kas.models;

import java.time.Period;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "credit_request")
public class CreditRequest {
    
    @Id
    @Column(name = "credit_request_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private float financedAmount; 

    private float requestedAmount;

    private Period duration; 

    private String accountability; 

    public CreditRequest() {}

    public CreditRequest(String name, float financedAmount, float requestedAmount, Period duration, String accountability) {
        this.name = name;
        this.financedAmount = financedAmount;
        this.requestedAmount = requestedAmount;
        this.duration = duration;
        this.accountability = accountability;
    }

    public String getId() { return this.id; }

    public void setId(String id) { this.id = id; }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public float getFinancedAmount() { return this.financedAmount; }

    public void setFinancedAmount(float financedAmount) { this.financedAmount = financedAmount; }

    public float getRequestedAmount() { return this.requestedAmount; }

    public void setRequestedAmount(float totalAmount) { this.requestedAmount = totalAmount; }

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
        return Objects.equals(id, creditRequest.id) && Objects.equals(name, creditRequest.name) && financedAmount == creditRequest.financedAmount && requestedAmount == creditRequest.requestedAmount && Objects.equals(duration, creditRequest.duration) && Objects.equals(accountability, creditRequest.accountability);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, financedAmount, requestedAmount, duration, accountability);
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", financedAmount='" + getFinancedAmount() + "'" +
            ", requestedAmount='" + getRequestedAmount() + "'" +
            ", duration='" + getDuration() + "'" +
            ", accountability='" + getAccountability() + "'" +
            "}";
    }
}
