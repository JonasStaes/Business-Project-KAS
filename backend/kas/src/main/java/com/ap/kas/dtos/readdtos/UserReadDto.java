package com.ap.kas.dtos.readdtos;

import java.util.LinkedList;
import java.util.List;

import com.ap.kas.models.Role;

import lombok.Data;

@Data
public class UserReadDto {

    private String id;

    private String name;

    private String email;

    private Boolean active;

    private List<String> roles = new LinkedList<String>();

    public void addRole(Role role) {
        roles.add(role.name().toLowerCase());
    }
}