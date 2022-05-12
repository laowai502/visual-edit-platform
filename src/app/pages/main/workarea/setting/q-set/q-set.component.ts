import { Component, OnInit, ViewEncapsulation, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EditQuestionModel, EditScaleQuesModel } from 'src/app/core/model/interface/question.interface';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';
import { QuestionType, ValiType } from 'src/app/core/model/enum/question.enum';

import { DATE_FORMAT, SCALE_EXTREME, TEXT_FORMAT } from './q-set.constant';

import { Subscription } from 'rxjs';
import * as _ from 'lodash';

interface DetailSetting {
	required?: boolean;
	showSeq?: boolean;
	seqNo?: string;
	identify?: string;
	needTooltip?: boolean;
	tooltip?: string;
	layout?: number;
}

interface OptionSetting {
	optionLayout?: number;
	selectEnableSearch?: boolean;
	canCheckAll?: boolean;
	selectMin?: boolean;
	selectMax?: boolean;
	maxLength?: number;
	minLength?: number;
	defaultValue?: string;
	textFormat?: number;
	serverUrl?: string;
	enableSelectTime?: boolean;
	dateFormatType?: any;
	scaleExtreme?: any;
	scaleLevel?: number;
	startLevelValue?: any;
	lowScore?: number;
	highScore?: number;
	lText?: string;
	cText?: string;
	rText?: string;
	uploadAmount?: number;
	uploadSize?: number;
}

@Component({
	selector: 'iqnr-q-set',
	templateUrl: './q-set.component.html',
	styleUrls: ['./q-set.component.scss'],
	// encapsulation: ViewEncapsulation.None
})
export class QSetComponent implements OnInit, OnChanges, OnDestroy {

	@Input() cq: EditQuestionModel|EditScaleQuesModel;

	quesType = QuestionType;

	nObj: DetailSetting;
	opObj: OptionSetting;

	dfList: Array<any>;
	seList: Array<any>;
	tfList: Array<any>;

	// tooltip mes
	idenTooltip: string;
	EffectInPreview: string;
	LogicTooltip: string;
	dataSourceUrl: string;

	private oldTextFormat: number = null;

	private destr: Subscription;

	constructor(private ws: WorkareaService) {
		this.LogicTooltip = 'You can set the logics here for this content (Like how to display and when required).';
		this.idenTooltip = 'Set a unique identifier for the content, use to help development';
		this.EffectInPreview = 'Viewing the effect by preview or page layout';
		this.dataSourceUrl = 'Data source you need to search';

		this.dfList = DATE_FORMAT;
		this.seList = SCALE_EXTREME;
		this.tfList = TEXT_FORMAT;
	}

	ngOnInit(): void {
		this.destr = this.ws.EditareaSyncQSet.subscribe(data => {
			if (data === 'CLEAR_SELECT_RANGE') {
				this.clearSelectRange();
			}
		});
	}

	ngOnDestroy(): void {
		this.destr.unsubscribe();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.cq) {
			const val: EditScaleQuesModel|EditQuestionModel = changes.cq.currentValue;
			if (val) {
				this.initForm(val);
			}
		}
	}

	initForm(q: EditScaleQuesModel|EditQuestionModel) {
		const type = q.quesTypeId;
		if (type !== QuestionType.Label && type !== QuestionType.SplitLine) {
			this.nObj = {
				seqNo: q.seqNo,
				showSeq: q.showSeq,
				identify: q.identify,
				tooltip: q.tooltip,
				layout: q.layout
			};
			this.opObj = {
				optionLayout: 1
			};
			this.nObj.needTooltip = q.tooltip !== null;
			this.nObj.required = q.validations.some(e => e.valiTypeId === ValiType.Required);
			const opObj: OptionSetting = {};
			switch (type) {
				case QuestionType.Radio:
					opObj.optionLayout = q.optSet?.optionLayout || 1;
					break;
				case QuestionType.CheckBox:
					opObj.optionLayout = q.optSet?.optionLayout || 1;
					opObj.selectMin = q.validations.find(e => e.valiTypeId === ValiType.MinLength)?.valiExpress || null;
					opObj.selectMax = q.validations.find(e => e.valiTypeId === ValiType.MaxLength)?.valiExpress || null;
					break;
				case QuestionType.DropdownSelect:
					opObj.selectEnableSearch = q.optSet?.selectEnableSearch || false;
					break;
				case QuestionType.DropdownMultipleSelect:
					opObj.selectEnableSearch = q.optSet?.selectEnableSearch || false;
					opObj.canCheckAll = q.optSet.canCheckAll || false;
					break;
				case QuestionType.Text:
					this.oldTextFormat = opObj.textFormat = q.validations.find(e => [ValiType.Email, ValiType.PhoneNumber, ValiType.Url].indexOf(e.valiTypeId) !== -1)?.valiTypeId || null;
					opObj.minLength = q.validations.find(e => e.valiTypeId === ValiType.MinLength)?.valiExpress || null;
					opObj.maxLength = q.validations.find(e => e.valiTypeId === ValiType.MaxLength)?.valiExpress || null;
					opObj.defaultValue = q.optSet?.defaultValue || '';
					break;
				case QuestionType.TextArea:
					opObj.maxLength = q.validations.find(e => e.valiTypeId === ValiType.MaxLength)?.valiExpress || null;
					break;
				case QuestionType.TypeAhead:
					opObj.serverUrl = q.optSet.serverUrl || '';
					break;
				case QuestionType.Date: case QuestionType.Date:
					opObj.enableSelectTime = q.optSet.enableSelectTime || false;
					opObj.dateFormatType = q.optSet.dateFormatType || null;
					break;
				case QuestionType.ScaleQuestion:
					opObj.scaleExtreme = q['extremeKey'];
					opObj.scaleLevel = q['scaleLevel'];
					opObj.startLevelValue = q['startLevelValue'];
					break;
				case QuestionType.Score:
					opObj.highScore = q.options[0]['maxValue'];
					opObj.lowScore = q.options[0]['minValue'];
					opObj.lText = q.options[0]['lText'];
					opObj.cText = q.options[0]['cText'];
					opObj.rText = q.options[0]['rText'];
					break;
				case QuestionType.Upload:
					opObj.uploadAmount = q.options[0]['amount'];
					opObj.uploadSize = q.options[0]['limit'];
					break;
				case QuestionType.ImgUpload:
					opObj.uploadAmount = q.options[0]['amount'];
					break;
				default:
					break;
			}
			this.opObj = opObj;
		} else {
			if (type === QuestionType.Label) {
				this.nObj = { layout: q.layout };
			}
		}
	}

	defaultAttrSet(ev, flag: string, attr?: string) {
		if (attr) {
			this.cq[attr][flag] = ev;
		} else {
			this.cq[flag] = ev;
		}
	}

	changeSwtich(ev, flag: string, attr?: string) {
		switch(flag) {
			case 'required':
				if (ev) {
					this.cq.validations.push({ valiTypeId: ValiType.Required, valiTypeDesc: 'Required', valiExpress: null });
				} else {
					_.remove(this.cq.validations, e => e.valiTypeId === ValiType.Required);
				}
				break;
			default:
				this.defaultAttrSet(ev, flag, attr);
				break;
		}
	}

	inputChange(ev, flag: string, attr?: string) {
		switch(flag) {
			default:
				this.defaultAttrSet(ev, flag, attr);
				break;
		}
	}

	changeRadio(ev, flag: string, attr?: string) {
		switch(flag) {
			default:
				this.defaultAttrSet(ev, flag, attr);
				break;
		}
	}

	changeSelect(ev, flag: string, attr?: string) {
		switch(flag) {
			case 'selectMin':
			case 'selectMax':
				const valiType = flag === 'selectMin' ? ValiType.MinLength : ValiType.MaxLength;
				const desc = flag === 'selectMin' ? 'MinLength' : 'MaxLength';
				if (ev !== null) {
					const i = _.findIndex(this.cq.validations, e => e.valiTypeId === valiType);
					if (i !== -1) {
						this.cq.validations[i].valiExpress = ev;
					} else {
						this.cq.validations.push({ valiTypeId: valiType, valiTypeDesc: desc, valiExpress: ev });
					}
				} else {
					_.remove(this.cq.validations, e => e.valiTypeId === valiType);
				}
				break;
			case 'textFormat':
				if (ev !== null) {
					const o = _.find(TEXT_FORMAT, e => e.key === ev);
					const i = _.findIndex(this.cq.validations, e => e.valiTypeId === valiType);
					if (i !== -1) {
						this.cq.validations[i].valiTypeId = ev;
						this.cq.validations[i].valiTypeDesc = o.value;
						this.cq.validations[i].valiExpress = o.regularExpression;
					} else {
						this.cq.validations.push({ valiTypeId: ev, valiTypeDesc: o.value, valiExpress: o.regularExpression });
					}
				} else {
					_.remove(this.cq.validations, e => e.valiTypeId === this.oldTextFormat);
				}
				break;
			case 'scaleExtreme':
				const o = _.find(SCALE_EXTREME, e => e.key === ev);
				this.cq['extremeKey'] = o.key;
				this.cq['extremeLeftText'] = o.lValue;
				this.cq['extremeRightText'] = o.rValue;
				this.ws.EditareaSyncQSet.next('SYNC_SCALE');
				break;
			case 'scaleLevel':
				this.defaultAttrSet(ev, flag, attr);
				this.ws.EditareaSyncQSet.next('SYNC_SCALE');
				break;
			default:
				this.defaultAttrSet(ev, flag, attr);
				break;
		}
	}

	changeNumber(ev, flag: string, attr?: string) {
		switch(flag) {
			case 'startLevelValue':
				this.defaultAttrSet(ev, flag, attr);
				this.ws.EditareaSyncQSet.next('SYNC_SCALE');
				break;
			case 'minLength':
			case 'maxLength':
				const valiType = flag === 'minLength' ? ValiType.MinLength : ValiType.MaxLength;
				const desc = flag === 'minLength' ? 'MinLength' : 'MaxLength';
				if (ev !== null && ev !== '') {
					const i = _.findIndex(this.cq.validations, e => e.valiTypeId === valiType);
					if (i !== -1) {
						this.cq.validations[i].valiExpress = ev;
					} else {
						this.cq.validations.push({ valiTypeId: valiType, valiTypeDesc: desc, valiExpress: ev });
					}
				} else {
					_.remove(this.cq.validations, e => e.valiTypeId === valiType);
				}
				break;
			default:
				this.defaultAttrSet(ev, flag, attr);
				break;
		}
	}

	changeFileOption(ev, flag: string) {
		if (flag === 'uploadAmount') {
			this.cq.options[0]['amount'] = ev;
		} else if (flag === 'uploadSize') {
			this.cq.options[0]['limit'] = ev;
		}
		this.ws.EditareaSyncQSet.next('SYNC_UPLOAD');

	}

	// ------------------------ Data Sync ---------------------------------------
	clearSelectRange() {
		this.opObj.selectMax = null;
		this.opObj.selectMin = null;
		_.remove(this.cq.validations, e => e.valiTypeId === ValiType.MinLength || e.valiTypeId === ValiType.MaxLength);
	}
	// ------------------------ Data Sync end -----------------------------------

}
