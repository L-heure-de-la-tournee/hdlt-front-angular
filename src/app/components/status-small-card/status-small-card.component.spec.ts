import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSmallCardComponent } from './status-small-card.component';

describe('StatusSmallCardComponent', () => {
  let component: StatusSmallCardComponent;
  let fixture: ComponentFixture<StatusSmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSmallCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
