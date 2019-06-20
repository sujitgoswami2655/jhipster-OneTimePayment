package io.github.jhipster.application.domain;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A LDAPContractor.
 */
@Document(collection = "ldap_contractor")
public class LDAPContractor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Field("email")
    private String email;

    @Field("phone_number")
    private String phoneNumber;

    @Field("start_date")
    private Instant startDate;

    @Field("commission_pct")
    private Long commissionPct;

    @Field("contractor_id")
    private String contractorID;

    @DBRef
    @Field("contractorID")
    private Set<OneTimePayment> contractorIDS = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public LDAPContractor firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LDAPContractor lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public LDAPContractor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public LDAPContractor phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public LDAPContractor startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Long getCommissionPct() {
        return commissionPct;
    }

    public LDAPContractor commissionPct(Long commissionPct) {
        this.commissionPct = commissionPct;
        return this;
    }

    public void setCommissionPct(Long commissionPct) {
        this.commissionPct = commissionPct;
    }

    public String getContractorID() {
        return contractorID;
    }

    public LDAPContractor contractorID(String contractorID) {
        this.contractorID = contractorID;
        return this;
    }

    public void setContractorID(String contractorID) {
        this.contractorID = contractorID;
    }

    public Set<OneTimePayment> getContractorIDS() {
        return contractorIDS;
    }

    public LDAPContractor contractorIDS(Set<OneTimePayment> oneTimePayments) {
        this.contractorIDS = oneTimePayments;
        return this;
    }

    public LDAPContractor addContractorID(OneTimePayment oneTimePayment) {
        this.contractorIDS.add(oneTimePayment);
        oneTimePayment.setLDAPContractor(this);
        return this;
    }

    public LDAPContractor removeContractorID(OneTimePayment oneTimePayment) {
        this.contractorIDS.remove(oneTimePayment);
        oneTimePayment.setLDAPContractor(null);
        return this;
    }

    public void setContractorIDS(Set<OneTimePayment> oneTimePayments) {
        this.contractorIDS = oneTimePayments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LDAPContractor)) {
            return false;
        }
        return id != null && id.equals(((LDAPContractor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LDAPContractor{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", commissionPct=" + getCommissionPct() +
            ", contractorID='" + getContractorID() + "'" +
            "}";
    }
}
