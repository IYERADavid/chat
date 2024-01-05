import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports : [
        RouterTestingModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });
  it("should display user name ",()=>{
    const username = "david";
    component.username = username;
    fixture.detectChanges();
    const element  = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.names')?.textContent).toContain('david')
  })
  it('should handle undefined username', () => {
    component.username = undefined;
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.names')?.textContent).toBe('');
  });

  it("should call logoutuser method on click", fakeAsync( ()=>{
    spyOn(component, 'logoutuser');

    const logoutbutton = fixture.nativeElement.querySelector(".logout");
    logoutbutton.click();

    expect(component.logoutuser).toHaveBeenCalled();
  }))

});
