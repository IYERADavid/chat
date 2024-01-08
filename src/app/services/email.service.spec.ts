import { TestBed } from '@angular/core/testing';
import emailjs from '@emailjs/browser'
import { environment } from 'src/environments/environment';

import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Emailjs send method', async () => {
    const obj = environment.Emailconfig;
    const email = 'test@example.com';
    const key = 'someKey';
    spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200, text: "email sent successful!"}));

    const response =  await service.sendEmail(email, key);

    expect(emailjs.send).toHaveBeenCalledWith(obj.service_id, obj.template_id, {
      to_email: email,
      reset_url: 'https://dark-chats.netlify.app/new-password/' + key
    }, obj.api_key);
    expect(response).toEqual({ status: 200, text: "email sent successful!"});
  });

});
