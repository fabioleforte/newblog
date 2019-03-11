import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from './../models/blog.model';
import { ApiService } from './../services/api.services';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ]
})
export class TableComponent implements OnInit {

  listTable: Blog[];


  // listTable$: Observable<Blog[]>;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.apiService.listBlog().subscribe(list => {
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
}
