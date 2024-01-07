import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


import { ChatdashboardComponent } from './chatdashboard.component';

describe('ChatdashboardComponent', () => {
  let component: ChatdashboardComponent;
  let fixture: ComponentFixture<ChatdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatdashboardComponent ],
      imports: [ 
        RouterTestingModule,
        MatSnackBarModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore())
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create chat component ', () => {
    expect(component).toBeTruthy();
  });
});
