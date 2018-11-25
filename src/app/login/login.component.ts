import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private client: HttpClient) { }
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
  }
  onSubmit() {
    const isFormValid = this.loginForm.valid;
    const formdata = this.loginForm.value;
    const loginPayload = {
      functionName: 'readOne',
      args: formdata
    };

    const loginUrl = 'http://localhost:4000/api/login/authenticate/user';
    if (!isFormValid) {
      alert('please enter valid data ');
    } else {
      return this.client.post(loginUrl, loginPayload, { responseType: 'json' })
        .subscribe((data) => {
          alert(JSON.stringify(data));
        });
    }
  }

}
