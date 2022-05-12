import { Injectable } from '@angular/core';

import { EditQuestionInfor, EditQuestionModel, Option } from 'src/app/core/model/interface/question.interface';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';

import { guid } from 'src/app/utils';
import { ngFocus, removeClassById } from 'src/app/utils/dom';

import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class WorkareaService {

	public projectName: string;
	public curEidtQues: EditQuestionModel | EditQuestionModel; // 当前选中的可编辑题目，setting 数据源

	public projectInfo: ProjectInfo;
	public editQuestionInfo: EditQuestionInfor;
	public editQuestionList: Array<EditQuestionModel | EditQuestionModel>; // mainly questionlist, binding this list of each component

	public editQuesMoving: boolean;

	public SettingSyncEditarea: Subject<any>; // setting 组件 和 可编辑区之间的交互
	/**
	 * 可编辑区与，q-set 组件之间交互, 下来为广播的值与意义描述
	 * 1. CLEAR_SELECT_RANGE
	 * 2. SYNC_UPLOAD 3. SYNC_SCALE
	 */
	public EditareaSyncQSet: Subject<any>;

	constructor() {
		this.editQuestionList = [];
		this.editQuesMoving = false;
		this.SettingSyncEditarea = new Subject();
		this.EditareaSyncQSet = new Subject();
	}

	private setDefaultOption(): any {
		const defaultData = {
			questionId: guid(),
			quesDesc: '',
			topDragStyle: false,
			bottomDragStyle: false,
			focus: false,
			mouseenter: false,
			mouseDownMoving: false,
			showSeq: false,
			seqNo: null,
			tooltip: null,
			identify: '',
			layout: 1, // A, B, C
			options: [],
			optSet: {},
			validations: []
		}
		defaultData.showSeq = this.projectInfo.showQNumber;
		defaultData.seqNo = this.editQuestionList?.length + 1 || 1;
		return defaultData;
	}

	// clear current when component destory
	public clearData() {
		this.clearCurEditQues();
		this.projectName = this.projectInfo = null;
		this.editQuestionList = this.editQuestionInfo = null;
	}

	public clearCurEditQues() {
		this.curEidtQues = null;
	}

	/**
	 * add edit ques
	 * @param item question entity
	 */
	public addQuestion(item: EditQuestionModel): void {
		const q = _.cloneDeep(item);
		const param: EditQuestionModel = _.merge(q, this.setDefaultOption());
		this.editQuestionList.push(param);
		this.delAnimation(param.questionId);
		this.focusQues(this.editQuestionList.length - 1);
	}

	/**
	 * insert a new ques into list
	 * @param insertQ question need to be inserted
	 * @param targetQ insert postion target question
	 */
	public insertIntoQuesList(insertQ: any, targetQ: any) {
		const q = _.cloneDeep(insertQ);
		const index = this.editQuestionList.indexOf(targetQ);
		const param: EditQuestionModel = _.merge(insertQ, this.setDefaultOption());
		if (targetQ.topDragStyle) {
			this.editQuestionList.splice(index, 0, param);
			this.focusQues(index);
		} else if (targetQ.bottomDragStyle) {
			this.editQuestionList.splice(index + 1, 0, param);
			this.focusQues(index + 1);
		}
		this.delAnimation(param.questionId);
	}

	/**
	 * handle ques action btn move btn
	 * @param newIndex new postion
	 * @param OriginalIndex original postion
	 * @param direction before or after for the drop element(ques)
	 */
	public changeQuerOrder(newIndex: number, OriginalIndex: number, direction: string = 'front') {
		const dragItem = this.editQuestionList.splice(OriginalIndex, 1)[0];
		let i = direction === 'front' ? newIndex : newIndex + 1;
		if (OriginalIndex < newIndex) {
			i -= 1;
		}
		this.editQuestionList.splice(i, 0, dragItem);
		this.focusQues(i);
	}

	/**
	 * Delete question
	 * @param ques current remove ques
	 */
	public deleteSingleEditQues(ques: EditQuestionModel) {
		this.SettingSyncEditarea.next('SETTING');
		if (this.curEidtQues && ques.questionId === this.curEidtQues.questionId) {
			this.curEidtQues = null;
		}
		const index = _.findIndex(this.editQuestionList, (e: EditQuestionModel) => e.questionId === ques.questionId);
		this.editQuestionList.splice(index, 1);
	}

	public EditQuesCopy(ques: EditQuestionModel, index: number) {
		if (ques) {
			ques.questionId = guid();
			ques.bottomDragStyle = false;
			ques.topDragStyle = false;
			ques.focus = false;
		}
		this.editQuestionList.splice(index + 1, 0, ques);
		this.focusQues(index + 1);
		this.delAnimation(ques.questionId);
	}

	// ------------------------------- handle ui style sync -------------------------------------------------//
	public focusThisQues(ques: EditQuestionModel) { // only handle style when click on ques container
		this.removeOtherFocus();
		ques.focus = true;
	}

	private focusQues(index) { // focus by codes
		const q = this.editQuestionList[index];
		this.curEidtQues = q;
		this.SettingSyncEditarea.next('QUES');
		ngFocus(q.questionId);
	}

	public removeOtherFocus() {
		for (const a of this.editQuestionList) {
			if (a.focus) {
				a.focus = false;
				this.removeOtherOptionFocus(a.options);
				break;
			}
		}
	}

	public removeOtherOptionFocus(opts?: Array<Option>) { // handle with options' focusing
		if (opts.length !== 0) {
			for (const b of opts) {
				if (b.focus) {
					b.focus = b.showOperateBtn = false;
					break;
				}
			}
		}
	}

	private delAnimation(id: string) { // Remove animation to default animate again when changing order or copy question
		removeClassById(id, 'ques-appear-animation', 0.75);
	}
	// ------------------------------- handle ui style sync end -------------------------------------------------//

	// ------------------------------- editarea interact with setting -------------------------------------------//
	public toggleQuesSeqNo(value: boolean) {
		this.editQuestionList.forEach(e => {
			e.showSeq = value;
		});
	}
	// ------------------------------- editarea interact with setting end -------------------------------------------//
}
