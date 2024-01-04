import { SignupComponent } from './signup.component';
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




describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let firestoreService: FirestoreService;
  let snackbar: MatSnackBar;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        MatSnackBarModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    firestoreService = TestBed.inject(FirestoreService);
    snackbar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message when the form is submitted with empty fields', () => {
    spyOn(snackbar, 'open');
    component.signup();
    expect(snackbar.open).toHaveBeenCalledWith('Please fill out all fields!', 'Close', { duration: 5000 });
  });

  it('should display an error message when the form is submitted with an invalid email', () => {
    spyOn(snackbar, 'open');
    component.userData = { username: 'testuser', password: 'testpassword', email: 'invalidemail' };
    component.signup();
    expect(snackbar.open).toHaveBeenCalledWith('Please enter a valid email address!', 'Close', { duration: 5000 });
  });

  it('should find out that user already exists in firestore', fakeAsync(() => {
    const querySnapshot: QuerySnapshot<DocumentData> = {
      empty: false,
      metadata : { hasPendingWrites: false, fromCache: false, isEqual: () => false } as SnapshotMetadata, // Add necessary properties
      query: {} as any, // Add necessary properties
      docs: [], // Add necessary properties
      size: 0, // Add necessary properties
      forEach: () => {},
      docChanges: () => []
    };
    spyOn(firestoreService, 'does_user_exist').and.returnValue(Promise.resolve(querySnapshot));
    spyOn(snackbar, 'open');

    component.userData = { username: 'testuser', password: 'testpassword', email: 'testpassword@gmail.com' };
    component.signup()
    tick(2000)

    // Ensure that does_user_exist is called with the correct email
    expect(firestoreService.does_user_exist).toHaveBeenCalledWith('testpassword@gmail.com');
    expect(snackbar.open).toHaveBeenCalledWith("Email already exist", 'Close',{duration: 5000})
  }));

  it('should add new user into firestore DB', fakeAsync(()=>{

    const querySnapshot: QuerySnapshot<DocumentData> = {
      empty: true,
      metadata : { hasPendingWrites: false, fromCache: false, isEqual: () => false } as SnapshotMetadata, // Add necessary properties
      query: {} as any, // Add necessary properties
      docs: [], // Add necessary properties
      size: 0, // Add necessary properties
      forEach: () => {},
      docChanges: () => []
    };

    const mockDocumentReference: DocumentReference<DocumentData>  = {
      id: 'mockedId',
      firestore: {
        // Add any necessary methods here
        all: () => ({} as any), 
      } as any,
      converter: {} as any,
      type: 'document',
      path: 'mockedPath',  // Add the path property
      parent: null as any,  // Add the parent property
    
      // Add a generic function to represent any method (e.g., get, set, update, delete)
      // Adjust as needed based on the actual structure of DocumentReference<DocumentData>
      [Symbol('genericMethod')]: () => Promise.resolve({} as any),
      withConverter: jasmine.createSpy('withConverter')
    };

    spyOn(firestoreService, 'does_user_exist').and.returnValue(Promise.resolve(querySnapshot));
    spyOn(firestoreService, 'adduser').and.returnValue(Promise.resolve(mockDocumentReference))
    spyOn(CometChatUIKit, 'createUser').and.returnValue(Promise.resolve({}))
    spyOn(router, 'navigate').and.stub()
    spyOn(snackbar, 'open')

    component.userData = { username: 'testuser', password: 'testpassword', email: 'testpassword@gmail.com' };
    component.signup()
    tick(3000)

    expect(firestoreService.does_user_exist).toHaveBeenCalledWith('testpassword@gmail.com');
    expect(firestoreService.adduser).toHaveBeenCalled()
    expect(component.userData.password).not.toBe('testpassword')
    expect(CometChatUIKit.createUser).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalled()
    expect(snackbar.open).toHaveBeenCalledOnceWith(`New account for ${component.userData.username} created successfully!`, 'Close',{duration: 5000})
  }));

}); 
