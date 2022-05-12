import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild, ElementRef, HostListener } from '@angular/core';

import { QuestionType, ValiType } from '../../model/enum/question.enum';
import { EditQuestionModel, EditScaleQuesModel } from '../../model/interface/question.interface';

import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';

import * as _ from 'lodash';

@Component({
	selector: 'iqnr-base-question',
	templateUrl: './base.question.html',
	styleUrls: ['./base.question.scss']
})
export class IqnrBaseQuestionComponent implements OnInit, OnChanges {

	qType = QuestionType;

	defaultTitle: string;
	showTextFloatTool: boolean;

	editTileFlag: boolean;

	showFrontWrap: boolean;

	private supportShowTextFloatTool: boolean; // use this paramter to support TextFloatTool show or hidden

	get showRequired(): boolean {
		return this.ques?.validations.some(e => e.valiTypeId === ValiType.Required);
	}

	get showSeq(): boolean {
		return this.ws.projectInfo.showQNumber;
	}

	@Input() public ques: EditQuestionModel;

	@Input() public type: string; // EDIT | READ

	@ViewChild('q_title') private qTitleRef: ElementRef;

	@HostListener('click', ['$event.target']) hostClick(eve) {
		if (eve) {
			this.supportShowTextFloatTool = eve.className.includes('text-float-tool-item');
		}
	}

	constructor(public ws: WorkareaService) {
		this.editTileFlag = true;
		this.showTextFloatTool = false;
	}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.type) {
			this.editTileFlag = changes.type.currentValue === 'EDIT';
		}
		if (changes.ques) {
			const q: EditQuestionModel = changes.ques.currentValue;
			this.showFrontWrap = q.quesTypeId !== QuestionType.Label && q.quesTypeId !== QuestionType.SplitLine;
			if (!q.quesDesc || q.quesDesc === '') {
				this.setDefaultTitle();
			}
		}
	}

	setDefaultTitle() {
		const type = this.ques.quesTypeId;
		switch (type) {
			case QuestionType.Radio:
				this.ques.quesDesc = 'Please select an option';
				break;
			case QuestionType.CheckBox:
				this.ques.quesDesc = 'Please select from the following options';
				break;
			case QuestionType.DropdownSelect:
			case QuestionType.DropdownMultipleSelect:
				this.ques.quesDesc = 'Please select from the list below';
				break;
			case QuestionType.ScaleQuestion:
				this.ques.quesDesc = 'Please put a tick on the most suitable';
				break;
			case QuestionType.Score:
				this.ques.quesDesc = 'Please rate the items below.';
				break;
			case QuestionType.Text:
			case QuestionType.Number:
			case QuestionType.TextArea:
				this.ques.quesDesc = 'Please fill in this item';
				break;
			case QuestionType.TextArea:
				this.ques.quesDesc = 'Please fill in the following fields';
				break;
			case QuestionType.TypeAhead:
				this.ques.quesDesc = 'You can enter the content, or you can choose what you want according to the prompt!';
				break;
			case QuestionType.Date:
				this.ques.quesDesc = 'Please select a date';
				break;
			case QuestionType.DateRange:
				this.ques.quesDesc = 'Please select the date range';
				break;
			case QuestionType.Label:
				this.ques.quesDesc = 'Please read this description and answer other questions.';
				break;
			case QuestionType.SplitLine:
				this.editTileFlag = false;
				this.ques.quesDesc = '';
				break;
			case QuestionType.Upload:
				this.ques.quesDesc = 'Please upload the file.';
				break;
			case QuestionType.ImgUpload:
				this.ques.quesDesc = 'Please upload pictures.';
				break;
			default:
				break;
		}
	}

	focusTitle() {
		this.showTextFloatTool = true;
		this.ws.focusThisQues(this.ques);
	}

	saveTitle() {
		this.ques.quesDesc = this.qTitleRef.nativeElement.innerHTML;
		setTimeout(() => {
			if (this.supportShowTextFloatTool) {
				this.supportShowTextFloatTool = false;
			} else {
				this.showTextFloatTool = false;
				// auto save title to do here
			}
		}, 200);
	}

	textToolEvent(eve) {
		if (eve) {
			this.ques.quesDesc = eve;
		}
		setTimeout(() => {
			this.qTitleRef.nativeElement.focus();
		}, 300);
	}

	// ---------------------------------- These fn need are used by child ---------------------------------------------------------- //

	// ----------------------------------------------------------------------------------------------------------------------------- //

}
