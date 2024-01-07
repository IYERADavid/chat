import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


import { NewPasswordComponent } from './new-password.component';
import { FormsModule } from '@angular/forms';

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPasswordComponent ],
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create new password component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onreset method on click', () => {
    spyOn(component, 'onreset').and.stub();

    const resetbutton = fixture.nativeElement.querySelector('button');
    resetbutton.click();

    expect(component.onreset).toHaveBeenCalled();
  })

});
