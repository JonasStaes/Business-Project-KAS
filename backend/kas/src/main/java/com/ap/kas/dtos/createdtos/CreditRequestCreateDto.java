package com.ap.kas.dtos.createdtos;

import java.time.Period;
import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreditRequestCreateDto {
    
    @NotBlank
    private String name;

    private float financedAmount; 

    private float totalAmount;

    @NotNull
    private Period duration; 

    @NotBlank
    private String accountability; 

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public float getFinancedAmount() { return this.financedAmount; }

    public void setFinancedAmount(float financedAmount) { this.financedAmount = financedAmount; }
    
    public float getTotalAmount() { return totalAmount; }

    public void setTotalAmount(float totalAmount) { this.totalAmount = totalAmount; }

    public Period getDuration() { return duration; }

    public void setDuration(Period duration) { this.duration = duration; }

    public String getAccountability() { return accountability; }

    public void setAccountability(String accountability) { this.accountability = accountability; }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CreditRequestCreateDto)) {
            return false;
        }
        CreditRequestCreateDto creditRequestCreateDto = (CreditRequestCreateDto) o;
        return Objects.equals(name, creditRequestCreateDto.name) && financedAmount == creditRequestCreateDto.financedAmount && totalAmount == creditRequestCreateDto.totalAmount && Objects.equals(duration, creditRequestCreateDto.duration) && Objects.equals(accountability, creditRequestCreateDto.accountability);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, financedAmount, totalAmount, duration, accountability);
    }


    @Override
    public String toString() {
        return "{" +
            " name='" + getName() + "'" +
            ", financedAmount='" + getFinancedAmount() + "'" +
            ", totalAmount='" + getTotalAmount() + "'" +
            ", duration='" + getDuration() + "'" +
            ", accountability='" + getAccountability() + "'" +
            "}";
    }
}
