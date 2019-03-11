import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Blog } from './../models/blog.model';
import { ApiService } from './../services/api.services';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: [ './edit.component.scss' ]
})
export class EditComponent implements OnInit {

  formEdit: FormGroup;
  submitted = false;
  blog: Blog;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      const id = params[ 'id' ];
      console.log(id);

      const edit$ = this.apiService.loadById(id);

      edit$.subscribe(blog => {

        this.updateForm(blog);

      });

    });


    this.createForm(new Blog());
  }

  createForm(blog: Blog) {

    const data = new Date();

    this.formEdit = this.fb.group({
      id: [ '' ],
      title: [ blog.subtitle, Validators.compose([ Validators.required, , Validators.maxLength(40) ]) ],
      subtitle: [ blog.subtitle, Validators.compose([ Validators.required, Validators.maxLength(60) ]) ],
      comment: [ blog.comment, [ Validators.required ] ]
    });

  }

  updateForm(blog) {

    this.formEdit.patchValue({
      id: blog.id,
      title: blog.title,
      subtitle: blog.subtitle,
      comment: blog.comment
    });

  }

  sendDataEdit() {
    this.submitted = true;
    // if (this.formEdit.valid) {
    this.apiService.update(this.blog).subscribe(x => {

      console.log(x);

      // () => this.location.back()
    });
    // }
  }


  onCancel() {
    this.submitted = false;
    this.formEdit.reset();
  }

}
