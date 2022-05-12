import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditQuestionModel, EditScaleQuesModel } from 'src/app/core/model/interface/question.interface';
import { EditSectionInfo } from 'src/app/core/model/interface/section.interface';
import { WorkareaService } from 'src/app/pages/main/workarea/workarea.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { ProjectApi } from 'src/app/api/project.api';
import { PageSectionApi } from 'src/app/api/page-section.api';

import * as _ from 'lodash';

@Component({
	selector: 'page-section',
	templateUrl: './page-section.component.html',
	styleUrls: ['./page-section.component.scss']
})
export class PageSectionComponent implements OnInit {

	isVisible: boolean;
	templates: Array<any>;

	curTemplateId: any;
	curTemplatesPic: Array<string>;

	get pInfo(): ProjectInfo {
		return this.ws.projectInfo || null;
	}

	constructor(private ws: WorkareaService,
		private projectApi: ProjectApi,
		private pageSectionApi: PageSectionApi,
		private mess: NzMessageService,
	) {
		this.isVisible = false;
	}

	ngOnInit(): void {
		this.templates = [
			{ id: 1, name: 'Left Nav', jpgs: ['1.jpg', '2.jpg', '3.jpg'], view: 352, like: 12,
				desc: 'In the classic left-right layout, you can configure sidebar on the left and set different contents to belong to different sections'  },
			{ id: 2, name: 'Hotizontal Tabs', jpgs: ['4.jpg', '5.jpg'], view: 112, like: 6,
				desc: 'You will find the dynamic tabs on the top and arrange horizontally. Configure your different contents under their respective tab pages' },
			{ id: 3, name: 'Pagination', jpgs: ['6.jpg', '7.jpg'], view: 23, like: 8,
				desc: 'The most basic pagination layout shows the content you want on each page and turns the page through buttons' },
			{ id: 4, name: 'Anchor', jpgs: ['8.jpg', '9.jpg', '10.jpg'], view: 12, like: 2,
				desc: 'The page is based on anchor points to help you quickly locate the content you want to see. It is very convenient.' }
		];
	}

	view(ev) {
		this.isVisible = true;
		this.curTemplateId = ev.id;
		this.curTemplatesPic = ev.jpgs;
	}

	handleCancel() {
		this.isVisible = false;
		this.curTemplateId = this.curTemplatesPic = null;
	}

	saveState(val) {
		const param = _.cloneDeep(this.ws.projectInfo);
		param.enablePagelayout = val;
		this.projectApi.updateProject(param.id, param).then(data => {
			if (data.affected > 0) {
				this.mess.create('success',  val ? 'Enabled successfully' : 'Disabled successfully');
			}
		});
	}

	async handleOk() {
		// save projectInfo
		const dataSec = await this.createEditSecData();
		if (dataSec) {
			// show template component
			this.ws.projectInfo.templateId = this.curTemplateId;
			const param = _.cloneDeep(this.ws.projectInfo);
			const data = await this.projectApi.updateProject(param.id, param);
			if (data.affected > 0) {
				this.handleCancel();
			}
		}
	}

	// generate the edit-section data
	async createEditSecData() {
		const param: EditSectionInfo = {
			projectId: this.pInfo.id,
			status: 'draft',
			editSectionData: [],
			editQuestionsWaitList: []
		};
		param.editQuestionsWaitList = _.cloneDeep(this.ws.editQuestionList);
		return this.pageSectionApi.createEditSectionInfo(param);
	}

}
