import { Component, OnInit, AfterViewInit, Input, ElementRef, HostListener } from '@angular/core';

import { WorkareaService } from '../../workarea.service';

import { QuestionType } from 'src/app/core/model/enum/question.enum';
import { EditQuestionModel } from 'src/app/core/model/interface/question.interface';

import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { mouseLocInDom } from 'src/app/utils';

import * as _ from 'lodash';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'ques-action-bar',
	templateUrl: './ques-action-bar.component.html',
	styleUrls: ['./ques-action-bar.component.scss']
})
export class QuesActionBarComponent implements OnInit, AfterViewInit {

	@Input() question: EditQuestionModel;

	private parentDom: any;
	private $selectMove: Subscription;

	private moveX = 0;
	private moveY = 0;

	public get quesList(): Array<EditQuestionModel> {
		return this.ws.editQuestionList || [];
	}

	public get showCopyAndLogic(): boolean {
		const { question: q } = this;
		return q && (q.quesTypeId !== QuestionType.Label && q.quesTypeId !== QuestionType.SplitLine);
	}

	constructor(private el: ElementRef, private ws: WorkareaService) { }

	@HostListener('document:mouseup') mouseup() {
		if (this.$selectMove) {
			this.$selectMove.unsubscribe();
			this.$selectMove = null; // handle only click, not mouse down and mouse move
			this.question.mouseDownMoving = this.ws.editQuesMoving = false;
			this.clearDragStyle();
			this.afterSelectDrag();
		}
	}

	ngOnInit() {}

	ngAfterViewInit() {
		this.parentDom = this.el.nativeElement.parentNode;
	}

	delEditQr(ev) {
		ev.stopPropagation();
		this.ws.deleteSingleEditQues(this.question);
	}

	copyEditQues() {
		const q = _.cloneDeep(this.question);
		const i = _.findIndex(this.quesList, e => e.questionId === q.questionId);
		this.ws.EditQuesCopy(q, i);
	}

	selectDrag(eve: any) {
		const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = this.parentDom;
		this.moveX = eve.clientX - offsetLeft;
		this.moveY = eve.clientY - offsetTop;
		this.$selectMove = fromEvent(document, 'mousemove')
			.pipe(throttleTime(50))
			.subscribe((e: any) => {
				this.question.mouseDownMoving = this.ws.editQuesMoving = true;
				this.parentDom.style.position = 'absolute';
				this.parentDom.style.opacity = '0.8';
				this.parentDom.style.zIndex = '1000';
				this.parentDom.style.width = offsetWidth + 'px';
				this.parentDom.style.height = offsetHeight + 'px';
				if (mouseLocInDom(e, this.parentDom)) {
					this.parentDom.style.left = (e.clientX - this.moveX) + 'px';
					this.parentDom.style.top = (e.clientY - this.moveY - 20) + 'px';
				} else {
					this.parentDom.style.top = e.pageY - 20 - 18 - 20 + 'px';
					const { offsetTop: ofs } = this.parentDom;
					this.moveY = e.clientY - ofs;
				}
			});
	}

	clearDragStyle() {
		this.parentDom.style.position = '';
		this.parentDom.style.opacity = '';
		this.parentDom.style.zIndex = '';
		this.parentDom.style.width = '';
		this.parentDom.style.height = '';
		this.parentDom.style.left = '';
		this.parentDom.style.top = '';
	}

	afterSelectDrag() {
		const i = this.quesList.findIndex((e: EditQuestionModel) => e.bottomDragStyle || e.topDragStyle);
		if (i !== -1) {
			const curItemIndex = this.quesList.findIndex(e => e === this.question);
			this.ws.changeQuerOrder(i, curItemIndex, this.quesList[i].bottomDragStyle ? 'behind' : 'front');
			this.quesList.forEach(e => {
				e.bottomDragStyle = e.topDragStyle = false;
			});
		}
	}

}
