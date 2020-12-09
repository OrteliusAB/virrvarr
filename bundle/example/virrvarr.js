/** @preserve @license @cc_on
 * ----------------------------------------------------------
 * virrvarr version 0.1.11
 * An awesome network graph 
 * undefined
 * Copyright (c) 2020 Ortelius AB
 * All Rights Reserved. MIT License
 * https://mit-license.org/
 * ----------------------------------------------------------
 */

(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Virrvarr = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    };
  }

  function ascendingComparator(f) {
    return function(d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);

  function sequence(start, stop, step) {
    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  var noop = {value: function() {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames(typenames, types) {
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
          T = parseTypenames(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
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

  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
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
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
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

    return new Selection(subgroups, this._parents);
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function selection_selectAll(select) {
    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
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

    return new Selection(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection(this._enter || this._groups.map(sparse), this._parents);
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

  function constant(x) {
    return function() {
      return x;
    };
  }

  var keyPrefix = "$"; // Protect against keys like “__proto__”.

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
        nodeByKeyValue = {},
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
        if (keyValue in nodeByKeyValue) {
          exit[i] = node;
        } else {
          nodeByKeyValue[keyValue] = node;
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = keyPrefix + key.call(parent, data[i], i, data);
      if (node = nodeByKeyValue[keyValue]) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue[keyValue] = null;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
        exit[i] = node;
      }
    }
  }

  function selection_data(value, key) {
    if (!value) {
      data = new Array(this.size()), j = -1;
      this.each(function(d) { data[++j] = d; });
      return data;
    }

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = value.call(parent, parent && parent.__data__, j, parents),
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

    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {

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

    return new Selection(merges, this._parents);
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
    if (!compare) compare = ascending$1;

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

    return new Selection(sortgroups, this._parents).order();
  }

  function ascending$1(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    var nodes = new Array(this.size()), i = -1;
    this.each(function() { nodes[++i] = this; });
    return nodes;
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
    var size = 0;
    this.each(function() { ++size; });
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

  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS(fullname, value) {
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
        ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)
        : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove : typeof value === "function"
              ? styleFunction
              : styleConstant)(name, value, priority == null ? "" : priority))
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

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction
            : textConstant)(value))
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
    return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
  }

  function selection_cloneDeep() {
    return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  var filterEvents = {};

  var event = null;

  if (typeof document !== "undefined") {
    var element = document.documentElement;
    if (!("onmouseenter" in element)) {
      filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
    }
  }

  function filterContextListener(listener, index, group) {
    listener = contextListener(listener, index, group);
    return function(event) {
      var related = event.relatedTarget;
      if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
        listener.call(this, event);
      }
    };
  }

  function contextListener(listener, index, group) {
    return function(event1) {
      var event0 = event; // Events can be reentrant (e.g., focus).
      event = event1;
      try {
        listener.call(this, this.__data__, index, group);
      } finally {
        event = event0;
      }
    };
  }

  function parseTypenames$1(typenames) {
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
          this.removeEventListener(o.type, o.listener, o.capture);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, capture) {
    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
    return function(d, i, group) {
      var on = this.__on, o, listener = wrap(value, i, group);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
          this.addEventListener(o.type, o.listener = listener, o.capture = capture);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, capture);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, capture) {
    var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

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
    if (capture == null) capture = false;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
    return this;
  }

  function customEvent(event1, listener, that, args) {
    var event0 = event;
    event1.sourceEvent = event;
    event = event1;
    try {
      return listener.apply(that, args);
    } finally {
      event = event0;
    }
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

  var root = [null];

  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection([[document.documentElement]], root);
  }

  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
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
    dispatch: selection_dispatch
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection([[document.querySelector(selector)]], [document.documentElement])
        : new Selection([[selector]], root);
  }

  function sourceEvent() {
    var current = event, source;
    while (source = current.sourceEvent) current = source;
    return current;
  }

  function point(node, event) {
    var svg = node.ownerSVGElement || node;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }

    var rect = node.getBoundingClientRect();
    return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
  }

  function mouse(node) {
    var event = sourceEvent();
    if (event.changedTouches) event = event.changedTouches[0];
    return point(node, event);
  }

  function selectAll(selector) {
    return typeof selector === "string"
        ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
        : new Selection([selector == null ? [] : selector], root);
  }

  function touch(node, touches, identifier) {
    if (arguments.length < 3) identifier = touches, touches = sourceEvent().changedTouches;

    for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
      if ((touch = touches[i]).identifier === identifier) {
        return point(node, touch);
      }
    }

    return null;
  }

  function nopropagation() {
    event.stopImmediatePropagation();
  }

  function noevent() {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent, true);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent, true);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent, true);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  function constant$1(x) {
    return function() {
      return x;
    };
  }

  function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
    this.target = target;
    this.type = type;
    this.subject = subject;
    this.identifier = id;
    this.active = active;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this._ = dispatch;
  }

  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  // Ignore right-click, since that should open the context menu.
  function defaultFilter() {
    return !event.ctrlKey && !event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(d) {
    return d == null ? {x: event.x, y: event.y} : d;
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function drag() {
    var filter = defaultFilter,
        container = defaultContainer,
        subject = defaultSubject,
        touchable = defaultTouchable,
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
          .on("touchmove.drag", touchmoved)
          .on("touchend.drag touchcancel.drag", touchended)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned() {
      if (touchending || !filter.apply(this, arguments)) return;
      var gesture = beforestart("mouse", container.apply(this, arguments), mouse, this, arguments);
      if (!gesture) return;
      select(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
      dragDisable(event.view);
      nopropagation();
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start");
    }

    function mousemoved() {
      noevent();
      if (!mousemoving) {
        var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag");
    }

    function mouseupped() {
      select(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent();
      gestures.mouse("end");
    }

    function touchstarted() {
      if (!filter.apply(this, arguments)) return;
      var touches = event.changedTouches,
          c = container.apply(this, arguments),
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = beforestart(touches[i].identifier, c, touch, this, arguments)) {
          nopropagation();
          gesture("start");
        }
      }
    }

    function touchmoved() {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          noevent();
          gesture("drag");
        }
      }
    }

    function touchended() {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          nopropagation();
          gesture("end");
        }
      }
    }

    function beforestart(id, container, point, that, args) {
      var p = point(container, id), s, dx, dy,
          sublisteners = listeners.copy();

      if (!customEvent(new DragEvent(drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
        if ((event.subject = s = subject.apply(that, args)) == null) return false;
        dx = s.x - p[0] || 0;
        dy = s.y - p[1] || 0;
        return true;
      })) return;

      return function gesture(type) {
        var p0 = p, n;
        switch (type) {
          case "start": gestures[id] = gesture, n = active++; break;
          case "end": delete gestures[id], --active; // nobreak
          case "drag": p = point(container, id), n = active; break;
        }
        customEvent(new DragEvent(drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
      };
    }

    drag.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$1(!!_), drag) : filter;
    };

    drag.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant$1(_), drag) : container;
    };

    drag.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant$1(_), drag) : subject;
    };

    drag.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$1(!!_), drag) : touchable;
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
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex3 = /^#([0-9a-f]{3})$/,
      reHex6 = /^#([0-9a-f]{6})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

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
    copy: function(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
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
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
      return this;
    },
    displayable: function() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
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
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
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
    displayable: function() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl: function() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(")
          + (this.h || 0) + ", "
          + (this.s || 0) * 100 + "%, "
          + (this.l || 0) * 100 + "%"
          + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var deg2rad = Math.PI / 180;
  var rad2deg = 180 / Math.PI;

  // https://observablehq.com/@mbostock/lab-and-rgb
  var K = 18,
      Xn = 0.96422,
      Yn = 1,
      Zn = 0.82521,
      t0 = 4 / 29,
      t1 = 6 / 29,
      t2 = 3 * t1 * t1,
      t3 = t1 * t1 * t1;

  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r),
        g = rgb2lrgb(o.g),
        b = rgb2lrgb(o.b),
        y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
    if (r === g && g === b) x = z = y; else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }

  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }

  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Lab, lab, extend(Color, {
    brighter: function(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function() {
      var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(
        lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
        lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
        lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
        this.opacity
      );
    }
  }));

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * rad2deg;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }

  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }

  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }

  define(Hcl, hcl, extend(Color, {
    brighter: function(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker: function(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb: function() {
      return hcl2lab(this).rgb();
    }
  }));

  var A = -0.14861,
      B = +1.78277,
      C = -0.29227,
      D = -0.90649,
      E = +1.97294,
      ED = E * D,
      EB = E * B,
      BC_DA = B * C - D * A;

  function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
        bl = b - l,
        k = (E * (g - l) - C * bl) / D,
        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
  }

  function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Cubehelix, cubehelix, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
          l = +this.l,
          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
      return new Rgb(
        255 * (l + a * (A * cosh + B * sinh)),
        255 * (l + a * (C * cosh + D * sinh)),
        255 * (l + a * (E * cosh)),
        this.opacity
      );
    }
  }));

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function linear(a, d) {
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
      return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$2(isNaN(a) ? b : a);
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
    return a = +a, b -= a, function(t) {
      return a + b * t;
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

  var identity = {
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

  var cssNode,
      cssRoot,
      cssView,
      svgNode;

  function parseCss(value) {
    if (value === "none") return identity;
    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
    cssNode.style.transform = value;
    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
    cssRoot.removeChild(cssNode);
    value = value.slice(7, -1).split(",");
    return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
  }

  function parseSvg(value) {
    if (value == null) return identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
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

  var rho = Math.SQRT2,
      rho2 = 2,
      rho4 = 4,
      epsilon2 = 1e-12;

  function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }

  function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }

  function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function interpolateZoom(p0, p1) {
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

    i.duration = S * 1000;

    return i;
  }

  var frame = 0, // is an animation frame pending?
      timeout = 0, // is a timeout pending?
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
      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
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
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout$1(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(function(elapsed) {
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
    var schedule = get$1(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set$1(node, id) {
    var schedule = get$1(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get$1(node, id) {
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
        if (o.state === STARTED) return timeout$1(start);

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
      timeout$1(function() {
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
      var schedule = set$1(this, id),
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
      var schedule = set$1(this, id),
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
      var tween = get$1(this.node(), id).tween;
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
      var schedule = set$1(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get$1(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
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

  function attrConstant$1(name, interpolate, value1) {
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

  function attrConstantNS$1(fullname, interpolate, value1) {
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

  function attrFunction$1(name, interpolate, value) {
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

  function attrFunctionNS$1(fullname, interpolate, value) {
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
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i(t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i(t));
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
        : get$1(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set$1(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set$1(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get$1(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set$1(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get$1(this.node(), id).ease;
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
    var on0, on1, sit = start(name) ? init : set$1;
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
        ? get$1(this.node(), id).on.on(name)
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
          schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
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
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
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

  var Selection$1 = selection.prototype.constructor;

  function transition_selection() {
    return new Selection$1(this._groups, this._parents);
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

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, interpolate, value1) {
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

  function styleFunction$1(name, interpolate, value) {
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
      var schedule = set$1(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove$1(name)) : undefined;

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
        .on("end.style." + name, styleRemove$1(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction$1(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant$1(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i(t), priority);
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

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction$1(tweenValue(this, "text", value))
        : textConstant$1(value == null ? "" : value + ""));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get$1(node, id0);
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
        var schedule = set$1(this, id),
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
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function transition(name) {
    return selection().transition(name);
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
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
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    end: transition_end
  };

  function linear$1(t) {
    return +t;
  }

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
        return defaultTiming.time = now(), defaultTiming;
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

  var pi = Math.PI,
      tau = 2 * pi,
      epsilon = 1e-6,
      tauEpsilon = tau - epsilon;

  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }

  function path() {
    return new Path;
  }

  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function(x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
      this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
      this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x1,y1).
      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon));

      // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
      // Equivalently, is (x1,y1) coincident with (x2,y2)?
      // Or, is the radius zero? Line to (x1,y1).
      else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
        this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
      }

      // Otherwise, draw an arc!
      else {
        var x20 = x2 - x0,
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
          this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
        }

        this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
      }
    },
    arc: function(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0;

      // Is the radius negative? Error.
      if (r < 0) throw new Error("negative radius: " + r);

      // Is this path empty? Move to (x0,y0).
      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      }

      // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
        this._ += "L" + x0 + "," + y0;
      }

      // Is this arc empty? We’re done.
      if (!r) return;

      // Does the angle go the wrong way? Flip the direction.
      if (da < 0) da = da % tau + tau;

      // Is this a complete circle? Draw two arcs to complete the circle.
      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      }

      // Is this arc non-empty? Draw an arc!
      else if (da > epsilon) {
        this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
      }
    },
    rect: function(x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
    },
    toString: function() {
      return this._;
    }
  };

  var prefix = "$";

  function Map() {}

  Map.prototype = map.prototype = {
    constructor: Map,
    has: function(key) {
      return (prefix + key) in this;
    },
    get: function(key) {
      return this[prefix + key];
    },
    set: function(key, value) {
      this[prefix + key] = value;
      return this;
    },
    remove: function(key) {
      var property = prefix + key;
      return property in this && delete this[property];
    },
    clear: function() {
      for (var property in this) if (property[0] === prefix) delete this[property];
    },
    keys: function() {
      var keys = [];
      for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
      return keys;
    },
    values: function() {
      var values = [];
      for (var property in this) if (property[0] === prefix) values.push(this[property]);
      return values;
    },
    entries: function() {
      var entries = [];
      for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
      return entries;
    },
    size: function() {
      var size = 0;
      for (var property in this) if (property[0] === prefix) ++size;
      return size;
    },
    empty: function() {
      for (var property in this) if (property[0] === prefix) return false;
      return true;
    },
    each: function(f) {
      for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
    }
  };

  function map(object, f) {
    var map = new Map;

    // Copy constructor.
    if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

    // Index array by numeric index or specified key function.
    else if (Array.isArray(object)) {
      var i = -1,
          n = object.length,
          o;

      if (f == null) while (++i < n) map.set(i, object[i]);
      else while (++i < n) map.set(f(o = object[i], i, object), o);
    }

    // Convert object to map.
    else if (object) for (var key in object) map.set(key, object[key]);

    return map;
  }

  function Set$1() {}

  var proto = map.prototype;

  Set$1.prototype = set$2.prototype = {
    constructor: Set$1,
    has: proto.has,
    add: function(value) {
      value += "";
      this[prefix + value] = value;
      return this;
    },
    remove: proto.remove,
    clear: proto.clear,
    values: proto.keys,
    size: proto.size,
    empty: proto.empty,
    each: proto.each
  };

  function set$2(object, f) {
    var set = new Set$1;

    // Copy constructor.
    if (object instanceof Set$1) object.each(function(value) { set.add(value); });

    // Otherwise, assume it’s an array.
    else if (object) {
      var i = -1, n = object.length;
      if (f == null) while (++i < n) set.add(object[i]);
      else while (++i < n) set.add(f(object[i], i, object));
    }

    return set;
  }

  var EOL = {},
      EOF = {},
      QUOTE = 34,
      NEWLINE = 10,
      RETURN = 13;

  function objectConverter(columns) {
    return new Function("d", "return {" + columns.map(function(name, i) {
      return JSON.stringify(name) + ": d[" + i + "]";
    }).join(",") + "}");
  }

  function customConverter(columns, f) {
    var object = objectConverter(columns);
    return function(row, i) {
      return f(object(row), i, columns);
    };
  }

  // Compute unique columns in order of discovery.
  function inferColumns(rows) {
    var columnSet = Object.create(null),
        columns = [];

    rows.forEach(function(row) {
      for (var column in row) {
        if (!(column in columnSet)) {
          columns.push(columnSet[column] = column);
        }
      }
    });

    return columns;
  }

  function pad(value, width) {
    var s = value + "", length = s.length;
    return length < width ? new Array(width - length + 1).join(0) + s : s;
  }

  function formatYear(year) {
    return year < 0 ? "-" + pad(-year, 6)
      : year > 9999 ? "+" + pad(year, 6)
      : pad(year, 4);
  }

  function formatDate(date) {
    var hours = date.getUTCHours(),
        minutes = date.getUTCMinutes(),
        seconds = date.getUTCSeconds(),
        milliseconds = date.getUTCMilliseconds();
    return isNaN(date) ? "Invalid Date"
        : formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
        + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
        : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
        : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
        : "");
  }

  function dsvFormat(delimiter) {
    var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
        DELIMITER = delimiter.charCodeAt(0);

    function parse(text, f) {
      var convert, columns, rows = parseRows(text, function(row, i) {
        if (convert) return convert(row, i - 1);
        columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
      });
      rows.columns = columns || [];
      return rows;
    }

    function parseRows(text, f) {
      var rows = [], // output rows
          N = text.length,
          I = 0, // current character index
          n = 0, // current line number
          t, // current token
          eof = N <= 0, // current token followed by EOF?
          eol = false; // current token followed by EOL?

      // Strip the trailing newline.
      if (text.charCodeAt(N - 1) === NEWLINE) --N;
      if (text.charCodeAt(N - 1) === RETURN) --N;

      function token() {
        if (eof) return EOF;
        if (eol) return eol = false, EOL;

        // Unescape quotes.
        var i, j = I, c;
        if (text.charCodeAt(j) === QUOTE) {
          while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
          if ((i = I) >= N) eof = true;
          else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
          else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
          return text.slice(j + 1, i - 1).replace(/""/g, "\"");
        }

        // Find next delimiter or newline.
        while (I < N) {
          if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
          else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
          else if (c !== DELIMITER) continue;
          return text.slice(j, i);
        }

        // Return last token before EOF.
        return eof = true, text.slice(j, N);
      }

      while ((t = token()) !== EOF) {
        var row = [];
        while (t !== EOL && t !== EOF) row.push(t), t = token();
        if (f && (row = f(row, n++)) == null) continue;
        rows.push(row);
      }

      return rows;
    }

    function preformatBody(rows, columns) {
      return rows.map(function(row) {
        return columns.map(function(column) {
          return formatValue(row[column]);
        }).join(delimiter);
      });
    }

    function format(rows, columns) {
      if (columns == null) columns = inferColumns(rows);
      return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
    }

    function formatBody(rows, columns) {
      if (columns == null) columns = inferColumns(rows);
      return preformatBody(rows, columns).join("\n");
    }

    function formatRows(rows) {
      return rows.map(formatRow).join("\n");
    }

    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }

    function formatValue(value) {
      return value == null ? ""
          : value instanceof Date ? formatDate(value)
          : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
          : value;
    }

    return {
      parse: parse,
      parseRows: parseRows,
      format: format,
      formatBody: formatBody,
      formatRows: formatRows
    };
  }

  var csv = dsvFormat(",");

  var tsv = dsvFormat("\t");

  function center(x, y) {
    var nodes;

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

      for (sx = sx / n - x, sy = sy / n - y, i = 0; i < n; ++i) {
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

    return force;
  }

  function constant$3(x) {
    return function() {
      return x;
    };
  }

  function jiggle() {
    return (Math.random() - 0.5) * 1e-6;
  }

  function tree_add(d) {
    var x = +this._x.call(null, d),
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
      var z = x1 - x0,
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

  function index(d) {
    return d.index;
  }

  function find(nodeById, nodeId) {
    var node = nodeById.get(nodeId);
    if (!node) throw new Error("missing: " + nodeId);
    return node;
  }

  function link(links) {
    var id = index,
        strength = defaultStrength,
        strengths,
        distance = constant$3(30),
        distances,
        nodes,
        count,
        bias,
        iterations = 1;

    if (links == null) links = [];

    function defaultStrength(link) {
      return 1 / Math.min(count[link.source.index], count[link.target.index]);
    }

    function force(alpha) {
      for (var k = 0, n = links.length; k < iterations; ++k) {
        for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
          link = links[i], source = link.source, target = link.target;
          x = target.x + target.vx - source.x - source.vx || jiggle();
          y = target.y + target.vy - source.y - source.vy || jiggle();
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
          nodeById = map(nodes, id),
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

    force.initialize = function(_) {
      nodes = _;
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
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$3(+_), initializeStrength(), force) : strength;
    };

    force.distance = function(_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant$3(+_), initializeDistance(), force) : distance;
    };

    return force;
  }

  function x(d) {
    return d.x;
  }

  function y(d) {
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
        forces = map(),
        stepper = timer(step),
        event = dispatch("tick", "end");

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

        forces.each(function (force) {
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
          var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }
        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
      }
    }

    function initializeForce(force) {
      if (force.initialize) force.initialize(nodes);
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
        return arguments.length ? (nodes = _, initializeNodes(), forces.each(initializeForce), simulation) : nodes;
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

      force: function(name, _) {
        return arguments.length > 1 ? ((_ == null ? forces.remove(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
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
        alpha,
        strength = constant$3(-30),
        strengths,
        distanceMin2 = 1,
        distanceMax2 = Infinity,
        theta2 = 0.81;

    function force(_) {
      var i, n = nodes.length, tree = quadtree(nodes, x, y).visitAfter(accumulate);
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
          if (x === 0) x = jiggle(), l += x * x;
          if (y === 0) y = jiggle(), l += y * y;
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
        if (x === 0) x = jiggle(), l += x * x;
        if (y === 0) y = jiggle(), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
      }

      do if (quad.data !== node) {
        w = strengths[quad.data.index] * alpha / l;
        node.vx += x * w;
        node.vy += y * w;
      } while (quad = quad.next);
    }

    force.initialize = function(_) {
      nodes = _;
      initialize();
    };

    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$3(+_), initialize(), force) : strength;
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
    var strength = constant$3(0.1),
        nodes,
        strengths,
        xz;

    if (typeof x !== "function") x = constant$3(x == null ? 0 : +x);

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
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$3(+_), initialize(), force) : strength;
    };

    force.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant$3(+_), initialize(), force) : x;
    };

    return force;
  }

  function y$1(y) {
    var strength = constant$3(0.1),
        nodes,
        strengths,
        yz;

    if (typeof y !== "function") y = constant$3(y == null ? 0 : +y);

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
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant$3(+_), initialize(), force) : strength;
    };

    force.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant$3(+_), initialize(), force) : y;
    };

    return force;
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);

    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x.slice(i + 1)
    ];
  }

  function exponent(x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup(grouping, thousands) {
    return function(value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function formatSpecifier(specifier) {
    return new FormatSpecifier(specifier);
  }

  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    this.fill = match[1] || " ";
    this.align = match[2] || ">";
    this.sign = match[3] || "-";
    this.symbol = match[4] || "";
    this.zero = !!match[5];
    this.width = match[6] && +match[6];
    this.comma = !!match[7];
    this.precision = match[8] && +match[8].slice(1);
    this.trim = !!match[9];
    this.type = match[10] || "";
  }

  FormatSpecifier.prototype.toString = function() {
    return this.fill
        + this.align
        + this.sign
        + this.symbol
        + (this.zero ? "0" : "")
        + (this.width == null ? "" : Math.max(1, this.width | 0))
        + (this.comma ? "," : "")
        + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
        + (this.trim ? "~" : "")
        + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim(s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".": i0 = i1 = i; break;
        case "0": if (i0 === 0) i0 = i; i1 = i; break;
        default: if (i0 > 0) { if (!+s[i]) break out; i0 = 0; } break;
      }
    }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;

  function formatPrefixAuto(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient
        : i > n ? coefficient + new Array(i - n + 1).join("0")
        : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
        : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded(x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
        : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
        : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": function(x, p) { return (x * 100).toFixed(p); },
    "b": function(x) { return Math.round(x).toString(2); },
    "c": function(x) { return x + ""; },
    "d": function(x) { return Math.round(x).toString(10); },
    "e": function(x, p) { return x.toExponential(p); },
    "f": function(x, p) { return x.toFixed(p); },
    "g": function(x, p) { return x.toPrecision(p); },
    "o": function(x) { return Math.round(x).toString(8); },
    "p": function(x, p) { return formatRounded(x * 100, p); },
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
    "x": function(x) { return Math.round(x).toString(16); }
  };

  function identity$1(x) {
    return x;
  }

  var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

  function formatLocale(locale) {
    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$1,
        currency = locale.currency,
        decimal = locale.decimal,
        numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$1,
        percent = locale.percent || "%";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);

      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type;

      // The "n" type is an alias for ",g".
      if (type === "n") comma = true, type = "g";

      // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision == null && (precision = 12), trim = true, type = "g";

      // If zero fill is specified, padding goes after sign and before digits.
      if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

      // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.
      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

      // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?
      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type);

      // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].
      precision = precision == null ? 6
          : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
          : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i, n, c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;

          // Perform the initial formatting.
          var valueNegative = value < 0;
          value = formatType(Math.abs(value), precision);

          // Trim insignificant zeros.
          if (trim) value = formatTrim(value);

          // If a negative value rounds to zero during formatting, treat as positive.
          if (valueNegative && +value === 0) valueNegative = false;

          // Compute the prefix and suffix.
          valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

          // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }

        // If the fill character is not "0", grouping is applied before padding.
        if (comma && !zero) value = group(value, Infinity);

        // Compute the padding.
        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : "";

        // If the fill character is "0", grouping is applied after padding.
        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

        // Reconstruct the final output based on the desired alignment.
        switch (align) {
          case "<": value = valuePrefix + value + valueSuffix + padding; break;
          case "=": value = valuePrefix + padding + value + valueSuffix; break;
          case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
          default: value = padding + valuePrefix + value + valueSuffix; break;
        }

        return numerals(value);
      }

      format.toString = function() {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function(value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale;
  var format;
  var formatPrefix;

  defaultLocale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });

  function defaultLocale(definition) {
    locale = formatLocale(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  // Adds floating point numbers with twice the normal precision.
  // Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
  // Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
  // 305–363 (1997).
  // Code adapted from GeographicLib by Charles F. F. Karney,
  // http://geographiclib.sourceforge.net/

  function adder() {
    return new Adder;
  }

  function Adder() {
    this.reset();
  }

  Adder.prototype = {
    constructor: Adder,
    reset: function() {
      this.s = // rounded value
      this.t = 0; // exact error
    },
    add: function(y) {
      add$1(temp, y, this.t);
      add$1(this, temp.s, this.s);
      if (this.s) this.t += temp.t;
      else this.s = temp.t;
    },
    valueOf: function() {
      return this.s;
    }
  };

  var temp = new Adder;

  function add$1(adder, a, b) {
    var x = adder.s = a + b,
        bv = x - a,
        av = x - bv;
    adder.t = (a - av) + (b - bv);
  }

  var areaRingSum = adder();

  var areaSum = adder();

  var deltaSum = adder();

  var sum = adder();

  var lengthSum = adder();

  var areaSum$1 = adder(),
      areaRingSum$1 = adder();

  var lengthSum$1 = adder();

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0: break;
      case 1: this.range(domain); break;
      default: this.range(range).domain(domain); break;
    }
    return this;
  }

  var array = Array.prototype;
  var slice = array.slice;

  var implicit = {name: "implicit"};

  function ordinal() {
    var index = map(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      var key = d + "", i = index.get(key);
      if (!i) {
        if (unknown !== implicit) return unknown;
        index.set(key, i = domain.push(d));
      }
      return range[(i - 1) % range.length];
    }

    scale.domain = function(_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = map();
      var i = -1, n = _.length, d, key;
      while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
      return scale;
    };

    scale.range = function(_) {
      return arguments.length ? (range = slice.call(_), scale) : range.slice();
    };

    scale.unknown = function(_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function() {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);

    return scale;
  }

  function band() {
    var scale = ordinal().unknown(undefined),
        domain = scale.domain,
        ordinalRange = scale.range,
        range = [0, 1],
        step,
        bandwidth,
        round = false,
        paddingInner = 0,
        paddingOuter = 0,
        align = 0.5;

    delete scale.unknown;

    function rescale() {
      var n = domain().length,
          reverse = range[1] < range[0],
          start = range[reverse - 0],
          stop = range[1 - reverse];
      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round) step = Math.floor(step);
      start += (stop - start - step * (n - paddingInner)) * align;
      bandwidth = step * (1 - paddingInner);
      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
      var values = sequence(n).map(function(i) { return start + step * i; });
      return ordinalRange(reverse ? values.reverse() : values);
    }

    scale.domain = function(_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.range = function(_) {
      return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
    };

    scale.rangeRound = function(_) {
      return range = [+_[0], +_[1]], round = true, rescale();
    };

    scale.bandwidth = function() {
      return bandwidth;
    };

    scale.step = function() {
      return step;
    };

    scale.round = function(_) {
      return arguments.length ? (round = !!_, rescale()) : round;
    };

    scale.padding = function(_) {
      return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };

    scale.paddingInner = function(_) {
      return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };

    scale.paddingOuter = function(_) {
      return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };

    scale.align = function(_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };

    scale.copy = function() {
      return band(domain(), range)
          .round(round)
          .paddingInner(paddingInner)
          .paddingOuter(paddingOuter)
          .align(align);
    };

    return initRange.apply(rescale(), arguments);
  }

  function pointish(scale) {
    var copy = scale.copy;

    scale.padding = scale.paddingOuter;
    delete scale.paddingInner;
    delete scale.paddingOuter;

    scale.copy = function() {
      return pointish(copy());
    };

    return scale;
  }

  function point$1() {
    return pointish(band.apply(null, arguments).paddingInner(1));
  }

  var t0$1 = new Date,
      t1$1 = new Date;

  function newInterval(floori, offseti, count, field) {

    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.ceil = function(date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };

    interval.round = function(date) {
      var d0 = interval(date),
          d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = function(date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function(start, stop, step) {
      var range = [], previous;
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
      do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
      while (previous < start && start < stop);
      return range;
    };

    interval.filter = function(test) {
      return newInterval(function(date) {
        if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
      }, function(date, step) {
        if (date >= date) {
          if (step < 0) while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
          } else while (--step >= 0) {
            while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
          }
        }
      });
    };

    if (count) {
      interval.count = function(start, end) {
        t0$1.setTime(+start), t1$1.setTime(+end);
        floori(t0$1), floori(t1$1);
        return Math.floor(count(t0$1, t1$1));
      };

      interval.every = function(step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null
            : !(step > 1) ? interval
            : interval.filter(field
                ? function(d) { return field(d) % step === 0; }
                : function(d) { return interval.count(0, d) % step === 0; });
      };
    }

    return interval;
  }

  var millisecond = newInterval(function() {
    // noop
  }, function(date, step) {
    date.setTime(+date + step);
  }, function(start, end) {
    return end - start;
  });

  // An optimized implementation for this simple case.
  millisecond.every = function(k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(function(date) {
      date.setTime(Math.floor(date / k) * k);
    }, function(date, step) {
      date.setTime(+date + step * k);
    }, function(start, end) {
      return (end - start) / k;
    });
  };

  var durationSecond = 1e3;
  var durationMinute = 6e4;
  var durationHour = 36e5;
  var durationDay = 864e5;
  var durationWeek = 6048e5;

  var second = newInterval(function(date) {
    date.setTime(date - date.getMilliseconds());
  }, function(date, step) {
    date.setTime(+date + step * durationSecond);
  }, function(start, end) {
    return (end - start) / durationSecond;
  }, function(date) {
    return date.getUTCSeconds();
  });

  var minute = newInterval(function(date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
  }, function(date, step) {
    date.setTime(+date + step * durationMinute);
  }, function(start, end) {
    return (end - start) / durationMinute;
  }, function(date) {
    return date.getMinutes();
  });

  var hour = newInterval(function(date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
  }, function(date, step) {
    date.setTime(+date + step * durationHour);
  }, function(start, end) {
    return (end - start) / durationHour;
  }, function(date) {
    return date.getHours();
  });

  var day = newInterval(function(date) {
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
  }, function(date) {
    return date.getDate() - 1;
  });

  function weekday(i) {
    return newInterval(function(date) {
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(function(date) {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setMonth(date.getMonth() + step);
  }, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function(date) {
    return date.getMonth();
  });

  var year = newInterval(function(date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function(start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function(date) {
    return date.getFullYear();
  });

  // An optimized implementation for this simple case.
  year.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setFullYear(date.getFullYear() + step * k);
    });
  };

  var utcMinute = newInterval(function(date) {
    date.setUTCSeconds(0, 0);
  }, function(date, step) {
    date.setTime(+date + step * durationMinute);
  }, function(start, end) {
    return (end - start) / durationMinute;
  }, function(date) {
    return date.getUTCMinutes();
  });

  var utcHour = newInterval(function(date) {
    date.setUTCMinutes(0, 0, 0);
  }, function(date, step) {
    date.setTime(+date + step * durationHour);
  }, function(start, end) {
    return (end - start) / durationHour;
  }, function(date) {
    return date.getUTCHours();
  });

  var utcDay = newInterval(function(date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function(start, end) {
    return (end - start) / durationDay;
  }, function(date) {
    return date.getUTCDate() - 1;
  });

  function utcWeekday(i) {
    return newInterval(function(date) {
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
      return (end - start) / durationWeek;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(function(date) {
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function(date) {
    return date.getUTCMonth();
  });

  var utcYear = newInterval(function(date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function(date) {
    return date.getUTCFullYear();
  });

  // An optimized implementation for this simple case.
  utcYear.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newYear(y) {
    return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
  }

  function formatLocale$1(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;

    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);

    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear$1,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };

    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "f": formatUTCMicroseconds,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatUTCSeconds,
      "u": formatUTCWeekdayNumberMonday,
      "U": formatUTCWeekNumberSunday,
      "V": formatUTCWeekNumberISO,
      "w": formatUTCWeekdayNumberSunday,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };

    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "f": parseMicroseconds,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "Q": parseUnixTimestamp,
      "s": parseUnixTimestampSeconds,
      "S": parseSeconds,
      "u": parseWeekdayNumberMonday,
      "U": parseWeekNumberSunday,
      "V": parseWeekNumberISO,
      "w": parseWeekdayNumberSunday,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    };

    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function(date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;

        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
            else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, newDate) {
      return function(string) {
        var d = newYear(1900),
            i = parseSpecifier(d, specifier, string += "", 0),
            week, day$1;
        if (i != string.length) return null;

        // If a UNIX timestamp is specified, return it.
        if ("Q" in d) return new Date(d.Q);

        // The am-pm flag is 0 for AM, and 1 for PM.
        if ("p" in d) d.H = d.H % 12 + d.p * 12;

        // Convert day-of-week and week-of-year to day-of-year.
        if ("V" in d) {
          if (d.V < 1 || d.V > 53) return null;
          if (!("w" in d)) d.w = 1;
          if ("Z" in d) {
            week = utcDate(newYear(d.y)), day$1 = week.getUTCDay();
            week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = newDate(newYear(d.y)), day$1 = week.getDay();
            week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
            week = day.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
        }

        // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.
        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        }

        // Otherwise, all fields are in local time.
        return newDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);
        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    return {
      format: function(specifier) {
        var f = newFormat(specifier += "", formats);
        f.toString = function() { return specifier; };
        return f;
      },
      parse: function(specifier) {
        var p = newParse(specifier += "", localDate);
        p.toString = function() { return specifier; };
        return p;
      },
      utcFormat: function(specifier) {
        var f = newFormat(specifier += "", utcFormats);
        f.toString = function() { return specifier; };
        return f;
      },
      utcParse: function(specifier) {
        var p = newParse(specifier, utcDate);
        p.toString = function() { return specifier; };
        return p;
      }
    };
  }

  var pads = {"-": "", "_": " ", "0": "0"},
      numberRe = /^\s*\d+/, // note: ignores next directive
      percentRe = /^%/,
      requoteRe = /[\\^$*+?|[\]().{}]/g;

  function pad$1(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    var map = {}, i = -1, n = names.length;
    while (++i < n) map[names[i].toLowerCase()] = i;
    return map;
  }

  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }

  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = (+n[0]) * 1000, i + n[0].length) : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad$1(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad$1(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad$1(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad$1(1 + day.count(year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad$1(d.getMilliseconds(), p, 3);
  }

  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }

  function formatMonthNumber(d, p) {
    return pad$1(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad$1(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad$1(d.getSeconds(), p, 2);
  }

  function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
  }

  function formatWeekNumberSunday(d, p) {
    return pad$1(sunday.count(year(d), d), p, 2);
  }

  function formatWeekNumberISO(d, p) {
    var day = d.getDay();
    d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
    return pad$1(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
  }

  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad$1(monday.count(year(d), d), p, 2);
  }

  function formatYear$1(d, p) {
    return pad$1(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad$1(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+"))
        + pad$1(z / 60 | 0, "0", 2)
        + pad$1(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad$1(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad$1(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad$1(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad$1(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad$1(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }

  function formatUTCMonthNumber(d, p) {
    return pad$1(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad$1(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad$1(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad$1(utcSunday.count(utcYear(d), d), p, 2);
  }

  function formatUTCWeekNumberISO(d, p) {
    var day = d.getUTCDay();
    d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
    return pad$1(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
  }

  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad$1(utcMonday.count(utcYear(d), d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad$1(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad$1(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  function formatUnixTimestamp(d) {
    return +d;
  }

  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
  }

  var locale$1;
  var timeFormat;
  var timeParse;
  var utcFormat;
  var utcParse;

  defaultLocale$1({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });

  function defaultLocale$1(definition) {
    locale$1 = formatLocale$1(definition);
    timeFormat = locale$1.format;
    timeParse = locale$1.parse;
    utcFormat = locale$1.utcFormat;
    utcParse = locale$1.utcParse;
    return locale$1;
  }

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  var formatIso = Date.prototype.toISOString
      ? formatIsoNative
      : utcFormat(isoSpecifier);

  function parseIsoNative(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  }

  var parseIso = +new Date("2000-01-01T00:00:00.000Z")
      ? parseIsoNative
      : utcParse(isoSpecifier);

  function constant$4(x) {
    return function constant() {
      return x;
    };
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
        case 1: this._point = 2; // proceed
        default: this._context.lineTo(x, y); break;
      }
    }
  };

  function curveLinear(context) {
    return new Linear(context);
  }

  function x$2(p) {
    return p[0];
  }

  function y$2(p) {
    return p[1];
  }

  function line() {
    var x = x$2,
        y = y$2,
        defined = constant$4(true),
        context = null,
        curve = curveLinear,
        output = null;

    function line(data) {
      var i,
          n = data.length,
          d,
          defined0 = false,
          buffer;

      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) output.lineStart();
          else output.lineEnd();
        }
        if (defined0) output.point(+x(d, i, data), +y(d, i, data));
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    line.x = function(_) {
      return arguments.length ? (x = typeof _ === "function" ? _ : constant$4(+_), line) : x;
    };

    line.y = function(_) {
      return arguments.length ? (y = typeof _ === "function" ? _ : constant$4(+_), line) : y;
    };

    line.defined = function(_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$4(!!_), line) : defined;
    };

    line.curve = function(_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function(_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
  }

  function point$2(that, x, y) {
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
        case 3: point$2(this, this._x1, this._y1); break;
      }
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      x = +x, y = +y;
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
        case 2: this._point = 3; // proceed
        default: point$2(this, x, y); break;
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

  function sign(x) {
    return x < 0 ? -1 : 1;
  }

  // Calculate the slopes of the tangents (Hermite-type interpolation) based on
  // the following paper: Steffen, M. 1990. A Simple Method for Monotonic
  // Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
  // NOV(II), P. 443, 1990.
  function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0,
        h1 = x2 - that._x1,
        s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
        s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
        p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  }

  // Calculate a one-sided slope.
  function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
  }

  // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
  // "you can express cubic Hermite interpolation in terms of cubic Bézier curves
  // with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
  function point$3(that, t0, t1) {
    var x0 = that._x0,
        y0 = that._y0,
        x1 = that._x1,
        y1 = that._y1,
        dx = (x1 - x0) / 3;
    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
  }

  function MonotoneX(context) {
    this._context = context;
  }

  MonotoneX.prototype = {
    areaStart: function() {
      this._line = 0;
    },
    areaEnd: function() {
      this._line = NaN;
    },
    lineStart: function() {
      this._x0 = this._x1 =
      this._y0 = this._y1 =
      this._t0 = NaN;
      this._point = 0;
    },
    lineEnd: function() {
      switch (this._point) {
        case 2: this._context.lineTo(this._x1, this._y1); break;
        case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
      }
      if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function(x, y) {
      var t1 = NaN;

      x = +x, y = +y;
      if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
      switch (this._point) {
        case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
        case 1: this._point = 2; break;
        case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
        default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
      }

      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
      this._t0 = t1;
    }
  };

  function MonotoneY(context) {
    this._context = new ReflectContext(context);
  }

  (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
    MonotoneX.prototype.point.call(this, y, x);
  };

  function ReflectContext(context) {
    this._context = context;
  }

  ReflectContext.prototype = {
    moveTo: function(x, y) { this._context.moveTo(y, x); },
    closePath: function() { this._context.closePath(); },
    lineTo: function(x, y) { this._context.lineTo(y, x); },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
  };

  function constant$5(x) {
    return function() {
      return x;
    };
  }

  function ZoomEvent(target, type, transform) {
    this.target = target;
    this.type = type;
    this.transform = transform;
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

  var identity$2 = new Transform(1, 0, 0);

  function nopropagation$1() {
    event.stopImmediatePropagation();
  }

  function noevent$1() {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  // Ignore right-click, since that should open the context menu.
  function defaultFilter$1() {
    return !event.ctrlKey && !event.button;
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
    return this.__zoom || identity$2;
  }

  function defaultWheelDelta() {
    return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002);
  }

  function defaultTouchable$1() {
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
    var filter = defaultFilter$1,
        extent = defaultExtent,
        constrain = defaultConstrain,
        wheelDelta = defaultWheelDelta,
        touchable = defaultTouchable$1,
        scaleExtent = [0, Infinity],
        translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
        duration = 250,
        interpolate = interpolateZoom,
        listeners = dispatch("start", "zoom", "end"),
        touchstarting,
        touchending,
        touchDelay = 500,
        wheelDelay = 150,
        clickDistance2 = 0;

    function zoom(selection) {
      selection
          .property("__zoom", defaultTransform)
          .on("wheel.zoom", wheeled)
          .on("mousedown.zoom", mousedowned)
          .on("dblclick.zoom", dblclicked)
        .filter(touchable)
          .on("touchstart.zoom", touchstarted)
          .on("touchmove.zoom", touchmoved)
          .on("touchend.zoom touchcancel.zoom", touchended)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    zoom.transform = function(collection, transform, point) {
      var selection = collection.selection ? collection.selection() : collection;
      selection.property("__zoom", defaultTransform);
      if (collection !== selection) {
        schedule(collection, transform, point);
      } else {
        selection.interrupt().each(function() {
          gesture(this, arguments)
              .start()
              .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
              .end();
        });
      }
    };

    zoom.scaleBy = function(selection, k, p) {
      zoom.scaleTo(selection, function() {
        var k0 = this.__zoom.k,
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return k0 * k1;
      }, p);
    };

    zoom.scaleTo = function(selection, k, p) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t0 = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
            p1 = t0.invert(p0),
            k1 = typeof k === "function" ? k.apply(this, arguments) : k;
        return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
      }, p);
    };

    zoom.translateBy = function(selection, x, y) {
      zoom.transform(selection, function() {
        return constrain(this.__zoom.translate(
          typeof x === "function" ? x.apply(this, arguments) : x,
          typeof y === "function" ? y.apply(this, arguments) : y
        ), extent.apply(this, arguments), translateExtent);
      });
    };

    zoom.translateTo = function(selection, x, y, p) {
      zoom.transform(selection, function() {
        var e = extent.apply(this, arguments),
            t = this.__zoom,
            p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
        return constrain(identity$2.translate(p0[0], p0[1]).scale(t.k).translate(
          typeof x === "function" ? -x.apply(this, arguments) : -x,
          typeof y === "function" ? -y.apply(this, arguments) : -y
        ), e, translateExtent);
      }, p);
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

    function schedule(transition, transform, point) {
      transition
          .on("start.zoom", function() { gesture(this, arguments).start(); })
          .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
          .tween("zoom", function() {
            var that = this,
                args = arguments,
                g = gesture(that, args),
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
      this.extent = extent.apply(that, args);
      this.taps = 0;
    }

    Gesture.prototype = {
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
        customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
      }
    };

    function wheeled() {
      if (!filter.apply(this, arguments)) return;
      var g = gesture(this, arguments),
          t = this.__zoom,
          k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
          p = mouse(this);

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

      noevent$1();
      g.wheel = setTimeout(wheelidled, wheelDelay);
      g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

      function wheelidled() {
        g.wheel = null;
        g.end();
      }
    }

    function mousedowned() {
      if (touchending || !filter.apply(this, arguments)) return;
      var g = gesture(this, arguments, true),
          v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
          p = mouse(this),
          x0 = event.clientX,
          y0 = event.clientY;

      dragDisable(event.view);
      nopropagation$1();
      g.mouse = [p, this.__zoom.invert(p)];
      interrupt(this);
      g.start();

      function mousemoved() {
        noevent$1();
        if (!g.moved) {
          var dx = event.clientX - x0, dy = event.clientY - y0;
          g.moved = dx * dx + dy * dy > clickDistance2;
        }
        g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent, translateExtent));
      }

      function mouseupped() {
        v.on("mousemove.zoom mouseup.zoom", null);
        yesdrag(event.view, g.moved);
        noevent$1();
        g.end();
      }
    }

    function dblclicked() {
      if (!filter.apply(this, arguments)) return;
      var t0 = this.__zoom,
          p0 = mouse(this),
          p1 = t0.invert(p0),
          k1 = t0.k * (event.shiftKey ? 0.5 : 2),
          t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments), translateExtent);

      noevent$1();
      if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0);
      else select(this).call(zoom.transform, t1);
    }

    function touchstarted() {
      if (!filter.apply(this, arguments)) return;
      var touches = event.touches,
          n = touches.length,
          g = gesture(this, arguments, event.changedTouches.length === n),
          started, i, t, p;

      nopropagation$1();
      for (i = 0; i < n; ++i) {
        t = touches[i], p = touch(this, touches, t.identifier);
        p = [p, this.__zoom.invert(p), t.identifier];
        if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
        else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
      }

      if (touchstarting) touchstarting = clearTimeout(touchstarting);

      if (started) {
        if (g.taps < 2) touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
        interrupt(this);
        g.start();
      }
    }

    function touchmoved() {
      if (!this.__zooming) return;
      var g = gesture(this, arguments),
          touches = event.changedTouches,
          n = touches.length, i, t, p, l;

      noevent$1();
      if (touchstarting) touchstarting = clearTimeout(touchstarting);
      g.taps = 0;
      for (i = 0; i < n; ++i) {
        t = touches[i], p = touch(this, touches, t.identifier);
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

    function touchended() {
      if (!this.__zooming) return;
      var g = gesture(this, arguments),
          touches = event.changedTouches,
          n = touches.length, i, t;

      nopropagation$1();
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
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }

    zoom.wheelDelta = function(_) {
      return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant$5(+_), zoom) : wheelDelta;
    };

    zoom.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$5(!!_), zoom) : filter;
    };

    zoom.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$5(!!_), zoom) : touchable;
    };

    zoom.extent = function(_) {
      return arguments.length ? (extent = typeof _ === "function" ? _ : constant$5([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
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

    return zoom;
  }

  /**
   * Default configuration for Virrvarr
   */
  var Env = Object.freeze({
    //Params
    ENABLE_ZOOM_BUTTONS: false,
    DEFAULT_FADE_ON_HOVER: false,
    DEFAULT_USE_CONTEXT_MENU: true,
    SHOW_CONTEXT_MENU: true,
    DEFAULT_CUSTOM_CONTEXT_MENU: {},
    ENABLE_GRID: true,
    //Zoom
    ZOOM_PADDING: 40,
    //Nodes
    DEFAULT_RECTANGLE_MAX_HEIGHT: 20,
    DEFAULT_RECTANGLE_MAX_WIDTH: 60,
    DEFAULT_CIRCLE_NODE_RADIUS: 50,
    DEFAULT_NODE_SHADOW: false,
    //"0px 0px 10px rgba(0, 0, 0, .2)",
    DEFAULT_NODE_TEXT_MULTILINE: true,
    //Edge Labels
    LABEL_HEIGHT: 28,
    LABEL_WIDTH: 80,
    EDGE_LABEL_PADDING: 20,
    FIXED_EDGE_LABEL_WIDTH: false,
    ROTATE_LABELS: false,
    //Multiplicity Positioning
    MULTIPLICITY_HDISTANCE: 20,
    MULTIPLICITY_VDISTANCE: 10,
    //Style Defaults
    DEFAULT_STROKE_WIDTH: 2,
    DEFAULT_FONT_FAMILY: "Helvetica, Arial, sans-serif",
    DEFAULT_FONT_SIZE: "12px",
    DEFAULT_FADE_OPACITY: 0.5,
    DEFAULT_FOCUS_COLOR: "#ff6363",
    //Edges
    DEFAULT_EDGE_DOTTED_DASHARRAY: 3,
    DEFAULT_EDGE_DASHARRAY: 0,
    DEFAULT_EDGE_COLOR: "#000000",
    DEFAULT_ARROW_COLOR: "#000000",
    DEFAULT_MULTIPLICITY_FONT_SIZE: "10px",
    DEFAULT_EDGE_WIDTH: "2px",
    //Labels
    DEFAULT_LABEL_TEXT_COLOR: "#000000",
    DEFAULT_LABEL_TEXT_HOVER_COLOR: "#ffffff",
    DEFAULT_LABEL_BACKGROUND_COLOR: "#f8f8f8",
    DEFAULT_LABEL_HOVER_BACKGROUND_COLOR: "#ff6363",
    DEFAULT_LABEL_BORDER_RADIUS_X: "4px",
    DEFAULT_LABEL_BORDER_RADIUS_Y: "4px",
    DEFAULT_LABEL_BORDER_WIDTH: "0px",
    DEFAULT_LABEL_BORDER_COLOR: "transparent",
    //Nodes
    DEFAULT_NODE_DOTTED_DASHARRAY: 8,
    DEFAULT_NODE_STROKE_COLOR: "#000000",
    DEFAULT_NODE_COLOR: "#ffffff",
    DEFAULT_NODE_HOVER_COLOR: "#ff6363",
    DEFAULT_NODE_TEXT_COLOR: "#000000",
    DEFAULT_NODE_TEXT_HOVER_COLOR: "#ffffff",
    DEFAULT_NODE_BORDER_RADIUS_X: "0px",
    DEFAULT_NODE_BORDER_RADIUS_Y: "0px",
    DEFAULT_NODE_FOCUSED_BORDER_WIDTH: "4px",
    //Tooltip
    TOOLTIP_MIN_WIDTH: "80px",
    TOOLTIP_MAX_WIDTH: "150px",
    TOOLTIP_BACKGROUND: "black",
    TOOLTIP_COLOR: "white",
    TOOLTIP_BORDER_RADIUS: "2px",
    //Highlighting
    HIGHLIGHTING_BORDER_WIDTH: "0px",
    HIGHLIGHTING_BORDER_COLOR: "#878787",
    HIGHLIGHTING_COLOR: "#62b39e",
    //Edge Length and Spacing
    DEFAULT_VISIBLE_EDGE_DISTANCE: 350,
    SPACE_BETWEEN_SPANS: 12,
    ADDITIONAL_TEXT_SPACE: 4,
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
    //Force Layout
    EDGE_STRENGTH: 0.7,
    GRAVITY: 0.06,
    CHARGE: -2000,
    SCALE_EXTENT: [0.1, 4],
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

    var d = select("body").append("div").attr("class", textStyle).attr("style", "position: absolute;float: left;white-space: nowrap;visibility: hidden;").attr("id", "width-test") // tag this element to identify it
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
    // Params: data (.id, .data, .eventType (enter/leave))
    HOVER_ENTITY: "ENTITY_HOVER_EVENT",

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
    // Params: node
    NODE_FIXATION_REQUESTED: "NODE_FIXATION_REQUESTED",
    // Params: [...nodes], [...edges]
    DATA_UPDATE_REQUESTED: "DATA_UPDATE_REQUESTED",
    // Params: [...nodes], [...edges]
    DATASTORE_UPDATED: "LIVE_DATA_UPDATED_EVENT",
    // Params: [...nodes], [...edges]
    DATA_PROCESSOR_FINISHED: "DATA_PROCESSOR_FINISHED",
    // Params: [...nodes], [...edges]
    DOM_PROCESSOR_FINISHED: "DOM_PROCESSOR_FINISHED",
    // Params: [...nodes], [...edges]
    ENGINE_UPDATE_FINISHED: "ENGINE_UPDATE_FINISHED_EVENT",
    // Params: filters ({node:[], edges:[]})
    DATA_FILTER_REQUESTED: "DATA_FILTER_REQUESTED_EVENT",
    // Params: N/A
    DATA_FILTER_RESET_REQUESTED: "DATA_FILTER_RESET_REQUESTED_EVENT",
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
    // Params N/A
    TOGGLE_MULTIPLICITY_REQUESTED: "TOGGLE_MULTIPLICITY_REQUEST_EVENT",
    // Params: N/A
    ENGINE_TICK: "ENGINE_TICK_EVENT",
    // Params: nodes, edges, attribute, filterFunction, sortFunction
    ENGINE_LAYOUT_REQUESTED: "ENGINE_LAYOUT_REQUESTED_EVENT",
    // Params: nodes, edges
    ENGINE_LAYOUT_RESET_REQUESTED: "ENGINE_LAYOUT_RESET_REQUESTED_EVENT",
    // Params: N/A
    GRAPH_HAS_MOUNTED: "GRAPH_HAS_MOUNTED",
    // Params: N/A
    GRAPH_WILL_UNMOUNT: "GRAPH_WILL_UNMOUNT" //All unmount listeners must be synchronous!!

  });

  /* TODO:: Implement deep clone utility instead of JSON.stringify/parse */

  /**
   * The data store class is responsible to storing and managing all edges and nodes.
   * The data store decides what nodes and edges are live, as well as makes sure they have the correct data set on them.
   */

  var Datastore =
  /*#__PURE__*/
  function () {
    function Datastore(nodes, edges, eventEmitter) {
      var _this = this;

      _classCallCheck(this, Datastore);

      this.allNodes = JSON.parse(JSON.stringify(nodes));
      this.allEdges = JSON.parse(JSON.stringify(edges));
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
      this.ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
        _this.ee.trigger(EVENTS.DATASTORE_UPDATED, _this.nodes, _this.edges);
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
      this.ee.on(EVENTS.IMPLODE_EXPLODE_REQUESTED, function (id, isImplode) {
        _this.implodeOrExplodeNode(id, isImplode);

        _this.updateNumberOfHiddenEdgesOnNodes();

        _this.updateLiveData();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, function (id, isImplode) {
        _this.implodeOrExplodeNodeLeafs(id, isImplode);

        _this.updateNumberOfHiddenEdgesOnNodes();

        _this.updateLiveData();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_RECURSIVE_REQUESTED, function (id, isImplode) {
        _this.implodeOrExplodeNodeRecursive(id, isImplode);

        _this.updateNumberOfHiddenEdgesOnNodes();

        _this.updateLiveData();
      });
      this.ee.on(EVENTS.IMPLODE_EXPLODE_NON_CIRCULAR_REQUESTED, function (id, isImplode) {
        _this.implodeOrExplodeNodeNonCircular(id, isImplode);

        _this.updateNumberOfHiddenEdgesOnNodes();

        _this.updateLiveData();
      });
      this.updateEdgeIDs();
      this.applyFilters();
      this.updateNumberOfHiddenEdgesOnNodes();
    }
    /**
     * Will always return only what data is currently live
     */


    _createClass(Datastore, [{
      key: "updateEdgeIDs",

      /**
       * If there are edges that lack IDs this function will set these to a number that represents the index in the edge array.
       */
      value: function updateEdgeIDs() {
        this.allEdges.forEach(function (edge, edgeIndex) {
          if (edge.id === undefined) {
            edge.id = edgeIndex;
          }
        });
      }
      /**
       * Updates the data in the data store.
       * @param {object[]} newNodes - All nodes to be included in the new data set
       * @param {object[]} newEdges - All edges to be included in the new data set
       */

    }, {
      key: "updateDataset",
      value: function updateDataset(newNodes, newEdges) {
        var nodes = JSON.parse(JSON.stringify(newNodes));
        var edges = JSON.parse(JSON.stringify(newEdges));
        this.allNodes = nodes;
        this.allEdges = edges;
        this.updateEdgeIDs();
        this.applyFilters();
        this.updateNumberOfHiddenEdgesOnNodes();
        this.updateLiveData();
      }
      /**
       * Retrieves a node object by its ID
       * @param {string} ID - ID of the node
       * @return {object|null} - Node object or null
       */

    }, {
      key: "getNodeByID",
      value: function getNodeByID(ID) {
        return this.allNodes.find(function (node) {
          return node.id === ID;
        });
      }
      /**
       * Retrieves an edge object by its ID
       * @param {string} ID - ID of the edge
       * @return {object|null} - Edge object or null
       */

    }, {
      key: "getEdgeByID",
      value: function getEdgeByID(ID) {
        return this.allEdges.find(function (edge) {
          return edge.id === ID;
        });
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
        var _this2 = this;

        this.allNodes.forEach(function (node) {
          var isFiltered = false;

          _this2.filters.nodes.forEach(function (filter) {
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

          _this2.filters.edges.forEach(function (filter) {
            if (!isFiltered) {
              if (filter.filterFunction) {
                isFiltered = filter.filterFunction(edge.data);
              } else if (edge[filter.attribute] === filter.value) {
                isFiltered = true;
              }
            }
          }); //If nodes have been removed there could be broken edges. Mark these as filtered as well.


          var foundSource = _this2.allNodes.find(function (node) {
            return edge.sourceNode === node.id && !node.isFiltered;
          });

          var foundTarget = _this2.allNodes.find(function (node) {
            return edge.targetNode === node.id && !node.isFiltered;
          });

          if (!foundSource || !foundTarget) {
            isFiltered = true;
          }

          edge.isFiltered = isFiltered;
        });
      }
      /**
       * Updates the live data by filtering non-relevant nodes and edges
       */

    }, {
      key: "updateLiveData",
      value: function updateLiveData() {
        var _this3 = this;

        var nodes = this.allNodes.filter(function (node) {
          return _this3.isNodeLive(node);
        });
        var edges = this.allEdges.filter(function (edge) {
          return _this3.isEdgeLive(edge);
        }); //Apply the result to the live data
        //Sidenote: the reason we don't just overwrite the live data is because that messes with D3s object references

        nodes.forEach(function (newNode) {
          if (!_this3.liveNodes.find(function (oldNode) {
            return oldNode.id === newNode.id;
          })) {
            _this3.liveNodes.push(newNode);
          }
        });
        this.liveNodes = this.liveNodes.filter(function (oldNode) {
          return nodes.find(function (newNode) {
            return oldNode.id === newNode.id;
          });
        });
        edges.forEach(function (newEdge) {
          if (!_this3.liveEdges.find(function (oldEdge) {
            return oldEdge.id === newEdge.id;
          })) {
            _this3.liveEdges.push(newEdge);
          }
        });
        this.liveEdges = this.liveEdges.filter(function (oldEdge) {
          return edges.find(function (newEdge) {
            return oldEdge.id === newEdge.id;
          });
        });
        this.ee.trigger(EVENTS.DATASTORE_UPDATED, this.nodes, this.edges);
      }
      /**
       * Updates the counter on all nodes that has information about how many hidden edges it is a source to
       */

    }, {
      key: "updateNumberOfHiddenEdgesOnNodes",
      value: function updateNumberOfHiddenEdgesOnNodes() {
        var _this4 = this;

        //Write number of hidden edges to nodes
        this.allNodes.forEach(function (node) {
          if (node.isHidden || node.isFiltered) {
            //Node is not live
            node.hiddenEdgeCount = null;
            return;
          }

          node.hiddenEdgeCount = _this4.allEdges.filter(function (edge) {
            return edge.isHidden && !edge.isFiltered && edge.sourceNode === node.id;
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
       * @return {object} - Affected nodes and edges
       */

    }, {
      key: "implodeOrExplodeNode",
      value: function implodeOrExplodeNode(rootNodeID, isImplode) {
        var _this5 = this;

        var connectedEdges = this.allEdges.filter(function (edge) {
          return edge.sourceNode === rootNodeID;
        });
        var connectedNodes = connectedEdges.map(function (edge) {
          return edge.targetNode;
        }).filter(function (node) {
          return node !== rootNodeID;
        });
        var collateralEdges = this.allEdges.filter(function (edge) {
          if (connectedNodes.includes(edge.sourceNode) && connectedNodes.includes(edge.targetNode)) {
            //Processed nodes connecting to each other. This should always be included.
            return true;
          } else if (connectedNodes.includes(edge.sourceNode)) {
            //Going outwards
            return _this5.isNodeLive(_this5.getNodeByID(edge.targetNode));
          } else if (connectedNodes.includes(edge.targetNode)) {
            //Going inwards
            return _this5.isNodeLive(_this5.getNodeByID(edge.sourceNode));
          } else {
            return false;
          }
        });
        var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
        var nodes = connectedNodes.map(function (nodeID) {
          return _this5.getNodeByID(nodeID);
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
       * @return {object} - Affected nodes and edges
       */

    }, {
      key: "implodeOrExplodeNodeLeafs",
      value: function implodeOrExplodeNodeLeafs(rootNodeID, isImplode) {
        var _this6 = this;

        var connectedEdges = this.allEdges.filter(function (edge) {
          return edge.sourceNode === rootNodeID;
        }).filter(function (edge) {
          return !_this6.allEdges.find(function (secondaryEdge) {
            return secondaryEdge.sourceNode === edge.targetNode;
          });
        });
        var connectedNodes = connectedEdges.map(function (edge) {
          return edge.targetNode;
        });
        var collateralEdges = this.allEdges.filter(function (edge) {
          return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
        });
        var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
        var nodes = connectedNodes.map(function (nodeID) {
          return _this6.getNodeByID(nodeID);
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
        var _this7 = this;

        var processedNodeIDs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        if (!processedNodeIDs.includes(nodeID)) {
          processedNodeIDs.push(nodeID);

          var _this$implodeOrExplod = this.implodeOrExplodeNode(nodeID, isImplode),
              updatedNodes = _this$implodeOrExplod.updatedNodes;

          updatedNodes.forEach(function (node) {
            return _this7.implodeOrExplodeNodeRecursive(node.id, isImplode, processedNodeIDs);
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
        var _this8 = this;

        var connectedEdges = this.allEdges.filter(function (edge) {
          return edge.sourceNode === rootNodeID;
        }).filter(function (edge) {
          return _this8.calculateEdgePathFromNodeToNode(edge.targetNode, rootNodeID).length === 0;
        });
        var connectedNodes = connectedEdges.map(function (edge) {
          return edge.targetNode;
        });
        var collateralEdges = this.allEdges.filter(function (edge) {
          return connectedNodes.includes(edge.sourceNode) || connectedNodes.includes(edge.targetNode);
        });
        var edges = [].concat(_toConsumableArray(connectedEdges), _toConsumableArray(collateralEdges));
        var nodes = connectedNodes.map(function (nodeID) {
          return _this8.getNodeByID(nodeID);
        });
        this.setNodesAndEdgesHiddenStatus(nodes, edges, isImplode);
        connectedNodes.forEach(function (nodeID) {
          return _this8.implodeOrExplodeNodeRecursive(nodeID, isImplode);
        });
        return {
          updatedNodes: nodes,
          updatedEdges: edges
        };
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
        var _this9 = this;

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

            var potentialPath = _this9.calculateEdgePathFromNodeToNode(node, nodeIDTo, pathCopy, crossedNodes);

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
       */

    }, {
      key: "nodes",
      get: function get() {
        return this.liveNodes;
      }
    }]);

    return Datastore;
  }();

  var EventEmitter =
  /*#__PURE__*/
  function () {
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
      }
      /* Trigger an Event */

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

  var ZoomHandler =
  /*#__PURE__*/
  function () {
    function ZoomHandler(graphContainerElement, eventEmitter, options) {
      var _this = this;

      _classCallCheck(this, ZoomHandler);

      this.graphContainerElement = graphContainerElement;
      this.enableZoomButtons = options.enableZoomButtons !== undefined ? options.enableZoomButtons : Env.ENABLE_ZOOM_BUTTONS;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.ZOOM_REQUESTED, function (x, y, scale) {
        _this.handleZoomRequest(x, y, scale);
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.destroy();
      });
      this.zoom = zoom().scaleExtent(Env.SCALE_EXTENT).on("zoom", function () {
        var rootG = select(_this.graphContainerElement).select("g");
        rootG.attr("transform", event.transform);
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
        var zoomButtons = this.zoomButtonContainer.append("svg").attr("filter", "drop-shadow(0px 0px 2px rgba(0, 0, 0, .5))").attr("style", "position:absolute;height:110px;width:34px;right:15px;bottom:30px;").append("g").attr("class", "virrvarr-zoom-controls").attr("style", "cursor:pointer;");
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
        var currentScale = currentTransformStr.substring(currentTransformStr.indexOf("scale(") + 6, currentTransformStr.lastIndexOf(")"));
        currentScale = parseFloat(currentScale);
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
        select(this.graphContainerElement).select("svg").transition().duration(Env.ZOOM_TIME).call(this.zoom.transform, identity$2.translate(x, y).scale(scale)).select("g").attr("transform", "translate(".concat(x, ",").concat(y, ")scale(").concat(scale, ")"));
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

  var ContextMenu =
  /*#__PURE__*/
  function () {
    function ContextMenu(graphContainerElement, eventEmitter, options) {
      var _this = this;

      _classCallCheck(this, ContextMenu);

      this.showContextMenu = options.enableContextMenu !== undefined ? options.enableContextMenu : Env.SHOW_CONTEXT_MENU;
      this.customContextMenu = options.customContextMenu !== undefined ? options.customContextMenu : Env.DEFAULT_CUSTOM_CONTEXT_MENU;
      this.graphContainerElement = graphContainerElement;
      this.ee = eventEmitter;

      if (this.showContextMenu) {
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
        var coordinates = mouse(document.body);
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
        this.removeContextmenu();
        var ulElement = select(this.graphContainerElement).append("div").attr("id", "virrvarr-context-menu-container").attr("class", "virrvarr-context-menu").style("position", "fixed").style("left", mouseX + "px").style("top", mouseY + "px").style("display", "block").append("ul").attr("class", "virrvarr-context-menu-options");
        contextSectionsArray.forEach(function (section, index) {
          if (index === 0) {
            _this2.processSection(ulElement, section, false, clickedItem, direction);
          } else {
            _this2.processSection(ulElement, section, true, clickedItem, direction);
          }
        });
        customSectionsArray.forEach(function (section) {
          _this2.processSection(ulElement, section, true, clickedItem, direction);
        });
      }
      /**
       * Processes and creates a specific section of the context menu.
       * @param {HTMLElement} ul - The entire menu
       * @param {object[]} section - Array of menu items to be added
       * @param {boolean} shouldAddSeparatorBefore - Add a separating line before this new section?
       * @param {object|null} clickedItem - Item that was clicked
       * @param {string?} direction - Direction of the clicked edge, if applicable.
       */

    }, {
      key: "processSection",
      value: function processSection(ul, section, shouldAddSeparatorBefore, clickedItem) {
        var _this3 = this;

        var direction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

        if (shouldAddSeparatorBefore) {
          ul.append("li").append("div").attr("class", "virrvarr-context-menu-divider");
        }

        section.forEach(function (menuItem) {
          ul.append("li").append("div").attr("class", "virrvarr-context-menu-option").text(function () {
            return menuItem.label;
          }).on("click", function () {
            _this3.removeContextmenu();

            var data = clickedItem && clickedItem.data || null;
            var id = clickedItem && clickedItem.id || null;
            var edgeDirection = direction;
            return menuItem.action(data, id, edgeDirection);
          });
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

        if (this.customContextMenu.node) {
          customSections = _toConsumableArray(this.customContextMenu.node);
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

        if (this.customContextMenu.edge) {
          customSections = _toConsumableArray(this.customContextMenu.edge);
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

        if (this.customContextMenu.canvas) {
          customSections = _toConsumableArray(this.customContextMenu.canvas);
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
        var _this4 = this;

        this.NodeMenu = [{
          label: "Select Node",
          action: function action(data, id) {
            _this4.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: id,
              data: data
            });
          }
        }];
        this.EdgeMenu = [{
          label: "Select Edge",
          action: function action(data, id, edgeDirection) {
            _this4.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: id,
              data: data,
              direction: edgeDirection
            });
          }
        }];
        this.UniversalMenu = [{
          label: "Reset Zoom",
          action: function action() {
            _this4.ee.trigger(EVENTS.ZOOM_REQUESTED);
          }
        }];
      }
    }]);

    return ContextMenu;
  }();

  /**
   * The Highlighter class handles highlighting of nodes in the graph.
   * This includes both highlighting on selections as well as highlighting on search.
   */

  var Highlighter =
  /*#__PURE__*/
  function () {
    function Highlighter(eventEmitter) {
      var _this = this;

      _classCallCheck(this, Highlighter);

      this.ee = eventEmitter;
      this.ee.on(EVENTS.CLICK_ENTITY, function (data) {
        data && _this.setElementFocus(data.id, data.direction);
      });
      this.ee.on(EVENTS.CLICK_ENTITY, function (data) {
        data || _this.removeAllEntityFocus();
      });
      this.ee.on(EVENTS.HIGHLIGHT_NODE_REQUESTED, function (nodes) {
        _this.highlightNode(nodes.map(function (node) {
          return node.id;
        }));
      });
    }
    /**
     * This function sets the exclusive focus on a given entity
     * @param {string} entityID - ID of the entity to be focused
     * @param {boolean?} isFromDirection - Is the edge in the from direction? If applicable
     */


    _createClass(Highlighter, [{
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

          this.removeAllEntityFocus();
          this.toggleEntityFocusByID(entityID, isFrom);
        }
      }
      /**
       * Removes focus from all nodes and edges
       */

    }, {
      key: "removeAllEntityFocus",
      value: function removeAllEntityFocus() {
        selectAll(".focused").classed("focused", false);
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
        var nodeElement = select("[id='".concat(entityID, "']")); //html4 support

        if (nodeElement.node()) {
          var DOMElement = nodeElement.node();
          var DOMNeighborhood = DOMElement.parentElement.children;
          selectAll(_toConsumableArray(DOMNeighborhood)).classed("focused", !nodeElement.classed("focused"));
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
        var labelGroup = select("#label".concat(entityID).concat(isFrom ? "from" : "to"));

        if (labelGroup) {
          var label = labelGroup.select("rect");
          var focusedState = label.classed("focused");
          label.classed("focused", !focusedState);
          selectAll("marker[id*=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).select("path").classed("focused", !focusedState);
          selectAll("[class*=\"".concat(entityID).concat(isFrom ? "inverse" : "", "\"]")).selectAll("path, text").classed("focused", !focusedState);
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
        selectAll(".node").filter(function (d) {
          return nodes.includes(d.id);
        }).append("circle").attr("r", 50).classed("highlighted-node", true).transition().duration(Env.HIGHLIGHT_TIME).ease(bounceOut).style("transform", "scale(5)").transition().duration(Env.HIGHLIGHT_TIME_REMOVE).remove();
      }
    }]);

    return Highlighter;
  }();

  /**
   * The tooltip class handles generating and positioning the tooltip in the graph.
   */

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(graphContainerElement, eventEmitter) {
      var _this = this;

      _classCallCheck(this, Tooltip);

      this.graphContainerElement = graphContainerElement;
      this.ee = eventEmitter;
      this.tooltip = this.initializeTooltip();
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
        var coordinates = mouse(document.documentElement);
        this.tooltip.style("left", coordinates[0] - window.pageXOffset + "px").style("top", coordinates[1] + 20 - window.pageYOffset + "px").style("display", "inline-block").style("position", "fixed").html(node.name);
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

  var Grid =
  /*#__PURE__*/
  function () {
    function Grid(graphContainerElement, eventEmitter, options) {
      _classCallCheck(this, Grid);

      this.graphContainerElement = graphContainerElement;
      this.enableGrid = options.enableGrid !== undefined ? options.enableGrid : Env.ENABLE_GRID;
      this.enableSecondaryGrid = options.enableSecondaryGrid !== undefined ? options.enableSecondaryGrid : false;
      this.ee = eventEmitter;

      if (this.enableGrid) {
        this.initializeGrid();
      } else if (this.enableSecondaryGrid) {
        this.initializeAlternativeGrid();
      }
    }
    /**
     * Initialize the background grid
     */


    _createClass(Grid, [{
      key: "initializeGrid",
      value: function initializeGrid() {
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
        select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)");
      }
      /**
       * Initialize the secondary grid
       */

    }, {
      key: "initializeAlternativeGrid",
      value: function initializeAlternativeGrid() {
        var defs = select(this.graphContainerElement).select("svg").select("g").select("defs");
        var gridPattern = defs.append("pattern").attr("id", "grid").attr("width", 60).attr("height", 60).attr("patternUnits", "userSpaceOnUse");
        gridPattern.append("path").attr("d", "M 60 0 L 0 0 0 60").attr("style", "fill: none; stroke: #a0a0a0; stroke-width: 1; stroke-dasharray: 2;");
        select(this.graphContainerElement).select("svg").insert("rect", ":first-child").attr("width", "100%").attr("height", "100%").attr("fill", "url(#grid)");
      }
      /**
       * @param {D3Selection} container - D3 selection of the container we are drawing inside of
       * @param {*} startX - Start X coordinate of the line
       * @param {*} startY - Start Y coordinate of the line
       * @param {*} endX - End X coordinate of the line
       * @param {*} endY - End Y coordinate of the line
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
    var innerDistance = target.radius; //Rectangles require some more work...

    if (target.shape === "rectangle") {
      var m_edge = Math.abs(dy / dx);
      var m_rect = target.height / target.width;

      if (m_edge <= m_rect) {
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
    var angle = theta * (180 / Math.PI); //Convert to a 360 scale

    angle += 180; //Make sure the label is never upside-down

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
    var n = calculateNormalVector(source, target, distance);

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


  var calculateNormalVector = function calculateNormalVector(source, target, length) {
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

  var MathUtil = {
    calculateCurvePoint: calculateCurvePoint,
    calculateIntersection: calculateIntersection,
    calculateMultiEdgeDistance: calculateMultiEdgeDistance,
    calculateNormalVector: calculateNormalVector,
    calculateRadian: calculateRadian,
    curveFunction: curveFunction,
    loopFunction: loopFunction,
    calculateSelfEdgePath: calculateSelfEdgePath,
    calculateLabelAngle: calculateLabelAngle
  };

  /**
   * The DOM Processor class is responsible for managing the DOM using the provided node and edge data, as well as provided configuration.
   */

  var DOMProcessor =
  /*#__PURE__*/
  function () {
    function DOMProcessor(rootG, eventEmitter, userDefinedOptions) {
      var _this = this;

      _classCallCheck(this, DOMProcessor);

      this.enableFadeOnHover = userDefinedOptions.enableFadeOnHover !== undefined ? userDefinedOptions.enableFadeOnHover : Env.DEFAULT_FADE_ON_HOVER;
      this.showMultiplicity = true;
      this.enableMultiLineNodeLabels = userDefinedOptions.enableMultiLineNodeLabels !== undefined ? userDefinedOptions.enableMultiLineNodeLabels : Env.DEFAULT_NODE_TEXT_MULTILINE;
      this.rotateLabels = userDefinedOptions.rotateLabels !== undefined ? userDefinedOptions.rotateLabels : Env.ROTATE_LABELS;
      this.rootG = rootG;
      this.nodes = [];
      this.edges = [];
      this.listeningForTick = false;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.TOGGLE_MULTIPLICITY_REQUESTED, function () {
        _this.showMultiplicity = !_this.showMultiplicity;

        _this.updateMultiplicityCounters(_this.edges);
      });
      this.ee.on(EVENTS.DATA_PROCESSOR_FINISHED, function (nodes, edges) {
        _this.nodes = nodes;
        _this.edges = edges; //The order of these matters, don't rearrange

        _this.updateMarkers(edges);

        _this.updateEdges(edges);

        _this.updateLabels(edges);

        _this.updateMultiplicityCounters(edges);

        _this.updateNodes(nodes);

        _this.attachEntityClickListeners();

        _this.ee.trigger(EVENTS.DOM_PROCESSOR_FINISHED, nodes, edges);
      });
      this.ee.on(EVENTS.ENGINE_TICK, function () {
        if (_this.listeningForTick) {
          _this.tick();
        }
      });
      this.ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
        _this.listeningForTick = true;
      });
    }
    /**
     * Updates all markers (arrows for edges)
     * @param {object[]} edges - All edges
     */


    _createClass(DOMProcessor, [{
      key: "updateMarkers",
      value: function updateMarkers(edges) {
        var _this2 = this;

        var defs = this.rootG.select("defs");
        defs.selectAll("marker").remove();
        edges.forEach(function (l) {
          _this2.drawMarker(defs, l, false);

          if (l.nameFrom) {
            _this2.drawMarker(defs, l, true);
          }
        });
      }
      /**
       * Updates all edges in the DOM, including enter and exit operations.
       * @param {object[]} edges - edges to be present in the DOM
       */

    }, {
      key: "updateEdges",
      value: function updateEdges(edges) {
        var _this3 = this;

        var selector = this.rootG.select("#edge-container").selectAll(".edge").data(edges, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").attr("class", function (d) {
          return _this3.getMarkerId(d, true) + " " + _this3.getMarkerId(d, false);
        }).classed("edge", true).append("path").attr("class", function (d) {
          return "edge-path-".concat(d.type ? d.type : "default");
        }).attr("marker-end", function (l) {
          return "url(#" + _this3.getMarkerId(l, false) + ")";
        }).attr("marker-start", function (l) {
          if (l.nameFrom) {
            return "url(#" + _this3.getMarkerId(l, true) + ")";
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
        var _this4 = this;

        if (this.showMultiplicity) {
          var selector = this.rootG.select("#multiplicity-container").selectAll(".multiplicity").data(edges, function (d) {
            return d.id;
          });
          selector.exit().remove();
          selector.enter().append("g").classed("multiplicity", true).filter(function (l) {
            return l.multiplicityTo || l.multiplicityFrom;
          }).each(function (d, i, c) {
            if (d.multiplicityFrom) {
              _this4.drawMultiplicity(select(c[i]), "from");
            }

            if (d.multiplicityTo) {
              _this4.drawMultiplicity(select(c[i]), "to");
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
        var _this5 = this;

        var selector = this.rootG.select("#node-container").selectAll(".node").data(nodes, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").attr("class", "node").call(drag().on("start", function (d) {
          //Stop force on start in case it was just a simple click
          _this5.ee.trigger(EVENTS.NODE_DRAG_START, d);

          d.fx = d.x;
          d.fy = d.y;
        }).on("drag", function (d) {
          //Restart force on drag
          _this5.ee.trigger(EVENTS.NODE_DRAG_DRAGGED, d);

          d.fx = event.x;
          d.fy = event.y;
        }).on("end", function (d) {
          d.fx = null;
          d.fy = null;

          _this5.ee.trigger(EVENTS.NODE_DRAG_ENDED, d);
        })).each(function (d, i, c) {
          var element = select(c[i]);

          _this5.drawNode(element, d);
        }); //Draw counter badges for imploded edges

        nodes.forEach(function (node) {
          select("#badge-" + node.id + "-hidden-edge-counter").remove();

          if (node.hiddenEdgeCount) {
            var element = select("[id='".concat(node.id, "']")).select(function () {
              return this.parentNode;
            });

            _this5.drawNodeCollapsedEdgeCounter(element, node);
          }
        });
        this.nodeElements = this.rootG.select("#node-container").selectAll(".node");
      }
      /**
       * Updates all labels on edges.
       * @param {object[]} edges - List of all edges
       */

    }, {
      key: "updateLabels",
      value: function updateLabels(edges) {
        var _this6 = this;

        var selector = this.rootG.select("#label-container").selectAll(".label").data(edges, function (d) {
          return d.id;
        });
        selector.exit().remove();
        selector.enter().append("g").classed("label", true)
        /* Create labels, exclude edges without labels */
        .filter(function (d) {
          var needsLabel = d.nameTo || d.nameFrom;
          return needsLabel;
        }).each(function (d, i, c) {
          if (d.nameFrom) {
            _this6.drawLabel(select(c[i]), d, "from");
          }

          if (d.nameTo) {
            _this6.drawLabel(select(c[i]), d, "to");
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
      value: function drawMarker(defs, edge, inverse) {
        defs.append("marker").attr("id", this.getMarkerId(edge, inverse)).attr("viewBox", "0 -8 14 16").attr("refX", inverse ? 0 : 12).attr("refY", 0).attr("markerWidth", 12).attr("markerHeight", 12).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").attr("class", (edge.type ? edge.type : "normal") + "Marker").attr("class", "marker-" + (edge.type ? edge.type : "default")).append("path").attr("d", function () {
          return inverse ? "M12,-8L0,0L12,8Z" : "M0,-8L12,0L0,8Z";
        });
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
        var _this7 = this;

        var width = direction === "to" ? data.nameToWidth : data.nameFromWidth;
        label.append("rect").attr("class", function () {
          return "label-rect-".concat(data.type ? data.type : "default");
        }).attr("x", -width / 2).attr("y", -Env.LABEL_HEIGHT / 2).attr("width", width).attr("height", Env.LABEL_HEIGHT).on("mouseenter", function (edgeData) {
          _this7.labelMouseEnter(edgeData, direction);
        }).on("mouseleave", function (edgeData) {
          _this7.labelMouseLeave(edgeData, direction);
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

          return value.toString().truncate(width);
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
        var _this8 = this;

        var inverse = direction === "from";
        selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path").classed("hovered", true);
        selectAll("." + this.getMarkerId(edgeData, inverse)).selectAll("path, text").classed("hovered", true); //Timeout the sorting to save CPU cycles, and stop a sorting from taking place if the mouse just passed by

        setTimeout(function () {
          var marker = selectAll("marker#" + _this8.getMarkerId(edgeData, inverse)).select("path");

          if (marker.classed("hovered")) {
            _this8.handleHoverEvent(edgeData, "enter"); //Sort the labels which brings the hovered one to the foreground


            _this8.rootG.selectAll(".label").sort(function (a, b) {
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
        this.handleHoverEvent(edgeData, "leave");
        var inverse = direction === "from";
        selectAll("marker#" + this.getMarkerId(edgeData, inverse)).select("path").classed("hovered", false);
        selectAll("." + this.getMarkerId(edgeData, inverse)).selectAll("path, text").classed("hovered", false);
      }
      /**
       * Draws multiplicity notation
       * @param {object} edge - Edge object
       * @param {"to"|"from"} direction - Direction of the edge
       */

    }, {
      key: "drawMultiplicity",
      value: function drawMultiplicity(edge, direction) {
        var _this9 = this;

        var card = edge.append("g").attr("class", function (l) {
          return _this9.getMarkerId(l, direction === "to");
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

        switch (data.shape) {
          case "circle":
            element.append("circle").attr("r", function (d) {
              return d.radius;
            }).attr("class", "node-".concat(data.type ? data.type : "default")).attr("id", data.id);
            break;

          case "layeredCircle":
            element.append("circle").attr("r", function (d) {
              return d.radius;
            }).attr("style", "stroke-width:2;fill:#fff;stroke:#000;stroke-dasharray:0;pointer-events:none;").attr("id", data.id);
            element.append("circle").attr("r", function (d) {
              return d.radius - 4;
            }).attr("class", "node-".concat(data.type ? data.type : "default"));
            break;

          case "rectangle":
            element.append("rect").attr("x", function (d) {
              return -d.width / 2;
            }).attr("y", function (d) {
              return -d.height / 2;
            }).attr("width", function (d) {
              return d.width;
            }).attr("height", function (d) {
              return d.height;
            }).attr("class", "node-".concat(data.type ? data.type : "default")).attr("id", data.id);
            break;

          default:
            console.error("NO SHAPE FOUND FOR NODE");
        }

        element.on("mouseenter", function (d) {
          _this10.handleHoverEvent(d, "enter");
        }).on("mouseleave", function (d) {
          _this10.handleHoverEvent(d, "leave");
        }).on("mousemove", function (d) {
          _this10.ee.trigger(EVENTS.MOUSE_OVER_NODE, d);
        }).on("mouseout", function (d) {
          _this10.ee.trigger(EVENTS.MOUSE_LEFT_NODE, d);
        });
        this.drawTextBlock(element); //Draw the text inside the block

        if (!this.enableMultiLineNodeLabels) {
          this.drawTextline(element.select("text"), data.name.truncate(data.maxTextWidth), data.type ? data.type : "default", 0);
        } else {
          var text = data.name;
          var truncatedText = text.truncate(data.maxTextWidth);

          if (truncatedText.length < text.length && truncatedText.lastIndexOf(" ") > -1) {
            truncatedText = truncatedText.substring(0, truncatedText.lastIndexOf(" "));
            var otherStringTruncated = text.substring(truncatedText.length + 1).truncate(data.maxTextWidth);

            if (otherStringTruncated.length + truncatedText.length + 1 < text.length) {
              otherStringTruncated = otherStringTruncated.substring(0, otherStringTruncated.length - 3) + "...";
            }

            this.drawTextline(element.select("text"), truncatedText, data.type ? data.type : "default", -(Env.SPACE_BETWEEN_SPANS / 2));
            this.drawTextline(element.select("text"), otherStringTruncated, data.type ? data.type : "default", Env.SPACE_BETWEEN_SPANS / 2);
          } else {
            if (truncatedText.length < text.length) {
              truncatedText = truncatedText.substring(0, truncatedText.length - 3) + "...";
            }

            this.drawTextline(element.select("text"), truncatedText, data.type ? data.type : "default", 0);
          }
        }
      }
      /**
       * Draws a <text> block to a given element
       * @param {D3Selection} element - The element that the text block should be written to
       */

    }, {
      key: "drawTextBlock",
      value: function drawTextBlock(element) {
        element.append("text").attr("text-anchor", "middle");
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
       * Draws a badge in the top right corner of nodes with a number of a hidden edge count in it.
       * @param {D3Selecton} element - Node element selection by D3
       * @param {Object} data - Node data
       */

    }, {
      key: "drawNodeCollapsedEdgeCounter",
      value: function drawNodeCollapsedEdgeCounter(element, data) {
        var count = "".concat(data.hiddenEdgeCount);
        var textWidth = count.width();
        var fontSize = 14;
        var areaHeight = data.radius ? data.radius * 2 : data.height;
        var areaWidth = data.radius ? data.radius * 2 : data.width;
        var marginX = 12;
        var marginY = 12;
        var translateY = -(areaHeight / 2);
        var translateX = areaWidth / 2;
        var rectHeight = fontSize + marginY;
        var rectWidth = textWidth + marginX;
        element.append("g").attr("id", "badge-" + data.id + "-hidden-edge-counter").attr("style", "pointer-events:none;").attr("transform", "translate(".concat(translateX, " ").concat(translateY, ")")).append("rect").attr("width", rectWidth).attr("height", rectHeight).attr("y", -(rectHeight / 2)).attr("x", -(rectWidth / 2)).attr("class", "virrvarr-node-edge-counter-badge").select(function () {
          return this.parentNode;
        }).append("text").attr("class", "virrvarr-node-edge-counter-badge-text").append("tspan").attr("style", "font-size:".concat(fontSize, ";")).text("".concat(count));
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
        this.rootG.selectAll(".node").on("click", function (d) {
          event.stopPropagation();
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: d.id,
              data: d.data
            });
          }, Env.DOUBLE_CLICK_THRESHOLD);
        }).on("dblclick", function (d) {
          event.stopPropagation();
          clearTimeout(timeout);

          _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
            id: d.id,
            data: d.data
          });
        }).on("contextmenu", function (d) {
          event.preventDefault();
          event.stopPropagation();

          _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d);
        });
        this.rootG.selectAll(".label .from").on("click", function (d) {
          event.stopPropagation();
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: d.id,
              data: d.data,
              direction: "from"
            });
          }, Env.DOUBLE_CLICK_THRESHOLD);
        }).on("dblclick", function (d) {
          event.stopPropagation();

          _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "from"
          });
        }).on("contextmenu", function (d) {
          event.preventDefault();
          event.stopPropagation();

          _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d, "from");
        });
        this.rootG.selectAll(".label .to").on("click", function (d) {
          event.stopPropagation();
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            _this11.ee.trigger(EVENTS.CLICK_ENTITY, {
              id: d.id,
              data: d.data,
              direction: "to"
            });
          }, Env.DOUBLE_CLICK_THRESHOLD);
        }).on("dblclick", function (d) {
          event.stopPropagation();

          _this11.ee.trigger(EVENTS.DBL_CLICK_ENTITY, {
            id: d.id,
            data: d.data,
            direction: "from"
          });
        }).on("contextmenu", function (d) {
          event.preventDefault();
          event.stopPropagation();

          _this11.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, d, "to");
        });
      }
      /**
       * Handles what happens when an item is hovered
       * @param {object} hoveredData - Object that has been hovered
       * @param {"enter"|"exit"} eventType - What type of event it is.
       */

    }, {
      key: "handleHoverEvent",
      value: function handleHoverEvent(hoveredData, eventType) {
        this.ee.trigger(EVENTS.HOVER_ENTITY, {
          eventType: eventType,
          id: hoveredData.id,
          data: hoveredData.data
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
            selectAll(".node").filter(function (d) {
              return validNodes.find(function (node) {
                return node === d.id;
              }) === undefined;
            }).transition().duration(Env.FADE_TIME).ease(linear$1).style("opacity", opacity);
            selectAll(".edge").filter(function (d) {
              return filteredEdges.find(function (edge) {
                return edge.id === d.id;
              }) === undefined;
            }).transition().duration(Env.FADE_TIME).ease(linear$1).style("opacity", opacity);
            selectAll(".label").filter(function (d) {
              return filteredEdges.find(function (edge) {
                return edge.id === d.id;
              }) === undefined;
            }).transition().duration(Env.FADE_TIME).ease(linear$1).style("opacity", opacity);
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

        //Edges
        this.edgePath.attr("d", function (l) {
          if (l.source === l.target) {
            return MathUtil.calculateSelfEdgePath(l);
          }

          if (_this12.rotateLabels) {
            l.angle = MathUtil.calculateLabelAngle(l.source, l.target);
          }

          var pathStart = MathUtil.calculateIntersection(l.target, l.source, 1);
          var pathEnd = MathUtil.calculateIntersection(l.source, l.target, 1);
          var curvePoint = MathUtil.calculateCurvePoint(pathStart, pathEnd, l);
          l.curvePoint = curvePoint;
          return MathUtil.curveFunction([MathUtil.calculateIntersection(l.curvePoint, l.source, 1), curvePoint, MathUtil.calculateIntersection(l.curvePoint, l.target, 1)]);
        }); //Nodes

        this.nodeElements.attr("transform", function (node) {
          return "translate(" + node.x + "," + node.y + ")";
        }); //Multiplicities

        this.activeMultiplicities.attr("transform", function (l) {
          var group = select(this);
          var pos;

          if (group.classed("to")) {
            pos = MathUtil.calculateIntersection(l.curvePoint, l.source, Env.MULTIPLICITY_HDISTANCE);
          } else {
            pos = MathUtil.calculateIntersection(l.curvePoint, l.target, Env.MULTIPLICITY_HDISTANCE);
          }

          var n = MathUtil.calculateNormalVector(l.curvePoint, l.source, Env.MULTIPLICITY_VDISTANCE);

          if (l.source.index < l.target.index) {
            n.x = -n.x;
            n.y = -n.y;
          }

          return "translate(" + (pos.x + n.x) + "," + (pos.y + n.y) + ")";
        }); //Labels

        this.labels.attr("transform", function (l) {
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
   * Writes user defined styles as CSS classes to the DOM dynamically.
   * @param {object} style - User provided styles parameters
   * @param {string} id - ID of the UI-class of this Virrvarr instance
   */

  var initializeGraphStyles = function initializeGraphStyles(style, id) {
    var cssString = "";
    cssString = "\n                /* Text */\n                .virrvarr .multiplicity {\n                    font-size: ".concat(Env.DEFAULT_MULTIPLICITY_FONT_SIZE, ";\n                }     \n\n                /* Tooltip */\n                #virrvarr-tooltip {\n                  position: absolute;\n                  display: none;\n                  min-width: ").concat(Env.TOOLTIP_MIN_WIDTH, ";\n                  background: ").concat(Env.TOOLTIP_BACKGROUND, ";\n                  opacity: 0.8;\n                  color: ").concat(Env.TOOLTIP_COLOR, ";\n                  padding: 10px;\n                  text-align: center;\n                  max-width: ").concat(Env.TOOLTIP_MAX_WIDTH, ";\n                  word-wrap: break-word;\n                  font-size: 14px;\n                  border-radius: ").concat(Env.TOOLTIP_BORDER_RADIUS, ";\n                }\n\n                /* Context Menu Styles */\n                /* This is a rule for all paths unless specified otherwise */\n                .virrvarr path {\n                  stroke: #000;\n                  stroke-width: 2px;\n                }\n                \n                .virrvarr-context-menu {\n                  box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);\n                  position: relative;\n                  display: block;\n                  background: #FFFFFF;\n                }\n                \n                .virrvarr-context-menu-options {\n                  min-width: 150px;\n                  list-style: none;\n                  padding: 0px;\n                  margin-top: 10px;\n                  margin-bottom: 10px;\n                }\n                \n                .virrvarr-context-menu-option {\n                  font-size: 14px;\n                  padding: 7px 20px 7px 20px;\n                  cursor: pointer;\n                }\n                \n                .virrvarr-context-menu-divider {\n                  width: 90%;\n                  height: 1px;\n                  margin-right: 5%;\n                  margin-left: 5%;\n                  margin-top: 8px;\n                  margin-bottom: 8px;\n                  background: #d5d5d5;\n                }\n                \n                .virrvarr-context-menu-option:hover {\n                  background: rgba(0, 0, 0, 0.2);\n                }\n                \n                .virrvarr-node-edge-counter-badge {\n                  fill: coral;\n                  rx: 4px;\n                  ry: 4px;\n                }\n                \n                .virrvarr-node-edge-counter-badge-text {\n                  dominant-baseline: central;\n                  text-anchor: middle;\n                  fill: white;\n                }\n                \n                /* Search Highlighting */\n                .virrvarr .highlighted-node {\n                  stroke-width: ").concat(Env.HIGHLIGHTING_BORDER_WIDTH, ";\n                  stroke: ").concat(Env.HIGHLIGHTING_BORDER_COLOR, ";\n                  fill: ").concat(Env.HIGHLIGHTING_COLOR, ";\n                  opacity: 0.3;\n                  pointer-events: none;\n                }\n\n                /* Default edge style */\n                .edge-path-default{\n                    fill: none;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, " !important;\n                    stroke-dasharray: ").concat(Env.DEFAULT_EDGE_DASHARRAY, " !important;\n                    stroke: ").concat(Env.DEFAULT_EDGE_COLOR, " !important;\n                }\n                .edge-path-default.hovered{\n                    stroke: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                }\n                .edge-path-default.focused{\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n                \n                .label-rect-default{\n                    cursor: pointer;\n                    fill: ").concat(Env.DEFAULT_LABEL_BACKGROUND_COLOR, ";\n                    rx: ").concat(Env.DEFAULT_LABEL_BORDER_RADIUS_X, ";\n                    ry: ").concat(Env.DEFAULT_LABEL_BORDER_RADIUS_Y, ";\n                    stroke: ").concat(Env.DEFAULT_LABEL_BORDER_COLOR, " !important;\n                    stroke-width: ").concat(Env.DEFAULT_LABEL_BORDER_WIDTH, " !important; \n                }\n                .label-rect-default:hover{\n                    fill: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, ";\n                    cursor: pointer;\n                }\n                .label g .label-rect-default.focused {\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n\n                .label-text-default{\n                    fill: ").concat(Env.DEFAULT_LABEL_TEXT_COLOR, ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                }\n                .to:hover .label-text-default,\n                .from:hover .label-text-default{\n                    fill: ").concat(Env.DEFAULT_LABEL_TEXT_HOVER_COLOR, "\n                }\n                \n                .marker-default path{\n                    fill: ").concat(Env.DEFAULT_EDGE_COLOR, ";\n                }\n                .marker-default path.hovered{\n                    stroke: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    fill: ").concat(Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    cursor: pointer;\n                }\n                .marker-default path.focused{\n                    fill: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n\n                /* Default node values */\n                .node-default {\n                    cursor: pointer;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, ";\n                    stroke: ").concat(Env.DEFAULT_NODE_STROKE_COLOR, ";\n                    fill: ").concat(Env.DEFAULT_NODE_COLOR, ";\n                    stroke-dasharray: 0;\n                    rx: ").concat(Env.DEFAULT_NODE_BORDER_RADIUS_X, ";\n                    ry: ").concat(Env.DEFAULT_NODE_BORDER_RADIUS_Y, ";\n                }\n                .node-default:hover {\n                    fill: ").concat(Env.DEFAULT_NODE_HOVER_COLOR, ";\n                }\n                .node-text-default {\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                    fill: ").concat(Env.DEFAULT_NODE_TEXT_COLOR, ";\n                }\n                .node:hover .node-text-default {\n                    fill: ").concat(Env.DEFAULT_NODE_TEXT_HOVER_COLOR, ";\n                }\n                .virrvarr .node-default.focused {\n                    stroke: ").concat(Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                }\n                ");

    if (style && style.nodes) {
      style.nodes.forEach(function (nodeType) {
        cssString = "\n                ".concat(cssString, "\n                .node-").concat(nodeType.id, " {\n                    cursor: pointer;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, ";\n                    stroke: ").concat(nodeType.borderColor ? nodeType.borderColor : Env.DEFAULT_NODE_STROKE_COLOR, ";\n                    fill: ").concat(nodeType.backgroundColor ? nodeType.backgroundColor : Env.DEFAULT_NODE_COLOR, ";\n                    stroke-dasharray: ").concat(nodeType.dotted ? Env.DEFAULT_NODE_DOTTED_DASHARRAY : 0, ";\n                    rx: ").concat(nodeType.borderRadiusX ? nodeType.borderRadiusX : Env.DEFAULT_NODE_BORDER_RADIUS_X, ";\n                    ry: ").concat(nodeType.borderRadiusY ? nodeType.borderRadiusY : Env.DEFAULT_NODE_BORDER_RADIUS_Y, ";\n                    filter: ").concat(nodeType.shadow ? "drop-shadow(".concat(nodeType.shadow, ")") : Env.DEFAULT_NODE_SHADOW ? "drop-shadow(".concat(Env.DEFAULT_NODE_SHADOW, ")") : "none", ";\n                }\n                .node-").concat(nodeType.id, ":hover {\n                    fill: ").concat(nodeType.hoverColor ? nodeType.hoverColor : Env.DEFAULT_NODE_HOVER_COLOR, ";\n                }\n                .node-text-").concat(nodeType.id, " {\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    fill: ").concat(nodeType.textColor ? nodeType.textColor : Env.DEFAULT_NODE_TEXT_COLOR, ";\n                }\n                .node:hover .node-text-").concat(nodeType.id, " {\n                    fill: ").concat(nodeType.textHoverColor ? nodeType.textHoverColor : Env.DEFAULT_NODE_TEXT_HOVER_COLOR, ";\n                }\n                .virrvarr .node-").concat(nodeType.id, ".focused {\n                    stroke: ").concat(nodeType.focusedColor ? nodeType.focusedColor : Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke-width: ").concat(nodeType.focusedBorderWidth ? nodeType.focusedBorderWidth : Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                }\n                ");
      });
    }

    if (style && style.edges) {
      style.edges.forEach(function (edgeType) {
        cssString = "\n                ".concat(cssString, "\n                .edge-path-").concat(edgeType.id, "{\n                    fill: none !important;\n                    stroke-width: ").concat(Env.DEFAULT_STROKE_WIDTH, " !important;\n                    stroke-dasharray: ").concat(edgeType.dotted ? Env.DEFAULT_EDGE_DOTTED_DASHARRAY : Env.DEFAULT_EDGE_DASHARRAY, " !important;\n                    stroke: ").concat(edgeType.color ? edgeType.color : Env.DEFAULT_EDGE_COLOR, " !important;\n                }\n                .edge-path-").concat(edgeType.id, ".hovered{\n                    stroke: ").concat(edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                }\n                .edge-path-").concat(edgeType.id, ".focused{\n                    stroke: ").concat(edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR, " !important;\n                } \n                .label-rect-").concat(edgeType.id, "{\n                    cursor: pointer;\n                    fill: ").concat(edgeType.labelBackgroundColor ? edgeType.labelBackgroundColor : Env.DEFAULT_LABEL_BACKGROUND_COLOR, ";\n                    rx: ").concat(edgeType.borderRadiusX ? edgeType.borderRadiusX : Env.DEFAULT_LABEL_BORDER_RADIUS_X, ";\n                    ry: ").concat(edgeType.borderRadiusY ? edgeType.borderRadiusY : Env.DEFAULT_LABEL_BORDER_RADIUS_Y, ";\n                    stroke: ").concat(edgeType.labelBorderColor ? edgeType.labelBorderColor : Env.DEFAULT_LABEL_BORDER_COLOR, " !important;\n                    stroke-width: ").concat(edgeType.labelBorderWidth ? edgeType.labelBorderWidth : Env.DEFAULT_LABEL_BORDER_WIDTH, " !important; \n                }\n                .label-rect-").concat(edgeType.id, ":hover{\n                    fill: ").concat(edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, ";\n                    cursor: pointer;\n                }\n                .label g .label-rect-").concat(edgeType.id, ".focused {\n                    stroke-width: ").concat(Env.DEFAULT_NODE_FOCUSED_BORDER_WIDTH, " !important;\n                    stroke: ").concat(edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n                .label-text-").concat(edgeType.id, "{\n                    fill: ").concat(edgeType.labelTextColor ? edgeType.labelTextColor : Env.DEFAULT_LABEL_TEXT_COLOR, ";\n                    dominant-baseline: central;\n                    pointer-events: none;\n                    font-family: ").concat(Env.DEFAULT_FONT_FAMILY, ";\n                    font-size: ").concat(Env.DEFAULT_FONT_SIZE, ";\n                }\n                .to:hover .label-text-").concat(edgeType.id, ",\n                .from:hover .label-text-").concat(edgeType.id, "{\n                    fill: ").concat(edgeType.labelTextHoverColor ? edgeType.labelTextHoverColor : Env.DEFAULT_LABEL_TEXT_HOVER_COLOR, "\n                }\n                .marker-").concat(edgeType.id, " path.hovered{\n                    stroke: ").concat(edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    fill: ").concat(edgeType.hoverColor ? edgeType.hoverColor : Env.DEFAULT_LABEL_HOVER_BACKGROUND_COLOR, " !important;\n                    cursor: pointer;\n                }\n                .marker-").concat(edgeType.id, " path{\n                    fill: ").concat(edgeType.arrowColor ? edgeType.arrowColor : Env.DEFAULT_ARROW_COLOR, ";\n                }\n                .marker-").concat(edgeType.id, " path.focused{\n                    fill: ").concat(edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR, " !important;\n                    stroke: ").concat(edgeType.focusedColor ? edgeType.focusedColor : Env.DEFAULT_FOCUS_COLOR, " !important;\n                }\n                ");
      });
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.id = id;
    css.appendChild(document.createTextNode(cssString));
    document.getElementsByTagName("head")[0].appendChild(css);
  };

  var CSSUtil = {
    initializeGraphStyles: initializeGraphStyles
  };

  /**
   * The UI class manages all different UI addons.
   */

  var UI =
  /*#__PURE__*/
  function () {
    function UI(graphContainerElement, eventEmitter, styles, userDefinedOptions) {
      var _this = this;

      _classCallCheck(this, UI);

      this.graphContainerElement = graphContainerElement;
      this.style = styles;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.destroy();
      });
      this.zoomHandler = new ZoomHandler(this.graphContainerElement, this.ee, userDefinedOptions);
      this.contextMenu = new ContextMenu(this.graphContainerElement, this.ee, userDefinedOptions);
      this.highlighter = new Highlighter(this.ee);
      this.tooltip = new Tooltip(this.graphContainerElement, this.ee);
      this.stylesID = ("A" + Math.random()).replace(".", "");
      CSSUtil.initializeGraphStyles(this.style, this.stylesID);
      this.rootG = this.initializeDOM();
      this.grid = new Grid(this.graphContainerElement, this.ee, userDefinedOptions);
      this.DOMProcessor = new DOMProcessor(this.rootG, this.ee, userDefinedOptions);
    }

    _createClass(UI, [{
      key: "initializeDOM",
      value: function initializeDOM() {
        var _this2 = this;

        var rootG = select(this.graphContainerElement).insert("svg", "*").attr("class", "virrvarr").classed("svgGraph", true).attr("width", "100%").attr("height", "100%").on("click", function () {
          //Do not bubble the event
          event.stopPropagation();

          _this2.ee.trigger(EVENTS.CLICK_ENTITY, null);
        }).on("contextmenu", function () {
          event.preventDefault();
          event.stopPropagation();

          _this2.ee.trigger(EVENTS.RIGHT_CLICK_ENTITY, null);
        }).call(this.zoom).on("dblclick.zoom", null).append("g");
        rootG.append("defs");
        rootG.append("g").attr("id", "edge-container");
        rootG.append("g").attr("id", "label-container");
        rootG.append("g").attr("id", "multiplicity-container");
        rootG.append("g").attr("id", "node-container");
        return rootG;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.rootG.select("#edge-container").selectAll(".edge").remove();
        this.rootG.select("#multiplicity-container").selectAll(".multiplicity").remove();
        this.rootG.select("#node-container").selectAll(".node").remove();
        this.rootG.select("#label-container").selectAll(".label").remove();
        select(this.graphContainerElement).select("svg").remove();
        select("#".concat(this.stylesID)).remove();
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
   * The Engine class is responsible for running the physics simulation of the graph.
   */

  var Engine =
  /*#__PURE__*/
  function () {
    function Engine(forceCenterX, forceCenterY, eventEmitter) {
      var _this = this;

      _classCallCheck(this, Engine);

      this.ee = eventEmitter;
      this.ee.on(EVENTS.DOM_PROCESSOR_FINISHED, function (nodes, edges) {
        _this.updateSimulation(nodes, edges);

        _this.ee.trigger(EVENTS.ENGINE_UPDATE_FINISHED, nodes, edges);
      });
      this.ee.on(EVENTS.NODE_DRAG_START, function () {
        _this.stop();

        _this.target(0.5);
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
      this.ee.on(EVENTS.NODE_FIXATION_REQUESTED, function () {
        _this.alpha(1);

        _this.restart();
      });
      this.ee.on(EVENTS.ENGINE_LAYOUT_REQUESTED, function (nodes, edges, attribute, filterFunction, sortFunction) {
        _this.createLayout(nodes, edges, attribute, filterFunction, sortFunction);
      });
      this.ee.on(EVENTS.ENGINE_LAYOUT_RESET_REQUESTED, function (nodes, edges) {
        _this.resetLayout(nodes, edges);

        _this.alpha(1);

        _this.restart();
      });
      this.ee.on(EVENTS.GRAPH_WILL_UNMOUNT, function () {
        return _this.stop();
      });
      this.forceCenterX = forceCenterX;
      this.forceCenterY = forceCenterY;
      this.simulation = this.initializeSimulation();
    }
    /**
     * Start the simulation engine
     */


    _createClass(Engine, [{
      key: "initializeSimulation",
      value: function initializeSimulation() {
        var _this2 = this;

        return simulation().force("charge", manyBody().strength(Env.CHARGE)).force("center", center(this.forceCenterX, this.forceCenterY)).force("y", y$1(0).strength(Env.GRAVITY)).force("x", x$1(0).strength(Env.GRAVITY)).nodes([]).force("link", link().links([]).distance(function (l) {
          return _this2.getEdgeDistance(l);
        }).strength(Env.EDGE_STRENGTH)).on("tick", function () {
          _this2.ee.trigger(EVENTS.ENGINE_TICK);
        });
      }
      /**
       * Update the simulation with a new data set
       * @param {object[]} nodes
       * @param {edges[]} edges
       */

    }, {
      key: "updateSimulation",
      value: function updateSimulation(nodes, edges) {
        var _this3 = this;

        this.simulation.nodes(nodes);
        this.simulation.force("link", link().links(edges).distance(function (l) {
          return _this3.getEdgeDistance(l);
        }).strength(Env.EDGE_STRENGTH));
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
       * Creates a force group layout and positions nodes in the different groups depending on given input.
       * @param {object[]} nodes - All nodes to be affected
       * @param {object[]} edges - All edges to be affected
       * @param {string} attribute - Attribute to be used to determine the group of a node
       * @param {Function} filterFunction - Optional filter function that can be used instead of the attribute. Should return a string that determines the group of the provided node.
       * @param {Function} sortFunction - Optional sort function that will determine the order of the groups in the layout. Starting from left to right, top to bottom.
       */

    }, {
      key: "createLayout",
      value: function createLayout(nodes, edges, attribute, filterFunction, sortFunction) {
        var _this4 = this;

        if (sortFunction) {
          nodes = nodes.sort(function (a, b) {
            return sortFunction(a, b);
          });
        }

        var allGroups;

        if (filterFunction) {
          allGroups = nodes.map(function (node) {
            return filterFunction(node.data);
          });
        } else {
          allGroups = nodes.map(function (node) {
            return node[attribute];
          });
        }

        var xGroups = _toConsumableArray(new Set(allGroups));

        var numberOfRowsAndColumns = Math.ceil(Math.sqrt(xGroups.length));
        var currentRow = 0;
        var currentColumn = 0;
        var matrix = xGroups.map(function () {
          if (currentColumn === numberOfRowsAndColumns) {
            currentColumn = 0;
            currentRow += 1;
          }

          currentColumn += 1;
          return [currentRow, currentColumn - 1];
        });
        var columnScale = point$1().domain(_toConsumableArray(Array(numberOfRowsAndColumns).keys())).range([30, 2000]);
        var rowScale = point$1().domain(_toConsumableArray(Array(numberOfRowsAndColumns).keys())).range([30, 2000]);
        this.simulation.force("x", x$1(function (d) {
          var value;

          if (filterFunction) {
            value = filterFunction(d.data);
          } else {
            value = d[attribute];
          }

          return columnScale(matrix[xGroups.indexOf(value)][1]);
        })).force("y", y$1(function (d) {
          var value;

          if (filterFunction) {
            value = filterFunction(d.data);
          } else {
            value = d[attribute];
          }

          return rowScale(matrix[xGroups.indexOf(value)][0]);
        })).force("link", link().links(edges).distance(function (l) {
          return _this4.getEdgeDistance(l);
        }).strength(0)).force("charge", manyBody().strength(-800)).alpha(1).restart();
      }
      /**
       * Resets the force layout to its default mode and removes any existing groups.
       * @param {object[]} nodes - Nodes affected
       * @param {object[]} edges - Edges affected
       */

    }, {
      key: "resetLayout",
      value: function resetLayout(nodes, edges) {
        var _this5 = this;

        this.simulation.force("y", y$1(0).strength(Env.GRAVITY)).force("x", x$1(0).strength(Env.GRAVITY)).force("link", link().links(edges).distance(function (l) {
          return _this5.getEdgeDistance(l);
        }).strength(Env.EDGE_STRENGTH)).force("charge", manyBody().strength(Env.CHARGE));
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
   * The entity processor has two purposes
   * It is used to prepare data on nodes and edges so that it does not have to be calculated on the fly.
   * It is also used to manipulate the data stored on the objects to achieve certain effects (such as fixating coordinates)
   */

  var EntityProcessor =
  /*#__PURE__*/
  function () {
    function EntityProcessor(eventEmitter, styles, userDefinedOptions) {
      var _this = this;

      _classCallCheck(this, EntityProcessor);

      this.style = styles;
      this.fixedEdgeLabelWidth = userDefinedOptions.enableFixedEdgeLabelWidth !== undefined ? userDefinedOptions.enableFixedEdgeLabelWidth : Env.FIXED_EDGE_LABEL_WIDTH;
      this.edgeLabelWidth = userDefinedOptions.edgeLabelWidth ? userDefinedOptions.edgeLabelWidth : Env.LABEL_WIDTH;
      this.maxEdgeLabelWidth = userDefinedOptions.maxEdgeLabelWidth ? userDefinedOptions.maxEdgeLabelWidth : Env.LABEL_WIDTH * 2;
      this.ee = eventEmitter;
      this.ee.on(EVENTS.NODE_FIXATION_REQUESTED, function (node, x, y) {
        _this.repositionNode(node, x, y);
      });
      this.ee.on(EVENTS.DATASTORE_UPDATED, function (nodes, edges) {
        _this.updateEdgeedNodeIDs(edges, nodes);

        _this.updateEdgeDistances(edges);

        _this.updateEdgeLabelWidths(edges);

        _this.updateEdgeCounters(edges);

        _this.updateNodeParameters(nodes);

        _this.ee.trigger(EVENTS.DATA_PROCESSOR_FINISHED, nodes, edges);
      });
    }
    /**
     * Fixate a node to a given position in the graph.
     * @param {object} node - Node object to be fixated
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */


    _createClass(EntityProcessor, [{
      key: "repositionNode",
      value: function repositionNode(node, x, y) {
        node.fx = x;
        node.fy = y;
      }
      /**
       * Translates node IDs to index IDs on edge objects. This is essentially only to satisfy the D3 force layout.
       * @param {object[]} edges - Edges to be updated
       * @param {object[]} nodes - List of all nodes
       */

    }, {
      key: "updateEdgeedNodeIDs",
      value: function updateEdgeedNodeIDs(edges, nodes) {
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

          if (isNaN(edge.multiEdgeCount)) {
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
          } //Self edge counter


          if (isNaN(edge.selfEdgeCount)) {
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
                  node.maxTextWidth = style.maxWidth ? style.maxWidth : Env.DEFAULT_RECTANGLE_MAX_WIDTH;
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
    }]);

    return EntityProcessor;
  }();

  /**
   * The main graph class
   */

  var Virrvarr =
  /*#__PURE__*/
  function () {
    /**
     * Main constructor
     * @param {HTMLElement} graphContainerElement - Element that the graph should mount in
     * @param {object} inputData - Data that the graph should display
     * @param {object} options - Optional configuration for the graph
     * @param {boolean} options.enableGrid - Should the grid background pattern be enabled?
     * @param {boolean} options.enableFadeOnHover - Should nodes and edges that are not directly connected to a hovered node be faded out when said node is hovered?
     * @param {boolean} options.enableZoomButtons - Should zoom buttons be enabled?
     * @param {boolean} options.enableContextMenu - Should the conext menu be enabled?
     * @param {Function} options.entityClickedListener - Click listener for entities.
     * @param {Function} options.entityDoubleClickedListener - Double click listener for entities.
     * @param {Function} options.entityHoveredListener - Hover listener for entities.
     * @param {boolean} options.enableFixedEdgeLabelWidth - Should edge label width be fixed? Note that you need to provide the edgeLabelWidth option together with this option.
     * @param {number} options.edgeLabelWidth - Default edge label width.
     * @param {number} options.maxEdgeLabelWidth - Maximum edge label width.
     * @param {object} options.customContextMenu - Custom context menu.
     * @param {boolean} options.enableMultiLineNodeLabels - Allow node names to take up two lines.
     * @param {rotateLabels} options.customContextMenu - Make edge labels perpendicular to the edge.
     *
     */
    function Virrvarr(graphContainerElement, inputData, options) {
      var _this = this;

      _classCallCheck(this, Virrvarr);

      /* Init user input */
      this._options = Object.assign.apply(Object, [{}].concat(options));
      this._style = inputData.style ? JSON.parse(JSON.stringify(inputData.style)) : {};
      /* Init EventEmitter */

      this._ee = new EventEmitter(); //If the user specified listeners in options then add them

      this._options.entityClickedListener && this._ee.on(EVENTS.CLICK_ENTITY, this._options.entityClickedListener);
      this._options.entityDoubleClickedListener && this._ee.on(EVENTS.DBL_CLICK_ENTITY, this._options.entityDoubleClickedListener);
      this._options.entityHoveredListener && this._ee.on(EVENTS.HOVER_ENTITY, this._options.entityHoveredListener);
      /* Init UI */

      this._UI = new UI(graphContainerElement, this._ee, this._style, options);
      /* Init Datastore */

      this._entityProcessor = new EntityProcessor(this._ee, this._style, this._options);
      this._datastore = new Datastore(inputData.nodes, inputData.edges, this._ee, this._style, this._options);
      /* Init Engine */

      this._engine = new Engine(this._UI.width / 2, this._UI.height / 2, this._ee);
      /* Graph has mounted! */

      this._ee.on(EVENTS.GRAPH_HAS_MOUNTED, function () {
        _this._UI.zoomHandler.scaleTo(Env.INITIAL_SCALE);
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

            return node[attribute].toUpperCase().startsWith(value.toUpperCase());
          });

          this._ee.trigger(EVENTS.HIGHLIGHT_NODE_REQUESTED, nodesToHighlight);
        } else {
          throw new Error("No attribute, value or filterfunction provided");
        }
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
       * Sets a matrix layout for the simulation.
       * @param {string} attribute - Property name on the nodes to group by
       * @param {Function} filterFunction  - Optional filter function that can be used instead of attribute. Should return a string that represents the group that the node belongs to.
       * @param {Function} sortFunction  - Optional sort function that will be applied to nodes before the layout is created. Use this to ensure correct positioning of groups on the screen
       * @return {void}
       */

    }, {
      key: "setMatrixLayout",
      value: function setMatrixLayout(attribute, filterFunction, sortFunction) {
        this._ee.trigger(EVENTS.ENGINE_LAYOUT_REQUESTED, this._datastore.nodes, this._datastore.edges, attribute, filterFunction, sortFunction);
      }
      /**
       * Resets the layout to the default mode.
       * @return {void}
       */

    }, {
      key: "resetLayout",
      value: function resetLayout() {
        this._ee.trigger(EVENTS.ENGINE_LAYOUT_RESET_REQUESTED, this._datastore.nodes, this._datastore.edges);
      }
      /**
       * Fixates a node to the center of the graph.
       * @param {string} nodeID - ID of the node to center
       * @return {void}
       */

    }, {
      key: "centerNode",
      value: function centerNode(nodeID) {
        var node = this._datastore.nodes.find(function (potentialNode) {
          return potentialNode.id === nodeID;
        });

        if (node) {
          var width = this._UI.rootG.node().getBBox().width / 4;
          var height = this._UI.rootG.node().getBBox().height / 4;

          this._ee.trigger(EVENTS.NODE_FIXATION_REQUESTED, node, width, height);
        }
      }
      /**
       * Implodes/explodes all nodes one step out from the provided node.
       * @param {string} nodeID - ID of the node
       * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
       * @return {void}
       */

    }, {
      key: "implodeOrExplodeNode",
      value: function implodeOrExplodeNode(nodeID, isImplode) {
        this._ee.trigger(EVENTS.IMPLODE_EXPLODE_REQUESTED, nodeID, isImplode);
      }
      /**
       * Implodes/explodes all leaf nodes one step out from the provided node. I.e. nodes that have no further connections.
       * @param {string} nodeID - ID of the node
       * @param {boolean} isImplode - If true this is an implode operation, if false this is an explode operation
       * @return {void}
       */

    }, {
      key: "implodeOrExplodeNodeLeafs",
      value: function implodeOrExplodeNodeLeafs(nodeID, isImplode) {
        this._ee.trigger(EVENTS.IMPLODE_EXPLODE_LEAFS_REQUESTED, nodeID, isImplode);
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
       * Updates the data in the graph. This is commonly used for reflecting changes in the outer application
       * @param {object} newDataset - New data set
       * @return {void}
       */

    }, {
      key: "updateDataset",
      value: function updateDataset(newDataset) {
        this._ee.trigger(EVENTS.DATA_UPDATE_REQUESTED, newDataset.nodes, newDataset.edges);
      }
      /**
       * Exports the graph dataset into a JSON file that can be loaded into the graph at a later time
       * @param {boolean} includeOnlyLiveData - Should only live data be included in the export, or the entire dataset?
       */

    }, {
      key: "saveGraphAsJSON",
      value: function saveGraphAsJSON(includeOnlyLiveData) {
        if (!this._datastore.allNodes && !this._datastore.allEdges) {
          return;
        }

        var filename = "virrvarr.json";
        var data = {
          style: this._style,
          nodes: includeOnlyLiveData ? this._datastore.liveNodes : this._datastore.allNodes,
          edges: includeOnlyLiveData ? this._datastore.liveEdges : this._datastore.allEdges
        };
        var blob = new Blob([JSON.stringify(data, null, null)], {
          type: "text/json"
        });
        var aElement = document.createElement("a");
        aElement.download = filename;
        aElement.href = window.URL.createObjectURL(blob);
        aElement.dataset.downloadurl = ["text/json", aElement.download, aElement.href].join(":");
        aElement.click();
      }
      /**
       * Completely dismount and remove the graph
       * @return {void}
       */

    }, {
      key: "destroyGraph",
      value: function destroyGraph() {
        var _this2 = this;

        //All unmount listeners must be synchronous!!
        this._ee.trigger(EVENTS.GRAPH_WILL_UNMOUNT);

        Object.keys(this).forEach(function (key) {
          delete _this2[key];
        });
      }
    }]);

    return Virrvarr;
  }();

  return Virrvarr;

})));
