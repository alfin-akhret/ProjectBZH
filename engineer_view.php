<?php session_start(); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Engineer View</title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
    <style type="text/css">
        #map-canvas {width:100%; height:500px;}
    </style>

    <!-- this is stupid -->
    <script type="text/javascript">
        var userRole = <?php echo(json_encode($_SESSION)); ?>;
    </script>

</head>
<body ng-app="BzApp">
    <div ng-controller="MainController">
        <!-- dummy session handler -->
        <?php
            if($_SESSION['role'] != "engineer"){
                header("Location: ../../index.php");
            }
        ?>
        
        
        <h1>Engineer View</h1>
        <a href="app/backend/logout.php">Logout</a>
        
        <!-- dummy test for installation location -->
        <form ng-submit="setInstallationLocation(coordinate)">
            <input type="text" name="lat" placeholder="lat" ng-model="coordinate.Lat"/>
            <input type="text" name="lng" placeholder="lon" ng-model="coordinate.Lng"/>
            <button type="submit">Set install location</button>
        </form>
        
        
        <div id="map-canvas"></div>
        
    </div>
    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
<script src="app/js/helpers/angular-ui-router.min.js"></script>
<script type="text/javascript" src="app/js/app.js"></script>
<script type="text/javascript" src="app/js/services/marker.service.js"></script>
<script type="text/javascript" src="app/js/services/map.service.js"></script>
<script type="text/javascript" src="app/js/helpers/haversine.js"></script>
<script type="text/javascript" src="app/js/controllers/main.ctrl.js"></script>    
</body>
</html>