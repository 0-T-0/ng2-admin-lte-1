import { Component, Input, OnInit, OnChanges, ElementRef, Renderer, ViewChild, SimpleChanges } from '@angular/core';
import {  } from '@angular/common';

import {
    ElementClassGroup, AlertType, AlertTypeToClassMap
    } from '../common/index';

export const DefaultAlertTypeMap: AlertTypeToClassMap = {
    'success': 'alert-success',
    'info': 'alert-info',
    'warning': 'alert-warning',
    'danger': 'alert-danger',
};

export const DefaultIconTypeMap: AlertTypeToClassMap = {
    'success': 'fa-success',
    'info': 'fa-info',
    'warning': 'fa-warning',
    'danger': 'fa-ban',
};

@Component({
    moduleId: module.id,
    selector: 'alert,[alert],[role=alert]',
    template: `
    <button *ngIf="canClose" type="button" (click)="clicked()" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <h4 *ngIf="isOpen">
        <i *ngIf="showIcon" class="icon fa" [ngClass]="iconClass"></i>
        {{title}}
    </h4>
    <ng-content *ngIf="isOpen"></ng-content>
    `,
    host: {
        '[class.alert]': 'true',
        '[class.alert-dismissable]': 'true',
        '[style.display]': "isOpen ? 'block' : 'none'",
        'role': 'alert'
    }
})

export class AlertComponent implements OnInit, OnChanges {

    @Input()
    public type: AlertType = 'info';

    @Input()
    public canClose: boolean = true;

    @Input()
    public showIcon: boolean = true;

    @Input()
    public customIcon: string;

    @Input()
    public title: string = 'Alert!';

    @ViewChild('icon')
    iconElement: any;

    @Input()
    public isOpen: boolean = true;

    @Input()
    public typeMap: AlertTypeToClassMap = null;

    get iconClass(): any {
        let icon = this.customIcon;
        if (!icon) {
            icon = DefaultIconTypeMap[this.type];
        }
        let cls: any = {};
        cls[icon] = true;
        return cls;
    };

    private typeClassGroup: ElementClassGroup<AlertType> = null;

    constructor(private element: ElementRef, private renderer: Renderer) {}

    clicked() {
        this.isOpen = !this.isOpen;
    }

    ngOnInit() {
        this.typeClassGroup = new ElementClassGroup<AlertType>(
            this.type, value => DefaultAlertTypeMap[value],
            'alert-info', this.element, this.renderer);
    }

    ngOnChanges(changes: SimpleChanges): any {
        if (changes['type'] && this.typeClassGroup) {
            this.typeClassGroup.updateValue(this.type);
        }
    }
};
