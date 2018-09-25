
  var arTargets=  {};
  var targetImageArray = [];




  var compareStrings=function(a,b)
  {

   if(a.length!=b.length)
   {

    return false;
   }
   else
   {

    for (var i = 0; i <a.length; i++) {

      if(a[i]!=b[i])
      {
        return false;
      }
    };


   }

   return true;

  }


var snapCloseClass="snap-close";
var scanningDivID="scanner";




$('#screenshotbutton').click(function()
{

//alert("clicked");
     var architectSdkUrl = "architectsdk://capturescreenshot";
        document.location = architectSdkUrl;
   

});



$('.'+snapCloseClass).click(function()
{

    $('#'+scanningDivID).show();
    $('#screenshotbutton').hide();
  

    $('.'+snapCloseClass).hide();
$('#snapContainer').hide();

Object.keys(arTargets).forEach(function(key) {
              var target=arTargets[key];
              target.snapToScreen.enabled=false;




             
 
               
                  var a = target.l.drawables.cam;
                                     
                  for (var w = 0; w < a.length; w++) 
                   {
                                     if(a[w].pause)
                                     {
                                      a[w].pause();
                                     }


                    }



              
              

            });





});




window.blueprint = window.blueprint || {}, blueprint.Converter = function(a, b) {
  b || (b = {}), null == b.report && (b.report = !0);
  var c = {},
      d = 1e4,
      e = 6e4,
      f = 0,
      g = "https://s3-eu-west-1.amazonaws.com/studio-live/0000staticfiles/mini-loader.png",
      h = AR.build.mobile && b.report,
      i = null,
      j = !0;


    



  this.getArchitectObject = function(a) {
    return c[a.toString()]
  }, this.convertProject = function(b) {
    console.log("Converting " + b.targets.length + " targets."), h && sendPageView("/" + a + "/" + b.id, "Project_" + b.id), AR.context.services.sensors = !1;
    var d = z(b);
    i = new AR.Tracker(d, {
      onLoaded: function() {
        console.log("Target Collection fully loaded.")
        
        $('#initMessage').text("Point to scan");
        $(".point-section").delay(5000).fadeOut(300);



      },
      onError: function() {
        alert("Target Collection cannot be loaded.")
      }
    }), c.targetCollection = i, j = b.targets.length > f;
    for (var e = 0; e < b.targets.length; e++) {

       targetImageArray[e]=b.targets[e].imageUrl;

      for (var g = b.targets[e], m = [], n = 0; n < g.augmentations.length; n++) {
        var o = l(b, g, g.augmentations[n]);
        o && (Array.isArray(o) ? m = m.concat(o) : m.push(o))
      }
      var p = k(b, g, m);
       p.targetImageID=e;
      j || (p.drawables.cam = m)
    }
  };
  var k = function(b, f, g) {
    g = g || [];
    var k = function(a) {
      for (var b = 0; b < a.drawables.cam.length; b++) a.drawables.cam[b].onExitFieldOfVision && a.drawables.cam[b].onExitFieldOfVision()
    },
        l = new AR.Trackable2DObject(i, f.label.toString(), {


         snapToScreen: {

                              snapContainer:document.getElementById("snapContainer"),

                              
                             enabledOnExitFieldOfVision:true,

                             onDelayedSnapInterruption:function(timestamp)
                             {

                                  $('#snapContainer').css("display","inline-block"); 
                                    $('.'+snapCloseClass).show();

                                    window.dispatchEvent(new Event('resize'));

                            

                             },
                             onSnappedToScreen:function(div)
                             {

                            $('#snapContainer').css("display","inline-block");

                            $('.'+snapCloseClass).show();
                            window.dispatchEvent(new Event('resize'));


                             }

                
                        }  
           
  ,
  


        onEnterFieldOfVision: function() {



  $('#touchcontrols').hide();
  $('#screenshotbutton').show();
                                    



 if (!(h && (!this.detectionTime || (new Date).getTime() - this.detectionTime.getTime() > d) && (sendPageView("/" + a + "/" + b.id + "/" + f.label, "Target_" + f.label), this.detectionTime = new Date), j))
                         {

  //false detection

  return;
  }






       //close loader and snap-close button
        $('#'+scanningDivID).hide();
        $('.'+snapCloseClass).hide();

       $('#snapContainer').css("background-image",'url("'+targetImageArray[this.targetImageID]+'")');
       $('#snapContainer').hide();


  //false detection code


     //    if (h && (!this.detectionTime || (new Date).getTime() - this.detectionTime.getTime() > d) && (sendPageView("/" + a + "/" + b.id + "/" + f.label, "Target_" + f.label), this.detectionTime = new Date), j) if (l.destroyTimer) window.clearTimeout(l.destroyTimer), l.destroyTimer = null;
        //  else {
        

             this.trackingID=f.label.toString();

               var splitImageUrl=f.imageUrl.toString().split("/");
               var theImageUrl=splitImageUrl[splitImageUrl.length-1];
              sendPosterView(theImageUrl,theImageUrl);


         //    alert(this.trackingID);
          

            //loading indicator add


            if(this.targetAdded == undefined)
            {




//added only once right?
        for (var c = [], e = 0; e < g.length; e++) {
              var i = g[e]();
              Array.isArray(i) ? c = c.concat(i) : c.push(i)
            }

            l.drawables.cam = c
            this.l=l; //lol just in case thu  


            this.l.drawables.addCamDrawable(loadingDrawable); 
            loadingDrawable.animate(keyframes, 70, -1);
            console.log(this.trackingID);
            this.targetAdded=true;
            console.log("adding target" +this);


      arTargets[this.trackingID]=this;

          var a = this.l.drawables.cam;
          var containsVideo=false;
          var containsModel=false;
                                     
                  for (var w = 0; w < a.length; w++) 
                   {
                      a[w].targetObject=this;

                      if(a[w].containsVideo)
                        {
                              containsVideo=true;
                              
                          }

                          if(a[w].containsModel)
                          {


                          $('#touchcontrols').hide();

                            console.log("contains model");
                                 containsModel=true;

                                 currentModel=a[w].f;
                               
                          }
                              

                    }



                    if(!containsVideo && !containsModel)
                    {
                         


                 var currentObject=this;
 
                   setTimeout(function()
                      {


                        console.log("removing");


                        currentObject.l.drawables.removeCamDrawable(loadingDrawable);


                      },2000);
            


                    }








            }  
            else
            {


//resume current video
                var a = this.l.drawables.cam;

                console.log("showing campaign which was detected before")
                                     
                  for (var w = 0; w < a.length; w++)
                   {



                    if(a[w].containsModel)
                    {

                      currentModel=a[w];
                        $('#touchcontrols').hide();





                      //animate too 


                

                      if(a[w].animationsQueue)
               {

                   var animationsQueue=a[w].animationsQueue;

                       for (var i = 0; i < animationsQueue.length; i++) {   


                if(i==0)
                {
                  console.log("animation playing:"+animationsQueue[i]);

                 animationsQueue[i].start(-1);
                }
                else
                {

                setTimeout(function(){ 

                       console.log("animation playing:"+animationsQueue[i]);


                  animationsQueue[i].start(-1); }, (i)*1000);

                }
               

               }


                   }    
   






                    }


else
{

                    try
                    {
                                      a[w].resume();
                                   //   a[w].play();

                    }
                    catch(err)
                    {

                    }

                  }

                    
                                   

                    }




            }



           




//stop other videos playing in the background

console.log("current tracking id is:"+this.trackingID);
var keyCounter=0;

var currentKey=this.trackingID.toString();

Object.keys(arTargets).forEach(function(key) {


if(!compareStrings(currentKey,key))
  {
    console.log("keyX " + keyCounter++ + " is "+ key);


  var target=arTargets[key];

              target.snapToScreen.enabled=false;
            //  target.snapToScreen.enabledOnExitFieldOfVision=true;





            //  if(target.trackingID!=this.trackingID)
            

                  var a = target.l.drawables.cam;
                                     
                  for (var w = 0; w < a.length; w++) 
                   {
                                    
                                    try

                                    {
                                      a[w].pause();
                                    }
                                    catch(err)
                                    {

                                    }


                    }



              }
              
});

            







         // } //else block commented
 

          for (var e = 0; e < l.drawables.cam.length; e++) 
            {
            l.drawables.cam[e].onEnterFieldOfVision && l.drawables.cam[e].onEnterFieldOfVision()

          }



    //redefining
          this.snapToScreen.enabledOnExitFieldOfVision=true; 
         // window.dispatchEvent(new Event('resize'));



        },
        onExitFieldOfVision: j ?
        


          function() {






            for (var e = 0; e < l.drawables.cam.length; e++) 
            {




            l.drawables.cam[e].onExitFieldOfVision && l.drawables.cam[e].onExitFieldOfVision()
           



           }







   //var a = this.l.drawables.cam;

                console.log("showing campaign which was detected before")
                                     
                 
/*
                  for (var w = 0; w < a.length; w++)
                   {



                    if(a[w].containsModel)
                    {

                      currentModel=a[w];




                      //animate too 


                

                      if(a[w].animationsQueue)
               {

                   var animationsQueue=a[w].animationsQueue;

                       for (var i = 0; i < animationsQueue.length; i++) {   


               
                 animationsQueue[i].stop();
               

               }


                   }    
   






                    }


                   
                    
                                   

                    }


*/


 





          l.destroyDrawables = function() {


            console.log("   ") //destroy drawables override
            return;




            var a = l.drawables.cam;
            l.drawables.cam = [];
            for (var b = 0; b < a.length; b++) a[b].removeFromTarget && a[b].removeFromTarget();
            l.destroyTimer = null
         


          }, l.destroyTimer = window.setTimeout(l.destroyDrawables, e), k(l)
        




        } :


         function() {

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
            //AR.context.openInBrowser(d.clickUrl,false)



       console.log(d.clickUrl);

                        var url=d.clickUrl.replace("http://", "");
                        console.log("new url is "+url);

                       // alert("new url is" +url);


                       if(d.clickUrl.indexOf("saarabaction=")!=-1)
                       {


                              var url=d.clickUrl.replace("http://", "architectsdk://");
                        console.log("new url is "+url);


                         
                         // var architectSdkUrl = "architectsdk://call?phonenumber=" + getParameterByName("phonenumber",d.clickUrl);
       // alert(architectSdkUrl);
       // document.location = architectSdkUrl;

       document.location=url;
      

                       }
       




/*


       if(d.clickUrl.indexOf("call")!=-1)
       {


        var data=JSON.
        var architectSdkUrl = "architectsdk://call?phonenumber=" + getParameterByName("phonenumber",d.clickUrl);
       // alert(architectSdkUrl);
        document.location = architectSdkUrl;
         }
            else if(d.clickUrl.indexOf("sms")!=-1)
       {
       var architectSdkUrl = "architectsdk://sms?phonenumber=" + getParameterByName("phonenumber",d.clickUrl);
       // alert(architectSdkUrl);
        document.location = architectSdkUrl;
         }
     else if(url.indexOf("pointto:")!=-1)
       {

      url=url.replace("pointto:","");
              var params=url;
              console.log(params);

              
               params=JSON.parse(params);
               console.log(JSON.stringify(params));
              
           
                      var lat=params["lat"].toString();
            var longitude= params["long"].toString();
         
        var architectSdkUrl = "architectsdk://maps?lat=" + encodeURIComponent(lat)+"&long="+longitude ;
        console.log(architectSdkUrl);
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

      console.log(architectSdkUrl);
       

            document.location=architectSdkUrl;

      

         }

                       // $('#teldude').attr("href",url);
                       // $('#teldude').click();

                           //  AR.context.openInBrowser(url,false);
              
              */
                    
                    else
                    {
                    AR.context.openInBrowser(d.clickUrl);
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
        h = h > 1023 ? 1023 : h, e.viewportWidth = g + 1, e.viewportHeight = h, e.clickThroughEnabled = !0, e.allowDocumentLocationChanges = !0;
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
      //alert(d.scale); 
      return function() {


        var a = b.size.width * d.width / 100,
            e = b.size.height * d.height / 100,
            f = new AR.Model(d.src, {

            onClick : function() {
    //something happens

     console.log("Clicked touch world");

                  currentModel=this;
  } ,

           onLoaded:function()
           { 


 currentModel=f;



       

       if(f.targetObject!=undefined)
       {

        f.targetObject.l.drawables.removeCamDrawable(loadingDrawable);
       }
               //alert(d.name);
               var animationstring=d.name;


             animationstring= animationstring.split("{").pop().split("}").shift();


               
console.log("animation string found:"+animationstring);


             if(animationstring)
             {

var animationsQueue=[];

               var animations=animationstring.split(',');

               for (var i = 0; i < animations.length; i++) {



                 
           
  var animation = new AR.ModelAnimation(f, animations[i]);  

//  animation.start(-1);
     
 animationsQueue.push(animation);

    
               


               };


f.animationsQueue=animationsQueue;



  
               for (var i = 0; i < animationsQueue.length; i++) {


                if(i==0)
                {
                  console.log("animation playing:"+animationsQueue[i]);

                 animationsQueue[i].start(-1);
                }
                else
                {

                setTimeout(function(){ 

                       console.log("animation playing:"+animationsQueue[i]);


                  animationsQueue[i].start(-1); }, (i)*1000);

                }
               

               }







                 
                  }




           } ,

            scale: {
              x: d.scale/3,
              y: d.scale/3,
              z: d.scale/3
            },
            rotate: {
              roll: -1 * d.rotation,
              tilt: d.rotationTilt,
              heading: d.rotationHeading
            },
            translate: {
              x: (d.x / 100 - .5) * (b.size.width / b.size.height) + .5 * a / b.size.height,
              y: -1 * (d.y / 100 - .5 + .5 * e / b.size.height)
            }
          });

  f.containsModel=true;

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
          console.log("click");
          AR.context.openInBrowser(d.url,false);
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
        f.containsVideo=true;

         f.onPlaybackStarted=function()
            {


      
       if(f.targetObject!=undefined)
       {

        f.targetObject.l.drawables.removeCamDrawable(loadingDrawable);
       }
        window.dispatchEvent(new Event('resize'));

                  }




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
          f.autoResume && "PAUSED" == f.state && (f.state = "PLAYING", f.resume())
        }, f.onExitFieldOfVision = function() {
          "PLAYING" == f.state && (f.state = "PAUSED", f.pause())
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
        return f.onLoaded = function() {

           
        window.dispatchEvent(new Event('resize'));



   



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
          "PrivateVideo" == c.subType ? AR.context.startVideoPlayer(c.src) : AR.context.openInBrowser(c.src)
        };
        else {
          var d = u(a, b, c),
              e = new AR.ImageResource(c.thumbnailUrl),
              f = new AR.ImageDrawable(e, c.height / 100, d),
              g = function() {
              "PrivateVideo" == c.subType ? AR.context.startVideoPlayer(c.src) : AR.context.openInBrowser(c.src)
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
      return "targets.wtc";
      var b, c = AR.__architectBuildVersion__;
      return b = 410 === c ? "V3" : c >= 400 && 410 > c ? "V2" : "V1", a.targetCollections[b].targetCollectionUrl
      }
};






// 3D Model interaction on snap to screen mode

//current model is the model under consideration

var scale = 1;
var z1 = 100;
var z2 = 100;
var z3 = 100;
var state = false;
var flashstate = false;



//disabull the troubulll with power and corruption
//AR.context.services.sensors=false;

function toggleFlashlight() {
    if (AR.context.hardware.flashlightAvailable) {
        if (false == flashstate) {
            AR.context.hardware.flashlight = true;
            flashstate = true;
        } else {
            AR.context.hardware.flashlight = false;
            flashstate = false;
        }
    } else {
        // alert('no flashlight available');
    }
}


var modelType = "2d";
var currentModel = undefined;
var initialScale = undefined;
var resetModel = undefined;

function getParameterByName(name,theUrl) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(theUrl);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


//var modelUrl = getParameterByName('url');
var modelUrl = "fish.wt3"

    //alert(modelUrl);

/*
var modelUrl="https://facwiki.cs.byu.edu/cs142fa10/images/thumb/9/90/SpaceshipTransparent.png/200px-SpaceshipTransparent.png";
*/
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}




resetModel = function() {

    if (modelType == "2d") {
        $('#move1').css({
            position: "absolute",
            top: "100px",
            left: "550px",
            "margin-right": "auto",
            "margin-left": "auto",
            right: 0,
            left: 0
        });
        $('#move1').css({
            '-webkit-transform': 'rotate(' + 0 + 'deg)' + 'scale(' + 1.0 + ')'
        });

    } else {

        currentModel.translate.x = 0;
        currentModel.translate.y = 0;
        currentModel.translate.z = 0;
        currentModel.rotate.roll = 0;
        currentModel.rotate.tilt = 0;
        currentModel.scale.x = initialScale.x;
        currentModel.scale.y = initialScale.y;
        currentModel.scale.z = initialScale.z;


    }
}


//$('#move1').css("background-image","url('"+modelUrl+"?v="+S4()+"')");

console.log("url is: " + "url('images/" + modelUrl + "')");

var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);



    modelType = "3d";

   // $('#container').hide();
    //3d model



    var World = {
            loaded: false,
            pinchDistance: 0,
            rotating: false,
            lastTouch: {
                x: 0,
                y: 0
            },
            lastScale: 0,
            modelTouched: false,
            currentScale: 0,
            swipeAllowed: true,


            init: function initFn() {

                AR.context.clickBehavior = AR.CONST.CLICK_BEHAVIOR.TOUCH_DOWN;


                World.addInteractionEventListener();


            },

           

        worldLoaded: function worldLoadedFn() {
            World.loaded = true;

            //  alert(currentModel.scale.x+":"+currentModel.scale.y+":"+currentModel.scale.z);

            //commented recently
          //  currentModel.scale.x=currentModel.scale.x*0.01;
           // currentModel.scale.y=currentModel.scale.y*0.01;
           //  currentModel.scale.z=currentModel.scale.z*0.01;




            initialScale = {
                x: currentModel.scale.x,
                y: currentModel.scale.y,
                z: currentModel.scale.z
            };

            //  alert(currentModel.scale.x+":"+currentModel.scale.y+":"+currentModel.scale.z);

            //var e = document.getElementById('loadingMessage');
            //e.parentElement.removeChild(e);
        },

        /*
      Event handler for touch and gesture events. The handler are used to calculate and set new rotate and scaling values for the 3D model.
    */
        handleTouchStart: function handleTouchStartFn(event) {

            World.swipeAllowed = true;

            console.log("Clicked touch world");

            /* Once a new touch cycle starts, keep a save it's originating location */
            World.lastTouch.x = event.touches[0].clientX;
            World.lastTouch.y = event.touches[0].clientY;



            if (!iOS) {
                if (event.touches.length > 1) {
                    World.pinchDistance = Math.sqrt(Math.pow((event.touches[1].pageX - event.touches[0].pageX), 2) + Math.pow((event.touches[1].pageY - event.touches[0].pageY), 2));
                    console.log("android two pinch start");

                    event.scale = World.lastScale;
                    World.handleGestureStart(event);
                    return;
                } else {
                    World.pinchDistance = 0;
                }

            }

            event.preventDefault();
        },

        handleTouchMove: function handleTouchMoveFn(event) {


            if (!(World.pinchDistance <= 0)) {
                if (!iOS && event.touches.length > 1) {


                    var newDistance = Math.sqrt(Math.pow((event.touches[1].pageX - event.touches[0].pageX), 2) + Math.pow((event.touches[1].pageY - event.touches[0].pageY), 2));
                    var newEvent = {
                        scale: newDistance / World.pinchDistance
                    };
                    World.handleGestureChange(newEvent);
                    return;
                }

            }



            if (World.swipeAllowed) {

                /* Define some local variables to keep track of the new touch location and the movement between the last event and the current one */
                var touch = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
                var movement = {
                    x: 0,
                    y: 0
                };


                /* Calculate the touch movement between this event and the last one */
                movement.x = (World.lastTouch.x - touch.x) * -1;
                movement.y = (World.lastTouch.y - touch.y) * -1;


                if (World.modelTouched) {

                    currentModel.translate.x += (movement.x * 0.03);
                    currentModel.translate.y += (movement.y * -0.03);




                } else {
                    /* Rotate the car model accordingly to the calculated movement values. Note: we're slowing the movement down so that the touch action feels better */
                    currentModel.rotate.heading += (movement.x * 0.3);
                    currentModel.rotate.tilt += (movement.y * 0.3);

                }


                /* Keep track of the current touch location. We need them in the next move cycle */
                World.lastTouch.x = touch.x;
                World.lastTouch.y = touch.y;
            }

            event.preventDefault();




        },

        handleGestureStart: function handleGestureStartFn(event) {

            /* Once a gesture is recognized, disable rotation changes */
            World.swipeAllowed = false;

            World.lastScale = event.scale;
        },


        handleTouchEnd: function handleTouchEnd(event) {


            if (!(World.pinchDistance <= 0)) {
                if (!iOS) {

                    //event={}
                    World.handleGestureEnd(event);
                    return;
                }

            }




            event.preventDefault();

            World.modelTouched = false;

        },


        handleGestureChange: function handleGestureChangeFn(event) {

            /* Calculate the new scaling delta that should applied to the 3D model. */
            var deltaScale = (event.scale - World.lastScale) * 0.1;




            /* Negative scale values are not allowd by the 3D model API. So we use the Math.max function to ensure scale values >= 0. */
            var newScale = Math.max(currentModel.scale.x + deltaScale, 0);


            console.log("scale is:" + newScale);

            currentModel.scale = {
                x: newScale,
                y: newScale,
                z: newScale
            };

            /* Keep track of the current scale value so that we can calculate the scale delta in the next gesture changed function call */
            World.lastScale = event.scale;
        },



        handleGestureEnd: function handleGestureEndFn(event) {

            /* Once the gesture ends, allow rotation changes again */
            World.swipeAllowed = true;

            //World.lastScale = event.scale;
        },
        /*
    Touch and gesture listener are added to allow rotation and scale changes in the snapped to screen state.
  */
        addInteractionEventListener: function addInteractionEventListenerFn() {





            document.getElementById('maincontainer').addEventListener('touchstart', World.handleTouchStart, false);
            document.getElementById('maincontainer').addEventListener('touchmove', World.handleTouchMove, false);
            document.getElementById('maincontainer').addEventListener('touchend', World.handleTouchEnd, false);
            document.getElementById('maincontainer').addEventListener('touchcancel', World.handleTouchEnd, false);


            document.getElementById('maincontainer').addEventListener('gesturestart', World.handleGestureStart, false);
            document.getElementById('maincontainer').addEventListener('gesturechange', World.handleGestureChange, false);
            document.getElementById('maincontainer').addEventListener('gestureend', World.handleGestureEnd, false);




        }




};

//World.init();









/*
 function callFace(x,y,width,height,angle)
{
  console.log("cakk"+x+":"+y+":"+width+":"+height+":"+angle);

  if($!=undefined)
  {
    $("#move1").css({position:"absolute", left:x+'px',top:y+'px',width:width+'px',height:height+'px','-webkit-transform' : 'rotate(' +angle + 'rad)'});
  }
}
*/




