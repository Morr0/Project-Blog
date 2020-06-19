exports.ids = [2];
exports.modules = {

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VCardActions */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VCardSubtitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VCardText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VCardTitle; });
/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


const VCardActions = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "g"])('v-card__actions');
const VCardSubtitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "g"])('v-card__subtitle');
const VCardText = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "g"])('v-card__text');
const VCardTitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "g"])('v-card__title');

/* unused harmony default export */ var _unused_webpack_default_export = ({
  $_vuetify_subcomponents: {
    VCard: _VCard__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle
  }
});

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--16-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Article.vue?vue&type=template&id=417723b0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',[(_vm.individualPage)?_c('v-card',{attrs:{"elevation":"3","hover":""}},[_c('v-responsive',[_c('v-card-title',{staticClass:"display-2"},[_vm._v("\n                "+_vm._s(_vm.post.title)+"\n            ")]),_vm._v(" "),_c('v-card-subtitle',[_vm._v(" since "+_vm._s(_vm.postDate)+"\n            ")]),_vm._v(" "),_c('v-card-text',{staticClass:"align-center justify-center",attrs:{"fluid":""},domProps:{"innerHTML":_vm._s(_vm.content)}})],1)],1):_c('v-card',{attrs:{"to":("/post/" + (_vm.post._id)),"wrap":""}},[_c('v-responsive',[_c('v-card-title',[_vm._v("\n                "+_vm._s(_vm.post.title)+"\n            ")]),_vm._v(" "),_c('v-card-subtitle',[_vm._v(" since "+_vm._s(_vm.postDate)+"\n            ")]),_vm._v(" "),_c('v-card-text',[_vm._v("\n                "+_vm._s(_vm.post.description)+"\n            ")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/Article.vue?vue&type=template&id=417723b0&

// EXTERNAL MODULE: external "marked"
var external_marked_ = __webpack_require__(104);
var external_marked_default = /*#__PURE__*/__webpack_require__.n(external_marked_);

// EXTERNAL MODULE: external "reading-time"
var external_reading_time_ = __webpack_require__(105);
var external_reading_time_default = /*#__PURE__*/__webpack_require__.n(external_reading_time_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vuetify-loader/lib/loader.js??ref--16-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Article.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Articlevue_type_script_lang_js_ = ({
  name: "Article",
  props: {
    post: {},
    individualPage: Boolean,
    minimised: Boolean
  },
  computed: {
    content: function () {
      return external_marked_default()(this.post.content);
    },
    timeToRead: function () {
      return external_reading_time_default()(this.content);
    },
    postDate: function () {
      return new Date(this.post.postDate).toLocaleDateString("en-au");
    }
  },
  methods: {
    like: function () {
      try {
        fetch(`${this.$store.state.backend}/posts/like/${this.post._id}`, {
          method: "PUT",
          credentials: "include"
        });
      } catch (error) {
        return console.log(error);
      } // Client side rendering


      if (!this.post.likes) this.post.likes = 0;
      this.liked = true;
      this.post.likes++;
    }
  },
  data: function () {
    return {
      date: new Date(),
      liked: false
    };
  },

  async mounted() {
    if (this.post.postDate) this.date = new Date(this.post.postDate);
    document.date = this.date;
  }

});
// CONCATENATED MODULE: ./components/Article.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Articlevue_type_script_lang_js_ = (Articlevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(13);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(103);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(102);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__(117);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VResponsive/VResponsive.js
var VResponsive = __webpack_require__(32);

// CONCATENATED MODULE: ./components/Article.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Articlevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "14a18ced"
  
)

/* harmony default export */ var Article = __webpack_exports__["a"] = (component.exports);

/* vuetify-loader */







installComponents_default()(component, {VCard: VCard["a" /* default */],VCardSubtitle: components_VCard["a" /* VCardSubtitle */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VContainer: VContainer["a" /* default */],VResponsive: VResponsive["a" /* default */]})


/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--16-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/post/_id/index.vue?vue&type=template&id=3445a216&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"flex mb-4 mt-4"},[_vm._ssrNode("<div class=\"w-1/5 h-12\"></div> "),_vm._ssrNode("<div class=\"w-3/5 h-12\">","</div>",[(_vm.post._id)?_c('Article',{attrs:{"post":_vm.post,"individualPage":true}}):_vm._e()],1),_vm._ssrNode(" <div class=\"w-1/5 h-12\"></div>")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/post/_id/index.vue?vue&type=template&id=3445a216&

// EXTERNAL MODULE: ./components/Article.vue + 4 modules
var Article = __webpack_require__(118);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vuetify-loader/lib/loader.js??ref--16-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/post/_id/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var _idvue_type_script_lang_js_ = ({
  name: "Post",
  components: {
    Article: Article["a" /* default */]
  },

  async asyncData(context) {
    const id = context.params.id;
    let post = undefined;

    try {
      const res = await fetch(`${context.store.state.backend}/posts/${id}`, {
        credentials: "include"
      });
      if (res.status !== 200) return context.route.replace("/");
      post = await res.json();
    } catch (error) {
      console.log(error);
      return context.route.replace("/");
    }

    return {
      post
    };
  }

});
// CONCATENATED MODULE: ./pages/post/_id/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var post_idvue_type_script_lang_js_ = (_idvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(9);

// CONCATENATED MODULE: ./pages/post/_id/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  post_idvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "4c4316a9"
  
)

/* harmony default export */ var _id = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=pages_post__id_index.js.map