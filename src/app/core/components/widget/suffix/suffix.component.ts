import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
// import { FormControl } from '@angular/forms';

@Component({
	selector: 'iqnr-suffix',
	templateUrl: './suffix.component.html',
	styleUrls: ['./suffix.component.scss']
})
export class SuffixComponent implements OnInit {

	@Input() input: string;

	@Input() mlen: number;

	constructor() {}

	ngOnInit(): void {}

}
