import { SwapService } from '../../../core/services/swap.service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/user/user';
import { CollectionsService } from 'src/app/core/services/collections.service';
import { Collection } from 'src/app/modules/collection/collection';



@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.css']
})
export class SwapComponent implements OnInit {

  public albumId: string
  public users: Array<User>
  public collection: Collection;

  constructor(private route: ActivatedRoute, private swapService: SwapService, private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.swapService.users.asObservable().subscribe(users => {
        this.users = users
      }
      )
      this.collectionsService.getCollection(this.albumId).subscribe(col => {
        this.collection = { id: col.payload.id, ...col.payload.data() } as Collection
        this.swapService.getUsers(this.collection)
      });
    });
  }
}
