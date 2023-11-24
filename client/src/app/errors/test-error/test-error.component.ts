import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOninit(): void{

  }

  get404Error(): void{
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }

  get400Error(): void{
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }

  get500Error(): void{
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }

  get401Error(): void{
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }

  get400ValidationError(): void{
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: responce => console.log(responce),
      error: error => {
        console.log(error);
        this.validationErrors = error; 
      }
    })
  }

}
