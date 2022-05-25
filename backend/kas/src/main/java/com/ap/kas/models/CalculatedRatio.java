package com.ap.kas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tblRatio")
public class CalculatedRatio {

    @Id
    @Column(name = "ratio_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    
    private String name;

    private float ratio;

    private Float ceiling;

    private Float floor;

    public Status isRatioValid() {
        if(ceiling == null && floor == null) {
            return Status.GEEN_STATUS;
        }

        if(ratio > ceiling) {
            return Status.GOEDGEKEURD;
        } else if(ratio < floor) {
            return Status.AFGEKEURD;
        } else {
            return Status.IN_BEHANDELING;
        }
    }
}
