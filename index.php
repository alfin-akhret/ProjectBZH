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
            <!-- search -->
            <div class="col-md-4">
                <img src="app/images/logo-biznet-home.png" class="logo"></img>
                
                <p>Enter your address or click on the map <br>to see if you are within our coverage area.</p>
            
                <!-- search form -->
                <div>
                    <form>
                      <div class="form-group">
                        <label for="">Search</label><br>
                        <input type="text" name="" id="pac-input"/>
                      </div>
                      <div class="form-group">
                        {{ searchForm.address }}
                        <!--<textarea name="address" ng-model="searchForm.address" id="pac-input" class="controls" disabled>{{searchForm.address}}</textarea>-->
                        <input type="hidden" name="address" value="{{searchForm.address}}" class="controls"/>
                      </div>
                      <div class="form-group">
                          <label for="">Residential type</label><br>
                          <input type="radio" name="residentialType"/> Apartment
                          <input type="radio" name="residentialType"/> House
                      </div>
                      <button type="submit" class="btn btn-warning">Submit</button>
                    </form>
                </div>
                
                
                
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