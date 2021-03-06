$(function () {
  request=$.ajax({
    type:"GET",
    url:"User_visual.php",
    dataType:"json"
  });

  request.done(function(response,TextStatus,jqXHR){
    var maxiter=response.length;
    var data=[];
    for(let i=0; i<maxiter; i++){
      let array=response[i].server_lat_long.split(",");
      response[i].lat=parseFloat(array[0]);
      response[i].lng=parseFloat(array[1]);
      delete response[i].server_lat_long;
    }
    console.log(response);
    


    var baseLayer=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoia3dzdGFzbWVsIiwiYSI6ImNrcnoydGhoNDBuamUybm85MmhnaHJlcTQifQ.mFbkt4WVCUKo3hLpKbZqOA'
  });
  var cfg = {
    "radius": 20,
    "maxOpacity": 0.8,
    "scaleRadius":false,
    "useLocalExtrema": false,
    valueField: 'count',
    latField: 'lat',
    lngField: 'lng',
  };
  let heatmapLayer= new HeatmapOverlay(cfg);

  var map=new L.Map('mapid',{
   center: new L.LatLng(38.246639, 21.734573),
   zoom:4,
   layers:[baseLayer,heatmapLayer]
  });

  heatmapLayer.addData(response);
  })

  
});