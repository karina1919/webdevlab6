import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Album, Photo} from './models';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  clientOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private client: HttpClient) { }
  getAlbums(): Observable<Album[]> {
    return this.client.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
  }
  getPhotos(id: number): Observable<Photo[]> {
    return this.client.get<Photo[]>(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
  }

  getAlbum(id: number): Observable<Album>{
    return this.client.get<Album>(`https://jsonplaceholder.typicode.com/albums/${id}`);
  }

  addAlbum(album: Album): Observable<Album>{
    return this.client.post<Album>(`https://jsonplaceholder.typicode.com/albums`, album, this.clientOptions);
  }

    updateAlbum(album: Album | undefined): Observable<any>{
      return this.client.put(`https://jsonplaceholder.typicode.com/albums/${album?.id}`, album, this.clientOptions);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.client.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
  }
}
