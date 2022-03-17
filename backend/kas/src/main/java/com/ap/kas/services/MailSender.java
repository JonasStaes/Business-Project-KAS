package com.ap.kas.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailSender {
    
    @Autowired
    JavaMailSender javaMailSender;

    Logger logger = LoggerFactory.getLogger(MailSender.class);

    public void sendMail(String to, String subject, String body) {

        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreplay.omega@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            logger.info("Sending...");

            javaMailSender.send(message);

            logger.info("Done!");
        } catch (MessagingException e) {
            logger.error("", e);
        }
    }
}
