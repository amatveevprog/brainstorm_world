// ИЗМЕНЕНИЕ КАТАЛОГА ОБЬЕКТОВ
var Selected_Catalog_String = 'Чай / Улуны';
var category_content_html;
AddAnimationToCategory();

function AddAnimationToCategory()
 {
   
   var category_container = document.getElementsByClassName("category")[0];
   category_content_html = category_container.innerHTML;
   
   category_container.addEventListener("mouseenter",function(event)
                  {
                       var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                       if (scrolled === 0)
                        {
                         return; 
                        }
                      //console.log('enetr');
                        var tween = TweenLite.to(category_container, 0.2,{height:'300px',color:'white'});
                        category_container.innerHTML = category_content_html;
                        console.log(category_container.innerHTML = category_content_html);
                        
                        //category_container.innerHTML = '<hr/> OLOLOLOLPOJHJKHGHJYT';
                      
                  });
                  
			category_container.addEventListener("mouseleave",function(event)
                  {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled === 0)
                        {
                         return; 
                        }
                    var tween = TweenLite.to(category_container, 0.2,{height:'40px',color:'white'});
                    category_container.innerHTML = Selected_Catalog_String;
                  });
 }




//Animate For Products Page When Scrolling Down
window.onscroll = function() 
 {
  var cart = document.getElementById('cartdiv');
  //var category_container = document.getElementById('startpagediv');
  var category_container = document.getElementsByClassName("category")[0];
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  console.log(scrolled + 'px');
  
  
  if(scrolled == 0)
   {
    var tween = TweenLite.to(category_container, 0.5,{height:'300px',marginTop:'-30px',width:'100%',opacity:1,background:'white',color:'black',position:'relative',onStart:animcart});
    function animcart()
    {
     var tween = TweenLite.to(cart, 0.7,{opacity:0});
    }
     //cart.style.marginTop = '250px';
   }
   else
   {
     var tween = TweenLite.to(category_container, 0.5,{height:'40px',marginTop:'0px',position:'fixed',top:'0px',width:'100%',opacity:0.7, background:'black',color:'white', onStart:hidecart});
     category_container.innerHTML = '<p style = "color:white; margin-left:20px">'+Selected_Catalog_String+'<p>';
      function hidecart() 
    {
     var tween = TweenLite.to(cart, 0.7,{opacity:1});
    }
     //cart.style.marginTop = '0px';
   }
 }