import { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './services/api';
import { Plus, Pencil, Trash2, Search, X, Image as ImageIcon, Upload } from 'lucide-react';

function App() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: 0,
        price: 0,
        description: '',
        image: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data } = await getItems();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                await updateItem(currentItem._id, formData);
            } else {
                await createItem(formData);
            }
            fetchItems();
            closeModal();
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Failed to save item');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteItem(id);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setFormData({
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
                description: item.description,
                image: item.image || ''
            });
        } else {
            setCurrentItem(null);
            setFormData({ name: '', category: '', quantity: 0, price: 0, description: '', image: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            倉儲管理系統
                        </h1>
                        <p className="text-slate-400 mt-2">管理你的產品</p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 bg-primary hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/20"
                    >
                        <Plus size={20} /> Add Item
                    </button>
                </div>

                {/* Search */}
                <div className="mb-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-surface border border-slate-700 text-white pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Grid/Table */}
                {loading ? (
                    <div className="text-center text-slate-400 py-20">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div key={item._id} className="bg-surface border border-slate-700 rounded-2xl hover:border-slate-500 transition-all group shadow-xl overflow-hidden flex flex-col">
                                {item.image && (
                                    <div className="h-48 w-full overflow-hidden bg-slate-800">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-slate-700 text-xs text-slate-300 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                                            {item.category}
                                        </span>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{item.description}</p>

                                    <div className="flex justify-between items-center pt-4 border-t border-slate-700/50 mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs">數量</span>
                                            <span className={`font-mono font-medium ${item.quantity < 10 ? 'text-orange-400' : 'text-white'}`}>
                                                {item.quantity} units
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-emerald-400">
                                            ${item.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-surface border border-slate-700 w-full max-w-4xl rounded-2xl p-6 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">{currentItem ? 'Edit Item' : 'New Item'}</h2>
                                <button onClick={closeModal} className="text-slate-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
                                {/* Left Column: Form Inputs */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Category</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Price</label>
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Quantity</label>
                                        <input
                                            required
                                            type="number"
                                            min="0"
                                            className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.quantity}
                                            onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Description</label>
                                        <textarea
                                            className="w-full bg-background border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none h-24 resize-none"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Right Column: Image Upload */}
                                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                                    <label className="block text-sm text-slate-400">Product Image</label>

                                    <div className="flex-1 min-h-[200px] border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary transition-colors bg-background/50">
                                        {formData.image ? (
                                            <>
                                                <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <span className="text-white text-sm">Click to change</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-4">
                                                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                                                <p className="text-slate-400 text-sm">Upload Image</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>

                                    <p className="text-xs text-slate-500 text-center">
                                        Support: JPG, PNG, WEBP (Max 5MB)<br />
                                        建議使用正方形或橫向圖片
                                    </p>

                                    <button type="submit" className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors mt-auto shadow-lg shadow-emerald-500/20">
                                        {currentItem ? 'Save Changes' : 'Create Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
