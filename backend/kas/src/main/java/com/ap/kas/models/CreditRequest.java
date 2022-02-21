package com.ap.kas.models;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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

    private float totalAmount;

    private Period duration; 

    private String accountability; 
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "creditRequest", cascade = CascadeType.ALL)
    private List<FileStorage> files = new LinkedList<FileStorage>();

    public CreditRequest() {}

    public CreditRequest(String name, float financedAmount, float totalAmount, Period duration, String accountability) {
        this.name = name;
        this.financedAmount = financedAmount;
        this.totalAmount = totalAmount;
        this.duration = duration;
        this.accountability = accountability;
    }

    public String getId() { return this.id; }

    public void setId(String id) { this.id = id; }

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

    public List<FileStorage> getFiles() { return files; }

    public void setFiles(List<FileStorage> files) { this.files = files; }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CreditRequest)) {
            return false;
        }
        CreditRequest creditRequest = (CreditRequest) o;
        return Objects.equals(id, creditRequest.id) && Objects.equals(name, creditRequest.name) && financedAmount == creditRequest.financedAmount && totalAmount == creditRequest.totalAmount && Objects.equals(duration, creditRequest.duration) && Objects.equals(accountability, creditRequest.accountability) && Objects.equals(files, creditRequest.files);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, financedAmount, totalAmount, duration, accountability, files);
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
            ", files='" + getFiles() + "'" +
            "}";
    }
}
