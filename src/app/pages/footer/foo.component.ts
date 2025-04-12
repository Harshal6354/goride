import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css',
})
export class FooComponent {}
