package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;

/**
 * A OneTimePayment.
 */
@Document(collection = "one_time_payment")
public class OneTimePayment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Field("amount")
    private String amount;

    @Field("payment_due")
    private Instant paymentDue;

    @Field("contractor_id")
    private String contractorID;

    @DBRef
    @Field("wDContractor")
    @JsonIgnoreProperties("oneTimePayments")
    private WDContractor wDContractor;

    @DBRef
    @Field("lDAPContractor")
    @JsonIgnoreProperties("oneTimePayments")
    private LDAPContractor lDAPContractor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAmount() {
        return amount;
    }

    public OneTimePayment amount(String amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public Instant getPaymentDue() {
        return paymentDue;
    }

    public OneTimePayment paymentDue(Instant paymentDue) {
        this.paymentDue = paymentDue;
        return this;
    }

    public void setPaymentDue(Instant paymentDue) {
        this.paymentDue = paymentDue;
    }

    public String getContractorID() {
        return contractorID;
    }

    public OneTimePayment contractorID(String contractorID) {
        this.contractorID = contractorID;
        return this;
    }

    public void setContractorID(String contractorID) {
        this.contractorID = contractorID;
    }

    public WDContractor getWDContractor() {
        return wDContractor;
    }

    public OneTimePayment wDContractor(WDContractor wDContractor) {
        this.wDContractor = wDContractor;
        return this;
    }

    public void setWDContractor(WDContractor wDContractor) {
        this.wDContractor = wDContractor;
    }

    public LDAPContractor getLDAPContractor() {
        return lDAPContractor;
    }

    public OneTimePayment lDAPContractor(LDAPContractor lDAPContractor) {
        this.lDAPContractor = lDAPContractor;
        return this;
    }

    public void setLDAPContractor(LDAPContractor lDAPContractor) {
        this.lDAPContractor = lDAPContractor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OneTimePayment)) {
            return false;
        }
        return id != null && id.equals(((OneTimePayment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OneTimePayment{" +
            "id=" + getId() +
            ", amount='" + getAmount() + "'" +
            ", paymentDue='" + getPaymentDue() + "'" +
            ", contractorID='" + getContractorID() + "'" +
            "}";
    }
}
