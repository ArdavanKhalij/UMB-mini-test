// create an array with nodes
var nodes1 = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
    {id: 6, label: 'Node 6'}
]);

    // create an array with edges
var edges1 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 5, to: 6}
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
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
    {id: 6, label: 'Node 6'}
]);

    // create an array with edges
var edges2 = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
    {from: 5, to: 6}
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

if (edges1.get().length == edges2.get().length && nodes1.get().length == nodes2.get().length && sim1==nodes1.get().length && sim2==edges1.get().length){
	window.alert("These graphs are similar.");
}
else{
	
}