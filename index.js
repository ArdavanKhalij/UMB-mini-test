// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'A'},
    {id: 2, label: 'B'},
    {id: 3, label: 'C'}
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

    // initialize your network!
var network = new vis.Network(container, data1, options);
    // create an array with nodes
var nodes2 = new vis.DataSet([
    {id: 1, label: 'B'},
    {id: 2, label: 'C'},
    {id: 3, label: 'D'}
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

    // initialize your network!
var network = new vis.Network(container, data2, options);

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

function getTheMissingEdges1(x1, x2){
	var output = []
	var k=0
	for(var i=0; i<x2.length; i=i+2){
		for(var j=0; j<x1.length; j=j+2){
			if(x2[i]===x1[j]||x2[i+1]===x1[j+1]||x2[i+1]===x1[j]||x2[i]===x1[j+1]){
				k=100
				break
			}
		}
		if(k==100){
			k=0
			output.push(x2[i])
			output.push(x2[i+1])
		}
	}
	console.log(output)
	return output
}

function getTheMissingEdges2(x1, x2){
	var output = []
	var k=0
	for(var i=0; i<x1.length-1; i=i+2){
		for(var j=0; j<x2.length-1; j=j+2){
			if(x1[i]===x2[j]||x1[i+1]===x2[j+1]||x1[i+1]===x2[j]||x1[i]===x2[j+1]){
				k=100
				break
			}
		}
		if(k==100){
			k=0
			output.push(x1[i])
			output.push(x1[i+1])
		}
	}
	console.log(output)
	return output
}

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

	edges1.forEach((edge) => {
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
	var missingEdges1 = getTheMissingEdges1(rea1, rea2)
	var missingEdges2 = getTheMissingEdges2(rea1, rea2)

	
	var output1 = ""
	var output2 = ""
	var kk = ""
	var a1 = "You can add "
	var a2 = " to "
	var a3 = " edge.\n"
	for(var i=0; i<missingEdges1.length; i=i+2){
		q1 = output1.concat(a1)
		q2 = q1.concat(missingEdges1[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges1[i+1])
		output1 = q4.concat(a3)
	}
	for(var i=0; i<missingEdges2.length; i=i+2){
		q1 = output2.concat(a1)
		q2 = q1.concat(missingEdges2[i])
		q3 = q2.concat(a2)
		q4 = q3.concat(missingEdges2[i+1])
		output2 = q4.concat(a3)
	}
	output10 = ""
	output11 = ""
	for(var i=0; i<missingNodes1.length; i++){
		q1 = output10.concat(a1)
		q2 = q1.concat(missingNodes1[i])
		output10 = q2.concat(" to your nodes.\n")
	}
	for(var i=0; i<missingNodes2.length; i++){
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

	window.alert(output15);
	
}
