package com.ap.kas.models;

import java.util.stream.Stream;
/**
 * This class is used to store the Status types in the database.
 */
public enum Status {
    GEEN_STATUS,
    GOEDGEKEURD,
    IN_BEHANDELING,
    AFGEKEURD;

    public static Status getStatusByName(String name) {
        return Stream.of(Status.values()).filter(status -> status.toString().toLowerCase().equals(name.toLowerCase())).findFirst().orElse(null);
    }
}
