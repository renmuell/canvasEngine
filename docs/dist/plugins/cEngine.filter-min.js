!function t(e,n,r){function a(i,u){if(!n[i]){if(!e[i]){var f="function"==typeof require&&require;if(!u&&f)return f(i,!0);if(o)return o(i,!0);throw new Error("Cannot find module '"+i+"'")}var s=n[i]={exports:{}};e[i][0].call(s.exports,function(t){var n=e[i][1][t];return a(n?n:t)},s,s.exports,t,e,n,r)}return n[i].exports}for(var o="function"==typeof require&&require,i=0;i<r.length;i++)a(r[i]);return a}({1:[function(t,e,n){"use strict";!function(t){t.extend("filter",{create:function(t){var e={cEnginePlugin:{name:"filter",version:"0.0.3"},list:t.filters||[],postStep:function(t,n,r){if(0!=e.list.length){var a,o=!0;for(a=0;a<e.list.length;a++)if("undefined"==typeof e.list[a].run||e.list[a].run){o=!1;break}if(!o){var i=e.getImageData(t,n,r);for(a=0;a<e.list.length;a++)("undefined"==typeof e.list[a].run||e.list[a].run)&&(e.list[a].Shader?i=e.Shader(i,e.list[a].Shader,e.list[a].factor):e.list[a].CustomFilter?i=e.list[a].CustomFilter(i):e.list[a].Convolver&&(i=e.Convolve(t,i,n,e.list[a].Convolver.data,e.list[a].Convolver.divisor,e.list[a].Convolver.offset)));e.setImageData(t,i)}}},Shader:function(t,e,n){for(var r=t.data,a=[],o=r.length,i=0;i<o;i+=4)a=e.call(this,r[i],r[i+1],r[i+2],r[i+3],n,i,o),r[i]=a[0],r[i+1]=a[1],r[i+2]=a[2],r[i+3]=a[3];return t},Convolve:function(t,e,n,r,a,o){var i=[].concat(r[0],r[1],r[2]);a||(a=i.reduce(function(t,e){return t+e})||1);for(var u=e.data,f=t.createImageData(e),s=f.data,l=s.length,c=0,d=n,g=0;g<l;g++)if((g+1)%4!==0){c=0;for(var m=[u[g-4*d-4]||u[g],u[g-4*d]||u[g],u[g-4*d+4]||u[g],u[g-4]||u[g],u[g],u[g+4]||u[g],u[g+4*d-4]||u[g],u[g+4*d]||u[g],u[g+4*d+4]||u[g]],v=0;v<9;v++)c+=m[v]*i[v];c/=a,o&&(c+=o),s[g]=c}else s[g]=u[g];return f},getImageData:function(t,e,n){return t.getImageData(0,0,e,n)},setImageData:function(t,e){return t.putImageData(e,0,0)}};return e},Shader:{noise2:function(t,e,n,r){return 0!=t&&0!=e&&0!=n&&0!=r&&(t=255*Math.random(),e=255*Math.random(),n=255*Math.random()),[t,e,n,r]},rgbToBrg:function(t,e,n){return[n,t,e,255]},rgbToRbg:function(t,e,n){return[t,n,e,255]},rgbToGbr:function(t,e,n){return[e,n,t,255]},rgbToGrB:function(t,e,n){return[e,t,n,255]},rgbToBgr:function(t,e,n){return[n,e,t,255]},transparent:function(t,e,n,r,a){return[t,e,n,a]},gradient:function(t,e,n,r,a,o,i){return[t,e,n,a+255*(i-o)/i]},greyscale:function(t,e,n){var r=.3*t+.59*e+.11*n;return[r,r,r,255]},sepia:function(t,e,n){var r=.3*t+.59*e+.11*n;return[r+100,r+50,r,255]},sepia2:function(t,e,n){return[(.393*t+.769*e+.189*n)/1.351,(.349*t+.686*e+.168*n)/1.203,(.272*t+.534*e+.131*n)/2.14,255]},gammaCorrect:function(t,e,n,r,a){return[255*Math.pow(t/255,a),255*Math.pow(e/255,a),255*Math.pow(n/255,a),255]},negative:function(t,e,n){return[255-t,255-e,255-n,255]},noGreen:function(t,e,n){return[t,0,n,255]},maxGreen:function(t,e,n){return[t,255,n,255]},onlyGreen:function(t,e){return[0,e,0,255]},maxAllButGreen:function(t,e){return[255,e,255,255]},brightness:function(t,e,n,r,a){return[t+a,e+a,n+a,255]},noise:function(t,e,n,r,a){if(0!=t&&0!=e&&0!=n&&0!=r){var o=(.5-Math.random())*a;return[t+o,e+o,n+o,255]}return[t,e,n,r]},randomClear:function(t,e,n,r,a){return 0!=t&&0!=e&&0!=n&&0!=r&&Math.random()<a&&(t=e=n=r=void 0),[t,e,n,r]}},Convolver:{smean_removal_sharpen:{name:"mean removal (sharpen)",data:[[-1,-1,-1],[-1,9,-1],[-1,-1,-1]]},sharpen:{name:"sharpen",data:[[0,-2,0],[-2,11,-2],[0,-2,0]]},blur:{name:"blur",data:[[1,2,1],[2,4,2],[1,2,1]]},emboss:{name:"emboss",data:[[2,0,0],[0,-1,0],[0,0,-1]],offset:127},emboss_subtle:{name:"emboss subtle",data:[[1,1,-1],[1,3,-1],[1,-1,-1]]},edge_detect:{name:"edge detect",data:[[1,1,1],[1,-7,1],[1,1,1]]},edge_detect_2:{name:"edge detect 2",data:[[-5,0,0],[0,0,0],[0,0,5]]}}})}(cEngine)},{}]},{},[1]);
//# sourceMappingURL=cEngine.filter-min.js.map