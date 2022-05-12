# visual-edit-platform

A simple visual editing platform to help you know and build the frontend of a low code platform.

## Angular CLI command

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### Referenced libs
* ng-zorro-antd (UI lib)
* lodash (js util lib)
* tinymce (rich text editor)
* font-awesome (icon)

### Folder structure

<br>

```
-- app
    │   app-routing.module.ts
    │   app-share.module.ts
    │   app.component.ts
    │   app.module.ts
	|
    │   ├───api
    │   │
    │   ├───core
    │   │   ├───animate
    │   │   ├───components
    │   │   ├───directive
    │   │   ├───http
    │   │   ├───model
    │   │   │   ├───enum
    │   │   │   └───interface
    │   │   └───pipe
    │   ├───pages
    │   │   ├───home
    │   │   └───main
    │   │       │   main-routing.module.ts
    │   │       │   main.module.ts
    │   │       ├───layout
    │   │       ├───project
    │   │       └───workarea
    │   │           ├───logics
    │   │           ├───material-bar
    │   │           ├───page-section
    │   │           └───setting
    │   └───utils
    │           dom.ts
    │           index.ts
    │
    ├───assets
    │   ├───font
    │   └───images
    │       └───template
    ├───mock
    │       editQues.mock.ts
    │       index.ts
    └───theme
            base.scss
            directive.scss
```
