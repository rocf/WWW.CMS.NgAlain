import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LocalizationService } from '@abp/localization/localization.service';
import { HFuncComponent } from './hfunc/hfunc.component';
import { CreateOrEditHFuncModalComponent } from './hfunc/create-or-edit-hfunc-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MainRoutingModule,
        AppCommonModule,
        UtilsModule,        
    ],
    declarations: [
        DashboardComponent, 
        HFuncComponent, 
        CreateOrEditHFuncModalComponent,
    ],
    providers: [
        LocalizationService
    ],
    entryComponents: [
        CreateOrEditHFuncModalComponent
    ]
})
export class MainModule { }
