mainApp.controller("orderMenuCtrl", function ($scope, $routeParams, $http, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {

	$scope.formLoad = function () {
		$scope.renderMenu();
	}

	$scope.renderMenu = function () {
		$scope.listMenu = [{
				id: "1",
				namaMenu: "Daging Sapi Panggang",
				kalori: "70 Kl",
				alergi: "Gatal-gatal dll",
				imgUrl: "./../images/menu-makanan/mini-menu/menu1.jpg"
			},
			{
				id: "2",
				namaMenu: "Daging Sapi Panggang",
				kalori: "70 Kl",
				alergi: "Gatal-gatal dll",
				imgUrl: "./../images/menu-makanan/mini-menu/menu1.jpg"
			},
			{
				id: "3",
				namaMenu: "Daging Sapi Panggang",
				kalori: "70 Kl",
				alergi: "Gatal-gatal dll",
				imgUrl: "./../images/menu-makanan/mini-menu/menu1.jpg"
			},
			{
				id: "4",
				namaMenu: "Daging Sapi Panggang",
				kalori: "70 Kl",
				alergi: "Gatal-gatal dll",
				imgUrl: "./../images/menu-makanan/mini-menu/menu1.jpg"
			},
			{
				id: "5",
				namaMenu: "Daging Sapi Panggang",
				kalori: "70 Kl",
				alergi: "Gatal-gatal dll",
				imgUrl: "./../images/menu-makanan/mini-menu/menu1.jpg"
			},
			{
				id: "6",
				namaMenu: "Daging Sapi Panggang",
				kalori: "70 Kl",
				alergi: "Gatal-gatal dll",
				imgUrl: "./../images/menu-makanan/mini-menu/menu1.jpg"
			}
		]

		console.log(JSON.stringify($scope.listMenu));


	}

	$scope.listPesanan = [];
	$scope.pilihMenu = function (item) {
		console.log(item);
		$scope.listPesanan.push(item);

	}

	$scope.orderMenu = function (list) {
		console.log(JSON.stringify(list));
		if (list != "") {
			console.log("1");

			swal("", "Menu Berhasil Dipesan", "success");
			$scope.listPesanan = [];
		} else {
			console.log("2");

			swal("", "Order Menu Terlebih Dahulu", "info");
		}


	}

	$scope.hapusItemOrder = function (index) {
		$scope.listPesanan.splice(index, 1);
	}

	$scope.formLoad();
})