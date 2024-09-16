/**
 * @file description-dialog.component.spec.ts
 * @description Unit tests for the Description Dialog. This file contains basic test cases to ensure that the
 * Description Dialog is created correctly and is functioning as expected.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescriptionDialogComponent } from './description-dialog.component';

/**
 * Test suite for Description Dialog Component
 */

describe('DescriptionDialogComponent', () => {
  let component: DescriptionDialogComponent;
  let fixture: ComponentFixture<DescriptionDialogComponent>;

  /**
   * Sets up the testing environment for DescriptionDialog before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the DescriptionDialog is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
