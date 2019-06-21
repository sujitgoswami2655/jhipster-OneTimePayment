import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DueOneTimePaymentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-due-one-time-payment div table .btn-danger'));
  title = element.all(by.css('jhi-due-one-time-payment div h2#page-heading span')).first();

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

export class DueOneTimePaymentUpdatePage {
  pageTitle = element(by.id('jhi-due-one-time-payment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  amountInput = element(by.id('field_amount'));
  paymentDueDateInput = element(by.id('field_paymentDueDate'));
  contractorIDInput = element(by.id('field_contractorID'));
  contractorIDSelect = element(by.id('field_contractorID'));
  contractorIDSelect = element(by.id('field_contractorID'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
  }

  async setPaymentDueDateInput(paymentDueDate) {
    await this.paymentDueDateInput.sendKeys(paymentDueDate);
  }

  async getPaymentDueDateInput() {
    return await this.paymentDueDateInput.getAttribute('value');
  }

  async setContractorIDInput(contractorID) {
    await this.contractorIDInput.sendKeys(contractorID);
  }

  async getContractorIDInput() {
    return await this.contractorIDInput.getAttribute('value');
  }

  async contractorIDSelectLastOption(timeout?: number) {
    await this.contractorIDSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contractorIDSelectOption(option) {
    await this.contractorIDSelect.sendKeys(option);
  }

  getContractorIDSelect(): ElementFinder {
    return this.contractorIDSelect;
  }

  async getContractorIDSelectedOption() {
    return await this.contractorIDSelect.element(by.css('option:checked')).getText();
  }

  async contractorIDSelectLastOption(timeout?: number) {
    await this.contractorIDSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contractorIDSelectOption(option) {
    await this.contractorIDSelect.sendKeys(option);
  }

  getContractorIDSelect(): ElementFinder {
    return this.contractorIDSelect;
  }

  async getContractorIDSelectedOption() {
    return await this.contractorIDSelect.element(by.css('option:checked')).getText();
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

export class DueOneTimePaymentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dueOneTimePayment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dueOneTimePayment'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
