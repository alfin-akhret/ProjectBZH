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
        <div class="row">
            <div class="col-md-1 col-md-offset-11 login-btn">
                <span class="glyphicon glyphicon-lock" aria-hidden="true" ng-click="toggleModal()"></span>    
            </div>
        </div>
        
        <div class="row">
            <!-- search -->
            <div class="col-md-4">
                <img src="app/images/logo-biznet-home.png" class="logo"></img>
                
                
                <!-- search form -->
                <div>
                    <form method="post" action="app/backend/inquiries.php">
                      <!-- Region -->
                      
                      <button type="submit" class="btn btn-warning">Submit</button>
                    </form>
                </div>
                
            </div>
            
            <!-- the map -->
            <div id="map-canvas" class="col-md-8"></div>
            
        </div>
        
      
        
        
        <!-- login modal for engineer -->
        <modal title="Login form" visible="showModal">
            <form role="form" name="login-form" action="app/backend/login.php" method="post">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter username" name="username"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" name="password"/>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </modal>
    
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
    <script type="text/javascript" src="app/js/directives/modal.directives.js"></script>
    
</body>
</html>