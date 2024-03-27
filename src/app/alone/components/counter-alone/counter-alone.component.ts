import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-alone',
  standalone: true,
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.scss',
})
export class CounterAloneComponent {
  @Input() counter: number = 10;
}
