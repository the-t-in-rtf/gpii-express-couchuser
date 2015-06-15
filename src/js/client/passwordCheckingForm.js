// A common grade for forms where a password is entered or changed.  Prevents submission unless the passwords match.
//
/* global fluid, jQuery */
(function () {
    "use strict";
    var gpii = fluid.registerNamespace("gpii");
    fluid.registerNamespace("gpii.express.couchuser.frontend.passwordCheckingForm");

    gpii.express.couchuser.frontend.passwordCheckingForm.checkPasswords = function (that) {
        that.passwordsMatch = (that.model.password === that.model.confirm);

        if (that.error) {
            if (that.passwordsMatch) {
                that.error.applier.change("message", null);
            }
            else {
                that.error.applier.change("message", that.options.messages.passwordsDontMatch);
            }
        }
    };

    // Override the default submission to add additional checks.  Only continue if the checks pass.
    gpii.express.couchuser.frontend.passwordCheckingForm.checkAndSubmit = function (that, event) {
        if (that.passwordsMatch) {
            that.continueSubmission(event);
        }
        else {
            event.preventDefault();
        }
    };

    fluid.defaults("gpii.express.couchuser.frontend.passwordCheckingForm", {
        gradeNames: ["gpii.templates.hb.client.templateFormControl", "autoInit"],
        model: {
            password: null,
            confirm:  null
        },
        members: {
            passwordsMatch: false
        },
        messages: {
            passwordsDontMatch: {
                message: "The passwords you have entered don't match."
            }
        },
        modelListeners: {
            password: {
                funcName: "gpii.express.couchuser.frontend.passwordCheckingForm.checkPasswords",
                args:     ["{that}"]
            },
            confirm: {
                funcName: "gpii.express.couchuser.frontend.passwordCheckingForm.checkPasswords",
                args:     ["{that}"]
            }
        },
        selectors: {
            confirm:  "input[name='confirm']",
            password: "input[name='password']"
        },
        // TODO:  Figure out how to safely combine these.
        bindings: [
            {
                selector: "confirm",
                path:     "confirm"
            },
            {
                selector: "password",
                path:     "password"
            }
        ],
        invokers: {
            submitForm: {
                funcName: "gpii.express.couchuser.frontend.passwordCheckingForm.checkAndSubmit",
                args:     ["{that}", "{arguments}.0"]
            },
            continueSubmission: {
                funcName: "gpii.templates.hb.client.templateFormControl.submitForm",
                args:     ["{that}", "{arguments}.0"]
            }
        }
    });
})(jQuery);