import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl mb-4">{{ isEditMode ? 'Edit' : 'Add' }} Show</h2>

      <form [formGroup]="showForm" (ngSubmit)="onSubmit()" class="max-w-md">
        <div class="mb-4">
          <label class="block mb-2">Title:</label>
          <input type="text" formControlName="title" class="w-full border rounded px-3 py-2">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Description:</label>
          <textarea formControlName="description" class="w-full border rounded px-3 py-2"></textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-2">Episodes:</label>
          <input type="number" formControlName="episodes" class="w-full border rounded px-3 py-2">
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  `
})
export class ShowFormComponent implements OnInit {
  showForm: FormGroup;
  isEditMode = false;
  showId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.showForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      episodes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.showId = id;
      this.showService.getShow(id).subscribe(show => {
        this.showForm.patchValue(show);
      });
    }
  }

  onSubmit(): void {
    if (this.showForm.valid) {
      const show = this.showForm.value;

      if (this.isEditMode && this.showId) {
        show.id = this.showId;
        this.showService.updateShow(show).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.showService.createShow(show).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}


