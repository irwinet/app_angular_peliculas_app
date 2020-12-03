import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movie: MovieResponse;

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location) { }

  ngOnInit(): void {
    const {id} = this.activatedRoute.snapshot.params;
    // console.log(id);
    this.peliculasService.getPeliculaDetalle(id).subscribe(movie=>{
      // console.log(movie);
      this.movie = movie;
    });
  }

  onRegresar(){
    this.location.back();
  }

}
