import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { Point } from '../models/point';
import { PointsService } from '../services/points.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-points-tracker',
  templateUrl: './points-tracker.component.html',
  styleUrls: ['./points-tracker.component.scss'],
})
export class PointsTrackerComponent implements OnInit {
  title = 'pong';
  pointsToday: Point[] = [];
  allPoints: Point[] = [];
  chart: Chart<'line', number[], string> | null = null;
  cumulativeChart: Chart<'line', number[], string> | null = null;
  daysPlayed = [];
  users: any[] = [
    {
      name: 'Michał',
      borderColor: 'rgba(66, 135, 245, 1)',
      backgroundColor: 'rgba(66, 135, 245, 0.5)',
      points: 0,
      pointsByDay: [],
    },
    {
      name: 'Sebastian',
      borderColor: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      points: 0,
      pointsByDay: [],
    },
  ];

  constructor(private pointsService: PointsService, private auth: AuthService) {
    Chart.register(...registerables);
  }

  async ngOnInit(): Promise<void> {
    const barCanvasEle: any = document.getElementById('chart');
    const cumulativeCanvasEle: any = document.getElementById('cumulativeChart');

    this.pointsService.getPoints().subscribe((points) => {
      this.pointsToday = points.filter(
        (p) => new Date(p.time).toDateString() === new Date().toDateString()
      );

      this.users.forEach((user) => {
        user.points = this.pointsToday.filter(
          (p) => p.name == user.name
        ).length;
      });

      this.allPoints = points.filter(
        p => new Date(p.time).getFullYear() === new Date().getFullYear()
      );

      var datasets = <any[]>[];
      var cumulativeDatasets = <any[]>[];
      this.users.forEach((user) => {
        var dataset = {
          fill: false,
          label: user.name,
          backgroundColor: user.backgroundColor,
          borderColor: user.borderColor,
          borderWidth: 2,
          data: <any[]>[],
        };

        var cumulativeDataset = {
          fill: false,
          label: user.name,
          backgroundColor: user.backgroundColor,
          borderColor: user.borderColor,
          borderWidth: 2,
          data: <any[]>[],
        };

        var pointCountByDay: { [key: string]: number } = {};
        this.allPoints
          .filter((p) => p.name == user.name)
          .forEach((p) => {
            var val: number = pointCountByDay[new Date(p.time).toDateString()];
            pointCountByDay[new Date(p.time).toDateString()] = !val
              ? 1
              : val + 1;
          });

        user.pointsByDay = [];
        for (var key in pointCountByDay) {
          user.pointsByDay.push({
            date: key,
            value: pointCountByDay[key],
          });
          dataset.data.push({
            x: key,
            y: pointCountByDay[key],
          });
          cumulativeDataset.data.push({
            x: key,
            y:
              pointCountByDay[key] +
              (cumulativeDataset.data.length == 0
                ? 0
                : cumulativeDataset.data[cumulativeDataset.data.length - 1].y),
          });
        }
        datasets.push(dataset);
        cumulativeDatasets.push(cumulativeDataset);
      });
      this.chart?.destroy();
      this.chart = new Chart(barCanvasEle, {
        type: 'line',
        data: {
          datasets: datasets,
        },
        options: {
          maintainAspectRatio: false,
          parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y',
          },
          scales: {
            y: {
              min: 0,
              ticks: {
                color: "#bbb"
              }
            },
            x: {
              ticks: {
                color: "#bbb"
              }
            }
          },
          plugins: {
            legend: {
              title: {
                display: false,
              },
              labels: {
                color: "#bbb",
                font: {
                  size: 15
                }
              }
            },
          },
        },
      });
      this.cumulativeChart?.destroy();
      this.cumulativeChart = new Chart(cumulativeCanvasEle, {
        type: 'line',
        data: {
          datasets: cumulativeDatasets,
        },
        options: {
          maintainAspectRatio: false,
          parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y',
          },
          scales: {
            y: {
              min: 0,
              ticks: {
                color: "#bbb"
              }
            },
            x: {
              ticks: {
                color: "#bbb"
              }
            }
          },
          plugins: {
            legend: {
              title: {
                display: false,
              },
              labels: {
                color: "#bbb",
                font: {
                  size: 15
                }
              }
            },
          },
        },
      });

      this.daysPlayed = this.users[0].pointsByDay.map(
        (p: { date: any }) =>
          new Date(p.date).getDate() +
          '.' +
          (new Date(p.date).getMonth() + 1) +
          '.' +
          new Date(p.date).getFullYear()
      );
      if (this.users[1].pointsByDay.length > this.daysPlayed.length) {
        this.daysPlayed = this.users[1].pointsByDay.map(
          (p: { date: any }) => new Date(p.date)
        );
      }
    });
  }

  async newPoint(name: string): Promise<void> {
    this.auth.user$.pipe(first()).subscribe((u) => {
      if (u == null) {
        this.auth.login();
      } else {
        this.pointsService
          .postPoint(new Point(name, new Date().toISOString()))
          .then((result: any) => console.log(result));
      }
    });
  }

  async undo() {
    this.auth.user$.pipe(first()).subscribe((u) => {
      if (u == null) {
        this.auth.login();
      } else {
        this.pointsService.undo();
      }
    });
  }
}
