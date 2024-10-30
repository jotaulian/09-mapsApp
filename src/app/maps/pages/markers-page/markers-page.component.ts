import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';

interface MarkerAndColor{
  color: string;
  marker: Marker;
}
interface SimpleMarker{
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 14;
  public map?: Map;
  public lngLat: LngLat= new LngLat(-3.74,36.7350);

  ngAfterViewInit(): void {
      if(!this.divMap) throw 'The HTML element has not been found';

      this.map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.lngLat, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });

      // Cargamos markers desde localStorage
      this.readFromLocalStorage();

      // Creamos marcador personalizado
      // const markerHtml = document.createElement('div');
      // markerHtml.classList.add('bg-white', 'p-2', 'rounded')
      // markerHtml.innerHTML = 'Casa Montepino';
      // const marker = new Marker({
      //   color:'orange',
      //   element:markerHtml,
      // }).setLngLat(this.lngLat).addTo(this.map);
  }

  createMarker(){
    if(!this.map) return;

    // Create random color
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    // Get Center point in the map
    const lngLat = this.map.getCenter();

    // Add marker
    this.addMarker(lngLat, color);

  }

  addMarker(lngLat: LngLat, color: string){
    if(!this.map) return;

    const marker = new Marker({color, draggable:true}).setLngLat(lngLat).addTo(this.map);

    this.markers.push({color,marker});
    // Store in localStorage
    this.saveToLocalStorage();

    // Store new position in localStorage
    marker.on('dragend',()=>this.saveToLocalStorage())
  }

  deleteMarker(i:number) {
    if(!this.map) return;
    // Eliminamos el marker del mapa:
    this.markers[i].marker.remove();
    // Lo quitamos del arreglo
    this.markers.splice(i,1);

    // Update localStorage
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom:17,
      center: marker.getLngLat()
    })
    console.log('hola');

  }

  saveToLocalStorage(){
    const simpleMarkers: SimpleMarker[] = this.markers.map(({color, marker}) =>{
      return { color, lngLat: marker.getLngLat().toArray() };
    })

    localStorage.setItem('markers',JSON.stringify(simpleMarkers));

  }

  readFromLocalStorage(){
    const simpleMarkersString = localStorage.getItem('markers') || '[]';
    const simpleMarkers: SimpleMarker[] = JSON.parse(simpleMarkersString);

    simpleMarkers.forEach(({color, lngLat})=>{
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    })

  }

}
