/**
 * @file app.component.spec.ts
 * @description Unit tests for the AppComponent. This file contains test cases that validate the functionality and rendering
 * of the AppComponent in the Angular application.
 */

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

/**
 * Test suite for the AppComponent
 */

describe('AppComponent', () => {
  /**
   * Sets up the testing environment for the AppComponent before each test case.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  /**
   * Test case to ensure the AppComponent is created successfully.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test case to check that the title of the AppComponent is set correctly.
   */
  it(`should have the 'myFlix-Angular-client' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('myFlix-Angular-client');
  });

  /**
   * Test case to ensure the title is rendered in the component's template.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, myFlix-Angular-client'
    );
  });
});
