package com.ap.kas.dtos.createdtos;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

public class CreditRequestCreateDto {
    
    @NotBlank
    private String name;

    private float requestedAmount;

    private float financedAmount; 

    @NotNull
    private Period duration; 

    @NotBlank
    private String accountability; 

    private List<MultipartFile> files = new LinkedList<MultipartFile>();

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public float getFinancedAmount() { return this.financedAmount; }

    public void setFinancedAmount(float financedAmount) { this.financedAmount = financedAmount; }
    
    public float getRequestedAmount() { return requestedAmount; }

    public void setRequestedAmount(float requestedAmount) { this.requestedAmount = requestedAmount; }

    public Period getDuration() { return duration; }

    public void setDuration(Period duration) { this.duration = duration; }

    public String getAccountability() { return accountability; }

    public void setAccountability(String accountability) { this.accountability = accountability; }

    public List<MultipartFile> getFiles() { return this.files; }

    public void setFiles(List<MultipartFile> files) { this.files = files; }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CreditRequestCreateDto)) {
            return false;
        }
        CreditRequestCreateDto creditRequestCreateDto = (CreditRequestCreateDto) o;
        return Objects.equals(name, creditRequestCreateDto.name) && financedAmount == creditRequestCreateDto.financedAmount && requestedAmount == creditRequestCreateDto.requestedAmount && Objects.equals(duration, creditRequestCreateDto.duration) && Objects.equals(accountability, creditRequestCreateDto.accountability) && Objects.equals(files, creditRequestCreateDto.files);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, financedAmount, requestedAmount, duration, accountability, files);
    }


    @Override
    public String toString() {
        return "{" +
            " name='" + getName() + "'" +
            ", financedAmount='" + getFinancedAmount() + "'" +
            ", requestedAmount='" + getRequestedAmount() + "'" +
            ", duration='" + getDuration() + "'" +
            ", accountability='" + getAccountability() + "'" +
            ", files='" + getFiles() + "'" +
            "}";
    }
}
