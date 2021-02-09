import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionMessageComponent } from './instruction-message.component';

describe('InstructionMessageComponent', () => {
  let component: InstructionMessageComponent;
  let fixture: ComponentFixture<InstructionMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
