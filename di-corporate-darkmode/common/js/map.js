function initMap1() {

  //tokyo
  var map_tokyo = new google.maps.LatLng(35.644838, 139.709255);
  var opts_tokyo = {
      zoom: 16,
      center: map_tokyo,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map1"), opts_tokyo);

  var marker = new google.maps.Marker({
    position: map_tokyo,
    map: map,
    icon: '/common/img/ico_marker.png',
    title: 'Digital Identity 東京本社'
  });

  /*スタイルのカスタマイズ*/
  var styleOptions =
  [
    {
      "stylers": [
        { "hue": "#006eff" },
        { "lightness": 16 },
        { "saturation": -18 }
      ]
    }
  ];
 
  var styledMapOptions = { name: 'Digital Identity' }
  var DItype = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('blue', DItype);
  map.setMapTypeId('blue');
}

function initMap2() {
  //fukuoka
  var map_fukuoka = new google.maps.LatLng(33.591148, 130.396461);
  var opts_fukuoka = {
      zoom: 17,
      center: map_fukuoka,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map2"), opts_fukuoka);

  var marker = new google.maps.Marker({
    position: map_fukuoka,
    map: map,
    icon: '/common/img/ico_marker.png',
    title: 'Digital Identity 福岡支社'
  });

  /*スタイルのカスタマイズ*/
  var styleOptions =
  [
    {
      "stylers": [
        { "hue": "#006eff" },
        { "lightness": 16 },
        { "saturation": -18 }
      ]
    }
  ];
 
  var styledMapOptions = { name: 'Digital Identity' }
  var DItype = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('blue', DItype);
  map.setMapTypeId('blue');


}

function initMap3() {
  //oosaka
  var map_oosaka = new google.maps.LatLng(34.696248, 135.494446);
  var opts_oosaka = {
      zoom: 16,
      center: map_oosaka,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map3"), opts_oosaka);

  var marker = new google.maps.Marker({
    position: map_oosaka,
    map: map,
    icon: '/common/img/ico_marker.png',
    title: 'Digital Identity 大阪支社'
  });

  /*スタイルのカスタマイズ*/
  var styleOptions =
  [
    {
      "stylers": [
        { "hue": "#006eff" },
        { "lightness": 16 },
        { "saturation": -18 }
      ]
    }
  ];
 
  var styledMapOptions = { name: 'Digital Identity' }
  var DItype = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('blue', DItype);
  map.setMapTypeId('blue');


}