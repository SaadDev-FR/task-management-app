import { TestBed } from '@angular/core/testing';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthServiceService]
    });
    service = TestBed.inject(AuthServiceService);
  });

  it('should start as logged out', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should login successfully', () => {
    service.login('admin', 'password');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should logout successfully', () => {
    service.login('admin', 'password');
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
