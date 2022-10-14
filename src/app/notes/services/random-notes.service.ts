import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomNotesService {
  private dbPath = '/notes';
  dictionaryRef: AngularFireObject<string>;

  constructor(db: AngularFireDatabase) {
    this.dictionaryRef = db.object(this.dbPath);
  }

  public getNote(): Observable<string | null> {
    return this.dictionaryRef.valueChanges();
  }

  public updateNote(note: string | null) {
    if (note)
      this.dictionaryRef.set(note);
    else
      this.dictionaryRef.set("")
  }
}
