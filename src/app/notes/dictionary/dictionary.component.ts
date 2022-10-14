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

  public dictionary: Translation[] | null = [];
  public newWord: string = '';
  public newTranslation: string = '';

  ngOnInit(): void {
    this.service.getTranslations().subscribe((d) => {
      this.dictionary = d;
    });
  }

  public postItem() {
    this.dictionary?.push(new Translation(
      this.newWord,
      this.newTranslation,
      this.dictionary.length + 1
    ));
    this.service.updateTranslations(this.dictionary ?? [])
    this.newWord = this.newTranslation = '';
    const element = this.renderer.selectRootElement('#main-input');
    setTimeout(() => element.focus(), 0);
  }

  public updateItem(translation: Translation, index: number) {
    if (translation.translated == '' || translation.word == '')
      this.dictionary?.splice(index, 1)
    this.service.updateTranslations(this.dictionary ?? []);
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
