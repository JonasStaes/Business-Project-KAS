package com.ap.kas.services;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;

import com.ap.kas.config.Profiles;
import com.ap.kas.models.CalculatedRatio;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.models.FeedbackDocument;
import com.ap.kas.models.InvestmentType;
import com.ap.kas.models.Role;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;
import com.ap.kas.repositories.FeedbackDocumentRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile(Profiles.DEMO)
public class MockDataRunner implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(MockDataRunner.class);

    @Autowired
    private CreditRequestRepository creditRequestRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private FeedbackDocumentRepository feedbackDocumentRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AccountingService accountingService;

    @Autowired
    private KruispuntDBApiService apiService;

    @Override
    public void run(String... args) throws Exception {

        customerRepository.deleteAll();
        Customer customer1 = new Customer("customer 1", "customer1@gmail.com", true, passwordEncoder.encode(new StringBuffer("customer1")), "1234567890");
        customerRepository.save(customer1);
        Customer customer2 = new Customer("customer 2", "customer2@gmail.com", true, passwordEncoder.encode(new StringBuffer("customer2")), "1234567891");
        customerRepository.save(customer2);
        customerRepository.findAll().forEach(cu -> logger.info("{}", cu));

        employeeRepository.deleteAll();
        Employee employee1 = new Employee("employee1", "employee1@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee1.addRole(Role.ADMINISTRATOR);
        employeeRepository.save(employee1);
        Employee employee2 = new Employee("employee2", "employee2@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee2.addRole(Role.KREDIET_BEOORDELAAR);
        employeeRepository.save(employee2);
        Employee employee3 = new Employee("employee3", "employee3@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee3.addRole(Role.COMPLIANCE);
        employeeRepository.save(employee3);
        employeeRepository.findAll().forEach(em -> logger.info("{}", em));

        creditRequestRepository.deleteAll();

        List<CreditRequest> creditRequests = new LinkedList<CreditRequest>() {{
            for (int i = 0; i < 20; i++) {
                add(createRandomCreditRequest(i + 1, (i % 2 == 0 ? customer1 : customer2)));
            }
        }};

        creditRequestRepository.saveAll(creditRequests);

        creditRequestRepository.findAll().forEach(cr -> logger.info("{}", cr));

        FeedbackDocument test = FeedbackDocument.builder().approvalNote("approvalNote").calculatedRatio(CalculatedRatio.builder().name("test").ratio(100f).minimum(50f).build()).build();
        feedbackDocumentRepository.save(test);
    }

    private CreditRequest createRandomCreditRequest(int i, Customer customer) {
        float totalAmount = (float)Math.floor(100 + Math.random() * (20000 - 100));
        float requestedAmount = (float)Math.floor(100 + Math.random() * (totalAmount - 100));
        Period period = Period.ofYears(Math.toIntExact((long)Math.floor(1 + Math.random() * (25 - 1))));
        InvestmentType investmentType = InvestmentType.values()[Math.toIntExact((long)Math.floor(0 + Math.random() * (InvestmentType.values().length - 0)))];
        return accountingService.evaluateCreditRequest(new CreditRequest("test " + i, totalAmount, requestedAmount, period, investmentType, customer), apiService.getCompanyInfoDto(customer.getCompanyNr()));
    }    
}
