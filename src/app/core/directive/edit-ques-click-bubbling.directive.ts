import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import { EditQuestionModel } from '../model/interface/question.interface';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';

/**
 * 处理该区域内，所有click事件的汇总，对冒泡上来的点击事件进行分析处理
 */
@Directive({
	selector: '[eqClickBubbling]'
})
export class EditQuesClickBubblingDirective {

	@Input() public bubbingData: EditQuestionModel;

	constructor(
		private _elementRef: ElementRef,
		private ws: WorkareaService
	) { }

	@HostListener('mousedown', ['$event']) dragOverInner = (ev) => {
		const target = ev.target;
		const noFocus = target.getAttribute('data-no-focus');
		if (!noFocus) { // 1. 判断点击事件源自于哪些元素，是否需要选中题
			if (!this.ws.curEidtQues) {
				this.ws.curEidtQues = this.bubbingData;
				this.ws.SettingSyncEditarea.next('QUES');
			} else {
				if (this.ws.curEidtQues.questionId === this.bubbingData.questionId) {
					// todo
				} else {
					this.ws.curEidtQues = this.bubbingData;
					this.ws.SettingSyncEditarea.next('QUES');
				}
			}
		}
	};

}
