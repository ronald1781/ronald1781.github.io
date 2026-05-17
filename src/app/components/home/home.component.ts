import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container animate-fade-in" *ngIf="profile">
      <div class="hero-section glass-panel">
        <div class="avatar">
          <i class="fa-solid fa-user-astronaut"></i>
        </div>
        <h1 class="name">{{ profile?.name }}</h1>
        <h2 class="title">{{ profile?.title }}</h2>
        <p class="about">{{ profile?.about }}</p>
      </div>
    </div>
    
    <div class="loading" *ngIf="!profile">
      <i class="fa-solid fa-circle-notch fa-spin"></i> Cargando perfil...
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 70vh;
    }
    .hero-section {
      text-align: center;
      padding: 3rem 2rem;
      max-width: 600px;
      width: 100%;
      border-radius: 24px;
    }
    .avatar {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem auto;
      font-size: 3rem;
      color: white;
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
    }
    .name {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }
    .title {
      font-size: 1.25rem;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    .about {
      font-size: 1.05rem;
      line-height: 1.7;
    }
    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }
  `]
})
export class HomeComponent implements OnInit {
  profile: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPortfolioData().subscribe(data => {
      this.profile = data.profile;
    });
  }
}
