(function() {
	"use strict";
	angular.module("app.usuarios")
		   .factory("mapaFactory",mapaFactory);

	mapaFactory.$inject = [];

	function mapaFactory() {
		return {
			mapa : function(data) {

				$( "#container" ).empty();

				var chart = anychart.bar();

			    chart.animation(true);

			    chart.padding([10, 40, 5, 20]);

			    chart.title('Seguidores por usuario');

			    var series = chart.bar(data);

			    series.tooltip()
			            .position('right')
			            .anchor('left-center')
			            .offsetX(5)
			            .offsetY(0)
			            .titleFormat('{%X}')
			            .format('{%Value}');
			    chart.yAxis().title('Seguidores');
			    chart.interactivity().hoverMode('by-x');
			    chart.tooltip().positionMode('point');
			    chart.yScale().minimum(0);
			    chart.container('container');
			    chart.draw();
			}
		}
	}
})();