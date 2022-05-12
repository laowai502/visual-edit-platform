import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'iqnr-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	@Output() toggle: EventEmitter<string> = new EventEmitter();

	public navList: Array<any>;

	constructor() {
		this.navList = [
			{ id: 1, name: 'EditArea', active: true, display: true, icon: 'fa-bar-chart' },
			{ id: 2, name: 'Page', active: false, display: true, icon: 'fa-cubes' },
			{ id: 3, name: 'Logics', active: false, display: true, icon: 'fa-globe' },
			{ id: 4, name: 'Themes', active: false, display: false, icon: '' }
		];
	}

	ngOnInit() {}

	togglePage(obj) {
		if (obj.active) {
			return;
		} else {
			this.navList.forEach(e => e.active = false);
			obj.active = true;
			this.toggle.emit(obj.name);
		}
	}

}
