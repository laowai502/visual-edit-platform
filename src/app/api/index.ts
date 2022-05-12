import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { RequestService } from 'src/app/core/http/request.service';


@Injectable({
    providedIn: 'root'
})
export class CommonApiService extends RequestService {

    constructor(http: HttpClient) {
        super(http);
    }

    public upload(file: FormData): Observable<any> {
        return this.postFormData('upload', file);
    }
}
