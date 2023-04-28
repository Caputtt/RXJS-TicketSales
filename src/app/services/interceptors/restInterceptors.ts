import {Injectable, Injector} from "@angular/core";
import {
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({ providedIn: 'root'})

export class RestInterceptorsService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const hasToken = this.userService.getToken();

    if (hasToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + hasToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
