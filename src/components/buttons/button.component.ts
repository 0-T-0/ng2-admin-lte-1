import {
    Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter,
    ElementRef, Renderer, SimpleChanges, HostBinding
} from '@angular/core';
import { NgStyle } from '@angular/common';

import {
    ElementClassGroup, ElementType, ElementSize, ElementTypeToClassMap, ElementSizeToClassMap
    } from '../common/index';

export const DefaultButtonTypeMap: ElementTypeToClassMap = {
    'default': 'btn-default',
    'primary': 'btn-primary',
    'success': 'btn-success',
    'info': 'btn-info',
    'warning': 'btn-warning',
    'danger': 'btn-danger',
    'link': 'btn-link',
};

export const DefaultButtonSizeMap: ElementSizeToClassMap = {
    'normal': null,
    'large': 'btn-lg',
    'small': 'btn-sm',
    'tiny': 'btn-xs',
};

@Component({
    moduleId: module.id,
    selector: '[button],button,a[role=button],input[type=button],input[type=submit],input[type=reset]',
    template: `<ng-content></ng-content>`,
    host: {
        '[class.btn]': 'true',
    },
    directives: [ NgStyle ]
})
export class ButtonComponent implements OnInit, OnChanges, OnDestroy {
    @Input()
    public type: ElementType = 'default';

    @Input()
    public size: ElementSize = 'normal';

    @Input()
    public color: ElementSize = null;

    @Input()
    @HostBinding('class.btn-block')
    public isBlock: boolean = false;

    @Input()
    @HostBinding('class.btn-flat')
    public isFlat: boolean = false;

    @Input()
    @HostBinding('class.btn-app')
    public isApp: boolean = false;

    @Input()
    @HostBinding('class.active')
    public isActive: boolean = false;

    @Input()
    @HostBinding('class.disabled')
    public isDisabled: boolean = false;

    @Input()
    public typeMap: ElementTypeToClassMap = null;
    @Input()
    public sizeMap: ElementSizeToClassMap = null;

    @Output()
    public click = new EventEmitter();

    private typeClassGroup: ElementClassGroup<ElementType> = null;
    private sizeClassGroup: ElementClassGroup<ElementSize> = null;
    private colorClassGroup: ElementClassGroup<string> = null;

    @HostBinding('style.pointer-events')
    private get pointerEventsStyle(): string {
        return this.isDisabled ? 'none' : 'inherit';
    };

    constructor(
        private elem: ElementRef,
        private renderer: Renderer) {
    }

    ngOnInit() {
        this.typeClassGroup = new ElementClassGroup<ElementType>(
            this.type, value => DefaultButtonTypeMap[value],
            'btn-default', this.elem, this.renderer);

        this.sizeClassGroup = new ElementClassGroup<ElementSize>(
            this.size, value => DefaultButtonSizeMap[value],
            null, this.elem, this.renderer);

        this.colorClassGroup = new ElementClassGroup<string>(
            this.color, value => value ? 'bg-' + value : null,
            null, this.elem, this.renderer);
    }

    ngOnDestroy() {
        this.typeClassGroup.dispose();
        this.sizeClassGroup.dispose();
        this.colorClassGroup.dispose();
    }

    ngOnChanges(changes: SimpleChanges): any {
        if (changes['button'] && this.typeClassGroup) {
            this.typeClassGroup.updateValue(this.type, this.getTypeMapper());
        }
        if (changes['size'] && this.sizeClassGroup) {
            this.sizeClassGroup.updateValue(this.size, this.getSizeMapper());
        }
        if (changes['color'] && this.colorClassGroup) {
            this.colorClassGroup.updateValue(this.color);
        }
    }

    private getTypeMapper(): any {
        return this.typeMap ? function(value: ElementType) { return this.typeMap[value]; } : undefined;
    }

    private getSizeMapper(): any {
        return this.sizeMap ? function(value: ElementSize) { return this.sizeMap[value]; } : undefined;
    }
}
