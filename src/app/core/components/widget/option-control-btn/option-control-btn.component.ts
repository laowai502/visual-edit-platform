import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuestionType } from 'src/app/core/model/enum/question.enum';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'option-control',
	templateUrl: './option-control-btn.component.html',
	styleUrls: ['./option-control-btn.component.scss']
})
export class OptionControlBtnComponent implements OnInit {

	@Input() qType: number;

	@Output() removeOpt: EventEmitter<any> = new EventEmitter();

	quesType = QuestionType;

	constructor() { }

	ngOnInit(): void { }

	remove() {
		this.removeOpt.emit();
	}

}
