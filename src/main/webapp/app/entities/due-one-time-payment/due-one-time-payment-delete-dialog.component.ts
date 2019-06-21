import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDueOneTimePayment } from 'app/shared/model/due-one-time-payment.model';
import { DueOneTimePaymentService } from './due-one-time-payment.service';

@Component({
  selector: 'jhi-due-one-time-payment-delete-dialog',
  templateUrl: './due-one-time-payment-delete-dialog.component.html'
})
export class DueOneTimePaymentDeleteDialogComponent {
  dueOneTimePayment: IDueOneTimePayment;

  constructor(
    protected dueOneTimePaymentService: DueOneTimePaymentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.dueOneTimePaymentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dueOneTimePaymentListModification',
        content: 'Deleted an dueOneTimePayment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-due-one-time-payment-delete-popup',
  template: ''
})
export class DueOneTimePaymentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dueOneTimePayment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DueOneTimePaymentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dueOneTimePayment = dueOneTimePayment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/due-one-time-payment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/due-one-time-payment', { outlets: { popup: null } }]);
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
