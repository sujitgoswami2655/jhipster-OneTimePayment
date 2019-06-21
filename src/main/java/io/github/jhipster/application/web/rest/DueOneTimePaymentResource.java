package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.DueOneTimePayment;
import io.github.jhipster.application.repository.DueOneTimePaymentRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.DueOneTimePayment}.
 */
@RestController
@RequestMapping("/api")
public class DueOneTimePaymentResource {

    private final Logger log = LoggerFactory.getLogger(DueOneTimePaymentResource.class);

    private static final String ENTITY_NAME = "dueOneTimePayment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DueOneTimePaymentRepository dueOneTimePaymentRepository;

    public DueOneTimePaymentResource(DueOneTimePaymentRepository dueOneTimePaymentRepository) {
        this.dueOneTimePaymentRepository = dueOneTimePaymentRepository;
    }

    /**
     * {@code POST  /due-one-time-payments} : Create a new dueOneTimePayment.
     *
     * @param dueOneTimePayment the dueOneTimePayment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dueOneTimePayment, or with status {@code 400 (Bad Request)} if the dueOneTimePayment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/due-one-time-payments")
    public ResponseEntity<DueOneTimePayment> createDueOneTimePayment(@RequestBody DueOneTimePayment dueOneTimePayment) throws URISyntaxException {
        log.debug("REST request to save DueOneTimePayment : {}", dueOneTimePayment);
        if (dueOneTimePayment.getId() != null) {
            throw new BadRequestAlertException("A new dueOneTimePayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DueOneTimePayment result = dueOneTimePaymentRepository.save(dueOneTimePayment);
        return ResponseEntity.created(new URI("/api/due-one-time-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /due-one-time-payments} : Updates an existing dueOneTimePayment.
     *
     * @param dueOneTimePayment the dueOneTimePayment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dueOneTimePayment,
     * or with status {@code 400 (Bad Request)} if the dueOneTimePayment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dueOneTimePayment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/due-one-time-payments")
    public ResponseEntity<DueOneTimePayment> updateDueOneTimePayment(@RequestBody DueOneTimePayment dueOneTimePayment) throws URISyntaxException {
        log.debug("REST request to update DueOneTimePayment : {}", dueOneTimePayment);
        if (dueOneTimePayment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DueOneTimePayment result = dueOneTimePaymentRepository.save(dueOneTimePayment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dueOneTimePayment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /due-one-time-payments} : get all the dueOneTimePayments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dueOneTimePayments in body.
     */
    @GetMapping("/due-one-time-payments")
    public List<DueOneTimePayment> getAllDueOneTimePayments() {
        log.debug("REST request to get all DueOneTimePayments");
        return dueOneTimePaymentRepository.findAll();
    }

    /**
     * {@code GET  /due-one-time-payments/:id} : get the "id" dueOneTimePayment.
     *
     * @param id the id of the dueOneTimePayment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dueOneTimePayment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/due-one-time-payments/{id}")
    public ResponseEntity<DueOneTimePayment> getDueOneTimePayment(@PathVariable String id) {
        log.debug("REST request to get DueOneTimePayment : {}", id);
        Optional<DueOneTimePayment> dueOneTimePayment = dueOneTimePaymentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dueOneTimePayment);
    }

    /**
     * {@code DELETE  /due-one-time-payments/:id} : delete the "id" dueOneTimePayment.
     *
     * @param id the id of the dueOneTimePayment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/due-one-time-payments/{id}")
    public ResponseEntity<Void> deleteDueOneTimePayment(@PathVariable String id) {
        log.debug("REST request to delete DueOneTimePayment : {}", id);
        dueOneTimePaymentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
