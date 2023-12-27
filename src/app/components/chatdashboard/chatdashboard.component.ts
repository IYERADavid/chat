import { Component, OnInit,  Renderer2, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CometChatUIKit } from "@cometchat/chat-uikit-angular";

@Component({
  selector: 'app-chatdashboard',
  templateUrl: './chatdashboard.component.html',
  styleUrls: ['./chatdashboard.component.css']
})
export class ChatdashboardComponent implements OnInit, AfterViewInit {
  isMobile: boolean = false;
  username: string | undefined;
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private renderer: Renderer2,
    private el: ElementRef
    ) { 
    CometChatUIKit.getLoggedinUser()?.then((userobj)=>{
      if (!userobj){
        this.router.navigate(["login"])
        this.snackbar.open("You must log in to continue!", "Close",{duration: 5000})
      } else{
        const Name: string | undefined = (userobj as any)?.name;
        this.username = Name;
      }
    })
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.checkScreenWidth();

    // Update isMobile property on window resize
    this.renderer.listen('window', 'resize', () => {
      this.checkScreenWidth();
    });
  }

  checkScreenWidth() {
    // Set isMobileView property based on device width
    this.isMobile = window.innerWidth <= 767; // Set your desired mobile width threshold
  }

}
