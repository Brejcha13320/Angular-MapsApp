import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.scss',
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;
  markers: MarkerAndColor[] = [];
  map?: Map;
  currentLngLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      accessToken: environment.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readToLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Jesus';

    // const marker = new Marker({
    //   color: 'red',
    //   element: markerHtml,
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarter() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    //dragend
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      };
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarker));
  }

  readToLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! OJO!

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
