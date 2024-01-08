import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  obj = environment.Emailconfig
  sendEmail(email: string, key:string) {
    let templateParams = {
      to_email: email,
      reset_url: "https://dark-chats.netlify.app/new-password/"+ key,
    };
   
    return emailjs.send(this.obj.service_id, this.obj.template_id, templateParams, this.obj.api_key)
  }
}
