import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

// import { NzFormModule } from 'ng-zorro-antd/form';

import { DragoverTargetDirective } from './core/directive/move-target.directive';
import { DragSortableDirective } from './core/directive/drag-sortable.directive';
import { EditQuesClickBubblingDirective } from './core/directive/edit-ques-click-bubbling.directive';

import { HtmlPipe } from './core/pipe/html.pipe';
import { RemoveHtmlPile } from './core/pipe/replaceHtmlTag.pipe';

import { EditTextComponent } from './core/components/ques/edit-text/edit-text.component';
import { EditScaleComponent } from './core/components/ques/edit-scale/edit-scale.component';
import { IqnrBaseQuestionComponent } from './core/components/ques/base.question';
import { SelectTypeComponent } from './core/components/ques/select-type/select-type.component';
import { EditFileComponent } from './core/components/ques/edit-file/edit-file.component';

import { OptionControlBtnComponent } from './core/components/widget/option-control-btn/option-control-btn.component';
import { OptionOperatBtnComponent } from './core/components/widget/option-operat-btn/option-operat-btn.component';
import { FloatTextToolComponent } from './core/components/widget/float-text-tool/float-text-tool.component';
import { SuffixComponent } from './core/components/widget/suffix/suffix.component';

import { PicLibComponent } from './core/components/pic-lib/pic-lib.component';

const Directives = [
	DragSortableDirective,
	DragoverTargetDirective,
	EditQuesClickBubblingDirective
];

const QComponents = [
	EditTextComponent,
	EditScaleComponent,
	SelectTypeComponent,
	EditFileComponent,
	IqnrBaseQuestionComponent
];

const widgetComponent = [
	OptionControlBtnComponent,
	OptionOperatBtnComponent,
	FloatTextToolComponent,
	SuffixComponent
];

const ngZorroModulse = [
	// NzFormModule,
	NzGridModule,
	NzTreeModule,
	NzMenuModule,
	NzTabsModule,
	NzStepsModule,
	NzInputModule,
	NzRadioModule,
	NzModalModule,
	NzSelectModule,
	NzSliderModule,
	NzSwitchModule,
	NzButtonModule,
	NzPopoverModule,
	NzMessageModule,
	NzToolTipModule,
	NzCollapseModule,
	NzProgressModule,
	NzCarouselModule,
	NzPopconfirmModule,
	NzBreadCrumbModule,
	NzInputNumberModule
];

@NgModule({
	declarations: [
		HtmlPipe,
		RemoveHtmlPile,
		...Directives,
		...QComponents,
		...widgetComponent,
		PicLibComponent
	],
	entryComponents: [],
	imports: [
		FormsModule,
		CommonModule,
		EditorModule,
		NzModalModule,
		...ngZorroModulse
	],
	exports: [
		HtmlPipe,
		RemoveHtmlPile,
		FormsModule,
		ReactiveFormsModule,
		PicLibComponent,
		...Directives,
		...QComponents,
		...widgetComponent,
		...ngZorroModulse
	],
	providers: [
		{ provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
	]
})
export class AppShareModule { }
