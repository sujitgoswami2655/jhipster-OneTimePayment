package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PocOneTimePaymentApp;
import io.github.jhipster.application.domain.WDContractor;
import io.github.jhipster.application.repository.WDContractorRepository;
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
 * Integration tests for the {@Link WDContractorResource} REST controller.
 */
@SpringBootTest(classes = PocOneTimePaymentApp.class)
public class WDContractorResourceIT {

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

    private static final String DEFAULT_WORKDAY_NO = "AAAAAAAAAA";
    private static final String UPDATED_WORKDAY_NO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTRACTOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONTRACTOR_ID = "BBBBBBBBBB";

    @Autowired
    private WDContractorRepository wDContractorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restWDContractorMockMvc;

    private WDContractor wDContractor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WDContractorResource wDContractorResource = new WDContractorResource(wDContractorRepository);
        this.restWDContractorMockMvc = MockMvcBuilders.standaloneSetup(wDContractorResource)
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
    public static WDContractor createEntity() {
        WDContractor wDContractor = new WDContractor()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .startDate(DEFAULT_START_DATE)
            .commissionPct(DEFAULT_COMMISSION_PCT)
            .workdayNo(DEFAULT_WORKDAY_NO)
            .contractorID(DEFAULT_CONTRACTOR_ID);
        return wDContractor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WDContractor createUpdatedEntity() {
        WDContractor wDContractor = new WDContractor()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .startDate(UPDATED_START_DATE)
            .commissionPct(UPDATED_COMMISSION_PCT)
            .workdayNo(UPDATED_WORKDAY_NO)
            .contractorID(UPDATED_CONTRACTOR_ID);
        return wDContractor;
    }

    @BeforeEach
    public void initTest() {
        wDContractorRepository.deleteAll();
        wDContractor = createEntity();
    }

    @Test
    public void createWDContractor() throws Exception {
        int databaseSizeBeforeCreate = wDContractorRepository.findAll().size();

        // Create the WDContractor
        restWDContractorMockMvc.perform(post("/api/wd-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wDContractor)))
            .andExpect(status().isCreated());

        // Validate the WDContractor in the database
        List<WDContractor> wDContractorList = wDContractorRepository.findAll();
        assertThat(wDContractorList).hasSize(databaseSizeBeforeCreate + 1);
        WDContractor testWDContractor = wDContractorList.get(wDContractorList.size() - 1);
        assertThat(testWDContractor.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testWDContractor.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testWDContractor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testWDContractor.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testWDContractor.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testWDContractor.getCommissionPct()).isEqualTo(DEFAULT_COMMISSION_PCT);
        assertThat(testWDContractor.getWorkdayNo()).isEqualTo(DEFAULT_WORKDAY_NO);
        assertThat(testWDContractor.getContractorID()).isEqualTo(DEFAULT_CONTRACTOR_ID);
    }

    @Test
    public void createWDContractorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wDContractorRepository.findAll().size();

        // Create the WDContractor with an existing ID
        wDContractor.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restWDContractorMockMvc.perform(post("/api/wd-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wDContractor)))
            .andExpect(status().isBadRequest());

        // Validate the WDContractor in the database
        List<WDContractor> wDContractorList = wDContractorRepository.findAll();
        assertThat(wDContractorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllWDContractors() throws Exception {
        // Initialize the database
        wDContractorRepository.save(wDContractor);

        // Get all the wDContractorList
        restWDContractorMockMvc.perform(get("/api/wd-contractors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wDContractor.getId())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].commissionPct").value(hasItem(DEFAULT_COMMISSION_PCT.intValue())))
            .andExpect(jsonPath("$.[*].workdayNo").value(hasItem(DEFAULT_WORKDAY_NO.toString())))
            .andExpect(jsonPath("$.[*].contractorID").value(hasItem(DEFAULT_CONTRACTOR_ID.toString())));
    }
    
    @Test
    public void getWDContractor() throws Exception {
        // Initialize the database
        wDContractorRepository.save(wDContractor);

        // Get the wDContractor
        restWDContractorMockMvc.perform(get("/api/wd-contractors/{id}", wDContractor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wDContractor.getId()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.commissionPct").value(DEFAULT_COMMISSION_PCT.intValue()))
            .andExpect(jsonPath("$.workdayNo").value(DEFAULT_WORKDAY_NO.toString()))
            .andExpect(jsonPath("$.contractorID").value(DEFAULT_CONTRACTOR_ID.toString()));
    }

    @Test
    public void getNonExistingWDContractor() throws Exception {
        // Get the wDContractor
        restWDContractorMockMvc.perform(get("/api/wd-contractors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateWDContractor() throws Exception {
        // Initialize the database
        wDContractorRepository.save(wDContractor);

        int databaseSizeBeforeUpdate = wDContractorRepository.findAll().size();

        // Update the wDContractor
        WDContractor updatedWDContractor = wDContractorRepository.findById(wDContractor.getId()).get();
        updatedWDContractor
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .startDate(UPDATED_START_DATE)
            .commissionPct(UPDATED_COMMISSION_PCT)
            .workdayNo(UPDATED_WORKDAY_NO)
            .contractorID(UPDATED_CONTRACTOR_ID);

        restWDContractorMockMvc.perform(put("/api/wd-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWDContractor)))
            .andExpect(status().isOk());

        // Validate the WDContractor in the database
        List<WDContractor> wDContractorList = wDContractorRepository.findAll();
        assertThat(wDContractorList).hasSize(databaseSizeBeforeUpdate);
        WDContractor testWDContractor = wDContractorList.get(wDContractorList.size() - 1);
        assertThat(testWDContractor.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testWDContractor.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testWDContractor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testWDContractor.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testWDContractor.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testWDContractor.getCommissionPct()).isEqualTo(UPDATED_COMMISSION_PCT);
        assertThat(testWDContractor.getWorkdayNo()).isEqualTo(UPDATED_WORKDAY_NO);
        assertThat(testWDContractor.getContractorID()).isEqualTo(UPDATED_CONTRACTOR_ID);
    }

    @Test
    public void updateNonExistingWDContractor() throws Exception {
        int databaseSizeBeforeUpdate = wDContractorRepository.findAll().size();

        // Create the WDContractor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWDContractorMockMvc.perform(put("/api/wd-contractors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wDContractor)))
            .andExpect(status().isBadRequest());

        // Validate the WDContractor in the database
        List<WDContractor> wDContractorList = wDContractorRepository.findAll();
        assertThat(wDContractorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteWDContractor() throws Exception {
        // Initialize the database
        wDContractorRepository.save(wDContractor);

        int databaseSizeBeforeDelete = wDContractorRepository.findAll().size();

        // Delete the wDContractor
        restWDContractorMockMvc.perform(delete("/api/wd-contractors/{id}", wDContractor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<WDContractor> wDContractorList = wDContractorRepository.findAll();
        assertThat(wDContractorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WDContractor.class);
        WDContractor wDContractor1 = new WDContractor();
        wDContractor1.setId("id1");
        WDContractor wDContractor2 = new WDContractor();
        wDContractor2.setId(wDContractor1.getId());
        assertThat(wDContractor1).isEqualTo(wDContractor2);
        wDContractor2.setId("id2");
        assertThat(wDContractor1).isNotEqualTo(wDContractor2);
        wDContractor1.setId(null);
        assertThat(wDContractor1).isNotEqualTo(wDContractor2);
    }
}
