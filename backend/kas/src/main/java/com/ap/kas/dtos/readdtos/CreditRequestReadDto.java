package com.ap.kas.dtos.readdtos;

import java.time.Period;
import java.util.Objects;

import javax.validation.constraints.NotBlank;

public class CreditRequestReadDto {
    
    @NotBlank
    private int id;

    @NotBlank
    private String name;

    private float financedAmount; 

    private float totalAmount;

    private Period duration; 

    @NotBlank
    private String accountability; 

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

    public float getFinancedAmount() {
        return this.financedAmount;
    }

    public void setFinancedAmount(float financedAmount) {
        this.financedAmount = financedAmount;
    }    

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Period getDuration() {
        return duration;
    }

    public void setDuration(Period duration) {
        this.duration = duration;
    }

    public String getAccountability() {
        return accountability;
    }
    
    public void setAccountability(String accountability) {
        this.accountability = accountability;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CreditRequestReadDto)) {
            return false;
        }
        CreditRequestReadDto creditRequestReadDto = (CreditRequestReadDto) o;
        return id == creditRequestReadDto.id && Objects.equals(name, creditRequestReadDto.name) && financedAmount == creditRequestReadDto.financedAmount && totalAmount == creditRequestReadDto.totalAmount && Objects.equals(duration, creditRequestReadDto.duration) && Objects.equals(accountability, creditRequestReadDto.accountability);
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
