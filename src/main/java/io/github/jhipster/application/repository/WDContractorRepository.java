package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.WDContractor;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the WDContractor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WDContractorRepository extends MongoRepository<WDContractor, String> {

}
