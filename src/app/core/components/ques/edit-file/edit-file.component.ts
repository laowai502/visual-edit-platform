import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input } from '@angular/core';
import { IqnrBaseQuestionComponent } from '../base.question';

import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';
import { EditQuestionModel, FileOption } from 'src/app/core/model/interface/question.interface';
import { QuestionType } from 'src/app/core/model/enum/question.enum';

import { Subscription } from 'rxjs';
import { guid } from 'src/app/utils';

@Component({
	selector: 'iqnr-edit-file',
	templateUrl: './edit-file.component.html',
	styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent extends IqnrBaseQuestionComponent implements OnInit, OnChanges, OnDestroy {

	public limit: number;
	public amount: number;

	public quesType = QuestionType;

	@Input() public type: string = 'EDIT'; // EDIT | READ

	private destr: Subscription;

	constructor(ws: WorkareaService) {
		super(ws);
	}

	ngOnDestroy(): void {
		this.destr.unsubscribe();
	}

	ngOnInit(): void {
		this.destr = this.ws.EditareaSyncQSet.subscribe(data => {
			if (data === 'SYNC_UPLOAD') {
				if (this.ques.questionId === this.ws.curEidtQues.questionId) {
					this.handleOption(this.ques);
				}
			}
		});
	}

	ngOnChanges(change: SimpleChanges) {
		const newVal: EditQuestionModel = change.ques.currentValue;
		if (newVal) {
			this.handleOption(newVal);
			const type = newVal.quesTypeId;
			if (type === QuestionType.Upload) {
				// TODO
			} else if (type === QuestionType.ImgUpload) {
				// TODO
			}
		}
	}

	handleOption(q: EditQuestionModel) {
		const { options: opt } = q;
		if (opt.length === 0) {
			q.options = [
				{ optionId: guid(), optionDesc: '', limit: 30, amount: 10 }
			];
		}
		// tslint:disable-next-line:no-string-literal
		this.limit = q.options[0]['limit'];
		// tslint:disable-next-line:no-string-literal
		this.amount = q.options[0]['amount'];
	}

}
