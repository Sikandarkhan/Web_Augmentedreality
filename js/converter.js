

var trackerInstance=undefined;
var previous2DObject=undefined;
var previouslyIdentified2DObject=undefined;

var lockedTarget=false;
var snapped=false;
var infieldofvision=true;


var videoComparisonRefObject=  new AR.VideoDrawable("",1);
            

 var backgroundtargetimage=undefined;
var imageres = new AR.ImageResource("progressloader.png",{

                                          onLoaded:function(width,height)
                                          {
                                            console.log(width+":"+height);
                                          },
                                          onError:function()
                                          {
                                            console.log("ouch");
                                          }

                                        });


                                           var animatedImageDrawable = new AR.AnimatedImageDrawable(imageres, 0.5,  120,120);
                                             animatedImageDrawable.zOrder=999999;
                                             var keyframes=[];
                                             for (var keyframer = 0; keyframer <=20; keyframer++) {
                                               keyframes.push(keyframer);                      

                                                               };

                                                                  //create a Style, red fill color, green outline
                        var myStyle = {outlineSize : 2, outlineColor : '#00FF00'};
                        

                        //applying style options on creation of 2 circles
                        var  loadingCircle= new AR.Circle(0.8, {style : myStyle});
                         loadingCircle.zOrder=999998;



window.blueprint = window.blueprint || {}, blueprint.Converter = function(a, b) {
    b || (b = {}), null == b.report && (b.report = !0);
    var loadingVideo=0;
    var previousCampaigns=[];

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14


/*
      AR.VideoDrawable.prototype.onLoaded = (function(_super) {

    // return our new `join()` function
    return function() {
        console.log("Hey, you called onLoaded!");
  
        loadingVideo--;
          if(loadingVideo==0)
          {

            //hide loading indicator

            $('#scannerStatus').text("");
                                              
            
          }
        return _super.apply(this, arguments);
    };         // Pass control back to the original join()
               // by using .apply on `_super`

})(AR.VideoDrawable.prototype.onLoaded);


  AR.VideoDrawable.prototype.onEnterFieldOfVision = (function(_super) {

    // return our new `join()` function
    return function() {
        console.log("Hey, you called onLoaded!");
  
        loadingVideo++;
          return _super.apply(this, arguments);
    };         // Pass control back to the original join()
               // by using .apply on `_super`

})(AR.VideoDrawable.prototype.onEnterFieldOfVision);
*/



    var c = {},
    targetImageArray=[],
    d = 1e4,
    d1=d/8,
    e = 6e4,
    f = 0,
    g = "https://s3-eu-west-1.amazonaws.com/studio-live/0000staticfiles/mini-loader.png",
    h = AR.build.mobile && b.report,
    i = null,
    currentDrawables=[];
    trackableObjects=[],
    j = !0;
    this.getArchitectObject = function(a) {
        return c[a.toString()]
    }, this.convertProject = function(b) {
        console.log("Converting " + b.targets.length + " targets."), h && sendPageView("/" + a + "/" + b.id, "Project_" + b.id), AR.context.services.sensors =  true;//!1;
        var d = z(b);
        i = new AR.Tracker(d, {
                           onLoaded: function() {
                           console.log("Target Collection fully loaded.");
                           $('#initMessage').text("Point to Motion Print");
                           $(".point-section").delay(5000).fadeOut(300);

                           //    var architectSdkUrl = "architectsdk://call?phonenumber=" + encodeURIComponent(url.replace("call:","")) ;
                        //  document.location = architectSdkUrl;


                           trackerInstance=i;
                           },
                           onError: function() {
                           console.log("Target Collection cannot be loaded.")

                           }
                           }), c.targetCollection = i, j = b.targets.length > f;
        for (var e = 0; e < b.targets.length; e++) {


          targetImageArray[e]=b.targets[e].imageUrl;


            for (var g = b.targets[e], m = [], n = 0; n < g.augmentations.length; n++) {
                var o = l(b, g, g.augmentations[n]);
                o && (Array.isArray(o) ? m = m.concat(o) : m.push(o))
            }
          //  currentDrawables=m;
           // console.log("jere");
            var p = k(b, g, m);
            p.targetImageID=e;



           // console.log(p.drawables.cam);
            //trackableObjects[e]=p;
            //p.trackableID=e;



            j || (p.drawables.cam = m)
        }
    };


  var currentLabel=undefined;

  var previousTrackingID=undefined;
console.log("f");


var generateDrawablesArray=function(argG)
{

  console.log(argG);
  var result=[];

  try {
   
   for (result = [], e = 0; e < argG.length; e++) {
                                     var i = argG[e]();
                                     Array.isArray(i) ? result = result.concat(i) : result.push(i)
                                     }

//console.log(result);
                                     return result;
}
catch(err) {
    return [];
}


    
}
//numberssprite.png
                                        
                                             
   
                    

    var k = function(b, f, g) {
        g = g || [];
        var k = function(a) {
            for (var b = 0; b < a.drawables.cam.length; b++) a.drawables.cam[b].onExitFieldOfVision && a.drawables.cam[b].onExitFieldOfVision()
                },
        l = new AR.Trackable2DObject(i, f.label.toString(), {


/*
          drawables:
          {
            cam:

                generateDrawablesArray(g)
          }
            ,
            */

            
            

              snapToScreen: {

                              snapContainer:document.getElementById("snapContainer"),

                              
                            // enabledOnExitFieldOfVision:true,

                             onDelayedSnapInterruption:function(timestamp)
                             {

                                  $('#snapContainer').css("display","inline-block");
                            window.dispatchEvent(new Event('resize'));

                            

                             },
                             onSnappedToScreen:function(div)
                             {



                       //to show the target image as the background
                            $('#snapContainer').css("display","inline-block");

                            window.dispatchEvent(new Event('resize'));


                             var a =current2DObject.l.drawables.cam;
                                
                                     
                                     for (var w = 0; w < a.length; w++) 
                                   {
                                      try {
        a[w].play();
    }
    catch(err) {
        // Handle error(s) here
    }

                                    }

                            
                            

                             }






                      
             
                
            }  
           
  ,
  
      

                                    onEnterFieldOfVision: function() {
                                 //     return;


                                            if (h && (!this.detectionTime || (new Date).getTime() - this.detectionTime.getTime() < d1) && (sendPageView("/" + a + "/" + b.id + "/" + f.label, "Target_" + f.label), this.detectionTime = new Date), j) 
                                           {
                                             // if (l.destroyTimer) window.clearTimeout(l.destroyTimer), l.destroyTimer = null;

                                             return;
                                           }
                          

                                     // console.log(g);
                                      infieldofvision=true;
                                         var containsVideo=false;
                           

                    
                                     if(previouslyIdentified2DObject!=undefined)
                                      {



                                 // return;


                                  
                                       if(previouslyIdentified2DObject.trackingid!=f.label.toString())
                                      {

                                         console.log("not the previous campaign");

                                         previouslyIdentified2DObject.snapToScreen.enabled=false;


                                        var a = previouslyIdentified2DObject.l.drawables.cam;
                                
                                     
                                     for (var w = 0; w < a.length; w++) 
                                   {
                                     if(a[w].pause)
                                     {
                                     a[w].pause();
                                     }

                                    }

                                    
                                    

                                      
                                      }

                                      else
                                      {


                                        console.log("crappy logic");


  var a = this.l.drawables.cam;
                                
                                     
                                     for (var w = 0; w < a.length; w++) 
                                   {
                                    if(a[w].resume)
                                     {
                                      a[w].resume();
                                     }
                                     else if(a[w].play)
                                     {
                                      a[w].play();
                                     }

                                    }

                                      }







         


                                      
                                   

                                    }



                                      

                                            
                                   

                                        previouslyIdentified2DObject=this;
                                        current2DObject=previouslyIdentified2DObject;


                                        this.trackingid=f.label.toString();
                                        this.l=l;

//                                         this.snapToScreen.enabled=false;




                         //   window.dispatchEvent(new Event('resize'));

                                      // this.snapToScreen.enabledOnExitFieldOfVision=true;




                        //    window.dispatchEvent(new Event('resize'));

                                      //    this.snapToScreen.


                                       //     this.snapToScreen.enabled=true;
                /*
                                           this.snapToScreen.snapContainer=document.getElementById("snapContainer");

                                           this.snapToScreen.enabledOnExitFieldOfVision=true;
                   */                 

                                     
                                    loadingVideo=0;

                                  
                                    console.log(f.label.toString());

                                    currentLabel=f.label.toString();
                                     

                                     
                                    





                //modified this part



                
                
                                    
                                     if (h && (!this.detectionTime || (new Date).getTime() - this.detectionTime.getTime() > d) && (sendPageView("/" + a + "/" + b.id + "/" + f.label, "Target_" + f.label), this.detectionTime = new Date), j) if (l.destroyTimer) window.clearTimeout(l.destroyTimer), l.destroyTimer = null;
                                     else {

                                      //console.log("right"+g);


 
                                     for (var c = [], e = 0; e < g.length; e++) {
                                     var i = g[e]();
                                     Array.isArray(i) ? c = c.concat(i) : c.push(i)
                                     }
                                    
                                    l.drawables.cam = c

                                  //   console.log(l.drawables.cam);


                  


                                     }


                                     

                                     
                                     
                                     

 


   
                                     //called every time right
                                     for (var e = 0; e < l.drawables.cam.length; e++)
                                      {
                                       l.drawables.cam[e].onEnterFieldOfVision && l.drawables.cam[e].onEnterFieldOfVision()
                                       }


                                       



if(previousCampaigns.length==0 || previousCampaigns.indexOf(currentLabel)==-1)
                                     {


                                       enableLoadingMode();


                                          //loading mode
                                      

                                   

                                     }
                                     else  //if content already loaded
                                     {
                                    


                                          enableSnapToScreenMode();


                                     }


                               
                                         if(loadingVideo==0)
                                         {


                                            //add to cached campaigns list if not video and if not loaded:
                                 if(previousCampaigns.indexOf(currentLabel)==-1)
                                     {

                                          previousCampaigns.push(currentLabel);
                
                                      }


                                     //  






    
 
                                       
                                         }





  var a = this.l.drawables.cam;
                                
                                     
                                     for (var w = 0; w < a.length; w++) 
                                   {


                                                  if(a[w].isVideo)
                                                  {


                                                            containsVideo=true;
                                                              console.log("yes video");


                                                               if(a[w].resume)
                                                             {
                                                              a[w].resume();
                                                             }
                                                             else if(a[w].play)
                                                             {
                                                             
                                                              a[w].play();
                                                             }

                                                  }



                                    }


                                    

                                      


                                         if(!containsVideo)
                                         {

                                           this.l.drawables.removeCamDrawable(animatedImageDrawable );
                                           containsVideo=false;
                                     


                                         }
                                       


                                  //  this.snapToScreen.enableOnExitFieldOfVision=true;

                              //trackerInstance.enabled=false; //disable tracking





                                     // this.snapToScreen.enableOnExitFieldOfVision=true;
                                    

/*
                                       if (Math.abs(window.orientation) === 90) {
        // Landscape
       AR.context.globalScale=1.2;
    } else {
      // Portraitr
      AR.context.globalScale=1.5;
    }
    */





          
                                        
                                              



                                                      //    this.snapToScreen.enabled=false;
                                                       
                                                         //  this.snapToScreen.enableOnExitFieldOfVision=true; //backup
                                                     
 


                                     }
                                 
                                 


                        
             ,

                                     onExitFieldOfVision: j ?
                                     function() {


                                      if( this.detectionTime &&  Number((new Date).getTime() - this.detectionTime.getTime()) < 101)
                                      {


                                    $('#snapContainer').hide();


                                      

                                      }
                                      else
                                      {

                                      $('#snapContainer').css("display","inline-block");

                                       }





                            window.dispatchEvent(new Event('resize'));


                                      infieldofvision=false;
                                    //  return;


   /*
                                           for (var c = [], e = 0; e < g.length; e++) {
                                     var i = g[e]();
                                     Array.isArray(i) ? c = c.concat(i) : c.push(i)
                                     }
                                    
                                   l.drawables.cam = c

                                   */


                                      enableSnapToScreenMode();
                                   //   return;
                                   //   this.snapToScreen.enabled=true;
                                       


                             
                                      //   previous2DObject=previouslyIdentified2DObject;

      //previouslyIdentified2DObject.snapToScreen.enableOnExitFieldOfVision=true;



                                       //   previouslyIdentified2DObject.l=l;

                                      // previouslyIdentified2DObject.snapToScreen.enableOnExitFieldOfVision=true;


                                      


                                        //previousCampaign=this.trackableID;


                                         //  trackableObjects[this.trackableID].snapToScreen.enabled=true;

                                     
                                   //  $("#ellipsisElement").show();

                                  // if(loadingVideo==0)

       /*
                                   {
                                  
                                     $('#scannerText').text("Finding");



                                       $('#loader').css("visibility","visible");
                                        $('#scannerStatus').css("visibility","visible");

                                   }

                                   */
                                  
                                     
                                     
                                     
                                     l.destroyDrawables = function() {
                                       //return;

                                     
                                     l.destroyTimer = null
                                     }, l.destroyTimer = window.setTimeout(/*l.destroyDrawables*/console.log(" "), e), k(l) 
                                     } : function() {
                                     k(l)
                                     }
                                     });
        return c["target_" + f.label.toString()] = l, l
    },
    l = function(a, b, c) {
        var d = null;
        switch (c.type) {
            case "Image":
                d = m(a, b, c);
                break;
            case "Button":
                d = q(a, b, c);
                break;
            case "Text":
                d = n(a, b, c);
                break;
            case "HTMLDrawable":
                d = o(a, b, c);
                break;
            case "Model":
                d = p(a, b, c);
                break;
            case "Video":
                if (!AR.VideoDrawable) return alert("Your current Wikitude SDK version does not support Video Drawables. Please upgrade to a newer SDK. Video Drawables will not be shown."), null;
                d = r(a, b, c)
        }
        return j ? d : d()
    },
    m = function(a, b, d) {
        return function() {
            var e = new AR.ImageResource(d.url),
            f = u(a, b, d);
            if ("" !== d.clickUrl) {
                var g = function() {

                    //console.log(d.clickUrl);

                        var url=d.clickUrl.replace("http://", "");
                     //   console.log("new url is "+url);





       if(url.indexOf("call:")!=-1)
       {
        var architectSdkUrl = "architectsdk://call?phonenumber=" + encodeURIComponent(url.replace("call:","")) ;
        document.location = architectSdkUrl;
         }
            else if(url.indexOf("sms:")!=-1)
       {
        var architectSdkUrl = "architectsdk://sms?phonenumber=" + encodeURIComponent(url.replace("sms:","")) ;
        document.location = architectSdkUrl;
         }
     else if(url.indexOf("pointto:")!=-1)
       {

      url=url.replace("pointto:","");
              var params=url;
              console.log(params);

              
               params=JSON.parse(params);
               //console.log(JSON.stringify(params));
              
           
                      var lat=params["lat"].toString();
            var longitude= params["long"].toString();
         
        var architectSdkUrl = "architectsdk://maps?lat=" + encodeURIComponent(lat)+"&long="+longitude ;
     //   console.log(architectSdkUrl);
        document.location = architectSdkUrl;
         }


   
         else if(url.indexOf("mailto:")!=-1)
         {

             url=url.replace("mailto:","");



            var params=url;
                  params=JSON.parse(params);
              
            var emailaddress=params["emailaddress"].toString();
            var subject= params["subject"].toString();
            var body=params["body"].toString();
   


          var architectSdkUrl = "architectsdk://mail?emailaddress="+encodeURIComponent(emailaddress);
            if(subject!=undefined)
            {
                architectSdkUrl+="&subject="+encodeURIComponent(subject);
            }

              if(body!=undefined)
            {
                architectSdkUrl+="&body="+encodeURIComponent(body);
            }

      //console.log(architectSdkUrl);
       

            document.location=architectSdkUrl;

      

         }

                       // $('#teldude').attr("href",url);
                       // $('#teldude').click();

                           //  AR.context.openInBrowser(url,false);
              
                    
                    else
                    {
                    AR.context.openInBrowser(d.clickUrl,false);
                }

                };
                f.onClick = f.onClick ?
                function(a, b) {
                    return function() {
                        a(), b()
                    }
                }(f.onClick, g) : g
            }
            var h = new AR.ImageDrawable(e, d.height / 100, f);
            return h.removeFromTarget = function() {
                e.destroy(), h.destroy()
            }, c[d.name] = h, h
        }
    },
    n = function(a, b, d) {
        return function() {
            var e = u(a, b, d);
            if (e.style = {
                backgroundColor: v(d.backgroundColor),
                textColor: v(d.textColor),
                fontStyle: "" === d.textStyle ? "normal" : d.textStyle
                }, "" !== d.clickUrl) {
                var f = function() {
                    AR.context.openInBrowser(d.clickUrl,false)
                };
                e.onClick = e.onClick ?
                function(a, b) {
                    return function() {
                        a(), b()
                    }
                }(e.onClick, f) : f
            }
            var g = new AR.Label(d.text, d.height / 100, e);
            return g.removeFromTarget = function() {
                g.destroy()
            }, c[d.name] = g, g
        }
    },
    o = function(a, b, d) {
        return function() {
            var e = u(a, b, d),
            f = 1,
            g = Math.ceil(f * b.size.width * d.width / 100),
            h = Math.ceil(f * b.size.height * d.height / 100),
            i = y();
            if (i && (g = Math.ceil(g / d.zoom), h = Math.ceil(h / d.zoom)), g > 1023) {
                var j = g / 1023;
                g = 1023, h = Math.ceil(h * j)
            }
            h = h > 1023 ? 1023 : h, e.viewportWidth = g + 1, e.viewportHeight = h;
            var k = d.src; - 1 == k.indexOf("<body") && (k = '<html><head><meta name="viewport" content="initial-scale=1.0,user-scalable=no,target-densitydpi=device-dpi,width=' + g + "\"/><link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'></head><body style=\"display:inline-block;font: 10px 'Open Sans',sans-serif;letter-spacing:1px;font-weight:300;background:transparent;margin:0;", i || (k += "-webkit-transform:scale(" + (d.zoom ? d.zoom : 1) + ")", k += ";transform:scale(" + (d.zoom ? d.zoom : 1) + ")", k += ";-webkit-transform-origin:left top", k += ";transform-origin:left top"), k += '">' + d.src + "</body></html>");
            var l = new AR.HtmlDrawable({
                                        html: k
                                        }, d.width / 100 * (b.size.width / b.size.height), e);
            return l.removeFromTarget = function() {
                l.destroy()
            }, c[d.name] = l, l
        }
    },
    p = function(a, b, d) {
        return function() {
            var a = b.size.width * d.width / 100,
            e = b.size.height * d.height / 100,
            f = new AR.Model(d.src, {
                             scale: {
                             x: d.scale,
                             y: d.scale,
                             z: d.scale
                             },
                             rotate: {
                             roll: -1 * d.rotation
                             },
                             translate: {
                             x: (d.x / 100 - .5) * (b.size.width / b.size.height) + .5 * a / b.size.height,
                             y: -1 * (d.y / 100 - .5 + .5 * e / b.size.height)
                             }
                             });
            return f.removeFromTarget = function() {
                f.destroy()
            }, c[d.name] = f, f
        }
    },
    q = function(a, b, d) {
        return function() {
            var e = u(a, b, d),
            f = 1.1,
            g = Math.ceil(f * b.size.width * d.width / 100),
            h = Math.ceil(f * b.size.height * d.height / 100),
            i = y();
            if (i && (g = Math.ceil(g / d.zoom), h = Math.ceil(h / d.zoom)), g > 1023) {
                var j = g / 1023;
                g = 1023, h = Math.ceil(h * j)
            }
            h = h > 1023 ? 1023 : h, e.viewportWidth = g + 1, e.viewportHeight = h;
            var k = function() {
              //  AR.context.openInBrowser(d.url,true)
                AR.context.openInBrowser(d.url,false)

                console.log("cliked");


            };
            e.onClick = e.onClick ?
            function(a, b) {
                return function() {
                    a(), b()
                }
            }(e.onClick, k) : k;
            var l = '<html><head><meta name="viewport" content="target-densitydpi=device-dpi,width=' + g + "\"/><link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'></head><body style=\"display:inline-block;font: 30px 'Open Sans',sans-serif;letter-spacing:1px;font-weight:300;background:transparent;margin:0;letter-spacing:1px;\">";
            l += '<div style="display:inline-block;background-color:' + w(d.backgroundColor), l += "; background-repeat:no-repeat", l += "; background-size:100%", d.backgroundImage && (l += "; background-image:url(" + d.backgroundImage + ")"), l += "; border-radius:6px;", l += " text-align:center;", l += " padding:5px 10px;", l += " text-decoration:none;", l += " border:1px solid " + w(d.borderColor), l += "; color:" + w(d.textColor), d.zoom ? i || (l += "; -webkit-transform:scale(" + d.zoom + ")", l += "; transform:scale(" + d.zoom + ")", l += "; -webkit-transform-origin:left top", l += "; transform-origin:left top") : l += "; font-size:" + d.textSize + "em", l += ';">' + d.text, l += "</div></body></html>";
            var m = new AR.HtmlDrawable({
                                        html: l
                                        }, d.width / 100 * (b.size.width / b.size.height), e);
            return m.removeFromTarget = function() {
                m.destroy()
            }, c[d.name] = m, m
        }
    },
    r = function(a, b, c) {
        return "PrivateVideo" == c.subType ? "fullscreen" == c.videoMode ? t(a, b, c) : s(a, b, c) : "SocialVideo" == c.subType ? t(a, b, c) : void 0
    },
    s = function(a, b, d) {
        return function() {
            var e = u(a, b, d);
            e.isTransparent = "overlayAlpha" == d.videoMode;
            var f = new AR.VideoDrawable(d.src, d.height / 100 / (e.isTransparent ? 2 : 1), e);
            f.isVideo=true;
            f.enabled = !1;
            var h = function() {
                "PLAYING" == f.state ? (f.state = "PAUSED", f.pause()) : "PAUSED" == f.state && (f.state = "PLAYING", f.resume())
            };
            f.onClick = e.onClick ?
            function(a, b) {
                return function() {
                    a(), b()
                }
            }(e.onClick, h) : h, f.onEnterFieldOfVision = function() {
                  loadingVideo++;
                  f.resume();

               //     f.autoResume && "PAUSED" == f.state && (f.state = "PLAYING", f.resume())
           

            }, f.onExitFieldOfVision = function() {


               // "PLAYING" == f.state && (f.state = "PAUSED",  console.log("bleh"))//f.pause())


            }, f.state = "LOADING";
            var i = [];
            i.push(function() {
                   f.state = "LOADED"
                   });
            var j = function() {
                f.state = "PLAYING", f.enabled = !0, f.play(d.endlessLoop ? -1 : 1)
            },
            k = new AR.ImageResource(d.thumbnailUrl),
            l = new AR.ImageDrawable(k, d.height / 100, e);
            l.removeFromTarget = function() {
                l.imageResource.destroy(), l.destroy()
            }, f.autoResume = d.autoResume;
            var m = function() {
                i.push(function() {
                       l && l.removeFromTarget(), j()
                       })
            },
            n = function() {
                var a = new AR.ImageResource(g),
                b = l.imageResource;
                l.imageResource = a, b.destroy();
                var c = new AR.PropertyAnimation(l, "rotation", 0, 360, 1e3);
                c.start(-1)
            };
            if (d.autoPlay) m();
            else {
                var o = function() {
                    "LOADED" == f.state ? (l.removeFromTarget(), j()) : "LOADING" == f.state && (n(), m())
                };
                l.onClick = e.onClick ?
                function(a, b) {
                    return function() {
                        a(), b()
                    }
                }(e.onClick, o) : o
            }



            return f.onPlaybackStarted=function()
            {


   window.dispatchEvent(new Event('resize'));


   

                //push 
           
        //  if(loadingVideo==0)
                  {
                   // $('#scannerStatus').css("visibility","hidden");

                             //  $('#intro-section').css("display","none");
                            // enableSnapToScreenMode();
                  //   $('#loader').css("visibility","visible");

                  }

            } ,f.onLoaded = function() {

                                          window.dispatchEvent(new Event('resize'));
   //animatedImageDrawable.enabled=false;

 animatedImageDrawable.enabled=false ;
 previouslyIdentified2DObject.l.drawables.removeCamDrawable(animatedImageDrawable );




         //push 
           if(previousCampaigns.indexOf(currentLabel)==-1)
                                     {


                                        console.log("pushing:"+currentLabel);
                                          previousCampaigns.push(currentLabel);
                
                                      }

               if(loadingVideo!=0)
               {
                  loadingVideo--;
              }
                  if(loadingVideo==0)
                  {
                   // $('#scannerStatus').css("visibility","hidden");

                  enableSnapToScreenMode();
                  //   $('#loader').css("visibility","visible");

                  }

                for (var a = 0; a < i.length; a++) i[a]()
                    }, f.removeFromTarget = function() {
                        f.destroy(), l && !l.destroyed && l.removeFromTarget()
                    }, c[d.name] = f, [f, l]
        }
    },
    t = function(a, b, c) {
        return function() {
            if (c.autoPlay) f = new AR.Circle(1, {
                                              enabled: !1
                                              }), f.onEnterFieldOfVision = function() {
                "PrivateVideo" == c.subType ? AR.context.startVideoPlayer(c.src) : AR.context.openInBrowser(c.src,false)
            };
            else {
                var d = u(a, b, c),
                e = new AR.ImageResource(c.thumbnailUrl),
                f = new AR.ImageDrawable(e, c.height / 100, d),
                g = function() {
                    "PrivateVideo" == c.subType ? AR.context.startVideoPlayer(c.src) : AR.context.openInBrowser(c.src,false)
                };
                f.onClick = d.onClick ?
                function(a, b) {
                    return function() {
                        a(), b()
                    }
                }(d.onClick, g) : g
            }
            return f.removeFromTarget = function() {
                f.imageResource && !f.imageResource.destroyed && f.imageResource.destroy(), f.destroy()
            }, f
        }
    },
    u = function(b, c, d) {
        var e = {
        offsetX: (d.x / 100 - .5 + d.width / 200) * (c.size.width / c.size.height),
        offsetY: -1 * (d.y / 100 - .5 + d.height / 200),
        opacity: d.opacity / 100,
        rotation: d.rotation,
        zOrder: d.zOrder
        };
        return h && (e.onClick = function() {
                     sendEvent("Augmentation", "Click", d.id, "/" + a + "/" + b.id + "/" + c.label)
                     }), e
    },
    v = function(a) {
        var b = "#";
        return b += x(a.r), b += x(a.g), b += x(a.b), b += x(Math.floor(255 * a.a))
    },
    w = function(a) {
        var b = "rgba(";
        return b += a.r + ",", b += a.g + ",", b += a.b + ",", b += a.a + ")"
    },
    x = function(a) {
        var b = a.toString(16);
        return 2 == b.length ? b : "0" + b
    },
    y = function() {
        if (navigator.userAgent) {
            var a = navigator.userAgent.toLowerCase();
            return -1 != a.indexOf("android")
        }
    },
    z = function(a) {
        var b = AR.__architectBuildVersion__ < 400 ? "V1" : "V2";
        return "targets.wtc";
       // return "http://s3-eu-west-1.amazonaws.com/studio-live/473370/datasets/d8b0d9fb-da2e-46b4-b1e3-bf5b3bb7293c/targetcollections_4.1.x.wtc";
        return a.targetCollections[b].targetCollectionUrl
    }
};