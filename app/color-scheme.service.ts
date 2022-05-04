import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
 export class ColorSchemeService { 

  messageSource: string | null = '';
  
    constructor() {
      this.messageSource = localStorage.getItem('theme');
      const publicSubscription = setInterval( () => {
        this.messageSource = localStorage.getItem('theme');
      }, 120);
    }
}