package com.ap.kas.dtos.readdtos;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import javax.validation.constraints.NotBlank;

import com.ap.kas.models.FileStorage;

public class CreditRequestReadDto {
    
    @NotBlank
    private String id;

    @NotBlank
    private String name;

    private float requestedAmount;

    private float financedAmount; 

    private Period duration; 

    @NotBlank
    private String accountability;

    private List<FileStorage> files = new LinkedList<FileStorage>();

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

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

    public List<FileStorage> getFiles() { return files; }

    public void setFiles(List<FileStorage> files) { this.files = files; }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CreditRequestReadDto)) {
            return false;
        }
        CreditRequestReadDto creditRequestReadDto = (CreditRequestReadDto) o;
        return Objects.equals(id, creditRequestReadDto.id) && Objects.equals(name, creditRequestReadDto.name) && requestedAmount == creditRequestReadDto.requestedAmount && financedAmount == creditRequestReadDto.financedAmount && Objects.equals(duration, creditRequestReadDto.duration) && Objects.equals(accountability, creditRequestReadDto.accountability) && Objects.equals(files, creditRequestReadDto.files);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, requestedAmount, financedAmount, duration, accountability, files);
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", requestedAmount='" + getRequestedAmount() + "'" +
            ", financedAmount='" + getFinancedAmount() + "'" +
            ", duration='" + getDuration() + "'" +
            ", accountability='" + getAccountability() + "'" +
            ", files='" + getFiles() + "'" +
            "}";
    }

}
