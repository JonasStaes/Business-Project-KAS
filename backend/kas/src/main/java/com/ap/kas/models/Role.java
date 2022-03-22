package com.ap.kas.models;

import java.util.stream.Stream;

public enum Role {
    KLANT,
    KANTOOR_MEDEWERKER,
    ADMINISTRATOR,
    COMPLIANCE,
    KREDIET_BEOORDELAAR,
    COMMERCIELE_DIRECTIE;

    public static Role getRoleByName(String name) {
        return Stream.of(Role.values()).filter(role -> role.toString().toLowerCase().equals(name.toLowerCase())).findFirst().orElse(null);
    }
}
