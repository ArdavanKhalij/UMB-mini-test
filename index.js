// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A', x: 100, y: 200},
    {id: 2, label: 'B', x: 200, y: 200},
    {id: 3, label: 'C', x: 200, y: 100}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 3, to: 2}
]);

    // create a network
var container = document.getElementById('mynetwork');

    // provide the data in the vis format
var data1 = {
    nodes: nodes1,
    edges: edges1
};

var options = {};

    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B', x: 200, y: 200},
    {id: 2, label: 'C', x: 200, y: 100},
    {id: 3, label: 'D', x: 300, y: 300}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 2},
    {from: 1, to: 3}
]);

    // create a network
var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
var data2 = {
    nodes: nodes2,
    edges: edges2
};
var options = {};

var sim1=0
var sim2=0
var sna1 = []
var sna2 = []
var rea1 = []
var rea2 = []

nodes1.forEach((nodes1) => {
	nodes2.forEach((nodes2) => {
		if(nodes1.label == nodes2.label){
			sim1++
		}
	});
});

edges1.forEach((edges1) => {
	edges2.forEach((edges2) => {
		if(edges1.from == edges2.from && edges1.to == edges2.to){
			sim2++
		}
	});
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function getTheMissingNodes1(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes2.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

function getTheMissingNodes2(x1){
	output = []
	k=0
	for(var i=0;i<x1.length;i++){
		nodes1.forEach((node) => {
			if(x1[i]===node.label){
				k=100
			}
		});
		if(k==0){
			z=x1[i]
			output.push(x1[i])
		}
		k=0
	}
	return uniq(output)
}

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	nodes1.forEach((nodes1) => {
		nodes2.forEach((nodes2) => {
			if(nodes1.label == nodes2.label){
				sna1.push(nodes1.label)
				sna2.push(nodes2.label)
			}
		});
	});

	edges2.forEach((edge) => {
		for(var i=0; i<sna1.length; i++){
			if(nodes1.get(edge.from).label === sna1[i] || nodes1.get(edge.to).label === sna1[i]){
				rea1.push(nodes1.get(edge.from).label)
				rea1.push(nodes1.get(edge.to).label)
			}
		}
	});

	edges1.forEach((edge) => {
		for(var i=0; i<sna2.length; i++){
			if(nodes2.get(edge.from).label == sna2[i] || nodes2.get(edge.to).label == sna2[i]){
				rea2.push(nodes2.get(edge.from).label)
				rea2.push(nodes2.get(edge.to).label)
			}
		}
	});

	var missingNodes1 = getTheMissingNodes1(rea1)
	var missingNodes2 = getTheMissingNodes2(rea2)
	var missingEdges1 = []
	var missingEdges2 = []
	
	
	var nodess1 = []
	nodes1.forEach((node) => {
		nodess1.push(node.label)
	});
	for(var i=0; i<missingNodes2.length; i++){
		nodess1.push(missingNodes2[i])
	}
	
	var nodess2 = []
	nodes2.forEach((node) => {
		nodess2.push(node.label)
	});
	for(var i=0; i<missingNodes1.length; i++){
		nodess2.push(missingNodes1[i])
	}

	var r1=0
	var r2=0
	
	var edgess1 = []
	edges1.forEach((edge) =>{
		for(var i=0; i<nodess1.length; i++){
			for(var j=0; j<nodess1.length; j++){
				nodes1.forEach((node) =>{
					if(node.label === nodess1[i]){
						r1 = node.id
					}
				});
				nodes1.forEach((node) =>{
					if(node.label === nodess1[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess1.push(nodess1[i])
					edgess1.push(nodess1[j])
				}
				r1=-10
				r2=-10
			}
		}
	});

	var edgess2 = []
	r1=0
	r2=0
	edges2.forEach((edge) =>{
		for(var i=0; i<nodess2.length; i++){
			for(var j=0; j<nodess2.length; j++){
				nodes2.forEach((node) =>{
					if(node.label === nodess2[i]){
						r1 = node.id
					}
				});
				nodes2.forEach((node) =>{
					if(node.label === nodess2[j]){
						r2 = node.id
					}
				});
				if(edge.from===r1 && edge.to===r2){
					edgess2.push(nodess2[i])
					edgess2.push(nodess2[j])
				}
				r1=-10
				r2=-10
			}
		}
	});
	console.log(edgess1)
	console.log(edgess2)


	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1])){
				edgess1.splice(i, 1)
				edgess1.splice(i, 1)
			}
		}
	}

	for(var i=0; i<edgess1.length; i=i+2){
		for(var j=0;j<edgess2.length; j=j+2){
			if(!((edgess1[i]==edgess2[j] && edgess1[i+1]==edgess2[j+1])||(edgess1[i+1]==edgess2[j] && edgess1[i]==edgess2[j+1]))){
				edgess2.splice(j, 1)
				edgess2.splice(j, 1)
			}
		}
	}
	console.log(edgess1)
	console.log(edgess2)
	missingEdges2 = edgess1
	missingEdges1 = edgess2
	console.log(missingEdges1)
	console.log(missingEdges2)
	
	
	
	
	
	
	
	
	
	
	
	
	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	
	me1 = []
	me2 = []
	
	for(var i=0; i<missingEdges1.length; i=i+2){
		me1.push(missingEdges1[i])
		me1.push(missingEdges1[i+1])
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		me2.push(missingEdges2[i])
		me2.push(missingEdges2[i+1])
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	
	output10 = ""
	output11 = ""
	
	mn1 = []
	mn2 = []
	
	for(var i=0; i<missingNodes1.length; i++){
		mn2.push(missingNodes1[i])
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
		mn1.push(missingNodes2[i])
		q1 = output11.concat(a1)
		q2 = q1.concat(missingNodes2[i])
		output11 = q2.concat(" to your nodes.\n")
	}
	
	
	output3 = "For the first network graph:\n"
	output4 = "For the second network graph:\n"
	output5 = output3.concat(output1)
	output6 = output5.concat(output4)
	output7 = output6.concat(output2)
	output8 = "Nodes you can add to first network graph:\n"
	output9 = "Nodes you can add to second network graph:\n"
	output12= output8.concat(output11)
	output13= output12.concat(output9)
	output14= output13.concat(output10)
	output15= output14.concat(output7)
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	no1 = []
	numberofnodes = 0
	nodes1.forEach((node) => {
		no1.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn1.length; i++){
		x1=0
		y1=0
		nodes2.forEach((Node) =>{
			if(Node.label == mn1[i]){
				x1=Node.x
				y1=Node.y
			}
		});
		no1.push({id: numberofnodes+1, label: mn1[i], x: x1, y: y1, color: {background: "orange"}})
	}
	
	
	
	no2 = []
	numberofnodes = 0
	nodes2.forEach((node) => {
		no2.push({id: node.id, label: node.label, x: node.x, y: node.y})
		numberofnodes++
	});
	for(var i=0; i<mn2.length; i++){
		x2=0
		y2=0
		nodes1.forEach((Node) =>{
			if(Node.label == mn2[i]){
				x2=Node.x
				y2=Node.y
			}
		});
		no2.push({id: numberofnodes+1, label: mn2[i], x: x2, y: y2, color: {background: "orange"}})
	}
	
	function GiveTheID1(label){
		for(var i=0; i<no1.length; i++){
			if(no1[i].label === label){
				return no1[i].id
			}
		}
	}

	function GiveTheID2(label){
		for(var i=0; i<no2.length; i++){
			if(no2[i].label === label){
				return no2[i].id
			}
		}
	}
	
	
	function deleteRepetedEdges(edges){
		for(var i=0; i<edges.length; i+=2){
			for(var j=0; j<edges.length; j+=2){
				if(i!=j && ((edges[i]==edges[j] && edges[i+1]==edges[j+1]) || (edges[i+1]==edges[j] && edges[i]==edges[j+1]))){
					edges.splice(i, 1);
					edges.splice(2, 1);
				}
			}
		}
		return edges
	}
	
	me3 = deleteRepetedEdges(me1)
	me4 = deleteRepetedEdges(me2)
	me1 = me3
	me2 = me4
	
	
		
	eo1 = []
	numberofnodes = 0
	edges1.forEach((edge) =>{
		eo1.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me1.length; i+=2){
		f = GiveTheID1(me1[i])
		t = GiveTheID1(me1[i+1])
		eo1.push({from: f, to: t, color: "red"})
	}	
	
	eo2 = []
	numberofnodes = 0
	edges2.forEach((edge) =>{
		eo2.push({from: edge.from, to: edge.to})
		numberofnodes++
	});
	for(var i=0; i<me2.length; i+=2){
		f = GiveTheID2(me2[i])
		t = GiveTheID2(me2[i+1])
		eo2.push({from: f, to: t, color: "red"})
	}	
	
	
	function deleteRepetedEdgesKind2(edges){
		for(var i=0; i<edges.length; i++){
			for(var j=0; j<edges.length; j++){
				if(edges[i].from==edges[j].to && edges[j].from==edges[i].to){
					edges.splice(j, 1);
				}
			}
		}
		return edges
	}
	
	eo3 = deleteRepetedEdgesKind2(eo1)
	eo4 = deleteRepetedEdgesKind2(eo2)
	eo1 = eo3
	eo2 = eo4
	
	// create an array with nodes
	var nodes3 = new vis.DataSet(no1);

    // create an array with edges
	var edges3 = new vis.DataSet(eo1);

    // create a network
	var container = document.getElementById('mynetwork');

    // provide the data in the vis format
	var data3 = {
    nodes: nodes3,
    edges: edges3
	};

	var options = {};
	var network = new vis.Network(container, data3, options);


    // create an array with nodes
	var nodes4 = new vis.DataSet(no2);

    // create an array with edges
	var edges4 = new vis.DataSet(eo2);

    // create a network
	var container = document.getElementById('mynetwork2');

    // provide the data in the vis format
	var data4 = {
    nodes: nodes4,
    edges: edges4
	};
	var options = {};
	var network = new vis.Network(container, data4, options);
 	window.alert(output15);
}
