import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@app/main/dashboard/dashboard.component';
import { HFuncComponent } from '@app/main/hfunc/hfunc.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' }}
    ],
  },
  { path: 'hfunc',
    children: [
      {path: '', component: HFuncComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
