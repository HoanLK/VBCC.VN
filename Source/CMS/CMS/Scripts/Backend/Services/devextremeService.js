(function (app) {
    'use strict';

    app.factory('DevExtremeService', DevExtremeService);

    DevExtremeService.$inject = ['$http'];

    function DevExtremeService($http) {
        var services = {};

        //Default Grid
        services.DefaultGrid = {
            accessKey: null,
            activeStateEnabled: false,
            allowColumnReordering: true,
            allowColumnResizing: true,
            cacheEnabled: true,
            cellHintEnabled: true,
            columnAutoWidth: true,
            columnChooser: {
                allowSearch: true,
                emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
                enabled: true,
                height: 260,
                mode: "select",
                searchTimeout: 500,
                title: "Lựa chọn cột",
                width: 250
            },
            columnFixing: {
                enabled: true,
                texts: {
                    fix: "Cố định cột",
                    leftPosition: "Bên trái",
                    rightPosition: "Bên phải",
                    unfix: "Hủy cố định"
                }
            },
            columnHidingEnabled: false,
            columnMinWidth: undefined,
            columnResizingMode: "widget",
            columnWidth: undefined,
            customizeColumns: null,
            customizeExportData: null,
            dateSerializationFormat: "MM/dd/yyyy",
            disabled: false,
            editing: {
                allowAdding: false,
                allowDeleting: false,
                allowUpdating: false,
                form: null,
                mode: "cell",
                popup: null,
                refreshMode: "full",                
                texts: {
                    addRow: "Thêm",
                    cancelAllChanges: "Không thay đổi",
                    cancelRowChanges: "Hủy",
                    confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                    confirmDeleteTitle: "",
                    deleteRow: "Xóa",
                    editRow: "Sửa",
                    saveAllChanges: "Lưu thay đổi",
                    saveRowChanges: "Lưu",
                    undeleteRow: "Không xóa",
                    validationCancelChanges: "Hủy thay đổi"
                },
                useIcons: false
            },
            elementAttr: {},
            errorRowEnabled: true,
            filterBuilder: {},
            filterBuilderPopup: {},
            filterPanel: {
                customizeText: null,
                filterEnabled: true,
                texts: {
                    clearFilter: "Bỏ lọc",
                    createFilter: "Tạo bộ lọc",
                    filterEnableHint: "Kích hoạt bộ lọc"
                },
                visible: false
            },
            filterRow: {
                applyFilter: "auto",
                applyFilterText: "Áp dụng bộ lọc",
                betweenEndText: "Kết thúc",
                betweenStartText: "Bắt đầu",
                operationDescriptions: {
                    between: "Giữa",
                    contains: "Chứa",
                    endsWith: "Kết thúc với",
                    equal: "Bằng",
                    greaterThan: "Lớn hơn",
                    greaterThanOrEqual: "Lớn hơn hoặc bằng",
                    lessThan: "Nhỏ hơn",
                    lessThanOrQual: "Nhỏ hơn hoặc bằng",
                    notContains: "Không chứa",
                    notEqual: "Không bằng",
                    startsWith: "Bắt đầu với"
                },
                resetOperationText: "Thiết lập lại",
                showAllText: "(Tất cả)",
                showOperationChooser: true,
                visible: true
            },
            filterSyncEnabled: null,
            filterValue: null,
            focusedColumnIndex: -1,
            focusedRowEnabled: false,
            focusedRowIndex: -1,
            focusedRowKey: undefined,
            focusStateEnabled: false,
            grouping: {
                allowCollapsing: true,
                autoExpandAll: true,
                contextMenuEnabled: true,
                expandMode: "rowClick",
                texts: {
                    groupByThisColumn: "Nhóm theo Cột này",
                    groupContinuedMessage: "Tiếp tục từ trang trước",
                    groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                    ungroup: "Bỏ nhóm",
                    ungroupAll: "Bỏ tất cả nhóm"
                }
            },
            groupPanel: {
                allowColumnDragging: true,
                emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
                visible: false
            },
            headerFilter: {
                allowSearch: false,
                height: 325,
                searchTimeout: 500,
                texts: {
                    cancel: "Hủy",
                    emptyValue: "(Trống)",
                    ok: "Đồng ý"
                },
                visible: false,
                width: 252
            },
            height: "100%",
            highlightChanges: false,
            hint: undefined,
            hoverStateEnabled: true,
            keyExpr: undefined,
            loadPanel: {
                enabled: true,
                height: 90,
                indicatorSrc: '/Content/Backend/Templates/metronic475/my/ajax-loader.gif',
                shading: true,
                shadingColor: "",
                showIndicator: true,
                text: "Đang tải ...",
                width: 200
            },
            masterDetail: {
                autoExpandAll: false,
                enabled: false,
                template: null
            },
            noDataText: "Không có dữ liệu",
            pager: {
                allowedPageSizes: "auto",
                infoText: "Trang {0} trên {1} ({2} bản ghi)",
                showInfo: true,
                showNavigationButtons: true,
                showPageSizeSelector: true,
                visible: true
            },
            paging: {
                enabled: true,
                pageIndex: 0,
                pageSize: 50
            },
            remoteOperations: {
                filtering: true,
                grouping: true,
                groupPaging: true,
                paging: true,
                sorting: true,
                summary: true
            },
            renderAsync: false,
            repaintChangesOnly: false,
            rowAlternationEnabled: false,
            rowTemplate: null,
            rtlEnabled: false,
            scrolling: {
                columnRenderingMode: "standard",
                mode: "standard",
                preloadEnabled: true,
                rowRenderingMode: "standard",
                scrollByContent: true,
                scrollByThumb: true,
                showScrollbar: "always",
                useNative: true
            },
            searchPanel: {
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Tìm kiếm ...",
                searchVisibleColumnsOnly: false,
                text: "",
                visible: false,
                width: 160
            },
            selectedRowKeys: null,
            selection: {
                allowSelectAll: false,
                deferred: false,
                mode: "none",
                selectAllMode: "allPages",
                showCheckBoxesMode: "onClick"
            },
            selectionFilter: [],
            showBorders: true,
            showColumnHeaders: true,
            showColumnLines: true,
            showRowLines: true,
            sorting: {
                ascendingText: "Sắp xếp Tăng dần",
                clearText: "Xóa Sắp xếp",
                descendingText: "Sắp xếp Giảm dần",
                mode: "multiple"
            },
            stateStoring: {
                customLoad: null,
                customSave: null,
                enabled: false,
                saveingTimeout: 2000,
                type: "localStorage",
                storageKey: "storage"
            },
            tabIndex: 0,
            twoWayBindingEnabled: false,
            visible: true,
            width: undefined,
            wordWrapEnabled: false
        };

        //Default ContextMenu Grid
        services.DefaultContextMenuGrid = [
            { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
            { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
            { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
        ];

        //Template ContextMenu Grid
        services.TemplateContextMenuGrid = function (itemData, itemIndex, itemElement) {
            var template = $('<div></div>');
            if (itemData.icon) {
                template.append('<span class="' + itemData.icon + '"><span>');
            }
            template.append(itemData.text);
            return template;
        };

        return services;
    }


})(angular.module('backend'));
