/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * virrvarr version 0.1.58
 * An awesome network graph 
 * https://github.com/OrteliusAB/virrvarr
 * Copyright (c) 2025 Ortelius AB
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */

(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Virrvarr = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var noop = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  // Given something array like (or null), returns something that is strictly an
  // array. This is used to ensure that array-like objects passed to d3.selectAll
  // or selection.selectAll are converted into proper arrays when creating a
  // selection; we don’t ever want to create a selection backed by a live
  // HTMLCollection or NodeList. However, note that selection.selectAll will use a
  // static NodeList as a group, since it safely derived from querySelectorAll.
  function array$1(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      return array$1(select.apply(this, arguments));
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find$1 = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find$1.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return Array.from(this.children);
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$5(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$5(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  // Given some data, this returns an array-like view of it: an object that
  // exposes a length property and allows numeric indexing. Note that unlike
  // selectAll, this isn’t worried about “live” collections because the resulting
  // array will only be used briefly while data is being bound. (It is possible to
  // cause the data to change while iterating by using a key function, but please
  // don’t; we’d rather avoid a gratuitous copy.)
  function arraylike(data) {
    return typeof data === "object" && "length" in data
      ? data // Array, TypedArray, NodeList, array-like
      : Array.from(data); // Map, Set, iterable, string, or anything else
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter) enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update) update = update.selection();
    }
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(context) {
    var selection = context.selection ? context.selection() : context;

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
  }

  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  function selectAll(selector) {
    return typeof selector === "string"
        ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
        : new Selection$1([array$1(selector)], root);
  }

  // These are typically used in conjunction with noevent to ensure that we can
  // preventDefault on the event.
  const nonpassive = {passive: false};
  const nonpassivecapture = {capture: true, passive: false};

  function nopropagation$1(event) {
    event.stopImmediatePropagation();
  }

  function noevent$1(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent$1, nonpassivecapture);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent$1, nonpassivecapture);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  var constant$4 = x => () => x;

  function DragEvent(type, {
    sourceEvent,
    subject,
    target,
    identifier,
    active,
    x, y, dx, dy,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      subject: {value: subject, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      identifier: {value: identifier, enumerable: true, configurable: true},
      active: {value: active, enumerable: true, configurable: true},
      x: {value: x, enumerable: true, configurable: true},
      y: {value: y, enumerable: true, configurable: true},
      dx: {value: dx, enumerable: true, configurable: true},
      dy: {value: dy, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  // Ignore right-click, since that should open the context menu.
  function defaultFilter$1(event) {
    return !event.ctrlKey && !event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(event, d) {
    return d == null ? {x: event.x, y: event.y} : d;
  }

  function defaultTouchable$1() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function drag() {
    var filter = defaultFilter$1,
        container = defaultContainer,
        subject = defaultSubject,
        touchable = defaultTouchable$1,
        gestures = {},
        listeners = dispatch("start", "drag", "end"),
        active = 0,
        mousedownx,
        mousedowny,
        mousemoving,
        touchending,
        clickDistance2 = 0;

    function drag(selection) {
      selection
          .on("mousedown.drag", mousedowned)
        .filter(touchable)
          .on("touchstart.drag", touchstarted)
          .on("touchmove.drag", touchmoved, nonpassive)
          .on("touchend.drag touchcancel.drag", touchended)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned(event, d) {
      if (touchending || !filter.call(this, event, d)) return;
      var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
      if (!gesture) return;
      select(event.view)
        .on("mousemove.drag", mousemoved, nonpassivecapture)
        .on("mouseup.drag", mouseupped, nonpassivecapture);
      dragDisable(event.view);
      nopropagation$1(event);
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start", event);
    }

    function mousemoved(event) {
      noevent$1(event);
      if (!mousemoving) {
        var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag", event);
    }

    function mouseupped(event) {
      select(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent$1(event);
      gestures.mouse("end", event);
    }

    function touchstarted(event, d) {
      if (!filter.call(this, event, d)) return;
      var touches = event.changedTouches,
          c = container.call(this, event, d),
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
          nopropagation$1(event);
          gesture("start", event, touches[i]);
        }
      }
    }

    function touchmoved(event) {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          noevent$1(event);
          gesture("drag", event, touches[i]);
        }
      }
    }

    function touchended(event) {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          nopropagation$1(event);
          gesture("end", event, touches[i]);
        }
      }
    }

    function beforestart(that, container, event, d, identifier, touch) {
      var dispatch = listeners.copy(),
          p = pointer(touch || event, container), dx, dy,
          s;

      if ((s = subject.call(that, new DragEvent("beforestart", {
          sourceEvent: event,
          target: drag,
          identifier,
          active,
          x: p[0],
          y: p[1],
          dx: 0,
          dy: 0,
          dispatch
        }), d)) == null) return;

      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;

      return function gesture(type, event, touch) {
        var p0 = p, n;
        switch (type) {
          case "start": gestures[identifier] = gesture, n = active++; break;
          case "end": delete gestures[identifier], --active; // falls through
          case "drag": p = pointer(touch || event, container), n = active; break;
        }
        dispatch.call(
          type,
          that,
          new DragEvent(type, {
            sourceEvent: event,
            subject: s,
            target: drag,
            identifier,
            active: n,
            x: p[0] + dx,
            y: p[1] + dy,
            dx: p[0] - p0[0],
            dy: p[1] - p0[1],
            dispatch
          }),
          d
        );
      };
    }

    drag.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$4(!!_), drag) : filter;
    };

    drag.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant$4(_), drag) : container;
    };

    drag.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant$4(_), drag) : subject;
    };

    drag.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$4(!!_), drag) : touchable;
    };

    drag.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag : value;
    };

    drag.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
    };

    return drag;
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
      reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
      reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
      reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
      reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
      reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHex8() {
    return this.rgb().formatHex8();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }

  function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
  }

  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }

  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }

  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
  }));

  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }

  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant$3 = x => () => x;

  function linear$1(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant$3(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear$1(a, d) : constant$3(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  var degrees = 180 / Math.PI;

  var identity$1 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity$1;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var epsilon2 = 1e-12;

  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
          ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
          dx = ux1 - ux0,
          dy = uy1 - uy0,
          d2 = dx * dx + dy * dy,
          i,
          S;

      // Special case for u0 ≅ u1.
      if (d2 < epsilon2) {
        S = Math.log(w1 / w0) / rho;
        i = function(t) {
          return [
            ux0 + t * dx,
            uy0 + t * dy,
            w0 * Math.exp(rho * t * S)
          ];
        };
      }

      // General case.
      else {
        var d1 = Math.sqrt(d2),
            b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
            b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
            r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
            r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / rho;
        i = function(t) {
          var s = t * S,
              coshr0 = cosh(r0),
              u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
          return [
            ux0 + u * dx,
            uy0 + u * dy,
            w0 * coshr0 / cosh(rho * s + r0)
          ];
        };
      }

      i.duration = S * 1000 * rho / Math.SQRT2;

      return i;
    }

    zoom.rho = function(_) {
      var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
      return zoomRho(_1, _2, _4);
    };

    return zoom;
  })(Math.SQRT2, 2, 4);

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  const linear = t => +t;

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var b1 = 4 / 11,
      b2 = 6 / 11,
      b3 = 8 / 11,
      b4 = 3 / 4,
      b5 = 9 / 11,
      b6 = 10 / 11,
      b7 = 15 / 16,
      b8 = 21 / 22,
      b9 = 63 / 64,
      b0 = 1 / b1 / b1;

  function bounceOut(t) {
    return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  const pi = Math.PI,
      tau = 2 * pi,
      epsilon = 1e-6,
      tauEpsilon = tau - epsilon;

  function append(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += arguments[i] + strings[i];
    }
  }

  function appendRound(digits) {
    let d = Math.floor(digits);
    if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
    if (d > 15) return append;
    const k = 10 ** d;
    return function(strings) {
      this._ += strings[0];
      for (let i = 1, n = strings.length; i < n; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }

  class Path {
    constructor(digits) {
      this._x0 = this._y0 = // start of current subpath
      this._x1 = this._y1 = null; // end of current subpath
      this._ = "";
      this._append = digits == null ? append : appendRound(digits);
    }
    moveTo(x, y) {
      this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
    }
    closePath() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._append`Z`;
      }
    }
    lineTo(x, y) {
      this._append`L${this._x1 = +x},${this._y1 = +y}`;
    }
    quadraticCurveTo(x1, y1, x, y) {
      this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
    }
    bezierCurveTo(x1, y1, x2, y2, x, y) {
      this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
    }
    arcTo(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

      // Is the radius negative? Error.
      if (r < 0) throw new Error(`negative radius: ${r}`);

      let x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._append`M${this._x1 = x1},${this._y1 = y1}`;
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
        this._append`L${this._x1 = x1},${this._y1 = y1}`;
      }

      // Otherwise, draw an arc!
      else {
        let x20 = x2 - x0,
            y20 = y2 - y0,
            l21_2 = x21 * x21 + y21 * y21,
            l20_2 = x20 * x20 + y20 * y20,
            l21 = Math.sqrt(l21_2),
            l01 = Math.sqrt(l01_2),
            l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
            t01 = l / l01,
            t21 = l / l21;

        // If the start tangent is not coincident with (x0,y0), line to.
        if (Math.abs(t01 - 1) > epsilon) {
          this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
        }

        this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
      }
    }
    arc(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;

      // Is the radius negative? Error.
      if (r < 0) throw new Error(`negative radius: ${r}`);

      let dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._append`M${x0},${y0}`;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
        this._append`L${x0},${y0}`;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau + tau;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon) {
        this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
      }
    }
    rect(x, y, w, h) {
      this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
    }
    toString() {
      return this._;
    }
  }

  function center(x, y) {
    var nodes, strength = 1;

    if (x == null) x = 0;
    if (y == null) y = 0;

    function force() {
      var i,
          n = nodes.length,
          node,
          sx = 0,
          sy = 0;

      for (i = 0; i < n; ++i) {
        node = nodes[i], sx += node.x, sy += node.y;
      }

      for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) {
        node = nodes[i], node.x -= sx, node.y -= sy;
      }
    }

    force.initialize = function(_) {
      nodes = _;
    };

    force.x = function(_) {
      return arguments.length ? (x = +_, force) : x;
    };

    force.y = function(_) {
      return arguments.length ? (y = +_, force) : y;
    };

    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };

    return force;
  }

  function tree_add(d) {
    const x = +this._x.call(null, d),
        y = +this._y.call(null, d);
    return add(this.cover(x, y), x, y, d);
  }

  function add(tree, x, y, d) {
    if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

    var parent,
        node = tree._root,
        leaf = {data: d},
        x0 = tree._x0,
        y0 = tree._y0,
        x1 = tree._x1,
        y1 = tree._y1,
        xm,
        ym,
        xp,
        yp,
        right,
        bottom,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return tree._root = leaf, tree;

    // Find the existing leaf for the new point, or add it.
    while (node.length) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
    }

    // Is the new point is exactly coincident with the existing point?
    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

    // Otherwise, split the leaf node until the old and new point are separated.
    do {
      parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
    return parent[j] = node, parent[i] = leaf, tree;
  }

  function addAll(data) {
    var d, i, n = data.length,
        x,
        y,
        xz = new Array(n),
        yz = new Array(n),
        x0 = Infinity,
        y0 = Infinity,
        x1 = -Infinity,
        y1 = -Infinity;

    // Compute the points and their extent.
    for (i = 0; i < n; ++i) {
      if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
      xz[i] = x;
      yz[i] = y;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }

    // If there were no (valid) points, abort.
    if (x0 > x1 || y0 > y1) return this;

    // Expand the tree to cover the new points.
    this.cover(x0, y0).cover(x1, y1);

    // Add the new points.
    for (i = 0; i < n; ++i) {
      add(this, xz[i], yz[i], data[i]);
    }

    return this;
  }

  function tree_cover(x, y) {
    if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

    var x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1;

    // If the quadtree has no extent, initialize them.
    // Integer extent are necessary so that if we later double the extent,
    // the existing quadrant boundaries don’t change due to floating point error!
    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x)) + 1;
      y1 = (y0 = Math.floor(y)) + 1;
    }

    // Otherwise, double repeatedly to cover.
    else {
      var z = x1 - x0 || 1,
          node = this._root,
          parent,
          i;

      while (x0 > x || x >= x1 || y0 > y || y >= y1) {
        i = (y < y0) << 1 | (x < x0);
        parent = new Array(4), parent[i] = node, node = parent, z *= 2;
        switch (i) {
          case 0: x1 = x0 + z, y1 = y0 + z; break;
          case 1: x0 = x1 - z, y1 = y0 + z; break;
          case 2: x1 = x0 + z, y0 = y1 - z; break;
          case 3: x0 = x1 - z, y0 = y1 - z; break;
        }
      }

      if (this._root && this._root.length) this._root = node;
    }

    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    return this;
  }

  function tree_data() {
    var data = [];
    this.visit(function(node) {
      if (!node.length) do data.push(node.data); while (node = node.next)
    });
    return data;
  }

  function tree_extent(_) {
    return arguments.length
        ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
        : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
  }

  function Quad(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  function tree_find(x, y, radius) {
    var data,
        x0 = this._x0,
        y0 = this._y0,
        x1,
        y1,
        x2,
        y2,
        x3 = this._x1,
        y3 = this._y1,
        quads = [],
        node = this._root,
        q,
        i;

    if (node) quads.push(new Quad(node, x0, y0, x3, y3));
    if (radius == null) radius = Infinity;
    else {
      x0 = x - radius, y0 = y - radius;
      x3 = x + radius, y3 = y + radius;
      radius *= radius;
    }

    while (q = quads.pop()) {

      // Stop searching if this quadrant can’t contain a closer node.
      if (!(node = q.node)
          || (x1 = q.x0) > x3
          || (y1 = q.y0) > y3
          || (x2 = q.x1) < x0
          || (y2 = q.y1) < y0) continue;

      // Bisect the current quadrant.
      if (node.length) {
        var xm = (x1 + x2) / 2,
            ym = (y1 + y2) / 2;

        quads.push(
          new Quad(node[3], xm, ym, x2, y2),
          new Quad(node[2], x1, ym, xm, y2),
          new Quad(node[1], xm, y1, x2, ym),
          new Quad(node[0], x1, y1, xm, ym)
        );

        // Visit the closest quadrant first.
        if (i = (y >= ym) << 1 | (x >= xm)) {
          q = quads[quads.length - 1];
          quads[quads.length - 1] = quads[quads.length - 1 - i];
          quads[quads.length - 1 - i] = q;
        }
      }

      // Visit this point. (Visiting coincident points isn’t necessary!)
      else {
        var dx = x - +this._x.call(null, node.data),
            dy = y - +this._y.call(null, node.data),
            d2 = dx * dx + dy * dy;
        if (d2 < radius) {
          var d = Math.sqrt(radius = d2);
          x0 = x - d, y0 = y - d;
          x3 = x + d, y3 = y + d;
          data = node.data;
        }
      }
    }

    return data;
  }

  function tree_remove(d) {
    if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

    var parent,
        node = this._root,
        retainer,
        previous,
        next,
        x0 = this._x0,
        y0 = this._y0,
        x1 = this._x1,
        y1 = this._y1,
        x,
        y,
        xm,
        ym,
        right,
        bottom,
        i,
        j;

    // If the tree is empty, initialize the root as a leaf.
    if (!node) return this;

    // Find the leaf node for the point.
    // While descending, also retain the deepest parent with a non-removed sibling.
    if (node.length) while (true) {
      if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
      if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
      if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
      if (!node.length) break;
      if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
    }

    // Find the point to remove.
    while (node.data !== d) if (!(previous = node, node = node.next)) return this;
    if (next = node.next) delete node.next;

    // If there are multiple coincident points, remove just the point.
    if (previous) return (next ? previous.next = next : delete previous.next), this;

    // If this is the root point, remove it.
    if (!parent) return this._root = next, this;

    // Remove this leaf.
    next ? parent[i] = next : delete parent[i];

    // If the parent now contains exactly one leaf, collapse superfluous parents.
    if ((node = parent[0] || parent[1] || parent[2] || parent[3])
        && node === (parent[3] || parent[2] || parent[1] || parent[0])
        && !node.length) {
      if (retainer) retainer[j] = node;
      else this._root = node;
    }

    return this;
  }

  function removeAll(data) {
    for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
    return this;
  }

  function tree_root() {
    return this._root;
  }

  function tree_size() {
    var size = 0;
    this.visit(function(node) {
      if (!node.length) do ++size; while (node = node.next)
    });
    return size;
  }

  function tree_visit(callback) {
    var quads = [], q, node = this._root, child, x0, y0, x1, y1;
    if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
        var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      }
    }
    return this;
  }

  function tree_visitAfter(callback) {
    var quads = [], next = [], q;
    if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      var node = q.node;
      if (node.length) {
        var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
        if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
        if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
        if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      }
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.x1, q.y1);
    }
    return this;
  }

  function defaultX(d) {
    return d[0];
  }

  function tree_x(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  function defaultY(d) {
    return d[1];
  }

  function tree_y(_) {
    return arguments.length ? (this._y = _, this) : this._y;
  }

  function quadtree(nodes, x, y) {
    var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }

  function Quadtree(x, y, x0, y0, x1, y1) {
    this._x = x;
    this._y = y;
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = undefined;
  }

  function leaf_copy(leaf) {
    var copy = {data: leaf.data}, next = copy;
    while (leaf = leaf.next) next = next.next = {data: leaf.data};
    return copy;
  }

  var treeProto = quadtree.prototype = Quadtree.prototype;

  treeProto.copy = function() {
    var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
        node = this._root,
        nodes,
        child;

    if (!node) return copy;

    if (!node.length) return copy._root = leaf_copy(node), copy;

    nodes = [{source: node, target: copy._root = new Array(4)}];
    while (node = nodes.pop()) {
      for (var i = 0; i < 4; ++i) {
        if (child = node.source[i]) {
          if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
          else node.target[i] = leaf_copy(child);
        }
      }
    }

    return copy;
  };

  treeProto.add = tree_add;
  treeProto.addAll = addAll;
  treeProto.cover = tree_cover;
  treeProto.data = tree_data;
  treeProto.extent = tree_extent;
  treeProto.find = tree_find;
  treeProto.remove = tree_remove;
  treeProto.removeAll = removeAll;
  treeProto.root = tree_root;
  treeProto.size = tree_size;
  treeProto.visit = tree_visit;
  treeProto.visitAfter = tree_visitAfter;
  treeProto.x = tree_x;
  treeProto.y = tree_y;

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function jiggle(random) {
    return (random() - 0.5) * 1e-6;
  }

  function x$3(d) {
    return d.x + d.vx;
  }

  function y$3(d) {
    return d.y + d.vy;
  }

  function collide(radius) {
    var nodes,
        radii,
        random,
        strength = 1,
        iterations = 1;

    if (typeof radius !== "function") radius = constant$2(radius == null ? 1 : +radius);

    function force() {
      var i, n = nodes.length,
          tree,
          node,
          xi,
          yi,
          ri,
          ri2;

      for (var k = 0; k < iterations; ++k) {
        tree = quadtree(nodes, x$3, y$3).visitAfter(prepare);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          ri = radii[node.index], ri2 = ri * ri;
          xi = node.x + node.vx;
          yi = node.y + node.vy;
          tree.visit(apply);
        }
      }

      function apply(quad, x0, y0, x1, y1) {
        var data = quad.data, rj = quad.r, r = ri + rj;
        if (data) {
          if (data.index > node.index) {
            var x = xi - data.x - data.vx,
                y = yi - data.y - data.vy,
                l = x * x + y * y;
            if (l < r * r) {
              if (x === 0) x = jiggle(random), l += x * x;
              if (y === 0) y = jiggle(random), l += y * y;
              l = (r - (l = Math.sqrt(l))) / l * strength;
              node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
              node.vy += (y *= l) * r;
              data.vx -= x * (r = 1 - r);
              data.vy -= y * r;
            }
          }
          return;
        }
        return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
      }
    }

    function prepare(quad) {
      if (quad.data) return quad.r = radii[quad.data.index];
      for (var i = quad.r = 0; i < 4; ++i) {
        if (quad[i] && quad[i].r > quad.r) {
          quad.r = quad[i].r;
        }
      }
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length, node;
      radii = new Array(n);
      for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
    }

    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };

    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };

    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };

    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant$2(+_), initialize(), force) : radius;
    };

    return force;
  }

  function index(d) {
    return d.index;
  }

  function find(nodeById, nodeId) {
    var node = nodeById.get(nodeId);
    if (!node) throw new Error("node not found: " + nodeId);
    return node;
  }

  function link(links) {
    var id = index,
        strength = defaultStrength,
        strengths,
        distance = constant$2(30),
        distances,
        nodes,
        count,
        bias,
        random,
        iterations = 1;

    if (links == null) links = [];

    function defaultStrength(link) {
      return 1 / Math.min(count[link.source.index], count[link.target.index]);
    }

    function force(alpha) {
      for (var k = 0, n = links.length; k < iterations; ++k) {
        for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
          link = links[i], source = link.source, target = link.target;
          x = target.x + target.vx - source.x - source.vx || jiggle(random);
          y = target.y + target.vy - source.y - source.vy || jiggle(random);
          l = Math.sqrt(x * x + y * y);
          l = (l - distances[i]) / l * alpha * strengths[i];
          x *= l, y *= l;
          target.vx -= x * (b = bias[i]);
          target.vy -= y * b;
          source.vx += x * (b = 1 - b);
          source.vy += y * b;
        }
      }
    }

    function initialize() {
      if (!nodes) return;

      var i,
          n = nodes.length,
          m = links.length,
          nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
          link;

      for (i = 0, count = new Array(n); i < m; ++i) {
        link = links[i], link.index = i;
        if (typeof link.source !== "object") link.source = find(nodeById, link.source);
        if (typeof link.target !== "object") link.target = find(nodeById, link.target);
        count[link.source.index] = (count[link.source.index] || 0) + 1;
        count[link.target.index] = (count[link.target.index] || 0) + 1;
      }

      for (i = 0, bias = new Array(m); i < m; ++i) {
        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
      }

      strengths = new Array(m), initializeStrength();
      distances = new Array(m), initializeDistance();
    }

    function initializeStrength() {
      if (!nodes) return;

      for (var i = 0, n = links.length; i < n; ++i) {
        strengths[i] = +strength(links[i], i, links);
      }
    }

    function initializeDistance() {
      if (!nodes) return;

      for (var i = 0, n = links.length; i < n; ++i) {
        distances[i] = +distance(links[i], i, links);
      }
    }

    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };

    force.links = function(_) {
      return arguments.length ? (links = _, initialize(), force) : links;
    };

    force.id = function(_) {
      return arguments.length ? (id = _, force) : id;
    };

    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$2(+_), initializeStrength(), force) : strength;
    };

    force.distance = function(_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant$2(+_), initializeDistance(), force) : distance;
    };

    return force;
  }

  // https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
  const a = 1664525;
  const c = 1013904223;
  const m = 4294967296; // 2^32

  function lcg() {
    let s = 1;
    return () => (s = (a * s + c) % m) / m;
  }

  function x$2(d) {
    return d.x;
  }

  function y$2(d) {
    return d.y;
  }

  var initialRadius = 10,
      initialAngle = Math.PI * (3 - Math.sqrt(5));

  function simulation(nodes) {
    var simulation,
        alpha = 1,
        alphaMin = 0.001,
        alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
        alphaTarget = 0,
        velocityDecay = 0.6,
        forces = new Map(),
        stepper = timer(step),
        event = dispatch("tick", "end"),
        random = lcg();

    if (nodes == null) nodes = [];

    function step() {
      tick();
      event.call("tick", simulation);
      if (alpha < alphaMin) {
        stepper.stop();
        event.call("end", simulation);
      }
    }

    function tick(iterations) {
      var i, n = nodes.length, node;

      if (iterations === undefined) iterations = 1;

      for (var k = 0; k < iterations; ++k) {
        alpha += (alphaTarget - alpha) * alphaDecay;

        forces.forEach(function(force) {
          force(alpha);
        });

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          if (node.fx == null) node.x += node.vx *= velocityDecay;
          else node.x = node.fx, node.vx = 0;
          if (node.fy == null) node.y += node.vy *= velocityDecay;
          else node.y = node.fy, node.vy = 0;
        }
      }

      return simulation;
    }

    function initializeNodes() {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.index = i;
        if (node.fx != null) node.x = node.fx;
        if (node.fy != null) node.y = node.fy;
        if (isNaN(node.x) || isNaN(node.y)) {
          var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }
        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
      }
    }

    function initializeForce(force) {
      if (force.initialize) force.initialize(nodes, random);
      return force;
    }

    initializeNodes();

    return simulation = {
      tick: tick,

      restart: function() {
        return stepper.restart(step), simulation;
      },

      stop: function() {
        return stepper.stop(), simulation;
      },

      nodes: function(_) {
        return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
      },

      alpha: function(_) {
        return arguments.length ? (alpha = +_, simulation) : alpha;
      },

      alphaMin: function(_) {
        return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
      },

      alphaDecay: function(_) {
        return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
      },

      alphaTarget: function(_) {
        return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
      },

      velocityDecay: function(_) {
        return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
      },

      randomSource: function(_) {
        return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
      },

      force: function(name, _) {
        return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
      },

      find: function(x, y, radius) {
        var i = 0,
            n = nodes.length,
            dx,
            dy,
            d2,
            node,
            closest;

        if (radius == null) radius = Infinity;
        else radius *= radius;

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dx = x - node.x;
          dy = y - node.y;
          d2 = dx * dx + dy * dy;
          if (d2 < radius) closest = node, radius = d2;
        }

        return closest;
      },

      on: function(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  function manyBody() {
    var nodes,
        node,
        random,
        alpha,
        strength = constant$2(-30),
        strengths,
        distanceMin2 = 1,
        distanceMax2 = Infinity,
        theta2 = 0.81;

    function force(_) {
      var i, n = nodes.length, tree = quadtree(nodes, x$2, y$2).visitAfter(accumulate);
      for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length, node;
      strengths = new Array(n);
      for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
    }

    function accumulate(quad) {
      var strength = 0, q, c, weight = 0, x, y, i;

      // For internal nodes, accumulate forces from child quadrants.
      if (quad.length) {
        for (x = y = i = 0; i < 4; ++i) {
          if ((q = quad[i]) && (c = Math.abs(q.value))) {
            strength += q.value, weight += c, x += c * q.x, y += c * q.y;
          }
        }
        quad.x = x / weight;
        quad.y = y / weight;
      }

      // For leaf nodes, accumulate forces from coincident quadrants.
      else {
        q = quad;
        q.x = q.data.x;
        q.y = q.data.y;
        do strength += strengths[q.data.index];
        while (q = q.next);
      }

      quad.value = strength;
    }

    function apply(quad, x1, _, x2) {
      if (!quad.value) return true;

      var x = quad.x - node.x,
          y = quad.y - node.y,
          w = x2 - x1,
          l = x * x + y * y;

      // Apply the Barnes-Hut approximation if possible.
      // Limit forces for very close nodes; randomize direction if coincident.
      if (w * w / theta2 < l) {
        if (l < distanceMax2) {
          if (x === 0) x = jiggle(random), l += x * x;
          if (y === 0) y = jiggle(random), l += y * y;
          if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
          node.vx += x * quad.value * alpha / l;
          node.vy += y * quad.value * alpha / l;
        }
        return true;
      }

      // Otherwise, process points directly.
      else if (quad.length || l >= distanceMax2) return;

      // Limit forces for very close nodes; randomize direction if coincident.
      if (quad.data !== node || quad.next) {
        if (x === 0) x = jiggle(random), l += x * x;
        if (y === 0) y = jiggle(random), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
      }

      do if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x * w;
        node.vy += y * w;
      } while (quad = quad.next);
    }

    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$2(+_), initialize(), force) : strength;
    };

    force.distanceMin = function(_) {
      return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
    };

    force.distanceMax = function(_) {
      return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
    };

    force.theta = function(_) {
      return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
    };

    return force;
  }

  function x$1(x) {
    var strength = constant$2(0.1),
        nodes,
        strengths,
        xz;

    if (typeof x !== "function") x = constant$2(x == null ? 0 : +x);

    function force(alpha) {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
      }
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      xz = new Array(n);
      for (i = 0; i < n; ++i) {
        strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
      }
    }

    force.initialize = function(_) {
      nodes = _;
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$2(+_), initialize(), force) : strength;
    };

    force.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant$2(+_), initialize(), force) : x;
    };

    return force;
  }

  function y$1(y) {
    var strength = constant$2(0.1),
        nodes,
        strengths,
        yz;

    if (typeof y !== "function") y = constant$2(y == null ? 0 : +y);

    function force(alpha) {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
      }
    }

    function initialize() {
      if (!nodes) return;
      var i, n = nodes.length;
      strengths = new Array(n);
      yz = new Array(n);
      for (i = 0; i < n; ++i) {
        strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
      }
    }

    force.initialize = function(_) {
      nodes = _;
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$2(+_), initialize(), force) : strength;
    };

    force.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant$2(+_), initialize(), force) : y;
    };

    return force;
  }

  function constant$1(x) {
    return function constant() {
      return x;
    };
  }

  function withPath(shape) {
    let digits = 3;

    shape.digits = function(_) {
      if (!arguments.length) return digits;
      if (_ == null) {
        digits = null;
      } else {
        const d = Math.floor(_);
        if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
        digits = d;
      }
      return shape;
    };

    return () => new Path(digits);
  }

  function array(x) {
    return typeof x === "object" && "length" in x
      ? x // Array, TypedArray, NodeList, array-like
      : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function Linear(context) {
    this._context = context;
  }

  Linear.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._point = 0;
    },
    lineEnd: function() {
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; // falls through
        default: this._context.lineTo(x, y); break;
      }
    }
  };

  function curveLinear(context) {
    return new Linear(context);
  }

  function x(p) {
    return p[0];
  }

  function y(p) {
    return p[1];
  }

  function line(x$1, y$1) {
    var defined = constant$1(true),
        context = null,
        curve = curveLinear,
        output = null,
        path = withPath(line);

    x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant$1(x$1);
    y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant$1(y$1);

    function line(data) {
      var i,
          n = (data = array(data)).length,
          d,
          defined0 = false,
          buffer;

      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) output.lineStart();
          else output.lineEnd();
        }
        if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    line.x = function(_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$1(+_), line) : x$1;
    };

    line.y = function(_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$1(+_), line) : y$1;
    };

    line.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$1(!!_), line) : defined;
    };

    line.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
  }

  function point(that, x, y) {
    that._context.bezierCurveTo(
      that._x1 + that._k * (that._x2 - that._x0),
      that._y1 + that._k * (that._y2 - that._y0),
      that._x2 + that._k * (that._x1 - x),
      that._y2 + that._k * (that._y1 - y),
      that._x2,
      that._y2
    );
  }

  function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }

  Cardinal.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._x0 = this._x1 = this._x2 =
      this._y0 = this._y1 = this._y2 = NaN;
      this._point = 0;
    },
    lineEnd: function() {
      switch (this._point) {
        case 2: this._context.lineTo(this._x2, this._y2); break;
        case 3: point(this, this._x1, this._y1); break;
      }
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
        case 2: this._point = 3; // falls through
        default: point(this, x, y); break;
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };

  var cardinal = (function custom(tension) {

    function cardinal(context) {
      return new Cardinal(context, tension);
    }

    cardinal.tension = function(tension) {
      return custom(+tension);
    };

    return cardinal;
  })(0);

  var constant = x => () => x;

  function ZoomEvent(type, {
    sourceEvent,
    target,
    transform,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      transform: {value: transform, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  function Transform(k, x, y) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x, y) {
      return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x) {
      return x * this.k + this.x;
    },
    applyY: function(y) {
      return y * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x) {
      return (x - this.x) / this.k;
    },
    invertY: function(y) {
      return (y - this.y) / this.k;
    },
    rescaleX: function(x) {
      return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
    },
    rescaleY: function(y) {
      return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };

  var identity = new Transform(1, 0, 0);

  Transform.prototype;

  function nopropagation(event) {
    event.stopImmediatePropagation();
  }

  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
  function defaultFilter(event) {
    return (!event.ctrlKey || event.type === 'wheel') && !event.button;
  }

  function defaultExtent() {
    var e = this;
    if (e instanceof SVGElement) {
      e = e.ownerSVGElement || e;
      if (e.hasAttribute("viewBox")) {
        e = e.viewBox.baseVal;
        return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
      }
      return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
    }
    return [[0, 0], [e.clientWidth, e.clientHeight]];
  }

  function defaultTransform() {
    return this.__zoom || identity;
  }

  function defaultWheelDelta(event) {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function defaultConstrain(transform, extent, translateExtent) {
    var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
        dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
        dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
        dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
    return transform.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function zoom() {
    var filter = defaultFilter,
        extent = defaultExtent,
        constrain = defaultConstrain,
        wheelDelta = defaultWheelDelta,
        touchable = defaultTouchable,
        scaleExtent = [0, Infinity],
        translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
        duration = 250,
        interpolate = interpolateZoom,
        listeners = dispatch("start", "zoom", "end"),
        touchstarting,
        touchfirst,
        touchending,
        touchDelay = 500,
        wheelDelay = 150,
        clickDistance2 = 0,
        tapDistance = 10;

    function zoom(selection) {
      selection
          .property("__zoom", defaultTransform)
          .on("wheel.zoom", wheeled, {passive: false})
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
        .filter(touchable)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    zoom.transform = function(collection, transform, point, event) {
      var selection = collection.selection ? collection.selection() : collection;
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform, point, event);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
            .event(event)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k, p, event) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p, event);
    };

    zoom.scaleTo = function(selection, k, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t0 = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p, event);
    };

    zoom.translateBy = function(selection, x, y, event) {
      zoom.transform(selection, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      }, null, event);
    };

    zoom.translateTo = function(selection, x, y, p, event) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p, event);
    };

    function scale(transform, k) {
      k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
      return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
    }

    function translate(transform, p0, p1) {
      var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
      return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
    }

    function centroid(extent) {
      return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
    }

    function schedule(transition, transform, point, event) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
          .tween("zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args).event(event),
                e = extent.apply(that, args),
                p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                a = that.__zoom,
                b = typeof transform === "function" ? transform.apply(that, args) : transform,
                i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
            return function(t) {
              if (t === 1) t = b; // Avoid rounding error on end.
              else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
              g.zoom(null, t);
            };
          });
    }

    function gesture(that, args, clean) {
      return (!clean && that.__zooming) || new Gesture(that, args);
    }

    function Gesture(that, args) {
      this.that = that;
      this.args = args;
      this.active = 0;
      this.sourceEvent = null;
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }

    Gesture.prototype = {
      event: function(event) {
        if (event) this.sourceEvent = event;
        return this;
      },
      start: function() {
        if (++this.active === 1) {
          this.that.__zooming = this;
          this.emit("start");
        }
        return this;
      },
      zoom: function(key, transform) {
        if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
        if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
        if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
        this.that.__zoom = transform;
        this.emit("zoom");
        return this;
      },
      end: function() {
        if (--this.active === 0) {
          delete this.that.__zooming;
          this.emit("end");
        }
        return this;
      },
      emit: function(type) {
        var d = select(this.that).datum();
        listeners.call(
          type,
          this.that,
          new ZoomEvent(type, {
            sourceEvent: this.sourceEvent,
            target: zoom,
            type,
            transform: this.that.__zoom,
            dispatch: listeners
          }),
          d
        );
      }
    };

    function wheeled(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, args).event(event),
          t = this.__zoom,
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
          p = pointer(event);

      // If the mouse is in the same location as before, reuse it.
      // If there were recent wheel events, reset the wheel idle timeout.
      if (g.wheel) {
        if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
          g.mouse[1] = t.invert(g.mouse[0] = p);
        }
        clearTimeout(g.wheel);
      }

      // If this wheel event won’t trigger a transform change, ignore it.
      else if (t.k === k) return;

      // Otherwise, capture the mouse point and location at the start.
      else {
        g.mouse = [p, t.invert(p)];
        interrupt(this);
        g.start();
      }

      noevent(event);
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }

    function mousedowned(event, ...args) {
      if (touchending || !filter.apply(this, arguments)) return;
      var currentTarget = event.currentTarget,
          g = gesture(this, args, true).event(event),
          v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p = pointer(event, currentTarget),
          x0 = event.clientX,
          y0 = event.clientY;

      dragDisable(event.view);
      nopropagation(event);
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt(this);
      g.start();

      function mousemoved(event) {
        noevent(event);
        if (!g.moved) {
          var dx = event.clientX - x0, dy = event.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.event(event)
         .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
      }

      function mouseupped(event) {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event.view, g.moved);
        noevent(event);
        g.event(event).end();
      }
    }

    function dblclicked(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
          p1 = t0.invert(p0),
          k1 = t0.k * (event.shiftKey ? 0.5 : 2),
          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

      noevent(event);
      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
      else select(this).call(zoom.transform, t1, p0, event);
    }

    function touchstarted(event, ...args) {
      if (!filter.apply(this, arguments)) return;
      var touches = event.touches,
          n = touches.length,
          g = gesture(this, args, event.changedTouches.length === n).event(event),
          started, i, t, p;

      nopropagation(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
      }

      if (touchstarting) touchstarting = clearTimeout(touchstarting);

      if (started) {
        if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        interrupt(this);
        g.start();
      }
    }

    function touchmoved(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent(event);
      for (i = 0; i < n; ++i) {
        t = touches[i], p = pointer(t, this);
        if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
        else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
      }
      t = g.that.__zoom;
      if (g.touch1) {
        var p0 = g.touch0[0], l0 = g.touch0[1],
            p1 = g.touch1[0], l1 = g.touch1[1],
            dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
            dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
        t = scale(t, Math.sqrt(dp / dl));
        p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
        l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      }
      else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
      else return;

      g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
    }

    function touchended(event, ...args) {
      if (!this.__zooming) return;
      var g = gesture(this, args).event(event),
          touches = event.changedTouches,
          n = touches.length, i, t;

      nopropagation(event);
      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, touchDelay);
      for (i = 0; i < n; ++i) {
        t = touches[i];
        if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
        else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
      }
      if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
      if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
      else {
        g.end();
        // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
        if (g.taps === 2) {
          t = pointer(t, this);
          if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
            var p = select(this).on("dblclick.zoom");
            if (p) p.apply(this, arguments);
          }
        }
      }
    }

    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
    };

    zoom.scaleExtent = function(_) {
      return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
    };

    zoom.translateExtent = function(_) {
      return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
    };

    zoom.constrain = function(_) {
      return arguments.length ? (constrain = _, zoom) : constrain;
    };

    zoom.duration = function(_) {
      return arguments.length ? (duration = +_, zoom) : duration;
    };

    zoom.interpolate = function(_) {
      return arguments.length ? (interpolate = _, zoom) : interpolate;
    };

    zoom.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? zoom : value;
    };

    zoom.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
    };

    zoom.tapDistance = function(_) {
      return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
    };

    return zoom;
  }

  /**
   * Default configuration for Virrvarr
   */
  var Env = Object.freeze({
    //Params
    ENABLE_ZOOM_BUTTONS: false,
    ENABLE_GRID: false,
    ENABLE_SECONDARY_GRID: true,
    ENABLE_SCALE_GRID_ON_ZOOM: true,
    HIDE_DETAILS_ZOOM_SCALE: 0.2,
    DEFAULT_FADE_ON_HOVER: false,
    DEFAULT_USE_CONTEXT_MENU: true,
    SHOW_CONTEXT_MENU: true,
    DEFAULT_CUSTOM_CONTEXT_MENU: {},
    //Zoom
    ZOOM_PADDING: 40,
    //Edge Labels
    LABEL_HEIGHT: 28,
    LABEL_WIDTH: 80,
    EDGE_LABEL_PADDING: 20,
    FIXED_EDGE_LABEL_WIDTH: true,
    ROTATE_LABELS: false,
    //Multiplicity Positioning
    MULTIPLICITY_HDISTANCE: 20,
    MULTIPLICITY_VDISTANCE: 10,
    //Style Defaults
    DEFAULT_STROKE_WIDTH: 2,
    DEFAULT_FONT_FAMILY: "Helvetica, Arial, sans-serif",
    DEFAULT_FONT_SIZE: "12px",
    DEFAULT_FADE_OPACITY: 0.3,
    DEFAULT_FOCUS_COLOR: "#2A6D91",
    //Edges
    DEFAULT_EDGE_DOTTED_DASHARRAY: 3,
    DEFAULT_EDGE_DASHARRAY: 0,
    DEFAULT_EDGE_COLOR: "#000000",
    DEFAULT_ARROW_COLOR: "#000000",
    DEFAULT_MULTIPLICITY_FONT_SIZE: "10px",
    DEFAULT_EDGE_WIDTH: "2px",
    DEFAULT_LINE_TYPE: "line",
    DEFAULT_MARKER_SIZE: 12,
    //Labels
    DEFAULT_LABEL_TEXT_COLOR: "#000000",
    DEFAULT_LABEL_TEXT_HOVER_COLOR: "#ffffff",
    DEFAULT_LABEL_BACKGROUND_COLOR: "#ffffff",
    DEFAULT_LABEL_HOVER_BACKGROUND_COLOR: "#2A6D91",
    DEFAULT_LABEL_BORDER_RADIUS_X: "4px",
    DEFAULT_LABEL_BORDER_RADIUS_Y: "4px",
    DEFAULT_LABEL_BORDER_WIDTH: "0px",
    DEFAULT_LABEL_BORDER_COLOR: "transparent",
    //Nodes
    DEFAULT_NODE_DOTTED_DASHARRAY: 8,
    DEFAULT_NODE_STROKE_COLOR: "transparent",
    DEFAULT_NODE_STROKE_HOVER_COLOR: "transparent",
    DEFAULT_NODE_COLOR: "#ffffff",
    DEFAULT_NODE_HOVER_COLOR: "#2A6D91",
    DEFAULT_NODE_FOCUSED_COLOR: "#ffffff",
    DEFAULT_NODE_TEXT_COLOR: "#000000",
    DEFAULT_NODE_TEXT_HOVER_COLOR: "#ffffff",
    DEFAULT_NODE_TEXT_FOCUSED_COLOR: "#000000",
    DEFAULT_NODE_BORDER_RADIUS_X: "0px",
    DEFAULT_NODE_BORDER_RADIUS_Y: "0px",
    DEFAULT_NODE_FOCUSED_BORDER_WIDTH: "4px",
    DEFAULT_NODE_HOVER_BORDER_WIDTH: "2px",
    DEFAULT_RECTANGLE_MAX_HEIGHT: 20,
    DEFAULT_RECTANGLE_MAX_WIDTH: 60,
    DEFAULT_CIRCLE_NODE_RADIUS: 50,
    DEFAULT_NODE_ICON_SIZE: 16,
    DEFAULT_NODE_ICON_PADDING: 8,
    DEFAULT_NODE_TEXT_MULTILINE: true,
    DEFAULT_NODE_FILTER: false,
    DEFAULT_NODE_HOVER_FILTER: false,
    DEFAULT_NODE_FOCUSED_FILTER: false,
    NODE_BADGES_DEFAULT_DISPLAY: "block",
    //Cursor
    DEFAULT_NODE_CURSOR: "pointer",
    DEFAULT_EDGE_CURSOR: "pointer",
    DEFAULT_CANVAS_CURSOR: "auto",
    //Tooltip
    TOOLTIP_MIN_WIDTH: "80px",
    TOOLTIP_MAX_WIDTH: "150px",
    TOOLTIP_BACKGROUND: "black",
    TOOLTIP_COLOR: "white",
    TOOLTIP_BORDER_RADIUS: "2px",
    //Highlighting
    HIGHLIGHTING_BORDER_WIDTH: "0px",
    HIGHLIGHTING_BORDER_COLOR: "transparent",
    HIGHLIGHTING_COLOR: "#009ADE",
    //Selection Lasso
    SELECTION_LASSO_COLOR: "#00AE8D",
    SELECTION_LASSO_OPACITY: 0.2,
    SELECTION_LASSO_BORDER_WIDTH: 0,
    SELECTION_LASSO_BORDER_COLOR: "#00594E",
    //Onion Border
    ENABLE_ONION_ON_FOCUS: true,
    ENABLE_ONION_ON_HOVER: true,
    ENABLE_EDGE_ONION: false,
    DEFAULT_ONION_LAYERS: 2,
    DEFAULT_ONION_COLOR: "#B6D5DB",
    DEFAULT_ONION_SIZE: 10,
    DEFAULT_ONION_ANIMATION_TIME: 80,
    //Edge Length and Spacing
    DEFAULT_VISIBLE_EDGE_DISTANCE: 350,
    ADDITIONAL_TEXT_SPACE: 20,
    //Thresholds and timings
    DOUBLE_CLICK_THRESHOLD: 300,
    //ms
    FADE_TIME: 300,
    //ms
    ZOOM_TIME: 1000,
    //ms
    HIGHLIGHT_TIME: 1000,
    //ms
    HIGHLIGHT_TIME_REMOVE: 1000,
    //ms
    IMPLOSION_EXPLOSION_ANIMATION_TIME: 200,
    //ms

    //Force Layout
    EDGE_STRENGTH: 0.7,
    GRAVITY: 0.02,
    CHARGE: -2000,
    CHARGE_MAX_DISTANCE: Infinity,
    SCALE_EXTENT: [0.01, 5],
    INITIAL_SCALE: 0.3
  });

  /**
   * Calculates the width of a text string in pixels.
   * @param {string} textStyle - optional css class to apply to to the text
   */
  String.prototype.width = function (textStyle) {
    // Set a default value
    if (!textStyle) {
      textStyle = "text";
    }
    var d = select("body").append("div").attr("class", textStyle)
    //The font size defaults to 12px right now. This may need to be changed in the future.
    .attr("style", "font-size:12px; position: absolute;float: left;white-space: nowrap;visibility: hidden;").attr("id", "width-test") // tag this element to identify it
    .text(this);
    var w = document.getElementById("width-test").offsetWidth;
    d.remove();
    return w;
  };

  /**
   * Truncates a string to a given width.
   * @param {number} maxLength - maximum length in pixels
   * @param {string} textStyle - optional css class to apply to to the text
   */
  String.prototype.truncate = function (maxLength, textStyle) {
    maxLength -= Env.ADDITIONAL_TEXT_SPACE;
    if (isNaN(maxLength) || maxLength <= 0) {
      return this;
    }
    var text = this;
    var textLength = this.length;
    var textWidth;
    var ratio;
    while (true) {
      textWidth = text.width(textStyle);
      if (textWidth <= maxLength) {
        break;
      }
      ratio = textWidth / maxLength;
      textLength = Math.floor(textLength / ratio);
      text = text.substring(0, textLength);
    }
    if (this.length > textLength) {
      return this.substring(0, textLength - 3) + "...";
    }
    return this;
  };

  /**
   * All events in Virrvarr are stored here.
   */
  var EVENTS = Object.freeze({
    /* PUBLIC EVENTS */
    // Params: data (.id, .data, .direction (undefined/"to"/"from"))
    CLICK_ENTITY: "ENTITY_CLICKED_EVENT",
    // Params: data (.id, .data, .direction (undefined/"to"/"from"))
    DBL_CLICK_ENTITY: "ENTITY_DBL_CLICKED_EVENT",
    // Params: data (.id, .data, .eventType (enter/leave), .direction)
    HOVER_ENTITY: "ENTITY_HOVER_EVENT",
    // Params: data [(.id, .data, .type (node/edge), .direction)]
    SELECTION_UPDATED: "SELECTION_UPDATED_EVENT",
    /* PRIVATE EVENTS */
    // Params: entity, direction (undefined/"to"/"from")
    RIGHT_CLICK_ENTITY: "ENTITY_RIGHT_CLICKED_EVENT",
    // Params: node
    NODE_DRAG_START: "NODE_DRAG_STARTED_EVENT",
    // Params: node
    NODE_DRAG_DRAGGED: "NODE_DRAG_DRAGGED_EVENT",
    // Params: node
    NODE_DRAG_ENDED: "NODE_DRAG_ENDED_EVENT",
    // Params: node
    MOUSE_OVER_NODE: "MOUSE_MOVED_OVER_NODE_EVENT",
    // Params: N/A
    MOUSE_LEFT_NODE: "MOUSE_MOVED_OUTSIDE_NODE_EVENT",
    // Params: isEnabled
    NODE_PIN_MODE_TOGGLED: "NODE_PIN_MODE_TOGGLED_EVENT",
    // Params: isEnabled
    NODE_MULTI_SELECT_MODE_TOGGLED: "NODE_MULTI_SELECT_MODE_TOGGLED_EVENT",
    // Params: isEnabled
    NODE_MULTI_SELECT_DRAG_MODE_TOGGLED: "NODE_MULTI_SELECT_DRAG_MODE_TOGGLED_EVENT",
    // Params: isEnabled
    LASSO_MODE_TOGGLED: "LASSO_MODE_TOGGLED_EVENT",
    // Params: x, y, width, height
    LASSO_MOVED: "LASSO_MOVED_EVENT",
    // Params: N/A
    LASSO_ENTER: "LASSO_ENTER_EVENT",
    // Params: N/A
    LASSO_EXIT: "LASSO_EXIT_EVENT",
    // Params: N/A
    RELATIVE_POSITION_UPDATE_REQUESTED: "RELATIVE_POSITION_UPDATE_REQUESTED",
    // Params: N/A
    RELATIVE_POSITIONS_UPDATED: "RELATIVE_POSITION_UPDATE_REQUESTED",
    // Params: [...nodes], [...edges]
    DATA_UPDATE_REQUESTED: "DATA_UPDATE_REQUESTED_EVENT",
    // Params: style
    STYLE_UPDATE_REQUESTED: "STYLE_UPDATE_REQUESTED_EVENT",
    // Params: [...nodes], [...edges]
    DATASTORE_UPDATED: "LIVE_DATA_UPDATED_EVENT",
    // Params: [...nodes], [...edges]
    DOM_PROCESSOR_FINISHED: "DOM_PROCESSOR_FINISHED_EVENT",
    // Params: [...nodes], [...edges]
    ENGINE_UPDATE_FINISHED: "ENGINE_UPDATE_FINISHED_EVENT",
    // Params: filters ({node:[], edges:[]})
    DATA_FILTER_REQUESTED: "DATA_FILTER_REQUESTED_EVENT",
    // Params: N/A
    DATA_FILTER_RESET_REQUESTED: "DATA_FILTER_RESET_REQUESTED_EVENT",
    // Params [{isHidden: boolean, id: string}]
    NODE_HIDDEN_STATUS_UPDATE_REQUEST: "NODE_HIDDEN_STATUS_UPDATE_REQUEST",
    // Params: entityID, isImplode (true/false)
    IMPLODE_EXPLODE_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_REQUESTED_EVENT",
    // Params: entityID, isImplode (true/false)
    IMPLODE_EXPLODE_LEAFS_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_LEAFS_REQUESTED_EVENT",
    // Params: entityID, isImplode (true/false)
    IMPLODE_EXPLODE_RECURSIVE_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_RECURSIVE_REQUESTED_EVENT",
    // Params: entityID, isImplode (true/false)
    IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED: "IMPLODE_OR_EXPLODE_ENTITIES_NON_CIRCULAR_REQUESTED_EVENT",
    // Params: x, y, scale
    ZOOM_REQUESTED: "ZOOM_WAS_REQUESTED_EVENT",
    // Params: [...nodes]
    HIGHLIGHT_NODE_REQUESTED: "HIGHLIGHT_NODE_REQUESTED_EVENT",
    // Params: [...nodeIDs]
    DISABLE_NODES_REQUESTED: "DISABLE_NODES_REQUESTED_EVENT",
    // Params: N/A
    CLEAR_DISABLE_NODES_REQUESTED: "CLEAR_DISABLE_NODES_REQUESTED_EVENT",
    // Params N/A
    TOGGLE_MULTIPLICITY_REQUESTED: "TOGGLE_MULTIPLICITY_REQUEST_EVENT",
    // Params: N/A
    ENGINE_TICK: "ENGINE_TICK_EVENT",
    // Params: nodes, edges, attribute, filterFunction, sortFunction
    ENGINE_LAYOUT_REQUESTED: "ENGINE_LAYOUT_REQUESTED_EVENT",
    // Params: nodes, edges
    ENGINE_LAYOUT_RESET_REQUESTED: "ENGINE_LAYOUT_RESET_REQUESTED_EVENT",
    // Params: style, nodes, edges
    LOAD_STATE: "LOAD_STATE_EVENT",
    // Params: N/A
    GRAPH_HAS_MOUNTED: "GRAPH_HAS_MOUNTED_EVENT",
    // Params: N/A
    GRAPH_WILL_UNMOUNT: "GRAPH_WILL_UNMOUNT_EVENT" //All unmount listeners must be synchronous!!
  });

  /**
   * The entity processor has two purposes
   * It is used to prepare data on nodes and edges so that it does not have to be calculated on the fly.
   * It is also used to manipulate the data stored on the objects to achieve certain effects (such as fixating coordinates)
   */
  var EntityProcessor$1 = /*#__PURE__*/function () {
    function EntityProcessor(eventEmitter, styles, userDefinedOptions) {
      var _this = this;
      _classCallCheck(this, EntityProcessor);
      this.style = styles;
      this.fixedEdgeLabelWidth = userDefinedOptions.enableFixedEdgeLabelWidth !== undefined ? userDefinedOptions.enableFixedEdgeLabelWidth : Env.FIXED_EDGE_LABEL_WIDTH;
      this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : Env.LABEL_WIDTH;
      this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : Env.LABEL_WIDTH * 2;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.STYLE_UPDATE_REQUESTED, function (newStyles) {
        return _this.style = newStyles;
      });
    }

    /**
     * Executes the preprocessor for when data is about to go live
     * @param {object[]} nodes
     * @param {object[]} edges
     */
    _createClass(EntityProcessor, [{
      key: "executePreProcessor",
      value: function executePreProcessor(nodes, edges) {
        this.updateEdgeNodeIDs(edges, nodes);
        this.updateEdgeDistances(edges);
        this.updateEdgeLabelWidths(edges);
        this.updateEdgeCounters(edges);
        this.updateNodeParameters(nodes);
      }
      /**
       * Translates node IDs to index IDs on edge objects. This is essentially only to satisfy the D3 force layout.
       * @param {object[]} edges - Edges to be updated
       * @param {object[]} nodes - List of all nodes
       */
    }, {
      key: "updateEdgeNodeIDs",
      value: function updateEdgeNodeIDs(edges, nodes) {
        edges.forEach(function (edge) {
          //D3 uses the index of the node as source and target. Convert from the ID specified
          edge.source = nodes.findIndex(function (node) {
            return node.id === edge.sourceNode;
          });
          edge.target = nodes.findIndex(function (node) {
            return node.id === edge.targetNode;
          });
          if (edge.source === undefined || edge.target === undefined) {
            console.error("Broken Edge", edge);
          }
        });
      }
      /**
       * Updates the edge distances (lengths, essentially).
       * @param {object[]} edges - Edges to be updated
       */
    }, {
      key: "updateEdgeDistances",
      value: function updateEdgeDistances(edges) {
        var _this2 = this;
        edges.forEach(function (edge) {
          if (_this2.style && _this2.style.edges) {
            var style = _this2.style.edges.find(function (style) {
              return style.id === edge.type;
            });
            if (style && style.edgeDistance) {
              edge.edgeDistance = style.edgeDistance;
            } else {
              edge.edgeDistance = Env.DEFAULT_VISIBLE_EDGE_DISTANCE;
            }
          } else {
            edge.edgeDistance = Env.DEFAULT_VISIBLE_EDGE_DISTANCE;
          }
        });
      }
      /**
       * Updates the edge label width on a given array of edges.
       * @param {object[]} edges -
       */
    }, {
      key: "updateEdgeLabelWidths",
      value: function updateEdgeLabelWidths(edges) {
        var _this3 = this;
        edges.forEach(function (edge) {
          if (_this3.fixedEdgeLabelWidth) {
            edge.nameToWidth = _this3.edgeLabelWidth;
            edge.nameFromWidth = _this3.edgeLabelWidth;
          } else {
            if (edge.nameTo) {
              var width = edge.nameTo.width();
              width = width < _this3.maxEdgeLabelWidth ? width : _this3.maxEdgeLabelWidth;
              edge.nameToWidth = width + Env.EDGE_LABEL_PADDING;
            } else {
              edge.nameToWidth = _this3.edgeLabelWidth;
            }
            if (edge.nameFrom) {
              var _width = edge.nameTo.width();
              _width = _width < _this3.maxEdgeLabelWidth ? _width : _this3.maxEdgeLabelWidth;
              edge.nameFromWidth = _width + Env.EDGE_LABEL_PADDING;
            } else {
              edge.nameFromWidth = _this3.edgeLabelWidth;
            }
          }
        });
      }
      /**
       * Updates the edge counts for self-references and multi-references (to the same node).
       * @param {object[]} edges
       */
    }, {
      key: "updateEdgeCounters",
      value: function updateEdgeCounters(edges) {
        edges.forEach(function (edge) {
          //Multi edge counter
          var i = 0;
          var sameEdges = [];
          edges.forEach(function (otherEdge) {
            if (edge.source === otherEdge.source && edge.target === otherEdge.target || edge.target === otherEdge.source && edge.source === otherEdge.target) {
              sameEdges.push(otherEdge);
            }
          });
          for (i = 0; i < sameEdges.length; i++) {
            sameEdges[i].multiEdgeCount = sameEdges.length;
            sameEdges[i].multiEdgeIndex = i;
          }

          //Self edge counter
          var selfEdges = [];
          edges.forEach(function (otherEdge) {
            if (edge.source === otherEdge.source && edge.target === otherEdge.target) {
              selfEdges.push(otherEdge);
            }
          });
          for (i = 0; i < selfEdges.length; i++) {
            selfEdges[i].selfEdgeCount = selfEdges.length;
            selfEdges[i].selfEdgeIndex = i;
          }
        });
      }
      /**
       * Updates node parameters. This is for example in order to more easily access information such as radius, height, width, etc at runtime.
       * @param {object[]} nodes
       */
    }, {
      key: "updateNodeParameters",
      value: function updateNodeParameters(nodes) {
        var _this4 = this;
        nodes.forEach(function (node) {
          /* Init Radius and max text length values */
          if (_this4.style && _this4.style.nodes) {
            var style = _this4.style.nodes.find(function (style) {
              return style.id === node.type;
            });
            if (style) {
              switch (style.shape) {
                case "circle":
                case "layeredCircle":
                  node.radius = style.radius ? style.radius : Env.DEFAULT_CIRCLE_NODE_RADIUS;
                  node.maxTextWidth = 2 * node.radius;
                  node.shape = style.shape;
                  break;
                case "rectangle":
                  node.height = style.maxHeight ? style.maxHeight : Env.DEFAULT_RECTANGLE_MAX_HEIGHT;
                  node.width = style.maxWidth ? style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH;
                  node.maxTextWidth = style.maxWidth ? node.icon ? style.maxWidth - Env.DEFAULT_NODE_ICON_SIZE - Env.ADDITIONAL_TEXT_SPACE / 2 - Env.DEFAULT_NODE_ICON_PADDING : style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH;
                  node.shape = style.shape;
                  break;
                default:
                  //Use circle by default
                  node.radius = style.radius ? style.radius : Env.DEFAULT_CIRCLE_NODE_RADIUS;
                  node.maxTextWidth = 2 * node.radius;
                  node.shape = style.shape;
                  break;
              }
            } else {
              //Use 50r circle as default
              node.radius = Env.DEFAULT_CIRCLE_NODE_RADIUS;
              node.maxTextWidth = 2 * node.radius;
              node.shape = "circle";
            }
          } else {
            //Use 50r circle as default
            node.radius = Env.DEFAULT_CIRCLE_NODE_RADIUS;
            node.maxTextWidth = 2 * node.radius;
            node.shape = "circle";
          }
        });
      }
      /**
       * Animates all node positions from source to target
       * Nodes without a source/target will be frozen during the animation
       * @param {object[]} nodes - All nodes in the data store
       */
    }, {
      key: "animateNodePositions",
      value: function animateNodePositions(nodes) {
        return new Promise(function (resolve) {
          var tween = function tween(startTime, animationTime) {
            var deltaTime = Date.now() - startTime;
            if (deltaTime > animationTime) {
              nodes.forEach(function (node) {
                delete node.targetX;
                delete node.targetY;
                delete node.sourceX;
                delete node.sourceY;
                delete node.fx;
                delete node.fy;
                if (node.originalFx) {
                  node.fx = node.originalFx;
                  delete node.originalFx;
                }
                if (node.originalFy) {
                  node.fy = node.originalFy;
                  delete node.originalFy;
                }
              });
              resolve();
            } else {
              var percentOfAnimation = deltaTime / animationTime;
              nodes.filter(function (node) {
                return node.targetX && node.targetY;
              }).forEach(function (node) {
                node.fx = node.sourceX + (node.targetX - node.sourceX) * percentOfAnimation;
                node.fy = node.sourceY + (node.targetY - node.sourceY) * percentOfAnimation;
              });
              setTimeout(function () {
                return tween(startTime, animationTime);
              }, 1);
            }
          };
          nodes.forEach(function (node) {
            node.originalFx = node.fx;
            node.originalFy = node.fy;
            node.fx = node.x;
            node.fy = node.y;
          });
          tween(Date.now(), Env.IMPLOSION_EXPLOSION_ANIMATION_TIME);
        });
      }
    }]);
    return EntityProcessor;
  }();

  /**
   * The selection processor handles the selection state of nodes and edges.
   * The processor makes sure that events from other components translate into the state being properly updated.
   * When the state is updated the selection processor is also responsible for compiling the new state into an event to alert other components/the user.
   */
  var EntityProcessor = /*#__PURE__*/function () {
    /**
     * @param {EventEmitter} eventEmitter
     * @param {Datastore} datastore
     */
    function EntityProcessor(eventEmitter, datastore) {
      var _this = this;
      _classCallCheck(this, EntityProcessor);
      this.datastore = datastore;
      this.multiSelectMode = false;
      this.ee = eventEmitter;
      this.lastLassoCoveredSelection = null;
      this.lassoExiting = false;
      this.lassoExitingTimeout = null;
      this.lastLassoPosition = [];
      this.ee.on(EVENTS.NODE_MULTI_SELECT_MODE_TOGGLED, function (isEnabled) {
        return _this.multiSelectMode = isEnabled;
      });
      this.ee.on(EVENTS.LASSO_ENTER, function () {
        if (_this.lassoExitingTimeout) {
          clearTimeout(_this.lassoExitingTimeout);
          _this.lassoExiting = false;
        }
        _this.lastLassoCoveredSelection = [];
      });
      this.ee.on(EVENTS.LASSO_EXIT, function () {
        _this.lassoExiting = true;
        _this.lassoExitingTimeout = setTimeout(function () {
          _this.lassoExiting = false;
        }, 100);
        _this.lastLassoCoveredSelection = null;
      });
      this.ee.on(EVENTS.LASSO_MOVED, function (x, y, width, height) {
        _this.lastLassoPosition = [x, y, width, height];
        _this.ee.trigger(EVENTS.RELATIVE_POSITION_UPDATE_REQUESTED);
      });
      this.ee.on(EVENTS.RELATIVE_POSITIONS_UPDATED, function () {
        if (_this.lastLassoPosition.length) {
          _this.selectLassoArea(_this.lastLassoPosition[0], _this.lastLassoPosition[1], _this.lastLassoPosition[2], _this.lastLassoPosition[3]);
          _this.lastLassoPosition = [];
        }
      });
      this.ee.on(EVENTS.CLICK_ENTITY, function (data) {
        if (!_this.lastLassoCoveredSelection && !_this.lassoExiting) {
          if (data) {
            _this.entityClicked(data.id, data.direction);
          } else {
            _this.entityClicked();
          }
        }
      });
    }

    /**
     * Retrieves the current selection
     */
    _createClass(EntityProcessor, [{
      key: "getSelection",
      value: function getSelection() {
        var selectedNodes = this.datastore.nodes.filter(function (node) {
          return node.isFocused;
        }).map(function (node) {
          return {
            id: node.id,
            type: "node",
            data: node.data
          };
        });
        var selectedEdgeTo = this.datastore.edges.filter(function (edge) {
          return edge.isToFocused;
        }).map(function (edge) {
          return {
            id: edge.id,
            type: "edge",
            data: edge.data,
            direction: "to"
          };
        });
        var selectedEdgeFrom = this.datastore.edges.filter(function (edge) {
          return edge.isFromFocused;
        }).map(function (edge) {
          return {
            id: edge.id,
            type: "edge",
            data: edge.data,
            direction: "from"
          };
        });
        return [].concat(_toConsumableArray(selectedNodes), _toConsumableArray(selectedEdgeTo), _toConsumableArray(selectedEdgeFrom));
      }
      /**
       * Updates focus state when an entity has been clicked.
       * If direction is falsey and id is truthy then a node has been selected
       * If both id and direction are truthy an edge has been selected
       * If id is falsey then the background canvas has been clicked
       * @param {string} id
       * @param {"to"|"from"|undefined|null} direction
       */
    }, {
      key: "entityClicked",
      value: function entityClicked(id, direction) {
        if (!this.multiSelectMode || !id) {
          this.clearAllSelections();
          if (!id) {
            this.ee.trigger(EVENTS.SELECTION_UPDATED, this.getSelection());
            return;
          }
        }
        if (id && direction) {
          var edge = this.datastore.getEdgeByID(id);
          if (edge) {
            if (direction === "to") {
              edge.isToFocused = !edge.isToFocused;
              this.ee.trigger(EVENTS.SELECTION_UPDATED, this.getSelection());
              return;
            } else if (direction === "from") {
              edge.isFromFocused = !edge.isFromFocused;
              this.ee.trigger(EVENTS.SELECTION_UPDATED, this.getSelection());
              return;
            }
          }
        } else if (id) {
          var node = this.datastore.getNodeByID(id);
          if (node) {
            node.isFocused = !node.isFocused;
            this.ee.trigger(EVENTS.SELECTION_UPDATED, this.getSelection());
            return;
          }
        }
      }
      /**
       * Removes all selections from the state
       */
    }, {
      key: "clearAllSelections",
      value: function clearAllSelections() {
        this.datastore.nodes.forEach(function (node) {
          return node.isFocused = false;
        });
        this.datastore.edges.forEach(function (edge) {
          edge.isToFocused = false;
          edge.isFromFocused = false;
        });
      }
      /**
       * Handles updating the seletion when the selection lasso has moved
       * @param {number} x - x coordinate of the lasso
       * @param {number} y - y coordinate of the lasso
       * @param {number} width - width of the lasso
       * @param {number} height - height of the lasso
       */
    }, {
      key: "selectLassoArea",
      value: function selectLassoArea(x, y, width, height) {
        var _this2 = this;
        var lassoEndX = x + width;
        var lassoEndY = y + height;
        var coveredSelection = _toConsumableArray(this.lastLassoCoveredSelection);
        var selectionChanged = false;
        this.datastore.nodes.forEach(function (node) {
          if (node.relativeX >= x && node.relativeY >= y && node.relativeX + node.relativeWidth <= lassoEndX && node.relativeY + node.relativeheight <= lassoEndY) {
            if (!_this2.lastLassoCoveredSelection.includes(node.id)) {
              node.isFocused = !node.isFocused;
              coveredSelection.push(node.id);
              selectionChanged = true;
            }
          } else if (_this2.lastLassoCoveredSelection.includes(node.id)) {
            coveredSelection.splice(coveredSelection.indexOf(node.id), 1);
            node.isFocused = !node.isFocused;
            selectionChanged = true;
          }
        });
        this.datastore.edges.forEach(function (edge) {
          if (edge.nameTo) {
            if (edge.labelToRelativeX >= x && edge.labelToRelativeY >= y && edge.labelToRelativeX + edge.labelToRelativeWidth <= lassoEndX && edge.labelToRelativeY + edge.labelToRelativeHeight <= lassoEndY) {
              if (!_this2.lastLassoCoveredSelection.includes("".concat(edge.id, "to"))) {
                edge.isToFocused = !edge.isToFocused;
                coveredSelection.push("".concat(edge.id, "to"));
                selectionChanged = true;
              }
            } else if (_this2.lastLassoCoveredSelection.includes("".concat(edge.id, "to"))) {
              coveredSelection.splice(coveredSelection.indexOf("".concat(edge.id, "to")), 1);
              edge.isToFocused = !edge.isToFocused;
              selectionChanged = true;
            }
          }
          if (edge.nameFrom) {
            if (edge.labelFromRelativeX >= x && edge.labelFromRelativeY >= y && edge.labelFromRelativeX + edge.labelFromRelativeWidth <= lassoEndX && edge.labelFromRelativeY + edge.labelFromRelativeHeight <= lassoEndY) {
              if (!_this2.lastLassoCoveredSelection.includes("".concat(edge.id, "from"))) {
                edge.isFromFocused = !edge.isFromFocused;
                coveredSelection.push("".concat(edge.id, "from"));
                selectionChanged = true;
              }
            } else if (_this2.lastLassoCoveredSelection.includes("".concat(edge.id, "from"))) {
              coveredSelection.splice(coveredSelection.indexOf("".concat(edge.id, "from")), 1);
              edge.isFromFocused = !edge.isFromFocused;
              selectionChanged = true;
            }
          }
        });
        if (selectionChanged) {
          this.lastLassoCoveredSelection = coveredSelection;
          this.ee.trigger(EVENTS.SELECTION_UPDATED, this.getSelection());
        }
      }
    }]);
    return EntityProcessor;
  }();

  var VVNode = /*#__PURE__*/function () {
    function VVNode(id, type, name, icon, data, isHidden) {
      _classCallCheck(this, VVNode);
      //User provided information
      this.id = id;
      this.type = type;
      this.name = name;
      this.icon = icon;
      this.data = data;

      //Coordinates
      this.x = undefined;
      this.y = undefined;
      this.relativeX = undefined;
      this.relativeY = undefined;

      //Fixed coordinates
      this.fx = undefined;
      this.fy = undefined;

      //Velocity
      this.vx = undefined;
      this.vy = undefined;

      //Visibility information
      this.isFiltered = false;
      this.isHidden = typeof isHidden === "boolean" ? isHidden : false; //E.g. imploded

      //Status
      this.isFocused = false;

      //Other Meta data
      this.hiddenEdgeCount = 0;
      this.shape = null;
      this.radius = null;
      this.width = null;
      this.height = null;
      this.relativeWidth = null;
      this.relativeheight = null;

      //Animation utility properties
      this.sourceX = 0;
      this.sourceY = 0;
      this.targetX = 0;
      this.targetY = 0;
      this.originalFx = null;
      this.originalFy = null;
      this.isAnimating = false;

      //D3 index
      this.index = null;
    }

    /**
     * Updates the basic data points of the node after it has been created
     * @param {string} type - Node type
     * @param {string} name - Node name
     * @param {string} icon - Icon URL
     * @param {boolean} isHidden - Is the node hidden?
     * @param {any} data - New bound data
     */
    _createClass(VVNode, [{
      key: "updateData",
      value: function updateData(type, name, icon, data, isHidden) {
        this.type = type;
        this.name = name;
        this.icon = icon;
        this.data = data;
        if (typeof isHidden === "boolean") {
          this.isHidden = isHidden;
        }
        this.shape = null;
        this.radius = null;
        this.width = null;
        this.height = null;
        this.relativeWidth = null;
        this.relativeheight = null;
      }
      /**
       * Fixates node to a given position in the graph.
       * @param {number} x - X coordinate
       * @param {number} y - Y coordinate
       */
    }, {
      key: "pin",
      value: function pin(x, y) {
        this.fx = x;
        this.fy = y;
      }
      /**
       * Removes coordinate fixation.
       */
    }, {
      key: "unPin",
      value: function unPin() {
        this.fx = null;
        this.fy = null;
      }
      /**
       * Repositions node to given coordinates.
       * @param {number} newX - Target X coordinate
       * @param {number} newY - Target Y coordinate
       */
    }, {
      key: "reposition",
      value: function reposition(newX, newY) {
        this.sourceX = this.x;
        this.sourceY = this.y;
        this.targetX = newX;
        this.targetY = newY;
        return this._animate();
      }
      /**
       * Animates position from source to target
       */
    }, {
      key: "_animate",
      value: function _animate() {
        var _this = this;
        if (!this.targetX || !this.targetY) {
          return Promise.reject("No target coordinates set.");
        }
        return new Promise(function (resolve) {
          var tween = function tween(startTime, animationTime) {
            var deltaTime = Date.now() - startTime;
            if (deltaTime > animationTime) {
              delete _this.targetX;
              delete _this.targetY;
              delete _this.sourceX;
              delete _this.sourceY;
              delete _this.fx;
              delete _this.fy;
              if (_this.originalFx) {
                _this.fx = _this.originalFx;
                delete _this.originalFx;
              }
              if (_this.originalFy) {
                _this.fy = _this.originalFy;
                delete _this.originalFy;
              }
              delete _this.animating;
              resolve();
            } else {
              var percentOfAnimation = deltaTime / animationTime;
              _this.fx = _this.sourceX + (_this.targetX - _this.sourceX) * percentOfAnimation;
              _this.fy = _this.sourceY + (_this.targetY - _this.sourceY) * percentOfAnimation;
              setTimeout(function () {
                return tween(startTime, animationTime);
              }, 1);
            }
          };
          _this.originalFx = _this.fx;
          _this.originalFy = _this.fy;
          _this.fx = _this.x;
          _this.fy = _this.y;
          _this.animating = true;
          tween(Date.now(), Env.IMPLOSION_EXPLOSION_ANIMATION_TIME);
        });
      }
    }]);
    return VVNode;
  }();

  var VVEdge = /*#__PURE__*/function () {
    function VVEdge(id, type, sourceNode, targetNode, nameFrom, nameTo, multiplicityFrom, multiplicityTo, lineType, markerFrom, markerTo, data) {
      _classCallCheck(this, VVEdge);
      //User provided information
      this.id = id;
      this.type = type;
      this.sourceNode = sourceNode;
      this.targetNode = targetNode;
      this.nameFrom = nameFrom;
      this.nameTo = nameTo;
      this.multiplicityFrom = multiplicityFrom;
      this.multiplicityTo = multiplicityTo;
      this.lineType = lineType;
      this.markerFrom = markerFrom;
      this.markerTo = markerTo;
      this.data = data;

      //Status
      this.isToFocused = false;
      this.isFromFocused = false;

      //Visual information
      this.isFiltered = false;
      this.isHidden = false;

      //Relative coordinates
      this.labelToRelativeX = undefined;
      this.labelToRelativeY = undefined;
      this.labelToRelativeWidth = undefined;
      this.labelToRelativeHeight = undefined;
      this.labelFromRelativeX = undefined;
      this.labelFromRelativeY = undefined;
      this.labelFromRelativeWidth = undefined;
      this.labelFromRelativeHeight = undefined;

      //Meta Data calculated at runtime
      this.edgeDistance = undefined;
      this.nameToWidth = undefined;
      this.nameFromWidth = undefined;
      this.multiEdgeCount = undefined;
      this.multiEdgeIndex = undefined;
      this.curvePoint = undefined;

      //D3 relevant attributes
      this.index = this.source = undefined; //index reference
      this.target = undefined; //index reference
    }
    _createClass(VVEdge, [{
      key: "isInverse",
      value: function isInverse() {
        return this.nameFrom || this.markerFrom;
      }
      /**
       * Updates the main data points of the edge after it has been created
       * @param {string} type - Type of edge
       * @param {string} nameFrom - Name in the from direction
       * @param {string} nameTo - Name in the to direction
       * @param {string} multiplicityFrom - Multiplicity in the from direction
       * @param {string} multiplicityTo - Multiplicity in the to direction
       * @param {"line"|"cubicbezier"|"taxi"|"fulltaxi"} lineType - Line type for the edge
       * @param {"arrow"|"diamond"|"square"|"circle"|"hollowcircle"|"hollowreversearrow"|"none"} markerFrom - Marker type in the from direction
       * @param {"arrow"|"diamond"|"square"|"circle"|"hollowcircle"|"hollowreversearrow"|"none"} markerTo - Marker type in the to direction
       * @param {any} data - Bound data
       */
    }, {
      key: "updateData",
      value: function updateData(type, nameFrom, nameTo, multiplicityFrom, multiplicityTo, lineType, markerFrom, markerTo, data) {
        this.type = type;
        this.nameFrom = nameFrom;
        this.nameTo = nameTo;
        this.multiplicityFrom = multiplicityFrom;
        this.multiplicityTo = multiplicityTo;
        this.lineType = lineType;
        this.markerFrom = markerFrom;
        this.markerTo = markerTo;
        this.data = data;
      }
    }]);
    return VVEdge;
  }();

  /**
   * The data store class is responsible to storing and managing all edges and nodes.
   * The data store decides what nodes and edges are live, as well as makes sure they have the correct data set on them.
   */
  var Datastore = /*#__PURE__*/function () {
    function Datastore(nodes, edges, eventEmitter, styles, userDefinedOptions) {
      var _this = this;
      _classCallCheck(this, Datastore);
      this.allNodes = nodes.map(function (node) {
        return new VVNode(node.id, node.type, node.name, node.icon, node.data, node.isHidden);
      });
      this.allEdges = edges.map(function (edge) {
        return new VVEdge(edge.id, edge.type, edge.sourceNode, edge.targetNode, edge.nameFrom, edge.nameTo, edge.multiplicityFrom, edge.multiplicityTo, edge.lineType, edge.markerFrom, edge.markerTo, edge.data);
      });
      this.liveNodes = this.allNodes;
      this.liveEdges = this.allEdges;
      this.filters = {
        nodes: [],
        edges: []
      };
      this.ee = eventEmitter;
      this.ee.on(EVENTS.DATA_UPDATE_REQUESTED, function (nodes, edges) {
        return _this.updateDataset(nodes, edges);
      });
      this.ee.on(EVENTS.LOAD_STATE, function (nodes, edges) {
        return _this.loadState(nodes, edges);
      });
      this.ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
        _this.entityProcessor.executePreProcessor(_this.nodes, _this.edges);
        _this.ee.trigger(EVENTS.DATASTORE_UPDATED, _this.nodes, _this.edges);
      });
      this.ee.on(EVENTS.NODE_HIDDEN_STATUS_UPDATE_REQUEST, function (newValues) {
        _this.updateNodesHiddenStatus(newValues);
        _this.updateHiddenEdges();
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.updateLiveData();
      });
      this.ee.on(EVENTS.DATA_FILTER_REQUESTED, function (filters) {
        _this.setFilters(filters);
        _this.applyFilters();
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.updateLiveData();
      });
      this.ee.on(EVENTS.DATA_FILTER_RESET_REQUESTED, function () {
        _this.resetAllFilters();
        _this.applyFilters();
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.updateLiveData();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_REQUESTED, function (id, isImplode, direction) {
        _this.implodeOrExplodeNode(id, isImplode, direction);
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.implodeExplodedNodesAnimation(id, isImplode);
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, function (id, isImplode, direction) {
        _this.implodeOrExplodeNodeLeafs(id, isImplode, direction);
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.implodeExplodedNodesAnimation(id, isImplode);
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, function (id, isImplode) {
        _this.implodeOrExplodeNodeRecursive(id, isImplode);
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.implodeExplodedNodesAnimation(id, isImplode);
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, function (id, isImplode) {
        _this.implodeOrExplodeNodeNonCircular(id, isImplode);
        _this.updateNumberOfHiddenEdgesOnNodes();
        _this.implodeExplodedNodesAnimation(id, isImplode);
      });
      this.entityProcessor = new EntityProcessor$1(this.ee, styles, userDefinedOptions);
      this.selectionProcessor = new EntityProcessor(this.ee, this);
      this.updateEdgeIDs();
      this.nodeMap = new Map();
      this.edgeMap = new Map();
      this.allNodes.forEach(function (node) {
        return _this.nodeMap.set(node.id, node);
      });
      this.allEdges.forEach(function (edge) {
        return _this.edgeMap.set(edge.id, edge);
      });
      this.applyFilters();
      this.updateNumberOfHiddenEdgesOnNodes();
    }

    /**
     * Will always return only what data is currently live
     * @returns {VVEdge[]} edge
     */
    _createClass(Datastore, [{
      key: "implodeExplodedNodesAnimation",
      /**
       * Bootstraps the update animation for implosion and explosions of nodes, and ensures things happen a correct order
       */
      value: function implodeExplodedNodesAnimation(id, isImplode) {
        var _this2 = this;
        var rootNode = this.getNodeByID(id);
        this.stageNodePositions(isImplode ? null : rootNode.x, isImplode ? null : rootNode.y, isImplode ? rootNode.x : null, isImplode ? rootNode.y : null);
        if (isImplode) {
          this.entityProcessor.animateNodePositions(this.allNodes).then(function () {
            _this2.updateLiveData();
          });
        } else {
          this.updateLiveData();
          this.entityProcessor.animateNodePositions(this.allNodes);
        }
      }
      /**
       * Updates the hidden status on the input nodes
       * @param {{isHidden: boolean, id: string}[]} newValues - An array of new values to be applied to the given nodes
       */
    }, {
      key: "updateNodesHiddenStatus",
      value: function updateNodesHiddenStatus(newValues) {
        var _this3 = this;
        newValues.forEach(function (newStatus) {
          var node = _this3.getNodeByID(newStatus.id);
          if (node) {
            node.isHidden = newStatus.isHidden;
          }
        });
      }
    }, {
      key: "updateHiddenEdges",
      value: function updateHiddenEdges() {
        var _this4 = this;
        this.allEdges.forEach(function (edge) {
          var source = _this4.nodeMap.get(edge.sourceNode);
          var target = _this4.nodeMap.get(edge.targetNode);
          if (_this4.isNodeLive(source) && _this4.isNodeLive(target)) {
            edge.isHidden = false;
          } else {
            edge.isHidden = true;
          }
        });
      }
      /**
       * If there are edges that lack IDs this function will set these to a number that represents the index in the edge array.
       */
    }, {
      key: "updateEdgeIDs",
      value: function updateEdgeIDs() {
        this.allEdges.forEach(function (edge, edgeIndex) {
          if (edge.id === undefined) {
            edge.id = edgeIndex;
          }
        });
      }
      /**
       * Loads a state into the data store.
       * @param {object[]} newNodes - All nodes to be included in the new data set
       * @param {object[]} newEdges - All edges to be included in the new data set
       */
    }, {
      key: "loadState",
      value: function loadState(newNodes, newEdges) {
        var _this5 = this;
        this.allNodes = newNodes.map(function (node) {
          var vvNode = new VVNode();
          Object.keys(node).forEach(function (key) {
            vvNode[key] = node[key];
          });
          return vvNode;
        });
        this.allEdges = newEdges.map(function (edge) {
          var vvEdge = new VVEdge();
          Object.keys(edge).forEach(function (key) {
            vvEdge[key] = edge[key];
          });
          return vvEdge;
        });
        this.updateEdgeIDs();
        this.nodeMap.clear();
        this.edgeMap.clear();
        this.allNodes.forEach(function (node) {
          return _this5.nodeMap.set(node.id, node);
        });
        this.allEdges.forEach(function (edge) {
          return _this5.edgeMap.set(edge.id, edge);
        });
        this.updateHiddenEdges();
        this.applyFilters();
        this.updateNumberOfHiddenEdgesOnNodes();
        this.updateLiveData();
      }
      /**
       * Updates the data in the data store.
       * @param {object[]} newNodes - All nodes to be included in the new data set
       * @param {object[]} newEdges - All edges to be included in the new data set
       */
    }, {
      key: "updateDataset",
      value: function updateDataset(newNodes, newEdges) {
        var _this6 = this;
        this.allNodes = newNodes.map(function (node) {
          var existingNode = _this6.getNodeByID(node.id);
          if (existingNode) {
            existingNode.updateData(node.type, node.name, node.icon, node.data, node.isHidden);
            return existingNode;
          }
          return new VVNode(node.id, node.type, node.name, node.icon, node.data, node.isHidden);
        });
        this.allEdges = newEdges.map(function (edge) {
          var existingEdge = _this6.getEdgeByID(edge.id);
          if (existingEdge) {
            existingEdge.updateData(edge.type, edge.nameFrom, edge.nameTo, edge.multiplicityFrom, edge.multiplicityTo, edge.lineType, edge.markerFrom, edge.markerTo, edge.data);
            return existingEdge;
          }
          return new VVEdge(edge.id, edge.type, edge.sourceNode, edge.targetNode, edge.nameFrom, edge.nameTo, edge.multiplicityFrom, edge.multiplicityTo, edge.lineType, edge.markerFrom, edge.markerTo, edge.data);
        });
        this.updateEdgeIDs();
        this.nodeMap.clear();
        this.edgeMap.clear();
        this.allNodes.forEach(function (node) {
          return _this6.nodeMap.set(node.id, node);
        });
        this.allEdges.forEach(function (edge) {
          return _this6.edgeMap.set(edge.id, edge);
        });
        this.updateHiddenEdges();
        this.applyFilters();
        this.updateNumberOfHiddenEdgesOnNodes();
        this.updateLiveData();
      }
      /**
       * Retrieves a node object by its ID
       * @param {string} ID - ID of the node
       * @return {VVNode|null} - Node object or null
       */
    }, {
      key: "getNodeByID",
      value: function getNodeByID(ID) {
        return this.nodeMap.get(ID);
      }
      /**
       * Retrieves an edge object by its ID
       * @param {string} ID - ID of the edge
       * @return {VVEdge|null} - Edge object or null
       */
    }, {
      key: "getEdgeByID",
      value: function getEdgeByID(ID) {
        return this.edgeMap.get(ID);
      }
      /**
       * Clears all filters
       */
    }, {
      key: "resetAllFilters",
      value: function resetAllFilters() {
        this.filters = {
          nodes: [],
          edges: []
        };
      }
      /**
       * Stores new filters, overwriting and clearing any existing ones. Note that this function not apply the filters.
       * @param {object[]} filters - Array of filters to be set
       */
    }, {
      key: "setFilters",
      value: function setFilters(filters) {
        var nodeFilters = [];
        var edgeFilters = [];
        filters.forEach(function (filter) {
          if (filter.entityType === "node") {
            nodeFilters.push({
              attribute: filter.attribute,
              value: filter.value,
              function: filter.filterFunction
            });
          } else if (filter.entityType === "edge") {
            edgeFilters.push({
              attribute: filter.attribute,
              value: filter.value,
              function: filter.filterFunction
            });
          } else {
            throw new Error("No such entity type for filters:", filter.entityType);
          }
        });
        this.filters.nodes = nodeFilters;
        this.filters.edges = edgeFilters;
      }
      /**
       * Applies all defined filters to the dataset
       */
    }, {
      key: "applyFilters",
      value: function applyFilters() {
        var _this7 = this;
        this.allNodes.forEach(function (node) {
          var isFiltered = false;
          _this7.filters.nodes.forEach(function (filter) {
            if (!isFiltered) {
              if (filter.filterFunction) {
                isFiltered = filter.filterFunction(node.data);
              } else if (node[filter.attribute] === filter.value) {
                isFiltered = true;
              }
            }
          });
          node.isFiltered = isFiltered;
        });
        this.allEdges.forEach(function (edge) {
          var isFiltered = false;
          _this7.filters.edges.forEach(function (filter) {
            if (!isFiltered) {
              if (filter.filterFunction) {
                isFiltered = filter.filterFunction(edge.data);
              } else if (edge[filter.attribute] === filter.value) {
                isFiltered = true;
              }
            }
          });

          //If nodes have been removed there could be broken edges. Mark these as filtered as well.
          var foundSource = !_this7.getNodeByID(edge.sourceNode).isFiltered;
          var foundTarget = !_this7.getNodeByID(edge.targetNode).isFiltered;
          if (!foundSource || !foundTarget) {
            isFiltered = true;
          }
          edge.isFiltered = isFiltered;
        });
      }
      /**
       * Creates source and target coordinates for nodes that are staged to go live from an implosion/explosion.
       * The result of this function is primarily used to animate the graph into a new state
       * @param {number?} rootX - Start position for the transition
       * @param {number?} rootY - Start position for the transition
       * @param {number?} targetX - End position for the transition
       * @param {number?} targetY - End position for the transition
       */
    }, {
      key: "stageNodePositions",
      value: function stageNodePositions(rootX, rootY, targetX, targetY) {
        var _this8 = this;
        if (!rootX && !targetX) {
          return;
        }
        if (targetX && !rootX) {
          var nodes = this.allNodes.filter(function (node) {
            return !_this8.isNodeLive(node) && _this8.liveNodes.find(function (onScreenNode) {
              return onScreenNode.id === node.id;
            });
          });
          nodes.forEach(function (node) {
            node.targetX = targetX;
            node.targetY = targetY;
            node.sourceX = node.x;
            node.sourceY = node.y;
          });
        } else if (rootX && !targetX) {
          var _nodes = this.allNodes.filter(function (node) {
            return _this8.isNodeLive(node) && !_this8.liveNodes.find(function (onScreenNode) {
              return onScreenNode.id === node.id;
            });
          });
          var leafAncestryMap = {};
          var connectionMap = {};
          _nodes.forEach(function (node) {
            var connectedNodes = _this8.allEdges.filter(function (edge) {
              return (edge.targetNode === node.id || edge.sourceNode === node.id) && edge.targetNode !== edge.sourceNode;
            }).map(function (edge) {
              return edge.sourceNode === node.id ? {
                node: _this8.getNodeByID(edge.targetNode),
                edgeDistance: edge.edgeDistance
              } : {
                node: _this8.getNodeByID(edge.sourceNode),
                edgeDistance: edge.edgeDistance
              };
            }).filter(function (connectedNode) {
              return _this8.liveNodes.includes(connectedNode.node);
            }).reduce(function (acc, connectedNode) {
              if (!acc.map(function (connection) {
                return connection.node.id;
              }).includes(connectedNode.node.id)) {
                acc.push(connectedNode);
              }
              return acc;
            }, []);
            connectionMap[node.id] = connectedNodes;
            if (connectedNodes.length === 1) {
              Array.isArray(leafAncestryMap[connectedNodes[0].node.id]) ? leafAncestryMap[connectedNodes[0].node.id].push(node.id) : leafAncestryMap[connectedNodes[0].node.id] = [node.id];
            }
          });
          _nodes.forEach(function (node) {
            node.sourceX = rootX + 2; //I can't be the exact point of the root or there will be divisional errors
            node.sourceY = rootY + 2;
            if (connectionMap[node.id].length === 1) {
              var multiplier = leafAncestryMap[connectionMap[node.id][0].node.id].indexOf(node.id) + 1;
              var divider = leafAncestryMap[connectionMap[node.id][0].node.id].length;
              var angle = Math.floor(359 / divider * multiplier);
              node.targetX = connectionMap[node.id][0].node.x + connectionMap[node.id][0].edgeDistance * 2 * Math.cos(angle * Math.PI / 180);
              node.targetY = connectionMap[node.id][0].node.y + connectionMap[node.id][0].edgeDistance * 2 * Math.sin(angle * Math.PI / 180);
            } else if (connectionMap[node.id].length === 0) {
              node.targetX = 0;
              node.targetY = 0;
            } else {
              node.targetX = connectionMap[node.id].reduce(function (acc, connection) {
                return acc + connection.node.x;
              }, 0) / connectionMap[node.id].length;
              node.targetY = connectionMap[node.id].reduce(function (acc, connection) {
                return acc + connection.node.y;
              }, 0) / connectionMap[node.id].length;
            }
          });
        }
      }
      /**
       * Updates the live data by filtering non-relevant nodes and edges
       */
    }, {
      key: "updateLiveData",
      value: function updateLiveData() {
        var _this9 = this;
        this.liveNodes = this.allNodes.filter(function (node) {
          return _this9.isNodeLive(node);
        });
        this.liveEdges = this.allEdges.filter(function (edge) {
          return _this9.isEdgeLive(edge);
        });
        this.entityProcessor.executePreProcessor(this.nodes, this.edges);
        this.ee.trigger(EVENTS.DATASTORE_UPDATED, this.nodes, this.edges);
      }
      /**
       * Updates the counter on all nodes that has information about how many hidden edges it is a source to
       */
    }, {
      key: "updateNumberOfHiddenEdgesOnNodes",
      value: function updateNumberOfHiddenEdgesOnNodes() {
        var _this0 = this;
        //Write number of hidden edges to nodes
        this.allNodes.forEach(function (node) {
          if (node.isHidden || node.isFiltered) {
            //Node is not live
            node.hiddenEdgeCount = null;
            return;
          }
          node.hiddenEdgeCount = _this0.allEdges.filter(function (edge) {
            return edge.isHidden && !edge.isFiltered && (edge.sourceNode === node.id || edge.targetNode === node.id);
          }).length;
        });
      }
      /**
       * Checks if a node is live or not.
       * @param {object} node - Node object to be evaluated
       * @return {boolean} - isLive?
       */
    }, {
      key: "isNodeLive",
      value: function isNodeLive(node) {
        return !node.isHidden && !node.isFiltered;
      }
      /**
       * Checks if an edge is live or not.
       * @param {object} node - Edge object to be evaluated
       * @return {boolean} - isLive?
       */
    }, {
      key: "isEdgeLive",
      value: function isEdgeLive(edge) {
        return !edge.isHidden && !edge.isFiltered;
      }
      /**
       * Sets given nodes and edges to a specified hidden status.
       * @param {object[]} nodes - Array of node objects
       * @param {object[]} edges - Array of edge objects
       * @param {boolean} status - Status to be set, true if hidden, false if not
       */
    }, {
      key: "setNodesAndEdgesHiddenStatus",
      value: function setNodesAndEdgesHiddenStatus(nodes, edges, status) {
        nodes.forEach(function (node) {
          return node.isHidden = status;
        });
        edges.forEach(function (edge) {
          return edge.isHidden = status;
        });
      }
      /**
       * Sets all nodes connected to the provided root node to hidden=true/false (in the TO direction)
       * @param {string} rootNodeID - ID of the root node of the operation
       * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
       * @param {"to", "from", "both"} direction - Direction in which to carry out the operation
       * @return {object} - Affected nodes and edges
       */
    }, {
      key: "implodeOrExplodeNode",
      value: function implodeOrExplodeNode(rootNodeID, isImplode) {
        var _this1 = this;
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "both";
        var connectedEdges;
        var connectedNodes;
        var collateralEdges;
        if (direction === "to" || direction === "both") {
          connectedEdges = this.allEdges.filter(function (edge) {
            return edge.sourceNode === rootNodeID;
          });
          connectedNodes = connectedEdges.map(function (edge) {
            return edge.targetNode;
          }).filter(function (node) {
            return node !== rootNodeID;
          });
          collateralEdges = this.allEdges.filter(function (edge) {
            if (connectedNodes.includes(edge.sourceNode) && connectedNodes.includes(edge.targetNode)) {
              //Processed nodes connecting to each other. This should always be included.
              return true;
            } else if (connectedNodes.includes(edge.sourceNode)) {
              //Going outwards
              return _this1.isNodeLive(_this1.getNodeByID(edge.targetNode));
            } else if (connectedNodes.includes(edge.targetNode)) {
              //Going inwards
              return _this1.isNodeLive(_this1.getNodeByID(edge.sourceNode));
            } else {
              return false;
            }
          });
        }
        if (direction === "from" || direction === "both") {
          connectedEdges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(this.allEdges.filter(function (edge) {
            return edge.targetNode === rootNodeID;
          })));
          connectedNodes = [].concat(_toConsumableArray(connectedNodes), _toConsumableArray(connectedEdges.map(function (edge) {
            return edge.sourceNode;
          }).filter(function (node) {
            return node !== rootNodeID;
          })));
          collateralEdges = _toConsumableArray(this.allEdges.filter(function (edge) {
            if (connectedNodes.includes(edge.targetNode) && connectedNodes.includes(edge.sourceNode)) {
              //Processed nodes connecting to each other. This should always be included.
              return true;
            } else if (connectedNodes.includes(edge.targetNode)) {
              //Going outwards
              return _this1.isNodeLive(_this1.getNodeByID(edge.sourceNode));
            } else if (connectedNodes.includes(edge.sourceNode)) {
              //Going inwards
              return _this1.isNodeLive(_this1.getNodeByID(edge.targetNode));
            } else {
              return false;
            }
          }));
        }
        var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
        var nodes = connectedNodes.map(function (nodeID) {
          return _this1.getNodeByID(nodeID);
        });
        this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
        return {
          updatedNodes: nodes,
          updatedEdges: edges
        };
      }
      /**
       * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) where no further branching continues.
       * @param {string} rootNodeID - ID of the root node of the operation
       * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
       * @param {"to", "from", "both"} direction - Direction in which to carry out the operation
       * @return {object} - Affected nodes and edges
       */
    }, {
      key: "implodeOrExplodeNodeLeafs",
      value: function implodeOrExplodeNodeLeafs(rootNodeID, isImplode) {
        var _this10 = this;
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "both";
        var connectedEdges = [];
        var connectedNodes = [];
        var collateralEdges = [];
        if (direction === "to" || direction === "both") {
          connectedEdges = this.allEdges.filter(function (edge) {
            return edge.sourceNode === rootNodeID && edge.targetNode !== rootNodeID;
          }).filter(function (edge) {
            return !_this10.allEdges.find(function (secondaryEdge) {
              return secondaryEdge.sourceNode === edge.targetNode || secondaryEdge.targetNode === edge.targetNode && edge.sourceNode !== rootNodeID;
            });
          });
          connectedNodes = connectedEdges.map(function (edge) {
            return edge.targetNode;
          });
          collateralEdges = this.allEdges.filter(function (edge) {
            return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
          });
        }
        if (direction === "from" || direction === "both") {
          var fromConnectedEdges = this.allEdges.filter(function (edge) {
            return edge.targetNode === rootNodeID && edge.sourceNode !== rootNodeID;
          }).filter(function (edge) {
            return !_this10.allEdges.find(function (secondaryEdge) {
              return secondaryEdge.targetNode === edge.sourceNode || secondaryEdge.sourceNode === edge.sourceNode && edge.targetNode !== rootNodeID;
            });
          });
          var fromConnectedNodes = fromConnectedEdges.map(function (edge) {
            return edge.sourceNode;
          });
          var fromCollateralEdges = this.allEdges.filter(function (edge) {
            return fromConnectedNodes.includes(edge.sourceNode) || fromConnectedNodes.includes(edge.targetNode);
          });
          connectedEdges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(fromConnectedEdges));
          connectedNodes = [].concat(_toConsumableArray(connectedNodes), _toConsumableArray(fromConnectedNodes));
          collateralEdges = [].concat(_toConsumableArray(collateralEdges), _toConsumableArray(fromCollateralEdges));
        }
        var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
        var nodes = connectedNodes.map(function (nodeID) {
          return _this10.getNodeByID(nodeID);
        });
        this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
        return {
          updatedNodes: nodes,
          updatedEdges: edges
        };
      }
      /**
       * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction) recursively until it reaches the end of the tree.
       * @param {string} rootNodeID - ID of the root node of the operation
       * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
       * @param {string[]} processedNodeIDs - IDs that have been processed. Generally would not set this manually when calling the function.
       */
    }, {
      key: "implodeOrExplodeNodeRecursive",
      value: function implodeOrExplodeNodeRecursive(nodeID, isImplode) {
        var _this11 = this;
        var processedNodeIDs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        if (!processedNodeIDs.includes(nodeID)) {
          processedNodeIDs.push(nodeID);
          var _this$implodeOrExplod = this.implodeOrExplodeNode(nodeID, isImplode, "to"),
            updatedNodes = _this$implodeOrExplod.updatedNodes;
          updatedNodes.forEach(function (node) {
            return _this11.implodeOrExplodeNodeRecursive(node.id, isImplode, processedNodeIDs);
          });
        }
      }
      /**
       * Sets all nodes connected to the node with the provided ID to hidden=true/false (in the TO direction)
       * recursively until it reaches the end of the tree, but only for branches that don't create circular references back.
       * (to avoid imploding the entire tree on highly interconnected data)
       * @param {string} rootNodeID - ID of the root node of the operation
       * @param {boolean} isImplode - If true this is an implode operation, if false this an explode operation
       * @return {object} - Affected nodes and edges
       */
    }, {
      key: "implodeOrExplodeNodeNonCircular",
      value: function implodeOrExplodeNodeNonCircular(rootNodeID, isImplode) {
        var _this12 = this;
        var connectedEdges = this.allEdges.filter(function (edge) {
          return edge.sourceNode === rootNodeID;
        }).filter(function (edge) {
          return _this12.calculateEdgePathFromNodeToNode(edge.targetNode, rootNodeID).length === 0;
        });
        var connectedNodes = connectedEdges.map(function (edge) {
          return edge.targetNode;
        });
        var collateralEdges = this.allEdges.filter(function (edge) {
          return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
        });
        var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
        var nodes = connectedNodes.map(function (nodeID) {
          return _this12.getNodeByID(nodeID);
        });
        this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
        connectedNodes.forEach(function (nodeID) {
          return _this12.implodeOrExplodeNodeRecursive(nodeID, isImplode);
        });
      }
      /**
       * Calculates the shortest path from one node to another. Returns an array with the nodeIDs, or an empty array if there is no path.
       * @param {string} nodeIDFrom - Node ID where the road starts
       * @param {string} nodeIDTo - Node ID where the road ends
       * @param {string[]} path - The current path, typically you provide this as undefined
       * @param {string[]} crossedNodes - Nodes that have already been seen, typically you provide this as undefined
       * @return {string[]} - Shortest path
       */
    }, {
      key: "calculateEdgePathFromNodeToNode",
      value: function calculateEdgePathFromNodeToNode(nodeIDFrom, nodeIDTo) {
        var _this13 = this;
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var crossedNodes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        var result = [];
        if (!crossedNodes.includes(nodeIDFrom)) {
          if (nodeIDFrom === nodeIDTo) {
            path.push(nodeIDTo);
            return path;
          }
          path.push(nodeIDFrom);
          crossedNodes.push(nodeIDFrom);
          var nextSteps = this.allEdges.filter(function (edge) {
            return edge.sourceNode === nodeIDFrom;
          });
          nextSteps.forEach(function (node) {
            var pathCopy = _toConsumableArray(path);
            var potentialPath = _this13.calculateEdgePathFromNodeToNode(node, nodeIDTo, pathCopy, crossedNodes);
            if (potentialPath.length > 0) {
              result = potentialPath;
            }
          });
        }
        return result;
      }
    }, {
      key: "edges",
      get: function get() {
        return this.liveEdges;
      }
      /**
       * Will always return only what data is currently live
       * @returns {VVNode[]} node
       */
    }, {
      key: "nodes",
      get: function get() {
        return this.liveNodes;
      }
    }]);
    return Datastore;
  }();

  var EventEmitter = /*#__PURE__*/function () {
    /* Add all possible events from Enum to instance */
    function EventEmitter() {
      var _this = this;
      _classCallCheck(this, EventEmitter);
      this.events = {};
      Object.keys(EVENTS).forEach(function (key) {
        _this.events[EVENTS[key]] = [];
      });
    }

    /* Add a callback to an event */
    _createClass(EventEmitter, [{
      key: "on",
      value: function on(eventName, callback) {
        if (this.events[eventName]) {
          this.events[eventName].push(callback);
        } else {
          throw new Error("No such event: " + eventName);
        }
      } /* Trigger an Event */
    }, {
      key: "trigger",
      value: function trigger(eventName) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        if (this.events[eventName]) {
          this.events[eventName].forEach(function (callback) {
            callback.apply(null, args);
          });
        }
      }
    }]);
    return EventEmitter;
  }();

  /**
   * The zoom handler class handles anything and everything related to zooming.
   */
  var ZoomHandler = /*#__PURE__*/function () {
    function ZoomHandler(graphContainerElement, eventEmitter, options) {
      var _this = this;
      _classCallCheck(this, ZoomHandler);
      this.graphContainerElement = graphContainerElement;
      this.enableZoomButtons = options.enableZoomButtons !== undefined ? options.enableZoomButtons : Env.ENABLE_ZOOM_BUTTONS;
      this.enableScaleGridOnZoom = options.enableScaleGridOnZoom !== undefined ? options.enableScaleGridOnZoom : Env.ENABLE_SCALE_GRID_ON_ZOOM;
      this.hideDetailsZoomScale = options.hideDetailsZoomScale !== undefined ? options.hideDetailsZoomScale : Env.HIDE_DETAILS_ZOOM_SCALE;
      this.isDetailsHidden = false;
      this.ee = eventEmitter;
      this.isLassoEnabled = false;
      this.ee.on(EVENTS.ZOOM_REQUESTED, function (x, y, scale) {
        _this.handleZoomRequest(x, y, scale);
      });
      this.ee.on(EVENTS.LASSO_MODE_TOGGLED, function (isEnabled) {
        return _this.isLassoEnabled = isEnabled;
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.destroy();
      });
      this.zoom = zoom().filter(function (event) {
        return !_this.isLassoEnabled && !event.ctrlKey && !event.button;
      }) //Necessary to stop d3.zoom from grabbing the event.
      .scaleExtent(Env.SCALE_EXTENT).on("zoom", function (event) {
        select(_this.graphContainerElement).select("g").attr("transform", event.transform);
        if (_this.enableScaleGridOnZoom) {
          select(_this.graphContainerElement).select(".grid").attr("transform", event.transform);
        }
        if (_this.hideDetailsZoomScale) {
          if (event.transform.k < _this.hideDetailsZoomScale) {
            if (!_this.isDetailsHidden) {
              _this.graphContainerElement.style.setProperty("--virrvarr-content-display", "none");
              _this.isDetailsHidden = true;
            }
          } else {
            if (_this.isDetailsHidden) {
              _this.graphContainerElement.style.removeProperty("--virrvarr-content-display");
              _this.isDetailsHidden = false;
            }
          }
        }
      });
      if (this.enableZoomButtons) {
        this.initializeZoomButtons();
      } else {
        this.zoomButtonContainer = null;
      }
    }

    /**
     * Initializes the zoom controls in the bottom right corner.
     */
    _createClass(ZoomHandler, [{
      key: "initializeZoomButtons",
      value: function initializeZoomButtons() {
        var _this2 = this;
        this.zoomButtonContainer = select(this.graphContainerElement).append("div").attr("style", "position:relative;");
        var zoomButtons = this.zoomButtonContainer.append("svg").attr("filter", "drop-shadow(0px 0px 2px rgba(0, 0, 0, .5))").attr("style", "position:absolute;height:110px;width:34px;right:30px;bottom:30px;").append("g").attr("class", "virrvarr-zoom-controls").attr("style", "cursor:pointer;");
        zoomButtons.append("g").on("click", function () {
          _this2.scaleBy(1.5);
        }).attr("class", "virrvarr-zoom-in").attr("transform", "translate(0, 0)").append("defs").append("path").attr("id", "prefix__zoomin_a").attr("d", "M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6-9C8.99 2 11 4.01 11 6.5S8.99 11 6.5 11 2 8.99 2 6.5 4.01 2 6.5 2zM7 4H6v2H4v1h2v2h1V7h2V6H7V4z").select(function () {
          return this.parentNode;
        }).select(function () {
          return this.parentNode;
        }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
          return this.parentNode;
        }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__zoomin_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__zoomin_a").select(function () {
          return this.parentNode;
        }).select(function () {
          return this.parentNode;
        }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__zoomin_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
        zoomButtons.append("g").on("click", function () {
          _this2.scaleBy(1 / 1.5);
        }).attr("class", "virrvarr-zoom-out").attr("transform", "translate(0, 38)").append("defs").append("path").attr("id", "prefix__zoomout_a").attr("d", "M12.5 11h-.79l-.28-.27C12.41 9.59 13 8.11 13 6.5 13 2.91 10.09 0 6.5 0S0 2.91 0 6.5 2.91 13 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11zM4 6h5v1H4V6z").select(function () {
          return this.parentNode;
        }).select(function () {
          return this.parentNode;
        }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
          return this.parentNode;
        }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__zoomout_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__zoomout_a").select(function () {
          return this.parentNode;
        }).select(function () {
          return this.parentNode;
        }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__zoomout_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
        zoomButtons.append("g").on("click", function () {
          _this2.resetZoom();
        }).attr("class", "virrvarr-zoom-reset").attr("transform", "translate(0, 76)").append("defs").append("path").attr("id", "prefix__reset_a").attr("d", "M15 10c.552 0 1 .448 1 1v5h-5c-.552 0-1-.448-1-1s.448-1 1-1h3v-3c0-.552.448-1 1-1zM1 10c.552 0 1 .448 1 1v3h3c.552 0 1 .448 1 1s-.448 1-1 1H0v-5c0-.552.448-1 1-1zM16 0v5c0 .552-.448 1-1 1s-1-.448-1-1V2h-3c-.552 0-1-.448-1-1s.448-1 1-1h5zM5 0c.552 0 1 .448 1 1s-.448 1-1 1H2v3c0 .552-.448 1-1 1s-1-.448-1-1V0z").select(function () {
          return this.parentNode;
        }).select(function () {
          return this.parentNode;
        }).append("rect").attr("x", "2").attr("y", "2").attr("rx", "5").attr("ry", "5").attr("width", "30").attr("height", "30").attr("fill", "white").select(function () {
          return this.parentNode;
        }).append("g").attr("fill", "none").attr("fill-rule", "evenodd").attr("transform", "translate(9 9)").append("mask").attr("id", "prefix__reset_b").attr("fill", "#fff").append("use").attr("xedge:href", "#prefix__reset_a").select(function () {
          return this.parentNode;
        }).select(function () {
          return this.parentNode;
        }).append("g").attr("fill", "#666").attr("mask", "url(#prefix__reset_b)").append("path").attr("d", "M0 0H50V50H0z").attr("transform", "translate(-16 -16)");
      }
      /**
       * Set the zoom scale to a given number.
       * @param {number} scale - New scale
       */
    }, {
      key: "scaleTo",
      value: function scaleTo(scale) {
        this.zoom.scaleTo(select(this.graphContainerElement).select("svg"), scale);
      }
      /**
       * Scale the zoom by a given amount.
       * @param {number} ratio - Amount to scale by
       */
    }, {
      key: "scaleBy",
      value: function scaleBy(ratio) {
        this.zoom.scaleBy(select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME / 2), ratio);
      }
      /**
       * Reset the zoom (Zoom to fit).
       */
    }, {
      key: "resetZoom",
      value: function resetZoom() {
        var rootG = select(this.graphContainerElement).select("g");
        var currentTransformStr = rootG.attr("transform");
        var currentScale = currentTransformStr ? parseFloat(currentTransformStr.substring(currentTransformStr.indexOf("scale(") + 6, currentTransformStr.lastIndexOf(")"))) : 1;
        var parentWidth = this.graphContainerElement.clientWidth;
        var parentHeight = this.graphContainerElement.clientHeight;
        var width = (rootG.node().getBBox().width + Env.ZOOM_PADDING * 2) * currentScale;
        var height = (rootG.node().getBBox().height + Env.ZOOM_PADDING * 2) * currentScale;
        var widthRatio = parentWidth / width;
        var heightRatio = parentHeight / height;
        var newScale = Math.min(widthRatio, heightRatio);
        var midX = rootG.node().getBBox().x + rootG.node().getBBox().width / 2;
        var midY = rootG.node().getBBox().y + rootG.node().getBBox().height / 2;
        select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME / 4).call(this.zoom.scaleBy, newScale).transition().call(this.zoom.translateTo, midX, midY);
      }
      /**
       * Transforms the svg>g element to a specific translation and scale.
       * @param {number} x - New X coordinate
       * @param {number} y - New Y coordinate
       * @param {number} scale - New scale
       */
    }, {
      key: "zoomToCoordinates",
      value: function zoomToCoordinates(x, y, scale) {
        select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME).call(this.zoom.transform, identity.translate(x, y).scale(scale)).select("g").attr("transform", "translate(".concat(x, ",").concat(y, ")scale(").concat(scale, ")"));
      }
      /**
       * Handle an incoming zoom request.
       * @param {number?} x - New X coordinate
       * @param {number?} y - New Y coordinate
       * @param {number?} scale - New scale
       */
    }, {
      key: "handleZoomRequest",
      value: function handleZoomRequest(x, y, scale) {
        if ((x || x === 0) && (y || y === 0) && scale) {
          this.zoomToCoordinates(x, y, scale);
        } else {
          this.resetZoom();
        }
      }
      /**
       * Completely remove the zoom utility from the DOM.
       */
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.zoomButtonContainer) {
          this.zoomButtonContainer.remove();
        }
      }
    }]);
    return ZoomHandler;
  }();

  /**
   * The context menu class governs the custom context menu (right click menu)
   */
  var ContextMenu = /*#__PURE__*/function () {
    function ContextMenu(graphContainerElement, eventEmitter, options) {
      var _this = this;
      _classCallCheck(this, ContextMenu);
      this.enableBuiltinContextMenu = options.enableBuiltinContextMenu !== undefined ? options.enableBuiltinContextMenu : Env.SHOW_CONTEXT_MENU;
      this.customContextMenu = options.customContextMenu !== undefined ? options.customContextMenu : Env.DEFAULT_CUSTOM_CONTEXT_MENU;
      this.graphContainerElement = graphContainerElement;
      this.ee = eventEmitter;
      if (this.enableBuiltinContextMenu || this.customContextMenu) {
        if (!this.pointerEvent) {
          this.graphContainerElement.addEventListener("mousemove", function (event) {
            _this.pointerEvent = event;
          });
        }
        this.ee.on(EVENTS.RIGHT_CLICK_ENTITY, function (clickedItem) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          _this.buildMenu(clickedItem, direction);
        });
        this.ee.on(EVENTS.CLICK_ENTITY, function () {
          _this.removeContextmenu();
        });
        this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
          return _this.removeContextmenu();
        });
      }
      this.InitializeMenuSections();
    }

    /**
     * Generates and positions a context menu.
     * @param {object|null} item - Node, Edge, or "null" (canvas) that has been clicked
     * @param {string?} direction - The direction of the edge clicked (if applicable)
     */
    _createClass(ContextMenu, [{
      key: "buildMenu",
      value: function buildMenu(item, direction) {
        if (!this.pointerEvent) {
          return;
        }
        var coordinates = pointer(this.pointerEvent, document.body);
        var mouseX = coordinates[0];
        var mouseY = coordinates[1];
        if (item === null) {
          this.createCanvasContextMenu(null, mouseX, mouseY);
        } else if (!direction) {
          this.createNodeContextMenu(item, mouseX, mouseY);
        } else {
          this.createEdgeContextMenu(item, mouseX, mouseY, direction);
        }
      }
      /**
       * Creates a custom floating menu on the screen using the given input
       * @param {object|null} clickedItem - Node, Edge, or "null" (canvas) that has been clicked
       * @param {object[]} contextSectionsArray - Default menu items
       * @param {object[]} customSectionsArray - User provided menu items
       * @param {number} mouseX - Mouse X coordinate
       * @param {number} mouseY - Mouse Y coordinate
       * @param {string?} direction The direction of the edge clicked (if applicable)
       */
    }, {
      key: "createContextMenu",
      value: function createContextMenu(clickedItem, contextSectionsArray, customSectionsArray, mouseX, mouseY) {
        var _this2 = this;
        var direction = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
        mouseY = mouseY - window.scrollY;
        mouseX = mouseX - window.scrollX;
        this.removeContextmenu();
        if (!this.enableBuiltinContextMenu && customSectionsArray.length === 0) {
          return;
        }
        var mainDiv = select(this.graphContainerElement).append("div").attr("id", "virrvarr-context-menu-container").attr("class", "virrvarr-context-menu").style("position", "fixed").style("display", "block");
        var ulElement = mainDiv.append("ul").attr("class", "virrvarr-context-menu-options");
        var addItems = function addItems(left, top) {
          var previousSectionWasSeen = false;
          if (_this2.enableBuiltinContextMenu) {
            contextSectionsArray.forEach(function (section) {
              _this2.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction, left, top);
              previousSectionWasSeen = true;
            });
          }
          customSectionsArray.forEach(function (section) {
            _this2.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction, left, top);
            previousSectionWasSeen = true;
          });
        };
        addItems(0, 0);
        var divNode = mainDiv.node();
        var width = divNode.getBoundingClientRect().width;
        var height = divNode.getBoundingClientRect().height;
        var left = window.innerWidth - mouseX < width ? window.innerWidth - width : mouseX;
        var top = window.innerHeight - mouseY < height ? window.innerHeight - height : mouseY;
        mainDiv.style("left", left + "px").style("top", top + "px");
        ulElement.node().innerHTML = "";
        //The reason for doing this twice is because we need to know the full height in order to ensure the menu does not overflow the viewport.
        addItems(left, top);
      }
      /**
       * Creates a sub menu for the context menu
       * @param {object|null} clickedItem - Node, Edge, or "null" (canvas) that has been clicked
       * @param {object[]} sections - User provided menu items
       * @param {string?} direction The direction of the edge clicked (if applicable)
       * @param {number} startX - Start X coordinate
       * @param {number} startY - Start Y coordinate
       */
    }, {
      key: "createSubMenu",
      value: function createSubMenu(parent, clickedItem, sections) {
        var _this3 = this;
        var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
        var startX = arguments.length > 4 ? arguments[4] : undefined;
        var startY = arguments.length > 5 ? arguments[5] : undefined;
        var mainDiv = parent.append("div").attr("class", "virrvarr-context-menu").style("position", "fixed");
        var ulElement = mainDiv.append("ul").attr("class", "virrvarr-context-menu-options");
        var addItems = function addItems(left, top) {
          var previousSectionWasSeen = false;
          sections.forEach(function (section) {
            _this3.processSection(ulElement, section, previousSectionWasSeen, clickedItem, direction, left, top);
            previousSectionWasSeen = true;
          });
        };
        addItems();
        var parentNode = parent.node();
        var offsetTop = parentNode.offsetTop;
        var offsetLeft = parentNode.getBoundingClientRect().width;
        var relativeStartX = startX + offsetLeft;
        var relativeStartY = startY + offsetTop - 6; //6 is the top and bottom margin for the menu. If it is changed then this part must be changed as well
        var divNode = mainDiv.node();
        var width = divNode.getBoundingClientRect().width;
        var height = divNode.getBoundingClientRect().height;
        var left = window.innerWidth - relativeStartX < width ? window.innerWidth - width : relativeStartX;
        var top = window.innerHeight - relativeStartY < height ? window.innerHeight - height : relativeStartY;
        mainDiv.style("left", left + "px").style("top", top + "px");
        ulElement.node().innerHTML = "";
        addItems(left, top);
        mainDiv.style("display", "none");
      }
      /**
       * Processes and creates a specific section of the context menu.
       * @param {HTMLElement} ul - The entire menu
       * @param {object[]} section - Array of menu items to be added
       * @param {boolean} shouldAddSeparatorBefore - Add a separating line before this new section?
       * @param {object|null} clickedItem - Item that was clicked
       * @param {string?} direction - Direction of the clicked edge, if applicable.
       * @param {number} startX - Start X coordinate.
       * @param {number} startY - Start Y coordinate.
       */
    }, {
      key: "processSection",
      value: function processSection(ul, section, shouldAddSeparatorBefore, clickedItem) {
        var _this4 = this;
        var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
        var startX = arguments.length > 5 ? arguments[5] : undefined;
        var startY = arguments.length > 6 ? arguments[6] : undefined;
        if (shouldAddSeparatorBefore) {
          ul.append("li").append("div").attr("class", "virrvarr-context-menu-divider");
        }
        var MenuItemContainers = section.map(function (menuItem) {
          var mainContainer = ul.append("li").append("div").attr("class", "virrvarr-context-menu-option").classed("virrvarr-context-menu-option-disabled", menuItem.disabled);
          if (!menuItem.disabled) {
            mainContainer.on("click", function () {
              _this4.removeContextmenu();
              var data = clickedItem && clickedItem.data || null;
              var id = clickedItem && clickedItem.id || null;
              var edgeDirection = direction;
              typeof menuItem.action === "function" ? menuItem.action(data, id, edgeDirection) : null;
            });
          }
          if (menuItem.icon) {
            mainContainer.append("div").attr("class", "virrvarr-context-menu-option-icon").style("background-image", "url(\"".concat(menuItem.icon, "\")"));
          }
          mainContainer.append("div").attr("class", "virrvarr-context-menu-option-title").classed("virrvarr-context-menu-option-title-disabled", menuItem.disabled).text(function () {
            return menuItem.label;
          });
          return mainContainer;
        });
        section.forEach(function (menuItem, index) {
          if (menuItem.children) {
            var mainContainer = MenuItemContainers[index];
            var arrowIconContainer = mainContainer.append("div").attr("class", "virrvarr-context-menu-option-icon");
            arrowIconContainer.style("background-image", "url(\"data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path d='M3.70710678,4.29289322 C3.31658249,3.90236893 2.68341751,3.90236893 2.29289322,4.29289322 C1.90236893,4.68341751 1.90236893,5.31658249 2.29289322,5.70710678 L8,11.4142136 L13.7071068,5.70710678 C14.0976311,5.31658249 14.0976311,4.68341751 13.7071068,4.29289322 C13.3165825,3.90236893 12.6834175,3.90236893 12.2928932,4.29289322 L8,8.58578644 L3.70710678,4.29289322 Z' transform='translate(8.000000, 7.707107) rotate(-90.000000) translate(-8.000000, -7.707107) '/></svg>\")");
            _this4.createSubMenu(mainContainer, clickedItem, menuItem.children, direction = undefined, startX, startY);
          }
        });
      }
      /**
       * Create a node context menu
       * @param {object} clickedItem - Clicked node
       * @param {number} mouseX - Mouse X coordinate
       * @param {number} mouseY - Mouse Y coordinate
       */
    }, {
      key: "createNodeContextMenu",
      value: function createNodeContextMenu(clickedItem, mouseX, mouseY) {
        var sections = [this.NodeMenu, this.UniversalMenu];
        var customSections = [];
        if (this.customContextMenu.node && typeof this.customContextMenu.node === "function") {
          customSections = this.customContextMenu.node(clickedItem.data, clickedItem.id);
        }
        this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY);
      }
      /**
       * Create an edge context menu
       * @param {object|null} clickedItem - Clicked edge
       * @param {number} mouseX - Mouse X coordinate
       * @param {number} mouseY - Mouse Y coordinate
       * @param {string} direction - Direction of the edge
       */
    }, {
      key: "createEdgeContextMenu",
      value: function createEdgeContextMenu(clickedItem, mouseX, mouseY, direction) {
        var sections = [this.EdgeMenu, this.UniversalMenu];
        var customSections = [];
        if (this.customContextMenu.edge && typeof this.customContextMenu.edge === "function") {
          customSections = this.customContextMenu.edge(clickedItem.data, clickedItem.id, direction);
        }
        this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY, direction);
      }
      /**
       * Create a canvas context menu
       * @param {null} clickedItem - Clicked canvas
       * @param {number} mouseX - Mouse X coordinate
       * @param {number} mouseY - Mouse Y coordinate
       */
    }, {
      key: "createCanvasContextMenu",
      value: function createCanvasContextMenu(clickedItem, mouseX, mouseY) {
        var sections = [this.UniversalMenu];
        var customSections = [];
        if (this.customContextMenu.canvas && typeof this.customContextMenu.canvas === "function") {
          customSections = this.customContextMenu.canvas();
        }
        this.createContextMenu(clickedItem, sections, customSections, mouseX, mouseY);
      }
      /**
       * Removes the current floating menu
       */
    }, {
      key: "removeContextmenu",
      value: function removeContextmenu() {
        select(this.graphContainerElement).select("#virrvarr-context-menu-container").remove();
      }
      /**
       * Initializes the menu sections
       */
    }, {
      key: "InitializeMenuSections",
      value: function InitializeMenuSections() {
        var _this5 = this;
        this.NodeMenu = [{
          label: "Select Node",
          icon: "data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill='%23000000' d='M14,0 C15.1045695,0 16,0.8954305 16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z M14,2 L2,2 L2,14 L14,14 L14,2 Z M10.2928932,5.29289322 C10.6834175,4.90236893 11.3165825,4.90236893 11.7071068,5.29289322 C12.0976311,5.68341751 12.0976311,6.31658249 11.7071068,6.70710678 L11.7071068,6.70710678 L7,11.4142136 L4.29289322,8.70710678 C3.90236893,8.31658249 3.90236893,7.68341751 4.29289322,7.29289322 C4.68341751,6.90236893 5.31658249,6.90236893 5.70710678,7.29289322 L5.70710678,7.29289322 L7,8.58578644 Z' /></svg>",
          action: function action(data, id) {
            _this5.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: id,
              data: data
            });
          }
        }];
        this.EdgeMenu = [{
          label: "Select Edge",
          icon: "data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill='%23000000' d='M14,0 C15.1045695,0 16,0.8954305 16,2 L16,14 C16,15.1045695 15.1045695,16 14,16 L2,16 C0.8954305,16 0,15.1045695 0,14 L0,2 C0,0.8954305 0.8954305,0 2,0 L14,0 Z M14,2 L2,2 L2,14 L14,14 L14,2 Z M10.2928932,5.29289322 C10.6834175,4.90236893 11.3165825,4.90236893 11.7071068,5.29289322 C12.0976311,5.68341751 12.0976311,6.31658249 11.7071068,6.70710678 L11.7071068,6.70710678 L7,11.4142136 L4.29289322,8.70710678 C3.90236893,8.31658249 3.90236893,7.68341751 4.29289322,7.29289322 C4.68341751,6.90236893 5.31658249,6.90236893 5.70710678,7.29289322 L5.70710678,7.29289322 L7,8.58578644 Z' /></svg>",
          action: function action(data, id, edgeDirection) {
            _this5.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: id,
              data: data,
              direction: edgeDirection
            });
          }
        }];
        this.UniversalMenu = [{
          label: "Reset Zoom",
          icon: "data:image/svg+xml;utf8,<svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><path fill='%23000000' d='M15,10 C15.5522847,10 16,10.4477153 16,11 L16,11 L16,16 L11,16 C10.4477153,16 10,15.5522847 10,15 C10,14.4477153 10.4477153,14 11,14 L11,14 L14,14 L14,11 C14,10.4477153 14.4477153,10 15,10 Z M1,10 C1.55228475,10 2,10.4477153 2,11 L2,11 L2,14 L5,14 C5.55228475,14 6,14.4477153 6,15 C6,15.5522847 5.55228475,16 5,16 L5,16 L0,16 L8.8817842e-16,11 C8.8817842e-16,10.4477153 0.44771525,10 1,10 Z M16,0 L16,5 C16,5.55228475 15.5522847,6 15,6 C14.4477153,6 14,5.55228475 14,5 L14,5 L14,2 L11,2 C10.4477153,2 10,1.55228475 10,1 C10,0.44771525 10.4477153,0 11,0 L11,0 L16,0 Z M5,0 C5.55228475,0 6,0.44771525 6,1 C6,1.55228475 5.55228475,2 5,2 L5,2 L2,2 L2,5 C2,5.55228475 1.55228475,6 1,6 C0.44771525,6 2.74146524e-17,5.55228475 6.123234e-17,5 L6.123234e-17,5 L3.6739404e-16,0 Z' /></svg>",
          action: function action() {
            _this5.ee.trigger(EVENTS.ZOOM_REQUESTED);
          }
        }];
      }
    }]);
    return ContextMenu;
  }();

  /**
   * Writes user defined styles as CSS classes to the DOM dynamically.
   * @param {object} style - User provided styles parameters
   * @param {string} id - ID of the UI-class of this Virrvarr instance
   */
  var initializeGraphStyles = function initializeGraphStyles() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var styleID = arguments.length > 1 ? arguments[1] : undefined;
    var graphContainer = arguments.length > 2 ? arguments[2] : undefined;
    var cssString = "";
    cssString = /*css*/"\n                /* Global */\n                svg {\n                    display: block;\n                }\n\n                .virrvarr * {\n                    transition: fill 0.1s, opacity 0.1s;\n                    user-select: none;\n                }\n                \n                .virrvarr {\n                    cursor: ".concat(style.common && style.common.canvasCursor ? style.common.canvasCursor : Env.DEFAULT_CANVAS_CURSOR, ";\n                }\n                .virrvarr:active {\n                    cursor: ").concat(style.common && style.common.canvasCursorActive ? style.common.canvasCursorActive : style.common && style.common.canvasCursor ? style.common.canvasCursor : Env.DEFAULT_CANVAS_CURSOR, ";\n                }\n\n                /* Text */\n                .virrvarr .multiplicity {\n                    font-size: ").concat(Env.DEFAULT_MULTIPLICITY_FONT_SIZE, ";\n                }     \n\n                /* Lasso */\n                #selection-lasso {\n                    background: ").concat(style.common && style.common.selectionLassoColor ? style.common.selectionLassoColor : Env.SELECTION_LASSO_COLOR, ";\n                    opacity: ").concat(style.common && style.common.selectionLassoOpacity ? style.common.selectionLassoOpacity : Env.SELECTION_LASSO_OPACITY, ";\n                    border-width: ").concat(style.common && style.common.selectionLassoBorderWidth ? style.common.selectionLassoBorderWidth : Env.SELECTION_LASSO_BORDER_WIDTH, ";\n                    border-color: ").concat(style.common && style.common.selectionLassoBorderColor ? style.common.selectionLassoBorderColor : Env.SELECTION_LASSO_COLOR, ";\n                    border-style: solid;\n                    position: fixed;\n                    display: none;\n                    pointer-events: none;\n                }\n\n                /* Tooltip */\n                #virrvarr-tooltip {\n                  position: absolute;\n                  display: none;\n                  min-width: ").concat(Env.TOOLTIP_MIN_WIDTH, ";\n                  background: ").concat(Env.TOOLTIP_BACKGROUND, ";\n                  opacity: 0.8;\n                  color: ").concat(Env.TOOLTIP_COLOR, ";\n                  padding: 10px;\n                  text-align: center;\n                  max-width: ").concat(Env.TOOLTIP_MAX_WIDTH, ";\n                  word-wrap: break-word;\n                  font-size: 14px;\n                  border-radius: ").concat(Env.TOOLTIP_BORDER_RADIUS, ";\n                }\n\n                /* Context Menu Styles */\n                /* This is a rule for all paths unless specified otherwise */\n                .virrvarr path {\n                  stroke: #000;\n                  stroke-width: 2px;\n                }\n                \n                .virrvarr-context-menu {\n                  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);\n                  position: relative;\n                  display: block;\n                  background: #FFFFFF;\n                  border-radius: 4px;\n                }\n                \n                .virrvarr-context-menu-options {\n                  min-width: 150px;\n                  list-style: none;\n                  padding: 0px;\n                  margin-top: 6px;\n                  margin-bottom: 6px;\n                }\n\n                .virrvarr-context-menu-option:hover>.virrvarr-context-menu {\n                    display: block !important;\n                }\n                \n                .virrvarr-context-menu-option {\n                  font-size: 12px;\n                  padding: 7px 16px 7px 16px;\n                  cursor: pointer;\n                  display: flex;\n                  gap: 12px;\n                  align-items: center;\n                }\n\n                .virrvarr-context-menu-option-icon {\n                    height: 12px;\n                    width: 12px;\n                    min-height: 12px;\n                    min-width: 12px;\n                    background-repeat: no-repeat;\n                    background-size: contain;\n                    background-image: none;                \n                }\n\n                .virrvarr-context-menu-option-title {\n                    flex: auto;\n                    white-space: nowrap;\n                }\n                \n                .virrvarr-context-menu-option-title-disabled {\n                    color: #9b9b9b;\n                    user-select: none;\n                }\n                \n                .virrvarr-context-menu-divider {\n                  width: 100%;\n                  margin-top: 6px;\n                  margin-bottom: 6px;\n                  border-top: 1px solid #d5d5d5;\n                }\n                \n                .virrvarr-context-menu-option:hover {\n                  background: #f7f7f7;\n                }\n\n                .virrvarr-context-menu-option-disabled:hover {\n                    background: initial;\n                    cursor: default;\n                }\n                \n                .virrvarr-node-badge {\n                  fill: #505759;\n                  stroke: none !important;\n                }\n                \n\t\t\t    .virrvarr-floating-node-meta {\n                    display: ").concat(style.common.hideNodeBadgesOnNoHover ? "none" : "var(--virrvarr-content-display, block)", " !important;\n                }\n\n                .node:hover .virrvarr-floating-node-meta {\n                    display: ").concat(style.common.hideNodeBadgesOnNoHover ? "block" : "var(--virrvarr-content-display, block)", " !important;\n                }\n                \n                .virrvarr-node-edge-counter-badge-text {\n                  dominant-baseline: central;\n                  text-anchor: middle;\n                  fill: white;\n                }\n                \n                /* Search Highlighting */\n                .virrvarr .highlighted-node {\n                  stroke-width: ").concat(Env.HIGHLIGHTING_BORDER_WIDTH, ";\n                  stroke: ").concat(Env.HIGHLIGHTING_BORDER_COLOR, ";\n                  fill: ").concat(Env.HIGHLIGHTING_COLOR, ";\n                  opacity: 0.3;\n                  pointer-events: none;\n                }\n\n                .virrvarr .disabled {\n                    opacity: ").concat(Env.DEFAULT_FADE_OPACITY, ";\n                    pointer-events: none;\n                }\n\n                .virrvarr g #node-container .node g,\n                .virrvarr g #node-container .node image,\n                .virrvarr g #label-container .label g {\n                    display: var(--virrvarr-content-display, block);\n                }\n\n                /* Default edge style */\n                .edge-path-default{\n                    fill: none;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, " !important;\n                    stroke-dasharray: ").concat(Env.DEFAULT_EDGE_DASHARRAY, " !important;\n                    stroke: ").concat(Env.DEFAULT_EDGE_COLOR, " !important;\n                }\n                .edge-path-default.hovered{\n                    stroke: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                }\n                .edge-path-default.focused{\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n                \n                .label-rect-default{\n                    cursor: ").concat(style.common && style.common.edgeCursor ? style.common.edgeCursor : Env.DEFAULT_EDGE_CURSOR, ";\n                    fill: ").concat(Env.DEFAULT_LABEL_BACKGROUND_COLOR, ";\n                    rx: ").concat(Env.DEFAULT_LABEL_BORDER_RADIUS_X, ";\n                    ry: ").concat(Env.DEFAULT_LABEL_BORDER_RADIUS_Y, ";\n                    stroke: ").concat(Env.DEFAULT_LABEL_BORDER_COLOR, " !important;\n                    stroke-width: ").concat(Env.DEFAULT_LABEL_BORDER_WIDTH, " !important; \n                }\n                .label-rect-default:active {\n                    cursor: ").concat(style.common && style.common.edgeCursorActive ? style.common.edgeCursorActive : style.common && style.common.edgeCursor ? style.common.edgeCursor : Env.DEFAULT_EDGE_CURSOR, ";\n                }\n                .label-rect-default:hover{\n                    fill: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, ";\n                }\n\n                .label g .label-rect-default.focused {\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n\n                .label-text-default{\n                    fill: ").concat(Env.DEFAULT_LABEL_TEXT_COLOR, ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                }\n                .to:hover .label-text-default,\n                .from:hover .label-text-default{\n                    fill: ").concat(Env.DEFAULT_LABEL_TEXT_HOVER_COLOR, ";\n                }\n                \n                .marker-default path{\n                    fill: ").concat(Env.DEFAULT_EDGE_COLOR, ";\n                }\n                .marker-default *.hovered{\n                    stroke: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    fill: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                }\n                .marker-default *.focused{\n                    fill: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n\n                .node, .edge, .multiplicity {\n                    animation: fadeInFromNone 0.2s ease-out;\n                }\n\n                @keyframes fadeInFromNone {\n                    0% {\n                        opacity: 0;\n                    }\n                    100% {\n                        opacity: 1;\n                    }\n                }\n\n                /* Default node values */\n                .node-default {\n                    cursor: ").concat(style.common && style.common.nodeCursor ? style.common.nodeCursor : Env.DEFAULT_NODE_CURSOR, ";\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, ";\n                    stroke: ").concat(Env.DEFAULT_NODE_STROKE_COLOR, ";\n                    fill: ").concat(Env.DEFAULT_NODE_COLOR, ";\n                    stroke-dasharray: 0;\n                    rx: ").concat(Env.DEFAULT_NODE_BORDER_RADIUS_X, ";\n                    ry: ").concat(Env.DEFAULT_NODE_BORDER_RADIUS_Y, ";\n                }\n                .node-default:hover {\n                    fill: ").concat(Env.DEFAULT_NODE_HOVER_COLOR, ";\n                }\n                .node-default:active {\n                    cursor: ").concat(style.common && style.common.nodeCursorActive ? style.common.nodeCursorActive : style.common && style.common.nodeCursor ? style.common.nodeCursor : Env.DEFAULT_NODE_CURSOR, ";\n                }\n\n                .node-text-default {\n                    dominant-baseline: hanging;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                    fill: ").concat(Env.DEFAULT_NODE_TEXT_COLOR, ";\n                }\n                .node:hover .node-text-default {\n                    fill: ").concat(Env.DEFAULT_NODE_TEXT_HOVER_COLOR, ";\n                }\n                .virrvarr .node-default.focused {\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                }\n                ");
    if (style && style.nodes) {
      style.nodes.forEach(function (nodeType) {
        cssString = "\n                ".concat(cssString, "\n                .node-").concat(nodeType.id, " {\n                    cursor: ").concat(style.common && style.common.nodeCursor ? style.common.nodeCursor : Env.DEFAULT_NODE_CURSOR, ";\n                    ").concat(nodeType.borderWidth ? "stroke-width:".concat(nodeType.borderWidth, ";") : "", "\n                    ").concat(nodeType.borderColor ? "stroke:".concat(nodeType.borderColor, ";") : "", "\n                    ").concat(nodeType.backgroundColor ? "fill:".concat(nodeType.backgroundColor, ";") : "", "\n                    ").concat(nodeType.dotted ? "stroke-dasharray:".concat(Env.DEFAULT_NODE_DOTTED_DASHARRAY, ";") : "", "\n                    ").concat(nodeType.borderRadiusX ? "rx:".concat(nodeType.borderRadiusX, ";") : "", "\n                    ").concat(nodeType.borderRadiusY ? "ry:".concat(nodeType.borderRadiusY, ";") : "", "\n                    ").concat(nodeType.filter ? "filter:".concat(nodeType.filter, ";") : "", "\n                }\n                .node-").concat(nodeType.id, ":hover {\n                    ").concat(nodeType.borderHoverWidth ? "stroke-width:".concat(nodeType.borderHoverWidth, ";") : "", "\n                    ").concat(nodeType.borderHoverColor ? "stroke:".concat(nodeType.borderHoverColor, ";") : "", "\n                    ").concat(nodeType.backgroundHoverColor ? "fill:".concat(nodeType.backgroundHoverColor, ";") : "", "\n                    ").concat(nodeType.hoverFilter ? "filter:".concat(nodeType.hoverFilter, ";") : "", "                    \n                }\n                .node-").concat(nodeType.id, ":active {\n                    cursor: ").concat(style.common && style.common.nodeCursorActive ? style.common.nodeCursorActive : style.common && style.common.nodeCursor ? style.common.nodeCursor : Env.DEFAULT_NODE_CURSOR, ";\n                }\n\n                .node-text-").concat(nodeType.id, " {\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                    dominant-baseline: hanging;\n                    pointer-events: none;\n                    ").concat(nodeType.textColor ? "fill:".concat(nodeType.textColor, ";") : "", ";\n                }\n                .node:hover .node-text-").concat(nodeType.id, " {\n                    ").concat(nodeType.textHoverColor ? "fill:".concat(nodeType.textHoverColor, ";") : "", "\n                }\n                .virrvarr .node-").concat(nodeType.id, ".focused {\n                    ").concat(nodeType.borderFocusedWidth ? "stroke-width:".concat(nodeType.borderFocusedWidth, ";") : "", "\n                    ").concat(nodeType.borderFocusedColor ? "stroke:".concat(nodeType.borderFocusedColor, " !important;") : "", "\n                    ").concat(nodeType.backgroundFocusedColor ? "fill:".concat(nodeType.backgroundFocusedColor, ";") : "", "\n                    ").concat(nodeType.focusedFilter ? "filter:".concat(nodeType.focusedFilter, " !important;") : "", "\n                }\n                .virrvarr .node-").concat(nodeType.id, ".focused:hover {\n                    ").concat(nodeType.borderFocusedHoverColor ? "stroke:".concat(nodeType.borderFocusedHoverColor, " !important;") : "", "\n                    ").concat(nodeType.backgroundFocusedHoverColor ? "fill:".concat(nodeType.backgroundFocusedHoverColor, ";") : "", "\n                    ").concat(nodeType.focusedHoverFilter ? "filter:".concat(nodeType.focusedHoverFilter, " !important;") : "", "\n                }\n                .virrvarr .node-").concat(nodeType.id, ".focused .node-text-").concat(nodeType.id, " {\n                    ").concat(nodeType.textFocusedColor ? "fill:".concat(nodeType.textFocusedColor, ";") : "", "\n                }\n                .virrvarr .node-").concat(nodeType.id, ".focused:hover .node-text-").concat(nodeType.id, " {\n                    ").concat(nodeType.textFocusedHoverColor ? "fill:".concat(nodeType.textFocusedHoverColor, ";") : "", "\n                }\n                ");
      });
    }
    if (style && style.edges) {
      style.edges.forEach(function (edgeType) {
        cssString = "\n                ".concat(cssString, "\n                .edge-path-").concat(edgeType.id, "{\n                    fill: none !important;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, " !important;\n                    stroke-dasharray: ").concat(edgeType.dotted ? Env.DEFAULT_EDGE_DOTTED_DASHARRAY : Env.DEFAULT_EDGE_DASHARRAY, " !important;\n                    ").concat(edgeType.color ? "stroke:".concat(edgeType.color, " !important;") : "", "\n                }\n                .edge-path-").concat(edgeType.id, ".hovered{\n                    ").concat(edgeType.hoverColor ? "stroke:".concat(edgeType.hoverColor, " !important;") : "", "\n                }\n                .edge-path-").concat(edgeType.id, ".focused{\n                    ").concat(edgeType.focusedColor ? "stroke:".concat(edgeType.focusedColor, " !important;") : "", "\n                } \n                .edge-path-").concat(edgeType.id, ".focused.hovered{\n                    ").concat(edgeType.focusedHoverColor ? "stroke:".concat(edgeType.focusedHoverColor, " !important;") : "", "\n                } \n                .label-rect-").concat(edgeType.id, "{\n                    cursor: ").concat(style.common && style.common.edgeCursor ? style.common.edgeCursor : Env.DEFAULT_EDGE_CURSOR, ";\n                    ").concat(edgeType.labelBackgroundColor ? "fill:".concat(edgeType.labelBackgroundColor, ";") : "", "\n                    ").concat(edgeType.borderRadiusX ? "rx:".concat(edgeType.borderRadiusX, ";") : "", "\n                    ").concat(edgeType.borderRadiusY ? "ry:".concat(edgeType.borderRadiusY, ";") : "", "\n                    ").concat(edgeType.labelBorderColor ? "stroke:".concat(edgeType.labelBorderColor, ";") : "", "\n                    ").concat(edgeType.labelBorderWidth ? "stroke-width: ".concat(edgeType.labelBorderWidth, ";") : "", " \n                    ").concat(edgeType.filter ? "filter:".concat(edgeType.filter, ";") : "", "\n                }\n                .label-rect-").concat(edgeType.id, ":hover{\n                    ").concat(edgeType.hoverColor ? "fill:".concat(edgeType.hoverColor, ";") : "", "\n                    ").concat(edgeType.labelHoverBorderColor ? "stroke:".concat(edgeType.labelHoverBorderColor, " !important;") : "", "\n                    ").concat(edgeType.labelHoverBorderWidth ? "stroke-width:".concat(edgeType.labelHoverBorderWidth, " !important;") : "", "\n                    ").concat(edgeType.hoverFilter ? "filter:".concat(edgeType.hoverFilter, ";") : "", "\n                }\n                .label-rect-").concat(edgeType.id, ":active{\n                    cursor: ").concat(style.common && style.common.edgeCursorActive ? style.common.edgeCursorActive : style.common && style.common.edgeCursor ? style.common.edgeCursor : Env.DEFAULT_EDGE_CURSOR, ";\n                }\n\n                .label g .label-rect-").concat(edgeType.id, ".focused {\n                    ").concat(edgeType.labelFocusedBorderWidth ? "stroke-width:".concat(edgeType.labelFocusedBorderWidth, " !important;") : "", "\n                    ").concat(edgeType.focusedColor ? "stroke:".concat(edgeType.focusedColor, ";") : "", "\n                    ").concat(edgeType.focusedFilter ? "filter:".concat(edgeType.focusedFilter, " !important;") : "", "\n                    ").concat(edgeType.labelFocusedBorderColor ? "stroke:".concat(edgeType.labelFocusedBorderColor, " !important;") : "", "\n                }\n                .label g .label-rect-").concat(edgeType.id, ".focused:hover {\n                    ").concat(edgeType.focusedHoverColor ? "stroke:".concat(edgeType.focusedHoverColor, ";") : "", "\n                    ").concat(edgeType.focusedHoverFilter ? "filter:".concat(edgeType.focusedHoverFilter, " !important;") : "", "\n                    ").concat(edgeType.labelFocusedHoverBorderColor ? "stroke:".concat(edgeType.labelFocusedHoverBorderColor, " !important;") : "", "\n                }\n                .label-text-").concat(edgeType.id, "{\n                    ").concat(edgeType.labelTextColor ? "fill:".concat(edgeType.labelTextColor, ";") : "", ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                }\n                .to:hover .label-text-").concat(edgeType.id, ",\n                .from:hover .label-text-").concat(edgeType.id, "{\n                    ").concat(edgeType.labelTextHoverColor ? "fill:".concat(edgeType.labelTextHoverColor, ";") : "", "\n                }\n                .marker-").concat(edgeType.id, " path{\n                    ").concat(edgeType.arrowColor ? "fill:".concat(edgeType.arrowColor, ";") : "", "\n                }\n                .marker-").concat(edgeType.id, " *.hovered{\n                    ").concat(edgeType.hoverColor ? "stroke:".concat(edgeType.hoverColor, ";") : "", "\n                    ").concat(edgeType.hoverColor ? "fill:".concat(edgeType.hoverColor, ";") : "", "\n                }\n                .marker-").concat(edgeType.id, " *.focused{\n                    ").concat(edgeType.focusedColor ? "fill:".concat(edgeType.focusedColor, ";") : "", "\n                    ").concat(edgeType.focusedColor ? "stroke:".concat(edgeType.focusedColor, ";") : "", "\n                }\n                .marker-").concat(edgeType.id, " *.focused.hovered{\n                    ").concat(edgeType.focusedHoverColor ? "fill:".concat(edgeType.focusedHoverColor, ";") : "", "\n                    ").concat(edgeType.focusedHoverColor ? "stroke:".concat(edgeType.focusedHoverColor, ";") : "", "\n                }\n                ");
      });
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.id = styleID;
    css.appendChild(document.createTextNode(cssString));
    graphContainer.appendChild(css);
  };
  var tween = function tween(element, property, initialValue, target, startTime, animationTime, setter) {
    var deltaTime = Date.now() - startTime;
    if (deltaTime > animationTime) {
      element.style.removeProperty(property);
      return;
    }
    var percentOfAnimation = deltaTime / animationTime;
    var tweenedValue = initialValue + (target - initialValue) * percentOfAnimation;
    var newValue = setter ? setter(tweenedValue) : tweenedValue;
    element.style[property] = newValue;
    setTimeout(function () {
      return tween(element, property, initialValue, target, startTime, animationTime, setter);
    }, 1);
  };
  var CSSUtil = {
    initializeGraphStyles: initializeGraphStyles,
    tween: tween
  };

  /**
   * The Highlighter class handles highlighting of nodes in the graph.
   * This includes both highlighting on selections as well as highlighting on search.
   */
  var Highlighter = /*#__PURE__*/function () {
    /**
     * @param {HTMLElement} graphContainerElement
     * @param {EventEmitter} eventEmitter
     * @param {object} userDefinedOptions
     */
    function Highlighter(graphContainerElement, eventEmitter, userDefinedOptions) {
      var _this = this;
      _classCallCheck(this, Highlighter);
      this.graphContainerElement = graphContainerElement;
      this.ee = eventEmitter;
      this.currentSelection = []; //This speeds things up, since we don't need to reevaluate on every selection
      this.isLassoActive = false;
      this.ee.on(EVENTS.HIGHLIGHT_NODE_REQUESTED, function (nodes) {
        _this.highlightNode(nodes.map(function (node) {
          return node.id;
        }));
      });
      this.ee.on(EVENTS.DISABLE_NODES_REQUESTED, function (nodeIDs) {
        _this.disableNodes(nodeIDs);
      });
      this.ee.on(EVENTS.CLEAR_DISABLE_NODES_REQUESTED, function () {
        _this.clearDisabled();
      });
      this.ee.on(EVENTS.SELECTION_UPDATED, function (newSelection) {
        return _this.handleEntitySelection(newSelection);
      });
      this.ee.on(EVENTS.LASSO_MODE_TOGGLED, function (isEnabled) {
        return _this.isLassoActive = isEnabled;
      });
      this.ee.on(EVENTS.HOVER_ENTITY, function (data) {
        if (_this.enableOnionOnHover) {
          if (!_this.enableEdgeOnion && data.direction) {
            return;
          }
          var nodeElementNode = select(_this.graphContainerElement).select("[id='".concat(data.id, "']"));
          //If an edge label has been hovered then it then we have to dig a bit more:
          var nodeElementLabel = select(_this.graphContainerElement).select("[id='label".concat(data.id).concat(data.direction, "']")).select("rect:not(.removing):not(.onion-clone)[class*='label-rect']");
          var nodeElement = nodeElementNode.node() ? nodeElementNode : nodeElementLabel.node() ? nodeElementLabel : null;
          if (nodeElement) {
            var DOMElement = nodeElement.node();
            if (!(_this.enableOnionOnFocus && DOMElement.classList.contains("focused"))) {
              _this.toggleOnionBorder(DOMElement, _this.onionLayerSize, _this.onionBaseColor, _this.onionNumberOfLayers);
            }
          }
        }
      });
      this.enableOnionOnFocus = typeof userDefinedOptions.enableOnionOnFocus === "boolean" ? userDefinedOptions.enableOnionOnFocus : Env.ENABLE_ONION_ON_FOCUS;
      this.enableOnionOnHover = typeof userDefinedOptions.enableOnionOnHover === "boolean" ? userDefinedOptions.enableOnionOnHover : Env.ENABLE_ONION_ON_HOVER;
      this.enableEdgeOnion = typeof userDefinedOptions.enableEdgeOnion === "boolean" ? userDefinedOptions.enableEdgeOnion : Env.ENABLE_EDGE_ONION;
      this.onionNumberOfLayers = userDefinedOptions.onionNumberOfLayers ? userDefinedOptions.onionNumberOfLayers : Env.DEFAULT_ONION_LAYERS;
      this.onionBaseColor = userDefinedOptions.onionBaseColor ? userDefinedOptions.onionBaseColor : Env.DEFAULT_ONION_COLOR;
      this.onionLayerSize = userDefinedOptions.onionLayerSize ? userDefinedOptions.onionLayerSize : Env.DEFAULT_ONION_SIZE;
      this.writeHighlightFilters();
    }

    /**
     * Adds default filter definitions for node
     */
    _createClass(Highlighter, [{
      key: "writeHighlightFilters",
      value: function writeHighlightFilters() {
        var _this2 = this;
        var shadowFilter = function shadowFilter(id, deviation, opacity) {
          select(_this2.graphContainerElement).select("defs").append("filter").attr("id", id).attr("width", "400%").attr("height", "400%").attr("y", "-50%").attr("x", "-50%").append("feDropShadow").attr("dx", "0").attr("dy", "0").attr("stdDeviation", deviation).attr("flood-opacity", opacity);
        };
        shadowFilter("shadow-filter", 4, 0.6);
        shadowFilter("shadow-dark-filter", 6, 0.8);
      }
      /**
       * Handles reflecting selection changes in the DOM
       * @param {Selection[]} selection - A list of selected nodes and edges.
       */
    }, {
      key: "handleEntitySelection",
      value: function handleEntitySelection(selection) {
        var _this3 = this;
        if (selection.length === 0) {
          this.removeAllEntityFocus();
          this.currentSelection = [];
          return;
        }
        var entitiesToToggle = selection.filter(function (outer) {
          return !_this3.currentSelection.find(function (inner) {
            return "".concat(outer.id).concat(outer.direction ? outer.direction : "") === "".concat(inner.id).concat(inner.direction ? inner.direction : "");
          });
        }).concat(this.currentSelection.filter(function (outer) {
          return !selection.find(function (inner) {
            return "".concat(outer.id).concat(outer.direction ? outer.direction : "") === "".concat(inner.id).concat(inner.direction ? inner.direction : "");
          });
        }));
        if (entitiesToToggle.length > 0) {
          entitiesToToggle.forEach(function (entity) {
            entity.type === "node" && _this3.setElementFocus(entity.id);
            entity.type === "edge" && _this3.setElementFocus(entity.id, entity.direction);
          });
          this.currentSelection = selection;
        }
      }
      /**
       * This function sets the focus on a given entity
       * @param {string} entityID - ID of the entity to be focused
       * @param {boolean?} isFromDirection - Is the edge in the from direction? If applicable
       */
    }, {
      key: "setElementFocus",
      value: function setElementFocus(entityID) {
        var isFromDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        if (entityID) {
          var isFrom;
          if (isFromDirection === "from") {
            isFrom = true;
          } else if (isFromDirection === "to") {
            isFrom = false;
          }
          this.toggleEntityFocusByID(entityID, isFrom);
        }
      }
      /**
       * Removes focus from all nodes and edges
       */
    }, {
      key: "removeAllEntityFocus",
      value: function removeAllEntityFocus() {
        var selector = select(this.graphContainerElement).selectAll(".focused").classed("focused", false);
        if (this.enableOnionOnFocus) {
          selector.select(function () {
            return this.parentNode;
          }).selectAll(".onion-clone").attr("class", "removing").transition().duration(Env.DEFAULT_ONION_ANIMATION_TIME).style("transform", "scale(0.8)").remove();
        }
      }
      /**
       * Toggles the highlighting of a given node
       * @param {string} entityID - ID of the entity to toggle
       * @param {boolean?} isFrom - Is the edge in the from direction? If applicable
       */
    }, {
      key: "toggleEntityFocusByID",
      value: function toggleEntityFocusByID(entityID) {
        var isFrom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        return this.toggleNodeEntityFocus(entityID) || this.toggleEdgeEntityFocus(entityID, isFrom);
      }
      /**
       * Toggles focus on nodes
       * @param {string} entityID - ID of the node to toggle focus for
       */
    }, {
      key: "toggleNodeEntityFocus",
      value: function toggleNodeEntityFocus(entityID) {
        var nodeElement = select(this.graphContainerElement).select("[id='".concat(entityID, "']")); //html4 support
        if (nodeElement.node()) {
          var DOMElement = nodeElement.node();
          var DOMNeighborhood = DOMElement.parentElement.children;
          selectAll(_toConsumableArray(DOMNeighborhood)).classed("focused", !nodeElement.classed("focused"));
          if (!DOMElement.matches(".main-shape")) {
            DOMElement = _toConsumableArray(DOMNeighborhood).find(function (element) {
              return element.matches(".main-shape");
            });
          }
          if (this.enableOnionOnFocus && !(this.enableOnionOnHover && DOMElement.matches(":hover"))) {
            this.toggleOnionBorder(DOMElement, this.onionLayerSize, this.onionBaseColor, this.onionNumberOfLayers);
          }
          return true;
        }
        return false;
      }
      /**
       * Toggles focus on edges
       * @param {string} entityID - ID of the entity to toggle
       * @param {boolean} isFrom - Is the edge in the from direction?
       */
    }, {
      key: "toggleEdgeEntityFocus",
      value: function toggleEdgeEntityFocus(entityID, isFrom) {
        var labelGroup = select(this.graphContainerElement).select("[id=\"label".concat(entityID).concat(isFrom ? "from" : "to", "\"]"));
        if (labelGroup) {
          var label = labelGroup.select("rect:not(.removing)[class*='label-rect']");
          var focusedState = label.classed("focused");
          label.classed("focused", !focusedState);
          if (this.enableOnionOnFocus && !(this.enableOnionOnHover && label.node().matches(":hover"))) {
            if (this.enableEdgeOnion) {
              this.toggleOnionBorder(label.node(), this.onionLayerSize, this.onionBaseColor, this.onionNumberOfLayers);
            }
          }
          select(this.graphContainerElement).selectAll("marker[id$=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).select("path").classed("focused", !focusedState);
          select(this.graphContainerElement).selectAll("[class*=\"".concat(entityID).concat(isFrom ? "inverse " : " ", "\"]")).selectAll("path, text").classed("focused", !focusedState);
          return true;
        }
        return false;
      }
      /**
       * Creates an onion border around a given svg node by cloning it a given amount of times
       * @param {HTMLElement} DOMElement - Element to add the border to
       * @param {number} size - Size of the onion layers
       * @param {string} color - Base color of the layers
       * @param {number} layers - number of layers
       * @param {boolean} wasTurnedOn - Returns true if the onion border was toggled on, and false if it was toggled off
       */
    }, {
      key: "toggleOnionBorder",
      value: function toggleOnionBorder(DOMElement, size, color) {
        var _this4 = this;
        var layers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
        var DOMNeighborhood = DOMElement.parentElement.children;
        var found = false;
        Array.from(DOMNeighborhood).forEach(function (node) {
          if (node.classList.contains("onion-clone")) {
            found = true;
            if (!_this4.isLassoActive) {
              //Becomes really heavy for Chrome
              select(node).attr("class", null).transition().duration(Env.DEFAULT_ONION_ANIMATION_TIME).style("transform", "scale(0.8)").remove();
            } else {
              select(node).attr("class", null).remove();
            }
          }
        });
        if (!found) {
          var previousNode = DOMElement;
          var offset = 0;
          if (getComputedStyle(DOMElement).strokeWidth && getComputedStyle(DOMElement).stroke !== "rgba(0, 0, 0, 0)") {
            offset += parseInt(getComputedStyle(DOMElement).strokeWidth.substring(0, getComputedStyle(DOMElement).strokeWidth.length - 2)) / 2;
          }
          for (var i = 1; i < layers + 1; i++) {
            var clone = DOMElement.cloneNode();
            clone.removeAttribute("class");
            clone.removeAttribute("id");
            clone.removeAttribute("style");
            if (DOMElement.hasAttribute("r")) {
              clone.setAttribute("r", parseInt(DOMElement.getAttribute("r")) + i * size + offset);
            }
            if (DOMElement.hasAttribute("width")) {
              clone.setAttribute("width", parseInt(DOMElement.getAttribute("width")) + i * (size * 2) + offset);
              clone.setAttribute("height", parseInt(DOMElement.getAttribute("height")) + i * (size * 2) + offset);
              clone.setAttribute("x", parseInt(DOMElement.getAttribute("x")) - i * size - offset / 2);
              clone.setAttribute("y", parseInt(DOMElement.getAttribute("y")) - i * size - offset / 2);
              if (getComputedStyle(DOMElement).rx) {
                clone.style.rx = parseInt(getComputedStyle(DOMElement).rx.substring(0, getComputedStyle(DOMElement).rx.length - 2)) * (i + 1) + "px";
              }
              if (getComputedStyle(DOMElement).ry) {
                clone.style.ry = parseInt(getComputedStyle(DOMElement).ry.substring(0, getComputedStyle(DOMElement).ry.length - 2)) * (i + 1) + "px";
              }
            }
            clone.style.pointerEvents = "none";
            clone.style.fill = color;
            clone.setAttribute("opacity", 0.5 / i);
            clone.classList.add("onion-clone");
            DOMElement.parentElement.insertBefore(clone, previousNode);
            if (!this.isLassoActive) {
              //Becomes really heavy for Chrome
              CSSUtil.tween(clone, "transform", DOMElement.getBoundingClientRect().width / clone.getBoundingClientRect().width, 1, Date.now(), Env.DEFAULT_ONION_ANIMATION_TIME * i, function (newValue) {
                return "scale(".concat(newValue, ")");
              });
            }
            previousNode = clone;
          }
          return true;
        }
        return false;
      }
      /**
       * Highlights multiple nodes with an expanding circle that disappears after a given time frame.
       * @param {string[]} nodes - Array of node IDs to highlight
       */
    }, {
      key: "highlightNode",
      value: function highlightNode(nodes) {
        select(this.graphContainerElement).selectAll(".node").filter(function (d) {
          return nodes.includes(d.id);
        }).append("circle").attr("r", 50).classed("highlighted-node", true).transition().duration(Env.HIGHLIGHT_TIME).ease(bounceOut).style("transform", "scale(5)").transition().duration(Env.HIGHLIGHT_TIME_REMOVE).remove();
      }
      /**
       * Disables (dims) nodes and their connected edges.
       * @param {string[]} nodes - Array of node IDs to fade
       */
    }, {
      key: "disableNodes",
      value: function disableNodes(nodeIDsToDisable) {
        select(this.graphContainerElement).selectAll(".node").filter(function (d) {
          return nodeIDsToDisable.includes(d.id);
        }).classed("disabled", true);
        select(this.graphContainerElement).selectAll(".edge").filter(function (d) {
          return nodeIDsToDisable.includes(d.sourceNode) || nodeIDsToDisable.includes(d.targetNode);
        }).classed("disabled", true);
        select(this.graphContainerElement).selectAll(".label").filter(function (d) {
          return nodeIDsToDisable.includes(d.sourceNode) || nodeIDsToDisable.includes(d.targetNode);
        }).classed("disabled", true);
      }
      /**
       * Clears all disabling for nodes and connected edges set by "disableNodes".
       * @param {string[]} nodes - Array of node IDs to fade
       */
    }, {
      key: "clearDisabled",
      value: function clearDisabled() {
        select(this.graphContainerElement).selectAll(".disabled").classed("disabled", false);
      }
    }]);
    return Highlighter;
  }();

  /**
   * The tooltip class handles generating and positioning the tooltip in the graph.
   */
  var Tooltip = /*#__PURE__*/function () {
    function Tooltip(graphContainerElement, eventEmitter) {
      var _this = this;
      _classCallCheck(this, Tooltip);
      this.graphContainerElement = graphContainerElement;
      this.ee = eventEmitter;
      this.tooltip = this.initializeTooltip();
      if (!this.pointerEvent) {
        this.graphContainerElement.addEventListener("mousemove", function (event) {
          _this.pointerEvent = event;
        });
      }
      this.ee.on(EVENTS.MOUSE_OVER_NODE, function (node) {
        _this.showTooltip(node);
      });
      this.ee.on(EVENTS.MOUSE_LEFT_NODE, function () {
        _this.hideTooltip();
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.destroy();
      });
    }

    /**
     * Initializes the tooltip
     */
    _createClass(Tooltip, [{
      key: "initializeTooltip",
      value: function initializeTooltip() {
        return select(this.graphContainerElement).append("div").attr("id", "virrvarr-tooltip");
      }
      /**
       * Displays the tooltip with a text at coordinates x and y
       * @param {object} node - The node object where the tooltip should be
       */
    }, {
      key: "showTooltip",
      value: function showTooltip(node) {
        if (!this.pointerEvent) {
          return;
        }
        var coordinates = pointer(this.pointerEvent, document.documentElement);
        this.tooltip.style("left", coordinates[0] - window.pageXOffset + "px").style("top", coordinates[1] + 20 - window.pageYOffset + "px").style("display", "inline-block").style("position", "fixed").text(node.name);
      }
      /**
       * Hides the tooltip
       */
    }, {
      key: "hideTooltip",
      value: function hideTooltip() {
        this.tooltip.style("display", "none");
      }
      /**
       * Unmounts the tooltip from the DOM
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.tooltip.remove();
      }
    }]);
    return Tooltip;
  }();

  /**
   * The Grid class is responsible for drawing the background grid pattern to the canvas (if applicable)
   */
  var Grid = /*#__PURE__*/function () {
    function Grid(graphContainerElement, eventEmitter, options) {
      _classCallCheck(this, Grid);
      this.graphContainerElement = graphContainerElement;
      this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : Env.ENABLE_GRID;
      this.enableSecondaryGrid = options.enableSecondaryGrid !== undefined ? options.enableSecondaryGrid : Env.ENABLE_SECONDARY_GRID;
      this.enableScaleGridOnZoom = options.enableScaleGridOnZoom !== undefined ? options.enableScaleGridOnZoom : Env.ENABLE_SCALE_GRID_ON_ZOOM;
      this.ee = eventEmitter;
      this.initialize();
    }

    /**
     * Initializes the grid
     */
    _createClass(Grid, [{
      key: "initialize",
      value: function initialize() {
        select(this.graphContainerElement).select("#grid").remove();
        select(this.graphContainerElement).select("#grid-rect").remove();
        if (this.enableGrid) {
          this.initializeGrid();
        } else if (this.enableSecondaryGrid) {
          this.initializeAlternativeGrid();
        }
      }
      /**
       * Initialize the secondary grid
       */
    }, {
      key: "initializeAlternativeGrid",
      value: function initializeAlternativeGrid() {
        var defs = select(this.graphContainerElement).select("svg").select("g").select("defs");
        var gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
        gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #dedede; stroke-width: 1; stroke-dasharray: 2;");
        this.createLine(gridPattern, 0, 0, 0, 2);
        this.createLine(gridPattern, 0, 0, 2, 0);
        this.createLine(gridPattern, 60, 60, 58, 60);
        this.createLine(gridPattern, 60, 60, 60, 58);
        this.createLine(gridPattern, 0, 58, 0, 60);
        this.createLine(gridPattern, 0, 60, 2, 60);
        this.createLine(gridPattern, 58, 0, 60, 0);
        this.createLine(gridPattern, 60, 0, 60, 2);
        var grid = select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)").attr("class", "grid").attr("id", "grid-rect");
        if (this.enableScaleGridOnZoom) {
          grid.attr("width", "2000%").attr("height", "2000%").attr("x", "-1000%") //This is faster for scaling than recalculating the relative x and y coordinates every time the zoom handler fires.
          .attr("y", "-1000%");
        }
        var transform = select(this.graphContainerElement).select("g").node.getAttribute("transform");
        if (transform) {
          grid.attr("transform", transform);
        }
      }
      /**
       * Initialize the primary grid
       */
    }, {
      key: "initializeGrid",
      value: function initializeGrid() {
        var defs = select(this.graphContainerElement).select("svg").select("g").select("defs");
        var gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
        gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #a0a0a0; stroke-width: 1; stroke-dasharray: 2;");
        var grid = select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)").attr("class", "grid").attr("id", "grid-rect");
        if (this.enableScaleGridOnZoom) {
          grid.attr("width", "2000%").attr("height", "2000%").attr("x", "-1000%") //This is faster for scaling than recalculating the relative x and y coordinates every time the zoom handler fires.
          .attr("y", "-1000%");
        }
        var transform = select(this.graphContainerElement).select("g").node().getAttribute("transform");
        if (transform) {
          grid.attr("transform", transform);
        }
      }
      /**
       * @param {D3Selection} container - D3 selection of the container we are drawing inside of
       * @param {number} startX - Start X coordinate of the line
       * @param {number} startY - Start Y coordinate of the line
       * @param {number} endX - End X coordinate of the line
       * @param {number} endY - End Y coordinate of the line
       */
    }, {
      key: "createLine",
      value: function createLine(container, startX, startY, endX, endY) {
        container.append("line").attr("style", "stroke: #a0a0a0;stroke-width:0.5;").attr("x1", startX).attr("y1", startY).attr("x2", endX).attr("y2", endY);
      }
    }]);
    return Grid;
  }();

  /**
   * Creates a D3 curve function.
   */
  var curveFunction = line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).curve(cardinal);

  /**
   * Creates a d3 loop function.
   */
  var loopFunction = line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).curve(cardinal.tension(-1));

  /**
   * Calculates the radian of an angle.
   * @param {number} angle
   */
  var calculateRadian = function calculateRadian(angle) {
    angle = angle % 360;
    if (angle < 0) {
      angle = angle + 360;
    }
    var arc = 2 * Math.PI * angle / 360;
    if (arc < 0) {
      arc = arc + 2 * Math.PI;
    }
    return arc;
  };

  /**
   * Calculates the point where the edge between the source and target node intersects the border of the target node.
   * @param {object} source - source node of the edge
   * @param {object} target - target node of the edge
   * @param {number} additionalDistance - additional distance, or what is essentially a padding.
   */
  var calculateIntersection = function calculateIntersection(source, target, additionalDistance) {
    var dx = target.x - source.x;
    var dy = target.y - source.y;
    var innerDistance = target.radius;

    //Rectangles require some more work...
    if (target.shape === "rectangle") {
      var mEdge = Math.abs(dy / dx);
      var mRect = target.height / target.width;
      if (mEdge <= mRect) {
        var timesX = dx / (target.width / 2);
        var rectY = dy / timesX;
        innerDistance = Math.sqrt(Math.pow(target.width / 2, 2) + rectY * rectY);
      } else {
        var timesY = dy / (target.height / 2);
        var rectX = dx / timesY;
        innerDistance = Math.sqrt(Math.pow(target.height / 2, 2) + rectX * rectX);
      }
    }
    var length = Math.sqrt(dx * dx + dy * dy);
    var ratio = (length - (innerDistance + additionalDistance)) / length;
    var x = dx * ratio + source.x;
    var y = dy * ratio + source.y;
    return {
      x: x,
      y: y
    };
  };

  /**
   * Calculates the angle for a label in the graph
   * @param {number} point1 - First vector of the edge
   * @param {number} point2 - Second vector of the edge
   */
  var calculateLabelAngle = function calculateLabelAngle(point1, point2) {
    //Get the angle in degrees
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    var theta = Math.atan2(dy, dx);
    var angle = theta * (180 / Math.PI);
    //Convert to a 360 scale
    angle += 180;
    //Make sure the label is never upside-down
    if (angle > 90 && angle < 270) {
      angle -= 180;
    }
    return angle;
  };

  /**
   * Calculates a point between two points for creating a curved line.
   * @param {object} source - Point where the source node is intersected by the edge
   * @param {object} target - Point where the target node is intersected by the edge
   * @param {object} l - Edge itself
   */
  var calculateCurvePoint = function calculateCurvePoint(source, target, l) {
    var distance = calculateMultiEdgeDistance(l);
    var dx = target.x - source.x;
    var dy = target.y - source.y;
    var cx = source.x + dx / 2;
    var cy = source.y + dy / 2;
    var n = calculateNormalizedVector(source, target, distance);
    if (l.source.index < l.target.index) {
      n.x = -n.x;
      n.y = -n.y;
    }
    if (l.multiEdgeIndex % 2 !== 0) {
      n.x = -n.x;
      n.y = -n.y;
    }
    return {
      x: cx + n.x,
      y: cy + n.y
    };
  };

  /**
   * Calculate the optimal Multi Edge distance. This is typically used to ensure edges don't overlap.
   * @param {object} l - Edge to be evaluated
   */
  var calculateMultiEdgeDistance = function calculateMultiEdgeDistance(l) {
    var level = Math.floor((l.multiEdgeIndex - l.multiEdgeCount % 2) / 2) + 1;
    var oddConstant = l.multiEdgeCount % 2 * 15;
    var distance = 0;
    switch (level) {
      case 1:
        distance = 20 + oddConstant;
        break;
      case 2:
        distance = 45 + oddConstant;
        break;
    }
    return distance;
  };

  /**
   * Calculates the normal vector between two points.
   * @param {object} source - Source point
   * @param {object} target - Target point
   * @param {number} length - Distance
   */
  var calculateNormalizedVector = function calculateNormalizedVector(source, target, length) {
    var dx = target.x - source.x;
    var dy = target.y - source.y;
    var nx = -dy;
    var ny = dx;
    var vlength = Math.sqrt(nx * nx + ny * ny);
    var ratio = length / vlength;
    return {
      x: nx * ratio,
      y: ny * ratio
    };
  };

  /**
   * Calculates edges to its input and stores the point for the labels. Only for circle shaped nodes!
   * @param {object} l - Edge to be processed
   */
  var calculateSelfEdgePath = function calculateSelfEdgePath(l) {
    var node = l.source;
    var loopShiftAngle = 360 / l.selfEdgeCount;
    var loopAngle = Math.min(60, loopShiftAngle * 0.8);
    var arcFrom = calculateRadian(loopShiftAngle * l.selfEdgeIndex);
    var arcTo = calculateRadian(loopShiftAngle * l.selfEdgeIndex + loopAngle);
    var x1 = Math.cos(arcFrom) * node.radius;
    var y1 = Math.sin(arcFrom) * node.radius;
    var x2 = Math.cos(arcTo) * node.radius;
    var y2 = Math.sin(arcTo) * node.radius;
    var fixPoint1 = {
      x: node.x + x1,
      y: node.y + y1
    };
    var fixPoint2 = {
      x: node.x + x2,
      y: node.y + y2
    };
    var distanceMultiplier = 2.5;
    var dx = (x1 + x2) / 2 * distanceMultiplier;
    var dy = (y1 + y2) / 2 * distanceMultiplier;
    var curvePoint = {
      x: node.x + dx,
      y: node.y + dy
    };
    l.curvePoint = curvePoint;
    return loopFunction([fixPoint1, curvePoint, fixPoint2]);
  };
  var MathUtils = {
    calculateCurvePoint: calculateCurvePoint,
    calculateIntersection: calculateIntersection,
    calculateMultiEdgeDistance: calculateMultiEdgeDistance,
    calculateNormalizedVector: calculateNormalizedVector,
    calculateRadian: calculateRadian,
    curveFunction: curveFunction,
    loopFunction: loopFunction,
    calculateSelfEdgePath: calculateSelfEdgePath,
    calculateLabelAngle: calculateLabelAngle
  };

  var Measurements = /*#__PURE__*/function () {
    function Measurements(graphContainerElement) {
      _classCallCheck(this, Measurements);
      this.graphContainerElement = graphContainerElement;
      this.measurementDiv = document.createElement("div");
      this.measurementDiv.id = "measurements-div";
      //Default styles are hard coded for now.
      this.measurementDiv.setAttribute("style", "font-size:12px; position: absolute;float: left;white-space: nowrap;visibility: hidden;");
      this.graphContainerElement.appendChild(this.measurementDiv);
      this.svgContainer = document.createElement("div");
      this.svgContainer.setAttribute("style", "font-size:12px; position: absolute;float: left;white-space: nowrap;visibility: hidden;display:none;");
      this.svgContainer.id = "measurement-svg-container";
      var measurementSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      measurementSVG.id = "measurements-svg";
      this.svgContainer.appendChild(measurementSVG);
      this.measurementG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      measurementSVG.appendChild(this.measurementG);
      this.graphContainerElement.appendChild(this.svgContainer);
      this.measurementCache = new Map();
    }

    /**
     * Calculates the width of a text string in pixels.
     * @param {string} textStyle - optional css class to apply to to the text
     */
    _createClass(Measurements, [{
      key: "getTextWidth",
      value: function getTextWidth(string, textStyle) {
        if (this.measurementCache.has(string + textStyle)) {
          return this.measurementCache.get(string + textStyle);
        }
        if (textStyle) {
          this.measurementDiv.classList.add(textStyle);
        }
        this.measurementDiv.appendChild(document.createTextNode(string));
        var width = this.measurementDiv.offsetWidth;
        if (textStyle) {
          this.measurementDiv.classList.remove(textStyle);
        }
        this.measurementCache.set(string + textStyle, width);
        this.measurementDiv.innerHTML = "";
        return width;
      }
      /**
       * Truncates a string to a given width.
       * @param {number} maxLength - maximum length in pixels
       * @param {string} textStyle - optional css class to apply to to the text
       */
    }, {
      key: "truncate",
      value: function truncate(text, maxLength, textStyle) {
        var query = text + maxLength + textStyle;
        if (this.measurementCache.has(query)) {
          return this.measurementCache.get(query);
        }
        maxLength -= Env.ADDITIONAL_TEXT_SPACE;
        if (isNaN(maxLength) || maxLength <= 0) {
          return "...";
        }
        var originalLength = text.length;
        var textLength = text.length;
        var textWidth;
        var ratio;
        while (true) {
          textWidth = this.getTextWidth(text, textStyle);
          if (textWidth <= maxLength) {
            break;
          }
          ratio = textWidth / maxLength;
          textLength = Math.floor(textLength / ratio);
          text = text.substring(0, textLength);
        }
        if (originalLength > textLength) {
          return text.substring(0, textLength - 3) + "...";
        }
        this.measurementCache.set(query, text);
        return text;
      }
      /**
       * Computes the bbox of an svg element.
       * @param {SVGElement} element - Element to compute bbox for.
       * @param {string=} query - If the value should be cached, a query can be passed in as well.
       */
    }, {
      key: "getSVGBBox",
      value: function getSVGBBox(element, query) {
        var _this = this;
        var computeBBox = function computeBBox() {
          _this.svgContainer.style.display = "block";
          _this.measurementG.appendChild(element);
          var bBox = element.getBBox();
          _this.measurementG.removeChild(element);
          _this.svgContainer.style.display = "none";
          return bBox;
        };
        if (query) {
          if (!this.measurementCache.has(query)) {
            this.measurementCache.set(query, computeBBox());
          }
          return this.measurementCache.get(query);
        }
        return computeBBox();
      }
    }]);
    return Measurements;
  }();

  /**
   * The DOM Processor class is responsible for managing the DOM using the provided node and edge data, as well as provided configuration.
   */
  var DOMProcessor = /*#__PURE__*/function () {
    function DOMProcessor(graphContainerElement, eventEmitter, userDefinedOptions) {
      var _this = this;
      _classCallCheck(this, DOMProcessor);
      this.enableFadeOnHover = userDefinedOptions.enableFadeOnHover !== undefined ? userDefinedOptions.enableFadeOnHover : Env.DEFAULT_FADE_ON_HOVER;
      this.showMultiplicity = true;
      this.enableMultiLineNodeLabels = userDefinedOptions.enableMultiLineNodeLabels !== undefined ? userDefinedOptions.enableMultiLineNodeLabels : Env.DEFAULT_NODE_TEXT_MULTILINE;
      this.rotateLabels = userDefinedOptions.rotateLabels !== undefined ? userDefinedOptions.rotateLabels : Env.ROTATE_LABELS;
      this.lineType = userDefinedOptions.lineType !== undefined ? userDefinedOptions.lineType : Env.DEFAULT_LINE_TYPE;
      this.markerSize = userDefinedOptions.markerSize !== undefined ? userDefinedOptions.markerSize : Env.DEFAULT_MARKER_SIZE;
      this.measurements = new Measurements(graphContainerElement);
      this.rootG = select(graphContainerElement).select("g");
      this.nodes = [];
      this.edges = [];
      this.selection = null;
      this.hoveredEntity = null;
      this.hoveredDirection = null;
      this.dragSelection = [];
      this.listeningForTick = false;
      this.pinMode = false;

      //Every time we redraw we want to store custom IDs of the last selection, including type and meta data.
      //This is beacuse we may receive the same node/edge, but with new parameters, and in that case it has to be redrawn
      this.lastEdgeIDs = new Set();
      this.lastNodeIDs = new Set();
      this.lastDragX = 0;
      this.lastDragY = 0;
      this.isMultiSelecDragtModeEnabled = false;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.NODE_MULTI_SELECT_DRAG_MODE_TOGGLED, function (isEnabled) {
        _this.isMultiSelecDragtModeEnabled = isEnabled;
      });
      this.ee.on(EVENTS.SELECTION_UPDATED, function (selection) {
        _this.selection = selection;
      });
      this.ee.on(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED, function () {
        _this.showMultiplicity = !_this.showMultiplicity;
        _this.updateMultiplicityCounters(_this.edges);
      });
      this.ee.on(EVENTS.NODE_PIN_MODE_TOGGLED, function (isEnabled) {
        return _this.pinMode = isEnabled;
      });
      this.ee.on(EVENTS.DATASTORE_UPDATED, function (nodes, edges) {
        _this.nodes = nodes;
        _this.edges = edges;
        //The order of these matters, don't rearrange
        _this.cleanOldDOMNodesAndEdges();
        _this.updateMarkers(edges);
        _this.updateEdges(edges);
        _this.updateLabels(edges);
        _this.updateMultiplicityCounters(edges);
        _this.updateNodes(nodes);
        _this.attachEntityClickListeners();
        _this.ee.trigger(EVENTS.DOM_PROCESSOR_FINISHED, nodes, edges);
      });
      this.ee.on(EVENTS.RELATIVE_POSITION_UPDATE_REQUESTED, function () {
        _this.computeRelativeNodeAndLabelPositions();
      });
      this.ee.on(EVENTS.ENGINE_TICK, function () {
        _this.tick();
      });
      this.ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
        _this.listeningForTick = true;
      });
    }

    /**
     * Finds any nodes or edges that have changed in a way that must be reflected in the DOM, and removes them from the dataset bound to the DOM elements
     * This makes it so that the next enter() selection will receive the nodes/edges as new data points, and will redraw them from scratch
     */
    _createClass(DOMProcessor, [{
      key: "cleanOldDOMNodesAndEdges",
      value: function cleanOldDOMNodesAndEdges() {
        var _this2 = this;
        var fixList = function fixList(idSet, idGenerator, entityList, selectorArray) {
          if (idSet.size > 0 && entityList.length > 0) {
            var update = entityList.filter(function (entity) {
              return idSet.has(idGenerator(entity));
            });
            selectorArray.forEach(function (selector) {
              _this2.rootG.select(selector[0]).selectAll(selector[1]).data(update, function (d) {
                return d.id;
              }).exit().remove();
            });
          }
          idSet.clear();
          entityList.forEach(function (entity) {
            return idSet.add(idGenerator(entity));
          });
        };
        fixList(this.lastEdgeIDs, this.getEdgeGraphicalID, this.edges, [["#edge-container", ".edge"], ["#multiplicity-container", ".multiplicity"], ["#label-container", ".label"]]);
        fixList(this.lastNodeIDs, this.getNodeGraphicalID, this.nodes, [["#node-container", ".node"]]);
      }
      /**
       * Computes the relative positions and sizes of nodes and labels. This is used for things like the selection lasso.
       */
    }, {
      key: "computeRelativeNodeAndLabelPositions",
      value: function computeRelativeNodeAndLabelPositions() {
        this.nodeElements.each(function (d) {
          var node = select(this).select("*:not(.onion-clone)").node();
          var boundingClientRect = node.getBoundingClientRect();
          d.relativeX = boundingClientRect.x;
          d.relativeY = boundingClientRect.y;
          d.relativeWidth = boundingClientRect.width;
          d.relativeHeight = boundingClientRect.height;
        });
        this.labels.each(function (d) {
          var group = select(this);
          var direction = group.classed("to") ? "To" : "From";
          var rect = group.select("rect:not(.onion-clone)").node();
          var boundingClientRect = rect.getBoundingClientRect();
          d["label".concat(direction, "RelativeX")] = d.relativeX = boundingClientRect.x;
          d["label".concat(direction, "RelativeY")] = d.relativeY = boundingClientRect.y;
          d["label".concat(direction, "RelativeWidth")] = d.relativeWidth = boundingClientRect.width;
          d["label".concat(direction, "RelativeHeight")] = d.relativeHeight = boundingClientRect.height;
        });
      }
      /**
       * Generates a graphical identifier for an edge. The graphical identifier is used to determine not just the unique edge, but also its DOM representation
       * @param {VVEdge} edge
       * @returns {string} - Graphical Identifier
       */
    }, {
      key: "getEdgeGraphicalID",
      value: function getEdgeGraphicalID(edge) {
        return edge.id + (edge.type ? edge.type : "") + (edge.nameFrom ? edge.nameFrom : "") + (edge.nameTo ? edge.nameTo : "") + (edge.multiplicityFrom ? edge.multiplicityFrom : "") + (edge.multiplicityTo ? edge.multiplicityTo : "");
      }
      /**
       * Generates a graphical identifier for a node. The graphical identifier is used to determine not just the unique node, but also its DOM representation
       * @param {VVNode} node
       * @returns {string} - Graphical Identifier
       */
    }, {
      key: "getNodeGraphicalID",
      value: function getNodeGraphicalID(node) {
        return node.id + (node.type ? node.type : "") + node.shape + node.hiddenEdgeCount + node.name;
      }
      /**
       * Updates all markers (arrows for edges)
       * @param {object[]} edges - All edges
       */
    }, {
      key: "updateMarkers",
      value: function updateMarkers(edges) {
        var _this3 = this;
        var defs = this.rootG.select("defs");
        defs.selectAll("marker").remove();
        var fragment = document.createDocumentFragment();
        edges.forEach(function (l) {
          fragment.appendChild(_this3.drawMarker(l, false));
          if (l.nameFrom || l.markerFrom) {
            fragment.appendChild(_this3.drawMarker(l, true));
          }
        });
        defs.node().appendChild(fragment);
      }
      /**
       * Updates all edges in the DOM, including enter and exit operations.
       * @param {object[]} edges - edges to be present in the DOM
       */
    }, {
      key: "updateEdges",
      value: function updateEdges(edges) {
        var _this4 = this;
        var selector = this.rootG.select("#edge-container").selectAll(".edge").data(edges, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").attr("class", function (d) {
          return _this4.getMarkerId(d, true) + " " + _this4.getMarkerId(d, false);
        }).classed("edge", true).append("path").attr("class", function (d) {
          return "edge-path-".concat(d.type ? d.type : "default");
        }).attr("marker-end", function (l) {
          return "url(#" + _this4.getMarkerId(l, false) + ")";
        }).attr("marker-start", function (l) {
          if (l.nameFrom || l.markerFrom) {
            return "url(#" + _this4.getMarkerId(l, true) + ")";
          }
          return "";
        });
        this.edgePath = this.rootG.select("#edge-container").selectAll(".edge path");
      }
      /**
       * Updates all multiplicity counters on edges.
       * @param {object[]} edges - List of all edges
       */
    }, {
      key: "updateMultiplicityCounters",
      value: function updateMultiplicityCounters(edges) {
        var _this5 = this;
        if (this.showMultiplicity) {
          var selector = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").data(edges, function (d) {
            return d.id;
          });
          selector.exit().remove();
          selector.enter().append("g").classed("multiplicity", true).filter(function (l) {
            return l.multiplicityTo || l.multiplicityFrom;
          }).each(function (d, i, c) {
            if (d.multiplicityFrom) {
              _this5.drawMultiplicity(select(c[i]), "from");
            }
            if (d.multiplicityTo) {
              _this5.drawMultiplicity(select(c[i]), "to");
            }
          });
        } else {
          this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
        }
        this.activeMultiplicities = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").selectAll("g");
      }
      /**
       * Updates all nodes in the DOM, including enter and exit operations.
       * @param {object[]} nodes - List of all nodes
       */
    }, {
      key: "updateNodes",
      value: function updateNodes(nodes) {
        var _this6 = this;
        var fragment = document.createDocumentFragment();
        var selector = this.rootG.select("#node-container").selectAll(".node").data(nodes, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").attr("class", "node").call(drag().filter(function (event) {
          return !event.button;
        }) //By default the filter will block the event if ctrl is down.
        .on("start", function (event, d) {
          if (_this6.isMultiSelecDragtModeEnabled && _this6.selection && _this6.selection.find(function (selection) {
            return selection.type === "node" && selection.id === d.id;
          })) {
            _this6.dragSelection = _this6.nodes.filter(function (node) {
              return _this6.selection.find(function (selection) {
                return selection.type === "node" && selection.id === node.id;
              });
            });
          } else {
            _this6.dragSelection = [d];
          }
          for (var i = 0; i < _this6.dragSelection.length; i++) {
            _this6.ee.trigger(EVENTS.NODE_DRAG_START, _this6.dragSelection[i]);
            _this6.dragSelection[i].pin(_this6.dragSelection[i].x, _this6.dragSelection[i].y);
          }
          _this6.lastDragX = event.x;
          _this6.lastDragY = event.y;
        }).on("drag", function (event) {
          for (var i = 0; i < _this6.dragSelection.length; i++) {
            _this6.ee.trigger(EVENTS.NODE_DRAG_DRAGGED, _this6.dragSelection[i]);
            var newX = _this6.dragSelection[i].fx + event.x - _this6.lastDragX;
            var newY = _this6.dragSelection[i].fy + event.y - _this6.lastDragY;
            _this6.dragSelection[i].pin(newX, newY);
          }
          _this6.lastDragX = event.x;
          _this6.lastDragY = event.y;
        }).on("end", function (event, d) {
          for (var i = 0; i < _this6.dragSelection.length; i++) {
            var node = _this6.dragSelection[i];
            if (!_this6.pinMode) {
              node.unPin();
            }
            _this6.rootG.select("[id='pin-".concat(node.id, "']")).remove();
            _this6.drawPinBadgeForNode(node);
            _this6.ee.trigger(EVENTS.NODE_DRAG_ENDED, node);
          }
          _this6.dragSelection = [];
          _this6.lastDragX = 0;
          _this6.lastDragY = 0;
          //While dragging the hover listeners have been shut off. Reset the selection if necessary.
          if (d !== _this6.hoveredEntity) {
            _this6.handleHoverEvent(d, "leave");
            if (_this6.hoveredEntity) {
              _this6.handleHoverEvent(_this6.hoveredEntity, "enter", _this6.hoveredDirection);
            }
          }
        })).each(function (d, i, c) {
          var element = select(c[i]);
          fragment.appendChild(c[i]);
          element.node().appendChild(_this6.drawNode(element, d));
        });
        this.rootG.select("#node-container").node().appendChild(fragment);
        //Clear old badges
        this.clearAllFloatingNodeMetaData();
        //Draw counter badges for imploded edges
        nodes.forEach(function (node) {
          return _this6.drawCounterBadgeForNode(node);
        });
        //Draw pin badge for fixated nodes
        nodes.forEach(function (node) {
          return _this6.drawPinBadgeForNode(node);
        });
        this.nodeElements = this.rootG.select("#node-container").selectAll(".node");
      }
      /**
       * Removes all floating meta data badges and pins
       */
    }, {
      key: "clearAllFloatingNodeMetaData",
      value: function clearAllFloatingNodeMetaData() {
        this.rootG.selectAll(".virrvarr-floating-node-meta").remove();
      }
      /**
       * Evaluates if a node should have a pin badge, and if so draws it.
       * Note that this function assumes that any previous pin has already been removed.
       * @param {VVNode} node
       */
    }, {
      key: "drawPinBadgeForNode",
      value: function drawPinBadgeForNode(node) {
        if (node.fx && node.fy && !node.animating) {
          var element = this.rootG.select("[id='".concat(node.id, "']")).select(function () {
            return this.parentNode;
          });
          this.drawPin(element, node);
        }
      }
      /**
       * Evaluates if a node should have a counter badge and if so draws it.
       * Note that this function assumes that any previous badge has already been removed.
       * @param {VVNode} node
       */
    }, {
      key: "drawCounterBadgeForNode",
      value: function drawCounterBadgeForNode(node) {
        if (node.hiddenEdgeCount) {
          var element = this.rootG.select("[id='".concat(node.id, "']")).select(function () {
            return this.parentNode;
          });
          this.drawNodeCollapsedEdgeCounter(element, node);
        }
      }
      /**
       * Updates all labels on edges.
       * @param {object[]} edges - List of all edges
       */
    }, {
      key: "updateLabels",
      value: function updateLabels(edges) {
        var _this7 = this;
        var selector = this.rootG.select("#label-container").selectAll(".label").data(edges, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").classed("label", true)
        /* Create labels, exclude edges without labels */.filter(function (d) {
          var needsLabel = d.nameTo || d.nameFrom;
          return needsLabel;
        }).each(function (d, i, c) {
          if (d.nameFrom) {
            _this7.drawLabel(select(c[i]), d, "from");
          }
          if (d.nameTo) {
            _this7.drawLabel(select(c[i]), d, "to");
          }
        });
        this.labels = this.rootG.select("#label-container").selectAll(".label").selectAll("g");
      }
      /**
       * Returns the distance (length) of the passed edge.
       * @param {object} l - Edge object
       */
    }, {
      key: "getEdgeDistance",
      value: function getEdgeDistance(l) {
        var targetRadius = l.target.radius !== undefined ? l.target.radius : 0;
        var sourceRadius = l.source.radius !== undefined ? l.source.radius : 0;
        var distance = targetRadius + sourceRadius;
        return distance + l.edgeDistance;
      }
      /**
       * Retrieves marker ID.
       * @param {object} l - Edge object
       * @param {boolean} inverse - Is the edge inverse?
       */
    }, {
      key: "getMarkerId",
      value: function getMarkerId(l, inverse) {
        return (l.type ? l.type : "normal") + l.id + (inverse ? "inverse" : "");
      }
      /**
       * Draws a marker.
       * @param {D3Selection} defs - Definitions selection by D3
       * @param {object} edge - Edge object
       * @param {boolean} inverse - Is the edge inverse?
       */
    }, {
      key: "drawMarker",
      value: function drawMarker(edge, inverse) {
        var marker = select(document.createElementNS("http://www.w3.org/2000/svg", "marker")).attr("id", this.getMarkerId(edge, inverse)).attr("viewBox", "0 -8 14 16").attr("refX", inverse ? 0 : 12).attr("refY", 0).attr("markerWidth", this.markerSize).attr("markerHeight", this.markerSize).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").attr("class", (edge.type ? edge.type : "normal") + "Marker").attr("class", "marker-" + (edge.type ? edge.type : "default"));
        var markerType = inverse ? edge.markerFrom : edge.markerTo;
        if (markerType === "circle") {
          marker.append("circle").attr("r", 7).attr("fill", "black").attr("cx", 7);
          return marker.node();
        } else if (markerType === "hollowcircle") {
          marker.append("circle").attr("r", 7).attr("fill", "black").attr("cx", 7);
          marker.append("circle").attr("r", 4).attr("fill", "white").attr("cx", 7);
          return marker.node();
        }
        if (markerType === "hollowreversearrow") {
          marker.append("path").attr("d", function () {
            return inverse ? "M12,0L1,-8L1,8Z" : "M12,-8L0,0L12,8Z";
          }).attr("style", "fill:white;stroke-width:2;stroke:black;");
          return marker.node();
        }
        marker.append("path").attr("d", function () {
          if (markerType === "diamond") {
            return "M0,0L6,6L12,0L6,-6Z";
          } else if (markerType === "square") {
            return "M12,-12L12,12L0,12L0,-12Z";
          } else if (markerType === "none") {
            return "";
          } else {
            //Arrow
            return inverse ? "M12,-8L0,0L12,8Z" : "M0,-8L12,0L0,8Z";
          }
        });
        return marker.node();
      }
      /**
       * Draws a label to a edge in direction X.
       * @param {D3Selection} edge - Edge HTMLElement selection by D3
       * @param {object} data - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */
    }, {
      key: "drawLabel",
      value: function drawLabel(edge, data, direction) {
        var label = edge.append("g").attr("id", "label" + data.id + direction).classed(direction, true);
        this.drawLabelRect(label, data, direction);
        var labelText = label.append("text").attr("class", function () {
          return "label-text-".concat(data.type ? data.type : "default");
        }).attr("text-anchor", "middle");
        this.drawLabelText(labelText, data, direction);
      }
      /**
       * Draws a rectangle as a label background.
       * @param {D3Selection} label - D3 selection of the label parent HTMLElement
       * @param {object} data - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */
    }, {
      key: "drawLabelRect",
      value: function drawLabelRect(label, data, direction) {
        var _this8 = this;
        var width = direction === "to" ? data.nameToWidth : data.nameFromWidth;
        label.append("rect").attr("class", function () {
          return "label-rect-".concat(data.type ? data.type : "default");
        }).attr("x", -width / 2).attr("y", -Env.LABEL_HEIGHT / 2).attr("width", width).attr("height", Env.LABEL_HEIGHT).on("mouseenter", function (event, edgeData) {
          _this8.labelMouseEnter(edgeData, direction);
        }).on("mouseleave", function (event, edgeData) {
          _this8.labelMouseLeave(edgeData, direction);
        });
      }
      /**
       * Draws a new <tspan> to a supplied label.
       * @param {D3Selection} element - Label HTMLElement selection by D3
       * @param {object} d - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */
    }, {
      key: "drawLabelText",
      value: function drawLabelText(element, d, direction) {
        var _this9 = this;
        element.append("tspan").text(function () {
          var width = direction === "to" ? d.nameToWidth : d.nameFromWidth;
          var value;
          if (direction === "to") {
            value = d.nameTo;
          } else if (direction === "from") {
            value = d.nameFrom;
          } else {
            value = d.nameTo ? d.nameTo : d.nameFrom;
          }
          return _this9.measurements.truncate(value.toString(), width);
        });
      }
      /**
       * Highlights the marker and edge for the given label and direction.
       * @param {object} edgeData - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */
    }, {
      key: "labelMouseEnter",
      value: function labelMouseEnter(edgeData, direction) {
        var _this0 = this;
        var inverse = direction === "from";
        this.rootG.selectAll("marker[id=\"".concat(this.getMarkerId(edgeData, inverse), "\"]")).select("*").classed("hovered", true);
        this.rootG.selectAll("[class*=\"".concat(this.getMarkerId(edgeData, inverse), "\"]")).selectAll("path, text").classed("hovered", true);
        //Timeout the sorting to save CPU cycles, and stop a sorting from taking place if the mouse just passed by
        this.handleHoverEvent(edgeData, "enter", direction);
        setTimeout(function () {
          var marker = _this0.rootG.selectAll("[class*=\"".concat(_this0.getMarkerId(edgeData, inverse), "\"]")).select("path, text");
          if (marker._groups[0].length > 0 && marker.classed("hovered")) {
            //Sort the labels which brings the hovered one to the foreground
            _this0.rootG.selectAll(".label").sort(function (a, b) {
              if (a.id === edgeData.id && b.id !== edgeData.id) {
                return 1; // a is hovered
              } else if (a.id !== edgeData.id && b.id === edgeData.id) {
                return -1; // b is hovered
              } else {
                // workaround to make sorting in chrome for these elements stable
                return a.id - b.id;
              }
            });
          }
        }, 250);
      }
      /**
       * Removes highlighting of marker and edge for the given label and direction
       * @param {object} edgeData - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */
    }, {
      key: "labelMouseLeave",
      value: function labelMouseLeave(edgeData, direction) {
        this.handleHoverEvent(edgeData, "leave", direction);
        var inverse = direction === "from";
        this.rootG.selectAll("marker[id=\"".concat(this.getMarkerId(edgeData, inverse), "\"]")).select("*").classed("hovered", false);
        this.rootG.selectAll("[class*=\"".concat(this.getMarkerId(edgeData, inverse), "\"]")).selectAll("path, text").classed("hovered", false);
      }
      /**
       * Draws multiplicity notation
       * @param {object} edge - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */
    }, {
      key: "drawMultiplicity",
      value: function drawMultiplicity(edge, direction) {
        var _this1 = this;
        var card = edge.append("g").attr("class", function (l) {
          return _this1.getMarkerId(l, direction === "to");
        }).classed(direction, true);
        card.append("text").attr("text-anchor", "middle").text(function (d) {
          return direction === "to" ? d.multiplicityTo : d.multiplicityFrom;
        });
      }
      /**
       * Draws a node
       * @param {D3Selection} element - D3 selection of the node html element.
       * @param {object} data - Node object
       */
    }, {
      key: "drawNode",
      value: function drawNode(element, data) {
        var _this10 = this;
        var measurementQuery = data.shape + (data.icon ? "icon" : "noicon") + "firstText";
        var contentGroupElementNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var contentGroupElement = select(contentGroupElementNode);
        var contentGroupOffsetX = 0;
        var textOffsetY = 0;
        var textAnchor = "middle";
        switch (data.shape) {
          case "circle":
            element.insert("circle", "g").attr("r", function (d) {
              return d.radius;
            }).attr("class", "node-".concat(data.type ? data.type : "default")).attr("id", data.id).classed("main-shape", true);
            if (data.icon) {
              this.drawIcon(contentGroupElement, data.icon);
              textOffsetY = Env.DEFAULT_NODE_ICON_PADDING;
            }
            break;
          case "layeredCircle":
            element.insert("circle", "g").attr("r", function (d) {
              return d.radius;
            }).attr("style", "stroke-width:0;fill:#fff;pointer-events:none;").attr("id", data.id).attr("class", "layered-circle");
            element.insert("circle", "g").attr("r", function (d) {
              return d.radius - 4;
            }).attr("class", "node-".concat(data.type ? data.type : "default")).classed("main-shape", true);
            if (data.icon) {
              this.drawIcon(contentGroupElement, data.icon);
              textOffsetY = Env.DEFAULT_NODE_ICON_PADDING;
            }
            break;
          case "rectangle":
            element.insert("rect", "g").attr("x", function (d) {
              return -d.width / 2;
            }).attr("y", function (d) {
              return -d.height / 2;
            }).attr("width", function (d) {
              return d.width;
            }).attr("height", function (d) {
              return d.height;
            }).attr("class", "node-".concat(data.type ? data.type : "default")).classed("main-shape", true).attr("id", data.id);
            if (data.icon) {
              var icon = this.drawIcon(element, data.icon);
              icon.attr("y", -Env.DEFAULT_NODE_ICON_SIZE / 2);
              icon.attr("x", -data.width / 2 + Env.ADDITIONAL_TEXT_SPACE);
              contentGroupOffsetX += -data.width / 2 + Env.ADDITIONAL_TEXT_SPACE + Env.DEFAULT_NODE_ICON_SIZE + Env.DEFAULT_NODE_ICON_PADDING;
              textAnchor = "start";
            }
            break;
          default:
            console.error("NO SHAPE FOUND FOR NODE");
        }
        element.on("mouseenter", function (event, d) {
          _this10.handleHoverEvent(d, "enter");
        }).on("mouseleave", function (event, d) {
          _this10.handleHoverEvent(d, "leave");
        }).on("mousemove", function (event, d) {
          _this10.ee.trigger(EVENTS.MOUSE_OVER_NODE, d);
        }).on("mouseout", function (event, d) {
          _this10.ee.trigger(EVENTS.MOUSE_LEFT_NODE, d);
        });
        this.drawTextBlock(contentGroupElement, textAnchor);
        //Draw the text inside the block
        if (!this.enableMultiLineNodeLabels) {
          this.drawTextline(contentGroupElement.select("text"), this.measurements.truncate(data.name, data.maxTextWidth), data.type ? data.type : "default", this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height + textOffsetY);
        } else {
          var text = data.name;
          var truncatedText = this.measurements.truncate(text, data.maxTextWidth);
          if (truncatedText.length < text.length && truncatedText.lastIndexOf(" ") > -1) {
            truncatedText = truncatedText.substring(0, truncatedText.lastIndexOf(" "));
            var otherStringTruncated = this.measurements.truncate(text.substring(truncatedText.length + 1), data.maxTextWidth);
            if (otherStringTruncated.length + truncatedText.length + 1 < text.length) {
              otherStringTruncated = otherStringTruncated.substring(0, otherStringTruncated.length - 3) + "...";
            }
            this.drawTextline(contentGroupElement.select("text"), truncatedText, data.type ? data.type : "default", this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height + textOffsetY);
            measurementQuery = measurementQuery + "secondText";
            this.drawTextline(contentGroupElement.select("text"), otherStringTruncated, data.type ? data.type : "default", this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height);
          } else {
            if (truncatedText.length < text.length) {
              truncatedText = truncatedText.substring(0, truncatedText.length - 3) + "...";
            }
            this.drawTextline(contentGroupElement.select("text"), truncatedText, data.type ? data.type : "default", this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery).height + textOffsetY);
          }
        }
        measurementQuery = measurementQuery + "finalized";
        var finalBBox = this.measurements.getSVGBBox(contentGroupElementNode, measurementQuery);
        contentGroupElement.attr("transform", "translate(".concat(contentGroupOffsetX, ", ").concat(-finalBBox.height / 2 - finalBBox.y, ")"));
        return contentGroupElementNode;
      }
      /**
       * Draws an <image> block to a given element with an icon in it
       * @param {D3Selection} element - The element that the text block should be written to
       * @param {string} icon - The source icon
       */
    }, {
      key: "drawIcon",
      value: function drawIcon(element, icon) {
        return element.append("image").attr("href", icon).attr("width", Env.DEFAULT_NODE_ICON_SIZE).attr("height", Env.DEFAULT_NODE_ICON_SIZE).attr("x", -Env.DEFAULT_NODE_ICON_SIZE / 2).attr("style", "pointer-events: none;");
      }
      /**
       * Draws a <text> block to a given element
       * @param {D3Selection} element - The element that the text block should be written to
       */
    }, {
      key: "drawTextBlock",
      value: function drawTextBlock(element, anchor) {
        element.append("text").attr("text-anchor", anchor ? anchor : "middle");
      }
      /**
       * Draws a new line of text to a given element.
       * @param {D3Selection} element - D3 Selection of the element that the text should be drawn in.
       * @param {*} word - Text to be written
       * @param {*} type - Type of node
       * @param {*} y - Y position padding
       */
    }, {
      key: "drawTextline",
      value: function drawTextline(element, word, type, y) {
        element.append("tspan").attr("class", "node-text-".concat(type)).attr("x", 0).attr("y", y).text(word);
      }
      /**
       * Draws a badge in the bottom right corner of nodes with a number of a hidden edge count in it.
       * @param {D3Selecton} element - Node element selection by D3
       * @param {Object} data - Node data
       */
    }, {
      key: "drawNodeCollapsedEdgeCounter",
      value: function drawNodeCollapsedEdgeCounter(element, data) {
        var count = "".concat(data.hiddenEdgeCount);
        var textWidth = this.measurements.getTextWidth(count);
        var fontSize = 14;
        var areaHeight = data.radius ? data.radius * 2 : data.height;
        var areaWidth = data.radius ? data.radius * 2 : data.width;
        var paddingX = 16;
        var paddingY = 16;
        var translateY = areaHeight / 2; //(make this number negative to switch between top and bottom quadrant)
        var translateX = areaWidth / 2;
        var rectHeight = fontSize + paddingY;
        var rectWidth = textWidth + paddingX;
        var rightTopRoundedRect = function rightTopRoundedRect(x, y, width, height, radius) {
          return "M".concat(x, ",").concat(y, "\n\t\t\t\th").concat(width - radius, "\n\t\t\t\tq").concat(radius, ",0 ").concat(radius, ",").concat(radius, "\n\t\t\t\tv").concat(height - 2 * radius, "\n\t\t\t\tq0,").concat(radius, " ").concat(-radius, ",").concat(radius, "\n\t\t\t\th").concat(radius * 2 - width, "\n\t\t\t\tq").concat(-radius, ",0 ").concat(-radius, ",").concat(-radius, "\n\t\t\t\tz");
        };
        element.append("g").attr("id", "badge-" + data.id + "-hidden-edge-counter").attr("class", "virrvarr-floating-node-meta").attr("style", "pointer-events:none;").attr("transform", "translate(".concat(translateX, " ").concat(translateY, ")")).append("path").attr("d", rightTopRoundedRect(-(rectWidth / 2), -(rectHeight / 2), rectWidth, rectHeight, 10)).attr("class", "virrvarr-node-badge").select(function () {
          return this.parentNode;
        }).append("text").attr("class", "virrvarr-node-edge-counter-badge-text").append("tspan").attr("style", "font-size:".concat(fontSize, ";")).text("".concat(count));
      }
      /**
       * Draws a pin in the top right corner of a node.
       * @param {D3Selecton} element - Node element selection by D3
       * @param {Object} data - Node data
       */
    }, {
      key: "drawPin",
      value: function drawPin(element, data) {
        var areaHeight = data.radius ? data.radius * 2 : data.height;
        var areaWidth = data.radius ? data.radius * 2 : data.width;
        var translateY = -(areaHeight / 2);
        var translateX = areaWidth / 2;
        var rectHeight = 25;
        var rectWidth = 25;
        var rightBottomRoundedRect = function rightBottomRoundedRect(x, y, width, height, radius) {
          return "M".concat(radius, ",").concat(y, "\n\t\t\t\th").concat(width - radius * 2, "\n\t\t\t\tq").concat(radius, ",0 ").concat(radius, ",").concat(radius, "\n\t\t\t\tv").concat(height - 2 * radius, "\n\t\t\t\tq0,").concat(radius, " ").concat(-radius, ",").concat(radius, "\n\t\t\t\th").concat(-width + radius, "\n\t\t\t\tv").concat(-height + radius, "\n\t\t\t\tq0,").concat(-radius, " ").concat(radius, ",").concat(-radius, "\n\t\t\t\tz");
        };
        element.append("g").attr("id", "pin-" + data.id).attr("class", "virrvarr-floating-node-meta").attr("style", "pointer-events:none;").attr("transform", "translate(".concat(translateX - rectWidth / 2, " ").concat(translateY, ")")).append("path").attr("d", rightBottomRoundedRect(-(rectWidth / 2), -(rectHeight / 2), rectWidth, rectHeight, 10)).attr("class", "virrvarr-node-badge").select(function () {
          return this.parentNode;
        }).append("path").attr("d", "M24.715,261.811c-5.492,0-10.645-2.133-14.521-6.01c-8.011-8.017-8.011-21.054-0.006-29.064    l70.375-70.372L38.51,113.785c-7.073-7.179-7.928-18.303-2.039-26.466c0.855-1.184,21.314-28.839,58.964-28.839    c2.224,0,4.492,0.101,6.756,0.295L180.62,3.597c8.103-5.729,20.081-4.48,26.863,2.796l44.675,48.037    c6.919,7.436,7.319,19.006,0.926,26.906l-55.882,69.151c1.979,23.759,1.052,63.069-23.901,77.725    c-7.959,4.666-18.578,3.26-25.021-3.282l-38.837-39.316l-70.206,70.183C35.365,259.678,30.208,261.811,24.715,261.811z").attr("style", "fill:#ffffff;transform: scale(0.05) translate(120px, -130px);stroke:#ffffff;");
      }
      /**
       * Creates event listener for onClick events for nodes and edges
       */
    }, {
      key: "attachEntityClickListeners",
      value: function attachEntityClickListeners() {
        var _this11 = this;
        //We need to stop the click event if it is a double click event
        //We do this using a timeout that starts on click and cancels on double click.
        var timeout = null;
        this.rootG.selectAll(".node").on("click", function (event, d) {
          event.stopPropagation();
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: d.id,
              data: d.data
            });
          }, Env.DOUBLE_CLICK_THRESHOLD);
        }).on("dblclick", function (event, d) {
          event.stopPropagation();
          clearTimeout(timeout);
          _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
            id: d.id,
            data: d.data
          });
        }).on("contextmenu", function (event, d) {
          event.preventDefault();
          event.stopPropagation();
          _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d);
        });
        this.rootG.selectAll(".label .from").on("click", function (event, d) {
          event.stopPropagation();
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: d.id,
              data: d.data,
              direction: "from"
            });
          }, Env.DOUBLE_CLICK_THRESHOLD);
        }).on("dblclick", function (event, d) {
          event.stopPropagation();
          _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "from"
          });
        }).on("contextmenu", function (event, d) {
          event.preventDefault();
          event.stopPropagation();
          _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d, "from");
        });
        this.rootG.selectAll(".label .to").on("click", function (event, d) {
          event.stopPropagation();
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: d.id,
              data: d.data,
              direction: "to"
            });
          }, Env.DOUBLE_CLICK_THRESHOLD);
        }).on("dblclick", function (event, d) {
          event.stopPropagation();
          _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "to"
          });
        }).on("contextmenu", function (event, d) {
          event.preventDefault();
          event.stopPropagation();
          _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d, "to");
        });
      }
      /**
       * Handles what happens when an item is hovered
       * @param {object} hoveredData - Object that has been hovered
       * @param {"enter"|"leave"} eventType - What type of event it is.
       * @param {"to"|"from"} direction? - If an edge is hovered then this will show the potential direction.
       */
    }, {
      key: "handleHoverEvent",
      value: function handleHoverEvent(hoveredData, eventType) {
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        this.hoveredEntity = eventType === "enter" ? hoveredData : null;
        this.hoveredDirection = eventType === "enter" ? direction : null;
        if (this.dragSelection.length > 0) {
          //Do not do anything if a node is being dragged
          return;
        }
        this.ee.trigger(EVENTS.HOVER_ENTITY, {
          eventType: eventType,
          id: hoveredData.id,
          data: hoveredData.data,
          direction: direction
        });
        if (this.enableFadeOnHover) {
          if (!hoveredData.sourceNode) {
            var filteredEdges = this.edges.filter(function (edge) {
              return edge.sourceNode === hoveredData.id || edge.targetNode === hoveredData.id;
            });
            var validNodes = filteredEdges.reduce(function (acc, edge) {
              acc.push(edge.targetNode);
              acc.push(edge.sourceNode);
              return acc;
            }, []);
            validNodes.push(hoveredData.id);
            var opacity = eventType === "enter" ? "" + Env.DEFAULT_FADE_OPACITY : "" + 1;
            this.rootG.selectAll(".node").filter(function (d) {
              return validNodes.find(function (node) {
                return node === d.id;
              }) === undefined;
            }).transition().duration(Env.FADE_TIME).ease(linear).style("opacity", opacity);
            this.rootG.selectAll(".edge").filter(function (d) {
              return filteredEdges.find(function (edge) {
                return edge.id === d.id;
              }) === undefined;
            }).transition().duration(Env.FADE_TIME).ease(linear).style("opacity", opacity);
            this.rootG.selectAll(".label").filter(function (d) {
              return filteredEdges.find(function (edge) {
                return edge.id === d.id;
              }) === undefined;
            }).transition().duration(Env.FADE_TIME).ease(linear).style("opacity", opacity);
          }
        }
      }
      /**
       * Animation tick
       */
    }, {
      key: "tick",
      value: function tick() {
        var _this12 = this;
        //Nodes
        this.nodeElements.attr("transform", function (node) {
          return "translate(" + node.x + "," + node.y + ")";
        });
        //Edges
        this.edgePath.attr("d", function (l) {
          if (l.source.x === l.target.x && l.source.y === l.target.y && l.source.id !== l.target.id) {
            //The two nodes are at the exact same position
            return "";
          }
          if (l.source === l.target) {
            return MathUtils.calculateSelfEdgePath(l);
          }
          if (_this12.rotateLabels) {
            l.angle = MathUtils.calculateLabelAngle(l.source, l.target);
          } else {
            l.angle = 0;
          }
          var lineTypeToUse = l.lineType ? l.lineType : _this12.lineType;
          //Calculate curve point (this will also be used later for multiplicity and label positioning)
          var pathStart;
          var pathEnd;
          if (!lineTypeToUse.startsWith("arc")) {
            pathStart = MathUtils.calculateIntersection(l.target, l.source, 1);
            pathEnd = MathUtils.calculateIntersection(l.source, l.target, 1);
          }
          //Arc lines
          if (lineTypeToUse === "arctop" || lineTypeToUse === "arcright" || lineTypeToUse === "arcbottom" || lineTypeToUse === "arcleft") {
            var edgeStartX;
            var edgeStartY;
            var edgeEndX;
            var edgeEndY;
            var flip;
            if (lineTypeToUse === "arctop") {
              edgeStartX = l.source.x;
              edgeEndX = l.target.x;
              edgeStartY = l.source.y - (l.source.radius ? l.source.radius : l.source.height / 2);
              edgeEndY = l.target.y - (l.target.radius ? l.target.radius : l.target.height / 2);
              flip = edgeEndX > edgeStartX ? 1 : 0;
              var midpointX = edgeStartX + (edgeEndX - edgeStartX) / 2;
              var yCurvePoint = edgeStartY - Math.abs((edgeEndX - edgeStartX) / 2);
              l.curvePoint = {
                x: midpointX,
                y: yCurvePoint
              };
            } else if (lineTypeToUse === "arcright") {
              edgeStartX = l.source.x + (l.source.radius ? l.source.radius : l.source.width / 2);
              edgeStartY = l.source.y;
              edgeEndX = l.target.x + (l.target.radius ? l.target.radius : l.target.width / 2);
              edgeEndY = l.target.y;
              flip = edgeEndY > edgeStartY ? 1 : 0;
              var _midpointX = edgeStartX + Math.abs((edgeEndY - edgeStartY) / 2);
              var _yCurvePoint = edgeStartY + (edgeEndY - edgeStartY) / 2;
              l.curvePoint = {
                x: _midpointX,
                y: _yCurvePoint
              };
            } else if (lineTypeToUse === "arcbottom") {
              edgeStartX = l.source.x;
              edgeEndX = l.target.x;
              edgeStartY = l.source.y + (l.source.radius ? l.source.radius : l.source.height / 2);
              edgeEndY = l.target.y + (l.target.radius ? l.target.radius : l.target.height / 2);
              flip = edgeEndX < edgeStartX ? 1 : 0;
              var _midpointX2 = edgeStartX + (edgeEndX - edgeStartX) / 2;
              var _yCurvePoint2 = edgeStartY + Math.abs((edgeEndX - edgeStartX) / 2);
              l.curvePoint = {
                x: _midpointX2,
                y: _yCurvePoint2
              };
            } else if (lineTypeToUse === "arcleft") {
              edgeStartX = l.source.x - (l.source.radius ? l.source.radius : l.source.width / 2);
              edgeStartY = l.source.y;
              edgeEndX = l.target.x - (l.target.radius ? l.target.radius : l.target.width / 2);
              edgeEndY = l.target.y;
              flip = edgeEndY < edgeStartY ? 1 : 0;
              var _midpointX3 = edgeStartX - Math.abs((edgeEndY - edgeStartY) / 2);
              var _yCurvePoint3 = edgeStartY + (edgeEndY - edgeStartY) / 2;
              l.curvePoint = {
                x: _midpointX3,
                y: _yCurvePoint3
              };
            }
            return "M ".concat(edgeStartX, ", ").concat(edgeStartY, "\n\t\t\t\tA ").concat((edgeStartY - edgeEndY) / 2, ",\n\t\t\t\t").concat((edgeStartY - edgeEndY) / 2, " 0 0, ").concat(flip, "\n\t\t\t\t").concat(edgeEndX, ", ").concat(edgeEndY);
          }
          //Taxi lines
          if (lineTypeToUse === "taxi" && l.multiEdgeCount === 1 || lineTypeToUse === "fulltaxi") {
            var midPointY = pathStart.y + (pathEnd.y - pathStart.y) / 2;
            //Fulltaxi means we apply the taxi lines to the multi edge edges as well
            if (lineTypeToUse === "fulltaxi" && l.multiEdgeCount > 1) {
              var dividedDistance = (pathEnd.y - pathStart.y) / l.multiEdgeCount;
              midPointY = pathStart.y + dividedDistance * l.multiEdgeIndex + dividedDistance / 2;
              l.curvePoint = {
                x: pathStart.x + (pathEnd.x - pathStart.x) / 2,
                y: midPointY
              };
            } else {
              l.curvePoint = MathUtils.calculateCurvePoint(pathStart, pathEnd, l);
            }
            return "M".concat(pathStart.x, ",").concat(pathStart.y, " \n\t\t\t\t\tL").concat(pathStart.x, ",").concat(midPointY, " \n\t\t\t\t\tL").concat(pathEnd.x, ",").concat(midPointY, " \n\t\t\t\t\t").concat(pathEnd.x, ",").concat(pathEnd.y);
          }
          //Cubic bezier curve
          if (lineTypeToUse === "cubicbezier" && l.multiEdgeCount === 1) {
            l.curvePoint = MathUtils.calculateCurvePoint(pathStart, pathEnd, l);
            return "M".concat(pathStart.x, ", ").concat(pathStart.y, " \n\t\t\t\t\tC").concat((pathStart.x + pathEnd.x) / 2, ", ").concat(pathStart.y, " \n\t\t\t\t\t").concat((pathStart.x + pathEnd.x) / 2, ", ").concat(pathEnd.y, " \n\t\t\t\t\t").concat(pathEnd.x, ", ").concat(pathEnd.y);
          }
          //Straight line
          else {
            l.curvePoint = MathUtils.calculateCurvePoint(pathStart, pathEnd, l);
            return MathUtils.curveFunction([MathUtils.calculateIntersection(l.curvePoint, l.source, 1), l.curvePoint, MathUtils.calculateIntersection(l.curvePoint, l.target, 1)]);
          }
        });
        //Multiplicities
        this.activeMultiplicities.attr("transform", function (l) {
          var group = select(this);
          var pos;
          if (group.classed("to")) {
            pos = MathUtils.calculateIntersection(l.curvePoint, l.target, Env.MULTIPLICITY_HDISTANCE);
          } else {
            pos = MathUtils.calculateIntersection(l.curvePoint, l.source, Env.MULTIPLICITY_HDISTANCE);
          }
          var n = MathUtils.calculateNormalizedVector(l.curvePoint, l.source, Env.MULTIPLICITY_VDISTANCE);
          if (l.source.index < l.target.index) {
            n.x = -n.x;
            n.y = -n.y;
          }
          return "translate(" + (pos.x + n.x) + "," + (pos.y + n.y) + ")";
        });
        //Labels
        this.labels.attr("transform", function (l) {
          if (l.source.x === l.target.x && l.source.y === l.target.y && l.source.id !== l.target.id) {
            return "";
          }
          var group = select(this);
          var midX = l.curvePoint.x;
          var midY = l.curvePoint.y;
          if (l.nameFrom) {
            if (group.classed("to")) {
              midY += Env.LABEL_HEIGHT / 2 + 1;
            } else if (group.classed("from")) {
              midY -= Env.LABEL_HEIGHT / 2 + 1;
            }
          }
          if (l.angle) {
            return "translate(" + midX + "," + midY + ") rotate(" + l.angle + ")";
          } else {
            return "translate(" + midX + "," + midY + ")";
          }
        });
      }
    }]);
    return DOMProcessor;
  }();

  /**
   * The selection lasso class handles drawing the selection lasso on screen, and determining node focuses based on it.
   */
  var SelectionLasso = /*#__PURE__*/function () {
    /**
     *
     * @param {HTMLElement} graphContainerElement
     * @param {EventEmitter} eventEmitter
     */
    function SelectionLasso(graphContainerElement, eventEmitter) {
      var _this = this;
      _classCallCheck(this, SelectionLasso);
      this.graphContainerElement = graphContainerElement;
      this.ee = eventEmitter;
      this.lasso = this.initializeLasso();
      this.isLassoEnabled = false;
      this.isLassoActive = false;
      this.originX = 0;
      this.originY = 0;
      this.ee.on(EVENTS.LASSO_MODE_TOGGLED, function (isEnabled) {
        _this.isLassoEnabled = isEnabled;
        !isEnabled && _this.hideLasso();
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.destroy();
      });
    }

    /**
     * Initializes the lasso
     */
    _createClass(SelectionLasso, [{
      key: "initializeLasso",
      value: function initializeLasso() {
        var _this2 = this;
        select(this.graphContainerElement).on("mousedown", function (event) {
          return _this2.isLassoEnabled && _this2.showLasso(event);
        }).on("mousemove", function (event) {
          return _this2.isLassoEnabled && _this2.isLassoActive && _this2.moveLasso(event);
        }).on("mouseup", function () {
          return _this2.isLassoActive && _this2.hideLasso();
        }).on("mouseout", function (event) {
          var outsideContainer = true;
          if (event.relatedTarget) {
            var target = event.relatedTarget;
            while (target.parentElement) {
              if (target.parentElement === _this2.graphContainerElement) {
                outsideContainer = false;
                break;
              }
              target = target.parentElement;
            }
          }
          if (_this2.isLassoActive && outsideContainer) {
            _this2.hideLasso();
          }
        });
        return select(this.graphContainerElement).append("div").attr("id", "selection-lasso").on("mousemove", function (event) {
          return _this2.isLassoEnabled && _this2.isLassoActive && _this2.moveLasso(event);
        }).node();
      }
      /**
       * Move the lasso based on new mouse coordinates
       */
    }, {
      key: "moveLasso",
      value: function moveLasso(event) {
        var coordinates = pointer(event, this.graphContainerElement);
        var newX = coordinates[0] + this.graphContainerElement.getBoundingClientRect().x - window.pageXOffset + window.scrollX;
        var newY = coordinates[1] + this.graphContainerElement.getBoundingClientRect().y - window.pageYOffset + window.scrollY;
        var relativeX = newX - this.originX;
        var relativeY = newY - this.originY;
        var width = Math.abs(relativeX);
        var height = Math.abs(relativeY);
        this.lasso.style.width = "".concat(width, "px");
        this.lasso.style.height = "".concat(height, "px");
        this.lasso.style.left = "".concat(Math.min(newX, this.originX), "px");
        this.lasso.style.top = "".concat(Math.min(newY, this.originY), "px");
        var rect = this.lasso.getBoundingClientRect();
        this.ee.trigger(EVENTS.LASSO_MOVED, rect.x, rect.y, width, height);
      }
      /**
       * Shows the lasso
       */
    }, {
      key: "showLasso",
      value: function showLasso(event) {
        var coordinates = pointer(event, this.graphContainerElement);
        this.originX = coordinates[0] + this.graphContainerElement.getBoundingClientRect().x - window.pageXOffset + window.scrollX;
        this.originY = coordinates[1] + this.graphContainerElement.getBoundingClientRect().y - window.pageYOffset + window.scrollY;
        this.lasso.style.display = "block";
        this.lasso.style.width = "0px";
        this.lasso.style.height = "0px";
        this.lasso.style.left = "".concat(this.originX, "px");
        this.lasso.style.top = "".concat(this.originY, "px");
        this.isLassoActive = true;
        this.ee.trigger(EVENTS.LASSO_ENTER);
      }
      /**
       * Hides the lasso
       */
    }, {
      key: "hideLasso",
      value: function hideLasso() {
        this.originX = 0;
        this.originY = 0;
        this.lasso.style.removeProperty("display");
        this.isLassoActive = false;
        this.ee.trigger(EVENTS.LASSO_EXIT);
      }
      /**
       * Unmounts the lasso from the DOM
       */
    }, {
      key: "destroy",
      value: function destroy() {
        this.lasso.remove();
      }
    }]);
    return SelectionLasso;
  }();

  /**
   * The UI class manages all different UI addons.
   */
  var UI = /*#__PURE__*/function () {
    function UI(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
      var _this = this;
      _classCallCheck(this, UI);
      this.graphContainerElement = graphContainerElement;
      this.style = styles;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.STYLE_UPDATE_REQUESTED, function (newStyles) {
        return _this.updateStyles(newStyles);
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.destroy();
      });
      this.zoomHandler = new ZoomHandler(this.graphContainerElement, this.ee, userDefinedOptions);
      this.contextMenu = new ContextMenu(this.graphContainerElement, this.ee, userDefinedOptions);
      this.tooltip = new Tooltip(this.graphContainerElement, this.ee);
      this.stylesID = ("A" + Math.random()).replace(".", "");
      CSSUtil.initializeGraphStyles(this.style, this.stylesID, graphContainerElement);
      this.rootG = this.initializeDOM();
      this.selectionLasso = new SelectionLasso(this.graphContainerElement, this.ee);
      this.highlighter = new Highlighter(this.graphContainerElement, this.ee, userDefinedOptions);
      this.grid = new Grid(this.graphContainerElement, this.ee, userDefinedOptions);
      this.DOMProcessor = new DOMProcessor(this.graphContainerElement, this.ee, userDefinedOptions);
    }
    _createClass(UI, [{
      key: "initializeDOM",
      value: function initializeDOM() {
        var _this2 = this;
        var rootG = select(this.graphContainerElement).insert("svg", "*").attr("class", "virrvarr").classed("svgGraph", true).attr("width", "100%").attr("height", "100%").on("click", function (event) {
          //Do not bubble the event
          event.stopPropagation();
          _this2.ee.trigger(EVENTS.CLICK_ENTITY, null);
        }).on("contextmenu", function (event) {
          event.preventDefault();
          event.stopPropagation();
          _this2.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, null);
        }).call(this.zoom).on("dblclick.zoom", null).append("g");
        rootG.append("defs");
        rootG.append("g").attr("id", "edge-container");
        rootG.append("g").attr("id", "label-container");
        rootG.append("g").attr("id", "multiplicity-container");
        rootG.append("g").attr("id", "layout-extras");
        rootG.append("g").attr("id", "node-container");
        return rootG;
      }
    }, {
      key: "updateStyles",
      value: function updateStyles(newStyles) {
        this.style = newStyles;
        select(this.graphContainerElement).select("#".concat(this.stylesID)).remove();
        CSSUtil.initializeGraphStyles(this.style, this.stylesID, this.graphContainerElement);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.rootG.select("#edge-container").selectAll(".edge").remove();
        this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
        this.rootG.select("#node-container").selectAll(".node").remove();
        this.rootG.select("#label-container").selectAll(".label").remove();
        this.rootG.select("#layout-extras").selectAll("*").remove();
        select(this.graphContainerElement).select("svg").remove();
        select(this.graphContainerElement).select("#".concat(this.stylesID)).remove();
      }
    }, {
      key: "zoom",
      get: function get() {
        return this.zoomHandler.zoom;
      }
    }, {
      key: "context",
      get: function get() {
        return this.contextMenu;
      }
    }, {
      key: "width",
      get: function get() {
        return this.graphContainerElement.offsetWidth;
      }
    }, {
      key: "height",
      get: function get() {
        return this.graphContainerElement.offsetHeight;
      }
    }]);
    return UI;
  }();

  /**
   * Creates a rectangular bounding box that stops nodes from leaving it
   * @param {number=} width - Width of the box. If not set will be determined by the sizes and amounts of the nodes
   * @param {number=} height - Height of the box. If not set will be determined by the sizes and amounts of the nodes
   */
  var boundingBoxForce = function boundingBoxForce(width, height) {
    var nodes = [];
    var computedWidth = width;
    var computedHeight = height;
    var multiplier = 5;
    function force() {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.x < -computedWidth) {
          node.x = -computedWidth;
        } else if (node.x > computedWidth) {
          node.x = computedWidth;
        }
        if (node.y < -computedHeight) {
          node.y = -computedHeight;
        } else if (node.y > computedHeight) {
          node.y = computedHeight;
        }
      }
    }
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      if (!width || !height) {
        var size = 0;
        nodes.forEach(function (node) {
          size += Math.max(size, getWidth(node) * multiplier, getHeight(node) * multiplier);
        });
        if (!width && !height) {
          computedWidth = size / 2;
          computedHeight = size / 2;
        } else if (!width) {
          computedWidth = size - height > 0 ? size - height : 100;
        } else if (!height) {
          computedHeight = size - width > 0 ? size - width : 100;
        }
      } else {
        computedWidth = width;
        computedHeight = height;
      }
      computedWidth = computedWidth / 2;
      computedHeight = computedHeight / 2;
    };
    return force;
  };

  //Adapted from: https://observablehq.com/@d3/clustered-bubbles
  /**
   * Creates a cluster force that forces nodes together
   * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
   * @param {number=} strength - How strong should the force be that pulls the nodes together? (0-1)
   * @param {boolean=} showOutline - Should a square with a title be rendered around each cluster?
   */
  var clusterForce = function clusterForce(groupBy, strength) {
    var showOutline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var computeGroup = groupBy ? typeof groupBy === "string" ? function (node) {
      return node[groupBy];
    } : function (node) {
      return groupBy(node.data);
    } : function (node) {
      return node.type;
    };
    var power = strength ? strength : 0.7;
    var groups = [];
    var nodes = [];
    var element;
    var BORDER_PADDING = 200;
    var computeCentroid = function computeCentroid(nodes) {
      var x = 0;
      var y = 0;
      var z = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          var k = Math.pow(node.radius ? node.radius : Math.max(node.width, node.height), 2);
          x += node.x * k;
          y += node.y * k;
          z += k;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return {
        x: x / z,
        y: y / z
      };
    };
    function force(alpha) {
      var l = alpha * power;
      groups.forEach(function (group) {
        var centroid = computeCentroid(group);
        group.forEach(function (node) {
          var cx = centroid.x,
            cy = centroid.y;
          node.vx -= (node.x - cx) * l;
          node.vy -= (node.y - cy) * l;
        });
      });
      if (showOutline) {
        groups.forEach(function (group, index) {
          var xStart = Infinity;
          var yStart = Infinity;
          var xEnd = -Infinity;
          var yEnd = -Infinity;
          group.forEach(function (node) {
            var halfWidth = node.width ? node.width / 2 : node.radius;
            var halfHeight = node.height ? node.height / 2 : node.radius;
            node.x - halfWidth < xStart && (xStart = node.x - halfWidth);
            node.y - halfHeight < yStart && (yStart = node.y - halfHeight);
            var nodeEndX = node.x + halfWidth;
            var nodeEndY = node.y + halfHeight;
            nodeEndX > xEnd && (xEnd = nodeEndX);
            nodeEndY > yEnd && (yEnd = nodeEndY);
          });
          var g = select(element).select("[class=\"".concat(index, "\"]"));
          g.attr("transform", "translate(".concat(xStart - BORDER_PADDING / 2, ", ").concat(yStart - BORDER_PADDING / 2, ")")).select("rect").attr("height", yEnd - yStart + BORDER_PADDING);
          g.selectAll("rect").attr("width", xEnd - xStart + BORDER_PADDING);
        });
      }
    }
    force.element = function (newElement) {
      element = newElement;
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      var newGroups = new Map();
      nodes.forEach(function (node) {
        var group = computeGroup(node);
        if (!newGroups.has(group)) {
          newGroups.set(group, [node]);
        } else {
          newGroups.get(group).push(node);
        }
      });
      if (showOutline) {
        select(element).selectAll("*").remove();
        Array.from(newGroups.keys()).forEach(function (key, index) {
          var g = select(element).append("g").classed(index, true);
          g.append("rect").attr("stroke-width", "4px").attr("stroke", "#000000").attr("fill", "none");
          g.append("rect").attr("stroke-width", "4px").attr("stroke", "#000000").attr("fill", "#f7f7f7").attr("y", -35).attr("height", 35);
          g.append("text").text(key === undefined ? "N/A" : key).attr("style", "font-size:26px;").attr("y", -10).attr("x", 10);
        });
      }
      groups = _toConsumableArray(newGroups.values());
    };
    return force;
  };

  /**
   * Takes a graph as input and returns nodes sorted by level from first source to last target.
   * Also returns a second array containing "fake" nodes that connect the different layers.
   * @param {VVNode[]} nodes
   * @param {VVEdge[]} edges
   * @returns {{hierarchy: VVNode[][], fakeNodesHierarchy: {id: string}[][] fakeEdges: {sourceNode: string, targetNode: string}[]}} - Level array of nodes
   */
  var determineLevels = function determineLevels(nodes, edges) {
    var incomingEdges = new Map(nodes.map(function (node) {
      return [node.id, edges.filter(function (edge) {
        return edge.targetNode === node.id;
      })];
    }));
    var outgoingEdges = new Map(nodes.map(function (node) {
      return [node.id, edges.filter(function (edge) {
        return edge.sourceNode === node.id;
      })];
    }));

    //Compute y coordinate for a node. This is the same as "level", but makes the variables more readable.
    //Islands are reserved on level 0, and sources start at level 1. Generally this results in a more readable layout.
    var sources = nodes.filter(function (node) {
      return !incomingEdges.get(node.id).length && outgoingEdges.get(node.id).length;
    });
    var islands = nodes.filter(function (node) {
      return !incomingEdges.get(node.id).length && !outgoingEdges.get(node.id).length;
    });
    var yCoordinates = new Map([].concat(_toConsumableArray(islands.map(function (node) {
      return [node.id, 0];
    })), _toConsumableArray(sources.map(function (node) {
      return [node.id, 1];
    }))));
    var getYCoordinate = function getYCoordinate(nodeID) {
      if (!yCoordinates.has(nodeID)) {
        var maxLevelSource = Math.max.apply(Math, _toConsumableArray(incomingEdges.get(nodeID).map(function (edge) {
          return getYCoordinate(edge.sourceNode);
        })));
        yCoordinates.set(nodeID, maxLevelSource + 1);
      }
      return yCoordinates.get(nodeID);
    };

    //Assign all nodes to levels
    var levels = new Map();
    for (var i = 0; i < nodes.length; i++) {
      var level = getYCoordinate(nodes[i].id);
      if (!levels.has(level)) {
        levels.set(level, []);
      }
      levels.get(level).push(nodes[i]);
    }
    var nodesByLevel = Array.from(levels.keys()).sort(function (a, b) {
      return a - b;
    }).map(function (key) {
      return levels.get(key);
    });

    //Compute fake nodes
    var fakeNodesByLevel = nodesByLevel.map(function () {
      return [];
    });
    var fakeEdgeArray = [];
    var createdNodes = new Set();
    for (var _i = 0; _i < nodes.length; _i++) {
      var nodeID = nodes[_i].id;
      var nodeYLevel = getYCoordinate(nodeID);
      var sourceNodes = incomingEdges.get(nodeID).map(function (edge) {
        return edge.sourceNode;
      });
      for (var j = 0; j < sourceNodes.length; j++) {
        var sourceNodeID = sourceNodes[j];
        var sourceYLevel = getYCoordinate(sourceNodeID);
        var diff = nodeYLevel - sourceYLevel;
        if (diff > 1) {
          var nextSourceNodeID = sourceNodeID;
          for (var z = sourceYLevel + 1; z < nodeYLevel; z++) {
            var fakeNodeID = "__FAKE_NODE__" + z + nodeID + nextSourceNodeID;
            if (!createdNodes.has(fakeNodeID)) {
              //There can be nodes with multiple connections between each other. These should result in a single fake vertex.
              createdNodes.add(fakeNodeID);
              var fakeNode = {
                id: fakeNodeID
              };
              fakeNodesByLevel[z - 1].push(fakeNode); //We need -1 because islands are reserved for level 0
            }
            fakeEdgeArray.push({
              sourceNode: nextSourceNodeID,
              targetNode: fakeNodeID
            });
            nextSourceNodeID = fakeNodeID;
          }
          fakeEdgeArray.push({
            sourceNode: nextSourceNodeID,
            targetNode: nodeID
          });
        }
      }
    }
    return {
      hierarchy: nodesByLevel,
      fakeNodesHierarchy: fakeNodesByLevel,
      fakeEdges: fakeEdgeArray
    };
  };

  /**
   * Computes groups based on disjointed graphs within the graph.
   */
  var DisjointGroups = (function (nodes, edges) {
    var seenNodes = new Set();
    var groups = new Map();
    var loopGroup = function loopGroup(nodeID, rootRepresentativeNodeID) {
      if (seenNodes.has(nodeID)) {
        return;
      }
      seenNodes.add(nodeID);
      var representativeNodeID;
      if (!rootRepresentativeNodeID) {
        representativeNodeID = nodeID;
        groups.set(nodeID, [nodeID]);
      } else {
        representativeNodeID = rootRepresentativeNodeID;
        groups.get(representativeNodeID).push(nodeID);
      }
      edges.filter(function (edge) {
        return edge.sourceNode !== edge.targetNode && (edge.sourceNode === nodeID || edge.targetNode === nodeID);
      }).reduce(function (acc, edge) {
        acc.push(edge.targetNode);
        acc.push(edge.sourceNode);
        return acc;
      }, []).forEach(function (nodeID) {
        loopGroup(nodeID, representativeNodeID);
      });
    };
    nodes.forEach(function (node) {
      loopGroup(node.id);
    });
    return _toConsumableArray(groups.values()).map(function (cluster) {
      return cluster.map(function (nodeID) {
        return nodes.find(function (node) {
          return node.id === nodeID;
        });
      });
    });
  });

  /**
   * Takes a leveled hierarchy graph and reorders the contained edges to an optimal position.
   * If a fake hierarchy is provided null values will be inserted into the resulting order.
   * Solution is partially inspired by the "Hungarian Method" for maximization
   * @param {VVNode[][]} hierarchy
   * @param {{id: string}[][]} fakeHierarchy
   * @param {VVEdge[]} edges
   * @param {{sourceNode: string, targetNode: string}} fakeEdges
   * @returns {VVNode[][]} - Ordered Hierarchy
   */
  var edgeOrder = function edgeOrder(hierarchy, edges, fakeHierarchy) {
    var fakeEdges = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    if (hierarchy.length === 1) {
      return hierarchy;
    }
    var fullHierarchy = fakeHierarchy ? hierarchy.map(function (level, index) {
      return [].concat(_toConsumableArray(level), _toConsumableArray(fakeHierarchy[index]));
    }) : hierarchy;

    //Only edges that go between two adjacent levels should be included
    var nodeLevelMap = new Map();
    var nodeIndexInLevel = new Map();
    fullHierarchy.forEach(function (level, levelIndex) {
      level.forEach(function (node, nodeIndex) {
        nodeLevelMap.set(node.id, levelIndex);
        nodeIndexInLevel.set(node.id, nodeIndex);
      });
    });
    var allEdges = [].concat(_toConsumableArray(edges), _toConsumableArray(fakeEdges)).filter(function (edge) {
      var sourceLevel = nodeLevelMap.get(edge.sourceNode);
      var targetLevel = nodeLevelMap.get(edge.targetNode);
      if (sourceLevel === targetLevel - 1) {
        return true;
      }
      return false;
    });

    //The index of the nodes in the hierarchy will change during ordering. We need to keep track of this
    var updateNodeIndexForLevel = function updateNodeIndexForLevel(level) {
      level.forEach(function (node, nodeIndex) {
        nodeIndexInLevel.set(node.id, nodeIndex);
      });
    };
    var findNodeIndexInLevel = function findNodeIndexInLevel(nodeID) {
      return nodeIndexInLevel.get(nodeID);
    };

    //When it has been determined what node is most likely to need to lie to the left we can recursively check if any other node is better suited
    //This is necessary because the initial "optimal" node is just an approximation
    var findLeftOptimality = function findLeftOptimality(index, matrix) {
      var optimalIndex = index;
      var depth = 0;
      while (true) {
        var foundLeftSums = matrix.map(function (row) {
          return row.sum[optimalIndex] > 0 ? row.sum[optimalIndex] : 0;
        });
        var maxIndex = foundLeftSums.indexOf(Math.max.apply(Math, _toConsumableArray(foundLeftSums)));
        if (foundLeftSums[maxIndex] !== 0) {
          optimalIndex = maxIndex;
          depth++;
          if (depth > 9999) {
            //This will be as near optimal as it.
            break;
          }
          continue;
        }
        break;
      }
      return optimalIndex;
    };

    //Order scan is from start level to end level
    //Reverse is when we go from top to bottom rather than bottom to top
    //This loop could probably be made faster in the future.
    var orderHierarchyLevels = function orderHierarchyLevels(hierarchy) {
      var isReverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      hierarchy.forEach(function (level, levelIndex) {
        var nodeSourceIndexMap = new Map(level.map(function (node) {
          return [node.id, []];
        }));
        allEdges.forEach(function (edge) {
          if (!isReverse && nodeSourceIndexMap.has(edge.targetNode)) {
            nodeSourceIndexMap.get(edge.targetNode).push(findNodeIndexInLevel(edge.sourceNode));
          } else if (isReverse && nodeSourceIndexMap.has(edge.sourceNode)) {
            nodeSourceIndexMap.get(edge.sourceNode).push(findNodeIndexInLevel(edge.targetNode));
          }
        });
        var matrix = level.map(function (node) {
          var nodeSourceIndexes = nodeSourceIndexMap.get(node.id);
          return {
            node: node,
            sum: level.map(function (neighbourNode) {
              if (neighbourNode.id === node.id) {
                return 0;
              }
              var neighbourSourceIndexes = nodeSourceIndexMap.get(neighbourNode.id);
              //These parameters describe the penalty of being to the left / right of the neighbour in terms of crossings
              var nodeIsToTheLeft = 0;
              var nodeIsToTheRight = 0;
              nodeSourceIndexes.forEach(function (nodeIndex) {
                neighbourSourceIndexes.forEach(function (neighbourIndex) {
                  nodeIndex < neighbourIndex && nodeIsToTheRight++;
                  nodeIndex > neighbourIndex && nodeIsToTheLeft++;
                });
              });
              //This result represents how many *less* crossings there will be if the node is to the left of its neighbour
              //I.e. A higher number means it is better to the left
              return nodeIsToTheRight - nodeIsToTheLeft;
            })
          };
        });
        var newOrder = [];
        var orderLength = matrix.length;
        var _loop = function _loop(i) {
          var sums = matrix.map(function (row) {
            return row.sum.reduce(function (acc, cell) {
              return acc + cell;
            }, 0);
          });
          var indexToSplit = findLeftOptimality(sums.indexOf(Math.max.apply(Math, _toConsumableArray(sums))), matrix);
          newOrder.push(matrix[indexToSplit].node);
          matrix.forEach(function (row) {
            row.sum.splice(indexToSplit, 1); //Remove the column
          });
          matrix.splice(indexToSplit, 1); //Remove the row
        };
        for (var i = 0; i < orderLength; i++) {
          _loop();
        }
        updateNodeIndexForLevel(newOrder);
        hierarchy[levelIndex] = newOrder;
      });
      return hierarchy;
    };

    //We sweep bottom to top and then top to bottom
    //A case could be made for repeating the process until an optimal layout is found. A single pass usually gives an OK result though.
    for (var i = 0; i < 1; i++) {
      fullHierarchy = orderHierarchyLevels(orderHierarchyLevels(fullHierarchy).reverse(), true).reverse();
    }
    //Initial reactions suggest that doing a bottom to top scan last gives a generally slightly nicer result.
    fullHierarchy = orderHierarchyLevels(fullHierarchy);
    return fullHierarchy;
  };

  /**
   * Takes a graph as input and returns an acyclic version.
   * Note that the array of nodes and edges returned may not contain all the input ones.
   * Based on Eades, Lin, Smyth, '93
   * @param {VVNode[]} nodes
   * @param {VVEdge[]} edges
   * @returns {[VVNode[], VVEdge[]]} - Acyclic Graph
   */
  var makeAcyclic = function makeAcyclic(nodes, edges) {
    var originalNodes = _toConsumableArray(nodes);
    var originalEdges = edges.filter(function (edge) {
      return edge.targetNode !== edge.sourceNode;
    });
    var incomingCount = new Map(originalNodes.map(function (node) {
      return [node.id, 0];
    }));
    var outgoingCount = new Map(originalNodes.map(function (node) {
      return [node.id, 0];
    }));
    originalEdges.forEach(function (edge) {
      incomingCount.set(edge.targetNode, incomingCount.get(edge.targetNode) + 1);
      outgoingCount.set(edge.sourceNode, outgoingCount.get(edge.sourceNode) + 1);
    });
    var resultingNodes = [];
    var resultingEdges = [];
    var findSinksOrSources = function findSinksOrSources() {
      var isSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      while (true) {
        var hasChanged = false;
        for (var i = 0; i < originalNodes.length; i++) {
          var node = originalNodes[i];
          if (!isSource && !outgoingCount.get(node.id) && incomingCount.get(node.id) || isSource && outgoingCount.get(node.id) && !incomingCount.get(node.id)) {
            hasChanged = true;
            resultingNodes.push(originalNodes.splice(i, 1)[0]);
            i--;
            for (var j = 0; j < originalEdges.length; j++) {
              var edge = originalEdges[j];
              if (!isSource && edge.targetNode === node.id || isSource && edge.sourceNode === node.id) {
                outgoingCount.set(edge.sourceNode, outgoingCount.get(edge.sourceNode) - 1);
                incomingCount.set(edge.targetNode, incomingCount.get(edge.targetNode) - 1);
                resultingEdges.push(originalEdges.splice(j, 1)[0]);
                j--;
              }
            }
          }
        }
        if (hasChanged) {
          continue;
        }
        break;
      }
    };

    //Keep going until all nodes have been assigned into the result
    while (originalNodes.length) {
      //Find sinks
      findSinksOrSources(false);

      //Find all isolated nodes
      for (var i = 0; i < originalNodes.length; i++) {
        var node = originalNodes[i];
        if (!incomingCount.get(node.id) && !outgoingCount.get(node.id)) {
          originalNodes.splice(i, 1);
          resultingNodes.push(node);
          i--;
        }
      }

      //Find sources
      findSinksOrSources(true);

      //If there are still edges, find the maximal value based on outgoing - incoming and add it but remove the outgoing edges.
      if (originalNodes.length) {
        var maximalNode = originalNodes.reduce(function (acc, node, index) {
          var value = outgoingCount.get(node.id) - incomingCount.get(node.id);
          if (value > acc[1]) {
            acc = [node, value, index];
          }
          return acc;
        }, [null, 0, -1]);
        for (var _i = 0; _i < originalEdges.length; _i++) {
          var edge = originalEdges[_i];
          if (edge.sourceNode === maximalNode[0].id) {
            incomingCount.set(edge.targetNode, incomingCount.get(edge.targetNode) - 1);
            resultingEdges.push(edge);
            originalEdges.splice(_i, 1);
            _i--;
          }
          if (edge.targetNode === maximalNode[0].id) {
            outgoingCount.set(edge.sourceNode, outgoingCount.get(edge.sourceNode) - 1);
            originalEdges.splice(_i, 1);
            _i--;
          }
          resultingNodes.push(originalNodes.splice(maximalNode[2], 1)[0]);
        }
      }
    }
    return [resultingNodes, resultingEdges];
  };

  /**
   * Takes a leveled hierarchy graph and inserts null values to position nodes close to its targets and sources.
   * @param {VVNode[][]} fullHierarchy
   * @param {VVEdge[] | {sourceNode: string, targetNode: string}} edgesIn
   * @returns {VVNode[][]|null} - Ordered Hierarchy
   */
  var straightenEdges = function straightenEdges(fullHierarchy, edgesIn) {
    //Prepare the data
    var nodeLevelMap = new Map();
    fullHierarchy.forEach(function (level, levelIndex) {
      level.forEach(function (node) {
        nodeLevelMap.set(node.id, levelIndex);
      });
    });
    var nodeIndexInLevel = new Map();
    var findNodeIndexInLevel = function findNodeIndexInLevel(nodeID) {
      return nodeIndexInLevel.get(nodeID);
    };
    var reComputeLevelIndexes = function reComputeLevelIndexes(levelIndex) {
      fullHierarchy[levelIndex].forEach(function (node, nodeIndex) {
        if (node !== null) {
          nodeIndexInLevel.set(node.id, nodeIndex);
        }
      });
    };
    var edges = edgesIn.filter(function (edge) {
      var sourceLevel = nodeLevelMap.get(edge.sourceNode);
      var targetLevel = nodeLevelMap.get(edge.targetNode);
      if (sourceLevel === targetLevel - 1) {
        return true;
      }
      return false;
    });

    //Fill in space with null values to make sure all hierarchy levels are of equal width
    //Store the original width since we need this to determine if a node should move based on its sources or based on its targets
    var levelLengthMap = new Map();
    var maxRows = Math.max.apply(Math, _toConsumableArray(fullHierarchy.map(function (level) {
      return level.length;
    })));
    fullHierarchy.forEach(function (level, levelIndex) {
      levelLengthMap.set(levelIndex, level.length);
      if (level.length < maxRows) {
        var isPush = false;
        for (var i = level.length; i < maxRows; i++) {
          if (isPush) level.push(null);else level.unshift(null);
          isPush = !isPush;
        }
      }
    });

    //To minimize bends we do what is essentially a form of barycenter heuristic.
    //Compute the average target or source distance for all edges for a given level
    var computeAverageIndexes = function computeAverageIndexes(level, isSource) {
      var averageIndexes = new Map();
      level.forEach(function (node) {
        if (node === null) return;
        var nodeShouldBe = isSource ? "sourceNode" : "targetNode";
        var connectingNodeShouldBe = isSource ? "targetNode" : "sourceNode";
        //Find the average index of all edges this connects to.
        var averageNodeIndex = [0, 0];
        edges.forEach(function (edge) {
          if (edge[nodeShouldBe] === node.id) {
            averageNodeIndex[0] += findNodeIndexInLevel(edge[connectingNodeShouldBe]);
            averageNodeIndex[1] += 1;
          }
        });
        averageNodeIndex = Math.floor(averageNodeIndex[0] / averageNodeIndex[1]);
        averageIndexes.set(node.id, isNaN(averageNodeIndex) ? 0 : averageNodeIndex);
      });
      return averageIndexes;
    };

    //Finally move edges within their space until an optimal layout has been found
    fullHierarchy.forEach(function (level, levelIndex) {
      //Return if this is the max row level or if there is only one level in the hierarchy
      if (levelLengthMap.get(levelIndex) === maxRows) return;else if (fullHierarchy.length === 1) return;
      //Determine if we need to look at incoming edges or outgoing edges to optimize our position
      var nodeShouldbeSource;
      if (levelIndex === 0) nodeShouldbeSource = true;else if (levelIndex === fullHierarchy.length - 1) nodeShouldbeSource = false;else if (levelLengthMap.get(levelIndex) > levelLengthMap.get(levelIndex - 1)) nodeShouldbeSource = true;else nodeShouldbeSource = false;
      //Recompute the necessary index maps
      reComputeLevelIndexes(levelIndex);
      reComputeLevelIndexes(nodeShouldbeSource ? levelIndex + 1 : levelIndex - 1);
      //Get the average indexes for the current level nodes
      var averageIndexes = computeAverageIndexes(level, nodeShouldbeSource);
      var didChange = true;
      while (didChange === true) {
        didChange = false;
        for (var nodeIndex = 0; nodeIndex < level.length; nodeIndex++) {
          var node = level[nodeIndex];
          if (node === null) continue;
          var averageIndex = averageIndexes.get(node.id);
          var canMoveLeft = nodeIndex === 0 ? false : level[nodeIndex - 1] === null ? true : false;
          var canMoveRight = nodeIndex === level.length - 1 ? false : level[nodeIndex + 1] === null ? true : false;
          if (averageIndex > nodeIndex && canMoveRight) {
            level[nodeIndex + 1] = node;
            level[nodeIndex] = null;
            if (nodeIndex - 2 > -1) nodeIndex = nodeIndex - 2;
            didChange = true;
          } else if (averageIndex < nodeIndex && canMoveLeft) {
            level[nodeIndex - 1] = node;
            level[nodeIndex] = null;
            nodeIndex--;
            didChange = true;
          }
        }
      }
    });
    return fullHierarchy.map(function (level) {
      return level.map(function (node) {
        return node instanceof VVNode ? node : null;
      });
    });
  };

  /**
   * Creates an hierarhical force that sorts nodes on an axis (either y or x)
   * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node. If left blank mode is "auto"
   * @param {boolean=} useY - If true the hierachy will be top to bottom, otherwise it will be left to right
   * @param {number=} distance - How much space should be between nodes. If not set this will be determined by the size of the nodes
   * @param {boolean=} useLine - If set nodes will be set into a fixed order, trying to minimize edge crossings.
   */
  var hierarchyForce = function hierarchyForce(groupBy) {
    var useY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var distance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var useLine = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var computeGroup = groupBy ? typeof groupBy === "string" ? function (node) {
      return node[groupBy];
    } : function (node) {
      return groupBy(node.data);
    } : null;
    var nodes = [];
    var edges = [];
    var groups = [];
    var offsetDistance = 0;
    var halfSize = 0;
    var halfWidth = 0;
    var orderMeasurement = 0;
    var offsetSizeMultiplier = 4;
    function force() {
      var parameter = useY ? "y" : "x";
      var lineParameter = useY ? "x" : "y";
      groups.forEach(function (group, index) {
        var coordinate = index * offsetDistance - halfSize;
        group.forEach(function (node, nodeIndex) {
          if (!node) {
            //There can be blank nodes inserted to create space
            return;
          }
          node[parameter] = coordinate;
          if (useLine) {
            node[lineParameter] = nodeIndex * orderMeasurement - halfWidth;
          }
        });
      });
    }
    force.edges = function (newEdges) {
      edges = newEdges;
    };
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      //Compute sizes
      var computeLevelMeasurement = useY ? getHeight : getWidth;
      var computeOrderMeasurement = useY ? getWidth : getHeight;
      orderMeasurement = 0;
      var levelMeasurement = distance ? distance : 0;
      nodes.forEach(function (node) {
        if (!distance) {
          levelMeasurement = Math.max(levelMeasurement, computeLevelMeasurement(node));
        }
        orderMeasurement = Math.max(orderMeasurement, computeOrderMeasurement(node));
      });
      offsetDistance = levelMeasurement * offsetSizeMultiplier;
      offsetDistance < 500 && (offsetDistance = 500);
      orderMeasurement *= 1.5;

      //Compute level groups
      if (computeGroup) {
        var newGroups = {};
        nodes.forEach(function (node) {
          var group = computeGroup(node);
          if (group === null || group === undefined) {
            group = 0;
          }
          if (!newGroups[group]) {
            newGroups[group] = [node];
          } else {
            newGroups[group].push(node);
          }
        });
        groups = Object.keys(newGroups).sort(function (a, b) {
          var valueAInt = parseInt(a);
          var valueBInt = parseInt(b);
          var valueA = isNaN(valueAInt) ? a : valueAInt;
          var valueB = isNaN(valueBInt) ? a : valueBInt;
          if (valueA < valueB) {
            return -1;
          }
          if (valueA > valueB) {
            return 1;
          }
          return 0;
        }).map(function (key) {
          return newGroups[key];
        });
        if (useLine) {
          var _makeAcyclic = makeAcyclic(nodes, edges),
            _makeAcyclic2 = _slicedToArray(_makeAcyclic, 2),
            acyclicEdges = _makeAcyclic2[1];
          groups = edgeOrder(groups, acyclicEdges);
          groups = straightenEdges(groups, _toConsumableArray(acyclicEdges));
        }
      } else {
        //Auto compute a hierarchy layout
        //Compute the sub graphs inside of the graph
        var subGraphs = DisjointGroups(nodes, edges);

        //For each sub graph compute a hierarchy
        var hierarchies = subGraphs.map(function (nodeArray) {
          var _makeAcyclic3 = makeAcyclic(nodeArray, edges),
            _makeAcyclic4 = _slicedToArray(_makeAcyclic3, 2),
            acyclicNodes = _makeAcyclic4[0],
            acyclicEdges = _makeAcyclic4[1];
          var _determineLevels = determineLevels(acyclicNodes, acyclicEdges),
            hierarchy = _determineLevels.hierarchy,
            fakeNodesHierarchy = _determineLevels.fakeNodesHierarchy,
            fakeEdges = _determineLevels.fakeEdges;
          if (useLine) {
            var orderedNodes = edgeOrder(hierarchy, acyclicEdges, fakeNodesHierarchy, fakeEdges);
            var positionedNodes = straightenEdges(orderedNodes, [].concat(_toConsumableArray(acyclicEdges), _toConsumableArray(fakeEdges)));
            return positionedNodes;
          }
          return hierarchy;
        });
        if (useLine) {
          //Make sure all hierarchies are the same length
          var longestHierarchy = hierarchies.reduce(function (acc, hierarchy) {
            return Math.max(acc, hierarchy.length);
          }, 0);
          hierarchies.forEach(function (hierarchy) {
            var maxRows = Math.max.apply(Math, _toConsumableArray(hierarchy.map(function (level) {
              return level.length;
            })));
            if (hierarchy.length < longestHierarchy) {
              for (var i = hierarchy.length; i < longestHierarchy; i++) {
                hierarchy.push(new Array(maxRows).fill(null));
              }
            }
          });
        }

        //Merge the hierarchies
        hierarchies = hierarchies.reduce(function (acc, hierarchy) {
          hierarchy.forEach(function (level, index) {
            if (!acc[index]) {
              acc[index] = level;
            } else {
              acc[index] = [].concat(_toConsumableArray(acc[index]), _toConsumableArray(level));
            }
          });
          return acc;
        }, []);
        groups = hierarchies;
        halfSize = (groups.length - 1) * offsetDistance / 2;
        halfWidth = Math.max.apply(Math, _toConsumableArray(hierarchies.map(function (level) {
          return level.length;
        }))) * orderMeasurement / 2;
      }
    };
    return force;
  };

  /**
   * Creates a matrix force that pulls nodes into given x and y axises
   * @param {boolean=} useY - If true the Y axis force will be activated
   * @param {boolean=} useX - If true the X axis force will be activated
   * @param {number=} strength - How strong should the force that pulls node into the axis be?
   * @param {number=} size - How large should each axis space be?
   * @param {number=} multiplier - If no size is provided the size of nodes will be used. This multiplier can be used to multiply the measurements by a given number.
   */
  var matrixForce = function matrixForce() {
    var useY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var useX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var strength = arguments.length > 2 ? arguments[2] : undefined;
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var multiplier = arguments.length > 4 ? arguments[4] : undefined;
    var nodes = [];
    var maxSizeX = size;
    var maxSizeY = size;
    var power = strength ? strength : 0.6;
    var offsetMultiplier = multiplier ? multiplier : 3;
    function force(alpha) {
      var l = alpha * power;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (useY) {
          var closestArea = Math.round(node.y / maxSizeY) * maxSizeY;
          node.vy -= (node.y - closestArea) * l;
        }
        if (useX) {
          var _closestArea = Math.round(node.x / maxSizeX) * maxSizeX;
          node.vx -= (node.x - _closestArea) * l;
        }
      }
    }
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      if (size) {
        return;
      }
      maxSizeX = 0;
      maxSizeY = 0;
      nodes.forEach(function (node) {
        maxSizeX = Math.max(maxSizeX, getWidth(node) * offsetMultiplier);
        maxSizeY = Math.max(maxSizeY, getHeight(node) * offsetMultiplier);
      });
      if (useY && useX) {
        maxSizeX = Math.max(maxSizeX, maxSizeY);
        maxSizeY = Math.max(maxSizeX, maxSizeY);
      }
    };
    return force;
  };

  /**
   * Creates a table (or, list) of all nodes. By default nodes will be shown in alphabetical name order
   * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
   * @param {number=} strength - How strong should the force be that pulls the nodes into the matrix? (0-1)
   */
  var listForce = function listForce(groupBy) {
    var strength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var computeGroup = groupBy ? typeof groupBy === "string" ? function (node) {
      return node[groupBy];
    } : function (node) {
      return groupBy(node.data);
    } : function (node) {
      return node.name;
    };
    var power = strength ? strength : 0.9;
    var nodes = [];
    var size = 0;
    var numberOfRowsAndColumns = 0;
    var halfSize = 0;
    var multiplier = 2;
    function force(alpha) {
      var l = alpha * power;
      var currentRow = 0;
      var currentColumn = 0;
      for (var i = 0; i < nodes.length; i++) {
        if (currentColumn === numberOfRowsAndColumns) {
          currentColumn = 0;
          currentRow += 1;
        }
        currentColumn += 1;
        var node = nodes[i];
        node.vx -= (node.x - ((currentColumn - 1) * size - halfSize)) * l;
        node.vy -= (node.y - (currentRow * size - halfSize)) * l;
      }
    }
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      nodes.sort(function (a, b) {
        var valueA = computeGroup(a);
        var valueB = computeGroup(b);
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        return 0;
      });
      size = 0;
      nodes.forEach(function (node) {
        size = Math.max(size, getWidth(node) * multiplier, getHeight(node) * multiplier);
      });
      numberOfRowsAndColumns = Math.ceil(Math.sqrt(nodes.length));
      halfSize = (numberOfRowsAndColumns - 1) * size / 2;
    };
    return force;
  };

  /**
   * Force that generates a treemap
   * @param {any => "string" | "string"} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
   * @param {number} width - Maximum width for the treemap
   * @param {number} height - Maximum height for the treemap
   * @param {number} strength - Strength of the treemap force
   */
  var treemapForce = function treemapForce(groupBy, width, height, strength) {
    var computeGroup = groupBy ? typeof groupBy === "string" ? function (node) {
      return node[groupBy];
    } : function (node) {
      return groupBy(node.data);
    } : function (node) {
      return node.type;
    };
    var nodes = [];
    var element;
    var treemapWidth = width;
    var treemapHeight = height;
    var halfTreemapWidth;
    var halfTreemapHeight;
    var power = strength ? strength : 0.7;
    var groups = [];
    var treemap = [];
    var multiplier = 2.5;
    function force(alpha) {
      if (!treemap.length) {
        return;
      }
      var l = alpha * power;
      treemap.forEach(function (group) {
        var centerX = group.x + group.width / 2;
        var centerY = group.y + group.height / 2;
        group.data.forEach(function (node) {
          node.vx -= (node.x - centerX) * l;
          node.vy -= (node.y - centerY) * l;
        });
      });
    }
    force.element = function (newElement) {
      element = newElement;
    };
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      var newGroups = new Map();
      var maxSizeX = 0;
      var maxSizeY = 0;
      nodes.forEach(function (node) {
        var group = computeGroup(node);
        if (!newGroups.has(group)) {
          newGroups.set(group, [node]);
        } else {
          newGroups.get(group).push(node);
        }
        maxSizeX = Math.max(maxSizeX, getWidth(node) * multiplier);
        maxSizeY = Math.max(maxSizeY, getHeight(node) * multiplier);
      });
      var fullSize = Math.sqrt(maxSizeY * maxSizeX * nodes.length) * 3;
      if (!width && !height) {
        treemapWidth = fullSize / 26 * 16;
        treemapHeight = fullSize / 26 * 10;
      } else if (!width) {
        treemapWidth = fullSize - treemapHeight > 0 ? fullSize - treemapHeight : 1000;
      } else if (!height) {
        treemapHeight = fullSize - treemapWidth > 0 ? fullSize - treemapWidth : 1000;
      }
      halfTreemapWidth = treemapWidth / 2;
      halfTreemapHeight = treemapHeight / 2;
      groups = _toConsumableArray(newGroups.values());
      if (groups.length === 0) {
        return;
      }

      //Compute Treemap
      var canvas = {
        data: [],
        xStart: 0,
        yStart: 0,
        width: treemapWidth,
        height: treemapHeight
      };
      var totalValue = groups.reduce(function (acc, current) {
        return acc + current.length;
      }, 0);
      var dataScaled = groups.map(function (group) {
        return group.length * treemapHeight * treemapWidth / totalValue;
      });
      var getMinWidth = function getMinWidth() {
        if (Math.pow(canvas.height, 2) > Math.pow(canvas.width, 2)) {
          return {
            value: canvas.width,
            vertical: false
          };
        }
        return {
          value: canvas.height,
          vertical: true
        };
      };
      function worstRatio(row, width) {
        var sum = row.reduce(function (acc, current) {
          return acc + current;
        }, 0);
        var rowMax = Math.max.apply(Math, _toConsumableArray(row));
        var rowMin = Math.min.apply(Math, _toConsumableArray(row));
        return Math.max(Math.pow(width, 2) * rowMax / Math.pow(sum, 2), Math.pow(sum, 2) / (Math.pow(width, 2) * rowMin));
      }
      var layoutRow = function layoutRow(row, width, vertical) {
        var rowHeight = row.reduce(function (acc, current) {
          return acc + current;
        }, 0) / width;
        row.forEach(function (rowItem) {
          var rowWidth = rowItem / rowHeight;
          var data;
          if (vertical) {
            data = {
              x: canvas.xStart,
              y: canvas.yStart,
              width: rowHeight,
              height: rowWidth,
              data: groups[canvas.data.length]
            };
            canvas.yStart += rowWidth;
          } else {
            data = {
              x: canvas.xStart,
              y: canvas.yStart,
              width: rowWidth,
              height: rowHeight,
              data: groups[canvas.data.length]
            };
            canvas.xStart += rowWidth;
          }
          canvas.data.push(data);
        });
        if (vertical) {
          canvas.xStart += rowHeight;
          canvas.yStart -= width;
          canvas.width -= rowHeight;
        } else {
          canvas.xStart -= width;
          canvas.yStart += rowHeight;
          canvas.height -= rowHeight;
        }
      };
      var layoutLastRow = function layoutLastRow(rows, children, width) {
        var minWidth = getMinWidth();
        layoutRow(rows, width, minWidth.vertical);
        layoutRow(children, width, minWidth.vertical);
      };
      var squarify = function squarify(children, row, width) {
        if (children.length === 1) {
          layoutLastRow(row, children, width);
          return;
        }
        var rowWithChild = [].concat(_toConsumableArray(row), [children[0]]);
        if (row.length === 0 || worstRatio(row, width) >= worstRatio(rowWithChild, width)) {
          children.shift();
          squarify(children, rowWithChild, width);
          return;
        }
        layoutRow(row, width, getMinWidth().vertical);
        squarify(children, [], getMinWidth().value);
        return;
      };
      squarify(dataScaled, [], getMinWidth().value);
      var roundValue = function roundValue(number) {
        return Math.max(Math.round(number * 100) / 100, 0);
      };
      treemap = canvas.data.map(function (group) {
        return _objectSpread2(_objectSpread2({}, group), {}, {
          x: roundValue(group.x) - halfTreemapWidth,
          y: roundValue(group.y) - halfTreemapHeight,
          width: roundValue(group.width),
          height: roundValue(group.height)
        });
      });

      //Not sure if this code should be located here in the long run, but for now
      select(element).selectAll("*").remove();
      select(element).selectAll(".treemap-zone").data(treemap).enter().append("rect").classed("treemap-zone", true).attr("x", function (d) {
        return d.x;
      }).attr("y", function (d) {
        return d.y;
      }).attr("width", function (d) {
        return d.width;
      }).attr("height", function (d) {
        return d.height;
      }).attr("style", "fill:transparent;stroke:black;pointer-events:none; stroke-width:5px;");
    };
    return force;
  };

  /**
   * Creates a radial cluster force that forces nodes into a circular pattern
   * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
   * @param {number=} strength - How strong should the force be? (0-1)
   */
  var radialForce = function radialForce(groupBy, strength) {
    var power = typeof strength === "number" ? strength : 0.9;
    var computeGroup = groupBy ? typeof groupBy === "string" ? function (node) {
      return node[groupBy];
    } : function (node) {
      return groupBy(node.data);
    } : function () {
      return 0;
    };
    var groups = [];
    var radiuses = [];
    var MIN_RADIUS_OFFSET = 600;
    var MIN_RADIUS_OFFSET_MULTIPLIER = 1.1;
    function force(alpha) {
      for (var i = 0; i < groups.length; i++) {
        var radius = radiuses[i];
        for (var j = 0; j < groups[i].length; j++) {
          var node = groups[i][j];
          var dx = node.x || 1e-6;
          var dy = node.y || 1e-6;
          var r = Math.sqrt(dx * dx + dy * dy);
          var k = (radius - r) * power * alpha / r;
          node.vx += dx * k;
          node.vy += dy * k;
        }
      }
    }
    var getMaxMeasurement = function getMaxMeasurement(node) {
      return node.radius ? node.radius * 2 : Math.max(node.width, node.height);
    };
    force.initialize = function (newNodes) {
      var newGroups = new Map();
      newNodes.forEach(function (node) {
        var group = computeGroup(node);
        if (!newGroups.has(group)) {
          newGroups.set(group, [node]);
        } else {
          newGroups.get(group).push(node);
        }
      });
      var keys = Array.from(newGroups.keys()).sort();
      groups = keys.map(function (key) {
        return newGroups.get(key);
      });
      var lastRadius = 0;
      radiuses = groups.map(function (group) {
        return group.reduce(function (acc, node) {
          return acc + getMaxMeasurement(node);
        }, 0) / 3.14;
      }).map(function (radius) {
        if (radius > lastRadius * MIN_RADIUS_OFFSET_MULTIPLIER + MIN_RADIUS_OFFSET) {
          return radius;
        } else {
          lastRadius = lastRadius * MIN_RADIUS_OFFSET_MULTIPLIER + MIN_RADIUS_OFFSET;
          return lastRadius;
        }
      });
    };
    return force;
  };

  /**
   * Creates a fan cluster force that forces nodes together
   * @param {(any => "string" | "string")=} groupBy - Either a function that will take the bound data from the node or a name of a property on a node
   * @param {number=} strength - How strong should the force be that pulls the nodes together? (0-1)
   */
  var fanForce = function fanForce(groupBy, strength) {
    var computeGroup = groupBy ? typeof groupBy === "string" ? function (node) {
      return node[groupBy];
    } : function (node) {
      return groupBy(node.data);
    } : function (node) {
      return node.type;
    };
    var power = strength ? strength : 0.9;
    var positionMap = new Map();
    var nodes = [];
    function force(alpha) {
      var l = alpha * power;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var target = positionMap.get(node.id);
        node.vx -= (node.x - target[0]) * l;
        node.vy -= (node.y - target[1]) * l;
      }
    }
    var getMaxMeasurement = function getMaxMeasurement(node) {
      return node.radius ? node.radius * 2 : Math.max(node.width, node.height);
    };
    force.initialize = function (newNodes) {
      nodes = newNodes;
      var groupsMap = new Map();
      newNodes.forEach(function (node) {
        var group = computeGroup(node);
        if (!groupsMap.has(group)) {
          groupsMap.set(group, [node]);
        } else {
          groupsMap.get(group).push(node);
        }
      });
      var degreeIncrements = Math.floor(360 / groupsMap.size);
      Array.from(groupsMap.keys()).forEach(function (key, index) {
        var radian = MathUtils.calculateRadian(degreeIncrements * index);
        var radianCos = Math.cos(radian);
        var radianSin = Math.sin(radian);
        var initialX = 300 * radianCos;
        var initialY = 300 * radianSin;
        var lastPosition = [initialX, initialY];
        groupsMap.get(key).forEach(function (node) {
          var maxMeasurement = getMaxMeasurement(node);
          var x = maxMeasurement * radianCos + lastPosition[0];
          var y = maxMeasurement * radianSin + lastPosition[1];
          positionMap.set(node.id, [x, y]);
          var nextX = maxMeasurement * radianCos + x;
          var nextY = maxMeasurement * radianSin + y;
          lastPosition = [nextX, nextY];
        });
      });
    };
    return force;
  };

  /**
   * Orders nodes by barycenter.
   * Inspired by: http://profs.etsmtl.ca/mmcguffin/research/2012-mcguffin-simpleNetVis/mcguffin-2012-simpleNetVis.pdf
   */
  var BaryCenter = (function (nodes, edges) {
    var edgeMap = new Map();
    nodes.forEach(function (node) {
      return edgeMap.set(node.id, []);
    });
    edges.forEach(function (edge) {
      if (edge.sourceNode !== edge.targetNode) {
        edgeMap.get(edge.sourceNode).push(nodes.findIndex(function (targetNode) {
          return targetNode.id === edge.targetNode;
        }));
        edgeMap.get(edge.targetNode).push(nodes.findIndex(function (sourceNode) {
          return sourceNode.id === edge.sourceNode;
        }));
      }
    });
    return DisjointGroups(nodes, edges).map(function (group) {
      var orderedNodes = group.map(function (_, index) {
        return {
          average: 0,
          index: index
        };
      });
      var findPosition = function findPosition(i) {
        return orderedNodes.findIndex(function (node) {
          return node.index === i;
        });
      };
      for (var i = 0; i < group.length + 1; i++) {
        group.forEach(function (node, originalNodeIndex) {
          var position1 = findPosition(originalNodeIndex);
          var sum = position1;
          edgeMap.get(node.id).forEach(function (neighbor) {
            var position2 = findPosition(neighbor);
            sum += position2;
          });
          orderedNodes[position1].average = sum / edgeMap.get(node.id).length + 1;
        });
        orderedNodes.sort(function (a, b) {
          return a.average - b.average;
        });
      }
      return orderedNodes.map(function (orderedNode) {
        return group[orderedNode.index];
      });
    }).flat();
  });

  /**
   * Creates an adjacency matrix of nodes and their edges ordered by barycenter
   */
  var adjacencyMatrixForce = function adjacencyMatrixForce() {
    var nodes = [];
    var element;
    var edges;
    var maxHeight = 0;
    var size = 0;
    var totalSideLength = 0;
    var offset = 0;
    function force() {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.x = i * size - offset;
        node.y = -maxHeight - offset;
      }
    }
    force.element = function (newElement) {
      element = newElement;
    };
    force.edges = function (newEdges) {
      edges = newEdges;
    };
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = BaryCenter(newNodes, edges);
      var maxWidth = nodes.reduce(function (acc, node) {
        return Math.max(acc, getWidth(node));
      }, 0);
      maxHeight = nodes.reduce(function (acc, node) {
        return Math.max(acc, getHeight(node));
      }, 0);
      size = Math.max(maxWidth, maxHeight);
      totalSideLength = size * nodes.length;
      offset = totalSideLength / 2;
      var indexMap = new Map();
      nodes.forEach(function (node, index) {
        return indexMap.set(node.id, index);
      });
      var matrix = [];
      for (var i = 0; i < nodes.length; i++) {
        matrix.push(new Array(nodes.length).fill(0));
      }
      edges.forEach(function (edge) {
        matrix[indexMap.get(edge.sourceNode)][indexMap.get(edge.targetNode)] = 1;
      });
      var startX = -offset - size / 2;
      var startY = -offset;
      var selector = select(element);
      selector.selectAll("*").remove();
      var highlightGroup = selector.append("g");
      var edgeGroup = selector.append("g");
      var textGroup = selector.append("g");
      for (var _i = 0; _i < matrix.length; _i++) {
        var row = matrix[_i];
        for (var j = 0; j < row.length; j++) {
          var g = highlightGroup.append("g");
          g.attr("class", "adjacency-matrix-force-edge").append("rect").attr("width", size).attr("height", size).attr("x", startX + size * j).attr("y", startY + size * _i).attr("style", "fill:transparent;stroke:none;");
          edgeGroup.append("rect").attr("width", size).attr("height", size).attr("x", startX + size * j).attr("y", startY + size * _i).attr("style", "fill:".concat(row[j] ? "#000000" : "transparent", ";pointer-events:none;stroke:black;stroke-width:3px;"));
        }
        textGroup.append("text").attr("x", startX + size * matrix.length).attr("y", startY + size * _i + size / 2 + 35).attr("style", "font-size: 78px").text(nodes[_i].name);
        textGroup.append("text").attr("x", startY + size * matrix.length).attr("y", startX + size * (nodes.length - 1 - _i) + size + 100).attr("style", "font-size: 78px; transform:rotate(90deg);").text(nodes[_i].name);
      }
    };
    return force;
  };

  /**
   * Creates an adjacency matrix of nodes and their edges and orders them by barycenter
   * @param {string[]} headers - Array of headers to be used for the table. Can be blank strings, but must be included!
   * @param {(data) => string[]} getData - Function used for retrieving data from nodes
   */
  var tableForce = function tableForce() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var getData = arguments.length > 1 ? arguments[1] : undefined;
    var nodes = [];
    var element;
    var edges;
    var maxHeight = 0;
    var maxWidth = 0;
    var totalSideLength = 0;
    var heightOffset = 0;
    var widthOffset = 0;
    function force() {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.x = -widthOffset - maxWidth;
        node.y = i * maxHeight + maxHeight / 2 - heightOffset;
      }
    }
    force.element = function (newElement) {
      element = newElement;
    };
    force.edges = function (newEdges) {
      edges = newEdges;
    };
    var getWidth = function getWidth(node) {
      return node.radius ? node.radius * 2 : node.width;
    };
    var getHeight = function getHeight(node) {
      return node.radius ? node.radius * 2 : node.height;
    };
    force.initialize = function (newNodes) {
      nodes = BaryCenter(newNodes, edges);
      maxHeight = nodes.reduce(function (acc, node) {
        return Math.max(acc, getHeight(node));
      }, 0) + 20;
      maxWidth = nodes.reduce(function (acc, node) {
        return Math.max(acc, getWidth(node));
      }, 0) + 20;
      totalSideLength = maxHeight * nodes.length;
      heightOffset = totalSideLength / 2;
      var selector = select(element);
      selector.selectAll("*").remove();
      var mainGroup = selector.append("g");
      var nodeData = nodes.map(function (node) {
        return getData(node.data);
      });
      var textOffset = 0;
      headers.forEach(function (header, i) {
        var cell = header.substring(0, 100);
        mainGroup.append("text").attr("y", -maxHeight + maxHeight / 2 + 18).attr("x", textOffset).attr("style", "font-size: 36px;font-weight: bold;").text(cell);
        var maxLength = cell.length;
        nodeData.forEach(function (data, j) {
          var cell = data[i].substring(0, 100);
          if (data[i].length > 100) {
            cell += "...";
          }
          maxLength = Math.max(maxLength, cell.length);
          mainGroup.append("text").attr("y", maxHeight * j + maxHeight / 2 + 18).attr("x", textOffset).attr("style", "font-size: 36px;").text(cell);
        });
        textOffset += maxLength * 20 + 40;
      });
      widthOffset = (mainGroup.node().getBBox().width + maxWidth) / 2;
      mainGroup.attr("transform", "translate(".concat(-widthOffset, ", ").concat(-heightOffset, ")"));
    };
    return force;
  };

  /**
   * The Engine class is responsible for running the physics simulation of the graph.
   */
  var Engine = /*#__PURE__*/function () {
    function Engine(forceCenterX, forceCenterY, graphContainerElement, eventEmitter) {
      var _this = this;
      _classCallCheck(this, Engine);
      this.layoutElement = graphContainerElement.querySelector("#layout-extras");
      this.edges = [];
      this.ee = eventEmitter;
      this.ee.on(EVENTS.DOM_PROCESSOR_FINISHED, function (nodes, edges) {
        _this.edges.splice(0, _this.edges.length);
        edges.forEach(function (edge) {
          return _this.edges.push(edge);
        });
        _this.updateSimulation(nodes, edges);
        _this.ee.trigger(EVENTS.ENGINE_UPDATE_FINISHED, nodes, edges);
      });
      this.ee.on(EVENTS.NODE_DRAG_START, function () {
        _this.stop();
        _this.target(0.2);
      });
      this.ee.on(EVENTS.NODE_DRAG_DRAGGED, function () {
        _this.restart();
      });
      this.ee.on(EVENTS.NODE_DRAG_ENDED, function () {
        _this.target(0);
      });
      this.ee.on(EVENTS.CLICK_ENTITY, function () {
        _this.alpha(0);
      });
      this.ee.on(EVENTS.ENGINE_LAYOUT_REQUESTED, function (layout, options) {
        _this.setLayout(layout, options ? options : {});
      });
      this.ee.on(EVENTS.ENGINE_LAYOUT_RESET_REQUESTED, function () {
        _this.clearLayout();
        _this.alpha(2);
        _this.restart();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_REQUESTED, function () {
        _this.alpha(0.5);
        _this.restart();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, function () {
        _this.alpha(0.5);
        _this.restart();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, function () {
        _this.alpha(0.5);
        _this.restart();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, function () {
        _this.alpha(0.5);
        _this.restart();
      });
      this.ee.on(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED, function () {
        _this.softRestart();
      });
      this.ee.on(EVENTS.LASSO_ENTER, function () {
        _this.softRestart();
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.stop();
      });
      this.forceCenterX = forceCenterX;
      this.forceCenterY = forceCenterY;
      this.linkForce = link().distance(function (edge) {
        return _this.getEdgeDistance(edge);
      }).strength(Env.EDGE_STRENGTH);
      this.manyBodyForce = manyBody().strength(Env.CHARGE).distanceMax(Env.CHARGE_MAX_DISTANCE).theta(1.1);
      this.forceMap = new Map();
      this.registerForce("boundingBox", boundingBoxForce);
      this.registerForce("cluster", clusterForce);
      this.registerForce("hierarchy", hierarchyForce);
      this.registerForce("grid", matrixForce);
      this.registerForce("matrix", listForce);
      this.registerForce("treemap", treemapForce);
      this.registerForce("radial", radialForce);
      this.registerForce("fan", fanForce);
      this.registerForce("adjacencymatrix", adjacencyMatrixForce);
      this.registerForce("table", tableForce);
      this.simulation = this.initializeSimulation();
    }

    /**
     * Lightly pokes the graph. This can be used if you want to trigger a tick.
     */
    _createClass(Engine, [{
      key: "softRestart",
      value: function softRestart() {
        this.alpha(0.001);
        this.restart();
      }
      /**
       * Start the simulation engine
       */
    }, {
      key: "initializeSimulation",
      value: function initializeSimulation() {
        var _this2 = this;
        return simulation().force("charge", this.manyBodyForce).force("collide", collide().radius(function (d) {
          return d.width ? Math.max(d.width, d.height) / 2 + 5 : d.radius + 5;
        }).strength(1).iterations(1)).force("y", y$1(this.forceCenterX).strength(Env.GRAVITY)).force("x", x$1(this.forceCenterY).strength(Env.GRAVITY)).nodes([]).force("link", this.linkForce).on("tick", function () {
          _this2.ee.trigger(EVENTS.ENGINE_TICK);
        });
      }
    }, {
      key: "enableCenterForce",
      value: function enableCenterForce() {
        this.simulation.force("center", center(this.forceCenterX, this.forceCenterY));
      }
    }, {
      key: "disableCenterForce",
      value: function disableCenterForce() {
        this.simulation.force("center", null);
      }
    }, {
      key: "setBoundingBox",
      value: function setBoundingBox(width, height) {
        this.simulation.force("boundingbox", boundingBoxForce(width, height));
        this.alpha(1);
        this.restart();
      }
    }, {
      key: "removeBoundingBox",
      value: function removeBoundingBox() {
        this.simulation.force("boundingbox", null);
        this.alpha(1);
        this.restart();
      }
    }, {
      key: "setMaxDistanceCharge",
      value: function setMaxDistanceCharge(value) {
        this.manyBodyForce.distanceMax(value ? value : Env.CHARGE_MAX_DISTANCE);
      }
    }, {
      key: "setLayout",
      value: function setLayout(layout, options) {
        this.clearLayoutGUI();
        switch (layout) {
          case "hierarchy":
            this.simulation.force("layout", this.forceMap.get("hierarchy")(options.groupBy, options.useY, options.distance, options.useLine));
            this.linkForce.strength(Env.EDGE_STRENGTH);
            break;
          case "adjacencymatrix":
            this.simulation.force("layout", this.forceMap.get("adjacencymatrix")());
            this.linkForce.strength(0);
            break;
          case "grid":
            this.simulation.force("layout", this.forceMap.get("grid")(options.useY, options.useX, options.strength, options.size, options.multiplier));
            this.linkForce.strength(0.1);
            break;
          case "matrix":
            this.simulation.force("layout", this.forceMap.get("matrix")(options.groupBy, options.strength));
            this.linkForce.strength(0);
            break;
          case "cluster":
            this.simulation.force("layout", this.forceMap.get("cluster")(options.groupBy, options.strength, options.showOutline));
            this.linkForce.strength(0);
            break;
          case "treemap":
            this.simulation.force("layout", this.forceMap.get("treemap")(options.groupBy, options.width, options.height, options.strength));
            this.linkForce.strength(0);
            break;
          case "radial":
            this.simulation.force("layout", this.forceMap.get("radial")(options.groupBy, options.strength));
            this.linkForce.strength(0);
            break;
          case "table":
            this.simulation.force("layout", this.forceMap.get("table")(options.headers, options.getData));
            this.linkForce.strength(0);
            break;
          case "fan":
            this.simulation.force("layout", this.forceMap.get("fan")(options.groupBy, options.strength));
            this.linkForce.strength(0);
            break;
          default:
            this.simulation.force("layout", null);
            this.linkForce.strength(Env.EDGE_STRENGTH);
            break;
        }
        this.alpha(1);
        this.restart();
      }
      /**
       * Add a force to the simulation
       * @param {string} forceID - ID of the force to add
       * @param {string} forceName - Identifier for the force within the simulation
       * @param {any} forceOptions - Options for the force
       */
    }, {
      key: "addForce",
      value: function addForce(forceID, forceName, forceOptions) {
        if (!this.forceMap.has(forceID)) {
          console.error("Force does not exists: ", forceID);
          return;
        }
        this.simulation.force(forceName, this.forceMap.get(forceID)(forceOptions));
        this.alpha(1);
        this.restart();
      }
      /**
       * Removes a force from the simulation
       * @param {string} forceName - Identifier for the force within the simulation
       */
    }, {
      key: "removeForce",
      value: function removeForce(forceName) {
        this.clearLayoutGUI();
        this.simulation.force(forceName, null);
        this.alpha(1);
        this.restart();
      }
      /**
       * Registers a new force in the engine.
       * @param {string} id - Identifier for the force type
       * @param {Function} forceFunction - Force compatible function
       * @returns
       */
    }, {
      key: "registerForce",
      value: function registerForce(id, forceFunction) {
        var _this3 = this;
        if (this.forceMap.has(id)) {
          console.error("Force already exists: ", id);
          return;
        }
        var forceWrapper = function forceWrapper() {
          var force = forceFunction.apply(void 0, arguments);
          if (force.element) {
            var layoutGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            layoutGroup.id = id;
            _this3.layoutElement.appendChild(layoutGroup);
            force.element(layoutGroup);
          }
          if (force.edges) {
            force.edges(_this3.edges);
          }
          return force;
        };
        this.forceMap.set(id, forceWrapper);
        return forceWrapper;
      }
      /**
       * Ends the main layout force
       */
    }, {
      key: "clearLayout",
      value: function clearLayout() {
        this.clearLayoutGUI();
        this.simulation.force("layout", null);
        this.linkForce.strength(Env.EDGE_STRENGTH);
        this.alpha(1);
        this.restart();
      }
      /**
       * Clears the entire layout GUI
       */
    }, {
      key: "clearLayoutGUI",
      value: function clearLayoutGUI() {
        select(this.layoutElement).selectAll("g").selectAll("*").remove();
      }
      /**
       * Update the simulation with a new data set
       * @param {object[]} nodes
       * @param {edges[]} edges
       */
    }, {
      key: "updateSimulation",
      value: function updateSimulation(nodes, edges) {
        this.simulation.nodes(nodes);
        this.linkForce.links(edges);
        this.simulation.alpha(1).restart();
      }
      /**
       * Stop the simulation
       */
    }, {
      key: "stop",
      value: function stop() {
        this.simulation.stop();
      }
      /**
       * Restart the simulation
       */
    }, {
      key: "restart",
      value: function restart() {
        this.simulation.restart();
      }
      /**
       * Set the current alpha value of the simulation
       * @param {number} target - Alpha value
       */
    }, {
      key: "alpha",
      value: function alpha(target) {
        this.simulation.alpha(target);
      }
      /**
       * Set the target alpha value for the simulation
       * @param {number} target - Alpha value
       */
    }, {
      key: "target",
      value: function target(_target) {
        this.simulation.alphaTarget(_target);
      }
      /**
       * Set the alpha decay value of the simulation.
       * @param {number} target - Alpha decay value
       */
    }, {
      key: "decay",
      value: function decay(target) {
        this.simulation.alphaDecay(target);
      }
      /**
       * Returns the distance (length) of the passed edge
       * @param {object} l - Edge
       */
    }, {
      key: "getEdgeDistance",
      value: function getEdgeDistance(l) {
        var targetRadius = l.target.radius !== undefined ? l.target.radius : 0;
        var sourceRadius = l.source.radius !== undefined ? l.source.radius : 0;
        var distance = targetRadius + sourceRadius;
        return distance + l.edgeDistance;
      }
    }]);
    return Engine;
  }();

  /**
   * The main graph class
   */
  var Virrvarr = /*#__PURE__*/function () {
    /**
     * Main constructor
     * @param {HTMLElement} graphContainerElement - Element that the graph should mount in
     * @param {object} inputData - Data that the graph should display
     * @param {object} options - Optional configuration for the graph
     * @param {boolean=} options.enableGrid - Should the grid background pattern be enabled?
     * @param {boolean=} options.enableFadeOnHover - Should nodes and edges that are not directly connected to a hovered node be faded out when said node is hovered?
     * @param {boolean=} options.enableZoomButtons - Should zoom buttons be enabled?
     * @param {boolean=} options.hideDetailsZoomScale - At what zoom scale should details be hidden?
     * @param {boolean=} options.enableScaleGridOnZoom - Should the grid scale with the zoom?
     * @param {boolean=} options.enableBuiltinContextMenu - Should the built in conext menu be enabled?
     * @param {Function=} options.entityClickedListener - Click listener for entities.
     * @param {Function=} options.entityDoubleClickedListener - Double click listener for entities.
     * @param {Function=} options.entityHoveredListener - Hover listener for entities.
     * @param {boolean=} options.enableFixedEdgeLabelWidth - Should edge label width be fixed? Note that you need to provide the edgeLabelWidth option together with this option.
     * @param {number=} options.edgeLabelWidth - Default edge label width.
     * @param {number=} options.maxEdgeLabelWidth - Maximum edge label width.
     * @param {object=} options.customContextMenu - Custom context menu to display.
     * @param {boolean=} options.enableMultiLineNodeLabels - Allow node names to take up two lines.
     * @param {boolean=} options.rotateLabels - Make edge labels perpendicular to the edge.
     * @param {number} options.markerSize - Size in px of the markers at the ends of edges.
     * @param {boolean=} options.enableOnionOnFocus - Should nodes and edge labels get an onion border on focus (selection)?
     * @param {boolean=} options.enableOnionOnHover - Should nodes and edge labels get an onion border on hover?
     * @param {boolean=} options.enableEdgeOnion - Should edge labels also get a onion border?
     * @param {number=} options.onionNumberOfLayers - How many layers should onion borders have by default?
     * @param {string=} options.onionBaseColor - What should the base color be of the onion borders?
     * @param {number=} options.onionLayerSize - How big should each layer in the onion border be by default?
     * @param {"line"|"cubicbezier"|"taxi"|"fulltaxi"|"arctop"|"arcright"|"arcbottom"|"arcleft"} options.lineType - How should edges be drawn?
     *
     */
    function Virrvarr(graphContainerElement, inputData, options) {
      var _this = this;
      _classCallCheck(this, Virrvarr);
      /* Init Shadow DOM */
      var shadowRoot = graphContainerElement.attachShadow({
        mode: "open"
      });
      var div = document.createElement("div");
      div.style.width = "100%";
      div.style.height = "100%";
      shadowRoot.appendChild(div);
      graphContainerElement = div;

      /* Init user input */
      this._options = Object.assign.apply(Object, [{}].concat(options));
      this._style = inputData.style ? inputData.style : {};

      /* Init EventEmitter */
      this._ee = new EventEmitter();
      //If the user specified listeners in options then add them
      this._options.entityClickedListener && this._ee.on(EVENTS.CLICK_ENTITY, this._options.entityClickedListener);
      this._options.entityDoubleClickedListener && this._ee.on(EVENTS.DBL_CLICK_ENTITY, this._options.entityDoubleClickedListener);
      this._options.entityHoveredListener && this._ee.on(EVENTS.HOVER_ENTITY, this._options.entityHoveredListener);
      this._options.selectionListener && this._ee.on(EVENTS.SELECTION_UPDATED, this._options.selectionListener);

      /* Init UI */
      this._UI = new UI(graphContainerElement, this._ee, this._style, options);

      /* Init Datastore */
      this._datastore = new Datastore(inputData.nodes, inputData.edges, this._ee, this._style, this._options);

      /* Init Engine */
      this._engine = new Engine(this._UI.width / 2, this._UI.height / 2, graphContainerElement, this._ee);

      /* Graph has mounted! */
      this._ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
        if (inputData.nodes.length > 0) {
          _this._engine.enableCenterForce();
          setTimeout(function () {
            return _this._engine && _this._UI.zoomHandler.resetZoom();
          }, 300);
          setTimeout(function () {
            return _this._engine && _this._engine.disableCenterForce();
          }, 4000);
        }
      });
      this._ee.trigger(EVENTS.GRAPH_HAS_MOUNTED);
    }

    /**
     * Sets and applies new filters, overwriting any existing.
     * @param {object[]} filters
     * @return {void}
     */
    _createClass(Virrvarr, [{
      key: "setFilters",
      value: function setFilters(filters) {
        this._ee.trigger(EVENTS.DATA_FILTER_REQUESTED, filters);
      }
      /**
       * Returns all current filters.
       * @return {object[]} - The filters
       */
    }, {
      key: "getFilters",
      value: function getFilters() {
        return this._datastore.filters;
      }
      /**
       * Removes all current filters.
       * @return {void}
       */
    }, {
      key: "resetAllFilters",
      value: function resetAllFilters() {
        this._ee.trigger(EVENTS.DATA_FILTER_RESET_REQUESTED);
      }
      /**
       * Toggles multiplicity on and off in the graph.
       * @return {void}
       */
    }, {
      key: "toggleMultiplicity",
      value: function toggleMultiplicity() {
        this._ee.trigger(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED);
      }
      /**
       * Highlights nodes in the graph based on input criteria.
       * @param {string} attribute - Attribute name to look for
       * @param {string} value - Value that the attribute should start with
       * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be highlighted
       * @return {void}
       */
    }, {
      key: "highlight",
      value: function highlight(attribute, value, filterFunction) {
        if (attribute && value || filterFunction) {
          var nodesToHighlight = this._datastore.nodes.filter(function (node) {
            if (filterFunction) {
              return filterFunction(node.data);
            }
            return node[attribute].toUpperCase().includes(value.toUpperCase());
          });
          this._ee.trigger(EVENTS.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight);
        } else {
          throw new Error("No attribute, value or filterfunction provided");
        }
      }
      /**
       * Disables (dims) nodes in the graph based on input criteria.
       * @param {string} attribute - Attribute name to look for
       * @param {string} value - Value that the attribute should start with
       * @param {Function} filterFunction  - Optional filter function that can be used instead of an attribute. Should return true if the node is to be disabled
       * @return {void}
       */
    }, {
      key: "disable",
      value: function disable(attribute, value, filterFunction) {
        if (attribute && value || filterFunction) {
          var nodesToDisable = this._datastore.nodes.filter(function (node) {
            if (filterFunction) {
              return filterFunction(node.data);
            }
            return node[attribute].toUpperCase().includes(value.toUpperCase());
          }).map(function (node) {
            return node.id;
          });
          this._ee.trigger(EVENTS.DISABLE_NODES_REQUESTED, nodesToDisable);
        } else {
          throw new Error("No attribute, value or filterfunction provided");
        }
      }
      /**
       * Resets the disabling of nodes set by the "disable" function.
       * @return {void}
       */
    }, {
      key: "clearDisable",
      value: function clearDisable() {
        this._ee.trigger(EVENTS.CLEAR_DISABLE_NODES_REQUESTED);
      }
      /**
       * Resets the zoom (Zoom to fit).
       * @return {void}
       */
    }, {
      key: "resetZoom",
      value: function resetZoom() {
        this._ee.trigger(EVENTS.ZOOM_REQUESTED, null, null, null);
      }
      /**
       * Zooms in on a specific node.
       * @param {string} nodeID - ID of the node to zoom to
       * @return {void}
       */
    }, {
      key: "zoomToNode",
      value: function zoomToNode(nodeID) {
        var node = this._datastore.nodes.find(function (node) {
          return node.id === nodeID;
        });
        if (node) {
          var width = this._UI.graphContainerElement.offsetWidth / 2;
          var height = this._UI.graphContainerElement.offsetHeight / 2;
          var scale = 1.5;
          var x = -node.x * scale + width;
          var y = -node.y * scale + height;
          this._ee.trigger(EVENTS.ZOOM_REQUESTED, x, y, scale);
        } else {
          throw new Error("No such node: " + nodeID);
        }
      }
      /**
       * Updates the graph layout
       * @param {"hierarchy"|"matrix"|"list"|"cluster"|"treemap"|"radial"} layout - Which layout to set
       * @param {any} options  - Layout specific options
       * @return {void}
       */
    }, {
      key: "setLayout",
      value: function setLayout(layout, options) {
        this._ee.trigger(EVENTS.ENGINE_LAYOUT_REQUESTED, layout, options ? options : {});
      }
      /**
       * Resets the layout to the default mode.
       * @return {void}
       */
    }, {
      key: "resetLayout",
      value: function resetLayout() {
        this._ee.trigger(EVENTS.ENGINE_LAYOUT_RESET_REQUESTED);
      }
      /**
       * Sets a bounding box for the graph where nodes cannot move outside the bounds. If no bounds are provided they will be determined based on the amount of nodes and node sizes.
       * @param {*} width - Width of the bounding box
       * @param {*} height - Height of the bounding box
       */
    }, {
      key: "setBoundingBox",
      value: function setBoundingBox(width, height) {
        this._engine.setBoundingBox(width, height);
      }
      /**
       * Sets the maximum distance for which to compute charge force between nodes.
       * @param {number} distance - Maximum distance to compute charge force for
       */
    }, {
      key: "setNodeChargeMaxDistance",
      value: function setNodeChargeMaxDistance(distance) {
        this._engine.setMaxDistanceCharge(distance);
      }
      /**
       * Removes the bounding box from the graph if present
       */
    }, {
      key: "clearBoundingBox",
      value: function clearBoundingBox() {
        this._engine.removeBoundingBox();
      }
      /**
       * Pins a node to the center of the graph.
       * @param {string} nodeID - ID of the node to center
       * @return {void}
       */
    }, {
      key: "centerNode",
      value: function centerNode(nodeID) {
        var _this2 = this;
        var node = this._datastore.nodes.find(function (potentialNode) {
          return potentialNode.id === nodeID;
        });
        if (node) {
          var rootG = this._UI.rootG;
          var midX = rootG.node().getBBox().x + rootG.node().getBBox().width / 2;
          var midY = rootG.node().getBBox().y + rootG.node().getBBox().height / 2;
          node.reposition(midX, midY).then(function () {
            node.pin(midX, midY);
            _this2._UI.DOMProcessor.updateNodes(_this2._UI.DOMProcessor.nodes);
            _this2._engine.alpha(1);
            _this2._engine.restart();
          });
        }
      }
      /**
       * Sets the pin mode for nodes on and off
       * Pin mode is when nodes are fixated upon drag
       * @param {boolean} isEnabled
       * @return {void}
       */
    }, {
      key: "setPinMode",
      value: function setPinMode(isEnabled) {
        this._ee.trigger(EVENTS.NODE_PIN_MODE_TOGGLED, isEnabled);
      }
      /**
       * Sets the multi selection mode for nodes on and off
       * multi selection mode is when selecting a node does not cause a deselection of any prior selected nodes
       * @param {boolean} isEnabled
       * @return {void}
       */
    }, {
      key: "setMultiSelectMode",
      value: function setMultiSelectMode(isEnabled) {
        this._ee.trigger(EVENTS.NODE_MULTI_SELECT_MODE_TOGGLED, isEnabled);
      }
      /**
       * Sets the multi selection drag mode for nodes on and off
       * Turning this mode on means that when you drag a selected node all other selected nodes move an equivalent amount of pixels.
       * @param {boolean} isEnabled
       * @return {void}
       */
    }, {
      key: "setMultiSelectDragMode",
      value: function setMultiSelectDragMode(isEnabled) {
        this._ee.trigger(EVENTS.NODE_MULTI_SELECT_DRAG_MODE_TOGGLED, isEnabled);
      }
      /**
       * Sets the lasso selection mode for nodes on and off
       * @param {boolean} isEnabled
       * @return {void}
       */
    }, {
      key: "setLassoMode",
      value: function setLassoMode(isEnabled) {
        this._ee.trigger(EVENTS.LASSO_MODE_TOGGLED, isEnabled);
      }
      /**
       * Pins the entire graph
       * @return {void}
       */
    }, {
      key: "pinGraph",
      value: function pinGraph() {
        var _this3 = this;
        var pins = this._datastore.nodes.map(function (node) {
          return node.pin(node.x, node.y);
        });
        Promise.all(pins).then(function () {
          _this3._UI.DOMProcessor.updateNodes(_this3._UI.DOMProcessor.nodes);
        });
      }
      /**
       * Resets all pins in the graph
       * @return {void}
       */
    }, {
      key: "resetAllPins",
      value: function resetAllPins() {
        this._datastore.allNodes.forEach(function (node) {
          return node.unPin();
        });
        this._UI.DOMProcessor.updateNodes(this._UI.DOMProcessor.nodes);
        this._engine.alpha(1);
        this._engine.restart(1);
      }
      /**
       * Implodes/explodes all nodes one step out from the provided node.
       * @param {string} nodeID - ID of the node
       * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
       * @param {"to"|"from"|"both"} direction - Direction in which to carry out the operation
       * @return {void}
       */
    }, {
      key: "implodeOrExplodeNode",
      value: function implodeOrExplodeNode(nodeID, isImplode, direction) {
        this._ee.trigger(EVENTS.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode, direction);
      }
      /**
       * Implodes/explodes all leaf nodes one step out from the provided node. I.e. nodes that have no further connections.
       * @param {string} nodeID - ID of the node
       * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
       * @param {"to"|"from"|"both"} direction - Direction in which to carry out the operation
       * @return {void}
       */
    }, {
      key: "implodeOrExplodeNodeLeafs",
      value: function implodeOrExplodeNodeLeafs(nodeID, isImplode, direction) {
        this._ee.trigger(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode, direction);
      }
      /**
       * Implodes/explodes all branching nodes from the provided node recursively.
       * @param {string} nodeID - ID of the node
       * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
       * @return {void}
       */
    }, {
      key: "implodeOrExplodeNodeRecursive",
      value: function implodeOrExplodeNodeRecursive(nodeID, isImplode) {
        this._ee.trigger(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, nodeID, isImplode);
      }
      /**
       * Implodes/explodes all branching nodes from the provided node recursively, but only ones that are not circular. I.e. branches that do not lead back to the provided node.
       * @param {string} nodeID - ID of the node
       * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
       * @return {void}
       */
    }, {
      key: "implodeOrExplodeNodeNonCircular",
      value: function implodeOrExplodeNodeNonCircular(nodeID, isImplode) {
        this._ee.trigger(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, nodeID, isImplode);
      }
      /**
       * Updates the hidden status on the input nodes
       * @param {{isHidden: boolean, id: string}[]} newValues - An array of new values to be applied to the given nodes
       */
    }, {
      key: "setNodesHiddenStatus",
      value: function setNodesHiddenStatus(newValues) {
        this._ee.trigger(EVENTS.NODE_HIDDEN_STATUS_UPDATE_REQUEST, newValues);
      }
      /**
       * Sets the default line type for edges
       * @param {"line"|"cubicbezier"|"taxi"|"fulltaxi"} newLineType
       */
    }, {
      key: "setDefaultLineType",
      value: function setDefaultLineType(newLineType) {
        this._UI.DOMProcessor.lineType = newLineType;
        this._engine.softRestart();
      }
      /**
       * Toggles the center force on or off in the graph.
       * @param {boolean} isEnable - Should the center force be toggled on or off?
       */
    }, {
      key: "setCenterForce",
      value: function setCenterForce(isEnable) {
        isEnable ? this._engine.enableCenterForce() : this._engine.disableCenterForce();
        this._engine.alpha(0.5);
        this._engine.restart();
      }
      /**
       * Toggles rotation of edge labels on and off
       * @param {boolean} shouldRotate
       */
    }, {
      key: "setRotateLabels",
      value: function setRotateLabels(shouldRotate) {
        this._UI.DOMProcessor.rotateLabels = shouldRotate;
        this._engine.softRestart();
      }
      /**
       * Toggles the background grid
       * @param {"primary"|"secondary"|boolean} grid
       */
    }, {
      key: "setGrid",
      value: function setGrid(grid) {
        if (grid === "secondary") {
          this._UI.grid.enableGrid = false;
          this._UI.grid.enableSecondaryGrid = true;
        } else if (grid) {
          this._UI.grid.enableGrid = true;
          this._UI.grid.enableSecondaryGrid = false;
        } else {
          this._UI.grid.enableGrid = false;
          this._UI.grid.enableSecondaryGrid = false;
        }
        this._UI.grid.initialize();
      }
      /**
       * Updates the data in the graph. This is commonly used for reflecting changes in the outer application
       * @param {object} newDataset - New data set
       * @return {void}
       */
    }, {
      key: "updateDataset",
      value: function updateDataset(newDataset) {
        if (newDataset.style) {
          this._style = newDataset.style ? newDataset.style : {};
          this._ee.trigger(EVENTS.STYLE_UPDATE_REQUESTED, this._style);
        }
        this._ee.trigger(EVENTS.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges);
      }
      /**
       * Returns nodes in the data store
       * @param {boolean} - Only include live nodes?
       * @returns All nodes in the data store
       */
    }, {
      key: "getNodes",
      value: function getNodes() {
        var onlyLiveData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return onlyLiveData ? this._datastore.liveNodes : this._datastore.allNodes;
      }
      /**
       * Returns edges in the data store
       * @param {boolean} - Only include live nodes?
       * @returns All edges in the data store
       */
    }, {
      key: "getEdges",
      value: function getEdges() {
        var onlyLiveData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return onlyLiveData ? this._datastore.liveEdges : this._datastore.allEdges;
      }
      /**
       * Exports the graph dataset into a JSON file that can be loaded into the graph at a later time
       * @param {boolean} includeOnlyLiveData - Should only live data be included in the export, or the entire dataset?
       */
    }, {
      key: "saveState",
      value: function saveState(includeOnlyLiveData) {
        if (!this._datastore.allNodes && !this._datastore.allEdges) {
          return;
        }
        var state = {
          style: this._style,
          nodes: includeOnlyLiveData ? this._datastore.liveNodes : this._datastore.allNodes,
          edges: includeOnlyLiveData ? this._datastore.liveEdges : this._datastore.allEdges
        };
        return state;
      }
      /**
       * Loads an exported state of nodes and edges into the graph.
       * @param {{style: {}, nodes: {}[], edges: {}[]}} newState
       */
    }, {
      key: "loadState",
      value: function loadState(newState) {
        this.updateDataset({
          style: newState.style,
          nodes: [],
          edges: []
        });
        this._ee.trigger(EVENTS.LOAD_STATE, newState.nodes, newState.edges, newState.style);
        this._style = newState.style ? newState.style : {};
        this._ee.trigger(EVENTS.STYLE_UPDATE_REQUESTED, this._style);
      }
      /**
       * Completely dismount and remove the graph
       * @return {void}
       */
    }, {
      key: "destroyGraph",
      value: function destroyGraph() {
        var _this4 = this;
        //All unmount listeners must be synchronous!!
        this._ee.trigger(EVENTS.GRAPH_WILL_UNMOUNT);
        Object.keys(this).forEach(function (key) {
          delete _this4[key];
        });
      }
    }]);
    return Virrvarr;
  }();

  return Virrvarr;

}));
