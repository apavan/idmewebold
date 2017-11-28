import { Headers, Http, BaseRequestOptions, RequestOptions} from '@angular/http';



const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    const token = localStorage.getItem('token');
    if (token) {
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
  }

}

export const requestOptionsProvider = { provide: RequestOptions, useClass: AuthRequestOptions };
