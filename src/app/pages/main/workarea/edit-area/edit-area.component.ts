import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { WorkareaService } from '../workarea.service';

import { QuestionType } from 'src/app/core/model/enum/question.enum';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditQuestionModel } from 'src/app/core/model/interface/question.interface';

import * as _ from 'lodash';

@Component({
	selector: 'iqnr-edit-area',
	templateUrl: './edit-area.component.html',
	styleUrls: ['./edit-area.component.scss']
})
export class EditAreaComponent implements OnInit, OnDestroy, AfterViewInit {

	// parameter about drag and drop
	public bottomDragStyle: boolean;
	private dragBoundary: EventTarget;

	public wel: string;

	public QuesType = QuestionType;

	public get proInfo(): ProjectInfo {
		return this.wSer.projectInfo;
	}

	public get editQuesList(): Array<EditQuestionModel> {
		return this.wSer.editQuestionList;
	}
	public set editQuesList(val: Array<EditQuestionModel>) {
		this.wSer.editQuestionList = val;
	}

	public get title(): string {
		return this.wSer.projectName || '<p id="TitleContent">Your questionnaire title</p>';
	}
	public set title(val: string) {
		this.wSer.projectInfo.projectName = this.wSer.projectName = val;
	}

	public get showTip(): boolean {
		return this.editQuesList?.length === 0;
	}

	@ViewChild('title_area') titleArea: ElementRef;

	constructor(private wSer: WorkareaService) {
		this.wel = 'Here are some opening hints or welcome words !';
	}

	ngOnInit() {}

	ngOnDestroy() {}

	ngAfterViewInit(): void {
		const { nativeElement: na } = this.titleArea;
		na.addEventListener('click', () => {
			if (this.wSer.curEidtQues) {
				this.wSer.SettingSyncEditarea.next('SETTING');
			}
		});
	}

	saveTitle() {
		const titleDom = document.querySelector('#TitleContent');
		let title = titleDom.textContent;
		if (title === '') {
			title = titleDom.textContent = 'Your questionnaire title';
		} else if (title.trim() !== 'Your questionnaire title') {
			this.title = titleDom.outerHTML;
		}
	}

	focusQues(q: EditQuestionModel) {
		if (!q.focus) {
			this.wSer.focusThisQues(q);
		}
	}

	// -------------------------------------- drag func start -------------------------------------
	clearDragData(obj: any) {
		this.dragBoundary = null;
		this.bottomDragStyle = false;
		if (obj) {
			if (typeof(obj) !== 'string') {
				obj.topDragStyle = obj.bottomDragStyle = false;
			}
		}
	}

	dragMove(eve: boolean, obj: any) {
		if (this.dragBoundary === null) {
			return;
		}
		obj.topDragStyle = !eve;
		obj.bottomDragStyle = eve;
	}

	dragEnter(eve: DragEvent, type: string) {
		this.dragBoundary = eve.target;
		if (type === 'tip') {
			this.bottomDragStyle = true;
		}
	}

	dragLeave(eve: DragEvent, obj: any) {
		if (this.dragBoundary === eve.target) {
			this.clearDragData(obj);
		}
	}

	dropQues(eve: DragEvent, obj?: any) {
		eve.stopPropagation();
		let transferData: any = eve.dataTransfer.getData('quesType');
		if (!!transferData) {
			transferData = JSON.parse(transferData);
			delete transferData.id;
		} else {
			return;
		}
		// console.log(transferData);
		if (this.showTip) {
			this.wSer.addQuestion(transferData);
		} else {
			// tslint:disable-next-line:no-unused-expression
			obj && this.wSer.insertIntoQuesList(transferData, obj);
		}
		eve.dataTransfer.clearData();
		this.clearDragData(obj);
	}
	// -------------------------------------- drag func end -------------------------------------
}
