package com.ap.kas.security.services;

import javax.transaction.Transactional;

import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String principal) throws UsernameNotFoundException {
        if(principal.contains("@")) {
            Employee employee = employeeRepository.findByEmail(principal)
                .orElseThrow(() -> new UsernameNotFoundException("Could not find employee with email: " + principal));
            return (UserDetails)EmployeeDetailsImpl.build(employee);
        } else {
            Customer customer = customerRepository.findByCompanyNr(principal)
                .orElseThrow(() -> new UsernameNotFoundException("Could not find customer with companyNr: " + principal));
            return (UserDetails)CustomerDetailsImpl.build(customer);
        }
    }
}
