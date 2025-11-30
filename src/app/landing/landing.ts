import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { HeroComponent } from './hero/hero';
import { GalleryComponent } from './gallery/gallery';
import { SectionsComponent } from './sections/sections';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, HeroComponent, GalleryComponent, SectionsComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {}
