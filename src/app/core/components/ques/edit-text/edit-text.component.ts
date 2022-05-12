import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IqnrBaseQuestionComponent } from '../base.question';

import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';
import { EditQuestionModel, Option } from 'src/app/core/model/interface/question.interface';
import { QuestionType } from 'src/app/core/model/enum/question.enum';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'edit-text-question',
	templateUrl: './edit-text.component.html',
	styleUrls: ['./edit-text.component.scss']
})
export class EditTextComponent extends IqnrBaseQuestionComponent implements OnInit, OnChanges {

	public quesType: any;
	public QuesType: any;

	constructor(ws: WorkareaService) {
		super(ws);
		this.QuesType = QuestionType;
	}

	ngOnInit() { }

	ngOnChanges(change: SimpleChanges) {
		const val = change.ques.currentValue;
		if (val) {
			this.quesType = val.quesTypeId;
		}
	}

}
