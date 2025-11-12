
import { CommonModule } from '@angular/common';
import { Component, PendingTasks } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './tabs-component.html',
  styleUrl: './tabs-component.css',
})
export class TabsComponent {
  selectedTab: string = 'Today';
  showModal = false;
  priorityFilter: string = "All";

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.filteredTasks, event.previousIndex, event.currentIndex);
  }

  // ✅ সব টাস্ক এখানে জমা হবে
  // ✅ All task list
  tasks: any[] = [
    {
      id: 1, name: 'Buy groceries', price: 500, category: 'Personal', description: 'Milk, eggs, bread', date: '2025-11-06', priority: 'High', completed: false, dueTime: '18:22',
      subtasks: [
        { title: 'Check fridge items', done: true },
        { title: 'Buy essentials', done: false },
        { title: 'Pay at counter', done: false }
      ]
    },
    {
      id: 2, name: 'Morning workout', price: 0, category: 'Health', description: '1-hour cardio session', date: '2025-11-06', priority: 'Medium', completed: true, dueTime: '06:45',
      subtasks: [
        { title: 'Warm up', done: true },
        { title: 'Cardio', done: true },
        { title: 'Stretching', done: true }
      ]
    },
    {
      id: 3, name: 'Pay electricity bill', price: 1200, category: 'Work', description: 'Pay online via app', date: '2025-11-06', priority: 'High', completed: false, dueTime: '20:10',
      subtasks: [
        { title: 'Open app', done: true },
        { title: 'Enter amount', done: false },
        { title: 'Confirm payment', done: false }
      ]
    },
    {
      id: 4, name: 'Client meeting call', price: 0, category: 'Work', description: 'Project discussion 3 PM', date: '2025-11-06', priority: 'High', completed: false, dueTime: '15:00',
      subtasks: [
        { title: 'Prepare meeting notes', done: true },
        { title: 'Join call', done: false },
        { title: 'Share report', done: false }
      ]
    },
    {
      id: 5, name: 'Dentist appointment', price: 0, category: 'Personal', description: 'Checkup at 5 PM', date: '2025-11-08', priority: 'Medium', completed: false, dueTime: '17:12',
      subtasks: [
        { title: 'Reach clinic', done: false },
        { title: 'Consult doctor', done: false },
        { title: 'Buy medicine', done: false }
      ]
    },
    {
      id: 6, name: 'Team lunch', price: 1000, category: 'Health', description: 'Office lunch', date: '2025-11-07', priority: 'Low', completed: false, dueTime: '13:25',
      subtasks: [
        { title: 'Choose restaurant', done: true },
        { title: 'Order food', done: false },
        { title: 'Split bill', done: false }
      ]
    },
    {
      id: 7, name: 'Start React course', price: 0, category: 'Work', description: 'Online tutorial', date: '2025-11-10', priority: 'High', completed: false, dueTime: '10:40',
      subtasks: [
        { title: 'Watch intro', done: true },
        { title: 'Practice topic', done: false },
        { title: 'Take notes', done: false }
      ]
    },
    {
      id: 8, name: 'Book train tickets', price: 800, category: 'Work', description: 'Trip to Kolkata', date: '2025-11-12', priority: 'Medium', completed: false, dueTime: '21:05',
      subtasks: [
        { title: 'Check availability', done: true },
        { title: 'Fill details', done: false },
        { title: 'Make payment', done: false }
      ]
    },
    {
      id: 9, name: 'Buy Diwali gifts', price: 2000, category: 'Personal', description: 'For family', date: '2025-11-09', priority: 'High', completed: false, dueTime: '19:30',
      subtasks: [
        { title: 'Select gifts', done: true },
        { title: 'Pack gifts', done: false },
        { title: 'Send to home', done: false }
      ]
    },
    {
      id: 10, name: 'Read novel book', price: 0, category: 'Health', description: 'Spend 30 mins', date: '2025-11-10', priority: 'Low', completed: false, dueTime: '16:50',
      subtasks: [
        { title: 'Choose chapter', done: true },
        { title: 'Read 20 pages', done: false },
        { title: 'Write summary', done: false }
      ]
    },
    {
      id: 11, name: 'Call the doctor', price: 0, category: 'Personal', description: 'Appointment at 10 AM', date: '2025-11-03', priority: 'High', completed: false, dueTime: '10:05',
      subtasks: [
        { title: 'Dial number', done: true },
        { title: 'Book time', done: true },
        { title: 'Note schedule', done: false }
      ]
    },
    {
      id: 12, name: 'Pay credit card bill', price: 2500, category: 'Work', description: 'Due last week', date: '2025-10-28', priority: 'High', completed: false, dueTime: '14:18',
      subtasks: [
        { title: 'Login to bank', done: true },
        { title: 'Enter amount', done: false },
        { title: 'Verify OTP', done: false }
      ]
    },
    {
      id: 13, name: 'Submit tax documents', price: 0, category: 'Work', description: 'IT return form', date: '2025-10-31', priority: 'Medium', completed: true, dueTime: '11:30',
      subtasks: [
        { title: 'Fill form', done: true },
        { title: 'Upload docs', done: true },
        { title: 'Submit', done: true }
      ]
    },
    {
      id: 14, name: 'Laundry pickup', price: 300, category: 'Personal', description: 'Dry cleaning', date: '2025-11-02', priority: 'Low', completed: false, dueTime: '09:50',
      subtasks: [
        { title: 'Call laundry', done: true },
        { title: 'Pack clothes', done: false },
        { title: 'Hand over', done: false }
      ]
    },
    {
      id: 15, name: 'Car service', price: 1500, category: 'Personal', description: 'Engine check', date: '2025-10-30', priority: 'Medium', completed: false, dueTime: '08:20',
      subtasks: [
        { title: 'Reach showroom', done: true },
        { title: 'Explain issue', done: false },
        { title: 'Collect car', done: false }
      ]
    },

    {
      id: 16, name: 'Grocery restock', price: 700, category: 'Personal', description: 'Buy rice, pulses', date: '2025-11-06', priority: 'Medium', completed: false, dueTime: '19:45',
      subtasks: [
        { title: 'Check stock', done: true },
        { title: 'Make list', done: true },
        { title: 'Purchase items', done: false }
      ]
    },
    {
      id: 17, name: 'YoHealth session', price: 0, category: 'Health', description: 'Morning meditation', date: '2025-11-06', priority: 'Low', completed: false, dueTime: '07:10',
      subtasks: [
        { title: 'Start music', done: true },
        { title: 'Meditate', done: false },
        { title: 'Drink water', done: false }
      ]
    },
    {
      id: 18, name: 'Update LinkedIn profile', price: 0, category: 'Work', description: 'Add project details', date: '2025-11-11', priority: 'Medium', completed: false, dueTime: '12:30',
      subtasks: [
        { title: 'Update headline', done: true },
        { title: 'Add projects', done: false },
        { title: 'Post update', done: false }
      ]
    },
    {
      id: 19, name: 'Water plants', price: 0, category: 'Health', description: 'Daily routine', date: '2025-11-06', priority: 'Low', completed: true, dueTime: '08:05',
      subtasks: [
        { title: 'Fill water', done: true },
        { title: 'Water plants', done: true },
        { title: 'Clean area', done: true }
      ]
    },
    {
      id: 20, name: 'Laptop backup', price: 0, category: 'Work', description: 'Use Google Drive', date: '2025-10-25', priority: 'High', completed: false, dueTime: '22:15',
      subtasks: [
        { title: 'Open drive', done: true },
        { title: 'Upload files', done: false },
        { title: 'Verify upload', done: false }
      ]
    },
    {
      id: 21, name: 'Monthly expense report', price: 0, category: 'Work', description: 'Update Excel tracker', date: '2025-11-01', priority: 'Medium', completed: false, dueTime: '17:40',
      subtasks: [
        { title: 'Open sheet', done: true },
        { title: 'Update data', done: false },
        { title: 'Save & send', done: false }
      ]
    },
    {
      id: 22, name: 'Order computer mouse', price: 600, category: 'Work', description: 'Logitech wireless', date: '2025-11-06', priority: 'Low', completed: false, dueTime: '14:55',
      subtasks: [
        { title: 'Search online', done: true },
        { title: 'Add to cart', done: true },
        { title: 'Place order', done: false }
      ]
    },
    {
      id: 23, name: 'Weekend trip plan', price: 0, category: 'Health', description: 'Location research', date: '2025-11-09', priority: 'Low', completed: false, dueTime: '18:30',
      subtasks: [
        { title: 'Shortlist places', done: false },
        { title: 'Check budget', done: false },
        { title: 'Finalize plan', done: false }
      ]
    },
    {
      id: 24, name: 'Clean room', price: 0, category: 'Personal', description: 'Morning cleanup', date: '2025-11-06', priority: 'Medium', completed: false, dueTime: '09:00',
      subtasks: [
        { title: 'Tidy bed', done: true },
        { title: 'Sweep floor', done: false },
        { title: 'Arrange desk', done: false }
      ]
    },
    {
      id: 25, name: 'Prepare Presentation', price: 0, category: 'Work', description: 'Office presentation', date: '2025-11-07', priority: 'High', completed: false, dueTime: '11:30',
      subtasks: [
        { title: 'Create slides', done: false },
        { title: 'Add charts', done: false },
        { title: 'Review content', done: true }
      ]
    }
  ];



  formatDueDateTime(task: any): string {
    const date = new Date(task.date);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit', month: 'short', year: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-GB', options); // 05 Nov 2025

    if (task.dueTime) {
      const [hours, minutes] = task.dueTime.split(':');
      const ampm = +hours >= 12 ? 'PM' : 'AM';
      const hour12 = (+hours % 12 || 12);
      return `${formattedDate}, ${hour12}:${minutes} ${ampm}`;
    }

    console.log("formattedDate : " + formattedDate)
    return formattedDate;
  }



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
      date: [''],// ✅ Date picker field added here
      subtasks: [[]]   // ✅ new field

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

  get totalTasks() {
    return this.tasks.length;
  }

  get completedTasks() {
    return this.tasks.filter(t => t.completed).length;
  }

  get progressPercentage() {
    return this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100) : 0;
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
    // ✅ Priority Filter Logic
    if (this.priorityFilter !== "All") {
      tasksBasedOnTab = tasksBasedOnTab.filter(task => task.priority === this.priorityFilter);
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


  // ✅ Priority Color Helper
  getPriorityClass(priority: string) {
    return {
      'bg-red-500 text-white': priority === 'High',
      'bg-yellow-500 text-black': priority === 'Medium',
      'bg-green-500 text-white': priority === 'Low'
    };



  }


  getCategoryTag(category: string) {
    const map: any = {
      'Personal': '🏠 Personal',
      'Work': '💼 Work',
      'Health': '💊 Health'
    };
    return map[category] || category;
  }

  getCategoryClass(category: string) {
    return {
      'bg-blue-100 text-blue-800': category === 'Personal',
      'bg-purple-100 text-purple-800': category === 'Work',
      'bg-green-100 text-green-800': category === 'Health'
    };
  }
  checkParentTaskCompletion(task: any) {
    if (!task.subtasks) return;

    // ✅ If all subtasks are done → parent task complete
    task.completed = task.subtasks.every((sub: any) => sub.done);

    this.updateFilteredTasks();
  }



}


