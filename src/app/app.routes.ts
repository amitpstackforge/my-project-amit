import { Routes } from '@angular/router';
import { CashbookComponent } from './pages/cashbook/cashbook';
import { ExpensesComponent } from './pages/expenses/expenses';
import { ReportsComponent } from './pages/reports/reports';
import { SettingsComponent } from './pages/settings/settings';
import { StaffComponent } from './pages/staff/staff';
import { SuppliersComponent } from './pages/suppliers/suppliers';
import { HomeComponent } from './pages/home/home';


export const routes: Routes = [
    { path: '', redirectTo: '/suppliers', pathMatch: 'full' },
    { path: 'suppliers', component: SuppliersComponent },
    { path: 'expenses', component: ExpensesComponent },
    { path: 'cashbook', component: CashbookComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'home', component: HomeComponent },  // ✅ add this
    { path: 'settings', component: SettingsComponent },];

