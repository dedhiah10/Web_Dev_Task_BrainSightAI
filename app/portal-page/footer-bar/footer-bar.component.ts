import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "footer-bar",
    template: `

    <div class="navBar footer">
        <div class="navBarElem"><img class="imgEmblem" src="../../../../assets/pngwing.png"></div>
        <div class="logoText">India Online Portal</div>
    </div>
    
    `,
    styles: [
        `
        
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class FooterBarComponent {
    constructor() {}
}