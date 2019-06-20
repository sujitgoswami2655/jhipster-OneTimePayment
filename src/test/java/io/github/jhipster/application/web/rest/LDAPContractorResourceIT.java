package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PocOneTimePaymentApp;
import io.github.jhipster.application.domain.LDAPContractor;
import io.github.jhipster.application.repository.LDAPContractorRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link LDAPContractorResource} REST controller.
 */
@SpringBootTest(classes = PocOneTimePaymentApp.class)
public class LDAPContractorResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_COMMISSION_PCT = 1L;
    private static final Long UPDATED_COMMISSION_PCT = 2L;

    private static final String DEFAULT_CONTRACTOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONTRACTOR_ID = "BBBBBBBBBB";

    @Autowired
    private LDAPContractorRepository lDAPContractorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restLDAPContractorMockMvc;

    private LDAPContractor lDAPContractor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LDAPContractorResource lDAPContractorResource = new LDAPContractorResource(lDAPContractorRepository);
        this.restLDAPContractorMockMvc = MockMvcBuilders.standaloneSetup(lDAPContractorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LDAPContractor createEntity() {
        LDAPContractor lDAPContractor = new LDAPContractor()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .startDate(DEFAULT_START_DATE)
            .commissionPct(DEFAULT_COMMISSION_PCT)
            .contractorID(DEFAULT_CONTRACTOR_ID);
        return lDAPContractor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LDAPContractor createUpdatedEntity() {
        LDAPContractor lDAPContractor = new LDAPContractor()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .startDate(UPDATED_START_DATE)
            .commissionPct(UPDATED_COMMISSION_PCT)
            .contractorID(UPDATED_CONTRACTOR_ID);
        return lDAPContractor;
    }

    @BeforeEach
    public void initTest() {
        lDAPContractorRepository.deleteAll();
        lDAPContractor = createEntity();
    }

    @Test
    public void createLDAPContractor() throws Exception {
        int databaseSizeBeforeCreate = lDAPContractorRepository.findAll().size();

        // Create the LDAPContractor
        restLDAPContractorMockMvc.perform(post("/api/ldap-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lDAPContractor)))
            .andExpect(status().isCreated());

        // Validate the LDAPContractor in the database
        List<LDAPContractor> lDAPContractorList = lDAPContractorRepository.findAll();
        assertThat(lDAPContractorList).hasSize(databaseSizeBeforeCreate + 1);
        LDAPContractor testLDAPContractor = lDAPContractorList.get(lDAPContractorList.size() - 1);
        assertThat(testLDAPContractor.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testLDAPContractor.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testLDAPContractor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testLDAPContractor.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testLDAPContractor.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testLDAPContractor.getCommissionPct()).isEqualTo(DEFAULT_COMMISSION_PCT);
        assertThat(testLDAPContractor.getContractorID()).isEqualTo(DEFAULT_CONTRACTOR_ID);
    }

    @Test
    public void createLDAPContractorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lDAPContractorRepository.findAll().size();

        // Create the LDAPContractor with an existing ID
        lDAPContractor.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLDAPContractorMockMvc.perform(post("/api/ldap-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lDAPContractor)))
            .andExpect(status().isBadRequest());

        // Validate the LDAPContractor in the database
        List<LDAPContractor> lDAPContractorList = lDAPContractorRepository.findAll();
        assertThat(lDAPContractorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllLDAPContractors() throws Exception {
        // Initialize the database
        lDAPContractorRepository.save(lDAPContractor);

        // Get all the lDAPContractorList
        restLDAPContractorMockMvc.perform(get("/api/ldap-contractors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lDAPContractor.getId())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].commissionPct").value(hasItem(DEFAULT_COMMISSION_PCT.intValue())))
            .andExpect(jsonPath("$.[*].contractorID").value(hasItem(DEFAULT_CONTRACTOR_ID.toString())));
    }
    
    @Test
    public void getLDAPContractor() throws Exception {
        // Initialize the database
        lDAPContractorRepository.save(lDAPContractor);

        // Get the lDAPContractor
        restLDAPContractorMockMvc.perform(get("/api/ldap-contractors/{id}", lDAPContractor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lDAPContractor.getId()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.commissionPct").value(DEFAULT_COMMISSION_PCT.intValue()))
            .andExpect(jsonPath("$.contractorID").value(DEFAULT_CONTRACTOR_ID.toString()));
    }

    @Test
    public void getNonExistingLDAPContractor() throws Exception {
        // Get the lDAPContractor
        restLDAPContractorMockMvc.perform(get("/api/ldap-contractors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLDAPContractor() throws Exception {
        // Initialize the database
        lDAPContractorRepository.save(lDAPContractor);

        int databaseSizeBeforeUpdate = lDAPContractorRepository.findAll().size();

        // Update the lDAPContractor
        LDAPContractor updatedLDAPContractor = lDAPContractorRepository.findById(lDAPContractor.getId()).get();
        updatedLDAPContractor
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .startDate(UPDATED_START_DATE)
            .commissionPct(UPDATED_COMMISSION_PCT)
            .contractorID(UPDATED_CONTRACTOR_ID);

        restLDAPContractorMockMvc.perform(put("/api/ldap-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLDAPContractor)))
            .andExpect(status().isOk());

        // Validate the LDAPContractor in the database
        List<LDAPContractor> lDAPContractorList = lDAPContractorRepository.findAll();
        assertThat(lDAPContractorList).hasSize(databaseSizeBeforeUpdate);
        LDAPContractor testLDAPContractor = lDAPContractorList.get(lDAPContractorList.size() - 1);
        assertThat(testLDAPContractor.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testLDAPContractor.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testLDAPContractor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testLDAPContractor.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testLDAPContractor.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testLDAPContractor.getCommissionPct()).isEqualTo(UPDATED_COMMISSION_PCT);
        assertThat(testLDAPContractor.getContractorID()).isEqualTo(UPDATED_CONTRACTOR_ID);
    }

    @Test
    public void updateNonExistingLDAPContractor() throws Exception {
        int databaseSizeBeforeUpdate = lDAPContractorRepository.findAll().size();

        // Create the LDAPContractor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLDAPContractorMockMvc.perform(put("/api/ldap-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lDAPContractor)))
            .andExpect(status().isBadRequest());

        // Validate the LDAPContractor in the database
        List<LDAPContractor> lDAPContractorList = lDAPContractorRepository.findAll();
        assertThat(lDAPContractorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLDAPContractor() throws Exception {
        // Initialize the database
        lDAPContractorRepository.save(lDAPContractor);

        int databaseSizeBeforeDelete = lDAPContractorRepository.findAll().size();

        // Delete the lDAPContractor
        restLDAPContractorMockMvc.perform(delete("/api/ldap-contractors/{id}", lDAPContractor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<LDAPContractor> lDAPContractorList = lDAPContractorRepository.findAll();
        assertThat(lDAPContractorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LDAPContractor.class);
        LDAPContractor lDAPContractor1 = new LDAPContractor();
        lDAPContractor1.setId("id1");
        LDAPContractor lDAPContractor2 = new LDAPContractor();
        lDAPContractor2.setId(lDAPContractor1.getId());
        assertThat(lDAPContractor1).isEqualTo(lDAPContractor2);
        lDAPContractor2.setId("id2");
        assertThat(lDAPContractor1).isNotEqualTo(lDAPContractor2);
        lDAPContractor1.setId(null);
        assertThat(lDAPContractor1).isNotEqualTo(lDAPContractor2);
    }
}
