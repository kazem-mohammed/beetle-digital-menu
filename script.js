// Edit this object when the restaurant's contact details change.
const restaurantInfo = {
  name: 'Beetle Food & Drinks',
  phone: '',
  whatsapp: '+201276714400',
  address: '',
  googleMapsUrl: 'https://maps.app.goo.gl/7AFizAEicVpSNTio7?g_st=ac',
  googleMapsEmbedUrl: '',
  latitude: null,
  longitude: null,
  facebookUrl: 'https://www.facebook.com/share/1F5i3N1ctk/',
  instagramUrl: 'https://www.instagram.com/khaled_abo_hashesh?srtk=MTUwdWg5bnk3aWlxdQ==',
  websiteUrl: '',
  workingHours: ''
};
const developerInfo = {
  name: 'Kazem Salah', email: 'kazemsalah77@gmail.com', phone: '01115116456', whatsapp: '201115116456'
};

const menuData = [
  {id:'espresso',name:'Espresso',items:[{name:'Single Shot',price:'40'},{name:'Double Shot',price:'55'},{name:'Macchiato',price:'45'},{name:'Double Macchiato',price:'55'},{name:'Cappuccino',price:'60'},{name:'Latte',price:'65'},{name:'Flat White',price:'85'},{name:'Hot Mocha',price:'70'},{name:'White Mocha',price:'70'},{name:'Ice Latte',price:'70'},{name:'Ice Mocha',price:'80'},{name:'Spanish Latte',price:'85'},{name:'Affogato',price:'60'}]},
  {id:'frappe',name:'Frappe',items:[{name:'Latte Frappe',price:'90'},{name:'Mocha Frappe',price:'90'}]},
  {id:'signatures',name:"Beetle's Signatures",items:[{name:'Dark Cinnamon',price:'20',description:'sponge cinnamon chocolate'},{name:'White Red Velvet',price:'20',description:'sponge red velvet'},{name:'White or Chocolate Barquette',price:'20',description:'tart chocolate, nuts'},{name:'Snickers ball',price:'20'},{name:'Tiramisu ball',price:'20'},{name:'Tiramisu finger',price:'45'},{name:'Power Ball',price:'20',description:'0 sugar · oats, peanut butter,dark chocolate'},{name:'Healthy Bites',price:'20',description:'0 sugar · Date paste, dark chocolate, peanuts'},{name:'Choux Pastry',price:'45',description:'Eclair with creme pastry with touping from your choice'}]},
  {id:'dessert',name:'Dessert',items:[{name:'Chocolate Cake',price:'85'},{name:'Cheese Cake',price:'85'},{name:'Marple Cake',price:'85'},{name:'Molten Cake',price:'85'},{name:'Brownies',price:'85'},{name:'Donut',price:'45'},{name:'Cookies',price:'45'}]},
  {id:'juices',name:'Juices',items:[{name:'Mango - Guava',price:'60'},{name:'Lemon - Bannanna',price:'60'},{name:'Starwberry',price:'60'},{name:'Florida',price:'65'},{name:'Passion Mix',price:'70'},{name:'Seasonal Fruits',price:'65'}]},
  {id:'milkshake',name:'Milk Shake',items:[{name:'Vanille',price:'65'},{name:'Chocolate',price:'65'},{name:'Lotus',price:'75'},{name:'Strawberry',price:'70'},{name:'Lemon',price:'75'},{name:'oreo',price:'75'},{name:'Nutella',price:'100'},{name:'Pistachio',price:'120'}]},
  {id:'soft-drinks',name:'Soft Drinks',items:[{name:'Redbull',price:'70'},{name:'Shweipes',price:'35'},{name:'Cola-Sprite',price:'30'},{name:'Mineral Water',price:'10'}]},
  {id:'hot-drinks',name:'Hot Drinks',items:[{name:'Tea Or Tea Flavour',price:'30'},{name:'Turkish Coffee',price:'30 / 40',size:'S / D'},{name:'French Coffee',price:'35 / 45',size:'S / D'},{name:'Hazelnut Coffee',price:'35 / 45',size:'S / D'},{name:'Nescafe Black',price:'45'},{name:'Nescafe',price:'50'},{name:'Hot Lotus',price:'60'},{name:'Hot Chocolate',price:'60'},{name:'Apple Cider',price:'60'},{name:'Any Herbs',price:'30'},{name:'Mix Herbs',price:'50'}]},
  {id:'smoothies',name:'Smoothies',items:[{name:'Any flavor from your choice',price:'70'}]},
  {id:'sodas',name:'Sodas',items:[{name:'Any flavor from your choice',price:'65'}]},
  {id:'extras',name:'Extra',items:[{name:'Flavour',price:'20'},{name:'Sauce',price:'20'},{name:'Nuts',price:'20'},{name:'Hot Milk',price:'20'},{name:'Ice cream Ball',price:'25'},{name:'Extra Shot',price:'25'}]}
];

const nav=document.getElementById('category-nav'),content=document.getElementById('menu-content'),search=document.getElementById('menu-search'),clear=document.getElementById('clear-search'),meta=document.getElementById('results-meta');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const safeHttpUrl=value=>{try{const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:''}catch{return ''}};
const whatsappDigits=value=>(value||'').replace(/\D/g,'');
function renderNav(){nav.innerHTML=menuData.map((c,i)=>`<button type="button" class="${i===0?'active':''}" data-target="${c.id}">${c.name}</button>`).join('');nav.addEventListener('click',e=>{const b=e.target.closest('button[data-target]');if(!b)return;search.value='';clear.hidden=true;renderMenu('');document.getElementById(b.dataset.target)?.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});setActive(b.dataset.target)});}
function setActive(id){nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.target===id));}
function itemMatches(item,term){return `${item.name} ${item.description||''}`.toLocaleLowerCase().includes(term)}
function renderMenu(query=''){
 const term=query.trim().toLocaleLowerCase();
 const filtered=menuData.map(c=>({...c,items:c.name.toLocaleLowerCase().includes(term)?c.items:c.items.filter(i=>itemMatches(i,term))})).filter(c=>c.items.length);
 const count=filtered.reduce((n,c)=>n+c.items.length,0);meta.textContent=term?`${count} result${count===1?'':'s'} found`:'';
 if(!filtered.length){content.innerHTML='<div class="empty-state">لا توجد نتائج مطابقة</div>';return;}
 content.innerHTML=filtered.map((c,ci)=>`<section class="menu-category reveal" id="${c.id}" style="--delay:${Math.min(ci,5)*65}ms"><h3 class="category-title">${c.name}</h3>${c.items.map((item,ii)=>`<article class="menu-item" tabindex="0" role="button" data-category="${c.id}" data-item="${encodeURIComponent(item.name)}" aria-label="View ${item.name} details"><div class="item-copy"><div class="item-name">${item.name}</div>${item.description?`<div class="item-description">${item.description}</div>`:''}</div><div class="item-price">${item.price}<span class="price-size">${item.size||'L.E'}</span></div></article>`).join('')}</section>`).join('');
 observeReveals();
}
function showItem(categoryId,itemName){const category=menuData.find(c=>c.id===categoryId),item=category?.items.find(i=>i.name===itemName);if(!item)return;document.getElementById('dialog-category').textContent=category.name;document.getElementById('dialog-title').textContent=item.name;document.getElementById('dialog-description').textContent=item.description||' ';document.getElementById('dialog-price').textContent=`${item.price} L.E${item.size?` · ${item.size}`:''}`;document.getElementById('product-dialog').showModal();}
content.addEventListener('click',e=>{const item=e.target.closest('.menu-item');if(item)showItem(item.dataset.category,decodeURIComponent(item.dataset.item));});
content.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.menu-item')){e.preventDefault();showItem(e.target.dataset.category,decodeURIComponent(e.target.dataset.item));}});
document.querySelector('.dialog-close').addEventListener('click',()=>document.getElementById('product-dialog').close());
document.getElementById('product-dialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
search.addEventListener('input',()=>{clear.hidden=!search.value;renderMenu(search.value);if(search.value.trim())setActive('');});
clear.addEventListener('click',()=>{search.value='';clear.hidden=true;renderMenu('');search.focus();setActive(menuData[0].id);});
function buildSocialLinks(){const entries=[{name:'Instagram',url:restaurantInfo.instagramUrl,icon:'◎',sub:'Follow our moments'},{name:'Facebook',url:restaurantInfo.facebookUrl,icon:'f',sub:'Visit our page'},{name:'WhatsApp',url:whatsappDigits(restaurantInfo.whatsapp)?`https://wa.me/${whatsappDigits(restaurantInfo.whatsapp)}`:'',icon:'✆',sub:'Chat with us'},{name:'Website',url:restaurantInfo.websiteUrl,icon:'↗',sub:'Visit our website'}].filter(x=>safeHttpUrl(x.url));const markup=entries.map(x=>`<a class="social-card reveal" href="${safeHttpUrl(x.url)}" target="_blank" rel="noopener noreferrer"><span class="social-icon" aria-hidden="true">${x.icon}</span><span><strong>${x.name}</strong><small>${x.sub}</small></span></a>`).join('');document.getElementById('social-links').innerHTML=markup;document.getElementById('footer-social').innerHTML=entries.map(x=>`<a href="${safeHttpUrl(x.url)}" target="_blank" rel="noopener noreferrer">${x.name}</a>`).join('');}
function configureLocation(){const url=safeHttpUrl(restaurantInfo.googleMapsUrl);const panel=document.getElementById('location-panel');if(!url){panel.hidden=true;document.querySelector('.map-float').hidden=true;return;}document.getElementById('maps-link').href=url;}
function configureFloating(){const digits=whatsappDigits(restaurantInfo.whatsapp);const wa=document.getElementById('floating-whatsapp');if(!digits){wa.hidden=true;}else{wa.href=`https://wa.me/${digits}`;}}
function observeReveals(){const els=document.querySelectorAll('.reveal:not([data-observed])');if(!('IntersectionObserver'in window)||reducedMotion){els.forEach(e=>{e.classList.add('is-visible');e.dataset.observed='1'});return;}const io=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});els.forEach(e=>{e.dataset.observed='1';io.observe(e)});}
function enableTilt(){if(reducedMotion||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;content.addEventListener('pointermove',e=>{const card=e.target.closest('.menu-category');if(!card)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${(-y*2.3).toFixed(2)}deg) rotateY(${(x*2.8).toFixed(2)}deg) translateY(-2px)`;});content.addEventListener('pointerleave',e=>{const card=e.target.closest('.menu-category');if(card)card.style.transform='';},true);content.addEventListener('pointerout',e=>{const card=e.target.closest('.menu-category');if(card&&!card.contains(e.relatedTarget))card.style.transform='';});}
function configureScroll(){const top=document.getElementById('back-to-top');window.addEventListener('scroll',()=>{top.classList.toggle('visible',window.scrollY>550);if(!reducedMotion){const hero=document.querySelector('.hero-photo');if(hero&&window.scrollY<750)hero.style.transform=`translate3d(0,${window.scrollY*.12}px,0) scale(1.04)`;}},{passive:true});top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion?'auto':'smooth'}));}
renderNav();renderMenu();buildSocialLinks();configureLocation();configureFloating();configureScroll();enableTilt();observeReveals();
document.getElementById('year').textContent=new Date().getFullYear();
