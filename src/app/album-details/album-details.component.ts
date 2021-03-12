import { Component, OnInit } from '@angular/core';
import {Album, Photo} from '../models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  album!: Album;
  loading!: boolean;
  photos!: Photo[];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const  id = +params.get('id');
      this.getAlbum(id);
    });
  }

  getAlbum(id: number): void{
    this.loading = true;
    this.albumsService.getAlbum(id).subscribe((album) => {
      this.album = album;
      this.loading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }

  updateAlbum(): void {
    this.albumsService.updateAlbum(this.album).subscribe(() => this.goBack());
  }
}
