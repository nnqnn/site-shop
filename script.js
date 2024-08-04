function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

const products = {
  "product1": {
    "title": "Gothic Jacket",
    "price": "$120.00",
    "description": "This Gothic Jacket is perfect for making a statement. Made from high-quality materials, it ensures comfort and style. The intricate design and attention to detail make it a must-have for your wardrobe.",
    "images": ["pins/product1.jpg", "pins/product1_2.jpg", "pins/product1_3.jpg"]
  },
  "product2": {
    "title": "Punk Boots",
    "price": "$150.00",
    "description": "These Punk Boots are bold and stylish, perfect for any punk rock outfit. Crafted from durable materials, they offer both comfort and longevity.",
    "images": ["pins/product2.jpg", "pins/product2_2.jpg", "pins/product2_3.jpg"]
  },
  "product3": {
    "title": "Vintage Dress",
    "price": "$80.00",
    "description": "This Vintage Dress brings back the charm of the old days with a modern twist. Perfect for any occasion, it is sure to make you stand out.",
    "images": ["pins/product3.jpg", "pins/product3_2.jpg", "pins/product3_3.jpg"]
  },
  "product4": {
    "title": "Leather Gloves",
    "price": "$50.00",
    "description": "These Leather Gloves are the perfect accessory for any outfit. Made from premium leather, they provide both style and warmth.",
    "images": ["pins/product4.jpg", "pins/product4_2.jpg", "pins/product4_3.jpg"]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const productItems = document.querySelectorAll('.product-item');

  productItems.forEach((item, index) => {
      const img = item.querySelector('img');
      const originalSrc = img.src;
      const hoverSrc = originalSrc.replace('.jpg', '_2.jpg');

      item.addEventListener('mouseover', () => {
          img.src = hoverSrc;
      });

      item.addEventListener('mouseout', () => {
          img.src = originalSrc;
      });

      item.addEventListener('click', () => {
          const productId = 'product' + (index + 1);
          window.location.href = 'product.html?id=' + productId;
      });
  });

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (productId && products[productId]) {
      const product = products[productId];
      document.getElementById('product-title').innerText = product.title;
      document.getElementById('product-price').innerText = product.price;
      document.getElementById('product-description').innerText = product.description;
      const mainImage = document.getElementById('main-image');
      mainImage.src = product.images[0];
      const thumbnailContainer = document.getElementById('thumbnail-images');
      product.images.forEach(image => {
          const thumbImg = document.createElement('img');
          thumbImg.src = image;
          thumbImg.alt = product.title;
          thumbImg.onclick = () => {
              mainImage.src = image;
          };
          thumbnailContainer.appendChild(thumbImg);
      });

      // Добавить обработчик событий для зума
      mainImage.addEventListener('click', () => {
          if (mainImage.classList.contains('zoomed')) {
              mainImage.classList.remove('zoomed');
          } else {
              mainImage.classList.add('zoomed');
          }
      });
  }
});



function changeImage(src) {
  document.getElementById('main-image').src = src;
}
