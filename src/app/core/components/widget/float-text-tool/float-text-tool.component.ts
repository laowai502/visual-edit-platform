import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'float-text-tool',
	templateUrl: './float-text-tool.component.html',
	styleUrls: ['./float-text-tool.component.scss']
})
export class FloatTextToolComponent implements OnInit {

	// This parameter is in the form of 'string'. So it used to not bind with the value of the parent component
	@Input() content: string;

	@Output() textToolEvent: EventEmitter<any> = new EventEmitter();

	public editor: any;
	public isVisible = false;

	constructor() { }

	ngOnInit() {
		this.editor = {
			base_url: '/tinymce',
			suffix: '.min',
			height: 200,
			menubar: false,
			branding: false,
			statusbar: false,
			plugins: [
				'advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table paste code help wordcount'
			],
			toolbar:
				`bold italic backcolor | alignleft aligncenter alignright alignjustify |
				bullist numlist outdent indent | link | removeformat | help`
		};
	}

	handleCancel() {
		this.isVisible = false;
		this.textToolEvent.emit();
	}

	handleOk() {
		this.isVisible = false;
		this.textToolEvent.emit(this.content);
	}

}
