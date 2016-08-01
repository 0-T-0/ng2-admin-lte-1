import { Component, ElementRef } from '@angular/core';

import { ButtonComponent } from './button.component';
import { DropdownComponentBase } from './dropdown.component-base';

@Component({
    moduleId: module.id,
    selector: 'dropdown-menu',
    template: `
    <button [type]="type" class="dropdown-toggle" (click)="clicked($event)" (document:click)="clickedOnDocument($event)">
        <ng-content select=".button-content"></ng-content>
        <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
        <ng-content select="li"></ng-content>
    </ul>
    `,
    host: {
        '[class.open]': 'isOpen',
        '[class.btn-group]': 'true'
    },
    directives: [ ButtonComponent ]
})
export class DropdownMenuComponent extends DropdownComponentBase {
    constructor(element: ElementRef) {
        super(element);
    }
}
