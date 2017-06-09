import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdefaultComponent } from './userdefault.component';

describe('UserdefaultComponent', () => {
  let component: UserdefaultComponent;
  let fixture: ComponentFixture<UserdefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
