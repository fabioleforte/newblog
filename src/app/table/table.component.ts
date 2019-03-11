import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Blog } from './../models/blog.model';
import { ApiService } from './../services/api.services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ]
})
export class TableComponent implements OnInit, OnDestroy {

  listTable: Blog[];
  unSubscrib: Subscription;


  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.unSubscrib = this.apiService.listBlog().subscribe(list => {
      this.listTable = list;
    });
    this.delItemList(new Blog());

  }

  onEdit(id) {

    this.router.navigate([ 'edit', id ]);

  }


  delItemList(blog: Blog) {
    this.listTable = this.listTable.filter(h => h !== blog);
    this.apiService.delete(blog).subscribe(_ => {
      this.listTable.splice(blog.id, 1);
    });
  }

  ngOnDestroy() {

    this.unSubscrib.unsubscribe();

  }
}
