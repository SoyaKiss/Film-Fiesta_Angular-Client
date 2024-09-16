/**
 * @file header.component.spec.ts
 * @description Unit tests for the HeaderComponent. This file contains basic test cases to ensure that the
 * HeaderComponent is created correctly and is functioning as expected.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

/**
 * Test suite for HeaderComponent
 */

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  /**
   * Sets up the testing environment for HeaderComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the HeaderComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
