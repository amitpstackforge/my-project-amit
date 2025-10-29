import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [CommonModule],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {

  showDetails = false;
  likes = 0;

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  likePost() {
    this.likes++;
  }

  dislikePost() {
    if (this.likes > 0) {
      this.likes--;
    }
  }
}