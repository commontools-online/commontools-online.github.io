(()=>{"use strict";function t(t){return Array.isArray?Array.isArray(t):"[object Array]"===c(t)}function e(t){return"string"==typeof t}function n(t){return"number"==typeof t}function s(t){return"object"==typeof t}function i(t){return null!=t}function r(t){return!t.trim().length}function c(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const o=Object.prototype.hasOwnProperty;class h{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let n=a(t);e+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function a(n){let s=null,i=null,r=null,c=1,h=null;if(e(n)||t(n))r=n,s=l(n),i=u(n);else{if(!o.call(n,"name"))throw new Error("Missing name property in key");const t=n.name;if(r=t,o.call(n,"weight")&&(c=n.weight,c<=0))throw new Error((t=>`Property 'weight' in key '${t}' must be a positive integer`)(t));s=l(t),i=u(t),h=n.getFn}return{path:s,id:i,weight:c,src:r,getFn:h}}function l(e){return t(e)?e:e.split(".")}function u(e){return t(e)?e.join("."):e}var d={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(r,o){let h=[],a=!1;const l=(r,o,u)=>{if(i(r))if(o[u]){const d=r[o[u]];if(!i(d))return;if(u===o.length-1&&(e(d)||n(d)||function(t){return!0===t||!1===t||function(t){return s(t)&&null!==t}(t)&&"[object Boolean]"==c(t)}(d)))h.push(function(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}(d));else if(t(d)){a=!0;for(let t=0,e=d.length;t<e;t+=1)l(d[t],o,u+1)}else o.length&&l(d,o,u+1)}else h.push(r)};return l(r,e(o)?o.split("."):o,0),a?h:h[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const g=/[^ ]+/g;class f{constructor({getFn:t=d.getFn,fieldNormWeight:e=d.fieldNormWeight}={}){this.norm=function(t=1,e=3){const n=new Map,s=Math.pow(10,e);return{get(e){const i=e.match(g).length;if(n.has(i))return n.get(i);const r=1/Math.pow(i,.5*t),c=parseFloat(Math.round(r*s)/s);return n.set(i,c),c},clear(){n.clear()}}}(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,e(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const n=this.size();e(t)?this._addString(t,n):this._addObject(t,n)}removeAt(t){this.records.splice(t,1);for(let e=t,n=this.size();e<n;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!i(t)||r(t))return;let n={v:t,i:e,n:this.norm.get(t)};this.records.push(n)}_addObject(n,s){let c={i:s,$:{}};this.keys.forEach(((s,o)=>{let h=s.getFn?s.getFn(n):this.getFn(n,s.path);if(i(h))if(t(h)){let n=[];const s=[{nestedArrIndex:-1,value:h}];for(;s.length;){const{nestedArrIndex:c,value:o}=s.pop();if(i(o))if(e(o)&&!r(o)){let t={v:o,i:c,n:this.norm.get(o)};n.push(t)}else t(o)&&o.forEach(((t,e)=>{s.push({nestedArrIndex:e,value:t})}))}c.$[o]=n}else if(e(h)&&!r(h)){let t={v:h,n:this.norm.get(h)};c.$[o]=t}})),this.records.push(c)}toJSON(){return{keys:this.keys,records:this.records}}}function p(t,e,{getFn:n=d.getFn,fieldNormWeight:s=d.fieldNormWeight}={}){const i=new f({getFn:n,fieldNormWeight:s});return i.setKeys(t.map(a)),i.setSources(e),i.create(),i}function m(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:i=d.distance,ignoreLocation:r=d.ignoreLocation}={}){const c=e/t.length;if(r)return c;const o=Math.abs(s-n);return i?c+o/i:o?1:c}const M=32;function y(t){let e={};for(let n=0,s=t.length;n<s;n+=1){const i=t.charAt(n);e[i]=(e[i]||0)|1<<s-n-1}return e}class x{constructor(t,{location:e=d.location,threshold:n=d.threshold,distance:s=d.distance,includeMatches:i=d.includeMatches,findAllMatches:r=d.findAllMatches,minMatchCharLength:c=d.minMatchCharLength,isCaseSensitive:o=d.isCaseSensitive,ignoreLocation:h=d.ignoreLocation}={}){if(this.options={location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:h},this.pattern=o?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const a=(t,e)=>{this.chunks.push({pattern:t,alphabet:y(t),startIndex:e})},l=this.pattern.length;if(l>M){let t=0;const e=l%M,n=l-e;for(;t<n;)a(this.pattern.substr(t,M),t),t+=M;if(e){const t=l-M;a(this.pattern.substr(t),t)}}else a(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.indices=[[0,t.length-1]]),e}const{location:s,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:o,ignoreLocation:h}=this.options;let a=[],l=0,u=!1;this.chunks.forEach((({pattern:e,alphabet:g,startIndex:f})=>{const{isMatch:p,score:y,indices:x}=function(t,e,n,{location:s=d.location,distance:i=d.distance,threshold:r=d.threshold,findAllMatches:c=d.findAllMatches,minMatchCharLength:o=d.minMatchCharLength,includeMatches:h=d.includeMatches,ignoreLocation:a=d.ignoreLocation}={}){if(e.length>M)throw new Error("Pattern length exceeds max of 32.");const l=e.length,u=t.length,g=Math.max(0,Math.min(s,u));let f=r,p=g;const y=o>1||h,x=y?Array(u):[];let L;for(;(L=t.indexOf(e,p))>-1;){let t=m(e,{currentLocation:L,expectedLocation:g,distance:i,ignoreLocation:a});if(f=Math.min(t,f),p=L+l,y){let t=0;for(;t<l;)x[L+t]=1,t+=1}}p=-1;let v=[],k=1,_=l+u;const S=1<<l-1;for(let s=0;s<l;s+=1){let r=0,o=_;for(;r<o;)m(e,{errors:s,currentLocation:g+o,expectedLocation:g,distance:i,ignoreLocation:a})<=f?r=o:_=o,o=Math.floor((_-r)/2+r);_=o;let h=Math.max(1,g-o+1),d=c?u:Math.min(g+o,u)+l,M=Array(d+2);M[d+1]=(1<<s)-1;for(let r=d;r>=h;r-=1){let c=r-1,o=n[t.charAt(c)];if(y&&(x[c]=+!!o),M[r]=(M[r+1]<<1|1)&o,s&&(M[r]|=(v[r+1]|v[r])<<1|1|v[r+1]),M[r]&S&&(k=m(e,{errors:s,currentLocation:c,expectedLocation:g,distance:i,ignoreLocation:a}),k<=f)){if(f=k,p=c,p<=g)break;h=Math.max(1,2*g-p)}}if(m(e,{errors:s+1,currentLocation:g,expectedLocation:g,distance:i,ignoreLocation:a})>f)break;v=M}const w={isMatch:p>=0,score:Math.max(.001,k)};if(y){const t=function(t=[],e=d.minMatchCharLength){let n=[],s=-1,i=-1,r=0;for(let c=t.length;r<c;r+=1){let c=t[r];c&&-1===s?s=r:c||-1===s||(i=r-1,i-s+1>=e&&n.push([s,i]),s=-1)}return t[r-1]&&r-s>=e&&n.push([s,r-1]),n}(x,o);t.length?h&&(w.indices=t):w.isMatch=!1}return w}(t,e,g,{location:s+f,distance:i,threshold:r,findAllMatches:c,minMatchCharLength:o,includeMatches:n,ignoreLocation:h});p&&(u=!0),l+=y,p&&x&&(a=[...a,...x])}));let g={isMatch:u,score:u?l/this.chunks.length:1};return u&&n&&(g.indices=a),g}}class L{constructor(t){this.pattern=t}static isMultiMatch(t){return v(t,this.multiRegex)}static isSingleMatch(t){return v(t,this.singleRegex)}search(){}}function v(t,e){const n=t.match(e);return n?n[1]:null}class k extends L{constructor(t,{location:e=d.location,threshold:n=d.threshold,distance:s=d.distance,includeMatches:i=d.includeMatches,findAllMatches:r=d.findAllMatches,minMatchCharLength:c=d.minMatchCharLength,isCaseSensitive:o=d.isCaseSensitive,ignoreLocation:h=d.ignoreLocation}={}){super(t),this._bitapSearch=new x(t,{location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:r,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class _ extends L{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const s=[],i=this.pattern.length;for(;(e=t.indexOf(this.pattern,n))>-1;)n=e+i,s.push([e,n-1]);const r=!!s.length;return{isMatch:r,score:r?0:1,indices:s}}}const S=[class extends L{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},_,class extends L{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},k],w=S.length,C=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,I=new Set([k.type,_.type]);const $=[];function A(t,e){for(let n=0,s=$.length;n<s;n+=1){let s=$[n];if(s.condition(t,e))return new s(t,e)}return new x(t,e)}const E="$and",b=t=>!(!t.$and&&!t.$or),F=t=>({[E]:Object.keys(t).map((e=>({[e]:t[e]})))});function N(n,i,{auto:r=!0}={}){const c=n=>{let o=Object.keys(n);const h=(t=>!!t.$path)(n);if(!h&&o.length>1&&!b(n))return c(F(n));if((e=>!t(e)&&s(e)&&!b(e))(n)){const t=h?n.$path:o[0],s=h?n.$val:n[t];if(!e(s))throw new Error((t=>`Invalid value for key ${t}`)(t));const c={keyId:u(t),pattern:s};return r&&(c.searcher=A(s,i)),c}let a={children:[],operator:o[0]};return o.forEach((e=>{const s=n[e];t(s)&&s.forEach((t=>{a.children.push(c(t))}))})),a};return b(n)||(n=F(n)),c(n)}function R(t,e){const n=t.matches;e.matches=[],i(n)&&n.forEach((t=>{if(!i(t.indices)||!t.indices.length)return;const{indices:n,value:s}=t;let r={indices:n,value:s};t.key&&(r.key=t.key.src),t.idx>-1&&(r.refIndex=t.idx),e.matches.push(r)}))}function j(t,e){e.score=t.score}class O{constructor(t,e={},n){this.options={...d,...e},this.options.useExtendedSearch,this._keyStore=new h(this.options.keys),this.setCollection(t,n)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof f))throw new Error("Incorrect 'index' type");this._myIndex=e||p(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){i(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let n=0,s=this._docs.length;n<s;n+=1){const i=this._docs[n];t(i,n)&&(this.removeAt(n),n-=1,s-=1,e.push(i))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:s=-1}={}){const{includeMatches:i,includeScore:r,shouldSort:c,sortFn:o,ignoreFieldNorm:h}=this.options;let a=e(t)?e(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=d.ignoreFieldNorm}){t.forEach((t=>{let n=1;t.matches.forEach((({key:t,norm:s,score:i})=>{const r=t?t.weight:null;n*=Math.pow(0===i&&r?Number.EPSILON:i,(r||1)*(e?1:s))})),t.score=n}))}(a,{ignoreFieldNorm:h}),c&&a.sort(o),n(s)&&s>-1&&(a=a.slice(0,s)),function(t,e,{includeMatches:n=d.includeMatches,includeScore:s=d.includeScore}={}){const i=[];return n&&i.push(R),s&&i.push(j),t.map((t=>{const{idx:n}=t,s={item:e[n],refIndex:n};return i.length&&i.forEach((e=>{e(t,s)})),s}))}(a,this._docs,{includeMatches:i,includeScore:r})}_searchStringList(t){const e=A(t,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:t,i:n,n:r})=>{if(!i(t))return;const{isMatch:c,score:o,indices:h}=e.searchIn(t);c&&s.push({item:t,idx:n,matches:[{score:o,value:t,norm:r,indices:h}]})})),s}_searchLogical(t){const e=N(t,this.options),n=(t,e,s)=>{if(!t.children){const{keyId:n,searcher:i}=t,r=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(e,n),searcher:i});return r&&r.length?[{idx:s,item:e,matches:r}]:[]}const i=[];for(let r=0,c=t.children.length;r<c;r+=1){const c=t.children[r],o=n(c,e,s);if(o.length)i.push(...o);else if(t.operator===E)return[]}return i},s=this._myIndex.records,r={},c=[];return s.forEach((({$:t,i:s})=>{if(i(t)){let i=n(e,t,s);i.length&&(r[s]||(r[s]={idx:s,item:t,matches:[]},c.push(r[s])),i.forEach((({matches:t})=>{r[s].matches.push(...t)})))}})),c}_searchObjectList(t){const e=A(t,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:t,i:s})=>{if(!i(t))return;let c=[];n.forEach(((n,s)=>{c.push(...this._findMatches({key:n,value:t[s],searcher:e}))})),c.length&&r.push({idx:s,item:t,matches:c})})),r}_findMatches({key:e,value:n,searcher:s}){if(!i(n))return[];let r=[];if(t(n))n.forEach((({v:t,i:n,n:c})=>{if(!i(t))return;const{isMatch:o,score:h,indices:a}=s.searchIn(t);o&&r.push({score:h,key:e,value:t,idx:n,norm:c,indices:a})}));else{const{v:t,n:i}=n,{isMatch:c,score:o,indices:h}=s.searchIn(t);c&&r.push({score:o,key:e,value:t,norm:i,indices:h})}return r}}O.version="6.6.2",O.createIndex=p,O.parseIndex=function(t,{getFn:e=d.getFn,fieldNormWeight:n=d.fieldNormWeight}={}){const{keys:s,records:i}=t,r=new f({getFn:e,fieldNormWeight:n});return r.setKeys(s),r.setIndexRecords(i),r},O.config=d,O.parseQuery=N,function(...t){$.push(...t)}(class{constructor(t,{isCaseSensitive:e=d.isCaseSensitive,includeMatches:n=d.includeMatches,minMatchCharLength:s=d.minMatchCharLength,ignoreLocation:i=d.ignoreLocation,findAllMatches:r=d.findAllMatches,location:c=d.location,threshold:o=d.threshold,distance:h=d.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:s,findAllMatches:r,ignoreLocation:i,location:c,threshold:o,distance:h},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let n=t.trim().split(C).filter((t=>t&&!!t.trim())),s=[];for(let t=0,i=n.length;t<i;t+=1){const i=n[t];let r=!1,c=-1;for(;!r&&++c<w;){const t=S[c];let n=t.isMultiMatch(i);n&&(s.push(new t(n,e)),r=!0)}if(!r)for(c=-1;++c<w;){const t=S[c];let n=t.isSingleMatch(i);if(n){s.push(new t(n,e));break}}}return s}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;t=s?t:t.toLowerCase();let i=0,r=[],c=0;for(let s=0,o=e.length;s<o;s+=1){const o=e[s];r.length=0,i=0;for(let e=0,s=o.length;e<s;e+=1){const s=o[e],{isMatch:h,indices:a,score:l}=s.search(t);if(!h){c=0,i=0,r.length=0;break}if(i+=1,c+=l,n){const t=s.constructor.type;I.has(t)?r=[...r,...a]:r.push(a)}}if(i){let t={isMatch:!0,score:c/i};return n&&(t.indices=r),t}}return{isMatch:!1,score:1}}});var W,q={minMatchCharLength:3,keys:["title"]};W=function(){var t=document.querySelector("#cto-searchbar"),e=document.querySelector(".cto-js-results-wrapper"),n=document.querySelector(".cto-js-result-items");t.addEventListener("keyup",function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=null;return function(){for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];clearTimeout(n),n=setTimeout((function(){t.apply(void 0,i)}),e)}}((function(t){var s=t.target.value;e.classList.remove("d-none"),fetch("/api/tools.json").then((function(t){return t.json()})).then((function(t){var e=new O(t,q).search(s),i="";e.forEach((function(t){i+='<li class="py-8"><a href="'.concat(t.item.url,'" class="">').concat(t.item.title,"</a></li>")})),0===e.length&&(i='<li class="py-8">No results found</li>'),n.innerHTML=i}))}),300)),t.addEventListener("blur",(function(){e.classList.add("d-none")}))},"loading"!==document.readyState?W():document.addEventListener("DOMContentLoaded",W)})();