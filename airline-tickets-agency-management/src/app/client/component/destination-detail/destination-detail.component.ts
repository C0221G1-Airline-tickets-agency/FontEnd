import {Component, OnInit} from '@angular/core';
import {Scenic} from '../../../model/destination/Scenic';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DestinationService} from '../../../service/destiantion/destination.service';
import {logger} from 'codelyzer/util/logger';
import {Destination} from '../../../model/destination/Destination';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.css']
})
export class DestinationDetailComponent implements OnInit {
  destinations: Destination;
  scenic: Scenic[];
  destinationId = 0;

  constructor(private ac: ActivatedRoute, private destinationService: DestinationService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.scenic1 = this.getDetail();
  }

  getDetail() {
    this.ac.paramMap.subscribe((paramMap: ParamMap) => {
      this.destinationId = +paramMap.get('id');
      console.log(this.destinationId);
      this.destinationService.destinationFind(this.destinationId).subscribe(next => {
       this.destinations = next;
       console.log(this.destinations);
       this.scenic = this.destinations.scenics;
       console.log(this.scenic);
       console.log(this.destinations.scenics);
       console.log(next);
      });

    });
  }
}


