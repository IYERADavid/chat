import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { DocumentReference, SnapshotMetadata, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FirestoreService } from 'src/app/services/firestore.service';
import { QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let firestoreService: FirestoreService;
  let snackbar: MatSnackBar;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MatSnackBarModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(FirestoreService);
    snackbar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should find out that user already exists in firestore', fakeAsync(() => {
    spyOn(component, 'login');

    const loginbutton = fixture.nativeElement.querySelector('button');
    component.userData = { email: 'testpassword@gmail.com',  password: 'testpassword' };
    loginbutton.click();

    expect(component.login).toHaveBeenCalled();
  }));
});
