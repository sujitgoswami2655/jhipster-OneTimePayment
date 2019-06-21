package io.github.jhipster.application.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A WDContractor.
 */
@Document(collection = "wd_contractor")
public class WDContractor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

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

    @Field("workday_no")
    private String workdayNo;

    @Field("contractor_id")
    private String contractorID;

    @DBRef
    @Field("contractorID")
    private Set<DueOneTimePayment> contractorIDS = new HashSet<>();

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

    public WDContractor firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public WDContractor lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public WDContractor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public WDContractor phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public WDContractor startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Long getCommissionPct() {
        return commissionPct;
    }

    public WDContractor commissionPct(Long commissionPct) {
        this.commissionPct = commissionPct;
        return this;
    }

    public void setCommissionPct(Long commissionPct) {
        this.commissionPct = commissionPct;
    }

    public String getWorkdayNo() {
        return workdayNo;
    }

    public WDContractor workdayNo(String workdayNo) {
        this.workdayNo = workdayNo;
        return this;
    }

    public void setWorkdayNo(String workdayNo) {
        this.workdayNo = workdayNo;
    }

    public String getContractorID() {
        return contractorID;
    }

    public WDContractor contractorID(String contractorID) {
        this.contractorID = contractorID;
        return this;
    }

    public void setContractorID(String contractorID) {
        this.contractorID = contractorID;
    }

    public Set<DueOneTimePayment> getContractorIDS() {
        return contractorIDS;
    }

    public WDContractor contractorIDS(Set<DueOneTimePayment> dueOneTimePayments) {
        this.contractorIDS = dueOneTimePayments;
        return this;
    }

    public WDContractor addContractorID(DueOneTimePayment dueOneTimePayment) {
        this.contractorIDS.add(dueOneTimePayment);
        dueOneTimePayment.setWDContractor(this);
        return this;
    }

    public WDContractor removeContractorID(DueOneTimePayment dueOneTimePayment) {
        this.contractorIDS.remove(dueOneTimePayment);
        dueOneTimePayment.setWDContractor(null);
        return this;
    }

    public void setContractorIDS(Set<DueOneTimePayment> dueOneTimePayments) {
        this.contractorIDS = dueOneTimePayments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WDContractor)) {
            return false;
        }
        return id != null && id.equals(((WDContractor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "WDContractor{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", commissionPct=" + getCommissionPct() +
            ", workdayNo='" + getWorkdayNo() + "'" +
            ", contractorID='" + getContractorID() + "'" +
            "}";
    }
}
