package com.ap.kas.dtos.createdtos;

import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.ap.kas.models.Roles;

public class UserCreateDto {

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    //@NotNull
    //private Roles role;

    @NotNull
    private Boolean active;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof UserCreateDto)) {
            return false;
        }
        UserCreateDto userCreateDto = (UserCreateDto) o;
        return Objects.equals(name, userCreateDto.name) && email == userCreateDto.email && active == userCreateDto.active;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, email, active);
    }

    @Override
    public String toString() {
        return "UserCreateDto [active=" + active + ", email=" + email + ", name=" + name +  "]";
    }

    

    
    
}
