package com.ap.kas.tasks;

import java.time.Instant;
import java.util.Date;

import com.ap.kas.repositories.PasswordCreateTokenRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

public class PasswordCreateTokenPurgeTask {

    @Autowired
    private PasswordCreateTokenRepository passwordCreateTokenRepository;

    @Scheduled(cron = "${purge.cron.expression}")
    public void purgeExpired() {

        Date now = Date.from(Instant.now());

        passwordCreateTokenRepository.deleteAllByExpiryDateLessThan(now);
    }
}
