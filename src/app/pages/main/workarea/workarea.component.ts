import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WorkareaService } from './workarea.service';
import { ProjectApi } from 'src/app/api/project.api';
import { EditAreaApi } from 'src/app/api/edit-area.api';

import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditQuestionModel, EditQuestionInfor } from 'src/app/core/model/interface/question.interface';

@Component({
	selector: 'iqnr-workarea',
	templateUrl: './workarea.component.html',
	styleUrls: ['./workarea.component.scss']
})
export class WorkareaComponent implements OnInit, OnDestroy {

	name: string;
	projectId: string;
	type: string;

	get pInfo(): ProjectInfo {
		return this.ws.projectInfo;
	}

	constructor(
		private pApi: ProjectApi,
		private eApi: EditAreaApi,
		private ws: WorkareaService,
		private route: ActivatedRoute
	) {
		this.route.queryParams.subscribe(data => {
			if (data.id) this.projectId = data.id;
			if (data.type) this.type = data.type;
		});
	}

	ngOnInit() {
		const name = sessionStorage.getItem('WORKAREA_NAV_NAME');
		this.name = name || 'EditArea';
		this.getData();
	}

	ngOnDestroy() {
		this.ws.clearData();
		sessionStorage.removeItem('WORKAREA_NAV_NAME');
	}

	async getData() {
		try {
			const data: ProjectInfo = await this.pApi.findOneProject(this.projectId);
			if (data) {
				const edit_data: EditQuestionInfor = await this.eApi.findOneEditQuestionInfor(data.id);
				if (edit_data) {
					this.ws.projectInfo = data;
					this.ws.projectName = data.projectName;
					this.ws.editQuestionInfo = edit_data;
					this.ws.editQuestionList = edit_data.dataCollection;
				}
			}
		} catch (error) {
			console.error(error);
		}
	}

	togglePage(name: string) {
		if (name === 'EditArea') {
			this.ws.curEidtQues = null;
			this.ws.removeOtherFocus();
		}
		this.name = name;
		sessionStorage.setItem('WORKAREA_NAV_NAME', this.name);
	}

}
