import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOneTimePayment } from 'app/shared/model/one-time-payment.model';
import { OneTimePaymentService } from './one-time-payment.service';

@Component({
  selector: 'jhi-one-time-payment-delete-dialog',
  templateUrl: './one-time-payment-delete-dialog.component.html'
})
export class OneTimePaymentDeleteDialogComponent {
  oneTimePayment: IOneTimePayment;

  constructor(
    protected oneTimePaymentService: OneTimePaymentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.oneTimePaymentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'oneTimePaymentListModification',
        content: 'Deleted an oneTimePayment'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-one-time-payment-delete-popup',
  template: ''
})
export class OneTimePaymentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ oneTimePayment }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OneTimePaymentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.oneTimePayment = oneTimePayment;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/one-time-payment', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/one-time-payment', { outlets: { popup: null } }]);
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
