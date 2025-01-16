import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeAndOperatorsComponent } from './pipe-and-operators.component';

describe('PipeAndOperatorsComponent', () => {
  let component: PipeAndOperatorsComponent;
  let fixture: ComponentFixture<PipeAndOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeAndOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipeAndOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
