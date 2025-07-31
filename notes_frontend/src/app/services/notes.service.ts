/* global localStorage */
import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note.model';

const STORAGE_KEY = 'notes_store';

/**
 * PUBLIC_INTERFACE
 * NotesService provides CRUD operations on notes and persists them in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class NotesService {
  /** Reactive list of notes. */
  readonly notes = signal<Note[]>(this.readFromStorage());

  /** Get a single note by id. */
  getNote(id: string): Note | undefined {
    return this.notes().find((n) => n.id === id);
  }

  /** Create or update note. */
  upsert(note: Note): void {
    const all = this.notes();
    const idx = all.findIndex((n) => n.id === note.id);
    if (idx > -1) {
      all[idx] = { ...note, updatedAt: Date.now() };
    } else {
      all.push({ ...note, createdAt: Date.now(), updatedAt: Date.now() });
    }
    this.notes.set([...all]);
    this.persist();
  }

  /** Delete a note. */
  delete(id: string): void {
    this.notes.set(this.notes().filter((n) => n.id !== id));
    this.persist();
  }

  /** Search notes by text. */
  search(text: string): Note[] {
    if (!text) return this.notes();
    const lower = text.toLowerCase();
    return this.notes().filter(
      (n) => n.title.toLowerCase().includes(lower) || n.content.toLowerCase().includes(lower),
    );
  }

  private get storage(): Storage | undefined {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  }

  private readFromStorage(): Note[] {
    try {
      return JSON.parse(this.storage?.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private persist(): void {
    this.storage?.setItem(STORAGE_KEY, JSON.stringify(this.notes()));
  }
}
