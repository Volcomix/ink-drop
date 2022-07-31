var gn=Object.defineProperty,An=Object.defineProperties;var En=Object.getOwnPropertyDescriptors;var Ht=Object.getOwnPropertySymbols;var Tn=Object.prototype.hasOwnProperty,Sn=Object.prototype.propertyIsEnumerable;var Xt=(t,e,r)=>e in t?gn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,tt=(t,e)=>{for(var r in e||(e={}))Tn.call(e,r)&&Xt(t,r,e[r]);if(Ht)for(var r of Ht(e))Sn.call(e,r)&&Xt(t,r,e[r]);return t},rt=(t,e)=>An(t,En(e));const Fn=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}};Fn();/* @license twgl.js 4.22.1 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */const Et=5120,Te=5121,Tt=5122,St=5123,Ft=5124,wt=5125,Rt=5126,wn=32819,Rn=32820,Cn=33635,Pn=5131,In=33640,Dn=35899,Ln=35902,Bn=36269,Nn=34042,dr={};{const t=dr;t[Et]=Int8Array,t[Te]=Uint8Array,t[Tt]=Int16Array,t[St]=Uint16Array,t[Ft]=Int32Array,t[wt]=Uint32Array,t[Rt]=Float32Array,t[wn]=Uint16Array,t[Rn]=Uint16Array,t[Cn]=Uint16Array,t[Pn]=Uint16Array,t[In]=Uint32Array,t[Dn]=Uint32Array,t[Ln]=Uint32Array,t[Bn]=Uint32Array,t[Nn]=Uint32Array}function Ct(t){if(t instanceof Int8Array)return Et;if(t instanceof Uint8Array||t instanceof Uint8ClampedArray)return Te;if(t instanceof Int16Array)return Tt;if(t instanceof Uint16Array)return St;if(t instanceof Int32Array)return Ft;if(t instanceof Uint32Array)return wt;if(t instanceof Float32Array)return Rt;throw new Error("unsupported typed array type")}function $n(t){if(t===Int8Array)return Et;if(t===Uint8Array||t===Uint8ClampedArray)return Te;if(t===Int16Array)return Tt;if(t===Uint16Array)return St;if(t===Int32Array)return Ft;if(t===Uint32Array)return wt;if(t===Float32Array)return Rt;throw new Error("unsupported typed array type")}function zn(t){const e=dr[t];if(!e)throw new Error("unknown gl type");return e}const $e=typeof SharedArrayBuffer!="undefined"?function(e){return e&&e.buffer&&(e.buffer instanceof ArrayBuffer||e.buffer instanceof SharedArrayBuffer)}:function(e){return e&&e.buffer&&e.buffer instanceof ArrayBuffer};function fr(...t){console.error(...t)}function Mn(...t){console.warn(...t)}function Un(t,e){return typeof WebGLBuffer!="undefined"&&e instanceof WebGLBuffer}function hr(t,e){return typeof WebGLRenderbuffer!="undefined"&&e instanceof WebGLRenderbuffer}function On(t,e){return typeof WebGLShader!="undefined"&&e instanceof WebGLShader}function Ve(t,e){return typeof WebGLTexture!="undefined"&&e instanceof WebGLTexture}function Gn(t,e){return typeof WebGLSampler!="undefined"&&e instanceof WebGLSampler}const mr=35044,le=34962,kn=34963,Vn=34660,Hn=5120,Xn=5121,Yn=5122,Wn=5123,Kn=5124,jn=5125,Jn=5126,pr={attribPrefix:""};function qn(t,e,r,n,i){t.bindBuffer(e,r),t.bufferData(e,n,i||mr)}function xr(t,e,r,n){if(Un(t,e))return e;r=r||le;const i=t.createBuffer();return qn(t,r,i,e,n),i}function _r(t){return t==="indices"}function Qn(t){return t instanceof Int8Array||t instanceof Uint8Array}function Zn(t){return t===Int8Array||t===Uint8Array}function ei(t){return t.length?t:t.data}const ti=/coord|texture/i,ri=/color|colour/i;function yr(t,e){let r;if(ti.test(t)?r=2:ri.test(t)?r=4:r=3,e%r>0)throw new Error(`Can not guess numComponents for attribute '${t}'. Tried ${r} but ${e} values is not evenly divisible by ${r}. You should specify it.`);return r}function ni(t,e){return t.numComponents||t.size||yr(e,ei(t).length)}function vr(t,e){if($e(t))return t;if($e(t.data))return t.data;Array.isArray(t)&&(t={data:t});let r=t.type;return r||(_r(e)?r=Uint16Array:r=Float32Array),new r(t.data)}function ii(t,e){const r={};return Object.keys(e).forEach(function(n){if(!_r(n)){const i=e[n],o=i.attrib||i.name||i.attribName||pr.attribPrefix+n;if(i.value){if(!Array.isArray(i.value)&&!$e(i.value))throw new Error("array.value is not array or typedarray");r[o]={value:i.value}}else{let s,l,a,c;if(i.buffer&&i.buffer instanceof WebGLBuffer)s=i.buffer,c=i.numComponents||i.size,l=i.type,a=i.normalize;else if(typeof i=="number"||typeof i.data=="number"){const x=i.data||i,m=i.type||Float32Array,p=x*m.BYTES_PER_ELEMENT;l=$n(m),a=i.normalize!==void 0?i.normalize:Zn(m),c=i.numComponents||i.size||yr(n,x),s=t.createBuffer(),t.bindBuffer(le,s),t.bufferData(le,p,i.drawType||mr)}else{const x=vr(i,n);s=xr(t,x,void 0,i.drawType),l=Ct(x),a=i.normalize!==void 0?i.normalize:Qn(x),c=ni(i,n)}r[o]={buffer:s,numComponents:c,type:l,normalize:a,stride:i.stride||0,offset:i.offset||0,divisor:i.divisor===void 0?void 0:i.divisor,drawType:i.drawType}}}}),t.bindBuffer(le,null),r}function oi(t,e){return e===Hn||e===Xn?1:e===Yn||e===Wn?2:e===Kn||e===jn||e===Jn?4:0}const nt=["position","positions","a_position"];function si(t,e){let r,n;for(n=0;n<nt.length&&(r=nt[n],!(r in e||(r=pr.attribPrefix+r,r in e)));++n);n===nt.length&&(r=Object.keys(e)[0]);const i=e[r];t.bindBuffer(le,i.buffer);const o=t.getBufferParameter(le,Vn);t.bindBuffer(le,null);const s=oi(t,i.type),l=o/s,a=i.numComponents||i.size,c=l/a;if(c%1!==0)throw new Error(`numComponents ${a} not correct for length ${length}`);return c}function Pt(t,e,r){const n=ii(t,e),i=Object.assign({},r||{});i.attribs=Object.assign({},r?r.attribs:{},n);const o=e.indices;if(o){const s=vr(o,"indices");i.indices=xr(t,s,kn),i.numElements=s.length,i.elementType=Ct(s)}else i.numElements||(i.numElements=si(t,i.attribs));return i}function Re(t){return!!t.texStorage2D}const Se=function(){const t={},e={};function r(n){const i=n.constructor.name;if(!t[i]){for(const o in n)if(typeof n[o]=="number"){const s=e[n[o]];e[n[o]]=s?`${s} | ${o}`:o}t[i]=!0}}return function(i,o){return r(i),e[o]||(typeof o=="number"?`0x${o.toString(16)}`:o)}}(),te={textureColor:new Uint8Array([128,192,255,255]),textureOptions:{},crossOrigin:void 0},xe=$e,br=function(){let t;return function(){return t=t||(typeof document!="undefined"&&document.createElement?document.createElement("canvas").getContext("2d"):null),t}}(),Yt=6406,k=6407,S=6408,Wt=6409,Kt=6410,ve=6402,jt=34041,ze=33071,ai=9728,li=9729,J=3553,j=34067,Z=32879,ee=35866,He=34069,ci=34070,ui=34071,di=34072,fi=34073,hi=34074,ft=10241,ht=10240,Me=10242,Ue=10243,Jt=32882,mi=33082,pi=33083,xi=33084,_i=33085,It=3317,gr=3314,Ar=32878,Er=3316,Tr=3315,Sr=32877,yi=37443,vi=37441,bi=37440,gi=33321,Ai=36756,Ei=33325,Ti=33326,Si=33330,Fi=33329,wi=33338,Ri=33337,Ci=33340,Pi=33339,Ii=33323,Di=36757,Li=33327,Bi=33328,Ni=33336,$i=33335,zi=33332,Mi=33331,Ui=33334,Oi=33333,Gi=32849,ki=35905,Vi=36194,Hi=36758,Xi=35898,Yi=35901,Wi=34843,Ki=34837,ji=36221,Ji=36239,qi=36215,Qi=36233,Zi=36209,eo=36227,to=32856,ro=35907,no=36759,io=32855,oo=32854,so=32857,ao=34842,lo=34836,co=36220,uo=36238,fo=36975,ho=36214,mo=36232,po=36226,xo=36208,_o=33189,yo=33190,vo=36012,bo=36013,go=35056,q=5120,T=5121,Ie=5122,ue=5123,De=5124,oe=5125,P=5126,qt=32819,Qt=32820,Zt=33635,M=5131,be=36193,it=33640,Ao=35899,Eo=35902,To=36269,So=34042,Le=33319,de=33320,Be=6403,fe=36244,he=36248,se=36249;let ot;function Xe(t){if(!ot){const e={};e[Yt]={textureFormat:Yt,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[1,2,2,4],type:[T,M,be,P]},e[Wt]={textureFormat:Wt,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[1,2,2,4],type:[T,M,be,P]},e[Kt]={textureFormat:Kt,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[2,4,4,8],type:[T,M,be,P]},e[k]={textureFormat:k,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[3,6,6,12,2],type:[T,M,be,P,Zt]},e[S]={textureFormat:S,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4,8,8,16,2,2],type:[T,M,be,P,qt,Qt]},e[ve]={textureFormat:ve,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2,4],type:[oe,ue]},e[gi]={textureFormat:Be,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[1],type:[T]},e[Ai]={textureFormat:Be,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[1],type:[q]},e[Ei]={textureFormat:Be,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[4,2],type:[P,M]},e[Ti]={textureFormat:Be,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[4],type:[P]},e[Si]={textureFormat:fe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[1],type:[T]},e[Fi]={textureFormat:fe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[1],type:[q]},e[zi]={textureFormat:fe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[ue]},e[Mi]={textureFormat:fe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[Ie]},e[Ui]={textureFormat:fe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[oe]},e[Oi]={textureFormat:fe,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[De]},e[Ii]={textureFormat:Le,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[2],type:[T]},e[Di]={textureFormat:Le,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[2],type:[q]},e[Li]={textureFormat:Le,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[8,4],type:[P,M]},e[Bi]={textureFormat:Le,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[8],type:[P]},e[Ni]={textureFormat:de,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[T]},e[$i]={textureFormat:de,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2],type:[q]},e[wi]={textureFormat:de,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[ue]},e[Ri]={textureFormat:de,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[Ie]},e[Ci]={textureFormat:de,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[oe]},e[Pi]={textureFormat:de,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[De]},e[Gi]={textureFormat:k,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[3],type:[T]},e[ki]={textureFormat:k,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[3],type:[T]},e[Vi]={textureFormat:k,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[3,2],type:[T,Zt]},e[Hi]={textureFormat:k,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[3],type:[q]},e[Xi]={textureFormat:k,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[12,6,4],type:[P,M,Ao]},e[Yi]={textureFormat:k,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[12,6,4],type:[P,M,Eo]},e[Wi]={textureFormat:k,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[12,6],type:[P,M]},e[Ki]={textureFormat:k,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[12],type:[P]},e[ji]={textureFormat:he,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[3],type:[T]},e[Ji]={textureFormat:he,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[3],type:[q]},e[qi]={textureFormat:he,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[6],type:[ue]},e[Qi]={textureFormat:he,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[6],type:[Ie]},e[Zi]={textureFormat:he,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[12],type:[oe]},e[eo]={textureFormat:he,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[12],type:[De]},e[to]={textureFormat:S,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4],type:[T]},e[ro]={textureFormat:S,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4],type:[T]},e[no]={textureFormat:S,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[4],type:[q]},e[io]={textureFormat:S,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4,2,4],type:[T,Qt,it]},e[oo]={textureFormat:S,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4,2],type:[T,qt]},e[so]={textureFormat:S,colorRenderable:!0,textureFilterable:!0,bytesPerElement:[4],type:[it]},e[ao]={textureFormat:S,colorRenderable:!1,textureFilterable:!0,bytesPerElement:[16,8],type:[P,M]},e[lo]={textureFormat:S,colorRenderable:!1,textureFilterable:!1,bytesPerElement:[16],type:[P]},e[co]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[T]},e[uo]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[q]},e[fo]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[it]},e[ho]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[ue]},e[mo]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[8],type:[Ie]},e[po]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[16],type:[De]},e[xo]={textureFormat:se,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[16],type:[oe]},e[_o]={textureFormat:ve,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[2,4],type:[ue,oe]},e[yo]={textureFormat:ve,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[oe]},e[vo]={textureFormat:ve,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[P]},e[go]={textureFormat:jt,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[So]},e[bo]={textureFormat:jt,colorRenderable:!0,textureFilterable:!1,bytesPerElement:[4],type:[To]},Object.keys(e).forEach(function(r){const n=e[r];n.bytesPerElementMap={},n.bytesPerElement.forEach(function(i,o){const s=n.type[o];n.bytesPerElementMap[s]=i})}),ot=e}return ot[t]}function Fo(t,e){const r=Xe(t);if(!r)throw"unknown internal format";const n=r.bytesPerElementMap[e];if(n===void 0)throw"unknown internal format";return n}function ye(t){const e=Xe(t);if(!e)throw"unknown internal format";return{format:e.textureFormat,type:e.type[0]}}function er(t){return(t&t-1)===0}function wo(t,e,r,n){if(!Re(t))return er(e)&&er(r);const i=Xe(n);if(!i)throw"unknown internal format";return i.colorRenderable&&i.textureFilterable}function Ro(t){const e=Xe(t);if(!e)throw"unknown internal format";return e.textureFilterable}function Fr(t,e,r){return xe(e)?Ct(e):r||T}function Ne(t,e,r,n,i){if(i%1!==0)throw"can't guess dimensions";if(!r&&!n){const o=Math.sqrt(i/(e===j?6:1));o%1===0?(r=o,n=o):(r=i,n=1)}else if(n){if(!r&&(r=i/n,r%1))throw"can't guess dimensions"}else if(n=i/r,n%1)throw"can't guess dimensions";return{width:r,height:n}}function _e(t,e){e.colorspaceConversion!==void 0&&t.pixelStorei(yi,e.colorspaceConversion),e.premultiplyAlpha!==void 0&&t.pixelStorei(vi,e.premultiplyAlpha),e.flipY!==void 0&&t.pixelStorei(bi,e.flipY)}function wr(t){t.pixelStorei(It,4),Re(t)&&(t.pixelStorei(gr,0),t.pixelStorei(Ar,0),t.pixelStorei(Er,0),t.pixelStorei(Tr,0),t.pixelStorei(Sr,0))}function Co(t,e,r,n){n.minMag&&(r.call(t,e,ft,n.minMag),r.call(t,e,ht,n.minMag)),n.min&&r.call(t,e,ft,n.min),n.mag&&r.call(t,e,ht,n.mag),n.wrap&&(r.call(t,e,Me,n.wrap),r.call(t,e,Ue,n.wrap),(e===Z||Gn(t,e))&&r.call(t,e,Jt,n.wrap)),n.wrapR&&r.call(t,e,Jt,n.wrapR),n.wrapS&&r.call(t,e,Me,n.wrapS),n.wrapT&&r.call(t,e,Ue,n.wrapT),n.minLod&&r.call(t,e,mi,n.minLod),n.maxLod&&r.call(t,e,pi,n.maxLod),n.baseLevel&&r.call(t,e,xi,n.baseLevel),n.maxLevel&&r.call(t,e,_i,n.maxLevel)}function Rr(t,e,r){const n=r.target||J;t.bindTexture(n,e),Co(t,n,t.texParameteri,r)}function Po(t){return t=t||te.textureColor,xe(t)?t:new Uint8Array([t[0]*255,t[1]*255,t[2]*255,t[3]*255])}function mt(t,e,r,n,i,o){r=r||te.textureOptions,o=o||S;const s=r.target||J;if(n=n||r.width,i=i||r.height,t.bindTexture(s,e),wo(t,n,i,o))t.generateMipmap(s);else{const l=Ro(o)?li:ai;t.texParameteri(s,ft,l),t.texParameteri(s,ht,l),t.texParameteri(s,Me,ze),t.texParameteri(s,Ue,ze)}}function Fe(t){return t.auto===!0||t.auto===void 0&&t.level===void 0}function pt(t,e){return e=e||{},e.cubeFaceOrder||[He,ci,ui,di,fi,hi]}function xt(t,e){const n=pt(t,e).map(function(i,o){return{face:i,ndx:o}});return n.sort(function(i,o){return i.face-o.face}),n}function Cr(t,e,r,n){n=n||te.textureOptions;const i=n.target||J,o=n.level||0;let s=r.width,l=r.height;const a=n.internalFormat||n.format||S,c=ye(a),x=n.format||c.format,m=n.type||c.type;if(_e(t,n),t.bindTexture(i,e),i===j){const p=r.width,f=r.height;let h,_;if(p/6===f)h=f,_=[0,0,1,0,2,0,3,0,4,0,5,0];else if(f/6===p)h=p,_=[0,0,0,1,0,2,0,3,0,4,0,5];else if(p/3===f/2)h=p/3,_=[0,0,1,0,2,0,0,1,1,1,2,1];else if(p/2===f/3)h=p/2,_=[0,0,1,0,0,1,1,1,0,2,1,2];else throw"can't figure out cube map from element: "+(r.src?r.src:r.nodeName);const g=br();g?(g.canvas.width=h,g.canvas.height=h,s=h,l=h,xt(t,n).forEach(function(d){const b=_[d.ndx*2+0]*h,y=_[d.ndx*2+1]*h;g.drawImage(r,b,y,h,h,0,0,h,h),t.texImage2D(d.face,o,a,x,m,g.canvas)}),g.canvas.width=1,g.canvas.height=1):typeof createImageBitmap!="undefined"&&(s=h,l=h,xt(t,n).forEach(function(d){const b=_[d.ndx*2+0]*h,y=_[d.ndx*2+1]*h;t.texImage2D(d.face,o,a,h,h,0,x,m,null),createImageBitmap(r,b,y,h,h,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then(function(C){_e(t,n),t.bindTexture(i,e),t.texImage2D(d.face,o,a,x,m,C),Fe(n)&&mt(t,e,n,s,l,a)})}))}else if(i===Z||i===ee){const p=Math.min(r.width,r.height),f=Math.max(r.width,r.height),h=f/p;if(h%1!==0)throw"can not compute 3D dimensions of element";const _=r.width===f?1:0,g=r.height===f?1:0;t.pixelStorei(It,1),t.pixelStorei(gr,r.width),t.pixelStorei(Ar,0),t.pixelStorei(Sr,0),t.texImage3D(i,o,a,p,p,p,0,x,m,null);for(let d=0;d<h;++d){const b=d*p*_,y=d*p*g;t.pixelStorei(Er,b),t.pixelStorei(Tr,y),t.texSubImage3D(i,o,0,0,d,p,p,1,x,m,r)}wr(t)}else t.texImage2D(i,o,a,x,m,r);Fe(n)&&mt(t,e,n,s,l,a),Rr(t,e,n)}function Ce(){}function Io(t){if(typeof document!="undefined"){const e=document.createElement("a");return e.href=t,e.hostname===location.hostname&&e.port===location.port&&e.protocol===location.protocol}else{const e=new URL(location.href).origin;return new URL(t,location.href).origin===e}}function Do(t,e){return e===void 0&&!Io(t)?"anonymous":e}function Lo(t,e,r){r=r||Ce;let n;if(e=e!==void 0?e:te.crossOrigin,e=Do(t,e),typeof Image!="undefined"){n=new Image,e!==void 0&&(n.crossOrigin=e);const i=function(){n.removeEventListener("error",o),n.removeEventListener("load",s),n=null},o=function(){const a="couldn't load image: "+t;fr(a),r(a,n),i()},s=function(){r(null,n),i()};return n.addEventListener("error",o),n.addEventListener("load",s),n.src=t,n}else if(typeof ImageBitmap!="undefined"){let i,o;const s=function(){r(i,o)},l={};e&&(l.mode="cors"),fetch(t,l).then(function(a){if(!a.ok)throw a;return a.blob()}).then(function(a){return createImageBitmap(a,{premultiplyAlpha:"none",colorSpaceConversion:"none"})}).then(function(a){o=a,setTimeout(s)}).catch(function(a){i=a,setTimeout(s)}),n=null}return n}function Pr(t){return typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap||typeof ImageData!="undefined"&&t instanceof ImageData||typeof HTMLElement!="undefined"&&t instanceof HTMLElement}function Dt(t,e,r){return Pr(t)?(setTimeout(function(){r(null,t)}),t):Lo(t,e,r)}function Lt(t,e,r){r=r||te.textureOptions;const n=r.target||J;if(t.bindTexture(n,e),r.color===!1)return;const i=Po(r.color);if(n===j)for(let o=0;o<6;++o)t.texImage2D(He+o,0,S,1,1,0,S,T,i);else n===Z||n===ee?t.texImage3D(n,0,S,1,1,1,0,S,T,i):t.texImage2D(n,0,S,1,1,0,S,T,i)}function Bo(t,e,r,n){return n=n||Ce,r=r||te.textureOptions,Lt(t,e,r),r=Object.assign({},r),Dt(r.src,r.crossOrigin,function(o,s){o?n(o,e,s):(Cr(t,e,s,r),n(null,e,s))})}function No(t,e,r,n){n=n||Ce;const i=r.src;if(i.length!==6)throw"there must be 6 urls for a cubemap";const o=r.level||0,s=r.internalFormat||r.format||S,l=ye(s),a=r.format||l.format,c=r.type||T,x=r.target||J;if(x!==j)throw"target must be TEXTURE_CUBE_MAP";Lt(t,e,r),r=Object.assign({},r);let m=6;const p=[],f=pt(t,r);let h;function _(g){return function(d,b){--m,d?p.push(d):b.width!==b.height?p.push("cubemap face img is not a square: "+b.src):(_e(t,r),t.bindTexture(x,e),m===5?pt().forEach(function(y){t.texImage2D(y,o,s,a,c,b)}):t.texImage2D(g,o,s,a,c,b),Fe(r)&&t.generateMipmap(x)),m===0&&n(p.length?p:void 0,e,h)}}h=i.map(function(g,d){return Dt(g,r.crossOrigin,_(f[d]))})}function $o(t,e,r,n){n=n||Ce;const i=r.src,o=r.internalFormat||r.format||S,s=ye(o),l=r.format||s.format,a=r.type||T,c=r.target||ee;if(c!==Z&&c!==ee)throw"target must be TEXTURE_3D or TEXTURE_2D_ARRAY";Lt(t,e,r),r=Object.assign({},r);let x=i.length;const m=[];let p;const f=r.level||0;let h=r.width,_=r.height;const g=i.length;let d=!0;function b(y){return function(C,z){if(--x,C)m.push(C);else{if(_e(t,r),t.bindTexture(c,e),d){d=!1,h=r.width||z.width,_=r.height||z.height,t.texImage3D(c,f,o,h,_,g,0,l,a,null);for(let ie=0;ie<g;++ie)t.texSubImage3D(c,f,0,0,ie,h,_,1,l,a,z)}else{let ie=z,Y;(z.width!==h||z.height!==_)&&(Y=br(),ie=Y.canvas,Y.canvas.width=h,Y.canvas.height=_,Y.drawImage(z,0,0,h,_)),t.texSubImage3D(c,f,0,0,y,h,_,1,l,a,ie),Y&&ie===Y.canvas&&(Y.canvas.width=0,Y.canvas.height=0)}Fe(r)&&t.generateMipmap(c)}x===0&&n(m.length?m:void 0,e,p)}}p=i.map(function(y,C){return Dt(y,r.crossOrigin,b(C))})}function zo(t,e,r,n){n=n||te.textureOptions;const i=n.target||J;t.bindTexture(i,e);let o=n.width,s=n.height,l=n.depth;const a=n.level||0,c=n.internalFormat||n.format||S,x=ye(c),m=n.format||x.format,p=n.type||Fr(t,r,x.type);if(xe(r))r instanceof Uint8ClampedArray&&(r=new Uint8Array(r.buffer));else{const g=zn(p);r=new g(r)}const f=Fo(c,p),h=r.byteLength/f;if(h%1)throw"length wrong size for format: "+Se(t,m);let _;if(i===Z||i===ee)if(!o&&!s&&!l){const g=Math.cbrt(h);if(g%1!==0)throw"can't guess cube size of array of numElements: "+h;o=g,s=g,l=g}else o&&(!s||!l)?(_=Ne(t,i,s,l,h/o),s=_.width,l=_.height):s&&(!o||!l)?(_=Ne(t,i,o,l,h/s),o=_.width,l=_.height):(_=Ne(t,i,o,s,h/l),o=_.width,s=_.height);else _=Ne(t,i,o,s,h),o=_.width,s=_.height;if(wr(t),t.pixelStorei(It,n.unpackAlignment||1),_e(t,n),i===j){const g=f/r.BYTES_PER_ELEMENT,d=h/6*g;xt(t,n).forEach(b=>{const y=d*b.ndx,C=r.subarray(y,y+d);t.texImage2D(b.face,a,c,o,s,0,m,p,C)})}else i===Z||i===ee?t.texImage3D(i,a,c,o,s,l,0,m,p,r):t.texImage2D(i,a,c,o,s,0,m,p,r);return{width:o,height:s,depth:l,type:p}}function Mo(t,e,r){const n=r.target||J;t.bindTexture(n,e);const i=r.level||0,o=r.internalFormat||r.format||S,s=ye(o),l=r.format||s.format,a=r.type||s.type;if(_e(t,r),n===j)for(let c=0;c<6;++c)t.texImage2D(He+c,i,o,r.width,r.height,0,l,a,null);else n===Z||n===ee?t.texImage3D(n,i,o,r.width,r.height,r.depth,0,l,a,null):t.texImage2D(n,i,o,r.width,r.height,0,l,a,null)}function Uo(t,e,r){r=r||Ce,e=e||te.textureOptions;const n=t.createTexture(),i=e.target||J;let o=e.width||1,s=e.height||1;const l=e.internalFormat||S;t.bindTexture(i,n),i===j&&(t.texParameteri(i,Me,ze),t.texParameteri(i,Ue,ze));let a=e.src;if(a)if(typeof a=="function"&&(a=a(t,e)),typeof a=="string")Bo(t,n,e,r);else if(xe(a)||Array.isArray(a)&&(typeof a[0]=="number"||Array.isArray(a[0])||xe(a[0]))){const c=zo(t,n,a,e);o=c.width,s=c.height}else Array.isArray(a)&&(typeof a[0]=="string"||Pr(a[0]))?i===j?No(t,n,e,r):$o(t,n,e,r):(Cr(t,n,a,e),o=a.width,s=a.height);else Mo(t,n,e);return Fe(e)&&mt(t,n,e,o,s,l),Rr(t,n,e),n}function Oo(t,e,r,n,i,o){n=n||r.width,i=i||r.height,o=o||r.depth;const s=r.target||J;t.bindTexture(s,e);const l=r.level||0,a=r.internalFormat||r.format||S,c=ye(a),x=r.format||c.format;let m;const p=r.src;if(p&&(xe(p)||Array.isArray(p)&&typeof p[0]=="number")?m=r.type||Fr(t,p,c.type):m=r.type||c.type,s===j)for(let f=0;f<6;++f)t.texImage2D(He+f,l,a,n,i,0,x,m,null);else s===Z||s===ee?t.texImage3D(s,l,a,n,i,o,0,x,m,null):t.texImage2D(s,l,a,n,i,0,x,m,null)}const Ir=fr;function Dr(t){return typeof document!="undefined"&&document.getElementById?document.getElementById(t):null}const Oe=33984,Ye=34962,Go=34963,tr=35982,rr=36386,ko=35713,Vo=35714,Ho=35632,Xo=35633,Yo=35981,Lr=35718,Wo=35721,Ko=35971,jo=35382,Jo=35396,qo=35398,Qo=35392,Zo=35395,We=5126,Br=35664,Nr=35665,$r=35666,Bt=5124,zr=35667,Mr=35668,Ur=35669,Or=35670,Gr=35671,kr=35672,Vr=35673,Hr=35674,Xr=35675,Yr=35676,es=35678,ts=35680,rs=35679,ns=35682,is=35685,os=35686,ss=35687,as=35688,ls=35689,cs=35690,us=36289,ds=36292,fs=36293,Nt=5125,Wr=36294,Kr=36295,jr=36296,hs=36298,ms=36299,ps=36300,xs=36303,_s=36306,ys=36307,vs=36308,bs=36311,Ke=3553,je=34067,$t=32879,Je=35866,v={};function Jr(t,e){return v[e].bindPoint}function gs(t,e){return function(r){t.uniform1f(e,r)}}function As(t,e){return function(r){t.uniform1fv(e,r)}}function Es(t,e){return function(r){t.uniform2fv(e,r)}}function Ts(t,e){return function(r){t.uniform3fv(e,r)}}function Ss(t,e){return function(r){t.uniform4fv(e,r)}}function qr(t,e){return function(r){t.uniform1i(e,r)}}function Qr(t,e){return function(r){t.uniform1iv(e,r)}}function Zr(t,e){return function(r){t.uniform2iv(e,r)}}function en(t,e){return function(r){t.uniform3iv(e,r)}}function tn(t,e){return function(r){t.uniform4iv(e,r)}}function Fs(t,e){return function(r){t.uniform1ui(e,r)}}function ws(t,e){return function(r){t.uniform1uiv(e,r)}}function Rs(t,e){return function(r){t.uniform2uiv(e,r)}}function Cs(t,e){return function(r){t.uniform3uiv(e,r)}}function Ps(t,e){return function(r){t.uniform4uiv(e,r)}}function Is(t,e){return function(r){t.uniformMatrix2fv(e,!1,r)}}function Ds(t,e){return function(r){t.uniformMatrix3fv(e,!1,r)}}function Ls(t,e){return function(r){t.uniformMatrix4fv(e,!1,r)}}function Bs(t,e){return function(r){t.uniformMatrix2x3fv(e,!1,r)}}function Ns(t,e){return function(r){t.uniformMatrix3x2fv(e,!1,r)}}function $s(t,e){return function(r){t.uniformMatrix2x4fv(e,!1,r)}}function zs(t,e){return function(r){t.uniformMatrix4x2fv(e,!1,r)}}function Ms(t,e){return function(r){t.uniformMatrix3x4fv(e,!1,r)}}function Us(t,e){return function(r){t.uniformMatrix4x3fv(e,!1,r)}}function D(t,e,r,n){const i=Jr(t,e);return Re(t)?function(o){let s,l;Ve(t,o)?(s=o,l=null):(s=o.texture,l=o.sampler),t.uniform1i(n,r),t.activeTexture(Oe+r),t.bindTexture(i,s),t.bindSampler(r,l)}:function(o){t.uniform1i(n,r),t.activeTexture(Oe+r),t.bindTexture(i,o)}}function L(t,e,r,n,i){const o=Jr(t,e),s=new Int32Array(i);for(let l=0;l<i;++l)s[l]=r+l;return Re(t)?function(l){t.uniform1iv(n,s),l.forEach(function(a,c){t.activeTexture(Oe+s[c]);let x,m;Ve(t,a)?(x=a,m=null):(x=a.texture,m=a.sampler),t.bindSampler(r,m),t.bindTexture(o,x)})}:function(l){t.uniform1iv(n,s),l.forEach(function(a,c){t.activeTexture(Oe+s[c]),t.bindTexture(o,a)})}}v[We]={Type:Float32Array,size:4,setter:gs,arraySetter:As};v[Br]={Type:Float32Array,size:8,setter:Es,cols:2};v[Nr]={Type:Float32Array,size:12,setter:Ts,cols:3};v[$r]={Type:Float32Array,size:16,setter:Ss,cols:4};v[Bt]={Type:Int32Array,size:4,setter:qr,arraySetter:Qr};v[zr]={Type:Int32Array,size:8,setter:Zr,cols:2};v[Mr]={Type:Int32Array,size:12,setter:en,cols:3};v[Ur]={Type:Int32Array,size:16,setter:tn,cols:4};v[Nt]={Type:Uint32Array,size:4,setter:Fs,arraySetter:ws};v[Wr]={Type:Uint32Array,size:8,setter:Rs,cols:2};v[Kr]={Type:Uint32Array,size:12,setter:Cs,cols:3};v[jr]={Type:Uint32Array,size:16,setter:Ps,cols:4};v[Or]={Type:Uint32Array,size:4,setter:qr,arraySetter:Qr};v[Gr]={Type:Uint32Array,size:8,setter:Zr,cols:2};v[kr]={Type:Uint32Array,size:12,setter:en,cols:3};v[Vr]={Type:Uint32Array,size:16,setter:tn,cols:4};v[Hr]={Type:Float32Array,size:32,setter:Is,rows:2,cols:2};v[Xr]={Type:Float32Array,size:48,setter:Ds,rows:3,cols:3};v[Yr]={Type:Float32Array,size:64,setter:Ls,rows:4,cols:4};v[is]={Type:Float32Array,size:32,setter:Bs,rows:2,cols:3};v[os]={Type:Float32Array,size:32,setter:$s,rows:2,cols:4};v[ss]={Type:Float32Array,size:48,setter:Ns,rows:3,cols:2};v[as]={Type:Float32Array,size:48,setter:Ms,rows:3,cols:4};v[ls]={Type:Float32Array,size:64,setter:zs,rows:4,cols:2};v[cs]={Type:Float32Array,size:64,setter:Us,rows:4,cols:3};v[es]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Ke};v[ts]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:je};v[rs]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:$t};v[ns]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Ke};v[us]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Je};v[ds]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Je};v[fs]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:je};v[hs]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Ke};v[ms]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:$t};v[ps]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:je};v[xs]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Je};v[_s]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Ke};v[ys]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:$t};v[vs]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:je};v[bs]={Type:null,size:0,setter:D,arraySetter:L,bindPoint:Je};function qe(t,e){return function(r){if(r.value)switch(t.disableVertexAttribArray(e),r.value.length){case 4:t.vertexAttrib4fv(e,r.value);break;case 3:t.vertexAttrib3fv(e,r.value);break;case 2:t.vertexAttrib2fv(e,r.value);break;case 1:t.vertexAttrib1fv(e,r.value);break;default:throw new Error("the length of a float constant value must be between 1 and 4!")}else t.bindBuffer(Ye,r.buffer),t.enableVertexAttribArray(e),t.vertexAttribPointer(e,r.numComponents||r.size,r.type||We,r.normalize||!1,r.stride||0,r.offset||0),r.divisor!==void 0&&t.vertexAttribDivisor(e,r.divisor)}}function re(t,e){return function(r){if(r.value)if(t.disableVertexAttribArray(e),r.value.length===4)t.vertexAttrib4iv(e,r.value);else throw new Error("The length of an integer constant value must be 4!");else t.bindBuffer(Ye,r.buffer),t.enableVertexAttribArray(e),t.vertexAttribIPointer(e,r.numComponents||r.size,r.type||Bt,r.stride||0,r.offset||0),r.divisor!==void 0&&t.vertexAttribDivisor(e,r.divisor)}}function Qe(t,e){return function(r){if(r.value)if(t.disableVertexAttribArray(e),r.value.length===4)t.vertexAttrib4uiv(e,r.value);else throw new Error("The length of an unsigned integer constant value must be 4!");else t.bindBuffer(Ye,r.buffer),t.enableVertexAttribArray(e),t.vertexAttribIPointer(e,r.numComponents||r.size,r.type||Nt,r.stride||0,r.offset||0),r.divisor!==void 0&&t.vertexAttribDivisor(e,r.divisor)}}function zt(t,e,r){const n=r.size,i=r.count;return function(o){t.bindBuffer(Ye,o.buffer);const s=o.size||o.numComponents||n,l=s/i,a=o.type||We,x=v[a].size*s,m=o.normalize||!1,p=o.offset||0,f=x/i;for(let h=0;h<i;++h)t.enableVertexAttribArray(e+h),t.vertexAttribPointer(e+h,l,a,m,x,p+f*h),o.divisor!==void 0&&t.vertexAttribDivisor(e+h,o.divisor)}}const w={};w[We]={size:4,setter:qe};w[Br]={size:8,setter:qe};w[Nr]={size:12,setter:qe};w[$r]={size:16,setter:qe};w[Bt]={size:4,setter:re};w[zr]={size:8,setter:re};w[Mr]={size:12,setter:re};w[Ur]={size:16,setter:re};w[Nt]={size:4,setter:Qe};w[Wr]={size:8,setter:Qe};w[Kr]={size:12,setter:Qe};w[jr]={size:16,setter:Qe};w[Or]={size:4,setter:re};w[Gr]={size:8,setter:re};w[kr]={size:12,setter:re};w[Vr]={size:16,setter:re};w[Hr]={size:4,setter:zt,count:2};w[Xr]={size:9,setter:zt,count:3};w[Yr]={size:16,setter:zt,count:4};const Os=/ERROR:\s*\d+:(\d+)/gi;function rn(t,e="",r=0){const n=[...e.matchAll(Os)],i=new Map(n.map((o,s)=>{const l=parseInt(o[1]),a=n[s+1],c=a?a.index:e.length,x=e.substring(o.index,c);return[l-1,x]}));return t.split(`
`).map((o,s)=>{const l=i.get(s);return`${s+1+r}: ${o}${l?`

^^^ ${l}`:""}`}).join(`
`)}const nr=/^[ \t]*\n/;function nn(t,e,r,n){const i=n||Ir,o=t.createShader(r);let s=0;if(nr.test(e)&&(s=1,e=e.replace(nr,"")),t.shaderSource(o,e),t.compileShader(o),!t.getShaderParameter(o,ko)){const a=t.getShaderInfoLog(o);return i(`${rn(e,a,s)}
Error compiling ${Se(t,r)}: ${a}`),t.deleteShader(o),null}return o}function Mt(t,e,r){let n,i;if(typeof e=="function"&&(r=e,e=void 0),typeof t=="function")r=t,t=void 0;else if(t&&!Array.isArray(t)){if(t.errorCallback)return t;const s=t;r=s.errorCallback,t=s.attribLocations,n=s.transformFeedbackVaryings,i=s.transformFeedbackMode}const o={errorCallback:r||Ir,transformFeedbackVaryings:n,transformFeedbackMode:i};if(t){let s={};Array.isArray(t)?t.forEach(function(l,a){s[l]=e?e[a]:a}):s=t,o.attribLocations=s}return o}const on=["VERTEX_SHADER","FRAGMENT_SHADER"];function Gs(t,e){if(e.indexOf("frag")>=0)return Ho;if(e.indexOf("vert")>=0)return Xo}function ir(t,e){e.forEach(function(r){t.deleteShader(r)})}function ks(t,e,r,n,i){const o=Mt(r,n,i),s=[],l=[];for(let m=0;m<e.length;++m){let p=e[m];if(typeof p=="string"){const f=Dr(p),h=f?f.text:p;let _=t[on[m]];f&&f.type&&(_=Gs(t,f.type)||_),p=nn(t,h,_,o.errorCallback),l.push(p)}On(t,p)&&s.push(p)}if(s.length!==e.length)return o.errorCallback("not enough shaders for program"),ir(t,l),null;const a=t.createProgram();s.forEach(function(m){t.attachShader(a,m)}),o.attribLocations&&Object.keys(o.attribLocations).forEach(function(m){t.bindAttribLocation(a,o.attribLocations[m],m)});let c=o.transformFeedbackVaryings;if(c&&(c.attribs&&(c=c.attribs),Array.isArray(c)||(c=Object.keys(c)),t.transformFeedbackVaryings(a,c,o.transformFeedbackMode||Yo)),t.linkProgram(a),!t.getProgramParameter(a,Vo)){const m=t.getProgramInfoLog(a);return o.errorCallback(`${s.map(p=>{const f=rn(t.getShaderSource(p),"",0),h=t.getShaderParameter(p,t.SHADER_TYPE);return`${Se(t,h)}
${f}}`}).join(`
`)}
Error in program linking: ${m}`),t.deleteProgram(a),ir(t,l),null}return a}function Vs(t,e,r,n,i){const o=Mt(r,n,i),s=[];for(let l=0;l<e.length;++l){const a=nn(t,e[l],t[on[l]],o.errorCallback);if(!a)return null;s.push(a)}return ks(t,s,o)}function sn(t){const e=t.name;return e.startsWith("gl_")||e.startsWith("webgl_")}const Hs=/(\.|\[|]|\w+)/g,Xs=t=>t>="0"&&t<="9";function Ys(t,e,r,n){const i=t.split(Hs).filter(l=>l!=="");let o=0,s="";for(;;){const l=i[o++];s+=l;const a=Xs(l[0]),c=a?parseInt(l):l;if(a&&(s+=i[o++]),o===i.length){r[c]=e;break}else{const m=i[o++],p=m==="[",f=r[c]||(p?[]:{});r[c]=f,r=f,n[s]=n[s]||function(h){return function(_){ln(h,_)}}(f),s+=m}}}function Ws(t,e){let r=0;function n(l,a,c){const x=a.name.endsWith("[0]"),m=a.type,p=v[m];if(!p)throw new Error(`unknown type: 0x${m.toString(16)}`);let f;if(p.bindPoint){const h=r;r+=a.size,x?f=p.arraySetter(t,m,h,c,a.size):f=p.setter(t,m,h,c,a.size)}else p.arraySetter&&x?f=p.arraySetter(t,c):f=p.setter(t,c);return f.location=c,f}const i={},o={},s=t.getProgramParameter(e,Lr);for(let l=0;l<s;++l){const a=t.getActiveUniform(e,l);if(sn(a))continue;let c=a.name;c.endsWith("[0]")&&(c=c.substr(0,c.length-3));const x=t.getUniformLocation(e,a.name);if(x){const m=n(e,a,x);i[c]=m,Ys(c,m,o,i)}}return i}function Ks(t,e){const r={},n=t.getProgramParameter(e,Ko);for(let i=0;i<n;++i){const o=t.getTransformFeedbackVarying(e,i);r[o.name]={index:i,type:o.type,size:o.size}}return r}function js(t,e,r){e.transformFeedbackInfo&&(e=e.transformFeedbackInfo),r.attribs&&(r=r.attribs);for(const n in r){const i=e[n];if(i){const o=r[n];o.offset?t.bindBufferRange(tr,i.index,o.buffer,o.offset,o.size):t.bindBufferBase(tr,i.index,o.buffer)}}}function an(t,e,r){const n=t.createTransformFeedback();return t.bindTransformFeedback(rr,n),t.useProgram(e.program),js(t,e,r),t.bindTransformFeedback(rr,null),n}function Js(t,e){const r=t.getProgramParameter(e,Lr),n=[],i=[];for(let l=0;l<r;++l){i.push(l),n.push({});const a=t.getActiveUniform(e,l);n[l].name=a.name}[["UNIFORM_TYPE","type"],["UNIFORM_SIZE","size"],["UNIFORM_BLOCK_INDEX","blockNdx"],["UNIFORM_OFFSET","offset"]].forEach(function(l){const a=l[0],c=l[1];t.getActiveUniforms(e,i,t[a]).forEach(function(x,m){n[m][c]=x})});const o={},s=t.getProgramParameter(e,jo);for(let l=0;l<s;++l){const a=t.getActiveUniformBlockName(e,l),c={index:t.getUniformBlockIndex(e,a),usedByVertexShader:t.getActiveUniformBlockParameter(e,l,Jo),usedByFragmentShader:t.getActiveUniformBlockParameter(e,l,qo),size:t.getActiveUniformBlockParameter(e,l,Qo),uniformIndices:t.getActiveUniformBlockParameter(e,l,Zo)};c.used=c.usedByVertexShader||c.usedByFragmentShader,o[a]=c}return{blockSpecs:o,uniformData:n}}function ln(t,e){for(const r in e){const n=t[r];typeof n=="function"?n(e[r]):ln(t[r],e[r])}}function R(t,...e){const r=t.uniformSetters||t,n=e.length;for(let i=0;i<n;++i){const o=e[i];if(Array.isArray(o)){const s=o.length;for(let l=0;l<s;++l)R(r,o[l])}else for(const s in o){const l=r[s];l&&l(o[s])}}}function qs(t,e){const r={},n=t.getProgramParameter(e,Wo);for(let i=0;i<n;++i){const o=t.getActiveAttrib(e,i);if(sn(o))continue;const s=t.getAttribLocation(e,o.name),l=w[o.type],a=l.setter(t,s,l);a.location=s,r[o.name]=a}return r}function Qs(t,e){for(const r in e){const n=t[r];n&&n(e[r])}}function O(t,e,r){r.vertexArrayObject?t.bindVertexArray(r.vertexArrayObject):(Qs(e.attribSetters||e,r.attribs),r.indices&&t.bindBuffer(Go,r.indices))}function Zs(t,e){const r=Ws(t,e),n=qs(t,e),i={program:e,uniformSetters:r,attribSetters:n};return Re(t)&&(i.uniformBlockSpec=Js(t,e),i.transformFeedbackInfo=Ks(t,e)),i}function $(t,e,r,n,i){const o=Mt(r,n,i);let s=!0;if(e=e.map(function(a){if(a.indexOf(`
`)<0){const c=Dr(a);c?a=c.text:(o.errorCallback("no element with id: "+a),s=!1)}return a}),!s)return null;const l=Vs(t,e,o);return l?Zs(t,l):null}const ea=4,or=5123;function B(t,e,r,n,i,o){r=r===void 0?ea:r;const s=e.indices,l=e.elementType,a=n===void 0?e.numElements:n;i=i===void 0?0:i,l||s?o!==void 0?t.drawElementsInstanced(r,a,l===void 0?or:e.elementType,i,o):t.drawElements(r,a,l===void 0?or:e.elementType,i):o!==void 0?t.drawArraysInstanced(r,i,a,o):t.drawArrays(r,i,a)}const cn=36160,ae=36161,ta=3553,ra=5121,na=6402,ia=6408,oa=33190,sa=36012,aa=35056,la=36013,ca=32854,ua=32855,da=36194,un=33189,dn=6401,fn=36168,Ut=34041,fa=36064,Ze=36096,hn=36128,Ot=33306,_t=33071,yt=9729,mn=[{format:ia,type:ra,min:yt,wrap:_t},{format:Ut}],G={};G[Ut]=Ot;G[dn]=hn;G[fn]=hn;G[na]=Ze;G[un]=Ze;G[oa]=Ze;G[sa]=Ze;G[aa]=Ot;G[la]=Ot;function ha(t,e){return G[t]||G[e]}const ne={};ne[ca]=!0;ne[ua]=!0;ne[da]=!0;ne[Ut]=!0;ne[un]=!0;ne[dn]=!0;ne[fn]=!0;function ma(t){return ne[t]}function vt(t,e,r,n){const i=cn,o=t.createFramebuffer();t.bindFramebuffer(i,o),r=r||t.drawingBufferWidth,n=n||t.drawingBufferHeight,e=e||mn;let s=0;const l={framebuffer:o,attachments:[],width:r,height:n};return e.forEach(function(a){let c=a.attachment;const x=a.samples,m=a.format;let p=a.attachmentPoint||ha(m,a.internalFormat);if(p||(p=fa+s++),!c)if(x!==void 0||ma(m))c=t.createRenderbuffer(),t.bindRenderbuffer(ae,c),x>1?t.renderbufferStorageMultisample(ae,x,m,r,n):t.renderbufferStorage(ae,m,r,n);else{const f=Object.assign({},a);f.width=r,f.height=n,f.auto===void 0&&(f.auto=!1,f.min=f.min||f.minMag||yt,f.mag=f.mag||f.minMag||yt,f.wrapS=f.wrapS||f.wrap||_t,f.wrapT=f.wrapT||f.wrap||_t),c=Uo(t,f)}if(hr(t,c))t.framebufferRenderbuffer(i,p,ae,c);else if(Ve(t,c))a.layer!==void 0?t.framebufferTextureLayer(i,p,c,a.level||0,a.layer):t.framebufferTexture2D(i,p,a.target||ta,c,a.level||0);else throw new Error("unknown attachment type");l.attachments.push(c)}),l}function bt(t,e,r,n,i){n=n||t.drawingBufferWidth,i=i||t.drawingBufferHeight,e.width=n,e.height=i,r=r||mn,r.forEach(function(o,s){const l=e.attachments[s],a=o.format,c=o.samples;if(c!==void 0||hr(t,l))t.bindRenderbuffer(ae,l),c>1?t.renderbufferStorageMultisample(ae,c,a,n,i):t.renderbufferStorage(ae,a,n,i);else if(Ve(t,l))Oo(t,l,o,n,i);else throw new Error("unknown attachment type")})}function N(t,e,r){r=r||cn,e?(t.bindFramebuffer(r,e.framebuffer),t.viewport(0,0,e.width,e.height)):(t.bindFramebuffer(r,null),t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight))}const pa=/^(.*?)_/;function xa(t,e){Se(t,0);const r=t.getExtension(e);if(r){const n={},i=pa.exec(e)[1],o="_"+i;for(const s in r){const l=r[s],a=typeof l=="function",c=a?i:o;let x=s;s.endsWith(c)&&(x=s.substring(0,s.length-c.length)),t[x]!==void 0?!a&&t[x]!==l&&Mn(x,t[x],l,s):a?t[x]=function(m){return function(){return m.apply(r,arguments)}}(l):(t[x]=l,n[x]=l)}n.constructor={name:r.constructor.name},Se(n,0)}return r}const sr=["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_float","EXT_color_buffer_half_float","EXT_disjoint_timer_query","EXT_disjoint_timer_query_webgl2","EXT_frag_depth","EXT_sRGB","EXT_shader_texture_lod","EXT_texture_filter_anisotropic","OES_element_index_uint","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_atc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_pvrtc","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_depth_texture","WEBGL_draw_buffers"];function _a(t){for(let e=0;e<sr.length;++e)xa(t,sr[e])}function pn(t,e){e=e||1,e=Math.max(0,e);const r=t.clientWidth*e|0,n=t.clientHeight*e|0;return t.width!==r||t.height!==n?(t.width=r,t.height=n,!0):!1}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.16.1
 * @author George Michael Brower
 * @license MIT
 */class H{constructor(e,r,n,i,o="div"){this.parent=e,this.object=r,this.property=n,this._disabled=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),H.nextNameID=H.nextNameID||0,this.$name.id=`lil-gui-name-${++H.nextNameID}`,this.$widget=document.createElement(o),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}options(e){const r=this.parent.add(this.object,this.property,e);return r.name(this._name),this.destroy(),r}min(e){return this}max(e){return this}step(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ya extends H{constructor(e,r,n){super(e,r,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function gt(t){let e,r;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?r=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?r=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(r=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),r?"#"+r:!1}const va={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:gt,toHexString:gt},we={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},ba={isPrimitive:!1,match:Array.isArray,fromHexString(t,e,r=1){const n=we.fromHexString(t);e[0]=(n>>16&255)/255*r,e[1]=(n>>8&255)/255*r,e[2]=(n&255)/255*r},toHexString([t,e,r],n=1){n=255/n;const i=t*n<<16^e*n<<8^r*n<<0;return we.toHexString(i)}},ga={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,r=1){const n=we.fromHexString(t);e.r=(n>>16&255)/255*r,e.g=(n>>8&255)/255*r,e.b=(n&255)/255*r},toHexString({r:t,g:e,b:r},n=1){n=255/n;const i=t*n<<16^e*n<<8^r*n<<0;return we.toHexString(i)}},Aa=[va,we,ba,ga];function Ea(t){return Aa.find(e=>e.match(t))}class Ta extends H{constructor(e,r,n,i){super(e,r,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ea(this.initialValue),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=gt(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const r=this._format.fromHexString(e);this.setValue(r)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class st extends H{constructor(e,r,n){super(e,r,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Sa extends H{constructor(e,r,n,i,o,s){super(e,r,n,"number"),this._initInput(),this.min(i),this.max(o);const l=s!==void 0;this.step(l?s:this._getImplicitStep(),l),this.updateDisplay()}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,r=!0){return this._step=e,this._stepExplicit=r,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let r=(e-this._min)/(this._max-this._min);r=Math.max(0,Math.min(r,1)),this.$fill.style.width=r*100+"%"}return this._inputFocused||(this.$input.value=e),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{const d=parseFloat(this.$input.value);isNaN(d)||this.setValue(this._clamp(d))},r=d=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+d),this.$input.value=this.getValue())},n=d=>{d.code==="Enter"&&this.$input.blur(),d.code==="ArrowUp"&&(d.preventDefault(),r(this._step*this._arrowKeyMultiplier(d))),d.code==="ArrowDown"&&(d.preventDefault(),r(this._step*this._arrowKeyMultiplier(d)*-1))},i=d=>{this._inputFocused&&(d.preventDefault(),r(this._step*this._normalizeMouseWheel(d)))};let o=!1,s,l,a,c,x;const m=5,p=d=>{s=d.clientX,l=a=d.clientY,o=!0,c=this.getValue(),x=0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",h)},f=d=>{if(o){const b=d.clientX-s,y=d.clientY-l;Math.abs(y)>m?(d.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>m&&h()}o||(x-=(d.clientY-a)*this._step*this._arrowKeyMultiplier(d),c+x>this._max?x=this._max-c:c+x<this._min&&(x=this._min-c),this._snapClampSetValue(c+x)),a=d.clientY},h=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",h)},_=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",i,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",_),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(d,b,y,C,z)=>(d-b)/(y-b)*(z-C)+C,r=d=>{const b=this.$slider.getBoundingClientRect();let y=e(d,b.left,b.right,this._min,this._max);this._snapClampSetValue(y)},n=d=>{this._setDraggingStyle(!0),r(d.clientX),window.addEventListener("mousemove",i),window.addEventListener("mouseup",o)},i=d=>{r(d.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",o)};let s=!1,l,a;const c=d=>{d.preventDefault(),this._setDraggingStyle(!0),r(d.touches[0].clientX),s=!1},x=d=>{d.touches.length>1||(this._hasScrollBar?(l=d.touches[0].clientX,a=d.touches[0].clientY,s=!0):c(d),window.addEventListener("touchmove",m),window.addEventListener("touchend",p))},m=d=>{if(s){const b=d.touches[0].clientX-l,y=d.touches[0].clientY-a;Math.abs(b)>Math.abs(y)?c(d):(window.removeEventListener("touchmove",m),window.removeEventListener("touchend",p))}else d.preventDefault(),r(d.touches[0].clientX)},p=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",m),window.removeEventListener("touchend",p)},f=this._callOnFinishChange.bind(this),h=400;let _;const g=d=>{if(Math.abs(d.deltaX)<Math.abs(d.deltaY)&&this._hasScrollBar)return;d.preventDefault();const y=this._normalizeMouseWheel(d)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(f,h)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",x,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(e,r="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${r}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:r,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(r=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),r+-n}_arrowKeyMultiplier(e){let r=this._stepExplicit?1:10;return e.shiftKey?r*=10:e.altKey&&(r/=10),r}_snap(e){const r=Math.round(e/this._step)*this._step;return parseFloat(r.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Fa extends H{constructor(e,r,n,i){super(e,r,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(o=>{const s=document.createElement("option");s.innerHTML=o,this.$select.appendChild(s)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),r=this._values.indexOf(e);return this.$select.selectedIndex=r,this.$display.innerHTML=r===-1?e:this._names[r],this}}class wa extends H{constructor(e,r,n){super(e,r,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Ra=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  background-color: var(--background-color);
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean .widget {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "\u2195";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background-color: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background-color: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background-color: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "\u25BE";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "\u25B8";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui input {
  -webkit-tap-highlight-color: transparent;
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input::-webkit-outer-spin-button,
.lil-gui input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.lil-gui input[type=number] {
  -moz-appearance: textfield;
}
.lil-gui input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "\u2713";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  -webkit-tap-highlight-color: transparent;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: 1px solid var(--widget-color);
  text-align: center;
  line-height: calc(var(--widget-height) - 4px);
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
    border-color: var(--hover-color);
  }
  .lil-gui button:focus {
    border-color: var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Ca(t){const e=document.createElement("style");e.innerHTML=t;const r=document.querySelector("head link[rel=stylesheet], head style");r?document.head.insertBefore(e,r):document.head.appendChild(e)}let ar=!1;class Gt{constructor({parent:e,autoPlace:r=e===void 0,container:n,width:i,title:o="Controls",injectStyles:s=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",a=>{(a.code==="Enter"||a.code==="Space")&&(a.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),l&&this.domElement.classList.add("allow-touch-styles"),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),!ar&&s&&(Ca(Ra),ar=!0),n?n.appendChild(this.domElement):r&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation())}add(e,r,n,i,o){if(Object(n)===n)return new Fa(this,e,r,n);const s=e[r];switch(typeof s){case"number":return new Sa(this,e,r,n,i,o);case"boolean":return new ya(this,e,r);case"string":return new wa(this,e,r);case"function":return new st(this,e,r)}console.error(`gui.add failed
	property:`,r,`
	object:`,e,`
	value:`,s)}addColor(e,r,n=1){return new Ta(this,e,r,n)}addFolder(e){return new Gt({parent:this,title:e})}load(e,r=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof st||n._name in e.controllers&&n.load(e.controllers[n._name])}),r&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const r={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof st)){if(n._name in r.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);r.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in r.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);r.folders[n._title]=n.save()}),r}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const r=this.$children.clientHeight;this.$children.style.height=r+"px",this.domElement.classList.add("transition");const n=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(r=>{e=e.concat(r.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(r=>{e=e.concat(r.foldersRecursive())}),e}}var u=document.querySelector("canvas").getContext("webgl2"),Pa=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},xn={exports:{}};(function(t,e){(function(r,n){t.exports=n()})(Pa,function(){var r=function(){function n(f){return s.appendChild(f.dom),f}function i(f){for(var h=0;h<s.children.length;h++)s.children[h].style.display=h===f?"block":"none";o=f}var o=0,s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",s.addEventListener("click",function(f){f.preventDefault(),i(++o%s.children.length)},!1);var l=(performance||Date).now(),a=l,c=0,x=n(new r.Panel("FPS","#0ff","#002")),m=n(new r.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var p=n(new r.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:s,addPanel:n,showPanel:i,begin:function(){l=(performance||Date).now()},end:function(){c++;var f=(performance||Date).now();if(m.update(f-l,200),f>a+1e3&&(x.update(1e3*c/(f-a),100),a=f,c=0,p)){var h=performance.memory;p.update(h.usedJSHeapSize/1048576,h.jsHeapSizeLimit/1048576)}return f},update:function(){l=this.end()},domElement:s,setMode:i}};return r.Panel=function(n,i,o){var s=1/0,l=0,a=Math.round,c=a(window.devicePixelRatio||1),x=80*c,m=48*c,p=3*c,f=2*c,h=3*c,_=15*c,g=74*c,d=30*c,b=document.createElement("canvas");b.width=x,b.height=m,b.style.cssText="width:80px;height:48px";var y=b.getContext("2d");return y.font="bold "+9*c+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=o,y.fillRect(0,0,x,m),y.fillStyle=i,y.fillText(n,p,f),y.fillRect(h,_,g,d),y.fillStyle=o,y.globalAlpha=.9,y.fillRect(h,_,g,d),{dom:b,update:function(C,z){s=Math.min(s,C),l=Math.max(l,C),y.fillStyle=o,y.globalAlpha=1,y.fillRect(0,0,x,_),y.fillStyle=i,y.fillText(a(C)+" "+n+" ("+a(s)+"-"+a(l)+")",p,f),y.drawImage(b,h+c,_,g-c,d,h,_,g-c,d),y.fillRect(h+g-c,_,c,d),y.fillStyle=o,y.globalAlpha=.9,y.fillRect(h+g-c,_,c,a((1-C/z)*d))}}},r})})(xn);var Ia=xn.exports;let K=null;function _n(){K||(K=new Ia,document.body.appendChild(K.dom))}function Da(){!K||(K.dom.remove(),K=null)}function La(){K==null||K.update()}const E={stats:!0,dye:"grid",dyeColor:[0,.2,.54],splatRadius:32,viscosity:0,vorticity:.25,gridResolution:512,solverIterations:50,field:"dye",pause:!1,reset:()=>{u.canvas.width=0,u.canvas.height=0}};E.stats&&_n();const X=new Gt;X.add(E,"stats").onChange(t=>{t?_n():Da()});X.addColor(E,"dyeColor");X.add(E,"splatRadius",8,256,1);X.add(E,"viscosity",0,.005,1e-4);X.add(E,"vorticity",0,10,.1);X.add(E,"gridResolution",32,2048,1).onFinishChange(E.reset);X.add(E,"solverIterations",1,200,1);X.add(E,"field",["dye","velocity","pressure","vorticity"]);X.add(E,"pause");X.add(E,"reset");function yn(t){const e=[{internalFormat:t}],{width:r,height:n}=Ge();return{current:vt(u,e,r,n),get size(){return[this.current.width,this.current.height]},resize(){const{width:i,height:o}=Ge();bt(u,this.current,e,i,o)}}}function kt(t){const e=[{internalFormat:t}],{width:r,height:n}=Ge();return{current:vt(u,e,r,n),next:vt(u,e,r,n),get size(){return[this.current.width,this.current.height]},resize(){const{width:i,height:o}=Ge();bt(u,this.current,e,i,o),bt(u,this.next,e,i,o)},swap(){const i=this.current;this.current=this.next,this.next=i}}}function Ge(){return{width:Math.round(E.gridResolution*Math.min(u.canvas.width/u.canvas.height,1)),height:Math.round(E.gridResolution*Math.min(u.canvas.height/u.canvas.width,1))}}const W={isDown:!1,position:[0,0],movement:[0,0]};u.canvas.addEventListener("mousedown",t=>{W.isDown=!0,vn(t)});u.canvas.addEventListener("mousemove",t=>{!W.isDown||vn(t)});u.canvas.addEventListener("mouseup",()=>{W.isDown=!1});function vn(t){W.position=[t.clientX,u.canvas.height-t.clientY],W.movement=[t.movementX,-t.movementY]}function I(t,...e){return`#version 300 es
${String.raw(t,...e)}`}var Ba=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_scale;
uniform sampler2D u_velocity;
uniform sampler2D u_currentQuantity;

out vec4 outColor;

void main() {
  vec2 position = v_texCoord - u_scale * texture(u_velocity, v_texCoord).xy;
  outColor = texture(u_currentQuantity, position);
}

`,Na=I`

precision highp float;

out vec4 outColor;

void main() {
  outColor = vec4(0);
}

`,$a=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform sampler2D u_velocity;

out float outColor;

void main() {
  vec4 wL = texture(u_velocity, v_texCoord - vec2(1, 0) / u_gridSize);
  vec4 wR = texture(u_velocity, v_texCoord + vec2(1, 0) / u_gridSize);
  vec4 wB = texture(u_velocity, v_texCoord - vec2(0, 1) / u_gridSize);
  vec4 wT = texture(u_velocity, v_texCoord + vec2(0, 1) / u_gridSize);

  outColor = 0.5 * ((wR.x - wL.x) + (wT.y - wB.y));
}

`,za=I`

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_dye;

out vec4 outColor;

void main() {
  outColor = vec4(texture(u_dye, v_texCoord).rgb, 1);
}

`,Ma=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform sampler2D u_pressure;
uniform sampler2D u_velocity;

out vec2 outColor;

void main() {
  float pL = texture(u_pressure, v_texCoord - vec2(1, 0) / u_gridSize).r;
  float pR = texture(u_pressure, v_texCoord + vec2(1, 0) / u_gridSize).r;
  float pB = texture(u_pressure, v_texCoord - vec2(0, 1) / u_gridSize).r;
  float pT = texture(u_pressure, v_texCoord + vec2(0, 1) / u_gridSize).r;

  vec2 velocity = texture(u_velocity, v_texCoord).xy;
  outColor = velocity - 0.5 * vec2(pR - pL, pT - pB);
}

`,Pe=I`

in vec2 a_coord;
in vec2 a_texCoord;

uniform vec2 u_gridSize;

out vec2 v_texCoord;

void main() {
  vec2 scale = (u_gridSize - 2.0) / u_gridSize;
  gl_Position = vec4(a_coord, 0, 1);
  v_texCoord = a_texCoord * scale + 1.0 / u_gridSize;
}

`,ce=I`

in vec2 a_coord;
in vec2 a_texCoord;

uniform vec2 u_gridSize;

out vec2 v_texCoord;

void main() {
  vec2 scale = (u_gridSize - 2.0) / u_gridSize;
  gl_Position = vec4(a_coord * scale, 0, 1);
  v_texCoord = a_texCoord * scale + 1.0 / u_gridSize;
}

`,Ua=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform float u_alpha;
uniform float u_reciprocalBeta;
uniform sampler2D u_x;
uniform sampler2D u_b;

out vec4 outColor;

void main() {
  vec4 xL = texture(u_x, v_texCoord - vec2(1, 0) / u_gridSize);
  vec4 xR = texture(u_x, v_texCoord + vec2(1, 0) / u_gridSize);
  vec4 xB = texture(u_x, v_texCoord - vec2(0, 1) / u_gridSize);
  vec4 xT = texture(u_x, v_texCoord + vec2(0, 1) / u_gridSize);

  vec4 bC = texture(u_b, v_texCoord);

  outColor = (xL + xR + xB + xT + u_alpha * bC) * u_reciprocalBeta;
}

`,Oa=I`

precision highp float;

out vec4 outColor;

void main() {
  vec2 position = gl_PointCoord - vec2(0.5);
  float alpha = smoothstep(0.5 * 0.5, 0.0, dot(position, position));
  outColor = vec4(0, 0, 1, alpha) * 0.2;
}

`,Ga=I`

in vec2 a_coord;

uniform vec2 u_scale;
uniform sampler2D u_velocity;

out vec2 v_coord;

void main() {
  gl_Position = vec4(a_coord, 0, 1);
  gl_PointSize = 4.0;

  vec2 texCoord = a_coord / 2.0 + 0.5;
  v_coord = a_coord + u_scale * texture(u_velocity, texCoord).xy;
}

`,ka=I`

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_pressure;

out vec4 outColor;

const float maxLowPressure = 2.0;
const float minHighPressure = 2.5;

void main() {
  float pressure = texture(u_pressure, v_texCoord).r;
  float pressureTransition = smoothstep(2.0, 2.5, pressure);
  vec3 lowPressure = vec3(0, 0.25, 1) * pressure * (1.0 - pressureTransition);
  vec3 highPressure = vec3(1, 0.05, 0) * (pressure - maxLowPressure) * pressureTransition;
  outColor = vec4(lowPressure + highPressure, 1);
}

`,Va=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_resolution;
uniform vec2 u_mousePosition;
uniform float u_radius;
uniform vec3 u_quantity;
uniform sampler2D u_currentQuantity;

out vec4 outColor;

void main() {
  vec2 diff = v_texCoord * u_resolution - u_mousePosition;
  vec3 quantity = exp(-4.0 * length(diff) / u_radius) * u_quantity;
  vec3 currentQuantity = texture(u_currentQuantity, v_texCoord).rgb;
  outColor = vec4(currentQuantity + quantity, 1);
}

`,Ha=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_scale;
uniform sampler2D u_velocity;

out vec4 outColor;

void main() {
  vec2 velocity = texture(u_velocity, v_texCoord).xy * u_scale;
  outColor = vec4(velocity / 2.0 + 0.5, 0.5, 1);
}

`,Xa=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform sampler2D u_velocity;

out float outColor;

void main() {
  vec4 uL = texture(u_velocity, v_texCoord - vec2(1, 0) / u_gridSize);
  vec4 uR = texture(u_velocity, v_texCoord + vec2(1, 0) / u_gridSize);
  vec4 uB = texture(u_velocity, v_texCoord - vec2(0, 1) / u_gridSize);
  vec4 uT = texture(u_velocity, v_texCoord + vec2(0, 1) / u_gridSize);

  outColor = 0.5 * ((uR.y - uL.y) - (uT.x - uB.x));
}

`,Ya=I`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform float u_scale;
uniform sampler2D u_vorticity;
uniform sampler2D u_velocity;

out vec2 outColor;

const float epsilon = 2.4414e-4; // 2^-12;

void main() {
  float vL = texture(u_vorticity, v_texCoord - vec2(1, 0) / u_gridSize).r;
  float vR = texture(u_vorticity, v_texCoord + vec2(1, 0) / u_gridSize).r;
  float vB = texture(u_vorticity, v_texCoord - vec2(0, 1) / u_gridSize).r;
  float vT = texture(u_vorticity, v_texCoord + vec2(0, 1) / u_gridSize).r;

  float vC = texture(u_vorticity, v_texCoord).r;

  vec2 force = 0.5 * vec2(abs(vT) - abs(vB), abs(vR) - abs(vL));

  // Safe normalize
  float magnitudeSquared = max(epsilon, dot(force, force));
  force *= inversesqrt(magnitudeSquared);

  force *= u_scale * vC * vec2(1, -1);

  vec2 velocity = texture(u_velocity, v_texCoord).xy;

  outColor = velocity + force;
}

`,Wa=I`

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_vorticity;

out vec4 outColor;

void main() {
  float vorticity = texture(u_vorticity, v_texCoord).r;
  outColor = vec4(vec2(-vorticity), vorticity, 1);
}

`;_a(u);const lr=$(u,[Pe,Na]),ge=$(u,[ce,Ba]),Ae=$(u,[ce,Va]),at=$(u,[ce,Xa]),lt=$(u,[ce,Ya]),Q=$(u,[ce,Ua]),ct=$(u,[ce,$a]),ut=$(u,[ce,Ma]),Ee=$(u,[Ga,Oa],{transformFeedbackVaryings:["v_coord"]}),Ka=$(u,[Pe,za]),ja=$(u,[Pe,Ha]),Ja=$(u,[Pe,ka]),qa=$(u,[Pe,Wa]),Vt={a_coord:[]};pn(u.canvas);for(let t=0;t<1e6;t++){const e=Math.random()*.1,r=Math.random()*Math.PI*2,n=Math.cos(r)*e*(u.canvas.height/u.canvas.width),i=.85+Math.sin(r)*e;Vt.a_coord.push(n,i)}let me=Pt(u,Vt),ke=Pt(u,Vt),cr=an(u,Ee,rt(tt({},me),{attribs:{v_coord:me.attribs.a_coord}})),dt=an(u,Ee,rt(tt({},ke),{attribs:{v_coord:ke.attribs.a_coord}}));const Qa={a_coord:[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1],a_texCoord:[0,0,1,0,0,1,0,1,1,0,1,1]},F=Pt(u,Qa),U=kt(u.RGBA16F),A=kt(u.RG16F),V=kt(u.R16F),pe=yn(u.R16F),At=yn(u.R16F);let ur=Date.now();requestAnimationFrame(bn);function bn(t){La(),pn(u.canvas)&&(U.resize(),A.resize(),V.resize(),pe.resize(),At.resize());const e=(t-ur)*.001;ur=t,Za(e),E.pause||(el(e),tl(e),rl(e),nl(),il()),E.field==="dye"?E.dye==="particles"?ol(e):sl():E.field==="velocity"?al():E.field==="pressure"?ll():cl(),requestAnimationFrame(bn)}function Za(t){if(!W.isDown)return;const e={u_resolution:[u.canvas.width,u.canvas.height],u_mousePosition:W.position,u_radius:E.splatRadius};u.useProgram(Ae.program),O(u,Ae,F),R(Ae,e);const r={u_gridSize:A.size,u_quantity:[A.size[0]*(W.movement[0]/u.canvas.width/t),A.size[1]*(W.movement[1]/u.canvas.height/t),0],u_currentQuantity:A.current.attachments[0]};N(u,A.next),R(Ae,r),B(u,F);const n={u_gridSize:U.size,u_quantity:E.dyeColor,u_currentQuantity:U.current.attachments[0]};N(u,U.next),R(Ae,n),B(u,F),A.swap(),U.swap()}function el(t){const e={u_scale:[t/A.size[0],t/A.size[1]],u_velocity:A.current.attachments[0]};u.useProgram(ge.program),O(u,ge,F),R(ge,e);const r={u_gridSize:A.size,u_currentQuantity:A.current.attachments[0]};N(u,A.next),R(ge,r),B(u,F);const n={u_gridSize:U.size,u_currentQuantity:U.current.attachments[0]};N(u,U.next),R(ge,n),B(u,F),A.swap(),U.swap()}function tl(t){N(u,pe.current);const e={u_gridSize:A.size,u_velocity:A.current.attachments[0]};u.useProgram(at.program),O(u,at,F),R(at,e),B(u,F),N(u,A.next);const r={u_gridSize:pe.size,u_scale:E.vorticity*t,u_vorticity:pe.current.attachments[0],u_velocity:A.current.attachments[0]};u.useProgram(lt.program),O(u,lt,F),R(lt,r),B(u,F),A.swap()}function rl(t){if(E.viscosity===0)return;const e=1/(E.viscosity*t),r={u_gridSize:A.size,u_alpha:e,u_reciprocalBeta:1/(4+e)};u.useProgram(Q.program),O(u,Q,F),R(Q,r);for(let n=0;n<E.solverIterations;n++){const i={u_x:A.current.attachments[0],u_b:A.current.attachments[0]};N(u,A.next),R(Q,i),B(u,F),A.swap()}}function nl(){N(u,At.current);const t={u_gridSize:A.size,u_velocity:A.current.attachments[0]};u.useProgram(ct.program),O(u,ct,F),R(ct,t),B(u,F),N(u,V.current),u.useProgram(lr.program),O(u,lr,F),B(u,F);const e={u_gridSize:V.size,u_alpha:-1,u_reciprocalBeta:1/4};u.useProgram(Q.program),O(u,Q,F),R(Q,e);for(let r=0;r<E.solverIterations;r++){const n={u_x:V.current.attachments[0],u_b:At.current.attachments[0]};N(u,V.next),R(Q,n),B(u,F),V.swap()}}function il(){N(u,A.next);const t={u_gridSize:V.size,u_pressure:V.current.attachments[0],u_velocity:A.current.attachments[0]};u.useProgram(ut.program),O(u,ut,F),R(ut,t),B(u,F),A.swap()}function ol(t){N(u,null);const e={u_scale:[2*(t/A.size[0]),2*(t/A.size[1])],u_velocity:A.current.attachments[0]};u.enable(u.BLEND),u.blendFunc(u.SRC_ALPHA,u.ONE),u.useProgram(Ee.program),O(u,Ee,me),R(Ee,e),u.bindTransformFeedback(u.TRANSFORM_FEEDBACK,dt),u.beginTransformFeedback(u.POINTS),B(u,me,u.POINTS),u.endTransformFeedback(),u.bindTransformFeedback(u.TRANSFORM_FEEDBACK,null),u.disable(u.BLEND);const r=me;me=ke,ke=r;const n=cr;cr=dt,dt=n}function sl(){const t={u_gridSize:U.size,u_dye:U.current.attachments[0]};et(Ka,t)}function al(){const t={u_gridSize:A.size,u_scale:[8/E.gridResolution,8/E.gridResolution],u_velocity:A.current.attachments[0]};et(ja,t)}function ll(){const t={u_gridSize:V.size,u_pressure:V.current.attachments[0]};et(Ja,t)}function cl(){const t={u_gridSize:pe.size,u_vorticity:pe.current.attachments[0]};et(qa,t)}function et(t,e){N(u,null),u.useProgram(t.program),O(u,t,F),R(t,e),B(u,F)}
