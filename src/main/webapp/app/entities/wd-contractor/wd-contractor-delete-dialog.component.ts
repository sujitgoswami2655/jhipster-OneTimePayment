import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWDContractor } from 'app/shared/model/wd-contractor.model';
import { WDContractorService } from './wd-contractor.service';

@Component({
  selector: 'jhi-wd-contractor-delete-dialog',
  templateUrl: './wd-contractor-delete-dialog.component.html'
})
export class WDContractorDeleteDialogComponent {
  wDContractor: IWDContractor;

  constructor(
    protected wDContractorService: WDContractorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.wDContractorService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'wDContractorListModification',
        content: 'Deleted an wDContractor'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-wd-contractor-delete-popup',
  template: ''
})
export class WDContractorDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ wDContractor }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(WDContractorDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.wDContractor = wDContractor;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/wd-contractor', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/wd-contractor', { outlets: { popup: null } }]);
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
