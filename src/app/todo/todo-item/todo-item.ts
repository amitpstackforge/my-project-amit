// Importing common Angular features
import { CommonModule } from '@angular/common';  // Gives access to directives like *ngIf, *ngFor
import { Component, Input, Output, EventEmitter } from '@angular/core';  // For creating a component and using data binding
import { FormsModule } from '@angular/forms';  // Needed for [(ngModel)] two-way binding

// Define a new Angular component
@Component({
  selector: 'app-todo-item',        // The HTML tag name used for this component <app-todo-item>
  templateUrl: './todo-item.html',  // The HTML template file for this component
  standalone: true,                 // Means this component is not declared in a module (standalone)
  imports: [CommonModule, FormsModule],  // Import required modules inside this component
  styleUrls: ['./todo-item.css']    // External CSS file for this component
})
export class TodoItemComponent {

  // -----------------------------
  // 🔹 Data properties and events
  // -----------------------------

  @Input() task: any;
  // 👆 Receives task data from parent (todo-list component) using property binding [task]="task"

  @Output() delete = new EventEmitter<number>();
  // 👆 Sends (emits) an event to parent when a task needs to be deleted.
  // The event carries the task ID (number).

  @Output() edit = new EventEmitter<{ id: number; title: string }>();
  // 👆 Sends (emits) an event to parent when a task is edited.
  // The event carries both id and new title as an object.

  // -----------------------------
  // 🔹 Local variables
  // -----------------------------

  editing = false;
  // 👆 Boolean flag — true when the user is editing a task.

  editedTitle = '';
  // 👆 Temporarily holds the new task title while editing.

  // -----------------------------
  // 🔹 Methods (functions)
  // -----------------------------

  startEdit() {
    // Called when user clicks "Edit" button.
    // Enables editing mode and loads current title into input box.
    this.editing = true;
    this.editedTitle = this.task.title;
  }

  saveEdit() {
    // Called when user clicks "Save" after editing.
    // 1. Checks if the input is not empty.
    // 2. Emits the edit event to parent with updated title.
    // 3. Turns off editing mode.
    if (this.editedTitle.trim() === '') return;
    this.edit.emit({ id: this.task.id, title: this.editedTitle });
    this.editing = false;
  }

  cancelEdit() {
    // Called when user clicks "Cancel" while editing.
    // Simply exits edit mode without saving changes.
    this.editing = false;
  }

  onDelete() {
    // Called when user clicks "Delete" button.
    // Emits the delete event to parent with task ID.
    this.delete.emit(this.task.id);
  }
}
