$(document).ready(function() {
	
	/**
	 * To acces all current GET params.
	 * const queryString = window.location.search;
	 * var urlParams = new URLSearchParams(queryString);
	 */
	var pk = '';
	const queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);
	$.ajax({
        url: '../../app/ctrl/app.ctrl.php',
        type: 'POST',
        data: {
        	idpk : pk
        },
        success: function (json) {
			var data = JSON.parse(json);
			console.log(data);
        }, error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });

});