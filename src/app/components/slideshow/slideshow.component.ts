import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      // direction: 'vertical',
      loop: true,
    
      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },
    
      // Navigation arrows
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
    
      // And if we need scrollbar
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });    
  }

  ngOnInit(): void {
    // console.log(this.movies);
  }

  onSlideNext(){
    this.mySwiper.slideNext();
  }

  onSlidePrev(){
    this.mySwiper.slidePrev();
  }

}
