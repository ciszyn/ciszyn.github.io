export class Split {
  constructor(public distance: number,
              public average_speed: number,
              public elapsed_time: number,
              public moving_time: number,
              public average_grade_adjusted_speed: number,
              public cumulative_distance: number,
              public cumulative_time: number) { }
}
