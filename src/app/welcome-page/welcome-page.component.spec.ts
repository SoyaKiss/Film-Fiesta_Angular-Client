/**
 * @file welcome-page.component.spec.ts
 * @description Unit tests for the WelcomePageComponent. This file contains test cases to validate the creation and
 * functionality of the WelcomePageComponent in the Angular application.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePageComponent } from './welcome-page.component';

/**
 * Test suite for WelcomePageComponent
 */

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  /**
   * Sets up the testing environment for WelcomePageComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the WelcomePageComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
