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

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    if (!this.oauthService.getAccessToken()){
      this.oauthService.configure(environment.strava);
      this.oauthService.initCodeFlow();
    }
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    // this.http.get<Activity>("https://www.strava.com/api/v3/activities/8226229148").toPromise().then(a => console.log(a));
    this.http.get<Activity[]>("https://www.strava.com/api/v3/athlete/activities").toPromise().then(a => this.activities = a);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= 0.8 * event.target.scrollHeight && !this.loading && !this.all_loaded) {
      console.log(this.loading);
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

    this.http.get<Activity>("https://www.strava.com/api/v3/activities/" + activity.id).toPromise().then(a => {
      activity = a
      this.createChart(activity);
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
}
