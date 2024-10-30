import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 14;
  public map?: Map;
  public lngLat: LngLat= new LngLat(-3.7602,36.7394);

  ngAfterViewInit(): void {
      console.log(this.divMap);

      if(!this.divMap) throw 'The HTML element has not been found';

      this.map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.lngLat, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });

      this.mapListeners();

  }

    ngOnDestroy(): void {
      this.map?.remove();
    }

  mapListeners(){
    if(!this.map) throw 'Map is not initialized';

    this.map.on('zoom',(ev)=>{
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend',(ev)=>{
        if(this.map!.getZoom()<18) return;

        this.map!.zoomTo(18);
    })

    this.map.on('moveend',()=>{
      this.lngLat = this.map!.getCenter();
    })
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(zoomValue: string) {
    this.zoom = Number(zoomValue);
      this.map!.zoomTo(this.zoom);
    }
}
