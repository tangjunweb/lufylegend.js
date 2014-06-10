/**
* lufylegend
* @version 1.9.0
* @Explain lufylegend是一个HTML5开源引擎，利用它可以快速方便的进行HTML5的开发
* @author lufy(lufy_legend)
* @blog http://blog.csdn.net/lufy_Legend
* @email lufy.legend@gmail.com
* @homepage http://lufylegend.com/lufylegend
* @github https://github.com/lufylegend/lufylegend.js
*/
var OS_PC = "pc",
OS_IPHONE = "iPhone",
OS_IPOD = "iPod",
OS_IPAD = "iPad",
OS_ANDROID = "Android",
STR_ZERO = "0",
NONE = "none",
SUPER = "super",
UNDEFINED = "undefined",
LANDSCAPE = "landscape",
PORTRAIT = "portrait",
LAjax,LTweenLite,LLoadManage,p,mouseX,mouseY;
function LEvent(type){
	this.eventType = type;
};
LEvent.INIT = "init";
LEvent.COMPLETE = "complete";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.WINDOW_RESIZE = "resize";
LEvent.SOUND_COMPLETE = "sound_complete";
LEvent.END_CONTACT = "endContact";
LEvent.PRE_SOLVE = "preSolve";
LEvent.POST_SOLVE = "postSolve";
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;
LEvent.addEventListener = function (n, t, f,b){
	if(b==null)b=false;
	if(n.addEventListener){
		n.addEventListener(t, f, b);
	}else if(n.attachEvent){
		n["e" + t + f] = f;
		n[t + f] = function(){n["e" + t + f]();};
		n.attachEvent("on" + t, n[t + f]);
	}
};
LEvent.removeEventListener = function (n, t, f,b){
	if(b==null)b=false;
	if(n.removeEventListener){
		n.removeEventListener(t, f, b);
	}else if(n.detachEvent){
		n["e" + t + f] = f;
		n[t + f] = function(){n["e" + t + f]();};
		n.detachEvent("on" + t, n[t + f]);
	}
};
var LMouseEvent = function (){throw "LMouseEvent cannot be instantiated";};
LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OVER = "mouseover";
LMouseEvent.MOUSE_OUT = "mouseout";
LMouseEvent.DOUBLE_CLICK = "dblclick";
var LMultitouchInputMode = {"NONE":"none","GESTURE":"gesture","TOUCH_POINT":"touchPoint"};
var LMultitouch = function (){throw "LMultitouch cannot be instantiated";};
LMultitouch.inputMode = "none";
LMultitouch.touchs = [];
var LTextEvent = function (){throw "LTextEvent cannot be instantiated";};
LTextEvent.TEXT_INPUT = "textInput";
LTextEvent.WIND_COMPLETE = "wind_complete";
var LFocusEvent = function (){throw "LFocusEvent cannot be instantiated";};
LFocusEvent.FOCUS_IN = "focusIn";
LFocusEvent.FOCUS_OUT = "focusOut";
function $LMouseEventContainer(){
	var s = this;
	s.dispatchAllEvent = false;
	s.mouseDownContainer = [];
	s.mouseUpContainer = [];
	s.mouseMoveContainer = [];
	s.mouseOverContainer = [];
	s.mouseOutContainer = [];
	s.mouseDblContainer = [];
	s.textFieldInputContainer = [];
};
$LMouseEventContainer.prototype = {
	pushInputBox:function(d){
		var s  = this,c = s.textFieldInputContainer;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex)return;
		}
		s.textFieldInputContainer.push(d);
	}
	,removeInputBox:function(d){
		var s  = this,c = s.textFieldInputContainer;
		for(var i=0,l=c.length;i<l;i++){
			if(d.objectIndex == c[i].objectIndex){
				s.textFieldInputContainer.splice(i,1);
				break;
			}
		}
	}
	,addEvent:function(o,list,f){
		var s = this;
		list.push({container:o,listener:f});
	}
	,removeEvent:function(o,list,f){
		var s = this;
		for(var i=0,l=list.length;i<l;i++){
			if(list[i].container.objectIndex === o.objectIndex && (!f || list[i].listener == f)){
				list.splice(i,1);
				break;
			}
		}
	}
	,addMouseDownEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseDownContainer,f);
	}
	,addMouseUpEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseUpContainer,f);
	}
	,addMouseMoveEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseMoveContainer,f);
	}
	,addMouseOverEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseOverContainer,f);
	}
	,addMouseOutEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseOutContainer,f);
	}
	,addMouseDblEvent:function(o,f){
		var s = this;
		s.addEvent(o,s.mouseDblContainer,f);
	}
	,addMouseEvent:function(o,t,f){
		var s = this;
		if(t == LMouseEvent.MOUSE_DOWN){
			s.addMouseDownEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_UP){
			s.addMouseUpEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OVER){
			s.addMouseOverEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OUT){
			s.addMouseOutEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_MOVE){
			s.addMouseMoveEvent(o,f);
		}else{
			s.addMouseDblEvent(o,f);
		}
	}
	,hasEvent:function(o,list){
		for(var i=0,l=list.length;i<l;i++){
			if(list[i].container.objectIndex === o.objectIndex)return true;
		}
		return false;
	}
	,removeMouseDownEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseDownContainer,f);
	}
	,removeMouseUpEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseUpContainer,f);
	}
	,removeMouseMoveEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseMoveContainer,f);
	}
	,removeMouseOverEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseOverContainer,f);
	}
	,removeMouseOutEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseOutContainer,f);
	}
	,removeMouseDblEvent:function(o,f){
		var s = this;
		s.removeEvent(o,s.mouseDblContainer,f);
	}
	,removeMouseEvent:function(o,t,f){
		var s = this;
		if(t == LMouseEvent.MOUSE_DOWN){
			s.removeMouseDownEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_UP){
			s.removeMouseUpEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OVER){
			s.removeMouseOverEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_OUT){
			s.removeMouseOutEvent(o,f);
		}else if(t == LMouseEvent.MOUSE_MOVE){
			s.removeMouseMoveEvent(o,f);
		}else{
			s.removeMouseDblEvent(o,f);
		}
	}
	,dispatchMouseEvent:function(event,type){
		var s = this;
		if(type == LMouseEvent.MOUSE_DOWN){
			s.dispatchEvent(event,s.mouseDownContainer,LMouseEvent.MOUSE_DOWN);
			s.dispatchEvent(event,s.textFieldInputContainer);
		}else if(type == LMouseEvent.MOUSE_UP){
			s.dispatchEvent(event,s.mouseUpContainer,LMouseEvent.MOUSE_UP);
		}else if(type == LMouseEvent.DOUBLE_CLICK){
			s.dispatchEvent(event,s.mouseDblContainer,LMouseEvent.DOUBLE_CLICK);
		}else{
			s.dispatchEvent(event,s.mouseOutContainer,LMouseEvent.MOUSE_OUT);
			s.dispatchEvent(event,s.mouseOverContainer,LMouseEvent.MOUSE_OVER);
			s.dispatchEvent(event,s.mouseMoveContainer,LMouseEvent.MOUSE_MOVE);
		}
	}
    ,getRootParams:function(s){
		var p = s.parent,r = {x:0,y:0,scaleX:1,scaleY:1};
		while(p != "root"){
			r.x *= p.scaleX;
			r.y *= p.scaleY;
			r.x += p.x;
			r.y += p.y;
			r.scaleX *= p.scaleX;
			r.scaleY *= p.scaleY;
			p = p.parent;
		}
		return r;
    }
    ,_mouseEnabled:function(sp){
    	var self = this;
    	if(!sp || !sp.parent || sp.parent == "root"){
    		return false;
    	}
    	if(!sp.visible || (typeof sp.mouseEnabled != UNDEFINED && !sp.mouseEnabled)){
    		return false;
    	}
    	var p = sp.parent;
		while(p != "root"){
			if(!p.mouseEnabled || !p.mouseChildren)return false;
			p = p.parent;
			if(!p)return false;
		}
		return true;
    }
	,dispatchEvent:function(event,list,type){
		var self = this,sp,co,st=[],o,i,l;
		for(i=0,l=list.length;i<l;i++){
			sp = list[i].container || list[i];
			if(!self._mouseEnabled(sp))continue;
            co = self.getRootParams(sp);
            if(!type && sp.mouseEvent){
				sp.mouseEvent(event,LMouseEvent.MOUSE_DOWN,co);
            	continue;
            }
            if(sp.ismouseon(event,co)){
            	if(type == LMouseEvent.MOUSE_OUT){
            		continue;
            	}
            	if(type==LMouseEvent.MOUSE_OVER){
            		if(sp.ll_mousein){
            			continue;
            		}
            	}
            	if(type != LMouseEvent.MOUSE_UP){
            		sp.ll_mousein = true;
            	}
            	st.push({sp:sp,co:co,listener:list[i].listener});
            }else{
            	if(type != LMouseEvent.MOUSE_OUT && type != LMouseEvent.MOUSE_OVER){
            		continue;
            	}
            	if(!sp.ll_mousein){
            		continue;
            	}
            	sp.ll_mousein = false;
            	st.push({sp:sp,co:co,listener:list[i].listener});
            }
		}
		if(st.length == 0)return;
		if(st.length > 1){
			st = st.sort(self._sort);
		}
		l = self.dispatchAllEvent?st.length:1;
		for(i=0;i<l&&i<st.length;i++){
			o = st[i];
			event.currentTarget = event.clickTarget = o.sp;
			if (!event.target) {
				event.target = o.sp;
			}
			event.event_type = type;
			event.selfX = (event.offsetX - o.co.x - o.sp.x)/(o.co.scaleX*o.sp.scaleX);
			event.selfY = (event.offsetY - o.co.y - o.sp.y)/(o.co.scaleY*o.sp.scaleY);
			o.listener(event);
			if(l==1 && i<st.length-1 && o.sp.objectIndex == st[i+1].sp.objectIndex){
				st.splice(i,1);
				i--;
			}
		}
	}
	,set:function(t,v){
		LGlobal.mouseEventContainer[t] = v;
	}
	,_sort:function(a,b){
		var s = LMouseEventContainer,o1,o2;
		var al=s._getSort(a.sp),bl=s._getSort(b.sp);
		for(var i=0,l1=al.length,l2=bl.length;i<l1 && i<l2;i++){
			o1 = al[i],o2 = bl[i];
			if(o1.objectIndex == o2.objectIndex){
				continue;
			}
			return o2.parent.getChildIndex(o2) - o1.parent.getChildIndex(o1);
		}
		return bl.length - al.length;
	}
	,_getSort:function(layer){
		var p = layer.parent,list=[layer];
		while(p != "root"){
	        list.unshift(p);
			p = p.parent;
		}
		return list;
	}
};
var LMouseEventContainer = new $LMouseEventContainer();
var LKeyboardEvent = function (){throw "LKeyboardEvent cannot be instantiated";};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PRESS = "keypress";
var LAccelerometerEvent = function (){throw "LAccelerometerEvent cannot be instantiated";};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";
var LMath = {
	trim:function (s){
		return s.replace(/(^\s*)|(\s*$)|(\n)/g, "");
	},
	leftTrim:function (s){
		return s.replace(/(^\s*)|(^\n)/g, "");
	},
	rightTrim:function (s){
		return s.replace(/(\s*$)|(\n$)/g, "");
	},
	numberFormat:function (s,l){
		if (!l || l < 1) {
			l = 3;
		}
		s=String(s).split(".");
		s[0]=s[0].replace(new RegExp('(\\d)(?=(\\d{'+l+'})+$)','ig'),"$1,");
		return s.join(".");
	},
	isString:function (s){
		var p=/^([a-z]|[A-Z])+$/;
		return p.exec(s); 
	},
	isNumber:function (s){
		var p=/^\d+\.\d+$/;
		return p.exec(s); 
	},
	isInt:function (s){
		var p=/^\d+$/;
		return p.exec(s); 
	}
};
function LStageAlign(){throw "LStageAlign cannot be instantiated";}
LStageAlign.TOP = "T";
LStageAlign.BOTTOM = "B";
LStageAlign.LEFT = "L";
LStageAlign.RIGHT = "Re";
LStageAlign.TOP_LEFT = "TL";
LStageAlign.TOP_RIGHT = "TR";
LStageAlign.TOP_MIDDLE = "TM";
LStageAlign.BOTTOM_LEFT = "BL";
LStageAlign.BOTTOM_RIGHT = "BR";
LStageAlign.BOTTOM_MIDDLE = "BM";
LStageAlign.MIDDLE = "M";
function LStageScaleMode () {throw "LStageScaleMode cannot be instantiated";}
LStageScaleMode.EXACT_FIT = "exactFit";
LStageScaleMode.SHOW_ALL = "showAll";
LStageScaleMode.NO_BORDER = "noBorder";
LStageScaleMode.NO_SCALE = "noScale";
var LGlobal = function (){throw "LGlobal cannot be instantiated";};
LGlobal.FULL_SCREEN="full_screen";
LGlobal.type = "LGlobal";
LGlobal.traceDebug = false;
LGlobal.aspectRatio = NONE;
LGlobal.script = null;
LGlobal.stage = null;
LGlobal.canvas = null;
LGlobal.width = 0;
LGlobal.height = 0;
LGlobal.box2d = null;
LGlobal.speed = 50;
LGlobal.IS_MOUSE_DOWN = false;
LGlobal.objectIndex = 0;
LGlobal.preventDefault = true;
LGlobal.childList = new Array();
LGlobal.dragList = new Array();
LGlobal.stageScale = "noScale";
LGlobal.align = "M";
LGlobal.canTouch = false;
LGlobal.os = OS_PC;
LGlobal.ios = false;
LGlobal.android = false;
LGlobal.android_new = false;
LGlobal.backgroundColor = null;
LGlobal.destroy = true;
LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
LGlobal.startTimer = 0;
LGlobal.mouseEventContainer = {};
LGlobal.keepClear = true;
LGlobal.top = 0;
LGlobal.left = 0;
LGlobal.window = window;
(function(n){
	LGlobal.isFirefox = (n.toLowerCase().indexOf('firefox') >= 0);
	if (n.indexOf(OS_IPHONE) > 0) {
		LGlobal.os = OS_IPHONE;
		LGlobal.canTouch = true;
		LGlobal.ios = true;
	}else if (n.indexOf(OS_IPOD) > 0) {
		LGlobal.os = OS_IPOD;
		LGlobal.canTouch = true;
		LGlobal.ios = true;
	}else if (n.indexOf(OS_IPAD) > 0) {
		LGlobal.os = OS_IPAD;
		LGlobal.ios = true;
		LGlobal.canTouch = true;
	}else if (n.indexOf(OS_ANDROID) > 0) {
		LGlobal.os = OS_ANDROID;
		LGlobal.canTouch = true;
		LGlobal.android = true;
		var i = n.indexOf(OS_ANDROID);
		if(parseInt(n.substr(i+8,1)) > 3){
			LGlobal.android_new = true;
		}
	}
})(navigator.userAgent);
LGlobal.setDebug = function (v){
	LGlobal.traceDebug = v; 
};
LGlobal.setCanvas = function (id,w,h){
	LGlobal.id = id;
	LGlobal.object = document.getElementById(id);
	LGlobal.object.innerHTML='<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">'+
	'<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:'+w+'px;height:'+h+'px;">'+
	'<div id="noCanvas">'+
	"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>"+ 
	'</div>'+  
	'</canvas></div>'+
	'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">'+
	'<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>'+
	'<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />'+
	'<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
	LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
	LGlobal._canvas=document.createElement("canvas");
	LGlobal._context=LGlobal._canvas.getContext("2d");
	if(LGlobal._context){
		LGlobal.canvasObj.innerHTML="";
	}
	LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
	LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
	LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
	LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
	LGlobal.inputTextField = null;
	if(w){LGlobal.canvasObj.width = w;}
	if(h){LGlobal.canvasObj.height = h;}
	LGlobal.width = LGlobal.canvasObj.width;
	LGlobal.height = LGlobal.canvasObj.height;
	LGlobal.canvasStyleWidth = LGlobal.width;
	LGlobal.canvasStyleHeight = LGlobal.height;
	LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
	LGlobal.offsetX = 0;
	LGlobal.offsetY = 0;
	LGlobal.stage = new LSprite();
	LGlobal.stage.parent = "root";
	LGlobal.childList.push(LGlobal.stage);
	LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
	LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
	LGlobal.stage.addEventListener = function(type,listener){
		if(type == LEvent.WINDOW_RESIZE){
			LGlobal.stage.onresizeListener = listener;
			LGlobal.stage.onresize = function(e){
				LGlobal.stage.onresizeEvent = e;
			};
			LEvent.addEventListener(LGlobal.window,type,LGlobal.stage.onresize);
		}else if(type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PASS){
			LEvent.addEventListener(LGlobal.window,type,listener);
		}else{
			LGlobal.stage.baseAddEvent(type,listener);
		}
	};
	LGlobal.stage.removeEventListener = function(type,listener){
		if(type == LEvent.WINDOW_RESIZE){
			LEvent.removeEventListener(LGlobal.window,LEvent.WINDOW_RESIZE,LGlobal.stage.onresize);
			delete LGlobal.stage.onresize;
			delete LGlobal.stage.onresizeListener;
		}else if(type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PASS){
			LEvent.removeEventListener(LGlobal.window,type,listener);
		}else{
			LGlobal.stage.baseRemoveEvent(type,listener);
		}
	};
	if(LSystem.sv == LStage.FULL_SCREEN){LGlobal.resize();}
	if(LGlobal.canTouch){
		LGlobal.ll_clicks = 0;
		LGlobal.ll_prev_clickTime = 0;
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField._ll_getValue();
			}
			var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left)+parseInt(LGlobal.canvasObj.style.marginLeft),
			canvasY = parseInt(STR_ZERO+LGlobal.object.style.top)+parseInt(LGlobal.canvasObj.style.marginTop),eve,k,i,eveIndex;
			if(LMultitouch.inputMode == LMultitouchInputMode.NONE){
				eveIndex = 0;
			}else if(LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT){
				eveIndex = event.touches.length - 1;
			}
			eve = {offsetX:(event.touches[eveIndex].pageX - canvasX)
			,offsetY:(event.touches[eveIndex].pageY - canvasY)
			,touchPointID:event.touches[eveIndex].identifier};
			eve.offsetX = LGlobal.scaleX(eve.offsetX);
			eve.offsetY = LGlobal.scaleY(eve.offsetY);
			mouseX = LGlobal.offsetX = eve.offsetX;
			mouseY = LGlobal.offsetY = eve.offsetY;
			LMultitouch.touchs["touch"+eve.touchPointID] = eve;
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
			LGlobal.buttonStatusEvent = eve;
			var date = new Date();
			var clickTime = date.getTime();
			LGlobal.ll_clicks = (clickTime <= (LGlobal.ll_prev_clickTime + 500)) ? (LGlobal.ll_clicks + 1) : 1;
			LGlobal.ll_prev_clickTime = clickTime;
			if(LGlobal.ll_clicks === 2){
				LGlobal.mouseEvent(eve,LMouseEvent.DOUBLE_CLICK);
				LGlobal.ll_clicks = 0;
			}
			LGlobal.IS_MOUSE_DOWN = true;
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start){
				LGlobal.mouseJoint_start(eve);
			}
			LGlobal.touchHandler(event);
		});
		LEvent.addEventListener(document,LMouseEvent.TOUCH_END,function(event){
			var e,eve,k,i,l,h;
			if(LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT){
				for(k in LMultitouch.touchs){
					e = LMultitouch.touchs[k];
					h = false;
					for(i=0,l=event.touches.length;i<l;i++){
						if(event.touches[i].identifier == e.touchPointID){
							h = true;
							break;
						}
					}
					if(!h){
						eve = e;
						delete LMultitouch.touchs[k];
						break;
					}
				}
			}
			if(!eve){
				eve = {offsetX:LGlobal.offsetX,offsetY:LGlobal.offsetY};
			}
			LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_UP);
			LGlobal.touchHandler(event);
			LGlobal.IS_MOUSE_DOWN = false;
			LGlobal.buttonStatusEvent = null;
			if(LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
				LGlobal.box2d.mouseJoint = null;
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE,function(e){
			var cX = parseInt(STR_ZERO+LGlobal.object.style.left)+parseInt(LGlobal.canvasObj.style.marginLeft),
			cY = parseInt(STR_ZERO+LGlobal.object.style.top)+parseInt(LGlobal.canvasObj.style.marginTop),
			eve,l,ll=e.touches.length;
			if(LMultitouch.inputMode == LMultitouchInputMode.NONE){
				ll = 1;
			}
			for(i=0,l=e.touches.length;i<l && i<ll;i++){
				eve = {offsetX:(e.touches[i].pageX - cX),offsetY:(e.touches[i].pageY - cY),touchPointID:e.touches[i].identifier};
				eve.offsetX = LGlobal.scaleX(eve.offsetX);
				eve.offsetY = LGlobal.scaleY(eve.offsetY);
				mouseX = LGlobal.offsetX = eve.offsetX;
				mouseY = LGlobal.offsetY = eve.offsetY;
				if(LMultitouch.touchs["touch"+eve.touchPointID] && 
					LMultitouch.touchs["touch"+eve.touchPointID].offsetX == eve.offsetX && 
					LMultitouch.touchs["touch"+eve.touchPointID].offsetY == eve.offsetY){
					continue;	
				}
				LGlobal.buttonStatusEvent = eve;
				LMultitouch.touchs["touch"+eve.touchPointID] = eve;
				LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
			}
			LGlobal.touchHandler(e);
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_move){
				LGlobal.mouseJoint_move(eve);
			}
		});
	}else{
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.DOUBLE_CLICK,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {button:e.button};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.DOUBLE_CLICK);
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			if(LGlobal.inputBox.style.display != NONE){
				LGlobal.inputTextField._ll_getValue();
			}
			var event = {button:e.button};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_DOWN);
			LGlobal.IS_MOUSE_DOWN = true;
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start){
				LGlobal.mouseJoint_start(e);
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.buttonStatusEvent = event;
			mouseX = LGlobal.offsetX = event.offsetX;
			mouseY = LGlobal.offsetY = event.offsetY;
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_MOVE);
			if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(e.offsetX / LGlobal.box2d.drawScale, e.offsetY / LGlobal.box2d.drawScale));
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {button:e.button};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_UP);
			LGlobal.IS_MOUSE_DOWN = false;
			if(LGlobal.box2d != null && LGlobal.box2d.mouseJoint){
				LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
				LGlobal.box2d.mouseJoint = null;
			}
		});
		LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(e){
			if(e.offsetX == null && e.layerX != null){
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
			var event = {};
			event.offsetX = LGlobal.scaleX(e.offsetX);
			event.offsetY = LGlobal.scaleY(e.offsetY);
			LGlobal.mouseEvent(event,LMouseEvent.MOUSE_OUT);
			LGlobal.IS_MOUSE_DOWN = false;
		});
	}
} ;
LGlobal.touchHandler = function(e){
	e.stopPropagation();
	if(LGlobal.preventDefault)e.preventDefault();
	if(e.stopImmediatePropagation){
		e.stopImmediatePropagation();
	}
	return e;
};
LGlobal.mouseEvent = function(e,t){
	if(t == LMouseEvent.MOUSE_MOVE){
		LGlobal.dragHandler(e);
	}
	if(LGlobal.mouseEventContainer[t]){
		LMouseEventContainer.dispatchMouseEvent(e,t);
		return;
	}
	for(var k = LGlobal.childList.length - 1; k >= 0; k--) {
		if(LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e,t)){
			break;
		}
	}
};
LGlobal.dragHandler = function(e){
	var i,s,c,d = LGlobal.dragList;
	for(i = d.length - 1; i >= 0; i--) {
		s = d[i];
		if(LGlobal.canTouch && s.ll_touchPointID != e.touchPointID)continue;
		c = s.getAbsoluteScale();
		s.x = s.ll_dragStartX + (e.offsetX - s.ll_dragMX)*s.scaleX/c.scaleX;
		s.y = s.ll_dragStartY + (e.offsetY - s.ll_dragMY)*s.scaleY/c.scaleY;
		break;
	}
};
LGlobal.horizontalError = function(){
	var b = new LSprite(),c='#cccccc',d='#000000';
	b.graphics.drawRoundRect(4,c,[5,5,70,100,5]);
	b.graphics.drawRect(4,c,[30,15,20,10]);
	b.graphics.drawRoundRect(4,d,[125,25,100,70,5]);
	b.graphics.drawRect(4,d,[200,50,10,20]);
	b.graphics.drawRect(4,d,[80,50,20,20]);
	b.graphics.drawVertices(4,d,[[100,40],[120,60],[100,80]]);
	addChild(b);
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};
LGlobal.verticalError = function(){
	var b = new LSprite(),c='#cccccc',d='#000000';
	b.graphics.drawRoundRect(4,c,[5,25,100,70,5]);
	b.graphics.drawRect(4,c,[80,50,10,20]);
	b.graphics.drawRoundRect(4,d,[155,5,70,100,5]);
	b.graphics.drawRect(4,d,[180,15,20,10]);
	b.graphics.drawRect(4,d,[110,50,20,20]);
	b.graphics.drawVertices(4,d,[[130,40],[150,60],[130,80]]);
	addChild(b);
	var f = function(){
		setTimeout(function(){location.href=location.href;}, 100);
	};
	window.onorientationchange = f;
};
LGlobal.onShow = function (){
	if(LGlobal.canvas == null)return;
	if(LGlobal.stage.onresizeEvent){
		LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
		delete LGlobal.stage.onresizeEvent;
	}
	if(LGlobal.box2d != null){
		LGlobal.box2d.ll_show();
		if(!LGlobal.traceDebug && LGlobal.keepClear){
			LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);
		}
	}else{
		if(LGlobal.keepClear){LGlobal.canvas.clearRect(0,0,LGlobal.width+1,LGlobal.height+1);}
		if(LGlobal.backgroundColor !== null){
			LGlobal.canvas.fillStyle=LGlobal.backgroundColor;
			LGlobal.canvas.fillRect(0,0,LGlobal.width,LGlobal.height);
		}
	}
	LGlobal.show(LGlobal.childList);
};
LGlobal.show = function(s){
	for(var i=0,l=s.length;i<l;i++){
		if(s[i] && s[i].ll_show)s[i].ll_show();
	}
};
LGlobal.divideCoordinate = function (w,h,row,col){
	var i,j,cw = w/col,ch = h/row,r = [];
	for(i=0;i<row;i++){
		var c=[];
		for(j=0;j<col;j++){
			c.push({x:cw*j,y:ch*i});
		}
		r.push(c);
	}
	return r;
};
LGlobal._create_loading_color = function(){
	var co = LGlobal.canvas.createRadialGradient(LGlobal.width/2, LGlobal.height, 0, LGlobal.width/2, 0, LGlobal.height);  
	co.addColorStop(0, "red");  
	co.addColorStop(0.3, "orange");  
	co.addColorStop(0.4, "yellow");  
	co.addColorStop(0.5, "green");  
	co.addColorStop(0.8, "blue");  
	co.addColorStop(1, "violet");  
	return co;
};
LGlobal.hitPolygon = function(list,x,y){
	var c = 0,p0 = list[0],b0x = x <= p0[0],b0y = y <= p0[1],i,l,p1,b1x,b1y;
	for(i=1,l=list.length;i<l+1;i++){
		p1 = list[i%l];
		b1x = (x <= p1[0]);
		b1y = (y <= p1[1]);
		if( b0y != b1y ){
			if( b0x == b1x ){
				if( b0x )c += (b0y ? -1 : 1);
			}else{
				if( x <= ( p0[0] + (p1[0] - p0[0]) * (y - p0[1] ) / (p1[1] - p0[1]) ) )c += (b0y ? -1 : 1);
			}
		}
		p0 = p1;
		b0x = b1x;
		b0y = b1y;
	}
	return 0 != c;
};
LGlobal.hitTestPolygon = function(p1,p2){
	var i,j,l,listA,normals,vecs,list=[[p1,[],[]],[p2,[],[]]];
	for(j=0;j<list.length;j++){
		listA = list[j][0],normals = list[j][1];
		for(i=0,l=listA.length;i<l;i++){
			list[j][2].push(new LVec2(listA[i][0],listA[i][1]));
			if(i<l-1){
				normals.push((new LVec2(listA[i+1][0] - listA[i][0],listA[i+1][1]-listA[i][1])).normL());
			}
		}
		normals.push((new LVec2(listA[0][0] - listA[l-1][0],listA[0][1]-listA[l-1][1])).normL());
	}
	for(j=0;j<list.length;j++){
		normals = list[j][1];
		for(i=0,l=normals.length;i<l;i++){
			var r1 = LVec2.getMinMax(list[0][2],normals[i]);
			var r2 = LVec2.getMinMax(list[1][2],normals[i]);
			if(r1.max_o<r2.min_o || r1.min_o>r2.max_o)return false;
		}
	}
	return true;
};
LGlobal.hitTestPolygonArc = function(vs,arc){
	if(LGlobal.hitPolygon(vs,arc[0],arc[1])){
		return true;
	}	
	var i,j,l,p1,p2,v1,v2,ext,inn,l2;
	for(i=0,l=vs.length;i<l;i++){
		j=i<l-1?i+1:0;
		p1 = vs[i],p2 = vs[j];
		v1 = new LVec2(arc[0]-p1[0],arc[1]-p1[1]),v2 = new LVec2(p2[0]-p1[0],p2[1]-p1[1]);
		l2 = v2.normalize();
		inn = LVec2.dot(v1,l2);
		if(inn <= 0){
			if(v1.x*v1.x + v1.y*v1.y < arc[3]){
				return true;
			}
		}else if(inn*inn < v2.x*v2.x + v2.y*v2.y){
			ext = LVec2.cross(v1,l2);
			if(ext*ext < arc[3]){
				return true;
			}
		}
	}
	return false;
};
LGlobal.hitTestArc = function(objA,objB,objAR,objBR){
	var rA = objA.getWidth()*0.5
	,rB = objB.getWidth()*0.5
	,xA = objA._startX?objA._startX():objA.startX()
	,xB = objB._startX?objB._startX():objB.startX()
	,yA = objA._startY?objA._startY():objA.startY()
	,yB = objB._startY?objB._startY():objB.startY();
	if(typeof objAR != UNDEFINED){
		xA += (rA - objAR);
		yA += (rA - objAR);
		rA = objAR;
	}
	if(typeof objBR != UNDEFINED){
		xB += (rB - objBR);
		yB += (rB - objBR);
		rB = objBR;
	}
	var disx = xA + rA - xB - rB
	,disy = yA + rA - yB - rB;
	return disx*disx + disy*disy < (rA + rB)*(rA + rB);
};
LGlobal.hitTestRect = function(objA,objB,vecA,vecB){
	var wA = objA.getWidth()
	,wB = objB.getWidth()
	,hA = objA.getHeight()
	,hB = objB.getHeight()
	,xA = objA._startX?objA._startX():objA.startX()
	,xB = objB._startX?objB._startX():objB.startX()
	,yA = objA._startY?objA._startY():objA.startY()
	,yB = objB._startY?objB._startY():objB.startY();
	if(typeof vecA != UNDEFINED){
		xA += (wA - vecA[0])*0.5;
		yA += (hA - vecA[1])*0.5;
		wA = vecA[0];
		hA = vecA[1];
	}
	if(typeof vecB != UNDEFINED){
		xB += (wB - vecB[0])*0.5;
		yB += (hB - vecB[1])*0.5;
		wB = vecB[0];
		hB = vecB[1];
	}
	var minx = xA > xB ? xA : xB
	,miny = yA > yB ? yA : yB
	,maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
	,maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
	return minx <= maxx && miny <= maxy;
};
LGlobal.hitTest = LGlobal.hitTestRect;
LGlobal.setFrameRate = function(s){
	if(LGlobal.frameRate)clearInterval(LGlobal.frameRate);
	LGlobal.speed = s;
	LGlobal.frameRate = setInterval(function(){LGlobal.onShow();}, s);
};
LGlobal.scaleX = function(v){
	return (v - LGlobal.left)*LGlobal.width/LGlobal.canvasStyleWidth;
};
LGlobal.scaleY = function(v){
	return (v - LGlobal.top)*LGlobal.height/LGlobal.canvasStyleHeight;
};
LGlobal.setStageSize = function(w,h){
	w =  Math.ceil(w);
	h =  Math.ceil(h);
	LGlobal.canvasObj.style.width = w+"px";
	LGlobal.canvasObj.style.height = h+"px";
	LGlobal.canvasStyleWidth = w;
	LGlobal.canvasStyleHeight = h;
};
LGlobal.resize = function(){
	var w,h,t=0,l=0,ww=window.innerWidth,wh=window.innerHeight;
	if(LGlobal.stageScale == "noScale"){
		w = LGlobal.width;
		h = LGlobal.height;
	}
	switch(LGlobal.stageScale){
	case "exactFit":
		w = ww;
		h = wh;
		break;
	case "noBorder":
		w = ww;
		h = LGlobal.height*ww/LGlobal.width;
		switch(LGlobal.align){
		case LStageAlign.BOTTOM:
		case LStageAlign.BOTTOM_LEFT:
		case LStageAlign.BOTTOM_RIGHT:
		case LStageAlign.BOTTOM_MIDDLE:
			t = wh - h;
			break;
		}
	break;
	case "showAll":
		if(ww/wh > LGlobal.width/LGlobal.height){
			h = wh;
			w = LGlobal.width*wh/LGlobal.height;
		}else{
			w = ww;
			h = LGlobal.height*ww/LGlobal.width;
		}
	case "noScale":
	default:
		switch(LGlobal.align){
		case LStageAlign.BOTTOM:
		case LStageAlign.BOTTOM_LEFT:
			t = wh - h;
			break;
		case LStageAlign.RIGHT:
		case LStageAlign.TOP_RIGHT:
			l = ww - w;
			break;
		case LStageAlign.TOP_MIDDLE:
			l = (ww - w)*0.5;
			break;
		case LStageAlign.BOTTOM_RIGHT:
			t = wh - h;
			l = ww - w;
			break;
		case LStageAlign.BOTTOM_MIDDLE:
			t = wh - h;
			l = (ww - w)*0.5;
			break;
		case LStageAlign.MIDDLE:
			t = (wh - h)*0.5;
			l = (ww - w)*0.5;
			break;
		case LStageAlign.TOP:
		case LStageAlign.LEFT:
		case LStageAlign.TOP_LEFT:
		default:
		}
	}
	LGlobal.canvasObj.style.marginTop = t + "px";
	LGlobal.canvasObj.style.marginLeft = l + "px";
	if(LGlobal.isFirefox){
		LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
		LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
	}
	LGlobal.setStageSize(w,h);
};
var LStage = LGlobal;
var LSystem = {
	sv:0,
	sleep:function(s){
		var d = new Date();   
		while((new Date().getTime()-d.getTime()) < s){}
	},
	screen:function(a){
		LSystem.sv = a;
		if(LGlobal.stage){LGlobal.resize();}
	}
};
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (elt) {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++){
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}
if (!Array.isArray){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) == '[object Array]';
	};
}
function trace() {
	if (!LGlobal.traceDebug) return;
	var t = document.getElementById("traceObject"), i;
	if (trace.arguments.length > 0 && t == null) {
		t = document.createElement("TEXTAREA");
		t.id = "traceObject";
		t.style.position = "absolute";
		t.style.top = (LGlobal.height + 20) + "px";
		t.style.width = LGlobal.width + "px";
		t.style.height = "200px";
		document.body.appendChild(t);
	}
	for (i = 0; i < trace.arguments.length; i++) {
		t.value = t.value + trace.arguments[i] + "\r\n";
		t.scrollTop = t.scrollHeight;
	}
}
function addChild (o) {
	LGlobal.stage.addChild(o);
}
function removeChild (o) {
	LGlobal.stage.removeChild(o);
}
function init (s, c, w, h, f, t) {
	LGlobal.speed = s;
	var _f = function () {
		if (LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight) {
			LGlobal.horizontalError();
		} else if (LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight) {
			LGlobal.verticalError();
		} else {
			setTimeout(f, 100);
		}
		LGlobal.startTimer = (new Date()).getTime();
	};
	if (t != null && t == LEvent.INIT) {
		LGlobal.frameRate = setInterval(function () {
			LGlobal.onShow();
		}, s);
		LGlobal.setCanvas(c, w, h);
		_f();
	}else{
		LEvent.addEventListener(window, "load", function () {
			LGlobal.frameRate = setInterval(function () {
				LGlobal.onShow();
			}, s);
			LGlobal.setCanvas(c, w, h);
			_f();
		});
	}
}
var LInit = init;
function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
		o[p][SUPER] = b.prototype;
	}
	if (o.toString == Object.prototype.toString) {
		o.toString = LObject.prototype.toString;
	}
	b.apply(d, a);
}
var LExtends = base;
function getTimer () {
	return (new Date()).getTime() - LGlobal.startTimer;
}
var LObject = (function () {
	function LObject () {
		this.type = "LObject";
		this.objectIndex = ++LGlobal.objectIndex;
		this.objectindex = this.objectIndex;
	}
	LObject.prototype = {
		callParent : function (f_n, args) {
			if (!f_n || !args) {
				return;
			}
			return args.callee[SUPER][f_n].apply(this, args);
		},
		toString : function () {
			return "[object " + this.type + "]";
		}
	};
	return LObject;
})();
function LMatrix(a,b,c,d,tx,ty,u,v,w){
	var s = this;
	s.a=1;
	s.b=0;
	s.u=0;
	s.c=0;
	s.d=1;
	s.v=0;
	s.tx=0;
	s.ty=0;
	s.w=1;
	if(typeof a != UNDEFINED)s.a = a;
	if(typeof b != UNDEFINED)s.b = b;
	if(typeof c != UNDEFINED)s.c = c;
	if(typeof d != UNDEFINED)s.d = d;
	if(typeof tx != UNDEFINED)s.tx = tx;
	if(typeof ty != UNDEFINED)s.ty = ty;
	if(typeof u != UNDEFINED)s.u = u;
	if(typeof v != UNDEFINED)s.v = v;
	if(typeof w != UNDEFINED)s.w = w;
}
LMatrix.prototype = {
	setTo:function(a,b,c,d,tx,ty,u,v,w){
		var s = this;
		if(typeof a != UNDEFINED)s.a = a;
		if(typeof b != UNDEFINED)s.b = b;
		if(typeof c != UNDEFINED)s.c = c;
		if(typeof d != UNDEFINED)s.d = d;
		if(typeof tx != UNDEFINED)s.tx = tx;
		if(typeof ty != UNDEFINED)s.ty = ty;
		if(typeof u != UNDEFINED)s.u = u;
		if(typeof v != UNDEFINED)s.v = v;
		if(typeof w != UNDEFINED)s.w = w;
		return s;
	},
	isIdentity:function(){
		var s = this;
		return (s.a == 1 && s.b == 0 && s.c == 0 && s.d == 1 && s.tx == 0 && s.ty == 0 && u == 0 && v == 0 && w == 1);
	},
	transform:function(c){
		var s = this;
		c.transform(s.a,s.b,s.c,s.d,s.tx,s.ty);
		return s;
	},
	toString:function(){
		return "[LMatrix]";
	},
	identity:function(){
		this.setTo(1,0,0,1,0,0,0,0,1);
	},
	rotate:function(q){
		var s = this,
		radian = q * Math.PI / 180,
        cos = Math.cos(radian),
        sin = Math.sin(radian),
        mtx = new LMatrix(cos,sin,-sin,cos,0,0,0,0,1);
        s.add(mtx);
	},
	scale:function(sx, sy){
		var s = this,
		mtx = new LMatrix(sx,0,0,sy,0,0,0,0,1);
        s.add(mtx);
	},
	translate:function(tx, ty){
		var s = this,
		mtx = new LMatrix(1,0,0,1,tx,ty,0,0,1);
        s.add(mtx);
	},
	skew:function(kx,ky){
		mtx = new LMatrix(0,ky,kx,0,0,0,0,0,1);
        s.add(mtx);
	},
	add:function(mtx){
		var s = this,a,b,c,d,tx,ty,u,v,w;
		a = s.a*mtx.a + s.b*mtx.c + s.u*mtx.tx;
		b = s.a*mtx.b + s.b*mtx.d + s.u*mtx.ty;
		u = s.a*mtx.u + s.b*mtx.v + s.u*mtx.w;
		c = s.c*mtx.a + s.d*mtx.c + s.v*mtx.tx;
		d = s.c*mtx.b + s.d*mtx.d + s.v*mtx.ty;
		v = s.c*mtx.u + s.d*mtx.v + s.v*mtx.w;
		tx = s.tx*mtx.a + s.ty*mtx.c + s.w*mtx.tx;
		ty = s.tx*mtx.b + s.ty*mtx.d + s.w*mtx.ty;
		w = s.tx*mtx.u + s.ty*mtx.v + s.w*mtx.w;
		s.setTo(a,b,c,d,tx,ty,u,v,w);
	},
	toArray:function(mtx){
		var s = this;
		if(Array.isArray(mtx) && mtx.length == 3){
			var m = mtx[0]*s.a + mtx[1]*s.c + mtx[2]*s.tx,
			n = mtx[0]*s.b + mtx[1]*s.d + mtx[2]*s.ty,
			k = mtx[0]*s.u + mtx[1]*s.v + mtx[2]*s.w;
			return [m,n,k];
		}else{
			var a = s.a*mtx.a + s.b*mtx.c + s.u*mtx.tx,
			b = s.a*mtx.b + s.b*mtx.d + s.u*mtx.ty,
			u = s.a*mtx.u + s.b*mtx.v + s.u*mtx.w,
			c = s.c*mtx.a + s.d*mtx.c + s.v*mtx.tx,
			d = s.c*mtx.b + s.d*mtx.d + s.v*mtx.ty,
			v = s.c*mtx.u + s.d*mtx.v + s.v*mtx.w,
			tx = s.tx*mtx.a + s.ty*mtx.c + s.w*mtx.tx,
			ty = s.tx*mtx.b + s.ty*mtx.d + s.w*mtx.ty,
			w = s.tx*mtx.u + s.ty*mtx.v + s.w*mtx.w;
			return [a,b,c,d,tx,ty,u,v,w];
		}
	},
	clone:function(){
		var s = this;
		return new LMatrix(s.a,s.b,s.c,s.d,s.tx,s.ty,s.u,s.v,s.w);
	}
};
function LVec2(x,y){
	this.x = x?x:0;
	this.y = y?y:0;
}
LVec2.prototype.length = function(){
	var s = this;
	return Math.sqrt(s.x * s.x + s.y * s.y);
};
LVec2.prototype.normalize = function(){
	var s = this,l=s.length();
	return new LVec2(s.x/l,s.y/l);
};
LVec2.prototype.normR = function(){
	return new LVec2(-this.y,this.x);
};
LVec2.prototype.normL = function(){
	return new LVec2(this.y,-this.x);
};
LVec2.dot = function(a,b){
	return a.x * b.x + a.y * b.y;
};
LVec2.cross = function(a,b){
	return a.x * b.y - a.y * b.x;
};
LVec2.distance = function(a,b){
	var x = a.x - b.x;
	var y = a.y - b.y;
	return Math.sqrt(x * x + y * y);
};
LVec2.getMinMax = function(vecs,axis){
	var min_o = LVec2.dot(vecs[0],axis);
	var max_o = LVec2.dot(vecs[0],axis);
	var min_i = 0;
	var max_i = 0;
	for(var i=1;i<vecs.length;i++){
		var this_o = LVec2.dot(vecs[i],axis);
		if(min_o > this_o){
			min_o = this_o;
			min_i = i;
		}
		if(max_o < this_o){
			max_o = this_o;
			max_i = i;
		}
	}
	return {"min_o":min_o,"min_i":min_i,"max_o":max_o,"max_i":max_i};
};
var LEventDispatcher = (function () {
	function LEventDispatcher () {
		var s = this;
		LExtends(s, LObject, []);
		s._eventList = new Array();
	}
	var p = {
		addEventListener : function (type, listener) {
			this._eventList.push({listener : listener, type : type});
		},
		removeEventListener : function (type, listener) {
			var s = this, i, length;
			length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type && s._eventList[i].listener == listener) {
					s._eventList.splice(i, 1);
					return;
				}
			}
		},
		removeAllEventListener : function () {
			this._eventList = [];
		},
		dispatchEvent : function (event) {
			var s = this, i, length = s._eventList.length, ctype = (typeof event == "string") ? event : event.eventType;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (ctype == s._eventList[i].type) {
					if (typeof event == "string") {
						s.currentTarget = s.target = s;
						s.eventType = s.event_type = ctype;
						s._eventList[i].listener(s);
					}else{
						if (!event.target) {
							event.target = s;
						}
						if (!event.currentTarget) {
							event.currentTarget = event.target;
						}
						s._eventList[i].listener(event);
					}
					return true;
				}
			}
			return false;
		},
		hasEventListener : function (type) {
			var s = this, i, length = s._eventList.length;
			for (i = 0; i < length; i++) {
				if (!s._eventList[i]) {
					continue;
				}
				if (type == s._eventList[i].type) {
					return true;
				}
			}
			return false;
		}
	};
	for (var k in p) {
		LEventDispatcher.prototype[k] = p[k];
	}
	return LEventDispatcher;
})();
var LDisplayObject = (function () {
	function LDisplayObject () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.x = 0;
		s.y = 0;
		s.width = 0;
		s.height = 0;
		s.scaleX = 1;
		s.scaleY = 1;
		s.alpha = 1;
		s.visible = true;
		s.rotate = 0;
		s.mask = null;
		s.blendMode = null;
		s.filters = null;
	}
	var p = {
		_createCanvas:function(){
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		ll_show : function () {
			var s = this, c = LGlobal.canvas;
			if (!s._canShow()) {
				return;
			}
			c.save();
			s._showReady(c);
			if (s.blendMode) {
				c.globalCompositeOperation = s.blendMode;
			}
			if (s.filters) {
				s._ll_setShadow();
			}
			s._rotateReady();
			if (s.mask != null && s.mask.ll_show) {
				s.mask.ll_show();
				c.clip();
			}
			s._transformRotate();
			s._transformScale();
			s._coordinate(c);
			if (s.alpha < 1) {
				c.globalAlpha = s.alpha;
			}
			s._ll_show(c);
			c.restore();
			if (typeof s._ll_loopframe == "function") {
				s._ll_loopframe();
			}
		},
		_canShow : function () {
			return this.visible;
		},
		_coordinate : function (c) {
			var s = this;
			if (s.x != 0 || s.y != 0) {
				c.transform(1, 0, 0, 1, s.x, s.y);
			}
		},
		_rotateReady : function () {},
		_showReady : function (c) {},
		_ll_show : function (c) {},
		_ll_setShadow : function () {
			var s = this, f = s.filters, i, l;
			if (!f) {
				return;
			}
			for (i = 0, l = f.length; i < l; i++) {
				f[i].ll_show();
			}
		},
		_transformRotate : function () {
			var s = this, c;
			if (s.rotate == 0) {
				return;
			}
			c = LGlobal.canvas, rotateFlag = Math.PI / 180, rotateObj = new LMatrix();
			if ((typeof s.rotatex) == UNDEFINED) {
				s.rotatex = 0;
				s.rotatey = 0;
			}
			if (s.box2dBody) {
				rotateFlag = 1;
			}
			rotateObj.a = Math.cos(s.rotate * rotateFlag);
			rotateObj.b = Math.sin(s.rotate * rotateFlag);
			rotateObj.c = -rotateObj.b;
			rotateObj.d = rotateObj.a;
			rotateObj.tx = s.x + s.rotatex;
			rotateObj.ty = s.y + s.rotatey;
			rotateObj.transform(c).setTo(1, 0, 0, 1, -rotateObj.tx, -rotateObj.ty).transform(c);
		},
		_transformScale : function () {
			var s = this,c = LGlobal.canvas, scaleObj;
			if (s.scaleX == 1 && s.scaleY == 1) {
				return;
			}
			scaleObj = new LMatrix();
			if (s.scaleX != 1) {
				scaleObj.tx = s.x;
			}
			if (s.scaleY != 1) {
				scaleObj.ty = s.y;
			}
			scaleObj.a = s.scaleX;
			scaleObj.d = s.scaleY;
			scaleObj.transform(c).setTo(1, 0, 0, 1, -scaleObj.tx, -scaleObj.ty).transform(c);
		},
		copyProperty : function (a) {
			var s = this, k;
			for (k in a) {
				if (typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean") {
					if (k == "objectindex" || k == "objectIndex") {
						continue;
					}
					s[k] = a[k];
				} else if (Array.isArray(a[k])) {
					s[k] = a[k].slice();
				}
			}
			if (a.mask) {
				s.mask = a.mask.clone();
			}
		},
		getAbsoluteScale : function () {
			var s = this, sX, sY, p;
			sX = s.scaleX;
			sY = s.scaleY;
			p = s.parent;
			while (p != "root") {
				sX *= p.scaleX;
				sY *= p.scaleY;
				p = p.parent;
			}
			return {scaleX : sX, scaleY : sY};
		},
		getRootCoordinate : function () {
			var s = this, sx, sy, p;
			sx=s.x;
			sy=s.y;
			p = s.parent;
			while (p != "root") {
				sx *= p.scaleX;
				sy *= p.scaleY;
				sx += p.x;
				sy += p.y;
				p = p.parent;
			}
			return new LPoint(sx,sy);
		},
		getBounds : function (d) {
			if (typeof d == UNDEFINED) {
				return new LRectangle(0, 0, 0, 0);
			}
			var s = this, x = 0, y = 0, w = 0, h = 0, sp, dp;
			if (s.objectIndex != d.objectIndex) {
				sp = s.getRootCoordinate();
				dp = d.getRootCoordinate();
				x = sp.x - dp.x;
				y = sp.y - dp.y;
			}
			if (d.getWidth) {
				w = d.getWidth();
			}
			if (d.getHeight) {
				h = d.getHeight();
			}
			return new LRectangle(x, y, w, h);
		},
		getDataCanvas : function () {
			var s = this, _o, o, _c, c;
			s._createCanvas();
			o = LGlobal.canvasObj;
			c = LGlobal.canvas;
			_o = s._canvas;
			_c = s._context;
			s.width = s.getWidth();
			s.height = s.getHeight();
			_o.width = s.width;
			_o.height = s.height;
			_c.clearRect(0, 0, s.width, s.height);
			LGlobal.canvasObj = s._canvas;
			LGlobal.canvas = s._context;
			s.ll_show();
			s._canvas = _o;
			s._context = _c;
			LGlobal.canvasObj = o;
			LGlobal.canvas = c;
			return s._canvas;
		},
		getDataURL : function () {
			var s = this, r = s.getDataCanvas();
			return r.toDataURL();
		},
		ismouseonShapes : function (shapes, mx, my) {
			var s = this, parent = s, m, child, j, v, arg;
			if (typeof shapes == UNDEFINED) {
				shapes = s.shapes;
			}
			m = s.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				arg = child.arg;
				v = s._changeShape(child.type, arg, m);
				if (child.type == LShape.VERTICES) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.RECT) {
					if (LGlobal.hitPolygon(v, mx, my)) {
						return true;
					}
				} else if (child.type == LShape.ARC) {
					if ((v[0] - mx) * (v[0] - mx) + (v[1] - my) * (v[1] - my) < v[3]) {
						return true;
					}
				}
			}
			return false;
		},
		_changeShape : function (type, arg, m) {
			var v, arg = arg, r2, i, l, v1, v2;
			if (type == LShape.VERTICES) {
				v = [];
				for (i = 0, l = arg.length; i < l; i++) {
					v[i] = m.toArray([arg[i][0], arg[i][1], 1]);
				}
			} else if (type == LShape.RECT) {
				v = [[arg[0], arg[1]], [arg[0] + arg[2], arg[1]], [arg[0] + arg[2], arg[1] + arg[3]], [arg[0], arg[1] + arg[3]]];
				for (i = 0, l = v.length; i < l; i++) {
					v[i] = m.toArray([v[i][0], v[i][1],1]);
				}
			} else if (type == LShape.ARC) {
				v1 = m.toArray([arg[0], arg[1], 1]);
				v2 = m.toArray([arg[0] + arg[2], arg[1], 1]);
				r2 = (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
				v = [v1[0], v1[1], Math.sqrt(r2), r2];
			}
			return v;
		},
		getRootMatrix : function () {
			var parent = this, m = new LMatrix();
			while (parent && parent != "root") {
				if (parent.scaleX != 1 || parent.scaleY != 1) {
					m.scale(parent.scaleX, parent.scaleY);
				}
				if (parent.rotate != 0) {
					m.rotate(parent.rotate);
				}
				if (parent.x != 0 || parent.y != 0) {
					m.translate(parent.x, parent.y);
				}
				parent = parent.parent;
			}
			return m;
		},
		remove : function () {
			var s = this, p = s.parent;
			if (!p || p == "root") {
				return;
			}
			p.removeChild(s);
		}
	};
	for (var k in p) {
		LDisplayObject.prototype[k] = p[k];
	}
	return LDisplayObject;
})();
var LInteractiveObject = (function () {
	function LInteractiveObject () {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.type = "LInteractiveObject";
		s.mouseEnabled = true;
		s.mouseChildren = true;
		s.mouseList = new Array();
	}
	var p = {
		addEventListener : function (type, listener) {
			var s = this;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LGlobal.mouseEventContainer[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.addMouseEvent(s, type, listener);
					return;
				}
				s.mouseList.push({listener : listener, type : type});
			}else{
				s._eventList.push({listener : listener, type : type});
			}
		},
		removeEventListener : function (type, listener) {
			var s = this, i, length;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				if (LGlobal.mouseEventContainer[type] || ((type == LMouseEvent.MOUSE_OVER || type == LMouseEvent.MOUSE_OUT) && LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE])) {
					LMouseEventContainer.removeMouseEvent(s, type, listener);
					return;
				}
				length = s.mouseList.length;
				for (i = 0; i < length; i++) {
					if (!s.mouseList[i]) {
						continue;
					}
					if (type == s.mouseList[i].type && s.mouseList[i].listener == listener) {
						s.mouseList.splice(i, 1);
						return;
					}
				}
			} else {
				length = s._eventList.length;
				for (i = 0; i < length; i++) {
					if (!s._eventList[i]) {
						continue;
					}
					if (type == s._eventList[i].type && s._eventList[i].listener == listener) {
						s._eventList.splice(i, 1);
						return;
					}
				}
			}
		},
		removeAllEventListener : function () {
			var s = this;
			s.mouseList.length = 0;
			s._eventList.length = 0;
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_DOWN]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_DOWN);
			}
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_UP]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_UP);
			}
			if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_MOVE]) {
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_MOVE);
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OVER);
				LMouseEventContainer.removeMouseEvent(s, LMouseEvent.MOUSE_OUT);
			}
		},
		hasEventListener : function (type) {
			var s = this, i, length;
			if (type.indexOf("mouse") >= 0 || type.indexOf("touch") >= 0 || type == LMouseEvent.DOUBLE_CLICK) {
				length = s.mouseList.length;
				for (i = 0; i < length; i++) {
					if (!s.mouseList[i]){
						continue;
					}
					if (type == s.mouseList[i].type) {
						return true;
					}
				}
			} else {
				length = s._eventList.length;
				for (i = 0; i < length; i++) {
					if (!s._eventList[i]) {
						continue;
					}
					if (type == s._eventList[i].type) {
						return true;
					}
				}
			}
			return false;
		}
	};
	for (var k in p) {
		LInteractiveObject.prototype[k] = p[k];
	}
	return LInteractiveObject;
})();
var LDisplayObjectContainer = (function () {
	function LDisplayObjectContainer () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.childList = new Array();
		s.numChildren = 0;
	}
	var p = {
		addChild : function (d) {
			var s  = this,t;
			if (d.parent) {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.parent.removeChild(d);
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.push(d);
			s.numChildren = s.childList.length;
			return d;
		},
		addChildAt : function (d, i) {
			var s = this,t;
			if (i < 0 || i > s.childList.length) {
				return;
			}
			if (typeof d.remove == "function") {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.remove();
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.splice(i, 0, d);
			s.numChildren = s.childList.length;
			return d;
		},
		removeChild : function (d) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					if (LGlobal.destroy && d.die) {
						d.die();
					}
					s.childList.splice(i, 1);
					break;
				}
			}
			s.numChildren = s.childList.length;
			delete d.parent;
		},
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		removeChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length <= i) {
				return;
			}
			if (LGlobal.destroy && c[i].die) {
				c[i].die();
			}
			var d = s.childList.splice(i, 1);
			s.numChildren = s.childList.length;
			return d;
		},
		getChildIndex : function (child) {
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		setChildIndex : function (child, index) {
			var s = this, c = s.childList, i, l = c.length;
			if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
				return -1;
			}
			for (i = 0; i < l; i++) {
				if(c[i].objectIndex == child.objectIndex){
					break;
				}
			}
			s.childList.splice(i,1);
			s.childList.splice(index, 0, child);
			return index;
		},
		resize : function () {
			var s  = this;
			s.width = s.getWidth();
			s.height = s.getHeight();
		},
		removeAllChild : function () {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (LGlobal.destroy && c[i].die) {
					c[i].die();
				}
			}
			s.childList.length = 0;
			s.width = 0;
			s.height = 0;
			s.numChildren = 0;
		}
	};
	for (var k in p) {
		LDisplayObjectContainer.prototype[k] = p[k];
	}
	return LDisplayObjectContainer;
})();
var LLoader = (function () {
	function LLoader () {
		var s = this;
		LExtends(s, LEventDispatcher, []);
		s.type = "LLoader";
	}
	LLoader.prototype.load = function (u, t) {
		var s = this;
		s.loadtype = t;
		if (!t || t == "bitmapData") {
			s.content = new Image();
			s.content.onload = function () {
				s.content.onload = null;
				var event = new LEvent(LEvent.COMPLETE);
				event.currentTarget = s.content;
				event.target = s;
				s.dispatchEvent(event);
				delete s.content;
			};
			s.content.src = u; 
		}
	};
	return LLoader;
})();
function LURLLoader(){
	var s = this;
	base(s,LObject,[]);
	s.type="LURLLoader";
	s.loadtype = "";
	s.content = null;
	s.oncomplete = null;
	s.event = {};
}
p = {
	addEventListener:function(t,l){
		if(t == LEvent.COMPLETE){
			this.oncomplete = l;
		}
	},
	load:function (u,t){
		var s = this;
		s.loadtype = t;
		if(!t || t == "text"){
			LAjax.get(u,{},function(data){
				if(s.oncomplete){
					s.event.currentTarget = data;
					s.event.target = s;
					s.data = data;
					if(s.oncomplete)s.oncomplete(s.event);
				}
			});
		}else if(t=="js"){
			var script = document.createElement("script");
			script.onload = function (){
				s.event.target = s;
				if(s.oncomplete)s.oncomplete(s.event);
			};
			script.src = u;
			script.type = "text/javascript";
			document.querySelector('head').appendChild(script);
		}
	}
};
for(var k in p)LURLLoader.prototype[k]=p[k];
function LMedia(){
	var s = this;
	base(s,LDisplayObject,[]);
	s.length=0;
	s.loopIndex=0;
	s.loopLength = 1;
	s.playing=false;
	s.event = {};
	s.oncomplete = null;
	s.onsoundcomplete = null;
}
LMedia.CANPLAYTHROUGH_EVENT = "canplaythrough";
LMedia.ENDED_EVENT = "ended";
p = {
	onload:function(){
		var s=this;
		if(s.data.readyState){
			s.length=s.data.duration;
			s.dispatchEvent(LEvent.COMPLETE);
			return;
		}
		s.data.addEventListener(LMedia.CANPLAYTHROUGH_EVENT, function () {
			s.onload();
		}, false);
	},
	_onended:function(){
		var s=this;
		if(s.data.ended){
			s.dispatchEvent(LEvent.SOUND_COMPLETE);
			if(++s.loopIndex < s.loopLength){
				s.data.currentTime=0;
				s.data.play();
			}else{
				s.close();
			}
		}
	},
	load:function(u){
		var s = this,a,b,k,d,q={"mov":"quicktime","3gp":"3gpp","ogv":"ogg","m4a":"mpeg","mp3":"mpeg","wave":"wav","aac":"mp4"};
		a = u.split(',');
		for(k in a){
			b = a[k].split('.');
			d=b[b.length-1];
			if(q[d])d=q[d];
			if(s.data.canPlayType(s._type+"/"+d)){
				s.data.src = a[k];
				s.onload();
				s.data.addEventListener(LMedia.ENDED_EVENT, function(){
					s._onended();
				}, false);
				s.data.load();
				return;
			}
		}
		if(s.oncomplete)s.oncomplete({});
	},
	setVolume:function(v){
		this.data.volume=v;
	},
	getVolume:function(){
		return this.data.volume;
	},
	play:function(c,l){
		var s=this;
		if(typeof l == UNDEFINED)l=1;
		if(typeof c == UNDEFINED)c=0;
		if(c>0)s.data.currentTime=c;
		s.data.loop = false;
		s.loopIndex=0;
		s.loopLength = l;
		s.playing=true;
		s.data.play();
		s._onended();
	},
	stop:function(){
		this.playing=false;
		this.data.pause();
	},
	close:function(){
		var s=this;
		s.playing=false;
		s.data.pause();
		s.data.currentTime=0;
	}
};
for(var k in p)LMedia.prototype[k]=p[k];
function LSound(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LSound";
	s._type="audio";
	s.data = new Audio();
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
function LVideo(u){
	var s = this;
	base(s,LMedia,[]);
	s.type = "LVideo";
	s._type="video";
	s.x=s.y=0;
	s.visible=true;
	s.alpha=1;
	s.scaleX=s.scaleY=1;
	s.rotatex = 0;
	s.rotatey = 0;
	s.rotate = 0;
	s.data = document.createElement("video");
	s.data.style.display = "none";
	document.body.appendChild(s.data);
	s.data.id="video_"+s.objectIndex;
	s.data.loop = false;
	s.data.autoplay = false;
	if(u)s.load(u);
}
p = {
	ll_show:function (){
		var s=this,c=LGlobal.canvas;
		if(!s.visible)return;
		c.save();
		if(s.alpha < 1){
			c.globalAlpha = s.alpha;
		}
		s._transformScale();
		s._transformRotate();
		if(s.mask != null && s.mask.ll_show){
			s.mask.ll_show();
			c.clip();
		}
		c.drawImage(s.data,s.x,s.y);
		c.restore();
	},
	die:function(){
		var s=this;
		document.body.removeChild(s.data);
		delete s.data;
	},
	getWidth:function(){
		return this.data.width;
	},
	getHeight:function(){
		return this.data.height;
	}
};
for(var k in p)LVideo.prototype[k]=p[k];
function LPoint(x,y){
	var s = this;
	s.x = x;
	s.y = y;
}
LPoint.distance = function(p1,p2){
	return LPoint.distance2(p1.x,p1.y,p2.x,p2.y);
};
LPoint.distance2 = function(x1,y1,x2,y2){
	var x = x1 - x2, y = x1 - x2;
	return Math.sqrt(x*x + y*y);
};
LPoint.interpolate = function(p1,p2,f){
	return new LPoint(p1.x+(p2.x-p1.x)*(1-f),p1.y+(p2.y-p1.y)*(1-f));
};
LPoint.polar = function(l, a){
	return new LPoint(l*Math.cos(a),l*Math.sin(a));
};
LPoint.prototype = {
	toString:function(){
		return '[object LPoint('+this.x+','+this.y+')]';
	},
	length:function(){
		return LPoint.distance2(this.x,this.y,0,0);
	},
	add:function(v){
		return LPoint(this.x+v.x,this.y+v.y);
	},
	clone:function(){
		return new LPoint(this.x,this.y);
	},
	setTo:function(x, y){
		this.x = x,this.y=y;
	},
	copyFrom:function(s){
		this.setTo(s.x,s.y);
	},
	equals:function(t){
		return this.x == t.x && this.y == t.y;
	},
	normalize:function(t){
		var s = this,scale = t/s.length();
		s.x *= scale,s.y *= scale;
	},
	offset:function(dx,dy){
		this.x += dx;
		this.y += dy;
	},
	subtract:function(v){
		return new LPoint(this.x  - v.x,this.y - v.y);
	}
};
function LRectangle(x,y,w,h){
	var s = this;
	s.x = x;
	s.y = y;
	s.width = w;
	s.height=h;
	s.setRectangle();
}
LRectangle.prototype = {
	setRectangle:function(){
		var s = this;
		s.bottom = s.y + s.height;
		s.right = s.x + s.width;
		s.left = s.x;
		s.top = s.y;
	},
	clone:function(){
		var s = this;
		return new LRectangle(s.x,s.y,s.width,s.height);
	},
	contains:function(x, y){
		var s = this;
		return x>=s.x && x <= s.right && y>= s.y && y <= s.bottom;
	},
	containsRect:function(rect){
		var s = this;
		return rect.x>=s.x && rect.right <= s.right && rect.y>= s.y && rect.bottom <= s.bottom;
	},
	equals:function(v){
		var s = this;
		return v.x==s.x && v.width == s.width && v.y== s.y && v.height == s.height;
	},
	inflate:function(dx,dy){
		var s = this;
		s.width += dx;
		s.height += dy;
		s.setRectangle();
	},
	intersection:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		if(ix <= ax && iy <= ay){
			return new LRectangle(ix,iy,ax,ay);
		}else{
			return new LRectangle(0,0,0,0);
		}
	},
	intersects:function(t){
		var s = this;
		var ix = s.x > t.x ? s.x : t.x;
		var iy = s.y > t.y ? s.y : t.y;
		var ax = s.right > t.right ? t.right : s.right;
		var ay = s.bottom > t.bottom ? t.bottom : s.bottom;
		return ix <= ax && iy <= ay;
	},
	isEmpty:function(){
		var s = this;
		return s.x==0 && s.y==0 && s.width==0 && s.height==0;
	},
	offset:function(dx,dy){
		var s = this;
		s.x += dx;
		s.y += dy;
		s.setRectangle();
	},
	setEmpty:function(){
		var s = this;
		s.x = 0;
		s.y = 0;
		s.width = 0;
		s.height = 0;
		s.setRectangle();
	},
	setTo:function(xa, ya, w, h){
		var s = this;
		s.x = xa;
		s.y = ya;
		s.width = w;
		s.height = h;
		s.setRectangle();
	},
	toString:function(){
		var s = this;
		return "[object LRectangle("+s.x+","+s.y+","+s.width+","+s.height+")]";
	},
	union:function(t){
		var s=this;
		return new LRectangle(s.x>t.x?t.x:s.x,s.y>t.y?t.y:s.y,s.right>t.right?s.right:t.right,s.bottom>t.bottom?s.bottom:t.bottom);
	}
};
var LGraphics = (function () {
	function LGraphics(){
		var s = this;
		LExtends(s, LObject, []);
		s.type = "LGraphics";
		s.color = "#000000";
		s.alpha = 1;
		s.bitmap = null;
		s.setList = new Array();
		s.showList = new Array();
	}
	var p = {
		ll_show : function () {
			var s = this, k, l = s.setList.length;
			if (l == 0) {
				return;
			}
			for (k = 0; k < l; k++) {
				s.setList[k]();
			}
		},
		clone : function () {
			var s = this, a = new LGraphics(), i, l, c;
			a.color = s.color;
			a.alpha = s.alpha;
			a.bitmap = s.bitmap;
			for (i = 0, l = s.setList.length; i < l; i++) {
				c = s.setList[i];
				a.setList.push(c);
			}
			for (i = 0, l = s.showList.length; i < l; i++) {
				c = s.showList[i];
				a.showList.push(c);
			}
			return a;
		},
		lineCap : function (t) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineCap = t;
			});
		},
		lineJoin : function (t) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineJoin = t;
			});
		},
		lineWidth : function (t) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineWidth = t;
			});
		},
		strokeStyle : function (co) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.strokeStyle = co;
			});
		},
		stroke : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.stroke();
			});
		},
		beginPath : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.beginPath();
			});
		},
		closePath : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.closePath();
			});
		},
		moveTo : function (x, y) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.moveTo(x, y);
			});
		},
		lineTo : function (x, y) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.lineTo(x, y);
			});
		},
		rect : function (x, y, w, h) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.rect(x, y, w, h);
			});
			s.showList.push({type : LShape.RECT, arg : [x, y, w, h]});
		},
		fillStyle : function (co) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.fillStyle = co;
			});
		},
		fill : function () {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.fill();
			});
		},
		arc : function (x, y, r, sa, ea, aw) {
			var s = this;
			s.setList.push(function () {
				LGlobal.canvas.arc(x, y, r, sa, ea, aw);
			});
			s.showList.push({type : LShape.ARC, arg : sa});
		},
		lineStyle : function (tn, co) {
			var s = this, c;
			if (co == null) {
				co = s.color;
			}
			s.color = co;
			s.setList.push(function () {
				c = LGlobal.canvas;
				c.lineWidth = tn;
				c.strokeStyle = co;
			});
		},
		clear : function () {
			var s = this;
			s.bitmap = null;
			s.setList.length = 0;
			s.showList.length = 0;
		},
		beginBitmapFill : function (b) {
			var s = this;
			s.setList.push(function () {
				s.bitmap = b;
			});
		},
		drawEllipse : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c, x, y, w, h, k, ox, oy, xe, ye, xm, ym;
				c = LGlobal.canvas;
				c.beginPath();
				k = 0.5522848;
				x = pa[0];
				y = pa[1];
				w = pa[2];
				h = pa[3];
				ox = (w / 2) * k;
				oy = (h / 2) * k;
				xe = x + w;
				ye = y + h;
				xm = x + w / 2;
				ym = y + h / 2;
				c.moveTo(x, ym);
				c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
				c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
				c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
				c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawArc : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				if (pa.length > 6 && pa[6]) {
					c.moveTo(pa[0], pa[1]);
				}
				c.arc(pa[0], pa[1], pa[2], pa[3], pa[4], pa[5]);
				if (pa.length > 6 && pa[6]) {
					c.lineTo(pa[0], pa[1]);
				}
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.ARC, arg : pa});
		},
		drawRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.rect(pa[0], pa[1], pa[2], pa[3]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawRoundRect : function (tn, lco, pa, isf, co) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.moveTo(pa[0] + pa[4], pa[1]);
				c.lineTo(pa[0] + pa[2] - pa[4], pa[1]);
				c.arcTo(pa[0] + pa[2], pa[1], pa[0] + pa[2], pa[1] + pa[4], pa[4]);
				c.lineTo(pa[0] + pa[2], pa[1] + pa[3] - pa[4]);
				c.arcTo(pa[0] + pa[2], pa[1] + pa[3], pa[0] + pa[2] - pa[4], pa[1] + pa[3], pa[4]);
				c.lineTo(pa[0] + pa[4], pa[1] + pa[3]);
				c.arcTo(pa[0], pa[1] + pa[3], pa[0], pa[1] + pa[3] - pa[4], pa[4]);
				c.lineTo(pa[0], pa[1] + pa[4]);
				c.arcTo(pa[0], pa[1], pa[0] + pa[4], pa[1], pa[4]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							0, 0,
							s.bitmap.width, s.bitmap.height,
							0, 0,
							s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.stroke();
				}
			});
			s.showList.push({type : LShape.RECT, arg : pa});
		},
		drawVertices : function (tn, lco, v, isf, co) {
			var s = this;
			if (v.length < 3) {
				return;
			}
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.moveTo(v[0][0], v[0][1]);
				var i, l = v.length, pa;
				for (i = 1; i < l; i++) {
					pa = v[i];
					c.lineTo(pa[0], pa[1]);
				}
				c.lineTo(v[0][0], v[0][1]);
				c.closePath();
				if (s.bitmap) {
					c.save();
					c.clip();
					c.drawImage(s.bitmap.image,
							s.bitmap.x, s.bitmap.y, s.bitmap.width, s.bitmap.height,
							0, 0, s.bitmap.width, s.bitmap.height);
					c.restore(); 
					s.bitmap = null;
					return;
				}
				if (isf) {
					c.fillStyle = co;
					c.fill();
				}
				if (tn > 0) {
					c.lineWidth = tn;
					c.strokeStyle = lco;
					c.closePath();
					c.stroke();
				}
			});
			s.showList.push({type : LShape.VERTICES, arg : v});
		},
		drawTriangles : function (ve, ind, u, tn, lco) {
			var s = this;
			var i, j, l = ind.length, c;
			s.setList.push(function () {
				c = LGlobal.canvas;
				var v = ve, a, k, sw;
				for (i = 0, j = 0; i < l; i += 3) {
					a = 0;
					c.save();
					c.beginPath();
					c.moveTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.lineTo(v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
					c.lineTo(v[ind[i + 2] * 2], v[ind[i + 2] * 2 + 1]);
					c.lineTo(v[ind[i] * 2], v[ind[i] * 2 + 1]);
					c.closePath();
					if (tn) {
						c.lineWidth = tn;
						c.strokeStyle = lco;
						c.stroke();
					}
					c.clip();
					if (i % 6 == 0) {
						sw = -1;
						var w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 1 + j] * 2] - u[ind[i + j] * 2]) * s.bitmap.width;
						}
						if (i + j >= l) {
							w = (u[ind[i + j - l] * 2] - u[ind[i + 1] * 2]) * s.bitmap.width;
							sw = u[ind[i] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 1] * 2] - v[ind[i] * 2]) / w;
						var t2 = (v[ind[i + 1] * 2 + 1] - v[ind[i] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i] * 2], v[ind[i] * 2 + 1]);
						c.drawImage(s.bitmap.image,
									s.bitmap.x + sw,
									s.bitmap.y + sh,
									w, h,
									0, 0,
									w, h);
					} else {
						var w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						var h = (u[ind[i + 2] * 2 + 1] - u[ind[i] * 2 + 1]) * s.bitmap.height;
						if (j == 0 && w < 0) {
							for (k = i + 9; k < l; k += 3) {
								if (u[ind[i + 2] * 2 + 1] == u[ind[k + 2] * 2 + 1]) {
									j = k - i;
									break;
								}
							}
							if (j == 0) {
								j = l - i;
							}
							w = (u[ind[i + 2 + j] * 2] - u[ind[i + 1 + j] * 2]) * s.bitmap.width;
						}
						if (i + 1 + j >= l) {
							w = (u[ind[i + 1 + j - l] * 2] - u[ind[i + 2] * 2]) * s.bitmap.width;
							sw = u[ind[i + 1] * 2] == 1 ? 0 : s.bitmap.width * u[ind[i + 1] * 2] + w;
							if (sw > s.bitmap.width) {
								sw -= s.bitmap.width;
							}
						} else {
							sw = s.bitmap.width * u[ind[i + 1 + j] * 2];
						}
						sh = s.bitmap.height * u[ind[i] * 2 + 1];
						if (h < 0) {
							h = (u[ind[i + 2 - (i > 0 ? 6 : -6)] * 2 + 1] - u[ind[i - (i > 0 ? 6 : -6)] * 2 + 1]) * s.bitmap.height;
							sh = 0;
						}
						var t1 = (v[ind[i + 2] * 2] - v[ind[i + 1] * 2]) / w;
						var t2 = (v[ind[i + 2] * 2 + 1] - v[ind[i + 1] * 2 + 1]) / w;
						var t3 = (v[ind[i + 2] * 2] - v[ind[i] * 2]) / h;
						var t4 = (v[ind[i + 2] * 2 + 1] - v[ind[i] * 2 + 1]) / h;
						c.transform(t1, t2, t3, t4, v[ind[i + 1] * 2], v[ind[i + 1] * 2 + 1]);
						c.drawImage(s.bitmap.image,
								s.bitmap.x + sw,
								s.bitmap.y + sh,
								w, h,
								0, -h,
								w, h);
					}
					c.restore();
				}
			});
		},
		drawLine : function (tn, lco, pa) {
			var s = this;
			s.setList.push(function () {
				var c = LGlobal.canvas;
				c.beginPath();
				c.moveTo(pa[0], pa[1]);
				c.lineTo(pa[2], pa[3]);
				c.lineWidth = tn;
				c.strokeStyle = lco;
				c.closePath();
				c.stroke();
			});
		},
		add : function (f) {
			this.setList.push(f);
		},
		ismouseon : function (e, co) {
			var s = this;
			if (e == null || e == UNDEFINED || s.showList.length == 0 || !s.parent) {
				return false;
			}
			return s.parent.ismouseonShapes(s.showList, e.offsetX, e.offsetY);
		},
		getWidth : function () {
			var s = this, k, k1, min = 0, max = 0, v, l, l1;
			for (k = 0, l = s.showList.length; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[0]) {
						min = s.showList[k].arg[0];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2]) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[0] - s.showList[k].arg[2]) {
						min = s.showList[k].arg[0] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[0] + s.showList[k].arg[2]) {
						max = s.showList[k].arg[0] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[0]) {
							min = v[0];
						}
						if (max < v[0]) {
							max = v[0];
						}
					}
				}
			}
			s.left = min;
			return max - min;
		},
		getHeight : function () {
			var s = this, k = null, k1 = null, l, l1, min = 0, max = 0, v;
			for (k = 0, l = s.showList.length; k < l; k++) {
				if (s.showList[k].type == LShape.RECT) {
					if (min > s.showList[k].arg[1]) {
						min = s.showList[k].arg[1];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[3]) {
						max = s.showList[k].arg[1] + s.showList[k].arg[3];
					}
				} else if (s.showList[k].type == LShape.ARC) {
					if (min > s.showList[k].arg[1] - s.showList[k].arg[2]) {
						min = s.showList[k].arg[1] - s.showList[k].arg[2];
					}
					if (max < s.showList[k].arg[1] + s.showList[k].arg[2]) {
						max = s.showList[k].arg[1] + s.showList[k].arg[2];
					}
				} else if (s.showList[k].type == LShape.VERTICES) {
					for (k1 = 0, l1 = s.showList[k].arg.length; k1 < l1; k1++) {
						v = s.showList[k].arg[k1];
						if (min > v[1]) {
							min = v[1];
						}
						if (max < v[1]) {
							max = v[1];
						}
					}
				}
			}	
			s.top = min;	
			return max - min;
		},
		startX : function () {
			var s = this;
			s.getWidth();
			return s.left;
		},
		startY : function () {
			var s = this;
			s.getHeight();
			return s.top;
		}
	};
	for (var k in p) {
		LGraphics.prototype[k] = p[k];
	}
	return LGraphics;
})();
var LShape = (function () {
	function LShape () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.type = "LShape";
		s.graphics = new LGraphics();
		s.graphics.parent = s;
	}
	LShape.ARC = "arc";
	LShape.RECT = "rect";
	LShape.VERTICES = "vertices";
	var p = {
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show();
		},
		getWidth : function (maskSize) {
			var s = this, mx, mw,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				mw = s.mask.getWidth();
				if (left < mx) {
					left = mx;
				}
				if (right > mx + mw) {
					right = mx + mw;
				}
			}
			s.ll_left = s.x + left;
			s.ll_right = s.x + right;
			return (right - left) * s.scaleX;
		},
		getHeight : function (maskSize) {
			var s = this, my, mh,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				mh = s.mask.getHeight();
				if (top < my) {
					top = my;
				}
				if (bottom > my + mh) {
					bottom = my + mh;
				}
			}
			s.ll_top = s.y + top;
			s.ll_bottom = s.y + bottom;
			return (bottom - top) * s.scaleY;
		},
		_startX : function () {
			var s = this;
			s.getWidth();
			return s.ll_left;
		},
		startX : function () {
			var s = this;
			return s._startX() * s.scaleX;
		},
		_startY : function () {
			var s = this;
			s.getHeight();
			return s.ll_top;
		},
		startY : function () {
			var s = this;
			return s._startY() * s.scaleY;
		},
		clone : function () {
			var s = this, a = new LShape(), c, o;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			return a;
		},
		ismouseon : function (e, cd) {
			var s = this, i = false, sc;
			if (!s.visible || e == null) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			if (s.graphics) {
				i = s.graphics.ismouseon(e, sc);
			}
			return i;
		},
		die : function () {
			var s = this;
			s.graphics.clear();
		}
	};
	for (var k in p) {
		LShape.prototype[k] = p[k];
	}
	return LShape;
})();
var LSprite = (function () {
	function LSprite () {
		var s = this;
		LExtends(s, LDisplayObjectContainer, []);
		s.type = "LSprite";
		s.rotatex;
		s.rotatey;
		s.graphics = new LGraphics();
		s.graphics.parent = s;
		s.box2dBody = null;
		s.shapes = new Array();
	}
	var p = {
		setRotate : function (angle) {
			var s = this;
			if (s.box2dBody) {
				s.box2dBody.SetAngle(angle);
			} else {
				s.rotate = angle;
			}
		},
		_rotateReady : function () {
			var s = this;
			if (s.box2dBody) {
				if ((typeof s.rotatex) == UNDEFINED) {
					s.getRotateXY();
				}
				s.x = s.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - s.parent.x - s.rotatex;
				s.y = s.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - s.parent.y - s.rotatey;
				s.rotate = s.box2dBody.GetAngle();
			}
		},
		_ll_show : function (c) {
			var s = this;
			s.graphics.ll_show();
			LGlobal.show(s.childList);
			s._ll_debugShape();
		},
		startDrag : function (touchPointID) {
			var s = this, r, c;
			if (s.ll_dragStart) {
				return;
			}
			s.ll_touchPointID = touchPointID;
			s.ll_dragStartX = s.x;
			s.ll_dragStartY = s.y;
			s.ll_dragMX = mouseX;
			s.ll_dragMY = mouseY;
			s.ll_dragStart = true;
			LGlobal.dragList.push(s);
		},
		stopDrag : function () {
			var s = this, i, l;
			for (i = 0, l = LGlobal.dragList.length; i < l; i++) {
				if (s.objectIndex == LGlobal.dragList[i].objectIndex) {
					s.ll_dragStart = false;
					LGlobal.dragList.splice(i, 1);
					break;
				}
			}
		},
		getRotateXY : function (w, h) {
			var s = this;
			if (!w || !h) {
				w = s.getWidth();
				h = s.getHeight();
			}
			s.rotatex = w / 2;
			s.rotatey = h / 2;
		},
		getWidth : function (maskSize) {
			var s = this, i, l, o, a, b, mx, mw,
			left = s.graphics.startX(), right = left + s.graphics.getWidth();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.x;
				if (typeof o._startX == "function") {
					a=o._startX();
				}
				b = a + o.getWidth(maskSize);
				if (a < left) {
					left = a;
				}
				if (b > right) {
					right = b;
				}
			}
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				mw = s.mask.getWidth();
				if (left < mx) {
					left = mx;
				}
				if (right > mx + mw) {
					right = mx + mw;
				}
			}
			s.ll_left = s.x + left;
			s.ll_right = s.x + right;
			return (right - left) * s.scaleX;
		},
		getHeight : function (maskSize) {
			var s = this, i, l, o, a, b, my, mh,
			top = s.graphics.startY(), bottom = top + s.graphics.getHeight();
			for (i = 0, l = s.childList.length; i < l; i++) {
				o = s.childList[i];
				if (typeof o.visible == UNDEFINED || !o.visible) {
					continue;
				}
				a = o.y;
				if (typeof o._startY == "function") {
					a=o._startY();
				}
				b = a + o.getHeight(maskSize);
				if (a < top) {
					top = a;
				}
				if (b > bottom) {
					bottom = b;
				}
			}
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				mh = s.mask.getHeight();
				if (top < my) {
					top = my;
				}
				if (bottom > my + mh) {
					bottom = my + mh;
				}
			}
			s.ll_top = s.y + top;
			s.ll_bottom = s.y + bottom;
			return (bottom - top) * s.scaleY;
		},
		_startX : function () {
			var s = this;
			s.getWidth();
			return s.ll_left;
		},
		startX : function () {
			var s = this;
			return s._startX() * s.scaleX;
		},
		_startY : function () {
			var s = this;
			s.getHeight();
			return s.ll_top;
		},
		startY : function () {
			var s = this;
			return s._startY() * s.scaleY;
		},
		_ll_loopframe : function () {
			this.dispatchEvent(LEvent.ENTER_FRAME);
		},
		clone : function () {
			var s = this, a = new LSprite(), c, o, i, l;
			a.copyProperty(s);
			a.graphics = s.graphics.clone();
			a.graphics.parent = a;
			a.childList.length = 0;
			for (i = 0, l = s.childList.length; i < l; i++) {
				c = s.childList[i];
				if (c.clone) {
					o = c.clone();
					o.parent = a;
					a.childList.push(o);
				}
			}
			return a;
		},
		_mevent : function (type) {
			var s = this, k;
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					return true;
				}
			}
			return false;
		},
		ll_dispatchMouseEvent : function (type, e, cd, ox, oy) {
			var s = this;
			for (k = 0; k < s.mouseList.length; k++) {
				var o = s.mouseList[k];
				if (o.type == type) {
					e.selfX = (ox - (s.x * cd.scaleX + cd.x)) / (cd.scaleX * s.scaleX);
					e.selfY = (oy - (s.y * cd.scaleY + cd.y)) / (cd.scaleY * s.scaleY);
					e.currentTarget = e.clickTarget = s;
					if (!e.target) {
						e.target = s;
					}
					o.listener(e, s);
				}
			}
		},
		mouseEvent : function (e, type, cd) {
			if (!e) {
				return false;
			}
			var s = this, i, k, ox = e.offsetX, oy = e.offsetY, on, mc;
			if (!s.mouseEnabled || !s.visible) {
				return false;
			}
			if (cd == null) {
				cd = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			on = s.ismouseon(e, cd);
			if (on) {
				if (type == LMouseEvent.MOUSE_MOVE && !s.ll_mousein) {
					s.ll_mousein = true;
					if (s._mevent(LMouseEvent.MOUSE_OVER)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OVER, e, cd, ox, oy);
					}
				}
				if (s.mouseChildren) {
					mc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
					for (k = s.childList.length - 1; k >= 0; k--) {
						if (s.childList[k].mouseEvent) {
							i = s.childList[k].mouseEvent(e, type, mc);
							if (i) {
								e.target = s.childList[k];
								break;
							}
						}
					}
					if (s._mevent(type)) {
						s.ll_dispatchMouseEvent(type, e, cd, ox, oy);
					}
				}
				return true;
			} else {
				if (type == LMouseEvent.MOUSE_MOVE && s.ll_mousein) {
					s.ll_mousein = false;
					if (s._mevent(LMouseEvent.MOUSE_OUT)) {
						s.ll_dispatchMouseEvent(LMouseEvent.MOUSE_OUT, e, cd, ox, oy);
					}
				}
			}
			return false;
		},
		hitTestPoint : function (x, y) {
			var s = this, shapes = s.shapes;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			return s.ismouseonShapes(shapes, x, y);
		},
		hitTestObject : function (obj) {
			var s = this, shapes = s.shapes, shapes1 = obj.shapes, m, m1, j, child, j1, child1, vo1, v1;
			if (!shapes || shapes.length == 0) {
				s.getWidth();
				s.getHeight();
				shapes = [{"type" : LShape.RECT, "arg" : [s.ll_left - s.x, s.ll_top - s.y, s.ll_right - s.ll_left, s.ll_bottom - s.ll_top]}];
			}
			if (!shapes1 || shapes1.length == 0) {
				obj.getWidth();
				obj.getHeight();
				shapes1 = [{"type" : LShape.RECT, "arg" : [obj.ll_left - obj.x, obj.ll_top - obj.y, obj.ll_right - obj.ll_left, obj.ll_bottom - obj.ll_top]}];
			}
			m = s.getRootMatrix();
			m1 = obj.getRootMatrix();
			for (j = shapes.length - 1; j >= 0; j--) {
				child = shapes[j];
				v1 = s._changeShape(child.type, child.arg, m);
				for (j1 = shapes1.length - 1; j1 >= 0; j1--) {
					child1 = shapes1[j1];
					vo1 = obj._changeShape(child1.type, child1.arg, m1);
					if (child.type == LShape.VERTICES || child.type == LShape.RECT) {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygon(v1, vo1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if(LGlobal.hitTestPolygonArc(v1, vo1)) {
								return true;
							}
						}
					} else {
						if (child1.type == LShape.VERTICES || child1.type == LShape.RECT) {
							if (LGlobal.hitTestPolygonArc(vo1, v1)) {
								return true;
							}
						} else if (child1.type == LShape.ARC) {
							if (Math.sqrt((v1[0] - vo1[0]) * (v1[0] - vo1[0]) + (v1[1] - vo1[1]) * (v1[1] - vo1[1])) < v1[2] + vo1[2]) {
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		addShape : function (type, arg) {
			var s = this;
			if (type == LShape.VERTICES && arg.length < 3) {
				return;
			}
			s.shapes.push({"type" : type, "arg" : arg});
		},
		clearShape : function () {
			var s = this;
			s.shapes.length = 0;
		},
		_ll_debugShape : function () {
			var s = this, i, l, child, c, arg, j, ll;
			if (!LGlobal.traceDebug || s.shapes.length == 0) {
				return;
			}
			for (i = 0, l = s.shapes.length; i < l; i++) {
				child = s.shapes[i];
				c = LGlobal.canvas;
				arg = child.arg;
				c.beginPath();
				if (child.type == LShape.RECT) {
					c.rect(arg[0], arg[1], arg[2], arg[3]);
				}else if (child.type == LShape.ARC) {
					c.arc(arg[0], arg[1], arg[2], 0, 2*Math.PI);
				}else if (child.type == LShape.VERTICES) {
					c.moveTo(arg[0][0], arg[0][1]);
					for (j = 1, ll = arg.length; j < ll; j++) {
						c.lineTo(arg[j][0], arg[j][1]);
					};
					c.lineTo(arg[0][0], arg[0][1]);
				}
				c.closePath();
				c.strokeStyle = "#00FF00";
				c.stroke();
			}
		},
		ismouseon : function (e, cd) {
			var s = this;
			if (!s.visible || e==null) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			if(s.shapes && s.shapes.length > 0){
				return s.ismouseonShapes(s.shapes, e.offsetX, e.offsetY);
			}
			var k, i = false, l = s.childList, sc = {x : s.x * cd.scaleX + cd.x, y : s.y * cd.scaleY + cd.y, scaleX : cd.scaleX * s.scaleX, scaleY : cd.scaleY * s.scaleY};
			if (s.graphics) {
				i = s.graphics.ismouseon(e, sc);
			}
			if (!i) {
				for (k = l.length - 1; k >= 0; k--) {
					if (l[k].ismouseon) {
						i = l[k].ismouseon(e, sc);
					}
					if (i) {
						e.target = s.childList[k];
						break;
					}
				}
			}
			return i;
		},
		die : function () {
			var s = this, i, c, l;
			s.graphics.clear();
			s.removeAllEventListener();
			s.stopDrag();
			if (s.box2dBody) {
				s.clearBody();
			}
			for (i = 0, c = s.childList, l = c.length; i < l; i++) {
				if (c[i].die) {
					c[i].die();
				}
			}
		}
	};
	for (var k in p) {
		LSprite.prototype[k] = p[k];
	}
	return LSprite;
})();
var LButton = (function () {
	function LButton (upState, overState, downState, disableState) {
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LButton";
		s.buttonMode = true;
		s.addChild(upState);
		if (!overState) {
			overState = upState;
		} else {
			s.addChild(overState);
		}
		if (!downState) {
			downState = overState;
		} else {
			s.addChild(downState);
		}
		if (!disableState) {
			disableState = upState;
		} else {
			s.addChild(disableState);
		}
		s.upState = s.bitmap_up = upState;
		s.overState = s.bitmap_over = overState;
		s.downState = downState;
		s.disableState = disableState;
		s.overState.visible = false;
		s.downState.visible = false;
		s.upState.visible = true;
		s.staticMode = false;
		s.setState(LButton.STATE_ENABLE);
		s.addEventListener(LMouseEvent.MOUSE_OVER, s.ll_modeOver);
		s.addEventListener(LMouseEvent.MOUSE_OUT, s.ll_modeOut);
		s.addEventListener(LMouseEvent.MOUSE_DOWN, s.ll_modeDown);
	}
	LButton.STATE_DISABLE = "disable";
	LButton.STATE_ENABLE = "enable";
	var p = {
		setState : function (state) {
			var s = this;
			if (state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
			} else if (state == LButton.STATE_ENABLE) {
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = false;
				s.upState.visible = true;
			} else {
				return;
			}
			s.state = state;
		},
		ll_modeDown : function (e) {
			var s = e.clickTarget, w, h, tw, th, x, y, tx, ty, onComplete;
			if (!s.buttonMode || s.tween) {
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.upState.visible = false;
			s.overState.visible = false;
			s.downState.visible = true;	
			s._tweenOver = s.ll_modeOver;
			onComplete = function(obj){
				var s = obj.parent;
				delete s.tween;
				s._tweenOver({clickTarget : s});
				delete s._tweenOver;
			};
			if (s.staticMode) {
				s.tween = LTweenLite.to(s.downState, 0.3, {}).to(s.downState, 0.1, {onComplete : onComplete});
			} else {
				w = s.downState.getWidth();
				h = s.downState.getHeight();
				tw = w * 1.1;
				th = h * 1.1;
				x = s.downState.x;
				y = s.downState.y;
				tx = x + (w - tw) * 0.5;
				ty = y + (h - th) * 0.5;
				s.tween = LTweenLite.to(s.downState, 0.3, {x : tx, y : ty, scaleX : 1.1, scaleY : 1.1, ease : Quart.easeOut})
				.to(s.downState, 0.1, {x : x, y : y, scaleX : 1, scaleY : 1, ease : Quart.easeOut,onComplete : onComplete});
			}
		},
		ll_modeOver : function (e) {
			var s = e.clickTarget;
			if (!s.buttonMode) {
				return;
			}
			if (s.tween) {
				s._tweenOver = s.ll_modeOver;
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.upState.visible = false;
			s.downState.visible = false;
			s.overState.visible = true;
		},
		ll_modeOut : function (e){
			var s = e.clickTarget;
			if (!s.buttonMode) {
				return;
			}
			if (s.tween) {
				s._tweenOver = s.ll_modeOut;
				return;
			}
			if (s.state == LButton.STATE_DISABLE) {
				s.upState.visible = false;
				s.overState.visible = false;
				s.downState.visible = false;
				s.disableState.visible = true;
				return;
			}
			s.overState.visible = false;
			s.downState.visible = false;
			s.upState.visible = true;
		},
		clone : function (){
			var s = this;
			return new LButton(s.upState.clone(),s.overState.clone(),s.downState.clone(),s.disableState.clone());
		}
	};
	for (var k in p) {
		LButton.prototype[k] = p[k];
	}
	return LButton;
})();
function LBlendMode () {throw "LBlendMode cannot be instantiated";}
LBlendMode.SOURCE_OVER = "source-over";
LBlendMode.SOURCE_ATOP = "source-atop";
LBlendMode.SOURCE_IN = "source-in";
LBlendMode.SOURCE_OUT = "source-out";
LBlendMode.DESTINATION_OVER = "destination-over";
LBlendMode.DESTINATION_ATOP = "destination-atop";
LBlendMode.DESTINATION_IN = "destination-in";
LBlendMode.DESTINATION_OUT = "destination-out";
LBlendMode.LIGHTER = "lighter";
LBlendMode.COPY = "copy";
LBlendMode.XOR = "xor";
LBlendMode.NONE = null;
LBlendMode.NORMAL = null;
var LTextFieldType = function (){throw "LTextFieldType cannot be instantiated";};
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;
var LTextField = (function () {
	function LTextField () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.type = "LTextField";
		s.texttype = null;
		s.text = "";
		s.font = "Arial";
		s.size = "11";
		s.color = "#000000";
		s.weight = "normal";
		s.textAlign = "left";
		s.textBaseline = "top";
		s.stroke = false;
		s.lineWidth = 1;
		s.lineColor = "#000000";
		s.width = 150;
		s.height = s.size;
		s.displayAsPassword = false;
		s.wordWrap = false;
		s.multiline = false;
		s.numLines = 1;
	}
	var p = {
		_showReady : function (c) {
			var s = this;
			c.font = s.weight + " " + s.size + "pt " + s.font;  
			c.textAlign = s.textAlign;
			c.textBaseline = s.textBaseline;
		},
		_ll_show : function (c) {
			var s = this, d, lbl, i, rc, j, l, k, m, b, enter;
			if (s.texttype == LTextFieldType.INPUT) {
				s.inputBackLayer.ll_show();
				rc = s.getRootCoordinate();
				if (LGlobal.inputBox.name == "input" + s.objectIndex) {
					LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
					LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
				}
			}
			if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex == s.objectIndex) {
				return;
			}
			lbl = s.text;
			if (s.displayAsPassword) {
				lbl = '';
				for (i=0, l = s.text.length; i < l; i++) {
					lbl += '*';
				}
			}
			c.fillStyle = s.color;
			if (s.stroke) {
				c.strokeStyle = s.lineColor;
				c.lineWidth = s.lineWidth + 1;  
			}
			if (s.wordWrap || s.multiline) {
				j = 0, k = 0, m = 0, b = 0;
				for (i = 0, l = s.text.length; i < l; i++) {
					j = c.measureText(s.text.substr(k, i - k)).width;
					enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i, 1));
					if ((s.wordWrap && j > s.width) || enter) {
						j = 0;
						k = i;
						m++;
						if (enter) {
							k++;
						}
					}
					if (!enter) {
						if (s.stroke) {
							c.strokeText(lbl.substr(i, 1), j, m * s.wordHeight, c.measureText(lbl).width);
						}
						c.fillText(lbl.substr(i, 1), j, m * s.wordHeight, c.measureText(lbl).width);
					}
					s.numLines = m;
				}
				s.height = (m + 1) * s.wordHeight;
			} else {
				s.numLines = 1;
				if (s.stroke) {
					c.strokeText(lbl, 0, 0, c.measureText(lbl).width);
				}
				c.fillText(lbl, 0, 0, c.measureText(lbl).width);
			}
			if (s.windRunning) {
				s._ll_windRun();
			}
		},
		_wordHeight : function (h) {
			var s = this;
			if (h > 0) {
				s.wordHeight = h;
			} else {
				s.wordWrap = false;
				s.wordHeight = s.getHeight();
			}
			s.height = 0;
		},
		setMultiline : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.multiline = v;
		},
		setWordWrap : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.wordWrap = v;
		},
		setType : function (type, inputBackLayer) {
			var s = this;
			if (s.texttype != type && type == LTextFieldType.INPUT) {
				if (inputBackLayer == null || inputBackLayer.type != "LSprite") {
					s.inputBackLayer = new LSprite();
					s.inputBackLayer.graphics.drawRect(1, "#000000", [0, -s.getHeight() * 0.4, s.width, s.getHeight() * 1.5]);
				} else {
					s.inputBackLayer = inputBackLayer;
				}
				s.inputBackLayer.parent = s;
				if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_DOWN]) {
					LMouseEventContainer.pushInputBox(s);
				}
			} else {
				s.inputBackLayer = null;
				LMouseEventContainer.removeInputBox(s);
			}
			s.texttype = type;
		},
		ismouseon : function (e, cood) {
			var s = this, ox, oy;
			if (e==null || e == UNDEFINED) {
				return false;
			}
			if (!s.visible) {
				return false;
			}
			if (cood == null) {
				cood = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			if (s.inputBackLayer) {
				return s.inputBackLayer.ismouseon(e, {x : s.x * cood.scaleX + cood.x, y : s.y * cood.scaleY + cood.y, scaleX : cood.scaleX * s.scaleX, scaleY : cood.scaleY * s.scaleY});
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s._getWidth(), s._getHeight()]}], e.offsetX, e.offsetY);
		},
		clone : function () {
			var s = this, a = new LTextField();
			a.copyProperty(s);
			a.texttype = null;
			if (s.texttype ==  LTextFieldType.INPUT) {
				a.setType( LTextFieldType.INPUT);
			}
			return a;
		},
		mouseEvent : function (event, type, cood) {
			var s = this, on;
			if (s.inputBackLayer == null) {
				return;
			}
			on = s.ismouseon(event, cood);
			if (type != LMouseEvent.MOUSE_DOWN || !on) {
				return;
			}
			s.focus();
		},
		_ll_getValue : function () {
			if (LGlobal.inputBox.style.display != NONE) {
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LEvent.removeEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
				LGlobal.inputBox.style.display = NONE;
				LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
				LGlobal.inputTextField = null;
			}
		},
		_ll_input : function (e) {
			var event = new LEvent(LTextEvent.TEXT_INPUT);
			event.keyCode = e.keyCode;
			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
			LGlobal.inputTextField.dispatchEvent(event);
		},
		focus : function () {
			var s = this, sc, sx;
			if (!s.parent) {
				return;
			}
			if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex != s.objectIndex) {
				s._ll_getValue();
			}
			s.dispatchEvent(LFocusEvent.FOCUS_IN);
			sc = s.getAbsoluteScale();
			LGlobal.inputBox.style.display = "";
			LGlobal.inputBox.name = "input" + s.objectIndex;
			LGlobal.inputTextField = s;
			LGlobal.inputTextareaBoxObj.style.display = NONE;
			LGlobal.inputTextBoxObj.style.display = NONE;
			LGlobal.passwordBoxObj.style.display = NONE;
			if (s.displayAsPassword) {
				LGlobal.inputTextBox = LGlobal.passwordBoxObj;
			} else if (s.multiline) {
				LGlobal.inputTextBox = LGlobal.inputTextareaBoxObj;
			} else {
				LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
			}
			sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width;
			sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
			LGlobal.inputTextBox.style.display = "";
			LGlobal.inputTextBox.value = s.text;
			LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight() * sc.scaleY * s.scaleY * sy + "px";
			LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth() * sc.scaleX * s.scaleX * sx + "px";
			LEvent.addEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
			setTimeout(function () {
				LGlobal.inputTextBox.focus();
			}, 50);
		},
		_getWidth : function () {
			var s = this;
			if (s.wordWrap) {
				return s.width;
			}
			LGlobal.canvas.font = s.size + "pt " + s.font;
			return LGlobal.canvas.measureText(s.text).width;
		},
		getWidth : function (maskSize) {
			var s = this, w, mx, mw;
			w = s._getWidth() * s.scaleX;
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				if (mx > w) {
					return 0;
				}
				mw = s.mask.getWidth();
				if (mx + mw > w) {
					return w - mx;
				} else {
					return mw;
				}
			}
			return w;
		},
		_getHeight : function () {
			var s = this, c = LGlobal.canvas, i, l, j, k, m, enter;
			if (s.wordWrap) {
				c.font = s.weight + " " + s.size + "pt " + s.font;
				if (s.height == 0) {
					j = 0, k = 0, m = 0;
					for (i = 0, l = s.text.length; i < l; i++) {
						j = c.measureText(s.text.substr(k, i - k)).width;
						enter = /(?:\r\n|\r|\n|¥n)/.exec(s.text.substr(i, 1));
						if ((s.wordWrap && j > s.width) || enter) {
							j = 0;
							k = i;
							m++;
							if (enter) {
								k++;
							}
						}
					}
					s.height = (m + 1) * s.wordHeight;
				}
				return s.height;
			}
			c.font = s.weight + " " + s.size + "pt " + s.font; 
			return c.measureText("O").width * 1.2;
		},
		getHeight : function (maskSize) {
			var s = this, h, my, mh;
			h = s._getHeight() * s.scaleY;
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				if (my > h) {
					return 0;
				}
				mh = s.mask.getHeight();
				if (my + mh > h) {
					return h - my;
				} else {
					return mh;
				}
			}
			return h;
		},
		wind : function (listener) {
			var s = this;
			s.wind_over_function = listener;
			s.windRunning = true;
			s._ll_wind_text = s.text;
			s.text = "";
			s._ll_wind_length = 0;
		},
		_ll_windRun : function () {
			var s = this;
			if (s._ll_wind_length > s._ll_wind_text.length) {
				s.windRunning = false;
				if (s.wind_over_function) {
					s.wind_over_function();
				}
				s.dispatchEvent(LTextEvent.WIND_COMPLETE);
				return;
			}
			s.text = s._ll_wind_text.substring(0, s._ll_wind_length);
			s._ll_wind_length++;
		},
		die : function () {
			LMouseEventContainer.removeInputBox(this);
		}
	};
	for (var k in p) {
		LTextField.prototype[k] = p[k];
	}
	return LTextField;
})();
var LBitmap = (function () {
	function LBitmap (bitmapdata) {
		var s = this;
		LExtends(s, LDisplayObject, []);
		s.type = "LBitmap";
		s.rotateCenter = true;
		s.bitmapData = bitmapdata; 
		if (s.bitmapData) {
			s.width = s.bitmapData.width;
			s.height = s.bitmapData.height;
		}
	}
	var p = {
		_canShow : function () {
			return (this.visible && this.bitmapData);
		}
		, _rotateReady : function () {
			var s = this;
			if (s.rotate != 0 && s.rotateCenter) {
				s.rotatex = s.getWidth() * 0.5;
				s.rotatey = s.getHeight() * 0.5;
			} else {
				s.rotatex = s.rotatey = 0;
			}
		},
		_coordinate : function (c) {},
		_ll_show : function () {
			this.ll_draw();
		},
		ll_draw : function () {
			var s = this;
			LGlobal.canvas.drawImage(s.bitmapData.image,
				s.bitmapData.x,
				s.bitmapData.y,
				s.bitmapData.width,
				s.bitmapData.height,
				s.x,
				s.y,
				s.bitmapData.width,
				s.bitmapData.height
			);
		},
		clone : function () {
			var s = this, a = new LBitmap(s.bitmapData.clone());
			a.copyProperty(s);
			a.rotateCenter = s.rotateCenter;
			return a;
		},
		ismouseon : function (e, cood) {
			var s = this;
			if (e == null || e == UNDEFINED) {
				return false;
			}
			if (!s.visible || !s.bitmapData) {
				return false;
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s.bitmapData.width, s.bitmapData.height]}], e.offsetX, e.offsetY);
		},
		getWidth : function (maskSize) {
			var s = this, w, mx, mw;
			w = s.bitmapData != null ? s.bitmapData.width * (s.scaleX > 0 ? s.scaleX : -s.scaleX) : 0;
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				if (mx > w) {
					return 0;
				}
				mw = s.mask.getWidth();
				if (mx + mw > w) {
					return w - mx;
				}else{
					return mw;
				}
			}
			return w;
		},
		getHeight : function (maskSize) {
			var s = this, h, my, mh;
			h = s.bitmapData != null ? s.bitmapData.height * (s.scaleY > 0 ? s.scaleY : -s.scaleY) : 0;
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				if (my > h) {
					return 0;
				}
				mh = s.mask.getHeight();
				if (my + mh > h) {
					return h - my;
				}else{
					return mh;
				}
			}
			return h;
		},
		startX : function () {
			return this.x;
		},
		startY : function () {
			return this.y;
		},
		die : function () {}
	};
	for (var k in p) {
		LBitmap.prototype[k] = p[k];
	}
	return LBitmap;
})();
var LBitmapData = (function () {
	function LBitmapData (image, x, y, width, height, dataType) {
		var s = this;
		LExtends (s, LObject, []);
		s.type = "LBitmapData";
		if (typeof dataType == UNDEFINED) {
			dataType = LBitmapData.DATA_IMAGE;
		}
		s.oncomplete = null;
		s._locked = false;
		s._setPixel = false;
		s.x = (x == null ? 0 : x);
		s.y = (y == null ? 0 : y);
		s.width = 0;
		s.height = 0;
		s.dataType = null;
		if (image && typeof image == "object") {
			s.image = image;
			s.dataType = LBitmapData.DATA_IMAGE;
			s.width = (width == null ? s.image.width : width);  
			s.height = (height == null ? s.image.height : height);
			s._setDataType(dataType);
		} else {
			s._createCanvas();
			s.dataType = LBitmapData.DATA_CANVAS;
			s._canvas.width = s.width = (width == null ? 1 : width); 
			s._canvas.height = s.height = (height == null ? 1 : height);
			var d = s._context.createImageData(s.width, s.height);
			if (typeof image == "string") {
				image = parseInt(image.replace("#","0x"));
			}
			if (typeof image == "number") {
				for (var i = 0; i < d.data.length; i += 4) {
					d.data[i + 0] = image >> 16 & 0xFF;
					d.data[i + 1] = image >> 8 & 0xFF;
					d.data[i + 2] = image & 0xFF;
					d.data[i + 3] = 255;
				}
			}
			s._context.putImageData(d, 0, 0);
			s.image = s._canvas;
			if (dataType == LBitmapData.DATA_IMAGE) {
				s._setDataType(dataType);
			}
		}
		s.resize();
	}
	LBitmapData.DATA_IMAGE = "data_image";
	LBitmapData.DATA_CANVAS = "data_canvas";
	var p = {
		_setDataType : function (dataType) {
			var s = this;
			if (s.dataType == dataType) {
				return;
			}
			if (dataType == LBitmapData.DATA_CANVAS) {
				s._createCanvas();
				s._canvas.width = s.image.width;
				s._canvas.height = s.image.height;
				s._context.clearRect(0, 0, s._canvas.width, s._canvas.height);
				s._context.drawImage(s.image, 0, 0);
				s.image = s._canvas;
			} else if (dataType == LBitmapData.DATA_IMAGE) {
				s.image = new Image();
				s.image.width = s._canvas.width;
				s.image.height = s._canvas.height;
				s.image.src = s._canvas.toDataURL();
			}
			s.dataType = dataType;
		},
		_createCanvas : function () {
			var s = this;
			if (!s._canvas) {
				s._canvas = document.createElement("canvas");
				s._context = s._canvas.getContext("2d");
			}
		},
		setProperties : function (x, y, width, height) {
			var s = this;
			s.x = x;
			s.y = y;
			s.width = width;
			s.height = height;
			s.resize();
		},
		setCoordinate : function (x, y) {
			var s = this;
			s.x = x;
			s.y = y;
			s.resize();
		},
		clone : function () {
			var s = this;
			return new LBitmapData(s.image, s.x, s.y, s.width, s.height, s.dataType);
		},
		_ready : function () {
			var s = this;
			s._dataType = s.dataType;
			s._setDataType(LBitmapData.DATA_CANVAS);
			s._data = s._context.getImageData(s.x, s.y, s.width, s.height);
		},
		_update : function () {
			var s = this;
			s._context.putImageData(s._data, s.x, s.y, 0, 0, s.width, s.height);
			s._setDataType(s._dataType);
		},
		getPixel : function (x, y, colorType) {
			var s = this, i, d;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			i = s.width * 4 * y + x * 4;
			d = s._data.data;
			if (!s._locked) {
				s._update();
			}
			if (colorType == "number") {
				return d[i] << 16 | d[i + 1] << 8 | d[i + 2];
			} else {
				return [d[i], d[i + 1], d[i + 2], d[i + 3]];
			}
		},
		setPixel : function (x, y, data) {
			var s = this;
	        x = x >> 0;
	        y = y >> 0;
			if (!s._locked) {
				s._ready();
			}
			var d = s._data, i = s._canvas.width * 4 * (s.y + y) + (s.x + x) * 4;
			if (typeof data == "object") {
				d.data[i + 0] = data[0];
				d.data[i + 1] = data[1];
				d.data[i + 2] = data[2];
				d.data[i + 3] = 255;
			} else {
				if (typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				d.data[i + 0] = data >> 16 & 0xFF;
				d.data[i + 1] = data >> 8 & 0xFF;
				d.data[i + 2] = data & 0xFF;
				d.data[i + 3] = 255;
			}
			if (!s._locked) {
				s._update();
			}
		},
		getPixels : function (rect) {
			var s = this, r;
			if (!s._locked) {
				s._ready();
			}
			r = s._context.getImageData(s.x + rect.x, s.y + rect.y, rect.width, rect.height);
			if (!s._locked) {
				s._update();
			}
			return r;
		},
		setPixels : function (rect, data) {
			var s = this, i, j, d, w, sd, x, y;
			if (!s._locked) {
				s._ready();
			}
			d = s._data;
			if (typeof data == "object") {
				w = s._canvas.width;
				for (x = rect.x; x < rect.right; x++) {
					for (y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						j = data.width * 4 * (y - rect.y) + (x - rect.x) * 4;
						d.data[i + 0] = data.data[j + 0];
						d.data[i + 1] = data.data[j + 1];
						d.data[i + 2] = data.data[j + 2];
						d.data[i + 3] = 255;
					}
				}
			} else {
				if (typeof data == "string") {
					data = parseInt(data.replace("#", "0x"));
				}
				data = [data >> 16 & 0xFF, data >> 8 & 0xFF, data & 0xFF];
				w = s._canvas.width;
				for (x = rect.x; x < rect.right; x++) {
					for (y = rect.y; y < rect.bottom; y++) {
						i = w * 4 * (s.y + y) + (s.x + x) * 4;
						d.data[i + 0] = data[0];
						d.data[i + 1] = data[1];
						d.data[i + 2] = data[2];
						d.data[i + 3] = 255;
					}
				}
			}
			if (!s._locked) {
				s._update();
			}
		},
		lock : function () {
			var s = this;
			s._locked = true;
			s._ready();
		},
		unlock : function () {
			var s = this;
			s._locked = false;
			s._update();
		},
		draw : function (source) {
			var s = this;
			if (s.dataType == LBitmapData.DATA_CANVAS) {
				s._context.clearRect(0, 0, s.width, s.height);
				s._context.drawImage(source.getDataCanvas(), 0, 0);
			} else if (s.dataType == LBitmapData.DATA_IMAGE) {
				s.image.src = source.getDataURL();
			}
			s.resize();
		},
		resize : function () {
			var s = this, w = s.image.width - s.x, h = s.image.height - s.y;
			s.width = s.width < w ? s.width : w;
			s.height = s.height < h ? s.height : h;
		}
	};
	for (var k in p) {
		LBitmapData.prototype[k] = p[k];
	}
	return LBitmapData;
})();
function LDropShadowFilter(distance,angle,color,blur){
	var s = this;
	base(s,LObject,[]);
	s.type = "LDropShadowFilter";
	s.distance=distance?distance:0;
	s.angle=angle?angle:0;
	s.shadowColor=color?color:"#000000";
	s.shadowBlur=blur?blur:20;
	s.setShadowOffset();
}
p = {
	setShadowOffset:function(){
		var s = this;
		var a = s.angle*Math.PI/180;
		s.shadowOffsetX=s.distance*Math.cos(a);
		s.shadowOffsetY=s.distance*Math.sin(a);
	},
	ll_show:function(){
		var s = this,c = LGlobal.canvas;
		c.shadowColor=s.shadowColor;
		c.shadowBlur=s.shadowBlur;
		c.shadowOffsetX=s.shadowOffsetX;
		c.shadowOffsetY=s.shadowOffsetY;
	},
	setDistance:function(distance){
		this.distance=distance;
		this.setShadowOffset();
	},
	setAngle:function(angle){
		this.angle=angle;
		this.setShadowOffset();
	},
	setColor:function(color){
		this.shadowColor=color;
	},
	setBlur:function(blur){
		this.shadowBlur=blur;
	}
};
for(var k in p)LDropShadowFilter.prototype[k]=p[k];
var LAnimation = (function () {
	function LAnimation(layer, data, list){
		var s = this;
		LExtends(s, LSprite, []);
		s.type = "LAnimation";
		s.rowIndex = 0;
		s.colIndex = 0;
		s.mode = 1;
		s.isMirror = false;
		s.bitmap =  new LBitmap(data);
		s.imageArray = list;
		s.addChild(s.bitmap);
		if (layer != null) {
			layer.addChild(s);
		}
		s.onframe();
		s.colIndex = 0;
	}
	var p = {
		setAction : function (rowIndex, colIndex, mode, isMirror){
			var s = this;
			if (rowIndex != null && rowIndex >= 0 && rowIndex < s.imageArray.length) {
				s.rowIndex = rowIndex;
			}
			if (colIndex != null && colIndex >= 0 && colIndex < s.imageArray[rowIndex].length) {
				s.colIndex = colIndex;
			}
			if (mode != null) {
				s.mode = mode;
			}
			if (isMirror != null) {
				s.isMirror = isMirror;
				if (s.isMirror) {
					s.bitmap.x = s.bitmap.getWidth();
					s.bitmap.scaleX = -1 * Math.abs(s.bitmap.scaleX);
				}else{
					s.bitmap.x = 0;
					s.bitmap.scaleX = Math.abs(s.bitmap.scaleX);
				}
			}
		},
		getAction : function () {
			var s = this;
			return [s.rowIndex, s.colIndex, s.mode, s.isMirror];
		},
		onframe : function (){
			var s = this, arr = s.imageArray[s.rowIndex][s.colIndex];
			if (typeof arr.width != UNDEFINED && typeof arr.height != UNDEFINED) {
				s.bitmap.bitmapData.setProperties(arr.x, arr.y, arr.width, arr.height);
			} else {
				s.bitmap.bitmapData.setCoordinate(arr.x, arr.y);
			}
			if (typeof arr.sx != UNDEFINED) {
				s.bitmap.x = arr.sx;
			}
			if (typeof arr.sy != UNDEFINED) {
				s.bitmap.y = arr.sy;
			}
			if (typeof arr.script == "function") {
				arr.script(s, arr.params);
			}
			s.colIndex += s.mode;
			if (s.colIndex >= s.imageArray[s.rowIndex].length || s.colIndex < 0) {
				s.colIndex = s.mode > 0 ? 0 : s.imageArray[s.rowIndex].length - 1;
				s.dispatchEvent(LEvent.COMPLETE);
			}
		},
		clone : function () {
			var s = this, a = new LAnimation(null, s.bitmap.bitmapData, s.imageArray.slice(0));
			a.copyProperty(s);
			a.childList.length = 0;
			a.bitmap = s.bitmap.clone();
			a.addChild(a.bitmap);
			return a;
		}
	};
	for (var k in p) {
		LAnimation.prototype[k] = p[k];
	}
	return LAnimation;
})();
var LAnimationTimeline = (function () {
	function LAnimationTimeline (data, list) {
		var s = this;
		LExtends(s, LAnimation, [null, data, list]);
		s.type = "LAnimationTimeline";
		s.speed = 0;
		s._speedIndex = 0;
		s.ll_labelList = {};
		s.addEventListener(LEvent.ENTER_FRAME, s._onframe);
	};
	var p = {
		clone : function () {
			var s = this, k, o, a = new LAnimation(null, s.bitmap.bitmapData, s.imageArray.slice(0));
			a.copyProperty(s);
			a.childList.length = 0;
			a.bitmap = s.bitmap.clone();
			a.addChild(a.bitmap);
			for (k in s.ll_labelList) {
				o = s.ll_labelList[k];
				a.ll_labelList[k] = {rowIndex : o.rowIndex, colIndex : o.colIndex, mode : o.mode, isMirror : o.isMirror};
			}
			return a;
		},
		_onframe : function (event) {
			var self = event.target;
			if (self._speedIndex++ < self.speed) {
				return;
			}
			self._speedIndex = 0;
			self.onframe();
		},
		setLabel : function (name, _rowIndex, _colIndex, _mode, _isMirror) {
			this.ll_labelList[name] = {rowIndex : _rowIndex, colIndex : _colIndex, mode : _mode, isMirror : _isMirror};
		},
		play : function () {
			this.mode = this.saveMode;
		},
		stop : function () {
			this.saveMode = this.mode;
			this.mode = 0;
		},
		gotoAndPlay : function (name) {
			var l = this.ll_labelList[name];
			this.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
		},
		gotoAndStop : function (name) {
			var l = this.ll_labelList[name];
			this.setAction(l.rowIndex, l.colIndex, l.mode, l.isMirror);
			this.stop();
		},
		addFrameScript : function (name, func, params) {
			var l = this.ll_labelList[name];
			var arr = this.imageArray[l.rowIndex][l.colIndex];
			arr.script = func;
			arr.params = params ? params : null;
		},
		removeFrameScript : function (name) {
			var l = this.ll_labelList[name];
			this.imageArray[l.rowIndex][l.colIndex].script = null;
		}
	};
	for (var k in p) {
		LAnimationTimeline.prototype[k] = p[k];
	}
	return LAnimationTimeline;
})();
function $LoadManage(){
	this.llname="ll.file.";
	this.llload="ll.load.";
}
$LoadManage.prototype={
	load:function(l,u,c){
		var s = this;
		s.list=l,s.onupdate=u,s.oncomplete=c;
		s.loader=s,s.index=0,s.loadIndex=0,s.result=[],s.lresult=[];
		s.loadInit();
	},
	loadInit:function(){
		var s = LLoadManage;
		if(s.index >= s.list.length){
			return;
		}
		s.loadIndex = 0;
		s.loadStart();
		s.reloadtime = setTimeout(s.loadInit,10000);
	},
	loadStart:function(){
		var s = LLoadManage,d;
		if(s.loadIndex >= s.list.length)return;
		d = s.list[s.loadIndex];
		if(!d.name){
			d.name = s.llname+s.loadIndex;
		}
		if(!s.lresult[s.llload+d.name]){
			if(d["type"] == "text" || d["type"] == "js"){
				s.loader = new LURLLoader();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path),d["type"]);
			}else if(d["type"] == "sound"){
				s.loader = new LSound();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path));
			}else{
				s.loader = new LLoader();
				s.loader.name = d.name;
				s.loader.addEventListener(LEvent.COMPLETE,s.loadComplete);
				s.loader.load(s.url(d.path),"bitmapData");
			}
		}
		s.loadIndex++;
		s.loadStart();
	},
	loadComplete:function(e){
		var s = LLoadManage;
		if(e  && e.target && e.target.name){
			if(e.target.name.indexOf(s.llname) >= 0){
				e.currentTarget = 1;
			}
			if(s.lresult[s.llload+e.target.name]){
				return;
			}
			s.result[e.target.name] = e.currentTarget;
			s.lresult[s.llload+e.target.name] = 1;
		}
		s.index++;
		if(s.onupdate){
			s.onupdate(Math.floor(s.index*100/s.list.length));
		}
		if(s.index >= s.list.length){
			if(s.reloadtime){
				clearTimeout(s.reloadtime);
			}
			s.loader = null;
			var r = s.result;
			s.oncomplete(r);
		}
	},
	url:function(u){
		if(!LGlobal.traceDebug)return u;
		return u+(u.indexOf('?')>=0?'&':'?')+'t='+(new Date()).getTime();
	}
};
var LEasing = {
	None:{
		easeIn:function(t,b,c,d){
			return b+t*c/d;
		}
	},
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Strong: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			var s;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c;s=p/4; }
			else s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - LEasing.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return LEasing.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return LEasing.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
var Quad = LEasing.Quad;
var Cubic = LEasing.Cubic;
var Quart = LEasing.Quart;
var Quint = LEasing.Quint;
var Sine = LEasing.Sine;
var Strong = LEasing.Strong;
var Expo = LEasing.Expo;
var Circ = LEasing.Circ;
var Elastic = LEasing.Elastic;
var Back = LEasing.Back;
var Bounce = LEasing.Bounce;
function $LTweenLiteChild($target,$duration,$vars){
	var s = this;
	s.objectIndex = s.objectindex = ++LGlobal.objectIndex;
	s.toNew=[];
	s.init($target,$duration,$vars);
}
$LTweenLiteChild.prototype = {
	init:function($target,$duration,$vars){
		var s = this,k=null;
		s.target=$target;s.duration=$duration || 0.001;s.vars=$vars;
		s.currentTime = (new Date()).getTime() / 1000;
		s.delay = s.vars.delay || 0;
		s.combinedTimeScale = s.vars.timeScale || 1;
		s.active = s.duration == 0 && s.delay == 0;
		s.varsto={};
		s.varsfrom={};
		if (typeof(s.vars.ease) != "function") {
			s.vars.ease = LEasing.None.easeIn;
		}
		s.ease = s.vars.ease;
		delete s.vars.ease;
		if(s.vars.onComplete){
			s.onComplete = s.vars.onComplete;
			delete s.vars.onComplete;
		}
		if(s.vars.onUpdate){
			s.onUpdate = s.vars.onUpdate;
			delete s.vars.onUpdate;
		}
		if(s.vars.onStart){
			s.onStart = s.vars.onStart;
			delete s.vars.onStart;
		}
		for(k in s.vars){
			s.varsto[k] = s.vars[k];
			s.varsfrom[k] = s.target[k];
		}
		s.initTime = s.currentTime;
		s.startTime = s.initTime + s.delay;
	},
	tween:function(){
		var s = this;
		var time = (new Date()).getTime() / 1000 , etime;
		etime = (time - s.startTime);
		if(etime < 0)return;
		var tweentype=null;
		for(tweentype in s.varsto){
			var v = s.ease(etime,s.varsfrom[tweentype],s.varsto[tweentype]-s.varsfrom[tweentype],s.duration);
			s.target[tweentype] = v;
		}
		if(s.onStart){
			s.onStart(s.target);
			delete s.onStart;
		}
		if (etime >= s.duration){
			for(tweentype in s.varsto)s.target[tweentype] = s.varsto[tweentype];
			if(s.onComplete)s.onComplete(s.target);
			return true;
		}else if(s.onUpdate){
			s.onUpdate(s.target);
		}
		return false;
	},
	to:function($target,$duration,$vars){
		var s = this;
		s.toNew.push({target:$target,duration:$duration,vars:$vars});
		return s;
	},
	keep:function(){
		var s = this;
		if(s.toNew.length > 0){
			var t = s.toNew.shift();
			if(t.vars.loop)s.loop = true;
			if(s.loop){
				var vs = {},k;
				for(k in t.vars)vs[k]=t.vars[k];
				s.to(t.target,t.duration,vs);
			}
			s.init(t.target,t.duration,t.vars);
			return true;
		}
		return false;
	}
};
function $LTweenLite(){}
$LTweenLite.prototype = {
	tweens:[],
	ll_show:null,
	frame:function(){
		var s = this;
		var i,length=s.tweens.length,t;
		for(i=0;i < length;i++){
			t = s.tweens[i];
			if(t && t.tween && t.tween()){
				s.tweens.splice(i,1);
				i--,length=s.tweens.length;
				if(t.keep())s.add(t);
			}
		}
		if(s.tweens.length == 0)s.ll_show = null;
	},
	to:function($target,$duration,$vars){
		if(!$target)return;
		var s = this;
		var tween = new $LTweenLiteChild({},0,{});
		s.tweens.push(tween);
		s.ll_show = s.frame;
		tween.to($target,$duration,$vars);
		return tween;
	},
	add:function(tween){
		this.tweens.push(tween);
	},
	remove:function(tween){
		var s = this;
		if(typeof tween == UNDEFINED)return;
		for(i=0,l=s.tweens.length;i < l;i++){
			if(tween.objectIndex == s.tweens[i].objectIndex){
				s.tweens.splice(i,1);
				break;
			}
		}
	},
	removeAll:function(){
		this.tweens.splice(0,this.tweens.length);
	}
};
function $Ajax(){}
$Ajax.prototype = {
	get:function(url, data, oncomplete,onerror){
		this.getRequest("GET",url, data, oncomplete,onerror);
	},
	post:function(url, data, oncomplete,onerror){
		this.getRequest("POST",url, data, oncomplete,onerror);
	},
	getRequest:function(t,url, d, oncomplete,err){
		var s = this,k,data="",a="";
		s.err = err;
		var ajax = s.getHttp();
		if (!ajax)return;
		if(d){
			for(k in d){
				data += (a+k+"="+d[k]);
				a="&";	
			}
		}
		if(t.toLowerCase() == "get"){
			url += ((url.indexOf('?')>=0?'&':'?')+data);
			data = null;
		}
		ajax.open(t, url, true);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.onreadystatechange = function(){
			if (ajax.readyState == 4){
				if(ajax.status >= 200 && ajax.status < 300 || ajax.status === 304){
					if (ajax.responseText.length > 0){
						oncomplete(ajax.responseText);
					}else{
						oncomplete(null);
					}
				}else{
					if(err)err(ajax);
				}
	 		}
		};
		ajax.send(data);
	},
	getHttp:function(){
		if (typeof XMLHttpRequest != UNDEFINED){
			return new XMLHttpRequest();
		}  
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e) {
				if(!this.err)this.err(e);
			}
		}
		return false;
	}
};
function LStageWebView(){
	var s = this;
	base(s,LEventDispatcher,[]);
	s.display = document.createElement("div");
	s.iframe = document.createElement("iframe");
	s.display.style.position = "absolute";
	s.display.style.marginTop = "0px";
	s.display.style.marginLeft = "0px";
	s.display.style.zIndex = 11;
	s.display.appendChild(s.iframe);
}
p = {
	loadURL:function(u){
		var s = this;
		s.iframe.src=u;
		s.iframe.onload=function(){
			s.dispatchEvent(LEvent.COMPLETE);
		};
	},
	show:function(){
		LGlobal.object.appendChild(this.display);
	},
	die:function(){
		LGlobal.object.removeChild(this.display);
	},
	setViewPort:function(r){
		var s = this,sx = parseInt(LGlobal.canvasObj.style.width)/LGlobal.canvasObj.width,sy = parseInt(LGlobal.canvasObj.style.height)/LGlobal.canvasObj.height;
		s.display.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + ((r.y*sy) >>> 0)) + "px";
		s.display.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + ((r.x*sx) >>> 0)) + "px";
		s.iframe.style.width = s.display.style.width = (r.width*sx >>> 0)+"px";
		s.iframe.style.height = s.display.style.height = (r.height*sy >>> 0)+"px";
	}
};
for(var k in p)LStageWebView.prototype[k]=p[k];
var FPS = (function () {
	function FPS(){
		var s = this;
		LExtends(s,LSprite,[]);
		s.fps = new LTextField();
		s.fpsCount = 0;
		s.fpsTime = (new Date()).getTime();
		s.fps.color = "#ffffff";
		s.addChild(s.fps);
		s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
	}
	FPS.prototype.showFPS = function(s){
		s.fpsCount++;
		var t = (new Date()).getTime();
		if(t - s.fpsTime < 1000)return;
		s.fpsTime = t;
		s.fps.text = s.fpsCount;
		s.fpsCount = 0;
		s.graphics.clear();
		s.graphics.drawRect(0,"#000000",[0,0,s.fps.getWidth(),20],true,"#000000");
	};
	return FPS;
})();
(function(){
	LAjax = new $Ajax();
	LLoadManage = new $LoadManage();
	LTweenLite = new $LTweenLite();
	LGlobal.childList.push(LTweenLite);
})();
function LQuadTree(rect){
	var self = this;
	self.q1 = null;
	self.q2 = null;
	self.q3 = null;
	self.q4 = null;
	self.parent = null;
	self.data = [];
	self.rect = rect;
	self.root = self;
}
LQuadTree.prototype = {
	createChildren:function (deep){
		if (deep == 0)return;
		var self = this;
		var hw = self.rect.width / 2 , hh = self.rect.height / 2;
		self.q1 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y, hw, hh));
		self.q2 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y + hh, hw, hh));
		self.q3 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y + hh, hw, hh));
		self.q4 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y, hw, hh));
		self.q1.parent = self.q2.parent = self.q3.parent = self.q4.parent = self;
		self.q1.root = self.q2.root = self.q3.root = self.q4.root = self.root;
		self.q1.createChildren(deep - 1);
		self.q2.createChildren(deep - 1);
		self.q3.createChildren(deep - 1);
		self.q4.createChildren(deep - 1);
	},
	hasChildren:function(){
		var self = this;
		return self.q1 && self.q2 && self.q3 && self.q4;
	},
	clear:function(){
		var self = this;
		if (self.hasChildren()){
			return self.q1.clear() || self.q2.clear()|| self.q3.clear() || self.q4.clear();
		}else{
			self.q1 = null;
			self.q2 = null;
			self.q3 = null;
			self.q4 = null;
			self.parent = null;
			self.data = [];
			return self;
		}
	},
	add:function(v, x, y){
		var self = this;
		if (!self.isIn(x,y))return null;
		if (self.hasChildren()){
			return self.q1.add(v,x,y) || self.q2.add(v,x,y) || self.q3.add(v,x,y) || self.q4.add(v,x,y);
		}else{
			self.data.push(v);
			return self;
		}
	},
	remove:function(v, x, y){
		var self = this;
		if (!self.isIn(x,y))return null;
		if (self.hasChildren()){
			return self.q1.remove(v,x,y) || self.q2.remove(v,x,y) || self.q3.remove(v,x,y) || self.q4.remove(v,x,y);
		}else{
			var index = self.data.indexOf(v);
			if (index!=-1){
				self.data.splice(index, 1);
				return self;
			}else{
				return null;
			}
		}
	},
	isIn:function(x, y){
		var self = this;
		return (typeof x == UNDEFINED || (x >= self.rect.x && x < self.rect.right)) && (typeof y == UNDEFINED || (y >= self.rect.y && y < self.rect.bottom));
	},
	getDataInRect:function(rect){
		var self = this;
		if (!self.rect.intersects(rect))return [];
		var r = self.data.concat();
		if (self.hasChildren()){
			r.push.apply(r,self.q1.getDataInRect(rect));
			r.push.apply(r,self.q2.getDataInRect(rect));
			r.push.apply(r,self.q3.getDataInRect(rect));
			r.push.apply(r,self.q4.getDataInRect(rect));
		}
		return r;
	},
	toString:function(){
		return "[LQuadTree]";
	}
};
function LoadingSample1(step,b,c){
	base(this,LSprite,[]);
	var s = this;
	s.numberList = new Array(
		[1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
		[0,1,0,1,1,0,0,1,0,0,1,0,0,1,0],
		[1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
		[1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
		[1,0,1,1,0,1,1,1,1,0,0,1,0,0,1],
		[1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
		[1,1,1,1,0,0,1,1,1,1,0,1,1,1,1],
		[1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
		[1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,1,1,1,0,1,1,1,1,0,0,1,1,1,1]
	);
	s.backgroundColor = b==null?"#000000":b;
	s.color = c==null?"#ffffff":c;
	s.progress = 0;
	s.step = step==null?LGlobal.width*0.5/15:step;
	s.back = new LSprite();
	s.addChild(s.back);
	s.num = new LSprite();
	s.addChild(s.num);
	s.num.mask = new LSprite();
	s.screenX = (LGlobal.width - s.step*15)/2;
	s.screenY = (LGlobal.height - s.step*5)/2;
	s.num.x = s.screenX;
	s.num.y = s.screenY;
	s.setProgress(s.progress);
}
LoadingSample1.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	var num_0="" , num_1 , num_2 , i;
	var s_x = s.step;
	if(value >= 100){
		num_0 = s.getNumber(1);
		num_1 = s.getNumber(0);
		num_2 = s.getNumber(0);
		s_x = s.step*3;
	}else if(value >= 10){
		num_1 = s.getNumber(Math.floor(value/10));
		num_2 = s.getNumber(value%10);
	}else{
		num_1 = s.getNumber(0);
		num_2 = s.getNumber(value);
	}
	s.back.graphics.clear();
	s.back.graphics.add(function(){
		c.beginPath();
		c.fillStyle = s.backgroundColor;
		c.fillRect(0,0,LGlobal.width,LGlobal.height);
		c.closePath();
		c.fillStyle = s.color;
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				c.fillRect(s.screenX + Math.floor(i%3)*s.step, 
				s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
			}
		}
		for(i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			c.fillRect(s.screenX + s_x + Math.floor(i%3)*s.step, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		for(i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			c.fillRect(s.screenX + s_x + Math.floor(i%3)*s.step + s.step*4, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		c.moveTo(s.screenX + s_x + s.step*9.7,s.screenY);
		c.lineTo(s.screenX + s_x + s.step*10.5,s.screenY);
		c.lineTo(s.screenX + s_x + s.step*9.3,s.screenY + s.step * 5);
		c.lineTo(s.screenX + s_x + s.step*8.5,s.screenY + s.step * 5);
		c.lineTo(s.screenX + s_x + s.step*9.7,s.screenY);
		c.fill();
		c.moveTo(s.screenX + s_x + s.step*8.5,s.screenY + s.step);
		c.arc(s.screenX + s_x + s.step*8.5,s.screenY + s.step
			,s.step*0.6,0,360+Math.PI/180);
		c.moveTo(s.screenX + s_x + s.step*10.5,s.screenY + s.step*4);
		c.arc(s.screenX + s_x + s.step*10.5,s.screenY + s.step*4
			,s.step*0.6,0,360+Math.PI/180);
		c.fill();
	});
	s.num.mask.graphics.clear();
	s.num.mask.graphics.add(function(){
		if(value >= 100){
			for(i=0;i<num_0.length;i++){
				if(num_0[i] == 0)continue;
				c.rect(s.screenX + Math.floor(i%3)*s.step, 
				s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
			}
		}
		for(var i=0;i<num_1.length;i++){
			if(num_1[i] == 0)continue;
			c.rect(s.screenX + s_x + Math.floor(i%3)*s.step, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
		for(var i=0;i<num_2.length;i++){
			if(num_2[i] == 0)continue;
			c.rect(s.screenX + s_x + Math.floor(i%3)*s.step + s.step*4, 
			s.screenY + Math.floor(i/3)*s.step, s.step, s.step);
		}
	});
	c.fillStyle = LGlobal._create_loading_color();
	s.num.graphics.clear();
	s.num.graphics.drawRect(1,c.fillStyle,[0,s.step*5*(100-value)*0.01,LGlobal.width,LGlobal.height],true,c.fillStyle);
};
LoadingSample1.prototype.getNumber = function (value){
	return this.numberList[value];
};
function LoadingSample2(size,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas,t = "Loading...",l;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.size = size==null?LGlobal.height*0.2:size;
	l = new LTextField();
	l.text = t;
	l.size = s.size;
	l.color = "#ffffff";
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2;
	s.addChild(l);
	s.backLabel = l;
	l = new LTextField();
	l.text = "***%";
	l.size = s.size*0.3;
	l.color = color;
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2 - s.size*0.4;
	s.addChild(l);
	s.progressLabel = l;
	l = new LTextField();
	l.text = t;
	l.size = s.size;
	l.color = s.color;
	l.x = (LGlobal.width - l.getWidth())/2;
	l.y = (LGlobal.height - s.size)/2;
	l.mask = new LGraphics();
	s.screenX = l.x;
	s.screenY = l.y;
	s.screenWidth = l.getWidth();
	s.addChild(l);
	s.showLabel=l;
	c.shadowOffsetX = 2;  
	c.shadowOffsetY = 2;
	c.shadowColor = "blue"; 
	s.setProgress(s.progress);
}
LoadingSample2.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	s.progressLabel.text = value + "%";
	s.showLabel.mask.clear();
	s.showLabel.mask.drawRect(0,"#000000",[s.screenX,0,s.screenWidth*value*0.01,LGlobal.height]);
	if(value >= 100){
		c.shadowOffsetX = 0;
		c.shadowOffsetY = 0;
	}
};
function LoadingSample3(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = LGlobal._create_loading_color();
	s.color = color;
	s.progress = 0;
	s.screenWidth = LGlobal.width*0.75;
	s.screenHeight = height==null?LGlobal.height*0.1:height;
	if(s.screenHeight > 5)s.screenHeight=5;
	s.screenX = (LGlobal.width - s.screenWidth)/2;
	s.screenY = (LGlobal.height - s.screenHeight)/2;
	s.back = new LSprite();
	s.addChild(s.back);
	s.label = new LTextField();
	s.label.color="#ffffff";
	s.label.weight="bolder";
	s.label.size = s.screenHeight * 2;
	s.label.x = s.screenX + (s.screenWidth - s.label.getWidth())*0.5;
	s.label.y = s.screenY - s.screenHeight * 4;
	s.addChild(s.label);
	s.star = new Array();
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample3.prototype.onframe = function(s){
	var i,star,l;
	if(s.progress>=100){
		if(s.star.length > 0){
			for(i=0,l=s.star.length;i<l;i++){
				s.removeChild(s.star[i]);
			}
			s.star.length = 0;
		}
		return;
	}
	for(i=0,l=s.star.length;i<l;i++){
		star = s.star[i];
		star.alpha -= 0.1;
		star.x += star.speedx;
		star.y += star.speedy;
		if(star.alpha <= 0){
			s.star.splice(i,1);
			s.removeChild(star);
			i--,l--;
		}
	}
	if(s.star.length < 10)s.addStar();
};
LoadingSample3.prototype.addStar = function(){
	var s = this,c = LGlobal.canvas;
	var star = new LSprite();
	var step = 1 + Math.floor(Math.random()*4);
	star.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#ffffff";
		c.lineTo(step*2,step);
		c.lineTo(step*4,0);
		c.lineTo(step*3,step*2);
		c.lineTo(step*4,step*4);
		c.lineTo(step*2,step*3);
		c.lineTo(0,step*4);
		c.lineTo(step,step*2);
		c.lineTo(0,0);
		c.fill();
	});
	star.x = s.screenX + s.screenWidth*s.progress*0.01;
	star.y=s.screenY;
	star.speedx = 4 - 8*Math.random();
	star.speedy = 4 - 8*Math.random();
	s.star.push(star);
	s.addChild(star);
};
LoadingSample3.prototype.setProgress = function (value){
	var s = this,c = LGlobal.canvas;
	if(value > 100)value=100;
	s.progress = value;
	s.back.graphics.clear();
	s.back.graphics.add(function (){
		c.beginPath();
		c.fillStyle = "#00FFFF";
		c.rect(s.screenX - 3, s.screenY - 3, s.screenWidth + 6, s.screenHeight + 6);
		c.fill();
		c.beginPath();
		c.fillStyle = "#990033";
		c.rect(s.screenX, s.screenY, s.screenWidth, s.screenHeight);
		c.fill();
		c.beginPath();
		c.fillStyle = s.color;
		c.rect(s.screenX, s.screenY, s.screenWidth*value*0.01, s.screenHeight);
		c.fill();
	});
	s.label.text = value + "%";
};
function LoadingSample4(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = "#FFFFFF";
	s.arc = new LSprite();
	s.arc.x = LGlobal.width*0.5;
	s.arc.y = LGlobal.height*0.5;
	s.addChild(s.arc);
	for(var i=0;i<360;i++){
		s.arc.graphics.drawArc(1+i/36,color,[0,0,50,(2*Math.PI/360)*i,(2*Math.PI/360)*(i+2)]);
	}
	s.progress = 0;
	s.label = new LTextField();
	s.label.color=color;
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.x = LGlobal.width*0.5;
	s.label.y = LGlobal.height*0.5-s.label.getHeight()*0.5;
	s.addChild(s.label);
	var shadow = new LDropShadowFilter(0,0,"#FFFFFF",30);
	s.arc.filters = [shadow];
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample4.prototype.onframe = function(event){
	event.target.arc.rotate += 20;
};
LoadingSample4.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.label.text = value + "%";
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};
function LoadingSample5(height,background,color){
	base(this,LSprite,[]);
	var s = this,c = LGlobal.canvas;
	s.backgroundColor = background==null?"#000000":background;
	s.graphics.drawRect(1,s.backgroundColor,[0,0,LGlobal.width,LGlobal.height],true,s.backgroundColor);
	if(color==null)color = "#FFFFFF";
	s.arc = new LSprite();
	s.arc.x = LGlobal.width*0.5;
	s.arc.y = LGlobal.height*0.5;
	s.addChild(s.arc);
	var r = 50;
	for(var i=0;i<360;i+=30){
		var child = new LSprite();
		child.graphics.drawArc(0,color,[r,0,7,0,2*Math.PI],true,color);
		child.rotate = i;
		child.alpha = 0.1+i/360;
		s.arc.addChild(child);
	}
	s.index = 0;
	s.max = 3;
	s.progress = 0;
	s.label = new LTextField();
	s.label.color="#FFFFFF";
	s.label.weight="bolder";
	s.label.size = 18;
	s.label.x = LGlobal.width*0.5;
	s.label.y = LGlobal.height*0.5-s.label.getHeight()*0.5;
	s.addChild(s.label);
	var shadow = new LDropShadowFilter(0,0,"#FFFFFF",30);
	s.arc.filters = [shadow];
	s.addEventListener(LEvent.ENTER_FRAME,s.onframe);
	s.setProgress(s.progress);
}
LoadingSample5.prototype.onframe = function(event){
	var s = event.target;
	if(s.index++ < s.max)return;
	s.index = 0;
	s.arc.rotate += 30;
};
LoadingSample5.prototype.setProgress = function (value){
	var s = this;
	if(value > 100)value=100;
	s.progress = value;
	s.label.text = value + "%";
	s.label.x = LGlobal.width*0.5-s.label.getWidth()*0.5;
};
function LoadingSample6(r,color,filterColor){
	var self = this;
	base(self,LSprite,[]);
	self.progress = 0;
	self.step = 0;
	self.holeR = r || 10;
	self.holeAmount = 5;
	self.holesx = 20;
	self.loadingBarWidth = self.holeR*2*self.holeAmount+self.holesx*(self.holeAmount-1);
	self.loadingBarHeight = self.holeR*2;
	self.progressColor = color || "#2187e7";
	self.filterColor = filterColor || "#00c6ff";
	self.backLayer = new LSprite();
	self.backLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#161616");
	self.addChild(self.backLayer);
	self.holeLayer = new LSprite();
	self.holeLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.holeLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.holeLayer);
	self.progressLayer = new LSprite();
	self.progressLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.progressLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.progressLayer);
	self._addHole();
}
LoadingSample6.prototype._addHole = function(){
	var self = this;
	var amount=self.holeAmount,sx=self.holeR*2+self.holesx,r=self.holeR;
	for(var i=0; i<amount; i++){
		var holeObj = new LSprite();
		holeObj.x = i*sx;
		holeObj.graphics.drawArc(1,"#111",[0,0,r,0,2*Math.PI],true,"#000");
		holeObj.graphics.drawArc(1,"#333",[0,0,r,1.7*Math.PI,0.7*Math.PI],false);
		self.holeLayer.addChild(holeObj);
	}
};
LoadingSample6.prototype.setProgress = function(value){
	var self = this;
	var sx=self.holeR*2+self.holesx,r=self.holeR;
	self.progress = value/100;
	var tweenList = new Array();
	while(Math.floor(self.progress/0.2) > self.step){
		var cw = r*2;
		var ch = cw;
		var grd = LGlobal.canvas.createLinearGradient(0,-ch*2,0,ch);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,self.progressColor);
		var po = new LSprite();
		po.x = self.step*sx;
		po.scaleX = 0;
		po.scaleY = 0;
		po.graphics.drawArc(0,"",[0,0,r,0,2*Math.PI],true,grd);
		self.progressLayer.addChild(po);
		tweenList.push(po);
		self.step ++;
	}
	var completeFunc = function(o){
		var circleObj = new LSprite();
		circleObj.alpha = 0.9;
		circleObj.x = o.x;
		circleObj.graphics.drawArc(1,self.filterColor,[0,0,r,0,2*Math.PI],false);
		self.progressLayer.addChild(circleObj);
		var shadow = new LDropShadowFilter(0,5,self.filterColor,10);
		circleObj.filters = [shadow];
		LTweenLite.to(circleObj,0.5,{
			scaleX: 1.7,
			scaleY: 1.7,
			alpha: 0,
			onComplete:function(s){
				s.parent.removeChild(s);
			}
		});
	};
	for(var i=0; i<tweenList.length; i++){
		var o = tweenList[i];
		LTweenLite.to(o,1,{
			scaleX: 1,
			scaleY: 1,
			onComplete:completeFunc
		});
	}
};
function LoadingSample7(w,h,color){
	var self = this;
	base(self,LSprite,[]);
	self.progress = 0;
	self.step = 0;
	self.holeW = w || 10;
	self.holeH = h || 30;
	self.holeAmount = 10;
	self.holesx = 8;
	self.loadingBarWidth = self.holeW*self.holeAmount+self.holesx*(self.holeAmount-1);
	self.loadingBarHeight = self.holeH;
	self.progressColor = color || "#2187e7";
	self.backLayer = new LSprite();
	self.backLayer.graphics.drawRect(0,"",[0,0,LGlobal.width,LGlobal.height],true,"#161616");
	self.addChild(self.backLayer);
	self.holeLayer = new LSprite();
	self.holeLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.holeLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.holeLayer);
	self.progressLayer = new LSprite();
	self.progressLayer.x = (LGlobal.width - self.loadingBarWidth)*0.5;
	self.progressLayer.y = (LGlobal.height - self.loadingBarHeight)*0.5;
	self.addChild(self.progressLayer);
	self._addHole();
}
LoadingSample7.prototype._addHole = function(){
	var self = this;
	var amount=self.holeAmount,sx=self.holeW+self.holesx,w=self.holeW,h=self.holeH;
	for(var i=0; i<amount; i++){
		var holeObj = new LSprite();
		holeObj.x = i*sx;
		holeObj.graphics.drawRect(1,"#333",[1,1,self.holeW,self.holeH],false);
		holeObj.graphics.drawRect(1,"#111",[0,0,self.holeW,self.holeH],true,"#000");
		self.holeLayer.addChild(holeObj);
		var grd = LGlobal.canvas.createLinearGradient(0,-h,0,h);
		grd.addColorStop(0,"white");
		grd.addColorStop(1,self.progressColor);
		var progressObj = new LSprite();
		progressObj.alpha = 0;
		progressObj.x = i*sx;
		progressObj.graphics.drawRect(0,"",[0,0,self.holeW,self.holeH],true,grd);
		self.progressLayer.addChild(progressObj);
	}
};
LoadingSample7.prototype.setProgress = function(value){
	var self = this;
	self.progress = value/100;
	if(Math.floor(self.progress/0.1) > self.step){
		var n = Math.ceil(self.progress/0.1);
		if(n > 10)n = 10;
		for(var i=0; i<n; i++){
			var sc = self.progressLayer.childList;
			if(sc[i].alpha > 0)continue;
			var o = self.progressLayer.childList[i];
			LTweenLite.to(o,1,{
				alpha: 1
			});
		}
		self.step ++;
	}
};
function LBox2d(gravity,doSleep,drawScale){
	var s = this;
	Box2D.Dynamics.b2World.prototype.LAddController=Box2D.Dynamics.b2World.prototype.AddController;
	Box2D.Dynamics.b2World.prototype.AddController=function(c){
		var l = {},k;
		for(k in c){
			l[k]=c[k];
		}
		if(LBox2d)LBox2d.m_controllerList = l;
		return this.LAddController(c);
	};
	var i,j,b=Box2D,d,
	a=[b.Collision,b.Common,b.Common.Math,
	b.Dynamics,b.Dynamics.Contacts,b.Dynamics.Controllers,b.Dynamics.Joints,b.Collision.Shapes];
	for(i in a)for(j in a[i])s[j]=a[i][j];
	if(typeof drawScale == UNDEFINED){
		drawScale = 30;
	}
	s.drawScale = 30;
	s.selectedBody = null;
	s.mouseJoint = null;
	s.mousePVec = null;
	s.contactListener = null;
	if(typeof gravity == UNDEFINED){
		gravity = new s.b2Vec2(0, 9.8);
	}else{
		gravity = new s.b2Vec2(gravity[0],gravity[1]);
	}
	if(typeof doSleep == UNDEFINED){
		doSleep = true;
	}
	s.world = new s.b2World(gravity,doSleep);
	s.removeList = new Array();
	if(LGlobal.traceDebug){
		d = new s.b2DebugDraw();
		d.SetSprite(LGlobal.canvas);
		d.SetLineThickness(1);
		d.SetFillAlpha(0.5);
		d.SetAlpha(1);
		d.SetDrawScale(s.drawScale);
		d.SetFlags(s.b2DebugDraw.e_shapeBit | s.b2DebugDraw.e_jointBit);
		s.world.SetDebugDraw(d);
	}
	LGlobal.destroy = true;
}
LBox2d.prototype = {
	setEvent:function(t_v,f_v){
		var s = this;
		if(t_v == LEvent.ENTER_FRAME){
			s.ll_enterFrame = f_v;
			return;
		}
		if(!s.contactListener){
			s.contactListener = new s.b2ContactListener();
			s.world.SetContactListener(s.contactListener);
		}
		switch(t_v){
			case LEvent.END_CONTACT:
				s.contactListener.EndContact = f_v;
				break;
			case LEvent.PRE_SOLVE:
				s.contactListener.PreSolve = f_v;
				break;
			case LEvent.POST_SOLVE:
				s.contactListener.PostSolve = f_v;
				break;
			case LEvent.BEGIN_CONTACT:
			default:
				s.contactListener.BeginContact = f_v;
		}
	},
	setWeldJoint:function(A,B){ 
		var s = this; 
		var j = new s.b2WeldJointDef();
		j.Initialize(B, A, B.GetWorldCenter());
		return s.world.CreateJoint(j);
	},
	setLineJoint:function(A,B,vec,t,m){
		var s = this; 
		var wa = new s.b2Vec2(vec[0],vec[1]);
		var j = new s.b2LineJointDef();
		j.Initialize(A, B, B.GetWorldCenter(), wa);
		if(t == null){
			j.enableLimit = false;
		}else{
			j.lowerTranslation = t[0];
			j.upperTranslation = t[1];
			j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorForce = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j);
	},
	setGearJoint:function(A,B,ra,r,p){ 
		var s = this; 
		var j = new s.b2GearJointDef();
		j.joint1 = r;
		j.joint2 = p;
		j.bodyA = A;
		j.bodyB = B;
		j.ratio = ra * s.b2Settings.b2_pi / (300 / s.drawScale);
		return s.world.CreateJoint(j);
	},
	setPrismaticJoint:function(A,B,vec,t,m){
		var s = this;
		var wa = new s.b2Vec2(vec[0],vec[1]);
		var j = new s.b2PrismaticJointDef();
		j.Initialize(B, A, B.GetWorldCenter(), wa);
		if(t == null){
			j.enableLimit = false;
		}else{
			j.lowerTranslation = t[0];
			j.upperTranslation = t[1];
			j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorForce = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j);
	},
	setRevoluteJoint:function(A,B,a,m){
		var s = this;
		var j  = new s.b2RevoluteJointDef();
		j .Initialize(A, B, B.GetWorldCenter());
		if(a == null){
			j.enableLimit = false;
		}else{
			j.lowerAngle = a[0] * s.b2Settings.b2_pi/180;
			j.upperAngle = a[1] * s.b2Settings.b2_pi/180;
			j.enableLimit = true;
		}
		if(m == null){
			j.enableMotor = false;
		}else{
			j.maxMotorTorque = m[0];
			j.motorSpeed = m[1];
			j.enableMotor = true;
		}
		return s.world.CreateJoint(j ); 
	},
	setDistanceJoint:function(A,B){
		var s = this;
		var j = new s.b2DistanceJointDef();
		j.Initialize(A, B, A.GetWorldCenter(), B.GetWorldCenter());
		return s.world.CreateJoint(j); 
	},
	setPulleyJoint:function(A,B,vA,vB,ratio){
		var s = this;
		var a1 = A.GetWorldCenter();  
		var a2 = B.GetWorldCenter();
		var g1 = new s.b2Vec2(a1.x + (vA[0] / s.drawScale), a1.y + (vA[1] / s.drawScale));
		var g2 = new s.b2Vec2(a2.x + (vB[0] / s.drawScale), a2.y + (vB[1] / s.drawScale));
		var j = new s.b2PulleyJointDef();  
		j.Initialize(A, B, g1, g2, a1, a2,ratio);  
		j.maxLengthA = vA[2] / s.drawScale;
		j.maxLengthB = vB[2] / s.drawScale;
		return s.world.CreateJoint(j);
	},
	addCircle:function(r,cx,cy,t,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		s.bodyDef.type = t;
		s.fixDef = new s.b2FixtureDef;
		s.fixDef.density = d;
		s.fixDef.friction = f;
		s.fixDef.restitution = e;
		s.fixDef.shape = new s.b2CircleShape( r );
		s.bodyDef.position.x = cx;
		s.bodyDef.position.y = cy;
		var shape = s.world.CreateBody(s.bodyDef);
		shape.CreateFixture(s.fixDef);
		return shape;
	},
	addPolygon:function(w,h,cx,cy,type,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		s.bodyDef.type = type;
		s.fixDef = new s.b2FixtureDef;
		s.fixDef.density = d;
		s.fixDef.friction = f;
		s.fixDef.restitution = e;
		s.fixDef.shape = new s.b2PolygonShape;
		s.fixDef.shape.SetAsBox(w,h);
		s.bodyDef.position.x = cx;
		s.bodyDef.position.y = cy;
		var shape = s.world.CreateBody(s.bodyDef);
		shape.CreateFixture(s.fixDef);
		return shape;
	},
	addVertices:function(vertices,type,d,f,e){
		var s = this;
		s.bodyDef = new s.b2BodyDef;
		s.bodyDef.type = type;
		var shape = s.world.CreateBody(s.bodyDef);
		for(var i = 0,l=vertices.length; i<l; i++){
			s.createShapeAsArray(shape,vertices[i],type,d,f,e);
		}
		return shape;
	},
	createShapeAsArray:function(c,vertices,type,d,f,e){
		var s = this;
		var shape = new s.b2PolygonShape();
		var sv = s.createVerticesArray(vertices);
		shape.SetAsArray(sv,0);
		var def = new s.b2FixtureDef();
		def.shape = shape;
		def.density = d;
		def.friction = f;
		def.restitution = e;
		c.CreateFixture(def);
	},
	createVerticesArray:function(a){
		var s = this;
		var v = new Array();
		if(a.length < 3)return v;
		for (var i = 0,l=a.length; i<l; i++){
			v.push(new s.b2Vec2(a[i][0]/s.drawScale, a[i][1]/s.drawScale));
		}
		return v;
	},
	getBodyAtMouse:function (mouseX, mouseY) { 
 		var s = this;
		s.mousePVec = new s.b2Vec2(mouseX, mouseY);
		var aabb = new s.b2AABB();
		aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
		aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
		s.selectedBody = null;
		s.world.QueryAABB(s.getBodyCallBack, aabb);
		return s.selectedBody;
	},
	getBodyCallBack:function (fixture) {
		var s = LGlobal.box2d;
		if(fixture.GetBody().GetType() != s.b2Body.b2_staticBody) {
			if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), s.mousePVec)) {
				s.selectedBody = fixture.GetBody();
				return false;
			}
		}
		return true;
	},
	ll_show:function(){
		var s = this,k=null;
		for(k in s.removeList){
			s.world.DestroyBody(s.removeList[k]);
		}
		s.removeList.splice(0,s.removeList.length);
		if(s.ll_enterFrame)s.ll_enterFrame({target:s});
		s.world.Step(1 / 30,10,10);
		s.world.ClearForces();
		if(LGlobal.traceDebug){
			s.world.DrawDebugData();
		}
	},
	synchronous:function(){
		var s = this;
		var parent = null,child,position=null,cx=0,cy=0,currentBody,joint;
		for (currentBody=s.world.GetBodyList(); currentBody; currentBody=currentBody.GetNext()) {
			child = currentBody.GetUserData();
			if(child){
				if(position==null){
					parent = child.parent;
					cx = currentBody.GetPosition().x;
					cy = currentBody.GetPosition().y;
				}
				currentBody.SetPosition(new s.b2Vec2(
					(child.x + child.rotatex + parent.x)/s.drawScale,
					(child.y + child.rotatey + parent.y)/s.drawScale ));
				if(position==null){
					position = {x:(currentBody.GetPosition().x - cx),y:(currentBody.GetPosition().y - cy)};
				}
			}
		}
		for (joint=s.world.GetJointList(); joint; joint=joint.GetNext()) {
			if(joint.m_groundAnchor1){
				joint.m_groundAnchor1.x += position.x;
				joint.m_groundAnchor1.y += position.y;
			}
			if(joint.m_groundAnchor2){
				joint.m_groundAnchor2.x += position.x;
				joint.m_groundAnchor2.y += position.y;
			}
		}
		if(LBox2d.m_controllerList && s.world.m_controllerList && parent){
			LGlobal.box2d.world.m_controllerList.offset = LBox2d.m_controllerList.offset - parent.y / LGlobal.box2d.drawScale;
		}
	}
};
LSprite.prototype.setBodyMouseJoint = function(value){
	var s = this;
	if(!s.box2dBody)return;
	s.box2dBody.mouseJoint = value;
};
LSprite.prototype.clearBody = function(value){
	var s = this;
	if(!s.box2dBody)return;
	LGlobal.box2d.removeList.push(s.box2dBody);
	s.box2dBody = null;
};
LSprite.prototype.addBodyCircle = function(radius,cx,cy,type,density,friction,restitution){
	var s = this;
	s.rotatex = radius;
	s.rotatey = radius;
	s.box2dBody = LGlobal.box2d.addCircle(
		radius/LGlobal.box2d.drawScale,
		(s.x+cx)/LGlobal.box2d.drawScale,
		(s.y+cy)/LGlobal.box2d.drawScale,
		(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
		density==null?.5:density,
		friction==null?0.4:friction,
		restitution==null?0.8:restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyPolygon = function(w,h,type,density,friction,restitution){
	var s = this;
	s.rotatex = w/2;
	s.rotatey = h/2;
	s.box2dBody = LGlobal.box2d.addPolygon(
		w*0.5/LGlobal.box2d.drawScale,
		h*0.5/LGlobal.box2d.drawScale,
		s.x/LGlobal.box2d.drawScale,
		s.y/LGlobal.box2d.drawScale,
		(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
		density==null?.5:density,
		friction==null?0.4:friction,
		restitution==null?0.8:restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyVertices = function(vertices,cx,cy,type,density,friction,restitution){
	var s = this;
	s.rotatex = 0;
	s.rotatey = 0;
	s.box2dBody = LGlobal.box2d.addVertices(vertices,
		(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density,friction,restitution);
	s.box2dBody.SetUserData(s);
	s.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((s.x+cx)/LGlobal.box2d.drawScale,(s.y+cy)/LGlobal.box2d.drawScale));
};
LGlobal.mouseJoint_start = function(eve){
	if(LGlobal.box2d.mouseJoint)return;
	var mX = eve.offsetX / LGlobal.box2d.drawScale
	,mY = eve.offsetY / LGlobal.box2d.drawScale
	,b = LGlobal.box2d.getBodyAtMouse(mX, mY);
	if(b && b.mouseJoint) {
		var m = new LGlobal.box2d.b2MouseJointDef();
		m.bodyA = LGlobal.box2d.world.GetGroundBody();
		m.bodyB = b;
		m.target.Set(mX, mY);
		m.collideConnected = true;
		m.maxForce = 300000.0 * b.GetMass();
		LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(m);
		b.SetAwake(true);
	};
};
LGlobal.mouseJoint_move = function(eve){
	if(!LGlobal.box2d.mouseJoint)return;
	mX = eve.offsetX / LGlobal.box2d.drawScale,
	mY = eve.offsetY / LGlobal.box2d.drawScale;
	if(LGlobal.box2d.mouseJoint) {
		LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mX, mY));
	}
};
function LTransition(displayObject,transObj){
	this.child = displayObject;
	this.trans = transObj;
}
LTransition.prototype={
	startTransition:function(){
		var self = this;
		switch(self.trans.type){
			case LTransition.Blinds:
				self.blinds();
				break;
			case LTransition.Fade:
				self.fade();
				break;
			case LTransition.Fly:
				self.fly();
				break;
			case LTransition.Iris:
				self.iris();
				break;
			case LTransition.Squeeze:
				self.squeeze();
				break;
			case LTransition.Wipe:
				self.wipe();
				break;
			case LTransition.Zoom:
				self.zoom();
				break;
			case LTransition.PixelDissolve:
				self.pixelDissolve();
				break;
			case LTransition.Curtain:
				self.curtain();
				break;
			default:
				throw("the type is not exists.");
		}
	},
	blindsComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.blindsUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	blindsUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		if(self.trans.dimension){
			g.add(function(){
				c.save();
				for(var i=0;i<self.trans.numStrips;i++){
					c.rect(i*self.maxSize,0,self.blindsSize,self.child.getHeight());
				}
				c.restore();
			});
		}else{
			g.add(function(){
				c.save();
				for(var i=0;i<self.trans.numStrips;i++){
					c.rect(0,0 + i*self.maxSize,self.child.getWidth(),self.blindsSize);
				}
				c.restore();
			});
		}
	},
	blindsUpdate:function(self){
		self.blindsUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	blinds:function(){
		var self = this;
		if(!self.trans.numStrips)self.trans.numStrips = 1;
		self.blindsSize = 0;
		if(self.trans.dimension){
			self.maxSize = self.child.getWidth()/self.trans.numStrips >> 0;
		}else{
			self.maxSize = self.child.getHeight()/self.trans.numStrips >> 0;
		}
		var g = new LGraphics();
		self.child.mask = g;
		var toSize = self.maxSize;
		if(self.trans.direction == LTransition.OUT){
			self.blindsSize = self.maxSize;
			toSize = 0;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                blindsSize:toSize,
	                onComplete:self.blindsComplete,
			onUpdate:self.blindsUpdate,
	                ease:self.trans.easing
	        });
	},
	fadeComplete:function(self){
		self.child.alpha = self.alpha;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	fadeUpdate:function(self){
		self.child.alpha = self.alpha;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	fade:function(){
		var self = this;
		var toAlpha = 1;
		self.alpha = 0;
		if(self.trans.direction == LTransition.OUT){
			self.alpha = 1;
			toAlpha = 0;
		}
		self.child.alpha = self.alpha;
	        LTweenLite.to(self,self.trans.duration,
	        {
	                alpha:toAlpha,
	                onComplete:self.fadeComplete,
			onUpdate:self.fadeUpdate,
	                ease:self.trans.easing
	        });
	},
	flyComplete:function(self){
		self.child.x = self.x;
		self.child.y = self.y;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	flyUpdate:function(self){
		self.child.x = self.x;
		self.child.y = self.y;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	fly:function(){
		var self = this;
		var toX = self.child.x;
		var toY = self.child.y;
		switch(self.trans.startPoint){
			case 1:
				self.x = -self.child.getWidth();
				self.y = -self.child.getHeight();
				break;
			case 2:
				self.x = (LGlobal.width-self.child.getWidth())*0.5;
				self.y = -self.child.getHeight();
				break;
			case 3:
				self.x = LGlobal.width;
				self.y = -self.child.getHeight();
				break;
			case 4:
				self.x = -self.child.getWidth();
				self.y = (LGlobal.height-self.child.getHeight())*0.5;
				break;
			case 6:
				self.x = LGlobal.width;
				self.y = (LGlobal.height-self.child.getHeight())*0.5;
				break;
			case 7:
				self.x = -self.child.getWidth();
				self.y = LGlobal.height;
				break;
			case 8:
				self.x = (LGlobal.width-self.child.getWidth())*0.5;
				self.y = LGlobal.height;
				break;
			case 9:
				self.x = LGlobal.width;
				self.y = LGlobal.height;
				break;
			case 5:
			default:
				self.x = (LGlobal.width-self.child.getWidth())*0.5;
				self.y = (LGlobal.height-self.child.getHeight())*0.5;
		}
		if(self.trans.direction == LTransition.OUT){
			var toX = self.x;
			var toY = self.y;
			self.x = self.child.x;
			self.y = self.child.y;
		}else{
			self.child.x = self.x;
			self.child.y = self.y;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                x:toX,
	                y:toY,
	                onComplete:self.flyComplete,
			onUpdate:self.flyUpdate,
	                ease:self.trans.easing
	        });
	},
	irisComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.irisUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	irisUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		if(self.trans.shape == LIris.CIRCLE){
			g.drawArc(0,"#000000",[self.x,self.y,self.r,0,Math.PI*2]);
		}else{
			g.drawRect(0,"#000000",[self.x+self.sLeft,self.y+self.sTop,self.width,self.height]);
		}
	},
	irisUpdate:function(self){
		self.irisUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	iris:function(){
		var self = this;
		self.sLeft = 0;
		self.sTop = 0;
		self.width = 0;
		self.height = 0;
		self.x = 0;
		self.y = 0;
		self.r = 0;
		self.eWidth = self.child.getWidth();
		self.eHeight = self.child.getHeight();
		switch(self.trans.startPoint){
			case 1:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				break;
			case 2:
				self.eR = Math.sqrt((self.eWidth*0.5)*(self.eWidth*0.5)+self.eHeight*self.eHeight);
				self.x = self.child.getWidth()*0.5;
				break;
			case 3:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				self.x = self.child.getWidth();
				break;
			case 4:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+(self.eHeight*0.5)*(self.eHeight*0.5));
				self.y = self.child.getHeight()*0.5;
				break;
			case 6:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+(self.eHeight*0.5)*(self.eHeight*0.5));
				self.x = self.child.getWidth();
				self.y = self.child.getHeight()*0.5;
				break;
			case 7:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				self.y = self.child.getHeight();
				break;
			case 8:
				self.eR = Math.sqrt((self.eWidth*0.5)*(self.eWidth*0.5)+self.eHeight*self.eHeight);
				self.x = self.child.getWidth()*0.5;
				self.y = self.child.getHeight();
				break;
			case 9:
				self.eR = Math.sqrt(self.eWidth*self.eWidth+self.eHeight*self.eHeight);
				self.x = self.child.getWidth();
				self.y = self.child.getHeight();
				break;
			case 5:
			default:
				self.eR = Math.sqrt((self.eWidth*0.5)*(self.eWidth*0.5)+(self.eHeight*0.5)*(self.eHeight*0.5));
				self.x = self.child.getWidth()*0.5;
				self.y = self.child.getHeight()*0.5;
		}
		self.eLeft = -self.x;
		self.eTop = -self.y;
		var g = new LGraphics();
		self.child.mask = g;
		var toSize = self.maxSize;
		if(self.trans.direction == LTransition.OUT){
			self.sLeft = self.eLeft;
			self.sTop = self.eTop;
			self.eLeft = 0;
			self.eTop = 0;
			self.width = self.eWidth;
			self.height = self.eHeight;
			self.eWidth = 0;
			self.eHeight = 0;
			self.r = self.eR;
			self.eR = 0;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                width:self.eWidth,
	                height:self.eHeight,
			sLeft:self.eLeft,
			sTop:self.eTop,
			r:self.eR,
	                onComplete:self.irisComplete,
			onUpdate:self.irisUpdate,
	                ease:self.trans.easing
	        });
	},
	curtainComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.curtainUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	curtainUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		if(self.trans.dimension){
			g.add(function(){
				c.save();
				c.rect(0,0,self.width,self.child.getHeight());
				c.rect(self.child.getWidth()-self.width,0,self.width,self.child.getHeight());
				c.restore();
			});
		}else{
			g.add(function(){
				c.save();
				c.rect(0,0,self.child.getWidth(),self.height);
				c.rect(0,self.child.getHeight()-self.height,self.child.getWidth(),self.height);
				c.restore();
			});
		}
	},
	curtainUpdate:function(self){
		self.curtainUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	curtain:function(){
		var self = this;
		var eW = self.child.getWidth()*0.5;
		var eH = self.child.getHeight()*0.5;
		if(self.trans.dimension){
			eH = 0;
		}else{
			eW = 0;
		}
		self.width = 0;
		self.height = 0;
		var g = new LGraphics();
		self.child.mask = g;
		var toSize = self.maxSize;
		if(self.trans.direction == LTransition.OUT){
			self.width = eW;
			self.height = eH;
			eW = 0;
			eH = 0;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                width:eW,
	                height:eH,
	                onComplete:self.curtainComplete,
			onUpdate:self.curtainUpdate,
	                ease:self.trans.easing
	        });
	},
	squeezeComplete:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	squeezeUpdate:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	squeeze:function(){
		var self = this;
		var toScaleX = 1,toScaleY = 1;
		self.scaleX = 0,self.scaleY = 0;
		if(self.trans.dimension){
			self.scaleX = 1;
		}else{
			self.scaleY = 1;
		}
		if(self.trans.direction == LTransition.OUT){
			toScaleX = self.scaleX,toScaleY = self.scaleY;
			self.scaleX = 1,self.scaleY = 1;
		}
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
	        LTweenLite.to(self,self.trans.duration,
	        {
	                scaleX:toScaleX,
	                scaleY:toScaleY,
	                onComplete:self.squeezeComplete,
			onUpdate:self.squeezeUpdate,
	                ease:self.trans.easing
	        });
	},
	zoomComplete:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	zoomUpdate:function(self){
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	zoom:function(){
		var self = this;
		var toScaleX = 1,toScaleY = 1;
		self.scaleX = 0,self.scaleY = 0;
		if(self.trans.direction == LTransition.OUT){
			toScaleX = 0,toScaleY = 0;
			self.scaleX = 1,self.scaleY = 1;
		}
		self.child.scaleX = self.scaleX;
		self.child.scaleY = self.scaleY;
	        LTweenLite.to(self,self.trans.duration,
	        {
	                scaleX:toScaleX,
	                scaleY:toScaleY,
	                onComplete:self.zoomComplete,
			onUpdate:self.zoomUpdate,
	                ease:self.trans.easing
	        });
	},
	wipeComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.wipeUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	wipeUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas;
		g.clear();
		g.drawVertices(0,"#000000",[[self.leftTopX,self.leftTopY],[self.leftBottomX,self.leftBottomY],[self.rightBottomX,self.rightBottomY],[self.rightTopX,self.rightTopY]]);
	},
	wipeUpdate:function(self){
		self.wipeUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	wipe:function(){
		var self = this,w=self.child.getWidth(),h=self.child.getHeight(),
		ltX = self.leftTopX = 0,
		ltY = self.leftTopY = 0,
		lbX = self.leftBottomX = 0,
		lbY = self.leftBottomY = h,
		rtX = self.rightTopX = w,
		rtY = self.rightTopY = 0,
		rbX = self.rightBottomX = w,
		rbY = self.rightBottomY = h;
		switch(self.trans.startPoint){
			case 1:
				ltX = self.leftTopX = -w;
				lbX = self.leftBottomX = -w*2;
				self.rightTopX = 0;
				rtX = w*2;
				self.rightBottomX = -w;
				rbX = w;
				break;
			case 2:
				ltY = self.leftTopY = -h;
				self.leftBottomY = 0;
				lbY = h;
				rtY = self.rightTopY = -h;
				self.rightBottomY = 0;
				rbY = h;
				break;
			case 3:
				self.leftTopX = w;
				ltX = -w;
				self.leftBottomX = w*2;
				lbX = 0;
				rtX = self.rightTopX = w*2;
				rbX = self.rightBottomX = w*3;
				break;
			case 4:
				self.rightTopX = 0;
				rtX = w;
				self.rightBottomX = 0;
				rbX = w;
				break;
			case 6:
				self.leftTopX = w;
				ltX = 0;
				self.leftBottomX = w;
				lbX = 0;
				break;
			case 7:
				lbX = self.leftBottomX = -w;
				ltX = self.leftTopX = -w*2;
				self.rightBottomX = 0;
				rbX = w*2;
				self.rightTopX = -w;
				rtX = w;
				break;
			case 8:
				lbY = self.leftBottomY = h;
				self.leftTopY = h;
				ltY = 0;
				rbY = self.rightBottomY = h;
				self.rightTopY = h;
				rtY = 0;
				break;
			case 9:
				self.leftBottomX = w;
				lbX = -w;
				self.leftTopX = w*2;
				ltX = 0;
				rbX = self.rightBottomX = w*2;
				rtX = self.rightTopX = w*3;
				break;
			case 5:
			default:
				self.leftTopX = w*0.5;
				self.leftTopY = h*0.5;
				self.rightTopX = w*0.5;
				self.rightTopY = h*0.5;
				self.leftBottomX = w*0.5;
				self.leftBottomY = h*0.5;
				self.rightBottomX = w*0.5;
				self.rightBottomY = h*0.5;
				ltX = 0,ltY = 0;
				lbX = 0,lbY = h;
				rtX = w,rtY = 0;
				rbX = w,rbY = h;
		}
		var g = new LGraphics();
		self.child.mask = g;
		if(self.trans.direction == LTransition.OUT){
			var oltX=ltX,oltY=ltY,olbX=lbX,olbY=lbY,ortX=rtX,ortY=rtY,orbX=rbX,orbY=rbY;
			ltX=self.leftTopX,ltY=self.leftTopY,lbX=self.leftBottomX,lbY=self.leftBottomY,rtX=self.rightTopX,rtY=self.rightTopY,rbX=self.rightBottomX,rbY=self.rightBottomY;
			self.leftTopX=oltX,self.leftTopY=oltY,self.leftBottomX=olbX,self.leftBottomY=olbY,self.rightTopX=ortX,self.rightTopY=ortY,self.rightBottomX=orbX,self.rightBottomY=orbY;
		}
	        LTweenLite.to(self,self.trans.duration,
	        {
	                leftTopX:ltX,
	                leftTopY:ltY,
	                leftBottomX:lbX,
	                leftBottomY:lbY,
	                rightTopX:rtX,
	                rightTopY:rtY,
	                rightBottomX:rbX,
	                rightBottomY:rbY,
	                onComplete:self.wipeComplete,
			onUpdate:self.wipeUpdate,
	                ease:self.trans.easing
	        });
	},
	pixelDissolveComplete:function(self){
		if(self.trans.direction == LTransition.OUT){
			self.child.mask.clear();
		}else{
			self.pixelDissolveUpdateRun();
		}
		self.child.mask = null;
		if(self.trans.onComplete){
			self.trans.onComplete(self.child);
		}
	},
	pixelDissolveUpdateRun:function(){
		var self=this,g = self.child.mask,c = LGlobal.canvas,list;
		g.clear();
		g.add(function(){
			c.save();
			for(var i=0;i<self.index;i++){
				list = self.list[i];
				c.rect(list[0]*self.w,list[1]*self.h,self.w,self.h);
			}
			c.restore();
		});
	},
	pixelDissolveUpdate:function(self){
		self.pixelDissolveUpdateRun();
		if(self.trans.onUpdate){
			self.trans.onUpdate(self.child);
		}
	},
	pixelDissolve:function(){
		var self = this;
		var g = new LGraphics();
		self.child.mask = g;LGlobal.mg = g;
		self.w = self.child.getWidth()/self.trans.xSections,
		self.h = self.child.getHeight()/self.trans.ySections;
		self.list = [];
		for(var i=0;i<self.trans.xSections;i++){
			for(var j=0;j<self.trans.ySections;j++){
				self.list.push([i,j]);
			}
		}
		self.index=0;
		var to = self.trans.xSections*self.trans.ySections;
		if(self.trans.direction == LTransition.OUT){
			self.index = to;
			to = 0;
		}
		self.list = self.list.sort(function(a,b){return Math.random()>0.5;});
		self.pixelDissolveUpdateRun();
	        LTweenLite.to(self,self.trans.duration,
	        {
	                index:to,
	                onComplete:self.pixelDissolveComplete,
			onUpdate:self.pixelDissolveUpdate,
	                ease:self.trans.easing
	        });
	}
};
LTransition.IN = "in";
LTransition.OUT = "out";
LTransition.Blinds = 1;
LTransition.Fade = 2;
LTransition.Fly = 3;
LTransition.Iris = 4;
LTransition.Curtain = 5;
LTransition.PixelDissolve = 6;
LTransition.Squeeze = 7;
LTransition.Wipe = 8;
LTransition.Zoom = 9;
function LIris(){}
LIris.SQUARE = 0;
LIris.CIRCLE = 1;
function LTransitionManager(displayObject){
	this.child = displayObject;
}
LTransitionManager.prototype={
	startTransition:function(transObj){
		return LTransitionManager.start(this.child,transObj);
	}
};
LTransitionManager.start = function(displayObject,transObj){
	if(!LTweenLite)throw("you need load the LTweenLite.");
	var trans = new LTransition(displayObject,transObj);
	trans.startTransition();
	return trans;
};
function LFlash(){}
LFlash.SpriteSheetConvert = function(frames){
	var result = [],child;
	for(var i=0;i<frames.length;i++){
		child = frames[i];
		result.push({x:child.frame.x,sx:child.spriteSourceSize.x,y:child.frame.y,sy:child.spriteSourceSize.y,width:child.frame.w,height:child.frame.h});
	}
	return result;
};