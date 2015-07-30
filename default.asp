<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Labs</title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=geometry,places&sensor=true"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="app/css/style.css" type="text/css" />
</head>
<body ng-app="BzApp">
    
    <div id="wrapper" ng-controller="MainController">
      <!-- search -->
      <form>
        Region : 
        <select name="regions" id="regions" ng-model="selectedCity" ng-options="item.CITY_NAME for item in cityList" ng-change="getDistrict()">
			<option value="">--Select region--</option>
        </select> <br>
        
        Zip Code :
        <select name="zip_code" id="districts" ng-model="selectedDistrict" ng-options="item.DISTRICT_NAME for item in districtList" ng-change="zoomDistrict()">
          <option value="">--Select Zip Code--</option>
        </select> <br>
        
        Street:
        <input type="text" name="street" id="street" placeholder="input your street address" ng-model="street" ng-change="findStreet()" ng-model-options="{debounce: 500}"> <br>
        
        <div ng-show="coverage == true">Lokasi Anda berada dalam jangkauan jaringan kami. <br>
		<button name="submit" type="submit">Lanjutkan ke step 2</button>
		</div>
		<div ng-show="coverage == false">Lokasi Anda berada diluar jangkauan jaringan kami, demi pengembangan produk kami bersediakah Anda melakukan pengisian form? <br>
		<button>Click untuk mengisi form</button></div>
		
		
      </form>
	  
	  <!-- map -->
	  <div id="map-canvas" class="col-md-8"></div>
      
        
    </div>
    
  
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
    <script type="text/javascript" src="app/js/app.js"></script>
    <script type="text/javascript" src="app/js/services/marker.service.js"></script>
    <script type="text/javascript" src="app/js/services/map.service.js"></script>
    <script type="text/javascript" src="app/js/services/area.service.js"></script>
	<script type="text/javascript" src="app/js/helpers/mercatorProjection.js"></script>
    <script type="text/javascript" src="app/js/helpers/haversine.js"></script>
    <script type="text/javascript" src="app/js/controllers/main.ctrl.js"></script>
    <script type="text/javascript" src="app/js/directives/modal.directives.js"></script>
    
</body>
</html>