import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

/**
 * PUBLIC_INTERFACE
 * Text editor for a single note.
 */
@Component({
  standalone: true,
  selector: 'app-note-editor',
  imports: [FormsModule, CommonModule],
  template: `
    <section class="editor" *ngIf="note">
      <input
        [(ngModel)]="note.title"
        placeholder="Title"
        (ngModelChange)="save()"
      />
      <textarea
        [(ngModel)]="note.content"
        placeholder="Write your note here..."
        (ngModelChange)="save()"
      ></textarea>
    </section>
    <p *ngIf="!note" class="empty">Select or create a note.</p>
  `,
  styles: [
    `
      .editor {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      input {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border: none;
        border-bottom: 1px solid var(--color-secondary);
      }
      textarea {
        flex: 1;
        resize: none;
        padding: 0.5rem;
        border: none;
      }
      .empty {
        margin: 2rem;
        color: #666;
      }
    `,
  ],
})
export class NoteEditorComponent implements OnChanges, OnInit {
  @Input() note?: Note;

  constructor(private notes: NotesService) {}

  ngOnInit(): void {
    void this.notes;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note'] && this.note) {
      // detach copy to avoid side-effects until save
      this.note = { ...this.note };
    }
  }

  save(): void {
    if (this.note) {
      this.notes.upsert(this.note);
    }
  }
}
