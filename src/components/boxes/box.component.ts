import { Component, Input, ElementRef, Renderer, SimpleChanges } from '@angular/core';

import {
    ElementClassGroup, ElementTypeToClassMap, BoxType
    } from '../common/index';

export const DefaultBoxTypeMap: ElementTypeToClassMap = {
    'default': 'box-default',
    'primary': 'box-primary',
    'success': 'box-success',
    'info': 'box-info',
    'warning': 'box-warning',
    'danger': 'box-danger'
};

@Component({
    selector: 'box,[box]',
    template: `
    <div *ngIf="withHeading" class="box-header with-border">
        <ng-content select=".headerbox"></ng-content>
    </div>
    <div class="box-body">
        <ng-content></ng-content>
    </div>
    <div *ngIf="withFooter" class="box-footer">
        <ng-content select=".footerbox"></ng-content>
    </div>
    `,
    host: {
        '[class.box]': 'true',
        '[style.display]': "'block'",
        '[class.box-solid]': 'isSolid',
    },
})

export class BoxComponent {

    @Input()
    public type: BoxType = 'default';

    @Input()
    public isSolid: boolean = false;

    @Input()
    public withFooter: boolean = true;

    @Input()
    public withHeading: boolean = true;

    @Input()
    public box: any;

    private typeClassGroup: ElementClassGroup<BoxType> = null;

    constructor(private element: ElementRef, private renderer: Renderer) {}

    ngOnInit() {
        this.typeClassGroup = new ElementClassGroup<BoxType>(
            this.type, value => DefaultBoxTypeMap[value],
            'box-default', this.element, this.renderer);
    }

    ngOnChanges(changes: SimpleChanges): any {
        if (changes['type'] && this.typeClassGroup) {
            this.typeClassGroup.updateValue(this.type);
        }
    }
}
