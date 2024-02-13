import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModalComponent } from './base-modal.component';
import { ModalPayload } from '../../models/modal-payload';

describe('BaseModalComponent', () => {
  let component: BaseModalComponent;
  let fixture: ComponentFixture<BaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
