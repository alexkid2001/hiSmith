window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(210, 210, 210)',
	dark_blue: 'rgb(43, 73, 137)',
	blue: 'rgb(64, 94, 158)',
	light_blue: 'rgb(97, 127, 189)',
};


var chart_1_Data = {
	labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: window.chartColors.dark_blue,
		borderColor: window.chartColors.dark_blue,
		borderWidth: 1,
		data: [24.2, 13.4, 10.4, 4.6, 4.1, 4.0, 3.3, '',]
	}, {
		label: 'Dataset 2',
		backgroundColor: window.chartColors.greyx	,
		borderColor: window.chartColors.grey,
		data: ['' ,'' ,'' ,'' ,'' ,'' ,'' , 2.1]
	}]

};

var chart_2_Data = {
	labels: ['', '', '', '', '', '', '', ''],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: window.chartColors.dark_blue,
		borderColor: window.chartColors.dark_blue,
		borderWidth: 1,
		data: [1.5, -0.5, 0.2, -0.7, 0, 0.9, 1.2, '',]
	}, {
		label: 'Dataset 2',
		backgroundColor: window.chartColors.greyx	,
		borderColor: window.chartColors.grey,
		data: ['' , '' , '','' ,'' ,'' ,'' , -0.2]
	}]

};

var chart_3_Data = {
	labels: ['2016', '2017', '2018'],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: window.chartColors.dark_blue,
		borderColor: window.chartColors.dark_blue,
		borderWidth: 1,
		data: [10, 18, 25]
	}, {
		label: 'Dataset 2',
		backgroundColor: window.chartColors.blue	,
		borderColor: window.chartColors.blue,
		data: [60, 55, 50]
	}, {
		label: 'Dataset 3',
		backgroundColor: window.chartColors.light_blue	,
		borderColor: window.chartColors.light_blue,
		data: [30, 27, 25]
	}]

};


// Define a plugin to provide data labels
Chart.plugins.register({
	id: 'near_ticks',
	afterDatasetsDraw: function(chart) {
		var ctx = chart.ctx;
		var font_color = 'rgb(0, 0, 0)';

		if (chart.options.title.text == 'center') {
			font_color = 'rgba(255, 255, 255)';
		}
		
		chart.data.datasets.forEach(function(dataset, i) {
			var meta = chart.getDatasetMeta(i);
			if (!meta.hidden) {
				meta.data.forEach(function(element, index) {
					// Draw the text in black, with the specified font
					ctx.fillStyle = font_color;


					var fontSize = 14;
					var fontStyle = 'normal';
					var fontFamily = 'Helvetica';
					ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

					// Just naively convert to string for now
					var dataString = dataset.data[index].toString();
					if (chart.options.title.text == 'center') {
						dataString += '%';
					}
					// Make sure alignment settings are correct
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';

					var padding = 20;
					var position = element.tooltipPosition();
					//var centr_pos = calculateBarValuePixels(element,index);
					if (chart.options.title.text != 'center') {
						if ( dataset.data[index] >= 0 ) {
							ctx.fillText(dataString, position.x + padding, position.y);
						} else {
							ctx.fillText(dataString, position.x - padding, position.y);
						}
					} else {
						ctx.fillText(dataString, position.x, position.y + (element._model.base-position.y)/2);
					}
				});
			}
		});
	}
});

window.onload = function() {
	var can_1 = document.getElementById('canvas_1');
	var can_2 = document.getElementById('canvas_2');
	console.log(can_2.getAttribute('width'));
	console.log(can_1.getAttribute('width'));
	if(window.screen.width < 768) {
		can_1.setAttribute('width', 300);
		can_2.setAttribute('width', 250);
	}
	if(window.screen.width < 640) {
		can_1.setAttribute('width', 250);
		can_2.setAttribute('width', 200);
	}


	var ctx_1 = document.getElementById('canvas_1').getContext('2d');
	var ctx_2 = document.getElementById('canvas_2').getContext('2d');
	var ctx_3 = document.getElementById('canvas_3').getContext('2d');
	window.myHorizontalBar_1 = new Chart(ctx_1, {
		type: 'horizontalBar',
		data: chart_1_Data,
		options: {
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				rectangle: {
					borderWidth: 1,
				},
			},
			responsive: true,
			legend: {
				display: false,
				position: 'right',
			},
			title: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			scales: {
				xAxes: [{
					stacked: true,
					display: false,
					drawBorder: false,
				}],
				yAxes: [{
					gridLines: false,
					stacked: true,
					display: true,
					zeroLineWidth: 3,
					ticks: {
						fontSize: 16,
						padding: 17,
					},
					barPercentage: 0.6,
					categoryPercentage: 1,
					barThickness: 20,
				}],
			},
		}
	});

	window.myHorizontalBar_2 = new Chart(ctx_2, {
		type: 'horizontalBar',
		data: chart_2_Data,
		options: {
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				rectangle: {
					borderWidth: 1,
				},
			},
			padding: {
				top: 10,
			},
			responsive: true,
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
			tooltips: {
				enabled: false,
			},
			scales: {
				xAxes: [{
					stacked: true,
//					display: false,
					drawBorder: false,
					gridLines: {
						zeroLineColor: window.chartColors.grey,
						zeroLineWidth: 1,
						color: 'rgba(0,0,0,0)',
						tickMarkLength: 0,
					},
					ticks: {
						display: false,
					},
				}],
				yAxes: [{
//					gridLines: false,
					stacked: true,
					display: false,
//					drawBorder: true,
//					drawTicks: false,
					ticks: {
						display: false,
//						tickMarkLength: 0,
					},
					barPercentage: 0.6,
					categoryPercentage: 1,
					barThickness: 20,
				}],
			},
		}
	});

	window.myHorizontalBar_3 = new Chart(ctx_3, {
		type: 'bar',
		data: chart_3_Data,
		options: {
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				rectangle: {
					borderWidth: 1,
				},
			},
			title: {
				display: false,
				text: 'center'
			},
			responsive: true,
			legend: {
				display: false,
			},
			tooltips: {
				enabled: false,
				position: 'average'
			},
			scales: {
				xAxes: [{
					stacked: true,
//					display: false,
					drawBorder: false,
					gridLines: false,
					ticks: {
						display: true,
						fontStyle: 'bold',
						padding: 10,
					},
					barPercentage: 0.8,
					categoryPercentage: 1,
				}],
				yAxes: [{
//					gridLines: false,
					stacked: true,
					ticks: {
						display: true ,
						padding: 20,
						callback: function(value, index, values) {
												if((value == 50) || (value == 100) || (value == 0)){
													if (value != 0) {
                      			return value + '%';
                      		}
                      		else return value;
                      	} else {
                      		return '';
                      	}
                  		},
					},
				}],
			},
		}
	});

};
$(document).ready(function() {
	var owl = $(".slider");
	owl.owlCarousel({
		loop: false,
		nav: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});
});
