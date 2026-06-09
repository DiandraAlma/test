/* ===== LANDING PAGE JS ===== */

const LP_BOOKS = [
  {title:"The Quantum Frontier",author:"Dr. Elizabeth Thorne",img:"book1.jpg",status:"Available"},
  {title:"Sustainable Urbanism",author:"Marcus V. Aris",img:"book2.jpg",status:"Reserved"},
  {title:"Echoes of the Silk Road",author:"Li Wei Chen",img:"book3.jpg",status:"Available"},
  {title:"Neural Networks",author:"Sarah J. Miller",img:"book4.jpg",status:"Available"},
  {title:"Modern Cryptography",author:"Alan R. Hayes",img:"book5.jpg",status:"Available"},
  {title:"Design Thinking 101",author:"Maya Lestari",img:"book6.jpg",status:"Reserved"},
  {title:"Climate & Economy",author:"Prof. Hiroshi Tan",img:"book7.jpg",status:"Available"},
  {title:"AI Ethics",author:"Diana K. Pratama",img:"book8.jpg",status:"Available"}
];

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ===== Render books =====
let lpOffset = 0;
function renderBooks(){
  const row = $('#lpBookRow');
  const visible = LP_BOOKS.slice(lpOffset, lpOffset + 4);
  row.innerHTML = visible.map(b => `
    <div class="lp-book-card">
      <span class="lp-tag ${b.status === 'Reserved' ? 'reserved' : ''}">${b.status}</span>
      <img class="lp-cover" src="${b.img}" alt="${b.title}" onerror="this.style.background='#dbeafe';this.src='';" />
      <div class="lp-info">
        <h4>${b.title}</h4>
        <div class="lp-auth">${b.author}</div>
      </div>
    </div>
  `).join('');

  $$('.lp-book-card').forEach(c => c.addEventListener('click', () => {
    window.location.href = 'index.html';
  }));
}
renderBooks();

// ===== Carousel arrows =====
$('#lpPrev').addEventListener('click', () => {
  lpOffset = Math.max(0, lpOffset - 4);
  renderBooks();
});
$('#lpNext').addEventListener('click', () => {
  if (lpOffset + 4 < LP_BOOKS.length) lpOffset += 4;
  else lpOffset = 0;
  renderBooks();
});

// ===== Service cards click → arahkan ke login =====
$$('.lp-service-card').forEach(card => {
  card.addEventListener('click', () => {
    const link = card.dataset.link;
    if (link) window.location.href = link;
  });
});

// ===== Search submit =====
function doSearch(){
  const q = $('#lpSearch').value.trim();
  // Simpan query & arahkan ke halaman login (lalu ke catalog setelah login)
  if (q) sessionStorage.setItem('pendingSearch', q);
  window.location.href = 'index.html';
}
$('#lpSearchGo').addEventListener('click', doSearch);
$('#lpSearch').addEventListener('keypress', e => {
  if (e.key === 'Enter') doSearch();
});

// ===== Top "Search" navbar button → fokus ke hero search =====
$('#lpSearchToggle').addEventListener('click', () => {
  $('#lpSearch').focus();
  $('#lpSearch').scrollIntoView({behavior:'smooth', block:'center'});
});
