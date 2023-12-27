import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {v4 as uuidv4} from 'uuid';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { signupInterface } from 'src/app/models/auth';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData: signupInterface = {username: "", password:"", email: ""}

  constructor( 
    private snackbar: MatSnackBar,
    private chatapp: FirestoreService,
    private router: Router
    ){}

  ngOnInit() {
    
  }

  signup() {
    if (this.userData.username === "" || this.userData.password === "" || this.userData.email === ""){
      this.snackbar.open('Please fill out all fields!', 'Close',{duration: 5000});
    } 
    else if (!this.isValidEmail(this.userData.email)) {
      this.snackbar.open('Please enter a valid email address!', 'Close', { duration: 5000 });
    } 
    else {
      this.chatapp.does_user_exist(this.userData.email).then(user => {
        if(user.empty){

          const Useruuid = uuidv4();
          const saltRounds = 10;
          // Generate a salt
          const salt = bcrypt.genSaltSync(saltRounds);
          // Hash the password
          const hashedPassword = bcrypt.hashSync(this.userData.password, salt);
          this.userData.password = hashedPassword;
          
          this.chatapp.adduser(this.userData, Useruuid).then( (userdata) => {
            let user = new CometChat.User(Useruuid);
            user.setName(this.userData.username);
            CometChatUIKit.createUser(user).then(user => {

              console.log("user created", user);
              this.router.navigate(["/login"])
              this.snackbar.open(`New account for ${this.userData.username} created successfully!`, 'Close',{duration: 5000});
            
            }).catch((error)=> {
              this.chatapp.deleteuser(userdata.id).then(()=>this.snackbar.open(error, 'Close',{duration: 5000}))
            })

          }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}))

        } else {
          console.log(user)
          this.snackbar.open("Email already exist", 'Close',{duration: 5000});
        }

      }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}))

    }
  }
  
  isValidEmail(email: string): boolean {
    // Implement email validation logic (you can use a regular expression)
    // Return true if the email is valid, false otherwise
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
