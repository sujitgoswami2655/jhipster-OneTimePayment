import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILDAPContractor } from 'app/shared/model/ldap-contractor.model';
import { LDAPContractorService } from './ldap-contractor.service';

@Component({
  selector: 'jhi-ldap-contractor-delete-dialog',
  templateUrl: './ldap-contractor-delete-dialog.component.html'
})
export class LDAPContractorDeleteDialogComponent {
  lDAPContractor: ILDAPContractor;

  constructor(
    protected lDAPContractorService: LDAPContractorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.lDAPContractorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'lDAPContractorListModification',
        content: 'Deleted an lDAPContractor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ldap-contractor-delete-popup',
  template: ''
})
export class LDAPContractorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ lDAPContractor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LDAPContractorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.lDAPContractor = lDAPContractor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ldap-contractor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ldap-contractor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
