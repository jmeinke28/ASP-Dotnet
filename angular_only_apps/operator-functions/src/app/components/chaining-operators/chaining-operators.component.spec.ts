import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingOperatorsComponent } from './chaining-operators.component';

describe('ChainingOperatorsComponent', () => {
  let component: ChainingOperatorsComponent;
  let fixture: ComponentFixture<ChainingOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainingOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChainingOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
