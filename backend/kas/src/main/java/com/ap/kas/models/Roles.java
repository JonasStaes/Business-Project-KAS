package com.ap.kas.models;

import java.util.stream.Stream;

public enum Roles {
    KLANT,
    KANTOOR_MEDEWERKER,
    ADMINISTRATOR,
    COMPLIANCE,
    KREDIET_BEOORDELAAR,
    COMMERCIELE_DIRECTIE;

    public static Roles getRoleByName(String name) {
        return Stream.of(Roles.values()).filter(role -> role.toString().toLowerCase().equals(name.toLowerCase())).findFirst().orElse(null);
    }
}
