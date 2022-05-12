import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IqnrBaseQuestionComponent } from '../base.question';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';

import { EditQuestionModel, Option } from 'src/app/core/model/interface/question.interface';
import { QuestionType } from 'src/app/core/model/enum/question.enum';

import { guid } from 'src/app/utils';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'edit-select-type-ques',
	templateUrl: './select-type.component.html',
	styleUrls: ['./select-type.component.scss']
})
export class SelectTypeComponent extends IqnrBaseQuestionComponent implements OnInit, OnChanges, OnDestroy {

	public qType = QuestionType;
	public iconType: string;

	@Input() public type: string = 'EDIT'; // EDIT | READ

	constructor(public ws: WorkareaService) {
		super(ws);
	}

	ngOnInit() {}

	ngOnChanges(change: SimpleChanges) {
		const val = change.ques.currentValue;
		if (val) {
			this.handleRadioOptions(val);
		}
	}

	ngOnDestroy() { }

	handleRadioOptions(q: EditQuestionModel) {
		switch (q.quesTypeId) {
			case QuestionType.Radio:
				this.iconType = 'fa fa-circle-thin';
				break;
			case QuestionType.CheckBox:
				this.iconType = 'fa fa-square-o';
				break;
			case QuestionType.DropdownSelect:
				this.iconType = 'fa fa-caret-down';
				break;
			case QuestionType.DropdownMultipleSelect:
				this.iconType = 'fa fa-check-square-o';
				break;
			default:
				break;
		}
		if (q.options.length === 0) {
			q.options = [
				{ optionId: guid(), optionDesc: 'Option 1', showOperateBtn: false, focus: false },
				{ optionId: guid(), optionDesc: 'Option 2', showOperateBtn: false, focus: false }
			];
		}
	}

	optionContentFocus(opt: Option) {
		/**
		 * if this question is already focused, we should first remove other options' focused style.
		 * otherwise we should remove the other question focused style that it is being focusing. (By using [focusThisQues] in WorkareaService)
		 */
		if (this.ques.focus) {
			this.ws.removeOtherOptionFocus(this.ques.options);
		} else {
			this.ws.focusThisQues(this.ques);
		}
		opt.focus = true;
	}

	addOptions(param: any) {
		if (param) {
			const l = this.ques.options.length;
			const { type, text } = param;
			const { options } = this.ques;
			if (type === 'single') {
				options.push({ optionId: guid(), optionDesc: `Option ${ l + 1 }`, showOperateBtn: false, focus: false });
			} else {
				const arr = text.split(/\n/);
				arr.forEach((item: string) => {
					options.push({ optionId: guid(), optionDesc: item, showOperateBtn: false, focus: false });
				});
			}
		}
	}

	removeOption(ev: any, opt: Option) {
		const { options, quesTypeId } = this.ques;
		const index = options.findIndex(e => e.optionId === opt.optionId);
		options.splice(index, 1);
		if (quesTypeId === QuestionType.CheckBox || quesTypeId === QuestionType.DropdownMultipleSelect) {
			this.ws.EditareaSyncQSet.next('CLEAR_SELECT_RANGE');
		}
	}

	dragSort(newIndex: number, oldIndex: number, opt: Option) {
		opt.optsMoving = false;
		const { options: opts } = this.ques;
		const dragOpt = opts.splice(oldIndex, 1)[0];
		opts.splice(newIndex, 0, dragOpt);
	}

	removeOtherFocus(ops: Option, idx: number) {
		ops.optsMoving = true;
		this.ques.options.forEach((e, i) => {
			if (i === idx) { return; }
			e.focus = e.showOperateBtn = false;
		});
	}

}
