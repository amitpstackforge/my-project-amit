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
  tasks: any[] = [
    { id: 1, name: 'Buy groceries', price: 500, category: 'PH', description: 'Milk, eggs, bread', date: new Date('2025-10-28').toDateString(), completed: false },
    { id: 2, name: 'Finish Angular project', price: 0, category: 'PC', description: 'Finalize components', date: new Date('2025-10-30').toDateString(), completed: true },
    { id: 3, name: 'Call the doctor', price: 0, category: 'PH', description: 'Appointment at 10 AM', date: new Date('2025-11-01').toDateString(), completed: false },
    { id: 4, name: 'Read a book', price: 0, category: 'GA', description: 'Start new novel', date: new Date('2025-11-02').toDateString(), completed: false }
  ];


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
      description: ['', Validators.required],
      date: [''] // ✅ Date picker field added here
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


    const formValue = this.productForm.value;

    // ✅ যদি ইউজার Date Picker না দেয়, তাহলে আজকের তারিখ দাও
    const productDate = formValue.date
      ? new Date(formValue.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });


    if (this.isEditMode && this.editIndex !== null) {
      // ✅ Update existing

      this.tasks[this.editIndex] = {
        ...this.tasks[this.editIndex],
        ...formValue,
        date: productDate // ✅ Date picker বা default date assign হচ্ছে এখানে
      };
      // alert('✅ টাস্ক সফলভাবে আপডেট হয়েছে!');
    } else {
      // ✅ Add new product
      const newTask = {
        id: Date.now(),
        ...formValue,
        date: productDate
      };
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(1)]],
        category: ['', Validators.required],
        description: ['', Validators.required],
        date: [''] // <-- ✅ নতুন ফিল্ড যোগ করো
      });
      // alert('✅ নতুন টাস্ক যোগ হয়েছে!');

      // ✅ টাস্ক লিস্টে যোগ করা
      this.tasks.push(newTask);

      console.log('✅ নতুন টাস্ক যোগ হয়েছে:', newTask);
    }



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
        description: task.description,
        date: this.convertToISO(task.date) // ✅ Date Picker readable format

      });
      this.isEditMode = true;
      this.editIndex = index;
      this.showModal = true;
    }
  }

  // ✅ Date conversion helper
  private convertToISO(dateString: string): string {
    const parsedDate = new Date(dateString);
    return parsedDate.toISOString().split('T')[0];
  }

  // ✅ ফর্ম কন্ট্রোল getter
  get f() {
    return this.productForm.controls;
  }


  onDeleteTask(index: number): void {
    const confirmDelete = confirm('🗑️ Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.tasks.splice(index, 1);
    }
  }
}
