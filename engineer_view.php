<?php session_start(); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Engineer View</title>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="app/css/style.css" type="text/css" />

    <!-- this is stupid -->
    <script type="text/javascript">
        var userRole = <?php echo(json_encode($_SESSION)); ?>;
    </script>

</head>
<body ng-app="BzApp">
    <div id="wrapper" ng-controller="MainController">
        <!-- dummy session handler -->
        <?php
            if($_SESSION['role'] != "engineer"){
                header("Location: ../../index.php");
            }
        ?>
        
        <div class="row">
            <div class="col-md-1 col-md-offset-11 login-btn">
                <a href="app/backend/logout.php"><span class="glyphicon glyphicon-lock" aria-hidden="true" ng-click="toggleModal()"></span></a>    
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-4">
                <img src="app/images/logo-biznet-home.png" class="logo"></img><br>
                Tap info: <br>
                Install location info: <br>
            </div>
            
            <!-- the map -->
            <div id="map-canvas" class="col-md-8"></div>
        </div>
        
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