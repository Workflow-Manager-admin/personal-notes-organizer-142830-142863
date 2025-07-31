import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

/**
 * PUBLIC_INTERFACE
 * Navigation sidebar.
 */
@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule],
  template: `
    <nav class="sidebar">
      <h3>Categories</h3>
      <ul>
        <li (click)="select.emit(undefined)">All</li>
        <li *ngFor="let c of categories" (click)="select.emit(c.id)">
          {{ c.name }}
        </li>
      </ul>
      <button (click)="auth.logout()">Logout</button>
    </nav>
  `,
  styles: [
    `
      .sidebar {
        width: 200px;
        padding: 1rem;
        background: var(--color-secondary);
        color: #fff;
        height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      li {
        cursor: pointer;
      }
      button {
        margin-top: auto;
        background: var(--color-accent);
        border: none;
        padding: 0.5rem;
        cursor: pointer;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  // Placeholder categories
  categories = [
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' },
  ];
  @Output() select = new EventEmitter<string | undefined>();

  // eslint-disable-next-line no-unused-vars
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    // reference to silence eslint unused-var (template uses it)
    void this.auth;
  }
}
