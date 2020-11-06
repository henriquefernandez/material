/* m-dashboard */
if((window.innerWidth < 500) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  let el = document.getElementById("material-dashboard-control")
  if (el != null) { el.checked = false; }
}

/* m-layout / m-menu / m-tabs / m-ripple */
!(function () {
  "use strict";
  function e(e, t) {
      if (e) {
          if (t.element_.classList.contains(t.CssClasses_.mt_JS_RIPPLE_EFFECT)) {
              var s = document.createElement("span");
              s.classList.add(t.CssClasses_.mt_RIPPLE_CONTAINER), s.classList.add(t.CssClasses_.mt_JS_RIPPLE_EFFECT);
              var i = document.createElement("span");
              i.classList.add(t.CssClasses_.mt_RIPPLE), s.appendChild(i), e.appendChild(s);
          }
          e.addEventListener("click", function (s) {
              if ("#" === e.getAttribute("href").charAt(0)) {
                  s.preventDefault();
                  var i = e.href.split("#")[1],
                      n = t.element_.querySelector("#" + i);
                  t.resetTabState_(), t.resetPanelState_(), e.classList.add(t.CssClasses_.ACTIVE_CLASS), n.classList.add(t.CssClasses_.ACTIVE_CLASS);
              }
          });
      }
  }
  function t(e, t, s, i) {
      function n() {
          var n = e.href.split("#")[1],
              a = i.content_.querySelector("#" + n);
          i.resetTabState_(t), i.resetPanelState_(s), e.classList.add(i.CssClasses_.IS_ACTIVE), a.classList.add(i.CssClasses_.IS_ACTIVE);
      }
      if (i.tabBar_.classList.contains(i.CssClasses_.JS_RIPPLE_EFFECT)) {
          var a = document.createElement("span");
          a.classList.add(i.CssClasses_.RIPPLE_CONTAINER), a.classList.add(i.CssClasses_.JS_RIPPLE_EFFECT);
          var l = document.createElement("span");
          l.classList.add(i.CssClasses_.RIPPLE), a.appendChild(l), e.appendChild(a);
      }
      i.tabBar_.classList.contains(i.CssClasses_.TAB_MANUAL_SWITCH) ||
          e.addEventListener("click", function (t) {
              "#" === e.getAttribute("href").charAt(0) && (t.preventDefault(), n());
          }),
          (e.show = n);
  }
  var s = {
      upgradeDom: function (e, t) {},
      upgradeElement: function (e, t) {},
      upgradeElements: function (e) {},
      upgradeAllRegistered: function () {},
      registerUpgradedCallback: function (e, t) {},
      register: function (e) {},
      downgradeElements: function (e) {},
  };
  (s = (function () {
      function e(e, t) {
          for (var s = 0; s < c.length; s++) if (c[s].className === e) return "undefined" != typeof t && (c[s] = t), c[s];
          return !1;
      }
      function t(e) {
          var t = e.getAttribute("data-upgraded");
          return null === t ? [""] : t.split(",");
      }
      function s(e, s) {
          var i = t(e);
          return i.indexOf(s) !== -1;
      }
      function i(e, t, s) {
          if ("CustomEvent" in window && "function" == typeof window.CustomEvent) return new CustomEvent(e, { bubbles: t, cancelable: s });
          var i = document.createEvent("Events");
          return i.initEvent(e, t, s), i;
      }
      function n(t, s) {
          if ("undefined" == typeof t && "undefined" == typeof s) for (var i = 0; i < c.length; i++) n(c[i].className, c[i].cssClass);
          else {
              var l = t;
              if ("undefined" == typeof s) {
                  var o = e(l);
                  o && (s = o.cssClass);
              }
              for (var r = document.querySelectorAll("." + s), _ = 0; _ < r.length; _++) a(r[_], l);
          }
      }
      function a(n, a) {
          if (!("object" == typeof n && n instanceof Element)) throw new Error("Invalid argument provided to upgrade mt element.");
          var l = i("material-componentupgrading", !0, !0);
          if ((n.dispatchEvent(l), !l.defaultPrevented)) {
              var o = t(n),
                  r = [];
              if (a) s(n, a) || r.push(e(a));
              else {
                  var _ = n.classList;
                  c.forEach(function (e) {
                      _.contains(e.cssClass) && r.indexOf(e) === -1 && !s(n, e.className) && r.push(e);
                  });
              }
              for (var d, h = 0, u = r.length; h < u; h++) {
                  if (((d = r[h]), !d)) throw new Error("Unable to find a registered component for the given class.");
                  o.push(d.className), n.setAttribute("data-upgraded", o.join(","));
                  var E = new d.classConstructor(n);
                  (E[C] = d), p.push(E);
                  for (var m = 0, L = d.callbacks.length; m < L; m++) d.callbacks[m](n);
                  d.widget && (n[d.className] = E);
                  var I = i("material-componentupgraded", !0, !1);
                  n.dispatchEvent(I);
              }
          }
      }
      function l(e) {
          Array.isArray(e) || (e = e instanceof Element ? [e] : Array.prototype.slice.call(e));
          for (var t, s = 0, i = e.length; s < i; s++) (t = e[s]), t instanceof HTMLElement && (a(t), t.children.length > 0 && l(t.children));
      }
      function o(t) {
          var s = "undefined" == typeof t.widget && "undefined" == typeof t.widget,
              i = !0;
          s || (i = t.widget || t.widget);
          var n = { classConstructor: t.constructor || t.constructor, className: t.classAsString || t.classAsString, cssClass: t.cssClass || t.cssClass, widget: i, callbacks: [] };
          if (
              (c.forEach(function (e) {
                  if (e.cssClass === n.cssClass) throw new Error("The provided cssClass has already been registered: " + e.cssClass);
                  if (e.className === n.className) throw new Error("The provided className has already been registered");
              }),
              t.constructor.prototype.hasOwnProperty(C))
          )
              throw new Error("mt component classes must not have " + C + " defined as a property.");
          var a = e(t.classAsString, n);
          a || c.push(n);
      }
      function r(t, s) {
          var i = e(t);
          i && i.callbacks.push(s);
      }
      function _() {
          for (var e = 0; e < c.length; e++) n(c[e].className);
      }
      function d(e) {
          if (e) {
              var t = p.indexOf(e);
              p.splice(t, 1);
              var s = e.element_.getAttribute("data-upgraded").split(","),
                  n = s.indexOf(e[C].classAsString);
              s.splice(n, 1), e.element_.setAttribute("data-upgraded", s.join(","));
              var a = i("material-componentdowngraded", !0, !1);
              e.element_.dispatchEvent(a);
          }
      }
      function h(e) {
          var t = function (e) {
              p.filter(function (t) {
                  return t.element_ === e;
              }).forEach(d);
          };
          if (e instanceof Array || e instanceof NodeList) for (var s = 0; s < e.length; s++) t(e[s]);
          else {
              if (!(e instanceof Node)) throw new Error("Invalid argument provided to downgrade mt nodes.");
              t(e);
          }
      }
      var c = [],
          p = [],
          C = "mtComponentConfigInternal_";
      return { upgradeDom: n, upgradeElement: a, upgradeElements: l, upgradeAllRegistered: _, registerUpgradedCallback: r, register: o, downgradeElements: h };
  })()),
      s.ComponentConfigPublic,
      s.ComponentConfig,
      s.Component,
      (s.upgradeDom = s.upgradeDom),
      (s.upgradeElement = s.upgradeElement),
      (s.upgradeElements = s.upgradeElements),
      (s.upgradeAllRegistered = s.upgradeAllRegistered),
      (s.registerUpgradedCallback = s.registerUpgradedCallback),
      (s.register = s.register),
      (s.downgradeElements = s.downgradeElements),
      (window.componentHandler = s),
      (window.componentHandler = s),
      window.addEventListener("load", function () {
          "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach
              ? (document.documentElement.classList.add("material-js"), s.upgradeAllRegistered())
              : ((s.upgradeElement = function () {}), (s.register = function () {}));
      }),
      Date.now ||
          ((Date.now = function () {
              return new Date().getTime();
          }),
          (Date.now = Date.now));
  for (var i = ["webkit", "moz"], n = 0; n < i.length && !window.requestAnimationFrame; ++n) {
      var a = i[n];
      (window.requestAnimationFrame = window[a + "RequestAnimationFrame"]),
          (window.cancelAnimationFrame = window[a + "CancelAnimationFrame"] || window[a + "CancelRequestAnimationFrame"]),
          (window.requestAnimationFrame = window.requestAnimationFrame),
          (window.cancelAnimationFrame = window.cancelAnimationFrame);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var l = 0;
      (window.requestAnimationFrame = function (e) {
          var t = Date.now(),
              s = Math.max(l + 16, t);
          return setTimeout(function () {
              e((l = s));
          }, s - t);
      }),
          (window.cancelAnimationFrame = clearTimeout),
          (window.requestAnimationFrame = window.requestAnimationFrame),
          (window.cancelAnimationFrame = window.cancelAnimationFrame);
  }

  // ==== MENU ====
  var d = function (e) {
      (this.element_ = e), this.init();
  };
  (window.MaterialMenu = d),
      (d.prototype.Constant_ = { TRANSITION_DURATION_SECONDS: 0.3, TRANSITION_DURATION_FRACTION: 0.8, CLOSE_TIMEOUT: 150 }),
      (d.prototype.Keycodes_ = { ENTER: 13, ESCAPE: 27, SPACE: 32, UP_ARROW: 38, DOWN_ARROW: 40 }),
      (d.prototype.CssClasses_ = {
          CONTAINER: "material-menu__container",
          OUTLINE: "material-menu__outline",
          ITEM: "material-menu__item",
          ITEM_RIPPLE_CONTAINER: "material-menu__item-ripple-container",
          RIPPLE_EFFECT: "material-js-ripple-effect",
          RIPPLE_IGNORE_EVENTS: "material-js-ripple-effect--ignore-events",
          RIPPLE: "material-ripple",
          IS_UPGRADED: "is-upgraded",
          IS_VISIBLE: "is-visible",
          IS_ANIMATING: "is-animating",
          BOTTOM_LEFT: "material-menu--bottom-left",
          BOTTOM_RIGHT: "material-menu--bottom-right",
          TOP_LEFT: "material-menu--top-left",
          TOP_RIGHT: "material-menu--top-right",
          UNALIGNED: "material-menu--unaligned",
      }),
      (d.prototype.init = function () {
          if (this.element_) {
              var e = document.createElement("div");
              e.classList.add(this.CssClasses_.CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_), (this.container_ = e);
              var t = document.createElement("div");
              t.classList.add(this.CssClasses_.OUTLINE), (this.outline_ = t), e.insertBefore(t, this.element_);
              var s = this.element_.getAttribute("for") || this.element_.getAttribute("data-m-for"),
                  i = null;
              s && ((i = document.getElementById(s)), i && ((this.forElement_ = i), i.addEventListener("click", this.handleForClick_.bind(this)), i.addEventListener("keydown", this.handleForKeyboardEvent_.bind(this))));
              var n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM);
              (this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this)), (this.boundItemClick_ = this.handleItemClick_.bind(this));
              for (var a = 0; a < n.length; a++) n[a].addEventListener("click", this.boundItemClick_), (n[a].tabIndex = "-1"), n[a].addEventListener("keydown", this.boundItemKeydown_);
              if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT))
                  for (this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS), a = 0; a < n.length; a++) {
                      var l = n[a],
                          o = document.createElement("span");
                      o.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
                      var r = document.createElement("span");
                      r.classList.add(this.CssClasses_.RIPPLE), o.appendChild(r), l.appendChild(o), l.classList.add(this.CssClasses_.RIPPLE_EFFECT);
                  }
              this.element_.classList.contains(this.CssClasses_.BOTTOM_LEFT) && this.outline_.classList.add(this.CssClasses_.BOTTOM_LEFT),
                  this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT) && this.outline_.classList.add(this.CssClasses_.BOTTOM_RIGHT),
                  this.element_.classList.contains(this.CssClasses_.TOP_LEFT) && this.outline_.classList.add(this.CssClasses_.TOP_LEFT),
                  this.element_.classList.contains(this.CssClasses_.TOP_RIGHT) && this.outline_.classList.add(this.CssClasses_.TOP_RIGHT),
                  this.element_.classList.contains(this.CssClasses_.UNALIGNED) && this.outline_.classList.add(this.CssClasses_.UNALIGNED),
                  e.classList.add(this.CssClasses_.IS_UPGRADED);
          }
      }),
      (d.prototype.handleForClick_ = function (e) {
          if (this.element_ && this.forElement_) {
              var t = this.forElement_.getBoundingClientRect(),
                  s = this.forElement_.parentElement.getBoundingClientRect();
              this.element_.classList.contains(this.CssClasses_.UNALIGNED) ||
                  (this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)
                      ? ((this.container_.style.right = s.right - t.right + "px"), (this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + "px"))
                      : this.element_.classList.contains(this.CssClasses_.TOP_LEFT)
                      ? ((this.container_.style.left = this.forElement_.offsetLeft + "px"), (this.container_.style.bottom = s.bottom - t.top + "px"))
                      : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)
                      ? ((this.container_.style.right = s.right - t.right + "px"), (this.container_.style.bottom = s.bottom - t.top + "px"))
                      : ((this.container_.style.left = this.forElement_.offsetLeft + "px"), (this.container_.style.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + "px")));
          }
          this.toggle(e);
      }),
      (d.prototype.handleForKeyboardEvent_ = function (e) {
          if (this.element_ && this.container_ && this.forElement_) {
              var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
              t &&
                  t.length > 0 &&
                  this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) &&
                  (e.keyCode === this.Keycodes_.UP_ARROW ? (e.preventDefault(), t[t.length - 1].focus()) : e.keyCode === this.Keycodes_.DOWN_ARROW && (e.preventDefault(), t[0].focus()));
          }
      }),
      (d.prototype.handleItemKeyboardEvent_ = function (e) {
          if (this.element_ && this.container_) {
              var t = this.element_.querySelectorAll("." + this.CssClasses_.ITEM + ":not([disabled])");
              if (t && t.length > 0 && this.container_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
                  var s = Array.prototype.slice.call(t).indexOf(e.target);
                  if (e.keyCode === this.Keycodes_.UP_ARROW) e.preventDefault(), s > 0 ? t[s - 1].focus() : t[t.length - 1].focus();
                  else if (e.keyCode === this.Keycodes_.DOWN_ARROW) e.preventDefault(), t.length > s + 1 ? t[s + 1].focus() : t[0].focus();
                  else if (e.keyCode === this.Keycodes_.SPACE || e.keyCode === this.Keycodes_.ENTER) {
                      e.preventDefault();
                      var i = new MouseEvent("mousedown");
                      e.target.dispatchEvent(i), (i = new MouseEvent("mouseup")), e.target.dispatchEvent(i), e.target.click();
                  } else e.keyCode === this.Keycodes_.ESCAPE && (e.preventDefault(), this.hide());
              }
          }
      }),
      (d.prototype.handleItemClick_ = function (e) {
          e.target.hasAttribute("disabled")
              ? e.stopPropagation()
              : ((this.closing_ = !0),
                window.setTimeout(
                    function (e) {
                        this.hide(), (this.closing_ = !1);
                    }.bind(this),
                    this.Constant_.CLOSE_TIMEOUT
                ));
      }),
      (d.prototype.applyClip_ = function (e, t) {
          this.element_.classList.contains(this.CssClasses_.UNALIGNED)
              ? (this.element_.style.clip = "")
              : this.element_.classList.contains(this.CssClasses_.BOTTOM_RIGHT)
              ? (this.element_.style.clip = "rect(0 " + t + "px 0 " + t + "px)")
              : this.element_.classList.contains(this.CssClasses_.TOP_LEFT)
              ? (this.element_.style.clip = "rect(" + e + "px 0 " + e + "px 0)")
              : this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)
              ? (this.element_.style.clip = "rect(" + e + "px " + t + "px " + e + "px " + t + "px)")
              : (this.element_.style.clip = "");
      }),
      (d.prototype.removeAnimationEndListener_ = function (e) {
          e.target.classList.remove(d.prototype.CssClasses_.IS_ANIMATING);
      }),
      (d.prototype.addAnimationEndListener_ = function () {
          this.element_.addEventListener("transitionend", this.removeAnimationEndListener_), this.element_.addEventListener("webkitTransitionEnd", this.removeAnimationEndListener_);
      }),
      (d.prototype.show = function (e) {
          if (this.element_ && this.container_ && this.outline_) {
              var t = this.element_.getBoundingClientRect().height,
                  s = this.element_.getBoundingClientRect().width;
              (this.container_.style.width = s + "px"), (this.container_.style.height = t + "px"), (this.outline_.style.width = s + "px"), (this.outline_.style.height = t + "px");
              for (var i = this.Constant_.TRANSITION_DURATION_SECONDS * this.Constant_.TRANSITION_DURATION_FRACTION, n = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), a = 0; a < n.length; a++) {
                  var l = null;
                  (l =
                      this.element_.classList.contains(this.CssClasses_.TOP_LEFT) || this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)
                          ? ((t - n[a].offsetTop - n[a].offsetHeight) / t) * i + "s"
                          : (n[a].offsetTop / t) * i + "s"),
                      (n[a].style.transitionDelay = l);
              }
              this.applyClip_(t, s),
                  window.requestAnimationFrame(
                      function () {
                          this.element_.classList.add(this.CssClasses_.IS_ANIMATING), (this.element_.style.clip = "rect(0 " + s + "px " + t + "px 0)"), this.container_.classList.add(this.CssClasses_.IS_VISIBLE);
                      }.bind(this)
                  ),
                  this.addAnimationEndListener_();
              var o = function (t) {
                  t === e || this.closing_ || t.target.parentNode === this.element_ || (document.removeEventListener("click", o), this.hide());
              }.bind(this);
              document.addEventListener("click", o);
          }
      }),
      (d.prototype.show = d.prototype.show),
      (d.prototype.hide = function () {
          if (this.element_ && this.container_ && this.outline_) {
              for (var e = this.element_.querySelectorAll("." + this.CssClasses_.ITEM), t = 0; t < e.length; t++) e[t].style.removeProperty("transition-delay");
              var s = this.element_.getBoundingClientRect(),
                  i = s.height,
                  n = s.width;
              this.element_.classList.add(this.CssClasses_.IS_ANIMATING), this.applyClip_(i, n), this.container_.classList.remove(this.CssClasses_.IS_VISIBLE), this.addAnimationEndListener_();
          }
      }),
      (d.prototype.hide = d.prototype.hide),
      (d.prototype.toggle = function (e) {
          this.container_.classList.contains(this.CssClasses_.IS_VISIBLE) ? this.hide() : this.show(e);
      }),
      (d.prototype.toggle = d.prototype.toggle),
      s.register({ constructor: d, classAsString: "MaterialMenu", cssClass: "material-js-menu", widget: !0 });
  var h = function (e) {
      (this.element_ = e), this.init();
  };
  var m = function (e) {
      (this.element_ = e), this.init();
  };

  // ==== TABS ====
  (window.MaterialTabs = m),
      (m.prototype.Constant_ = {}),
      (m.prototype.CssClasses_ = {
          TAB_CLASS: "material-tabs__tab",
          PANEL_CLASS: "material-tabs__panel",
          ACTIVE_CLASS: "is-active",
          UPGRADED_CLASS: "is-upgraded",
          mt_JS_RIPPLE_EFFECT: "material-js-ripple-effect",
          mt_RIPPLE_CONTAINER: "material-tabs__ripple-container",
          mt_RIPPLE: "material-ripple",
          mt_JS_RIPPLE_EFFECT_IGNORE_EVENTS: "material-js-ripple-effect--ignore-events",
      }),
      (m.prototype.initTabs_ = function () {
          this.element_.classList.contains(this.CssClasses_.mt_JS_RIPPLE_EFFECT) && this.element_.classList.add(this.CssClasses_.mt_JS_RIPPLE_EFFECT_IGNORE_EVENTS),
              (this.tabs_ = this.element_.querySelectorAll("." + this.CssClasses_.TAB_CLASS)),
              (this.panels_ = this.element_.querySelectorAll("." + this.CssClasses_.PANEL_CLASS));
          for (var t = 0; t < this.tabs_.length; t++) new e(this.tabs_[t], this);
          this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
      }),
      (m.prototype.resetTabState_ = function () {
          for (var e = 0; e < this.tabs_.length; e++) this.tabs_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS);
      }),
      (m.prototype.resetPanelState_ = function () {
          for (var e = 0; e < this.panels_.length; e++) this.panels_[e].classList.remove(this.CssClasses_.ACTIVE_CLASS);
      }),
      (m.prototype.init = function () {
          this.element_ && this.initTabs_();
      }),
      s.register({ constructor: m, classAsString: "MaterialTabs", cssClass: "material-js-tabs" });

  // ==== LAYOUT ====
  var f = function (e) {
      (this.element_ = e), this.init();
  };
  (window.MaterialLayout = f),
      (f.prototype.Constant_ = { MAX_WIDTH: "(max-width: 1024px)", TAB_SCROLL_PIXELS: 100, RESIZE_TIMEOUT: 100, MENU_ICON: "&#xE5D2;", CHEVRON_LEFT: "chevron_left", CHEVRON_RIGHT: "chevron_right" }),
      (f.prototype.Keycodes_ = { ENTER: 13, ESCAPE: 27, SPACE: 32 }),
      (f.prototype.Mode_ = { STANDARD: 0, SEAMED: 1, WATERFALL: 2, SCROLL: 3 }),
      (f.prototype.CssClasses_ = {
          CONTAINER: "material-layout__container",
          HEADER: "material-layout__header",
          DRAWER: "material-layout__drawer",
          CONTENT: "material-layout__content",
          DRAWER_BTN: "material-layout__drawer-button",
          ICON: "material-icons",
          JS_RIPPLE_EFFECT: "material-js-ripple-effect",
          RIPPLE_CONTAINER: "material-layout__tab-ripple-container",
          RIPPLE: "material-ripple",
          RIPPLE_IGNORE_EVENTS: "material-js-ripple-effect--ignore-events",
          HEADER_SEAMED: "material-layout__header--seamed",
          HEADER_WATERFALL: "material-layout__header--waterfall",
          HEADER_SCROLL: "material-layout__header--scroll",
          FIXED_HEADER: "material-layout--fixed-header",
          OBFUSCATOR: "material-layout__obfuscator",
          TAB_BAR: "material-layout__tab-bar",
          TAB_CONTAINER: "material-layout__tab-bar-container",
          TAB: "material-layout__tab",
          TAB_BAR_BUTTON: "material-layout__tab-bar-button",
          TAB_BAR_LEFT_BUTTON: "material-layout__tab-bar-left-button",
          TAB_BAR_RIGHT_BUTTON: "material-layout__tab-bar-right-button",
          TAB_MANUAL_SWITCH: "material-layout__tab-manual-switch",
          PANEL: "material-layout__tab-panel",
          HAS_DRAWER: "has-drawer",
          HAS_TABS: "has-tabs",
          HAS_SCROLLING_HEADER: "has-scrolling-header",
          CASTING_SHADOW: "is-casting-shadow",
          IS_COMPACT: "is-compact",
          IS_SMALL_SCREEN: "is-small-screen",
          IS_DRAWER_OPEN: "is-visible",
          IS_ACTIVE: "is-active",
          IS_UPGRADED: "is-upgraded",
          IS_ANIMATING: "is-animating",
          ON_LARGE_SCREEN: "material-layout--large-screen-only",
          ON_SMALL_SCREEN: "material-layout--small-screen-only",
      }),
      (f.prototype.contentScrollHandler_ = function () {
          if (!this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)) {
              var e = !this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN) || this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);
              this.content_.scrollTop > 0 && !this.header_.classList.contains(this.CssClasses_.IS_COMPACT)
                  ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.header_.classList.add(this.CssClasses_.IS_COMPACT), e && this.header_.classList.add(this.CssClasses_.IS_ANIMATING))
                  : this.content_.scrollTop <= 0 &&
                    this.header_.classList.contains(this.CssClasses_.IS_COMPACT) &&
                    (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.header_.classList.remove(this.CssClasses_.IS_COMPACT), e && this.header_.classList.add(this.CssClasses_.IS_ANIMATING));
          }
      }),
      (f.prototype.keyboardEventHandler_ = function (e) {
          e.keyCode === this.Keycodes_.ESCAPE && this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN) && this.toggleDrawer();
      }),
      (f.prototype.screenSizeHandler_ = function () {
          this.screenSizeMediaQuery_.matches
              ? this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN)
              : (this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN), this.drawer_ && (this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN), this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN)));
      }),
      (f.prototype.drawerToggleHandler_ = function (e) {
          if (e && "keydown" === e.type) {
              if (e.keyCode !== this.Keycodes_.SPACE && e.keyCode !== this.Keycodes_.ENTER) return;
              e.preventDefault();
          }
          this.toggleDrawer();
      }),
      (f.prototype.headerTransitionEndHandler_ = function () {
          this.header_.classList.remove(this.CssClasses_.IS_ANIMATING);
      }),
      (f.prototype.headerClickHandler_ = function () {
          this.header_.classList.contains(this.CssClasses_.IS_COMPACT) && (this.header_.classList.remove(this.CssClasses_.IS_COMPACT), this.header_.classList.add(this.CssClasses_.IS_ANIMATING));
      }),
      (f.prototype.resetTabState_ = function (e) {
          for (var t = 0; t < e.length; t++) e[t].classList.remove(this.CssClasses_.IS_ACTIVE);
      }),
      (f.prototype.resetPanelState_ = function (e) {
          for (var t = 0; t < e.length; t++) e[t].classList.remove(this.CssClasses_.IS_ACTIVE);
      }),
      (f.prototype.toggleDrawer = function () {
          var e = this.element_.querySelector("." + this.CssClasses_.DRAWER_BTN);
          this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),
              this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN),
              this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)
                  ? (this.drawer_.setAttribute("aria-hidden", "false"), e.setAttribute("aria-expanded", "true"))
                  : (this.drawer_.setAttribute("aria-hidden", "true"), e.setAttribute("aria-expanded", "false"));
      }),
      (f.prototype.toggleDrawer = f.prototype.toggleDrawer),
      (f.prototype.init = function () {
          if (this.element_) {
              var e = document.createElement("div");
              e.classList.add(this.CssClasses_.CONTAINER);
              var s = this.element_.querySelector(":focus");
              this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_), s && s.focus();
              for (var i = this.element_.childNodes, n = i.length, a = 0; a < n; a++) {
                  var l = i[a];
                  l.classList && l.classList.contains(this.CssClasses_.HEADER) && (this.header_ = l),
                      l.classList && l.classList.contains(this.CssClasses_.DRAWER) && (this.drawer_ = l),
                      l.classList && l.classList.contains(this.CssClasses_.CONTENT) && (this.content_ = l);
              }
              window.addEventListener(
                  "pageshow",
                  function (e) {
                      e.persisted &&
                          ((this.element_.style.overflowY = "hidden"),
                          requestAnimationFrame(
                              function () {
                                  this.element_.style.overflowY = "";
                              }.bind(this)
                          ));
                  }.bind(this),
                  !1
              ),
                  this.header_ && (this.tabBar_ = this.header_.querySelector("." + this.CssClasses_.TAB_BAR));
              var o = this.Mode_.STANDARD;
              if (
                  (this.header_ &&
                      (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)
                          ? (o = this.Mode_.SEAMED)
                          : this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL)
                          ? ((o = this.Mode_.WATERFALL), this.header_.addEventListener("transitionend", this.headerTransitionEndHandler_.bind(this)), this.header_.addEventListener("click", this.headerClickHandler_.bind(this)))
                          : this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL) && ((o = this.Mode_.SCROLL), e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)),
                      o === this.Mode_.STANDARD
                          ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW))
                          : o === this.Mode_.SEAMED || o === this.Mode_.SCROLL
                          ? (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW))
                          : o === this.Mode_.WATERFALL && (this.content_.addEventListener("scroll", this.contentScrollHandler_.bind(this)), this.contentScrollHandler_())),
                  this.drawer_)
              ) {
                  var r = this.element_.querySelector("." + this.CssClasses_.DRAWER_BTN);
                  if (!r) {
                      (r = document.createElement("div")), r.setAttribute("aria-expanded", "false"), r.setAttribute("role", "button"), r.setAttribute("tabindex", "0"), r.classList.add(this.CssClasses_.DRAWER_BTN);
                      var _ = document.createElement("i");
                      _.classList.add(this.CssClasses_.ICON), (_.innerHTML = this.Constant_.MENU_ICON), r.appendChild(_);
                  }
                  this.drawer_.classList.contains(this.CssClasses_.ON_LARGE_SCREEN)
                      ? r.classList.add(this.CssClasses_.ON_LARGE_SCREEN)
                      : this.drawer_.classList.contains(this.CssClasses_.ON_SMALL_SCREEN) && r.classList.add(this.CssClasses_.ON_SMALL_SCREEN),
                      r.addEventListener("click", this.drawerToggleHandler_.bind(this)),
                      r.addEventListener("keydown", this.drawerToggleHandler_.bind(this)),
                      this.element_.classList.add(this.CssClasses_.HAS_DRAWER),
                      this.element_.classList.contains(this.CssClasses_.FIXED_HEADER) ? this.header_.insertBefore(r, this.header_.firstChild) : this.element_.insertBefore(r, this.content_);
                  var d = document.createElement("div");
                  d.classList.add(this.CssClasses_.OBFUSCATOR),
                      this.element_.appendChild(d),
                      d.addEventListener("click", this.drawerToggleHandler_.bind(this)),
                      (this.obfuscator_ = d),
                      this.drawer_.addEventListener("keydown", this.keyboardEventHandler_.bind(this)),
                      this.drawer_.setAttribute("aria-hidden", "true");
              }
              if (((this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH)), this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)), this.screenSizeHandler_(), this.header_ && this.tabBar_)) {
                  this.element_.classList.add(this.CssClasses_.HAS_TABS);
                  var h = document.createElement("div");
                  h.classList.add(this.CssClasses_.TAB_CONTAINER), this.header_.insertBefore(h, this.tabBar_), this.header_.removeChild(this.tabBar_);
                  var c = document.createElement("div");
                  c.classList.add(this.CssClasses_.TAB_BAR_BUTTON), c.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
                  var p = document.createElement("i");
                  p.classList.add(this.CssClasses_.ICON),
                      (p.textContent = this.Constant_.CHEVRON_LEFT),
                      c.appendChild(p),
                      c.addEventListener(
                          "click",
                          function () {
                              this.tabBar_.scrollLeft -= this.Constant_.TAB_SCROLL_PIXELS;
                          }.bind(this)
                      );
                  var C = document.createElement("div");
                  C.classList.add(this.CssClasses_.TAB_BAR_BUTTON), C.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
                  var u = document.createElement("i");
                  u.classList.add(this.CssClasses_.ICON),
                      (u.textContent = this.Constant_.CHEVRON_RIGHT),
                      C.appendChild(u),
                      C.addEventListener(
                          "click",
                          function () {
                              this.tabBar_.scrollLeft += this.Constant_.TAB_SCROLL_PIXELS;
                          }.bind(this)
                      ),
                      h.appendChild(c),
                      h.appendChild(this.tabBar_),
                      h.appendChild(C);
                  var E = function () {
                      this.tabBar_.scrollLeft > 0 ? c.classList.add(this.CssClasses_.IS_ACTIVE) : c.classList.remove(this.CssClasses_.IS_ACTIVE),
                          this.tabBar_.scrollLeft < this.tabBar_.scrollWidth - this.tabBar_.offsetWidth ? C.classList.add(this.CssClasses_.IS_ACTIVE) : C.classList.remove(this.CssClasses_.IS_ACTIVE);
                  }.bind(this);
                  this.tabBar_.addEventListener("scroll", E), E();
                  var m = function () {
                      this.resizeTimeoutId_ && clearTimeout(this.resizeTimeoutId_),
                          (this.resizeTimeoutId_ = setTimeout(
                              function () {
                                  E(), (this.resizeTimeoutId_ = null);
                              }.bind(this),
                              this.Constant_.RESIZE_TIMEOUT
                          ));
                  }.bind(this);
                  window.addEventListener("resize", m), this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT) && this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
                  for (var L = this.tabBar_.querySelectorAll("." + this.CssClasses_.TAB), I = this.content_.querySelectorAll("." + this.CssClasses_.PANEL), f = 0; f < L.length; f++) new t(L[f], L, I, this);
              }
              this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
          }
      }),
      (window.MaterialLayoutTab = t),
      s.register({ constructor: f, classAsString: "MaterialLayout", cssClass: "material-js-layout" });
})();
//# sourceMappingURL=material.min.css.js.map

