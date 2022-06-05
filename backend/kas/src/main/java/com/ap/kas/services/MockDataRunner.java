package com.ap.kas.services;

import java.time.Period;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

import com.ap.kas.config.Profiles;
import com.ap.kas.models.BlackListEntry;
import com.ap.kas.models.CreditRequest;
import com.ap.kas.models.Customer;
import com.ap.kas.models.Employee;
import com.ap.kas.models.InvestmentType;
import com.ap.kas.models.Role;
import com.ap.kas.models.WhiteListEntry;
import com.ap.kas.repositories.BlackListRepository;
import com.ap.kas.repositories.CreditRequestRepository;
import com.ap.kas.repositories.CustomerRepository;
import com.ap.kas.repositories.EmployeeRepository;
import com.ap.kas.repositories.WhiteListRepository;
import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
/**
 * This class is used to create and randomly generate data for the purpose of testing the  application
 */
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
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AccountingService accountingService;

    @Autowired
    private KruispuntDBApiService apiService;
  
    @Autowired 
    private WhiteListRepository whiteListRepository;

    @Autowired
    private BlackListRepository blackListRepository;

    Faker faker = new Faker(new Locale("nl-BE"));
    FakeValuesService fakeValuesService = new FakeValuesService(new Locale("nl-BE"), new RandomService());

    
    /** 
     * Creates fake data for the purpose of testing the application. Creates: Users (both employee and customers with auto-generated names and emails), White and Blacklist entries, CreditRequests
     * @param args
     * @throws Exception
     */
    @Override
    public void run(String... args) throws Exception {

        customerRepository.deleteAll();
        Customer customer1 = new Customer(faker.name().fullName(), faker.internet().emailAddress(), true, passwordEncoder.encode(new StringBuffer("customer1")), "1234567890");
        customerRepository.save(customer1);
        Customer customer2 = new Customer(faker.name().fullName(), faker.internet().emailAddress(), true, passwordEncoder.encode(new StringBuffer("customer2")), "0898092925");
        customerRepository.save(customer2);
        Customer customer3 = new Customer(faker.name().fullName(), faker.internet().emailAddress(), true, passwordEncoder.encode(new StringBuffer("customer3")), "1483476443");
        customerRepository.save(customer3);
        customerRepository.findAll().forEach(cu -> logger.info("{}", cu));

        employeeRepository.deleteAll();
        Employee employee = new Employee(faker.name().fullName(), "employee@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee.addRole(Role.ADMINISTRATOR);
        employee.addRole(Role.KREDIET_BEOORDELAAR);
        employee.addRole(Role.COMPLIANCE);
        employee.addRole(Role.COMMERCIELE_DIRECTIE);
        employee.addRole(Role.KANTOOR_MEDEWERKER);
        employeeRepository.save(employee);
        Employee employee1 = new Employee(faker.name().fullName(), "employee1@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee1.addRole(Role.ADMINISTRATOR);
        employeeRepository.save(employee1);
        Employee employee2 = new Employee(faker.name().fullName(), "employee2@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee2.addRole(Role.KREDIET_BEOORDELAAR);
        employeeRepository.save(employee2);
        Employee employee3 = new Employee(faker.name().fullName(), "employee3@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee3.addRole(Role.COMPLIANCE);
        employeeRepository.save(employee3);
        Employee employee4 = new Employee(faker.name().fullName(), "employee4@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee4.addRole(Role.COMMERCIELE_DIRECTIE);
        employeeRepository.save(employee4);
        Employee employee5 = new Employee("employee5", "employee5@gmail.com", true, passwordEncoder.encode(new StringBuffer("employee")));
        employee5.addRole(Role.KANTOOR_MEDEWERKER);
        employeeRepository.save(employee5);
        employeeRepository.findAll().forEach(em -> logger.info("{}", em));

        WhiteListEntry whiteListEntry1 = new WhiteListEntry("1234567");
        WhiteListEntry whiteListEntry2 = new WhiteListEntry("8910112");
        WhiteListEntry whiteListEntry3 = new WhiteListEntry("6166");
        whiteListRepository.save(whiteListEntry1);
        whiteListRepository.save(whiteListEntry2);
        whiteListRepository.save(whiteListEntry3);
        whiteListRepository.findAll().forEach(entry -> logger.info("{}", entry));


        BlackListEntry blackListEntry1 = new BlackListEntry("6578423");
        BlackListEntry blackListEntry2 = new BlackListEntry("1563987");
        BlackListEntry blackListEntry3 = new BlackListEntry("906");
        blackListRepository.save(blackListEntry1);
        blackListRepository.save(blackListEntry2);
        blackListRepository.save(blackListEntry3);
        blackListRepository.findAll().forEach(entry -> logger.info("{}", entry));

        creditRequestRepository.deleteAll();
        List<CreditRequest> creditRequests = new LinkedList<CreditRequest>() {{
            List<Customer> customers = customerRepository.findAll();
            for (int i = 0; i < 30; i++) {
                add(createRandomCreditRequest(i + 1, (customers.get(i % customers.size()))));
            }
        }};

        creditRequestRepository.saveAll(creditRequests);

        creditRequestRepository.findAll().forEach(cr -> logger.info("{}\n", cr));
    }

    
    /** 
     * Creates a credit request with random values for the given Customer and evaluates this credit request
     * @param i
     * @param customer - The given customer
     * @return CreditRequest - The created and evaluated credit request
     */
    private CreditRequest createRandomCreditRequest(int i, Customer customer) {
        float financedAmount = randomFloat(4, 6);
        float totalAmount = Float.sum(randomFloat(5, 7), financedAmount);
        Period period = Period.ofYears(Math.toIntExact((long)Math.floor(1 + Math.random() * (25 - 1))));
        InvestmentType investmentType = InvestmentType.values()[Math.toIntExact((long)Math.floor(0 + Math.random() * (InvestmentType.values().length - 0)))];
        return accountingService.evaluateCreditRequest(new CreditRequest(faker.company().bs(), totalAmount, financedAmount, period, investmentType, customer), apiService.getCompanyInfoDto(customer.getCompanyNr()));
    }    

    
    /** 
     * Generates a random float value between the bounds of the given min and max values
     * @param min - The minimum value
     * @param max - The maximum value
     * @return float - The generated float value
     */
    public float randomFloat(int min, int max) {
        return Float.parseFloat(fakeValuesService.numerify(fakeValuesService.regexify(String.format("[#]{%d,%d}\\.[#]{2}", min, max))));
    }
}
