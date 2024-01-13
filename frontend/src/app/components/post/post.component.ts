import { Component, Input } from '@angular/core';
import { AuthService, UserData } from '../../services/auth/auth.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router } from '@angular/router';
import { ApiService, PostData } from '../../services/api/api.service';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { radixSymbol } from '@ng-icons/radix-icons';
import { provideIcons } from '@ng-icons/core';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'post',
  standalone: true,
  providers: [provideIcons({ radixSymbol })],
  templateUrl: './post.component.html',
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    HlmSpinnerComponent,
    MomentModule,
  ],
})
export class PostComponent {
  @Input({ required: true }) postData!: PostData;
  // @Input({ required: true }) userData!: UserData;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  addLike() {
    console.log('add like');
    this.apiService
      .addLike(this.authService.currentUser?.uid!, this.postData.uid)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
