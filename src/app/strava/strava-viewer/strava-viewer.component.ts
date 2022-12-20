import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/activity';
import { CommonModule } from '@angular/common';
import { Split } from '../models/split';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-strava-viewer',
  templateUrl: './strava-viewer.component.html',
  styleUrls: ['./strava-viewer.component.scss']
})
export class StravaViewerComponent implements OnInit {

  public activities: Activity[] = [];
  public selected_activity_id = -1;
  public loading = false;
  public page_number = 1;
  public page_size = 30;
  public all_loaded = false;
  public chart: Chart<'line', number[], number> | null = null;
  public histogramChart: Chart<'line', number[], number> | null = null;
  public mean: number = 0;
  public std: number = 0;
  public loading_chart = false;
  public loading_page = false;

  constructor(private oauthService: OAuthService, private http: HttpClient, private router: Router) {
    if (!this.oauthService.getAccessToken()){
      this.oauthService.configure(environment.strava);
      this.oauthService.initCodeFlow();
    }
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.loading_page = true;
    this.http.get<Activity[]>("https://www.strava.com/api/v3/athlete/activities").toPromise().then(a => {
      this.activities = a;
      var speed_histogram = this.activities.map(a => 1 / a.average_speed * 1000 / 60);
      speed_histogram.sort();

      var min = speed_histogram[0];
      var max = speed_histogram[speed_histogram.length-1];
      const n = 8;
      var l = (max-min)/n
      var i = 0;

      var histogram = Array<number>(n).fill(0);


      speed_histogram.forEach(v => {
        while (v > (min + (i+1) * l)) {
          i++;
        }
        histogram[i]++
      });

      this.mean = speed_histogram.reduce((prev, curr) => prev + curr) / speed_histogram.length;
      this.std = Math.sqrt(speed_histogram.reduce((prev, curr) => prev + (curr-this.mean)^2) / speed_histogram.length)

      this.createHistogram(histogram, min, max);

      this.loading_page = false;
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= 0.9 * event.target.scrollHeight && !this.loading && !this.all_loaded) {
      this.loading = true;
      this.http.get<Activity[]>("https://www.strava.com/api/v3/athlete/activities", {
        params: {
          page: ++this.page_number
        }
      }).toPromise().then(a => {
        if (a.length == 0) {
          this.all_loaded = true;
        }
        this.activities = this.activities.concat(a);
        this.loading = false;
      });
    }
  }

  onClick(activity: Activity) {
    if (this.selected_activity_id == activity.id)
    {
      this.selected_activity_id = -1;
      this.chart?.destroy();
      return;
    }
    this.selected_activity_id = activity.id
    this.loading_chart = true;

    this.http.get<Activity>("https://www.strava.com/api/v3/activities/" + activity.id).toPromise().then(a => {
      activity = a
      this.createChart(activity);
      this.loading_chart = false;
    });
  }

  createChart(activity: Activity) {

    var cumulative_distance = 0;
    var cumulative_time = 0

    activity.splits_metric.forEach(s => {
      cumulative_distance += s.distance;
      cumulative_time += s.elapsed_time;

      s.cumulative_distance = cumulative_distance;
      s.cumulative_time = cumulative_time;
    });

    var dataset = {
      fill: false,
      label: "data",
      // backgroundColor: ,
      borderColor: "#bbb",
      borderWidth: 2,
      data: activity.splits_metric.map(m => 1/m.average_speed*100/6),
      tension: 0.3
    };

    var element: any = document.getElementById('speed-chart');
    this.chart?.destroy();
    this.chart = new Chart(element, {
      type: 'line',
      data: {
        labels: activity.splits_metric.map(m => m.cumulative_time),
        datasets: [dataset],
      },
      options: {
        elements: {
          point:{
              radius: 0
          }
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          xAxes: {
            type: "linear",
            display: false,
          },
          y: {
            ticks: {
              callback: (value, index, ticks) => {
                var converted =  parseFloat(value.toString());
                var minutes = converted - converted%1;
                var seconds = (converted - minutes)*60;
                seconds = seconds - seconds%1;
                if (seconds < 10)
                  return minutes + ":0" + seconds;
                else
                return minutes + ":" + seconds;
              },
              color: "#bbb",
              font: {
                size: 15
              }
            }
          },
        }
      },
    });
  }

  createHistogram(histogram: number[], min: number, max: number)
  {
    var dataset = {
      fill: false,
      label: "data",
      borderColor: "#bbb",
      backgroundColor: "#bbb",
      borderWidth: 2,
      data: histogram,
      tension: 0.3,
      barPercentage: 1,
      categoryPercentage: 1,
    };

    var labels = Array<number>(histogram.length + 1).fill(0).map((val, i) => min + (i + 0.5) * (max - min) / histogram.length);

    var element: any = document.getElementById('histogram-chart');
    this.histogramChart = new Chart(element, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [dataset],
      },
      options: {
        elements: {
          point:{
              radius: 0
          }
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            type: 'linear',
            offset: false,
            grid: {
              offset: false
            },
            ticks: {
              stepSize: (max - min) / (histogram.length),
              callback: (value, index, ticks) => {
                var converted =  parseFloat(value.toString());
                var minutes = converted - converted%1;
                var seconds = (converted - minutes)*60;
                seconds = seconds - seconds%1;
                if (seconds < 10)
                  return minutes + ":0" + seconds;
                else
                return minutes + ":" + seconds;
              }
            },

          },
        }
      },
    });
  }

  logout()
  {
    this.oauthService.logOut();
    this.router.navigate(["/"]);
  }
}
