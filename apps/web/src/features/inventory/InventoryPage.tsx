import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { KPICard } from '../../components/erp/KPICard';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { StatusBadge } from '../../components/erp/StatusBadge';
import {
  Layers,
  Archive,
  Truck,
  FileText,
  Wrench,
  Droplet,
  Plus,
  Search,
  Trash2,
  Check,
  X,
  DollarSign,
  AlertCircle,
  MapPin,
  ShieldAlert,
  ArrowUpRight,
  ClipboardList
} from 'lucide-react';

// Type definitions
interface Asset {
  id: string;
  name: string;
  category: 'Electronics' | 'Furniture' | 'Lab Equipment' | 'Vehicles' | 'Sports';
  value: string;
  location: string;
  status: 'In Use' | 'In Storage' | 'Under Repair' | 'Retired';
}

interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  price: string;
}

interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  category: string;
  status: 'Active' | 'Inactive';
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  itemName: string;
  qty: number;
  type: 'Stock' | 'Asset';
  amount: string;
  orderDate: string;
  status: 'Pending Approval' | 'Ordered' | 'Received' | 'Cancelled';
}

interface MaintenanceLog {
  id: string;
  assetId: string;
  assetName: string;
  issue: string;
  reportedDate: string;
  cost: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Reported' | 'In Progress' | 'Resolved';
}

interface Consumable {
  id: string;
  name: string;
  department: string;
  remaining: number;
  unit: string;
  dailyUsage: number;
  lastRestocked: string;
}

const InventoryPage: React.FC = () => {
  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<
    'assets' | 'stock' | 'suppliers' | 'orders' | 'maintenance' | 'consumables'
  >('assets');

  // --- Search & Filters ---
  const [assetSearch, setAssetSearch] = useState('');
  const [assetLocFilter, setAssetLocFilter] = useState('All');
  const [stockSearch, setStockSearch] = useState('');
  const [supplierSearch, setSupplierSearch] = useState('');
  const [maintenanceFilter, setMaintenanceFilter] = useState<'All' | 'Reported' | 'In Progress' | 'Resolved'>('All');

  // --- Modals State ---
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddPOModal, setShowAddPOModal] = useState(false);
  const [showAddMaintModal, setShowAddMaintModal] = useState(false);
  const [showLogUsageModal, setShowLogUsageModal] = useState(false);

  // --- Form Inputs ---
  const [newAsset, setNewAsset] = useState({ name: '', category: 'Electronics' as const, value: '', location: '', status: 'In Storage' as const });
  const [newStock, setNewStock] = useState({ name: '', category: 'Stationery', quantity: '', unit: 'pieces', reorderLevel: '', price: '' });
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', phone: '', email: '', category: 'IT Hardware' });
  const [newPO, setNewPO] = useState({ supplier: '', itemName: '', qty: '', type: 'Stock' as const, amount: '' });
  const [newMaint, setNewMaint] = useState({ assetId: '', issue: '', cost: '', priority: 'Medium' as const });
  const [selectedConsumable, setSelectedConsumable] = useState<Consumable | null>(null);
  const [usageQty, setUsageQty] = useState('');

  // --- Mock Database / States ---
  const [assets, setAssets] = useState<Asset[]>([
    { id: 'AST001', name: 'Dell OptiPlex 5090 (x30)', category: 'Electronics', value: '$24,000', location: 'Computer Lab A', status: 'In Use' },
    { id: 'AST002', name: 'Smart Interactive Board 75\"', category: 'Electronics', value: '$3,200', location: 'Classroom 102', status: 'In Use' },
    { id: 'AST003', name: 'Physics Lab Microscope Kit (x15)', category: 'Lab Equipment', value: '$4,500', location: 'Physics Lab', status: 'In Use' },
    { id: 'AST004', name: 'Wooden Classroom Desk & Chairs (x40)', category: 'Furniture', value: '$6,000', location: 'Classroom 105', status: 'In Use' },
    { id: 'AST005', name: 'Toyota Coaster School Bus', category: 'Vehicles', value: '$45,000', location: 'Main Gate Parking', status: 'Under Repair' },
    { id: 'AST006', name: '3D Printer Ultimaker S3', category: 'Electronics', value: '$3,850', location: 'Makerspace Lab', status: 'In Storage' },
  ]);

  const [stocks, setStocks] = useState<StockItem[]>([
    { id: 'STK001', name: 'Whiteboard Markers (Blue/Black)', category: 'Stationery', quantity: 180, unit: 'boxes', reorderLevel: 50, price: '$12.00' },
    { id: 'STK002', name: 'A4 Printing Paper (80gsm)', category: 'Stationery', quantity: 35, unit: 'reams', reorderLevel: 40, price: '$6.50' }, // Low Stock
    { id: 'STK003', name: 'Lab Chemistry Beakers (500ml)', category: 'Lab Supplies', quantity: 60, unit: 'pieces', reorderLevel: 20, price: '$4.20' },
    { id: 'STK004', name: 'Football / Soccer Balls (Size 5)', category: 'Sports Goods', quantity: 8, unit: 'pieces', reorderLevel: 10, price: '$22.00' }, // Low Stock
    { id: 'STK005', name: 'First Aid Bandages & Antiseptics', category: 'Medical Supplies', quantity: 15, unit: 'sets', reorderLevel: 15, price: '$18.00' }, // Low Stock
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 'SPL001', name: 'Global Tech Solutions', contact: 'John Miller', phone: '+1 555-0199', email: 'orders@globaltech.com', category: 'IT Hardware', status: 'Active' },
    { id: 'SPL002', name: 'A1 Stationery Depot', contact: 'Clara Oswald', phone: '+1 555-0213', email: 'clara@a1stationery.com', category: 'Stationery Supplies', status: 'Active' },
    { id: 'SPL003', name: 'Apex Scientific Corp', contact: 'Dr. Bruce Banner', phone: '+1 555-0789', email: 'procurement@apexsci.com', category: 'Lab & Science Equipment', status: 'Active' },
    { id: 'SPL004', name: 'Supreme Furniture Mart', contact: 'David Wood', phone: '+1 555-0901', email: 'dwood@supremefurn.com', category: 'Furniture', status: 'Active' },
  ]);

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([
    { id: 'PO-2026-001', supplier: 'Global Tech Solutions', itemName: 'Dell OptiPlex 5090 (x30)', qty: 30, type: 'Asset', amount: '$24,000', orderDate: '2026-05-15', status: 'Received' },
    { id: 'PO-2026-002', supplier: 'A1 Stationery Depot', itemName: 'A4 Printing Paper (80gsm)', qty: 100, type: 'Stock', amount: '$650', orderDate: '2026-06-25', status: 'Ordered' },
    { id: 'PO-2026-003', supplier: 'Apex Scientific Corp', itemName: 'Spectrophotometer', qty: 1, type: 'Asset', amount: '$4,200', orderDate: '2026-07-01', status: 'Pending Approval' },
  ]);

  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([
    { id: 'MNT001', assetId: 'AST005', assetName: 'Toyota Coaster School Bus', issue: 'Engine coolant system leak', reportedDate: '2026-06-28', cost: '$650', priority: 'High', status: 'In Progress' },
    { id: 'MNT002', assetId: 'AST002', assetName: 'Smart Interactive Board 75\"', issue: 'HDMI input port 2 non-responsive', reportedDate: '2026-06-15', cost: '$180', priority: 'Medium', status: 'Resolved' },
    { id: 'MNT003', assetId: 'AST003', assetName: 'Physics Lab Microscope Kit', issue: 'Coarse adjustment knob stuck', reportedDate: '2026-07-02', cost: '$45', priority: 'Low', status: 'Reported' },
  ]);

  const [consumables, setConsumables] = useState<Consumable[]>([
    { id: 'CON001', name: 'Printer Toner Cartridge (HP 85A)', department: 'Administration', remaining: 12, unit: 'cartridges', dailyUsage: 0.1, lastRestocked: '2026-06-10' },
    { id: 'CON002', name: 'Disposable Classroom Chalks (White)', department: 'Academic', remaining: 8, unit: 'boxes', dailyUsage: 1, lastRestocked: '2026-05-20' },
    { id: 'CON003', name: 'Disinfectant Floor Cleanser', department: 'Facilities', remaining: 45, unit: 'liters', dailyUsage: 2, lastRestocked: '2026-06-28' },
    { id: 'CON004', name: 'Hand Sanitizer Refills', department: 'Facilities', remaining: 5, unit: 'bottles', dailyUsage: 0.5, lastRestocked: '2026-06-15' },
  ]);

  // --- Mutators ---
  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset.name || !newAsset.value || !newAsset.location) return;
    const id = `AST${String(assets.length + 1).padStart(3, '0')}`;
    const asset: Asset = {
      id,
      name: newAsset.name,
      category: newAsset.category,
      value: `$${newAsset.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      location: newAsset.location,
      status: newAsset.status,
    };
    setAssets([asset, ...assets]);
    setNewAsset({ name: '', category: 'Electronics', value: '', location: '', status: 'In Storage' });
    setShowAddAssetModal(false);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStock.name || !newStock.quantity || !newStock.reorderLevel || !newStock.price) return;
    const id = `STK${String(stocks.length + 1).padStart(3, '0')}`;
    const stock: StockItem = {
      id,
      name: newStock.name,
      category: newStock.category,
      quantity: Number(newStock.quantity),
      unit: newStock.unit,
      reorderLevel: Number(newStock.reorderLevel),
      price: `$${newStock.price.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    };
    setStocks([...stocks, stock]);
    setNewStock({ name: '', category: 'Stationery', quantity: '', unit: 'pieces', reorderLevel: '', price: '' });
    setShowAddStockModal(false);
  };

  const handleAdjustStockQty = (id: string, delta: number) => {
    setStocks(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.email) return;
    const id = `SPL${String(suppliers.length + 1).padStart(3, '0')}`;
    const supplier: Supplier = {
      id,
      name: newSupplier.name,
      contact: newSupplier.contact,
      phone: newSupplier.phone || 'N/A',
      email: newSupplier.email,
      category: newSupplier.category,
      status: 'Active',
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({ name: '', contact: '', phone: '', email: '', category: 'IT Hardware' });
    setShowAddSupplierModal(false);
  };

  const handleAddPO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPO.supplier || !newPO.itemName || !newPO.qty || !newPO.amount) return;
    const id = `PO-2026-${String(purchaseOrders.length + 1).padStart(3, '0')}`;
    const po: PurchaseOrder = {
      id,
      supplier: newPO.supplier,
      itemName: newPO.itemName,
      qty: Number(newPO.qty),
      type: newPO.type,
      amount: `$${newPO.amount.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Pending Approval',
    };
    setPurchaseOrders([po, ...purchaseOrders]);
    setNewPO({ supplier: '', itemName: '', qty: '', type: 'Stock', amount: '' });
    setShowAddPOModal(false);
  };

  const handlePOAction = (poId: string, action: 'Approve' | 'Receive' | 'Cancel') => {
    setPurchaseOrders(prev => prev.map(po => {
      if (po.id === poId) {
        const nextStatus = action === 'Approve' ? 'Ordered' : action === 'Receive' ? 'Received' : 'Cancelled';
        
        // Dynamic stock integration when item is marked as Received!
        if (action === 'Receive') {
          if (po.type === 'Stock') {
            const stockMatch = stocks.find(s => s.name.toLowerCase() === po.itemName.toLowerCase());
            if (stockMatch) {
              // Increase stock level
              setStocks(prevStocks => prevStocks.map(s => s.id === stockMatch.id ? { ...s, quantity: s.quantity + po.qty } : s));
            } else {
              // Create a new stock item
              const newId = `STK${String(stocks.length + 1).padStart(3, '0')}`;
              const newS: StockItem = {
                id: newId,
                name: po.itemName,
                category: 'Stationery',
                quantity: po.qty,
                unit: 'pieces',
                reorderLevel: Math.floor(po.qty * 0.2),
                price: po.amount,
              };
              setStocks(prevStocks => [...prevStocks, newS]);
            }
          } else if (po.type === 'Asset') {
            // Register as new asset
            const newId = `AST${String(assets.length + 1).padStart(3, '0')}`;
            const newA: Asset = {
              id: newId,
              name: po.itemName,
              category: 'Electronics',
              value: po.amount,
              location: 'Receiving Dock',
              status: 'In Storage',
            };
            setAssets(prevAssets => [newA, ...prevAssets]);
          }
        }

        return { ...po, status: nextStatus };
      }
      return po;
    }));
  };

  const handleAddMaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaint.assetId || !newMaint.issue || !newMaint.cost) return;
    const targetAsset = assets.find(a => a.id === newMaint.assetId);
    if (!targetAsset) return;

    const id = `MNT${String(maintenanceLogs.length + 1).padStart(3, '0')}`;
    const log: MaintenanceLog = {
      id,
      assetId: newMaint.assetId,
      assetName: targetAsset.name,
      issue: newMaint.issue,
      reportedDate: new Date().toISOString().split('T')[0],
      cost: `$${newMaint.cost.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      priority: newMaint.priority,
      status: 'Reported',
    };
    
    setMaintenanceLogs([log, ...maintenanceLogs]);

    // Update Asset status to Under Repair
    setAssets(prev => prev.map(a => a.id === newMaint.assetId ? { ...a, status: 'Under Repair' } : a));

    setNewMaint({ assetId: '', issue: '', cost: '', priority: 'Medium' });
    setShowAddMaintModal(false);
  };

  const handleMaintenanceAction = (logId: string, action: 'In Progress' | 'Resolved') => {
    setMaintenanceLogs(prev => prev.map(log => {
      if (log.id === logId) {
        // If resolved, toggle the Asset back to "In Use"
        if (action === 'Resolved') {
          setAssets(prevAssets => prevAssets.map(a => a.id === log.assetId ? { ...a, status: 'In Use' } : a));
        }
        return { ...log, status: action };
      }
      return log;
    }));
  };

  const handleLogUsage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsumable || !usageQty) return;
    const qty = Number(usageQty);
    
    setConsumables(prev => prev.map(c => {
      if (c.id === selectedConsumable.id) {
        return { ...c, remaining: Math.max(0, c.remaining - qty) };
      }
      return c;
    }));

    setSelectedConsumable(null);
    setUsageQty('');
    setShowLogUsageModal(false);
  };

  // --- Filter Logic ---
  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(assetSearch.toLowerCase()) || a.category.toLowerCase().includes(assetSearch.toLowerCase());
    const matchesLoc = assetLocFilter === 'All' || a.location === assetLocFilter;
    return matchesSearch && matchesLoc;
  });

  const filteredStock = stocks.filter(s => {
    return s.name.toLowerCase().includes(stockSearch.toLowerCase()) || s.category.toLowerCase().includes(stockSearch.toLowerCase());
  });

  const filteredSuppliers = suppliers.filter(s => {
    return s.name.toLowerCase().includes(supplierSearch.toLowerCase()) || s.category.toLowerCase().includes(supplierSearch.toLowerCase()) || s.contact.toLowerCase().includes(supplierSearch.toLowerCase());
  });

  const filteredMaint = maintenanceLogs.filter(log => {
    if (maintenanceFilter === 'All') return true;
    return log.status === maintenanceFilter;
  });

  // --- Sidebar Info / Badges ---
  const navigationTabs = [
    { id: 'assets', label: 'Assets Directory', icon: <Layers size={18} />, count: assets.length },
    { id: 'stock', label: 'Stock Levels', icon: <Archive size={18} />, count: stocks.filter(s => s.quantity <= s.reorderLevel).length, alert: true },
    { id: 'suppliers', label: 'Suppliers Partnership', icon: <Truck size={18} /> },
    { id: 'orders', label: 'Purchase Orders', icon: <FileText size={18} />, count: purchaseOrders.filter(po => po.status === 'Pending Approval' || po.status === 'Ordered').length },
    { id: 'maintenance', label: 'Maintenance Logs', icon: <Wrench size={18} />, count: maintenanceLogs.filter(m => m.status !== 'Resolved').length, alert: true },
    { id: 'consumables', label: 'Consumables', icon: <Droplet size={18} /> },
  ] as const;

  // --- Column Declarations for DataGrids ---
  const assetColumns: GridColumn<Asset>[] = [
    { key: 'id', header: 'Asset ID', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.id}</span> },
    { key: 'name', header: 'Asset Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'category', header: 'Category' },
    { key: 'value', header: 'Value/Cost' },
    { key: 'location', header: 'Location', render: (row) => <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} style={{ color: 'var(--text-muted)' }} />{row.location}</div> },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (row.status === 'In Use') st = 'success';
        else if (row.status === 'In Storage') st = 'info';
        else if (row.status === 'Under Repair') st = 'warning';
        else if (row.status === 'Retired') st = 'danger';
        return <StatusBadge status={st} label={row.status} />;
      }
    }
  ];

  const stockColumns: GridColumn<StockItem>[] = [
    { key: 'name', header: 'Item Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'category', header: 'Category' },
    { key: 'quantity', header: 'Quantity in Stock', render: (row) => <span>{row.quantity} {row.unit}</span> },
    { key: 'reorderLevel', header: 'Reorder Level', render: (row) => <span>{row.reorderLevel} {row.unit}</span> },
    { key: 'price', header: 'Unit Price' },
    {
      key: 'status',
      header: 'Status Alerts',
      render: (row) => {
        if (row.quantity === 0) {
          return <StatusBadge status="danger" label="Out of Stock" />;
        }
        if (row.quantity <= row.reorderLevel) {
          return <StatusBadge status="warning" label="Low Stock" />;
        }
        return <StatusBadge status="success" label="Healthy" />;
      }
    }
  ];

  const supplierColumns: GridColumn<Supplier>[] = [
    { key: 'name', header: 'Supplier Company', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'category', header: 'Supply Category' },
    { key: 'contact', header: 'Contact Person' },
    { key: 'email', header: 'Email Address' },
    { key: 'phone', header: 'Contact Phone' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status === 'Active' ? 'success' : 'neutral'} label={row.status} />
    }
  ];

  const poColumns: GridColumn<PurchaseOrder>[] = [
    { key: 'id', header: 'PO Number', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.id}</span> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'itemName', header: 'Item Ordered' },
    { key: 'qty', header: 'Qty' },
    { key: 'amount', header: 'Total Value' },
    { key: 'orderDate', header: 'Order Date' },
    {
      key: 'status',
      header: 'Order Status',
      render: (row) => {
        let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (row.status === 'Received') st = 'success';
        else if (row.status === 'Ordered') st = 'warning';
        else if (row.status === 'Pending Approval') st = 'info';
        else if (row.status === 'Cancelled') st = 'danger';
        return <StatusBadge status={st} label={row.status} />;
      }
    }
  ];

  const maintColumns: GridColumn<MaintenanceLog>[] = [
    { key: 'assetName', header: 'Asset Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.assetName}</div> },
    { key: 'issue', header: 'Issue Description', render: (row) => <div style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={row.issue}>{row.issue}</div> },
    { key: 'reportedDate', header: 'Reported Date' },
    { key: 'cost', header: 'Estimated Cost' },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => (
        <span style={{
          fontWeight: 700,
          color: row.priority === 'High' ? 'var(--accent-danger)' : row.priority === 'Medium' ? 'var(--accent-warning)' : 'var(--accent-primary)',
          fontSize: '11px',
          textTransform: 'uppercase'
        }}>
          {row.priority}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Repair Status',
      render: (row) => {
        let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (row.status === 'Resolved') st = 'success';
        else if (row.status === 'In Progress') st = 'warning';
        else if (row.status === 'Reported') st = 'info';
        return <StatusBadge status={st} label={row.status} />;
      }
    }
  ];

  // --- Sub-renderers for active tab content ---
  const renderAssetsTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search assets by name or category..."
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              className="form-control"
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '13px'
              }}
            />
          </div>
          <select
            value={assetLocFilter}
            onChange={(e) => setAssetLocFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Locations</option>
            <option value="Computer Lab A">Computer Lab A</option>
            <option value="Science Lab">Science Lab</option>
            <option value="Physics Lab">Physics Lab</option>
            <option value="Classroom 102">Classroom 102</option>
            <option value="Classroom 105">Classroom 105</option>
            <option value="Main Gate Parking">Main Gate Parking</option>
            <option value="Makerspace Lab">Makerspace Lab</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddAssetModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Register Asset
        </button>
      </div>

      <DataGrid
        columns={assetColumns}
        data={filteredAssets}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleDeleteAsset(row.id)}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--accent-danger)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            className="hover-danger-btn"
            title="Delete Asset Record"
          >
            <Trash2 size={16} />
          </button>
        )}
      />
    </>
  );

  const renderStockTab = () => {
    const lowStockItems = stocks.filter(s => s.quantity <= s.reorderLevel);
    const totalValue = stocks.reduce((acc, curr) => {
      const priceVal = Number(curr.price.replace(/[^0-9.]/g, ''));
      return acc + (curr.quantity * priceVal);
    }, 0);

    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <KPICard title="Low Stock Alerts" value={lowStockItems.length} icon={<ShieldAlert size={20} />} accentColor="var(--accent-danger)" />
          <KPICard title="Total Inventory Stock Value" value={`$${totalValue.toLocaleString()}`} icon={<DollarSign size={20} />} accentColor="var(--accent-success)" />
          <KPICard title="Total Stock Lines" value={stocks.length} icon={<Archive size={20} />} accentColor="var(--accent-primary)" />
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search stock catalog..."
              value={stockSearch}
              onChange={(e) => setStockSearch(e.target.value)}
              className="form-control"
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '13px'
              }}
            />
          </div>
          <button
            onClick={() => setShowAddStockModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={16} /> Add Stock Item
          </button>
        </div>

        <DataGrid
          columns={stockColumns}
          data={filteredStock}
          keyField="id"
          actions={(row) => (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button
                onClick={() => handleAdjustStockQty(row.id, -5)}
                style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                title="Deduct 5 items"
              >
                -5
              </button>
              <button
                onClick={() => handleAdjustStockQty(row.id, 5)}
                style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                title="Add 5 items"
              >
                +5
              </button>
            </div>
          )}
        />
      </>
    );
  };

  const renderSuppliersTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search suppliers by name, category, contact..."
            value={supplierSearch}
            onChange={(e) => setSupplierSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddSupplierModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Add Supplier Partner
        </button>
      </div>

      <DataGrid
        columns={supplierColumns}
        data={filteredSuppliers}
        keyField="id"
      />
    </>
  );

  const renderOrdersTab = () => {
    const pendingCount = purchaseOrders.filter(p => p.status === 'Pending Approval').length;
    const activeCount = purchaseOrders.filter(p => p.status === 'Ordered').length;
    const receivedCount = purchaseOrders.filter(p => p.status === 'Received').length;

    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <KPICard title="Pending Approval" value={pendingCount} icon={<AlertCircle size={20} />} accentColor="var(--accent-warning)" />
          <KPICard title="Ordered (Active)" value={activeCount} icon={<ArrowUpRight size={20} />} accentColor="var(--accent-primary)" />
          <KPICard title="Fulfilled (Received)" value={receivedCount} icon={<Check size={20} />} accentColor="var(--accent-success)" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Purchase Orders Index</h3>
          <button
            onClick={() => setShowAddPOModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={16} /> Create Purchase Order
          </button>
        </div>

        <DataGrid
          columns={poColumns}
          data={purchaseOrders}
          keyField="id"
          actions={(row) => (
            <div style={{ display: 'flex', gap: '6px' }}>
              {row.status === 'Pending Approval' && (
                <button
                  onClick={() => handlePOAction(row.id, 'Approve')}
                  style={{ border: 'none', background: 'rgba(79, 142, 247, 0.1)', color: 'var(--accent-primary)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                >
                  Approve Order
                </button>
              )}
              {row.status === 'Ordered' && (
                <button
                  onClick={() => handlePOAction(row.id, 'Receive')}
                  style={{ border: 'none', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-success)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                  title="Mark items received, automatically update stock"
                >
                  Mark Received
                </button>
              )}
              {row.status !== 'Received' && row.status !== 'Cancelled' && (
                <button
                  onClick={() => handlePOAction(row.id, 'Cancel')}
                  style={{ border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        />
      </>
    );
  };

  const renderMaintenanceTab = () => {
    const activeLogCount = maintenanceLogs.filter(l => l.status !== 'Resolved').length;
    const totalSpent = maintenanceLogs.filter(l => l.status === 'Resolved').reduce((acc, curr) => acc + Number(curr.cost.replace(/[^0-9]/g, '')), 0);

    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <KPICard title="Active Repair Jobs" value={activeLogCount} icon={<Wrench size={20} />} accentColor="var(--accent-warning)" />
          <KPICard title="Total Resolved Repair Cost" value={`$${totalSpent.toLocaleString()}`} icon={<DollarSign size={20} />} accentColor="var(--accent-success)" />
          <KPICard title="Total Logged Issues" value={maintenanceLogs.length} icon={<ClipboardList size={20} />} accentColor="var(--accent-primary)" />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Maintenance & Incident Logs</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['All', 'Reported', 'In Progress', 'Resolved'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setMaintenanceFilter(f)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: maintenanceFilter === f ? 'var(--accent-primary)' : 'var(--bg-surface)',
                    color: maintenanceFilter === f ? '#fff' : 'var(--text-secondary)',
                    transition: '0.2s'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddMaintModal(true)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
            >
              <Plus size={16} /> Log Asset Issue
            </button>
          </div>
        </div>

        <DataGrid
          columns={maintColumns}
          data={filteredMaint}
          keyField="id"
          actions={(row) => (
            <div style={{ display: 'flex', gap: '6px' }}>
              {row.status === 'Reported' && (
                <button
                  onClick={() => handleMaintenanceAction(row.id, 'In Progress')}
                  style={{ border: 'none', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                >
                  Start Repair
                </button>
              )}
              {row.status === 'In Progress' && (
                <button
                  onClick={() => handleMaintenanceAction(row.id, 'Resolved')}
                  style={{ border: 'none', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-success)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                >
                  Resolve
                </button>
              )}
            </div>
          )}
        />
      </>
    );
  };

  const renderConsumablesTab = () => {
    const consumableColumns: GridColumn<Consumable>[] = [
      { key: 'name', header: 'Consumable Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
      { key: 'department', header: 'Department' },
      { key: 'remaining', header: 'Remaining Balance', render: (row) => <span style={{ fontWeight: 700, color: row.remaining <= row.dailyUsage * 5 ? 'var(--accent-danger)' : 'var(--text-primary)' }}>{row.remaining} {row.unit}</span> },
      { key: 'dailyUsage', header: 'Estimated Daily Usage', render: (row) => <span>{row.dailyUsage} {row.unit}/day</span> },
      { key: 'lastRestocked', header: 'Last Restocked' },
    ];

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Consumables Logs</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Log daily usage levels for high-turnover school supplies.</p>
          </div>
        </div>

        <DataGrid
          columns={consumableColumns}
          data={consumables}
          keyField="id"
          actions={(row) => (
            <button
              onClick={() => {
                setSelectedConsumable(row);
                setShowLogUsageModal(true);
              }}
              style={{
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
            >
              <Droplet size={14} style={{ color: 'var(--accent-primary)' }} /> Log Usage
            </button>
          )}
        />
      </>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'assets':
        return renderAssetsTab();
      case 'stock':
        return renderStockTab();
      case 'suppliers':
        return renderSuppliersTab();
      case 'orders':
        return renderOrdersTab();
      case 'maintenance':
        return renderMaintenanceTab();
      case 'consumables':
        return renderConsumablesTab();
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Inventory & Assets"
        subtitle="Manage and audit assets, stock supply levels, supplier contacts, and maintenance schedules."
        breadcrumbs={[{ label: 'Inventory' }]}
      />

      <style>{`
        .hover-nav-item {
          transition: background-color 0.2s, color 0.2s;
        }
        .hover-nav-item:hover {
          background-color: var(--sidebar-hover-bg);
          color: var(--text-primary);
        }
        .hover-danger-btn:hover {
          background: rgba(239, 68, 68, 0.08) !important;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        .modal-container {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          width: 90%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: var(--shadow-xl);
          animation: modalFadeIn 0.2s ease-out;
        }
        .modal-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .modal-form-group input, .modal-form-group select, .modal-form-group textarea {
          padding: 8px 12px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: var(--bg-canvas);
          color: var(--text-primary);
          outline: none;
          font-size: 13px;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Grid sidebar layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%' }}>
        {/* Left Navigator Menu */}
        <div
          className="dashboard-card"
          style={{
            width: '260px',
            flexShrink: 0,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'var(--bg-surface)'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 8px 8px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
            INVENTORY INDEX
          </span>
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="hover-nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  outline: 'none',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                {'count' in tab && tab.count !== undefined && tab.count > 0 && (
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'alert' in tab && tab.alert ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-surface-raised)',
                    color: 'alert' in tab && tab.alert ? 'var(--accent-danger)' : 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div style={{ flex: 1, minWidth: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="dashboard-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>
                  {navigationTabs.find(t => t.id === activeTab)?.icon}
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {navigationTabs.find(t => t.id === activeTab)?.label}
                </h2>
              </div>
            </div>

            {renderActiveTabContent()}
          </div>
        </div>
      </div>

      {/* --- REGISTER ASSET MODAL --- */}
      {showAddAssetModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Register Asset</h3>
              <button onClick={() => setShowAddAssetModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddAsset} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Asset Name</label>
                <input type="text" required placeholder="e.g. chemistry centrifuge X-1" value={newAsset.name} onChange={e => setNewAsset({ ...newAsset, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Category</label>
                <select value={newAsset.category} onChange={e => setNewAsset({ ...newAsset, category: e.target.value as any })}>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Lab Equipment">Lab Equipment</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Asset Value ($)</label>
                <input type="number" required placeholder="e.g. 1200" value={newAsset.value} onChange={e => setNewAsset({ ...newAsset, value: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Assigned Location</label>
                <input type="text" required placeholder="e.g. Chemistry Lab" value={newAsset.location} onChange={e => setNewAsset({ ...newAsset, location: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Status</label>
                <select value={newAsset.status} onChange={e => setNewAsset({ ...newAsset, status: e.target.value as any })}>
                  <option value="In Storage">In Storage</option>
                  <option value="In Use">In Use</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddAssetModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD STOCK ITEM MODAL --- */}
      {showAddStockModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Add Stock Item</h3>
              <button onClick={() => setShowAddStockModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddStock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Item Name</label>
                <input type="text" required placeholder="e.g. Board Dusters" value={newStock.name} onChange={e => setNewStock({ ...newStock, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Category</label>
                <input type="text" required placeholder="e.g. Classroom Supplies" value={newStock.category} onChange={e => setNewStock({ ...newStock, category: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Initial Quantity</label>
                <input type="number" required placeholder="e.g. 50" value={newStock.quantity} onChange={e => setNewStock({ ...newStock, quantity: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Counting Unit</label>
                <input type="text" required placeholder="e.g. pieces, boxes, packs" value={newStock.unit} onChange={e => setNewStock({ ...newStock, unit: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Reorder Threshold Alert Level</label>
                <input type="number" required placeholder="e.g. 15" value={newStock.reorderLevel} onChange={e => setNewStock({ ...newStock, reorderLevel: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Unit price ($)</label>
                <input type="number" step="0.01" required placeholder="e.g. 8.50" value={newStock.price} onChange={e => setNewStock({ ...newStock, price: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddStockModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD SUPPLIER MODAL --- */}
      {showAddSupplierModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Add Supplier Partner</h3>
              <button onClick={() => setShowAddSupplierModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddSupplier} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Company Name</label>
                <input type="text" required placeholder="e.g. Scientific Supply Hub" value={newSupplier.name} onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Supply Domain/Category</label>
                <select value={newSupplier.category} onChange={e => setNewSupplier({ ...newSupplier, category: e.target.value })}>
                  <option value="IT Hardware">IT Hardware</option>
                  <option value="Stationery Supplies">Stationery Supplies</option>
                  <option value="Lab & Science Equipment">Lab & Science Equipment</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Facility Cleaning Supplies">Facility Cleaning Supplies</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Contact Person Name</label>
                <input type="text" required placeholder="e.g. Dr. Ray Palmer" value={newSupplier.contact} onChange={e => setNewSupplier({ ...newSupplier, contact: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="e.g. support@scihub.com" value={newSupplier.email} onChange={e => setNewSupplier({ ...newSupplier, email: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Phone Number (Optional)</label>
                <input type="text" placeholder="e.g. +1 555-9011" value={newSupplier.phone} onChange={e => setNewSupplier({ ...newSupplier, phone: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddSupplierModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE PURCHASE ORDER MODAL --- */}
      {showAddPOModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Create Purchase Order</h3>
              <button onClick={() => setShowAddPOModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddPO} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Select Partner Supplier</label>
                <select value={newPO.supplier} onChange={e => setNewPO({ ...newPO, supplier: e.target.value })}>
                  <option value="">-- Choose Supplier --</option>
                  {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="modal-form-group">
                <label>Supply Item Name</label>
                <input type="text" required placeholder="e.g. A4 Printing Paper (80gsm)" value={newPO.itemName} onChange={e => setNewPO({ ...newPO, itemName: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Ordered Quantity</label>
                <input type="number" required placeholder="e.g. 50" value={newPO.qty} onChange={e => setNewPO({ ...newPO, qty: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Procurement Type</label>
                <select value={newPO.type} onChange={e => setNewPO({ ...newPO, type: e.target.value as any })}>
                  <option value="Stock">Stock (Consumables/Inventory Level)</option>
                  <option value="Asset">Asset (High-Value Fixed Equipment)</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Total Valuation Amount ($)</label>
                <input type="number" required placeholder="e.g. 325" value={newPO.amount} onChange={e => setNewPO({ ...newPO, amount: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddPOModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Submit Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LOG ASSET ISSUE MODAL --- */}
      {showAddMaintModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Log Asset Issue</h3>
              <button onClick={() => setShowAddMaintModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddMaint} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Select Affected Asset</label>
                <select value={newMaint.assetId} onChange={e => setNewMaint({ ...newMaint, assetId: e.target.value })}>
                  <option value="">-- Choose Asset --</option>
                  {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.location})</option>)}
                </select>
              </div>
              <div className="modal-form-group">
                <label>Issue Description</label>
                <textarea rows={3} required placeholder="Detail the fault or defect detected..." value={newMaint.issue} onChange={e => setNewMaint({ ...newMaint, issue: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Repair Cost estimate ($)</label>
                <input type="number" required placeholder="e.g. 150" value={newMaint.cost} onChange={e => setNewMaint({ ...newMaint, cost: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Severity/Priority Level</label>
                <select value={newMaint.priority} onChange={e => setNewMaint({ ...newMaint, priority: e.target.value as any })}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddMaintModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Log Issue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LOG CONSUMABLE USAGE MODAL --- */}
      {showLogUsageModal && selectedConsumable && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Log Supply Consumption</h3>
              <button onClick={() => {
                setSelectedConsumable(null);
                setShowLogUsageModal(false);
              }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Item: <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedConsumable.name}</span><br />
              Remaining stock: <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedConsumable.remaining} {selectedConsumable.unit}</span>
            </div>
            <form onSubmit={handleLogUsage} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Used Quantity ({selectedConsumable.unit})</label>
                <input type="number" step="0.1" required placeholder={`e.g. 5`} value={usageQty} onChange={e => setUsageQty(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => {
                  setSelectedConsumable(null);
                  setShowLogUsageModal(false);
                }} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Record Usage</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default InventoryPage;
