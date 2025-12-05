import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sections',
  imports: [CommonModule, FormsModule],
  templateUrl: './sections.html',
  styleUrl: './sections.css'
})
export class SectionsComponent implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  contactSubmitted = false;
  contactResponse = '';

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

  onContact(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => payload[k] = String(v));

    // For now we don't have a backend endpoint; show a success message and log the payload.
    console.log('Contact form submitted:', payload);
    this.contactSubmitted = true;
    this.contactResponse = `Gracias, ${payload['name'] || 'usuario'}. Hemos recibido tu interés por el plan "${payload['plan'] || 'No especificado'}". Te contactaremos al ${payload['email'] || 'tu correo'}.`;

    // reset form fields
    form.reset();
    // clear success after a while
    setTimeout(() => this.contactSubmitted = false, 8000);
  }

  selectPlan(plan: string, e?: Event) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!isPlatformBrowser(this.platformId)) return;

    // Pre-select plan in the contact form if present
    const select = document.querySelector('#contacto select[name="plan"]') as HTMLSelectElement | null;
    if (select) {
      select.value = plan;
      // dispatch input/change to update any bindings if necessary
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Scroll to contact section; footer has scroll-margin-top to offset fixed header
    const contacto = document.getElementById('contacto');
    if (contacto) {
      contacto.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
