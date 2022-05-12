import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'option-operat',
	templateUrl: './option-operat-btn.component.html',
	styleUrls: ['./option-operat-btn.component.scss']
})
export class OptionOperatBtnComponent implements OnInit {

	@Output() addOptsEmitter: EventEmitter<any> = new EventEmitter();

	public isVisible: boolean;
	public optionText: string;

	constructor() {
		this.isVisible = false;
	}

	ngOnInit(): void {}

	addOption() {
		this.addOptsEmitter.emit({ type: 'single' });
	}

	handleOk() {
		this.addOptsEmitter.emit({ type: 'batch', text: this.optionText });
		this.handleCancel();
	}

	handleCancel() {
		this.isVisible = false;
		this.optionText = '';
	}

}
