
//конструктор класса Product
//name - название продукта 
//price - цена 
//quantity - количество на складе 
//images_urls - ссылки на изображения(например, с радикала), МАССИВ СТРОК!
//- массив тегов[{Name_of_tag:val1,Description:val2},{Name_of_tag:val1,Description:val2} ...]
function Product(/*id,parent_id,*/name,price,quantity,images_urls,tags_array,icon_url)
{
	this.Id = 0;
	//this.parentId=parent_id;
	this.name = name;
	this.price = price;
	this.quantity = quantity;
	this.images_urls=images_urls;
	this.children=[];
	this.level=0;
	//облако тегов...
	this.tagArray=tags_array;
	this.icon = icon_url;
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
Node.addChild1(0,new Product("огурец",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild1(0,new Product("помидорЪ",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild1(0,new Product("гранатЪ",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild1(0,new Product("автоматЪ",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild1(0,new Product("пулеметЪ",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild1(0,new Product("...Чай)",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild(Node.children[5],new Product("улун",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
Node.addChild(Node.children[5],new Product("пуэр",0,0,[],[],"https://cdn1.iconfinder.com/data/icons/hotel-and-restaurant-volume-1/48/005-256.png"));
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
var glass = "аоуыэя";
var soglass = "эыаоуя";
var alphabet = "абвгдеёжзиклмнопрстухцчш";
var cifr = "1234567890";
var tea = "чай";
var addOn = "c добавлением";
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


for(var i=0;i<10;i++)
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
		"https://im1-tub-ru.yandex.net/i?id=4ec6c8d95a8041676fa24a42071544c9&n=33&h=190&w=284",
		"https://www.colourbox.com/preview/1966840-black-tea-loose-dried-tea-leaves-marco.jpg",
		"http://tr.stockfresh.com/files/p/pzaxe/m/59/2034622_stock-photo-dry-black-tea-leaves.jpg",
		"http://s.pfst.net/2011.03/556653818609c3cda708f537d889f55c9f6d14c641_b.jpg",
		"https://im0-tub-ru.yandex.net/i?id=2a0ee548ef459a5033cfdbbacf989864&n=33&h=190&w=268",
		"http://s.pfst.net/2010.02/76685230279ddba891dba174ac2e77b0979132a11_b.jpg",
		"http://img.cliparto.com/pic/xl/192936/3292888-black-tea-leaves.jpg",
		"https://im2-tub-ru.yandex.net/i?id=961ef99a6fdfdb9117ac251484a6151f&n=33&h=190&w=284",
		"https://im2-tub-ru.yandex.net/i?id=c0a21c4bf9318de5c213cdbd9ad5153a&n=33&h=190&w=283",
		"https://im0-tub-ru.yandex.net/i?id=9d0c09f1cea7cdf148555e183c93130b&n=33&h=190&w=285"
	];
	var main_photo_id = getRandomInt(1,9);
	
	var tags = [{Name:"1",Description:"Улун"},
	{Name:"2",Description:"Улун"},
	{Name:"3",Description:"Улун"},
	{Name:"4",Description:"Улун"},
	{Name:"5",Description:"Семен Геннадьевич"},
	{Name:"6",Description:"Улун"},
	{Name:"7",Description:"Улун"},
	{Name:"8",Description:"Улун"},
	{Name:"9",Description:"Улун"},
	{Name:"10",Description:"Улун"}];
	var M = getRandomInt(1,5);
	var array1 = [];
	for(var k=0;k<M;k++)
	{
		var o=getRandomInt(0,9);
		array1.push(tags[o]);
		//console.log("aaa");
	}
	
	Node.addChild1(7,new Product(title.toUpperCase(),200,200,[
		images[main_photo_id],
			"https://im1-tub-ru.yandex.net/i?id=4ec6c8d95a8041676fa24a42071544c9&n=33&h=190&w=284",
		"https://www.colourbox.com/preview/1966840-black-tea-loose-dried-tea-leaves-marco.jpg",
		"http://tr.stockfresh.com/files/p/pzaxe/m/59/2034622_stock-photo-dry-black-tea-leaves.jpg",
		"http://s.pfst.net/2011.03/556653818609c3cda708f537d889f55c9f6d14c641_b.jpg",
		"https://im0-tub-ru.yandex.net/i?id=2a0ee548ef459a5033cfdbbacf989864&n=33&h=190&w=268",
		"http://s.pfst.net/2010.02/76685230279ddba891dba174ac2e77b0979132a11_b.jpg",
		"http://img.cliparto.com/pic/xl/192936/3292888-black-tea-leaves.jpg",
		"https://im2-tub-ru.yandex.net/i?id=961ef99a6fdfdb9117ac251484a6151f&n=33&h=190&w=284",
		"https://im2-tub-ru.yandex.net/i?id=c0a21c4bf9318de5c213cdbd9ad5153a&n=33&h=190&w=283",
		"https://im0-tub-ru.yandex.net/i?id=9d0c09f1cea7cdf148555e183c93130b&n=33&h=190&w=285"
	],array1));
}
for(var i=0;i<5;i++)
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
		"https://im1-tub-ru.yandex.net/i?id=4ec6c8d95a8041676fa24a42071544c9&n=33&h=190&w=284",
		"https://www.colourbox.com/preview/1966840-black-tea-loose-dried-tea-leaves-marco.jpg",
		"http://tr.stockfresh.com/files/p/pzaxe/m/59/2034622_stock-photo-dry-black-tea-leaves.jpg",
		"http://s.pfst.net/2011.03/556653818609c3cda708f537d889f55c9f6d14c641_b.jpg",
		"https://im0-tub-ru.yandex.net/i?id=2a0ee548ef459a5033cfdbbacf989864&n=33&h=190&w=268",
		"http://s.pfst.net/2010.02/76685230279ddba891dba174ac2e77b0979132a11_b.jpg",
		"http://img.cliparto.com/pic/xl/192936/3292888-black-tea-leaves.jpg",
		"https://im2-tub-ru.yandex.net/i?id=961ef99a6fdfdb9117ac251484a6151f&n=33&h=190&w=284",
		"https://im2-tub-ru.yandex.net/i?id=c0a21c4bf9318de5c213cdbd9ad5153a&n=33&h=190&w=283",
		"https://im0-tub-ru.yandex.net/i?id=9d0c09f1cea7cdf148555e183c93130b&n=33&h=190&w=285"
	];
	var main_photo_id = getRandomInt(1,9);
	
	var tags = [{Name:"1",Description:"Пуэр"},
	{Name:"2",Description:"Пуэр"},
	{Name:"3",Description:"Пуэр"},
	{Name:"4",Description:"Пуэр"},
	{Name:"5",Description:"Гурген Газенвагенович"},
	{Name:"6",Description:"Пуэр"},
	{Name:"7",Description:"Пуэр"},
	{Name:"8",Description:"Пуэр"},
	{Name:"9",Description:"Пуэр"},
	{Name:"10",Description:"Пуэр"}];
	var M = getRandomInt(1,5);
	var array1 = [];
	for(var k=0;k<M;k++)
	{
		var o=getRandomInt(0,9);
		array1.push(tags[o]);
		//console.log("aaa");
	}
	
	Node.addChild1(8,new Product(title.toUpperCase(),200,200,[
		images[main_photo_id],
			"https://im1-tub-ru.yandex.net/i?id=4ec6c8d95a8041676fa24a42071544c9&n=33&h=190&w=284",
		"https://www.colourbox.com/preview/1966840-black-tea-loose-dried-tea-leaves-marco.jpg",
		"http://tr.stockfresh.com/files/p/pzaxe/m/59/2034622_stock-photo-dry-black-tea-leaves.jpg",
		"http://s.pfst.net/2011.03/556653818609c3cda708f537d889f55c9f6d14c641_b.jpg",
		"https://im0-tub-ru.yandex.net/i?id=2a0ee548ef459a5033cfdbbacf989864&n=33&h=190&w=268",
		"http://s.pfst.net/2010.02/76685230279ddba891dba174ac2e77b0979132a11_b.jpg",
		"http://img.cliparto.com/pic/xl/192936/3292888-black-tea-leaves.jpg",
		"https://im2-tub-ru.yandex.net/i?id=961ef99a6fdfdb9117ac251484a6151f&n=33&h=190&w=284",
		"https://im2-tub-ru.yandex.net/i?id=c0a21c4bf9318de5c213cdbd9ad5153a&n=33&h=190&w=283",
		"https://im0-tub-ru.yandex.net/i?id=9d0c09f1cea7cdf148555e183c93130b&n=33&h=190&w=285"
	],array1));
	
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
		"https://im0-tub-ru.yandex.net/i?id=2a0ee548ef459a5033cfdbbacf989864&n=33&h=190&w=268",
		"http://tr.stockfresh.com/files/p/pzaxe/m/59/2034622_stock-photo-dry-black-tea-leaves.jpg",
		"https://www.colourbox.com/preview/1966840-black-tea-loose-dried-tea-leaves-marco.jpg",
		"http://us.123rf.com/450wm/glasscuter/glasscuter1205/glasscuter120500038/13671543-gr-ne-chinesischen-tee-textur.jpg",
		"http://st.depositphotos.com/1788556/1534/i/950/depositphotos_15344677-Seamless-texture-of-green-tea.jpg"
	];
}
TeaShopCatalogCreator.prototype.createCategoryBar = function (level,color)
{
	//функция создания div'a уровня
	function createLevelDiv(_level_)
	{
		var leveldiv = document.createElement("div");
		leveldiv.className = "levelTitle";

		leveldiv.setAttribute("category-level",_level_);

		//leveldiv.innerText+="__________class: "+leveldiv.className;
		
		var littlediv = document.createElement("div");


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
	CategoryContainer.id = 'CategoryTopContainer';
	
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
			//ChildDiv.innerText = this.content.node.children[i].name;
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
		//newCatDiv.style.display="inline-block";
		if(_Node_.children[_chi_].icon!=null)
		{
			var icon = document.createElement("img");
			icon.className = 'category_icon';
			icon.src=_Node_.children[_chi_].icon;
			//icon.style.width="32px";
			//icon.style.height = newCatDiv.style.height;
			//icon.style.position="absolute";
			//icon.style.top = "-3px";
			//icon.style.margin = "-35px";
			newCatDiv.appendChild(icon);
		}
		var newCat = document.createElement("div");
		//newCat.className = "category_container_child";
		//newCat.setAttribute("category-level",_level_);
		//newCat.setAttribute("product-id",_Node_.children[_chi_].Id);
		//newCat.setAttribute("parent-id",_Node_.Id);
		//console.log("catDiv: "+newCatDiv.getAttribute("product-id"));
		newCat.innerText = _Node_.children[_chi_].name;
		newCat.className = 'category_text_div';
		newCatDiv.appendChild(newCat);
		
		/* newCatDiv.className = "category_container_child";
		newCatDiv.setAttribute("category-level",_level_);
		newCatDiv.setAttribute("product-id",_Node_.children[_chi_].Id);
		newCatDiv.setAttribute("parent-id",_Node_.Id);
		//console.log("catDiv: "+newCatDiv.getAttribute("product-id"));
		newCatDiv.innerText = _Node_.children[_chi_].name; */
		/* if(_Node_.children[_chi_].icon!=null)
		{
			var icon = document.createElement("img");
			icon.src=_Node_.children[_chi_].icon;
			icon.style.width="32px";
			//icon.style.height = newCatDiv.style.height;
			icon.style.position="absolute";
			//icon.style.top = "-3px";
			//icon.style.margin = "-35px";
			newCatDiv.appendChild(icon);
		} */
		
		
		return newCatDiv;
	};
	//функция создания div'а-карточки товара конечного продукта
	TeaShopCatalogCreator.prototype.createProductDiv = function(_Product_)
	{
		//создание массива DOM-элементов-тегов продукта.
		function createTagCloud(classArray)
		{
			var CLArray=[];
			//cloudArray - массив в формате [{TagName:имя_тега,Description:описание_тега,Tag_className:имя_css-класса_тега},..]
			var curTOP;
			for(var l=0;l<_Product_.tagArray.length;l++)
			{
				var tag = document.createElement("div");
				var randomClassID = getRandomInt(0,classArray.length-1);
				tag.className = classArray[randomClassID];
				tag.innerText = _Product_.tagArray[l].Description;
				tag.style.position = "absolute";
				if(l==0)
				{
					tag.style.top=100+"px";
					curTOP = 100;
				}
				else
				{
					curTOP+=20;
					tag.style.top = curTOP+"px"; 
				}
				CLArray.push(tag);
			}
			return CLArray;
		}
		
			var newProductDiv=document.createElement("div");
		newProductDiv.className="good_container";
		
		//заполняем карточку продукта.
		//Название:
		var newProductNameDiv=document.createElement("div");
		newProductNameDiv.className = "good_name";
		newProductNameDiv.innerText = _Product_.name;
		//newProductDiv.appendChild(newProductNameDiv);
		//Основное фото
		var newProductPhotoDiv = document.createElement("img");
		newProductPhotoDiv.className = "good_mainphoto";
		newProductPhotoDiv.src = _Product_.images_urls[0];
		newProductDiv.appendChild(newProductPhotoDiv);
		
		
			// NEW NEW NEW ADD DIV WITH PARAMETERS
		var detailsDIV = document.createElement("div"); 
		detailsDIV.className="DetailsDiv";
		newProductDiv.appendChild(detailsDIV);	
		
		
		
		// NEW NEW NEW БЛОК С ОПИСАНИЕМ, ПОЯВЛЯЮЩИЙСЯ
		//var newProductDescriptionDiv = document.createElement("div");
	//	newProductDescriptionDiv.className = "good_description";
		//newProductDescriptionDiv.id = _Product_.name+'animid';
		//Цена:
		var newProductPriceDiv = document.createElement("div");
		newProductPriceDiv.className = "good_price";
		newProductPriceDiv.innerText = _Product_.price;
		
		
		
			var newProductBuyBtn = document.createElement("div");
		newProductBuyBtn.className="buybtn";
		newProductBuyBtn.innerText = "Купить/Подробнее";
		
		
		
		
		
		detailsDIV.appendChild(newProductPriceDiv);
		detailsDIV.appendChild(newProductNameDiv);
		detailsDIV.appendChild(newProductBuyBtn);
		
		newProductDiv.addEventListener("mouseenter",function(event)
                  {
                    //hidewidgetcontent();
                     //var animblock = document.getElementById(_Product_.name+'animid');
                     console.log('Yes!');
                    // var a = TweenLite.to(newProductDescriptionDiv, 0.2 ,{opacity:1,borderRadius:'0px'});
                    var a = TweenLite.to(detailsDIV, 0.2 ,{opacity:1,height:'253px',marginTop:'-255px',onComplete:showbuybutton});
                  });
                  
			newProductDiv.addEventListener("mouseleave",function(event)
                  {
                    //hidewidgetcontent();
                     //var animblock = document.getElementById(_Product_.name+'animid');
                     console.log('Yes!');
                     //var a = TweenLite.to(newProductDescriptionDiv, 0.2,{opacity:0,borderRadius:'999px'});
                     var a = TweenLite.to(detailsDIV, 0.2 ,{opacity:0.9,height:'73px', marginTop:'-77px',onComplete:hidebuybutton});
                  });
                  
                  
		//newProductDiv.appendChild(newProductDescriptionDiv);
	
		function showbuybutton()
		 {
		   var b = TweenLite.to(newProductBuyBtn, 0.2 ,{opacity:1});
		 }
		
	
		
		function hidebuybutton()
		 {
		   var b = TweenLite.to(newProductBuyBtn, 0.2 ,{opacity:0});
		 }
		
		
		//newProductDiv.appendChild(newProductPriceDiv);
		//leastDiv для кнопок +,- и инпута.
		//var newProductLeastDiv = document.createElement("div");
	//	newProductLeastDiv.className = "leastDiv";
		//Кнопка -
		//var newProductMinusBtnDiv = document.createElement("div");
		//newProductMinusBtnDiv.className = "minusBtn";
	//	newProductLeastDiv.appendChild(newProductMinusBtnDiv);
		//Инпут
	//	var newProductInput = document.createElement("input");
	//	newProductInput.value=1;
	//	newProductInput.className="inputQuantity";
	//	newProductLeastDiv.appendChild(newProductInput);
		//Кнопка +
	//	var newProductPlusBtnDiv = document.createElement("div");
	//	newProductPlusBtnDiv.className = "plusBtn";
	//	newProductLeastDiv.appendChild(newProductPlusBtnDiv);
		//присоединяем leastDiv к карточке
	//	newProductDiv.appendChild(newProductLeastDiv);
		//кнопка "Купить"
	
		//
		//
		//newProductBuyBtn.addEventListener("click") - сюда!!!
		//
		//
		//newProductDiv.appendChild(newProductBuyBtn);	
		if(_Product_.tagArray!=null)
		{
			var ArrayP = createTagCloud(["tagclouditem1","tagclouditem2","tagclouditem3","tagclouditem4","tagclouditem5"]);
			for(var p=0;p<ArrayP.length;p++)
			{
				//сдвигаем первый элемент
				detailsDIV.appendChild(ArrayP[p]);
			}
		}
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
/* 		if(this.content.node.children[i].icon!=null)
		{
			var icon = document.createElement("img");
			icon.src=this.content.node.children[i].icon;
			icon.style.width="32px";
			//icon.style.height = newCatDiv.style.height;
			icon.style.position="absolute";
			//icon.style.top = "-3px";
			//icon.style.margin = "-35px";
			firstLevelDiv.appendChild(icon);
		} */
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
				
				if(Node.children[chi].icon!=null)
				{
					var icon = document.createElement("img");
					icon.src=Node.children[chi].icon;
					icon.style.width="32px";
					//icon.style.height = newCatDiv.style.height;
					icon.style.position="absolute";
					//icon.style.top = "-3px";
					//icon.style.margin = "-35px";
					CATEGORY.appendChild(icon);
				}
				
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
//отобразить всех детей данного уровня(листьев-потомков)
TeaShopCatalogCreator.prototype.listAllChildren = function(Node,inputArray)
{
	/* if(Node.children.length==0)
	{
		//если детей нет, то добавляем текущий узел в конечные продукты
		var PRODUCT = this.createProductDiv(Node);
		return PRODUCT;
	}
	else
	{
		for(var i=0;i<Node.children.length;i++)
		{
			inputArray.push(this.listAllChildren(Node.children[i],inputArray));
		}
		return inputArray;
	} */
	if(Node.children.length==0)
	{
		//если детей нет, то добавляем текущий узел в конечные продукты
		var PRODUCT = this.createProductDiv(Node);
		inputArray.push(PRODUCT);
		return inputArray;
	}
	else
	{
		for(var i=0;i<Node.children.length;i++)
		{
			this.listAllChildren(Node.children[i],inputArray);
		}
		return inputArray;
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
	if(level>1)
	{
		var resultArray = this.listAllChildren(ParentNode,[]);
		var allproducts = document.getElementsByClassName("content_container");
		for(var t=0;t<resultArray.length;t++)
		{
			allproducts[0].appendChild(resultArray[t]);
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
					var TARGET;
					if(event.target.className!=category_container_children[0].className)
					{
						var cur = event.target.parentNode;
						while (cur.className!=category_container_children[0].className)
						{
							if(cur.parentNode==null)
							{
								throw new Error("Вышли за пределы документа!!!");
							}
							cur = cur.parentNode;
						}
						TARGET=cur;
					}
					else
					{
						TARGET=event.target;
					}
					this_ref.displayOnLevel(level+1,TARGET.getAttribute("product-id"));
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














