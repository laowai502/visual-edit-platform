import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditSectionInfo, EditSectionModel, EditSectionPanelModel } from 'src/app/core/model/interface/section.interface';
import { EditQuestionModel, EditScaleQuesModel } from 'src/app/core/model/interface/question.interface';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';

import { PageSectionService } from '../page-section.service';
import { PageSectionApi } from 'src/app/api/page-section.api';

import { guid } from 'src/app/utils';
import * as _ from 'lodash';

interface RenderMenu extends EditSectionModel {
	type?: string; // edit | real
}

@Component({
	selector: 'iqnr-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnChanges {

	// @Input() id: string;

	menus: Array<RenderMenu>;
	curSec: RenderMenu;
	calling: boolean;

	get pInfo(): ProjectInfo {
		return this.ws.projectInfo || null;
	}

	constructor(
		private ws: WorkareaService,
		public ps: PageSectionService,
		private psApi: PageSectionApi
	) {
		this.calling = false;
	}

	ngOnChanges(changes: SimpleChanges): void {
		// const o = changes.id;
		// if (changes.id) {
		// 	const o = changes.id;
		// 	if (o.firstChange) {
		// 		console.log(o.currentValue);
		// 	}
		// }
	}

	ngOnInit(): void {
		this.getData();
	}

	async getData() {
		const data: EditSectionInfo = await this.psApi.findOneEditSectionInfo(this.pInfo.id);
		if (data) {
			this.ps.editSectionInfo = data;
			if (this.ps.editSectionInfo.editSectionData.length === 0) {
				this.ps.editSectionInfo.editSectionData = [{
					level: 1,
					title: 'Add new item',
					icon: 'fa-plus-square-o',
					open: false,
					selected: false,
					disabled: false,
					type: 'edit'
				}];
			}
			this.calling = true;
		}
	}

	setDefaultVal(level) {
		return {
			level: level,
			title: 'Add new item',
			icon: 'fa-plus-square-o',
			open: false,
			selected: false,
			disabled: false,
			type: 'edit'
		}
	}

	addSameLevel(obj: RenderMenu, list: Array<RenderMenu>) {
		const len = list.length;
		const newItem: RenderMenu = {
			id: guid(),
			title: 'Level ' + obj.level + ' item ' + len,
			level: obj.level,
			icon: '',
			type: 'real',
			content: []
		};
		list.splice(len - 1, 0, newItem);
		setTimeout(() => {
			const el = document.getElementById(newItem.id);
			const tit: any = el.querySelector('.edit-title');
			if (tit) el.click(); tit.focus();
			this.curSec = newItem;
		});
	}

	removeSec(obj: RenderMenu, list: Array<RenderMenu>) {
		if (obj.content && obj.content.length > 0) {
			// need alert
		} else {
			if (this.curSec && this.curSec.id === obj.id) this.curSec = null;
			_.remove(list, e => e.id === obj.id);
		}
	}

	setParent(obj: RenderMenu) {
		if (obj.content && obj.content.length > 0) {
			return;
		}
		obj.open = true;
		obj.children = [
			this.setDefaultVal(obj.level + 1)
		];
		this.curSec = null;
	}

	clickMenu(obj: RenderMenu) {
		this.curSec = obj;
	}

	saveMenuItemTitle(obj: RenderMenu) {
		const el = document.getElementById(obj.id);
		const tit: string = el.querySelector('.edit-title').innerHTML;
		obj.title = tit;
	}

}
