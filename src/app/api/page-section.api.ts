import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/core/http/request.service';
import { EditSectionInfo } from 'src/app/core/model/interface/section.interface';

@Injectable({
    providedIn: 'root'
})
export class PageSectionApi extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

	public createEditSectionInfo(param: EditSectionInfo): Promise<string> {
        return this.post('edit-section', param);
    }

	public deleteEditSectionInfo(id): Promise<any> {
        return this.delete('edit-section', id);
    }

	public updateEditSectionInfo(id, param: EditSectionInfo): Promise<any> {
		return this.patch('edit-section', id, param);
	}

	public findOneEditSectionInfo(id): Promise<EditSectionInfo> {
		return this.get('edit-section/findOne', { id });
	}

}
