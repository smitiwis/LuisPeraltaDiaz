import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export function productInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
  const requestClone = req.clone({
    headers: req.headers.set('authorId', `${environment.AUTHOR_ID}`),
  });

  return next(requestClone);
}