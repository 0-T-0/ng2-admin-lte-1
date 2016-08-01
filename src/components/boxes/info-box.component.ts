import { Component, OnInit, Input, ElementRef, Renderer, SimpleChanges } from '@angular/core';

import { ElementClassGroup } from '../common/index';

@Component({
    moduleId: module.id,
    selector: 'info-box, [infobox],[role=info-box]',
    template: `
    <span class="info-box-icon" [ngClass]="colorIconClass">
        <i class="fa" [ngClass]="iconClass"></i>
    </span>
    <div class="info-box-content">
        <ng-content class="info-box-text"></ng-content>
    </div>
    `,
    host: {
        '[class.info-box]': 'true',
    },
})
export class InfoBoxComponent implements OnInit {

    @Input()
    public icon: string = '';

    @Input()
    public color: string = null;

    @Input()
    public backgroundColor: boolean = false;

    @Input()
    public infobox: any;

    private colorClassGroup: ElementClassGroup<string> = null;

    constructor(
        private elem: ElementRef,
        private renderer: Renderer) {
    }

    ngOnInit() {
        if (this.backgroundColor) {
            this.colorClassGroup = new ElementClassGroup<string>(
                this.color, value => value ? 'bg-' + value : null,
                null, this.elem, this.renderer);
        }
    }

    ngOnChanges(changes: SimpleChanges): any {
        if (this.backgroundColor) {
            if (changes['color'] && this.colorClassGroup) {
                this.colorClassGroup.updateValue(this.color);
            }
        }
    }

    ngOnDestroy() {
        if (this.backgroundColor) {
            this.colorClassGroup.dispose();
        }
    }

    get iconClass(): any {
        let icon = this.icon;
        let cls: any = {};
        cls[icon] = true;
        return cls;
    };

    get colorIconClass(): any {
        let cls: any = {};
        if (!this.backgroundColor) {
            cls['bg-' + this.color] = true;
            return cls;
        }
        return cls;
    }
}
