import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auditoria, AuditService } from '../../../../core/services/audit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more',
  imports: [CommonModule],
  templateUrl: './more.component.html',
  styleUrl: './more.component.scss',
})
export class MoreComponent {
 auditoriaId!: string;
  auditoria?: Auditoria;

  constructor(
    private route: ActivatedRoute,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    this.auditoriaId = this.route.snapshot.paramMap.get('id')!;
    const id = +this.auditoriaId;

    this.auditService.getAuditoriaById(id).subscribe({
      next: (data) => {
        this.auditoria = data;
        console.log('Auditoría obtenida:', this.auditoria);
      },
      error: (err) => {
        console.error('Error al obtener la auditoría:', err);
      }
    });
  }
}
