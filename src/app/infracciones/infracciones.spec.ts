import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Infracciones } from './infracciones';

describe('Infracciones', () => {
  let component: Infracciones;
  let fixture: ComponentFixture<Infracciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Infracciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Infracciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
