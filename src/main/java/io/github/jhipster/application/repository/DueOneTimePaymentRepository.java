package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.DueOneTimePayment;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the DueOneTimePayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DueOneTimePaymentRepository extends MongoRepository<DueOneTimePayment, String> {

}
