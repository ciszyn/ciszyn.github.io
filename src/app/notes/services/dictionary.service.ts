import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Translation } from '../models/translation';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private dbPath = '/dictionary';
  dictionaryRef: AngularFireList<Translation[]>;
  dictionaryRef2: AngularFireObject<Translation[]>;

  constructor(private db: AngularFireDatabase) {
    this.dictionaryRef = db.list(this.dbPath);
    this.dictionaryRef2 = db.object(this.dbPath);
  }

  public getTranslations(): Observable<Translation[] | null> {
    return this.dictionaryRef2.valueChanges()
  }

  public updateTranslations(translations: Translation[]) {
    this.dictionaryRef2.set(translations)
  }
}
