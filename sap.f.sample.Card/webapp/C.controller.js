sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.sample.Card.C", {
		onInit: function () {
			var oCitiesModel = new JSONModel(sap.ui.require.toUrl("sap/f/sample/Card/model/cities.json")),
				oProductsModel = new JSONModel(sap.ui.require.toUrl("sap/f/sample/Card/model/products.json"));

			// Set the models on the view
			this.getView().setModel(oCitiesModel, "cities");

			// Update the product status and sort them before setting the model
			oProductsModel.attachRequestCompleted(function () {
				this._updateProductStatus(oProductsModel);
				this.getView().setModel(oProductsModel, "products");
			}.bind(this));
		},
		onBookPress: function () {
			MessageToast.show("By pressing the 'Book' button a new application can be opened where the actual booking happens. This can be in the same window, in a new tab or in a dialog.");
		},
		_updateProductStatus: function (oModel) {
			var aProducts = oModel.getData().productItems;
			aProducts.forEach(function (product) {
				if (product.stockAvailable > 400) {
					product.status = "ok";
					product.statusSchema = "Success";
				} else if (product.stockAvailable >= 100 && product.stockAvailable <= 399) {
					product.status = "warning";
					product.statusSchema = "Warning";
				} else {
					product.status = "low";
					product.statusSchema = "Error";
				}
			});

			// Sort the array with 'Error' at the top, then 'Warning', then 'Success'
			aProducts.sort(function (a, b) {
				var statusPriority = {
					"Error": 3, // highest priority
					"Warning": 2,
					"Success": 1 // lowest priority
				};
				return statusPriority[b.statusSchema] - statusPriority[a.statusSchema];
			});

			oModel.refresh(true); // Refresh the model to update the view
		}
	});
});