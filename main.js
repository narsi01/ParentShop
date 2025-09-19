// Segment analytics event demo for ParentShop

// Cart functionality
let cart = [];

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

function openCartModal() {
  renderCart();
  document.getElementById('cartModal').style.display = 'block';
}

function closeCartModal() {
  document.getElementById('cartModal').style.display = 'none';
}

function renderCart() {
  const cartItemsList = document.getElementById('cartItems');
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} (${item.qty})</span>
      <span>
        $${(item.price * item.qty).toFixed(2)}
        <button class="removeItem" data-idx="${idx}">Remove</button>
      </span>
    `;
    cartItemsList.appendChild(li);
    total += item.price * item.qty;
  });
  document.getElementById('cartTotal').textContent = cart.length ? `Total: $${total.toFixed(2)}` : '';
  // Remove buttons
  document.querySelectorAll('.removeItem').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(btn.getAttribute('data-idx'));
      analytics.track('Cart Item Removed', {
        product: cart[idx].name,
        price: cart[idx].price,
        qty: cart[idx].qty
      });
      cart.splice(idx, 1);
      updateCartCount();
      renderCart();
    });
  });
}

// Navigation tracking
document.getElementById('navProducts').addEventListener('click', function() {
  analytics.track('Navigation Click', {
    section: 'Shop',
    location: 'Header'
  });
});
document.getElementById('navAbout').addEventListener('click', function() {
  analytics.track('Navigation Click', {
    section: 'About Us',
    location: 'Header'
  });
});
document.getElementById('navNewsletter').addEventListener('click', function() {
  analytics.track('Navigation Click', {
    section: 'Newsletter',
    location: 'Header'
  });
});

// Hero "Shop Now" button tracking
document.getElementById('shopNowBtn').addEventListener('click', function() {
  analytics.track('Shop Now Clicked', {
    location: 'Hero',
    action: 'Shop Now'
  });
  // Scroll to products
  document.getElementById('products').scrollIntoView({behavior: 'smooth'});
});

// Product add to cart buttons tracking and functionality
document.querySelectorAll('.addToCartBtn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var card = e.target.closest('.product-card');
    var productName = card.getAttribute('data-product');
    var price = parseFloat(card.getAttribute('data-price'));
    var found = cart.find(item => item.name === productName);
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ name: productName, price: price, qty: 1 });
    }
    updateCartCount();
    analytics.track('Product Added to Cart', {
      product: productName,
      price: price,
      section: 'Featured Products'
    });
    btn.textContent = 'Added!';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
    }, 1200);
  });
});

// Cart modal events
document.getElementById('cartBtn').addEventListener('click', openCartModal);
document.getElementById('closeCartModal').addEventListener('click', closeCartModal);
window.addEventListener('click', function(event) {
  if (event.target == document.getElementById('cartModal')) {
    closeCartModal();
  }
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', function() {
  if (!cart.length) return;
  analytics.track('Cart Checkout', {
    cart: cart
  });
  alert('Thank you for your purchase! (Demo only)');
  cart = [];
  updateCartCount();
  renderCart();
  closeCartModal();
});

// Newsletter form tracking
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var email = document.getElementById('emailInput').value;
  analytics.track('Newsletter Signup', {
    email: email,
    source: 'Footer Form'
  });
  document.getElementById('newsletterSuccess').style.display = 'block';
  document.getElementById('newsletterForm').reset();
  setTimeout(()=>{
    document.getElementById('newsletterSuccess').style.display = 'none';
  }, 3500);
});

// Track page view (redundant, but explicit for demo)
analytics.page('ParentShop Homepage', {
  site: 'ParentShop',
  category: 'Homepage'
});

// Initial cart count
updateCartCount();