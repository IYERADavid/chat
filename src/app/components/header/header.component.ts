import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CometChatUIKit } from "@cometchat/chat-uikit-angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() username: string | undefined; 

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logoutuser(){
    CometChatUIKit.logout().then(()=>{
      this.router.navigate(["login"])
      this.snackbar.open("Logged out successful!", "Close", {duration:5000})
    })
  }

}
