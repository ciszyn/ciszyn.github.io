import { Component, OnInit } from '@angular/core';
import { RandomNotesService } from '../services/random-notes.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {

  public note: string | null = "";

  constructor(private service: RandomNotesService) { }

  ngOnInit(): void {
    this.service.getNote().subscribe(n => this.note = n)
  }

  public save() {
    var element = document.getElementById("note")
    if (element?.style.height)
    {
      element.style.height = "5px";
      element.style.height = (element.scrollHeight)+"px";
    }
    this.service.updateNote(this.note);
  }

}
