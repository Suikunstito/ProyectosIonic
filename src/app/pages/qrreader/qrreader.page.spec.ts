import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrreaderPage } from './qrreader.page';

describe('QrreaderPage', () => {
  let component: QrreaderPage;
  let fixture: ComponentFixture<QrreaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrreaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
