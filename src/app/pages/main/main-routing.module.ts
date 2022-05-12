import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project/project.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'project',
                component: ProjectComponent
            }
        ],
		data: { animation: 'project' }
    }, {
		path: 'workarea',
		component: WorkareaComponent,
		data: { animation: 'workarea' }
	}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
