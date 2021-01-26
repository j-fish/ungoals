const loadModalDataView = function(key, datachart) {
	var tooltipData = datachart.getDataset(key).label;
	var id = 'detailled-data-body-' + datachart.getIndexOf(key);
	$('.toast').each(function() { if ($(this).attr('data') === key) $(this).remove(); });
	var toastid = 'toast-' + id;
	var bgcolor = 'background-color:' + datachart.getDataset(key)._meta[0].dataset._model.backgroundColor;
	var jsonData = [{ 'title': key, 'data': tooltipData, 'id': id, 'bgcolor': bgcolor, 'tid': toastid }];
	let transform = {'<>':'div','class':'toast','id':'${tid}','role':'alert','aria-live':'assertive',
		'data':'${title}','aria-atomic':'true','data-bs-autohide':'false','html':[
      {'<>':'div','class':'toast-header','style':'${bgcolor}','html':[
      		{'<>':'strong','class':'me-auto','text':'${title}'},
      		{'<>':'small','class':'text-muted','text':''},
      		{'<>':'button','class':'btn-close','data-bs-dismiss':'toast','aria-label':'Close'}
      	]},
      {'<>':'div','class':'toast-body detailled-data-body','id':'${id}'}
    ]};
  	// TODO : call api for detailled data completion.
	$('#detailled-data-view-container').append(json2html.transform(jsonData, transform));
	$('#' + id).html(tooltipData);
	$('#' + toastid).on('show.bs.toast', function () {
  	$('#thead-emissions-' + key.replace(/\s/g, '')).css('background-color', 
  		datachart.getDataset(key)._meta[0].dataset._model.backgroundColor).css('opacity', '0.9');
	});
	$('#' + toastid).on('hidden.bs.toast', function () {
  	$(this).remove();
	});
	$('#' + toastid).toast('show');
}
const summarizeDataset = function(dataset) {
	var sum = 0.0; 
	for (var i = 0; i < dataset.length; ++i) sum += parseFloat(dataset[i]) == NaN ? 0.0 : parseFloat(dataset[i]);
	return sum;
}
const addData = function(datachart, chart, data, key) {
	data.selected = 'checked';
	var tool = new LabelTool();
	data.label = tool.custom(key, datachart.getJson());
	if (data.color === undefined) data.color = $('#selected-color').val();
	var i = chart.config.data.datasets.push(data);
  chart.update();
}
const removeData = function(datachart, chart, data, key) {
	data.selected = 'false';
	for (var i = 0; i < chart.config.data.datasets.length; ++i) {
		if (chart.config.data.datasets[i].label.toString().indexOf(key) > 0) {
			chart.config.data.datasets[i].color = undefined;
			chart.config.data.datasets.splice(i, 1);
		}
	}
	chart.update();
}
const applyTickChange = function(chart, low, high) {
	var yaxe = chart.config.options.scales.yAxes[0];
	yaxe.ticks.max = parseFloat(high);
	yaxe.ticks.min = parseFloat(low);
	chart.config.options.scales.yAxes.splice(0, 1);
	chart.config.options.scales.yAxes.push(yaxe);
	chart.update(chart.config);
}
const updateSelectedList = function(datachart) {
	$('#selected-datasets').empty();
	for (var i = 0; i < datachart.f_datasets.length; ++i) {
		if (datachart.f_datasets[i].dataset.selected == 'checked') {
			var bgcolor = datachart.f_datasets[i].dataset._meta[0].dataset._model.backgroundColor;
			var btn = document.createElement('button');
			$(btn).addClass('btn btn-sm selected-dataset-selector')
				.html(datachart.f_datasets[i].key)
				.attr('data', datachart.f_datasets[i].key)
				.css('background-color', bgcolor)
				.on('click', function() { loadModalDataView($(this).attr('data'), datachart, bgcolor); });
			$('#selected-datasets').append(btn);
		}
	}
}
const setupData = [{ geoarea: 'China', color: '#ff0000' }];
const setup = function(datachart, chart) {
	var tool = new LabelTool();
	for (var i = 0; i < setupData.length; ++i) {
		var data = datachart.getDataset(setupData[i].geoarea);
		data.selected = 'checked';
		data.label = tool.custom(setupData[i].geoarea, datachart.getJson());
		if (data.color === undefined) data.color = setupData[i].color;
		var j = chart.config.data.datasets.push(data);
		$('input.data-selectable').each(function() {
			if ($(this).val() === setupData[i].geoarea) $(this).prop('checked', true);
		});
		$('#selected-color option').each(function() {
			if ($(this).val() === setupData[i].color) {
				$(this).attr('selected', 'selected');
				$('#selected-color').css('background-color', setupData[i].color);
			}
		});
	}
	chart.update();
}

$(document).ready(function() {
	
	/**
	 * To acces all current GET params.
	 * const queryString = window.location.search;
	 * var urlParams = new URLSearchParams(queryString);
	 */
	var datachart = new DataChart();
	var datasets = [];
	var pk = '';
	const queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);
	$.ajax({
    url: '../../app/ctrl/app.ctrl.php',
    type: 'POST',
    data: {
    	indicator : '13.2.2'
    },
    success: function (data) {
			datasets = datachart.build(JSON.parse(data));
			
			for (var i = 0; i < datasets.length; ++i) {
					
				var jsonData = [{
					'key': datasets[i].key,
					'id': i,
					'sum': summarizeDataset(datasets[i].dataset.data),
					'selected': datasets[i].dataset.selected
				}];
				let transform = {'<>':'li','class':'dropdown-item selectable-container','html':[
	          {'<>':'input','type':'checkbox','class':'form-check-input data-selectable','id':'${id}','value':'${key}','data':'${selected}'},
	          {'<>':'label','class':'selectable-label','text':'${key}','for':'${id}'},
	          {'<>':'span','text':'sum of Mg/Co2 per year: ${sum}','class':'badge bg-secondary rounded-pill selectable-item-info'}
	        ]};
				$("#dropdown-countries-ul").append(json2html.transform(jsonData, transform));
			}

			let transform = {'<>':'option','value':'${value}','style':'background-color: ${value}','html':'${value}'};
			$("#selected-color").append(json2html.transform(JSON.stringify(COLORS), transform));

			$("input.data-selectable").each(function() {
				if ($(this).attr('data') == 'checked') $(this).prop('checked', true);
				$(this).change(function() {
					if ($(this).is(':checked')) {
						$(this).attr('data', 'checked');
						addData(datachart, datachart.chart, datachart.getDataset($(this).val()), $(this).val());
					} else {
						$(this).attr('data', 'false');
						removeData(datachart, datachart.chart, datachart.getDataset($(this).val()), $(this).val());
					}
					updateSelectedList(datachart);
				});
			});

			$('#xaxis-min-value').val(parseInt(datachart.minValue));
			$('#xaxis-max-value').val(parseInt(datachart.maxValue + (datachart.maxValue * datachart.maxxfactor)));
			$('#xaxis-reset-values').attr('data', parseInt(datachart.minValue) + '#' + 
				(datachart.maxValue + (datachart.maxValue * datachart.maxxfactor)));

			setup(datachart, datachart.chart);
			updateSelectedList(datachart);

    }, error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });

	$('.dropdown-toggle').on('click', function(event) {
    $('.dropdown-menu').slideToggle();
    event.stopPropagation();
  });

  $('.dropdown-menu').on('click', function(event) {
    event.stopPropagation();
  });

  $(window).on('click', function() {
    $('.dropdown-menu').slideUp();
  });

  $('#dropdown-countries-ul').css('height', $(window).height() / 1.3	);

  $('#dropdown-countries-select-all').on('click', function(event) {
  	$("input.data-selectable").each(function() {
			if (!$(this).is(':checked')) {
				$(this).attr('data', 'checked');
				$(this).prop( "checked", true );
				addData(datachart, datachart.chart, datachart.getDataset($(this).val()), $(this).val());
			}
		});
		updateSelectedList(datachart);
	});

	$('#dropdown-countries-select-none').on('click', function(event) {
  	$("input.data-selectable").each(function() {
			$(this).attr('data', 'false');
			$(this).prop('checked', false);
			removeData(datachart, datachart.chart, datachart.getDataset($(this).val()), $(this).val());
		});
		$('#selected-datasets').empty();
	});

	$('#xaxis-min-value').change(function(){
		if (!isNaN($(this).val())) applyTickChange(datachart.chart, $(this).val(), $('#xaxis-max-value').val());
	});
	$('#xaxis-min-value').keyup(function(){
		if (!isNaN($(this).val())) applyTickChange(datachart.chart, $(this).val(), $('#xaxis-max-value').val());
	});

	$('#xaxis-max-value').change(function(){
		if (!isNaN($(this).val())) applyTickChange(datachart.chart, $('#xaxis-min-value').val(), $(this).val());
	});
	$('#xaxis-max-value').keyup(function(){
		if (!isNaN($(this).val())) applyTickChange(datachart.chart, $('#xaxis-min-value').val(), $(this).val());
	});

	$('#xaxis-reset-values').on('click', function() {
		var xaxis = $('#xaxis-reset-values').attr('data').split('#');
		$('#xaxis-min-value').val(parseInt(xaxis [0]));
		$('#xaxis-max-value').val(parseInt(xaxis [1]));
		applyTickChange(datachart.chart, parseInt(xaxis [0]), parseInt(xaxis[1]));
	});

	$('#selected-color').change(function() {
		$(this).css('background-color', $(this).val());
	});

	function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  var canvas = document.getElementById('data-chart');
	canvas.addEventListener('click', function(evt) {
	  var mousePos = getMousePos(canvas, evt);
	  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	  }, false);

});