import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoComponent } from './tpo.component';

describe('TpoComponent', () => {
  let component: TpoComponent;
  let fixture: ComponentFixture<TpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
