mainApp.controller("orderMenuCtrl", function ($scope, $routeParams, $http, $q, $cookies, Constant, HttpRequest, Model, Helper, Upload) {

	$scope.formLoad = function () {
		try {
			$scope.currentUser = JSON.parse($cookies.get('currentUser'));
		} catch (err) {
			$scope.currentUser = {};
		}
		$scope.renderDisplayMenu();
		$scope.renderAfterOrder();
		setInterval(() => {
			$scope.renderDisplayMenu();
			$scope.renderAfterOrder();
			console.log("Load 5 detik sekali");

		}, 5000);


	}

	$scope.renderDisplayMenu = () => {

		var month = new Array();
		month[0] = "01";
		month[1] = "02";
		month[2] = "03";
		month[3] = "04";
		month[4] = "05";
		month[5] = "06";
		month[6] = "07";
		month[7] = "08";
		month[8] = "09";
		month[9] = "10";
		month[10] = "11";
		month[11] = "12";

		$scope.date = new Date();
		var day = String($scope.date.getDate()).padStart(2, '0');
		var month = month[$scope.date.getMonth()];
		var year = $scope.date.getFullYear();

		var jam = $scope.date.getHours();
		var menit = $scope.date.getMinutes();

		$scope.waktuNow = jam + "." + menit;
		// console.log($scope.waktuNow);

		$scope.dateNow = day + "-" + month + "-" + year;

		// getShift
		var apiShift = "/api/Shift";
		HttpRequest.get(apiShift).success(function (response) {
			$scope.date = new Date();
			var jam = $scope.date.getHours();
			var menit = $scope.date.getMinutes();

			$scope.waktuNow = jam + "." + menit;


			$scope.masterShift = response.items;
			console.log(JSON.stringify($scope.masterShift));

			angular.forEach($scope.masterShift, function (response) {


				// console.log(response);
				if ($scope.waktuNow >= response.jamMulai && $scope.waktuNow <= response.jamSelesai) {
					$scope.namaShift = response.namaShift;
					$scope.idShift = response.id;
					console.log(("nama shift:" + $scope.namaShift));

					var apiUrl = "/api/orderMenu/getListDaftarMenu?shift=" + $scope.idShift + "&date=" + $scope.dateNow;
					console.log(apiUrl);

					HttpRequest.get(apiUrl).success(function (response) {
						$scope.listDisplayMenu = response.items;
					})
				}
			});
		})
	}

	$scope.renderAfterOrder = () => {
		var month = new Array();
		month[0] = "01";
		month[1] = "02";
		month[2] = "03";
		month[3] = "04";
		month[4] = "05";
		month[5] = "06";
		month[6] = "07";
		month[7] = "08";
		month[8] = "09";
		month[9] = "10";
		month[10] = "11";
		month[11] = "12";

		$scope.date = new Date();
		var day = String($scope.date.getDate()).padStart(2, '0');
		var month = month[$scope.date.getMonth()];
		var year = $scope.date.getFullYear();

		var jam = $scope.date.getHours();
		var menit = $scope.date.getMinutes();

		$scope.waktuNow = jam + "." + menit;
		// console.log($scope.waktuNow);

		$scope.dateNow = day + "-" + month + "-" + year;

		// getShift
		var apiShift = "/api/Shift";
		HttpRequest.get(apiShift).success(function (response) {
			$scope.date = new Date();
			var jam = $scope.date.getHours();
			var menit = $scope.date.getMinutes();

			$scope.waktuNow = jam + "." + menit;


			$scope.masterShift = response.items;
			console.log(JSON.stringify($scope.masterShift));

			angular.forEach($scope.masterShift, function (response) {


				// console.log(response);
				if ($scope.waktuNow >= response.jamMulai && $scope.waktuNow <= response.jamSelesai) {
					$scope.namaShift = response.namaShift;
					$scope.idShift = response.id;
					console.log(("nama shift:" + $scope.namaShift));

					var apiUrl = "/api/orderMenu/getListOrdered?shift=" + $scope.idShift + "&date=" + $scope.dateNow + "&username=" + $scope.currentUser.username;
					console.log(apiUrl);

					HttpRequest.get(apiUrl).success(function (response) {
						$scope.listAfterOrder = response.items;
					})
				}
			});
		})
	}

	$scope.listPesanan = [];
	$scope.pilihMenu = function (item) {
		// console.log(item);
		$scope.listPesanan.push(item);

	}

	$scope.orderMenu = function (list) {
		// console.log(JSON.stringify(list));
		if (list != "") {
			// console.log("1");
			$scope.formOrder = {
				username: $scope.currentUser.username,
				date: $scope.dateNow,
				shift: $scope.idShift,
				createdBy: $scope.currentUser.username,
				detailOrder: list
			}
			console.log(JSON.stringify($scope.formOrder));

			var apiUrl = "/api/orderMenu/addOrderMenu";
			HttpRequest.post(apiUrl, $scope.formOrder).success(function (response) {
				console.log(JSON.stringify(response));
				if (response.status == "failed") {
					swal("", "Menu Sudah Di Order, Silahkan Pilih Menu Lain", "info");
				} else {
					swal("", "Menu Berhasil Dipesan", "success");
					$scope.renderAfterOrder();

				}
				$scope.listPesanan = [];
			})


		} else {
			// console.log("2");

			swal("", "Order Menu Terlebih Dahulu", "info");
		}


	}

	$scope.hapusItemOrder = function (index) {
		$scope.listPesanan.splice(index, 1);
	}

	$scope.formLoad();
})