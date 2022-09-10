import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointsTrackerComponent } from './points-tracker/points-tracker.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [PointsTrackerComponent],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forChild([
      { path: 'pong', component: PointsTrackerComponent },
    ]),
  ],
})
export class PongModule {}
