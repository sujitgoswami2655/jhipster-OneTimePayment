package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.PocOneTimePaymentApp;
import io.github.jhipster.application.domain.OneTimePayment;
import io.github.jhipster.application.repository.OneTimePaymentRepository;
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
 * Integration tests for the {@Link OneTimePaymentResource} REST controller.
 */
@SpringBootTest(classes = PocOneTimePaymentApp.class)
public class OneTimePaymentResourceIT {

    private static final String DEFAULT_AMOUNT = "AAAAAAAAAA";
    private static final String UPDATED_AMOUNT = "BBBBBBBBBB";

    private static final Instant DEFAULT_PAYMENT_DUE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAYMENT_DUE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CONTRACTOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_CONTRACTOR_ID = "BBBBBBBBBB";

    @Autowired
    private OneTimePaymentRepository oneTimePaymentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restOneTimePaymentMockMvc;

    private OneTimePayment oneTimePayment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OneTimePaymentResource oneTimePaymentResource = new OneTimePaymentResource(oneTimePaymentRepository);
        this.restOneTimePaymentMockMvc = MockMvcBuilders.standaloneSetup(oneTimePaymentResource)
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
    public static OneTimePayment createEntity() {
        OneTimePayment oneTimePayment = new OneTimePayment()
            .amount(DEFAULT_AMOUNT)
            .paymentDue(DEFAULT_PAYMENT_DUE)
            .contractorID(DEFAULT_CONTRACTOR_ID);
        return oneTimePayment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OneTimePayment createUpdatedEntity() {
        OneTimePayment oneTimePayment = new OneTimePayment()
            .amount(UPDATED_AMOUNT)
            .paymentDue(UPDATED_PAYMENT_DUE)
            .contractorID(UPDATED_CONTRACTOR_ID);
        return oneTimePayment;
    }

    @BeforeEach
    public void initTest() {
        oneTimePaymentRepository.deleteAll();
        oneTimePayment = createEntity();
    }

    @Test
    public void createOneTimePayment() throws Exception {
        int databaseSizeBeforeCreate = oneTimePaymentRepository.findAll().size();

        // Create the OneTimePayment
        restOneTimePaymentMockMvc.perform(post("/api/one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(oneTimePayment)))
            .andExpect(status().isCreated());

        // Validate the OneTimePayment in the database
        List<OneTimePayment> oneTimePaymentList = oneTimePaymentRepository.findAll();
        assertThat(oneTimePaymentList).hasSize(databaseSizeBeforeCreate + 1);
        OneTimePayment testOneTimePayment = oneTimePaymentList.get(oneTimePaymentList.size() - 1);
        assertThat(testOneTimePayment.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testOneTimePayment.getPaymentDue()).isEqualTo(DEFAULT_PAYMENT_DUE);
        assertThat(testOneTimePayment.getContractorID()).isEqualTo(DEFAULT_CONTRACTOR_ID);
    }

    @Test
    public void createOneTimePaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = oneTimePaymentRepository.findAll().size();

        // Create the OneTimePayment with an existing ID
        oneTimePayment.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restOneTimePaymentMockMvc.perform(post("/api/one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(oneTimePayment)))
            .andExpect(status().isBadRequest());

        // Validate the OneTimePayment in the database
        List<OneTimePayment> oneTimePaymentList = oneTimePaymentRepository.findAll();
        assertThat(oneTimePaymentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllOneTimePayments() throws Exception {
        // Initialize the database
        oneTimePaymentRepository.save(oneTimePayment);

        // Get all the oneTimePaymentList
        restOneTimePaymentMockMvc.perform(get("/api/one-time-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oneTimePayment.getId())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.toString())))
            .andExpect(jsonPath("$.[*].paymentDue").value(hasItem(DEFAULT_PAYMENT_DUE.toString())))
            .andExpect(jsonPath("$.[*].contractorID").value(hasItem(DEFAULT_CONTRACTOR_ID.toString())));
    }
    
    @Test
    public void getOneTimePayment() throws Exception {
        // Initialize the database
        oneTimePaymentRepository.save(oneTimePayment);

        // Get the oneTimePayment
        restOneTimePaymentMockMvc.perform(get("/api/one-time-payments/{id}", oneTimePayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(oneTimePayment.getId()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.toString()))
            .andExpect(jsonPath("$.paymentDue").value(DEFAULT_PAYMENT_DUE.toString()))
            .andExpect(jsonPath("$.contractorID").value(DEFAULT_CONTRACTOR_ID.toString()));
    }

    @Test
    public void getNonExistingOneTimePayment() throws Exception {
        // Get the oneTimePayment
        restOneTimePaymentMockMvc.perform(get("/api/one-time-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateOneTimePayment() throws Exception {
        // Initialize the database
        oneTimePaymentRepository.save(oneTimePayment);

        int databaseSizeBeforeUpdate = oneTimePaymentRepository.findAll().size();

        // Update the oneTimePayment
        OneTimePayment updatedOneTimePayment = oneTimePaymentRepository.findById(oneTimePayment.getId()).get();
        updatedOneTimePayment
            .amount(UPDATED_AMOUNT)
            .paymentDue(UPDATED_PAYMENT_DUE)
            .contractorID(UPDATED_CONTRACTOR_ID);

        restOneTimePaymentMockMvc.perform(put("/api/one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOneTimePayment)))
            .andExpect(status().isOk());

        // Validate the OneTimePayment in the database
        List<OneTimePayment> oneTimePaymentList = oneTimePaymentRepository.findAll();
        assertThat(oneTimePaymentList).hasSize(databaseSizeBeforeUpdate);
        OneTimePayment testOneTimePayment = oneTimePaymentList.get(oneTimePaymentList.size() - 1);
        assertThat(testOneTimePayment.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testOneTimePayment.getPaymentDue()).isEqualTo(UPDATED_PAYMENT_DUE);
        assertThat(testOneTimePayment.getContractorID()).isEqualTo(UPDATED_CONTRACTOR_ID);
    }

    @Test
    public void updateNonExistingOneTimePayment() throws Exception {
        int databaseSizeBeforeUpdate = oneTimePaymentRepository.findAll().size();

        // Create the OneTimePayment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOneTimePaymentMockMvc.perform(put("/api/one-time-payments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(oneTimePayment)))
            .andExpect(status().isBadRequest());

        // Validate the OneTimePayment in the database
        List<OneTimePayment> oneTimePaymentList = oneTimePaymentRepository.findAll();
        assertThat(oneTimePaymentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteOneTimePayment() throws Exception {
        // Initialize the database
        oneTimePaymentRepository.save(oneTimePayment);

        int databaseSizeBeforeDelete = oneTimePaymentRepository.findAll().size();

        // Delete the oneTimePayment
        restOneTimePaymentMockMvc.perform(delete("/api/one-time-payments/{id}", oneTimePayment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<OneTimePayment> oneTimePaymentList = oneTimePaymentRepository.findAll();
        assertThat(oneTimePaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OneTimePayment.class);
        OneTimePayment oneTimePayment1 = new OneTimePayment();
        oneTimePayment1.setId("id1");
        OneTimePayment oneTimePayment2 = new OneTimePayment();
        oneTimePayment2.setId(oneTimePayment1.getId());
        assertThat(oneTimePayment1).isEqualTo(oneTimePayment2);
        oneTimePayment2.setId("id2");
        assertThat(oneTimePayment1).isNotEqualTo(oneTimePayment2);
        oneTimePayment1.setId(null);
        assertThat(oneTimePayment1).isNotEqualTo(oneTimePayment2);
    }
}
