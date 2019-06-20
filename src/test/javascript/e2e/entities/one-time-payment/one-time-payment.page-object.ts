import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class OneTimePaymentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-one-time-payment div table .btn-danger'));
  title = element.all(by.css('jhi-one-time-payment div h2#page-heading span')).first();

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

export class OneTimePaymentUpdatePage {
  pageTitle = element(by.id('jhi-one-time-payment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  amountInput = element(by.id('field_amount'));
  paymentDueInput = element(by.id('field_paymentDue'));
  contractorIDInput = element(by.id('field_contractorID'));
  wDContractorSelect = element(by.id('field_wDContractor'));
  lDAPContractorSelect = element(by.id('field_lDAPContractor'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
  }

  async setPaymentDueInput(paymentDue) {
    await this.paymentDueInput.sendKeys(paymentDue);
  }

  async getPaymentDueInput() {
    return await this.paymentDueInput.getAttribute('value');
  }

  async setContractorIDInput(contractorID) {
    await this.contractorIDInput.sendKeys(contractorID);
  }

  async getContractorIDInput() {
    return await this.contractorIDInput.getAttribute('value');
  }

  async wDContractorSelectLastOption(timeout?: number) {
    await this.wDContractorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async wDContractorSelectOption(option) {
    await this.wDContractorSelect.sendKeys(option);
  }

  getWDContractorSelect(): ElementFinder {
    return this.wDContractorSelect;
  }

  async getWDContractorSelectedOption() {
    return await this.wDContractorSelect.element(by.css('option:checked')).getText();
  }

  async lDAPContractorSelectLastOption(timeout?: number) {
    await this.lDAPContractorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async lDAPContractorSelectOption(option) {
    await this.lDAPContractorSelect.sendKeys(option);
  }

  getLDAPContractorSelect(): ElementFinder {
    return this.lDAPContractorSelect;
  }

  async getLDAPContractorSelectedOption() {
    return await this.lDAPContractorSelect.element(by.css('option:checked')).getText();
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

export class OneTimePaymentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-oneTimePayment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-oneTimePayment'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
