import {
  Component, OnInit, Injector,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { ModalComponentBase } from '@shared/common/modal-component-base';

import { HFuncServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-edit-hfunc-modal',
  templateUrl: './create-or-edit-hfunc-modal.component.html',
  styleUrls: ['./create-or-edit-hfunc-modal.component.less']
})
export class CreateOrEditHFuncModalComponent extends ModalComponentBase implements OnInit, AfterViewInit {


  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
  }

  constructor(
    injector: Injector,
    private _userService: HFuncServiceProxy,
  ) {
    super(injector);
  }

}
