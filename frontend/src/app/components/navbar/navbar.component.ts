import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { Router, RouterLink } from '@angular/router';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { CreatePostComponent } from '../create-post/create-post.component';

const myStompConfig: InjectableRxStompConfig = {
  brokerURL: 'ws://localhost:15674/ws',
  connectHeaders: {
    login: 'username',
    passcode: 'password',
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [HlmButtonDirective, CreatePostComponent, RouterLink],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  notifications = 0;

  constructor(
    private rxStompService: RxStompService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('notifications')) {
      localStorage.setItem('notifications', '0');
    }
    this.notifications = Number(localStorage.getItem('notifications'));

    this.rxStompService.connected$.subscribe(() => {
      console.log('Connected to RabbitMQ');
    });

    this.rxStompService
      .watch('/queue/user.queue.*')
      .subscribe((message: Message) => {
        console.log('Received: ' + message.body);
        this.notifications++;
        localStorage.setItem('notifications', String(this.notifications));
      });
  }

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
