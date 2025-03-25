import { TestBed } from '@angular/core/testing';

import { Auth2Interceptor } from './auth2.interceptor';

describe('Auth2Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Auth2Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Auth2Interceptor = TestBed.inject(Auth2Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
