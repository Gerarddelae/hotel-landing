import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit, OnDestroy {
  protected images = [
    '/Reservas.png',
    encodeURI('/Nueva Reserva.png'),
    encodeURI('/Detalle reserva.png'),
    encodeURI('/Detalle factura.png'),
    '/Calendario.png'
  ];
  
  currentIndex = 0;
  private observer?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
      elements.forEach(el => this.observer?.observe(el));
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
