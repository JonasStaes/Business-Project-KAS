package com.ap.kas.config;

import java.time.Period;
import java.util.Properties;

import com.ap.kas.models.Customer;
import com.ap.kas.models.Roles;
import com.ap.kas.repositories.CustomerRepository;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class AppConfig {

    @Autowired
    private CustomerRepository customerRepository;
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        //converts the period string back to a period with built in method
        mapper.addConverter(new Converter<String, Period>() {

            @Override
            public Period convert(MappingContext<String, Period> ctx) {
                return ctx.getSource() == null ? null : Period.parse(ctx.getSource());
            }
            
        });

        mapper.addConverter(new Converter<Roles, String>() {

            @Override
            public String convert(MappingContext<Roles, String> ctx) {
                return ctx.getSource() == null ? null : ctx.getSource().name().toLowerCase();
            }
            
        });

        mapper.addConverter(new Converter<String, Roles>() {

            @Override
            public Roles convert(MappingContext<String, Roles> ctx) {
                return ctx.getSource() == null ? null : Roles.getRoleByName(ctx.getSource());
            }
            
        });

        mapper.addConverter(new Converter<String, Customer>() {

            @Override
            public Customer convert(MappingContext<String, Customer> ctx) {
                return ctx.getSource() == null ? null : customerRepository.getById(ctx.getSource());
            }
            
        });
        
        return mapper;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSenderImpl = new JavaMailSenderImpl();

        mailSenderImpl.setHost("smtp.gmail.com");
        mailSenderImpl.setPort(587);

        mailSenderImpl.setUsername("noreplay.omega@gmail.com");
        mailSenderImpl.setPassword("there is no password");

        Properties props = mailSenderImpl.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "false");
        
        return mailSenderImpl;
    }
}
