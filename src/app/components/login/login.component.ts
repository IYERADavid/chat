import { Component, OnInit } from '@angular/core';
import { CometChatUIKit } from "@cometchat/chat-uikit-angular";
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginInterface } from 'src/app/models/auth';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: loginInterface = {email:"", password:""}
  constructor(
    private chatapp: FirestoreService, 
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  login(){
    this.chatapp.loginuser(this.userData).then((user)=>{
      if(user.empty){
        this.snackbar.open("Invalid Email!!!", 'Close',{duration: 5000});
      } else {
        const user_data = user.docs[0].data()
        // Compare the entered password with the stored hashed password
        const passwordMatches = bcrypt.compareSync(this.userData.password,user_data.password);
        if (!passwordMatches) {
          this.snackbar.open("Invalid Password!!!", 'Close',{duration: 5000});
          return;
        }
        CometChatUIKit.logout().finally(()=>{
          CometChatUIKit.login({ uid:user_data.user_id, authToken: environment.COMETCHAT_CONSTANTS.AUTH_KEY}).then((userobj) => {
            //console.log("Login Successful:", userobj );
            const userName: string | undefined = (userobj as any)?.name;
            this.router.navigate(["/"])
            this.snackbar.open(`welcome back ${userName}!`, 'Close',{duration: 5000});
          }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}));
        })
      }
    }).catch((error)=> this.snackbar.open(error, 'Close',{duration: 5000}));
  }

}
