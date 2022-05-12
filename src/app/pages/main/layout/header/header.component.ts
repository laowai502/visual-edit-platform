import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'iqnr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    navs: Array<any>;
    user: any;

    constructor() {
        this.navs = [
            { name: 'My Project', link: '', active: true },
            { name: 'Advance', link: '', active: false }
        ];
        this.user = {
            name: 'laowai502',
            list: [
                { name: 'Account', link: '', icon: 'user-o' },
                { name: 'Favorites', link: '', icon: 'heart-o' },
                { name: 'Download', link: '', icon: 'download' },
                { name: 'Contact', link: '', icon: 'envelope-o' }
            ]
        };
    }

    ngOnInit() {
    }

}
