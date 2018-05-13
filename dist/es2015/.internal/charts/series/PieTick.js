/**
 * Pie tick module.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Tick } from "../elements/Tick";
import { MutableValueDisposer, MultiDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an tick line for a pie slice connecting it to a related label.
 *
 * @see {@link IPieTickEvents} for a list of available events
 * @see {@link IPieTickAdapters} for a list of available Adapters
 */
var PieTick = /** @class */ (function (_super) {
    __extends(PieTick, _super);
    /**
     * Constructor
     */
    function PieTick() {
        var _this = _super.call(this) || this;
        /**
         * A label element this tick is attached to.
         *
         * @type {MutableValueDisposer}
         */
        _this._label = new MutableValueDisposer();
        /**
         * A slice element this tick is attached to.
         *
         * @type {MutableValueDisposer}
         */
        _this._slice = new MutableValueDisposer();
        _this.className = "PieTick";
        _this.element = _this.paper.add("polyline");
        _this._disposers.push(_this._label);
        _this._disposers.push(_this._slice);
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the tick element.
     *
     * @ignore Exclude from docs
     */
    PieTick.prototype.draw = function () {
        _super.prototype.draw.call(this);
        var slice = this.slice;
        var label = this.label;
        var series = slice.dataItem.component;
        if (slice && slice.radius > 0 && label && label.text) {
            var x0 = slice.dx + slice.slice.dx + slice.pixelX + slice.ix * slice.radius * slice.scale;
            var y0 = slice.dy + slice.slice.dy + slice.pixelY + slice.iy * slice.radius * slice.scale;
            var x1 = void 0;
            var y1 = void 0;
            var x2 = void 0;
            var y2 = void 0;
            if (series.alignLabels) {
                x1 = label.pixelX - this.length;
                y1 = label.pixelY;
                x2 = label.pixelX;
                y2 = y1;
                if (label.horizontalCenter == "right") {
                    x1 += 2 * this.length;
                    x2 = x1 - this.length;
                }
            }
            else {
                x1 = x0 + label.radius * slice.ix;
                y1 = y0 + label.radius * slice.iy;
                x2 = x1;
                y2 = y1;
            }
            this.element.attr({ "points": [x0, y0, x1, y1, x2, y2] });
        }
    };
    Object.defineProperty(PieTick.prototype, "slice", {
        /**
         * @return {Slice} Slice
         */
        get: function () {
            return this._slice.get();
        },
        /**
         * Slice element tick is attached to.
         *
         * @param {Slice}  slice  Slice
         */
        set: function (slice) {
            this._slice.set(slice, new MultiDisposer([
                slice.events.on("transformed", this.invalidate, this),
                slice.events.on("validated", this.invalidate, this)
            ]));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieTick.prototype, "label", {
        /**
         * @return {AxisLabelCircular} Label
         */
        get: function () {
            return this._label.get();
        },
        /**
         * Label element tick is attached to.
         *
         * @param {AxisLabelCircular}  label  Label
         */
        set: function (label) {
            this._label.set(label, label.events.on("transformed", this.invalidate, this));
        },
        enumerable: true,
        configurable: true
    });
    return PieTick;
}(Tick));
export { PieTick };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PieTick"] = PieTick;
//# sourceMappingURL=PieTick.js.map