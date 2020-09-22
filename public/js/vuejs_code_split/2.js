(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/order-details.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    order: Object
  },
  data: function data() {
    return {
      status: "Wybierz nowy status",
      tkaniny: [],
      podszewki: [],
      guziki: [],
      sizes: [],
      kroje: [],
      tyly: [],
      females: []
    };
  },
  methods: {
    price: function price(product) {
      if (product.discountPrice < product.price && product.discountPrice != 0) {
        return product.discountPrice * product.pivot.quantity;
      } else {
        return product.price * product.pivot.quantity;
      }
    },
    statusChanged: function statusChanged() {
      axios.put("/orders/" + this.order.id, {
        status: this.status
      })["catch"](function (error) {
        alert("Wystąpił błąd: " + error);
      });
    },
    string_to_array: function string_to_array(str) {
      return str.trim().split(" ");
    },
    shippingMethod: function shippingMethod(val) {
      if (val == "1") {
        return "Przesyłka krajowa";
      } else if (val == "2") {
        return "Przesyłka między-krajowa";
      } else {
        return "Odbiór osobisty";
      }
    }
  },
  created: function created() {
    if (this.order.custom_order) {
      this.tkaniny = this.string_to_array(this.order.tkanina);
      this.podszewki = this.string_to_array(this.order.podszewka);
      this.guziki = this.string_to_array(this.order.guziki);
      this.sizes = this.string_to_array(this.order.custom_size);
      this.kroje = this.string_to_array(this.order.kroj);
      this.tyly = this.string_to_array(this.order.tyl);
      this.females = this.string_to_array(this.order.female);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".address-info {\n  margin-top: 20px;\n  padding-bottom: 10px;\n}\n.buttons {\n  padding: 10px;\n}", ""]);



/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./order-details.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=template&id=573ae6f0&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/admin/order-details.vue?vue&type=template&id=573ae6f0& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticStyle: { "background-color": "white" } }, [
    _c("section", { staticClass: "products-info" }, [
      _c(
        "table",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.order.products.length > 0,
              expression: "order.products.length > 0"
            }
          ],
          staticClass: "table is-fullwidth"
        },
        [
          _vm._m(0),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.order.products, function(product, index) {
              return _c("tr", { key: index }, [
                _c("td", [_vm._v(_vm._s(product.name))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(product.pivot.size))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(product.pivot.quantity))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.price(product)) + " zł")])
              ])
            }),
            0
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "table",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.order.custom_order,
              expression: "order.custom_order"
            }
          ],
          staticClass: "table is-fullwidth"
        },
        [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "tbody",
            _vm._l(_vm.tkaniny, function(id, index) {
              return _c("tr", { key: index }, [
                _c("td", [_vm._v("Specjalne zamówienie")]),
                _vm._v(" "),
                _c("td", [
                  _vm._v(_vm._s(_vm.females[index] == 1 ? "Damska" : "Męska"))
                ]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.sizes[index]))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.kroje[index]))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.tkaniny[index]))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.podszewki[index]))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.guziki[index]))]),
                _vm._v(" "),
                _c("td", [_vm._v(_vm._s(_vm.tyly[index]))])
              ])
            }),
            0
          )
        ]
      )
    ]),
    _vm._v(" "),
    _c("section", { staticClass: "address-info" }, [
      _c("table", { staticClass: "table is-fullwidth" }, [
        _vm._m(2),
        _vm._v(" "),
        _c("tbody", [
          _c("tr", [
            _c("td", [_vm._v(_vm._s(_vm.order.name))]),
            _vm._v(" "),
            _c("td", [
              _vm._v(
                _vm._s(_vm.order.address) + ", " + _vm._s(_vm.order.post_code)
              )
            ]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(_vm.order.email))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(_vm.order.phone_number))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(_vm.shippingMethod(_vm.order.shipping)))]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(_vm.order.additional_info))])
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("section", { staticClass: "buttons" }, [
      _vm._v("\n    Zmień status zamówienia:\n    "),
      _c("div", { staticClass: "select" }, [
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.status,
                expression: "status"
              }
            ],
            on: {
              change: [
                function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.status = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0]
                },
                function($event) {
                  return _vm.statusChanged()
                }
              ]
            }
          },
          [
            _c("option", [_vm._v("Wybierz nowy status")]),
            _vm._v(" "),
            _c("option", [_vm._v("Zamówienie wysłane")]),
            _vm._v(" "),
            _c("option", [_vm._v("Zamówienie anulowane")])
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Nazwa produktu")]),
        _vm._v(" "),
        _c("th", [_vm._v("Rozmiar")]),
        _vm._v(" "),
        _c("th", [_vm._v("Ilość")]),
        _vm._v(" "),
        _c("th", [_vm._v("Cena")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Nazwa produktu")]),
        _vm._v(" "),
        _c("th", [_vm._v("Rodzaj")]),
        _vm._v(" "),
        _c("th", [_vm._v("Rozmiar")]),
        _vm._v(" "),
        _c("th", [_vm._v("Krój")]),
        _vm._v(" "),
        _c("th", [_vm._v("Tkanina")]),
        _vm._v(" "),
        _c("th", [_vm._v("Podszewka")]),
        _vm._v(" "),
        _c("th", [_vm._v("Guziki")]),
        _vm._v(" "),
        _c("th", [_vm._v("Materiał na tyle")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Imię")]),
        _vm._v(" "),
        _c("th", [_vm._v("Adres")]),
        _vm._v(" "),
        _c("th", [_vm._v("Adres email")]),
        _vm._v(" "),
        _c("th", [_vm._v("Numer telefonu")]),
        _vm._v(" "),
        _c("th", [_vm._v("Metoda wysyłki")]),
        _vm._v(" "),
        _c("th", [_vm._v("Dodatkowe informacje")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/admin/order-details.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/admin/order-details.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _order_details_vue_vue_type_template_id_573ae6f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order-details.vue?vue&type=template&id=573ae6f0& */ "./resources/js/components/admin/order-details.vue?vue&type=template&id=573ae6f0&");
/* harmony import */ var _order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order-details.vue?vue&type=script&lang=js& */ "./resources/js/components/admin/order-details.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order-details.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _order_details_vue_vue_type_template_id_573ae6f0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _order_details_vue_vue_type_template_id_573ae6f0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/admin/order-details.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/admin/order-details.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/admin/order-details.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./order-details.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./order-details.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/admin/order-details.vue?vue&type=template&id=573ae6f0&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/admin/order-details.vue?vue&type=template&id=573ae6f0& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_template_id_573ae6f0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./order-details.vue?vue&type=template&id=573ae6f0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/admin/order-details.vue?vue&type=template&id=573ae6f0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_template_id_573ae6f0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_order_details_vue_vue_type_template_id_573ae6f0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);