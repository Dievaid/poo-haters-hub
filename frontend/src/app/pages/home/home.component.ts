import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ApiService, PostData } from '../../services/api/api.service';
import { PostComponent } from '../../components/post/post.component';
import { AuthService, UserData } from '../../services/auth/auth.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PostComponent, HlmButtonDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  posts: PostData[] = [];
  users: UserData[] = [];
  currentUser: UserData;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser!;

    this.apiService.getPosts().subscribe((res) => {
      this.posts = res;
      console.log(res);
    });

    interval(10000) // emit a value every 10,000 milliseconds (10s)
      .pipe(
        switchMap(() => this.apiService.getPosts()) // call getPosts every time interval emits a value
      )
      .subscribe((res) => {
        this.posts = res;
        console.log(res);
      });

    this.apiService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
    });
  }
}
