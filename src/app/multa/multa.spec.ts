import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Multa } from './multa';

describe('Multa', () => {
  let component: Multa;
  let fixture: ComponentFixture<Multa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Multa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Multa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
