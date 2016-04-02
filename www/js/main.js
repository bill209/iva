(function() {
	'use strict';

	angular
		.module('IVA',['ngRoute','ngAnimate']);

	// check online status
	angular
		.module('IVA')
		.run(function($window, $rootScope) {
			$rootScope.online = navigator.onLine;
			$window.addEventListener("offline", function () {
				$rootScope.$apply(function() {
					$rootScope.online = false;
				});
			  }, false);
			  $window.addEventListener("online", function () {
				$rootScope.$apply(function() {
					$rootScope.online = true;
				});
			  }, false);
		});

	// routing
	angular
		.module('IVA')
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				when('/main', {
					templateUrl: 'views/main.html'
				}).
				when('/IDcard', {
					templateUrl: 'views/IDcard.html'
				}).
				when('/deductible', {
					templateUrl: 'views/deductible.html'
				}).
				when('/claim', {
					templateUrl: 'views/claim.html'
				}).
				when('/payment', {
					templateUrl: 'views/payment.html'
				}).
				when('/urgentCare', {
					templateUrl: 'views/urgentCare.html'
				}).
				when('/error', {
					templateUrl: 'views/error.html'
				}).
				when('/noConnection', {
					templateUrl: 'views/noConnection.html'
				}).
				when('/ff', {
					templateUrl: 'views/ff.html'
				}).
				otherwise({
					redirectTo: '/main'
				});
			}
		]);

	// angular
	// 	.module('IVA')
	// 	.run(function($rootScope, $window) {
	// 	// publish current transition direction on rootScope
	// 	$rootScope.direction = 'ltr';
	// 	// listen change start events
	// 	$rootScope.$on('$routeChangeStart', function(event, next, current) {
	// 		$rootScope.direction = 'rtl';
	// 		// console.log(arguments);
	// 		if (current && next && (current.depth > next.depth)) {
	// 			$rootScope.direction = 'ltr';
	// 		}
	// 		// back
	// 		$rootScope.back = function() {
	// 			$window.history.back();
	// 		}
	// 	});
	// });

})();
