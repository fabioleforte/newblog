import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';
import { ApiService } from './../services/api.services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})
export class ListComponent implements OnInit {

  lists: Blob[];

  lists$: Observable<Blog[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.lists$ = this.apiService.listBlog();
  }


}
