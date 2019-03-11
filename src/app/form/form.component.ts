import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from './../models/blog.model';
import { ApiService } from './../services/api.services';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [ './form.component.scss' ]
})
export class FormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm(new Blog());
  }

  createForm(blog: Blog) {

    const data = new Date();

    this.form = this.fb.group({
      title: [ blog.subtitle, Validators.compose([ Validators.required, , Validators.maxLength(40) ]) ],
      subtitle: [ blog.subtitle, Validators.compose([ Validators.required, Validators.maxLength(60) ]) ],
      publication_date: [ blog.publication_date = data ],
      comment: [ blog.comment, [ Validators.required ] ]
    });

  }

  sendData() {
    this.submitted = true;
    if (this.form.valid) {
      this.apiService.create(this.form.value).subscribe(
        success => {
          console.log('sucesso');
          this.router.navigate([ '/', 'table' ]);
        },
        error => {
          console.log('erro');
        },
        () => {
          console.log('Request Ok');
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
