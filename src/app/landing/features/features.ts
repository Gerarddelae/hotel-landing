import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-features',
  imports: [NgClass],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class FeaturesComponent {
  protected readonly features = [
    { title: 'Explore the Docs', link: 'https://angular.dev', colorClass: 'pill-blue' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials', colorClass: 'pill-violet' },
    { title: 'Prompt and best practices for AI', link: 'https://angular.dev/ai/develop-with-ai', colorClass: 'pill-french' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli', colorClass: 'pill-red' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service', colorClass: 'pill-red' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools', colorClass: 'pill-red' },
  ];
}
