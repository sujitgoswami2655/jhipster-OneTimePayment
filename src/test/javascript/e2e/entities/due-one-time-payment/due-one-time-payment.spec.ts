/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  DueOneTimePaymentComponentsPage,
  DueOneTimePaymentDeleteDialog,
  DueOneTimePaymentUpdatePage
} from './due-one-time-payment.page-object';

const expect = chai.expect;

describe('DueOneTimePayment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dueOneTimePaymentUpdatePage: DueOneTimePaymentUpdatePage;
  let dueOneTimePaymentComponentsPage: DueOneTimePaymentComponentsPage;
  let dueOneTimePaymentDeleteDialog: DueOneTimePaymentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DueOneTimePayments', async () => {
    await navBarPage.goToEntity('due-one-time-payment');
    dueOneTimePaymentComponentsPage = new DueOneTimePaymentComponentsPage();
    await browser.wait(ec.visibilityOf(dueOneTimePaymentComponentsPage.title), 5000);
    expect(await dueOneTimePaymentComponentsPage.getTitle()).to.eq('pocOneTimePaymentApp.dueOneTimePayment.home.title');
  });

  it('should load create DueOneTimePayment page', async () => {
    await dueOneTimePaymentComponentsPage.clickOnCreateButton();
    dueOneTimePaymentUpdatePage = new DueOneTimePaymentUpdatePage();
    expect(await dueOneTimePaymentUpdatePage.getPageTitle()).to.eq('pocOneTimePaymentApp.dueOneTimePayment.home.createOrEditLabel');
    await dueOneTimePaymentUpdatePage.cancel();
  });

  it('should create and save DueOneTimePayments', async () => {
    const nbButtonsBeforeCreate = await dueOneTimePaymentComponentsPage.countDeleteButtons();

    await dueOneTimePaymentComponentsPage.clickOnCreateButton();
    await promise.all([
      dueOneTimePaymentUpdatePage.setAmountInput('5'),
      dueOneTimePaymentUpdatePage.setPaymentDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      dueOneTimePaymentUpdatePage.setContractorIDInput('contractorID'),
      dueOneTimePaymentUpdatePage.contractorIDSelectLastOption(),
      dueOneTimePaymentUpdatePage.contractorIDSelectLastOption()
    ]);
    expect(await dueOneTimePaymentUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
    expect(await dueOneTimePaymentUpdatePage.getPaymentDueDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected paymentDueDate value to be equals to 2000-12-31'
    );
    expect(await dueOneTimePaymentUpdatePage.getContractorIDInput()).to.eq(
      'contractorID',
      'Expected ContractorID value to be equals to contractorID'
    );
    await dueOneTimePaymentUpdatePage.save();
    expect(await dueOneTimePaymentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dueOneTimePaymentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DueOneTimePayment', async () => {
    const nbButtonsBeforeDelete = await dueOneTimePaymentComponentsPage.countDeleteButtons();
    await dueOneTimePaymentComponentsPage.clickOnLastDeleteButton();

    dueOneTimePaymentDeleteDialog = new DueOneTimePaymentDeleteDialog();
    expect(await dueOneTimePaymentDeleteDialog.getDialogTitle()).to.eq('pocOneTimePaymentApp.dueOneTimePayment.delete.question');
    await dueOneTimePaymentDeleteDialog.clickOnConfirmButton();

    expect(await dueOneTimePaymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
