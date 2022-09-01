import { DictionaryService } from './../services/dictionary.service';
import { Component, OnInit } from '@angular/core';
import { Translation } from '../models/translation';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  constructor(private service: DictionaryService) { }

  public dictionary: Translation[] = [];
  public newWord: string = "";
  public newTranslation: string = "";

  ngOnInit(): void {
    this.service.getTranslations().subscribe(d => {
      this.dictionary = d
    });
  }

  public postItem() {
    this.service.postTranslation(new Translation(this.newWord, this.newTranslation, this.dictionary.length + 1))
      .then(r => {
        this.newWord = this.newTranslation = ""
      })
      .catch(e => {
        console.log("couldn't update item")
      })
  }

  public updateItem(translation: Translation) {
    this.service.updateTranslation(translation)
  }

  public deleteItem(translation: Translation) {
    this.service.deleteTranslation(translation)
  }

}
