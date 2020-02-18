// **** Your JavaScript code goes here ****
//NOTE: this is the D3 v4 loading syntax. For more details, see https://piazza.com/class/jnzgy0ktwi34lk?cid=75.

/*
d3.select("body")
	.append("p")
	.style("color","red")
	.text("hi");
*/

/*var dataArray=[20,40,50,60];
var width=500;
var height=500;
var widthScale= d3.scaleLinear()
	.domain([0,60])
	.range([0,width]);
var color=d3.scaleLinear()
	.domain([0,60])
	.range(["red","blue"]);

var axis=d3.axisBottom()
	.ticks(5)
	.scale(widthScale);
var canvas_left=d3.select("body")
	.append("svg")
	.attr("width",width)
	.attr("height",height)
	.append("g")//group
	.attr("transform","translate(20,10)")
	//.call(axis);*/
/*var circle=canvas_left.append("circle")
	.attr("cx",250)
	.attr("cy",250)
	.attr("r",50)
	.attr("fill","red")*/


/*var bars=canvas_left.selectAll("rect")//selects all rect in our page
	.data(dataArray)
	.enter()//placeholders for doom elements
		.append("rect")
		//.attr("width",function(d){return d*10;})
		.attr("width",function(d){return widthScale(d)})
		.attr("height",50)
		.attr("y",function(d, i){return i*100})
		//.attr("fill","red")
		.attr("fill",function(d){return color(d)})

canvas_left.append("g")
	.attr("transform","translate(0,400)")
	.call(axis);

console.log(d3);*/

d3.csv("./data/coffee_data.csv", function(data){

	var canvas=d3.select("body").append("svg")
		.attr("width",380)
		.attr("height",600)
		.style("position", "absolute")
    	.style("top", '0px')
    	.style("left", '0px');

var regions = d3.nest()
        .key(function(d) { return d.region })
        //.rollup(function(leaves) {
          //var sum = 0;
          //leaves.forEach(function(d) {
            //sum += d.sales;
         // })
        .rollup(function(d) { 
		return d3.sum(d, function(g) {return g.sales; });


          //return sum
        })
        .entries(data);

      console.log(regions);

      //regions.sort(function(a,b) { return b.values - a.values });

      //console.table(regions.sort(function(a,b) { return b.value - a.value }));

      var max = d3.max(regions, function(d) {
        return d.value;
      });
      console.log(max);

      var xscale = d3.scaleLinear()
      .domain([0, max])
      .range([0, 500])

      console.log(xscale);


	var heightScale= d3.scaleLinear()
		.domain([max,0])
		.range([0,500]);

	var axis=d3.axisLeft()
		.ticks(5)
		.scale(heightScale)
		.tickFormat(function (d) {
      if ((d / 1000) >= 1) {
        d = d / 1000 + "K";
      }
      return d;
    });
	

	canvas.selectAll("rect")
		.data(regions)
		.enter()
			.append("g")
			.append("rect")
			.attr("height",function(d){return xscale(d.value)})
			.attr("width",45)
			.attr("x",function(d,i){return i*80+10})
			.attr("y",function(d){return 550-xscale(d.value)})
			.attr("fill","blue")
			.attr("transform","translate(80,0)")

	canvas.selectAll("line")
		.data(regions)
		.enter()
			.append("g")
			.append("line")
			.attr("x1",function(d,i){return i*80+40})
			.attr("y1",20)
			.attr("x2",function(d,i){return i*80+40})
			.attr("y2",10)
			.attr("stroke","black")
			.attr("transform","translate(70,550)")
	canvas.selectAll("text")
		.data(regions)
		.enter()
			.append("text")
			.attr("text-anchor","middle")
			.attr("fill","black")
			.attr("x",function(d,i){return i*80+30})
			.attr("y",570)
			.text(function(d){return d.key})
			.attr("transform","translate(80,20)")


	canvas.append("g")
		.attr("transform","translate(80,50)")
		.call(axis);


  //console.log(data);




var canvas2=d3.select("body").append("svg")
		.attr("width",380)
		.attr("height",600)
		.style("position", "absolute")
    	.style("top", '0px')
    	.style("left", '380px');
  var categories= d3.nest()
        .key(function(d) { return d.category })
        //.rollup(function(leaves) {
          //var sum = 0;
          //leaves.forEach(function(d) {
            //sum += d.sales;
         // })
        .rollup(function(d) { 
		return d3.sum(d, function(g) {return g.sales; });


          //return sum
        })
        .entries(data);

      console.log(categories);

      //regions.sort(function(a,b) { return b.values - a.values });

      //console.table(regions.sort(function(a,b) { return b.value - a.value }));

      var max = d3.max(categories, function(d) {
        return d.value;
      });
      console.log(max);

      var xscale = d3.scaleLinear()
      .domain([0, max])
      .range([0, 500])

      console.log(xscale);


	var heightScale= d3.scaleLinear()
		.domain([max,0])
		.range([0,500]);

	var axis=d3.axisLeft()
		.ticks(5)
		.scale(heightScale)
		.tickFormat(function (d) {
      if ((d / 1000) >= 1) {
        d = d / 1000 + "K";
      }
      return d;
    });
	

	var widthScale= d3.scaleLinear()
		.domain([0,3])
		.range([0,245]);


	//var axis2=d3.axisTop()
		//.scale(widthScale)
		//.ticks(4)
		//.tickValues(regions.key);

		


	canvas2.selectAll("rect")
		.data(categories)
		.enter()
			.append("g")
			.append("rect")
			.attr("height",function(d){return xscale(d.value)})
			.attr("width",45)
			.attr("x",function(d,i){return i*80+10})
			.attr("y",function(d){return 550-xscale(d.value)})
			.attr("fill","blue")
			.attr("transform","translate(70,0)")


		canvas2.selectAll("line")
		.data(categories)
		.enter()
			.append("g")
			.append("line")
			.attr("x1",function(d,i){return i*80+30})
			.attr("y1",20)
			.attr("x2",function(d,i){return i*80+30})
			.attr("y2",10)
			.attr("stroke","black")
			.attr("transform","translate(70,550)")

	
	canvas2.selectAll("text")
		.data(categories)
		.enter()
			.append("text")
			.attr("text-anchor","middle")
			.attr("fill","black")
			.attr("x",function(d,i){return i*80+30})
			.attr("y",570)
			.text(function(d){return d.key})
			.attr("transform","translate(70,20)")


	canvas2.append("g")
		.attr("transform","translate(70,50)")
		.call(axis);

	

  //console.log(data);
})
