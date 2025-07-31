import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar.component';
import { SidebarComponent } from './components/sidebar.component';
import { NotesListComponent } from './components/notes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, SidebarComponent, NotesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  term = '';
  categoryId?: string;
}
