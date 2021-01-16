class NodeLabelTool {

	constructor() {
	}

	buildNodeLabel(t) {

    var canvas = document.getElementById('data-chart');
    var ctx = document.getElementById("data-chart").getContext("2d");
    ctx.save();

    var chartInstance = t.chart;
    var datasets = chartInstance.config.data.datasets;
    var targetIndex = 0;
    datasets.forEach(function(ds, index) {
        
        // Get last !NaN node.
        for (var i = datasets[index].data.length - 1; i > -1; --i) {
          if (isNaN(datasets[index].data[i])) {
            continue;
          } else {
            targetIndex = i;
            break;
          }
        }

        // Do drawing.
        var label = ds.label;
        if (label !== undefined) {
          var lbl = label.substring(13, label.indexOf('</b>'));
          var meta = chartInstance.controller.getDatasetMeta(index);
          var len = targetIndex;
          ctx.font = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          ctx.fillStyle = meta.data[len]._model.backgroundColor;   
          ctx.lineWidth = 0.1;
          var xOffset = meta.data[len]._model.x - 160;
          var yOffset = meta.data[len]._model.y - 24;
          ctx.fillText(lbl, xOffset, yOffset);
        }
    });
    ctx.restore();
	}

}