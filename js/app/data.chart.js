class DataChart {  

  f_datasets = []
  chart
  config
  json
  maxValue = 0
  minValue = Number.MAX_SAFE_INTEGER
  seriesDesc = ''
  maxxfactor = 0.1

  constructor() {
  } 

  build(json) {

    this.json = json;
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
        data: unidata,
        fill: true, // will color area bellow line. 
        spanGaps: true,
        lineTension: 0,
        showLine: true,
        selected: 'false'
      };

      datasets.push({ key, dataset });
    });

    // prepare x labeled data.
    var xlabels = [];
    var min = minTimePeriod;
    while (min <= maxTimePeriod) {
      xlabels.push(min);
      ++min;
    }

    this.f_datasets = datasets;
    datasets = this.startUpFilter(this.f_datasets);

    // Finally build chart.
    var l_seriesDesc = this.seriesDesc;
    var canvas = document.getElementById('data-chart');
    var lmaxxfactor = this.maxxfactor;
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
            radius: 9,
            hoverRadius: 12,
            hoverBackgroundColor: colors.getLineColor
          },
          line: {
            fill: false,
            backgroundColor: colors.transparentizeBackground,
            borderColor: '#808080',
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
                max: maxv + (maxv * lmaxxfactor)
              },
            display: true,
            scaleLabel: {
                display: true,
                labelString: l_seriesDesc
            }
          }]
        },
        tooltips: {
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

  getIndexOf(key) {
    for (var i = 0; i < this.f_datasets.length; ++i) {
      if (this.f_datasets[i].key == key) {
        return (i + 1) + Math.floor(Math.random() * 10000);  
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