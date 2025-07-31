/* global localStorage, document */
import { Injectable, signal } from '@angular/core';

/**
 * PUBLIC_INTERFACE
 * ThemeService maintains global theme preference and updates <body> class list.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(false);

  constructor() {
    // Initialize with preference if saved.
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('pref_dark');
      if (stored) {
        this.isDark.set(stored === 'true');
      }
    }
    this.applyTheme();
  }

  toggle(): void {
    this.isDark.set(!this.isDark());
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pref_dark', String(this.isDark()));
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-theme', this.isDark());
    }
  }
}
