import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from  'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';
import { CardsComponent } from './cards/cards.component';
import { TabsComponent } from './tabs/tabs.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChartsComponent } from './charts/charts.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    TabMenuModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    CardModule,
    ChartModule,
    SidebarModule
  ],
  declarations: [
    DashboardComponent,
    CardsComponent,
    TabsComponent,
    ToolbarComponent,
    ChartsComponent,
    SidebarComponent
  ]
})
export class DashboardModule {}
