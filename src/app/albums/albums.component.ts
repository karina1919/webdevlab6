import { Component, OnInit } from '@angular/core';
import {Album} from '../models';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums!: Album[];
  loading!: boolean;

  constructor(private albumsService: AlbumsService) {
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void{
    this.loading = true;
    this.albumsService.getAlbums().subscribe((albums) => {
      this.albums = albums;
      this.loading = false;
    });
  }

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter((x) => x.id !== id);
    this.albumsService.deleteAlbum(id).subscribe();
  }

  add(title: string): void {
    title = title.trim();
    if (!title){
      return;
    }
    this.albumsService.addAlbum({ title } as Album).subscribe(album => {
      this.albums.push(album);
    });
  }

}
