// 1. Object dan Array
const produkLiteral = {
    id: 1,
    nama: "Kemeja Flanel",
    harga: 150000,
    stok: 5
};

const produkNewObj = new Object();
produkNewObj.id = 2;
produkNewObj.nama = "Sepatu Sneakers";
produkNewObj.harga = 300000;
produkNewObj.stok = 2;

let products = [
    produkLiteral,
    produkNewObj,
    { id: 3, nama: "Tas Ransel", harga: 200000, stok: 4 },
    { id: 4, nama: "Topi Baseball", harga: 50000, stok: 0 },
    { id: 5, nama: "Jam Tangan", harga: 450000, stok: 3 }
];

let cart = [];

// 2 & 3. DOM Selection
const productListEl = document.getElementsByClassName("product-grid")[0];
const cartListEl = document.getElementById("cart-list");
const cartSummaryEl = document.querySelector("#cart-summary");
const btnUndo = document.getElementById("btn-undo");
const btnCheckout = document.getElementById("btn-checkout");

// Fungsi untuk merender daftar produk
function renderProducts() {
    productListEl.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        let p = products[i];

        // DOM Manipulation: createElement, createTextNode, appendChild, dan penambahan kelas
        let cardDiv = document.createElement("div");
        cardDiv.className = "product-card";

        let titleEl = document.createElement("h3");
        titleEl.className = "product-card-title";
        titleEl.appendChild(document.createTextNode(p.nama));
        cardDiv.appendChild(titleEl);

        let priceEl = document.createElement("p");
        priceEl.className = "product-price";
        priceEl.appendChild(document.createTextNode(`Harga: Rp ${p.harga.toLocaleString()}`));
        cardDiv.appendChild(priceEl);

        let stockEl = document.createElement("p");
        stockEl.className = "product-stock";
        let stockText = p.stok > 0 ? `Stok: ${p.stok}` : "Stok Habis";
        stockEl.appendChild(document.createTextNode(stockText));
        
        // DOM Style dengan CamelCase
        if (p.stok === 0) {
            stockEl.style.color = "red";
            stockEl.style.fontWeight = "bold";
        } else {
            stockEl.style.color = "green";
            stockEl.style.backgroundColor = "#e8f5e9";
        }
        cardDiv.appendChild(stockEl);

        let addBtn = document.createElement("button");
        addBtn.className = "btn-add-cart";
        addBtn.appendChild(document.createTextNode("Tambah ke Keranjang"));
        
        addBtn.addEventListener("click", function() {
            tambahKeKeranjang(p.id);
        });

        cardDiv.appendChild(addBtn);
        productListEl.appendChild(cardDiv);
    }
}

// Fungsi untuk merender isi keranjang
function renderCart() {
    cartListEl.innerHTML = "";
    let totalHarga = 0;
    let totalItemCount = cart.length;

    for (let index in cart) {
        let item = cart[index];
        totalHarga += item.harga;

        let li = document.createElement("li");
        li.className = "cart-item";
        li.appendChild(document.createTextNode(`${item.nama} - Rp ${item.harga.toLocaleString()}`));

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete-item";
        deleteBtn.appendChild(document.createTextNode("Hapus"));
        deleteBtn.addEventListener("click", function() {
            let konfirmasi = confirm(`Apakah Anda yakin ingin menghapus ${item.nama} dari keranjang?`);
            if (konfirmasi) {
                hapusItemKeranjang(index);
            }
        });

        li.appendChild(deleteBtn);
        cartListEl.appendChild(li);
    }

    cartSummaryEl.innerHTML = `Jumlah Item: ${totalItemCount} | Total Harga: Rp ${totalHarga.toLocaleString()}`;
}

// Fungsi Tambah ke Keranjang
function tambahKeKeranjang(idProduk) {
    let produkDitemukan = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === idProduk) {
            produkDitemukan = products[i];
            break;
        }
    }

    if (produkDitemukan) {
        if (produkDitemukan.stok <= 0) {
            alert("Maaf, stok produk ini sudah habis!");
            return;
        }

        produkDitemukan.stok -= 1;
        cart.push(produkDitemukan);

        renderProducts();
        renderCart();
    }
}

// Fungsi Hapus Item dari keranjang
function hapusItemKeranjang(index) {
    let itemDihapus = cart.splice(index, 1)[0];
    
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === itemDihapus.id) {
            products[i].stok += 1;
            break;
        }
    }

    renderProducts();
    renderCart();
}

// Tombol Undo (pop)
btnUndo.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
    }

    let konfirmasi = confirm("Batalkan item terakhir yang dimasukkan ke keranjang?");
    if (konfirmasi) {
        let removedItem = cart.pop();
        
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === removedItem.id) {
                products[i].stok += 1;
                break;
            }
        }

        renderProducts();
        renderCart();
    }
});

// Tombol Checkout (prompt)
btnCheckout.addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong, tidak dapat melakukan checkout!");
        return;
    }

    let namaPembeli = prompt("Masukkan nama pembeli:");
    if (namaPembeli) {
        let daftarNamaItem = [];
        let totalHarga = 0;
        for (let i = 0; i < cart.length; i++) {
            daftarNamaItem.push(cart[i].nama);
            totalHarga += cart[i].harga;
        }

        let ringkasanItem = daftarNamaItem.join(", ");

        alert(
            `=== RINGKASAN PESANAN ===\n` +
            `Nama Pembeli: ${namaPembeli}\n` +
            `Daftar Item: ${ringkasanItem}\n` +
            `Total Harga: Rp ${totalHarga.toLocaleString()}`
        );

        cart = [];
        renderCart();
    }
});

// Inisialisasi awal
renderProducts();
renderCart();