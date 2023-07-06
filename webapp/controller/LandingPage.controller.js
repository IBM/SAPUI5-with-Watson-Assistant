sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/core/Fragment",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, MessageBox) {
        "use strict";
        var controller;

        return Controller.extend("com.demo.ztabledemo.controller.LandingPage", {
            onInit: function () {
                controller = this;
                //var router = this.getOwnerComponent().getRouter();
                var dataModel = this.getOwnerComponent().getModel("tableData");
                this.getView().setModel(dataModel, "DataModel");

            },
            onGenericTilePress: function (oEvent) {
                controller.getOwnerComponent().getRouter().navTo("Page6", true);
            },
            onSearch: function (evt) {
                var itemSearched = evt.getParameter("query");
                debugger;
                if (itemSearched === "Pump" || itemSearched === "pump" || itemSearched === "PUMP") {
                    MessageBox.information("No results found, Please initiate an order via Watson Chat Bot");
                }
                else if (itemSearched === "Charger" || itemSearched === "charger" || itemSearched === "CHARGER") {
                    this.getOwnerComponent().getRouter().navTo("chargerCatalog", true);
                }
                else {
                    MessageBox.information("Please browse the catalog or initiate with Watson ChatBot", {
                        actions: ["Browse Catalog", sap.m.MessageBox.Action.CLOSE],
                        onClose: function (sButton) {
                            if (sButton === "Browse Catalog") {
                                this.getOwnerComponent().getRouter().navTo("Catalog", true);
                            }
                        }.bind(this)
                    });
                }
            },
            onPinnedPress:()=>{
                controller.getOwnerComponent().getRouter().navTo("Catalog", true);
            },
            onPress: function (evt) {
                var details = evt.getSource().getBindingContext("DataModel").getObject();

                var fragModel = new JSONModel();
                fragModel.setData(details);
                this.getView().setModel(fragModel, "fragModel");

                //this.getView().getModel("fragModel").getData().results = details;
                this.getView().getModel("fragModel").refresh();

                debugger;
                var sId = evt.getSource().sId;
                var index = sId.substring(sId.lastIndexOf("-") + 1);

                //var fragmentId = this.getView().createId("fr1");
                //var tab = Fragment.byId(this._pPopover, "list1");
                //var list = this.getView().byId("list1");






                debugger;
                var oButton = evt.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "com.demo.ztabledemo.view.devPopup",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }

                this._pPopover.then(function (oPopover) {
                    var tab = Fragment.byId(oPopover, "list1");
                    debugger;

                    oPopover.openBy(oButton);
                });
            }



            // set explored app's demo model on this sample
        });

    });
