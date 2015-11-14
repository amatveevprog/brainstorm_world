// ИЗМЕНЕНИЕ КАТАЛОГА ОБЬЕКТОВ
var Selected_Catalog_String = 'Чай / Улуны';
  var category_container = document.getElementById('startpagediv');
  var category_container_short = document.getElementsByClassName("categoryshort")[0];
   var category = document.getElementsByClassName("category")[0];
AddAnimationToCategory();

function AddAnimationToCategory()
 {
   
  // var category_container = document.getElementsByClassName("category")[0];
   //var short_category_container = document.getElementsByClassName("categoryshort")[0];
   
   category_container_short.addEventListener("mouseenter",function(event)
                  {
                       var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                       if (scrolled === 0)
                        {
                         return; 
                        }
                      //console.log('enetr');
                      category.style.display = 'block';
                      category.style.position = 'fixed';
                      category.style.marginTop = '-60px';
                        //var tween = TweenLite.to(category_container, 0.2,{display:'block'});
                       
                        
                        //category_container.innerHTML = '<hr/> OLOLOLOLPOJHJKHGHJYT';
                      
                  });
                  
			category_container_short.addEventListener("mouseleave",function(event)
                  {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled === 0)
                        {
                         return; 
                        }
                   // var tween = TweenLite.to(category_container, 0.2,{display:'none'});
                    category.style.display = 'none';
                    category.style.position = 'relative';
                   
                  });
 }




//Animate For Products Page When Scrolling Down
window.onscroll = function() 
 {
  var cart = document.getElementById('cartdiv');

  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  console.log(scrolled + 'px');
  
  
  if(scrolled == 0)
   {
    var tween = TweenLite.to(category_container_short, 0.5,{height:'300px',marginTop:'-30px',width:'100%',opacity:1,background:'white',color:'black',position:'relative',onStart:animcart});
    category.style.display = 'block';
    function animcart()
    {
     var tween = TweenLite.to(cart, 0.7,{opacity:0});
    }
     //cart.style.marginTop = '250px';
   }
   else
   {
     var tween = TweenLite.to(category_container_short, 0.5,{height:'40px',marginTop:'0px',position:'fixed',top:'0px',width:'100%',opacity:0.7, background:'black',color:'white', onStart:hidecart});
     category.style.display = 'none';    
     category_container.innerHTML = '<p style = "color:white; margin-left:20px">'+Selected_Catalog_String+'<p>';
      function hidecart() 
    {
     var tween = TweenLite.to(cart, 0.7,{opacity:1});
    }
     //cart.style.marginTop = '0px';
   }
 }