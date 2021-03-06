import 'ol/ol.css';
import {Map, View} from 'ol';
//import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import GeoJSON from 'ol/format/GeoJSON';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
//Draw imports
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
import {Vector as VectorSource, Vector} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import { fromLonLat } from 'ol/proj';


var control, controls = [];

//CREATING LAYER GROUPS
var layers = [
  new TileLayer({
    source: new OSM(),
  })
];


 //Style
 var style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});
//Style

// #region Draw declaration
var source = new VectorSource();
var layersRasterVector = new LayerGroup({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    }) ]
});

//#endregion

//#region Layers
var raster = new TileLayer({
  source: new OSM(),
});


var layersDefault = new LayerGroup({
  layers: [
  new TileLayer({
    source: new OSM(),
  }) ]
});

var layersRoads = new LayerGroup({
  name: 'RoadsLayer',
  layers: [
  new VectorLayer({
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_roads_free_1&maxFeatures=5000&outputFormat=application%2Fjson',
      //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
      //serverType: 'geoserver',
      //transition: 0,
      strategy: bboxStrategy,
      format: new GeoJSON(),
      crossOrigin: 'Anonymous'
    })
  }) ]
});

 var layersTransport = new LayerGroup({
    name: 'PublicTransportLayer',
    layers: [
    new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/geo_test1/wms',
        params: {'LAYERS': 'geo_test1:gis_osm_transport_free_1', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
      })
    }) ]
  });


  var layersPlaces = new LayerGroup({
    name: 'PlacesLayer',
    layers: [
    new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/geo_test1/wms',
        params: {'LAYERS': 'geo_test1:gis_osm_places_free_1', 'TILED': true},
        serverType: 'geoserver',
        transition: 0,
      })
    }) ]
  });

/*
//EXAMPLE WMS LAYER (IMAGE)
  var layersPois = new LayerGroup({
    name: 'PointofInterestsLayer',
    layers: [
    new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/geo_test1/wms',
        params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
        serverType: 'geoserver',
        transition: 0
      })
    }) ]
  });

//EXAMPLE GEOJSON LAYER
var layersPois = new LayerGroup({
  name: 'PointofInterestsLayer',
  layers: [
  new VectorLayer({
    source: new VectorSource({
      url: 'http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_pois_free_1&maxFeatures=250&outputFormat=application%2Fjson',
      //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
      //serverType: 'geoserver',
      //transition: 0,
      format: new GeoJSON(),
      crossOrigin: 'Anonymous'
    })
  }) ]
});
*/
  var layersPois = new LayerGroup({
    name: 'PointofInterestsLayer',
    layers: [
    new VectorLayer({
      source: new VectorSource({
        url: 'http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_pois_free_1&maxFeatures=250&outputFormat=application%2Fjson',
        //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
        //serverType: 'geoserver',
        //transition: 0,
        format: new GeoJSON(),
        crossOrigin: 'Anonymous'
      })
    }) ]
  });

//#endregion




  var layersPois = new LayerGroup({
    name: 'PointofInterestsLayer',
    layers: [
    new VectorLayer({
      source: new VectorSource({
        url: 'http://localhost:8080/geoserver/geo_test1/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=geo_test1%3Agis_osm_pois_free_1&maxFeatures=250&outputFormat=application%2Fjson',
        //params: {'LAYERS': 'geo_test1:gis_osm_pois_free_1', 'TILED': true},
        //serverType: 'geoserver',
        //transition: 0,
        format: new GeoJSON(),
        crossOrigin: 'Anonymous'
      })
    }) ]
  });
//#endregion Layers
  

var map = new Map({
  layers: layersRasterVector,
  target: 'map',
  view: new View({
    center: fromLonLat([34, 39]),
    zoom: 6,
  }),
});


// #region Draw2

var modify = new Modify({source: source});
map.addInteraction(modify);

var draw, snap; // global so we can remove them later
var typeSelect = document.getElementById('type');

function addInteractions() {
  draw = new Draw({
    source: source,
    type: typeSelect.value,
  });
  map.addInteraction(draw);
  snap = new Snap({source: source});
  map.addInteraction(snap);
}

//Handle change event.
 
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  map.removeInteraction(snap);
  addInteractions();
};

addInteractions();
// #endregion Draw2


/*var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 0,
  }),
});
*/

//BUTTON TYPE LAYER CHANGE
/*
//document.getElementById("mySelect").addEventListener("Transport", console.log("a"));
document.getElementById("transportMap").addEventListener("click", function() {
  map.setLayerGroup(layersTransport);
});

document.getElementById("roadsMap").addEventListener("click", function() {
  map.setLayerGroup(layersRoads);
});

document.getElementById("defaultMap").addEventListener("click", function() {
  map.setLayerGroup(layersDefault);
});
*/

//#region Checkbox
var transportCheckbox = document.querySelector("input[name=transportCheck]");
var roadsCheckbox = document.querySelector("input[name=roadsCheck]");
var placesCheckbox = document.querySelector("input[name=placesCheck]");
var poisCheckbox = document.querySelector("input[name=poisCheck]");
//var checkbox = document.querySelector("input[name=vehicle1]");

transportCheckbox.addEventListener( 'change', function() {
    if(this.checked) {
        // Checkbox is checked..
        console.log("checked");
        map.addLayer(layersTransport);
    } else {
        // Checkbox is not checked..
        console.log("not checked");
        map.removeLayer(layersTransport);
    }
});

roadsCheckbox.addEventListener( 'change', function() {
  if(this.checked) {
      // Checkbox is checked..
      console.log("checked");
      map.addLayer(layersRoads);
  } else {
      // Checkbox is not checked..
      console.log("not checked");
      map.removeLayer(layersRoads);
  }
});

placesCheckbox.addEventListener( 'change', function() {
  if(this.checked) {
      // Checkbox is checked..
      console.log("checked");
      map.addLayer(layersPlaces);
  } else {
      // Checkbox is not checked..
      console.log("not checked");
      map.removeLayer(layersPlaces);
  }
});

poisCheckbox.addEventListener( 'change', function() {
  if(this.checked) {
      // Checkbox is checked..
      console.log("checked");
      map.addLayer(layersPois);
  } else {
      // Checkbox is not checked..
      console.log("not checked");
      map.removeLayer(layersPois);
  }
});
//#endregion


map.on('click', function(e){
  map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
    console.log(feature.getProperties().name);
   })
  }
)
//layers.setVisible(true);

/*
var public_transport=new ol.layer.Image({
  source:new ol.source.ImageWMS({
   
      url:'http://localhost:8080/geoserver/geo_test1/wms',
      params:{'LAYERS':'geo_test1:gis_osm_transport_free_1'},
      serverType:'geoserver'
  })
  });
        var roads=new ol.layer.Image({
  source:new ol.source.ImageWMS({
   
      url:'http://localhost:8080/geoserver/geo_test1/wms',
      params:{'LAYERS':'geo_test1:gis_osm_roads_free_1'},
      serverType:'geoserver'
  })
  });

map.addLayer(public_transport);
map.addControl(new ol.control.LayerSwitcher());

*/