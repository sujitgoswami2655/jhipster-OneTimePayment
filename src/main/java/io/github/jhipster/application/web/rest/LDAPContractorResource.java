package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.LDAPContractor;
import io.github.jhipster.application.repository.LDAPContractorRepository;
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
 * REST controller for managing {@link io.github.jhipster.application.domain.LDAPContractor}.
 */
@RestController
@RequestMapping("/api")
public class LDAPContractorResource {

    private final Logger log = LoggerFactory.getLogger(LDAPContractorResource.class);

    private static final String ENTITY_NAME = "lDAPContractor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LDAPContractorRepository lDAPContractorRepository;

    public LDAPContractorResource(LDAPContractorRepository lDAPContractorRepository) {
        this.lDAPContractorRepository = lDAPContractorRepository;
    }

    /**
     * {@code POST  /ldap-contractors} : Create a new lDAPContractor.
     *
     * @param lDAPContractor the lDAPContractor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lDAPContractor, or with status {@code 400 (Bad Request)} if the lDAPContractor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ldap-contractors")
    public ResponseEntity<LDAPContractor> createLDAPContractor(@RequestBody LDAPContractor lDAPContractor) throws URISyntaxException {
        log.debug("REST request to save LDAPContractor : {}", lDAPContractor);
        if (lDAPContractor.getId() != null) {
            throw new BadRequestAlertException("A new lDAPContractor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LDAPContractor result = lDAPContractorRepository.save(lDAPContractor);
        return ResponseEntity.created(new URI("/api/ldap-contractors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ldap-contractors} : Updates an existing lDAPContractor.
     *
     * @param lDAPContractor the lDAPContractor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lDAPContractor,
     * or with status {@code 400 (Bad Request)} if the lDAPContractor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lDAPContractor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ldap-contractors")
    public ResponseEntity<LDAPContractor> updateLDAPContractor(@RequestBody LDAPContractor lDAPContractor) throws URISyntaxException {
        log.debug("REST request to update LDAPContractor : {}", lDAPContractor);
        if (lDAPContractor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LDAPContractor result = lDAPContractorRepository.save(lDAPContractor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lDAPContractor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ldap-contractors} : get all the lDAPContractors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lDAPContractors in body.
     */
    @GetMapping("/ldap-contractors")
    public List<LDAPContractor> getAllLDAPContractors() {
        log.debug("REST request to get all LDAPContractors");
        return lDAPContractorRepository.findAll();
    }

    /**
     * {@code GET  /ldap-contractors/:id} : get the "id" lDAPContractor.
     *
     * @param id the id of the lDAPContractor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lDAPContractor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ldap-contractors/{id}")
    public ResponseEntity<LDAPContractor> getLDAPContractor(@PathVariable String id) {
        log.debug("REST request to get LDAPContractor : {}", id);
        Optional<LDAPContractor> lDAPContractor = lDAPContractorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lDAPContractor);
    }

    /**
     * {@code DELETE  /ldap-contractors/:id} : delete the "id" lDAPContractor.
     *
     * @param id the id of the lDAPContractor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ldap-contractors/{id}")
    public ResponseEntity<Void> deleteLDAPContractor(@PathVariable String id) {
        log.debug("REST request to delete LDAPContractor : {}", id);
        lDAPContractorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
