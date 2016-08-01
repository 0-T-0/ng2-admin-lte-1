import { Component, ElementRef } from '@angular/core';

import { ButtonComponent } from './button.component';
import { DropdownComponentBase } from './dropdown.component-base';

@Component({
    moduleId: module.id,
    selector: 'dropdown-button',
    template: `
    <button [type]="type" class="dropdown-toggle" (click)="clicked($event)" (document:click)="clickedOnDocument($event)">
        <ng-content select=".button-content"></ng-content>
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <ng-content select=".dropdown-content"></ng-content>
    </div>
    `,
    host: {
        '[class.open]': 'isOpen',
        '[class.btn-group]': 'true'
    },
    directives: [ ButtonComponent ]
})
export class DropdownButtonComponent extends DropdownComponentBase {
    constructor(element: ElementRef) {
        super(element);
    }
}
