/* global crypto, confirm */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note.model';

/**
 * PUBLIC_INTERFACE
 * Lists notes, allows creation, selection and deletion.
 */
@Component({
  standalone: true,
  selector: 'app-notes-list',
  imports: [CommonModule],
  template: `
    <section class="notes-list">
      <button (click)="create()">+ New note</button>
      <article
        *ngFor="let n of filtered()"
        (click)="select(n)"
        [class.selected]="selected?.id === n.id"
      >
        <h4>{{ n.title || 'Untitled' }}</h4>
        <p>{{ n.content | slice: 0:100 }}</p>
        <small>{{ n.updatedAt | date: 'short' }}</small>
        <button class="delete" (click)="delete(n, $event)">🗑</button>
      </article>
    </section>
  `,
  styles: [
    `
      .notes-list {
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      article {
        border: 1px solid var(--color-secondary);
        padding: 0.5rem;
        cursor: pointer;
        position: relative;
      }
      .selected {
        background: #ececec;
      }
      .delete {
        position: absolute;
        top: 4px;
        right: 4px;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class NotesListComponent implements OnInit {
  @Input() searchTerm = '';
  @Input() categoryId?: string;

  selected?: Note;

  constructor(private notes: NotesService) {}

  ngOnInit(): void {
    // reference note service to avoid unused var lint error
    void this.notes;
  }

  filtered(): Note[] {
    let list = this.notes.search(this.searchTerm);
    if (this.categoryId) list = list.filter((n) => n.categoryId === this.categoryId);
    return list;
  }

  select(n: Note): void {
    this.selected = n;
  }

  create(): void {
    const newNote: Note = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString(36) + Math.random().toString(36).slice(2),
      title: '',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.notes.upsert(newNote);
    this.selected = newNote;
  }

  delete(n: Note, ev: Event): void {
    ev.stopPropagation();
    if (typeof confirm === 'undefined' || confirm('Delete note?')) {
      this.notes.delete(n.id);
      if (this.selected?.id === n.id) this.selected = undefined;
    }
  }
}
