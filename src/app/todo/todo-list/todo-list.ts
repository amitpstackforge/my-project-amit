import { Component } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent {
  newTaskTitle: string = '';


  tasks = [
    { id: 1, title: 'Angular শিখব' },

  ];

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log(`Task with id ${id} deleted.`);
  }

  addTask() {
    if (this.newTaskTitle.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle
    };
    this.tasks.push(newTask);
    this.newTaskTitle = '';
  }

  editTask(update: { id: number; title: string }) {
    const task = this.tasks.find(t => t.id === update.id);
    if (task) task.title = update.title;
  }



}
