import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_FILE = path.resolve(DATA_DIR, 'db.json');

// Default initial database content
const DEFAULT_STAFF = [
  {
    id: 'staff-owner',
    name: 'Owner (Pemilik Toko)',
    role: 'owner',
    division: 'management',
    avatarColor: 'bg-amber-600',
    active: true,
  },
  {
    id: 'staff-admin-1',
    name: 'Admin 1 (Rina)',
    role: 'admin',
    division: 'admin',
    avatarColor: 'bg-blue-600',
    active: true,
  },
  {
    id: 'staff-admin-2',
    name: 'Admin 2 (Bagas)',
    role: 'admin',
    division: 'admin',
    avatarColor: 'bg-sky-600',
    active: true,
  },
  {
    id: 'staff-des-1',
    name: 'Desainer 1 (Doni)',
    role: 'desainer',
    division: 'desainer',
    avatarColor: 'bg-purple-600',
    active: true,
  },
  {
    id: 'staff-des-2',
    name: 'Desainer 2 (Maya)',
    role: 'desainer',
    division: 'desainer',
    avatarColor: 'bg-fuchsia-600',
    active: true,
  },
  {
    id: 'staff-fin-1',
    name: 'Operator Finishing',
    role: 'finishing',
    division: 'finishing',
    avatarColor: 'bg-emerald-600',
    active: true,
  },
  {
    id: 'staff-ban-1',
    name: 'Operator Banner & Sticker',
    role: 'banner',
    division: 'banner',
    avatarColor: 'bg-orange-600',
    active: true,
  },
];

const DEFAULT_ORDERS = [
  {
    id: 'ord-1001',
    orderCode: 'ADM1-0001',
    customerName: 'Bapak Ahmad - CV Maju Jaya',
    customerPhone: '081234567890',
    items: [
      {
        id: 'it-1',
        title: 'Brosur Promosi Usaha A4',
        material: 'Art Paper 150gr',
        sides: '2_sisi',
        finishing: 'Lipat 3 (Z-Fold)',
        unitPrice: 1500,
        quantity: 500,
        unitType: 'lembar',
        totalPrice: 750000,
        notes: 'Warna harus tajam & lipatan rapi',
      },
    ],
    totalAmount: 750000,
    downPayment: 300000,
    paymentStatus: 'dp',
    status: 'in_progress_designer',
    currentDivision: 'desainer',
    assignedStaffId: 'staff-des-1',
    assignedStaffName: 'Desainer 1 (Doni)',
    createdByStaffId: 'staff-admin-1',
    createdByStaffName: 'Admin 1 (Rina)',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    generalNotes: 'Customer minta selesai besok siang jam 12:00.',
    history: [
      {
        id: 'h-1',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
        staffName: 'Admin 1 (Rina)',
        staffRole: 'admin',
        action: 'Order dibuat oleh Admin 1 (Rina) dan ditugaskan ke Desainer 1 (Doni)',
        fromDivision: 'admin',
        toDivision: 'desainer',
      },
      {
        id: 'h-2',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        staffName: 'Desainer 1 (Doni)',
        staffRole: 'desainer',
        action: 'Desainer 1 (Doni) mulai mengerjakan pesanan ini di Divisi DESAINER',
      },
    ],
  },
  {
    id: 'ord-1002',
    orderCode: 'ADM2-0002',
    customerName: 'Ibu Ratna - Warung Padang',
    customerPhone: '082198765432',
    items: [
      {
        id: 'it-2',
        title: 'Spanduk Warung Outdoor 3x1m',
        material: 'Flexi China 280gr',
        sides: '1_sisi',
        finishing: 'Mata Ayam (Eyelets)',
        unitPrice: 25000,
        quantity: 3,
        unitType: 'meter²',
        totalPrice: 75000,
        notes: 'Mata ayam setiap sudut 4 lubang',
      },
    ],
    totalAmount: 75000,
    downPayment: 75000,
    paymentStatus: 'paid',
    status: 'in_progress_banner',
    currentDivision: 'banner',
    assignedStaffId: 'staff-ban-1',
    assignedStaffName: 'Operator Banner & Sticker',
    createdByStaffId: 'staff-admin-2',
    createdByStaffName: 'Admin 2 (Bagas)',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    history: [
      {
        id: 'h-3',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        staffName: 'Admin 2 (Bagas)',
        staffRole: 'admin',
        action: 'Order dibuat oleh Admin 2 (Bagas) dan dioper ke Divisi Banner & Sticker',
      },
      {
        id: 'h-4',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        staffName: 'Operator Banner & Sticker',
        staffRole: 'banner',
        action: 'Operator Banner & Sticker mulai mencetak spanduk di Divisi BANNER',
      },
    ],
  },
  {
    id: 'ord-1003',
    orderCode: 'ADM1-0003',
    customerName: 'Toko Elektronik Makmur',
    customerPhone: '085712349999',
    items: [
      {
        id: 'it-3',
        title: 'Kartu Nama Bisnis',
        material: 'Art Carton 260gr',
        sides: '2_sisi',
        finishing: 'Laminasi Doff',
        unitPrice: 45000,
        quantity: 3,
        unitType: 'box',
        totalPrice: 135000,
        notes: 'Potong sudut tumpul',
      },
    ],
    totalAmount: 135000,
    downPayment: 135000,
    paymentStatus: 'paid',
    status: 'ready_at_admin',
    currentDivision: 'admin',
    createdByStaffId: 'staff-admin-1',
    createdByStaffName: 'Admin 1 (Rina)',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    readyAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    history: [
      {
        id: 'h-5',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
        staffName: 'Admin 1 (Rina)',
        staffRole: 'admin',
        action: 'Order dicatat oleh Admin 1 (Rina)',
      },
      {
        id: 'h-6',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        staffName: 'Operator Finishing',
        staffRole: 'finishing',
        action: 'Operator Finishing menyelesaikan pekerjaan dan mengembalikan barang ke Admin (Siap Diambil Customer)',
      },
    ],
  },
];

// Helper to load database
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading db.json, re-initializing:', err);
  }

  const initialData = {
    orders: DEFAULT_ORDERS,
    staff: DEFAULT_STAFF,
    ownerPin: '1234',
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

// Helper to save database
function saveDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// REST API ROUTES
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. Orders API
app.get('/api/orders', (_req, res) => {
  const db = loadDatabase();
  res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.orderCode) {
    return res.status(400).json({ error: 'Data pesanan tidak valid' });
  }

  const db = loadDatabase();
  db.orders = [newOrder, ...(db.orders || [])];
  saveDatabase(db);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const updatedOrder = req.body;

  const db = loadDatabase();
  const index = (db.orders || []).findIndex((o: any) => o.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Order tidak ditemukan' });
  }

  db.orders[index] = updatedOrder;
  saveDatabase(db);
  res.json(updatedOrder);
});

app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  db.orders = (db.orders || []).filter((o: any) => o.id !== id);
  saveDatabase(db);
  res.json({ success: true });
});

// 2. Staff API
app.get('/api/staff', (_req, res) => {
  const db = loadDatabase();
  res.json(db.staff || DEFAULT_STAFF);
});

app.post('/api/staff', (req, res) => {
  const newStaff = req.body;
  const db = loadDatabase();
  db.staff = [...(db.staff || DEFAULT_STAFF), newStaff];
  saveDatabase(db);
  res.status(201).json(newStaff);
});

app.delete('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDatabase();
  db.staff = (db.staff || DEFAULT_STAFF).filter((s: any) => s.id !== id);
  saveDatabase(db);
  res.json({ success: true });
});

// 3. Owner PIN API
app.get('/api/pin', (_req, res) => {
  const db = loadDatabase();
  res.json({ pin: db.ownerPin || '1234' });
});

app.post('/api/pin', (req, res) => {
  const { pin } = req.body;
  if (!pin || pin.length < 4) {
    return res.status(400).json({ error: 'PIN minimal 4 digit' });
  }
  const db = loadDatabase();
  db.ownerPin = pin;
  saveDatabase(db);
  res.json({ success: true, pin });
});

// Start Express server and mount Vite
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 CetakFlow Backend Database running on port ${PORT}`);
  });
}

startServer();
