// ============ Mock data for BINUS Library Admin ============
window.LIBRARY_DATA = {
    stats: {
      booksReturned: 12,
      pendingFines: 0,
      sessionDuration: '08:42',
    },
    currentBook: {
      id: 'LKC-1042-2023',
      title: 'Modern Architecture Systems',
      author: 'Dr. Julian Henderson',
      borrower: 'Budi Santoso (2440012932)',
      dueDate: 'October 24, 2026',
      status: 'Verified',
      onTime: true,
    },
    reservations: [
      { initials: 'AS', tone: 'blue',  name: 'Adrian Susanto',  sub: '2401982731 • Student',  room: 'Meeting Room A2',  date: 'Oct 24, 2026', time: '09:00 - 11:00', status: 'pending' },
      { initials: 'DL', tone: 'pink',  name: 'Dr. Lisa Wijaya', sub: 'L-10293 • Faculty',     room: 'Seminar Room 01', date: 'Oct 24, 2026', time: '13:00 - 15:00', status: 'pending' },
      { initials: 'BM', tone: 'amber', name: 'Budi Mulyono',    sub: '2501827364 • Student',  room: 'Silent Study Pod 4', date: 'Oct 25, 2026', time: '10:00 - 12:00', status: 'pending' },
      { initials: 'CR', tone: 'blue',  name: 'Citra Rahmawati', sub: '2402938471 • Student',  room: 'Meeting Room B1', date: 'Oct 25, 2026', time: '14:00 - 16:00', status: 'pending' },
      { initials: 'DH', tone: 'amber', name: 'Dr. Hadi Pranoto', sub: 'L-22019 • Faculty',    room: 'Auditorium',     date: 'Oct 26, 2026', time: '08:00 - 12:00', status: 'pending' },
    ],
    books: [
      { id: 'LKC-1001-2024', title: 'Algorithms and Data Structures', author: 'Prof. Alan Turing', category: 'Computer Science', status: 'Available' },
      { id: 'LKC-1002-2024', title: 'The Architecture of Modern AI',  author: 'Grace Hopper',     category: 'Computer Science', status: 'Reserved'  },
      { id: 'LKC-1003-2024', title: 'Securing the Global Cloud',      author: 'Dr. Kevin Mitnick', category: 'Cybersecurity',   status: 'Available' },
      { id: 'LKC-1004-2024', title: 'The Pragmatic Engineer',         author: 'James Gosling',    category: 'Engineering',     status: 'Borrowed'  },
      { id: 'LKC-1005-2024', title: 'Quantum Computing',              author: 'Richard Feynman',  category: 'Physics',         status: 'Available' },
      { id: 'LKC-1006-2024', title: 'Scalable Systems Management',    author: 'Werner Vogels',    category: 'Engineering',     status: 'Available' },
      { id: 'LKC-1007-2024', title: 'Modern Architecture Systems',    author: 'Dr. Julian Henderson', category: 'Architecture', status: 'Borrowed' },
      { id: 'LKC-1008-2024', title: 'Data Mining Foundations',        author: 'Han & Kamber',     category: 'Data Science',    status: 'Available' },
    ],
    logs: [
      { time: '10:42:18', level: 'info',  msg: 'User Alex Rivera logged in from 10.0.42.18' },
      { time: '10:41:02', level: 'info',  msg: 'Book LKC-1042-2023 marked as returned' },
      { time: '10:38:55', level: 'warn',  msg: 'Reservation #4521 auto-expired due to no-show' },
      { time: '10:30:11', level: 'info',  msg: 'New room reservation request from 2401982731' },
      { time: '10:22:48', level: 'err',   msg: 'Scanner #3 disconnected unexpectedly' },
      { time: '10:14:09', level: 'info',  msg: 'Daily occupancy report generated' },
      { time: '09:58:34', level: 'warn',  msg: 'High load detected on Catalog API (62% CPU)' },
    ],
  };
  