package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DueOneTimePayment.
 */
@Document(collection = "due_one_time_payment")
public class DueOneTimePayment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("amount")
    private Double amount;

    @Field("payment_due_date")
    private Instant paymentDueDate;

    @Field("contractor_id")
    private String contractorID;

    @DBRef
    @Field("contractorID")
    @JsonIgnoreProperties("contractorIDS")
    private WDContractor contractorID;

    @DBRef
    @Field("contractorID")
    @JsonIgnoreProperties("contractorIDS")
    private LDAPContractor contractorID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public DueOneTimePayment amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Instant getPaymentDueDate() {
        return paymentDueDate;
    }

    public DueOneTimePayment paymentDueDate(Instant paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
        return this;
    }

    public void setPaymentDueDate(Instant paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
    }

    public String getContractorID() {
        return contractorID;
    }

    public DueOneTimePayment contractorID(String contractorID) {
        this.contractorID = contractorID;
        return this;
    }

    public void setContractorID(String contractorID) {
        this.contractorID = contractorID;
    }

    public WDContractor getContractorID() {
        return contractorID;
    }

    public DueOneTimePayment contractorID(WDContractor wDContractor) {
        this.contractorID = wDContractor;
        return this;
    }

    public void setContractorID(WDContractor wDContractor) {
        this.contractorID = wDContractor;
    }

    public LDAPContractor getContractorID() {
        return contractorID;
    }

    public DueOneTimePayment contractorID(LDAPContractor lDAPContractor) {
        this.contractorID = lDAPContractor;
        return this;
    }

    public void setContractorID(LDAPContractor lDAPContractor) {
        this.contractorID = lDAPContractor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DueOneTimePayment)) {
            return false;
        }
        return id != null && id.equals(((DueOneTimePayment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DueOneTimePayment{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", paymentDueDate='" + getPaymentDueDate() + "'" +
            ", contractorID='" + getContractorID() + "'" +
            "}";
    }
}
