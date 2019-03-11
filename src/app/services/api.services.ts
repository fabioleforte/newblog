import { API_URL } from './../apiurl';
import { tap, catchError, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Blog } from './../models/blog.model';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  list: Blog;

  constructor(private http: HttpClient) { }

  listBlog(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${API_URL}`)
      .pipe(
        // tap(console.log),
        catchError(error => {
          console.log(error);
          return empty();
        })
      );
  }

  create(blog: Blog) {
    return this.http.post(`${API_URL}`, blog, httpOptions).pipe(take(1));
  }

  loadById(id) {
    return this.http.get(`${API_URL}/${id}`)
      .pipe(take(1));
  }

  update(blog: Blog): Observable<any> {

    return this.http.put(`${API_URL}`, blog, httpOptions)
      .pipe(
        tap(_ => console.log(`updated hero id=${blog.id}`)),
        catchError(error => {
          console.log(error);
          return empty();
        })
      );
  }

  delete(blog: Blog | number): Observable<Blog> {

    const id = typeof blog === 'number' ? blog : blog.id;
    return this.http.delete<Blog>(`${API_URL}/${id}`, httpOptions)
      .pipe(
        tap(console.log),
        catchError(error => {
          console.log(error);
          return empty();
        })
      );

  }

}
