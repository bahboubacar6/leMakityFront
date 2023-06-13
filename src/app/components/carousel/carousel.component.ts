import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { CarouselImage } from 'src/app/models/carousel.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images: CarouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true; 
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;

  selectedIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImage();
    }
  }

  // Change de slide chaque 3 secondes
  autoSlideImage(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

  // set index of image on dot/indicator click 
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
