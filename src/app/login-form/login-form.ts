import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LoginForm {
  email = '';
  password = '';
  address = '';
  remember = false;
  fathersName = '';
  mothersName = '';
  brothersName = '';
  occupation = '';
  sex = '';
  pinCode = '';
  stdCode = '';

  onSubmit(form: any) {
    if (form.valid) {
      alert(`Login Successful!\nEmail: ${this.email}`);
      console.log(form.value);
    } else {
      alert('Please fill all fields correctly.');
    }
  }


}
