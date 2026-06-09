/* ================= BINUS LIBRARY — APP.JS ================= */

// ---------- DUMMY DATA ----------
const BOOKS = [
  {id:1,title:"Introduction to Algorithms",author:"Thomas H. Cormen",cat:"Technology",type:"Book",year:2022,isbn:"978-0262046305",lang:"English",format:"Hardcover",img:"book1.jpg",desc:"Buku referensi utama untuk struktur data dan algoritma dengan pendekatan komprehensif. Cocok untuk mahasiswa Computer Science.",rating:4.9,reviews:312,available:true},
  {id:2,title:"Clean Code",author:"Robert C. Martin",cat:"Technology",type:"Book",year:2021,isbn:"978-0132350884",lang:"English",format:"Paperback",img:"book2.jpg",desc:"Panduan menulis kode yang bersih, mudah dibaca dan dipelihara.",rating:4.8,reviews:240,available:true},
  {id:3,title:"Artificial Intelligence: A Modern Approach",author:"Stuart Russell",cat:"Technology",type:"Book",year:2023,isbn:"978-0134610993",lang:"English",format:"Hardcover",img:"book3.jpg",desc:"Buku standar untuk pembelajaran AI dari dasar hingga lanjut.",rating:4.7,reviews:198,available:false},

  {id:4,title:"Engineering Mechanics",author:"R.C. Hibbeler",cat:"Engineering",type:"Book",year:2020,isbn:"978-0134814964",lang:"English",format:"Hardcover",img:"book4.jpg",desc:"Konsep dasar mekanika teknik dengan banyak contoh soal.",rating:4.5,reviews:140,available:true},
  {id:5,title:"Calculus: Early Transcendentals",author:"James Stewart",cat:"Mathematics",type:"Book",year:2021,isbn:"978-1285741550",lang:"English",format:"Hardcover",img:"book5.jpg",desc:"Materi kalkulus lengkap untuk mahasiswa tahun pertama.",rating:4.6,reviews:175,available:true},
  {id:6,title:"Principles of Marketing",author:"Philip Kotler",cat:"Business",type:"Book",year:2022,isbn:"978-0134492513",lang:"English",format:"Paperback",img:"book6.jpg",desc:"Prinsip dasar pemasaran modern dengan studi kasus global.",rating:4.4,reviews:120,available:true},
  {id:7,title:"Design Patterns",author:"Erich Gamma",cat:"Technology",type:"Book",year:2019,isbn:"978-0201633610",lang:"English",format:"Hardcover",img:"book7.jpg",desc:"23 design patterns klasik dalam pengembangan software.",rating:4.8,reviews:289,available:true},
  {id:8,title:"Quantum Physics",author:"Stephen Gasiorowicz",cat:"Science",type:"Book",year:2020,isbn:"978-0471057000",lang:"English",format:"Hardcover",img:"book8.jpg",desc:"Pengantar mekanika kuantum untuk mahasiswa fisika.",rating:4.5,reviews:88,available:false},
  {id:9,title:"Journal of Computer Science Vol.45",author:"IEEE",cat:"Technology",type:"Journal",year:2024,isbn:"ISSN-1549-3636",lang:"English",format:"Journal",img:"book1.jpg",desc:"Jurnal terbaru tentang riset computer science.",rating:4.7,reviews:42,available:true},
  {id:10,title:"Database System Concepts",author:"Abraham Silberschatz",cat:"Technology",type:"Book",year:2022,isbn:"978-0078022159",lang:"English",format:"Paperback",img:"book2.jpg",desc:"Konsep sistem basis data secara lengkap.",rating:4.6,reviews:165,available:true},
  {id:11,title:"The Design of Everyday Things",author:"Don Norman",cat:"Design",type:"Book",year:2021,isbn:"978-0465050659",lang:"English",format:"Paperback",img:"book3.jpg",desc:"Buku wajib untuk UX/UI designer pemula maupun profesional.",rating:4.8,reviews:220,available:true},
  {id:12,title:"Linear Algebra Done Right",author:"Sheldon Axler",cat:"Mathematics",type:"Book",year:2023,isbn:"978-3319110790",lang:"English",format:"Hardcover",img:"book4.jpg",desc:"Pendekatan elegan terhadap aljabar linear.",rating:4.7,reviews:134,available:true}
];

const ROOMS = [
  {id:1,name:"Discussion Room A1",capacity:6,floor:"Floor 4",img:"room1.jpg",desc:"Ruang diskusi kecil dengan whiteboard."},
  {id:2,name:"Quiet Zone B2",capacity:2,floor:"Floor 3",img:"room2.jpg",desc:"Zona belajar individu yang tenang."},
  {id:3,name:"Group Study C1",capacity:10,floor:"Floor 5",img:"room3.jpg",desc:"Ruang kelompok dengan TV presentasi."},
  {id:4,name:"Innovation Lab",capacity:8,floor:"Floor 4",img:"room4.jpg",desc:"Ruang kolaborasi kreatif dengan layar interaktif."},
  {id:5,name:"Research Pod",capacity:4,floor:"Floor 6",img:"room1.jpg",desc:"Pod riset untuk skripsi/thesis."},
  {id:6,name:"Meeting Room D3",capacity:12,floor:"Floor 5",img:"room2.jpg",desc:"Ruang meeting besar dengan video conference."}
];

const FAQS = [
  {q:"Berapa lama saya bisa meminjam buku?",a:"Buku dapat dipinjam selama 14 hari. Bisa diperpanjang sekali jika tidak ada antrian."},
  {q:"Bagaimana cara memesan ruang belajar?",a:"Masuk ke menu Study Room, pilih ruangan, tanggal, dan slot waktu, lalu klik Book Room dan konfirmasi."},
  {q:"Apa yang terjadi jika saya terlambat mengembalikan buku?",a:"Denda Rp 5.000 per hari per buku akan diberlakukan. Pastikan mengembalikan tepat waktu."},
  {q:"Apakah saya bisa mengakses e-journals dari rumah?",a:"Ya, login dengan akun Binusian Anda untuk akses jarak jauh ke e-journals."},
  {q:"Bagaimana jika buku yang saya cari sedang dipinjam?",a:"Klik tombol Notify Me pada detail buku untuk mendapat notifikasi saat buku tersedia."},
  {q:"Berapa banyak buku yang bisa dipinjam sekaligus?",a:"Maksimal 5 buku per Binusian dalam satu waktu."}
];

// ---------- STATE ----------
const state = {
  user:null,            // {name,email,role}
  notifs:[],
  borrowed:[],          // array of book objects + due
  history:[],
  rooms:[],             // booked rooms
  currentBookId:null,
  selectedRoomId:null,
  catFilter:new Set(),
  typeFilter:"all",
  search:"",
  sort:"relevance",
  onboardStep:1
};

// ---------- HELPERS ----------
const $ = (s,p=document)=>p.querySelector(s);
const $$ = (s,p=document)=>Array.from(p.querySelectorAll(s));
const fmtDate = (d)=>d.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
const fmtTime = (d)=>d.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});

function toast(msg,type='success'){
  const t=$('#toast');t.className='toast '+type;t.textContent=msg;t.classList.remove('hidden');
  clearTimeout(window.__tt);window.__tt=setTimeout(()=>t.classList.add('hidden'),2600);
}

function showPage(name){
  $$('.page').forEach(p=>p.classList.remove('active'));
  const target=$('#page-'+name);
  if(target)target.classList.add('active');
  $$('.nav-link').forEach(a=>a.classList.toggle('active',a.dataset.page===name));
  window.scrollTo({top:0,behavior:'smooth'});
}

function addNotif(icon,text){
  state.notifs.unshift({icon,text,time:new Date()});
  renderNotifs();
}

function renderNotifs(){
  const list=$('#notifList');
  const badge=$('#bellBadge');
  badge.textContent=state.notifs.length;
  badge.classList.toggle('empty',state.notifs.length===0);
  if(!state.notifs.length){
    list.innerHTML='<div class="empty-state">Belum ada notifikasi</div>';return;
  }
  list.innerHTML=state.notifs.map(n=>`
    <li><i class="fa-solid ${n.icon}"></i><div><div class="nm">${n.text}</div><div class="tm">${fmtDate(n.time)} • ${fmtTime(n.time)}</div></div></li>
  `).join('');
}

// ---------- LOGIN ----------
let loginRole='binusian';
$$('.role-tab').forEach(t=>t.addEventListener('click',()=>{
  $$('.role-tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  loginRole=t.dataset.role;
}));

$('#toggleEye').addEventListener('click',()=>{
  const p=$('#loginPassword');
  p.type=p.type==='password'?'text':'password';
});

$('#loginForm').addEventListener('submit',e=>{
  e.preventDefault();
  const email=$('#loginEmail').value.trim().toLowerCase();
  const pw=$('#loginPassword').value;
  if(!pw){toast('Password wajib diisi','error');return;}

  if(email==='admin@binus.ac.id'){
    toast('Login admin berhasil, mengalihkan...','success');
    setTimeout(()=>{window.location.href='admindashboard.html';},800);
    return;
  }
  if(!email.endsWith('@binus.ac.id')){
    toast('Gunakan email @binus.ac.id','error');return;
  }
  if(loginRole==='admin'){
    toast('Akun ini bukan admin','error');return;
  }
  // Success binusian login
  const name=email.split('@')[0].replace(/\./g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  state.user={name,email,role:'Binusian'};
  $('#page-login').classList.remove('active');
  $('#app-shell').classList.remove('hidden');
  initApp();
});

// ---------- INIT APP ----------
function initApp(){
  // Greet
  $('#userGreet').textContent=state.user.name.split(' ')[0];
  $('#pfName').textContent=state.user.name;
  $('#pfEmail').textContent=state.user.email;
  $('#pfRole').textContent=state.user.role;

  // Default date
  $('#roomDate').value=new Date().toISOString().split('T')[0];

  renderNewArrivals();
  renderCatalog();
  renderRooms();
  renderFAQ();
  renderNotifs();
  showPage('home');

  // Onboarding only first time
  if(!localStorage.getItem('binusOnboarded')){
    setTimeout(()=>openOnboard(),300);
  }
  addNotif('fa-circle-info',`Selamat datang ${state.user.name}!`);
}

// ---------- NAVBAR ----------
$$('.nav-link, [data-page]').forEach(el=>{
  el.addEventListener('click',e=>{
    const p=el.dataset.page;if(!p)return;
    e.preventDefault();showPage(p);
    $('#notifDropdown').classList.add('hidden');
    $('#searchDropdown').classList.add('hidden');
  });
});

$('#bellBtn').addEventListener('click',e=>{
  e.stopPropagation();
  $('#notifDropdown').classList.toggle('hidden');
  $('#searchDropdown').classList.add('hidden');
});
$('#clearNotif').addEventListener('click',()=>{state.notifs=[];renderNotifs();});

$('#profileBtn').addEventListener('click',e=>{
  e.stopPropagation();
  showPage('profile');
  $('#notifDropdown').classList.add('hidden');
  $('#searchDropdown').classList.add('hidden');
});

document.addEventListener('click',e=>{
  if(!e.target.closest('#bellBtn')&&!e.target.closest('#notifDropdown'))$('#notifDropdown').classList.add('hidden');
  if(!e.target.closest('.nav-search')&&!e.target.closest('#searchDropdown'))$('#searchDropdown').classList.add('hidden');
});

// ---------- SEARCH (navbar live) ----------
$('#navSearchInput').addEventListener('input',e=>{
  const q=e.target.value.trim().toLowerCase();
  const drop=$('#searchDropdown');
  if(!q){drop.classList.add('hidden');return;}
  const found=BOOKS.filter(b=>b.title.toLowerCase().includes(q)||b.author.toLowerCase().includes(q)).slice(0,6);
  $('#searchResults').innerHTML=found.length?found.map(b=>`
    <li data-id="${b.id}"><i class="fa-solid fa-book"></i><div><div class="nm">${b.title}</div><div class="tm">${b.author} • ${b.cat}</div></div></li>
  `).join(''):'<div class="empty-state">Tidak ada hasil</div>';
  drop.classList.remove('hidden');
  $$('#searchResults li').forEach(li=>li.addEventListener('click',()=>{
    openBook(+li.dataset.id);drop.classList.add('hidden');$('#navSearchInput').value='';
  }));
});

$('#heroSearchBtn').addEventListener('click',()=>{
  const q=$('#heroSearch').value.trim();
  if(q){
    $('#advKeyword').value=q;
    state.search=q.toLowerCase();
    showPage('catalog');renderCatalog();
  }else{showPage('catalog');}
});

// ---------- HOME ----------
function renderNewArrivals(){
  const html=BOOKS.slice(0,6).map(b=>bookCardHTML(b)).join('');
  $('#newArrivals').innerHTML=html;
  $$('#newArrivals .book-card').forEach(c=>c.addEventListener('click',()=>openBook(+c.dataset.id)));
}
$('#ejournalCard').addEventListener('click',()=>toast('E-Journals akan tersedia segera!','success'));
$('#chatCard').addEventListener('click',()=>toast('Librarian Chat sedang offline, hubungi via Support.','error'));

// ---------- CATALOG ----------
function bookCardHTML(b){
  return `<div class="book-card" data-id="${b.id}">
    <img src="${b.img}" alt="${b.title}" onerror="this.style.background='#dbeafe';this.src='';" />
    <div class="info">
      <h4>${b.title}</h4>
      <div class="auth">${b.author}</div>
      <span class="status ${b.available?'available':'borrowed'}">${b.available?'AVAILABLE':'BORROWED'}</span>
    </div>
  </div>`;
}

function renderCatalog(){
  let list=[...BOOKS];
  if(state.search){
    list=list.filter(b=>b.title.toLowerCase().includes(state.search)||b.author.toLowerCase().includes(state.search));
  }
  if(state.catFilter.size){
    list=list.filter(b=>state.catFilter.has(b.cat));
  }
  if(state.typeFilter!=='all'){
    list=list.filter(b=>b.type===state.typeFilter);
  }
  const auth=$('#advAuthor').value.trim().toLowerCase();
  if(auth)list=list.filter(b=>b.author.toLowerCase().includes(auth));

  if(state.sort==='title')list.sort((a,b)=>a.title.localeCompare(b.title));
  else if(state.sort==='year')list.sort((a,b)=>b.year-a.year);

  $('#resultCount').textContent=list.length;
  $('#catalogGrid').innerHTML=list.length?list.map(bookCardHTML).join(''):'<div class="empty-shelf">Tidak ada hasil ditemukan</div>';
  $$('#catalogGrid .book-card').forEach(c=>c.addEventListener('click',()=>openBook(+c.dataset.id)));
}

$('#applyFilter').addEventListener('click',()=>{
  state.catFilter=new Set($$('.f-cat:checked').map(c=>c.value));
  state.typeFilter=$('input[name="ftype"]:checked').value;
  state.search=$('#advKeyword').value.trim().toLowerCase();
  renderCatalog();
});
$('#clearFilter').addEventListener('click',()=>{
  $$('.f-cat').forEach(c=>c.checked=false);
  $$('input[name="ftype"]').forEach((r,i)=>r.checked=i===0);
  $('#advKeyword').value='';$('#advAuthor').value='';
  state.catFilter=new Set();state.typeFilter='all';state.search='';
  renderCatalog();
});
$('#sortBy').addEventListener('change',e=>{state.sort=e.target.value;renderCatalog();});

// ---------- BOOK DETAIL ----------
function openBook(id){
  const b=BOOKS.find(x=>x.id===id);if(!b)return;
  state.currentBookId=id;
  $('#bdImg').src=b.img;$('#bdImg').alt=b.title;
  $('#bdTitle').textContent=b.title;$('#bcBook').textContent=b.title;
  $('#bdAuthor').textContent=b.author;
  $('#bdRating').textContent=b.rating;$('#bdReviews').textContent=b.reviews;
  $('#bdISBN').textContent=b.isbn;$('#bdFormat').textContent=b.format;
  $('#bdLang').textContent=b.lang;$('#bdYear').textContent=b.year;
  $('#bdDesc').textContent=b.desc;
  $('#branchBody').innerHTML=`
    <tr><td>Anggrek</td><td>${b.available?'<span class="status available">Available</span>':'<span class="status borrowed">Borrowed</span>'}</td><td>Floor 4 — Shelf ${b.cat[0]}3</td></tr>
    <tr><td>Kemanggisan</td><td><span class="status available">Available</span></td><td>Floor 3 — Shelf ${b.cat[0]}1</td></tr>
    <tr><td>Alam Sutera</td><td><span class="status borrowed">Borrowed</span></td><td>Floor 2 — Shelf ${b.cat[0]}2</td></tr>`;
  $('#borrowBtn').disabled=!b.available;
  $('#borrowBtn').innerHTML=b.available?'<i class="fa-solid fa-book"></i> Borrow Book':'<i class="fa-solid fa-clock"></i> Currently Borrowed';
  showPage('book');
}

$('#readOnlineBtn').addEventListener('click',()=>toast('Membuka pembaca digital...','success'));

$('#borrowBtn').addEventListener('click',()=>{
  const b=BOOKS.find(x=>x.id===state.currentBookId);if(!b||!b.available)return;
  // Open borrow confirm page
  $('#borrowImg').src=b.img;
  $('#borrowTitle').textContent=b.title;
  $('#borrowAuthor').textContent=b.author;
  const today=new Date();
  const due=new Date();due.setDate(today.getDate()+14);
  $('#borrowDate').textContent=fmtDate(today);
  $('#returnDate').textContent=fmtDate(due);
  $('#agreeBorrow').checked=false;
  $('#confirmBorrow').disabled=true;
  showPage('borrow');
});

$('#agreeBorrow').addEventListener('change',e=>{
  $('#confirmBorrow').disabled=!e.target.checked;
});
$('#cancelBorrow').addEventListener('click',()=>showPage('book'));

$('#confirmBorrow').addEventListener('click',()=>{
  openConfirm('Konfirmasi Peminjaman','Apakah detail peminjaman sudah sesuai? Buku akan masuk ke My Shelf Anda.',()=>{
    const b=BOOKS.find(x=>x.id===state.currentBookId);
    const due=new Date();due.setDate(due.getDate()+14);
    state.borrowed.push({...b,due});
    b.available=false;
    addNotif('fa-book','Berhasil meminjam: '+b.title);
    updateDash();
    openSuccess('Peminjaman Berhasil!',`"${b.title}" telah ditambahkan ke My Shelf Anda. Tanggal pengembalian: ${fmtDate(due)}.`);
    renderShelf();renderCatalog();renderNewArrivals();
  });
});

// ---------- STUDY ROOM ----------
function renderRooms(){
  $('#roomGrid').innerHTML=ROOMS.map(r=>`
    <div class="room-card" data-id="${r.id}">
      <img src="${r.img}" alt="${r.name}" onerror="this.style.background='#dbeafe';this.src='';" />
      <div class="info">
        <h3>${r.name}</h3>
        <div class="specs"><span><i class="fa-solid fa-users"></i>${r.capacity} orang</span><span><i class="fa-solid fa-layer-group"></i>${r.floor}</span></div>
        <p class="muted small" style="margin-bottom:8px">${r.desc}</p>
        <button class="btn-outline select-room-btn">Select Room</button>
      </div>
    </div>
  `).join('');
  $$('.room-card').forEach(c=>c.addEventListener('click',()=>{
    state.selectedRoomId=+c.dataset.id;
    $$('.room-card').forEach(x=>x.classList.remove('selected'));
    c.classList.add('selected');
    const r=ROOMS.find(x=>x.id===state.selectedRoomId);
    $('#selectedRoom').value=r.name;
  }));
}

$('#bookRoomBtn').addEventListener('click',()=>{
  if(!state.selectedRoomId){toast('Pilih ruangan terlebih dahulu','error');return;}
  if(!$('#roomDate').value){toast('Pilih tanggal','error');return;}
  const r=ROOMS.find(x=>x.id===state.selectedRoomId);
  const d=$('#roomDate').value;const slot=$('#roomSlot').value;
  openConfirm('Konfirmasi Reservasi Ruang',
    `Pastikan detail sudah sesuai:<br><br><strong>${r.name}</strong><br>Tanggal: ${d}<br>Slot: ${slot}`,
    ()=>{
      state.rooms.push({room:r.name,date:d,slot,status:'Confirmed'});
      addNotif('fa-door-open',`Reservasi ${r.name} dikonfirmasi (${d}, ${slot})`);
      toast('Reservasi berhasil!','success');
      updateDash();renderShelf();
      $('#selectedRoom').value='';state.selectedRoomId=null;
      $$('.room-card').forEach(x=>x.classList.remove('selected'));
    });
});

// ---------- MY SHELF ----------
$$('.tab').forEach(t=>t.addEventListener('click',()=>{
  $$('.tab').forEach(x=>x.classList.remove('active'));
  $$('.tab-panel').forEach(p=>p.classList.remove('active'));
  t.classList.add('active');
  $('#tab-'+t.dataset.tab).classList.add('active');
}));

function renderShelf(){
  $('#borrowedList').innerHTML=state.borrowed.length?state.borrowed.map(b=>`
    <div class="book-card">
      <img src="${b.img}" alt="${b.title}" onerror="this.style.background='#dbeafe';this.src='';" />
      <div class="info">
        <h4>${b.title}</h4>
        <div class="auth">${b.author}</div>
        <span class="status available">Due: ${fmtDate(b.due)}</span>
        <button class="btn-outline" style="margin-top:8px;width:100%;padding:6px;font-size:12px" data-return="${b.id}">Return</button>
      </div>
    </div>`).join(''):'<div class="empty-shelf">Belum ada buku yang dipinjam</div>';

  $$('[data-return]').forEach(btn=>btn.addEventListener('click',e=>{
    e.stopPropagation();
    const id=+btn.dataset.return;
    openConfirm('Kembalikan Buku','Apakah Anda yakin ingin mengembalikan buku ini?',()=>{
      const idx=state.borrowed.findIndex(x=>x.id===id);
      if(idx>-1){
        const b=state.borrowed[idx];
        state.history.push(b);state.borrowed.splice(idx,1);
        const orig=BOOKS.find(x=>x.id===id);if(orig)orig.available=true;
        addNotif('fa-check','Buku dikembalikan: '+b.title);
        renderShelf();updateDash();renderCatalog();renderNewArrivals();
        toast('Buku berhasil dikembalikan!','success');
      }
    });
  }));

  $('#historyList').innerHTML=state.history.length?state.history.map(b=>`
    <div class="book-card">
      <img src="${b.img}" alt="${b.title}" onerror="this.style.background='#dbeafe';this.src='';" />
      <div class="info"><h4>${b.title}</h4><div class="auth">${b.author}</div><span class="status borrowed">Returned</span></div>
    </div>`).join(''):'<div class="empty-shelf">Belum ada riwayat peminjaman</div>';

  $('#myRooms').innerHTML=state.rooms.length?state.rooms.map(r=>`
    <tr><td>${r.room}</td><td>${r.date}</td><td>${r.slot}</td><td><span class="status available">${r.status}</span></td><td><button class="link cancel-room" data-room="${r.room}">Cancel</button></td></tr>
  `).join(''):'<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--muted)">Belum ada reservasi</td></tr>';

  $$('.cancel-room').forEach(b=>b.addEventListener('click',()=>{
    openConfirm('Batalkan Reservasi','Yakin ingin membatalkan reservasi ini?',()=>{
      state.rooms=state.rooms.filter(x=>x.room!==b.dataset.room);
      renderShelf();updateDash();
      addNotif('fa-xmark','Reservasi dibatalkan');
      toast('Reservasi dibatalkan','success');
    });
  }));

  // Profile counters
  $('#pfBorrow').textContent=state.borrowed.length+state.history.length;
  $('#pfRooms').textContent=state.rooms.length;
}

function updateDash(){
  if(state.borrowed.length){
    const next=state.borrowed.reduce((a,b)=>a.due<b.due?a:b);
    $('#nextDue').textContent=fmtDate(next.due);
    $('#nextDueBook').textContent=next.title;
  }else{$('#nextDue').textContent='—';$('#nextDueBook').textContent='No active loans';}
  if(state.rooms.length){
    const r=state.rooms[state.rooms.length-1];
    $('#nextRoom').textContent=r.room;
    $('#nextRoomTime').textContent=r.date+' • '+r.slot;
  }else{$('#nextRoom').textContent='—';$('#nextRoomTime').textContent='No reservation';}
}

// ---------- SUPPORT ----------
$('#supportForm').addEventListener('submit',e=>{
  e.preventDefault();
  openConfirm('Kirim Pesan','Pastikan informasi sudah benar. Kirim pesan ke library support?',()=>{
    addNotif('fa-envelope','Pesan support terkirim, kami akan merespon dalam 1x24 jam');
    toast('Pesan berhasil dikirim!','success');
    e.target.reset();
  });
});

// ---------- FAQ ----------
function renderFAQ(){
  $('#faqList').innerHTML=FAQS.map(f=>`
    <div class="faq-item">
      <div class="faq-q">${f.q}<i class="fa-solid fa-chevron-down"></i></div>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');
  $$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));
}

// ---------- LOGOUT ----------
$('#logoutBtn').addEventListener('click',()=>{
  openConfirm('Logout','Yakin ingin keluar dari akun Anda?',()=>{
    state.user=null;state.borrowed=[];state.history=[];state.rooms=[];state.notifs=[];
    $('#app-shell').classList.add('hidden');
    $('#page-login').classList.add('active');
    $('#loginForm').reset();
    toast('Anda telah logout','success');
  });
});

// ---------- CONFIRM MODAL ----------
let _confirmCb=null;
function openConfirm(title,body,cb){
  $('#cmTitle').textContent=title;
  $('#cmBody').innerHTML=body;
  $('#confirmModal').classList.remove('hidden');
  _confirmCb=cb;
}
$('#cmCancel').addEventListener('click',()=>{$('#confirmModal').classList.add('hidden');_confirmCb=null;});
$('#cmOk').addEventListener('click',()=>{
  $('#confirmModal').classList.add('hidden');
  if(_confirmCb){const cb=_confirmCb;_confirmCb=null;cb();}
});

// ---------- SUCCESS MODAL ----------
function openSuccess(title,body){
  $('#smTitle').textContent=title;$('#smBody').textContent=body;
  $('#successModal').classList.remove('hidden');
}
$('#smBackCat').addEventListener('click',()=>{$('#successModal').classList.add('hidden');showPage('catalog');});
$('#smShelf').addEventListener('click',()=>{$('#successModal').classList.add('hidden');showPage('myshelf');});

// ---------- ONBOARDING ----------
function openOnboard(){
  state.onboardStep=1;
  $('#onboardModal').classList.remove('hidden');
  renderOnboard();
}
function renderOnboard(){
  $$('.onboard-step').forEach(s=>s.classList.toggle('active',+s.dataset.step===state.onboardStep));
  $('#onboardDots').innerHTML=[1,2,3,4,5].map(i=>`<span class="${i===state.onboardStep?'active':''}"></span>`).join('');
  $('#nextOnboard').textContent=state.onboardStep===5?'Mulai Jelajah':'Next';
}
$('#nextOnboard').addEventListener('click',()=>{
  if(state.onboardStep<5){state.onboardStep++;renderOnboard();}
  else{$('#onboardModal').classList.add('hidden');localStorage.setItem('binusOnboarded','1');toast('Selamat menjelajah BINUS Library!','success');}
});
$('#skipOnboard').addEventListener('click',()=>{
  $('#onboardModal').classList.add('hidden');localStorage.setItem('binusOnboarded','1');
});
