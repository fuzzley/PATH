import { PATH } from "./PATH.namespace.js";
import "./PATH/Product.js";

PATH.Page = (function (Page, $, ko) {
    'use strict';

    //fields
    Page.vm = null;

    Page.menus = [
        {
            url: 'Splash',
            name: 'Splash Menu',
            $element: '#menu-splash'
        },
        {
            url: 'Home',
            name: 'Main Menu',
            $element: '#menu-main'
        },
        {
            url: 'Search/Barcode',
            name: 'Search by Barcode',
            $element: '#menu-find-by-barcode',
            onLoad: function () {
                Page.vm.lastSearchFrom('#Search/Barcode');
            }
        },
        {
            url: 'Search/ModelNumber',
            name: 'Search by Model Number',
            $element: '#menu-find-by-model-number',
            onLoad: function () {
                Page.vm.lastSearchFrom('#Search/ModelNumber');
            }
        },
        {
            url: 'Search/Results',
            name: 'Search Results',
            $element: '#menu-search-results',
            onLoad: function (query) {
                Page.vm.lastSearchUrl(hasher.getHash());
                $('#searching-overlay').show();
                setTimeout(function () {
                    if (query && query.categoryId) {
                        Page.vm.products(Page.products.filter(function (product) {
                            return product.attributes.categoryId == query.categoryId;
                        }));
                    } else if (query && query.modelNumber) {
                        Page.vm.products(Page.products.filter(function (product) {
                            return product.attributes.modelNumber == query.modelNumber;
                        }));
                    } else if (query && query.barcode) {
                        Page.vm.products(Page.products.filter(function (product) {
                            return product.attributes.barcode == query.barcode;
                        }));
                    } else {
                        Page.vm.searchAll();
                    }
                }, 10);
                setTimeout(function () {
                    $('#searching-overlay').hide();
                }, 400);
            }
        },
        {
            url: 'Browse',
            name: 'Browse Appliances',
            $element: '#menu-browse'
        },
        {
            url: 'Browse/Mobile',
            name: 'Browse Appliances - Mobile Devices',
            $element: '#menu-browse-mobile',
            onLoad: function () {
                Page.vm.lastSearchFrom('#Browse/Mobile');
            }
        },
        {
            url: 'Browse/Entertainment',
            name: 'Browse Appliances - Home Entertainment',
            $element: '#menu-browse-entertainment',
            onLoad: function () {
                Page.vm.lastSearchFrom('#Browse/Entertainment');
            }
        },
        {
            url: 'Browse/Houseware',
            name: 'Browse Appliances - Houseware',
            $element: '#menu-browse-houseware',
            onLoad: function () {
                Page.vm.lastSearchFrom('#Browse/Houseware');
            }
        },
        {
            url: 'Browse/Computers',
            name: 'Browse Appliances - Computers',
            $element: '#menu-browse-computers',
            leadsToSearch: true,
            onLoad: function () {
                Page.vm.lastSearchFrom('#Browse/Computers');
            }
        },
        {
            url: 'Browse/Accessories',
            name: 'Browse Appliances - Accessories',
            $element: '#menu-browse-accessories',
            leadsToSearch: true,
            onLoad: function () {
                Page.vm.lastSearchFrom('#Browse/Accessories');
            }
        },
        {
            url: 'Appliance/Home',
            name: 'Appliance',
            $element: '#menu-appliance-main',
            onLoad: function (query) {
                if (query && query.id) {
                    var product = Page.products.filter(function (o) {
                        return o.attributes.id == query.id;
                    })[0];
                    if (product) {
                        Page.vm.currProduct(product);
                    }
                }
            }
        },
        {
            url: 'Appliance/SimpleManual',
            name: 'Appliance - Simple Manual',
            $element: '#menu-appliance-simple-manual',
            onLoad: function (query) {
                if (query && query.id) {
                    var product = Page.products.filter(function (o) {
                        return o.attributes.id == query.id;
                    })[0];
                    if (product) {
                        Page.vm.currProduct(product);
                    }
                }
            }
        },
        {
            url: 'Appliance/OriginalManual',
            name: 'Appliance - Original Manual',
            $element: '#menu-appliance-original-manual',
            onLoad: function (query) {
                if (query && query.id) {
                    var product = Page.products.filter(function (o) {
                        return o.attributes.id == query.id;
                    })[0];
                    if (product) {
                        Page.vm.currProduct(product);
                    }
                }
            }
        },
        {
            url: 'Appliance/Videos',
            name: 'Appliance - Videos',
            $element: '#menu-appliance-videos',
            onLoad: function (query) {
                if (query && query.id) {
                    var product = Page.products.filter(function (o) {
                        return o.attributes.id == query.id;
                    })[0];
                    if (product) {
                        Page.vm.currProduct(product);
                    }
                }
            }
        }
    ];
    Page.currentMenu = null;
    Page.ytVideos = [];

    Page.categoryIds = {
        //mobile
        CELL_PHONE: 'cellphone',
        TABLET: 'tablet',
        WATCH: 'watch',
        //entertainment
        TELEVISION: 'television',
        SPEAKERS: 'speakers',
        GAMING: 'gaming',
        //houseware
        WASHER_DRYER: 'washer-dryer',
        REFRIGERATOR: 'refrigerator',
        MICROWAVE: 'microwave',
        //computers
        MONITOR: 'monitor',
        DESKTOP: 'desktop',
        LAPTOP: 'laptop',
        //computers - accessories
        COMPUTER_SPEAKERS: 'computer-speakers',
        MOUSE: 'mouse',
        KEYBOARD: 'keyboard'
    };
    Page.productDescriptors = [
        { //television is first for demo purposes
            id: 'television01',
            name: '50" LG LED',
            categoryId: Page.categoryIds.TELEVISION,
            iconUrl: 'images/television01.jpg',
            modelNumber: '32LW5700',
            barcode: '5555555'
        },
        {
            id: 'cellphone01',
            name: 'Nokia Lumia',
            categoryId: Page.categoryIds.CELL_PHONE,
            iconUrl: 'images/cellphone01.jpg',
            modelNumber: '32LS5700',
            barcode: '55553255'
        },
        {
            id: 'tablet01',
            name: 'Apple iPad Air',
            categoryId: Page.categoryIds.TABLET,
            iconUrl: 'images/tablet01.jpg',
            modelNumber: '3ASLS5700',
            barcode: '325412'
        },
        {
            id: 'watch01',
            name: 'Pebble',
            categoryId: Page.categoryIds.WATCH,
            iconUrl: 'images/watch01.jpg',
            modelNumber: '41AASG32',
            barcode: '62341'
        },
        {
            id: 'television02',
            name: '29" LG LCD',
            categoryId: Page.categoryIds.TELEVISION,
            iconUrl: 'images/television02.jpg',
            modelNumber: '61223ASFG',
            barcode: '6234167'
        },
        {
            id: 'speakers01',
            name: 'Bose - CineMate',
            categoryId: Page.categoryIds.SPEAKERS,
            iconUrl: 'images/speakers01.jpg',
            modelNumber: 'HHSA32',
            barcode: '994556'
        },
        {
            id: 'speakers02',
            name: 'Bose - CineMate',
            categoryId: Page.categoryIds.COMPUTER_SPEAKERS,
            iconUrl: 'images/speakers01.jpg',
            modelNumber: 'HHSA33',
            barcode: '941256'
        },
        {
            id: 'gaming01',
            name: 'XBOX One',
            categoryId: Page.categoryIds.GAMING,
            iconUrl: 'images/gaming01.jpg',
            modelNumber: 'HAWE512',
            barcode: '76724'
        },
        {
            id: 'washer-dryer01',
            name: 'LG Gas Dryer',
            categoryId: Page.categoryIds.WASHER_DRYER,
            iconUrl: 'images/washer-dryer01.jpg',
            modelNumber: 'XCBR12512',
            barcode: '721222'
        },
        {
            id: 'refrigerator01',
            name: 'LG French Door',
            categoryId: Page.categoryIds.REFRIGERATOR,
            iconUrl: 'images/refrigerator01.jpg',
            modelNumber: '6234HHHSA',
            barcode: '723412343'
        },
        {
            id: 'microwave01',
            name: 'LG Fullsize Microwave',
            categoryId: Page.categoryIds.MICROWAVE,
            iconUrl: 'images/microwave01.jpg',
            modelNumber: '6234HHHSA',
            barcode: '723412343'
        },
        {
            id: 'monitor01',
            name: 'LG Black 22"',
            categoryId: Page.categoryIds.MONITOR,
            iconUrl: 'images/monitor01.jpg',
            modelNumber: '22MP55HQ',
            barcode: '7632422677'
        },
        {
            id: 'desktop01',
            name: 'Lenovo H530',
            categoryId: Page.categoryIds.DESKTOP,
            iconUrl: 'images/desktop01.jpg',
            modelNumber: '57324189',
            barcode: '666611125'
        },
        {
            id: 'laptop01',
            name: 'Toshiba - Satellite',
            categoryId: Page.categoryIds.LAPTOP,
            iconUrl: 'images/laptop01.jpg',
            modelNumber: 'HHA2315123',
            barcode: '612677'
        },
        {
            id: 'mice01',
            name: 'Logitech Wireless Mouse M320',
            categoryId: Page.categoryIds.MOUSE,
            iconUrl: 'images/accessory01.jpg',
            modelNumber: 'JUJSERY23',
            barcode: '72341651'
        },
        {
            id: 'keyboard01',
            name: 'Logitech Wireless Combo MK270',
            categoryId: Page.categoryIds.KEYBOARD,
            iconUrl: 'images/accessory02.jpg',
            modelNumber: 'HHAS35124',
            barcode: '722237788'
        }
    ];
    Page.products = []; //gets filled in inside _populateProducts, based on product descriptors

    //functions
    Page.initialize = function () {
        Page._populateProducts();

        //build up and apply knockout view model
        Page._initializeVM();
        ko.applyBindings(Page.vm);

        Page._initializeYoutubeVideos();
        Page._initializeRouting();

        if (Page.currentMenu == null) {
            hasher.setHash('#Splash');
        }
    };

    Page.stopAllYoutubeVideos = function () {
        Page.ytVideos.forEach(function (ytVideo) {
            if (ytVideo.stopVideo) {
                ytVideo.stopVideo();
            }
        });
    };

    Page.hideAllMenus = function () {
        Page.menus.forEach(function (menu) {
            $(menu.$element).hide();
        });
        $('#searching-overlay').hide();
    };

    Page._initializeYoutubeVideos = function () {
        Page.ytVideos.length = 0;

        var YT = window.YT || null;
        if (!YT || !YT.ready) { //in case we didn't load youtube player api, don't do anything
            return;
        } //else

        YT.ready(function () {
            Page.ytVideos.length = 0;
            var $players = $('iframe.video-iframe');
            for (var i = 0; i < $players.length; i++) {
                Page.ytVideos.push(new YT.Player($($players[i]).attr('id')));
            }
        });
    };

    Page._populateProducts = function () {
        Page.products.length = 0;
        Page.productDescriptors.forEach(function (descriptor) {
            Page.products.push(new PATH.Product(descriptor));
        });
    };

    Page._initializeRouting = function () {

        var initCrossroads = function () {

            Page.menus.forEach(function (menu) {
                crossroads.addRoute(menu.url + ':?query:', function (query) {
                    Page.hideAllMenus();
                    Page.stopAllYoutubeVideos();
                    $(menu.$element).show();
                    Page.currentMenu = menu;
                    if (typeof (Page.currentMenu.onLoad) === 'function') {
                        Page.currentMenu.onLoad.call(this, query);
                    }
                });
            });
        };

        var attachTargetRouteListener = function () {
            $('[data-targetRoute]').on('click', function (evt) {
                var target = $(evt.target).attr('data-targetRoute') || $(evt.target).closest('[data-targetRoute]').attr('data-targetRoute');
                var route = null;

                if (typeof (target) === 'string') {
                    route = target.replace('#', '');
                }

                if (route == null) {
                    return;
                } //else

                hasher.setHash(route);
            }.bind(this));
        };

        var initHasher = function () {
            //setup hasher
            var parseHash = function (newHash) {
                if (newHash) {
                    crossroads.parse(newHash);
                }
            };

            hasher.initialized.add(parseHash); //parse initial hash
            hasher.changed.add(parseHash); //parse hash changes
            hasher.init(); //start listening for history change
        };

        //initialize
        initCrossroads();
        attachTargetRouteListener();
        initHasher();
    };

    Page._initializeVM = function () {
        var numInstructions = 4;

        //general properties
        Page.vm = {};
        Page.vm.lastSearchFrom = ko.observable(null);
        Page.vm.lastSearchUrl = ko.observable(null);

        Page.vm.modelNumber = ko.observable('32LW5700');
        Page.vm.barcode = ko.observable('5555555');
        Page.vm.products = ko.observableArray(Page.products);
        Page.vm.currProduct = ko.observable(Page.products[0]);
        Page.vm.activeInstruction = ko.observable(1);

        Page.vm.decrActiveInstruction = function () {
            var instr = Page.vm.activeInstruction();
            if (instr > 1) {
                instr--;
                Page.vm.activeInstruction(instr);
            }
        };

        Page.vm.incrActiveInstruction = function () {
            var instr = Page.vm.activeInstruction();
            if (instr < numInstructions) {
                instr++;
                Page.vm.activeInstruction(instr);
            }
        };

        Page.vm.searchAll = function () {
            Page.vm.products(Page.products);
        };

        Page.vm.searchCategory = function (categoryId) {
            hasher.setHash('#Search/Results?categoryId=' + categoryId);
        };

        Page.vm.searchModelNumber = function (modelNumber) {
            hasher.setHash('#Search/Results?modelNumber=' + modelNumber);
        };

        Page.vm.searchBarcode = function (barcode) {
            hasher.setHash('#Search/Results?barcode=' + barcode);
        };

        Page.vm.navigateToProduct = function (product) {
            var target = 'Appliance/Home';
            if (product) {
                target += '?id=' + product.attributes.id;
            }

            hasher.setHash(target);
        };

        Page.vm.takeBarcodePicture = function () {
            var $capture = $('#barcode-capture-input');
            $capture.on('change', function () {
                var $capture2 = $('#barcode-capture-input');
                $capture2.replaceWith($capture2.clone(true));
                hasher.setHash('#Search/Results?barcode=5555555');
            });
            $capture.trigger('click');
        };

    };

    return Page;
})(PATH.Page || {}, window.jQuery, window.ko);

//when page loads, initialize page
$(document).ready(function () {
    PATH.Page.initialize();
});
