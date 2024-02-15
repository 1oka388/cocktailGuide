import { Component } from '@angular/core';
import { ColorService } from './color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

    constructor(private colorService: ColorService) {}

     toggleColor(): void {
       this.colorService.toggleColor();
     }
}
