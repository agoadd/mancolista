import { Component, OnInit } from '@angular/core';
import { CollectionService } from './../../Services/collection.service';
import { Collection } from './../../Modules/collection';
import * as $ from 'jquery';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  public collection: Collection;

  constructor(private service: CollectionService) {
    this.collection = service.getCollection();
  }

  ngOnInit(): void {
    $('.nav .nav-tabs a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  }
}
