import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  pass_key!: string;
  password: string = "";
  confirm_pass: string = "";

  constructor (private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private chatapp: FirestoreService,
    private router: Router) {}

  onreset(){
    if (this.password !== '' && this.password === this.confirm_pass){
      this.chatapp.update_user_password(this.pass_key, this.password).then((response)=>{
        if (response === "success") {
          this.snackbar.open("password changed successful!", "Close", {duration:5000})
          this.router.navigate(['login'])
        } else if (response == "expired pass_key") {
          this.snackbar.open("pass_key expired, try another!", "Close", {duration:5000})
          this.router.navigate(["forgot-password"])
        } else if (response == "" ){
          this.snackbar.open("invalid link url", "Close", {duration:5000})
        }
      })
    } else {
      this.snackbar.open("password doesn't match!", "Close", {duration:5000})
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pass_key = params['pass_key'];
      console.log('Token:', this.pass_key);
    })
  }

}
