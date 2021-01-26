<main class="flex">
  <div class="container" style="margin-top: 24px">
		<div class="row justify-content-md-start">
	  	<div class="col-lg-12">
		  	<div class="dropdown selectables-container">
				  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdown-countries"
				  	data-bs-toggle="dropdown" aria-expanded="false">
				    Add/remove datasets by geo area
				  </button>
				  <ul class="dropdown-menu dropdown-menu-lg-start" id="dropdown-countries-ul" aria-labelledby="dropdown-countries">
				    <li>
				    	<h6 class="dropdown-header">Select required countries...</h6>
				    	<button class="btn btn-secondary btn-sm" type="button" id="dropdown-countries-select-all" style="margin-left: 12px;">
						    Select all geo areas and countries
						  </button>
						  <button class="btn btn-secondary btn-sm" type="button" id="dropdown-countries-select-none" style="margin-left: 12px;">
						  	Select none
						  </button>
				    </li>
				    <li style="padding-top: 4px; padding-left: 12px;">
					  	<label class="text-muted" for="selected-color" style="margin-left: 4px;"><small>Currently selected line graph color  : </small></label>
						  <br>
						  <select class="form-select-sm mb-3" id="selected-color" name="selected-color" 
						  	aria-label="Choose a color for selected dataset(s)">
						  </select>
				    </li>
				  </ul>
			  </div>
			</div>
		</div>
		<div class="row justify-content-md-start" style="margin-top: 8px;">
			<div class="col-lg-6">
				<div class="input-group input-group-sm mb-3">
				  <span class="input-group-text" id="xaxis-low-value">x-axis low value</span>
				  <input type="number" id="xaxis-min-value" step="50" value="" class="form-control" aria-label="" aria-describedby="xaxis-low-value">				  
				  <span class="input-group-text" id="xaxis-high-value">x-axis high value</span>
				  <input type="number" id="xaxis-max-value" step="50" value="" class="form-control" aria-label="" aria-describedby="xaxis-high-value">
				  <button class="btn btn-sm btn-secondary" type="button" id="xaxis-reset-values" data="">
				  	Reset to initial values
				  </button>
				</div>
			</div>
		</div>
  	<canvas id="data-chart"></canvas>
  	<div class="row justify-content-md-start" style="margin-bottom: 40px">
	  	<div class="col-lg-12">
	  		<div id="selected-datasets"></div>
	  	</div>
	  </div>
  </div>
</main>
<!-- detailled data view container -->
<div id="detailled-data-view-container" class="toast-container position-absolute top-0 end-0 p-3" style="margin-top: 58px;"></div>