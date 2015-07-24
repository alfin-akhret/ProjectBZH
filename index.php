<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Labs</title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&sensor=true&libraries=places"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
    <style type="text/css">
        #map-canvas {width:100%; height:500px;}
    </style>
    
    
    
</head>
<body ng-app="BzApp">
    
    <div id="wrapper" ng-controller="MainController">
        
        <div>
            <!-- todo: make it modal -->
            <!-- 
            <form name="login-form" action="app/backend/login.php" method="post">
                <input type="text" name="username"/>
                <input type="text" name="password"/>
                <button type="submit">Login</button>
            </form> -->
        </div>
        
        
        
        <!-- search -->
        <p>Enter your address or click on the map <br>to see if you are within Biznet Home coverage area</p>
        
        <!-- search form -->
        <div id="search_form">
            <form>
                <!--<input type="text" name="street" ng-model="searchForm.street" placeholder="street"/>-->
                <!--<input type="text" name="streetNum" ng-model="searchForm.streetNum" placeholder="street number" value="{{searchForm.streetNum}}"/>-->
                <!--<input type="text" name="region" ng-model="searchForm.region" placeholder="region"/>-->
                <textarea name="address" ng-model="searchForm.address" id="pac-input" class="controls">{{searchForm.address}}</textarea>
                <button>Search</button>
            </form>
        </div>
        
        <!--<input id="pac-input" class="controls" type="text" placeholder="Enter your address">-->
        <div id="map-canvas"></div>
        
        
    
    </div>
    
  
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
    <script type="text/javascript" src="app/js/app.js"></script>
    <script type="text/javascript" src="app/js/services/marker.service.js"></script>
    <script type="text/javascript" src="app/js/services/map.service.js"></script>
    <script type="text/javascript" src="app/js/helpers/haversine.js"></script>
    <script type="text/javascript" src="app/js/helpers/circle.js"></script>
    <script type="text/javascript" src="app/js/controllers/main.ctrl.js"></script>
    
</body>
</html>