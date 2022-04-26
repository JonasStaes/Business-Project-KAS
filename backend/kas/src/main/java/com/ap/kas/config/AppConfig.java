package com.ap.kas.config;

import java.time.LocalDate;
import java.time.Period;
import java.util.Properties;

import com.ap.kas.models.Customer;
import com.ap.kas.models.Role;
import com.ap.kas.models.Status;
import com.ap.kas.repositories.CustomerRepository;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.reactive.function.client.WebClient;

@Order(1)
@Configuration
@EnableScheduling
@ComponentScan({"com.ap.kas.tasks"})
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

        mapper.addConverter(new Converter<String, Status>() {

            @Override
            public Status convert(MappingContext<String, Status> ctx) {
                return ctx.getSource() == null ? null : Status.getStatusByName(ctx.getSource());
            }
            
        });

        mapper.addConverter(new Converter<Status, String>() {

            @Override
            public String convert(MappingContext<Status, String> ctx) {
                return ctx.getSource() == null ? null : ctx.getSource().name().toLowerCase();
            }
            
        });

        mapper.addConverter(new Converter<Role, String>() {

            @Override
            public String convert(MappingContext<Role, String> ctx) {
                return ctx.getSource() == null ? null : ctx.getSource().name().toLowerCase();
            }
            
        });

        mapper.addConverter(new Converter<String, Role>() {

            @Override
            public Role convert(MappingContext<String, Role> ctx) {
                return ctx.getSource() == null ? null : Role.getRoleByName(ctx.getSource());
            }
            
        });

        mapper.addConverter(new Converter<String, Customer>() {

            @Override
            public Customer convert(MappingContext<String, Customer> ctx) {
                return ctx.getSource() == null ? null : customerRepository.getById(ctx.getSource());
            }
            
        });

        mapper.addConverter(new Converter<String, LocalDate>() {
            @Override
            public LocalDate convert(MappingContext<String, LocalDate> ctx) {
                return ctx.getSource() == null ? null : LocalDate.parse(ctx.getSource());
            }
        });

        return mapper;
    }

    @Bean
    public WebClient kruispuntdb() {
        return WebClient.builder()
            .baseUrl("http://projectbus10.p.bletchley.cloud:8093/companydata/")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSenderImpl = new JavaMailSenderImpl();

        mailSenderImpl.setHost("smtp.gmail.com");
        mailSenderImpl.setPort(587);

        mailSenderImpl.setUsername("noreplay.omega@gmail.com");
        mailSenderImpl.setPassword("eJhmbSVJNbSp2Kt");

        Properties props = mailSenderImpl.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "false");
        
        return mailSenderImpl;
    }
}
