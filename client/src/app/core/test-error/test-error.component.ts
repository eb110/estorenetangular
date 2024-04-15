//just for testing purposes

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent {

  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http:HttpClient){}

  get404error(){
    this.http.get(`${this.baseUrl}products/42`).subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  };

  get500error(){
    this.http.get(`${this.baseUrl}buggy/servererror`).subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  };

  get400error(){
    this.http.get(`${this.baseUrl}buggy/badrequest`).subscribe({
      next: res => console.log(res),
      error: error => console.log(error)
    })
  };

  get400ValidationError(){
    this.http.get(`${this.baseUrl}products/seven`).subscribe({
      next: res => console.log(res),
      error: error => 
        {
          console.log(error);
          this.validationErrors = error.errors;
        }
    })
  };

}
