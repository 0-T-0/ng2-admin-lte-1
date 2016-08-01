import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class AppComponent implements OnInit {
  windowHeight = 480;

  // @ViewChild('footer') private footerElement: HTMLElement;
  // @ViewChild('header') private headerElement: HTMLElement;

  ngOnInit() {
    this.setWindowSize();
  }

  @HostListener('window:resize')
  private setWindowSize() {
    this.windowHeight = window.innerHeight;
  }

  private get appMinHeight() { return this.windowHeight + 'px'; };
  private get contentMinHeight() {
    let margins = 50 /* header */ + 51 /* footer */;
    // if (this.footerElement && !isNaN(this.footerElement.clientHeight)) {
    //   margins += this.footerElement.clientHeight;
    // }
    // if (this.headerElement && !isNaN(this.headerElement.clientHeight)) {
    //   margins += this.headerElement.clientHeight;
    // }
    console.log('margins', margins);
    return (this.windowHeight - margins) + 'px';
  };

}
