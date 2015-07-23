<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Labs</title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
    <style type="text/css">
        #map-canvas {width:100%; height:500px;}
    </style>
    
    
    
</head>
<body ng-app="BzApp">
    
    <div id="wrapper" ng-controller="MainController">
        
        <div>
            <!-- todo: make it modal -->
            <form name="login-form" action="app/backend/login.php" method="post">
                <input type="text" name="username"/>
                <input type="text" name="password"/>
                <button type="submit">Login</button>
            </form>
        </div>
        
        
        
        <div id="map-canvas"></div>
        
        
    
    </div>
    
  
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
    <script type="text/javascript" src="app/js/app.js"></script>
    <script type="text/javascript" src="app/js/services/marker.service.js"></script>
    <script type="text/javascript" src="app/js/services/map.service.js"></script>
    <script type="text/javascript" src="app/js/helpers/haversine.js"></script>
    <script type="text/javascript" src="app/js/controllers/main.ctrl.js"></script>
    
</body>
</html>