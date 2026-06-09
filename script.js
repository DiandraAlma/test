// ============ BINUS Library Admin — App Script ============
(() => {
    const root = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-item');
    const D = window.LIBRARY_DATA;
  
    // ---------- Toast ----------
    function toast(msg, type = 'ok') {
      const c = document.getElementById('toastContainer');
      const t = document.createElement('div');
      t.className = 'toast' + (type === 'error' ? ' error' : '');
      const icon = type === 'error' ? 'fa-circle-xmark' : 'fa-circle-check';
      t.innerHTML = `<i class="fa-solid ${icon}"></i><span>${msg}</span>`;
      c.appendChild(t);
      setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; }, 2600);
      setTimeout(() => t.remove(), 3000);
    }
  
    // ---------- Modal ----------
    const modalRoot = document.getElementById('modalRoot');
    const modalCard = document.getElementById('modalCard');
    function openModal(html) {
      modalCard.innerHTML = html;
      modalRoot.classList.remove('hidden');
    }
    function closeModal() { modalRoot.classList.add('hidden'); }
    modalRoot.addEventListener('click', (e) => {
      if (e.target.dataset.close === '1' || e.target.id === 'modalRoot') closeModal();
    });
  
    // ---------- Top bar interactions ----------
    document.getElementById('notifBtn').addEventListener('click', () => {
      openModal(`
        <h3>Notifications</h3>
        <p>You have 3 unread system notifications.</p>
        <ul style="list-style:none;padding:0;margin:0;">
          <li style="padding:12px 0;border-top:1px solid #eee;"><b>New return:</b> Book LKC-1042-2023 returned by Budi Santoso.</li>
          <li style="padding:12px 0;border-top:1px solid #eee;"><b>Reservation pending:</b> 12 room requests awaiting approval.</li>
          <li style="padding:12px 0;border-top:1px solid #eee;"><b>System:</b> Backup completed successfully at 03:00.</li>
        </ul>
        <div class="modal-actions"><button class="btn btn-primary" data-close="1">Close</button></div>
      `);
    });
    document.getElementById('settingsBtn').addEventListener('click', () => {
      openModal(`
        <h3>Settings</h3>
        <p>Configure admin preferences.</p>
        <label style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;"><span>Dark mode</span><input type="checkbox"></label>
        <label style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;"><span>Email notifications</span><input type="checkbox" checked></label>
        <label style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;"><span>Auto-approve faculty</span><input type="checkbox"></label>
        <div class="modal-actions"><button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" id="saveSettings">Save</button></div>
      `);
      document.getElementById('saveSettings').onclick = () => { closeModal(); toast('Settings saved.'); };
    });
    document.getElementById('globalSearch').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') toast(`Searching for "${e.target.value || '...'}"`);
    });
  
    // ---------- Sidebar navigation ----------
    navLinks.forEach(a => a.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      render(a.dataset.page);
    }));
  
    // ============ PAGES ============
    function render(page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (page === 'dashboard') return renderDashboard();
      if (page === 'books')     return renderBooks();
      if (page === 'rooms')     return renderRooms();
      if (page === 'borrowing') return renderBorrowing();
      if (page === 'monitoring')return renderMonitoring();
    }
  
    // ---------- Dashboard ----------
    function renderDashboard() {
      root.innerHTML = `
        <h1 class="page-title">Dashboard Home</h1>
        <p class="page-subtitle">Welcome back, Alex. Here's the library system at a glance for today.</p>
  
        <div class="grid grid-stats">
          <div class="stat-card"><div class="stat-label">Total Books</div><div class="stat-value">48,290</div><div class="stat-delta"><i class="fa-solid fa-arrow-up"></i> 124 added</div></div>
          <div class="stat-card"><div class="stat-label">Active Borrowings</div><div class="stat-value">1,284</div><div class="stat-delta"><i class="fa-solid fa-arrow-up"></i> 18 today</div></div>
          <div class="stat-card"><div class="stat-label">Pending Reservations</div><div class="stat-value">12</div><div class="stat-delta down"><i class="fa-solid fa-arrow-down"></i> 4 since morning</div></div>
          <div class="stat-card"><div class="stat-label">Active Sessions</div><div class="stat-value">87</div><div class="stat-delta"><i class="fa-solid fa-arrow-up"></i> Healthy</div></div>
        </div>
  
        <div class="grid grid-2 mt-3">
          <div class="card chart-card">
            <h3>Weekly Borrowing Activity</h3>
            <div class="sub">Books borrowed per day this week</div>
            <div class="bars" id="weeklyBars"></div>
            <div class="bar-labels">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          <div class="card quick-actions">
            <h4>Quick Actions</h4>
            <button class="qa-btn" data-action="return"><span class="qa-left"><i class="fa-solid fa-rotate-left"></i> Process Return</span><i class="fa-solid fa-chevron-right"></i></button>
            <button class="qa-btn" data-action="add"><span class="qa-left"><i class="fa-solid fa-plus"></i> Add New Book</span><i class="fa-solid fa-chevron-right"></i></button>
            <button class="qa-btn" data-action="report"><span class="qa-left"><i class="fa-solid fa-file-export"></i> Export Today's Report</span><i class="fa-solid fa-chevron-right"></i></button>
            <button class="qa-btn" data-action="lock"><span class="qa-left"><i class="fa-solid fa-lock"></i> Auto-Lock All Rooms</span><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      `;
  
      // generate bars
      const heights = [55, 80, 120, 95, 145, 70, 40];
      const bc = document.getElementById('weeklyBars');
      heights.forEach((h, i) => {
        const b = document.createElement('div');
        b.className = 'bar ' + (i === 4 ? 'active' : i === 2 ? 'light' : 'muted');
        b.style.height = h + 'px';
        bc.appendChild(b);
      });
  
      // quick actions
      document.querySelectorAll('.qa-btn').forEach(btn => btn.addEventListener('click', () => {
        const a = btn.dataset.action;
        if (a === 'return')  { document.querySelector('[data-page="borrowing"]').click(); return; }
        if (a === 'add')     return showAddBookModal();
        if (a === 'report')  return toast("Today's report exported successfully.");
        if (a === 'lock')    return toast('All rooms have been auto-locked.');
      }));
    }
  
    // ---------- Books ----------
    function renderBooks() {
      root.innerHTML = `
        <div class="section-head">
          <div>
            <h1 class="page-title">Manage Books &amp; Jurnal</h1>
            <p class="page-subtitle">Catalog overview, add new items, update availability, and remove records.</p>
          </div>
          <button class="btn btn-accent" id="addBookBtn"><i class="fa-solid fa-plus"></i> Add New Book</button>
        </div>
  
        <div class="card">
          <div class="toolbar">
            <div class="search-mini"><i class="fa-solid fa-magnifying-glass"></i><input id="bookSearch" type="text" placeholder="Search by title, author, or ID..." /></div>
            <div class="flex gap-2">
              <button class="btn btn-sm"><i class="fa-solid fa-filter"></i> Filter</button>
              <button class="btn btn-sm"><i class="fa-solid fa-arrow-down-wide-short"></i> Sort</button>
            </div>
          </div>
          <div class="table-card">
            <table class="data-table books-table"><thead><tr>
              <th>Title</th><th>Author</th><th>Category</th><th>ID</th><th>Status</th><th></th>
            </tr></thead><tbody id="booksBody"></tbody></table>
          </div>
        </div>
      `;
      paintBooks(D.books);
      document.getElementById('bookSearch').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = D.books.filter(b => (b.title + b.author + b.id).toLowerCase().includes(q));
        paintBooks(filtered);
      });
      document.getElementById('addBookBtn').addEventListener('click', showAddBookModal);
    }
  
    function paintBooks(list) {
      const body = document.getElementById('booksBody');
      if (!list.length) { body.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#9ca3af;">No books found.</td></tr>`; return; }
      body.innerHTML = list.map(b => {
        const badge = b.status === 'Available' ? 'badge-green' : b.status === 'Reserved' ? 'badge-yellow' : 'badge-red';
        return `<tr>
          <td><span class="cover-mini"></span><b>${b.title}</b></td>
          <td>${b.author}</td>
          <td>${b.category}</td>
          <td style="color:#6b7280;font-size:12px;font-weight:600;">${b.id}</td>
          <td><span class="badge ${badge}">${b.status}</span></td>
          <td style="text-align:right;">
            <button class="btn btn-sm" data-edit="${b.id}"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-danger-outline" data-del="${b.id}"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>`;
      }).join('');
      body.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.dataset.del;
        openModal(`
          <h3>Delete Book</h3>
          <p>Are you sure you want to delete <b>${id}</b>? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn" data-close="1">Cancel</button>
            <button class="btn btn-primary" id="confirmDel" style="background:#dc2626;border-color:#dc2626;">Delete</button>
          </div>`);
        document.getElementById('confirmDel').onclick = () => {
          const idx = D.books.findIndex(x => x.id === id);
          if (idx > -1) D.books.splice(idx, 1);
          closeModal();
          toast(`Book ${id} deleted.`);
          renderBooks();
        };
      }));
      body.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.dataset.edit;
        const b = D.books.find(x => x.id === id);
        openModal(`
          <h3>Edit Book</h3>
          <p>Update record for <b>${id}</b>.</p>
          <input class="modal-input" id="eTitle" placeholder="Title" value="${b.title}" style="margin-bottom:10px;">
          <input class="modal-input" id="eAuthor" placeholder="Author" value="${b.author}" style="margin-bottom:10px;">
          <input class="modal-input" id="eCat" placeholder="Category" value="${b.category}" style="margin-bottom:10px;">
          <div class="modal-actions"><button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" id="saveBook">Save</button></div>
        `);
        document.getElementById('saveBook').onclick = () => {
          b.title = document.getElementById('eTitle').value || b.title;
          b.author = document.getElementById('eAuthor').value || b.author;
          b.category = document.getElementById('eCat').value || b.category;
          closeModal(); toast('Book updated.'); renderBooks();
        };
      }));
    }
  
    function showAddBookModal() {
      openModal(`
        <h3>Add New Book</h3>
        <p>Fill in the basic catalog information.</p>
        <input class="modal-input" id="nTitle" placeholder="Title" style="margin-bottom:10px;">
        <input class="modal-input" id="nAuthor" placeholder="Author" style="margin-bottom:10px;">
        <input class="modal-input" id="nCat" placeholder="Category" style="margin-bottom:10px;">
        <div class="modal-actions"><button class="btn" data-close="1">Cancel</button><button class="btn btn-accent" id="addBook">Add Book</button></div>
      `);
      document.getElementById('addBook').onclick = () => {
        const title = document.getElementById('nTitle').value.trim();
        const author = document.getElementById('nAuthor').value.trim();
        const cat = document.getElementById('nCat').value.trim() || 'General';
        if (!title || !author) { toast('Please fill title and author.', 'error'); return; }
        const id = 'LKC-' + Math.floor(1000 + Math.random()*9000) + '-2025';
        D.books.unshift({ id, title, author, category: cat, status: 'Available' });
        closeModal(); toast('Book added to catalog.');
        if (document.getElementById('booksBody')) renderBooks();
      };
    }
  
    // ---------- Rooms ----------
    function renderRooms() {
      root.innerHTML = `
        <div class="section-head">
          <div>
            <h1 class="page-title">Pending Reservations</h1>
            <p class="page-subtitle">Review and manage student and faculty room booking requests for today and upcoming dates.</p>
          </div>
          <div class="active-req"><span class="active-req-label">Active Requests:</span><span class="active-req-val" id="activeCount">${D.reservations.filter(r=>r.status==='pending').length}</span></div>
        </div>
  
        <div class="table-card">
          <table class="data-table"><thead><tr>
            <th>User Name</th><th>Room</th><th>Date</th><th>Time Slot</th><th>Status</th><th style="text-align:right;">Actions</th>
          </tr></thead><tbody id="resBody"></tbody></table>
          <div class="pagination"><span id="showText">Showing 1 to ${Math.min(3,D.reservations.length)} of ${D.reservations.length} requests</span><div class="pager"><button>&lt;</button><span>Page 1 of ${Math.ceil(D.reservations.length/3)}</span><button>&gt;</button></div></div>
        </div>
  
        <div class="bottom-grid">
          <div class="card chart-card">
            <h3>Daily Occupancy Flow</h3>
            <div class="sub">Peak hours observed between 11:00 AM and 03:00 PM.</div>
            <div class="bars" id="occBars"></div>
            <div class="bar-labels"><span>08</span><span>10</span><span>12</span><span>14</span><span>16</span><span>18</span></div>
          </div>
          <div class="card quick-actions">
            <h4>Quick Actions</h4>
            <button class="qa-btn" id="lockAllBtn"><span class="qa-left"><i class="fa-solid fa-lock"></i> Auto-Lock All Rooms</span><i class="fa-solid fa-chevron-right"></i></button>
            <button class="qa-btn" id="exportBtn"><span class="qa-left"><i class="fa-solid fa-file-export"></i> Export Today's Report</span><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      `;
      paintReservations();
      const occ = [55, 90, 145, 110, 70, 45];
      const c = document.getElementById('occBars');
      occ.forEach((h, i) => {
        const b = document.createElement('div');
        b.className = 'bar ' + (i === 2 ? 'active' : i === 3 ? 'light' : 'muted');
        b.style.height = h + 'px';
        c.appendChild(b);
      });
      document.getElementById('lockAllBtn').onclick = () => toast('All rooms have been auto-locked.');
      document.getElementById('exportBtn').onclick = () => toast("Today's report exported successfully.");
    }
  
    function paintReservations() {
      const body = document.getElementById('resBody');
      const visible = D.reservations.slice(0, 3);
      body.innerHTML = visible.map((r, i) => `
        <tr data-row="${i}">
          <td><div class="user-cell"><div class="user-init ${r.tone}">${r.initials}</div><div><div class="user-name">${r.name}</div><div class="user-sub">${r.sub}</div></div></div></td>
          <td><div class="room-cell"><i class="fa-solid fa-users"></i> ${r.room}</div></td>
          <td>${r.date}</td>
          <td>${r.time}</td>
          <td>${r.status === 'pending' ? '<span class="badge badge-yellow">PENDING</span>' : r.status === 'approved' ? '<span class="badge badge-green">APPROVED</span>' : '<span class="badge badge-red">REJECTED</span>'}</td>
          <td style="text-align:right;"><div class="actions-cell" style="align-items:flex-end;"><button class="btn btn-sm btn-primary" data-approve="${i}">Approve</button><button class="btn btn-sm btn-danger-outline" data-reject="${i}">Reject</button></div></td>
        </tr>`).join('');
      body.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => {
        const idx = parseInt(b.dataset.approve);
        D.reservations[idx].status = 'approved';
        toast('Reservation Approved successfully.');
        renderRooms();
      }));
      body.querySelectorAll('[data-reject]').forEach(b => b.addEventListener('click', () => {
        const idx = parseInt(b.dataset.reject);
        D.reservations[idx].status = 'rejected';
        toast('Reservation rejected.', 'error');
        renderRooms();
      }));
    }
  
    // ---------- Borrowing ----------
    function renderBorrowing() {
      const book = D.currentBook;
      root.innerHTML = `
        <div class="borrow-grid">
          <div>
            <div class="card scan-card">
              <h2>Scan to Return</h2>
              <p class="scan-desc">Place the book barcode under the scanner or type the ID manually.</p>
              <div class="scan-input-wrap">
                <div class="scan-input-label">Book ID / Barcode</div>
                <div class="scan-input-row">
                  <i class="fa-solid fa-barcode barcode-icon"></i>
                  <input id="barcodeInput" type="text" value="${book.id}" />
                </div>
              </div>
              <div class="scan-ready"><i class="fa-solid fa-circle-check"></i> Ready for input</div>
              <div class="scan-actions">
                <button class="btn" id="recentBtn"><i class="fa-solid fa-clock-rotate-left"></i> Recent Returns</button>
                <button class="btn" id="manualBtn"><i class="fa-solid fa-magnifying-glass"></i> Manual Search</button>
              </div>
            </div>
  
            <div class="card card-soft mt-3 session-summary" style="background:#f4f5fa;">
              <div>
                <div class="session-label">SESSION SUMMARY</div>
                <div class="session-value" id="booksReturned">${D.stats.booksReturned}</div>
                <div class="session-sublabel">Books Returned</div>
              </div>
              <div>
                <div class="session-label">&nbsp;</div>
                <div class="session-value amber">${D.stats.pendingFines}</div>
                <div class="session-sublabel">Pending Fines</div>
              </div>
              <div>
                <div class="session-label">&nbsp;</div>
                <div class="session-value" id="durationVal">${D.stats.sessionDuration}</div>
                <div class="session-sublabel">Session Duration</div>
              </div>
            </div>
          </div>
  
          <div class="card summary-card">
            <div class="summary-head">
              <h2>Book Summary</h2>
              <span class="summary-status">Status: ${book.status}</span>
            </div>
            <div class="book-row">
              <div class="book-cover">Modern<br>Architecture<br>Systems</div>
              <div>
                <div class="book-title">${book.title}</div>
                <div class="book-author">By ${book.author}</div>
                <div class="book-id">ID: ${book.id}</div>
              </div>
            </div>
  
            <div class="info-row">
              <div class="info-label">Borrower</div>
              <div class="info-value"><i class="fa-regular fa-user"></i> ${book.borrower}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Due Date</div>
              <div class="info-value"><i class="fa-regular fa-calendar"></i> ${book.dueDate}<span class="due-pill">${book.onTime ? 'On Time' : 'Overdue'}</span></div>
            </div>
  
            <div class="condition-notes">
              <label for="notes">Condition Notes</label>
              <textarea id="notes" placeholder="Add notes about the book's condition (e.g., slight wear on cover)..."></textarea>
            </div>
  
            <label class="damage-check"><input type="checkbox" id="damageChk"> <i class="fa-solid fa-circle-exclamation"></i> Report significant damage</label>
  
            <button class="btn btn-primary confirm-btn" id="confirmReturn"><i class="fa-regular fa-clipboard"></i> Confirm Return</button>
          </div>
        </div>
      `;
  
      // live timer
      if (window._dur) clearInterval(window._dur);
      let [mm, ss] = D.stats.sessionDuration.split(':').map(Number);
      window._dur = setInterval(() => {
        ss++; if (ss >= 60) { ss = 0; mm++; }
        const v = String(mm).padStart(2,'0') + ':' + String(ss).padStart(2,'0');
        D.stats.sessionDuration = v;
        const el = document.getElementById('durationVal'); if (el) el.textContent = v;
      }, 1000);
  
      document.getElementById('confirmReturn').onclick = () => {
        const dmg = document.getElementById('damageChk').checked;
        D.stats.booksReturned++;
        const el = document.getElementById('booksReturned'); if (el) el.textContent = D.stats.booksReturned;
        toast(dmg ? 'Return confirmed with damage flagged.' : 'Return confirmed successfully.');
      };
      document.getElementById('recentBtn').onclick = () => {
        openModal(`
          <h3>Recent Returns</h3>
          <p>Last items processed in this session.</p>
          <ul style="list-style:none;padding:0;margin:0;">
            <li style="padding:10px 0;border-top:1px solid #eee;"><b>LKC-1042-2023</b> · Modern Architecture Systems · 10:41</li>
            <li style="padding:10px 0;border-top:1px solid #eee;"><b>LKC-0988-2022</b> · Algorithms and Data Structures · 10:35</li>
            <li style="padding:10px 0;border-top:1px solid #eee;"><b>LKC-0772-2021</b> · Quantum Computing · 10:21</li>
          </ul>
          <div class="modal-actions"><button class="btn btn-primary" data-close="1">Close</button></div>
        `);
      };
      document.getElementById('manualBtn').onclick = () => {
        openModal(`
          <h3>Manual Search</h3>
          <p>Search a book by title, author or ID.</p>
          <input class="modal-input" id="manualQ" placeholder="Type to search...">
          <div class="modal-actions"><button class="btn" data-close="1">Cancel</button><button class="btn btn-primary" id="manualGo">Search</button></div>
        `);
        document.getElementById('manualGo').onclick = () => {
          const q = document.getElementById('manualQ').value;
          closeModal();
          toast(`Searched: "${q || '...'}"`);
        };
      };
      document.getElementById('barcodeInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') toast(`Loaded book ${e.target.value}`);
      });
    }
  
    // ---------- Monitoring ----------
    function renderMonitoring() {
      root.innerHTML = `
        <h1 class="page-title">System Monitoring</h1>
        <p class="page-subtitle">Live infrastructure and library service health metrics.</p>
  
        <div class="grid grid-stats">
          <div class="stat-card metric-card"><div class="stat-label">CPU Usage</div><div class="stat-value" id="cpuVal">38%</div><div class="health-bar"><div id="cpuBar" style="width:38%"></div></div></div>
          <div class="stat-card metric-card"><div class="stat-label">Memory</div><div class="stat-value" id="memVal">62%</div><div class="health-bar"><div id="memBar" style="width:62%"></div></div></div>
          <div class="stat-card metric-card"><div class="stat-label">Disk</div><div class="stat-value" id="dskVal">47%</div><div class="health-bar"><div id="dskBar" style="width:47%"></div></div></div>
          <div class="stat-card metric-card"><div class="stat-label">Network</div><div class="stat-value" id="netVal">12 Mb/s</div><div class="health-bar"><div id="netBar" style="width:24%"></div></div></div>
        </div>
  
        <div class="card mt-3">
          <div class="row-between" style="margin-bottom:14px;"><h3 style="margin:0;color:var(--navy);">Recent Logs</h3><button class="btn btn-sm" id="refreshLogs"><i class="fa-solid fa-rotate"></i> Refresh</button></div>
          <div id="logsList"></div>
        </div>
      `;
      paintLogs();
      document.getElementById('refreshLogs').onclick = () => { paintLogs(); toast('Logs refreshed.'); };
  
      // live randomize metrics
      if (window._met) clearInterval(window._met);
      window._met = setInterval(() => {
        const cpu = Math.floor(30 + Math.random()*30);
        const mem = Math.floor(55 + Math.random()*20);
        const dsk = Math.floor(45 + Math.random()*10);
        const net = Math.floor(8 + Math.random()*16);
        const set = (id, bar, v, suffix='%', barV) => {
          const e1 = document.getElementById(id), e2 = document.getElementById(bar);
          if (e1) e1.textContent = v + suffix;
          if (e2) e2.style.width = (barV ?? v) + '%';
        };
        set('cpuVal','cpuBar',cpu);
        set('memVal','memBar',mem);
        set('dskVal','dskBar',dsk);
        set('netVal','netBar',net,' Mb/s', net*2);
      }, 2000);
    }
  
    function paintLogs() {
      const list = document.getElementById('logsList');
      list.innerHTML = D.logs.map(l => {
        const cls = l.level === 'info' ? 'lvl-info' : l.level === 'warn' ? 'lvl-warn' : 'lvl-err';
        return `<div class="log-row"><span style="color:#6b7280;font-family:monospace;">${l.time}</span><span class="log-level ${cls}">${l.level.toUpperCase()}</span><span>${l.msg}</span></div>`;
      }).join('');
    }
  
    // ---------- Init ----------
    renderDashboard();
  })();
  