import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Infractores } from './infractores';

describe('Infractores', () => {
  let component: Infractores;
  let fixture: ComponentFixture<Infractores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Infractores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Infractores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
