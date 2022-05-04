import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ColorSchemeService } from 'src/app/color-scheme.service';

@Component({
  selector: 'app-colour-scheme',
  templateUrl: './colour-scheme.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class ColourSchemeComponent implements OnInit, OnDestroy {

  //Component not actually needed as communication is through localStorage

  message: string | null  = '';

  constructor(private colourScheme: ColorSchemeService) {
    this.message = colourScheme.messageSource;
  }

  ngOnInit(): void { }

  setMessage(str:string) {
    localStorage.setItem('theme' ,str);
  }

  ngOnDestroy(): void {
    //console.log("color destroyed");
  }

}
