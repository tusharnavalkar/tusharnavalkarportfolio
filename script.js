(function(){
'use strict';
var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};

/* Preloader */
window.addEventListener('load',function(){setTimeout(function(){$('#preloader').classList.add('gone')},900)});

/* Theme toggle (remembered if the browser allows) */
try{if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark')}catch(e){}
$('#theme').onclick=function(){
  document.body.classList.toggle('dark');
  try{localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light')}catch(e){}
};

/* Mobile menu */
var burger=$('#burger'),menu=$('#menu');
function closeMenu(){menu.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false')}
burger.onclick=function(){var o=menu.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o)};
$$('#menu a').forEach(function(a){a.onclick=closeMenu});

/* Header shadow on scroll */
window.addEventListener('scroll',function(){$('#header').classList.toggle('scrolled',window.scrollY>50)});

/* Typing effect */
var words=['TUSHAR NAVALKAR'],w=0,c=0,del=false,el=$('#typed');
(function type(){
  var t=words[w];c+=del?-1:1;el.textContent=t.slice(0,c);
  var d=del?50:100;
  if(!del&&c===t.length){del=true;d=1600}
  else if(del&&c===0){del=false;w=(w+1)%words.length;d=400}
  setTimeout(type,d);
})();

/* Scroll reveal + skill bars */
$$('.skill').forEach(function(s){s.querySelector('em').style.setProperty('--w',s.dataset.v+'%')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){e.target.classList.add('in');$$('.skill').forEach(function(s){if(e.target.contains(s))s.classList.add('in')})}
})},{threshold:.2});
$$('.reveal').forEach(function(r){io.observe(r)});

/* Active nav link */
var links=$$('#menu a');
var so=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id)})}
})},{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(function(s){so.observe(s)});

/* Project slider */
var track=$('.track'),n=track.children.length,i=0,timer,dots=$('#dots');
for(var k=0;k<n;k++){(function(k){var b=document.createElement('b');b.onclick=function(){go(k)};dots.appendChild(b)})(k)}
function go(x){i=(x+n)%n;track.style.transform='translateX(-'+i*100+'%)';
  [].forEach.call(dots.children,function(d,j){d.classList.toggle('on',j===i)});
  clearInterval(timer);timer=setInterval(function(){go(i+1)},4000)}
$('#next').onclick=function(){go(i+1)};$('#prev').onclick=function(){go(i-1)};
go(0);

/* Contact form: opens the user's mail app (no server needed) */
$('#form').onsubmit=function(ev){
  ev.preventDefault();
  var body='Name: '+$('#n').value+'\nEmail: '+$('#e').value+'\n\n'+$('#m').value;
  /* EDIT: put your real email below */
  location.href='mailto:yourname@example.com?subject='+encodeURIComponent('Portfolio message')+'&body='+encodeURIComponent(body);
  $('#note').textContent='Thank you! Your email app should open now.';
};

$('#yr').textContent=new Date().getFullYear();
})();
