package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PocOneTimePaymentApp;
import io.github.jhipster.application.domain.DueOneTimePayment;
import io.github.jhipster.application.repository.DueOneTimePaymentRepository;
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
 * Integration tests for the {@Link DueOneTimePaymentResource} REST controller.
 */
@SpringBootTest(classes = PocOneTimePaymentApp.class)
public class DueOneTimePaymentResourceIT {

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final Instant DEFAULT_PAYMENT_DUE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAYMENT_DUE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CONTRACTOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONTRACTOR_ID = "BBBBBBBBBB";

    @Autowired
    private DueOneTimePaymentRepository dueOneTimePaymentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restDueOneTimePaymentMockMvc;

    private DueOneTimePayment dueOneTimePayment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DueOneTimePaymentResource dueOneTimePaymentResource = new DueOneTimePaymentResource(dueOneTimePaymentRepository);
        this.restDueOneTimePaymentMockMvc = MockMvcBuilders.standaloneSetup(dueOneTimePaymentResource)
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
    public static DueOneTimePayment createEntity() {
        DueOneTimePayment dueOneTimePayment = new DueOneTimePayment()
            .amount(DEFAULT_AMOUNT)
            .paymentDueDate(DEFAULT_PAYMENT_DUE_DATE)
            .contractorID(DEFAULT_CONTRACTOR_ID);
        return dueOneTimePayment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DueOneTimePayment createUpdatedEntity() {
        DueOneTimePayment dueOneTimePayment = new DueOneTimePayment()
            .amount(UPDATED_AMOUNT)
            .paymentDueDate(UPDATED_PAYMENT_DUE_DATE)
            .contractorID(UPDATED_CONTRACTOR_ID);
        return dueOneTimePayment;
    }

    @BeforeEach
    public void initTest() {
        dueOneTimePaymentRepository.deleteAll();
        dueOneTimePayment = createEntity();
    }

    @Test
    public void createDueOneTimePayment() throws Exception {
        int databaseSizeBeforeCreate = dueOneTimePaymentRepository.findAll().size();

        // Create the DueOneTimePayment
        restDueOneTimePaymentMockMvc.perform(post("/api/due-one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dueOneTimePayment)))
            .andExpect(status().isCreated());

        // Validate the DueOneTimePayment in the database
        List<DueOneTimePayment> dueOneTimePaymentList = dueOneTimePaymentRepository.findAll();
        assertThat(dueOneTimePaymentList).hasSize(databaseSizeBeforeCreate + 1);
        DueOneTimePayment testDueOneTimePayment = dueOneTimePaymentList.get(dueOneTimePaymentList.size() - 1);
        assertThat(testDueOneTimePayment.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testDueOneTimePayment.getPaymentDueDate()).isEqualTo(DEFAULT_PAYMENT_DUE_DATE);
        assertThat(testDueOneTimePayment.getContractorID()).isEqualTo(DEFAULT_CONTRACTOR_ID);
    }

    @Test
    public void createDueOneTimePaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dueOneTimePaymentRepository.findAll().size();

        // Create the DueOneTimePayment with an existing ID
        dueOneTimePayment.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restDueOneTimePaymentMockMvc.perform(post("/api/due-one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dueOneTimePayment)))
            .andExpect(status().isBadRequest());

        // Validate the DueOneTimePayment in the database
        List<DueOneTimePayment> dueOneTimePaymentList = dueOneTimePaymentRepository.findAll();
        assertThat(dueOneTimePaymentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllDueOneTimePayments() throws Exception {
        // Initialize the database
        dueOneTimePaymentRepository.save(dueOneTimePayment);

        // Get all the dueOneTimePaymentList
        restDueOneTimePaymentMockMvc.perform(get("/api/due-one-time-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dueOneTimePayment.getId())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].paymentDueDate").value(hasItem(DEFAULT_PAYMENT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].contractorID").value(hasItem(DEFAULT_CONTRACTOR_ID.toString())));
    }
    
    @Test
    public void getDueOneTimePayment() throws Exception {
        // Initialize the database
        dueOneTimePaymentRepository.save(dueOneTimePayment);

        // Get the dueOneTimePayment
        restDueOneTimePaymentMockMvc.perform(get("/api/due-one-time-payments/{id}", dueOneTimePayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dueOneTimePayment.getId()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.paymentDueDate").value(DEFAULT_PAYMENT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.contractorID").value(DEFAULT_CONTRACTOR_ID.toString()));
    }

    @Test
    public void getNonExistingDueOneTimePayment() throws Exception {
        // Get the dueOneTimePayment
        restDueOneTimePaymentMockMvc.perform(get("/api/due-one-time-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDueOneTimePayment() throws Exception {
        // Initialize the database
        dueOneTimePaymentRepository.save(dueOneTimePayment);

        int databaseSizeBeforeUpdate = dueOneTimePaymentRepository.findAll().size();

        // Update the dueOneTimePayment
        DueOneTimePayment updatedDueOneTimePayment = dueOneTimePaymentRepository.findById(dueOneTimePayment.getId()).get();
        updatedDueOneTimePayment
            .amount(UPDATED_AMOUNT)
            .paymentDueDate(UPDATED_PAYMENT_DUE_DATE)
            .contractorID(UPDATED_CONTRACTOR_ID);

        restDueOneTimePaymentMockMvc.perform(put("/api/due-one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDueOneTimePayment)))
            .andExpect(status().isOk());

        // Validate the DueOneTimePayment in the database
        List<DueOneTimePayment> dueOneTimePaymentList = dueOneTimePaymentRepository.findAll();
        assertThat(dueOneTimePaymentList).hasSize(databaseSizeBeforeUpdate);
        DueOneTimePayment testDueOneTimePayment = dueOneTimePaymentList.get(dueOneTimePaymentList.size() - 1);
        assertThat(testDueOneTimePayment.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testDueOneTimePayment.getPaymentDueDate()).isEqualTo(UPDATED_PAYMENT_DUE_DATE);
        assertThat(testDueOneTimePayment.getContractorID()).isEqualTo(UPDATED_CONTRACTOR_ID);
    }

    @Test
    public void updateNonExistingDueOneTimePayment() throws Exception {
        int databaseSizeBeforeUpdate = dueOneTimePaymentRepository.findAll().size();

        // Create the DueOneTimePayment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDueOneTimePaymentMockMvc.perform(put("/api/due-one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dueOneTimePayment)))
            .andExpect(status().isBadRequest());

        // Validate the DueOneTimePayment in the database
        List<DueOneTimePayment> dueOneTimePaymentList = dueOneTimePaymentRepository.findAll();
        assertThat(dueOneTimePaymentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDueOneTimePayment() throws Exception {
        // Initialize the database
        dueOneTimePaymentRepository.save(dueOneTimePayment);

        int databaseSizeBeforeDelete = dueOneTimePaymentRepository.findAll().size();

        // Delete the dueOneTimePayment
        restDueOneTimePaymentMockMvc.perform(delete("/api/due-one-time-payments/{id}", dueOneTimePayment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DueOneTimePayment> dueOneTimePaymentList = dueOneTimePaymentRepository.findAll();
        assertThat(dueOneTimePaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DueOneTimePayment.class);
        DueOneTimePayment dueOneTimePayment1 = new DueOneTimePayment();
        dueOneTimePayment1.setId("id1");
        DueOneTimePayment dueOneTimePayment2 = new DueOneTimePayment();
        dueOneTimePayment2.setId(dueOneTimePayment1.getId());
        assertThat(dueOneTimePayment1).isEqualTo(dueOneTimePayment2);
        dueOneTimePayment2.setId("id2");
        assertThat(dueOneTimePayment1).isNotEqualTo(dueOneTimePayment2);
        dueOneTimePayment1.setId(null);
        assertThat(dueOneTimePayment1).isNotEqualTo(dueOneTimePayment2);
    }
}
