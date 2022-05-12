import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { removeObjectEmpty, removeObjectEmptyValue } from '../../utils';

import * as _ from 'lodash';

@Injectable()
export class RequestService {

    private baseUrl = environment.nestApiUrl;

    constructor(private http: HttpClient) {}

    private makeUrl(url: string = ''): string {
        const str = _.startsWith(url, ['http://', 'https://']) ? url : (this.baseUrl + url);
        return str;
    }

    protected get(url: string, params?: object): Promise<any> {
        let httpParams = new HttpParams();
        if (params) {
            params = removeObjectEmptyValue(params); // remove null, undefined, empty string
            // tslint:disable-next-line: forin
            for (const key in params) {
                httpParams = httpParams.set(key, params[key]);
            }
        }
        return this.http.get(this.makeUrl(url), { params: httpParams }).toPromise();
    }

    protected post(url: string, params?: any, opts?: object): Promise<any> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
        if (!_.isEmpty(opts)) {
            options = _.merge(options, removeObjectEmpty(opts)); // remove null, undefined
        }
        return this.http.post(this.makeUrl(url), removeObjectEmpty(params), options).toPromise();
    }

	protected patch(url: string, id, params?: any, opts?: object): Promise<any> {
		let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
        if (!_.isEmpty(opts)) {
			options = _.merge(options, removeObjectEmpty(opts)); // remove null, undefined
        }
		const newUrl = this.makeUrl(url) + `/${id}`;
        return this.http.patch(newUrl, removeObjectEmpty(params), options).toPromise();
	}

	protected delete(url: string, id): Promise<any> {
		const newUrl = this.makeUrl(url) + `/${id}`;
		return this.http.delete(newUrl).toPromise();
	}

	// post file, used to upload
	protected postFormData(url: string, params?: FormData): Observable<any> {
		const req = new HttpRequest('POST', this.makeUrl(url), params, {
			reportProgress: true,
			headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
		});
		return this.http.request(req);
    }

}
