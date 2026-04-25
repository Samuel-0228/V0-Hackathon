'use client';

import { Navigation } from '@/components/navigation';
import { supabase, type Product } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Plus } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const { error } = await supabase.from('products').insert({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
      in_stock: true,
    });

    if (!error) {
      setFormData({ name: '', category: '', price: '', description: '' });
      setShowAddForm(false);
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);

      if (!error) {
        fetchProducts();
      }
    }
  };

  const categories = ['Blazers', 'Dresses', 'Trousers', 'Tops', 'Shoes', 'Coats'];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Inventory Management</h1>
            <p className="text-gray-600">Manage your product catalog and inventory</p>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Add Form */}
          {showAddForm && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-bold text-black mb-6">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Black Silk Dress"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="e.g., 199.99"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Product details"
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  onClick={handleAddProduct}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Save Product
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Products Table */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block p-3 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-4">Add your first product to get started</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-black text-white hover:bg-gray-800"
              >
                Add Product
              </Button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Product Name
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-700">
                          {product.category}
                        </td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                          ${product.price}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              product.in_stock
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center gap-2">
                            <button
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              aria-label="Edit product"
                            >
                              <Edit2 size={18} className="text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              aria-label="Delete product"
                            >
                              <Trash2 size={18} className="text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
