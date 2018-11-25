import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  constructor(private fb: FormBuilder, private client: HttpClient) { }
  createFlightForm = this.fb.group({
    flightNumber: ['', Validators.required],
    departure: ['', Validators.required],
    destination: ['', Validators.required],
    airplaneType: ['', Validators.required],
    capacity: ['', Validators.required],
  });

  ngOnInit() {
  }
  onSubmit() {
    const isFormValid = this.createFlightForm.valid;
    const formdata = this.createFlightForm.value;
    const postPayload = {
      functionName: 'create',
      args: formdata
    };
    const createFlightUrl = 'http://localhost:4000/api/flight/register';
    if (!isFormValid) {
      alert('Please enter valid from data ');
    } else {
      return this.client.post(createFlightUrl, postPayload, { responseType: 'json' })
        .subscribe((data) => {
          alert(JSON.stringify(data));
        });
    }
  }

}
