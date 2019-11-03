import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/common/paged-listing-component-base';

import { HFuncServiceProxy, HFuncListDto, HFuncStatus, HFuncType, PagedResultDtoOfHFuncListDto,
        ProductInHFuncListDto, ProductType, ProductEditDto, AddOrUpdateProductInput, EntityDto } from '@shared/service-proxies/service-proxies';
import { finalize, tap, map } from 'rxjs/operators';

import { CreateOrEditHFuncModalComponent } from './create-or-edit-hfunc-modal.component';

import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-hfunc',
  templateUrl: './hfunc.component.html',
  styleUrls: ['./hfunc.component.less']
})
export class HFuncComponent extends PagedListingComponentBase<HFuncListDto> implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.newProduct.product.productType = ProductType.EShop5;
  }

  filterText = '';
  product: ProductEditDto = new ProductEditDto();
  productTypes = ProductType;
  productTypeArr = Object.keys(ProductType).filter(productType => typeof this.productTypes[productType] === 'number');
  newProduct: AddOrUpdateProductInput = new AddOrUpdateProductInput();
  productInHFuncListDto: ProductInHFuncListDto = new ProductInHFuncListDto();

  constructor(
    injector: Injector,
    private _hFuncServiceProxy: HFuncServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _clipboardService: ClipboardService

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

  saveProduct(index: number, item: ProductInHFuncListDto): void {
    this.newProduct.product.hFuncId = item.id;

    this._hFuncServiceProxy.addOrUpdateProduct(this.newProduct)
                          .subscribe(result => {
                            console.log(index)

                            this.dataList[index].products = [ ...this.dataList[index].products, result ]
                            this.newProduct.product.version = '';                            
                            this.notify.success(this.l('SavedSuccessfully'));
                          });
  }

  deleteProduct(index:number, product: ProductInHFuncListDto): void {
    this._hFuncServiceProxy.deleteProduct(product.id)
                          .subscribe(result => {
                            this.notify.success(this.l('SuccessfullyDeleted'));
                            this.dataList[index].products = this.dataList[index].products.filter(p => p.id != product.id);
                          })
  }

  copyHFunc(index: number): void　{
    let hFuncText: string = 
`隐藏功能: ${this.dataList[index].name}
功能描述: ${this.dataList[index].description}
风险说明: ${this.dataList[index].riskStatement}

开启SQL脚本: 
${this.dataList[index].openSQL}

关闭SQL脚本:
${this.dataList[index].closeSQL}`;

    this._clipboardService.copyFromContent(hFuncText);
    this.notify.success('复制成功');
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
        tap(val => console.log(val.items))
      )
      .subscribe((result: PagedResultDtoOfHFuncListDto) => {
        this.dataList = result.items;
        this.showPaging(result);
      });
  }

}
