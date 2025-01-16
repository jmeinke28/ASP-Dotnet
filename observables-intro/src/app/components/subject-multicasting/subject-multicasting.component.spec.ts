import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMulticastingComponent } from './subject-multicasting.component';

describe('SubjectMulticastingComponent', () => {
  let component: SubjectMulticastingComponent;
  let fixture: ComponentFixture<SubjectMulticastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectMulticastingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectMulticastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
