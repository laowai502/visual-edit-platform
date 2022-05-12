import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/core/http/request.service';
import { EditQuestionInfor } from 'src/app/core/model/interface/question.interface';

@Injectable({
    providedIn: 'root'
})
export class EditAreaApi extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

	public findOneEditQuestionInfor(id): Promise<EditQuestionInfor> {
		return this.get('edit-question/findOne', { id });
	}

    public createEditQuestionInfor(param: EditQuestionInfor): Promise<string> {
        return this.post('edit-question', param);
    }

	public updateEditQuestionInfor(id, param: EditQuestionInfor): Promise<any> {
		return this.patch('edit-question', id, param);
	}

	public deleteEditQuestionInfor(id): Promise<any> {
        return this.delete('edit-question', id);
    }

}
