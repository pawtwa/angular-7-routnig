import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  // private fragmentSubscription: Subscription;
  // private queryParamsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route, this.route.snapshot.fragment, this.route.snapshot.queryParams);
    // this.fragmentSubscription = this.route.fragment.subscribe();
    // this.queryParamsSubscription = this.route.queryParams.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  ngOnDestroy() {
    // this.fragmentSubscription.unsubscribe();
    // this.queryParamsSubscription.unsubscribe();
  }
}
