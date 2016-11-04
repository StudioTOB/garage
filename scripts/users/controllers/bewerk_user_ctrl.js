'use strict';

angular.module('admingarageApp')
  .controller('GebruikerBewerkenCtrl', function ($scope,$rootScope,$http,$timeout, $firebaseArray,Profile, $firebaseObject,$routeParams,$firebaseAuth,headerService,Auth) {
      headerService.setPaginaTitel('Gebruiker Bewerken');
      
      var userId = $routeParams.uid;
      
      $scope.profiel = Profile(userId);
      
      var voertuigenref = new Firebase('https://garageapp.firebaseio.com/voertuigen/' + userId);
      $scope.voertuigen = $firebaseArray(voertuigenref);
      $scope.voertuigen.$loaded( function() {
          $scope.dataloaded = true;
          
      });
      console.log($scope.voertuigen);
      $scope.itemsPerPage = 5;
        $scope.itemsByPage = 5;
        $scope.changed = function() 
        {
            $scope.itemsByPage= $scope.itemsPerPage;
        };
     $scope.voertuigCollection = [].concat($scope.voertuigen);
    $scope.spin = false;
    $scope.kentekencheck = function()
    {//xnrr85
      $scope.spin = true;
        if($scope.kenteken.length == 6)
        {
          $scope.spin = true;
            $http.get("https://api.datamarket.azure.com/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT('"+ $scope.kenteken + "')?\$format=json")
          
            .success(function(response, status, headers, config) {
            
           
              console.log(response);
            console.log(response.d.Handelsbenaming);
            console.log($scope.kenteken.length);
            
             $scope.kentekenOk = true;
             $scope.spin = true;
            
          }).error(function(response, status, headers, config) {
            if(status == 404){
              
              $scope.kentekenOk = false;
            }
          });
        }
        else
        {
          $scope.kentekenOk = false;
        }
        console.log(AdjustKenteken($scope.kenteken));
    };
    $scope.replace = function(string)
    {
      
      var replace1 = string.replace('/Date(','');
      var replace2 = replace1.replace(')/','');

      return replace2;
    }
    

    $scope.autoToevoegen = function()
    {
      
      $http.get("https://api.datamarket.azure.com/opendata.rdw/VRTG.Open.Data/v1/KENT_VRTG_O_DAT('"+ $scope.kenteken + "')?\$format=json")
          
            .success(function(response, status, headers, config) {
            
           
              console.log(response);
            console.log(response.d.Handelsbenaming);
            console.log($scope.kenteken.length);
            var kenteken = AdjustKenteken($scope.kenteken);
            
            var ref = new Firebase('https://garageapp.firebaseio.com/voertuigen/' + userId + '/');
            var voertuig = $firebaseArray(ref);

              voertuig.$add({
                    Aantalzitplaatsen: response.d.Aantalzitplaatsen,
                    BPM: response.d.BPM,
                    Brandstofverbruikbuitenweg: response.d.Brandstofverbruikbuitenweg,
                    Brandstofverbruikgecombineerd: response.d.Brandstofverbruikgecombineerd,
                    Brandstofverbruikstad: response.d.Brandstofverbruikstad,
                    CO2uitstootgecombineerd: response.d.CO2uitstootgecombineerd,
                    Catalogusprijs: response.d.Catalogusprijs,
                    Cilinderinhoud: response.d.Cilinderinhoud,
                    Datumaanvangtenaamstelling: $scope.replace(response.d.Datumaanvangtenaamstelling),
                    DatumeersteafgifteNederland: $scope.replace(response.d.DatumeersteafgifteNederland),
                    Datumeerstetoelating: $scope.replace(response.d.Datumeerstetoelating),
                    Eerstekleur: response.d.Eerstekleur,
                    G3installatie: response.d.G3installatie,
                    Handelsbenaming: response.d.Handelsbenaming,
                    Hoofdbrandstof: response.d.Hoofdbrandstof,
                    Inrichting: response.d.Inrichting,
                    Kenteken: kenteken,
                    Laadvermogen: response.d.Laadvermogen,
                    Massaleegvoertuig: response.d.Massaleegvoertuig,
                    Massarijklaar: response.d.Massarijklaar,
                    Maximaleconstructiesnelheid: response.d.Maximaleconstructiesnelheid,
                    Maximumtetrekkenmassaautonoomgeremd: response.d.Maximumtetrekkenmassaautonoomgeremd,
                    Maximumtetrekkenmassageremd: response.d.Maximumtetrekkenmassageremd,
                    Maximumtetrekkenmassamiddenasgeremd: response.d.Maximumtetrekkenmassamiddenasgeremd,
                    Maximumtetrekkenmassaongeremd: response.d.Maximumtetrekkenmassaongeremd,
                    Maximumtetrekkenmassaopleggergeremd: response.d.Maximumtetrekkenmassaopleggergeremd,
                    Merk: response.d.Merk,
                    Milieuclassificatie: response.d.Milieuclassificatie,
                    Nevenbrandstof: response.d.Nevenbrandstof,
                    Retrofitroetfilter: response.d.Retrofitroetfilter,
                    Toegestanemaximummassavoertuig: response.d.Toegestanemaximummassavoertuig,
                    Tweedekleur: response.d.Tweedekleur,
                    Vermogen: response.d.Vermogen,
                    Vermogenbromsnorfiets: response.d.Vermogenbromsnorfiets,
                    VervaldatumAPK: $scope.replace(response.d.VervaldatumAPK),
                    Voertuigsoort: response.d.Voertuigsoort,
                    WAMverzekerdgeregistreerd: response.d.WAMverzekerdgeregistreerd,
                    Wachtopkeuren: response.d.Wachtopkeuren,
                    Zuinigheidslabel: response.d.Zuinigheidslabel,
              });
            
          }).error(function(response, status, headers, config) {
            if(status == 404){
              
              $scope.kentekenOk = false;
            }
          });


    }
    
  

    
    function AdjustKenteken(ptKenteken){
//Deze functie geeft indien mogelijk een geldige kentekencombinatie terug
//ook het 2006-formaat
var fNieuwKenteken;
var iAsciWaarde;
var tResult="";
var tKenteken=ptKenteken;
   
tKenteken = trim(tKenteken);
if (tKenteken!="") 
{
   tKenteken=tKenteken.toString().toUpperCase();
   tKenteken=tKenteken.replace(/-/g, "");
   if (tKenteken.length>6)
   {
      tKenteken=tKenteken.substr(0,6);
   }
   //-----------------------------------------------------------------------------
   //Nu de streepjes eruit zijn en de lengte (indien te lang) is aangepast, moet
   //de invoer 6 karakters bevatten. Zoniet, dan gaan we er niets verder aan doen.
   //-----------------------------------------------------------------------------

   if (tKenteken.length==6)
   {
      fNieuwKenteken = true;
      for (var iTeller=2;iTeller <= 4;iTeller++)
      {
         var charcode = tKenteken.charCodeAt(iTeller);
         if (!((charcode>=65) && (charcode<=90)))
         {
            fNieuwKenteken = false;
            break; 
         }
      }
      if (fNieuwKenteken)
      {
         //-----------------------------------------------------------------------------------
         //Laatste teken nog controleren, want die is ook bepalend, zoals 09-GG-JJ of 09-GGG-1
         //-----------------------------------------------------------------------------------
         var charcode = tKenteken.charCodeAt(5);
         if (!((charcode >= 48) && (charcode <= 57))) fNieuwKenteken = false;
      }
      for (var iTeller=0;iTeller<6;iTeller++)
      {
         if (((charcode >= 48) && (charcode <= 57)) ||((charcode >= 65) && (charcode <= 90)))
         {
            tResult+=tKenteken.substr(iTeller,1);
            if ((iTeller==1) ||
               ((iTeller==4) && fNieuwKenteken) ||
               ((iTeller==3) && !fNieuwKenteken)
               )
               tResult+="-";
         }
         else
         {
               return "";
         }
      }
   }
}
return tResult;
}
    
function trim(sString)
{
  while (sString.substring(0,1) == ' ')
  {
    sString = sString.substring(1, sString.length);
  }
  while (sString.substring(sString.length-1, sString.length) == ' ')
  {
     sString = sString.substring(0,sString.length-1);
  }
  return sString;
}
  

});