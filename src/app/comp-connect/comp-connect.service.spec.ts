import { TestBed } from '@angular/core/testing';

import { CompConnectService } from './comp-connect.service';

describe('CompConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompConnectService = TestBed.get(CompConnectService);
    expect(service).toBeTruthy();
  });
});
