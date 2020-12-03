import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { tap, map } from 'rxjs/operators';
import { MovieDetails, MovieResponse } from '../interfaces/movie-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return {
      api_key: '24eea1a4dd8a4b6122aade032afb97fb',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]>{
    if(this.cargando){
      //cargando peliculas
      return of([]);
    }

    console.log('Cargando API');
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`,{
      params: this.params
    }).pipe(
      map((resp)=>resp.results),
      tap(()=>{
        this.carteleraPage+=1;
        this.cargando = false;
      })
    );
  }

  buscarPelicula(texto: string):Observable<Movie[]>{

    const params = {...this.params, page:'1', query: texto};

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
      params
    }).pipe(
      map((resp)=>resp.results)
    );
  }

  getPeliculaDetalle(id: string){
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    });
  }
}
