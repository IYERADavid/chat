import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: string = "";

  sendResetLink() {
    // Simulate backend logic to generate a reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('resetToken', resetToken);

    // Simulate sending an email (you may use a service like Nodemailer in a real application)
    console.log(`Reset link sent to ${this.email}`);
  }

  ngOnInit(): void {
  }

}
