import { Component, OnInit } from '@angular/core';
import {Album, Photo} from '../models';
import {AlbumsService} from '../albums.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  photos: Photo[];
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.getPhotos(id);
    });
  }
  goBack(): void {
    this.location.back();
  }
  getPhotos(id: number): void{
    this.loading = true;
    this.albumsService.getPhotos(id).subscribe((photos) => {
      this.photos = photos;
      this.loading = false;
    });
  }

}
