/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WDContractorComponentsPage, WDContractorDeleteDialog, WDContractorUpdatePage } from './wd-contractor.page-object';

const expect = chai.expect;

describe('WDContractor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let wDContractorUpdatePage: WDContractorUpdatePage;
  let wDContractorComponentsPage: WDContractorComponentsPage;
  let wDContractorDeleteDialog: WDContractorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WDContractors', async () => {
    await navBarPage.goToEntity('wd-contractor');
    wDContractorComponentsPage = new WDContractorComponentsPage();
    await browser.wait(ec.visibilityOf(wDContractorComponentsPage.title), 5000);
    expect(await wDContractorComponentsPage.getTitle()).to.eq('pocOneTimePaymentApp.wDContractor.home.title');
  });

  it('should load create WDContractor page', async () => {
    await wDContractorComponentsPage.clickOnCreateButton();
    wDContractorUpdatePage = new WDContractorUpdatePage();
    expect(await wDContractorUpdatePage.getPageTitle()).to.eq('pocOneTimePaymentApp.wDContractor.home.createOrEditLabel');
    await wDContractorUpdatePage.cancel();
  });

  it('should create and save WDContractors', async () => {
    const nbButtonsBeforeCreate = await wDContractorComponentsPage.countDeleteButtons();

    await wDContractorComponentsPage.clickOnCreateButton();
    await promise.all([
      wDContractorUpdatePage.setFirstNameInput('firstName'),
      wDContractorUpdatePage.setLastNameInput('lastName'),
      wDContractorUpdatePage.setEmailInput('email'),
      wDContractorUpdatePage.setPhoneNumberInput('phoneNumber'),
      wDContractorUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      wDContractorUpdatePage.setCommissionPctInput('5'),
      wDContractorUpdatePage.setWorkdayNoInput('workdayNo'),
      wDContractorUpdatePage.setContractorIDInput('contractorID')
    ]);
    expect(await wDContractorUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await wDContractorUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await wDContractorUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await wDContractorUpdatePage.getPhoneNumberInput()).to.eq(
      'phoneNumber',
      'Expected PhoneNumber value to be equals to phoneNumber'
    );
    expect(await wDContractorUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await wDContractorUpdatePage.getCommissionPctInput()).to.eq('5', 'Expected commissionPct value to be equals to 5');
    expect(await wDContractorUpdatePage.getWorkdayNoInput()).to.eq('workdayNo', 'Expected WorkdayNo value to be equals to workdayNo');
    expect(await wDContractorUpdatePage.getContractorIDInput()).to.eq(
      'contractorID',
      'Expected ContractorID value to be equals to contractorID'
    );
    await wDContractorUpdatePage.save();
    expect(await wDContractorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await wDContractorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WDContractor', async () => {
    const nbButtonsBeforeDelete = await wDContractorComponentsPage.countDeleteButtons();
    await wDContractorComponentsPage.clickOnLastDeleteButton();

    wDContractorDeleteDialog = new WDContractorDeleteDialog();
    expect(await wDContractorDeleteDialog.getDialogTitle()).to.eq('pocOneTimePaymentApp.wDContractor.delete.question');
    await wDContractorDeleteDialog.clickOnConfirmButton();

    expect(await wDContractorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
