import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { Navbarcomponent } from './shared/navbar/navbar';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navbarcomponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { }
