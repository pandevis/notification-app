import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  fileContent: string = '';
  fileName: string = '';
  fileUploaded: boolean = false;

  ngOnInit() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }
  
  // Function to handle file upload
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      // Read the file content
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileContent = e.target.result;
        this.fileUploaded = true;

        // Send a notification
        this.sendNotification();
      };
      reader.readAsText(file); // Reads file as text
    }
  }

  // Function to send a notification
  sendNotification() {
    if (Notification.permission === 'granted') {
      const notification = new Notification('File Uploaded', {
        body: `The file ${this.fileName} has been uploaded.`,
        icon: 'assets/notification-icon.png' // Ensure this path is correct
      });

      // Simulate deleting the file after notification
      notification.onclose = () => {
        this.deleteFile();
      };
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.sendNotification();
        }
      });
    }
  }

  // Simulate file deletion by clearing content
  deleteFile() {
    this.fileContent = '';
    this.fileName = '';
    this.fileUploaded = false;
    alert('File has been deleted after sending the notification.');
  }
}
