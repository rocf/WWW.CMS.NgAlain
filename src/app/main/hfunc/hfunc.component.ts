import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/common/paged-listing-component-base'

import { HFuncServiceProxy, HFuncListDto, HFuncStatus, HFuncType, PagedResultDtoOfHFuncListDto, 
          ProfileServiceProxy, ProductInHFuncListDto, ProductType, ProductEditDto, AddOrUpdateProductInput } from '@shared/service-proxies/service-proxies';
import { finalize, tap, map } from 'rxjs/operators';

import { CreateOrEditHFuncModalComponent } from './create-or-edit-hfunc-modal.component';

@Component({
  selector: 'app-hfunc',
  templateUrl: './hfunc.component.html',
  styleUrls: ['./hfunc.component.less']
})
export class HFuncComponent extends PagedListingComponentBase<HFuncListDto> implements OnInit {

  filterText = '';



  constructor(
    injector: Injector,
    private _hFuncServiceProxy: HFuncServiceProxy,
    private _activatedRoute: ActivatedRoute,

  ) {
    super(injector);
    this.filterText = this._activatedRoute.snapshot.queryParams['filterText'] || '';
  }

  onSearch(): void {
    this.refresh();
  }

  createOrEdit(id?: number): void {
    this.modalHelper
      .createStatic(CreateOrEditHFuncModalComponent, { hFuncId: id }, { size: 'lg' })
      .subscribe(res => {
        if (res) {
          this.refresh();
        }
      });
  }

  batchDelete(): void {
    this.message.warn('功能未实现!');
  }

  addProduct(index: number): void{
 
  }
  protected deleteHFunc(hfunc: HFuncListDto): void {
    // this._hFuncServiceProxy.deleteHFunc(hfunc.id).subscribe(() => {
    //     this.refresh();
    //     this.notify.success(this.l('SuccessfullyDeleted'));
    // });
  }

  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: () => void): void {
    this._hFuncServiceProxy.getHFuncs(
      this.filterText,
      request.sorting,
      request.maxResultCount,
      request.skipCount
    )
      .pipe(
        finalize(finishedCallback),
        tap(val => console.log(val.items)),
        
      )
      .subscribe((result: PagedResultDtoOfHFuncListDto) => {
        this.dataList = result.items;
        this.showPaging(result);
      });
  }

}
