import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { ColorSchemeService } from "../color-scheme.service";

@Component({
    selector: "portal-page",
    template: `
    <nav-bar></nav-bar>
    
    <!--<status-bar></status-bar><br/>-->

    <router-outlet></router-outlet><br/>

    <footer-bar></footer-bar><br/>
    `,
    styles: [
        `
        
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class PortalPageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        
    }
}