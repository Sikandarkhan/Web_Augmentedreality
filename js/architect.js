var AR = AR || {};
AR.build = AR.build || {};
AR.build.mobile = true;
AR = AR || {};
AR.js = AR.js || {};
AR.js.clickbuster = {};
AR.js.clickbuster.preventGhostClick = function(a, b) {
    AR.js.clickbuster.coordinates.push(a, b);
    window.setTimeout(AR.js.clickbuster.pop, 2500)
};
AR.js.clickbuster.pop = function() {
    AR.js.clickbuster.coordinates.splice(0, 2)
};
AR.js.clickbuster.coordinates = [];
AR.js.click = {};
AR.js.click.onClickTrigger = function(d) {
    for (var c = 0; c < d.drawables.length; c++) {
        var b = AR.om.getObjectForID(d.drawables[c].drawable);
        if (b && b.onClick) {
            if (b.__onClick__(AR.om.getObjectForID(d.drawables[c].arObject))) {
                return 
            }
        }
    }
    for (var c = 0; c < d.arObjects.length; c++) {
        var a = AR.om.getObjectForID(d.arObjects[c]);
        if (a && a.onClick) {
            if (a.onClick()) {
                return 
            }
        }
    }
    if (AR.context.onScreenClick) {
        AR.context.onScreenClick()
    }
};
AR.js.clickBehavior = {};
AR.js.clickBehavior = {
    clickEvent: function(c) {
        for (var b = 0; b < AR.js.clickbuster.coordinates.length; b += 2) {
            var a = AR.js.clickbuster.coordinates[b];
            var d = AR.js.clickbuster.coordinates[b + 1];
            if (Math.abs(c.clientX - a) < 25 && Math.abs(c.clientY - d) < 25) {
               // c.stopPropagation();
                //c.preventDefault()
            }
        }
    },
    executeClick: function(a) {
        if (a.target === document.body || a.target === document.documentElement || (a.target.style.background == "none" && typeof(a.target.attributes["data-role"]) !== "undefined" && a.target.attributes["data-role"].value === "page")) {
            AR.js.click.executePlatformClick(a)
        }
    }
};
AR.js.clickBehavior.touchDown = {
    touchstartEvent: function(a) {
        AR.js.clickBehavior.executeClick(a)
    }
};
AR.js.clickBehavior.touchClick = {
    touchstartEvent: function(a) {
        AR.js.clickBehavior.moveDistance = 0;
        AR.js.clickBehavior.startX = a.touches[0].screenX;
        AR.js.clickBehavior.startY = a.touches[0].screenY;
        AR.js.clickBehavior.lastX = a.touches[0].screenX;
        AR.js.clickBehavior.lastY = a.touches[0].screenY;

      handleTouchStart(a.touches[0].screenX,a.touches[0].screenY);



    },
    touchmoveEvent: function(c) {
        var b = (c.touches[0].screenX - AR.js.clickBehavior.lastX);
        var a = (c.touches[0].screenY - AR.js.clickBehavior.lastY);
        AR.js.clickBehavior.lastX = c.touches[0].screenX;
        AR.js.clickBehavior.lastY = c.touches[0].screenY;
        AR.js.clickBehavior.moveDistance += b * b + a * a
 
      handleTouchMove(c.touches[0].screenX,c.touches[0].screenY);


    },
    touchendEvent: function(d) {
        var c = (d.changedTouches[0].screenX - AR.js.clickBehavior.lastX);
        var b = (d.changedTouches[0].screenY - AR.js.clickBehavior.lastY);
        AR.js.clickBehavior.moveDistance += c * c + b * b;
        var a = (d.changedTouches[0].screenX - AR.js.clickBehavior.startX);
        var f = (d.changedTouches[0].screenY - AR.js.clickBehavior.startY);
        var e = a * a + f * f;

        if (AR.js.clickBehavior.moveDistance < 1000 && e < 100) {
            AR.js.clickBehavior.executeClick(d)
        }

         handleTouchEnd(d.changedTouches[0].screenX,d.changedTouches[0].screenY);

    }
};
AR.js.clickBehavior.touchUp = {
    touchendEvent: function(a) {
        AR.js.clickBehavior.executeClick(a)
    }
};
AR.js.clickBehavior.removeClickBehavior = function() {
    if (AR.js.clickBehavior.currentBehavior != null) {
        if (AR.js.clickBehavior.currentBehavior.touchstartEvent != null) {
            document.removeEventListener("touchstart", AR.js.clickBehavior.currentBehavior.touchstartEvent, true)
        }
        if (AR.js.clickBehavior.currentBehavior.touchmoveEvent != null) {
            document.removeEventListener("touchmove", AR.js.clickBehavior.currentBehavior.touchmoveEvent, true)
        }
        if (AR.js.clickBehavior.currentBehavior.touchendEvent != null) {
            document.removeEventListener("touchend", AR.js.clickBehavior.currentBehavior.touchendEvent, true)
        }
        document.removeEventListener("click", AR.js.clickBehavior.clickEvent);
        AR.js.clickBehavior.currentBehavior = null
    }
};
AR.js.clickBehavior.addClickBehavior = function(a) {
    var b;
    if (a === "touchDown") {
        b = AR.js.clickBehavior.touchDown
    } else {
        if (a === "touchClick") {
            b = AR.js.clickBehavior.touchClick
        } else {
            if (a === "touchUp") {
                b = AR.js.clickBehavior.touchUp
            }
        }
    }
    if (b.touchstartEvent != null) {
        document.addEventListener("touchstart", b.touchstartEvent, true)
    }
    if (b.touchmoveEvent != null) {
        document.addEventListener("touchmove", b.touchmoveEvent, true)
    }
    if (b.touchendEvent != null) {
        document.addEventListener("touchend", b.touchendEvent, true)
    }
    AR.js.clickBehavior.currentBehavior = b;
    AR.js.clickBehavior.clickEvent = document.addEventListener("click", AR.js.clickBehavior.clickEvent, true)
};
AR.js.clickBehavior.setClickBehavior = function(a) {
    AR.js.clickBehavior.removeClickBehavior();
    AR.js.clickBehavior.addClickBehavior(a)
};
AR.js.clickBehavior.setClickBehavior("touchClick");
var evaluateCoreResult = (function() {
    var a = new MessageChannel();
    return function(c, b) {
        a.port1.onmessage = b;
        a.port2.postMessage(c)
    }
})();
var NativeARBridge = {
    isBridgeOpen: false,
    bridge: null,
    syncResults: {},
    pendingBridgeQueue: [],
    callId: 1,
    callSync: function callSync(b) {
        if (NativeARBridge.pendingBridgeQueue.length) {
            b = NativeARBridge.prepareSyncCall(b)
        }
        b = NativeARBridge.callId+++b;
        var a = document.createElement("IFRAME");
        a.setAttribute("src", "js-frame:" + b);
        a.setAttribute("width", "0px");
        a.setAttribute("height", "0px");
        document.documentElement.appendChild(a);
        a.parentNode.removeChild(a);
        a = null;
        return NativeARBridge.syncResults[0]
    },
    callAsync: function callAsync(a) {
        if (!NativeARBridge.bridge) {
            NativeARBridge.openBridge()
        }
        if (NativeARBridge.isBridgeOpen) {
            if (NativeARBridge.pendingBridgeQueue.length > 0) {
                NativeARBridge.queueBridgeCall(a);
                NativeARBridge.sendBridgeCall(NativeARBridge.pendingBridgeQueue.shift())
            } else {
                NativeARBridge.sendBridgeCall(a)
            }
        } else {
            NativeARBridge.queueBridgeCall(a)
        }
    },
    didReceivedResultForSynchronRequest: function didReceivedResultForSynchronRequest(a) {
        NativeARBridge.syncResults[0] = a
    },
    openBridge: function openBridge() {
        NativeARBridge.bridge = new WebSocket("ws://localhost:8080/ARchitectBridge");
        NativeARBridge.bridge.onopen = function(a) {
            NativeARBridge.isBridgeOpen = true;
            if (NativeARBridge.pendingBridgeQueue.length > 0) {
                NativeARBridge.sendBridgeCall(NativeARBridge.pendingBridgeQueue.shift())
            }
        };
        NativeARBridge.bridge.onerror = function(a) {
            NativeARBridge.bridge = null;
            NativeARBridge.isBridgeOpen = false
        };
        NativeARBridge.bridge.onclose = function(a) {
            NativeARBridge.bridge = null;
            NativeARBridge.isBridgeOpen = false
        };
        NativeARBridge.bridge.onmessage = function(a) {
            if (NativeARBridge.pendingBridgeQueue.length > 0) {
                NativeARBridge.sendBridgeCall(NativeARBridge.pendingBridgeQueue.shift())
            }
        }
    },
    sendBridgeCall: function sendBridgeCall(a) {
        NativeARBridge.bridge.send(NativeARBridge.callId+++a)
    },
    queueBridgeCall: function queueBridgeCall(a) {
        NativeARBridge.pendingBridgeQueue.push(a)
    },
    prepareSyncCall: function(c) {
        var b = "[";
        for (var a = 0; a < NativeARBridge.pendingBridgeQueue.length; a++) {
            b += NativeARBridge.pendingBridgeQueue[a];
            b += ","
        }
        b += c;
        b += "]";
        NativeARBridge.pendingBridgeQueue.splice(0, NativeARBridge.pendingBridgeQueue.length);
        return b
    },
    didReceivedRestoredBridgeNotification: function didReceivedRestoredBridgeNotification() {
        if (NativeARBridge.pendingBridgeQueue.length) {
            NativeARBridge.callAsync(NativeARBridge.pendingBridgeQueue.shift())
        }
    }
};
var AR = AR || {};
AR.i = AR.i || {};
AR.js = AR.js || {};
if (AR.build && AR.build.mobile && AR.ADE) {
    AR.ADE.instance.removeADE()
}
var SUPPORT_BRIDGE_OBJECTS = true;
AR.isDefined = function(a) {
    return a != null && a != undefined
};
AR.__architectBuildVersion__ = 21;
(function() {
    var a = function(b) {
        return typeof b == "function"
    };
    PClass = function() {};
    PClass.create = function(c) {
        var b = function(d) {
            if (d != a && a(this.init)) {
                this.init.apply(this, arguments)
            }
        };
        b.prototype = new this (a);
        for (key in c) {
            (function(d, e) {
                b.prototype[key]=!a(d) ||!a(e) ? d : function() {
                    this._super = e;
                    return d.apply(this, arguments)
                }
            })(c[key], b.prototype[key])
        }
        b.prototype.constructor = b;
        b.extend = this.extend || this.create;
        return b
    }
})();
AR.__toJSONString__ = function(a) {
    return JSON.stringify(a)
};
AR.__fromJSONString__ = function(a) {
    return JSON.parse(a)
};
AR.__resourceUrl = function(a) {
    if (/^([a-z\d.-]+:)?\/\//i.test(a)) {
        return a
    }
    var d = document.baseURI.substring(0, document.baseURI.indexOf("/") + 2);
    var c = document.baseURI.substring(document.baseURI.indexOf("/") + 2);
    c = c.substring(0, c.lastIndexOf("/") + 1);
    var b = d + c;
    if (b[b.length-1] !== "/") {
        b += "/"
    }
    if (a[0] === "/") {
        b = b.substring(0, b.indexOf("/", b.indexOf("//") + 2))
    }
    return b + a
};
AR.VALIDATE = {
    HEX_CHARS: "0123456789ABCDEF",
    isDefined: function(a) {
        return !(a == null || a == undefined)
    },
    isBoolean: function(a) {
        return typeof a == "boolean"
    },
    isNumeric: function(a) {
        return typeof a == "number"
    },
    isPositive: function(a) {
        return this.isNumeric(a) && a > 0
    },
    isNonNegative: function(a) {
        return this.isNumeric(a) && a >= 0
    },
    isInRange: function(c, b, a) {
        return this.isNumeric(c) && c >= b && c <= a
    },
    isFunction: function(a) {
        return typeof a == "function"
    },
    isWholeNumber: function(a) {
        return this.isNumeric(a) && Math.round(a) == a
    },
    isTypeOf: function(b, a) {
        return b instanceof a
    },
    isString: function(a) {
        return typeof a == "string"
    },
    isArrayOf: function(c, b) {
        if (!(c instanceof Array)) {
            return false
        }
        for (var a = 0; a < c.length; a++) {
            if (!this.isTypeOf(c[a], b)) {
                return false
            }
        }
        return true
    },
    isHex: function(b) {
        if (typeof b != "string" ||!AR.VALIDATE.isDefined(b) || b.charAt(0) != "#") {
            return false
        }
        var c = b.length;
        if (c != 7 && c != 9) {
            return false
        }
        b = b.toUpperCase();
        for (var a = 1; a < c; a++) {
            if (AR.VALIDATE.HEX_CHARS.indexOf(b.charAt(a)) < 0) {
                return false
            }
        }
        return true
    }
};
AR.ERROR = {
    ERROR_PREFIX: "ARchitect Error: ",
    create: function(d, b, e, a) {
        if (!e) {
            e = ""
        }
        var c = "";
        switch (b) {
        case AR.ERROR.TYPE.UNDEFINED:
            c = AR.ERROR.ERROR_PREFIX + d + " is undefined" + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.INVALID_VALUE:
            c = AR.ERROR.ERROR_PREFIX + d + " is invalid" + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.RANGE:
            c = AR.ERROR.ERROR_PREFIX + d + " is not in the valid range " + e + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.ENUMERATION:
            c = AR.ERROR.ERROR_PREFIX + d + " is not one of the allowed values defined in the 'enumeration-object' " + e + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.FLOAT:
            c = AR.ERROR.ERROR_PREFIX + d + " is not a numeric value." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.INT:
            c = AR.ERROR.ERROR_PREFIX + d + " is not a whole number." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.BOOLEAN:
            c = AR.ERROR.ERROR_PREFIX + d + " is not a boolean value." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.ARRAY_CONTENT:
            c = AR.ERROR.ERROR_PREFIX + d + " contains invalid values in the array." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.OBJECT:
            c = AR.ERROR.ERROR_PREFIX + d + " of object type " + a + " is not of the expected object type " + e + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.IMMUTABLE:
            c = AR.ERROR.ERROR_PREFIX + d + " must not be altered." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.HEX:
            c = AR.ERROR.ERROR_PREFIX + d + " is not a valid hex value." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.UNKNOWN_PROPERTY:
            c = AR.ERROR.ERROR_PREFIX + "Property " + d + " cannot be found." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.STRING:
            c = AR.ERROR.ERROR_PREFIX + d + " is not a String value." + buildStack("<br />");
            break;
        case AR.ERROR.TYPE.DOM_ELEMENT:
            c = AR.ERROR.ERROR_PREFIX + d + " is not a DOM element." + buildStack("<br />");
            break
        }
        AR.logger.error(c);
        return c
    },
    TYPE: {
        UNDEFINED: "___UNDEFINED___",
        INVALID_VALUE: "___INVALID___",
        RANGE: "___RANGE___",
        FLOAT: "___FLOAT___",
        INT: "___INT___",
        BOOLEAN: "___BOOLEAN___",
        ARRAY_CONTENT: "___ARRAY_CONTENT___",
        OBJECT: "___OBJECT___",
        IMMUTABLE: "___IMMUTABLE___",
        HEX: "___HEX___",
        UNKNOWN_PROPERTY: "___UNKNOWN_PROPERTY___",
        STRING: "___STRING___",
        ENUMERATION: "___ENUMERATION___",
        DOM_ELEMENT: "___DOM_ELEMENT___"
    }
};
_PROPERTY_VALIDATOR = {
    TYPE: {
        FUNCTION: 1,
        BOOLEAN: 2,
        STRING: 3,
        POSITIVE: 4,
        UNIT_INTERVAL: 5,
        CLASS: 6,
        ARRAY: 7,
        ARRAY_OR_PROPERTY: 8,
        NUMERIC: 9,
        POSITIVE_INT: 10,
        NON_NEGATIVE_INT: 11,
        INT: 12,
        RGBA: 13,
        NON_NEGATIVE: 14,
        DOM_ELEMENT: 15
    },
    RULE: {
        MUST_BE_SET: 0,
        CAN_BE_EMPTY: 1
    },
    validate: function(a, h, d, g, c) {
        var e = true;
        switch (g) {
        case _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY:
            if (h == null || h == undefined) {
                e = false;
                break
            }
            break;
        case _PROPERTY_VALIDATOR.RULE.MUST_BE_SET:
            if (h == null || h == undefined) {
                throw AR.ERROR.create(a, AR.ERROR.TYPE.UNDEFINED)
            }
            break
        }
        if (e) {
            if (d) {
                if (!(d.type)) {
                    d = {
                        type: d
                    }
                }
                switch (d.type) {
                case _PROPERTY_VALIDATOR.TYPE.FUNCTION:
                    if (typeof h == "function") {
                        break
                    } else {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, "function", typeof h)
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.BOOLEAN:
                    if (typeof h == "boolean") {
                        break
                    } else {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.BOOLEAN)
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.STRING:
                    if (typeof h == "string") {
                        break
                    } else {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.STRING)
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.NUMERIC:
                    if (typeof h != "number") {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.FLOAT)
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL:
                    h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, g, c);
                    if (h < 0 || h > 1) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "[0, 1]")
                    } else {
                        break
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.POSITIVE:
                    h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, g, c);
                    if (h <= 0) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "(0, infinity)")
                    } else {
                        break
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE:
                    h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, g, c);
                    if (h < 0) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "[0, infinity)")
                    } else {
                        break
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT:
                    h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.INT, g, c);
                    if (h <= 0) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "(0, infinity)")
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.INT:
                    if (typeof h != "number") {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.FLOAT)
                    } else {
                        if (Math.round(h) != h) {
                            throw AR.ERROR.create(a, AR.ERROR.TYPE.INT)
                        }
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE_INT:
                    h = _PROPERTY_VALIDATOR.validate(a, h, _PROPERTY_VALIDATOR.TYPE.INT, g, c);
                    if (h <= 0) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.RANGE, "(0, infinity)")
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.CLASS:
                    if (h instanceof d.ofType) {
                        break
                    } else {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, d.ofType)
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.ARRAY:
                    if (!(h instanceof Array)) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.ARRAY_CONTENT)
                    }
                    for (var f = 0; f < h.length; f++) {
                        if (!(h[f] instanceof d.ofType)) {
                            throw AR.ERROR.create(a, AR.ERROR.TYPE.ARRAY_CONTENT)
                        }
                    }
                    break;
                case _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY:
                    if (h instanceof d.ofType) {
                        h = new Array(h);
                        break
                    }
                    h = _PROPERTY_VALIDATOR.validate(a, h, {
                        type: _PROPERTY_VALIDATOR.TYPE.ARRAY,
                        ofType: d.ofType
                    }, g, c);
                    break;
                case _PROPERTY_VALIDATOR.TYPE.RGBA:
                    if (typeof h != "string" || h.charAt(0) != "#") {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
                    }
                    var j = h.length;
                    if (j != 7 && j != 9) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
                    }
                    h = h.toUpperCase();
                    var b = "0123456789ABCDEF";
                    for (var f = 1; f < j; f++) {
                        if (b.indexOf(h.charAt(f)) < 0) {
                            throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
                        }
                    }
                    if (j == 7) {
                        h += "FF"
                    }
                    return h;
                    break;
                case _PROPERTY_VALIDATOR.TYPE.DOM_ELEMENT:
                    if (!(h && "nodeType" in h)) {
                        throw AR.ERROR.create(a, AR.ERROR.TYPE.DOM_ELEMENT)
                    }
                    break;
                default:
                    throw "Invalid test"
                }
            }
        }
        if (c) {
            return c()
        }
        return h
    }
};
AR.om = {
    __currentObjectID__: 1,
    __objects__: [],
    registerObjectForID: function registerObjectForID(b, a) {
        AR.om.__objects__[b] = a
    },
    getObjectForID: function getObjectForID(a) {
        return AR.om.__objects__[a]
    },
    getExistingObjectForID: function getObjectForID(b) {
        var a = AR.om.__objects__[b];
        if (a) {
            return a
        } else {
            throw "Object with ID " + b + " does not exist - maybe it was already destroyed?"
        }
    },
    createObjectID: function createObjectID() {
        return AR.om.__currentObjectID__++
    },
    destroyAllObjects: function destroyAllObjects(b) {
        for (var c in AR.om.__objects__) {
            var a = AR.om.getObjectForID(c);
            if (a != null && a != undefined && a.__id != undefined) {
                a.destroy(b)
            }
        }
        AR.om.resetObjectManager()
    },
    resetObjectManager: function resetObjectManager() {
        AR.om.__currentObjectID__ = 1;
        AR.om.__objects__.splice(0, AR.om.__objects__.length-1)
    },
    __getIds__: function(d) {
        var b = new Array();
        if (!d) {
            return b
        }
        var c = 0;
        for (var a = 0; a < d.length; a++) {
            if (d[a] != null&&!(d[a].destroyed)) {
                b[c] = d[a].__id;
                c++
            }
        }
        return b
    },
    __getObjects__: function(b) {
        var d = new Array();
        if (!b) {
            return d
        }
        var c = 0;
        for (var a = 0; a < b.length; a++) {
            if (b[a] != null) {
                d[c] = AR.om.getObjectForID(b[a]);
                c++
            }
        }
        return d
    }
};
AR.bm = {
    batchQueue: new Array(),
    originalSyncDistributor: null,
    originalAsyncDistributor: null,
    batchSyncDistributor: function(a) {
        AR.bm.batchQueue.push(a)
    },
    batchAsyncDistributor: function(a) {
        AR.bm.batchQueue.push(a)
    },
    setBatchCreationActive: function() {
        AR.bm.originalSyncDistributor = AR.i.callSync;
        AR.bm.originalAsyncDistributor = AR.i.callAsync;
        AR.i.callSync = AR.bm.batchSyncDistributor;
        AR.i.callAsync = AR.bm.batchAsyncDistributor
    },
    setBatchCreationDeactivated: function() {
        AR.bm.originalAsyncDistributor(AR.bm.batchQueue);
        AR.i.callSync = AR.bm.originalSyncDistributor;
        AR.i.callAsync = AR.bm.originalAsyncDistributor;
        AR.bm.batchQueue.splice(0, AR.bm.batchQueue.length)
    }
};
AR.ARchitectObject = PClass.create({
    init: function() {
        var b = false;
        var c = {};
        this.__defineSetter__("destroyed", function(d) {
            throw AR.ERROR.create("destroyed", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("destroyed", function() {
            return b
        });
        this.__isDirtyInternally = function(d) {
            d = a(d);
            return c[d] != undefined
        };
        this.__alertDirty = function(d) {
            d = a(d);
            var e = c[d];
            if (e) {
                c[d]++
            } else {
                c[d] = 1
            }
        };
        this.__removeDirt = function(d) {
            d = a(d);
            var e = c[d];
            if (e) {
                c[d]--;
                if (c[d] == 0) {
                    delete c[d]
                }
            }
        };
        var a = (function(d) {
            return function(e) {
                var g = [{
                    type: AR.Drawable,
                    deprecations: {
                        roll: "rotate.roll",
                        tilt: "rotate.tilt",
                        heading: "rotate.heading"
                    }
                }, {
                    type: AR.Drawable2D,
                    deprecations: {
                        scaling: "scale"
                    }
                }
                ];
                for (var f = 0; f < g.length; f++) {
                    if (d instanceof g[f].type) {
                        for (deprecatedProperty in g[f].deprecations) {
                            if (e == deprecatedProperty) {
                                return g[f].deprecations[e]
                            }
                        }
                    }
                }
                return e
            }
        })(this)
    },
    __isDirty: function(a) {
        return this.__isDirtyInternally(a)
    },
    destroy: function(d) {
        if (!d) {
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.contextInterface.destroy"
            })
        }
        if (AR.ADE && AR.ADE.instance && AR.ADE.instance.alertDeletion) {
            AR.ADE.instance.alertDeletion(this.__id)
        }
        delete AR.om.__objects__[this.__id];
        for (var a in this) {
            delete this[a];
            if (this[a] != undefined) {
                try {
                    this[a] = undefined
                } catch (c) {
                    if (contextInterface.info) {
                        AR.i.callAsync({
                            is: "AR.i.contextInterface.info",
                            message: "Exception caught: " + c
                        })
                    }
                }
            }
        }
        var b = true;
        this.__defineSetter__("destroyed", function(e) {
            throw AR.ERROR.create("destroyed", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("destroyed", function() {
            return b
        })
    }
});
AR.ARObject = AR.ARchitectObject.extend({
    init: function(d) {
        this._super();
        var b = null;
        var c;
        var g;
        var e;
        var a = true;
        var f = 0;
        if (d) {
            if (d.enabled != undefined) {
                a = _PROPERTY_VALIDATOR.validate("enabled", d.enabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (d.triggers) {
                if (d.triggers.onEnterFieldOfVision) {
                    c = _PROPERTY_VALIDATOR.validate("triggers.onEnterFieldOfVision", d.triggers.onEnterFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
                if (d.triggers.onExitFieldOfVision) {
                    g = _PROPERTY_VALIDATOR.validate("triggers.onExitFieldOfVision", d.triggers.onExitFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
                }
            }
            if (d.onEnterFieldOfVision) {
                c = _PROPERTY_VALIDATOR.validate("onEnterFieldOfVision", d.onEnterFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.onExitFieldOfVision) {
                g = _PROPERTY_VALIDATOR.validate("onExitFieldOfVision", d.onExitFieldOfVision, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.onClick) {
                e = _PROPERTY_VALIDATOR.validate("onClick", d.onClick, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            b = new AR.ARObjectDrawables(this, d.drawables);
            if (d.renderingOrder) {
                f = _PROPERTY_VALIDATOR.validate("renderingOrder", d.renderingOrder, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
        } else {
            b = new AR.ARObjectDrawables(this, null)
        }
        this.__defineSetter__("drawables", function(h) {
            throw AR.ERROR.create("drawables", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("drawables", function() {
            return b
        });
        this.__defineSetter__("enabled", function(h) {
            h = _PROPERTY_VALIDATOR.validate("enabled", h, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: this.__id,
                enabled: h,
                is: "AR.i.arObjectInterface.setEnabled"
            });
            a = h
        });
        this.__defineGetter__("enabled", function() {
            return a
        });
        this.__defineSetter__("renderingOrder", function(h) {
            h = _PROPERTY_VALIDATOR.validate("renderingOrder", h, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: this.__id,
                renderingOrder: h,
                is: "AR.i.arObjectInterface.setRenderingOrder"
            });
            f = h
        });
        this.__defineGetter__("renderingOrder", function() {
            return f
        });
        this.__defineSetter__("onEnterFieldOfVision", function(h) {
            h = _PROPERTY_VALIDATOR.validate("onEnterFieldOfVision", h, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            c = h;
            AR.i.callAsync({
                objectId: this.__id,
                onEnterFieldOfVisionTriggerActive: h != null,
                is: "AR.i.arObjectInterface.setOnEnterFieldOfVisionTriggerActive"
            })
        });
        this.__defineGetter__("onEnterFieldOfVision", function() {
            return c
        });
        this.__defineSetter__("__onEnterFieldOfVision__", function(h) {});
        this.__defineGetter__("__onEnterFieldOfVision__", function() {
            var h = null;
            if (c) {
                if (this._triggers) {
                    h = this.onEnterFieldOfVision.call(this._triggers)
                } else {
                    h = this.onEnterFieldOfVision()
                }
            }
            return function() {
                return h
            }
        });
        this.__defineSetter__("onExitFieldOfVision", function(h) {
            h = _PROPERTY_VALIDATOR.validate("onExitFieldOfVision", h, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            g = h;
            AR.i.callAsync({
                objectId: this.__id,
                onExitFieldOfVisionTriggerActive: h != null,
                is: "AR.i.arObjectInterface.setOnExitFieldOfVisionTriggerActive"
            })
        });
        this.__defineGetter__("onExitFieldOfVision", function() {
            return g
        });
        this.__defineSetter__("__onExitFieldOfVision__", function(h) {});
        this.__defineGetter__("__onExitFieldOfVision__", function() {
            var h = null;
            if (g) {
                if (this._triggers) {
                    h = g.call(this._triggers)
                } else {
                    h = g()
                }
            }
            return function() {
                return h
            }
        });
        this.__defineSetter__("onClick", function(h) {
            h = _PROPERTY_VALIDATOR.validate("onClick", h, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            e = h;
            AR.i.callAsync({
                objectId: this.__id,
                onClickTriggerActive: h != null,
                is: "AR.i.arObjectInterface.setOnClickTriggerActive"
            })
        });
        this.__defineGetter__("onClick", function() {
            return e
        });
        return {
            drawables: b,
            onEnterFieldOfVisionTriggerActive: c != null,
            onExitFieldOfVisionTriggerActive: g != null,
            onClickTriggerActive: e != null,
            enabled: a,
            renderingOrder: f
        }
    },
    isVisible: function() {
        return arObjectInterface.isVisible({
            objectId: this.__id,
            is: "AR.i.arObjectInterface.isVisible"
        })
    }
});
AR.ARObjectDrawables = PClass.create({
    init: function(a, g) {
        var e = a;
        var h = new Array();
        var d = new Array();
        var c = new Array();
        if (g != null) {
            if (g.cam) {
                h = _PROPERTY_VALIDATOR.validate("drawables.cam", g.cam, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: AR.Drawable
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (g.radar) {
                d = _PROPERTY_VALIDATOR.validate("drawables.radar", g.radar, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: AR.Drawable2D
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (g.indicator) {
                c = _PROPERTY_VALIDATOR.validate("drawables.indicator", g.indicator, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: AR.Drawable2D
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        this.__defineSetter__("cam", function(i) {
            i = _PROPERTY_VALIDATOR.validate("drawables.cam", i, {
                type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                ofType: AR.Drawable
            }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            AR.i.callAsync({
                objectId: a.__id,
                camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(i)),
                is: "AR.i.arObjectInterface.setCamDrawables"
            });
            h = i
        });
        this.__defineGetter__("cam", function() {
            return h
        });
        this.__defineSetter__("radar", function(i) {
            if (a instanceof AR.GeoObject) {
                i = _PROPERTY_VALIDATOR.validate("drawables.radar", i, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: AR.Drawable2D
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                AR.i.callAsync({
                    objectId: a.__id,
                    radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(i)),
                    is: "AR.i.geoObjectInterface.setRadarDrawables"
                });
                d = i
            }
        });
        this.__defineGetter__("radar", function() {
            return d
        });
        this.__defineSetter__("indicator", function(i) {
            if (a instanceof AR.GeoObject) {
                i = _PROPERTY_VALIDATOR.validate("drawables.indicator", i, {
                    type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                    ofType: AR.Drawable2D
                }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                AR.i.callAsync({
                    objectId: a.__id,
                    indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(i)),
                    is: "AR.i.geoObjectInterface.setIndicatorDrawables"
                });
                c = i
            }
        });
        this.__defineGetter__("indicator", function() {
            return c
        });
        this.addCamDrawable = function(j, i) {
            h = b(h, j, i, AR.Drawable);
            AR.i.callAsync({
                objectId: a.__id,
                camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(h)),
                is: "AR.i.arObjectInterface.setCamDrawables"
            })
        };
        this.removeCamDrawable = function(i) {
            h = f(h, i, AR.Drawable);
            AR.i.callAsync({
                objectId: a.__id,
                camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(h)),
                is: "AR.i.arObjectInterface.setCamDrawables"
            })
        };
        this.addRadarDrawable = function(j, i) {
            if (a instanceof AR.GeoObject) {
                d = b(d, j, i, AR.Drawable2D);
                AR.i.callAsync({
                    objectId: a.__id,
                    radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(d)),
                    is: "AR.i.geoObjectInterface.setRadarDrawables"
                })
            }
        };
        this.removeRadarDrawable = function(i) {
            if (a instanceof AR.GeoObject) {
                d = f(d, i, AR.Drawable2D);
                AR.i.callAsync({
                    objectId: a.__id,
                    radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(d)),
                    is: "AR.i.geoObjectInterface.setRadarDrawables"
                })
            }
        };
        this.addIndicatorDrawable = function(j, i) {
            if (a instanceof AR.GeoObject) {
                c = b(c, j, i, AR.Drawable2D);
                AR.i.callAsync({
                    objectId: a.__id,
                    indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(c)),
                    is: "AR.i.geoObjectInterface.setIndicatorDrawables"
                })
            }
        };
        this.removeIndicatorDrawable = function(i) {
            if (a instanceof AR.GeoObject) {
                c = f(c, i, AR.Drawable2D);
                AR.i.callAsync({
                    objectId: a.__id,
                    indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(c)),
                    is: "AR.i.geoObjectInterface.setIndicatorDrawables"
                })
            }
        };
        var b = function(p, m, k, o) {
            m = _PROPERTY_VALIDATOR.validate("drawable", m, {
                type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                ofType: o
            }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (!k) {
                k =- 1
            } else {
                if (!AR.VALIDATE.isWholeNumber(k)) {
                    throw AR.ERROR.create("position", AR.ERROR.TYPE.INT)
                }
                if (!AR.VALIDATE.isNonNegative(k)) {
                    throw AR.ERROR.create("position", AR.ERROR.TYPE.RANGE, "[0, Infinity)")
                }
            }
            if (k < 0) {
                for (var l = 0; l < m.length; l++) {
                    p.push(m[l])
                }
                return p
            } else {
                var j = new Array();
                var n = 0;
                for (var l = 0; l < k; l++) {
                    j[n] = p[l];
                    n++
                }
                for (var l = 0; l < m.length; l++) {
                    j[n] = m[l];
                    n++
                }
                for (var l = k; l < p.length; l++) {
                    j[n] = p[l];
                    n++
                }
                return j
            }
        };
        var f = function(o, m, n) {
            if (AR.VALIDATE.isWholeNumber(m)) {
                if (!AR.VALIDATE.isNonNegative(m)) {
                    throw AR.ERROR.create("position", AR.ERROR.TYPE.RANGE, "[0, Infinity)")
                }
                o.splice(m, 1);
                return o
            }
            m = _PROPERTY_VALIDATOR.validate("drawable", m, {
                type: _PROPERTY_VALIDATOR.TYPE.ARRAY_OR_PROPERTY,
                ofType: n
            }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            for (var l = 0; l < m.length; l++) {
                for (var k = 0; k < o.length; k++) {
                    if (m[l] == o[k]) {
                        o.splice(k, 1)
                    }
                }
            }
            return o
        }
    }
});
AR.Drawable = AR.ARchitectObject.extend({
    init: function(b) {
        this._super();
        var a = true;
        var c;
        var d = null;
        if (b) {
            a = _PROPERTY_VALIDATOR.validate("enabled", b.enabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (a == null) {
                a = true
            }
            if (b.triggers) {
                c = _PROPERTY_VALIDATOR.validate("onClick", b.triggers.onClick, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (b.onClick) {
                c = _PROPERTY_VALIDATOR.validate("onClick", b.onClick, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        if (!b ||!b.rotate) {
            d = new AR.DrawableRotate(this, b)
        } else {
            d = new AR.DrawableRotate(this, b.rotate)
        }
        this.__defineSetter__("enabled", function(e) {
            e = _PROPERTY_VALIDATOR.validate("enabled", e, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (e == null) {
                e = true
            }
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawableInterface.setEnabled",
                enabled: e
            });
            a = e
        });
        this.__defineGetter__("enabled", function() {
            return a
        });
        this.__defineSetter__("rotate", function(e) {
            _scale = new AR.DrawableRotate(this, e);
            AR.i.callAsync({
                is: "AR.i.drawableInterface.setRoll",
                objectId: this.__id,
                roll: d.roll
            });
            AR.i.callAsync({
                is: "AR.i.drawableInterface.setTilt",
                objectId: this.__id,
                tilt: d.tilt
            });
            AR.i.callAsync({
                is: "AR.i.drawableInterface.setHeading",
                objectId: this.__id,
                heading: d.heading
            })
        });
        this.__defineGetter__("rotate", function() {
            return d
        });
        this.__defineSetter__("onClick", function(e) {
            e = _PROPERTY_VALIDATOR.validate("onClick", e, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            c = e;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawableInterface.setOnClickTriggerActive",
                onClickTriggerActive: e != null
            })
        });
        this.__defineGetter__("onClick", function() {
            return c
        });
        this.__defineSetter__("__onClick__", function(e) {});
        this.__defineGetter__("__onClick__", function() {
            var e = function() {
                return null
            };
            if (c) {
                if (this._triggers) {
                    e = function(f) {
                        return c.call(this._triggers)
                    }
                } else {
                    e = function(f) {
                        return c.call(this, f)
                    }
                }
            }
            return e
        });
        return {
            enabled: a,
            onClickActive: c != null,
            roll: d.roll,
            tilt: d.tilt,
            heading: d.heading
        }
    }
});
AR.DrawableRotate = PClass.create({
    init: function(d, c) {
        var f = d;
        var b = 0;
        var a = 0;
        var e = 0;
        if (c && (typeof c != "object")) {
            throw AR.ERROR.create("rotate", AR.ERROR.TYPE.OBJECT, "rotate")
        }
        if (c) {
            if (c.roll) {
                b = _PROPERTY_VALIDATOR.validate("rotate.roll", c.roll, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (c.tilt) {
                a = _PROPERTY_VALIDATOR.validate("rotate.tilt", c.tilt, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (c.heading) {
                e = _PROPERTY_VALIDATOR.validate("rotate.heading", c.heading, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
        }
        this.__defineSetter__("roll", function(g) {
            g = _PROPERTY_VALIDATOR.validate("rotate.roll", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: f.__id,
                is: "AR.i.drawableInterface.setRoll",
                roll: g
            });
            b = g
        });
        this.__defineGetter__("roll", function() {
            if (f.__isDirty("rotate.roll")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.drawableInterface.getRoll"
                })
            }
            return b
        });
        this.__defineSetter__("tilt", function(g) {
            g = _PROPERTY_VALIDATOR.validate("rotate.tilt", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: f.__id,
                is: "AR.i.drawableInterface.setTilt",
                tilt: g
            });
            a = g
        });
        this.__defineGetter__("tilt", function() {
            if (f.__isDirty("rotate.tilt")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.drawableInterface.getTilt"
                })
            }
            return a
        });
        this.__defineSetter__("heading", function(g) {
            g = _PROPERTY_VALIDATOR.validate("rotate.heading", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: f.__id,
                is: "AR.i.drawableInterface.setHeading",
                heading: g
            });
            e = g
        });
        this.__defineGetter__("heading", function() {
            if (f.__isDirty("rotate.heading")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.drawableInterface.getHeading"
                })
            }
            return e
        })
    }
});
AR.Drawable2D = AR.Drawable.extend({
    validateHorizontalAnchor: function(a) {
        if (!AR.CONST.HORIZONTAL_ANCHOR.isValidHorizontalAnchor(a)) {
            throw AR.ERROR.create("horizontalAnchor", AR.ERROR.TYPE.OBJECT, "HORIZONTAL_ANCHOR.___", typeof a)
        }
        return a
    },
    validateVerticalAnchor: function(a) {
        if (!AR.CONST.VERTICAL_ANCHOR.isValidVerticalAnchor(a)) {
            throw AR.ERROR.create("verticalAnchor", AR.ERROR.TYPE.OBJECT, "VERTICAL_ANCHOR.___", typeof a)
        }
        return a
    },
    validateScale: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("scale", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isNonNegative(a)) {
            throw AR.ERROR.create("scale", AR.ERROR.TYPE.RANGE, "[0, infitity)")
        }
        return a
    },
    validateRotation: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("rotation", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("rotation", AR.ERROR.TYPE.FLOAT)
        }
        return a
    },
    validateOpacity: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("opacity", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isInRange(a, 0, 1)) {
            throw AR.ERROR.create("opacity", AR.ERROR.TYPE.RANGE, "[0, 1]")
        }
        return a
    },
    validateOffsetX: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("offsetX", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("offsetX", AR.ERROR.TYPE.FLOAT)
        }
        return a
    },
    validateOffsetY: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("offsetY", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("offsetY", AR.ERROR.TYPE.FLOAT)
        }
        return a
    },
    validateZOrder: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("zOrder", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("zOrder", AR.ERROR.TYPE.INT)
        }
        return a
    },
    init: function(i, a, l) {
        var j = this.validateHorizontalAnchor(i);
        var b = this.validateVerticalAnchor(a);
        var g = 1;
        var c = 0;
        var h = 1;
        var e = 0;
        var d = 0;
        var k = 0;
        if (l != null) {
            if (l.horizontalAnchor != null) {
                j = this.validateHorizontalAnchor(l.horizontalAnchor)
            }
            if (l.verticalAnchor != null) {
                b = this.validateVerticalAnchor(l.verticalAnchor)
            }
            if (l.scaling != null) {
                g = this.validateScale(l.scaling)
            }
            if (l.scale != null) {
                g = this.validateScale(l.scale)
            }
            if (l.rotation != null) {
                c = this.validateRotation(l.rotation)
            }
            if (l.opacity != null) {
                h = this.validateOpacity(l.opacity)
            }
            if (l.offsetX != null) {
                e = this.validateOffsetX(l.offsetX)
            }
            if (l.offsetY != null) {
                d = this.validateOffsetY(l.offsetY)
            }
            if (l.zOrder != null) {
                k = this.validateZOrder(l.zOrder)
            }
        }
        var f = this._super(l);
        this.__defineSetter__("scale", function(m) {
            m = this.validateScale(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setScale",
                scale: m
            });
            g = m
        });
        this.__defineGetter__("scale", function() {
            if (this.__isDirty("scale")) {
                return AR.i.callSync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.getScale"
                })
            }
            return g
        });
        this.__defineSetter__("rotation", function(m) {
            m = this.validateRotation(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setRotation",
                rotation: m
            });
            c = m
        });
        this.__defineGetter__("rotation", function() {
            if (this.__isDirty("rotation")) {
                return AR.i.callSync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.getRotation"
                })
            }
            return c
        });
        this.__defineSetter__("opacity", function(m) {
            m = this.validateOpacity(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setOpacity",
                opacity: m
            });
            h = m
        });
        this.__defineGetter__("opacity", function() {
            if (this.__isDirty("opacity")) {
                return AR.i.callSync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.getOpacity"
                })
            }
            return h
        });
        this.__defineSetter__("horizontalAnchor", function(m) {
            m = this.validateHorizontalAnchor(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setHorizontalAnchor",
                horizontalAnchor: m
            });
            j = m
        });
        this.__defineGetter__("horizontalAnchor", function() {
            return j
        });
        this.__defineSetter__("verticalAnchor", function(m) {
            m = this.validateVerticalAnchor(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setVerticalAnchor",
                verticalAnchor: m
            });
            b = m
        });
        this.__defineGetter__("verticalAnchor", function() {
            return b
        });
        this.__defineSetter__("offsetX", function(m) {
            m = this.validateOffsetX(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setOffsetX",
                offsetX: m
            });
            e = m
        });
        this.__defineGetter__("offsetX", function() {
            if (this.__isDirty("offsetX")) {
                return AR.i.callSync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.getOffsetX"
                })
            }
            return e
        });
        this.__defineSetter__("offsetY", function(m) {
            m = this.validateOffsetY(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setOffsetY",
                offsetY: m
            });
            d = m
        });
        this.__defineGetter__("offsetY", function() {
            if (this.__isDirty("offsetY")) {
                return AR.i.callSync({
                    objectId: this.__id,
                    is: "AR.i.drawable2DInterface.getOffsetY"
                })
            }
            return d
        });
        this.__defineSetter__("zOrder", function(m) {
            m = this.validateZOrder(m);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.drawable2DInterface.setZOrder",
                zOrder: m
            });
            k = m
        });
        this.__defineGetter__("zOrder", function() {
            return k
        });
        f.horizontalAnchor = j;
        f.verticalAnchor = b;
        f.scale = g;
        f.rotation = c;
        f.opacity = h;
        f.offsetX = e;
        f.offsetY = d;
        f.zOrder = k;
        return f
    },
    getBoundingRectangle: function() {
        var a = AR.i.callSync({
            objectId: this.__id,
            is: "AR.i.drawable2DInterface.getBoundingRectangle"
        });
        if (!a) {
            return null
        }
        if (!(AR.isDefined(a.width)) ||!(AR.isDefined(a.height))) {
            return null
        }
        return new AR.BoundingRectangle(a.width, a.height)
    }
});
AR.Label = AR.Drawable2D.extend({
    init: function(h, b, c) {
        var f = h;
        if (typeof f !== "string") {
            f = "" + f
        }
        var e = this.validateHeight(b);
        var a = null;
        if (c != null) {
            a = new AR.Style(this, c.style)
        } else {
            a = new AR.Style(this, null)
        }
        var g = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, c);
        var d = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: d,
            is: "AR.i.labelInterface.createLabel",
            enabled: g.enabled,
            offsetX: g.offsetX,
            offsetY: g.offsetY,
            zOrder: g.zOrder,
            onClickTriggerActive: g.onClickActive,
            horizontalAnchor: g.horizontalAnchor,
            verticalAnchor: g.verticalAnchor,
            scale: g.scale,
            rotation: g.rotation,
            opacity: g.opacity,
            text: f,
            fontStyle: a.fontStyle,
            textColor: a.textColor,
            backgroundColor: a.backgroundColor,
            height: e,
            roll: g.roll,
            tilt: g.tilt,
            heading: g.heading
        });
        AR.om.registerObjectForID(d, this);
        this.__defineSetter__("__id", function(i) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return d
        });
        this.__defineSetter__("text", function(i) {
            if (typeof i !== "string") {
                i = "" + i
            }
            AR.i.callAsync({
                is: "AR.i.labelInterface.setText",
                objectId: d,
                text: i
            });
            f = i
        });
        this.__defineGetter__("text", function() {
            return f
        });
        this.__defineSetter__("height", function(i) {
            i = this.validateHeight(i);
            AR.i.callAsync({
                is: "AR.i.labelInterface.setHeight",
                objectId: d,
                height: i
            });
            e = i
        });
        this.__defineGetter__("height", function() {
            if (this.__isDirty("height")) {
                return AR.i.callSync({
                    is: "AR.i.labelInterface.getHeight",
                    objectId: d
                })
            }
            return e
        });
        this.__defineSetter__("style", function(i) {
            a = new AR.Style(this, i);
            this.setStyleInInterface()
        });
        this.__defineGetter__("style", function() {
            return a
        });
        this.setStyleInInterface = function() {
            AR.i.callAsync({
                is: "AR.i.labelInterface.setStyle",
                objectId: d,
                backgroundColor: a.backgroundColor,
                textColor: a.textColor,
                fontStyle: a.fontStyle
            })
        }
    },
    validateHeight: function(a) {
        if ((!AR.VALIDATE.isDefined(a)) ||!AR.VALIDATE.isNonNegative(a)) {
            throw AR.ERROR.create("height", AR.ERROR.TYPE.RANGE, "(0, infinity)")
        }
        return a
    }
});
AR.Model = AR.Drawable.extend({
    init: function(b, i) {
        this.__modelNotCreatedInCoreYet = true;
        var e = _PROPERTY_VALIDATOR.validate("uri", b, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var c, d;
        var g = new AR.ModelScale(this, i && i.scale ? i.scale : undefined);
        var a = new AR.ModelTranslate(this, i ? i.translate : null);
        if (i) {
            if (i.onLoaded) {
                c = _PROPERTY_VALIDATOR.validate("onLoaded", i.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (i.onError) {
                d = _PROPERTY_VALIDATOR.validate("onError", i.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        this.__defineSetter__("__id", function(j) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return h
        });
        var f = this._super(i);
        var h = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: h,
            is: "AR.i.modelInterface.createModel",
            enabled: f.enabled,
            onClickTriggerActive: f.onClickActive,
            scaleX: g.x,
            scaleY: g.y,
            scaleZ: g.z,
            uri: AR.__resourceUrl(e),
            roll: f.roll,
            tilt: f.tilt,
            heading: f.heading,
            translateX: a.x,
            translateY: a.y,
            translateZ: a.z,
            onLoadedTriggerActive: c != null,
            onErrorTriggerActive: d != null
        });
        delete this.__modelNotCreatedInCoreYet;
        AR.om.registerObjectForID(h, this);
        this.__defineSetter__("uri", function(j) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("uri", function() {
            return e
        });
        this.__defineSetter__("scale", function(j) {
            g = new AR.ModelScale(this, j)
        });
        this.__defineGetter__("scale", function() {
            return g
        });
        this.__defineSetter__("translate", function(j) {
            a = new AR.ModelTranslate(this, j)
        });
        this.__defineGetter__("translate", function() {
            return a
        });
        this.__defineSetter__("onLoaded", function(j) {
            j = _PROPERTY_VALIDATOR.validate("onLoaded", j, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            c = j;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.modelInterface.setOnLoadedTriggerActive",
                onLoadedTriggerActive: j != null
            })
        });
        this.__defineGetter__("onLoaded", function() {
            return c
        });
        this.__defineSetter__("onError", function(j) {
            j = _PROPERTY_VALIDATOR.validate("onError", j, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            d = j;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.modelInterface.setOnErrorTriggerActive",
                onErrorTriggerActive: j != null
            })
        });
        this.__defineGetter__("onError", function() {
            return d
        })
    },
    isLoaded: function() {
        return AR.i.callSync({
            is: "AR.i.modelInterface.isLoaded",
            objectId: this.__id
        })
    }
});
AR.ModelScale = PClass.create({
    init: function(e, d) {
        var f = e;
        var c = 1;
        var b = 1;
        var a = 1;
        if (d && (typeof d != "object")) {
            throw AR.ERROR.create("scale", AR.ERROR.TYPE.OBJECT, "scale")
        }
        if (d) {
            if (d.x != null) {
                c = _PROPERTY_VALIDATOR.validate("scale.x", d.x, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.y != null) {
                b = _PROPERTY_VALIDATOR.validate("scale.y", d.y, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.z != null) {
                a = _PROPERTY_VALIDATOR.validate("scale.z", d.z, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        if (!f.__modelNotCreatedInCoreYet) {
            AR.i.callAsync({
                is: "AR.i.modelInterface.setScaleX",
                objectId: f.__id,
                scaleX: c
            });
            AR.i.callAsync({
                is: "AR.i.modelInterface.setScaleY",
                objectId: f.__id,
                scaleY: b
            });
            AR.i.callAsync({
                is: "AR.i.modelInterface.setScaleZ",
                objectId: f.__id,
                scaleZ: a
            })
        }
        this.__defineSetter__("x", function(g) {
            c = _PROPERTY_VALIDATOR.validate("scale.x", g, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            AR.i.callAsync({
                objectId: f.__id,
                scaleX: c,
                is: "AR.i.modelInterface.setScaleX"
            })
        });
        this.__defineGetter__("x", function() {
            if (!f.__modelNotCreatedInCoreYet && f.__isDirty("scale.x")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.getScaleX"
                })
            }
            return c
        });
        this.__defineSetter__("y", function(g) {
            b = _PROPERTY_VALIDATOR.validate("scale.y", g, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            AR.i.callAsync({
                objectId: f.__id,
                scaleY: b,
                is: "AR.i.modelInterface.setScaleY"
            })
        });
        this.__defineGetter__("y", function() {
            if (!f.__modelNotCreatedInCoreYet && f.__isDirty("scale.y")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.getScaleY"
                })
            }
            return b
        });
        this.__defineSetter__("z", function(g) {
            a = _PROPERTY_VALIDATOR.validate("scale.z", g, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            AR.i.callAsync({
                objectId: f.__id,
                scaleZ: a,
                is: "AR.i.modelInterface.setScaleZ"
            })
        });
        this.__defineGetter__("z", function() {
            if (!f.__modelNotCreatedInCoreYet && f.__isDirty("scale.z")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.getScaleZ"
                })
            }
            return a
        })
    }
});
AR.ModelTranslate = PClass.create({
    init: function(e, d) {
        var f = e;
        var c = 0;
        var b = 0;
        var a = 0;
        if (d && (typeof d != "object")) {
            throw AR.ERROR.create("translate", AR.ERROR.TYPE.OBJECT, "translate")
        }
        if (d) {
            if (d.x) {
                c = _PROPERTY_VALIDATOR.validate("translate.x", d.x, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (d.y) {
                b = _PROPERTY_VALIDATOR.validate("translate.y", d.y, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (d.z) {
                a = _PROPERTY_VALIDATOR.validate("translate.z", d.z, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
        }
        if (!f.__modelNotCreatedInCoreYet) {
            AR.i.callAsync({
                is: "AR.i.modelInterface.setTranslateX",
                objectId: f.__id,
                translateX: c
            });
            AR.i.callAsync({
                is: "AR.i.modelInterface.setTranslateY",
                objectId: f.__id,
                translateY: b
            });
            AR.i.callAsync({
                is: "AR.i.modelInterface.setTranslateZ",
                objectId: f.__id,
                translateZ: a
            })
        }
        this.__defineSetter__("x", function(g) {
            g = _PROPERTY_VALIDATOR.validate("translate.x", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: f.__id,
                is: "AR.i.modelInterface.setTranslateX",
                translateX: g
            });
            c = g
        });
        this.__defineGetter__("x", function() {
            if (!f.__modelNotCreatedInCoreYet && f.__isDirty("translate.x")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.getTranslateX"
                })
            }
            return c
        });
        this.__defineSetter__("y", function(g) {
            g = _PROPERTY_VALIDATOR.validate("translate.y", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: f.__id,
                is: "AR.i.modelInterface.setTranslateY",
                translateY: g
            });
            b = g
        });
        this.__defineGetter__("y", function() {
            if (!f.__modelNotCreatedInCoreYet && f.__isDirty("translate.y")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.getTranslateY"
                })
            }
            return b
        });
        this.__defineSetter__("z", function(g) {
            g = _PROPERTY_VALIDATOR.validate("translate.z", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: f.__id,
                is: "AR.i.modelInterface.setTranslateZ",
                translateZ: g
            });
            a = g
        });
        this.__defineGetter__("z", function() {
            if (!f.__modelNotCreatedInCoreYet && f.__isDirty("translate.z")) {
                return AR.i.callSync({
                    objectId: f.__id,
                    is: "AR.i.modelInterface.getTranslateZ"
                })
            }
            return a
        })
    }
});
AR.Circle = AR.Drawable2D.extend({
    init: function(b, c) {
        var e = this.validateRadius(b);
        var a = null;
        if (c != null) {
            a = new AR.Style(this, c.style)
        } else {
            a = new AR.Style(this, null)
        }
        var f = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, c);
        var d = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: d,
            is: "AR.i.circleInterface.createCircle",
            enabled: f.enabled,
            offsetX: f.offsetX,
            offsetY: f.offsetY,
            zOrder: f.zOrder,
            onClickTriggerActive: f.onClickActive,
            horizontalAnchor: f.horizontalAnchor,
            verticalAnchor: f.verticalAnchor,
            scale: f.scale,
            rotation: f.rotation,
            opacity: f.opacity,
            radius: e,
            fillColor: a.fillColor,
            outlineColor: a.outlineColor,
            outlineSize: a.outlineSize,
            roll: f.roll,
            tilt: f.tilt,
            heading: f.heading
        });
        AR.om.registerObjectForID(d, this);
        this.__defineSetter__("__id", function(g) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return d
        });
        this.__defineSetter__("radius", function(g) {
            g = this.validateRadius(g);
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.circleInterface.setRadius",
                radius: g
            });
            e = g
        });
        this.__defineGetter__("radius", function() {
            if (this.__isDirty("radius")) {
                return AR.i.callSync({
                    objectId: d,
                    is: "AR.i.circleInterface.getRadius"
                })
            }
            return e
        });
        this.__defineSetter__("style", function(g) {
            a = new AR.Style(this, g);
            this.setStyleInInterface()
        });
        this.__defineGetter__("style", function() {
            return a
        });
        this.setStyleInInterface = function() {
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.circleInterface.setStyle",
                fillColor: a.fillColor,
                outlineColor: a.outlineColor,
                outlineSize: a.outlineSize
            })
        }
    },
    validateRadius: function(a) {
        if (!AR.VALIDATE.isNonNegative(a)) {
            throw AR.ERROR.create("radius", AR.ERROR.TYPE.RANGE, "(0, infinity)")
        }
        return a
    }
});
AR.ImageDrawable = AR.Drawable2D.extend({
    init: function(f, a, b) {
        var e = _PROPERTY_VALIDATOR.validate("imageResource", f, {
            type: _PROPERTY_VALIDATOR.TYPE.CLASS,
            ofType: AR.ImageResource
        }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var d = _PROPERTY_VALIDATOR.validate("height", a, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var g = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, b);
        this.__defineSetter__("imageResource", function(h) {
            h = _PROPERTY_VALIDATOR.validate("imageResource", h, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.ImageResource
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.imageDrawableInterface.setImageResource",
                objectId: this.__id,
                imageResourceId: h.__id
            });
            e = h
        });
        this.__defineGetter__("imageResource", function() {
            return e
        });
        this.__defineSetter__("height", function(h) {
            h = _PROPERTY_VALIDATOR.validate("height", h, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.imageDrawableInterface.setHeight",
                objectId: this.__id,
                height: h
            });
            d = h
        });
        this.__defineGetter__("height", function() {
            if (this.__isDirty("height")) {
                AR.i.callSync({
                    is: "AR.i.imageDrawableInterface.getHeight",
                    objectId: this.__id
                })
            }
            return d
        });
        if (b && b.__DO_NOT_CREATE_OBJECT) {
            g.imageResource = f;
            g.height = a;
            return g
        } else {
            this.__defineSetter__("__id", function(h) {
                throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
            });
            this.__defineGetter__("__id", function() {
                return c
            });
            var c = AR.om.createObjectID();
            AR.i.callAsync({
                is: "AR.i.imageDrawableInterface.createImageDrawable",
                objectId: c,
                enabled: g.enabled,
                offsetX: g.offsetX,
                offsetY: g.offsetY,
                zOrder: g.zOrder,
                onClickTriggerActive: g.onClickActive,
                horizontalAnchor: g.horizontalAnchor,
                verticalAnchor: g.verticalAnchor,
                scale: g.scale,
                rotation: g.rotation,
                opacity: g.opacity,
                imageResourceId: f.__id,
                height: a,
                roll: g.roll,
                tilt: g.tilt,
                heading: g.heading
            });
            AR.om.registerObjectForID(c, this)
        }
    }
});
AR.AnimatedImageDrawable = AR.ImageDrawable.extend({
    init: function(f, j, i, c, k) {
        var a = _PROPERTY_VALIDATOR.validate("keyFrameWidth", i, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var d = _PROPERTY_VALIDATOR.validate("keyFrameHeight", c, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var h = 0;
        var e;
        if (k) {
            if (k.keyFrame) {
                h = _PROPERTY_VALIDATOR.validate("keyFrame", k.keyFrame, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (k.onFinish) {
                e = _PROPERTY_VALIDATOR.validate("onFinish", k.onFinish, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        if (!k) {
            k = {}
        }
        k.__DO_NOT_CREATE_OBJECT = true;
        var b = this._super(f, j, k);
        var g = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: g,
            is: "AR.i.animatedImageDrawableInterface.createAnimatedImageDrawable",
            enabled: b.enabled,
            offsetX: b.offsetX,
            offsetY: b.offsetY,
            zOrder: b.zOrder,
            onClickTriggerActive: b.onClickActive,
            onFinishTriggerActive: e != null,
            horizontalAnchor: b.horizontalAnchor,
            verticalAnchor: b.verticalAnchor,
            scale: b.scale,
            rotation: b.rotation,
            opacity: b.opacity,
            imageResourceId: b.imageResource.__id,
            height: b.height,
            keyFrameWidth: a,
            keyFrameHeight: d,
            keyFrame: h,
            roll: b.roll,
            tilt: b.tilt,
            heading: b.heading
        });
        AR.om.registerObjectForID(g, this);
        this.__defineSetter__("__id", function(l) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return g
        });
        this.__defineSetter__("onFinish", function(l) {
            l = _PROPERTY_VALIDATOR.validate("onFinish", l, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            e = l;
            AR.i.callAsync({
                is: "AR.i.animatedImageDrawableInterface.setOnFinishTriggerActive",
                objectId: this.__id,
                onFinishTriggerActive: e != null
            })
        });
        this.__defineGetter__("onFinish", function(l) {
            return e
        })
    },
    setKeyFrame: function(a) {
        var b = _PROPERTY_VALIDATOR.validate("keyFramePos", a, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.animatedImageDrawableInterface.setKeyFrame",
            keyFrame: b
        })
    },
    animate: function(c, e, b) {
        var d = this.validateKeyFrameArray(c);
        var f = _PROPERTY_VALIDATOR.validate("duration", e, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var a = 1;
        if (b) {
            a = _PROPERTY_VALIDATOR.validate("loopTimes", b, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
        }
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.animatedImageDrawableInterface.animate",
            keyFrames: AR.__toJSONString__(d),
            duration: f,
            loopTimes: a
        })
    },
    validateKeyFrameArray: function(b) {
        if (!(b instanceof Array)) {
            throw AR.ERROR.create(name, AR.ERROR.TYPE.ARRAY_CONTENT)
        }
        for (var a = 0; a < b.length; a++) {
            if (!(typeof b[a] == "number" && Math.round(b[a]) == b[a])) {
                throw AR.ERROR.create(name, AR.ERROR.TYPE.ARRAY_CONTENT)
            }
        }
        return b
    }
});
AR.Location = AR.ARchitectObject.extend({
    distanceTo: function(a) {
        a = _PROPERTY_VALIDATOR.validate("location", a, {
            type: _PROPERTY_VALIDATOR.TYPE.CLASS,
            ofType: AR.Location
        }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        return AR.i.callSync({
            is: "AR.i.locationInterface.distanceTo",
            objectId: this.__id,
            locationId: a.__id
        })
    },
    distanceToUser: function() {
        var a = AR.i.callSync({
            is: "AR.i.locationInterface.distanceToUser",
            objectId: this.__id
        });
        return a < 0 ? undefined : a
    }
});
AR.GeoLocation = AR.Location.extend({
    init: function(g, f, b) {
        this._super();
        var a = this.validateLatitude(g);
        var e = this.validateLongitude(f);
        var c = this.validateAltitude(b);
        var d = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: d,
            is: "AR.i.geoLocationInterface.createGeoLocation",
            latitude: a,
            longitude: e,
            altitude: c
        });
        AR.om.registerObjectForID(d, this);
        this.__defineSetter__("__id", function(h) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return d
        });
        this.__defineSetter__("latitude", function(h) {
            h = this.validateLatitude(h);
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.geoLocationInterface.setLatitude",
                latitude: h
            });
            a = h
        });
        this.__defineGetter__("latitude", function() {
            if (this.__isDirty("latitude")) {
                return AR.i.callSync({
                    objectId: d,
                    is: "AR.i.geoLocationInterface.getLatitude"
                })
            }
            return a
        });
        this.__defineSetter__("longitude", function(h) {
            h = this.validateLongitude(h);
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.geoLocationInterface.setLongitude",
                longitude: h
            });
            e = h
        });
        this.__defineGetter__("longitude", function() {
            if (this.__isDirty("longitude")) {
                return AR.i.callSync({
                    objectId: d,
                    is: "AR.i.geoLocationInterface.getLongitude"
                })
            }
            return e
        });
        this.__defineSetter__("altitude", function(h) {
            h = this.validateAltitude(h);
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.geoLocationInterface.setAltitude",
                altitude: h
            });
            c = h
        });
        this.__defineGetter__("altitude", function() {
            if (this.__isDirty("altitude")) {
                return AR.i.callSync({
                    objectId: d,
                    is: "AR.i.geoLocationInterface.getAltitude"
                })
            }
            return c
        })
    },
    validateLatitude: function(a) {
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("latitude", AR.ERROR.TYPE.FLOAT)
        }
        if (!AR.VALIDATE.isInRange(a, -90, 90)) {
            throw AR.ERROR.create("latitude", AR.ERROR.TYPE.RANGE, "[-90, 90]")
        }
        return a
    },
    validateLongitude: function(a) {
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("longitude", AR.ERROR.TYPE.FLOAT)
        }
        if (!AR.VALIDATE.isInRange(a, -180, 180)) {
            throw AR.ERROR.create("longitude", AR.ERROR.TYPE.RANGE, "[-180, 180]")
        }
        return a
    },
    validateAltitude: function(a) {
        a = (!AR.isDefined(a) ? AR.CONST.UNKNOWN_ALTITUDE : a);
        if (!AR.VALIDATE.isNumeric(a)) {
            throw AR.ERROR.create("altitude", AR.ERROR.TYPE.FLOAT)
        }
        return a
    }
});
AR.RelativeLocation = AR.Location.extend({
    init: function(g, a, e, c) {
        this._super();
        var h = _PROPERTY_VALIDATOR.validate("location", g, {
            type: _PROPERTY_VALIDATOR.TYPE.CLASS,
            ofType: AR.Location
        }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
        var b = _PROPERTY_VALIDATOR.validate("northing", a, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var d = _PROPERTY_VALIDATOR.validate("easting", e, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var i = _PROPERTY_VALIDATOR.validate("altitudeDelta", c, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
        if (!i) {
            i = 0
        }
        var f = AR.om.createObjectID();
        if (h) {
            AR.i.callAsync({
                objectId: f,
                is: "AR.i.relativeLocationInterface.createRelativeLocation",
                locationId: h.__id,
                northing: b,
                easting: d,
                altitudeDelta: i
            })
        } else {
            AR.i.callAsync({
                objectId: f,
                is: "AR.i.relativeLocationInterface.createRelativeLocationToUser",
                northing: b,
                easting: d,
                altitudeDelta: i
            })
        }
        AR.om.registerObjectForID(f, this);
        this.__defineSetter__("__id", function(j) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return f
        });
        this.__defineSetter__("location", function(j) {
            j = _PROPERTY_VALIDATOR.validate("location", j, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.Location
            }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (j) {
                AR.i.callAsync({
                    is: "AR.i.relativeLocationInterface.setLocation",
                    objectId: f,
                    locationId: j.__id
                })
            } else {
                AR.i.callAsync({
                    is: "AR.i.relativeLocationInterface.setLocationRelativeToUser",
                    objectId: f,
                })
            }
            h = j
        });
        this.__defineGetter__("location", function() {
            return h
        });
        this.__defineSetter__("northing", function(j) {
            j = _PROPERTY_VALIDATOR.validate("northing", j, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.relativeLocationInterface.setNorthing",
                objectId: f,
                northing: j
            });
            b = j
        });
        this.__defineGetter__("northing", function() {
            if (this.__isDirty("northing")) {
                return AR.i.callSync({
                    is: "AR.i.relativeLocationInterface.getNorthing",
                    objectId: f
                })
            }
            return b
        });
        this.__defineSetter__("easting", function(j) {
            j = _PROPERTY_VALIDATOR.validate("easting", j, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.relativeLocationInterface.setEasting",
                objectId: f,
                easting: j
            });
            d = j
        });
        this.__defineGetter__("easting", function() {
            if (this.__isDirty("easting")) {
                return AR.i.callSync({
                    is: "AR.i.relativeLocationInterface.getEasting",
                    objectId: f
                })
            }
            return d
        });
        this.__defineSetter__("altitudeDelta", function(j) {
            j = _PROPERTY_VALIDATOR.validate("altitudeDelta", j, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (!j) {
                j = 0
            }
            AR.i.callAsync({
                is: "AR.i.relativeLocationInterface.setAltitudeDelta",
                objectId: f,
                altitudeDelta: j
            });
            i = j
        });
        this.__defineGetter__("altitudeDelta", function() {
            if (this.__isDirty("altitudeDelta")) {
                return AR.i.callSync({
                    is: "AR.i.relativeLocationInterface.getAltitudeDelta",
                    objectId: f
                })
            }
            return i
        })
    }
});
AR.GeoObject = AR.ARObject.extend({
    init: function(b, c) {
        var e = this._super(c);
        var a = this.validateLocations(b);
        var d = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: d,
            is: "AR.i.geoObjectInterface.createGeoObject",
            locationIds: AR.__toJSONString__(AR.om.__getIds__(a)),
            enabled: e.enabled,
            onEnterFieldOfVisionTriggerActive: e.onEnterFieldOfVisionTriggerActive,
            onExitFieldOfVisionTriggerActive: e.onExitFieldOfVisionTriggerActive,
            onClickTriggerActive: e.onClickTriggerActive,
            camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(e.drawables.cam)),
            renderingOrder: e.renderingOrder,
            radarDrawableIds: AR.__toJSONString__(AR.om.__getIds__(e.drawables.radar)),
            indicatorDrawableIds: AR.__toJSONString__(AR.om.__getIds__(e.drawables.indicator))
        });
        AR.om.registerObjectForID(d, this);
        this.__defineSetter__("__id", function(f) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return d
        });
        this.__defineSetter__("locations", function(f) {
            f = this.validateLocations(f);
            AR.i.callAsync({
                objectId: d,
                locationIds: AR.__toJSONString__(AR.om.__getIds__(f)),
                is: "AR.i.geoObjectInterface.setLocations"
            });
            a = f
        });
        this.__defineGetter__("locations", function() {
            return a
        })
    },
    validateLocations: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("locations", AR.ERROR.TYPE.UNDEFINED)
        }
        if (a instanceof AR.Location) {
            a = new Array(a)
        } else {
            if (!AR.VALIDATE.isArrayOf(a, AR.Location)) {
                throw AR.ERROR.create("locations", AR.ERROR.TYPE.ARRAY_CONTENT)
            }
        }
        return a
    }
});
AR.ActionArea = AR.ARchitectObject.extend({
    validateOnEnter: function(a) {
        if (AR.VALIDATE.isDefined(a)&&!AR.VALIDATE.isFunction(a)) {
            throw AR.ERROR.create("_onEnter", AR.ERROR.TYPE.OBJECT, "function", typeof a)
        }
        return a
    },
    validateOnExit: function(a) {
        if (AR.VALIDATE.isDefined(a)&&!AR.VALIDATE.isFunction(a)) {
            throw AR.ERROR.create("_onExit", AR.ERROR.TYPE.OBJECT, "function", typeof a)
        }
        return a
    },
    validateEnabled: function(a) {
        if (a == null || a == undefined) {
            return true
        }
        if (!AR.VALIDATE.isBoolean(a)) {
            throw AR.ERROR.create("enabled", AR.ERROR.TYPE.BOOLEAN)
        }
        return a
    },
    init: function(b) {
        this._super();
        var a = true;
        var d = null;
        var c = null;
        if (b != null) {
            a = this.validateEnabled(b.enabled);
            d = this.validateOnEnter(b.onEnter);
            c = this.validateOnExit(b.onExit)
        }
        this.__defineSetter__("enabled", function(e) {
            e = this.validateEnabled(e);
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.actionAreaInterface.setEnabled",
                enabled: e
            });
            a = e
        });
        this.__defineGetter__("enabled", function() {
            return a
        });
        this.__defineSetter__("onEnter", function(e) {
            e = this.validateOnEnter(e);
            d = e;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.actionAreaInterface.setOnEnterTriggerActive",
                onEnterTriggerActive: (d != null)
            })
        });
        this.__defineGetter__("onEnter", function() {
            return d
        });
        this.__defineSetter__("onExit", function(e) {
            e = this.validateOnExit(e);
            c = e;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.actionAreaInterface.setOnExitTriggerActive",
                onExitTriggerActive: (c != null)
            })
        });
        this.__defineGetter__("onExit", function() {
            return c
        });
        return {
            enabled: a,
            onEnterTriggerActive: d != null,
            onExitTriggerActive: c != null
        }
    },
    isInArea: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("geoLocation", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isTypeOf(a, AR.GeoLocation)) {
            throw AR.ERROR.create("geoLocation", AR.ERROR.TYPE.OBJECT, "geoLocation", typeof val)
        }
        return AR.i.callSync({
            objectId: this.__id,
            is: "AR.i.actionAreaInterface.isInArea",
            geoLocationId: a.__id
        })
    }
});
AR.ActionRange = AR.ActionArea.extend({
    init: function(b, a, d) {
        var f = this.validateRadius(a);
        var c = this.validateLocation(b);
        var g = this._super(d);
        var e = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: e,
            is: "AR.i.actionRangeInterface.createActionRange",
            locationId: c.__id,
            radius: f,
            enabled: g.enabled,
            onEnterTriggerActive: g.onEnterTriggerActive,
            onExitTriggerActive: g.onExitTriggerActive
        });
        AR.om.registerObjectForID(e, this);
        this.__defineSetter__("__id", function(h) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return e
        });
        this.__defineSetter__("radius", function(h) {
            h = this.validateRadius(h);
            AR.i.callAsync({
                objectId: e,
                radius: h,
                is: "AR.i.actionRangeInterface.setRadius"
            });
            f = h
        });
        this.__defineGetter__("radius", function() {
            if (this.__isDirty("radius")) {
                return AR.i.callSync({
                    objectId: e,
                    is: "AR.i.actionRangeInterface.getRadius"
                })
            }
            return f
        });
        this.__defineSetter__("location", function(h) {
            h = this.validateLocation(h);
            AR.i.callAsync({
                objectId: e,
                locationId: h.__id,
                is: "AR.i.actionRangeInterface.setLocation"
            });
            c = h
        });
        this.__defineGetter__("location", function() {
            return c
        })
    },
    validateRadius: function(a) {
        if (!AR.VALIDATE.isNonNegative(a)) {
            throw AR.ERROR.create("radius", AR.ERROR.TYPE.RANGE, "[0, infinity)")
        }
        return a
    },
    validateLocation: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("location", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isTypeOf(a, AR.Location)) {
            throw AR.ERROR.create("location", AR.ERROR.TYPE.OBJECT, "Location", typeof a)
        }
        return a
    }
});
AR.BoundingRectangle = PClass.create({
    init: function(b, a) {
        var b = b;
        var a = a;
        this.getWidth = function() {
            return b
        };
        this.getHeight = function() {
            return a
        }
    }
});
AR.ImageResource = AR.ARchitectObject.extend({
    init: function(d, b) {
        this._super();
        var f = this.validateUri(d);
        var e, a;
        if (b != null) {
            if (b.onLoaded != null) {
                e = this.validateOnLoaded(b.onLoaded)
            }
            if (b.onError != null) {
                a = this.validateOnError(b.onError)
            }
        }
        var c = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: c,
            is: "AR.i.imageResourceInterface.createImageResource",
            uri: AR.__resourceUrl(f),
            onLoadedTriggerActive: e != null,
            onErrorTriggerActive: a != null
        });
        AR.om.registerObjectForID(c, this);
        this.__defineSetter__("__id", function(g) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return c
        });
        this.__defineSetter__("onLoaded", function(g) {
            g = this.validateOnLoaded(g);
            e = g;
            AR.i.callAsync({
                is: "AR.i.imageResourceInterface.setOnLoadedTriggerActive",
                objectId: c,
                onLoadedTriggerActive: g != null
            })
        });
        this.__defineGetter__("onLoaded", function() {
            return e
        });
        this.__defineSetter__("onError", function(g) {
            g = this.validateOnError(g);
            a = g;
            AR.i.callAsync({
                is: "AR.i.imageResourceInterface.setOnErrorTriggerActive",
                objectId: c,
                onErrorTriggerActive: g != null
            })
        });
        this.__defineGetter__("onError", function() {
            return a
        });
        this.getUri = function() {
            return f
        }
    },
    validateUri: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isString(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
        }
        return a
    },
    validateOnLoaded: function(a) {
        if (AR.VALIDATE.isDefined(a)&&!AR.VALIDATE.isFunction(a)) {
            throw AR.ERROR.create("onLoaded", AR.ERROR.TYPE.OBJECT, "function", typeof a)
        }
        return a
    },
    validateOnError: function(a) {
        if (AR.VALIDATE.isDefined(a)&&!AR.VALIDATE.isFunction(a)) {
            throw AR.ERROR.create("onError", AR.ERROR.TYPE.OBJECT, "function", typeof a)
        }
        return a
    },
    getWidth: function() {
        return AR.i.callSync({
            is: "AR.i.imageResourceInterface.getWidth",
            objectId: this.__id
        })
    },
    getHeight: function() {
        return AR.i.callSync({
            is: "AR.i.imageResourceInterface.getHeight",
            objectId: this.__id
        })
    },
    isLoaded: function() {
        return AR.i.callSync({
            is: "AR.i.imageResourceInterface.isLoaded",
            objectId: this.__id
        })
    }
});
AR.Animation = AR.ARchitectObject.extend({
    init: function(a) {
        this._super();
        var c = null;
        var b = null;
        if (a != null) {
            c = _PROPERTY_VALIDATOR.validate("onStart", a.onStart, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            b = _PROPERTY_VALIDATOR.validate("onFinish", a.onFinish, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
        }
        this.__defineSetter__("onStart", function(d) {
            d = _PROPERTY_VALIDATOR.validate("onStart", d, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            c = d;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animationInterface.setOnStartTriggerActive",
                onStartTriggerActive: c != null
            })
        });
        this.__defineGetter__("onStart", function() {
            return c
        });
        this.__defineSetter__("onFinish", function(d) {
            d = _PROPERTY_VALIDATOR.validate("onFinish", d, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            b = d;
            AR.i.callAsync({
                objectId: this.__id,
                is: "AR.i.animationInterface.setOnFinishTriggerActive",
                onFinishTriggerActive: b != null
            })
        });
        this.__defineGetter__("onFinish", function() {
            return b
        });
        return {
            onStartActive: c != null,
            onFinishActive: b != null
        }
    },
    isRunning: function() {
        return AR.i.callSync({
            objectId: this.__id,
            is: "AR.i.animationInterface.isRunning"
        })
    },
    start: function(a) {
        a = _PROPERTY_VALIDATOR.validate("loopTimes", a, _PROPERTY_VALIDATOR.TYPE.INT, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
        if (!a && a != 0) {
            a = 1
        }
        if (this instanceof AR.PropertyAnimation) {
            this.__handleDirtyPropertyOnStart()
        }
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.animationInterface.start",
            loopTimes: a
        })
    },
    stop: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.animationInterface.stop"
        });
        if (this instanceof AR.PropertyAnimation) {
            this.__handleDirtyPropertyOnStop()
        }
    },
    pause: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.animationInterface.pause"
        })
    },
    resume: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.animationInterface.resume"
        })
    }
});
AR.ModelAnimation = AR.Animation.extend({
    init: function(b, h, a) {
        var e = this._super(a);
        var g = _PROPERTY_VALIDATOR.validate("model", b, {
            type: _PROPERTY_VALIDATOR.TYPE.CLASS,
            ofType: AR.Model
        }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var d = _PROPERTY_VALIDATOR.validate("animationId", h, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var f =- 1;
        if (a) {
            if (a.duration) {
                f = _PROPERTY_VALIDATOR.validate("duration", a.duration, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE_INT, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        var c = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: c,
            is: "AR.i.modelAnimationInterface.createModelAnimation",
            modelId: g.__id,
            animationId: d,
            duration: f,
            onStartTriggerActive: e.onStartActive,
            onFinishTriggerActive: e.onFinishActive
        });
        AR.om.registerObjectForID(c, this);
        this.__defineSetter__("__id", function(i) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return c
        })
    }
});
AR.PropertyAnimation = AR.Animation.extend({
    init: function(s, j, g, e, a, p, d) {
        var k = this._super(d);
        var m = _PROPERTY_VALIDATOR.validate("target", s, {
            type: _PROPERTY_VALIDATOR.TYPE.CLASS,
            ofType: AR.ARchitectObject
        }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var n = _PROPERTY_VALIDATOR.validate("property", j, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var b = m;
        var h = n.split(".");
        for (var q = 0; q < h.length-1; q++) {
            b = b[h[q]]
        }
        if (b[h[h.length-1]] == null || typeof b[h[h.length-1]] != "number") {
            throw AR.ERROR.ERROR_PREFIX + "Property " + n + " is not animateable."
        }
        var r = _PROPERTY_VALIDATOR.validate("start", g, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
        if (r != null && r != undefined) {
            r = "[" + r + "]"
        }
        var l = "[" + _PROPERTY_VALIDATOR.validate("end", e, _PROPERTY_VALIDATOR.TYPE.NUMERIC, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET) + "]";
        var f = _PROPERTY_VALIDATOR.validate("duration", a, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        if (!p ||!(p.type)) {
            p = {
                type: AR.CONST.EASING_CURVE_TYPE.LINEAR
            }
        }
        var o = this.validateEasingCurve(p);
        var c = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: c,
            is: "AR.i.propertyAnimationInterface.createPropertyAnimation",
            targetId: m.__id,
            property: n,
            start: r,
            end: l,
            duration: f,
            easingCurve: AR.__toJSONString__(o),
            onStartTriggerActive: k.onStartActive,
            onFinishTriggerActive: k.onFinishActive
        });
        AR.om.registerObjectForID(c, this);
        this.__defineSetter__("__id", function(i) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return c
        });
        this.__handleDirtyPropertyOnStart = function(i) {
            m.__alertDirty(n)
        };
        this.__handleDirtyPropertyOnStop = function(i) {
            m.__removeDirt(n)
        }
    },
    validateEasingCurve: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("easingCurve", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.CONST.EASING_CURVE_TYPE.isValidEasingCurveType(a.type)) {
            throw AR.ERROR.create("easingCurve.type", AR.ERROR.TYPE.ENUMERATION, "AR.CONST.EASING_CURVE_TYPE.___")
        }
        if (AR.VALIDATE.isDefined(a.amplitude)&&!AR.VALIDATE.isNumeric(a.amplitude)) {
            throw AR.ERROR.create("easingCurve.amplitude", AR.ERROR.TYPE.FLOAT)
        }
        if (AR.VALIDATE.isDefined(a.period)&&!AR.VALIDATE.isNumeric(a.period)) {
            throw AR.ERROR.create("easingCurve.period", AR.ERROR.TYPE.FLOAT)
        }
        if (AR.VALIDATE.isDefined(a.overshoot)&&!AR.VALIDATE.isNumeric(a.overshoot)) {
            throw AR.ERROR.create("easingCurve.overshoot", AR.ERROR.TYPE.FLOAT)
        }
        return a
    }
});
AR.AnimationGroup = AR.Animation.extend({
    init: function(d, g, b) {
        var f = this._super(b);
        if (!AR.CONST.ANIMATION_GROUP_TYPE.isValidAnimationGroupType(d)) {
            throw AR.ERROR.create(d, AR.ERROR.TYPE.OBJECT, "AR.CONST.ANIMATION_GROUP_TYPE")
        }
        var a = d;
        var e = _PROPERTY_VALIDATOR.validate("animations", g, {
            type: _PROPERTY_VALIDATOR.TYPE.ARRAY,
            ofType: AR.Animation
        }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var c = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: c,
            is: "AR.i.animationGroupInterface.createAnimationGroup",
            type: a,
            animationIds: AR.__toJSONString__(AR.om.__getIds__(e)),
            onStartTriggerActive: f.onStartActive,
            onFinishTriggerActive: f.onFinishActive
        });
        AR.om.registerObjectForID(c, this);
        this.__defineSetter__("__id", function(h) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return c
        })
    }
});
AR.Sound = AR.ARchitectObject.extend({
    init: function(f, d) {
        this._super();
        var h = this.validateUri(f);
        var b = AR.CONST.STATE.INITIALIZED;
        var g = null;
        var a = null;
        var c = null;
        if (d != null) {
            g = this.validateOnX("onLoaded", d.onLoaded);
            a = this.validateOnX("onFinishedPlaying", d.onFinishedPlaying);
            c = this.validateOnX("onError", d.onError)
        }
        var e = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: e,
            is: "AR.i.soundInterface.createSound",
            uri: AR.__resourceUrl(h),
            onLoadedTriggerActive: g != null,
            onFinishedPlayingTriggerActive: a != null,
            onErrorTriggerActive: c != null
        });
        AR.om.registerObjectForID(e, this);
        this.__defineSetter__("__id", function(i) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return e
        });
        this.__defineSetter__("uri", function(i) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("uri", function() {
            return h
        });
        this.__defineSetter__("state", function(i) {
            throw AR.ERROR.create("state", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("state", function() {
            return AR.i.callSync({
                objectId: e,
                is: "AR.i.soundInterface.getState"
            })
        });
        this.__defineSetter__("onLoaded", function(i) {
            i = this.validateOnX("onLoaded", i);
            g = i;
            AR.i.callAsync({
                objectId: e,
                is: "AR.i.soundInterface.setOnLoadedTriggerActive",
                onLoadedTriggerActive: i != null
            })
        });
        this.__defineGetter__("onLoaded", function() {
            return g
        });
        this.__defineSetter__("onFinishedPlaying", function(i) {
            i = this.validateOnX("onFinishedPlaying", i);
            a = i;
            AR.i.callAsync({
                objectId: e,
                is: "AR.i.soundInterface.setOnFinishedPlayingTriggerActive",
                onFinishedPlayingTriggerActive: i != null
            })
        });
        this.__defineGetter__("onFinishedPlaying", function() {
            return a
        });
        this.__defineSetter__("onError", function(i) {
            i = this.validateOnX("onError", i);
            c = i;
            AR.i.callAsync({
                objectId: e,
                is: "AR.i.soundInterface.setOnErrorTriggerActive",
                onErrorTriggerActive: i != null
            })
        });
        this.__defineGetter__("onError", function() {
            return c
        })
    },
    validateUri: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isString(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
        }
        return a
    },
    validateOnX: function(a, b) {
        if (AR.VALIDATE.isDefined(b)&&!AR.VALIDATE.isFunction(b)) {
            throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, "function", typeof b)
        }
        return b
    },
    play: function(a) {
        if (a === undefined) {
            a = 1
        } else {
            if (!AR.VALIDATE.isWholeNumber(a)) {
                throw AR.ERROR.create("loopTimes", AR.ERROR.TYPE.INT)
            }
        }
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.soundInterface.play",
            loopTimes: a
        })
    },
    stop: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.soundInterface.stop"
        })
    },
    pause: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.soundInterface.pause"
        })
    },
    resume: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.soundInterface.resume"
        })
    },
    load: function() {
        AR.i.callAsync({
            objectId: this.__id,
            is: "AR.i.soundInterface.load"
        })
    }
});
AR.Style = PClass.create({
    validateHex: function(a, b) {
        if (!AR.VALIDATE.isHex(b)) {
            throw AR.ERROR.create(a, AR.ERROR.TYPE.HEX)
        }
        return b
    },
    validateOutlineSize: function(a) {
        if (!AR.VALIDATE.isWholeNumber(a)) {
            throw AR.ERROR.create("outlineSize", AR.ERROR.TYPE.INT)
        }
        if (!AR.VALIDATE.isInRange(a, 0, 128)) {
            throw AR.ERROR.create("outlineSize", AR.ERROR.TYPE.RANGE, "[0, 128]")
        }
        return a
    },
    validateFontStyle: function(a) {
        if (!a) {
            return AR.CONST.FONT_STYLE.NORMAL
        }
        if (!AR.CONST.FONT_STYLE.isValidFontStyle(a)) {
            throw AR.ERROR.create("fontStyle", AR.ERROR.TYPE.RANGE, "AR.CONST.FONT_STYLE.___")
        }
        return a
    },
    init: function(d, h) {
        var a = d;
        var g = "#00000000";
        var c = "#000000FF";
        var e = 0;
        var b = "#FFFFFF00";
        var f = AR.CONST.FONT_STYLE.NORMAL;
        var i = "#000000FF";
        if (h != null) {
            if (h.backgroundColor != null) {
                g = this.validateHex("backgroundColor", h.backgroundColor)
            }
            if (h.fillColor != null) {
                c = this.validateHex("fillColor", h.fillColor)
            }
            if (h.outlineSize != null) {
                e = this.validateOutlineSize(h.outlineSize)
            }
            if (h.outlineColor != null) {
                b = this.validateHex("outlineColor", h.outlineColor)
            }
            if (h.fontStyle != null) {
                f = this.validateFontStyle(h.fontStyle)
            }
            if (h.textColor != null) {
                i = this.validateHex("textColor", h.textColor)
            }
        }
        this.__defineSetter__("backgroundColor", function(j) {
            j = this.validateHex("backgroundColor", j);
            g = j;
            a.setStyleInInterface(j)
        });
        this.__defineGetter__("backgroundColor", function() {
            return g
        });
        this.__defineSetter__("fillColor", function(j) {
            j = this.validateHex("fillColor", j);
            c = j;
            a.setStyleInInterface(j)
        });
        this.__defineGetter__("fillColor", function() {
            return c
        });
        this.__defineSetter__("outlineSize", function(j) {
            j = this.validateOutlineSize(j);
            e = j;
            a.setStyleInInterface(j)
        });
        this.__defineGetter__("outlineSize", function() {
            return e
        });
        this.__defineSetter__("outlineColor", function(j) {
            j = this.validateHex("outlineColor", j);
            b = j;
            a.setStyleInInterface(j)
        });
        this.__defineGetter__("outlineColor", function() {
            return b
        });
        this.__defineSetter__("fontStyle", function(j) {
            j = this.validateFontStyle(j);
            f = j;
            a.setStyleInInterface(j)
        });
        this.__defineGetter__("fontStyle", function() {
            return f
        });
        this.__defineSetter__("textColor", function(j) {
            j = this.validateHex("textColor", j);
            i = j;
            a.setStyleInInterface(j)
        });
        this.__defineGetter__("textColor", function() {
            return i
        })
    }
});
AR.CONST = {
    LOCATION_ACCURACY: {
        LOW: 1,
        MEDIUM: 2,
        HIGH: 3
    },
    UNKNOWN_ALTITUDE: -32768,
    HORIZONTAL_ANCHOR: {
        LEFT: 0,
        CENTER: 1,
        RIGHT: 2,
        isValidHorizontalAnchor: function(a) {
            switch (a) {
            case AR.CONST.HORIZONTAL_ANCHOR.LEFT:
            case AR.CONST.HORIZONTAL_ANCHOR.CENTER:
            case AR.CONST.HORIZONTAL_ANCHOR.RIGHT:
                return true;
            default:
                return false
            }
        },
        toName: function(a) {
            switch (a) {
            case AR.CONST.HORIZONTAL_ANCHOR.LEFT:
                return "AR.CONST.HORIZONTAL_ANCHOR.LEFT";
            case AR.CONST.HORIZONTAL_ANCHOR.CENTER:
                return "AR.CONST.HORIZONTAL_ANCHOR.CENTER";
            case AR.CONST.HORIZONTAL_ANCHOR.RIGHT:
                return "AR.CONST.HORIZONTAL_ANCHOR.RIGHT";
            default:
                return null
            }
        }
    },
    VERTICAL_ANCHOR: {
        TOP: 3,
        MIDDLE: 4,
        BOTTOM: 5,
        isValidVerticalAnchor: function(a) {
            switch (a) {
            case AR.CONST.VERTICAL_ANCHOR.TOP:
            case AR.CONST.VERTICAL_ANCHOR.MIDDLE:
            case AR.CONST.VERTICAL_ANCHOR.BOTTOM:
                return true;
            default:
                return false
            }
        },
        toName: function(a) {
            switch (a) {
            case AR.CONST.VERTICAL_ANCHOR.TOP:
                return "AR.CONST.VERTICAL_ANCHOR.TOP";
            case AR.CONST.VERTICAL_ANCHOR.MIDDLE:
                return "AR.CONST.VERTICAL_ANCHOR.MIDDLE";
            case AR.CONST.VERTICAL_ANCHOR.BOTTOM:
                return "AR.CONST.VERTICAL_ANCHOR.BOTTOM";
            default:
                return null
            }
        }
    },
    EASING_CURVE_TYPE: {
        LINEAR: "linear",
        EASE_IN_QUAD: "easeInQuad",
        EASE_OUT_QUAD: "easeOutQuad",
        EASE_IN_OUT_QUAD: "easeInOutQuad",
        EASE_OUT_IN_QUAD: "easeOutInQuad",
        EASE_IN_CUBIC: "easeInCubic",
        EASE_OUT_CUBIC: "easeOutCubic",
        EASE_IN_OUT_CUBIC: "easeInOutCubic",
        EASE_OUT_IN_CUBIC: "easeOutInCubic",
        EASE_IN_QUAT: "easeInQuat",
        EASE_OUT_QUAT: "easeOutQuat",
        EASE_IN_OUT_QUAT: "easeInOutQuat",
        EASE_OUT_IN_QUAT: "easeOutInQuat",
        EASE_IN_QUINT: "easeInQuint",
        EASE_OUT_QUINT: "easeOutQuint",
        EASE_IN_OUT_QUINT: "easeInOutQuint",
        EASE_OUT_IN_QUINT: "easeOutInQuint",
        EASE_IN_ELASTIC: "easeInElastic",
        EASE_OUT_ELASTIC: "easeOutElastic",
        EASE_IN_OUT_ELASTIC: "easeInOutElastic",
        EASE_OUT_IN_ELASTIC: "easeOutInElastic",
        EASE_IN_BACK: "easeInBack",
        EASE_OUT_BACK: "easeOutBack",
        EASE_IN_OUT_BACK: "easeInOutBack",
        EASE_OUT_IN_BACK: "easeOutInBack",
        EASE_IN_SINE: "easeInSine",
        EASE_OUT_SINE: "easeOutSine",
        EASE_IN_OUT_SINE: "easeInOutSine",
        EASE_OUT_IN_SINE: "easeOutInSine",
        EASE_IN_EXPO: "easeInExpo",
        EASE_OUT_EXPO: "easeOutExpo",
        EASE_IN_OUT_EXPO: "easeInOutExpo",
        EASE_OUT_IN_EXPO: "easeOutInExpo",
        EASE_IN_CIRC: "easeInCirc",
        EASE_OUT_CIRC: "easeOutCirc",
        EASE_IN_OUT_CIRC: "easeInOutCirc",
        EASE_OUT_IN_CIRC: "easeOutInCirc",
        EASE_IN_BOUNCE: "easeInBounce",
        EASE_OUT_BOUNCE: "easeOutBounce",
        EASE_IN_OUT_BOUNCE: "easeInOutBounce",
        EASE_OUT_IN_BOUNCE: "easeOutInBounce",
        EASE_IN_CURVE: "easeInCurve",
        EASE_OUT_CURVE: "easeOutCurve",
        isValidEasingCurveType: function(a) {
            switch (a) {
            case AR.CONST.EASING_CURVE_TYPE.LINEAR:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUAD:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUAD:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAD:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUAD:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_CUBIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CUBIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CUBIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_CUBIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUAT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUAT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUAT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUAT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_QUINT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_QUINT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_QUINT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_QUINT:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_ELASTIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_ELASTIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_ELASTIC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_BACK:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_BACK:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_BACK:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_BACK:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_SINE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_SINE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_SINE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_SINE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_EXPO:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_EXPO:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_EXPO:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_EXPO:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_CIRC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CIRC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_CIRC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_CIRC:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_BOUNCE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_BOUNCE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_OUT_BOUNCE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_IN_BOUNCE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_IN_CURVE:
            case AR.CONST.EASING_CURVE_TYPE.EASE_OUT_CURVE:
                return true;
            default:
                return false
            }
        }
    },
    ANIMATION_GROUP_TYPE: {
        PARALLEL: "parallel",
        SEQUENTIAL: "sequential",
        isValidAnimationGroupType: function(a) {
            switch (a) {
            case AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL:
            case AR.CONST.ANIMATION_GROUP_TYPE.SEQUENTIAL:
                return true;
            default:
                return false
            }
        }
    },
    FONT_STYLE: {
        NORMAL: "normal",
        BOLD: "bold",
        ITALIC: "italic",
        isValidFontStyle: function(a) {
            switch (a) {
            case AR.CONST.FONT_STYLE.NORMAL:
            case AR.CONST.FONT_STYLE.BOLD:
            case AR.CONST.FONT_STYLE.ITALIC:
                return true;
            default:
                return false
            }
        },
        toName: function(a) {
            switch (a) {
            case AR.CONST.FONT_STYLE.NORMAL:
                return "AR.CONST.FONT_STYLE.NORMAL";
            case AR.CONST.FONT_STYLE.BOLD:
                return "AR.CONST.FONT_STYLE.BOLD";
            case AR.CONST.FONT_STYLE.ITALIC:
                return "AR.CONST.FONT_STYLE.ITALIC";
            default:
                return null
            }
        }
    },
    STATE: {
        ERROR: -1,
        INITIALIZED: 0,
        LOADING: 1,
        LOADED: 2,
        PLAYING: 3,
        PAUSED: 4,
        toName: function(a) {
            switch (a) {
            case AR.CONST.STATE.ERROR:
                return "AR.CONST.STATE.ERROR";
            case AR.CONST.STATE.INITIALIZED:
                return "AR.CONST.STATE.INITIALIZED";
            case AR.CONST.STATE.LOADING:
                return "AR.CONST.STATE.LOADING";
            case AR.CONST.STATE.LOADED:
                return "AR.CONST.STATE.LOADED";
            case AR.CONST.STATE.PLAYING:
                return "AR.CONST.STATE.PLAYING";
            case AR.CONST.STATE.PAUSED:
                return "AR.CONST.STATE.PAUSED";
            default:
                return null
            }
        }
    },
    CLICK_BEHAVIOR: {
        CLICK: "touchClick",
        TOUCH_UP: "touchUp",
        TOUCH_DOWN: "touchDown"
    }
};
AR.OneTimeUseContextConstructionPlan = PClass.create({
    validateFunction: function(a, b) {
        if (AR.VALIDATE.isDefined(b)&&!AR.VALIDATE.isFunction(b)) {
            throw AR.ERROR.create(a, AR.ERROR.TYPE.OBJECT, "function", typeof b)
        }
        return b
    },
    init: function() {
        var a = null;
        _onScreenClick = null;
        _destroyAll = function() {
            AR.om.destroyAllObjects(true);
            AR.i.callAsync({
                is: "AR.i.contextInterface.destroyAll"
            })
        };
        _clickBehavior = AR.CONST.CLICK_BEHAVIOR.CLICK;
        this.__defineSetter__("onLocationChanged", function(f) {
            f = this.validateFunction("onLocationChanged", f);
            a = f;
            AR.i.callAsync({
                is: "AR.i.contextInterface.setOnLocationChangedTriggerActive",
                onLocationChangedTriggerActive: a != null
            })
        });
        this.__defineGetter__("onLocationChanged", function() {
            return a
        });
        this.__defineSetter__("onScreenClick", function(f) {
            f = this.validateFunction("onScreenClick", f);
            _onScreenClick = f;
            AR.i.callAsync({
                is: "AR.i.contextInterface.setOnScreenClickTriggerActive",
                onScreenClickTriggerActive: _onScreenClick != null
            })
        });
        this.__defineGetter__("onScreenClick", function() {
            return _onScreenClick
        });
        this.__defineSetter__("destroyAll", function(f) {
            throw AR.ERROR.create("destroyAll", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("destroyAll", function() {
            return _destroyAll
        });
        this.__defineSetter__("clickBehavior", function(f) {
            if (f != AR.CONST.CLICK_BEHAVIOR.CLICK && f != AR.CONST.CLICK_BEHAVIOR.TOUCH_UP && f != AR.CONST.CLICK_BEHAVIOR.TOUCH_DOWN) {
                throw AR.ERROR.create("clickBehavior", AR.ERROR.TYPE.OBJECT, "CLICK_BEHAVIOR.___", typeof f)
            }
            _clickBehavior = f;
            if (AR.js.clickBehavior) {
                AR.js.clickBehavior.setClickBehavior(_clickBehavior)
            }
        });
        this.__defineGetter__("clickBehavior", function() {
            return _clickBehavior
        });
        var b = function() {
            var g = true;
            var f = true;
            this.__defineGetter__("camera", function() {
                return g
            });
            this.__defineSetter__("camera", function(h) {
                h = _PROPERTY_VALIDATOR.validate("services.camera", h, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                g = h;
                AR.i.callAsync({
                    is: "AR.i.contextInterface.setServiceEnabled",
                    service: "camera",
                    enabled: g
                })
            });
            this.__defineGetter__("sensors", function() {
                return f
            });
            this.__defineSetter__("sensors", function(h) {
                h = _PROPERTY_VALIDATOR.validate("services.sensors", h, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                f = h;
                AR.i.callAsync({
                    is: "AR.i.contextInterface.setServiceEnabled",
                    service: "sensors",
                    enabled: f
                })
            })
        };
        var d = new b();
        this.__defineSetter__("services", function(f) {
            throw AR.ERROR.create("services", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("services", function() {
            return d
        });
        var d = new b();
        this.__defineSetter__("services", function(f) {
            throw AR.ERROR.create("services", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("services", function() {
            return d
        });
        var e = function() {
            var h = 50000;
            var j = 10;
            var i = 20000;
            var g = 0.1;
            this.__defineGetter__("minScalingDistance", function() {
                return j
            });
            this.__defineSetter__("minScalingDistance", function(k) {
                k = _PROPERTY_VALIDATOR.validate("scene.minScalingDistance", k, _PROPERTY_VALIDATOR.TYPE.POSITIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                j = k;
                f()
            });
            this.__defineGetter__("maxScalingDistance", function() {
                return i
            });
            this.__defineSetter__("maxScalingDistance", function(k) {
                k = _PROPERTY_VALIDATOR.validate("scene.maxScalingDistance", k, _PROPERTY_VALIDATOR.TYPE.POSITIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                i = k;
                f()
            });
            this.__defineGetter__("scalingFactor", function() {
                return g
            });
            this.__defineSetter__("scalingFactor", function(k) {
                k = _PROPERTY_VALIDATOR.validate("scene.scalingFactor", k, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                g = k;
                f()
            });
            var f = function() {
                AR.i.callAsync({
                    is: "AR.i.contextInterface.setDistanceBasedScalingParameters",
                    dbs: g,
                    dCutOffMin: j,
                    dCutOffMax: i
                })
            };
            this.__defineGetter__("cullingDistance", function() {
                return h
            });
            this.__defineSetter__("cullingDistance", function(k) {
                k = _PROPERTY_VALIDATOR.validate("scene.cullingDistance", k, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
                h = k;
                AR.i.callAsync({
                    is: "AR.i.contextInterface.setCullingDistance",
                    cullingDistance: h
                })
            })
        };
        var c = new e();
        this.__defineSetter__("scene", function(f) {
            throw AR.ERROR.create("scene", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("scene", function() {
            return c
        });
        AR.OneTimeUseContextConstructionPlan = null
    },
    startVideoPlayer: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isString(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
        }
        AR.i.callAsync({
            is: "AR.i.contextInterface.startVideoPlayer",
            uri: AR.__resourceUrl(a)
        })
    },
    openInBrowser: function(a, b) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("url", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isDefined(b)) {
            b = false
        }
        if (!AR.VALIDATE.isBoolean(b)) {
            throw AR.ERROR.create("forceNativeBrowser", AR.ERROR.TYPE.BOOLEAN)
        }
        AR.i.callAsync({
            is: "AR.i.contextInterface.openInBrowser",
            url: a,
            forceNativeBrowser: b
        })
    },
    activateBatchCreation: function() {
        AR.bm.setBatchCreationActive()
    },
    deactivateBatchCreation: function() {
        AR.bm.setBatchCreationDeactivated()
    }
});
AR.context = new AR.OneTimeUseContextConstructionPlan();
AR.OneTimeUseLoggerConstructionPlan = function() {
    var b = false;
    var f = [];
    var e = null;
    var d = false;
    var g = [];
    this.registerRegistrar = function(i, h) {
        e = i;
        d = (!h ? false : h)
    };
    this.changeLogLevelEnabled = function(i, h) {
        if (h) {
            g.push(i)
        } else {
            if (g.indexOf(i)!=-1) {
                g.splice(g.indexOf(i), 1)
            }
        }
        a()
    };
    this.toggleLogLevelEnabled = function(h) {
        this.changeLogLevelEnabled(h, g.indexOf(h)==-1)
    };
    this.error = function(h) {
        c(new AR.__LOGGER_MESSAGE__("ERROR", h))
    };
    this.warning = function(h) {
        c(new AR.__LOGGER_MESSAGE__("WARNING", h))
    };
    this.info = function(h) {
        c(new AR.__LOGGER_MESSAGE__("INFO", h))
    };
    this.debug = function(h) {
        c(new AR.__LOGGER_MESSAGE__("DEBUG", h))
    };
    var c = function(h) {
        if (!e) {
            return 
        }
        f.push(h);
        if (g.indexOf(h.type)!=-1) {
            e.appendLine(h.toString(d), h.color)
        }
    };
    var a = function() {
        if (!e) {
            return 
        }
        e.clearConsole();
        var j = f.length;
        for (var h = 0; h < j; h++) {
            if (g.indexOf(f[h].type)!=-1) {
                e.appendLine(f[h].toString(d), f[h].color)
            }
        }
    };
    this.clearConsole = function() {
        f = [];
        if (!e) {
            return 
        }
        e.clearConsole()
    };
    this.activateDebugMode = function() {
        if (!b) {
            if (__ARCHITECT_LOGGER_FRAMEWORK__) {
                b = true;
                __ARCHITECT_LOGGER_FRAMEWORK__.activateDebugMode()
            }
        }
    };
    AR.OneTimeUseLoggerConstructionPlan = null
};
AR.logger = new AR.OneTimeUseLoggerConstructionPlan();
AR.__LOGGER_MESSAGE__ = function(b, c) {
    this.type = b;
    this.date = new Date();
    this.message = c;
    this.color = null;
    switch (b) {
    case"ERROR":
        this.color = "red";
        break;
    case"WARNING":
        this.color = "orange";
        break;
    case"INFO":
        this.color = "green";
        break;
    default:
        this.color = "black";
        break
    }
    this.toString = function(f) {
        var e = this.type.substring(0, 1) + " " + d(this.date) + " - " + this.message;
        if (f) {
            return "<font color=" + this.color + ">" + e + "</font>"
        } else {
            return e
        }
    };
    var d = function(f) {
        var e = f.getHours();
        var g = f.getMinutes();
        var h = f.getSeconds();
        return a(e) + ":" + a(g) + ":" + a(h)
    };
    var a = function(e) {
        if (e < 10) {
            return "0" + e
        }
        return e
    }
};
AR.OneTimeUseRadarConstructionPlan = PClass.create({
    init: function() {
        var e = null;
        var f = false;
        var b;
        var d = 0.5;
        var c = 0.5;
        var a = 0.5;
        var i;
        var g;
        var h = new AR._NorthIndicator();
        this.__defineSetter__("enabled", function(j) {
            j = _PROPERTY_VALIDATOR.validate("enabled", j, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            f = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setEnabled",
                enabled: j
            })
        });
        this.__defineGetter__("enabled", function() {
            return f
        });
        this.__defineSetter__("background", function(j) {
            j = _PROPERTY_VALIDATOR.validate("background", j, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.ImageResource
            }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            b = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setBackground",
                backgroundId: (j == null || j == undefined ? null : j.__id)
            })
        });
        this.__defineGetter__("background", function() {
            return b
        });
        this.__defineSetter__("centerX", function(j) {
            j = _PROPERTY_VALIDATOR.validate("centerX", j, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            d = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setCenterX",
                centerX: j
            })
        });
        this.__defineGetter__("centerX", function() {
            return d
        });
        this.__defineSetter__("centerY", function(j) {
            j = _PROPERTY_VALIDATOR.validate("centerY", j, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            c = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setCenterY",
                centerY: j
            })
        });
        this.__defineGetter__("centerY", function() {
            return c
        });
        this.__defineSetter__("radius", function(j) {
            j = _PROPERTY_VALIDATOR.validate("radius", j, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            a = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setRadius",
                radius: j
            })
        });
        this.__defineGetter__("radius", function() {
            return a
        });
        this.__defineSetter__("container", function(j) {
            _PROPERTY_VALIDATOR.validate("container", j, _PROPERTY_VALIDATOR.TYPE.DOM_ELEMENT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            e = j;
            this.notifyUpdateRadarPosition()
        });
        this.__defineGetter__("container", function() {
            return e
        });
        this.__defineSetter__("maxDistance", function(j) {
            j = _PROPERTY_VALIDATOR.validate("maxDistance", j, _PROPERTY_VALIDATOR.TYPE.POSITIVE, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            i = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setMaxDistance",
                maxDistance: (j ? j : -1)
            })
        });
        this.__defineGetter__("maxDistance", function() {
            return i
        });
        this.__defineSetter__("northIndicator", function(j) {
            throw AR.ERROR.create("northIndicator", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("northIndicator", function() {
            return h
        });
        this.__defineSetter__("onClick", function(j) {
            j = _PROPERTY_VALIDATOR.validate("onClick", j, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            g = j;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setOnClickTriggerActive",
                onClickTriggerActive: j != null
            })
        });
        this.__defineGetter__("onClick", function() {
            return g
        });
        this.notifyUpdateRadarPosition = function() {
            if (!e) {
                return 
            }
            var o = e.getBoundingClientRect();
            var k = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var l = o.left / k;
            var m = o.right / k;
            var j = o.top / n;
            var p = o.bottom / n;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setBoundingBox",
                left: l,
                right: m,
                top: j,
                bottom: p
            })
        };
        AR.OneTimeUseRadarConstructionPlan = null
    }
});
AR._NorthIndicator = PClass.create({
    init: function() {
        var b;
        var a = 0.5;
        this.__defineSetter__("image", function(c) {
            c = _PROPERTY_VALIDATOR.validate("northIndicator.image", c, {
                type: _PROPERTY_VALIDATOR.TYPE.CLASS,
                ofType: AR.ImageResource
            }, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            b = c;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setNorthIndicatorImage",
                northIndicatorImageId: (c == null || c == undefined ? null : c.__id)
            })
        });
        this.__defineGetter__("image", function() {
            return b
        });
        this.__defineSetter__("radius", function(c) {
            c = _PROPERTY_VALIDATOR.validate("northIndicator.radius", c, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            a = c;
            AR.i.callAsync({
                is: "AR.i.radarInterface.setNorthIndicatorRadius",
                northIndicatorRadius: c
            })
        });
        this.__defineGetter__("radius", function() {
            return a
        })
    }
});
AR.radar = new AR.OneTimeUseRadarConstructionPlan();
window.addEventListener("orientationchange", AR.radar.notifyUpdateRadarPosition);
window.addEventListener("resize", AR.radar.notifyUpdateRadarPosition);
AR.VideoDrawable = AR.Drawable2D.extend({
    init: function(b, k, l) {
        var e = _PROPERTY_VALIDATOR.validate("height", k, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var f = this.validateUri(b);
        var d, g, h, c;
        var a = false;
        if (l != null) {
            if (l.onLoaded != null) {
                d = _PROPERTY_VALIDATOR.validate("onLoaded", l.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (l.onPlaybackStarted != null) {
                g = _PROPERTY_VALIDATOR.validate("onPlaybackStarted", l.onPlaybackStarted, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (l.onFinishedPlaying != null) {
                h = _PROPERTY_VALIDATOR.validate("onFinishedPlaying", l.onFinishedPlaying, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (l.onError != null) {
                c = _PROPERTY_VALIDATOR.validate("onError", l.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (l.isTransparent != null) {
                a = _PROPERTY_VALIDATOR.validate("isTransparent", l.isTransparent, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        var i = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, l);
        this.__defineSetter__("height", function(m) {
            m = _PROPERTY_VALIDATOR.validate("height", m, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.videoDrawableInterface.setHeight",
                objectId: this.__id,
                height: m
            });
            e = m
        });
        this.__defineGetter__("height", function() {
            if (this.__isDirty("height")) {
                AR.i.callSync({
                    is: "AR.i.videoDrawableInterface.getHeight",
                    objectId: this.__id
                })
            }
            return e
        });
        this.__defineSetter__("onLoaded", function(m) {
            m = _PROPERTY_VALIDATOR.validate("onLoaded", m, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            d = m;
            AR.i.callAsync({
                is: "AR.i.videoDrawableInterface.setOnLoadedTriggerActive",
                objectId: j,
                onLoadedTriggerActive: m != null
            })
        });
        this.__defineGetter__("onLoaded", function() {
            return d
        });
        this.__defineSetter__("onPlaybackStarted", function(m) {
            m = _PROPERTY_VALIDATOR.validate("onPlaybackStarted", m, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            g = m;
            AR.i.callAsync({
                is: "AR.i.videoDrawableInterface.setOnPlaybackStartedTriggerActive",
                objectId: j,
                onPlaybackStartedTriggerActive: m != null
            })
        });
        this.__defineGetter__("onPlaybackStarted", function() {
            return g
        });
        this.__defineSetter__("onFinishedPlaying", function(m) {
            m = _PROPERTY_VALIDATOR.validate("onFinishedPlaying", m, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            h = m;
            AR.i.callAsync({
                is: "AR.i.videoDrawableInterface.setOnFinishedPlayingTriggerActive",
                objectId: j,
                onFinishedPlayingTriggerActive: m != null
            })
        });
        this.__defineGetter__("onFinishedPlaying", function() {
            return h
        });
        this.__defineSetter__("onError", function(m) {
            m = _PROPERTY_VALIDATOR.validate("onError", m, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            c = m;
            AR.i.callAsync({
                is: "AR.i.videoDrawableInterface.setOnErrorTriggerActive",
                objectId: j,
                onErrorTriggerActive: m != null
            })
        });
        this.__defineGetter__("onError", function() {
            return c
        });
        this.getUri = function() {
            return f
        };
        this.isTransparent = function() {
            return a
        };
        this.__defineSetter__("__id", function(m) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return j
        });
        var j = AR.om.createObjectID();
        AR.i.callAsync({
            is: "AR.i.videoDrawableInterface.createVideoDrawable",
            objectId: j,
            enabled: i.enabled,
            offsetX: i.offsetX,
            offsetY: i.offsetY,
            zOrder: i.zOrder,
            onClickTriggerActive: i.onClickActive,
            horizontalAnchor: i.horizontalAnchor,
            verticalAnchor: i.verticalAnchor,
            scale: i.scale,
            rotation: i.rotation,
            opacity: i.opacity,
            roll: i.roll,
            tilt: i.tilt,
            heading: i.heading,
            onLoadedTriggerActive: d != null,
            onPlaybackStartedTriggerActive: g != null,
            onFinishedPlayingTriggerActive: h != null,
            onErrorTriggerActive: c != null,
            uri: AR.__resourceUrl(f),
            height: e,
            isTransparent: a
        });
        AR.om.registerObjectForID(j, this)
    },
    validateUri: function(a) {
        if (!AR.VALIDATE.isDefined(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.UNDEFINED)
        }
        if (!AR.VALIDATE.isString(a)) {
            throw AR.ERROR.create("uri", AR.ERROR.TYPE.STRING)
        }
        return a
    },
    play: function(a) {
        AR.i.callAsync({
            is: "AR.i.videoDrawableInterface.play",
            objectId: this.__id,
            loopTimes: a ? a: 1
        })
    },
    pause: function() {
        return AR.i.callAsync({
            is: "AR.i.videoDrawableInterface.pause",
            objectId: this.__id
        })
    },
    resume: function() {
        return AR.i.callAsync({
            is: "AR.i.videoDrawableInterface.resume",
            objectId: this.__id
        })
    },
    stop: function() {
        return AR.i.callAsync({
            is: "AR.i.videoDrawableInterface.stop",
            objectId: this.__id
        })
    }
});
AR.HtmlDrawable = AR.Drawable2D.extend({
    init: function(m, k, d) {
        var o = function(s) {
            if (s.indexOf("<body")==-1) {
                return "<html><head/><body style='background:transparent;margin:0;'>" + s + "</body></html>"
            } else {
                return s
            }
        };
        var a = null;
        var j = null;
        var l = "#00000000";
        var e = null;
        var n = null;
        var r = 256;
        var g = 256;
        var h = 1024;
        var q = false;
        var p = false;
        var b = null;
        if (!m) {
            throw AR.ERROR.create("content", AR.ERROR.TYPE.UNDEFINED)
        }
        a = _PROPERTY_VALIDATOR.validate("content.html", m.html, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
        j = _PROPERTY_VALIDATOR.validate("content.uri", m.uri, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
        var f = _PROPERTY_VALIDATOR.validate("width", k, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        if (!a&&!j) {
            throw AR.ERROR.create("content.html and content.uri", AR.ERROR.TYPE.UNDEFINED)
        }
        if (d) {
            if (d.onLoaded) {
                e = _PROPERTY_VALIDATOR.validate("onLoaded", d.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.onError) {
                n = _PROPERTY_VALIDATOR.validate("onError", d.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.viewportWidth) {
                r = _PROPERTY_VALIDATOR.validate("viewportWidth", d.viewportWidth, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (r > h) {
                    throw AR.ERROR.create("viewportWidth", AR.ERROR.TYPE.RANGE, "(0, " + h + "]")
                }
            }
            if (d.viewportHeight) {
                g = _PROPERTY_VALIDATOR.validate("viewportHeight", d.viewportHeight, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
                if (g > h) {
                    throw AR.ERROR.create("viewportHeight", AR.ERROR.TYPE.RANGE, "(0, " + h + "]")
                }
            }
            if (d.backgroundColor) {
                l = _PROPERTY_VALIDATOR.validate("backgroundColor", d.backgroundColor, _PROPERTY_VALIDATOR.TYPE.RGBA, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.clickThroughEnabled) {
                q = _PROPERTY_VALIDATOR.validate("clickThroughEnabled", d.clickThroughEnabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.allowDocumentLocationChanges) {
                p = _PROPERTY_VALIDATOR.validate("allowDocumentLocationChanges", d.allowDocumentLocationChanges, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (d.onDocumentLocationChanged) {
                b = _PROPERTY_VALIDATOR.validate("onDocumentLocationChanged", d.onDocumentLocationChanged, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        if (j) {
            j = AR.__resourceUrl(j)
        }
        if (a) {
            a = o(a)
        }
        var i = this._super(AR.CONST.HORIZONTAL_ANCHOR.CENTER, AR.CONST.VERTICAL_ANCHOR.MIDDLE, d);
        var c = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: c,
            is: "AR.i.htmlDrawableInterface.createHtmlDrawable",
            enabled: i.enabled,
            offsetX: i.offsetX,
            offsetY: i.offsetY,
            zOrder: i.zOrder,
            onClickTriggerActive: i.onClickActive,
            horizontalAnchor: i.horizontalAnchor,
            verticalAnchor: i.verticalAnchor,
            scale: i.scale,
            rotation: i.rotation,
            opacity: i.opacity,
            htmlOrUri: AR.__toJSONString__({
                html: a,
                uri: j
            }),
            viewportWidth: r,
            viewportHeight: g,
            width: f,
            onLoadedTriggerActive: e != null,
            onErrorTriggerActive: n != null,
            roll: i.roll,
            tilt: i.tilt,
            heading: i.heading,
            clickThroughEnabled: q,
            allowDocumentLocationChanges: p,
            onDocumentLocationChangedTriggerActive: b != null,
            backgroundColor: l
        });
        AR.om.registerObjectForID(c, this);
        this.__defineSetter__("__id", function(s) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return c
        });
        this.__defineSetter__("html", function(s) {
            s = _PROPERTY_VALIDATOR.validate("html", s, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            s = o(s);
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setHtml",
                objectId: c,
                html: s
            });
            a = s
        });
        this.__defineGetter__("html", function() {
            return a
        });
        this.__defineSetter__("uri", function(s) {
            s = _PROPERTY_VALIDATOR.validate("uri", s, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            if (s) {
                s = AR.__resourceUrl(s)
            }
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setUri",
                objectId: c,
                uri: s
            });
            j = s
        });
        this.__defineGetter__("uri", function() {
            return j
        });
        this.__defineSetter__("backgroundColor", function(s) {
            s = _PROPERTY_VALIDATOR.validate("backgroundColor", s, _PROPERTY_VALIDATOR.TYPE.RGBA, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setBackgroundColor",
                objectId: c,
                backgroundColor: s
            });
            l = s
        });
        this.__defineGetter__("backgroundColor", function() {
            return l
        });
        this.__defineSetter__("width", function(s) {
            s = _PROPERTY_VALIDATOR.validate("width", s, _PROPERTY_VALIDATOR.TYPE.NON_NEGATIVE, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setWidth",
                objectId: c,
                width: s
            });
            f = s
        });
        this.__defineGetter__("width", function() {
            if (this.__isDirty("width")) {
                return AR.i.callSync({
                    is: "AR.i.htmlDrawableInterface.getWidth",
                    objectId: c
                })
            }
            return f
        });
        this.__defineSetter__("viewportWidth", function(s) {
            s = _PROPERTY_VALIDATOR.validate("viewportWidth", s, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            if (s > h) {
                throw AR.ERROR.create("viewportWidth", AR.ERROR.TYPE.RANGE, "(0, " + h + "]")
            }
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setViewportWidth",
                objectId: c,
                viewportWidth: s
            });
            r = s
        });
        this.__defineGetter__("viewportWidth", function() {
            return r
        });
        this.__defineSetter__("viewportHeight", function(s) {
            s = _PROPERTY_VALIDATOR.validate("viewportHeight", s, _PROPERTY_VALIDATOR.TYPE.POSITIVE_INT, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            if (s > h) {
                throw AR.ERROR.create("viewportHeight", AR.ERROR.TYPE.RANGE, "(0, " + h + "]")
            }
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setViewportHeight",
                objectId: c,
                viewportHeight: s
            });
            g = s
        });
        this.__defineGetter__("viewportHeight", function() {
            return g
        });
        this.__defineSetter__("clickThroughEnabled", function(s) {
            s = _PROPERTY_VALIDATOR.validate("clickThroughEnabled", s, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setClickThroughEnabled",
                objectId: c,
                clickThroughEnabled: s
            });
            q = s
        });
        this.__defineGetter__("clickThroughEnabled", function() {
            return q
        });
        this.__defineSetter__("allowDocumentLocationChanges", function(s) {
            s = _PROPERTY_VALIDATOR.validate("allowDocumentLocationChanges", s, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setAllowDocumentLocationChanges",
                objectId: c,
                allowDocumentLocationChanges: s
            });
            p = s
        });
        this.__defineGetter__("allowDocumentLocationChanges", function() {
            return p
        });
        this.__defineSetter__("onDocumentLocationChanged", function(s) {
            s = _PROPERTY_VALIDATOR.validate("onDocumentLocationChanged", s, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            b = s;
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setOnDocumentLocationChangedTriggerActive",
                objectId: c,
                onDocumentLocationChangedTriggerActive: (s != null)
            })
        });
        this.__defineGetter__("onDocumentLocationChanged", function() {
            return b
        });
        this.__defineSetter__("onLoaded", function(s) {
            s = _PROPERTY_VALIDATOR.validate("onLoaded", s, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            e = s;
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setOnLoadedTriggerActive",
                objectId: c,
                onLoadedTriggerActive: (s != null)
            })
        });
        this.__defineGetter__("onLoaded", function() {
            return e
        });
        this.__defineSetter__("onError", function(s) {
            s = _PROPERTY_VALIDATOR.validate("onError", s, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            n = s;
            AR.i.callAsync({
                is: "AR.i.htmlDrawableInterface.setOnErrorTriggerActive",
                objectId: c,
                onErrorTriggerActive: (s != null)
            })
        });
        this.__defineGetter__("onError", function() {
            return n
        })
    },
    evalJavaScript: function(a) {
        _PROPERTY_VALIDATOR.validate("js", a, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        AR.i.callAsync({
            is: "AR.i.htmlDrawableInterface.evalJavaScript",
            objectId: this.__id,
            js: a
        })
    }
});
AR.Tracker = AR.ARchitectObject.extend({
    init: function(g, c) {
        this._super();
        var h = _PROPERTY_VALIDATOR.validate("src", g, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var a = true;
        var e;
        var f;
        var b;
        if (c) {
            if (c.enabled != null) {
                a = _PROPERTY_VALIDATOR.validate("enabled", c.enabled, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET)
            }
            if (c.onDisabled) {
                e = _PROPERTY_VALIDATOR.validate("onDisabled", c.onDisabled, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (c.onLoaded) {
                f = _PROPERTY_VALIDATOR.validate("onLoaded", c.onLoaded, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
            if (c.onError) {
                b = _PROPERTY_VALIDATOR.validate("onError", c.onError, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY)
            }
        }
        var d = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: d,
            is: "AR.i.trackerInterface.createTracker",
            src: AR.__resourceUrl(h),
            enabled: a,
            onDisabledTriggerActive: e != null,
            onLoadedTriggerActive: f != null,
            onErrorTriggerActive: b != null
        });
        AR.om.registerObjectForID(d, this);
        this.__defineSetter__("__id", function(i) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return d
        });
        this.__defineSetter__("src", function(i) {
            throw AR.ERROR.create("src", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("src", function() {
            return h
        });
        this.__defineSetter__("enabled", function(i) {
            i = _PROPERTY_VALIDATOR.validate("enabled", i, _PROPERTY_VALIDATOR.TYPE.BOOLEAN, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.trackerInterface.setEnabled",
                enabled: i
            })
        });
        this.__defineGetter__("enabled", function() {
            return AR.i.callSync({
                objectId: d,
                is: "AR.i.trackerInterface.getEnabled"
            })
        });
        this.__defineSetter__("onDisabled", function(i) {
            i = _PROPERTY_VALIDATOR.validate("onDisabled", i, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            e = i;
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.trackerInterface.setOnDisabledTriggerActive",
                onDisabledTriggerActive: i != null
            })
        });
        this.__defineGetter__("onDisabled", function() {
            return e
        });
        this.__defineSetter__("onLoaded", function(i) {
            i = _PROPERTY_VALIDATOR.validate("onLoaded", i, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            f = i;
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.trackerInterface.setOnLoadedTriggerActive",
                onLoadedTriggerActive: i != null
            })
        });
        this.__defineGetter__("onLoaded", function() {
            return f
        });
        this.__defineSetter__("onError", function(i) {
            i = _PROPERTY_VALIDATOR.validate("onError", i, _PROPERTY_VALIDATOR.TYPE.FUNCTION, _PROPERTY_VALIDATOR.RULE.CAN_BE_EMPTY);
            b = i;
            AR.i.callAsync({
                objectId: d,
                is: "AR.i.trackerInterface.setOnErrorTriggerActive",
                onErrorTriggerActive: i != null
            })
        });
        this.__defineGetter__("onError", function() {
            return b
        })
    },
    isLoaded: function() {
        return AR.i.callSync({
            objectId: this.__id,
            is: "AR.i.trackerInterface.isLoaded"
        })
    }
});
AR.Trackable2DObject = AR.ARObject.extend({
    init: function(f, e, c) {
        var g = this._super(c);
        var b = _PROPERTY_VALIDATOR.validate("tracker", f, {
            type: _PROPERTY_VALIDATOR.TYPE.CLASS,
            ofType: AR.Tracker
        }, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var a = _PROPERTY_VALIDATOR.validate("targetName", e, _PROPERTY_VALIDATOR.TYPE.STRING, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
        var d = AR.om.createObjectID();
        AR.i.callAsync({
            objectId: d,
            is: "AR.i.trackable2DObjectInterface.createTrackable2DObject",
            trackerId: b.__id,
            targetName: e,
            enabled: g.enabled,
            onEnterFieldOfVisionTriggerActive: g.onEnterFieldOfVisionTriggerActive,
            onExitFieldOfVisionTriggerActive: g.onExitFieldOfVisionTriggerActive,
            onClickTriggerActive: g.onClickTriggerActive,
            camDrawableIds: AR.__toJSONString__(AR.om.__getIds__(g.drawables.cam)),
            renderingOrder: g.renderingOrder
        });
        AR.om.registerObjectForID(d, this);
        this.__defineSetter__("__id", function(h) {
            throw AR.ERROR.create("__id", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("__id", function() {
            return d
        });
        this.__defineSetter__("tracker", function(h) {
            throw AR.ERROR.create("tracker", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("tracker", function() {
            return b
        });
        this.__defineSetter__("targetName", function(h) {
            throw AR.ERROR.create("targetName", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("targetName", function() {
            return a
        });
        this.__defineSetter__("aspectRatio", function(h) {
            throw AR.ERROR.create("aspectRatio", AR.ERROR.TYPE.IMMUTABLE)
        });
        this.__defineGetter__("aspectRatio", function() {
            var h = AR.i.callSync({
                objectId: d,
                is: "AR.i.trackable2DObjectInterface.getAspectRatio"
            });
            return h < 0 ? undefined : h
        })
    }
});
if (AR.Drawable2D) {
    AR.Drawable2D.prototype.__defineSetter__("scaling", function(a) {
        this.scale = a
    });
    AR.Drawable2D.prototype.__defineGetter__("scaling", function() {
        return this.scale
    })
}
AR.EasingCurve = AR.ARchitectObject.extend({
    init: function(b, a) {
        this._super();
        this.type = b;
        if (a != null) {
            if (a.amplitude != null) {
                this.amplitude = a.amplitude
            }
            if (a.overshoot != null) {
                this.overshoot = a.overshoot
            }
            if (a.period != null) {
                this.period = a.period
            }
        }
    }
});
if (AR.Drawable) {
    AR.Drawable.prototype.__defineSetter__("triggers", function(a) {});
    AR.Drawable.prototype.__defineGetter__("triggers", function() {
        if (!this._triggers) {
            this._triggers = new AR.DrawableTriggers(this, {
                onClick: this.onClick
            })
        }
        return this._triggers
    });
    AR.DrawableTriggers = PClass.create({
        init: function(b, a) {
            var c = b;
            var d = null;
            if (a) {
                c.onClick = a.onClick;
                d = a.onClick
            }
            this.__defineSetter__("onClick", function(e) {
                c.onClick = e;
                d = e
            });
            this.__defineGetter__("onClick", function() {
                d = c.onClick;
                return d
            })
        }
    });
    AR.Drawable.prototype.__defineSetter__("roll", function(a) {
        this.rotate.roll = a
    });
    AR.Drawable.prototype.__defineGetter__("roll", function() {
        return this.rotate ? this.rotate.roll : undefined
    });
    AR.Drawable.prototype.__defineSetter__("tilt", function(a) {
        this.rotate.tilt = a
    });
    AR.Drawable.prototype.__defineGetter__("tilt", function() {
        return this.rotate ? this.rotate.tilt : undefined
    });
    AR.Drawable.prototype.__defineSetter__("heading", function(a) {
        this.rotate.heading = a
    });
    AR.Drawable.prototype.__defineGetter__("heading", function() {
        return this.rotate ? this.rotate.heading : undefined
    })
}
if (AR.GeoObject) {
    AR.GeoObject.prototype.__defineSetter__("triggers", function(a) {});
    AR.GeoObject.prototype.__defineGetter__("triggers", function() {
        if (!this._triggers) {
            this._triggers = new AR.GeoObjectTriggers(this, {
                onEnterFieldOfVision: this.onEnterFieldOfVision,
                onExitFieldOfVision: this.onExitFieldOfVision
            })
        }
        return this._triggers
    });
    AR.GeoObjectTriggers = PClass.create({
        init: function(d, b) {
            var c = d;
            var a = null;
            var e = null;
            if (b) {
                c.onEnterFieldOfVision = b.onEnterFieldOfVision;
                a = b.onEnterFieldOfVision;
                c.onExitFieldOfVision = b.onExitFieldOfVision;
                e = b.onExitFieldOfVision
            }
            this.__defineSetter__("onEnterFieldOfVision", function(f) {
                c.onEnterFieldOfVision = f;
                a = f
            });
            this.__defineGetter__("onEnterFieldOfVision", function() {
                a = c.onEnterFieldOfVision;
                return a
            });
            this.__defineSetter__("onExitFieldOfVision", function(f) {
                c.onExitFieldOfVision = f;
                e = f
            });
            this.__defineGetter__("onExitFieldOfVision", function() {
                e = c.onExitFieldOfVision;
                return e
            })
        }
    })
}
if (AR.ActionRange) {
    AR.ActionRange.prototype.__defineSetter__("geoLocation", function(a) {
        this.location = a
    });
    AR.ActionRange.prototype.__defineGetter__("geoLocation", function() {
        return this.location
    })
}
AR.radar.__defineSetter__("positionX", function(a) {
    a = _PROPERTY_VALIDATOR.validate("positionX", a, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
    AR.radar._positionX = a;
    AR.i.callAsync({
        is: "AR.i.radarInterface.setPositionX",
        positionX: a
    })
});
AR.radar.__defineGetter__("positionX", function() {
    return AR.radar._positionX
});
AR.radar.__defineSetter__("positionY", function(a) {
    a = _PROPERTY_VALIDATOR.validate("positionY", a, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
    AR.radar._positionY = a;
    AR.i.callAsync({
        is: "AR.i.radarInterface.setPositionY",
        positionY: a
    })
});
AR.radar.__defineGetter__("positionY", function() {
    return AR.radar._positionY
});
AR.radar.__defineSetter__("width", function(a) {
    a = _PROPERTY_VALIDATOR.validate("width", a, _PROPERTY_VALIDATOR.TYPE.UNIT_INTERVAL, _PROPERTY_VALIDATOR.RULE.MUST_BE_SET);
    AR.radar._width = a;
    AR.i.callAsync({
        is: "AR.i.radarInterface.setWidth",
        width: a
    })
});
AR.radar.__defineGetter__("width", function() {
    return AR.radar._width
});
if (AR.Trackable2DObject) {
    AR.Trackable2DObject.prototype.getDistance = function() {
        return 0
    };
    AR.Trackable2DObject.prototype.__defineSetter__("width", function(a) {
        throw AR.ERROR.create("width", AR.ERROR.TYPE.IMMUTABLE)
    });
    AR.Trackable2DObject.prototype.__defineGetter__("width", function() {
        var a = this.aspectRatio;
        return a ? a : undefined
    });
    AR.Trackable2DObject.prototype.__defineSetter__("height", function(a) {
        throw AR.ERROR.create("height", AR.ERROR.TYPE.IMMUTABLE)
    });
    AR.Trackable2DObject.prototype.__defineGetter__("height", function() {
        return (this.aspectRatio) ? 1 : undefined
    })
}
AR.HtmlDrawable.prototype.__defineSetter__("updateRate", function(a) {});
AR.HtmlDrawable.prototype.__defineGetter__("updateRate", function() {
    return 1
});
AR.HtmlDrawable.UPDATE_RATE = {
    STATIC: -1,
    LOW: 3,
    MEDIUM: 2,
    HIGH: 1
};
AR.i = {
    callSync: function(a) {
        return NativeARBridge.callSync(encodeURIComponent(JSON.stringify(a)))
    },
    callAsync: function(a) {
        NativeARBridge.callAsync(encodeURIComponent(JSON.stringify(a)))
    }
};
AR.js.click.executePlatformClick = function(a) {
    var b = a.changedTouches[0];
    AR.js.clickbuster.coordinates.push(b.screenX, b.screenY);
    window.setTimeout(AR.js.clickbuster.pop, 2500);
    AR.i.callAsync({
        is: "AR.i.platformInterface.onPlatformClick",
        clickX: b.screenX,
        clickY: b.screenY
    });
   // a.preventDefault()
};
function printStackTrace(b) {
    var c = (b && b.e) ? b.e: null;
    var e = b?!!b.guess : true;
    var d = new printStackTrace.implementation();
    var a = d.run(c);
    return (e) ? d.guessFunctions(a) : a
}
printStackTrace.implementation = function() {};
printStackTrace.implementation.prototype = {
    run: function(a) {
        a = a || (function() {
            try {
                this.undef();
                return null
            } catch (c) {
                if (AR.logger.info) {
                    AR.logger.info("Exception caught: " + c)
                }
                return c
            }
        })();
        var b = this._mode || this.mode(a);
        if (b === "other") {
            return this.other(arguments.callee)
        } else {
            return this[b](a)
        }
    },
    mode: function(a) {
        if (a["arguments"]) {
            return (this._mode = "chrome")
        } else {
            if (typeof window !== "undefined" && window.opera && a.stacktrace) {
                return (this._mode = "opera10")
            } else {
                if (a.stack) {
                    return (this._mode = "firefox")
                } else {
                    if (typeof window !== "undefined" && window.opera&&!("stacktrace" in a)) {
                        return (this._mode = "opera")
                    }
                }
            }
        }
        return (this._mode = "other")
    },
    instrumentFunction: function(a, b, c) {
        a = a || window;
        a["_old" + b] = a[b];
        a[b] = function() {
            c.call(this, printStackTrace());
            return a["_old" + b].apply(this, arguments)
        };
        a[b]._instrumented = true
    },
    deinstrumentFunction: function(a, b) {
        if (a[b].constructor === Function && a[b]._instrumented && a["_old" + b].constructor === Function) {
            a[b] = a["_old" + b]
        }
    },
    chrome: function(a) {
        return a.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@").split("\n")
    },
    firefox: function(a) {
        return a.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n")
    },
    opera10: function(g) {
        var k = g.stacktrace;
        var m = k.split("\n"), a = "{anonymous}", h = /.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i, d, c, f;
        for (d = 2, c = 0, f = m.length; d < f-2; d++) {
            if (h.test(m[d])) {
                var l = RegExp.$6 + ":" + RegExp.$1 + ":" + RegExp.$2;
                var b = RegExp.$3;
                b = b.replace(/<anonymous function\:?\s?(\S+)?>/g, a);
                m[c++] = b + "@" + l
            }
        }
        m.splice(c, m.length - c);
        return m
    },
    opera: function(h) {
        var c = h.message.split("\n"), b = "{anonymous}", g = /Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i, f, d, a;
        for (f = 4, d = 0, a = c.length; f < a; f += 2) {
            if (g.test(c[f])) {
                c[d++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : b + "()@" + RegExp.$2 + ":" + RegExp.$1) + " -- " + c[f + 1].replace(/^\s+/, "")
            }
        }
        c.splice(d, c.length - d);
        return c
    },
    other: function(g) {
        var b = "{anonymous}", f = /function\s*([\w\-$]+)?\s*\(/i, a = [], d, c, e = 10;
        while (g && a.length < e) {
            d = f.test(g.toString()) ? RegExp.$1 || b : b;
            c = Array.prototype.slice.call(g["arguments"]);
            a[a.length] = d + "(" + this.stringifyArguments(c) + ")";
            g = g.caller
        }
        return a
    },
    stringifyArguments: function(b) {
        for (var c = 0; c < b.length; ++c) {
            var a = b[c];
            if (a === undefined) {
                b[c] = "undefined"
            } else {
                if (a === null) {
                    b[c] = "null"
                } else {
                    if (a.constructor) {
                        if (a.constructor === Array) {
                            if (a.length < 3) {
                                b[c] = "[" + this.stringifyArguments(a) + "]"
                            } else {
                                b[c] = "[" + this.stringifyArguments(Array.prototype.slice.call(a, 0, 1)) + "..." + this.stringifyArguments(Array.prototype.slice.call(a, -1)) + "]"
                            }
                        } else {
                            if (a.constructor === Object) {
                                b[c] = "#object"
                            } else {
                                if (a.constructor === Function) {
                                    b[c] = "#function"
                                } else {
                                    if (a.constructor === String) {
                                        b[c] = '"' + a + '"'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return b.join(",")
    },
    sourceCache: {},
    ajax: function(a) {
        var b = this.createXMLHTTPObject();
        if (!b) {
            return 
        }
        b.open("GET", a, false);
        b.setRequestHeader("User-Agent", "XMLHTTP/1.0");
        b.send("");
        return b.responseText
    },
    createXMLHTTPObject: function() {
        var c, a = [function() {
            return new XMLHttpRequest()
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }
        ];
        for (var b = 0; b < a.length; b++) {
            try {
                c = a[b]();
                this.createXMLHTTPObject = a[b];
                return c
            } catch (d) {
                if (AR.logger.info) {
                    AR.logger.info("Exception caught: " + d)
                }
            }
        }
    },
    isSameDomain: function(a) {
        return a.indexOf(location.hostname)!==-1
    },
    getSource: function(a) {
        if (!(a in this.sourceCache)) {
            this.sourceCache[a] = this.ajax(a).split("\n")
        }
        return this.sourceCache[a]
    },
    guessFunctions: function(b) {
        for (var d = 0; d < b.length; ++d) {
            var h = /\{anonymous\}\(.*\)@(\w+:\/\/([\-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/;
            var g = b[d], a = h.exec(g);
            if (a) {
                var c = a[1], f = a[4];
                if (c && this.isSameDomain(c) && f) {
                    var e = this.guessFunctionName(c, f);
                    b[d] = g.replace("{anonymous}", e)
                }
            }
        }
        return b
    },
    guessFunctionName: function(b, d) {
        var a;
        try {
            a = this.guessFunctionNameFromLines(d, this.getSource(b))
        } catch (c) {
            a = "getSource failed with url: " + b + ", exception: " + c.toString();
            if (AR.logger.info) {
                AR.logger.info("Exception caught: " + c)
            }
        }
        return a
    },
    guessFunctionNameFromLines: function(h, f) {
        var c = /function ([^(]*)\(([^)]*)\)/;
        var g = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;
        var b = "", d = 10;
        for (var e = 0; e < d; ++e) {
            b = f[h - e] + b;
            if (b !== undefined) {
                var a = g.exec(b);
                if (a && a[1]) {
                    return a[1]
                } else {
                    a = c.exec(b);
                    if (a && a[1]) {
                        return a[1]
                    }
                }
            }
        }
        return "(?)"
    }
};
function buildStack(b) {
    if (b == null) {
        b = "<br />"
    }
    var c = printStackTrace();
    for (var a = 0; a < 5; a++) {
        c.shift()
    }
    return b + c.join(b) + b
}
AR.overlay = AR.overlay || {};
AR.overlay.__OVERLAY_CONTAINER__CONSTRUCTION_PLAN = function() {
    var n = null;
    var i = [];
    var j = 0;
    var a = function() {
        document.body.appendChild(n);
        document.body.appendChild(b);
        for (var p = 0; p < i.length; p++) {
            if (i[p].initFunction) {
                i[p].initFunction()
            }
        }
        if (i.length > 0) {
            o()
        }
    };
    var e = function(p) {
        if (window.attachEvent) {
            window.attachEvent("onload", p)
        } else {
            if (window.addEventListener) {
                window.addEventListener("load", p, false)
            }
        }
    };
    e(a);
    var k = function() {
        var r = document.createElement("style");
        var p = "";
        p += "div.__OVERLAY__mainDiv {-webkit-box-shadow: #333 0px 0px 10px 0px; box-shadow: #333 0px 0px 10px 0px; background: #F0F0F0; position: absolute;top: 5%;left: 5%;right: 5%;bottom: 5%;z-index: 2147483647;padding: 20px;overflow: auto;font-family:Verdana;font-size:small;}";
        p += "input.__OVERLAY__closeButton {float: right;}";
        p += "div.__OVERLAY__openButton {position: absolute;right: 0px;bottom: 0px;z-index: 2147483647;width: 0; height: 0; border-bottom: 40px solid #FF8C0A; border-left: 40px solid transparent; }";
        p += "div.__OVERLAY__tab {margin-right:2px;border-style: groove;margin-bottom:1px;width: 30%;background: #F0F0F0;text-align: center;vertical-align: middle;font-weight: bold;height: 20px;border-top-left-radius:20px;border-top-right-radius:20px;cursor:pointer;cursor: pointer;border-width: 1px;border-color: black;}";
        p += "#toolTipDiv {font-family:Verdana; position: absolute;right: 5px;bottom: 65px;width: 220px;background-color: #FFBB24;padding-bottom: 5px;padding-top: 5px;z-index: 2147483646;}";
        p += "#toolTipDiv:before {  content: ' ';  position: absolute;  right: 20px;bottom: -40px;border: 20px solid;border-color: #FFBB24 #FFBB24 transparent transparent;}";
        r.setAttribute("type", "text/css");
        var q = document.getElementsByTagName("head")[0];
        q.appendChild(r);
        if (r.styleSheet) {
            r.styleSheet.cssText = p
        } else {
            var s = document.createTextNode(p);
            r.appendChild(s)
        }
    };
    k();
    n = document.createElement("div");
    n.id = "overlayDiv";
    n.setAttribute("class", "__OVERLAY__mainDiv");
    n.style.display = "none";
    var d = document.createElement("input");
    d.setAttribute("class", "__OVERLAY__closeButton");
    d.setAttribute("type", "button");
    d.setAttribute("value", "X");
    d.onclick = function() {
        n.style.display = "none";
        b.style.display = "block"
    };
    n.appendChild(d);
    var b = document.createElement("div");
    b.setAttribute("class", "__OVERLAY__openButton");
    b.setAttribute("type", "button");
    b.setAttribute("value", "^^");
    b.onclick = function() {
        n.style.display = "block";
        b.style.display = "none"
    };
    b.setEnabled = function(p) {
        b.style.display = (p ? "block" : "none")
    };
    b.setEnabled(false);
    var c = document.createElement("div");
    n.appendChild(c);
    var m = document.createElement("div");
    m.setAttribute("style", "clear: right;");
    n.appendChild(m);
    var f = 0;
    var h = null;
    var g = null;
    this.appendOverlay = function(r, s, p) {
        if (j == 0) {
            b.setEnabled(true);
            o()
        }
        var q = document.createElement("div");
        q.setAttribute("class", "__OVERLAY__tab");
        q.setAttribute("style", "margin-left:" + (31 * f) + "%;" + (f == 0 ? "float:left;" : ""));
        q.appendChild(document.createTextNode(r));
        if (!h) {
            h = s;
            g = q;
            q.style.backgroundColor = "#BEBEBE"
        } else {
            s.style.display = "none"
        }
        q.onclick = function() {
            h.style.display = "none";
            g.style.backgroundColor = "#F0F0F0";
            s.style.display = "block";
            q.style.backgroundColor = "#BEBEBE";
            h = s;
            g = q
        };
        c.appendChild(q);
        m.appendChild(s);
        i[f] = {
            tab: q,
            htmlElement: s,
            initFunction: p
        };
        f++;
        j++;
        return f-1
    };
    var o = function() {
        var p = document.createElement("div");
        p.setAttribute("id", "toolTipDiv");
        p.innerHTML = "Open Logger and/or ADE by pressing this button";
        if (document.body) {
            document.body.appendChild(p)
        }
        window.setTimeout(l, 3000)
    };
    var l = function() {
        var p = document.getElementById("toolTipDiv");
        if (p) {
            document.body.removeChild(p)
        }
    };
    this.removeOverlay = function(p) {
        i[p].tab.style.display = "none";
        j--;
        if (j == 0) {
            b.setEnabled(false);
            l()
        }
    }
};
AR.overlay.OVERLAY_CONTAINER = new AR.overlay.__OVERLAY_CONTAINER__CONSTRUCTION_PLAN();
AR.overlay.__OVERLAY_CONTAINER__CONSTRUCTION_PLAN = undefined;
var __ARCHITECT_LOGGER_FRAMEWORK__ = new function() {
    var c = null;
    var e = null;
    var d = null;
    var l = {};
    var h = function() {
        var o = document.createElement("style");
        var m = "";
        m += "div.__LOGGER__logSelector {cursor:pointer; border: 1px solid black; border-radius:20px; width: 99%;float: left;font-size: large;margin-top: 0.3%;padding: 0.3%;text-align: center;margin-bottom: 0.3%;}";
        m += "div.__LOGGER__messagesContainer {width: 99%;overflow: auto;font-family: monospace;margin-top: 5px;}";
        m += "table.__LOGGER__selectorTable {width: 100%;table-layout: fixed;}";
        m += "div.__LOGGER__logMessage{font-family:monospace;} div.red {color:red;} div.green {color:green;} div.orange {color:orange;} div.black {color:black;}";
        m += "#__LOGGER__ARCHITECT_ERROR_LOG_CONSOLE {width : 100%; overflow : auto; font-family: monospace;}";
        m += "#__LOGGER__masterDiv {top: 0; width: 100%;}";
        m += "#__LOGGER__CONTROL_DIV {width: 100%;}";
        o.setAttribute("type", "text/css");
        var n = document.getElementsByTagName("head")[0];
        n.appendChild(o);
        if (o.styleSheet) {
            o.styleSheet.cssText = m
        } else {
            var p = document.createTextNode(m);
            o.appendChild(p)
        }
    };
    h();
    var g = {
        ERROR: [true, "red"],
        WARNING: [true, "orange"],
        INFO: [false, "green"],
        DEBUG: [false, "grey"]
    };
    this.__toggleLogLevel__ = function(m) {
        g[m][0]=!(g[m][0]);
        AR.logger.changeLogLevelEnabled(m, g[m][0]);
        b(m)
    };
    var b = function(m) {
        var n = l[m];
        if (g[m][0]) {
            n.style.backgroundColor = g[m][1]
        } else {
            n.style.backgroundColor = "#F0F0F0"
        }
    };
    var j = function() {
        function u(z, x, A, y) {
            var B = document.createElement("div");
            B.setAttribute("class", "__LOGGER__logSelector");
            B.setAttribute("id", "LOG_SELECTOR_" + x);
            B.setAttribute("style", "background-color:" + y + ";");
            B.onclick = function() {
                __ARCHITECT_LOGGER_FRAMEWORK__.__toggleLogLevel__(x)
            };
            B.appendChild(document.createTextNode(z));
            l[x] = B;
            return B
        }
        var m = document.createElement("div");
        m.setAttribute("id", "__LOGGER__CONTROL_DIV");
        var p = document.createElement("table");
        p.setAttribute("class", "__LOGGER__selectorTable");
        var o = document.createElement("tr");
        var r = document.createElement("td");
        var s = document.createElement("td");
        o.appendChild(r);
        o.appendChild(s);
        p.appendChild(o);
        var t = document.createElement("tr");
        var q = document.createElement("td");
        var v = document.createElement("td");
        t.appendChild(q);
        t.appendChild(v);
        p.appendChild(t);
        r.appendChild(u("Error", "ERROR", true, "red"));
        s.appendChild(u("Warning", "WARNING", true, "orange"));
        q.appendChild(u("Info", "INFO", false, "green"));
        v.appendChild(u("Debug", "DEBUG", false, "grey"));
        m.appendChild(p);
        var w = document.createElement("div");
        w.setAttribute("class", "__LOGGER__clearButtonDiv");
        var n = document.createElement("input");
        n.setAttribute("type", "button");
        n.setAttribute("value", "Clear Console");
        n.onclick = function() {
            AR.logger.clearConsole()
        };
        w.appendChild(n);
        m.appendChild(w);
        return m
    };
    var f = function() {
        var m = document.createElement("textarea");
        m.setAttribute("id", "__LOGGER__ARCHITECT_ERROR_LOG_CONSOLE");
        m.scrollTop = m.scrollHeight;
        m.appendLine = function(n) {
            m.value += (n + "\n");
            m.scrollTop = m.scrollHeight - m.clientHeight
        };
        m.clearConsole = function() {
            m.value = ""
        };
        m.canHandleColorCodes = false;
        return m
    };
    var i = function() {
        var m = document.createElement("div");
        m.setAttribute("id", "__LOGGER__ARCHITECT_ERROR_LOG_CONSOLE");
        m.scrollTop = m.scrollHeight;
        m.appendLine = function(o, n) {
            m.innerHTML += (o + "<br />");
            m.scrollTop = m.scrollHeight - m.clientHeight
        };
        m.clearConsole = function() {
            m.innerHTML = ""
        };
        m.canHandleColorCodes = true;
        return m
    };
    var a = function() {
        var m = document.createElement("div");
        m.setAttribute("id", "ARCHITECT_ERROR_LOG_CONSOLE");
        m.scrollTop = m.scrollHeight;
        m.appendLine = function(o, n) {
            var p = document.createElement("div");
            p.setAttribute("class", "__LOGGER__logMessage " + n);
            p.appendChild(document.createTextNode(o));
            m.insertBefore(p, m.firstChild)
        };
        m.clearConsole = function() {
            while (m.hasChildNodes()) {
                m.removeChild(m.firstChild)
            }
        };
        m.canHandleColorCodes = false;
        return m
    };
    var k = function() {
        var m = document.createElement("div");
        m.setAttribute("id", "__LOGGER__masterDiv");
        return m
    };
    this.activateDebugMode = function() {
        e = j();
        d = a();
        c = k();
        c.appendChild(e);
        c.appendChild(d);
        AR.logger.registerRegistrar(d, d.canHandleColorCodes);
        AR.logger.changeLogLevelEnabled("ERROR", true);
        AR.logger.changeLogLevelEnabled("WARNING", true);
        b("ERROR");
        b("WARNING");
        b("INFO");
        b("DEBUG");
        var m = AR.overlay.OVERLAY_CONTAINER.appendOverlay("Logger", c);
        activateDebugMode = null
    }
};
var __ARCHITECT_PROFILER_FRAMEWORK__ = new function() {
    var b = null;
    var e = null;
    var c = null;
    var l = {};
    var j = {};
    var g = function() {
        var o = document.createElement("style");
        var m = "";
        m += "div.__PROFILER__logSelector {cursor:pointer; border: 1px solid black; border-radius:20px; width: 99%;float: left;font-size: large;margin-top: 0.3%;padding: 0.3%;text-align: center;margin-bottom: 0.3%;}";
        m += "div.__PROFILER__messagesContainer {width: 99%;overflow: auto;font-family: monospace;margin-top: 5px;}";
        m += "table.__PROFILER__selectorTable {width: 100%;table-layout: fixed;}";
        m += "div.__PROFILER__logMessage{font-family:monospace;} div.red {color:red;} div.green {color:green;} div.orange {color:orange;} div.black {color:black;}";
        m += "#__PROFILER__ARCHITECT_ERROR_LOG_CONSOLE {width : 100%; overflow : auto; font-family: monospace;}";
        m += "#__PROFILER__masterDiv {top: 0; width: 100%;}";
        m += "#__PROFILER__CONTROL_DIV {width: 100%;}";
        o.setAttribute("type", "text/css");
        var n = document.getElementsByTagName("head")[0];
        n.appendChild(o);
        if (o.styleSheet) {
            o.styleSheet.cssText = m
        } else {
            var p = document.createTextNode(m);
            o.appendChild(p)
        }
    };
    g();
    var k = {
        CALLCOUNT: [true, "#ff8c0a"],
        FPS: [true, "#ff8c0a"],
        DURATION: [true, "#ff8c0a"]
    };
    this.__toggleProfilerGroupVisibility = function(m) {
        k[m][0]=!(k[m][0]);
        d(m);
        var n = j[m];
        n.style.display = k[m][0] ? "block" : "none"
    };
    var d = function(m) {
        var n = l[m];
        if (k[m][0]) {
            n.style.backgroundColor = k[m][1]
        } else {
            n.style.backgroundColor = "#F0F0F0"
        }
    };
    var h = function() {
        function x(A, y, B, z) {
            var C = document.createElement("div");
            C.setAttribute("class", "__PROFILER__logSelector");
            C.setAttribute("id", "LOG_SELECTOR_" + y);
            C.setAttribute("style", "background-color:" + z + ";");
            C.onclick = function() {
                __ARCHITECT_PROFILER_FRAMEWORK__.__toggleProfilerGroupVisibility(y)
            };
            C.appendChild(document.createTextNode(A));
            l[y] = C;
            return C
        }
        var o = document.createElement("div");
        o.setAttribute("id", "__PROFILER__CONTROL_DIV");
        var q = document.createElement("table");
        q.setAttribute("class", "__PROFILER__selectorTable");
        var p = document.createElement("tr");
        var u = document.createElement("td");
        var w = document.createElement("td");
        var v = document.createElement("td");
        p.appendChild(u);
        p.appendChild(w);
        p.appendChild(v);
        q.appendChild(p);
        u.appendChild(x("Call Count", "CALLCOUNT", true, "#434343"));
        w.appendChild(x("FPS", "FPS", true, "#434343"));
        v.appendChild(x("Duration", "DURATION", true, "#434343"));
        o.appendChild(q);
        var n = document.createElement("div");
        n.setAttribute("class", "__PROFILER__RELOADOPTIONSDIV");
        var s = document.createElement("input");
        s.setAttribute("type", "button");
        s.setAttribute("value", "Reload Data");
        s.onclick = function() {
            AR.profiler.sendProfileReportRequest()
        };
        n.appendChild(s);
        n.appendChild(document.createTextNode("  < or >  "));
        var t = document.createElement("input");
        t.setAttribute("type", "checkbox");
        t.onchange = AR.profiler.automaticReloadSettingChanged;
        n.appendChild(t);
        n.appendChild(document.createTextNode("Automatic Reload  every: "));
        var m = document.createElement("select");
        m.setAttribute("id", "__ARCHITECT_PROFILER_RELOAD_SELECTION__");
        for (var r = 1; r <= 10; r++) {
            m.options[r-1] = new Option(r, r)
        }
        m.options[1].selected = true;
        n.appendChild(m);
        n.appendChild(document.createTextNode(" seconds"));
        o.appendChild(n);
        return o
    };
    this.getReloadInterval = function() {
        var m = document.getElementById("__ARCHITECT_PROFILER_RELOAD_SELECTION__");
        return Number(m.options[m.selectedIndex].text)
    };
    var f = function() {
        var m = document.createElement("textarea");
        m.setAttribute("id", "__PROFILER__ARCHITECT_ERROR_LOG_CONSOLE");
        m.scrollTop = m.scrollHeight;
        m.appendLine = function(n) {
            m.value += (n + "\n");
            m.scrollTop = m.scrollHeight - m.clientHeight
        };
        m.clearConsole = function() {
            m.value = ""
        };
        m.canHandleColorCodes = false;
        return m
    };
    var a = function() {
        var r = document.createElement("div");
        r.setAttribute("id", "ARCHITECT_PROFILER_MASTER_CONSOLE");
        r.scrollTop = r.scrollHeight;
        var q = document.createElement("div");
        q.setAttribute("id", "ARCHITECT_PROFILER_CALLCOUNT_CONSOLE");
        q.appendLine = function p(u, t) {
            var v = document.createElement("div");
            v.setAttribute("class", "__PROFILER__logMessage " + t);
            v.appendChild(document.createTextNode(u));
            q.appendChild(v)
        };
        j.CALLCOUNT = q;
        var o = document.createElement("div");
        o.setAttribute("id", "ARCHITECT_PROFILER_FPS_CONSOLE");
        o.style.display = "block";
        o.appendLine = function n(u, t) {
            var v = document.createElement("div");
            v.setAttribute("class", "__PROFILER__logMessage " + t);
            v.appendChild(document.createTextNode(u));
            o.appendChild(v)
        };
        j.FPS = o;
        var m = document.createElement("div");
        m.setAttribute("id", "ARCHITECT_PROFILER_DURATION_CONSOLE");
        m.appendLine = function s(u, t) {
            var v = document.createElement("div");
            v.setAttribute("class", "__PROFILER__logMessage " + t);
            v.appendChild(document.createTextNode(u));
            m.appendChild(v)
        };
        j.DURATION = m;
        r.appendLine = function(u, t) {
            var v = document.createElement("div");
            v.setAttribute("class", "__PROFILER__logMessage " + t);
            v.appendChild(document.createTextNode(u));
            r.insertBefore(v, r.firstChild)
        };
        r.clearConsole = function() {
            while (r.hasChildNodes()) {
                r.removeChild(r.firstChild)
            }
        };
        r.canHandleColorCodes = false;
        r.appendChild(q);
        r.appendChild(o);
        r.appendChild(m);
        r.callCountDiv = q;
        r.fpsDiv = o;
        r.durationDiv = m;
        r.appendLine("======= *Profiling* ======", "black");
        __ARCHITECT_PROFILER_FRAMEWORK__.clearAllProfileConsoles();
        return r
    };
    var i = function() {
        var m = document.createElement("div");
        m.setAttribute("id", "__PROFILER__masterDiv");
        return m
    };
    this.activateProfiler = function() {
        e = h();
        c = a();
        b = i();
        b.appendChild(e);
        b.appendChild(c);
        AR.profiler.registerRegistrar(c, c.canHandleColorCodes);
        d("CALLCOUNT");
        d("FPS");
        d("DURATION");
        var m = AR.overlay.OVERLAY_CONTAINER.appendOverlay("Profiler", b);
        activateDebugMode = null
    };
    this.clearAllProfileConsoles = function() {
        __ARCHITECT_PROFILER_FRAMEWORK__.clearProfilerConsole("ARCHITECT_PROFILER_CALLCOUNT_CONSOLE", "------ Call Count -------");
        __ARCHITECT_PROFILER_FRAMEWORK__.clearProfilerConsole("ARCHITECT_PROFILER_FPS_CONSOLE", "------ FPS -------");
        __ARCHITECT_PROFILER_FRAMEWORK__.clearProfilerConsole("ARCHITECT_PROFILER_DURATION_CONSOLE", "------ Duration -------")
    };
    this.clearProfilerConsole = function(o, n) {
        var m = document.getElementById(o);
        if (null !== m) {
            while (m.firstChild) {
                m.removeChild(m.firstChild)
            }
            m.appendLine("*         ", "black");
            m.appendLine("*         ", "black");
            m.appendLine(n, "black")
        }
    }
};
