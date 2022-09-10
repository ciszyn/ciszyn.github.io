import { DictionaryService } from './../services/dictionary.service';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Translation } from '../models/translation';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  constructor(
    private service: DictionaryService,
    private renderer: Renderer2
  ) {}

  public dictionary: Translation[] = [];
  public newWord: string = '';
  public newTranslation: string = '';

  ngOnInit(): void {
    this.service.getTranslations().subscribe((d) => {
      this.dictionary = d;
    });
  }

  public postItem() {
    this.service
      .postTranslation(
        new Translation(
          this.newWord,
          this.newTranslation,
          this.dictionary.length + 1
        )
      )
      .then((r) => {
        this.newWord = this.newTranslation = '';
        const element = this.renderer.selectRootElement('#main-input');
        console.log(element);
        setTimeout(() => element.focus(), 0);
      })
      .catch((e) => {
        console.log("couldn't update item");
      });
  }

  public updateItem(translation: Translation) {
    if (translation.translated == '' || translation.word == '')
      this.service.deleteTranslation(translation);
    else this.service.updateTranslation(translation);
  }

  public filterItem(translation: Translation) {
    if (
      translation.word.toLowerCase().includes(this.newWord.toLowerCase()) &&
      translation.translated
        .toLowerCase()
        .includes(this.newTranslation.toLowerCase())
    )
      return true;
    return false;
  }
}
