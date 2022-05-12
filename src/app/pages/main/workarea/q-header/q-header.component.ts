import { Component, OnInit } from '@angular/core';
import { WorkareaService } from '../workarea.service';
import { PageSectionService } from '../page-section/page-section.service';

import { ProjectApi } from 'src/app/api/project.api';
import { EditAreaApi } from 'src/app/api/edit-area.api';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { NzMessageService } from 'ng-zorro-antd/message';

import * as _ from 'lodash';

@Component({
	selector: 'iqnr-q-header',
	templateUrl: './q-header.component.html',
	styleUrls: ['./q-header.component.scss']
})
export class QHeaderComponent implements OnInit {

	get pName() {
		return this.ws.projectName || 'Your Project Name';
	}

	public step: number;
	public infoTooltip: string;
	public commentTooltip: string;

	constructor(
		private ws: WorkareaService,
		private ps: PageSectionService,
		private pApi: ProjectApi,
		private eApi: EditAreaApi,
		private mess: NzMessageService
	) {
		this.step = 1;
		this.infoTooltip = 'It will direct to Guidance page';
		this.commentTooltip = 'You can give us some feedback here';
	}

	ngOnInit() {}

	preview() {
		console.log(JSON.stringify(this.ws.projectName));
		console.log(JSON.stringify(this.ws.projectInfo));
		console.log(JSON.stringify(this.ws.editQuestionList));
		console.log(JSON.stringify(this.ps.editSectionInfo));
	}

	async save() {
		const p = _.cloneDeep(this.ws.projectInfo);
		const E = _.cloneDeep(this.ws.editQuestionInfo);
		E.dataCollection = _.cloneDeep(this.ws.editQuestionList);
		const dataP = await this.pApi.updateProject(p.id, p);
		const dataE = await this.eApi.updateEditQuestionInfor(E.id, E);
		if (dataP.affected > 0 && dataE.affected > 0) {
			this.mess.create('success', 'Saved successfully');
		}
	}

}
