sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {

    return Controller.extend("sap.ui5.shelfReplenishmentReport.controller.PanelShReRe", {
        onShowHello: function (oEvent) {
            // read message from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name")
            var sMsg = oBundle.getText("helloMsg", [sRecipient])
            //Show a native or vanilla JS alert
            MessageToast.show(sMsg);
        },
        onOpenDialog: function (){
            this.getOwnerComponent().openHelloDialog();
        }
    })
});