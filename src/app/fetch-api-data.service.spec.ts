/**
 * @file fetch-api-data.service.spec.ts
 * @description Unit tests for the FetchApiDataService. This file contains test cases that validate the creation
 * and basic functionality of the FetchApiDataService in the Angular application.
 */

import { TestBed } from '@angular/core/testing';
import { FetchApiDataService } from './fetch-api-data.service';

/**
 * Test suite for FetchApiDataService
 */
describe('FetchApiDataService', () => {
  let service: FetchApiDataService;

  /**
   * Sets up the testing environment for FetchApiDataService before each test case.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDataService);
  });

  /**
   * Test case to ensure that the FetchApiDataService is created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
