(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/w-configurator.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/w-configurator.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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
  data: function data() {
    return {
      tylPodszewka: false,
      tkanina: null,
      podszewka: null,
      guzik: null,
      kroj: null,
      showKolnierz: false,
      tkaniny: [],
      tkaninyIndex: 0,
      tkaninyReady: false,
      renderTkaniny: true,
      tkaninyNumber: 0,
      podszewki: [],
      podszewkiIndex: 0,
      podszewkiReady: false,
      renderPodszewki: true,
      podszewkiNumber: 0,
      kroje: [],
      krojeReady: false,
      guziki: [],
      guzikiReady: false,
      guzikiNumber: 0,
      sizes: [],
      selected: "",
      showModal: false,
      windowWidth: null,
      xLargeScreen: false
    };
  },
  methods: {
    tkaninaChange: function tkaninaChange(index, columnIndex) {
      this.tkaninyNumber = (index - 1) * 3 + columnIndex - 1;
    },
    podszewkaChange: function podszewkaChange(index, columnIndex) {
      this.podszewkiNumber = (index - 1) * 3 + columnIndex - 1;
    },
    changeKroj: function changeKroj(kroj) {
      this.kroj = kroj;

      if (this.kroj.has_collar == "true") {
        this.showKolnierz = true;
      } else {
        this.showKolnierz = false;
      }
    },
    changeGuziki: function changeGuziki(guzik) {
      this.guzik = guzik;
    },
    changeBack: function changeBack(id) {
      if (id == "1") {
        this.tylPodszewka = false;
      } else {
        this.tylPodszewka = true;
      }
    },
    calculatePrice: function calculatePrice() {
      var basicPrice = 340;
      var calculatedPrice = basicPrice;

      if (this.kroj.has_collar == "true") {
        calculatedPrice += 20;
      }

      if (this.tylPodszewka == false) {
        calculatedPrice += 30;
      }

      return calculatedPrice;
    },
    makeOrder: function makeOrder() {
      if (this.selected == "") {
        alert("Wybierz rozmiar");
      } else {
        var tyl = "";

        if (this.tylPodszewka) {
          tyl = "podszewka";
        } else {
          tyl = "tkanina";
        }

        var guzikNumber = 0;

        for (var i = 0; i < this.guziki.length; i++) {
          if (this.guzik.id == this.guziki[i].id) {
            guzikNumber = i + 1;
          }
        }

        var krojNumber = 0;

        for (var i = 0; i < this.kroje.length; i++) {
          if (this.kroj.id == this.kroje[i].id) {
            krojNumber = i + 1;
          }
        }

        axios.put("/tkanina/" + String(this.tkaniny[this.tkaninyNumber].id), {
          quantity: this.tkaniny[this.tkaninyNumber].quantity - 1
        });
        axios.put("/podszewka/" + String(this.podszewki[this.podszewkiNumber].id), {
          quantity: this.podszewki[this.podszewkiNumber].quantity - 1
        });
        var product = {};
        product.customProduct = true;
        product.name = this.$t("messages.custom_product");
        product.price = this.calculatePrice();
        product.amount = 1;
        product.tkanina = String(this.tkaninyNumber + 1);
        product.podszewka = String(this.podszewkiNumber + 1);
        product.guziki = String(guzikNumber);
        product.tyl = tyl;
        product.kroj = String(krojNumber);
        product.female = "1";
        var i = 0;
        var sizeName = "";

        for (i = 0; i < this.sizes.length; i++) {
          if (this.sizes[i].id == this.selected) {
            sizeName = this.sizes[i].sizeName;
          }
        }

        product.size = sizeName;
        cart.addProduct(product);
        window.location.href = "/cart";
      }
    },
    incrementTkaniny: function incrementTkaniny() {
      if (this.tkaninyIndex < this.tkaniny.length - 1) {
        this.tkaninyIndex++;
      } else {
        this.renderTkaniny = false;
      }
    },
    incrementPodszewki: function incrementPodszewki() {
      if (this.podszewkiIndex < this.podszewki.length - 1) {
        this.podszewkiIndex++;
      } else {
        this.renderPodszewki = false;
      }
    },
    resizeHandler: function resizeHandler() {
      var width = this.windowWidth = window.innerWidth;

      if (width >= 2000) {
        this.xLargeScreen = true;
      } else {
        this.xLargeScreen = false;
      }
    }
  },
  computed: {
    columnSize: function columnSize() {
      if (this.xLargeScreen) {
        return "is-3";
      } else {
        return "is-2";
      }
    },
    mainColumnSize: function mainColumnSize() {
      if (this.xLargeScreen) {
        return "is-6";
      } else {
        return "is-8";
      }
    }
  },
  created: function created() {
    var _this = this;

    axios.get("kroj/female").then(function (response) {
      _this.kroje = response.data;
      _this.kroj = _this.kroje[0];
      _this.krojeReady = true;
    });
    axios.get("sizes/female").then(function (response) {
      _this.sizes = response.data;
    });
    axios.get("tkanina/female").then(function (response) {
      _this.tkaniny = response.data;
      _this.tkaninyReady = true;
    });
    axios.get("podszewka/get").then(function (response) {
      _this.podszewki = response.data;
      _this.podszewkiReady = true;
    });
    axios.get("button/female").then(function (response) {
      _this.guziki = response.data;
      _this.guzik = _this.guziki[0];
      _this.guzikiReady = true;
    });
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/w-configurator.vue?vue&type=template&id=61fe0a56&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/w-configurator.vue?vue&type=template&id=61fe0a56& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      staticClass: "configurator-container container is-fluid",
      attrs: { id: "configurator-page" }
    },
    [
      _c("section", { staticClass: "configurator has-text-centered" }, [
        _c("span", { staticClass: "txt" }, [
          _vm._v(_vm._s(_vm.$t("messages.kroj")))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "choice-container-parent" }, [
          _vm.krojeReady
            ? _c(
                "p",
                { staticClass: "buttons choice-container" },
                _vm._l(_vm.kroje, function(kroj, index) {
                  return _c(
                    "a",
                    {
                      key: index,
                      staticClass: "button",
                      on: {
                        click: function($event) {
                          return _vm.changeKroj(kroj)
                        }
                      }
                    },
                    [
                      _c(
                        "figure",
                        { staticClass: "image is-64x64 style-button" },
                        [
                          _c("img", {
                            attrs: {
                              src:
                                "/images/creator/female/" + kroj.name + ".png",
                              alt: "Cut image"
                            }
                          })
                        ]
                      )
                    ]
                  )
                }),
                0
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sizes-parent" }, [
          _c("span", { staticClass: "txt" }, [
            _vm._v(_vm._s(_vm.$t("messages.size")))
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "buttons are-small size-buttons sizes-container" },
            _vm._l(_vm.sizes, function(size) {
              return _c(
                "a",
                {
                  key: size.id,
                  staticClass: "button",
                  class: { "active-size": size.id == _vm.selected },
                  on: {
                    click: function($event) {
                      _vm.selected = size.id
                    }
                  }
                },
                [_vm._v(_vm._s(size.sizeName))]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "button sizes-button is-outlined",
              on: {
                click: function($event) {
                  _vm.showModal = true
                }
              }
            },
            [_c("span", [_vm._v(_vm._s(_vm.$t("messages.sizes-table")))])]
          ),
          _vm._v(" "),
          _vm.krojeReady
            ? _c("p", { staticClass: "price-text" }, [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.$t("messages.configurator-price")) +
                    "\n        "
                ),
                _c("span", { staticClass: "price-text-green" }, [
                  _vm._v(_vm._s(_vm.calculatePrice()) + " zł")
                ])
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "columns" }, [
          _c("div", { staticClass: "column", class: _vm.columnSize }, [
            _c("span", { staticClass: "txt" }, [
              _vm._v(_vm._s(_vm.$t("messages.tkanina")))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "choice-container-parent" }, [
              _vm.tkaninyReady
                ? _c(
                    "div",
                    _vm._l(Math.ceil(_vm.tkaniny.length / 3), function(index) {
                      return _c(
                        "p",
                        { key: index, staticClass: "buttons choice-container" },
                        _vm._l(3, function(columnIndex) {
                          return _c(
                            "a",
                            { key: columnIndex, staticClass: "button" },
                            [
                              _c(
                                "figure",
                                {
                                  staticClass: "image is-32x32",
                                  on: {
                                    click: function($event) {
                                      return _vm.tkaninaChange(
                                        index,
                                        columnIndex
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._o(
                                    _c("img", {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: _vm.renderTkaniny,
                                          expression: "renderTkaniny"
                                        }
                                      ],
                                      attrs: {
                                        src:
                                          _vm.tkaniny[_vm.tkaninyIndex]
                                            .icon_url,
                                        alt: "Material icon"
                                      }
                                    }),
                                    0,
                                    columnIndex
                                  )
                                ]
                              ),
                              _vm._v(
                                "\n                " +
                                  _vm._s(_vm.incrementTkaniny()) +
                                  "\n              "
                              )
                            ]
                          )
                        }),
                        0
                      )
                    }),
                    0
                  )
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "column images-container",
              class: _vm.mainColumnSize
            },
            [
              _c("div", { staticClass: "columns" }, [
                _c("div", { staticClass: "column" }, [
                  _c("figure", { staticClass: "image config-img-parent" }, [
                    _vm.podszewkiReady
                      ? _c("img", {
                          attrs: {
                            src:
                              "/images/creator/" +
                              _vm.podszewki[_vm.podszewkiNumber].name +
                              ".png"
                          }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.tkaninyReady && _vm.krojeReady
                      ? _c("img", {
                          attrs: {
                            src:
                              "/images/creator/female/" +
                              _vm.kroj.name +
                              "/" +
                              _vm.tkaniny[_vm.tkaninyNumber].name +
                              ".png"
                          }
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.guzikiReady && _vm.krojeReady
                      ? _c("img", {
                          attrs: {
                            src:
                              "/images/creator/female/" +
                              _vm.kroj.name +
                              "/" +
                              _vm.guzik.name +
                              ".png"
                          }
                        })
                      : _vm._e()
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "column" }, [
                  _vm.tkaninyReady
                    ? _c("figure", { staticClass: "image config-img-parent" }, [
                        _c("img", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.tylPodszewka,
                              expression: "!tylPodszewka"
                            }
                          ],
                          attrs: {
                            src: _vm.tkaniny[_vm.tkaninyNumber].back_image_url
                          }
                        }),
                        _vm._v(" "),
                        _vm.podszewkiReady
                          ? _c("img", {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.tylPodszewka,
                                  expression: "tylPodszewka"
                                }
                              ],
                              attrs: {
                                src:
                                  _vm.podszewki[_vm.podszewkiNumber]
                                    .back_female_image_url
                              }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _c("img", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.showKolnierz,
                              expression: "!showKolnierz"
                            }
                          ],
                          attrs: {
                            src: _vm.tkaniny[_vm.tkaninyNumber].single_addon_url
                          }
                        }),
                        _vm._v(" "),
                        _c("img", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.showKolnierz,
                              expression: "showKolnierz"
                            }
                          ],
                          attrs: {
                            src:
                              _vm.tkaniny[_vm.tkaninyNumber]
                                .addon_with_collar_url
                          }
                        })
                      ])
                    : _vm._e()
                ])
              ])
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "column", class: _vm.columnSize }, [
            _c("span", { staticClass: "txt" }, [
              _vm._v(_vm._s(_vm.$t("messages.podszewka")))
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "choice-container-parent" }, [
              _vm.podszewkiReady
                ? _c(
                    "div",
                    _vm._l(Math.ceil(_vm.podszewki.length / 3), function(
                      index
                    ) {
                      return _c(
                        "p",
                        { key: index, staticClass: "buttons choice-container" },
                        _vm._l(3, function(columnIndex) {
                          return _c(
                            "a",
                            { key: columnIndex, staticClass: "button" },
                            [
                              _c(
                                "figure",
                                {
                                  staticClass: "image is-32x32",
                                  on: {
                                    click: function($event) {
                                      return _vm.podszewkaChange(
                                        index,
                                        columnIndex
                                      )
                                    }
                                  }
                                },
                                [
                                  _vm._o(
                                    _c("img", {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: _vm.renderPodszewki,
                                          expression: "renderPodszewki"
                                        }
                                      ],
                                      attrs: {
                                        src:
                                          _vm.podszewki[_vm.podszewkiIndex]
                                            .icon_url,
                                        alt: "Fleece icon"
                                      }
                                    }),
                                    1,
                                    columnIndex
                                  )
                                ]
                              ),
                              _vm._v(
                                "\n                " +
                                  _vm._s(_vm.incrementPodszewki()) +
                                  "\n              "
                              )
                            ]
                          )
                        }),
                        0
                      )
                    }),
                    0
                  )
                : _vm._e()
            ])
          ])
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "txt" }, [
          _vm._v(_vm._s(_vm.$t("messages.tyl")))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "choice-container-parent" }, [
          _c("div", { staticClass: "control" }, [
            _c("label", { staticClass: "radio" }, [
              _c("input", {
                attrs: { type: "radio" },
                domProps: { checked: !_vm.tylPodszewka },
                on: {
                  click: function($event) {
                    return _vm.changeBack(1)
                  }
                }
              }),
              _vm._v(
                "\n          " +
                  _vm._s(_vm.$t("messages.tkanina")) +
                  "\n        "
              )
            ]),
            _vm._v(" "),
            _c("label", { staticClass: "radio" }, [
              _c("input", {
                attrs: { type: "radio" },
                domProps: { checked: _vm.tylPodszewka },
                on: {
                  click: function($event) {
                    return _vm.changeBack(2)
                  }
                }
              }),
              _vm._v(
                "\n          " +
                  _vm._s(_vm.$t("messages.podszewka")) +
                  "\n        "
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "txt" }, [
          _vm._v(_vm._s(_vm.$t("messages.buttons")))
        ]),
        _vm._v(" "),
        _vm.guzikiReady
          ? _c(
              "p",
              { staticClass: "buttons choice-container2" },
              _vm._l(_vm.guziki, function(guzik, index) {
                return _c("a", { key: index, staticClass: "button" }, [
                  _c(
                    "figure",
                    {
                      staticClass: "image is-32x32",
                      on: {
                        click: function($event) {
                          return _vm.changeGuziki(guzik)
                        }
                      }
                    },
                    [
                      _c("img", {
                        attrs: { src: guzik.icon_url, alt: "Button icon" }
                      })
                    ]
                  )
                ])
              }),
              0
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "button ready-button is-outlined",
            on: {
              click: function($event) {
                return _vm.makeOrder()
              }
            }
          },
          [_c("span", [_vm._v(_vm._s(_vm.$t("messages.add_to_cart")))])]
        ),
        _vm._v(" "),
        _c("p", { staticClass: "small-txt" }, [
          _vm._v(_vm._s(_vm.$t("messages.vest-color")))
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "modal", class: { "is-active": _vm.showModal } },
          [
            _c("div", {
              staticClass: "modal-background",
              on: {
                click: function($event) {
                  _vm.showModal = false
                }
              }
            }),
            _vm._v(" "),
            _vm._m(0),
            _vm._v(" "),
            _c("button", {
              staticClass: "modal-close is-large",
              attrs: { "aria-label": "close" },
              on: {
                click: function($event) {
                  _vm.showModal = false
                }
              }
            })
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-content" }, [
      _c("table", { staticClass: "table sizes-modal is-fullwidth" }, [
        _c("thead", [
          _c("tr", [
            _c("th", [_vm._v("Rozmiar")]),
            _vm._v(" "),
            _c("th", [_vm._v("34")]),
            _vm._v(" "),
            _c("th", [_vm._v("36")]),
            _vm._v(" "),
            _c("th", [_vm._v("38")]),
            _vm._v(" "),
            _c("th", [_vm._v("40")]),
            _vm._v(" "),
            _c("th", [_vm._v("42")]),
            _vm._v(" "),
            _c("th", [_vm._v("44")])
          ])
        ]),
        _vm._v(" "),
        _c("tbody", [
          _c("tr", [
            _c("th", [_vm._v("Obwód klatki piersiowej")]),
            _vm._v(" "),
            _c("td", [_vm._v("77-80")]),
            _vm._v(" "),
            _c("td", [_vm._v("81-84")]),
            _vm._v(" "),
            _c("td", [_vm._v("85-88")]),
            _vm._v(" "),
            _c("td", [_vm._v("89-92")]),
            _vm._v(" "),
            _c("td", [_vm._v("93-96")]),
            _vm._v(" "),
            _c("td", [_vm._v("97-100")])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("th", [_vm._v("Obwód talii")]),
            _vm._v(" "),
            _c("td", [_vm._v("59-62")]),
            _vm._v(" "),
            _c("td", [_vm._v("63-66")]),
            _vm._v(" "),
            _c("td", [_vm._v("67-70")]),
            _vm._v(" "),
            _c("td", [_vm._v("71-74")]),
            _vm._v(" "),
            _c("td", [_vm._v("75-78")]),
            _vm._v(" "),
            _c("td", [_vm._v("79-82")])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("th", [_vm._v("Długość pleców")]),
            _vm._v(" "),
            _c("td", [_vm._v("48")]),
            _vm._v(" "),
            _c("td", [_vm._v("48,5")]),
            _vm._v(" "),
            _c("td", [_vm._v("49")]),
            _vm._v(" "),
            _c("td", [_vm._v("49,5")]),
            _vm._v(" "),
            _c("td", [_vm._v("50")]),
            _vm._v(" "),
            _c("td", [_vm._v("50,5")])
          ])
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/w-configurator.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/w-configurator.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _w_configurator_vue_vue_type_template_id_61fe0a56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./w-configurator.vue?vue&type=template&id=61fe0a56& */ "./resources/js/components/w-configurator.vue?vue&type=template&id=61fe0a56&");
/* harmony import */ var _w_configurator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./w-configurator.vue?vue&type=script&lang=js& */ "./resources/js/components/w-configurator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _w_configurator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _w_configurator_vue_vue_type_template_id_61fe0a56___WEBPACK_IMPORTED_MODULE_0__["render"],
  _w_configurator_vue_vue_type_template_id_61fe0a56___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/w-configurator.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/w-configurator.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/w-configurator.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_w_configurator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./w-configurator.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/w-configurator.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_w_configurator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/w-configurator.vue?vue&type=template&id=61fe0a56&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/w-configurator.vue?vue&type=template&id=61fe0a56& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_w_configurator_vue_vue_type_template_id_61fe0a56___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./w-configurator.vue?vue&type=template&id=61fe0a56& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/w-configurator.vue?vue&type=template&id=61fe0a56&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_w_configurator_vue_vue_type_template_id_61fe0a56___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_w_configurator_vue_vue_type_template_id_61fe0a56___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);