import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <h2 class="page-title"><i class="fa-solid fa-envelope"></i> Contacto</h2>
      
      <div class="contact-card glass-panel" *ngIf="profile">
        <div class="contact-header">
          <i class="fa-solid fa-paper-plane"></i>
          <h3>¡Trabajemos Juntos!</h3>
        </div>
        <p class="contact-message">Si te gustaría colaborar en un proyecto o simplemente quieres conectar, no dudes en enviarme un mensaje.</p>
        
        <div class="contact-info">
          <a href="mailto:{{ profile?.email }}" class="email-btn">
            <i class="fa-solid fa-at"></i> {{ profile?.email }}
          </a>
        </div>
        
        <div class="social-links">
          <a href="https://github.com/ronald1781" target="_blank" class="social-btn github"><i class="fa-brands fa-github"></i> GitHub</a>
          <a href="https://www.linkedin.com/in/ronald-ramos-gutierrez/" target="_blank" class="social-btn linkedin"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .page-title {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      max-width: 600px;
    }
    .page-title i {
      color: #ef4444; /* Red for contact */
    }
    .contact-card {
      width: 100%;
      max-width: 600px;
      padding: 2.5rem;
      text-align: center;
    }
    .contact-header {
      margin-bottom: 1.5rem;
    }
    .contact-header i {
      font-size: 3rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .contact-header h3 {
      font-size: 1.75rem;
    }
    .contact-message {
      font-size: 1.05rem;
      margin-bottom: 2rem;
    }
    .email-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--surface-color);
      border: 1px solid var(--surface-border);
      padding: 1rem 2rem;
      border-radius: 50px;
      color: var(--text-primary);
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 600;
      transition: var(--transition-smooth);
    }
    .email-btn:hover {
      background: var(--primary-color);
      border-color: var(--primary-color);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
      flex-wrap: wrap;
    }
    .social-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: var(--transition-smooth);
    }
    .social-btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.2);
    }
    .github {
      background-color: #333;
    }
    .linkedin {
      background-color: #0077b5;
    }
  `]
})
export class ContactComponent implements OnInit {
  profile: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPortfolioData().subscribe(data => {
      this.profile = data.profile;
    });
  }
}
