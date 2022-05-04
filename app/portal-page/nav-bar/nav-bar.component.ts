import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "nav-bar",
    template: `

    <nav class="navBar" style="position:fixed;">
        <div class="navBarElem" *ngFor="let navListElem of navList, let i = index;">
            <a class="navBarLink" [routerLink]="[routerLinks[i]]" routerLinkActive="navBarElemActive">{{navListElem}}</a>
        </div>
    </nav>
    
    `,
    styles: [
        `
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class NavBarComponent {
    navList: String[] = ["New Application", "Application Status", "Colour Scheme"];
    routerLinks: String[] = ["/form", "/history", "/colour-scheme"];

    constructor() { }
}