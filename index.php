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
    
    <div id="wrapper" ng-controller="RevisionController">
      <!-- region -->
      <form>
        Region : 
        <select name="regions" id="regions" ng-model="regions" ng-options="region.name as region.name for region in regionList" ng-change="getZipCode()">
          <option value="">Select Region</option>
        </select>
        
        Zip Code :
        <select name="zip_code" id="zip_code" ng-model="zip" ng-options="z for z in zipList">
          <option value="">select zip code</option>
        </select>
        
        Street:
        <input type="text" name="street" id="street" placeholder="input your street address"> 
        
        <button name="submit" type="submit">proceed to step 2</button>
        <button name="check_availability">Check availability</button>
      </form>
      <!-- zip code -->
      <!-- street address -->
        
    </div>
    
  
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
    <script type="text/javascript" src="app/js/app.js"></script>
    <script type="text/javascript" src="app/js/services/marker.service.js"></script>
    <script type="text/javascript" src="app/js/services/map.service.js"></script>
    <script type="text/javascript" src="app/js/services/area.service.js"></script>
    <script type="text/javascript" src="app/js/helpers/haversine.js"></script>
    <script type="text/javascript" src="app/js/helpers/circle.js"></script>
    <script type="text/javascript" src="app/js/controllers/revision.ctrl.js"></script>
    <script type="text/javascript" src="app/js/directives/modal.directives.js"></script>
    
</body>
</html>