import { Component, OnInit } from '@angular/core';

import { WorkareaService } from '../workarea.service';

@Component({
	selector: 'iqnr-material-bar',
	templateUrl: './material-bar.component.html',
	styleUrls: ['./material-bar.component.scss']
})
export class MaterialBarComponent implements OnInit {

	public quesMaterial: Array<any>;

	constructor(private ws: WorkareaService) {
		this.quesMaterial = [
			{
				title: 'Choice',
				quesType: [
					{ id: 1, quesTypeId: 1, name: 'Radio', icon: 'fa-dot-circle-o' },
					{ id: 2, quesTypeId: 2, name: 'Check Box', icon: 'fa-check-square-o' },
					{ id: 3, quesTypeId: 3, name: 'Drop down Select', icon: 'fa-caret-square-o-down' },
					{ id: 4, quesTypeId: 4, name: 'Drop down Multiple Select', icon: 'fa-tasks' },
					{ id: 5, quesTypeId: 5, name: 'Scale Question', icon: 'fa-laptop' }
				]
			},
			{
				title: 'Text',
				quesType: [
					{ id: 6, quesTypeId: 6, name: 'Text', icon: 'fa-text-width' },
					{ id: 7, quesTypeId: 7, name: 'TextArea', icon: 'fa-paragraph' },
					{ id: 8, quesTypeId: 8, name: 'Number', icon: 'fa-list-ol' },
					{ id: 9, quesTypeId: 9, name: 'TypeAhead', icon: 'fa-keyboard-o' }
				]
			},
			{
				title: 'Date',
				quesType: [
					{ id: 10, quesTypeId: 10, name: 'Date', icon: 'fa-calendar-o' },
					{ id: 11, quesTypeId: 11, name: 'Date Range', icon: 'fa-calendar' }
				]
			},
			{
				title: 'Comment',
				quesType: [
					{ id: 12, quesTypeId: 12, name: 'Label', icon: 'fa-comment-o' },
					{ id: 13, quesTypeId: 13, name: 'Split line', icon: 'fa-minus' }
				]
			},
			{
				title: 'Others',
				quesType: [
					{ id: 15, quesTypeId: 15, name: 'Score', icon: 'fa-smile-o' },
					{ id: 14, quesTypeId: 14, name: 'Upload', icon: 'fa-file-o' },
					{ id: 16, quesTypeId: 16, name: 'Img Upload', icon: 'fa-file-image-o' }
				]
			}
		];
	}

	ngOnInit() {}

	dragStart(event: DragEvent, obj) {
		event.dataTransfer.setData('quesType', JSON.stringify(obj));
	}

	dragOver(event: DragEvent) {
		event.preventDefault();
	}

	dbclickType(item) {
		delete item.id;
		this.ws.addQuestion(item);
	}

}
