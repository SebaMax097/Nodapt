import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVentaPage } from './add-venta.page';

describe('AddVentaPage', () => {
  let component: AddVentaPage;
  let fixture: ComponentFixture<AddVentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
