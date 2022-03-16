package com.ap.kas.models;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;

@Data
@Entity
@Table(name = "tblPasswordTokens")
public class PasswordCreateToken {

    @Id
    @Column(name = "credit_request_id")
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    //seconds in a minute, minutes in an hour, hours in a day
    //expiration after 1 day
    //edit final number to change how long the reset token lasts
    private static final int EXPIRATION = (60 * 60 * 24) * 1;

    private String token;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    private Date expiryDate;

    public PasswordCreateToken(String token, User user) {
        Calendar rightNow = Calendar.getInstance();
        rightNow.add(Calendar.SECOND, EXPIRATION);
        this.token = token;
        this.user = user;
        this.expiryDate = rightNow.getTime();
    }
}
