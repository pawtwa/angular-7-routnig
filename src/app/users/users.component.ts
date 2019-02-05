import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];

  navigateUser(user: {id: number, name: string}) {
    // this.router.navigate(['/users/'+user.id+'/'+user.name])
  }
}
