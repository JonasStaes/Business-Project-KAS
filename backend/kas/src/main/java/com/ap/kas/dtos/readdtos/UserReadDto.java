package com.ap.kas.dtos.readdtos;

import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.ap.kas.models.Roles;

public class UserReadDto {

    @NotBlank
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotNull
    private Roles role;

    @NotNull
    private Boolean active;

    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
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
        if (!(o instanceof UserReadDto)) {
            return false;
        }
        UserReadDto userReadDto = (UserReadDto) o;
        return id == userReadDto.id && Objects.equals(name, userReadDto.name) && email == userReadDto.email && role == userReadDto.role && active == userReadDto.active;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, role, active);
    }

    @Override
    public String toString() {
        return "UserReadDto [active=" + active + ", email=" + email + ", id=" + id + ", name=" + name + ", role=" + role
                + "]";
    }
   
}