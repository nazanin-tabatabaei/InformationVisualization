


var width =500;
var height= 500;

d3.csv("calvinCollegeSeniorScores.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
		csv[i].GPA = Number(csv[i].GPA);
		csv[i].SATM = Number(csv[i].SATM);
		csv[i].SATV = Number(csv[i].SATV);
		csv[i].ACT = Number(csv[i].ACT);
    }
    var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
    var satvExtent = d3.extent(csv, function(row) { return row.SATV; });
    var actExtent = d3.extent(csv,  function(row) { return row.ACT;  });
    var gpaExtent = d3.extent(csv,  function(row) {return row.GPA;   });    

    
    var satExtents = {
	"SATM": satmExtent,
	"SATV": satvExtent
    }; 


    // Axis setup
    var xScale = d3.scaleLinear().domain(satmExtent).range([50, 470]);
    var yScale = d3.scaleLinear().domain(satvExtent).range([470, 30]);
 
    var xScale2 = d3.scaleLinear().domain(actExtent).range([50, 470]);
    var yScale2 = d3.scaleLinear().domain(gpaExtent).range([470, 30]);
     
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
  
    var xAxis2 = d3.axisBottom().scale(xScale2);
    var yAxis2 = d3.axisLeft().scale(yScale2);

    //Create SVGs for charts
    var chart1 = d3.select("#chart1")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);


    var chart2 = d3.select("#chart2")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);


	/******************************************/
	var dataAttributes = ['1st', '2nd'];
	var chartPadding = {t: 0, r: 0, b: 0, l: 0};
	var padding = {t: 0, r: 0, b: 0, l: 0};

	selectedChart = undefined;

	// Amount of extra space to add on the edges of the selectable area to make it easier to select
	var brushBorder = 0; 

	



var brush2 = d3.brush()
		.extent([[0, chartPadding.t - brushBorder], 
				 [width - chartPadding.r + brushBorder, height - chartPadding.b + brushBorder]])
		.on("start", handleBrushStart2)
		.on("brush", handleBrushMove2)
		.on("end", handleBrushEnd2);
		
	function handleBrushStart2() {
			chart1.select('.selection')
			.style('display', 'none');
			brush2.move(d3.selectAll('.brush'), null); 
			brush1.move(d3.selectAll('.brush'), null); 
			chart1.selectAll("circle").classed('selected2', false);
			chart2.selectAll("circle").classed('selected2', false);
			document.getElementById("satm").textContent="";
	   		document.getElementById("satv").textContent="";
	   		document.getElementById("act").textContent="";
	   		document.getElementById("gpa").textContent="";

	}

	function handleBrushMove2() {
		var brushSelection = d3.event.selection;
		
		// If the selection is non-empty, get the boundaries of the rectangle
		if (brushSelection) {
			var [[left, top], [right, bottom]] = brushSelection;
			
			chart2.selectAll('circle')
				.classed('hidden', function(d) {
					//console.log("move2");
					var x = xScale2(d['ACT']) ;
					var y = yScale2(d['GPA']) ;
					// Hide the dots that are outside of the selected area
					return !(left <= x && x <= right && top <= y && y <= bottom);
				});

			chart1.selectAll('circle')
				.classed('hidden', function(d) {
					//console.log("move2");
					var x = xScale2(d['ACT']) ;
					var y = yScale2(d['GPA']) ;
					// Hide the dots that are outside of the selected area
					return !(left <= x && x <= right && top <= y && y <= bottom);
				});

			
		}
	}

	function handleBrushEnd2() {
		var brushSelection = d3.event.selection;

		if (!brushSelection) {
			chart1.selectAll('.hidden').classed('hidden', false);
			chart2.selectAll('.hidden').classed('hidden', false);
			chart1.selectAll("circle").classed('selected2', false);
			chart2.selectAll("circle").classed('selected2', false);
			//selectedChart = undefined;
		}
	}	










	var brush1 = d3.brush()
		.extent([[chartPadding.l - brushBorder, chartPadding.t - brushBorder], 
				 [width - chartPadding.r + brushBorder, height - chartPadding.b + brushBorder]])
		.on("start", handleBrushStart1)
		.on("brush", handleBrushMove1)
		.on("end", handleBrushEnd1);
		
	function handleBrushStart1() {
			chart2.select('.selection')
			.style('display', 'none');
			brush1.move(d3.selectAll('brush1'), null); 
			brush1.move(d3.selectAll('brush2'), null);
			chart1.selectAll("circle").classed('selected2', false);
			chart2.selectAll("circle").classed('selected2', false);
			document.getElementById("satm").textContent="";
	   		document.getElementById("satv").textContent="";
	   		document.getElementById("act").textContent="";
	   		document.getElementById("gpa").textContent="";
			//console.log("hi1")
			//xScale.domain(d3.extent(data, function(d) {
				//return d[attribute];
			//}));
			
			//selectedChart = attribute;
		
	}

	function handleBrushMove1() {
		var brushSelection = d3.event.selection;
		
		// If the selection is non-empty, get the boundaries of the rectangle
		if (brushSelection) {
			var [[left, top], [right, bottom]] = brushSelection;
			
			chart1.selectAll('circle')
				.classed('hidden', function(d) {
					//console.log("move1");
					var x = xScale(d['SATM']) ;
					var y = yScale(d['SATV']) ;
					// Hide the dots that are outside of the selected area
					return !(left <= x && x <= right && top <= y && y <= bottom);
				});

			chart2.selectAll('circle')
				.classed('hidden', function(d) {
					//console.log("move");
					var x = xScale(d['SATM']) ;
					var y = yScale(d['SATV']) ;
					// Hide the dots that are outside of the selected area
					return !(left <= x && x <= right && top <= y && y <= bottom);
				});
		}
	}

	function handleBrushEnd1() {
		var brushSelection = d3.event.selection;
		//console.log("bye1")
		// If the selection is empty, un-hide all of the dots and clear the selected chart
		if (!brushSelection) {
			//console.log("bye11")
			chart1.selectAll('.hidden').classed('hidden', false);
			chart2.selectAll('.hidden').classed('hidden', false);
			chart1.selectAll("circle").classed('selected2', false);
			chart2.selectAll("circle").classed('selected2', false);
			//selectedChart = undefined;
		}
	}	
			
	chart1.selectAll('circle').on('mouseover', somethingSelected)

	function somethingSelected() {
	console.log("killme");
	}

	function click(d) { console.log("Clicky Clicky!") };
function mouseover(d) { console.log("I saw  mouse!") }


	/******************************************/

		chart2.append('g')
	
			.call(brush2);


	chart1.append('g')

			.call(brush1);



	 //add scatterplot points
     var temp1= chart1.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale(d.SATM); })
	   .attr("cy", function(d) { return yScale(d.SATV); })
	   .attr("r", 5)
	   .on("click", function(d,i){ 
	   		document.getElementById("satm").textContent=d.SATM;
	   		document.getElementById("satv").textContent=d.SATV;
	   		document.getElementById("act").textContent=d.ACT;
	   		document.getElementById("gpa").textContent=d.GPA;
	   		//console.log(d3.select(this).attr("r"));
	   		var ID=d3.select(this).attr("id");
	   		chart1.selectAll('.hidden').classed('hidden', false);
			chart2.selectAll('.hidden').classed('hidden', false);
			chart2.select('.selection')
			.style('display', 'none');
			chart1.select('.selection')
			.style('display', 'none');
	   		//d3.select(this).classed('selected2',true);
	   		chart1.selectAll("circle").classed('selected2', function(d,i) {
					//console.log("move2");
					//var x = xScale2(d['ACT']) ;
					//var y = yScale2(d['GPA']) ;
					//console.log(ID)
					return ID==d3.select(this).attr("id")
	
					//return true
					// Hide the dots that are outside of the selected area
					//return !(x==x && cy==y);
				});
	   		chart2.selectAll("circle").classed('selected2', function(d,i) {
					//console.log("move2");
					//var x = xScale2(d['ACT']) ;
					//var y = yScale2(d['GPA']) ;
					//console.log(ID)
					return ID==d3.select(this).attr("id")
	
					//return true
					// Hide the dots that are outside of the selected area
					//return !(x==x && cy==y);
				});


       });
/*chart2.selectAll('circle')
				.classed('hidden', function(d) {
					//console.log("move2");
					var x = xScale2(d['ACT']) ;
					var y = yScale2(d['GPA']) ;
					// Hide the dots that are outside of the selected area
					return !(left <= x && x <= right && top <= y && y <= bottom);
				});*/


    var temp2= chart2.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale2(d.ACT); })
	   .attr("cy", function(d) { return yScale2(d.GPA); })
	   .attr("r", 5)
	   .on("click", function(d,i){ 
	   		   		document.getElementById("satm").textContent=d.SATM;
	   		document.getElementById("satv").textContent=d.SATV;
	   		document.getElementById("act").textContent=d.ACT;
	   		document.getElementById("gpa").textContent=d.GPA;
	   		var ID=d3.select(this).attr("id");
	   		chart1.selectAll('.hidden').classed('hidden', false);
			chart2.selectAll('.hidden').classed('hidden', false);
			chart1.select('.selection')
			.style('display', 'none');
			chart2.select('.selection')
			.style('display', 'none');
	   		//d3.select(this).classed('selected2',true);
	   		chart1.selectAll("circle").classed('selected2', function(d,i) {
					//console.log("move2");
					//var x = xScale2(d['ACT']) ;
					//var y = yScale2(d['GPA']) ;
					//console.log(ID)
					return ID==d3.select(this).attr("id")
	
					//return true
					// Hide the dots that are outside of the selected area
					//return !(x==x && cy==y);
				});
	   		chart2.selectAll("circle").classed('selected2', function(d,i) {
					//console.log("move2");
					//var x = xScale2(d['ACT']) ;
					//var y = yScale2(d['GPA']) ;
					//console.log(ID)
					return ID==d3.select(this).attr("id")
	
					//return true
					// Hide the dots that are outside of the selected area
					//return !(x==x && cy==y);
				});
       });
    
	//chart1.append.attr.call(brush)





		
					



	
    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr('fill', 'black')
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("SATM");

    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis)
		.append("text")
		.attr('fill', 'black')
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("SATV");
	


    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis2)
		.append("text")
		.attr('fill', 'black')
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("ACT");

    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis2)
		.append("text")
		.attr('fill', 'black')
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("GPA");



	
	
	});
