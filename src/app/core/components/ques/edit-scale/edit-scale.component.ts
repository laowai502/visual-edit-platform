import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { IqnrBaseQuestionComponent } from '../base.question';

import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';
import { EditQuestionModel, EditScaleQuesModel, Option, PointOption, ScoreOption } from 'src/app/core/model/interface/question.interface';
import { QuestionType } from 'src/app/core/model/enum/question.enum';

import { Subscription } from 'rxjs';

import { SCALE_EXTREME } from 'src/app/pages/main/workarea/setting/q-set/q-set.constant';
import { guid } from 'src/app/utils';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'edit-scale-ques',
	templateUrl: './edit-scale.component.html',
	styleUrls: ['./edit-scale.component.scss']
})
export class EditScaleComponent extends IqnrBaseQuestionComponent implements OnInit, OnChanges, OnDestroy {

	public renderList: Array<any>;

	public exleTxt: string;
	public exlCenTxt: string;
	public exlRiTxt: string;

	public quesType = QuestionType;

	private destr: Subscription;

	constructor(ws: WorkareaService) {
		super(ws);
		this.exlCenTxt = '';
		this.renderList = [];
	}

	ngOnInit() {
		this.destr = this.ws.EditareaSyncQSet.subscribe(data => {
			if (data === 'SYNC_SCALE') {
				if (this.ques.questionId === this.ws.curEidtQues.questionId) {
					this.renderList = [];
					const newVal: any = this.ques;
					this.handleScaleOptions(newVal);
				}
			}
		});
	}

	ngOnChanges(change: SimpleChanges) {
		const newVal: EditScaleQuesModel = change.ques.currentValue;
		if (newVal) {
			const type = newVal.quesTypeId;
			if (type === QuestionType.ScaleQuestion) {
				this.handleScaleOptions(newVal);
			} else {
				this.handleScoreOptions(newVal);
			}
		}
	}

	ngOnDestroy(): void {
		this.destr.unsubscribe();
	}

	handleScaleOptions(q: EditScaleQuesModel) {
		const opts: Array<PointOption> = q.options;
		if (opts.length === 0) { // options are related with EditScaleQuesModel setting;
			q.options = [ // Score per level
				{ optionId: guid(), optionDesc: '', point: 10 }
			];
			q.extremeKey = SCALE_EXTREME[0].key;
			q.extremeLeftText = SCALE_EXTREME[0].lValue;
			q.centerText = '';
			q.extremeRightText = SCALE_EXTREME[0].rValue;
			q.scaleLevel = 5;
			q.startLevelValue = 1;
		}
		// tslint:disable-next-line:no-string-literal
		const perPoint = q.options[0]['point'];
		let startlevelVale = q.startLevelValue;
		for (let i = 0; i < q.scaleLevel; i++) {
			this.renderList.push({
				points: startlevelVale * perPoint,
				label: startlevelVale++
			});
		}
		this.exlCenTxt = q.centerText || '';
		this.exleTxt = q.extremeLeftText;
		this.exlRiTxt = q.extremeRightText;
		// To resolve typescript build error
	}

	handleScoreOptions(q: EditQuestionModel) {
		const opts: Array<ScoreOption> = q.options;
		if (opts.length === 0) { // options are related with EditScaleQuesModel setting;
			q.options = [ // Score per level
				{ optionId: guid(), optionDesc: '', minValue: 1, maxValue: 5, lText: '', cText: '', rText: '' }
			];
		}
		const opt: ScoreOption = q.options[0];
		// tslint:disable-next-line:no-string-literal
		for (let i = opt['minValue']; i <= opt['maxValue'] + 1 - opt['minValue']; i++) {
			this.renderList.push(i);
		}
		this.exlCenTxt = opt.cText || '';
		this.exleTxt = opt.lText || '';
		this.exlRiTxt = opt.rText || '';
	}

}
