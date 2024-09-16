/**
 * @file profile.component.spec.ts
 * @description Unit tests for the ProfileComponent. This file contains test cases to validate the creation
 * and basic functionality of the ProfileComponent in the Angular application.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

/**
 * Test suite for ProfileComponent
 */

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  /**
   * Sets up the testing environment for ProfileComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the ProfileComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
