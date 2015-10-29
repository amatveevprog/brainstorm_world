
//конструктор класса Product
//name - название продукта 
//price - цена 
//quantity - количество на складе 
//images_urls - ссылки на изображения(например, с радикала), МАССИВ СТРОК!
function Product(/*id,parent_id,*/name,price,quantity,images_urls)
{
	this.Id = 0;
	//this.parentId=parent_id;
	this.name = name;
	this.price = price;
	this.quantity = quantity;
	this.images_urls=images_urls;
	this.children=[];
	this.level=0;
	
}
var glblId = 
{
	glbl_id:0,
	get globalId()
	{
		return this.glbl_id;
	},
	set globalId(value)
	{
		this.glbl_id=value;
	}	
};

////поиск узла 
//input_id - id элемента
//cur - самый верхний узел(для рекурсии) обычно самый верхний Node
//_level - уровень(при вызове сюда ставить 0!) - тоже для рекурсии
Product.prototype.searchNode = function(input_id,cur,_level)
{
	if(cur.Id==input_id)
	{
		var struct = {element:cur,Level:_level};
		return struct;
	}
	for(var i=0;i<cur.children.length;i++)
	{
		var result = this.searchNode(input_id,cur.children[i],_level+1);
		if(result!=null)
		{
			return result;
		}
	}
	return null;
}
////добавление дочернего элемента по id 
//parent_id - id родительского элемента
//productToAdd - продукт,который присоединять
Product.prototype.addChild1 = function(parent_id,productToAdd)
{
	var ref = this.searchNode(parent_id,this,0);
	if(ref!=null)
	{
		productToAdd.Id = glblId.globalId+1;
		glblId.globalId+=1;
		productToAdd.level=ref.Level+1;
		ref.element.children.push(productToAdd);
	}
	else
	throw new Error("Неверный id!");
}
////добавление дочернего элемента по узлу родительского
//Node - узел, к которому присоединять элемент
//productToAdd - продукт,который присоединять
Product.prototype.addChild = function(Node,productToAdd)
{
	var ref = this.searchNode(Node.Id,this,0);
	if(ref!=null)
	{
		productToAdd.Id = glblId.globalId+1;
		glblId.globalId+=1;
		productToAdd.level=ref.Level+1;
		ref.element.children.push(productToAdd);
	}
	else
	{
		productToAdd.level=Node.level+1;
		productToAdd.Id = glblId.globalId+1;
		glblId.globalId+=1;
		Node.children.push(productToAdd);
	}
}
////вычислить максимальный уровень вложенности
Product.prototype.maxLevel = function()
{
	var level=0;
	//обход дерева с целью узнать максимальный уровень вложенности
	function go(Node,curr_level)
	{
		if(Node.children.length==0)
		{
			return Node.level;
		}
		for(var j=0;j<Node.children.length;j++)
		{
			//обходим всех потомков
			var childLevel;
			if((childLevel = go(Node.children[j],curr_level))>curr_level)
			{
				curr_level=childLevel;
			}
		}
		return curr_level;
	}
	return go(this,0);
};
Product.prototype.listChildren = function()
{
	if(this.children.length==0)
	{
		return null;
	}
	return this.children;
};



Node = Object.create(Product.prototype);
Node = new Product(0,null,0,0,[]);
Node.addChild1(0,new Product("огурец",0,0,[]));
Node.addChild1(0,new Product("помидорЪ",0,0,[]));
Node.addChild1(0,new Product("гранатЪ",0,0,[]));
Node.addChild1(0,new Product("автоматЪ",0,0,[]));
Node.addChild1(0,new Product("пулеметЪ",0,0,[]));
Node.addChild1(0,new Product("...Чай)",0,0,[]));
Node.addChild(Node.children[0],new Product("огурец дальневосточный",0,0,[]));
Node.addChild(Node.children[1],new Product("помидорЪ ближневосточный",0,0,[]));
Node.addChild(Node.children[2],new Product("Граната Ф-1",0,0,[]));
Node.addChild(Node.children[0].children[0],new Product("огурец очень вкусный верхний",0,0,[]));
Node.addChild(Node.children[2].children[0],new Product("Граната Ф-2",0,0,[]));
Node.addChild(Node.children[1].children[0],new Product("помидорЪ ближневосточный1",0,0,[]));
Node.addChild(Node.children[1].children[0].children[0],new Product("помидорЪ ближневосточный2",0,0,[]));
Node.addChild(Node.children[1].children[0].children[0].children[0],new Product("помидорЪ ближневосточный3",0,0,[]));

Node.addChild(Node.children[3],new Product("АК-12",80000,0,["http://rostec.ru/img/interactives/4515998/img_ak.png"]));
Node.addChild(Node.children[4],new Product("ПКП Печенег",80000,0,["http://mensby.com/images/stories/articles/2015/5581/upgraded-machinegun-pecheneg-sp-01.jpg"]));
Node.addChild(Node.children[2].children[0].children[0],new Product("Граната Ф-3",0,0,["https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/F1_grenade_travmatik_com_02_by-sa.jpg/250px-F1_grenade_travmatik_com_02_by-sa.jpg"]));
//console.log(Node.maxLevel());
var glass = "аоуыэяёюие";
var soglass = "йцкнгшщзхъфвпрлджчсмтьб";
var alphabet = "абвгдеёжзиклмнопрстуфхцчшщъыьэюя";
var cifr = "1234567890";
var tea = "чай";
var addOn = "c добавлением";
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for(var i=0;i<200;i++)
{
	var s1st = soglass.charAt(getRandomInt(0,soglass.length-1));
	var s2st = glass.charAt(getRandomInt(0,glass.length-1));
	var s3st = "";
	var N = getRandomInt(0, 10);
	for(var j = 0;j<N;j++)
	{
		s3st+=alphabet.charAt(getRandomInt(0,alphabet.length-1));
	}
	if(getRandomInt(0, 1)==1)
	{
		var s4st = "";
		for(var j = 0;j<N;j++)
		{
			s4st+=alphabet.charAt(getRandomInt(0,alphabet.length-1));
		}
		var title=tea+" "+s1st+s2st+s3st+" "+addOn+" "+s4st+s3st+s2st+"ы";
	}
	else
	{
		var s5st = "";
		for(var j = 0;j<N;j++)
		{
			s5st+=alphabet.charAt(getRandomInt(0,alphabet.length-1));
		}
		var title=tea+" "+s1st+s2st+s3st;
	}
	var images = [
		"http://s017.radikal.ru/i443/1510/bf/0c0f26da0574.jpg",
		"http://s017.radikal.ru/i416/1510/81/3deca69a1630.jpg",
		"http://s017.radikal.ru/i402/1510/cb/c98f4fdb1e0a.jpg",
		"http://s017.radikal.ru/i427/1510/90/9130d4cbe465.jpg",
		"http://s017.radikal.ru/i414/1510/16/adbb550264d8.jpg",
		"http://s004.radikal.ru/i206/1510/36/825dbe1aacb7.jpg",
		"http://i068.radikal.ru/1510/f8/b3e82cd21a08.jpg",
		"http://s017.radikal.ru/i431/1510/9c/1c3a3ffeaea2.jpg",
		"http://s020.radikal.ru/i716/1510/b5/2efd85dfecb8.jpg",
		"http://s020.radikal.ru/i723/1510/f6/111f18c7b7be.jpg"
	];
	var main_photo_id = getRandomInt(1,9);
	Node.addChild1(6,new Product(title.toUpperCase(),200,200,[
		images[main_photo_id],
		"http://s017.radikal.ru/i416/1510/81/3deca69a1630.jpg",
		"http://s017.radikal.ru/i402/1510/cb/c98f4fdb1e0a.jpg",
		"http://s017.radikal.ru/i427/1510/90/9130d4cbe465.jpg",
		"http://s017.radikal.ru/i414/1510/16/adbb550264d8.jpg",
		"http://s004.radikal.ru/i206/1510/36/825dbe1aacb7.jpg",
		"http://i068.radikal.ru/1510/f8/b3e82cd21a08.jpg",
		"http://s017.radikal.ru/i431/1510/9c/1c3a3ffeaea2.jpg",
		"http://s020.radikal.ru/i716/1510/b5/2efd85dfecb8.jpg",
		"http://s020.radikal.ru/i723/1510/f6/111f18c7b7be.jpg"
	]));
}
//Node.addChild1(2,new Product("помидорЪ дальневосточный",200,200,["http:\\3.com","http:\\4.com"]));
//Node.addChild1(1,new Product("огурец ближневосточный",250,250,["http:\\1.com","http:\\2.com"]));
/* Node.addChild1(1,new Product(3,"огурец ближневосточный",250,250,["http:\\1.com","http:\\2.com"]));
Node.addChild1(2,new Product(4,"помидорЪ дальневосточный",200,200,["http:\\3.com","http:\\4.com"]));
console.log(Node.searchNode(4,Node));
Node.addChild1(4,new Product(5,"помидорЪ дальневосточный специальный",200,200,["http:\\3.com","http:\\4.com"]));
Node.addChild1(5,new Product(5,"помидорЪ дальневосточный специальный очень вкусный!",200,200,["http:\\3.com","http:\\4.com"]));
Product.prototype.listCat=function(cat_id){};

console.log(Node.level);
Node.level.value="<";
console.log(Node.level);
Product.prototype.listAllTree = function()
{
	
}; */
//function init()

////конструктор хтмл-документа для товаров
function TeaShopCatalogCreator(_content)
{
	this.content=_content;
	this.imagesURI = 
	[
		"http://s017.radikal.ru/i443/1510/bf/0c0f26da0574.jpg",
		"http://s017.radikal.ru/i416/1510/81/3deca69a1630.jpg",
		"http://s017.radikal.ru/i402/1510/cb/c98f4fdb1e0a.jpg",
		"http://s017.radikal.ru/i427/1510/90/9130d4cbe465.jpg",
		"http://s017.radikal.ru/i414/1510/16/adbb550264d8.jpg",
		"http://s004.radikal.ru/i206/1510/36/825dbe1aacb7.jpg",
		"http://i068.radikal.ru/1510/f8/b3e82cd21a08.jpg",
		"http://s017.radikal.ru/i431/1510/9c/1c3a3ffeaea2.jpg",
		"http://s020.radikal.ru/i716/1510/b5/2efd85dfecb8.jpg",
		"http://s020.radikal.ru/i723/1510/f6/111f18c7b7be.jpg"
	];
}
TeaShopCatalogCreator.prototype.createCategoryBar = function (level,color)
{
	//функция создания div'a уровня
	function createLevelDiv(_level_)
	{
		var leveldiv = document.createElement("div");
		leveldiv.className = "levelTitle";
		leveldiv.innerText = "LEVEL"+_level_;
		leveldiv.setAttribute("category-level",_level_);
		leveldiv.style.border = "2px dashed blue"
		//leveldiv.innerText+="__________class: "+leveldiv.className;
		
		var littlediv = document.createElement("div");
		littlediv.style.border="1px dashed blue";
		littlediv.style.fontSize="10pt";
		littlediv.innerText = "____class: <"+leveldiv.className+">";
		leveldiv.appendChild(littlediv);
		
		
		
		return leveldiv;
	};
	//функция создания div'а Категории
	function createCategoryDiv(_level_)
	{
		var newCatDiv = document.createElement("div");
		newCatDiv.className = "category_container";
		newCatDiv.setAttribute("category-level",_level_);
		//newCatDiv.innerText = _Node_.children[chi].name;
		//newCatDiv.innerText="class: "+newCatDiv.className;
		var littlediv = document.createElement("div");
		littlediv.style.border="1px dashed blue";
		littlediv.style.fontSize="10pt";
		littlediv.style.color="black";
		littlediv.innerText = "____class: <"+newCatDiv.className+">";
		newCatDiv.appendChild(littlediv);
		
		
		return newCatDiv;
	};
	//функция создания div'a Элемента категории(уже из каталога)
	function createCategoryChildDiv(_Node_,_chi_,_level_)
	{
		var newCatDiv = document.createElement("div");
		newCatDiv.className = "category_container_child";
		newCatDiv.setAttribute("category-level",_level_);
		newCatDiv.innerText = _Node_.children[_chi_].name;
		var littlediv = document.createElement("div");
		littlediv.style.border="2px double black";
		littlediv.style.fontSize="8pt";
		littlediv.innerText = "____class: <"+newCatDiv.className+">";
		newCatDiv.appendChild(littlediv);
		return newCatDiv;
	}
	var CATEGORY = createCategoryDiv(level);
	for(var i=0;i<this.content.node.children.length;i++)
	{
		var CHILD = createCategoryChildDiv(this.content.node,i,level);
		CATEGORY.appendChild(CHILD);
	}
	var LEVEL = createLevelDiv(level);
	var CategoryContainer = document.createElement("div");
	CategoryContainer.className="category";
	CategoryContainer.innerHTML="innerHTML";
	CategoryContainer.innerText = "class: "+CategoryContainer.className;
	
	CategoryContainer.appendChild(LEVEL);
	CategoryContainer.appendChild(CATEGORY);
	var CATEGORY = createCategoryDiv(level+1);
	for(var i=0;i<this.content.node.children[0].children.length;i++)
	{
		var CHILD = createCategoryChildDiv(this.content.node.children[0],i,level+1);
		CATEGORY.appendChild(CHILD);
	}
	var LEVEL = createLevelDiv(level+1);
	CategoryContainer.appendChild(LEVEL);
	CategoryContainer.appendChild(CATEGORY);
	var CATEGORY = createCategoryDiv(level+2);
	for(var i=0;i<this.content.node.children[0].children[0].children.length;i++)
	{
		var CHILD = createCategoryChildDiv(this.content.node.children[0].children[0],i,level+2);
		CATEGORY.appendChild(CHILD);
	}
	var LEVEL = createLevelDiv(level+2);
	CategoryContainer.appendChild(LEVEL);
	CategoryContainer.appendChild(CATEGORY);
	/* var leveldiv = document.createElement("div");
	leveldiv.className = "levelTitle";
	leveldiv.innerText="Уровень № "+ level;
	document.body.appendChild(leveldiv);
	var CategoryContainer = document.createElement("div");
	CategoryContainer.className="productcontent_container";
	CategoryContainer.innerHTML="innerHTML";
	CategoryContainer.innerText = "innerText";
	CategoryContainer.style.backgroundColor=color;
	//document.body.inser
	 */
	 
	 var littlediv = document.createElement("div");
		littlediv.style.border="2px dotted green";
		littlediv.style.fontSize="8pt";
		littlediv.innerText = "____class: <"+CategoryContainer.className+">";
		CategoryContainer.appendChild(littlediv);
	document.body.appendChild(CategoryContainer);
	
	
	//this.content.Node
};
////вывести товар по умолчанию(первая категория везде)
TeaShopCatalogCreator.prototype.drawFirstLevel = function()
{
	if(this.content.node.listChildren()!=null)
	{
		
		//1-создаем див с категорией
		var leveldiv = document.createElement("div");
		leveldiv.className = "levelTitle";
		leveldiv.innerText = "LEVEL1";
		leveldiv.setAttribute("category-level",1);
		//leveldiv.addEventListener("click",function(){console.log("Щёлк!")});
		document.body.appendChild(leveldiv);
		var firstLevelDiv = document.createElement("div");
		firstLevelDiv.className = "category_container";
		firstLevelDiv.setAttribute("category-level",1);
		var categories_List_Div = document.createElement("div");
		
		categories_List_Div.className = "category";
		categories_List_Div.innerText = "categoryListDiv";
		categories_List_Div.appendChild(firstLevelDiv);
		document.body.appendChild(categories_List_Div);
		for(var i=0;i<this.content.node.children.length;i++)
		{
			var ChildDiv = document.createElement("div");
			ChildDiv.className = "category_container_child";
			ChildDiv.innerText = this.content.node.children[i].name;
			ChildDiv.setAttribute("product-id",this.content.node.children[i].Id);
			ChildDiv.setAttribute("category-level",this.content.node.children[i].level);
			//console.log(ChildDiv.getAttribute("category-level"));
			var this_ref=this;
			ChildDiv.addEventListener("click",function(event)
			{
				event.stopPropagation();
				console.log("this_ref.content.node.children[i].Id:"+this_ref.content.node.children[i].Id)
				this_ref.listLevel(this_ref.content.node.children[i].Id,this_ref.content.node.children[i].level+1);
			});
			firstLevelDiv.appendChild(ChildDiv);
		}
	}
}
////
TeaShopCatalogCreator.prototype.listLevel = function (parent_id,level)
{
	//level-текущий уровень!!!
	//родитель
	Nd = this.content.node.searchNode(parent_id,this.content.node,0);
	var Node = Nd.element;
	if(Node==null)
	{
		return null;
	}
	//очищаем от мусора все, что не относится к текущему уровню отображения: последующие уровни и все товары, принадлежащие к этому уровню
	this.clearProductList();
	for(var cur_level=level+1;cur_level<=this.content.node.maxLevel;cur_level++)
	{
		this.clearCategoryList(cur_level);
	}
	//рисуем детей
	var fl_one_has_children=false;
	for(var chi=0;chi<Node.children.length;chi++)
	{
		//
		if(Node.children[chi].children.length!=0)
		{
			
			fl_one_has_children=true;
		}
	}
	/* //функция создания div'a уровня
	function createLevelDiv(_level_)
	{
		var leveldiv = document.createElement("div");
		leveldiv.className = "levelTitle";
		leveldiv.innerText = "LEVEL"+_level_;
		leveldiv.setAttribute("category-level",_level_);
		return leveldiv;
	};
	//функция создания div'а Категории
	function createCategoryDiv(_level_)
	{
		var newCatDiv = document.createElement("div");
		newCatDiv.className = "category_container";
		newCatDiv.setAttribute("category-level",_level_);
		//newCatDiv.innerText = _Node_.children[chi].name;
		return newCatDiv;
	};
	//функция создания div'a Элемента категории(уже из каталога)
	function createCategoryChildDiv(_Node_,_chi_,_level_)
	{
		var newCatDiv = document.createElement("div");
		newCatDiv.className = "category_container_child";
		newCatDiv.setAttribute("category-level",_level_);
		newCatDiv.setAttribute("product-id",_Node_.children[_chi_].Id);
		//console.log("catDiv: "+newCatDiv.getAttribute("product-id"));
		newCatDiv.innerText = _Node_.children[_chi_].name;
		return newCatDiv;
	}
	//функция создания div'а-карточки товара конечного продукта
	function createProductDiv(_Product_)
	{
		var newProductDiv=document.createElement("div");
		newProductDiv.className="good_container";
		//заполняем карточку продукта.
		//Название:
		var newProductNameDiv=document.createElement("div");
		newProductNameDiv.className = "good_name";
		newProductNameDiv.innerText = _Product_.name;
		newProductDiv.appendChild(newProductNameDiv);
		//Основное фото
		var newProductPhotoDiv = document.createElement("img");
		newProductPhotoDiv.className = "good_mainphoto";
		newProductPhotoDiv.src = _Product_.images_urls[0];
		newProductDiv.appendChild(newProductPhotoDiv);
		//Цена:
		var newProductPriceDiv = document.createElement("div");
		newProductPriceDiv.className = "good_price";
		newProductPriceDiv.innerText = _Product_.price;
		newProductDiv.appendChild(newProductPriceDiv);
		//leastDiv для кнопок +,- и инпута.
		var newProductLeastDiv = document.createElement("div");
		newProductLeastDiv.className = "leastDiv";
		//Кнопка -
		var newProductMinusBtnDiv = document.createElement("div");
		newProductMinusBtnDiv.className = "minusBtn";
		newProductLeastDiv.appendChild(newProductMinusBtnDiv);
		//Инпут
		var newProductInput = document.createElement("input");
		newProductInput.value=1;
		newProductInput.className="inputQuantity";
		newProductLeastDiv.appendChild(newProductInput);
		//Кнопка +
		var newProductPlusBtnDiv = document.createElement("div");
		newProductPlusBtnDiv.className = "plusBtn";
		newProductLeastDiv.appendChild(newProductPlusBtnDiv);
		//присоединяем leastDiv к карточке
		newProductDiv.appendChild(newProductLeastDiv);
		//кнопка "Купить"
		var newProductBuyBtn = document.createElement("div");
		newProductBuyBtn.className="buttonBuy";
		newProductBuyBtn.innerText = "Купить";
		//
		//
		//newProductBuyBtn.addEventListener("click") - сюда!!!
		//
		//
		newProductDiv.appendChild(newProductBuyBtn);	
		//возвращаем карточку товара
		return newProductDiv;
	} */
	//если хотя бы у одного дочернего элемента дочернего элемента 
	if(fl_one_has_children!=false)
	{
		//создаем для узла название
		var LEVEL = createLevelDiv(level);
		var CATEGORY = createCategoryDiv(level);
		//var CATEGORY_CHILD = createCategoryChildDiv( 
		var categories_List_Div = document.getElementsByClassName("category");
		categories_List_Div[0].appendChild(LEVEL);
		categories_List_Div[0].appendChild(CATEGORY);
		//создаем узел
		for(var chi=0;chi<Node.children.length;chi++)
		{
			//
			//console.log(Node.children[chi].children.length);
			if(Node.children[chi].children.length!=0)
			{
				//создаем div для дочернего элемента
				var CHILD = createCategoryChildDiv(Node,chi,level);
				CHILD.addEventListener("click",this.listLevel(Node.children[chi].Id,Node.children[chi].level+1));
				CATEGORY.appendChild(CHILD);
			}
			else
			{
				//если нет дочерних элементов, то помещаем на список продуктов
				var PRODUCT = createProductDiv(Node.children[chi]);
				var allproducts = document.getElementsByClassName("content_container");
				allproducts.appendChild(PRODUCT);
			}
		}
		//document.appendChild(leveldiv);
	}
	else
	{
		//Если никого у чилдренов нет, то выводим на карточки весь товар в категории
		for(var hi=0;hi<Node.children.length;hi++)
		{
			//если нет дочерних элементов, то помещаем на список продуктов
			var PRODUCT = createProductDiv(Node.children[hi]);
			var all = document.getElementsByClassName("content_container");
			all[0].appendChild(PRODUCT);
		}
	}
	
}
//очистить список товаров.
TeaShopCatalogCreator.prototype.clearProductList = function()
{
	var contentToRemove = document.getElementsByClassName("content_container");
	if(contentToRemove.length!=0)
	{
		for(var i=0;i<contentToRemove.length;i++)
		{
			while(contentToRemove[i].childNodes.length!=0)
			{
				contentToRemove[i].childNodes[0].remove();
			}
		}
	}
}
//очистить список категорий заданного уровня
TeaShopCatalogCreator.prototype.clearCategoryList = function(atLevel)
{
	//смотрим нужный уровень...
	var TitleList = document.getElementsByClassName("levelTitle");
	var categories = document.getElementsByClassName("category_container");
	if(TitleList.length!=0)
	{
		for(var i=TitleList.length-1;i>=0;i--)
		{
			if(TitleList[i].getAttribute("category-level")==atLevel)
			{
				//удаляем элемент
				TitleList[i].remove();
			}
		}
	}
	if(categories.length!=0)
	{
		for(var j=categories.length-1;j>=0;j--)
		{
			if(categories[j].getAttribute("category-level")==atLevel)
			{
				//удаляем
				categories[j].remove();
			}
		}
	}
}
/* TeaShopCatalogCreator.prototype.outputAllProducts()
{
	this.
} */


//функция создания div'a уровня
	TeaShopCatalogCreator.prototype.createLevelDiv = function(_level_,_parent_id_)
	{
		var leveldiv = document.createElement("div");
		leveldiv.className = "levelTitle";
		leveldiv.innerText = "LEVEL"+_level_;
		leveldiv.setAttribute("category-level",_level_);
		leveldiv.setAttribute("parent-id",_parent_id_);
		return leveldiv;
	};
	//функция создания div'а Категории
	TeaShopCatalogCreator.prototype.createCategoryDiv = function(_level_,_parent_id_)
	{
		var newCatDiv = document.createElement("div");
		newCatDiv.className = "category_container";
		newCatDiv.setAttribute("category-level",_level_);
		//newCatDiv.innerText = _Node_.children[chi].name;
		newCatDiv.setAttribute("parent-id",_parent_id_);
		return newCatDiv;
	};
	//функция создания div'a Элемента категории(уже из каталога)
	TeaShopCatalogCreator.prototype.createCategoryChildDiv = function(_Node_,_chi_,_level_)
	{
		var newCatDiv = document.createElement("div");
		newCatDiv.className = "category_container_child";
		newCatDiv.setAttribute("category-level",_level_);
		newCatDiv.setAttribute("product-id",_Node_.children[_chi_].Id);
		newCatDiv.setAttribute("parent-id",_Node_.Id);
		//console.log("catDiv: "+newCatDiv.getAttribute("product-id"));
		newCatDiv.innerText = _Node_.children[_chi_].name;
		return newCatDiv;
	};
	//функция создания div'а-карточки товара конечного продукта
	TeaShopCatalogCreator.prototype.createProductDiv = function(_Product_)
	{
		var newProductDiv=document.createElement("div");
		newProductDiv.className="good_container";
		//заполняем карточку продукта.
		//Название:
		var newProductNameDiv=document.createElement("div");
		newProductNameDiv.className = "good_name";
		newProductNameDiv.innerText = _Product_.name;
		newProductDiv.appendChild(newProductNameDiv);
		//Основное фото
		var newProductPhotoDiv = document.createElement("img");
		newProductPhotoDiv.className = "good_mainphoto";
		newProductPhotoDiv.src = _Product_.images_urls[0];
		newProductDiv.appendChild(newProductPhotoDiv);
		//Цена:
		var newProductPriceDiv = document.createElement("div");
		newProductPriceDiv.className = "good_price";
		newProductPriceDiv.innerText = _Product_.price;
		newProductDiv.appendChild(newProductPriceDiv);
		//leastDiv для кнопок +,- и инпута.
		var newProductLeastDiv = document.createElement("div");
		newProductLeastDiv.className = "leastDiv";
		//Кнопка -
		var newProductMinusBtnDiv = document.createElement("div");
		newProductMinusBtnDiv.className = "minusBtn";
		newProductLeastDiv.appendChild(newProductMinusBtnDiv);
		//Инпут
		var newProductInput = document.createElement("input");
		newProductInput.value=1;
		newProductInput.className="inputQuantity";
		newProductLeastDiv.appendChild(newProductInput);
		//Кнопка +
		var newProductPlusBtnDiv = document.createElement("div");
		newProductPlusBtnDiv.className = "plusBtn";
		newProductLeastDiv.appendChild(newProductPlusBtnDiv);
		//присоединяем leastDiv к карточке
		newProductDiv.appendChild(newProductLeastDiv);
		//кнопка "Купить"
		var newProductBuyBtn = document.createElement("div");
		newProductBuyBtn.className="buttonBuy";
		newProductBuyBtn.innerText = "Купить";
		//
		//
		//newProductBuyBtn.addEventListener("click") - сюда!!!
		//
		//
		newProductDiv.appendChild(newProductBuyBtn);	
		//возвращаем карточку товара
		return newProductDiv;
	}
////вывести все дерево
TeaShopCatalogCreator.prototype.outPutAllTree = function()
{
	var leveldiv = this.createLevelDiv(1,0);
	//document.body.appendChild(leveldiv);
	var firstLevelDiv = this.createCategoryDiv(1,0);
	var categories_List_Div = document.createElement("div");	
	categories_List_Div.className = "category";
	//categories_List_Div.innerText = "categoryListDiv";
	categories_List_Div.appendChild(leveldiv);
	categories_List_Div.appendChild(firstLevelDiv);
	//document.body.appendChild(categories_List_Div);
	//insert before contentcontainer!!!
	var contentContainer = document.getElementsByClassName("content_container");
	var td = document.getElementById("allproducts");
	td.insertBefore(categories_List_Div,contentContainer[0]);
	//в последующих шагах прикрепляем детей к firstLevelDiv'у
	for(var i=0;i<this.content.node.children.length;i++)
	{
		var ChildDiv = this.createCategoryChildDiv(this.content.node,i,1);
		firstLevelDiv.appendChild(ChildDiv);
		this.outputNextLevel(this.content.node.children[i].Id,this.content.node.children[i].level+1);
	}
	
}
////рекурсивная функция вывода следующего уровня
TeaShopCatalogCreator.prototype.outputNextLevel = function(parent_id,level)
{
	//level-текущий уровень!!!
	//родитель
	Nd = this.content.node.searchNode(parent_id,this.content.node,0);
	var Node = Nd.element;
	if(Node==null)
	{
		return null;
	}
	//рисуем детей
	var fl_one_has_children=false;
	for(var chi=0;chi<Node.children.length;chi++)
	{
		//
		if(Node.children[chi].children.length!=0)
		{
			
			fl_one_has_children=true;
		}
	}
	//если хотя бы у одного дочернего элемента дочернего элемента 
	if(fl_one_has_children!=false)
	{
		//создаем для узла название
		var LEVEL = this.createLevelDiv(level,Node.Id);
		var CATEGORY = this.createCategoryDiv(level,Node.Id);
		//var CATEGORY_CHILD = createCategoryChildDiv( 
		var categories_List_Div = document.getElementsByClassName("category");
		categories_List_Div[0].appendChild(LEVEL);
		categories_List_Div[0].appendChild(CATEGORY);
		//создаем узел
		for(var chi=0;chi<Node.children.length;chi++)
		{
			//
			//console.log(Node.children[chi].children.length);
			if(Node.children[chi].children.length!=0)
			{
				//создаем div для дочернего элемента
				var CHILD = this.createCategoryChildDiv(Node,chi,level);
				CATEGORY.appendChild(CHILD);
				this.outputNextLevel(Node.children[chi].Id,level+1);
			}
		}
	}
}
////сокрытие всех элементов массива
TeaShopCatalogCreator.prototype.displayNoneDivs = function(arrayOfDivs)
{
	for(var i=0;i<arrayOfDivs.length;i++)
	{
		arrayOfDivs[i].style.display="none";
	}
}
////сокрытие всех уровней больших level
TeaShopCatalogCreator.prototype.displayNoneNextLevels = function(level)
{
	var category_container_children = document.getElementsByClassName("category_container_child");
	var levelTitles = document.getElementsByClassName("levelTitle");
	var category_containers = document.getElementsByClassName("category_container");
	for(var i=0;i<category_container_children.length;i++)
	{
		if(category_container_children[i].getAttribute("category-level")>=level+1)
		{
			category_container_children[i].style.display="none";
		}
	}
	for(var i=0;i<levelTitles.length;i++)
	{
		if(levelTitles[i].getAttribute("category-level")>=level+1)
		{
			levelTitles[i].style.display="none";
		}
	}
	for(var i=0;i<category_containers.length;i++)
	{
		if(category_containers[i].getAttribute("category-level")>=level+1)
		{
			category_containers[i].style.display="none";
		}
	}
}
//отобразить детей на определенном уровне определенного предка(parent_id)
TeaShopCatalogCreator.prototype.displayOnLevel = function(level,parent_id)
{
	var levelTitles = document.getElementsByClassName("levelTitle");
	//контейнеры категории
	var category_containers = document.getElementsByClassName("category_container");
	//контейнеры детей
	var category_container_children = document.getElementsByClassName("category_container_child");
	if(level>1)
	{
		this.displayNoneNextLevels(level-1);
	}
	//отобразить только элементы с заданным уровнем и отеческим идентификаторомЪ
	this.displayInlineLevelBlocks(levelTitles,level,parent_id);
	this.displayInlineBlocks(category_containers,level,parent_id);
	this.displayInlineBlocks(category_container_children,level,parent_id);
	
	
	//удаление всех товаров, если были до нажатия на документе.
	this.clearProductList();
	var ParentNode = this.content.node.searchNode(parent_id,this.content.node,0).element;
	for(var j=0;j<ParentNode.children.length;j++)
	{
		if(ParentNode.children[j].children.length==0)
		{
			var PRODUCT = this.createProductDiv(ParentNode.children[j]);
			var allproducts = document.getElementsByClassName("content_container");
			allproducts[0].appendChild(PRODUCT); 
		}
	}
	//простановка обработчиков собитий!!!
	for(var i=0;i<category_container_children.length;i++)
	{
		//1- левел и пэрент айди должны соответствовать статусу))
		if((category_container_children[i].getAttribute("category-level")==level)&&(category_container_children[i].getAttribute("parent-id")==parent_id))
		{
			//на данном уровне смотрим, у кого из детей есть дети, т.е. внуковDDD
			var childProduct = this.content.node.searchNode(category_container_children[i].getAttribute("product-id"),this.content.node,0).element;
			//проверяем, есть ли у childProduct дети
			if (childProduct.children.length!=0)
			{
			//если есть дети, то регистрируем собитие нажатия этого потомка и отображения в категориях
				var this_ref = this;
				category_container_children[i].addEventListener("click",function(event)
				{
					event.stopPropagation(childProduct);
					this_ref.displayOnLevel(level+1,event.target.getAttribute("product-id"));
				});
				
			}
		}
	}

}
////
TeaShopCatalogCreator.prototype.displayInlineBlocks = function(tagsContainer,level,parent_id)
{
	for(var i=0;i<tagsContainer.length;i++)
	{
		if((tagsContainer[i].getAttribute("category-level")==level)&&(tagsContainer[i].getAttribute("parent-id")==parent_id))
		{
			tagsContainer[i].style.display="inline-block";
		}
	}
}
TeaShopCatalogCreator.prototype.displayInlineLevelBlocks = function(tagsContainer,level,parent_id)
{
	for(var i=0;i<tagsContainer.length;i++)
	{
		if((tagsContainer[i].getAttribute("category-level")==level)&&(tagsContainer[i].getAttribute("parent-id")==parent_id))
		{
			tagsContainer[i].style.display="block";
		}
	}
}
////регистрация событий
TeaShopCatalogCreator.prototype.RegisterEvents = function()
{
	//основной див со списком 
	var ListDivs = document.getElementsByClassName("category");
	//ищем элементы в списке
	var levelTitles = document.getElementsByClassName("levelTitle");
	//контейнеры категории
	var category_containers = document.getElementsByClassName("category_container");
	//контейнеры детей
	var category_container_children = document.getElementsByClassName("category_container_child");
	
	//убираем все элементы в инвиз
	this.displayNoneDivs(levelTitles);
	this.displayNoneDivs(category_container_children);
	this.displayNoneDivs(category_containers); 
	
	//отображаем конкретный уровень со своими тайтлами, принадлежащими к определенному уровню
	this.displayOnLevel(1,0);
	
}
//var content={node:Node};
//var tc = new TeaShopCatalogCreator(content);
//tc.createCategoryBar(1,"red");
