/**
 * @file favorite-movies.component.spec.ts
 * @description Unit tests for the FavoriteMoviesComponent. This file contains basic test cases to ensure that the
 * FavoriteMoviesComponent is created correctly and is functioning as expected.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteMoviesComponent } from './favorite-movies.component';

/**
 * Test suite for FavoriteMoviesComponent
 */

describe('FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;

  /**
   * Sets up the testing environment for FavoriteMoviesComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the FavoriteMoviesComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
