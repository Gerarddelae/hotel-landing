import { Component, OnInit, Inject, Renderer2, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  isDark = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') {
        this.enableDark();
      } else if (saved === 'light') {
        this.disableDark();
      } else {
        // respect system preference if nothing saved
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) this.enableDark();
      }
    }
  }

  toggleTheme() {
    console.log('[Header] toggleTheme called. current isDark=', this.isDark);
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isDark) {
      this.disableDark();
    } else {
      this.enableDark();
    }

    // ensure template updates immediately
    try { this.cd.detectChanges(); } catch (e) { /* noop */ }
  }

  private enableDark() {
    this.renderer.addClass(this.document.documentElement, 'dark');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;
  }

  private disableDark() {
    this.renderer.removeClass(this.document.documentElement, 'dark');
    localStorage.setItem('theme', 'light');
    this.isDark = false;
  }
}
