import { TestBed } from '@angular/core/testing';

import {TicketsStorageService } from './tiсkets-storage.service';

describe('TiсketsStorageService', () => {
  let service: TicketsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
