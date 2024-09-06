import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Notification App';

  requestPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this.sendNotification();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.sendNotification();
          }
        });
      }
    } else {
      alert('This browser does not support desktop notification.');
    }
  }

  sendNotification() {
    const notification = new Notification('Hello!', {
      body: 'This is a notification from your Angular app!',
      icon: 'assets/notification-icon.png' // You can place an icon in the assets folder
    });

    notification.onclick = () => {
      window.focus();
    };
  }
}
