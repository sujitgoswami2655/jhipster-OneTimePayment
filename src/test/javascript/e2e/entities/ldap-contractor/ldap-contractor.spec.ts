/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LDAPContractorComponentsPage, LDAPContractorDeleteDialog, LDAPContractorUpdatePage } from './ldap-contractor.page-object';

const expect = chai.expect;

describe('LDAPContractor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lDAPContractorUpdatePage: LDAPContractorUpdatePage;
  let lDAPContractorComponentsPage: LDAPContractorComponentsPage;
  let lDAPContractorDeleteDialog: LDAPContractorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LDAPContractors', async () => {
    await navBarPage.goToEntity('ldap-contractor');
    lDAPContractorComponentsPage = new LDAPContractorComponentsPage();
    await browser.wait(ec.visibilityOf(lDAPContractorComponentsPage.title), 5000);
    expect(await lDAPContractorComponentsPage.getTitle()).to.eq('pocOneTimePaymentApp.lDAPContractor.home.title');
  });

  it('should load create LDAPContractor page', async () => {
    await lDAPContractorComponentsPage.clickOnCreateButton();
    lDAPContractorUpdatePage = new LDAPContractorUpdatePage();
    expect(await lDAPContractorUpdatePage.getPageTitle()).to.eq('pocOneTimePaymentApp.lDAPContractor.home.createOrEditLabel');
    await lDAPContractorUpdatePage.cancel();
  });

  it('should create and save LDAPContractors', async () => {
    const nbButtonsBeforeCreate = await lDAPContractorComponentsPage.countDeleteButtons();

    await lDAPContractorComponentsPage.clickOnCreateButton();
    await promise.all([
      lDAPContractorUpdatePage.setFirstNameInput('firstName'),
      lDAPContractorUpdatePage.setLastNameInput('lastName'),
      lDAPContractorUpdatePage.setEmailInput('email'),
      lDAPContractorUpdatePage.setPhoneNumberInput('phoneNumber'),
      lDAPContractorUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      lDAPContractorUpdatePage.setCommissionPctInput('5'),
      lDAPContractorUpdatePage.setContractorIDInput('contractorID')
    ]);
    expect(await lDAPContractorUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await lDAPContractorUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await lDAPContractorUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await lDAPContractorUpdatePage.getPhoneNumberInput()).to.eq(
      'phoneNumber',
      'Expected PhoneNumber value to be equals to phoneNumber'
    );
    expect(await lDAPContractorUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await lDAPContractorUpdatePage.getCommissionPctInput()).to.eq('5', 'Expected commissionPct value to be equals to 5');
    expect(await lDAPContractorUpdatePage.getContractorIDInput()).to.eq(
      'contractorID',
      'Expected ContractorID value to be equals to contractorID'
    );
    await lDAPContractorUpdatePage.save();
    expect(await lDAPContractorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await lDAPContractorComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LDAPContractor', async () => {
    const nbButtonsBeforeDelete = await lDAPContractorComponentsPage.countDeleteButtons();
    await lDAPContractorComponentsPage.clickOnLastDeleteButton();

    lDAPContractorDeleteDialog = new LDAPContractorDeleteDialog();
    expect(await lDAPContractorDeleteDialog.getDialogTitle()).to.eq('pocOneTimePaymentApp.lDAPContractor.delete.question');
    await lDAPContractorDeleteDialog.clickOnConfirmButton();

    expect(await lDAPContractorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
