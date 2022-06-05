package com.ap.kas.models;
import java.util.stream.Stream;

import lombok.Getter;

/**
 * This object is used to store Investment Types in the database.
 */
@Getter
public enum InvestmentType {
    ROLLEND_MATRIEEL(1, 5),
    ONROERENDE_GOEDEREN(1, 25),
    PROFESSIONELE_UITRUSTING(1, 15);

    private byte min;
    private byte max;

    private InvestmentType(int min, int max) {
        this.min = Byte.parseByte(Integer.toString(min));
        this.max = Byte.parseByte(Integer.toString(max));
    }

    public static InvestmentType getInvestmentTypeByName(String name) {
        return Stream.of(InvestmentType.values())
            .filter(investmentType -> investmentType.toString().toLowerCase().equals(name.toLowerCase()))
            .findFirst()
            .orElse(null);
    }
}
