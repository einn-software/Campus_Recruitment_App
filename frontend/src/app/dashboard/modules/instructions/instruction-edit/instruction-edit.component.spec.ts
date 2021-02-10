import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionEditComponent } from './instruction-edit.component';

describe('InstructionEditComponent', () => {
  let component: InstructionEditComponent;
  let fixture: ComponentFixture<InstructionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
