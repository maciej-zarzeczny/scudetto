(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/product-item.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    product: Object,
    image1: Object,
    image2: Object
  },
  data: function data() {
    return {
      isOnSale: false,
      imgHover: false
    };
  },
  methods: {
    onWindowResize: function onWindowResize() {
      var width = window.innerWidth;
      var imageContainer = document.getElementsByClassName("shop-image-parent");

      for (var i = 0; i < imageContainer.length; i++) {
        if (width >= 769) {
          imageContainer[i].style.height = 0.3 * width + "px";
        } else if (width >= 400) {
          imageContainer[i].style.height = 0.87 * width + "px";
        } else {
          imageContainer[i].style.height = 0.8 * width + "px";
        }
      }
    }
  },
  mounted: function mounted() {
    if (this.product.discountPrice < this.product.price && this.product.discountPrice != 0) {
      this.isOnSale = true;
    }

    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/************************************\n    OTHER VARIABLES\n*************************************/\n/************************************\n    PRODUCTS VARIABLES\n*************************************/\n.invisible {\n  opacity: 0;\n}\n.shop-image-parent {\n  position: relative;\n}\n.shop-image-parent img {\n  transition: all 0.2s ease-in;\n  position: absolute;\n}\n.shop-image-parent img:not(.border-image) {\n  max-width: 55%;\n  left: 22%;\n  margin-top: 11.5%;\n}\n.border-image {\n  z-index: 10;\n  left: 10%;\n  max-width: 80%;\n}\n.product-name {\n  font-size: 15pt;\n  color: #1a1a1a;\n  font-weight: 200;\n}\n.main-product-price {\n  font-weight: 200;\n  color: #1a1a1a;\n  font-size: 15pt;\n  margin-left: 10px;\n}\n.prices {\n  display: flex;\n  justify-content: left;\n  align-items: center;\n}\n.product-old-price {\n  text-decoration: line-through;\n}\n.new-price {\n  color: #13923d;\n  margin-left: 5px;\n}\n.product-name-price {\n  display: flex;\n  justify-content: center;\n  padding: 0 !important;\n}\n.product-name-price > .level-parent {\n  padding: 10px 15px 10px 15px;\n  min-width: 40%;\n  background-color: white;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n@media only screen and (min-width: 768px) {\n.product-name {\n    font-size: 7pt;\n}\n.main-product-price {\n    font-size: 7pt;\n}\n.product-old-price {\n    font-size: 7pt;\n}\n.product-name-price {\n    margin-top: -10px;\n}\n}\n@media only screen and (min-width: 1200px) {\n.product-name {\n    font-size: 9pt;\n}\n.main-product-price {\n    font-size: 9pt;\n}\n.product-old-price {\n    font-size: 9pt;\n}\n.product-name-price {\n    margin-top: -10px;\n}\n}\n@media only screen and (min-width: 1400px) {\n.product-name {\n    font-size: 11pt;\n}\n.main-product-price {\n    font-size: 11pt;\n}\n.product-old-price {\n    font-size: 11pt;\n}\n.product-name-price {\n    margin-top: -15px;\n}\n}\n@media only screen and (min-width: 1750px) {\n.product-name {\n    font-size: 13pt;\n}\n.main-product-price {\n    font-size: 13pt;\n}\n.product-old-price {\n    font-size: 13pt;\n}\n.product-name-price {\n    margin-top: -20px;\n}\n}\n@media only screen and (min-width: 2100px) {\n.product-name {\n    font-size: 15pt;\n}\n.main-product-price {\n    font-size: 15pt;\n}\n.product-old-price {\n    font-size: 12pt;\n}\n.product-name-price {\n    margin-top: -20px;\n}\n}", ""]);



/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./product-item.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=template&id=e9f28708&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/product-item.vue?vue&type=template&id=e9f28708& ***!
  \***************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "card", attrs: { id: "product-item" } }, [
    _c("div", { staticClass: "card-image" }, [
      _c("div", { staticClass: "shop-image-parent" }, [
        _c("img", {
          staticClass: "border-image",
          attrs: { src: "/images/page/shop_border.png", alt: "Product border" },
          on: {
            mouseover: function($event) {
              _vm.imgHover = true
            },
            mouseleave: function($event) {
              _vm.imgHover = false
            }
          }
        }),
        _vm._v(" "),
        _c("img", {
          attrs: { src: _vm.image2.image_url, alt: "Product image" }
        }),
        _vm._v(" "),
        _c("img", {
          class: { invisible: _vm.imgHover },
          attrs: { src: _vm.image1.image_url, alt: "Product image" }
        })
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "card-content product-name-price" }, [
      _c("div", { staticClass: "level-parent" }, [
        _c("div", { staticClass: "level" }, [
          _c("div", { staticClass: "level-left" }, [
            _c("div", { staticClass: "level-item" }, [
              _c("p", { staticClass: "product-name" }, [
                _vm._v(_vm._s(_vm.product.name))
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "level-right" }, [
            _c("div", { staticClass: "level-item" }, [
              _c("div", { staticClass: "prices" }, [
                _c("strong", [
                  _c(
                    "p",
                    {
                      staticClass: "main-product-price",
                      class: { "product-old-price": _vm.isOnSale }
                    },
                    [_vm._v(_vm._s(_vm.product.price) + " zł")]
                  )
                ]),
                _vm._v(" "),
                _c("strong", [
                  _vm.isOnSale
                    ? _c(
                        "p",
                        {
                          staticClass: "main-product-price",
                          class: { "new-price": _vm.isOnSale }
                        },
                        [_vm._v(_vm._s(_vm.product.discountPrice) + " zł")]
                      )
                    : _vm._e()
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/product-item.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/product-item.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _product_item_vue_vue_type_template_id_e9f28708___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-item.vue?vue&type=template&id=e9f28708& */ "./resources/js/components/product-item.vue?vue&type=template&id=e9f28708&");
/* harmony import */ var _product_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-item.vue?vue&type=script&lang=js& */ "./resources/js/components/product-item.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-item.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _product_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _product_item_vue_vue_type_template_id_e9f28708___WEBPACK_IMPORTED_MODULE_0__["render"],
  _product_item_vue_vue_type_template_id_e9f28708___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/product-item.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/product-item.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/product-item.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./product-item.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./product-item.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/product-item.vue?vue&type=template&id=e9f28708&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/product-item.vue?vue&type=template&id=e9f28708& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_template_id_e9f28708___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./product-item.vue?vue&type=template&id=e9f28708& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/product-item.vue?vue&type=template&id=e9f28708&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_template_id_e9f28708___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_product_item_vue_vue_type_template_id_e9f28708___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);