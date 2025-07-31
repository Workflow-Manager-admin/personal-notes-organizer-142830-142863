import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

/**
 * PUBLIC_INTERFACE
 * Simple login form component.
 */
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="submit()" #form="ngForm">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          [(ngModel)]="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          [(ngModel)]="password"
        />
        <button type="submit" [disabled]="form.invalid">Login</button>
      </form>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 300px;
        margin: 10vh auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      input,
      button {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
      }
      button {
        background: var(--color-primary);
        color: #fff;
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // mark auth as used for eslint
    void this.auth;
  }

  submit(): void {
    this.auth.login(this.email, this.password);
  }
}
