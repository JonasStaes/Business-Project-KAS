package com.ap.kas.models;

import java.util.stream.Stream;

public enum Status {
    GOEDGEKEURD,
    IN_BEHANDELING,
    AFGEKEURD;

    public static Status getStatusByName(String name) {
        return Stream.of(Status.values()).filter(status -> status.toString().toLowerCase().equals(name.toLowerCase())).findFirst().orElse(null);
    }
}
