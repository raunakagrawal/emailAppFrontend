import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchGeneratorComponent } from './match-generator.component';

describe('MatchGeneratorComponent', () => {
  let component: MatchGeneratorComponent;
  let fixture: ComponentFixture<MatchGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchGeneratorComponent]
    });
    fixture = TestBed.createComponent(MatchGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
