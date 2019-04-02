!function(e){var t={};function i(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/js/",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);i(1),i(2),i(3),i(4),i(5),i(6);window.OCA.SystemTags=OCA.SystemTags},function(e,i){OCA.SystemTags||(OCA.SystemTags={}),OCA.SystemTags.App={initFileList:function(e){return this._fileList?this._fileList:(this._fileList=new OCA.SystemTags.FileList(e,{id:"systemtags",fileActions:this._createFileActions(),config:OCA.Files.App.getFilesConfig(),shown:!0}),this._fileList.appName=t("systemtags","Tags"),this._fileList)},removeFileList:function(){this._fileList&&this._fileList.$fileList.empty()},_createFileActions:function(){var e=new OCA.Files.FileActions;return e.registerDefaultActions(),e.merge(OCA.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),OCA.Files.fileActions.on("setDefault.app-systemtags",this._onActionsUpdated),OCA.Files.fileActions.on("registerAction.app-systemtags",this._onActionsUpdated),this._globalActionsInitialized=!0),e.register("dir","Open",OC.PERMISSION_READ,"",function(e,t){OCA.Files.App.setActiveView("files",{silent:!0}),OCA.Files.App.fileList.changeDirectory(OC.joinPaths(t.$file.attr("data-path"),e),!0,!0)}),e.setDefault("dir","Open"),e},_onActionsUpdated:function(e){this._fileList&&(e.action?this._fileList.fileActions.registerAction(e.action):e.defaultAction&&this._fileList.fileActions.setDefault(e.defaultAction.mime,e.defaultAction.name))},destroy:function(){OCA.Files.fileActions.off("setDefault.app-systemtags",this._onActionsUpdated),OCA.Files.fileActions.off("registerAction.app-systemtags",this._onActionsUpdated),this.removeFileList(),this._fileList=null,delete this._globalActionsInitialized}},$(document).ready(function(){$("#app-content-systemtagsfilter").on("show",function(e){OCA.SystemTags.App.initFileList($(e.target))}),$("#app-content-systemtagsfilter").on("hide",function(){OCA.SystemTags.App.removeFileList()})})},function(e,i){var n;(n=function(e,t){this.initialize(e,t)}).prototype=_.extend({},OCA.Files.FileList.prototype,{id:"systemtagsfilter",appName:t("systemtags","Tagged files"),_systemTagIds:[],_lastUsedTags:[],_clientSideSort:!0,_allowSelection:!1,_filterField:null,initialize:function(e,t){if(OCA.Files.FileList.prototype.initialize.apply(this,arguments),!this.initialized){t&&t.systemTagIds&&(this._systemTagIds=t.systemTagIds),OC.Plugins.attach("OCA.SystemTags.FileList",this);var i=this.$el.find("#controls").empty();_.defer(_.bind(this._getLastUsedTags,this)),this._initFilterField(i)}},destroy:function(){this.$filterField.remove(),OCA.Files.FileList.prototype.destroy.apply(this,arguments)},_getLastUsedTags:function(){var e=this;$.ajax({type:"GET",url:OC.generateUrl("/apps/systemtags/lastused"),success:function(t){e._lastUsedTags=t}})},_initFilterField:function(e){var i=this;return this.$filterField=$('<input type="hidden" name="tags"/>'),e.append(this.$filterField),this.$filterField.select2({placeholder:t("systemtags","Select tags to filter by"),allowClear:!1,multiple:!0,toggleSelect:!0,separator:",",query:_.bind(this._queryTagsAutocomplete,this),id:function(e){return e.id},initSelection:function(e,t){var i=$(e).val().trim();if(i){var n=i.split(","),s=[];OC.SystemTags.collection.fetch({success:function(){_.each(n,function(e){var t=OC.SystemTags.collection.get(e);_.isUndefined(t)||s.push(t.toJSON())}),t(s)}})}else t([])},formatResult:function(e){return OC.SystemTags.getDescriptiveTag(e)},formatSelection:function(e){return OC.SystemTags.getDescriptiveTag(e)[0].outerHTML},sortResults:function(e){return e.sort(function(e,t){var n=i._lastUsedTags.indexOf(e.id),s=i._lastUsedTags.indexOf(t.id);return n!==s?-1===s?-1:-1===n?1:n<s?-1:1:OC.Util.naturalSortCompare(e.name,t.name)}),e},escapeMarkup:function(e){return e},formatNoMatches:function(){return t("systemtags","No tags found")}}),this.$filterField.on("change",_.bind(this._onTagsChanged,this)),this.$filterField},_queryTagsAutocomplete:function(e){OC.SystemTags.collection.fetch({success:function(){var t=OC.SystemTags.collection.filterByName(e.term);e.callback({results:_.invoke(t,"toJSON")})}})},_onUrlChanged:function(e){if(e.dir){var t=_.filter(e.dir.split("/"),function(e){return""!==e.trim()});this.$filterField.select2("val",t||[]),this._systemTagIds=t,this.reload()}},_onTagsChanged:function(e){var t=$(e.target).val().trim();this._systemTagIds=""!==t?t.split(","):[],this.$el.trigger(jQuery.Event("changeDirectory",{dir:this._systemTagIds.join("/")})),this.reload()},updateEmptyContent:function(){"/"===this.getCurrentDirectory()?(this._systemTagIds.length?this.$el.find("#emptycontent").html('<div class="icon-systemtags"></div><h2>'+t("systemtags","No files found for the selected tags")+"</h2>"):this.$el.find("#emptycontent").html('<div class="icon-systemtags"></div><h2>'+t("systemtags","Please select tags to filter by")+"</h2>"),this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty)):OCA.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){if(this._setCurrentDir("/",!1),!this._systemTagIds.length)return this.updateEmptyContent(),this.setFiles([]),$.Deferred().resolve();this._selectedFiles={},this._selectionSummary.clear(),this._currentFileModel&&this._currentFileModel.off(),this._currentFileModel=null,this.$el.find(".select-all").prop("checked",!1),this.showMask(),this._reloadCall=this.filesClient.getFilteredFiles({systemTagIds:this._systemTagIds},{properties:this._getWebdavProperties()}),this._detailsView&&this._updateDetailsView(null);var e=this.reloadCallback.bind(this);return this._reloadCall.then(e,e)},reloadCallback:function(e,t){return t&&t.unshift({}),OCA.Files.FileList.prototype.reloadCallback.call(this,e,t)}}),OCA.SystemTags.FileList=n},function(e,t){OCA.SystemTags=_.extend({},OCA.SystemTags),OCA.SystemTags||(OCA.SystemTags={}),OCA.SystemTags.FilesPlugin={ignoreLists:["trashbin","files.public"],attach:function(e){if(!(this.ignoreLists.indexOf(e.id)>=0)){var t=new OCA.SystemTags.SystemTagsInfoView;e.registerDetailView(t),_.each(e.getRegisteredDetailViews(),function(e){if(e instanceof OCA.Files.MainFileInfoDetailView){var i=new OCA.SystemTags.SystemTagsInfoViewToggleView({systemTagsInfoView:t});return i.render(),i.listenTo(e,"pre-render",function(){i.$el.detach()}),void i.listenTo(e,"post-render",function(){e.$el.find(".file-details").append(i.$el)})}})}}},OC.Plugins.register("OCA.Files.FileList",OCA.SystemTags.FilesPlugin)},function(e,t){!function(e){function t(e){var t=e.toJSON();return OC.isUserAdmin()||t.canAssign||(t.locked=!0),t}var i=e.Files.DetailFileInfoView.extend({_rendered:!1,className:"systemTagsInfoView hidden",_inputView:null,initialize:function(e){var i=this;e=e||{},this._inputView=new OC.SystemTags.SystemTagsInputField({multiple:!0,allowActions:!0,allowCreate:!0,isAdmin:OC.isUserAdmin(),initSelection:function(e,n){n(i.selectedTagsCollection.map(t))}}),this.selectedTagsCollection=new OC.SystemTags.SystemTagsMappingCollection([],{objectType:"files"}),this._inputView.collection.on("change:name",this._onTagRenamedGlobally,this),this._inputView.collection.on("remove",this._onTagDeletedGlobally,this),this._inputView.on("select",this._onSelectTag,this),this._inputView.on("deselect",this._onDeselectTag,this)},_onSelectTag:function(e){this.selectedTagsCollection.create(e.toJSON())},_onDeselectTag:function(e){this.selectedTagsCollection.get(e).destroy()},_onTagRenamedGlobally:function(e){var t=this.selectedTagsCollection.get(e.id);t&&t.set(e.toJSON())},_onTagDeletedGlobally:function(e){this.selectedTagsCollection.remove(e)},setFileInfo:function(e){var i=this;this._rendered||this.render(),e&&(this.selectedTagsCollection.setObjectId(e.id),this.selectedTagsCollection.fetch({success:function(e){e.fetched=!0;var n=e.map(t);i._inputView.setData(n),0!==n.length?i.show():i.hide()}})),this.hide()},render:function(){this.$el.append(this._inputView.$el),this._inputView.render()},isVisible:function(){return!this.$el.hasClass("hidden")},show:function(){this.$el.removeClass("hidden")},hide:function(){this.$el.addClass("hidden")},openDropdown:function(){this.$el.find(".systemTagsInputField").select2("open")},remove:function(){this._inputView.remove()}});e.SystemTags.SystemTagsInfoView=i}(OCA)},function(e,i){
/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
!function(e){var i=OC.Backbone.View.extend({tagName:"span",className:"tag-label",events:{click:"click"},_systemTagsInfoView:null,template:function(e){return'<span class="icon icon-tag"/>'+t("systemtags","Tags")},initialize:function(e){if(e=e||{},this._systemTagsInfoView=e.systemTagsInfoView,!this._systemTagsInfoView)throw'Missing required parameter "systemTagsInfoView"'},click:function(){this._systemTagsInfoView.isVisible()?this._systemTagsInfoView.hide():(this._systemTagsInfoView.show(),this._systemTagsInfoView.openDropdown())},render:function(){return this.$el.html(this.template()),this}});e.SystemTags.SystemTagsInfoViewToggleView=i}(OCA)},function(e,t,i){var n=i(7);"string"==typeof n&&(n=[[e.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};i(9)(n,s);n.locals&&(e.exports=n.locals)},function(e,t,i){(e.exports=i(8)(!1)).push([e.i,"/*\n * Copyright (c) 2016\n *\n * This file is licensed under the Affero General Public License version 3\n * or later.\n *\n * See the COPYING-README file.\n *\n */\n#app-content-systemtagsfilter .select2-container {\n  width: 30%;\n  margin-left: 10px; }\n\n#app-sidebar .mainFileInfoView .tag-label {\n  cursor: pointer;\n  padding: 13px; }\n\n#app-sidebar .mainFileInfoView .icon-tag {\n  opacity: .5;\n  vertical-align: middle; }\n",""])},function(e,t,i){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var i=function(e,t){var i=e[1]||"",n=e[3];if(!n)return i;if(t&&"function"==typeof btoa){var s=(r=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),o=n.sources.map(function(e){return"/*# sourceURL="+n.sourceRoot+e+" */"});return[i].concat(o).concat([s]).join("\n")}var r;return[i].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+i+"}":i}).join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},s=0;s<this.length;s++){var o=this[s][0];null!=o&&(n[o]=!0)}for(s=0;s<e.length;s++){var r=e[s];null!=r[0]&&n[r[0]]||(i&&!r[2]?r[2]=i:i&&(r[2]="("+r[2]+") and ("+i+")"),t.push(r))}},t}},function(e,t,i){var n,s,o={},r=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===s&&(s=n.apply(this,arguments)),s}),a=function(e){var t={};return function(e,i){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,i);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),l=null,c=0,f=[],u=i(10);function d(e,t){for(var i=0;i<e.length;i++){var n=e[i],s=o[n.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](n.parts[r]);for(;r<n.parts.length;r++)s.parts.push(v(n.parts[r],t))}else{var a=[];for(r=0;r<n.parts.length;r++)a.push(v(n.parts[r],t));o[n.id]={id:n.id,refs:1,parts:a}}}}function p(e,t){for(var i=[],n={},s=0;s<e.length;s++){var o=e[s],r=t.base?o[0]+t.base:o[0],a={css:o[1],media:o[2],sourceMap:o[3]};n[r]?n[r].parts.push(a):i.push(n[r]={id:r,parts:[a]})}return i}function h(e,t){var i=a(e.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=f[f.length-1];if("top"===e.insertAt)n?n.nextSibling?i.insertBefore(t,n.nextSibling):i.appendChild(t):i.insertBefore(t,i.firstChild),f.push(t);else if("bottom"===e.insertAt)i.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var s=a(e.insertAt.before,i);i.insertBefore(t,s)}}function g(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=f.indexOf(e);t>=0&&f.splice(t,1)}function m(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var n=function(){0;return i.nc}();n&&(e.attrs.nonce=n)}return y(t,e.attrs),h(e,t),t}function y(e,t){Object.keys(t).forEach(function(i){e.setAttribute(i,t[i])})}function v(e,t){var i,n,s,o;if(t.transform&&e.css){if(!(o="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=o}if(t.singleton){var r=c++;i=l||(l=m(t)),n=C.bind(null,i,r,!1),s=C.bind(null,i,r,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",y(t,e.attrs),h(e,t),t}(t),n=function(e,t,i){var n=i.css,s=i.sourceMap,o=void 0===t.convertToAbsoluteUrls&&s;(t.convertToAbsoluteUrls||o)&&(n=u(n));s&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var r=new Blob([n],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(r),a&&URL.revokeObjectURL(a)}.bind(null,i,t),s=function(){g(i),i.href&&URL.revokeObjectURL(i.href)}):(i=m(t),n=function(e,t){var i=t.css,n=t.media;n&&e.setAttribute("media",n);if(e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}.bind(null,i),s=function(){g(i)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else s()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var i=p(e,t);return d(i,t),function(e){for(var n=[],s=0;s<i.length;s++){var r=i[s];(a=o[r.id]).refs--,n.push(a)}e&&d(p(e,t),t);for(s=0;s<n.length;s++){var a;if(0===(a=n[s]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete o[a.id]}}}};var T,_=(T=[],function(e,t){return T[e]=t,T.filter(Boolean).join("\n")});function C(e,t,i,n){var s=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=_(t,s);else{var o=document.createTextNode(s),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(o,r[t]):e.appendChild(o)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var i=t.protocol+"//"+t.host,n=i+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var s,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(s=0===o.indexOf("//")?o:0===o.indexOf("/")?i+o:n+o.replace(/^\.\//,""),"url("+JSON.stringify(s)+")")})}}]);
//# sourceMappingURL=systemtags.js.map