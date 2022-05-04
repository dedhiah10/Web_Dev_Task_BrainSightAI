import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { ColorSchemeService } from './color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
  currentMode: string | null  ='';
  message: string | null  = '';

  title = 'kitchen-story-app';
  rootVars: string[] = ['--indianWite', '--indianSaffron', '--indianNavy', '--indianGreen'];
  rootVarDefaultVals: string[] = ['#FFF', '#FF9933', '#000080', '#138808'];
  rootVarsDarkVals: string[] = ['#ccc', '#666', '#000', '#222'];
  rootVarsLightVals: string[] = ['#333', '#ddd', '#fff', '#999'];

  constructor(private elementRef: ElementRef, private colourScheme: ColorSchemeService) {
    this.message = this.colourScheme.messageSource;
    this.currentMode = this.colourScheme.messageSource;
    setInterval(() => {
      this.message = this.colourScheme.messageSource;
      this.comparator();
    }, 150);
    for (let i = 0; i < this.rootVars.length; i++) {
      if (localStorage.getItem(this.rootVars[i]) == null) {
        console.log(localStorage.getItem(this.rootVars[i]) == null)
        localStorage.setItem(this.rootVars[i], this.rootVarDefaultVals[i]);
      } 
    }
    //this.normalMode()
    this.initTheme();
  }

  comparator(): void {
    if(this.message == this.currentMode) {}
    else {
      this.changeMode();
    }
  }

  changeMode(): void {
    this.currentMode = this.message;
    if(this.message != null) {
    switch(this.message) {
      case 'defaultMode':
        this.normalMode();
        break;
      
      case 'lightMode':
        this.ligntMode();
        break;

      case 'darkMode':
        this.darkMode();
        break;
    }
    }
  }

  initTheme(): void {
    for (let i = 0; i < this.rootVars.length; i++) {
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty(this.rootVars[i], localStorage.getItem(this.rootVars[i]));
    }
  }

  darkMode(): void {
    for (let i = 0; i < this.rootVars.length; i++) {
      localStorage.setItem(this.rootVars[i], this.rootVarsDarkVals[i]);
    }
    this.initTheme();
  }

  normalMode(): void {
    for (let i = 0; i < this.rootVars.length; i++) {
      localStorage.setItem(this.rootVars[i], this.rootVarDefaultVals[i]);
    }
    this.initTheme();
  }

  ligntMode(): void {
    for (let i = 0; i < this.rootVars.length; i++) {
      localStorage.setItem(this.rootVars[i], this.rootVarsLightVals[i]);
    }
    this.initTheme();
  }
}
