package com.ap.kas.models;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.Getter;

@Getter
public enum Role {
    KLANT("customer"),
    KANTOOR_MEDEWERKER("customer"),
    ADMINISTRATOR("employee"),
    COMPLIANCE("employee"),
    KREDIET_BEOORDELAAR("employee"),
    COMMERCIELE_DIRECTIE("employee");

    private String roleType;

    private Role(String roleType) {
        this.roleType = roleType;
    }

    public static Role getRoleByName(String name) {
        return Stream.of(Role.values())
            .filter(role -> role.toString().toLowerCase().equals(name.toLowerCase()))
            .findFirst()
            .orElse(null);
    }

    private static List<Role> getRoleSet(String roleType) {
        return Stream.of(Role.values())
            .filter(role -> role.getRoleType() == roleType)
            .collect(Collectors.toList());
    }

    public static List<Role> getCustomerRoles() {
        return getRoleSet("customer");
    }

    public static List<Role> getEmployeeRoles() {
        return getRoleSet("employee");
    }
}
