import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Show } from '../../models/show';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl mb-4">Shows List</h2>
      <button routerLink="/add" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Show</button>

      <div class="grid gap-4">
        @for (show of shows; track show.id) {
          <div class="border p-4 rounded">
            <h3 class="text-xl">{{ show.title }}</h3>
            <p>{{ show.description }}</p>
            <p>Episodes: {{ show.episodes }}</p>
            <div class="mt-2">
              <button (click)="editShow(show.id!)" class="bg-green-500 text-white px-3 py-1 rounded mr-2">Edit</button>
              <button (click)="deleteShow(show.id!)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ShowListComponent implements OnInit {
  shows: Show[] = [];

  constructor(
    private showService: ShowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.showService.getShows().subscribe(shows => {
      this.shows = shows;
    });
  }

  deleteShow(id: number): void {
    this.showService.deleteShow(id).subscribe(() => {
      this.loadShows();
    });
  }

  editShow(id: number): void {
    this.router.navigate(['/edit', id]);
  }
}
