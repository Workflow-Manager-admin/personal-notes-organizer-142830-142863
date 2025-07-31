import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { FormsModule } from '@angular/forms';

/**
 * PUBLIC_INTERFACE
 * Displays search field and theme toggle.
 */
@Component({
  standalone: true,
  selector: 'app-top-bar',
  imports: [FormsModule],
  template: `
    <header class="top-bar">
      <input
        type="text"
        [(ngModel)]="term"
        placeholder="Search notes..."
        (input)="search.emit(term)"
      />
      <button (click)="theme.toggle()">
        {{ theme.isDark() ? 'Light' : 'Dark' }} mode
      </button>
    </header>
  `,
  styles: [
    `
      .top-bar {
        display: flex;
        gap: 1rem;
        padding: 0.5rem;
        background: var(--color-primary);
      }
      input {
        flex: 1;
        padding: 0.5rem;
      }
      button {
        background: var(--color-accent);
        color: #000;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
    `,
  ],
})
export class TopBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  term = '';
  // eslint-disable-next-line no-unused-vars
  constructor(public theme: ThemeService) {}

  ngOnInit(): void {
    void this.theme;
  }
}
