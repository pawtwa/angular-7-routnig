import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  private subscribedParams: Subscription;
  private subscribedData: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    /**
     * Z użycie Resolver
     */
    this.subscribedData = this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );

    /**
     * Zwykłe pobieranie z parametrów routingu
     */
    // const id = +this.route.snapshot.params['id'];
    // /**
    //  * if subscribing to route.{params|queryParams|fragment}, the snapshot is not really needed, since under the hood a BehaviorSubject is implemented, which preserves the last/initial state, in contrast to a normal Subject.
    //  */
    // // this.server = this.serversService.getServer((id));
    // this.subscribedParams = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer((+params['id']));
    //   }
    // );
  }

  ngOnDestroy() {
    this.subscribedData.unsubscribe();
    // this.subscribedParams.unsubscribe();
  }

  editServer(event) {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }
}