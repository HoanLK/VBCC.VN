(function (app) {
    'use strict';

    app.controller('companyListController', companyListController);

    companyListController.$inject = ['$scope', 'ArrayService', 'CommonService', 'DevExtremeService', 'companyService'];

    function companyListController($scope, ArrayService, CommonService, DevExtremeService, companyService) {
        var vm = this;

        //---VARIABLE---
        //Page
        vm.page = {
            title: "Danh sách Công ty"
        };
        //Company
        vm.company = {};
        vm.gridCompanies = {};
        vm.deleteCompany = {
            status: false,
            title: "Bạn có chắc chắn muốn xóa?",
            popup: {
                width: "auto",
                height: "auto",
                contentTemplate: "templateDeleteCompany",
                showTitle: false,
                bindingOptions: {
                    visible: "vm.deleteCompany.status"
                }
            }
        };

        Init();

        //---FUNCTION---
        function Init() {
            InitDataGridCompanies();
        }

        // Khởi tạo DataGrid Companies
        function InitDataGridCompanies() {
            // Lấy template từ Devextreme Service
            vm.gridCompanies = angular.copy(DevExtremeService.DefaultGrid);
            // Lấy Instance của DataGrid
            vm.gridCompanies.onInitialized = function (e) {
                vm.gridCompaniesInstance = e.component;
            };
            // Gán Data Source - OData
            vm.gridCompanies.dataSource = {
                store: {
                    type: "odata",
                    url: companyService.GetUrlODataForDataGrid("$select=Id,CategoryId,FullName,ShortName,Alias,Slogan,Intro,Logo")
                }
            };
            // Binding khóa ngoại hoặc mảng trung gian
            vm.gridCompanies.bindingOptions = {};
            //Thiết lập cột
            vm.gridCompanies.columns = [
                { //0 - Button Sửa / Xóa
                    type: "buttons",
                    width: 80,
                    buttons: [{
                            cssClass: "button-devextreme-grid btn btn-icon-only yellow-crusta",
                            hint: "Sửa",
                            icon: "edit",
                            onClick: function (e) {
                                vm.Edit(e.row.data.Id._value);
                                e.component.refresh(true);
                                e.event.preventDefault();
                            }
                        },
                        {
                            cssClass: "button-devextreme-grid btn btn-icon-only red-mint",
                            hint: "Xóa",
                            icon: "trash",
                            onClick: function (e) {
                                vm.Delete(e.row.data.Id._value);
                                e.component.refresh(true);
                                e.event.preventDefault();
                            }
                        }
                    ],
                    fixed: false
                },
                { //1
                    caption: "Logo",
                    dataField: "Logo",
                    width: 100,
                    allowFiltering: false,
                    allowSorting: false,
                    cellTemplate: "logoCellTemplate"
                },
                { //2
                    caption: "ID",
                    dataField: "Id",
                    minWidth: 60,
                    visible: false,
                },
                { //3
                    caption: "Tên đầy đủ",
                    dataField: "FullName",
                    dataType: "string",
                    minWidth: 150
                },
                { //4
                    caption: "Tên viết tắt",
                    dataField: "ShortName",
                    dataType: "string",
                    minWidth: 150
                },
                { //5
                    caption: "Alias",
                    dataField: "Alias",
                    dataType: "string",
                    minWidth: 150
                },
                { //6
                    caption: "Slogan",
                    dataField: "FulSloganlName",
                    dataType: "string",
                    minWidth: 150
                },
                { //7
                    caption: "Intro",
                    dataField: "Intro",
                    dataType: "string",
                    minWidth: 150,
                    visible: false
                }
            ];
            // Export
            vm.gridCompanies.export = {
                allowExportSelectedData: true,
                enabled: true,
                excelFilterEnabled: true,
                excelWrapTextEnabled: true,
                fileName: "Danh sách Công ty",
                texts: {
                    exportAll: "Xuất toàn bộ Dữ liệu",
                    exportSelectedRows: "Xuất dữ liệu đang chọn",
                    exportTo: "Trích xuất"
                }
            };
            // Summary
            vm.gridCompanies.summary = {
                texts: {
                    count: "{0}",
                    sum: "{0}"
                },
                groupItems: [{
                    column: "Id",
                    summaryType: "count"
                }],
                totalItems: [{
                    column: "Id",
                    summaryType: "count"
                }]
            };
            // Toolbar
            vm.gridCompanies.onToolbarPreparing = function (e) {
                let dataGrid = e.component;

                e.toolbarOptions.items.unshift(
                    //RIGHT
                    { //Thêm
                        location: "before",
                        widget: "dxButton",
                        options: {
                            hint: "Thêm",
                            icon: "add",
                            type: "success",
                            text: "Thêm",
                            onClick: function () {
                                vm.Create();
                            }
                        }
                    }
                );
            };
            // Double Click
            vm.gridCompanies.onRowClick = function (e) {
                let component = e.component;

                if (!component.clickCount)
                    component.clickCount = 1;
                else
                    component.clickCount = component.clickCount + 1;

                if (component.clickCount === 1) {
                    component.lastClickTime = new Date();
                    setTimeout(function () {
                        component.lastClickTime = 0;
                        component.clickCount = 0;
                    }, 350);
                } else if (component.clickCount === 2) {
                    let now = new Date();
                    if (now - component.lastClickTime < 300) {
                        vm.Edit(e.data.Id._value);
                    }

                    // Reset your click info
                    component.clickCount = 0;
                    component.lastClickTime = 0;
                }
            };
        }

        //Create
        vm.Create = function () {
            companyService.RedirectToCreate();
        };

        //Edit
        vm.Edit = function (id) {
            console.log("Edit: " + id);
        };

        //Delete
        vm.Delete = function (id) {
            console.log("Delete: " + id);

            vm.deleteCompany.status = true;
        };
        vm.ConfirmDelete = function () {
            //Lấy mảng id cần xóa "id1,id2,id3..."
            var arrayIds = ArrayService.GetArrayIds(vm.selectedPosts);

            //Xóa
            postService.DeleteList(arrayIds)
                .then(function success(response) {
                    //Refresh
                    vm.gridCompaniesInstance.refresh();

                    vm.deletePost.status = false;
                    toastr.success("Xóa thành công");
                }, function error(response) {
                    toastr.error("Không thể xóa");
                });
        };
        vm.CancelDelete = function () {
            vm.deletePost.status = false;
        };
    }

})(angular.module('backend'));