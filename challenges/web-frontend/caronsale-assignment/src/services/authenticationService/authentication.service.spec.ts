import { TestBed, async } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AxiosResponse } from 'axios';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call login with correct params', async done => {
    let spy = spyOn(service.client, 'put').and.callFake((param1, param2): Promise<any> => {
      expect(param1).toBe('/v1/authentication/userEmail');
      expect(param2).toEqual({
        password: 'e86dd3d959e6014e3252dce9e1002c3abf6b5988a04aa242f22c11bb7f120e5105f7154daf15a35eb5f8f3a198fd372cb9cefb80eb0450749dee3107cbbef42b',
        meta: 'string'
      })
      done()
      return Promise.resolve({})
    })
    let data = await service.login('userEmail', 'userPassword');
  });
  it('should call login and handle error', async done => {
    let spy = spyOn(service.client, 'put').and.callFake((param1, param2): Promise<any> => {
      return Promise.reject('error')
    })
    try {
      let data = await service.login('userEmail', 'userPassword');
    } catch (e) {
      expect(e).toBe('error');
      done()
    }

  });
  it('should set paramters to session', async done => {
    let spy = spyOn(sessionStorage, 'setItem');

    try {
      let data = await service.setSessionData({ 'userEmail': 'userPassword' });
      expect(spy).toHaveBeenCalledTimes(1);
      done()
    } catch (e) {
    }

  });
});
