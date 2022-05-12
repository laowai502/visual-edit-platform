import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WorkareaService } from '../workarea.service';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditQuestionModel } from 'src/app/core/model/interface/question.interface';

import { Subscription } from 'rxjs';

@Component({
	selector: 'iqnr-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnChanges, OnDestroy {

	gsForm: FormGroup;
	hdForm: FormGroup;
	bgForm: FormGroup;
	tabNumber: number;

	opts: any;
	showPicLib: boolean;

	lang: string;

	cq: EditQuestionModel;

    private syncDestr: Subscription;

	@Input() info: ProjectInfo;

	constructor(private fb: FormBuilder, private ws: WorkareaService) {
		this.tabNumber = 0;
		this.gsForm = this.fb.group({ showTitle: [true], showSeq: [false], showWel: [false], showProgress: [false]});
		this.hdForm = this.fb.group({ showHeader: [true], headerType: ['image'], headerTxt: [''] });
		this.bgForm = this.fb.group({ bgColor: '#FFFFFF', bColor: '#FFFFFF', bOpacity: 100 });

		this.showPicLib = false;
		this.lang = 'en-us';

		this.gsForm.valueChanges.subscribe((value: any) => {
			this.ws.projectInfo.showWel = value.showWel;
			this.ws.projectInfo.showTitle = value.showTitle;
			this.ws.projectInfo.showQNumber = value.showSeq;
		});
		this.hdForm.valueChanges.subscribe((value: any) => {
			// console.log(value);
		});
		this.bgForm.valueChanges.subscribe((value: any) => {
			// console.log(value);
		});
	}

	ngOnInit() {
		this.syncDestr = this.ws.SettingSyncEditarea.subscribe(data => {
			if (data === 'QUES') {
				this.tabNumber = 1;
				this.cq = this.ws.curEidtQues;
			} else if (data === 'SETTING') {
				this.tabNumber = 0;
			}
		});
	}

	ngOnChanges(ch: SimpleChanges) {
		// console.log(ch);
		if (ch.info && ch.info.currentValue) {
			this.initForm(ch.info.currentValue);
		}
	}

	ngOnDestroy() {
		this.syncDestr.unsubscribe();
	}

	initForm(data: ProjectInfo) {
		this.gsForm.setValue({
			showTitle: data.showTitle,
			showSeq: data.showQNumber,
			showWel: data.showWel,
			showProgress: data.showProgress,
		});
		this.hdForm.setValue({
			showHeader: data.showHeader,
			headerType: data.headerType,
			headerTxt: data.headerTxt
		}, { emitEvent: true });
		this.bgForm.setValue({
			bgColor: data.bgColor,
			bColor: data.bColor,
			bOpacity: data.bOpacity
		});
	}

	showSeqChange(change: boolean) {
		this.ws.toggleQuesSeqNo(change);
	}

	// --------------------------- upload file ----------------------------------
	addFile(amount: string, from: string) {
		this.opts = { from, amount };
		this.showPicLib = true;
	}

	closePicLib(ev: any) {
		this.showPicLib = false;
	}

	tabChange(ev: number) { // 0: setting, 1: question config
		this.tabNumber = ev;
		if (ev === 0) {
			this.ws.removeOtherFocus();
			this.cq = this.ws.curEidtQues = null;
		}
	}
	// --------------------------- upload file end ----------------------------------

}
