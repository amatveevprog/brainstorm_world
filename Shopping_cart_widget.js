
























//document.onreadystatechange = cartinit();
var cart;
 
function cartinit()
{
 cart = new Shopping_Cart();
 cart.show_cart();

}



function showwidgetcontent()
 {
    var blocks = document.getElementsByClassName('cartelemdivright');
    for (var i in blocks)
      {       
        try
        {
          var tween = TweenLite.to(blocks[i], 0.5,{opacity:1, display:'inline'});
        }
            catch(e)
        {
          console.log(e);
        }
          //blocks[i].style.display = 'inline';
      }
 }

function hidewidgetcontent()
 {
    var blocks = document.getElementsByClassName('cartelemdivright');
    
    for (var i in blocks)
      {   
        try
        {
          var tween = TweenLite.to(blocks[i], 0.2,{opacity:0,display:'none'});
          //blocks[i].style.display= 'none';
        }
        catch(e)
        {
          console.log(e);
        }
      }
 }




function Shopping_Cart()
{
 
  
  var cart = document.createElement("div");
  cart.id = 'cartdiv';
  cart.className = "cartdiv";
  //cart.id = 'cart';
  var imagesrc = 'https://cdn.shopify.com/s/files/1/0363/2857/t/68/assets/shopping_bag.png?1380437768496362973';
  var teaimagesrc = 'https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png';
  var goods = [];
  
  
  
  //DELETEITEM
  function deleteitem(elem_id)
    {
       for(var i in goods)
        {
            if (goods[i].id == elem_id)
            {
               goods.splice(i, 1);
               removefromwidget(elem_id);
               
            }
        }
    }
  
  function removefromwidget(elem_id)
   {
      //var cartelem =  document.getElementById('cartdiv');
      var element =  document.getElementById('itemdivid'+elem_id);
      element.innerHTML = '';
      var tween =  TweenLite.to(element, 0.5, {opacity:0, height:'0px',onComplete:function(){cart.removeChild(element);}});
     
   }
  
  //Change_Quantity
  function ChangeQTY(elem_id,plusminus)
    {
      console.log('start....');
     
      var number;
       for(var i in goods)
        {
          if (goods[i].id == elem_id)
            {
              
            
              
              console.log('found!!!!');
              number = i;
              if (plusminus == 'plus')
               {
                 goods[i].quantity = goods[i].quantity*1 + 1;
               }
              else
               {
                goods[i].quantity = goods[i].quantity*1 - 1;
               }
               
                 
            }
        }
        
        if (number != null)
         {
           
           if (goods[number].quantity == 0 )
            {
             goods[number].quantity = goods[number].quantity + 1;
            }
           else
           {
             console.log('start update');
             updatequantitywidget(elem_id,number);
           }
         }
         else
         {
           console.log('There is no such item in the system.');
         }
    }
  
  // Update_INFO_widget
  function updatequantitywidget(elem_id,number)
    {
      console.log('!!!!!!!!!');
      var elem_qty = document.getElementById('itemqtyid'+elem_id);
      elem_qty.innerText = goods[number].quantity;
      var elem_price = document.getElementById('item_priceid'+elem_id);
      elem_price.innerText = goods[number].quantity * goods[number].price;
      
     
    }
  
  
  
  
  
  
  this.show_cart = function()
    {
      if(document.body != null)
         {
            document.body.appendChild(cart); 
            TweenLite.to(cart, 2, {opacity:1, width:'50px'});
            var icon_div = document.createElement("div");
            icon_div.id = 'icondiv';
            icon_div.className = 'icondiv';
            
            var cart_icon = document.createElement("img");
            cart_icon.src = imagesrc;
            cart_icon.className = 'carticon';
            icon_div.appendChild(cart_icon);
            cart.appendChild(icon_div);
            var hr = document.createElement("div");
            hr.className = 'delimeter';
            
            
            
             cart.appendChild(hr);
            
            cart.addEventListener("mouseenter",function(event)
                  {
                    //hidewidgetcontent();
                    
                     var a = TweenLite.to(cart, 1.5,{width:'213px', paddingLeft:'7px',boxShadow: '0 0 4px rgba(0,0,0,0.2)',onStart:showdiv, onComplete:showwidgetcontent});
                     
                     
                    function showdiv()
                      {
                          var b =  TweenLite.to(cart_icon, 0.3, {transform:'rotate(90deg)'});
                          var blocks = document.getElementsByClassName('cartelemdiv');
                          console.log(blocks);
                          
                          
                           for (var i in blocks)
                            {       
                                  try
                                  {
                                  blocks[i].style.background = '#EEF5DB';
                                  var c = TweenLite.to(blocks[i], 0.5, {width: '200px',paddingTop:'25px',paddingBottom:'13px'});
                                  }
                                    catch(e)
                                         {
                                           console.log(e);
                                         }
                            }
                            
                          
                      }  
                      
                      //ShowContent();
                     
                      
                      // Show Content
                  
                      
                     //TweenLite.to(cart_icon, 1, {background:'#FF851B'});
                   
                  });
                  
            cart.addEventListener("mouseleave",function(event)
                  {
                     var a2 =  TweenLite.to(cart_icon, 0.5 , {transform:'rotate(0deg)',onStart:hideelems});
                    
                
                     
                 
                     function hideelems()
                     {
                     var blocks = document.getElementsByClassName('cartelemdiv');
                          console.log(blocks);
                           for (var i in blocks)
                            { 
                              try
                              {
                               var a3 =  TweenLite.to(blocks[i], 0.3, {width:'0px',paddingBottom:'0px',paddingTop:'0px',background:'#EEF5DB',onStart:hidewidgetcontent, onComplete:hidecart});
                              }
                              //blocks[i].style.background= '#FFDC00';
                             // blocks[i].style.width = '0px';
                            catch(e)
                               {
                                    console.log(e);
                               }
                            }
                     }
                     
                    
                     
                    
                      var a2 =  TweenLite.to(cart_icon, 0.3, {transform:'rotate(0deg)'});
                      
                     function hidecart()
                     {
                      var a1 =  TweenLite.to(cart, 1, {width:'50px'});
                     }
                       
                     
                      
                      
                      
                      
                      
                  });
            
            
            console.log(cart_icon.src);
         }
       else
         {
              console.log('=(');
         }
  
     
    }
    
    
    
    this.add_item = function(item)
     {
       goods.push(item);
       console.log(goods);
       
       
       
       var cart_elem_div = document.createElement("div");
       cart_elem_div.className = 'cartelemdiv_general';
       
       
       
       var cart_elem_div = document.createElement("div");
       cart_elem_div.id = 'itemdivid'+item.id;
       cart_elem_div.name = item.name;
       cart_elem_div.className = 'cartelemdiv';
       
       
       
       
       var cart_elem_icon = document.createElement("img");
       cart_elem_icon.className = 'elemicon';
       cart_elem_icon.src = teaimagesrc;
       cart_elem_div.appendChild(cart_elem_icon);
       
       
       
       
       var cart_elem_div_right = document.createElement("div");
       cart_elem_div_right.className = 'cartelemdivright';
       
       //CONTENT BLOCKS
       var cart_elem_div_right_up = document.createElement("div");
       cart_elem_div_right_up.className = 'cartelemdivright_up';
       
       
       var cart_elem_div_right_down = document.createElement("div");
       cart_elem_div_right_down.className = 'cartelemdivright_down';
       
          // _______________________________________TEXT BLOCKS________________________________________
        var item_name = document.createElement("p");
        item_name.innerHTML = item.name;
        item_name.className = 'carttitle';
        cart_elem_div_right_up.appendChild(item_name);
        
         var delete_item = document.createElement("button");
         delete_item.className = 'deleteitem';
         delete_item.innerText = 'x';
         delete_item.onclick = function(){ removefromwidget(item.id)};
         cart_elem_div_right_up.appendChild(delete_item);
       
        var item_Number = document.createElement("p");
        item_Number.innerHTML = item.quantity;
        item_Number.id = 'itemqtyid'+item.id;
        item_Number.className = 'carttitle';
        cart_elem_div_right_down.appendChild(item_Number);
        
       
       
       
        var addbutton = document.createElement("button");
        addbutton.innerText = '+';
        addbutton.className = 'plusbutton';
        addbutton.onclick = function(){ChangeQTY(item.id,'plus');}
       
        var minusbutton = document.createElement("button");
        minusbutton.innerText = '-';
        minusbutton.className = 'plusbutton';
        minusbutton.onclick = function(){ChangeQTY(item.id,'minus');}
        
        
        
       
        var cart_elem_div_buttons = document.createElement("div");
        cart_elem_div_buttons.className = 'plusminusbtns';
        
       
        cart_elem_div_buttons.appendChild(minusbutton);
         cart_elem_div_buttons.appendChild(addbutton);
         
        
          cart_elem_div_right_down.appendChild(cart_elem_div_buttons);
        
        
        var item_Price= document.createElement("p");
        var overall_price = item.price*item.quantity;
        item_Price.innerHTML = overall_price;
        item_Price.id = 'item_priceid'+item.id;
        item_Price.className = 'carttitle';
        cart_elem_div_right_down.appendChild(item_Price);
       
       
       
       
       
       cart_elem_div_right.appendChild(cart_elem_div_right_up);
       cart_elem_div_right.appendChild(cart_elem_div_right_down);
       
       cart_elem_div.appendChild(cart_elem_div_right);
       cart.appendChild(cart_elem_div);
       
       

       //cart.appendChild(cart_elem_div1);
       TweenLite.to(cart_elem_icon, 0.5, {opacity:1, width:'30px'});
     }
    
    
    
    
}






//Oncick Events















var i =1;






function additem()
 {
   
    var name =  document.getElementById('name').value;
    var quantity =  document.getElementById('quantity').value;
    var price =  document.getElementById('priceforone').value;
    var type =  document.getElementById('type').value;
    
    i = i+1;
    var item = new Object();
    item.id = i+name;
    item.name = name;
    item.quantity = quantity;
    item.price = price;
    cart.add_item(item);
 }
 
 
 cartinit();
 
 
 
 
 
//Sample Data Generation


 var item = new Object();
    item.id = '0001';
    item.name = 'Сяо Фень Чай';
    item.quantity = 4;
    item.price = 300;
    cart.add_item(item);
  
   var item = new Object();
    item.id = '0002';
    item.name = 'Чжу Вей Чай';
    item.quantity = 1;
    item.price = 700;
    cart.add_item(item);
    
    
    
     var item = new Object();
    item.id = '0003';
    item.name = 'Вань Линь чай';
    item.quantity = 3;
    item.price = 500;
    cart.add_item(item);
    
