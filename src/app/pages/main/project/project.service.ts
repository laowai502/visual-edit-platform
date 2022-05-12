import { Injectable } from '@angular/core';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	constructor() { }

	public setDefaultProjectValue(): ProjectInfo {
		return {
			projectName: '',
			showTitle: true,
			showQNumber: false,
			showWel: true,
			showProgress: false,
			showHeader: true,
			headerType: 'text',
			headerTxt: '',
			headerPic: [],
			bgColor: '#FFFFFF',
			bColor: '#FFFFFF',
			bOpacity: 100,
			templateId: null,
			enablePagelayout: false
		}
	}

}
