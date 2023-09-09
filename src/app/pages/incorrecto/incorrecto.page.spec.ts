import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncorrectoPage } from './incorrecto.page';

describe('IncorrectoPage', () => {
  let component: IncorrectoPage;
  let fixture: ComponentFixture<IncorrectoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IncorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
