import { Split } from "./split";

export class Activity {
  constructor(public average_speed: number,
              public distance: number,
              public elapsed_time: number,
              public id: number,
              public max_speed: number,
              public moving_time: number,
              public start_date: Date,
              public splits_metric: Split[],
              public splits_standard: Split[]) { }
}
