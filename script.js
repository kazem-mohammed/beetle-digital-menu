const menuData = [
  {id:'espresso',name:'Espresso',items:[
    {name:'Single Shot',price:'40'},{name:'Double Shot',price:'55'},{name:'Macchiato',price:'45'},{name:'Double Macchiato',price:'55'},{name:'Cappuccino',price:'60'},{name:'Latte',price:'65'},{name:'Flat White',price:'85'},{name:'Hot Mocha',price:'70'},{name:'White Mocha',price:'70'},{name:'Ice Latte',price:'70'},{name:'Ice Mocha',price:'80'},{name:'Spanish Latte',price:'85'},{name:'Affogato',price:'60'}]},
  {id:'frappe',name:'Frappe',items:[{name:'Latte Frappe',price:'90'},{name:'Mocha Frappe',price:'90'}]},
  {id:'signatures',name:"Beetle's Signatures",items:[
    {name:'Dark Cinnamon',price:'20',description:'sponge cinnamon chocolate'},{name:'White Red Velvet',price:'20',description:'sponge red velvet'},{name:'White or Chocolate Barquette',price:'20',description:'tart chocolate, nuts'},{name:'Snickers ball',price:'20'},{name:'Tiramisu ball',price:'20'},{name:'Tiramisu finger',price:'45'},{name:'Power Ball',price:'20',description:'0 sugar · oats, peanut butter,dark chocolate'},{name:'Healthy Bites',price:'20',description:'0 sugar · Date paste, dark chocolate, peanuts'},{name:'Choux Pastry',price:'45',description:'Eclair with creme pastry with touping from your choice'}]},
  {id:'dessert',name:'Dessert',items:[{name:'Chocolate Cake',price:'85'},{name:'Cheese Cake',price:'85'},{name:'Marple Cake',price:'85'},{name:'Molten Cake',price:'85'},{name:'Brownies',price:'85'},{name:'Donut',price:'45'},{name:'Cookies',price:'45'}]},
  {id:'juices',name:'Juices',items:[{name:'Mango - Guava',price:'60'},{name:'Lemon - Bannanna',price:'60'},{name:'Starwberry',price:'60'},{name:'Florida',price:'65'},{name:'Passion Mix',price:'70'},{name:'Seasonal Fruits',price:'65'}]},
  {id:'milkshake',name:'Milk Shake',items:[{name:'Vanille',price:'65'},{name:'Chocolate',price:'65'},{name:'Lotus',price:'75'},{name:'Strawberry',price:'70'},{name:'Lemon',price:'75'},{name:'oreo',price:'75'},{name:'Nutella',price:'100'},{name:'Pistachio',price:'120'}]},
  {id:'soft-drinks',name:'Soft Drinks',items:[{name:'Redbull',price:'70'},{name:'Shweipes',price:'35'},{name:'Cola-Sprite',price:'30'},{name:'Mineral Water',price:'10'}]},
  {id:'hot-drinks',name:'Hot Drinks',items:[{name:'Tea Or Tea Flavour',price:'30'},{name:'Turkish Coffee',price:'30 / 40',size:'S / D'},{name:'French Coffee',price:'35 / 45',size:'S / D'},{name:'Hazelnut Coffee',price:'35 / 45',size:'S / D'},{name:'Nescafe Black',price:'45'},{name:'Nescafe',price:'50'},{name:'Hot Lotus',price:'60'},{name:'Hot Chocolate',price:'60'},{name:'Apple Cider',price:'60'},{name:'Any Herbs',price:'30'},{name:'Mix Herbs',price:'50'}]},
  {id:'smoothies',name:'Smoothies',items:[{name:'Any flavor from your choice',price:'70'}]},
  {id:'sodas',name:'Sodas',items:[{name:'Any flavor from your choice',price:'65'}]},
  {id:'extras',name:'Extra',items:[{name:'Flavour',price:'20'},{name:'Sauce',price:'20'},{name:'Nuts',price:'20'},{name:'Hot Milk',price:'20'},{name:'Ice cream Ball',price:'25'},{name:'Extra Shot',price:'25'}]}
];

const nav = document.getElementById('category-nav');
const content = document.getElementById('menu-content');
const search = document.getElementById('menu-search');
const clear = document.getElementById('clear-search');
const meta = document.getElementById('results-meta');

function renderNav(){
  nav.innerHTML = menuData.map((category,index)=>`<button type="button" class="${index===0?'active':''}" data-target="${category.id}">${category.name}</button>`).join('');
  nav.addEventListener('click',event=>{
    const button=event.target.closest('button[data-target]');
    if(!button)return;
    search.value=''; clear.hidden=true; renderMenu('');
    document.getElementById(button.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'});
    setActive(button.dataset.target);
  });
}
function setActive(id){
  nav.querySelectorAll('button').forEach(button=>button.classList.toggle('active',button.dataset.target===id));
}
function itemMatches(item,term){
  return `${item.name} ${item.description||''}`.toLocaleLowerCase().includes(term);
}
function renderMenu(query=''){
  const term=query.trim().toLocaleLowerCase();
  const filtered=menuData.map(category=>({...category,items:category.name.toLocaleLowerCase().includes(term)?category.items:category.items.filter(item=>itemMatches(item,term))})).filter(category=>category.items.length);
  const count=filtered.reduce((total,category)=>total+category.items.length,0);
  meta.textContent=term?`${count} result${count===1?'':'s'} found`:'';
  if(!filtered.length){content.innerHTML='<div class="empty-state">لا توجد نتائج مطابقة</div>';return;}
  content.innerHTML=filtered.map(category=>`<section class="menu-category" id="${category.id}"><h3 class="category-title">${category.name}</h3>${category.items.map(item=>`<article class="menu-item"><div class="item-copy"><div class="item-name">${item.name}</div>${item.description?`<div class="item-description">${item.description}</div>`:''}</div><div class="item-price">${item.price}<span class="price-size">${item.size||'L.E'}</span></div></article>`).join('')}</section>`).join('');
}
search.addEventListener('input',()=>{clear.hidden=!search.value;renderMenu(search.value);if(search.value.trim())setActive('');});
clear.addEventListener('click',()=>{search.value='';clear.hidden=true;renderMenu('');search.focus();setActive(menuData[0].id);});
renderNav();renderMenu();
document.getElementById('year').textContent=new Date().getFullYear();
