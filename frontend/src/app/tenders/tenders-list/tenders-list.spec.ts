import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersList } from './tenders-list';

describe('TendersList', () => {
  let component: TendersList;
  let fixture: ComponentFixture<TendersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
