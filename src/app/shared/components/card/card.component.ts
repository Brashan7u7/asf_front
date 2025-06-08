import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
   @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  showFullSubtitle: boolean = false;

  get isSubtitleLong(): boolean {
    return this.subtitle.length > 100;
  }

  get displayedSubtitle(): string {
    return this.showFullSubtitle || !this.isSubtitleLong
      ? this.subtitle
      : this.subtitle.slice(0, 100) + '...';
  }

  toggleSubtitle(): void {
    this.showFullSubtitle = !this.showFullSubtitle;
  }
}
