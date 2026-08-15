import{F as e,Fn as t,Gn as n,I as r,K as i,L as a,N as o,P as s,Rt as c,Tt as l,W as u,jt as d,vr as f,vt as p,xt as m}from"./BaEEoViM.js";import{t as h}from"./2vgZAXFB.js";import{t as g}from"./DsoLlSbk.js";import{r as _}from"./M-9hPuet.js";import{a as v}from"./CVaKQrwR.js";import{t as y}from"./D9VHCR1W.js";var b=class{isAnimationStarted=!1;fpsInterval;startTime;now;then;elapsed;requestAnimationId=0;constructor(){}onFrame=()=>{};startAnimating(e){this.isAnimationStarted||=(this.fpsInterval=1e3/e,this.then=Date.now(),this.startTime=this.then,this.animate(),!0)}stopAnimating(){this.isAnimationStarted&&=(cancelAnimationFrame(this.requestAnimationId),!1)}animate(){this.requestAnimationId=requestAnimationFrame(()=>{this.animate()}),this.now=Date.now(),this.elapsed=this.now-this.then,this.elapsed>this.fpsInterval&&(this.then=this.now-this.elapsed%this.fpsInterval,this.onFrame())}},x=`#version 300 es
    precision highp float;
    in vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform sampler2D uSampler1;
    uniform sampler2D uSampler2;
    uniform sampler2D uSampler3;
    uniform sampler2D uSampler4;
    uniform sampler2D uSampler5;
    uniform sampler2D uSampler6;
    uniform sampler2D uSampler7;
    uniform sampler2D uSampler8;
    uniform sampler2D uSampler9;
    uniform sampler2D uSampler10;
    uniform sampler2D uSamplerText;
    uniform float uScaleFactor;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    out vec4 fragColor;
        
    vec4 drawShape(int mode, sampler2D textureV, vec2 coord) {
        vec2 texCoord = coord;
        if (mode == 1) {
          texCoord = vec2(0.0 + coord.x * 0.5, 0.0 + coord.y * 0.5);
        } else if (mode == 2) {
          texCoord = vec2(0.5 + coord.x * 0.5, 0.0 + coord.y * 0.5);
        } else if (mode == 3) {
          texCoord = vec2(0.0 + coord.x * 0.5, 0.5 + coord.y * 0.5);
        } else if (mode == 4) {
          texCoord = vec2(0.5 + coord.x * 0.5, 0.5 + coord.y * 0.5);
        } 
          
        else if (mode == 5) {
          texCoord = vec2(0.0 + coord.x * 0.25, 0.0 + coord.y * 0.25);
        } else if (mode == 6) {
          texCoord = vec2(0.25 + coord.x * 0.25, 0.0 + coord.y * 0.25);
        } else if (mode == 7) {
          texCoord = vec2(0.5 + coord.x * 0.25, 0.0 + coord.y * 0.25);
        } else if (mode == 8) {
          texCoord = vec2(0.75 + coord.x * 0.25, 0.0 + coord.y * 0.25);
        } 
          
        else if (mode == 9) {
          texCoord = vec2(0.0 + coord.x * 0.25, 0.25 + coord.y * 0.25);
        } else if (mode == 10) {
          texCoord = vec2(0.25 + coord.x * 0.25, 0.25 + coord.y * 0.25);
        } else if (mode == 11) {
          texCoord = vec2(0.5 + coord.x * 0.25, 0.25 + coord.y * 0.25);
        } else if (mode == 12) {
          texCoord = vec2(0.75 + coord.x * 0.25, 0.25 + coord.y * 0.25);
        } 
          
        else if (mode == 13) {
          texCoord = vec2(0.0 + coord.x * 0.25, 0.5 + coord.y * 0.25);
        } else if (mode == 14) {
          texCoord = vec2(0.25 + coord.x * 0.25, 0.5 + coord.y * 0.25);
        } else if (mode == 15) {
          texCoord = vec2(0.5 + coord.x * 0.25, 0.5 + coord.y * 0.25);
        } else if (mode == 16) {
          texCoord = vec2(0.75 + coord.x * 0.25, 0.5 + coord.y * 0.25);
        } 
          
        else if (mode == 17) {
          texCoord = vec2(0.0 + coord.x * 0.25, 0.75 + coord.y * 0.25);
        } else if (mode == 18) {
          texCoord = vec2(0.25 + coord.x * 0.25, 0.75 + coord.y * 0.25);
        } else if (mode == 19) {
          texCoord = vec2(0.5 + coord.x * 0.25, 0.75 + coord.y * 0.25);
        } else if (mode == 20) {
          texCoord = vec2(0.75 + coord.x * 0.25, 0.75 + coord.y * 0.25);
        }
        texCoord = clamp(texCoord, 0.0, 1.0);
        //vec2 adjustedCoord = texCoord * 0.98 + 0.01; // Внутрішнє зміщення координат
        //return texture(textureV, adjustedCoord);
        return texture(textureV, texCoord);
    }

    bool isPartOfLargerBlock(vec4 current, vec4 neighbor) {
        return (current == neighbor);
    }

    bool checkNumberInSeries(int number, int start) {
      if (start == 0) {
          return false; // Якщо start дорівнює 0, завжди повертаємо false
      }
      return (number - start) % 10 == 0;
    }

    void main(void) {
        vec2 texSize = vec2(uScaleFactor, uScaleFactor);
        vec2 texelSize = 1.0 / texSize;
        vec2 scaledCoord = vTextureCoord;
        vec4 centerColor = texture(uSampler, scaledCoord);
        vec2 cellSize = vec2(1.0) / uScaleFactor;
        vec2 cellCenter = (floor(vTextureCoord * uScaleFactor) ) * cellSize;
        
        int drawMode = 0;
        
        vec2 localCoord = fract(vTextureCoord * uScaleFactor);
        
        if (centerColor.a < 0.004) {
            drawMode = 5; 
        } else if (centerColor.a < 0.008) {
            drawMode = 6; 
        } else if (centerColor.a < 0.012) {
            drawMode = 7; 
        } else if (centerColor.a < 0.016) {
            drawMode = 8; 
        } else if (centerColor.a < 0.020) {
            drawMode = 9; 
        } else if (centerColor.a < 0.024) {
            drawMode = 10; 
        } else if (centerColor.a < 0.028) {
            drawMode = 11; 
        } else if (centerColor.a < 0.032) {
            drawMode = 12; 
        } else if (centerColor.a < 0.036) {
            drawMode = 13; 
        } else if (centerColor.a < 0.040) {
            drawMode = 14; 
        } else if (centerColor.a < 0.044) {
            drawMode = 15; 
        } else if (centerColor.a < 0.048) {
            drawMode = 16; 
        } else if (centerColor.a < 0.052) {
            drawMode = 17; 
        } else if (centerColor.a < 0.056) {
            drawMode = 18; 
        } else if (centerColor.a < 0.060) {
            drawMode = 19; 
        } else if (centerColor.a < 0.064) {
            drawMode = 20; 
        } else if (centerColor.a < 0.068) {
            drawMode = 21; 
        } else if (centerColor.a < 0.072) {
            drawMode = 22; 
        } else if (centerColor.a < 0.076) {
            drawMode = 23; 
        } else if (centerColor.a < 0.080) {
            drawMode = 0; 
        } else if (centerColor.a < 0.084) {
            drawMode = 1; 
        } else if (centerColor.a < 0.088) {
            drawMode = 2; 
        } else if (centerColor.a < 0.092) {
            drawMode = 3; 
        }  else if (centerColor.a < 0.100) {
            drawMode = 4; 
        }
            

        if(centerColor.r == 0.0){
          discard;
        } else {
          if (checkNumberInSeries(int(centerColor.r * 255.0), 1)) {
              fragColor  = drawShape(drawMode, uSampler1, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 2)) {
              fragColor  = drawShape(drawMode, uSampler2, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 3)) {
              fragColor  = drawShape(drawMode, uSampler3, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 4)) {
              fragColor  = drawShape(drawMode, uSampler4, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 5)) {
              fragColor  = drawShape(drawMode, uSampler5, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 6)) {
              fragColor  = drawShape(drawMode, uSampler6, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 7)) {
              fragColor  = drawShape(drawMode, uSampler7, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 8)) {
              fragColor  = drawShape(drawMode, uSampler8, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 9)) {
              fragColor  = drawShape(drawMode, uSampler9, localCoord);
          } else if (checkNumberInSeries(int(centerColor.r * 255.0), 0)) {
              fragColor  = drawShape(drawMode, uSampler10, localCoord);
          } else {
            fragColor  = drawShape(drawMode, uSampler1, localCoord);
          }
        }

        
    }
  `,S=2,C=S*S,w=class e{noiseData;bigBlocks=[];noiseTexture;width=0;height=0;canvasWidth=0;canvasHeight=0;gl;static colorMap={1:[11,11,11,255],2:[12,12,12,255],3:[13,13,13,255],4:[14,14,14,255],5:[15,15,15,255],6:[16,16,16,255],7:[17,17,17,255],8:[18,18,18,255],9:[19,19,19,255],10:[20,20,20,255],11:[21,21,21,255],12:[22,22,22,255],13:[23,23,23,255],14:[24,24,24,255],15:[25,25,25,255],16:[26,26,26,255],17:[27,27,27,255],18:[28,28,28,255],19:[29,29,29,255],20:[30,30,30,255],21:[31,31,31,255],22:[32,32,32,255],23:[33,33,33,255],24:[34,34,34,255],25:[35,35,35,255],26:[36,36,36,255],27:[37,37,37,255],28:[38,38,38,255],29:[39,39,39,255],30:[40,40,40,255],31:[41,41,41,255],32:[42,42,42,255],33:[43,43,43,255],34:[44,44,44,255],35:[45,45,45,255],36:[46,46,46,255],37:[47,47,47,255],38:[48,48,48,255],39:[49,49,49,255],40:[50,50,50,255],41:[51,51,51,255],42:[53,53,53,255],43:[55,55,55,255],44:[57,57,57,255],45:[59,59,59,255],46:[52,52,52,255],47:[54,54,54,255],48:[60,60,60,255],49:[56,56,56,255],50:[58,58,58,255],51:[61,61,61,255],52:[0,0,0,255],53:[63,63,63,255],54:[64,64,64,255],55:[0,0,0,255],56:[66,66,66,255],57:[67,67,67,255],58:[0,0,0,255],59:[69,69,69,255],60:[70,70,70,255],61:[71,71,71,255],62:[72,72,72,255],63:[73,73,73,255],64:[0,0,0,255],65:[75,75,75,255],66:[76,76,76,255],67:[77,77,77,255],68:[78,78,78,255],69:[79,79,79,255],70:[0,0,0,255],71:[83,83,83,255],72:[86,86,86,255],73:[88,88,88,255],74:[0,0,0,255],75:[84,84,84,255],76:[87,87,87,255],77:[90,90,90,255],78:[85,85,85,255],79:[0,0,0,255],80:[89,89,89,255],81:[91,91,91,255],82:[92,92,92,255],83:[93,93,93,255],84:[94,94,94,255],85:[95,95,95,255],86:[96,96,96,255],87:[97,97,97,255],88:[98,98,98,255],89:[99,99,99,255],90:[100,100,100,255],91:[107,107,107,255],92:[104,104,104,255],93:[109,109,109,255],94:[102,102,102,255],95:[101,101,101,255],96:[108,108,108,255],97:[105,105,105,255],98:[110,110,110,255],99:[103,103,103,255],100:[106,106,106,255],101:[0,0,0,255],102:[0,0,0,255],103:[0,0,0,255],104:[0,0,0,255],105:[0,0,0,255],106:[0,0,0,255],107:[0,0,0,255],108:[0,0,0,255],109:[0,0,0,255],110:[0,0,0,255]};constructor(e,t,n,r,i){this.gl=e,this.width=r,this.height=i,this.canvasWidth=t,this.canvasHeight=n,this.noiseData=new Uint8Array(this.width*this.width*4)}resize(e,t,n,r){this.width=n,this.height=r,this.canvasWidth=e,this.canvasHeight=t,this.noiseData=new Uint8Array(this.width*this.width*4)}getRandomGrayColor(){let e=Math.floor(Math.random()*10);return[e,e,e,255]}createNoiseData(t,n,r,i=!1){let a=Math.floor(t/this.canvasWidth*this.width),o=Math.floor(n/this.canvasHeight*this.width),s=e.colorMap;for(let e=0;e<this.width;e++)for(let t=0;t<this.width;t++){let n=(e*this.width+t)*4,c=r?r[n]:0,l=r?[r[n],r[n+1],r[n+2],r[n+3]]:[0,0,0,255],u=t-a,d=e-o;u*u+d*d<=C?c===0&&l[3]==255&&(l=this.getRandomGrayColor()):c!==0&&i&&l[3]==255&&(l=s[c]),this.noiseData[n]=l[0],this.noiseData[n+1]=l[1],this.noiseData[n+2]=l[2],this.noiseData[n+3]=l[3]}return this.bigBlocks.forEach(e=>{let t=e.x+e.width/2,n=e.y+e.height/2,i=a-t,s=o-n;if(i*i+s*s<=C){let t=(e.y*this.width+e.x)*4;if((r?r[t]:0)===0){let t=1,n=this.getRandomGrayColor();for(let r=0;r<e.height;r++)for(let i=0;i<e.width;i++){let a=((e.y+r)*this.width+(e.x+i))*4;this.noiseData[a]=n[0],this.noiseData[a+1]=n[1],this.noiseData[a+2]=n[2],this.noiseData[a+3]=e.height==4?t++:20+t++}}}else if(this.noiseData[(e.y*this.width+e.x)*4+3]<255)for(let t=0;t<e.height;t++)for(let n=0;n<e.width;n++){let r=((e.y+t)*this.width+(e.x+n))*4,i=this.getRandomGrayColor();this.noiseData[r]=i[0],this.noiseData[r+1]=i[1],this.noiseData[r+2]=i[2],this.noiseData[r+3]=255}}),this.noiseData}manageBlocks(e,t,n,r,i,a){let o=Math.floor(n/i*e),s=Math.floor(r/a*t),c=Math.random()<.8?2:4;function l(e,t,n,r,i){return i.some(i=>e<i.x+i.width&&e+n>i.x&&t<i.y+i.height&&t+r>i.y)}this.bigBlocks=this.bigBlocks.filter(t=>{let n=t.x-o,r=t.y-s,i=n*n+r*r<=49;if(!i&&this.noiseData[(t.y*e+t.x)*4+3]<255)for(let n=0;n<t.height;n++)for(let r=0;r<t.width;r++){let i=((t.y+n)*e+(t.x+r))*4;this.noiseData[i]=0,this.noiseData[i+1]=0,this.noiseData[i+2]=0,this.noiseData[i+3]=255}return i});let u=0;for(;this.bigBlocks.length<50&&u<5;){let n,r,i=0;do n=Math.floor(Math.random()*(e-c)),r=Math.floor(Math.random()*(t-c)),i++;while(l(n,r,c,c,this.bigBlocks)&&i<50);if(i<50){let e={x:n,y:r,width:c,height:c};this.bigBlocks.push(e)}else u++}return this.noiseData}createNoiseTexture(){let e=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.width,this.width,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,this.noiseData),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.noiseTexture=e}},T=class{symbolTexture1;symbolTexture2;symbolTexture3;symbolTexture4;symbolTexture5;symbolTexture6;symbolTexture7;symbolTexture8;symbolTexture9;symbolTexture10;texturesLoaded=0;gl;onStartAnimation=()=>{};constructor(e){this.gl=e}load(){this.loadTexture(`/images/gs/grid-1.webp`,e=>{this.symbolTexture1=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-2.webp`,e=>{this.symbolTexture2=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-3.webp`,e=>{this.symbolTexture3=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-4.webp`,e=>{this.symbolTexture4=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-5.webp`,e=>{this.symbolTexture5=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-6.webp`,e=>{this.symbolTexture6=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-7.webp`,e=>{this.symbolTexture7=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-8.webp`,e=>{this.symbolTexture8=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-9.webp`,e=>{this.symbolTexture9=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()}),this.loadTexture(`/images/gs/grid-10.webp`,e=>{this.symbolTexture10=e,this.texturesLoaded++,this.texturesLoaded>=10&&this.onStartAnimation()})}loadTexture(e,t){if(this.texturesLoaded>=10){this.onStartAnimation();return}var n=this.gl.createTexture(),r=new Image;r.src=e,r.addEventListener(`load`,()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),t(n)})}},E=`#version 300 es
  in vec4 aVertexPosition;
  in vec2 aTextureCoord;
  out vec2 vTextureCoord;
  void main(void) {
    gl_Position = aVertexPosition;
    vTextureCoord = aTextureCoord;
    vTextureCoord.y = 1.0 - vTextureCoord.y;
  }
`,D=class{gl;count=24;canvasWidth=2048;canvasHeight=2048;programInfo;canvas;buffers;textureData;lastNoiseUpdate;textElement;textureManager=null;noiseManager=null;bigBlockFPS=new b;noiseFPS=new b;hideTimeoutId=null;onMouseMove=()=>{};onForceMouseMove=()=>{};onRender=()=>{};constructor(e){this.canvas=e;let t=e.getBoundingClientRect();this.canvasWidth=t.width,this.canvasHeight=t.height,this.count=parseInt(`${this.canvasWidth*1/(1/14*window.innerWidth*.245)}`),this.gl=this.canvas.getContext(`webgl2`,{antialias:!1,depth:!1,alpha:!0}),this.noiseManager=new w(this.gl,this.canvasWidth,this.canvasHeight,this.count,this.count),this.textureManager=new T(this.gl),this.textureManager!=null&&(this.textureManager.onStartAnimation=()=>{this.start()},this.textureManager.load())}mx=0;my=0;start(){this.gl?(this.initGL(),this.initBuffers(this.gl),this.onMouseMove=e=>{this.mx=e.x,this.my=e.y,this.textureData=this.noiseManager?.createNoiseData(this.mx,this.my,this.textureData,!1),this.noiseManager?.createNoiseTexture(),this.drawScene()},this.onForceMouseMove=e=>{this.mx=e.clientX,this.my=e.clientY}):alert(`Unable to initialize WebGL. Your browser may not support it.`),this.bigBlockFPS.onFrame=()=>{var e=this.canvas.getBoundingClientRect();this.noiseManager?.manageBlocks(this.count,this.count,this.mx,this.my,e.width,e.height)},this.noiseFPS.onFrame=()=>{this.textureData=this.noiseManager?.createNoiseData(this.mx,this.my,this.textureData,!0),this.noiseManager?.createNoiseTexture(),this.drawScene()}}enableWebGL(e){let t=1*window.devicePixelRatio,n=e.getBoundingClientRect();this.canvasWidth=n.width,this.canvasHeight=n.height,this.canvas.width=parseInt(`${this.canvasWidth*t}`),this.canvas.height=parseInt(`${this.canvasHeight*t}`),e.width=parseInt(`${this.canvasWidth*t}`),e.height=parseInt(`${this.canvasHeight*t}`),this.count=parseInt(`${this.canvasWidth*1/(1/14*window.innerWidth*.245)}`),this.gl?.viewport(0,0,this.canvas.width,this.canvas.height),this.gl?.enable(this.gl.BLEND),this.gl?.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),this.initBuffers(this.gl),this.noiseManager=new w(this.gl,this.canvasWidth,this.canvasHeight,this.count,this.count),this.bigBlockFPS.onFrame=()=>{this.noiseManager?.manageBlocks(this.count,this.count,this.mx,this.my,n.width,n.height)},this.textureData=this.noiseManager.noiseTexture,this.programInfo!=null&&this.gl?.uniform1f(this.programInfo.uniformLocations.scaleFactor,this.count),this.bigBlockFPS.startAnimating(1),this.noiseFPS.startAnimating(40)}disableWebGL(){this.gl!=null&&(this.bigBlockFPS.stopAnimating(),this.noiseFPS.stopAnimating())}initGL(){if(this.gl!=null){let e=E,t=x,n=this.initShaderProgram(e,t);n!=null&&(this.programInfo={program:n,attribLocations:{vertexPosition:this.gl.getAttribLocation(n,`aVertexPosition`),textureCoord:this.gl.getAttribLocation(n,`aTextureCoord`)},uniformLocations:{sampler:this.gl.getUniformLocation(n,`uSampler`),scaleFactor:this.gl.getUniformLocation(n,`uScaleFactor`),uMouse:this.gl.getUniformLocation(n,`uMouse`),uMouseRadius:this.gl.getUniformLocation(n,`uMouseRadius`),samplerText:this.gl.getUniformLocation(n,`uSamplerText`),sampler1:this.gl.getUniformLocation(n,`uSampler1`),sampler2:this.gl.getUniformLocation(n,`uSampler2`),sampler3:this.gl.getUniformLocation(n,`uSampler3`),sampler4:this.gl.getUniformLocation(n,`uSampler4`),sampler5:this.gl.getUniformLocation(n,`uSampler5`),sampler6:this.gl.getUniformLocation(n,`uSampler6`),sampler7:this.gl.getUniformLocation(n,`uSampler7`),sampler8:this.gl.getUniformLocation(n,`uSampler8`),sampler9:this.gl.getUniformLocation(n,`uSampler9`),sampler10:this.gl.getUniformLocation(n,`uSampler10`)}},this.gl.useProgram(this.programInfo.program),this.gl.uniform1f(this.programInfo.uniformLocations.scaleFactor,this.count),this.gl.uniform1f(this.programInfo.uniformLocations.uMouseRadius,.05),this.gl.uniform2f(this.programInfo.uniformLocations.uMouse,.5,.5),this.gl.activeTexture(this.gl.TEXTURE1),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture1),this.gl.uniform1i(this.programInfo.uniformLocations.sampler1,1),this.gl.activeTexture(this.gl.TEXTURE2),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture2),this.gl.uniform1i(this.programInfo.uniformLocations.sampler2,2),this.gl.activeTexture(this.gl.TEXTURE3),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture3),this.gl.uniform1i(this.programInfo.uniformLocations.sampler3,3),this.gl.activeTexture(this.gl.TEXTURE4),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture4),this.gl.uniform1i(this.programInfo.uniformLocations.sampler4,4),this.gl.activeTexture(this.gl.TEXTURE5),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture5),this.gl.uniform1i(this.programInfo.uniformLocations.sampler5,5),this.gl.activeTexture(this.gl.TEXTURE6),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture6),this.gl.uniform1i(this.programInfo.uniformLocations.sampler6,6),this.gl.activeTexture(this.gl.TEXTURE7),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture7),this.gl.uniform1i(this.programInfo.uniformLocations.sampler7,7),this.gl.activeTexture(this.gl.TEXTURE8),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture8),this.gl.uniform1i(this.programInfo.uniformLocations.sampler8,8),this.gl.activeTexture(this.gl.TEXTURE9),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture9),this.gl.uniform1i(this.programInfo.uniformLocations.sampler9,9),this.gl.activeTexture(this.gl.TEXTURE10),this.gl.bindTexture(this.gl.TEXTURE_2D,this.textureManager?.symbolTexture10),this.gl.uniform1i(this.programInfo.uniformLocations.sampler10,10))}}initShaderProgram(e,t){if(this.gl!=null){let n=this.loadShader(this.gl,this.gl.VERTEX_SHADER,e),r=this.loadShader(this.gl,this.gl.FRAGMENT_SHADER,t),i=this.gl.createProgram();return this.gl.attachShader(i,n),this.gl.attachShader(i,r),this.gl.linkProgram(i),this.gl.getProgramParameter(i,this.gl.LINK_STATUS)?i:(alert(`Unable to initialize the shader program: `+this.gl.getProgramInfoLog(i)),null)}return null}loadShader(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(alert(`An error occurred compiling the shaders: `+e.getShaderInfoLog(r)),e.deleteShader(r),null)}initBuffers(e){let t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,1,-1,-1,1,-1,1,1]),e.STATIC_DRAW);let n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,1,0,0,1,0,1,1]),e.STATIC_DRAW),this.buffers={position:t,textureCoord:n}}drawScene(){this.gl!=null&&(this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.noiseManager?.noiseTexture),this.gl.clearColor(.0627,.0706,.0784,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffers.position),this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition,2,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffers.textureCoord),this.gl.vertexAttribPointer(this.programInfo.attribLocations.textureCoord,2,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(this.programInfo.attribLocations.textureCoord),this.gl.drawArrays(this.gl.TRIANGLE_FAN,0,4),this.onRender())}},O=class e{static i;static getInstance(){return e.i||=new e,e.i}pool=[];maxContexts;activeContexts=new Map;hideTimeoutIds=new Map;globalCount=0;constructor(e=6){this.maxContexts=e,this.pool=[];for(let e=0;e<this.maxContexts;e++){let e=new D(document.createElement(`canvas`));this.pool.push(e)}}getAvailableGridSymbol(e){if(this.activeContexts.has(e)){let t=this.activeContexts.get(e);if(t!=null)return clearTimeout(this.hideTimeoutIds.get(e)),this.hideTimeoutIds.delete(e),t}if(this.pool.length>0){let t=this.pool.shift();return t.onRender=()=>{let n=e.getContext(`2d`);n&&(n.clearRect(0,0,t.canvas.width,t.canvas.height),n.imageSmoothingEnabled=!0,n.imageSmoothingQuality=`high`,n.drawImage(t.canvas,0,0,t.canvas.width,t.canvas.height,0,0,e.width,e.height))},t.enableWebGL(e),this.activeContexts.set(e,t),t}return console.warn(`Немає доступних програмних канвасів у пулі.`),null}clearRects(e){this.activeContexts.has(e)&&this.activeContexts.get(e)}releaseGridSymbol(e){if(this.activeContexts.has(e)){let t=this.activeContexts.get(e);this.hideTimeoutIds.set(e,setTimeout(()=>{t.disableWebGL(),this.hideTimeoutIds.delete(e),this.activeContexts.delete(e),this.pool.push(t)},500))}}},k={class:`gsw`},A=16,j=Object.assign(h(i({__name:`GridSymbolPlane`,setup(e){let n=t(),r=null;var i=null;let o=()=>{let e=n.value;e&&(e.addEventListener(`mouseover`,u),e.addEventListener(`mouseout`,f),v.getInstance().off(`cursor:pixel:${n.value?.getAttribute(`string-id`)}`,y),v.getInstance().off(`cursor:end:${n.value?.getAttribute(`string-id`)}`,b),v.getInstance().on(`cursor:pixel:${n.value?.getAttribute(`string-id`)}`,y),v.getInstance().on(`cursor:end:${n.value?.getAttribute(`string-id`)}`,b))},c=()=>{let e=n.value;e&&(e.removeEventListener(`mouseover`,u),e.removeEventListener(`mouseout`,f),v.getInstance().off(`cursor:pixel:${n.value?.getAttribute(`string-id`)}`,y,n.value?.getAttribute(`string-id`)),v.getInstance().off(`cursor:end:${n.value?.getAttribute(`string-id`)}`,b,n.value?.getAttribute(`string-id`)))},u=e=>{let t=n.value;t&&(r=i.getAvailableGridSymbol(t),r&&r.onForceMouseMove(e))},f=()=>{r&&=(r.onMouseMove({x:window.innerWidth+100,y:window.innerHeight+100}),i.releaseGridSymbol(n.value),null)},h=null;var g=0,_=0;let y=e=>{if(r){h!=null&&clearTimeout(h);let t=Math.round(e.x),n=Math.round(e.y);(Math.abs(t-g)>A||Math.abs(n-_)>A)&&(g=t,_=n,r.onMouseMove({x:g,y:_}))}},b=()=>{h=setTimeout(()=>{i.clearRects(n.value),r&&r.onForceMouseMove({clientX:window.innerWidth+100,clientY:window.innerHeight+100}),h=null},300)};return l(()=>{i=O.getInstance();let e=n.value;if(!e)return;let t=e.getBoundingClientRect();e.width=t.width,e.height=t.height,p(()=>{window.innerWidth>1024&&o()}),window.addEventListener(`resize`,()=>{let t=e.getBoundingClientRect();e.width=t.width,e.height=t.height,window.innerWidth>1024?o():c()})}),m(()=>{c()}),(e,t)=>(d(),a(`div`,k,[s(`canvas`,{ref_key:`glCanvas`,ref:n,string:`cursor`,"string-alignment":`start`,"string-cursor-target-style-disable":``},null,512)]))}}),[[`__scopeId`,`data-v-46d0e5b3`]]),{__name:`GridSymbolPlane`}),M={class:`progressor`,string:`progress`,"string-enter-el":`top`,"string-enter-vp":`bottom`,"string-exit-el":`bottom`,"string-exit-vp":`bottom`,"string-offset-top":`0.8rem`,"string-offset-bottom":`-0.8rem`,"string-key":`--progress-2`},N={class:`scaler`,string:`anchor`,"string-anchor":`bottom random(left,right)`},P={string:`anchor`,"string-anchor":`top random(left,right)`},F=Object.assign(h(i({__name:`HarmonyItem`,props:{top:{type:String,default:`1`},mtop:{type:String,default:`1`},left:{type:String,default:`1`},mleft:{type:String,default:`1`},image:{type:String,default:null},video:{type:String,default:null}},setup(t){let i=o(()=>g().isMobile);return l(()=>{}),(o,l)=>{let p=_,m=y,h=j;return d(),a(`div`,{class:`cell`,style:f({"--top":n(i)?t.mtop:t.top,"--left":n(i)?t.mleft:t.left}),string:`progress`,"string-enter-el":`top`,"string-exit-el":`bottom`,"string-enter-vp":`top`,"string-exit-vp":`top`,"string-offset-top":`-0.8rem`,"string-offset-bottom":`0.8rem`,"string-key":`--progress-1`},[s(`div`,M,[s(`div`,N,[s(`div`,P,[c(o.$slots,`default`,{},()=>[t.image==null?r(``,!0):(d(),e(p,{key:0,src:t.image},null,8,[`src`])),t.video==null?r(``,!0):(d(),e(m,{key:1,src:t.video},null,8,[`src`]))],!0)])])]),u(h)],4)}}}),[[`__scopeId`,`data-v-cbe5cc83`]]),{__name:`HarmonyItem`});export{j as n,b as r,F as t};