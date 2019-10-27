var p_date = document.getElementById("p_date");

var map1 = L.map('map1').setView([49.4093524, 8.6931736], 15);
var map2 = L.map('map2').setView([49.4093524, 8.6931736], 15);

map1.sync(map2);
map2.sync(map1);

var tile = "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png "

var layer1 = L.tileLayer(tile, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map1);

var layer2 = L.tileLayer(tile, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

//var layer1 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//	maxZoom: 18,
//	id: 'mapbox.streets',
//	accessToken: 'pk.eyJ1IjoicG9zdGZsYXYiLCJhIjoiY2syN29xZHVpMnlzcDNtbXZkN2tlYWdhaSJ9.Th5tmsyOlPKoogGrOQrMNA'
//});

//var layer2 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//	maxZoom: 18,
//	id: 'mapbox.hiking',
//	accessToken: 'pk.eyJ1IjoicG9zdGZsYXYiLCJhIjoiY2syN29xZHVpMnlzcDNtbXZkN2tlYWdhaSJ9.Th5tmsyOlPKoogGrOQrMNA'
//});

layer1.addTo(map1);
layer2.addTo(map2);

function mk_not_bloom_icon(label) {
    return new L.DivIcon({
        className: 'no-bloom-icon',
        html: '<img class="no-bloom-icon" src="tree_not_blooming.png"/>' +
              '<span>' + label + '</span>',
        iconAnchor: [15, 30]
    });
}

function mk_bloom_icon(label) {
    return new L.DivIcon({
        className: 'bloom-icon',
        html: '<img class="no-bloom-icon" src="tree_blooming.png"/>' +
              '<span>' + label + '</span>',
        iconAnchor: [15, 30]
    });

}

//var not_bloom_icon = L.icon({
//	iconUrl: 'tree_not_blooming.png',
//
//	iconSize:     [40, 40], // size of the icon
//	shadowSize:   [0, 0], // size of the shadow
//	iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
//	shadowAnchor: [4, 62],  // the same for the shadow
//	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
//});

//var bloom_icon = L.icon({
//	iconUrl: 'tree_blooming.png',
//
//	iconSize:     [40, 40], // size of the icon
//	shadowSize:   [0, 0], // size of the shadow
//	iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
//	shadowAnchor: [4, 62],  // the same for the shadow
//	popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
//});


class Tree {
    constructor(name, bloom_start, xcoord, ycoord) {
        this.name = name;
        this.bloom_start = bloom_start;
        this.marker = L.marker([xcoord, ycoord],
            {icon: mk_not_bloom_icon(this.name)});
        this.blooming = false;
    }
    update(dayno) {
        if ((dayno < this.bloom_start || dayno >= this.bloom_start + 14)
                && this.blooming) {
            this.marker.setIcon(mk_not_bloom_icon(this.name));
            this.blooming = false;
        } else if (dayno >= this.bloom_start
                   && dayno < this.bloom_start + 14
                   && !this.blooming) {
            this.marker.setIcon(mk_bloom_icon(this.name));
            this.blooming = true;
        }
    }
}

var tree = new Tree("Fritz", 55, 49.4093524, 8.6931736);
var tree2 = new Tree("Hans", 80, 45.02, 8.6931736);
var tree3 = new Tree("Hans", 80, 49.02, 8.69317);

var a_tree = new Tree("Fritz", 120, 49.4093524, 8.6931736);
var a_tree2 = new Tree("Hans", 100, 45.02, 8.6931736);
var a_tree3 = new Tree("Hans", 100, 49.02, 8.69317);

function updateMap(value) {
    tree.update(value);
    tree2.update(value);
    tree3.update(value);
    a_tree.update(value);
    a_tree2.update(value);
    a_tree3.update(value);
    p_date.innerHTML = "Date: " + dateFromDay(value);
}

function dateFromDay(dayno) {
    var date = new Date(2019, 0); // initialize a date in `year-01-01`
    var date2 = new Date(date.setDate(dayno));
    return date2.getMonth() + 1 + "-" + date2.getDate();
}

var cities1 = L.layerGroup([tree.marker, tree2.marker, tree3.marker]);
var cities2 = L.layerGroup([a_tree.marker, a_tree2.marker, a_tree3.marker]);
cities1.addTo(map1);
cities2.addTo(map2);

//var control1 = L.control.layers({'2019': cities1, '2020': cities1}, null, {collapsed: false});
//var control2 = L.control.layers({'2019': cities2, '2020': cities2}, null, {collapsed: false});

//control1.addTo(map1);
//control2.addTo(map2);

//map1.on('baselayerchange', function(val) {
//    console.log(val);
//});
//
//map2.on('baselayerchange', function(val) {
//    console.log("map2", val);
//});
