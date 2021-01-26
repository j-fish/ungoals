class LabelTool {

	constructor() {
	}

	custom(key, json) {
		
		let jsonData = [];
		let transform = {'<>':'table','class':'table-emissions-detail','html':[
	     		{'<>':'thead','id':'thead-emissions-${key}','html':[
	     			{'<>':'tr','html':[
	     					{'<>':'th','text':'Time period'},
	     					{'<>':'th','text':'Emission value'},
	     				]}
	     			]},
     			{'<>':'tbody','class':'tbody-emissions-values','id':'tbody-emissions-${key}','html':'${html_tbody}'}
  			]};
  	let transform_tbody = {'<>':'tr','html':[
 					{'<>':'td','text':'${year}'},
 					{'<>':'td','text':'${ems}'},
 				]};

    var header_k = '';
		for(var k in json) {			
			if (json[k].GeoAreaName == key) {
				header_k = k;
				jsonData.push({ 'year': json[k].TimePeriod, 'ems': json[k].Value });
			}
		}

		var html_table = { 'key': key.replace(/\s/g, ''), 'html_tbody': json2html.transform(jsonData, transform_tbody) };
		return '<ul>' 
			+ '<li>Geo area: <b>' + key + '</b></li>'
			+ '<li>indicator: ' + json[header_k].Indicator + '</li>'
			+ '<li>description: ' + json[header_k].SeriesDescription + '</li>'
			+ '<li>source: ' + json[header_k].Source + '</li>'
			+ '<li>footnote: ' + json[header_k].FootNote + '</li>'
			+ '<li>units: ' + json[header_k].Units + '</li>'
			+ '</ul>'
			+ json2html.transform(html_table, transform);
	}

}