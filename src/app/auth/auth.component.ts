import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit() {
    const body = { aa: "ddddd" };
    this.service.signIn(JSON.stringify(body)).subscribe((data) => {
      console.log("response data ===============>"+ JSON.stringify(data));
    })
  }
}
