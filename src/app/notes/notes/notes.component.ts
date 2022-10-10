import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  public sites = [
    {
      name: 'Dizionario',
      url: 'dictionary',
    },
    {
      name: 'Indicativo',
      url: 'tenses',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
