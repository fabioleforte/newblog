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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.listBlog().subscribe(list => {
      this.listTable = list;
    });
    this.delItemList(new Blog());

  }

  // updateItemList(blog: Blog) {

  //   this.listTable = this.listTable.filter(h => h !== blog);

  //   // this.apiService.update(blog).subscribe();
  //   console.log(this.listTable);


  // }

  delItemList(blog: Blog) {
    this.listTable = this.listTable.filter(h => h !== blog);
    this.apiService.delete(blog).subscribe(_ => {
      this.listTable.splice(blog.id, 1);
    });
  }
}
