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
        return Controller.extend("com.demo.ztabledemo.controller.Page6", {
            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            onInit: function () {
                controller = this;
                var listModel = new sap.ui.model.json.JSONModel();
                controller.getView().setModel(listModel, "listModel");
                controller.getView().getModel("listModel").setData({});

                var singleOrderModel = new sap.ui.model.json.JSONModel();
                controller.getView().setModel(singleOrderModel, "singleOrderModel");
                controller.getView().getModel("singleOrderModel").setData({});

                var singleModel = new sap.ui.model.json.JSONModel();
                controller.getView().setModel(singleModel, "singleModel");
                controller.getView().getModel("singleModel").setData({});

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this).getRoute("Page6");
                oRouter.attachMatched(controller._onRouteMatched, this);
            },
            _onRouteMatched:()=>{
                debugger;
                controller.allOrders();
            },
            onPageNavButtonPress: () => {
                controller.getOwnerComponent().getRouter().navTo("RouteLandingPage", true);
                controller.clearItemsTab();
            },
            clearItemsTab: () => {
                controller.getView().byId("firstItem").setVisible(false);
                //controller.getView().byId("secondItem").setVisible(false);
                //controller.getView().byId("thirdItem").setVisible(false);
                //controller.getView().byId("fourthItem").setVisible(false);
            },
            _firstItemPress: (event) => {
                console.log(event);
                var selectedOrder = event.getSource().getProperty("title");
                controller.readOrders(selectedOrder);
                debugger;
                controller.getView().byId("firstItem").setVisible(true);

                //controller.getView().byId("secondItem").setVisible(false);
                //controller.getView().byId("thirdItem").setVisible(false);
                //controller.getView().byId("fourthItem").setVisible(false);
            },
            _secondItemPress: () => {
                controller.getView().byId("firstItem").setVisible(false);
                controller.getView().byId("secondItem").setVisible(true);
                controller.getView().byId("thirdItem").setVisible(false);
                controller.getView().byId("fourthItem").setVisible(false);
            },
            _thirdItemPress: () => {
                controller.getView().byId("firstItem").setVisible(false);
                controller.getView().byId("secondItem").setVisible(false);
                controller.getView().byId("thirdItem").setVisible(true);
                controller.getView().byId("fourthItem").setVisible(false);
            },
            _fourthItemPress: () => {
                controller.getView().byId("firstItem").setVisible(false);
                controller.getView().byId("secondItem").setVisible(false);
                controller.getView().byId("thirdItem").setVisible(false);
                controller.getView().byId("fourthItem").setVisible(true);
            },
            allOrders: () => {
                var oModel = controller.getOwnerComponent().getModel("purchaseOrder");
                var creator = "RBALAYAN";
                var filterByName = new sap.ui.model.Filter("CreatedBy", sap.ui.model.FilterOperator.EQ, creator);
                var filters = [];
                filters.push(filterByName);

                //var oModel = this.getView().getModel("/sap/opu/odata/SAP/ZSPA_PURCHASEORDER_SRV");
                oModel.read("/PurchaseOrderSet", {
                    filters: filters,
                    success: (oData) => {
                        var obj = JSON.stringify(oData);
                        console.log(typeof obj);
                        debugger;
                        oData.results.forEach(function (row) {
                            row.creator = "RBALAYAN";
                        });

                        oData.results.forEach(function (row) {
                            if (row.Status === "A") {
                                row.Status = "RFQ with Quotation";
                            } else if (row.Status === "B") {
                                row.Status = "PO from Automatic Conversion of Requisitions";
                            } else if (row.Status === "C") {
                                row.Status = "PO from Goods Receipt";
                            } else if (row.Status === "D") {
                                row.Status = "PO from Data Transfer";
                            } else if (row.Status === "E") {
                                row.Status = "PO from Allocation Table";
                            } else if (row.Status === "F") {
                                row.Status = "PO from Kanban";
                            } else if (row.Status === "G") {
                                row.Status = "PO from Store Order";
                            } else if (row.Status === "H") {
                                row.Status = "PO from DRP";
                            } else if (row.Status === "I") {
                                row.Status = "PO from BAPI";
                            } else if (row.Status === "J") {
                                row.Status = "PO from ALE Scenario";
                            } else if (row.Status === "L") {
                                row.Status = "Scheduling Agreement from CRM";
                            } else if (row.Status === "S") {
                                row.Status = "Collective PO";
                            } else if (row.Status === "X") {
                                row.Status = "PO Created via Function Module";
                            } else if (row.Status === "1") {
                                row.Status = "PO from APO";
                            } else if (row.Status === "9") {
                                row.Status = "Enjoy PO";
                            } else if (row.Status === "K") {
                                row.Status = "PO from BBP";
                            } else if (row.Status === "2") {
                                row.Status = "Third-Party Order from CRM";
                            } else if (row.Status === "3") {
                                row.Status = "Returns Order from Incorrect Delivery";
                            } else if (row.Status === "M") {
                                row.Status = "Purchasing Document from E-Sourcing";
                            } else if (row.Status === "4") {
                                row.Status = "Subsequent Stock Transport Order for Additional Item";
                            } else if (row.Status === "5") {
                                row.Status = "Incorrect Item Returns from Stock Transport Orders";
                            } else if (row.Status === "T") {
                                row.Status = "PO from Transportation Management";
                            } else if (row.Status === "N") {
                                row.Status = "Purchase Document from external Network / System";
                            } else if (row.Status === "R") {
                                row.Status = "S4CRM Service Order";
                            } else if (row.Status === "W") {
                                row.Status = "PO Ignored for Collective Delivery Run";
                            } else if (row.Status === "") {
                                row.Status = "None";
                            }

                        });

                        controller.getView().getModel("listModel").setData(oData);
                        //this.getView().setModel(listModel, "PsIDModel")
                        controller.getView().getModel("listModel").refresh();
                        debugger;
                        console.log(oData);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                })
            },
            readOrders: function (order) {
                debugger;
                var busyDialog = new sap.m.BusyDialog();
                busyDialog.open();
                //var oModel = this.getView().getModel("purchaseOrder");
                var oModel = this.getOwnerComponent().getModel("purchaseOrder");

                //var poNumber = "4500000017";
                var filterByNo = new sap.ui.model.Filter("PoNumber", sap.ui.model.FilterOperator.EQ, order);
                var filters = [];
                var sum = 0;
                filters.push(filterByNo);

                //var oModel = this.getView().getModel("/sap/opu/odata/SAP/ZSPA_PURCHASEORDER_SRV");
                //oModel.read("/PurchaseOrderSet(PoNumber='4500000977')", {
                //4500000977
                oModel.read("/PurchaseOrderSet(PoNumber='" + order + "')", {
                    //filters: filters,
                    urlParameters: {
                        "$expand": "HdrToItmNav"
                    },
                    success: (oData) => {
                        controller.getView().byId("firstItem").setVisible(true);
                        oData.HdrToItmNav.results.forEach(function (row) {
                            row.total = row.NetPrice * row.DispQuan;
                        });
                        for (var i = 0; i < oData.HdrToItmNav.results.length; i++) {
                            sum = sum + oData.HdrToItmNav.results[i].total;
                        }
                        busyDialog.close();

                        debugger;
                        controller.getView().getModel("singleOrderModel").setData(oData.HdrToItmNav);
                        controller.getView().getModel("singleModel").setData(oData);
                        controller.getView().getModel("singleModel").getData().itemCount = oData.HdrToItmNav.results.length;
                        controller.getView().getModel("singleModel").getData().totalPrice = sum;
                        controller.getView().getModel("singleOrderModel").refresh();
                        controller.getView().getModel("singleModel").refresh();
                        controller.getView().byId("idOrderTable").setHeaderText(order);
                        console.log(oData);
                    },
                    error: (error) => {
                        busyDialog.close();
                        controller.getView().byId("firstItem").setVisible(false);
                        MessageBox.error("For order " + order + ", " + error.message + ". \n\Please check the backend for more details.");
                        console.log(error);
                    }
                })
            },
        })
    }


);
