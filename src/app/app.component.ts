import { Component } from '@angular/core';
import { CarouselImage } from './models/carousel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'makityFront';

  images: CarouselImage[] = [
    { imageSrc: '/assets/images/makity4.jpg', imageAlt: 'photo1'},
    { imageSrc: '/assets/images/makity2.jpg', imageAlt: 'photo2'},
    { imageSrc: '/assets/images/makity3.jpg', imageAlt: 'photo3'},
    { imageSrc: '/assets/images/makity1.jpg', imageAlt: 'photo4'},
  ];
}
