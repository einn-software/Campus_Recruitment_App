import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionCreateComponent } from './instruction-create.component';

describe('InstructionCreateComponent', () => {
  let component: InstructionCreateComponent;
  let fixture: ComponentFixture<InstructionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
