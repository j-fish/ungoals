class DataChart {  

  f_datasets = []
  chart
  config
  json
  maxValue = 0
  minValue = Number.MAX_SAFE_INTEGER
  seriesDesc = ''

  constructor() {
  } 

  build(json) {

    this.json = json;
    var maxValueForDetailedTools;
    var colors = new AppColors();
    var tooltipCustom = new ToolTips();
    var labelTool = new LabelTool();
    var nodeLabelTool = new NodeLabelTool();
    var minTimePeriod = Number.MAX_SAFE_INTEGER;
    var maxTimePeriod = 0;

    let geoAreas = new Map();
    for(var k in json) {
      
      if (geoAreas.has(json[k].GeoAreaName)) {
        var v = 0;
        if (geoAreas.get(json[k].GeoAreaName).has(json[k].TimePeriod)) {
          v = (json[k].Value + geoAreas.get(json[k].GeoAreaName).get(json[k].TimePeriod)) / 2;
        } else {
          v = json[k].Value;
        }
        geoAreas.get(json[k].GeoAreaName).set(json[k].TimePeriod, v);
      } else {
        let vars = new Map();
        vars.set(json[k].TimePeriod, json[k].Value);
        geoAreas.set(json[k].GeoAreaName, vars); 
      }

      minTimePeriod = json[k].TimePeriod < minTimePeriod ? json[k].TimePeriod : minTimePeriod;
      maxTimePeriod = json[k].TimePeriod > maxTimePeriod ? json[k].TimePeriod : maxTimePeriod;
      this.minValue = parseInt(json[k].Value) < this.minValue ? parseInt(json[k].Value) : this.minValue;
      this.maxValue = parseInt(json[k].Value) > this.maxValue ? parseInt(json[k].Value) : this.maxValue;
      if (this.seriesDesc === '') this.seriesDesc = json[k].SeriesDescription;
    }

    var minv = this.minValue;
    var maxv = this.maxValue;

    // Append missing years based on max and min years found in pulled datasets.
    geoAreas.forEach(function(value, key, map) {
      var min = minTimePeriod;
      while (min <= maxTimePeriod) {
        if (value.has(min.toString())) {
          // nothing here yet !
        } else {
          value.set(min.toString(), NaN);
        }
        ++min;
      }
    });

    geoAreas.forEach(function(value, key, map) {
      map.set(key, new Map([...map.get(key).entries()].sort()));
    });

    // Build the sets for interfaces.
    var datasets = [];
    geoAreas.forEach(function(value, key, map) {
      var unidata = [];
      map.get(key).forEach(function(v, k, m) {
        unidata.push(v);
      });
      var dataset = { 
        //label: labelTool.custom(key, json), // the content of tool tip
        data: unidata,
        fill: false, // will color area bellow line. 
        spanGaps: true,
        lineTension: 0,
        showLine: true,
        selected: 'false'
      };

      maxValueForDetailedTools = parseInt((maxv / 100) * 10);
      value.forEach(function(val) {
        if (val > maxValueForDetailedTools) {
          dataset.label = labelTool.custom(key, json);
          dataset.selected = 'checked';
        }
      });

      datasets.push({ key, dataset });
    });

    // prepare x labeled data.
    var xlabels = [];
    var min = minTimePeriod;
    while (min <= maxTimePeriod) {
      xlabels.push(min);
      ++min;
    }

    // Override drawline.
    /*var originalController = Chart.controllers.line;
    Chart.controllers.line = Chart.controllers.line.extend({
      draw: function() {
        originalController.prototype.draw.call(this, arguments);
        nodeLabelTool.buildNodeLabel(this);
      }
    });*/

    this.f_datasets = datasets;
    datasets = this.startUpFilter(this.f_datasets);

    // Finally build chart.
    var l_seriesDesc = this.seriesDesc;
    var canvas = document.getElementById('data-chart');
    this.config = {
      type: "line",
      data: {
        labels: xlabels,
        datasets: datasets
      },
      options: {        
        hover: {mode: null},
        responsive: true,
        legend: {
          display: false,
          position: 'left'
        },
        elements: {
          point: {
            backgroundColor: colors.getLineColor,
            pointStyle: 'circle',
            radius: 3,
            hoverRadius: 12,
            hoverBackgroundColor: colors.transparentize
          },
          line: {
            fill: false,
            backgroundColor: colors.getLineColor,
            borderColor: colors.getLineColor,
            borderWidth: 1
          },
        },
        scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Year'
              }
          }],
          yAxes: [{
            ticks: {
                min: minv,
                max: maxv + (maxv * 0.1)
              },
            display: true,
            scaleLabel: {
                display: true,
                labelString: l_seriesDesc
            }
          }]
        },
        tooltips: {
          //filter: function (tooltipItem) { return tooltipItem.value > maxValueForDetailedTools; }, 
          bodyFontFamily: '2px consolas',         
          enabled: false,
          mode: 'point',
          position: 'nearest',
          intersect: false,
          custom: tooltipCustom.custom
        }
      }
    };

    this.chart = new Chart(canvas, this.config);

    return this.f_datasets;
  }

  getJson() {
    return this.json;
  }

  getDataset(key) {
    for (var i = 0; i < this.f_datasets.length; ++i) {
      if (this.f_datasets[i].key == key) {
        return this.f_datasets[i].dataset;
      }
    }
  }

  startUpFilter(datasets) {
    var tmp_dts = [];
    for (var data in datasets) {
      if (datasets[data].dataset.selected === 'checked') {
        tmp_dts.push(datasets[data].dataset);
      }
    }

    return tmp_dts;
  }

} 