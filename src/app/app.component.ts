import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AnimationRoute } from './core/animate/route.animate';

@Component({
    selector: 'iqnr-root',
    template: `<router-outlet></router-outlet>`,
	// <div [@routeAnimations]="animationRoute(outlet)">
	// 	<router-outlet #outlet="outlet"></router-outlet>
	// </div>
	// animations: [AnimationRoute]
})
export class AppComponent {

	// animationRoute(outlet: RouterOutlet) {
	// 	return outlet?.activatedRouteData?.['animation'];
	// }

}
