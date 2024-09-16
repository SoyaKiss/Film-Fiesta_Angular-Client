/**
 * @file movie-card.component.spec.ts
 * @description Unit tests for the MovieCardComponent. This file contains basic test cases to ensure that the
 * MovieCardComponent is created correctly and is functioning as expected.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';

/**
 * Test suite for MovieCardComponent
 */

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  /**
   * Sets up the testing environment for MovieCardComponent before each test case.
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test case to ensure that the MovieCardComponent is created successfully.
   */

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
