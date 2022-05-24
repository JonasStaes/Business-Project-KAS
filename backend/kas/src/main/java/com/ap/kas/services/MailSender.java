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

    private void sendMail(String to, String subject, String body) {

        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreplay.fba@gmail.com");
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

    public void sendPasswordRecoveryMail(String email, String token) {
        String message = "Click <a href=\"http://localhost:3000/kas/change_password/" + token + "\">this link</a> to change your password.";
        sendMail(email, "FBA: Request for password recovery", message);
    }

    public void sendCustomerFinalizationMail(String email, String token) {
        String message = "Click <a href=\"http://localhost:3000/kas/finalize_account/customer/" + token + "\">this link</a> to fill in your customer information and start banking with FBA!";
        sendMail(email, "FBA: account created for you", message);
    }

    public void sendEmployeeFinalizationMail(String email, String token) {
        String message = "Click <a href=\"http://localhost:3000/kas/finalize_account/employee/" + token + "\">this link</a> to fill in your password information and start working in KAS.";
        sendMail(email, "FBA: employee account created for you", message);
    }
}
