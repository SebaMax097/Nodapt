import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsClientePage } from './details-cliente.page';

describe('DetailsClientePage', () => {
  let component: DetailsClientePage;
  let fixture: ComponentFixture<DetailsClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
