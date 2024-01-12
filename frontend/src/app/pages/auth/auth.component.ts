import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';


@Component({
  selector: 'auth',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmInputDirective],
  templateUrl: './auth.component.html',
})
export class AuthComponent {

}
