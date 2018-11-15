(function (app) {
    'use strict';

    app.factory('companyService', companyService);

    companyService.$inject = ['$http', '$window'];

    function companyService($http, $window) {
        let services = {};

        const url = "/Admin#!/company";
        const odataURL = "/odata/CompaniesOData";


        // --- OData ---
        services.GetUrlODataForDataGrid = function(query) {
            return odataURL + "?" + query;
        };

        //--- API ---

        // Create
        services.Create = function (post) {
            return $http.post(odataURL, post);
        };

        // Edit
        services.Edit = function (id, post) {
            return $http.put(odataURL + '/' + id, post);
        };

        // Get
        services.GetById = function (id) {
            return $http.get(odataURL + '/' + id);
        };

        // Delete List
        services.DeleteList = function (ids) {
            return $http.delete(odataURL + '?ids=' + ids);
        };

        // --- REDIRECT ---

        // Redirect List
        services.RedirectToList = function (id) {
            $window.location.href = url;
        };

        // Redirect Edit
        services.RedirectToEdit = function (id) {
            $window.location.href = url + '/edit/' + id;
        };

        // Redirect After Edit
        services.RedirectAfterEdit = function (request) {
            switch (request) {
                case 'Edit':
                    Init();
                    break;
                case 'New':
                    $window.location.href = url + '/edit';
                    break;
                case 'Exit':
                    $window.location.href = url;
                    break;
            }
        };

        // Redirect Create
        services.RedirectToCreate = function () {
            $window.location.href = url + '/create';
        };

        // Redirect After Create
        services.RedirectAfterCreate = function (request, id) {
            switch (request) {
                case 'Edit':
                    $window.location.href = url + '/edit/' + id;
                    break;
                case 'New':
                    Init();
                    break;
                case 'Exit':
                    $window.location.href = url;
                    break;
            }
        };
        
        //Redirect Cancel
        services.RedirectToCancel = function () {
            $window.location.href = url;
        };

        return services;
    }

})(angular.module('backend'));