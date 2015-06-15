// Present a standard set of user controls with login/logout/profile links
/* global fluid, jQuery */
(function ($) {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");
    fluid.registerNamespace("gpii.express.couchuser.frontend.controls");

    gpii.express.couchuser.frontend.controls.handleMenuKeys = function (that, event) {
        switch (event.keyCode) {
            case 27: // escape
                that.toggleMenu();
                break;
        }

        // TODO:  Eventually, we may want to take over control of "natural" arrow key handling using event.preventDefault()
    };

    gpii.express.couchuser.frontend.controls.handleToggleKeys = function (that, event) {
        switch (event.keyCode) {
            case 13: // enter
                that.toggleMenu();
                break;
        }
    };

    gpii.express.couchuser.frontend.controls.handleLogoutKeys = function (that, event) {
        switch (event.keyCode) {
            case 13: // enter
                that.submitForm(event);
                break;
        }
    };

    gpii.express.couchuser.frontend.controls.toggleMenu = function (that) {
        var toggle = that.locate("toggle");
        var menu   = that.locate("menu");

        if ($(menu).is(":hidden")) {
            menu.show();
            menu.focus();
        }
        else {
            menu.hide();
            toggle.focus();
        }
    };

    fluid.defaults("gpii.express.couchuser.frontend.controls", {
        gradeNames: ["gpii.templates.hb.client.templateFormControl", "autoInit"],
        ajaxOptions: {
            type:     "POST",
            url:      "/api/user/signout"
        },
        templates: {
            initial: "controls-viewport",
            success: "common-success",
            error:   "common-error"
        },
        rules: {
            model: {
                model: {
                    user: {
                        literalValue: null
                    }
                }
            },
            success: {
                "":        "notfound",
                "message": "notfound"
            }
        },
        selectors: {
            initial:  "",
            success:  ".controls-message",
            error:    ".controls-message",
            controls: ".user-controls",
            menu:     ".user-menu",
            logout:   ".user-menu-logout",
            toggle:   ".user-controls-toggle"
        },
        model: {
            user: null
        },
        modelListeners: {
            user: {
                func:          "{that}.renderInitialMarkup",
                excludeSource: "init"
            }
        },
        invokers: {
            toggleMenu: {
                funcName: "gpii.express.couchuser.frontend.controls.toggleMenu",
                args:     [ "{that}"]
            },
            handleMenuKeys: {
                funcName: "gpii.express.couchuser.frontend.controls.handleMenuKeys",
                args:     [ "{that}", "{arguments}.0"]
            },
            handleToggleKeys: {
                funcName: "gpii.express.couchuser.frontend.controls.handleToggleKeys",
                args:     [ "{that}", "{arguments}.0"]
            }
        },
        listeners: {
            onMarkupRendered: [
                {
                    "this":   "{that}.dom.logout",
                    "method": "click",
                    "args":   "{that}.submitForm"
                },
                {
                    "this":   "{that}.dom.logout",
                    "method": "keydown",
                    "args":   "{that}.handleLogoutKeys"
                },
                {
                    "this":   "{that}.dom.toggle",
                    "method": "click",
                    "args":   "{that}.toggleMenu"
                },
                {
                    "this":   "{that}.dom.toggle",
                    "method": "keydown",
                    "args":   "{that}.handleToggleKeys"
                },
                {
                    "this":   "{that}.dom.menu",
                    "method": "keydown",
                    "args":   "{that}.handleMenuKeys"
                }
            ]
        }
    });
})(jQuery);