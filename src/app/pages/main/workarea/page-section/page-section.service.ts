import { Injectable } from '@angular/core';

import { EditQuestionModel, Option } from 'src/app/core/model/interface/question.interface';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';
import { EditSectionInfo, EditSectionModel, EditSectionPanelModel } from 'src/app/core/model/interface/section.interface';

import { guid } from 'src/app/utils';

import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class PageSectionService {

	public editSectionInfo: EditSectionInfo;
	public EditZoneSyncBasket: Subject<any>;

	constructor() {
		this.EditZoneSyncBasket = new Subject();
	}

}
