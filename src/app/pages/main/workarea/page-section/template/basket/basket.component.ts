import { Component, OnInit, OnDestroy } from '@angular/core';

import { EditQuestionModel, EditScaleQuesModel } from 'src/app/core/model/interface/question.interface';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';
import { QuestionType, ValiType } from 'src/app/core/model/enum/question.enum';

import { PageSectionService } from '../../page-section.service';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

@Component({
	selector: 'iqnr-basket',
	templateUrl: './basket.component.html',
	styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

	copyList: Array<EditQuestionModel>;

	syncDestr: Subscription;

	constructor(private ws: WorkareaService,
		private pss: PageSectionService
	) {
		this.copyList = [];
		this.syncDestr = this.pss.EditZoneSyncBasket.subscribe(param => {
			if (param.type === 'REMOVE') {
				this.dragEndRemove(param.id);
			} else if (param.type === 'RESTORE') {
				this.copyList.push(param.data)
			}
		});
	}

	ngOnDestroy(): void {
		this.syncDestr.unsubscribe();
	}

	ngOnInit(): void {
		this.copyList = this.pss.editSectionInfo.editQuestionsWaitList;
	}

	dragStart(event: DragEvent, obj: EditQuestionModel | EditScaleQuesModel) {
		event.dataTransfer.setData('ContentItem', JSON.stringify(obj));
	}

	dragEndRemove(id: string) {
		const i = _.findIndex(this.copyList, e => e.questionId === id);
		this.copyList.splice(i, 1);
	}

}
