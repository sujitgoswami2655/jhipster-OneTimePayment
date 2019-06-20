package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.OneTimePayment;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the OneTimePayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OneTimePaymentRepository extends MongoRepository<OneTimePayment, String> {

}
