import { TestBed } from '@angular/core/testing';

import { AdministradoresService } from './administradores.service';

describe('AdministradoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministradoresService = TestBed.get(AdministradoresService);
    expect(service).toBeTruthy();
  });
});
