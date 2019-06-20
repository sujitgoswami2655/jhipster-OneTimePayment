/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OneTimePaymentComponentsPage, OneTimePaymentDeleteDialog, OneTimePaymentUpdatePage } from './one-time-payment.page-object';

const expect = chai.expect;

describe('OneTimePayment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let oneTimePaymentUpdatePage: OneTimePaymentUpdatePage;
  let oneTimePaymentComponentsPage: OneTimePaymentComponentsPage;
  let oneTimePaymentDeleteDialog: OneTimePaymentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load OneTimePayments', async () => {
    await navBarPage.goToEntity('one-time-payment');
    oneTimePaymentComponentsPage = new OneTimePaymentComponentsPage();
    await browser.wait(ec.visibilityOf(oneTimePaymentComponentsPage.title), 5000);
    expect(await oneTimePaymentComponentsPage.getTitle()).to.eq('pocOneTimePaymentApp.oneTimePayment.home.title');
  });

  it('should load create OneTimePayment page', async () => {
    await oneTimePaymentComponentsPage.clickOnCreateButton();
    oneTimePaymentUpdatePage = new OneTimePaymentUpdatePage();
    expect(await oneTimePaymentUpdatePage.getPageTitle()).to.eq('pocOneTimePaymentApp.oneTimePayment.home.createOrEditLabel');
    await oneTimePaymentUpdatePage.cancel();
  });

  it('should create and save OneTimePayments', async () => {
    const nbButtonsBeforeCreate = await oneTimePaymentComponentsPage.countDeleteButtons();

    await oneTimePaymentComponentsPage.clickOnCreateButton();
    await promise.all([
      oneTimePaymentUpdatePage.setAmountInput('amount'),
      oneTimePaymentUpdatePage.setPaymentDueInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      oneTimePaymentUpdatePage.setContractorIDInput('contractorID'),
      oneTimePaymentUpdatePage.wDContractorSelectLastOption(),
      oneTimePaymentUpdatePage.lDAPContractorSelectLastOption()
    ]);
    expect(await oneTimePaymentUpdatePage.getAmountInput()).to.eq('amount', 'Expected Amount value to be equals to amount');
    expect(await oneTimePaymentUpdatePage.getPaymentDueInput()).to.contain(
      '2001-01-01T02:30',
      'Expected paymentDue value to be equals to 2000-12-31'
    );
    expect(await oneTimePaymentUpdatePage.getContractorIDInput()).to.eq(
      'contractorID',
      'Expected ContractorID value to be equals to contractorID'
    );
    await oneTimePaymentUpdatePage.save();
    expect(await oneTimePaymentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await oneTimePaymentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last OneTimePayment', async () => {
    const nbButtonsBeforeDelete = await oneTimePaymentComponentsPage.countDeleteButtons();
    await oneTimePaymentComponentsPage.clickOnLastDeleteButton();

    oneTimePaymentDeleteDialog = new OneTimePaymentDeleteDialog();
    expect(await oneTimePaymentDeleteDialog.getDialogTitle()).to.eq('pocOneTimePaymentApp.oneTimePayment.delete.question');
    await oneTimePaymentDeleteDialog.clickOnConfirmButton();

    expect(await oneTimePaymentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
