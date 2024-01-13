import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router } from '@angular/router';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [HlmButtonDirective, CreatePostComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        this.router.navigateByUrl('login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
