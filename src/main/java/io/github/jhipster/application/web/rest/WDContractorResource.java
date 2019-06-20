package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.WDContractor;
import io.github.jhipster.application.repository.WDContractorRepository;
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
 * REST controller for managing {@link io.github.jhipster.application.domain.WDContractor}.
 */
@RestController
@RequestMapping("/api")
public class WDContractorResource {

    private final Logger log = LoggerFactory.getLogger(WDContractorResource.class);

    private static final String ENTITY_NAME = "wDContractor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WDContractorRepository wDContractorRepository;

    public WDContractorResource(WDContractorRepository wDContractorRepository) {
        this.wDContractorRepository = wDContractorRepository;
    }

    /**
     * {@code POST  /wd-contractors} : Create a new wDContractor.
     *
     * @param wDContractor the wDContractor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new wDContractor, or with status {@code 400 (Bad Request)} if the wDContractor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/wd-contractors")
    public ResponseEntity<WDContractor> createWDContractor(@RequestBody WDContractor wDContractor) throws URISyntaxException {
        log.debug("REST request to save WDContractor : {}", wDContractor);
        if (wDContractor.getId() != null) {
            throw new BadRequestAlertException("A new wDContractor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WDContractor result = wDContractorRepository.save(wDContractor);
        return ResponseEntity.created(new URI("/api/wd-contractors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /wd-contractors} : Updates an existing wDContractor.
     *
     * @param wDContractor the wDContractor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wDContractor,
     * or with status {@code 400 (Bad Request)} if the wDContractor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the wDContractor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/wd-contractors")
    public ResponseEntity<WDContractor> updateWDContractor(@RequestBody WDContractor wDContractor) throws URISyntaxException {
        log.debug("REST request to update WDContractor : {}", wDContractor);
        if (wDContractor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WDContractor result = wDContractorRepository.save(wDContractor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wDContractor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /wd-contractors} : get all the wDContractors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wDContractors in body.
     */
    @GetMapping("/wd-contractors")
    public List<WDContractor> getAllWDContractors() {
        log.debug("REST request to get all WDContractors");
        return wDContractorRepository.findAll();
    }

    /**
     * {@code GET  /wd-contractors/:id} : get the "id" wDContractor.
     *
     * @param id the id of the wDContractor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wDContractor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/wd-contractors/{id}")
    public ResponseEntity<WDContractor> getWDContractor(@PathVariable String id) {
        log.debug("REST request to get WDContractor : {}", id);
        Optional<WDContractor> wDContractor = wDContractorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(wDContractor);
    }

    /**
     * {@code DELETE  /wd-contractors/:id} : delete the "id" wDContractor.
     *
     * @param id the id of the wDContractor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/wd-contractors/{id}")
    public ResponseEntity<Void> deleteWDContractor(@PathVariable String id) {
        log.debug("REST request to delete WDContractor : {}", id);
        wDContractorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
