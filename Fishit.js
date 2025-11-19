import React, { useState, useMemo } from 'react';
import { Search, Fish, Tag, Filter, ShoppingCart, Phone, Info, Coins } from 'lucide-react';

// Data Mockup Barang (Dikemas kini dengan kategori Ikan Secret & Koin)
const DATA_BARANG = [
  { id: 1, nama: "Big Shiny Ancient Lochness Monsters", kategori: "Ikan Secret", harga: 60000, stok: 1, unit: "Ukuran 381K Kg", image: "https://tr.rbxcdn.com/180DAY-7263c3f92e0b0384f3bd09f1bbb1ca7c/420/420/Image/Png/noFilter" }, 
  { id: 2, nama: "Big Megalodon", kategori: "Ikan Secret", harga: 35000, stok: 1, unit: "Ukuran 434K Kg", image: "https://tr.rbxcdn.com/180DAY-4f77aa0bcdcfa908e42bad55c2544b79/420/420/Image/Png/noFilter" }, 
  { id: 3, nama: "Elshark Gran Maja", kategori: "Ikan Secret", harga: 30000, stok: 1, unit: "Ukuran 554K Kg", image: "https://d1x91p7vw3vuq8.cloudfront.net/itemku-upload/20251020/7uilk36rpv6gk2pibkb8wc_thumbnail.jpg" }, 
  { id: 4, nama: "Big King Jelly", kategori: "Ikan Secret", harga: 10000, stok: 1, unit: "Ukuran 181K Kg", image: "https://tr.rbxcdn.com/180DAY-92fc8bfa788c39623c28f22b0706adc0/420/420/Image/Png/noFilter" },
  { id: 5, nama: "Ikan Secret Tumbal", kategori: "Ikan Secret", harga: 5000, stok: 10, unit: "Ekor", image: "https://tr.rbxcdn.com/180DAY-95e31005ee70d0dd081590e066e2d8a8/420/420/Image/Png/noFilter" },
  { id: 8, nama: "Koin Via Ikan Mytos", kategori: "Koin", harga: 8000, stok: 10, unit: "1m", image: "https://tr.rbxcdn.com/180DAY-030ff045c8ccceca1c0b19b24201e1a8/420/420/Image/Png/noFilter" }, 
];

const App = () => {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriTerpilih, setKategoriTerpilih] = useState("Semua");

  // Mengubah list kategori menjadi statik sesuai permintaan
  const listKategori = ["Semua", "Ikan Secret", "Koin"];

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Logika Filter
  const barangDitampilkan = useMemo(() => {
    return DATA_BARANG.filter(item => {
      const cocokKategori = kategoriTerpilih === "Semua" || item.kategori === kategoriTerpilih;
      const cocokKataKunci = item.nama.toLowerCase().includes(kataKunci.toLowerCase());
      return cocokKategori && cocokKataKunci;
    });
  }, [kataKunci, kategoriTerpilih]);

  // Komponen Badge Stok
  const StockBadge = ({ stok }) => {
    if (stok === 0) {
      return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-200">Stok Habis</span>;
    } else if (stok < 10) {
      return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-200">Stok Menipis: {stok}</span>;
    } else {
      return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-200">Tersedia: {stok}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      {/* --- Navbar --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Fish className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900 leading-tight">IkanKu</h1>
                <p className="text-xs text-gray-500">Jualan Ikan dan Koin dari IkanKu</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-1 text-sm text-gray-600 font-medium">
                <Coins className="h-5 w-5" />
                <span>1.250</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Katalog Produk Ikan</h2>
          <p className="mt-2 text-lg text-gray-600">Temukan Ikan Secret dan Koin dengan harga terbaik hari ini</p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-20 z-40">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Cari produk (misal: Megalodon)..."
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none cursor-pointer"
                value={kategoriTerpilih}
                onChange={(e) => setKategoriTerpilih(e.target.value)}
              >
                {listKategori.map((kat, index) => (
                  <option key={index} value={kat}>{kat}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {barangDitampilkan.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {barangDitampilkan.map((item) => (
              <div key={item.id} className={`group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ${item.stok === 0 ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                
                {/* Image Placeholder Area */}
                <div className="h-40 bg-blue-50 flex items-center justify-center relative">
                  {/* Menggunakan tag img jika image adalah URL, atau text jika emoji */}
                  {item.image.startsWith('http') ? (
                    <img src={item.image} alt={item.nama} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-6xl">{item.image}</span>
                  )}
                  <div className="absolute top-3 right-3">
                    <StockBadge stok={item.stok} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-3 h-3 text-blue-500" />
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{item.kategori}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{item.nama}</h3>
                  
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-sm text-gray-500">Harga:</span>
                    <span className="text-xl font-bold text-gray-900">{formatRupiah(item.harga)}</span>
                    <span className="text-xs text-gray-500">/{item.unit}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                     <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Info size={14} />
                        <span>Unit: <b>{item.unit}</b></span>
                     </div>
                     
                     <button 
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        item.stok > 0 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={item.stok === 0}
                      onClick={() => {
                        const nomorWA = "6289527072944";
                        const pesan = `Halo Admin IkanKu, saya ingin memesan:\n\nProduk: *${item.nama}*\nJumlah: 1\n\nMohon info total harganya. Terima kasih!`;
                        const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
                        window.open(url, '_blank');
                      }}
                     >
                       <Phone size={16} />
                       {item.stok > 0 ? 'Pesan' : 'Habis'}
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <Search size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Produk tidak ditemukan</h3>
            <p className="mt-1 text-gray-500">Coba cari dengan kata kunci lain atau ubah filter kategori.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 IkanKu Inventory System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;