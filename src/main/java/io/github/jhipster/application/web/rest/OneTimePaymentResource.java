package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.OneTimePayment;
import io.github.jhipster.application.repository.OneTimePaymentRepository;
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
 * REST controller for managing {@link io.github.jhipster.application.domain.OneTimePayment}.
 */
@RestController
@RequestMapping("/api")
public class OneTimePaymentResource {

    private final Logger log = LoggerFactory.getLogger(OneTimePaymentResource.class);

    private static final String ENTITY_NAME = "oneTimePayment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OneTimePaymentRepository oneTimePaymentRepository;

    public OneTimePaymentResource(OneTimePaymentRepository oneTimePaymentRepository) {
        this.oneTimePaymentRepository = oneTimePaymentRepository;
    }

    /**
     * {@code POST  /one-time-payments} : Create a new oneTimePayment.
     *
     * @param oneTimePayment the oneTimePayment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oneTimePayment, or with status {@code 400 (Bad Request)} if the oneTimePayment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/one-time-payments")
    public ResponseEntity<OneTimePayment> createOneTimePayment(@RequestBody OneTimePayment oneTimePayment) throws URISyntaxException {
        log.debug("REST request to save OneTimePayment : {}", oneTimePayment);
        if (oneTimePayment.getId() != null) {
            throw new BadRequestAlertException("A new oneTimePayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OneTimePayment result = oneTimePaymentRepository.save(oneTimePayment);
        return ResponseEntity.created(new URI("/api/one-time-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /one-time-payments} : Updates an existing oneTimePayment.
     *
     * @param oneTimePayment the oneTimePayment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oneTimePayment,
     * or with status {@code 400 (Bad Request)} if the oneTimePayment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oneTimePayment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/one-time-payments")
    public ResponseEntity<OneTimePayment> updateOneTimePayment(@RequestBody OneTimePayment oneTimePayment) throws URISyntaxException {
        log.debug("REST request to update OneTimePayment : {}", oneTimePayment);
        if (oneTimePayment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OneTimePayment result = oneTimePaymentRepository.save(oneTimePayment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, oneTimePayment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /one-time-payments} : get all the oneTimePayments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of oneTimePayments in body.
     */
    @GetMapping("/one-time-payments")
    public List<OneTimePayment> getAllOneTimePayments() {
        log.debug("REST request to get all OneTimePayments");
        return oneTimePaymentRepository.findAll();
    }

    /**
     * {@code GET  /one-time-payments/:id} : get the "id" oneTimePayment.
     *
     * @param id the id of the oneTimePayment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oneTimePayment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/one-time-payments/{id}")
    public ResponseEntity<OneTimePayment> getOneTimePayment(@PathVariable String id) {
        log.debug("REST request to get OneTimePayment : {}", id);
        Optional<OneTimePayment> oneTimePayment = oneTimePaymentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oneTimePayment);
    }

    /**
     * {@code DELETE  /one-time-payments/:id} : delete the "id" oneTimePayment.
     *
     * @param id the id of the oneTimePayment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/one-time-payments/{id}")
    public ResponseEntity<Void> deleteOneTimePayment(@PathVariable String id) {
        log.debug("REST request to delete OneTimePayment : {}", id);
        oneTimePaymentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
