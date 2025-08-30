import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersDetail } from './tenders-detail';

describe('TendersDetail', () => {
  let component: TendersDetail;
  let fixture: ComponentFixture<TendersDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendersDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendersDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
