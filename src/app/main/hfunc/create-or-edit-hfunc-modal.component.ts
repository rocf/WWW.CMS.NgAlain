import {
  Component, OnInit, Injector,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { ModalComponentBase } from '@shared/common/modal-component-base';

import { HFuncServiceProxy, HFuncEditDto, HFuncStatus, HFuncType } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-edit-hfunc-modal',
  templateUrl: './create-or-edit-hfunc-modal.component.html',
  styleUrls: ['./create-or-edit-hfunc-modal.component.less']
})
export class CreateOrEditHFuncModalComponent extends ModalComponentBase implements OnInit, AfterViewInit {

  hFuncId?: number;
  hFunc: HFuncEditDto = new HFuncEditDto();

  ngOnInit(): void {
    this.init();
  }


  init(): void {
    this._hFuncServicePorxy.getHFuncForEdit(this.hFuncId).subscribe(result => {
      this.hFunc = result.hFunc;
    });
  }

  ngAfterViewInit(): void {
  }

  save(): void{

  }

  constructor(
    injector: Injector,
    private _hFuncServicePorxy: HFuncServiceProxy,
  ) {
    super(injector);
  }

}
