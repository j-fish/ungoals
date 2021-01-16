var summarizeDataset = function(dataset) {
	var sum = 0.0; 
	for (var i = 0; i < dataset.length; ++i) sum += parseFloat(dataset[i]) == NaN ? 0.0 : parseFloat(dataset[i]);
	return sum;
}
var addData = function(datachart, chart, data, key) {
	data.selected = 'checked';
	var tool = new LabelTool();
	data.label = tool.custom(key, datachart.getJson());
    chart.config.data.datasets.push(data);
    chart.update();
}
var removeData = function(datachart, chart, data, key) {
	data.selected = 'false';
	for (var i = 0; i < chart.config.data.datasets.length; ++i) {
		if (chart.config.data.datasets[i].label.indexOf('<b>' + key + '</b>')) {
			chart.config.data.datasets.splice(i, 1);
			break;
		}
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
					'key':datasets[i].key,
					'id':i,
					'sum':summarizeDataset(datasets[i].dataset.data),
					'selected':datasets[i].dataset.selected
				}];
				let transform = {'<>':'li','class':'dropdown-item selectable-container','html':[
		          {'<>':'input','type':'checkbox','class':'form-check-input data-selectable','id':'${id}','value':'${key}','data':'${selected}'},
		          {'<>':'label','class':'selectable-label','text':'${key}','for':'${id}'},
		          {'<>':'span','text':'sum of Mg/Co2 per year: ${sum}','class':'badge bg-secondary rounded-pill selectable-item-info'}
		        ]};
				$("#dropdown-countries-ul").append(json2html.transform(jsonData,transform));
			}

			$("input.data-selectable").each(function() {
				if ($(this).attr('data') == 'checked') $(this).prop('checked', true);
				$(this).change(function(){
					if ($(this).is(':checked')) {
						$(this).attr('data', 'checked');
						addData(datachart, datachart.chart, datachart.getDataset($(this).val()), $(this).val())
					} else {
						$(this).attr('data', 'false');
						removeData(datachart, datachart.chart, datachart.getDataset($(this).val()), $(this).val());
					}
				});
			});

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

  $('#dropdown-countries-ul').css('height', $(window).height() / 1.3	)

});