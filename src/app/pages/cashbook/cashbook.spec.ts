import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cashbook } from './cashbook';

describe('Cashbook', () => {
  let component: Cashbook;
  let fixture: ComponentFixture<Cashbook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cashbook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cashbook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
