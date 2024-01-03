import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  sendEmail(email: string, key:string) {
    let templateParams = {
      to_email: email,
      reset_url: "https://dark-chats.netlify.app/new-password/"+ key,
    };
   
    return emailjs.send('service_5d24rsa', 'template_peqyg4w', templateParams, "O-J0yRdjVTz5WhzYB")
  }
}
