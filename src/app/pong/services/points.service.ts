import { Injectable } from '@angular/core';
import { Point } from '../models/point';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  private dbPath = '/points';
  pointsRef: AngularFireList<Point>;
  constructor(private db: AngularFireDatabase) {
    this.pointsRef = db.list(this.dbPath);
  }
  public postPoint(point: Point): any {
    return this.pointsRef.push(point);
  }
  public getPoints(): Observable<Point[]> {
    return this.pointsRef.valueChanges();
  }
  public undo(): any {
    this.pointsRef.query.limitToLast(1).get().then(result => {
      result.forEach(r => {
        if (new Date(r.val().time).toDateString() == new Date().toDateString())
          r.ref.remove();
      })
    })
  }
}