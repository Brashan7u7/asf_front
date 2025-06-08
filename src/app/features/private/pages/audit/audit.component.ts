import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auditoria,
  AuditService,
} from '../../../../core/services/audit.service';

@Component({
  selector: 'app-audit',
  imports: [CommonModule],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss',
})
export class AuditComponent {
  auditorias: Auditoria[] = [];
  constructor(private auditoriaService: AuditService) {}

  ngOnInit(): void {
    this.auditoriaService.getAuditorias().subscribe({
      next: (data) => {
        this.auditorias = data;
      },
      error: (error) => {
        console.error('Error al cargar auditorías:', error);
      },
    });
  }
}
