import { Component, OnInit } from '@angular/core';

import { ProjectService } from './project.service';
import { EditAreaApi } from 'src/app/api/edit-area.api';
import { ProjectApi } from 'src/app/api/project.api';
import { EditQuestionInfor } from 'src/app/core/model/interface/question.interface';

import { NzMessageService } from 'ng-zorro-antd/message';

import { Router } from '@angular/router';

@Component({
	selector: 'iqnr-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

	public pList: Array<any>;

	constructor(
		private router: Router,
		private projectApi: ProjectApi,
		private editAreaApi: EditAreaApi,
		private pSer: ProjectService,
		private mess: NzMessageService
	) {
		this.pList = [];
	}

	ngOnInit() {
		this.findAll();
	}

	findAll() {
		this.projectApi.findAllProject().then(data => {
			this.pList = data || [];
		});
	}

	async create() {
		const param = this.pSer.setDefaultProjectValue();
		const data = await this.projectApi.createProject(param);
		if (data !== null) {
			this.createEditQuestionInfor(data);
		}
	}

	async createEditQuestionInfor(id) {
		const param: EditQuestionInfor = {
			projectId: id,
			status: 'enable',
			dataCollection: []
		};
		const data = await this.editAreaApi.createEditQuestionInfor(param);
		if (data) {
			this.mess.create('success', 'Create successfully');
			this.router.navigate(['/main/workarea'], { queryParams: { id, type: 'Edit' } });
		}
	}

	async delete(ev: Event, id) {
		ev.stopPropagation();
		const data = await this.projectApi.deleteProject(id);
		const data_one = await this.editAreaApi.deleteEditQuestionInfor(id);
		if (data.affected > 0 && data_one.deletedCount > 0) {
			this.mess.create('success', 'Delete successfully');
			this.findAll();
		}
	}

}
