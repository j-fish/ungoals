class ToolTips {

	constructor() {
	}

	custom(tooltip) {

		$('div.c-chartjs-tooltip').remove();
		$('table.ungoal-detail-dialog').remove();
		// Tooltip Element
		var tooltipEl = document.getElementById('chartjs-tooltip');
		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.id = 'chartjs-tooltip';
			tooltipEl.classList.add('c-chartjs-tooltip');
			tooltipEl.innerHTML = '<table class="ungoal-detail-dialog"></table>';
			if (tooltip.dataPoints !== undefined && tooltip.dataPoints.length !== 0) {
				this._chart.canvas.parentNode.appendChild(tooltipEl);
			} else {

			}
		}

		// Hide if no tooltip
		if (tooltip.opacity === 0 || !$.trim($('#chartjs-tooltip').html()).length) {
			tooltipEl.style.opacity = 0;
			$('#chartjs-tooltip').css('display', 'none');
		} else {

			$('#chartjs-tooltip').css('display', 'block');

			// Set caret Position
			tooltipEl.classList.remove('above', 'below'); //, 'no-transform');
			if (tooltip.yAlign) {
				tooltipEl.classList.add(tooltip.yAlign);
			} else {
				tooltipEl.classList.add('no-transform');
			}

			function getBody(bodyItem) {
				return bodyItem.lines;
			}

			// Set Text
			if (tooltip.body) {

				var titleLines = tooltip.title || [];
				var bodyLines = tooltip.body.map(getBody);
				var innerHtml = '<thead>';

				titleLines.forEach(function(title) {
					innerHtml += '<tr><th>' + title + '</th></tr>';
				});
				innerHtml += '</thead><tbody>';

				bodyLines.forEach(function(body, i) {
					innerHtml += '<tr><td>' + body + '</td></tr>';
				});
				innerHtml += '</tbody>';

				var tableRoot = tooltipEl.querySelector('table.ungoal-detail-dialog');
				tableRoot.innerHTML = innerHtml;
			}

			var positionY = this._chart.canvas.offsetTop;
			var positionX = this._chart.canvas.offsetLeft;

			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.left = positionX + 'px';
			tooltipEl.style.top = positionY + 'px';
			tooltipEl.style.fontFamily = 'Lucida console';
			tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
			tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
			tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
		}
	};

}