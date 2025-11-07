
import { CommonModule } from '@angular/common';
import { Component, PendingTasks } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

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
    // 🔹 Today's tasks (assume today = 2025-11-04)
    { id: 1, name: 'Buy groceries', price: 500, category: 'PH', description: 'Milk, eggs, bread', date: new Date('2025-11-05').toDateString(), completed: false },
    { id: 2, name: 'Morning workout', price: 0, category: 'GA', description: '1-hour cardio session', date: new Date('2025-11-05').toDateString(), completed: true },
    { id: 3, name: 'Pay electricity bill', price: 1200, category: 'PC', description: 'Pay online via app', date: new Date('2025-11-05').toDateString(), completed: false },
    { id: 4, name: 'Call client meeting', price: 0, category: 'PC', description: 'Project discussion call at 3 PM', date: new Date('2025-11-05').toDateString(), completed: false },

    // 🔹 Pending (future)
    { id: 4, name: 'Dentist appointment', price: 0, category: 'PH', description: 'Checkup at 5 PM', date: '2025-11-08', completed: false },
    { id: 5, name: 'Team lunch', price: 1000, category: 'GA', description: 'Office lunch', date: '2025-11-07', completed: false },
    { id: 6, name: 'Start React course', price: 0, category: 'PC', description: 'Online tutorial', date: '2025-11-10', completed: false },
    { id: 7, name: 'Visit parents', price: 0, category: 'PH', description: 'Sunday trip', date: '2025-11-09', completed: false },
    { id: 8, name: 'Book train tickets', price: 800, category: 'PC', description: 'Trip to Kolkata', date: '2025-11-12', completed: false },
    { id: 9, name: 'Buy Diwali gifts', price: 2000, category: 'PH', description: 'For family', date: '2025-11-09', completed: false },
    { id: 10, name: 'Read a book', price: 0, category: 'GA', description: 'Start new novel', date: '2025-11-10', completed: false },

    // 🔹 Overdue (past dates)
    { id: 11, name: 'Call the doctor', price: 0, category: 'PH', description: 'Appointment at 10 AM', date: new Date('2025-11-03').toDateString(), completed: false },
    { id: 12, name: 'Pay credit card bill', price: 2500, category: 'PC', description: 'Due last week', date: new Date('2025-10-28').toDateString(), completed: false },
    { id: 13, name: 'Submit tax documents', price: 0, category: 'PC', description: 'IT return form', date: new Date('2025-10-31').toDateString(), completed: true },
    { id: 14, name: 'Laundry pickup', price: 300, category: 'PH', description: 'Dry cleaning', date: new Date('2025-11-02').toDateString(), completed: false },
    { id: 15, name: 'Car service', price: 1500, category: 'PH', description: 'Engine check', date: new Date('2025-10-30').toDateString(), completed: false },

    // 🔹 Extra mixed for UI testing
    { id: 16, name: 'Grocery restock', price: 700, category: 'PH', description: 'Buy rice, pulses', date: new Date('2025-11-05').toDateString(), completed: false },
    { id: 17, name: 'Yoga session', price: 0, category: 'GA', description: 'Morning meditation', date: new Date('2025-11-04').toDateString(), completed: false },
    { id: 18, name: 'Update LinkedIn profile', price: 0, category: 'PC', description: 'Add new project details', date: new Date('2025-11-11').toDateString(), completed: false },
    { id: 19, name: 'Water the plants', price: 0, category: 'GA', description: 'Morning routine', date: new Date('2025-11-04').toDateString(), completed: true },
    { id: 20, name: 'Read a book', price: 0, category: 'GA', description: 'Start new novel', date: new Date('2025-11-10').toDateString(), completed: false },
    { id: 21, name: 'Backup laptop files', price: 0, category: 'PC', description: 'Use Google Drive', date: new Date('2025-10-25').toDateString(), completed: false },
    { id: 22, name: 'Visit parents', price: 0, category: 'PH', description: 'Sunday trip', date: new Date('2025-11-09').toDateString(), completed: false },
    { id: 23, name: 'Monthly expense sheet', price: 0, category: 'PC', description: 'Update Excel tracker', date: new Date('2025-11-01').toDateString(), completed: false },
    { id: 24, name: 'Order new mouse', price: 600, category: 'PC', description: 'Logitech wireless', date: new Date('2025-11-05').toDateString(), completed: false }
  ];


  filteredTasks: any[] = [];

  isEditMode = false;
  editIndex: number | null = null;

  // ট্যাব লিস্ট
  tabs = ['Today', 'Pending', 'Overdue', 'Completed'];

  // ✅ Reactive Form
  productForm: FormGroup;

  toastMessage: string = '';
  showToast: boolean = false;

  searchText: string = "";   // ✅ SEARCH TEXT VARIABLE ADDED



  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      description: ['', Validators.required],
      date: [''] // ✅ Date picker field added here
    });
    this.updateFilteredTasks(); // ✅ initialize
  }

  // ✅ ট্যাব সিলেক্ট ফাংশন
  selectTab(tabOrEvent: string | Event) {
    if (typeof tabOrEvent === 'string') {
      this.selectedTab = tabOrEvent;
    } else {
      const selectElement = tabOrEvent.target as HTMLSelectElement;
      this.selectedTab = selectElement.value;
    }
    this.updateFilteredTasks();
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
        date: productDate,
        completed: false

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





  toggleComplete(task: any) {
    // Toggle completed state
    task.completed = !task.completed;

    // Update filtered view immediately
    this.updateFilteredTasks();

    // Handle toast + list movement
    this.handleTaskMovement(task);

    // this.markTaskCompleted(task);
  }

  updateFilteredTasks() {
    const today = new Date().toDateString();

    let tasksBasedOnTab = [];

    if (this.selectedTab === 'Today') {
      tasksBasedOnTab = this.tasks.filter(
        t => new Date(t.date).toDateString() === today && !t.completed
      );
    } else if (this.selectedTab === 'Pending') {
      tasksBasedOnTab = this.tasks.filter(
        t => new Date(t.date) > new Date() && !t.completed
      );
    } else if (this.selectedTab === 'Overdue') {
      tasksBasedOnTab = this.tasks.filter(
        t => new Date(t.date) < new Date() && !t.completed
      );
    } else if (this.selectedTab === 'Completed') {
      tasksBasedOnTab = this.tasks.filter(
        t => t.completed
      );
    }

    // ✅ Apply Search Filter
    this.filteredTasks = this.filterTasksBySearch(tasksBasedOnTab);
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2000); // hides after 2 seconds
  }
  markTaskCompleted(task: any) {

  }



  handleTaskMovement(task: any) {
    const today = new Date();
    const taskDate = new Date(task.date);
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    if (task.completed) {
      this.showToastMessage(
        '🎉 Task marked as completed!'
      );
    } else {

      if (task.getTime() === today.getTime()) {
        this.showToastMessage(
          '↩️ Task moved to Today list.'
        );
      } else if (task.getTime() > today.getTime()) {
        this.showToastMessage(
          '🕓 Task moved to Pending list.'
        );
      } else if (task.getTime() < today.getTime()) {
        this.showToastMessage(
          '⏰ Task moved to Overdue list.'
        );
      }
    }
    // Refresh filtered tasks after toast
    this.updateFilteredTasks();
  }

  // ✅ Filter by Search text
  filterTasksBySearch(tasksBasedOnTab: any[]): any[] {
    if (!this.searchText.trim()) return tasksBasedOnTab;

    const search = this.searchText.toLowerCase();

    return tasksBasedOnTab.filter(task =>
      task.name.toLowerCase().includes(search) ||
      task.category.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search)
    );
  }

  // ✅ Input change হলে auto filtering
  onSearchChange() {
    this.updateFilteredTasks();
  }



}
