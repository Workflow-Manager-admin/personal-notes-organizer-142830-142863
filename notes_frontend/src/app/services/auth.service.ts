/* global btoa, localStorage */
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * PUBLIC_INTERFACE
 * AuthService provides a minimal client-side authentication helper.
 * It stores a base-64 token in localStorage (browser only) and exposes
 * a reactive `isAuthenticated` signal so components and guards can react.
 *
 * NOTE: Replace this entirely with a secure backend integration for production.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Reactive signal mirroring login state. */
  readonly isAuthenticated = signal<boolean>(this.hasSession());

  // eslint-disable-next-line no-unused-vars
  constructor(private router: Router) {
    // reference to silence lint rule
    void this.router;
  }

  /* ---------- Public API ---------- */

  /** Returns true when a user is logged in.  */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /** Log the user in (dummy implementation). */
  login(email: string, password: string): void {
    // In real world, call backend. Here we accept any credentials.
    this.storage?.setItem('auth_token', btoa(`${email}:${password}`));
    this.isAuthenticated.set(true);
    this.router.navigateByUrl('/');
  }

  /** Log the user out. */
  logout(): void {
    this.storage?.removeItem('auth_token');
    this.isAuthenticated.set(false);
    this.router.navigateByUrl('/login');
  }

  /* ---------- Internal helpers ---------- */

  /** Typed accessor for localStorage that returns undefined during SSR. */
  private get storage(): Storage | undefined {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  }

  /** Check whether a session token exists. */
  private hasSession(): boolean {
    return !!this.storage?.getItem('auth_token');
  }
}
