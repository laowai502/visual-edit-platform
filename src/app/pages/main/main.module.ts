import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppShareModule } from '../../app-share.module';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './layout/header/header.component';
import { NotifiComponent } from './layout/notifi/notifi.component';
import { ProjectComponent } from './project/project.component';
import { FilterComponent } from './project/filter/filter.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { QHeaderComponent } from './workarea/q-header/q-header.component';
import { NavComponent } from './workarea/nav/nav.component';
import { MaterialBarComponent } from './workarea/material-bar/material-bar.component';
import { SettingComponent } from './workarea/setting/setting.component';
import { EditAreaComponent } from './workarea/edit-area/edit-area.component';
import { PageSectionComponent } from './workarea/page-section/page-section.component';
import { LogicsComponent } from './workarea/logics/logics.component';

import { QuesActionBarComponent } from './workarea/edit-area/ques-action-bar/ques-action-bar.component';
import { QSetComponent } from './workarea/setting/q-set/q-set.component';
import { TemplateComponent } from './workarea/page-section/template/template.component';
import { BasketComponent } from './workarea/page-section/template/basket/basket.component';
import { EditZoneComponent } from './workarea/page-section/template/edit-zone/edit-zone.component';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        NotifiComponent,
        ProjectComponent,
        FilterComponent,
        WorkareaComponent,
        QHeaderComponent,
        NavComponent,
        MaterialBarComponent,
        SettingComponent,
        EditAreaComponent,
        QuesActionBarComponent,
        QSetComponent,
        PageSectionComponent,
        LogicsComponent,
        TemplateComponent,
        BasketComponent,
		EditZoneComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        AppShareModule
    ],
	providers: []
})
export class MainModule { }
