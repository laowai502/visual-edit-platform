import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'iqnr-notifi',
    templateUrl: './notifi.component.html',
    styleUrls: ['./notifi.component.scss']
})
export class NotifiComponent implements OnInit {

    mes: string;

    constructor() {
        this.mes = 'Our site will provide rich templates and powerful functions !';
    }

    ngOnInit() {
    }

}
