import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { WorkareaService } from '../../pages/main/workarea/workarea.service';
import { EditQuestionModel } from '../model/interface/question.interface';

import { getDomPageX, getDomPageY  } from 'src/app/utils';

import { throttle } from 'lodash';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[drag-mouse-move]'
})
export class DragoverTargetDirective {

	@Input() public bindData: EditQuestionModel;

    @Output()
    public DragMoving: EventEmitter<boolean> = new EventEmitter();

	@Output()
    public MousedownMoving: EventEmitter<boolean> = new EventEmitter();

    @HostListener('dragover', ['$event']) dragOverInner = throttle(this.handle, 200, { trailing: false });

	@HostListener('document:mousemove', ['$event']) moving = throttle(this.handleMoving, 200, { trailing: false });

    constructor(
		// tslint:disable-next-line:variable-name
		private _elementRef: ElementRef,
		private ws: WorkareaService
	) { }

	private handle(eve: DragEvent) {
		eve.preventDefault();
		const { nativeElement: na } = this._elementRef;
		/**
		 * The judgment here is not accurate,
		 * but the good thing is that the directive host element's father element is body element, so we can use [na.offsetHeight] directly;
		 */
		this.DragMoving.emit((na.offsetTop + na.offsetHeight - eve.pageY) < na.offsetHeight * 0.5);
	}

	private handleMoving(ev) {
		if (!this.bindData.mouseDownMoving && this.ws.editQuesMoving) {
			const { nativeElement: na } = this._elementRef;
			const mX = ev.pageX;
			const mY = ev.pageY;
			const wh = na.offsetWidth;
			const h = na.offsetHeight;
			const l = getDomPageX(na);
			const t = getDomPageY(na);
			if ((mX > l && mX < wh + l) && (mY > t && mY < h + t)) {
				this.bindData.topDragStyle = mY - t <= h / 2;
				this.bindData.bottomDragStyle = mY - t > h / 2;
			} else {
				this.bindData.topDragStyle = this.bindData.bottomDragStyle = false;
			}
		}
	}

}
