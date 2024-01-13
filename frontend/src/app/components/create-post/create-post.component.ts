import { Component } from '@angular/core';
import { AuthService, UserData } from '../../services/auth/auth.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router } from '@angular/router';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { radixSymbol } from '@ng-icons/radix-icons';

@Component({
  selector: 'create-post',
  standalone: true,
  imports: [
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmInputDirective,
    FormsModule,
    HlmSpinnerComponent,
    HlmIconComponent,
    HlmButtonDirective
  ],
  providers: [provideIcons({ radixSymbol })],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  userData: UserData;
  postData: string = '';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    this.userData = this.authService.currentUser!;
  }

  post() {
    this.isLoading = true;
    this.apiService
      .addPost(this.userData.uid, this.postData)
      .subscribe((res) => {
        console.log(res);
        this.isLoading = false;
      });
  }
}
