import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Translation } from '../models/translation';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private dbPath = '/dictionary';
  dictionaryRef: AngularFireList<Translation>;

  constructor(private db: AngularFireDatabase) {
    this.dictionaryRef = db.list(this.dbPath);
  }

  public postTranslation(translation: Translation) {
    return this.dictionaryRef.push(translation);
  }

  public updateTranslation(translation: Translation): any {
    return this.dictionaryRef.query
      .orderByChild('key')
      .equalTo(translation.key)
      .get()
      .then((r) =>
        r.forEach((child) => {
          child.ref.set(translation);
        })
      );
  }

  public getTranslations(): Observable<Translation[]> {
    return this.dictionaryRef.valueChanges();
  }

  public deleteTranslation(translation: Translation) {
    return this.dictionaryRef.query
      .orderByChild('key')
      .equalTo(translation.key)
      .get()
      .then((r) =>
        r.forEach((child) => {
          child.ref.remove();
        })
      );
  }
}
