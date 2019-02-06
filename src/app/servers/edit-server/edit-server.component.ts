import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';
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
  allowEdit = false;

  // private fragmentSubscription: Subscription;
  private queryParamsSubscription: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.fragmentSubscription = this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    /**
     * if subscribing to route.{params|queryParams|fragment}, the snapshot is not really needed, since under the hood a BehaviorSubject is implemented, which preserves the last/initial state, in contrast to a normal Subject.
     */
    // this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === '1' ? true : false;
    this.queryParamsSubscription = this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  ngOnDestroy() {
    // this.fragmentSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }
}
