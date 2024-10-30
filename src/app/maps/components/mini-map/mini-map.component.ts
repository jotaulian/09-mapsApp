import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number];
  public map?: Map;
  public zoom: number = 14;

  ngAfterViewInit(): void {
    if(!this.lngLat) throw 'Method not implemented.';
    if(!this.divMap) throw 'The HTML element has not been found';

      this.map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.lngLat, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
        interactive: false, // user wont be able to move map
      });

    new Marker().setLngLat(this.lngLat).addTo(this.map);
  }

}
