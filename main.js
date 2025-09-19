// Segment analytics event demo for ParentShop

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

// Product add to cart buttons tracking
document.querySelectorAll('.addToCartBtn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var card = e.target.closest('.product-card');
    var productName = card.getAttribute('data-product');
    var price = card.querySelector('.price').textContent.replace('$','');
    analytics.track('Product Added to Cart', {
      product: productName,
      price: parseFloat(price),
      section: 'Featured Products'
    });
    btn.textContent = 'Added!';
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
    }, 1200);
  });
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