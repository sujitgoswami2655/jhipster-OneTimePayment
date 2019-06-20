import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class WDContractorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-wd-contractor div table .btn-danger'));
  title = element.all(by.css('jhi-wd-contractor div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class WDContractorUpdatePage {
  pageTitle = element(by.id('jhi-wd-contractor-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  emailInput = element(by.id('field_email'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  startDateInput = element(by.id('field_startDate'));
  commissionPctInput = element(by.id('field_commissionPct'));
  workdayNoInput = element(by.id('field_workdayNo'));
  contractorIDInput = element(by.id('field_contractorID'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
  }

  async setCommissionPctInput(commissionPct) {
    await this.commissionPctInput.sendKeys(commissionPct);
  }

  async getCommissionPctInput() {
    return await this.commissionPctInput.getAttribute('value');
  }

  async setWorkdayNoInput(workdayNo) {
    await this.workdayNoInput.sendKeys(workdayNo);
  }

  async getWorkdayNoInput() {
    return await this.workdayNoInput.getAttribute('value');
  }

  async setContractorIDInput(contractorID) {
    await this.contractorIDInput.sendKeys(contractorID);
  }

  async getContractorIDInput() {
    return await this.contractorIDInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class WDContractorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-wDContractor-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-wDContractor'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
