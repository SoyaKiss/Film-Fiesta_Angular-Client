/**
 * @file login.component.spec.ts
 * @description Unit tests for the LoginComponent. This file contains basic test cases to ensure that the
 * LoginComponent is created correctly and is functioning as expected.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

/**
 * Test suite for LoginComponent
 */

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  /**
   * Sets up the testing environment for LoginComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the LoginComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
