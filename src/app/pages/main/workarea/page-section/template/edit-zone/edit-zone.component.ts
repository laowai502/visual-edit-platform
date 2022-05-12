import { Component, OnInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditQuestionModel, EditScaleQuesModel } from 'src/app/core/model/interface/question.interface';
import { EditSectionModel, EditSectionPanelModel } from 'src/app/core/model/interface/section.interface';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';
import { PageSectionService } from '../../page-section.service';
import { QuestionType, ValiType } from 'src/app/core/model/enum/question.enum';

import { NzMessageService } from 'ng-zorro-antd/message';

import { ngFocus } from 'src/app/utils/dom';

import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
	selector: 'edit-zone',
	templateUrl: './edit-zone.component.html',
	styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent implements OnInit, OnChanges {

	public QuesType = QuestionType;

	@Input() item: EditSectionModel;

	constructor(private pss: PageSectionService, private message: NzMessageService) { }

	ngOnChanges(changes: SimpleChanges): void {
		// console.log(changes);
		if (changes.contents) { }
	}

	ngOnInit(): void {}

	// ------------------------ panel edit -------------------------------------------
	addHierarchy(conts: Array<EditSectionPanelModel>, level: number, ci: string) {
		// _.filter(conts, e => e.children).forEach(e => e.active = false);
		const index =  _.findLastIndex(conts, e => e.children);
		const i = index < 0 ? 1 : index + 2;
		ci = ci === '0' ? '' + i : (ci + '.' + i);
		conts.push({
			name: 'Panel ' + ci, active: true,
			level, cIndex: ci, children: []
		});
		ngFocus(ci);
		// console.log(this.item);
	}

	savePanelTitle(cont) {
		const inner = document.getElementById(cont.cIndex).innerHTML;
		cont.name = inner;
	}

	removePanel(cont, conts) {
		if (cont.children) {
			if (cont.children.length > 0) {
				// cont.active = true;
				this.message.create('warning', 'Including child elements, deletion failed!');
			} else {
				const i = _.findIndex(conts, e => e.cIndex === cont.cIndex);
				conts.splice(i, 1);
			}
		}
	}
	// ------------------------ panel edit end -------------------------------------------


	// ------------------------ content action -------------------------------------------
	removeContent(cont, conts) {
		this.pss.EditZoneSyncBasket.next({ type: 'RESTORE', data: cont});
		const i = _.findIndex(conts, e => e.questionId === cont.questionId);
		conts.splice(i, 1);
	}

	dropZoneEvent(eve: DragEvent, cont) {
		eve.stopPropagation();
		let transferData: any = eve.dataTransfer.getData('ContentItem');
		if (!!transferData) {
			transferData = JSON.parse(transferData);
		} else {
			return;
		}
		let lastIndex = _.findLastIndex(cont, e => !e.children);
		if (lastIndex === -1) {
			cont.unshift(transferData);
		} else {
			cont.splice(++lastIndex, 0, transferData);
		}
		ngFocus(transferData.questionId);
		this.pss.EditZoneSyncBasket.next({ type: 'REMOVE', id: transferData.questionId});
		eve.dataTransfer.clearData();
	}
	// ------------------------ content action end -------------------------------------------

}
