import { PATH } from "../PATH.namespace.js";

PATH.Product = (function (Product, $, undefined) {
    'use strict';

    //constructor
    Product = function (attributes) {
        this.attributes = $.extend({}, this.defaults, attributes);
    };

    //fields
    Product.prototype.attributes = null;
    Product.prototype.defaults = {
        id: null,
        name: '',
        categoryId: null,
        iconUrl: null,
        modelNumber: null,
        serialNumber: null,
        barcode: null
    };

    //functions

    return Product;
})(PATH.Product || {}, window.jQuery);