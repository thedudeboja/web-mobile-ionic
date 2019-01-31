import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const re = "/login";

    if (req.url.search(re) === -1) {

      const authService = this.inj.get(AuthenticationService);

      const headers = req.headers
        .set('Authorization', authService.getAuthToken())
        .set('Content-Type', 'application/json');

      const auth = req.clone({ headers });

      return next.handle(auth);

    }

    return next.handle(req);

  }
}
