import React from "react";

const HomeUser = () => {
  const categories = [
    { name: "Obat Bebas & Resep", icon: "/Vector.png" },
    { name: "Nutrisi & Vitamin", icon: "/Vector (2).png" },
    { name: "Kecantikan & Perawatan", icon: "/beauty 1.png" },
    { name: "Obat-Obatan", icon: "/maeds 1.png" },
    { name: "Perawatan Diri", icon: "/personal care 1.png" },
    { name: "Herbal", icon: "/home-healthcare 1.png" },
  ];

  const products = [
    { name: "Zyrtec", price: "Rp 65.000", image: "/Group 1697.png" },
    { name: "Betadine Obat Kumur", price: "Rp 25.000", image: "/product52 2.png" },
    { name: "Panadol", price: "Rp 17.500", image: "/product52 1.png" },
    { name: "Mucosolvan", price: "Rp 22.500", image: "/product52 1 (4).png" },
    { name: "Softin", price: "Rp 30.000", image: "/product52 1 (3).png" },
    { name: "Brufen", price: "Rp 15.000", image: "/product52 1 (2).png" },
    { name: "Panadol Children", price: "Rp 40.000", image: "/product52 1 (1).png" },
  ];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0"></div>
            <div className="w-lg:w-1/2">
              <img src="/image 10.png" alt="Hero" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-teal-50 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img src={category.icon} alt={category.name} className="w-12 h-12 mb-3" />
                <span className="text-gray-800 font-semibold text-center text-sm">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Promo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div key={index} className="bg-white border rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-800 font-medium text-lg mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <p className="text-teal-600 font-bold mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeUser;
