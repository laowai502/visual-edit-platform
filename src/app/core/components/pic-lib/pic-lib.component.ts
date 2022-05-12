import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { CommonApiService } from 'src/app/api';
import { NzMessageService } from 'ng-zorro-antd/message';

import { environment } from 'src/environments/environment';
import { errFileType } from 'src/app/utils';

interface PicLibOption {
	from: string;
	amount: string | number;
}

interface UpItem {
	name: string;
	src: string;
	progress: number;
	group: string;
	checked: boolean;
}

@Component({
	selector: 'iqnr-pic-lib',
	templateUrl: './pic-lib.component.html',
	styleUrls: ['./pic-lib.component.scss']
})
export class PicLibComponent implements OnInit, AfterViewInit {

	@Input() option: PicLibOption;
	@Output() close: EventEmitter<any> = new EventEmitter();

	@ViewChild('fileForm') fileForm: ElementRef;

	group: any;
	curGroup: string;
	groupName: string;

	upList: Array<UpItem>;
	get showList(): Array<UpItem> {
		return (this.curGroup === '' || this.curGroup === '-1') ? this.upList : this.upList.filter(e => e.group === this.curGroup);
	}

	step: number;
	visible: boolean;
	isVisible: boolean;

	get nextBtnEnable(): boolean {
		return this.showList.some(e => e.checked);
	}

	constructor(
		private commonApi: CommonApiService,
		private mess: NzMessageService)
	{
		this.step = 0;
		this.upList = [];
		this.curGroup = '';
		this.group = [
			{ key: '', title: 'All images', number: 0 },
			{ key: '-1', title: 'Un-grouped', number: 0 }
		];
	}

	ngOnInit(): void {
		this.isVisible = true;
	}

	ngAfterViewInit(): void {
		this.uploadListen();
	}

	handleCancel() {
		this.isVisible = false;
		this.close.emit();
	}

	// ------------------------------------- file upload ---------------------------------------------------
	uploadListen() {
		const { nativeElement: f } = this.fileForm;
		f.addEventListener('change', (ev) => {
			let files = ev.target.files;
			if (files.length > 5) { // check
				ev.target.value = null;
				this.mess.create('error', 'five pictures at most');
				return;
			}
			let upSize = false, errType = false;
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 3120000) { upSize  = true; break; }
				if (errFileType(files[i].name, 'jpg|jpeg|png|bmp|gif')) { errType = true; break; }
			}
			if (upSize || errType) {
				ev.target.value = null;
				this.mess.create('error', upSize ? '5M per file at most' : 'The picture format is incorrect');
				return;
			}
			this.uploadPic(files);
			ev.target.value = null;
		});
	}

	uploadPic(files: FileList) {
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			formData.append('file', files[i]);
			const f: UpItem = { name: files[i].name, src: '', progress: 0, group: this.curGroup, checked: false };
			this.upList.push(f);
			this.commonApi.upload(formData).subscribe(ev => {
				if (ev.type === HttpEventType.UploadProgress) {
					f.progress = Math.round(100 * ev.loaded / ev.total);
				} else if (ev instanceof HttpResponse) {
					f.progress = 100;
					setTimeout(() => { f.progress += 1; }, 800);
					if (ev.ok) {
						f.src = `${ environment.host }${ ev.body['fileUrl'] }`;
					}
				}
			});
		}
	}

	clickInputFile() {
		this.fileForm.nativeElement.click();
	}
	// ------------------------------------- file upload end------------------------------------------------

	// ------------------------------------- file group ----------------------------------------------------
	clickNav(key: string) {
		this.curGroup = key;
	}

	saveGroup() {
		if (!this.groupName || this.groupName === '') { return; }
		this.group.push({ key: this.group.length + 1 + '', title: this.groupName, number: 0 });
		this.cancelGroup();
	}

	cancelGroup() {
		this.visible = false;
		this.groupName = '';
	}
	// ------------------------------------- file group end ----------------------------------------------------


	clickItem(img: UpItem) {
		if (img.progress > 100) {
			img.checked = !img.checked;
			// single Or multiple

		}
	}

	next() {
		this.step = 1;
	}

	preview() {
		this.step = 0;
		setTimeout(() => { this.uploadListen(); });
	}

}
