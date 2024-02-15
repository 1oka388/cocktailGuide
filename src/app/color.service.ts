import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  isDarkMode = false;
  private readonly THEME_KEY = 'app-theme';

  constructor() {
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    if (storedTheme) {
      this.isDarkMode = JSON.parse(storedTheme);
      this.applyTheme();
    }
  }


  toggleColor(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem(this.THEME_KEY, JSON.stringify(this.isDarkMode));
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
