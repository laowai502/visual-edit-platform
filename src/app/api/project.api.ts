import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestService } from 'src/app/core/http/request.service';
import { ProjectInfo } from 'src/app/core/model/interface/project.interface';

@Injectable({
    providedIn: 'root'
})
export class ProjectApi extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

	public createProject(param: ProjectInfo): Promise<string> {
        return this.post('project', param);
    }

	public deleteProject(id): Promise<any> {
        return this.delete('project', id);
    }

	public updateProject(id, param: ProjectInfo): Promise<any> {
		return this.patch('project', id, param);
	}

	public findAllProject(): Promise<Array<ProjectInfo>> {
		return this.get('project');
	}

	public findOneProject(id): Promise<ProjectInfo> {
		return this.get('project/findOne', { id });
	}

}
