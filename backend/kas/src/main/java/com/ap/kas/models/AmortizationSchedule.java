package com.ap.kas.models;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * This class is used to store AmortizationSchedules in the database.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tblAmortizationSchedule")
public class AmortizationSchedule {

    @Id
    @Column(name = "amortization_schedule_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @CollectionTable(name = "tbl_remaining_debt", joinColumns = @JoinColumn(name = "remaining_debt_id"))
    private List<Float> remainingDebt;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @CollectionTable(name = "tbl_yearly_interest", joinColumns = @JoinColumn(name = "yearly_interest_id"))
    private List<Float> yearlyInterest;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @CollectionTable(name = "tbl_yearly_debt_payment", joinColumns = @JoinColumn(name = "yearly_debt_payment_id"))
    private List<Float> yearlyDebtPayment;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    @CollectionTable(name = "tbl_yearly_total_payment", joinColumns = @JoinColumn(name = "yearly_total_payment_id"))
    private List<Float> yearlyTotalPayment;
}
