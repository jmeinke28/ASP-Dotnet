import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicastComponent } from './unicast.component';

describe('UnicastComponent', () => {
  let component: UnicastComponent;
  let fixture: ComponentFixture<UnicastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnicastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnicastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
