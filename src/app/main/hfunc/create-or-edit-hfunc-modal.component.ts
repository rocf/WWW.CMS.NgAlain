import {
  Component, OnInit, Injector,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { ModalComponentBase } from '@shared/common/modal-component-base';

import { HFuncServiceProxy, HFuncEditDto, HFuncStatus, HFuncType, CreateOrUpdateHFuncInput } from '@shared/service-proxies/service-proxies';
import { finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-hfunc-modal',
  templateUrl: './create-or-edit-hfunc-modal.component.html',
  styleUrls: ['./create-or-edit-hfunc-modal.component.less']
})
export class CreateOrEditHFuncModalComponent extends ModalComponentBase implements OnInit, AfterViewInit {

  saving = false;

  hFuncNoCustom: boolean = false;
  hFuncId?: number;
  hFunc: HFuncEditDto = new HFuncEditDto();
  hFuncTypes = HFuncType;
  hFuncStatuses = HFuncStatus;

  hFuncTypeArr = Object.keys(HFuncType).filter(hFType => typeof this.hFuncTypes[hFType] === 'number');
  hFuncStatusArr = Object.keys(HFuncStatus).filter(hFStatus => typeof this.hFuncStatuses[hFStatus] === 'number');

  constructor(
    injector: Injector,
    private _hFuncServicePorxy: HFuncServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }


  init(): void {
    this._hFuncServicePorxy.getHFuncForEdit(this.hFuncId)
      .subscribe(result => {
        this.hFunc = result.hFunc;
      });
  }

  ngAfterViewInit(): void {
  }

  save(): void {
    this.saving = true;

    const input = new CreateOrUpdateHFuncInput();
    input.hFunc = this.hFunc;
    this._hFuncServicePorxy
      .createOrUpdateHFunc(input)
      .pipe(finalize(() => this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success();
      })
  }

  hFuncNoSwitch(): void {
    if(this.hFuncNoCustom)
    {
      this.hFunc.no = "TMPNO";
    }
    else
    {
      this.hFunc.no = "";
    }
  }
}
