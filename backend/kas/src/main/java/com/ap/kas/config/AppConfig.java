package com.ap.kas.config;

import java.time.Period;

import com.ap.kas.dtos.createdtos.CreditRequestCreateDto;
import com.ap.kas.models.CreditRequest;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        //credit request custom mappings

        //converts the period string back to a period with built in method
        mapper.addConverter(new Converter<String, Period>() {

            @Override
            public Period convert(MappingContext<String, Period> ctx) {
                return ctx.getSource() == null ? null : Period.parse(ctx.getSource());
            }
            
        });

        mapper.typeMap(CreditRequestCreateDto.class, CreditRequest.class).addMappings(m -> m.skip(CreditRequest::setFiles));
        
        return mapper;
    }
}
