sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel"
],

    function (Controller, Fragment, MessageBox, MessageToast, Filter, JSONModel) {
        "use strict";
        var controller;
        return Controller.extend("com.demo.ztabledemo.controller.chargerCatalog", {
            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            /* onPageNavButtonPress: function() {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                var oQueryParams = this.getQueryParameters(window.location);
    
                if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteLandingPage", true);
                }
    
            }, */
            onPageNavButtonPress: () => {
                controller.getOwnerComponent().getRouter().navTo("RouteLandingPage", true);
            },
            _onButtonPress: function(oEvent) {

                var sDialogName = "Dialog7";
                this.mDialogs = this.mDialogs || {};
                var oDialog = this.mDialogs[sDialogName];
                if (!oDialog) {
                    oDialog = new Dialog7(this.getView());
                    this.mDialogs[sDialogName] = oDialog;
    
                    // For navigation.
                    oDialog.setRouter(this.oRouter);
                }
    
                var context = oEvent.getSource().getBindingContext();
                oDialog._oControl.setBindingContext(context);
    
                oDialog.open();
    
            },
            onInit: function() {
                controller = this;
                //this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //this.oRouter.getTarget("Catalog").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
    
            }
        })
    }


);
