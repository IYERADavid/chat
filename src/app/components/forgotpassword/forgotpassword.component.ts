import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {v4 as uuidv4} from 'uuid';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email: string = "";
  isLoading: boolean = false;

  constructor(private emailService: EmailService, 
    private snackbar: MatSnackBar,
    private chatapp: FirestoreService ) {}

  sendResetLink() {
    this.isLoading = true;
    const key = uuidv4()
    this.chatapp.add_password_reset_key(key, this.email).then(()=>{
      this.emailService.sendEmail(this.email, key).then(() => {
        this.snackbar.open(" we have sent you an email !", "Close", {duration:5000})
        this.isLoading = false;
      }).catch(
      (response) => (this.snackbar.open(response.text, "Close", {duration:5000}), this.isLoading = false))
    }).catch((error) => (this.snackbar.open(error, "Close", {duration:5000}), this.isLoading = false))
  }

  ngOnInit(): void {
  }

}
