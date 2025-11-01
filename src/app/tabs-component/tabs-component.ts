import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tabs-component.html',
  styleUrl: './tabs-component.css',
})
export class TabsComponent {

  selectedTab: string = 'Today';
  showModal = false;

  // ✅ সব টাস্ক এখানে জমা হবে
  tasks: any[] = [];

  isEditMode = false;
  editIndex: number | null = null;

  // ট্যাব লিস্ট
  tabs = ['Today', 'Pending', 'Overdue'];

  // ✅ Reactive Form
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // ✅ ট্যাব সিলেক্ট ফাংশন
  selectTab(tabOrEvent: string | Event) {
    if (typeof tabOrEvent === 'string') {
      this.selectedTab = tabOrEvent;
    } else {
      const selectElement = tabOrEvent.target as HTMLSelectElement;
      this.selectedTab = selectElement.value;
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal; // <-- এই লাইনটি নেই
    if (!this.showModal) {
      this.productForm.reset();
      this.isEditMode = false;
      this.editIndex = null;
    }
  }


  // ✅ ফর্ম সাবমিট হ্যান্ডলার
  onSubmit(): void {

    console.log('Form submitted once ✅');

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.editIndex !== null) {
      this.tasks[this.editIndex] = {
        ...this.tasks[this.editIndex],
        ...this.productForm.value
      };
      // alert('✅ টাস্ক সফলভাবে আপডেট হয়েছে!');
    } else {
      const newTask = {
        id: Date.now(),
        ...this.productForm.value,
        date: new Date().toDateString()
      };

      // alert('✅ নতুন টাস্ক যোগ হয়েছে!');
    }

    // নতুন টাস্ক তৈরি
    const newTask = {
      id: Date.now(), // ইউনিক আইডি
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      category: this.productForm.value.category,
      description: this.productForm.value.description,
      date: new Date().toDateString() // আজকের তারিখ
    };

    // ✅ টাস্ক লিস্টে যোগ করা
    this.tasks.push(newTask);

    console.log('✅ নতুন টাস্ক যোগ হয়েছে:', newTask);

    // ✅ মেসেজ ও ক্লিন আপ
    // alert('✅ নতুন টাস্ক সফলভাবে যোগ হয়েছে!');
    this.productForm.reset();
    this.toggleModal();
  }

  onEditTask(index: number): void {
    const task = this.tasks[index];
    if (task) {
      this.productForm.patchValue({
        name: task.name,
        price: task.price,
        category: task.category,
        description: task.description
      });
      this.isEditMode = true;
      this.editIndex = index;
      this.showModal = true;
    }
  }

  // ✅ ফর্ম কন্ট্রোল getter
  get f() {
    return this.productForm.controls;
  }
}
