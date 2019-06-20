package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.LDAPContractor;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the LDAPContractor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LDAPContractorRepository extends MongoRepository<LDAPContractor, String> {

}
