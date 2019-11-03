import { TestBed } from '@angular/core/testing';

import { MembresiasService } from './membresias.service';

describe('MembresiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembresiasService = TestBed.get(MembresiasService);
    expect(service).toBeTruthy();
  });
});
