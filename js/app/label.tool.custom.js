class LabelTool {

	constructor() {
	}

	custom(key, json) {
		
		for(var k in json) {
			if (json[k].GeoAreaName == key) {
				return 'Geo area: <b>' + key + '</b>'
					+ '<br>indicator: ' + json[k].Indicator
					+ '<br>description: ' + json[k].SeriesDescription
					+ '<br>source: ' + json[k].Source
					+ '<br>footnote: ' + json[k].FootNote
					+ '<br>units: ' + json[k].Units
					+ '<br>value [initial value:' + json[k].Value + '], current value';
			}
		}

		return 'No data to be displayed for ' + key;
	}

}