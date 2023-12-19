sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
    "use strict"

    return ManagedObject.extend("sap.ui5.shelfReplenishmentReport.controller.HelloDialog.js", {

        constructor: function (oView) {
            this._oView = oView
        },
        exit: function () {
            delete this._oView;
        },

        open: function () {
            var oView = this._oView

            if (!oView.byId("helloDialog")) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        oView.byId("helloDialog").close();
                    }
                }

                // load async XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui5.shelfReplenishmentReport.fragment.PanelDialogShReRe",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // connect dialog to the root view of the componet (models, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                oView.byId("helloDialog").open();
            }
        }
    });
})