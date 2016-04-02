
(function() {
	'use strict';

// body view controller
	angular
		.module('IVA')
		.controller('BodyCtrl',function($scope, $location, keywordsFactory, speechFactory){
			this.keywords = {};
			this.relatedSearches = {};
			this.mainRelatedSearches = {};
			this.IDcardRelatedSearches = {};
			$scope.speechResponses = [];
			$scope.txt = {};
			$scope.txt.input = '';
			$scope.matchedResponse = ''
			$scope.online2 = true;

			// keeps an eye on connection status, calls noConnection page
			$scope.$watch('online',function(){
				if(!$scope.online){
//					$location.path("/noConnection");
				}
			});

			// loads in the keywords that determine which tile is displayed
			var promise = keywordsFactory.getKeywords();
			promise.then(function(keywordData){
				$scope.keywords = keywordData;
			});

			// sets up the list of related searches for each card
			var promise = keywordsFactory.getRelatedSearches();
			promise.then(function(relatedSearchesData){
				$scope.relatedSearches = relatedSearchesData;
				$scope.mainRelatedSearches = relatedSearchesData[0].main;
				$scope.IDcardRelatedSearches = relatedSearchesData[1].IDcard;
				$scope.deductibleRelatedSearches = relatedSearchesData[2].deductible;
				$scope.claimRelatedSearches = relatedSearchesData[3].claim;
				$scope.paymentRelatedSearches = relatedSearchesData[4].payment;
				$scope.urgentCareRelatedSearches = relatedSearchesData[5].urgentCare;
				$scope.errorRelatedSearches = relatedSearchesData[6].error;
			});

			$scope.$watch('speechResponses', function() {
				var tile = '', response = '', outmessage = '';

				if(!$scope.online){
					$location.path("/noConnection")
				} else {
					// this prevents inspecting it on var instantiation
					if($scope.speechResponses.length > 0){
						// loop through all the speech-to-text responses
						for (var j = $scope.speechResponses.length - 1; j >= 0; j--) {
							// loop through all of the keywords for a match
							for (var i = $scope.keywords.length - 1; i >= 0; i--) {
								if($scope.speechResponses[j].toLowerCase().indexOf($scope.keywords[i].keyword) != -1){
									// take the first match
									if(tile == ''){
										tile = $scope.keywords[i].tile;
										response = $scope.speechResponses[j];
										outmessage = $scope.keywords[i].outmessage;
									}
								}
							};
						};
						// if a match was found
						if(tile != ''){
							$location.path("/" + tile)
							$scope.matchedResponse = response;

							TTS.speak(outmessage, function() {
								//success
							}, function(error) {
								console.log(error);
							});

						} else {
							$location.path("/error")
							$scope.matchedResponse = $scope.speechResponses[0];
							outmessage = 'sorry, we did not catch that, please try again';

							TTS.speak(outmessage, function() {
								//success
							}, function(error) {
								console.log(error);
							});

						}
					}
				}
			});
			$scope.goHome = function(){
				$location.path('/main');
			};
			$scope.speechToText = function(){
				$scope.txt.input = "";
				var promise = speechFactory.convertSpeechToText();
				promise.then(function(words){
					$scope.speechResponses = words;
				});
			};
			$scope.textToText = function(){
				$scope.speechResponses = [$scope.txt.input];
				$scope.txt.input = "";
			};
			$scope.goOffline = function(){
				// $scope.online=!$scope.online;
				// if($scope.txt.input == 'x'){
				// 	$scope.online2 = !$scope.online2;
				// }
			}


// 	// Wait for device API libraries to load
// 	//
// 	document.addEventListener("deviceready", onDeviceReady, false);

// 	// device APIs are available
// 	//
// 	function onDeviceReady() {
// 		checkConnection();
// 	}
// 	function checkConnection() {
// 		var networkState = navigator.connection.type;
// console.log('networkState',networkState);
// 		var states = {};
// 		states[Connection.UNKNOWN]  = 'Unknown connection';
// 		states[Connection.ETHERNET] = 'Ethernet connection';
// 		states[Connection.WIFI]     = 'WiFi connection';
// 		states[Connection.CELL_2G]  = 'Cell 2G connection';
// 		states[Connection.CELL_3G]  = 'Cell 3G connection';
// 		states[Connection.CELL_4G]  = 'Cell 4G connection';
// 		states[Connection.CELL]     = 'Cell generic connection';
// 		states[Connection.NONE]     = 'No network connection';

// 		console.log('Connection type: ' + states[networkState]);
// 	}




		});

})();
