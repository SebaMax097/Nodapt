import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesDeudaPage } from './clientes-deuda.page';

describe('ClientesDeudaPage', () => {
  let component: ClientesDeudaPage;
  let fixture: ComponentFixture<ClientesDeudaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesDeudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
