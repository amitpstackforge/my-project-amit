import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule],   // ✅ THIS IS REQUIRED
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
})
export class SuppliersComponent {
  activeTab: string = 'suppliers';   // default selected tab


}
