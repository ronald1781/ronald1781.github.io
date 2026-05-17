import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <h2 class="page-title"><i class="fa-solid fa-briefcase"></i> Mis Proyectos</h2>
      
      <div class="projects-grid" *ngIf="projects.length > 0">
        <div class="project-card glass-panel" *ngFor="let p of projects">
          <div class="project-icon">
            <i class="fa-solid fa-laptop-code"></i>
          </div>
          <div class="project-info">
            <h3>{{ p.name }}</h3>
            <p>{{ p.description }}</p>
            <a href="{{ p.link }}" class="btn-primary" target="_blank" *ngIf="p.link !== '#'">Ver más</a>
          </div>
        </div>
      </div>

      <div class="loading" *ngIf="projects.length === 0">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Cargando proyectos...
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 1rem;
    }
    .page-title {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .page-title i {
      color: var(--primary-color);
    }
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .projects-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
    .project-card {
      padding: 1.5rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      transition: var(--transition-smooth);
    }
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .project-icon {
      font-size: 2rem;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    .project-info h3 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .project-info p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      margin-bottom: 1rem;
      flex-grow: 1;
    }
    .btn-primary {
      align-self: flex-start;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      text-decoration: none;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.9rem;
      transition: var(--transition-smooth);
    }
    .btn-primary:hover {
      opacity: 0.9;
      transform: scale(1.05);
    }
    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPortfolioData().subscribe(data => {
      this.projects = data.projects || [];
    });
  }
}
