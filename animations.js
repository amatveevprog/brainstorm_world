// ИЗМЕНЕНИЕ КАТАЛОГА ОБЬЕКТОВ
var Selected_Catalog_String = 'Чай / Улуны';
  var category_container = document.getElementById('startpagediv');
  var category_container_short = document.getElementsByClassName("categoryshort")[0];
   var category = document.getElementsByClassName("category")[0];
   var allProds = document.getElementById("allproducts");
   var products = document.getElementsByClassName("content_container")[0];
   
   var specialDivForScrolling = document.createElement("div");
   specialDivForScrolling.className = "categoryshort2";
   specialDivForScrolling.innerHTML="<p id = 'bread' style = 'width:100%; margin:0px'>Хлебные крошки / Хлебные крошки / Хлебные крошки</p>";
   category_container_short.appendChild(specialDivForScrolling);
   specialDivForScrolling.style.display="none";
   
AddAnimationToCategory();
var fl_appended=false;
function AddAnimationToCategory()
 {
   
  // var category_container = document.getElementsByClassName("category")[0];
   //var short_category_container = document.getElementsByClassName("categoryshort")[0];
   
   /* category_container_short.addEventListener("mouseenter",function(event)
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
                   //var tween = TweenLite.to(category_container, 0.2,{display:'none'});
                    category.style.display = 'none';
                    category.style.position = 'relative';
                   
                  }); */
	specialDivForScrolling.addEventListener("mouseenter",function(event)
	{
		//console.log("entered!!");
		//show the derevo
		
		displaychildren(specialDivForScrolling);
	});
	specialDivForScrolling.addEventListener("mouseleave",function(event)
	{
		//hide the tree
	
		displayNONEchildren(specialDivForScrolling);
		//console.log("leaved!!");
	});
	
	 
	function displaychildren(ParentDiv)
	{
	 
		//L = Math.round(L);

   var bread = document.getElementById('bread');
   var breadanimation = TweenLite.to(bread, 0.2,{opacity:0,height:0}); 
   //bread.style.display = 'none';
		for(var i=1;i<ParentDiv.children.length;i++)
		{
		  ParentDiv.children[i].style.display="block";
		  ParentDiv.children[i].style.background="black";
		  var animation =  TweenLite.to(ParentDiv.children[i], 0.5,{opacity:1});
		  
		}
		//var animation =  TweenLite.to(ParentDiv.children[i], 0.2,{height:'40px'});
	
	}
	function displayNONEchildren(ParentDiv)
	{
	 // bread.style.opacity = 1;   v
	 var bread = document.getElementById('bread');
	  var breadanimation = TweenLite.to(bread, 0.2,{opacity:1,height:'100%'});  
	  //bread.style.display = 'block';
		for(var i=1;i<ParentDiv.children.length;i++)
		{
		  var animation =  TweenLite.to(ParentDiv.children[i], 0.5,{opacity:0,onComplete:hide});
		  //var animation =  TweenLite.to(ParentDiv.children[i], 0.2,{height:'0px'});
		  function hide()
		  {
		  	ParentDiv.children[i].style.display="none";
		  }
		}
		//var animation =  TweenLite.to(category_container_short, 0.2,{height:'40px'});
	}
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
	 allProds.insertBefore(category,products);
   }
   else
   {
     var tween = TweenLite.to(category_container_short, 0.5,{height:'40px',marginTop:'0px',position:'fixed',top:'0px',width:'100%',opacity:0.7, background:'black',color:'white', onStart:hidecart});
     category.style.display = 'block';    
      function hidecart() 
    {
     var tween = TweenLite.to(cart, 0.7,{opacity:1});
    }
     //cart.style.marginTop = '0px';

	specialDivForScrolling.style.display="block";
	specialDivForScrolling.style.height = "20px";
	//specialDivForScrolling.style.background = "red";
	//specialDivForScrolling.style.width = category_container_short.style.width;
	specialDivForScrolling.style.width = '100%';
	category.style.display="none";
	specialDivForScrolling.appendChild(category); 
		  category.style.opacity=0;
		   category.style.background = black;

   }
 }
