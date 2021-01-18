<main class="flex-shrink-0">
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
				    	<button class="btn btn-light btn-sm" type="button" id="dropdown-countries-select-all" style="margin-left: 12px;">
						    Select all geo areas and countries
						  </button>
						  <button class="btn btn-light btn-sm" type="button" id="dropdown-countries-select-none" style="margin-left: 12px;">
						  	Select none
						  </button>
				    </li>
				  </ul>
			  </div>
			</div>
		</div>
		<div class="row justify-content-md-start" style="margin-top: 4px;">
			<div class="col-lg-6">
				<div class="input-group input-group-sm mb-3">
				  <span class="input-group-text" id="xaxis-low-value">x-axis low value</span>
				  <input type="number" id="xaxis-min-value" step="50" value="" class="form-control" aria-label="" aria-describedby="xaxis-low-value">
				  <span class="input-group-text" id="xaxis-high-value">x-axis high value</span>
				  <input type="number" id="xaxis-max-value" step="50" value="" class="form-control" aria-label="" aria-describedby="xaxis-high-value">
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