import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-fade-in">
      <h2 class="page-title"><i class="fa-solid fa-bolt"></i> Mis Habilidades</h2>
      
      <div class="skills-grid" *ngIf="skills.length > 0">
        <div class="skill-card glass-panel" *ngFor="let skill of skills">
          <!-- devicon matching logic for custom icons, using the icon string from JSON -->
          <img *ngIf="skill.icon && !skill.icon.includes('fa-')" 
               [src]="'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + skill.name.toLowerCase().replace(' ', '') + '/' + skill.icon + '.svg'" 
               alt="{{ skill.name }}" class="skill-icon-img"
               onerror="this.src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'" />
          
          <i *ngIf="skill.icon && skill.icon.includes('fa-')" [class]="skill.icon + ' skill-icon'"></i>
          
          <span class="skill-name">{{ skill.name }}</span>
        </div>
      </div>

      <div class="loading" *ngIf="skills.length === 0">
        <i class="fa-solid fa-circle-notch fa-spin"></i> Cargando habilidades...
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
      color: #eab308; /* Yellow/Gold for skills */
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }
    .skill-card {
      padding: 1.5rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: var(--transition-smooth);
      aspect-ratio: 1;
    }
    .skill-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
      border-color: var(--primary-glow);
    }
    .skill-icon-img {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
    }
    .skill-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    .skill-name {
      font-weight: 600;
      font-size: 0.95rem;
    }
    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }
  `]
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPortfolioData().subscribe(data => {
      this.skills = data.skills || [];
      
      // Fallbacks mapping exactly what the user had in HTML
      const htmlIconMap: any = {
        'Java': 'java-original',
        'Spring Boot': 'spring-original',
        'Hibernate': 'hibernate-plain',
        'Oracle': 'oracle-original'
      };
      
      this.skills.forEach(s => {
        if(htmlIconMap[s.name]) s.icon = htmlIconMap[s.name];
        else if(!s.icon) s.icon = 'fas fa-code';
      });
    });
  }
}
