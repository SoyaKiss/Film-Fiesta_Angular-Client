/**
 * @file favorite-movie-card.component.spec.ts
 * @description Unit tests for the FavoriteMovieCardComponent. This file includes basic test cases to ensure that the
 * FavoriteMovieCardComponent is created correctly and functions as expected.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteMovieCardComponent } from './favorite-movie-card.component';

/**
 * Test suite for FavoriteMovieCardComponent
 */

describe('FavoriteMovieCardComponent', () => {
  let component: FavoriteMovieCardComponent;
  let fixture: ComponentFixture<FavoriteMovieCardComponent>;

  /**
   * Sets up the testing environment for FavoriteMovieCardComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the FavoriteMovieCardComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
