const prices = {};

// Replace with your Firebase project config.
const firebaseConfig = {
  apiKey: "AIzaSyC5sPU61Wb6ifX7boVXarrTf4QCuBsLWPY",
  authDomain: "audio-vis.firebaseapp.com",
  databaseURL: "https://audio-vis-default-rtdb.firebaseio.com",
  projectId: "audio-vis",
  storageBucket: "audio-vis.appspot.com",
  messagingSenderId: "1017980115013",
  appId: "1:1017980115013:web:6e459dfa9e7f40a8c82b2c",
};

// Replace with your cloud functions location
const functionLocation = 'us-east4';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

/**
 * Firebase Authentication configuration
 */
const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
const firebaseUiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: () => {
      document.querySelector('#loader').style.display = 'none';
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/subscription/index.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // Your terms of service url.
  tosUrl: 'https://soundvisualiser.com/#/terms',
  // Your privacy policy url.
  privacyPolicyUrl: 'https://soundvisualiser.com/#/privacy-policy',
};
firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser) {
    document.querySelector('#loader').style.display = 'none';
    document.querySelector('main').style.display = 'block';
    currentUser = firebaseUser.uid;
    startDataListeners();
  } else {
    document.getElementById('signout').style.display = 'none';
    firebaseUI.start('#firebaseui-auth-container', firebaseUiConfig);
  }
});

/**
 * Data listeners
 */
function startDataListeners() {
  // Get all our products and render them to the page
  const products = document.querySelector('.products');
  const template = document.querySelector('#product');
  db.collection('products')
    .where('active', '==', true)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        const priceSnap = await doc.ref
          .collection('prices')
          .where('active', '==', true)
          .orderBy('unit_amount')
          .get();
        if (!'content' in document.createElement('template')) {
          console.error('Your browser doesn’t support HTML template elements.');
          return;
        }

        const product = doc.data();
        const container = template.content.cloneNode(true);

        container.querySelector('h2').innerText = product.name;
        container.querySelector('.description').innerText =
          product.description || '';
        // Prices dropdown
        priceSnap.docs.forEach((doc) => {
          const priceId = doc.id;
          const priceData = doc.data();
          prices[priceId] = priceData;
          const content = document.createTextNode(
            `${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: priceData.currency,
              minimumFractionDigits: priceData.currency.toLowerCase() === 'jpy' ? 0 : 2, // Set minimumFractionDigits to 0 for JPY
            }).format(
              priceData.currency.toLowerCase() === 'jpy' ?
                ((priceData.unit_amount).toFixed(0)) :
                ((priceData.unit_amount / 100).toFixed(2))

            )}`
          );
          const option = document.createElement('option');
          option.value = priceId;
          option.appendChild(content);
          container.querySelector('#price').appendChild(option);
        });
        container.querySelector('#price').options[5].selected = true;
        reorderPriceOptionsBasedOnUserCurrency(container);
        if (product.images.length) {
          const img = container.querySelector('img');
          img.src = product.images[0];
          img.alt = product.name;
        }

        const form = container.querySelector('form');
        form.addEventListener('submit', subscribe);

        products.appendChild(container);
      });
    });
  // Get all subscriptions for the customer
  db.collection('customers')
    .doc(currentUser)
    .collection('payments')
    .onSnapshot(async (snapshot) => {
      if (snapshot.empty) {
        // Show products
        document.querySelector('#subscribe').style.display = 'block';
        return;
      }
      document.querySelector('#subscribe').style.display = 'none';
      document.querySelector('#my-subscription').style.display = 'block';
      // In this implementation we only expect one Subscription to exist
      const priceData = snapshot.docs[0].data();
      localStorage.setItem('u_role', "advanced");
      document.querySelector(
        '#my-subscription p'
      ).textContent = `You paid ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: priceData.currency,
      }).format((priceData.amount_received / 100).toFixed(2))}, giving you the role: advanced user. 🥳`;
    });
}

async function reorderPriceOptionsBasedOnUserCurrency(container) {
  const priceSelect = container.querySelector('#price'); // or '.price-select' if you switch to class
  const userCurrency = await getUserCurrency(); // Assume this function exists and returns something like "USD"
  // Assume `container` is the parent element that contains your price dropdown

  // Find the option that matches the user's currency
  for (let i = 0; i < priceSelect.options.length; i++) {
    const option = priceSelect.options[i];
    if (prices[option.value].currency.toLowerCase() === userCurrency.toLowerCase()) {
      option.selected = true;
      // Move this option to the front
      priceSelect.prepend(option);
      break; // Stop the loop once the matching option is found and moved
    }
  }
}

async function getUserCurrency() {
  const countryCode = await fetchUserCountry();
  // Default to USD if the country code is not found or an error occurred
  const currency = countryCurrencyMap[countryCode] || 'USD';
  return currency;
}

const countryCurrencyMap = {
  // Eurozone countries
  "AT": "EUR", "BE": "EUR", "CY": "EUR", "EE": "EUR",
  "FI": "EUR", "FR": "EUR", "DE": "EUR", "GR": "EUR",
  "IE": "EUR", "IT": "EUR", "LV": "EUR", "LT": "EUR",
  "LU": "EUR", "MT": "EUR", "NL": "EUR", "PT": "EUR",
  "SK": "EUR", "SI": "EUR", "ES": "EUR", "VA": "EUR",

  // Countries officially using the US Dollar
  "US": "USD", "EC": "USD", "SV": "USD", "PA": "USD",
  "TL": "USD", "FM": "USD", "MH": "USD", "PW": "USD",
  "ZW": "USD",

  // Specific countries
  "CH": "CHF", // Switzerland
  "JP": "JPY", // Japan
  "IN": "INR", // India
  "GB": "GBP", // United Kingdom
  "RU": "RUB", // Russia
  "PH": "PHP", // Philippines
  "CA": "CAD", // Canada
};

async function fetchUserCountry() {
  try {
    const response = await fetch('https://api.country.is/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.country; // Returns the country code, e.g., "US"
  } catch (error) {
    console.error('Error fetching the user country:', error);
    return null; // Handle the error as appropriate for your application
  }
}

/**
 * Event listeners
 */

// Signout button
document
  .getElementById('signout')
  .addEventListener('click', () => {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('u_picture');
    localStorage.removeItem('u_role');
    location.reload();
  });

// Checkout handler
async function subscribe(event) {
  event.preventDefault();
  document.querySelectorAll('button').forEach((b) => (b.disabled = true));
  const formData = new FormData(event.target);
  const selectedPrice = {
    price: formData.get('price'),
  };
  // For prices with metered billing we need to omit the quantity parameter.
  // For all other prices we set quantity to 1.
  if (prices[selectedPrice.price]?.recurring?.usage_type !== 'metered')
    selectedPrice.quantity = 1;
  const checkoutSession = {
    automatic_tax: true,
    tax_id_collection: true,
    collect_shipping_address: true,
    allow_promotion_codes: true,
    line_items: [selectedPrice],
    success_url: window.location.origin + '/subscription/index.html',
    cancel_url: window.location.origin + '/subscription/index.html',
    metadata: {
      key: 'value',
    },
  };
  // For one time payments set mode to payment.
  if (prices[selectedPrice.price]?.type === 'one_time') {
    checkoutSession.mode = 'payment';
    checkoutSession.payment_method_types = ['card'];
  }

  const docRef = await db
    .collection('customers')
    .doc(currentUser)
    .collection('checkout_sessions')
    .add(checkoutSession);
  // Wait for the CheckoutSession to get attached by the extension
  docRef.onSnapshot((snap) => {
    const { error, url } = snap.data();
    if (error) {
      // Show an error to your customer and then inspect your function logs.
      alert(`An error occured: ${error.message}`);
      document.querySelectorAll('button').forEach((b) => (b.disabled = false));
    }
    if (url) {
      window.location.assign(url);
    }
  });
}

// Billing portal handler
document
  .querySelector('#billing-portal-button')
  .addEventListener('click', async (event) => {
    document.querySelectorAll('button').forEach((b) => (b.disabled = true));

    // Call billing portal function
    const functionRef = firebase
      .app()
      .functions(functionLocation)
      .httpsCallable('ext-firestore-stripe-payments-createPortalLink');
    const { data } = await functionRef({
      returnUrl: window.location.origin + '/subscription/index.html',
      cancel_url: window.location.origin + '/subscription/index.html'
    });
    window.location.assign(data.url);
  });

// Get custom claim role helper
async function getCustomClaimRole() {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
  return decodedToken.claims.stripeRole;
}


// Special offers handler
displaySpecialOffer();
function displaySpecialOffer() {
  var couponCode = getCouponCode();
  var specialOffers = {
    "NEWYEAR20": { title: "Celebrate the New Year with Sound!", description: "Start the year on a high note with our digital sound visualizer. Get 20% off today with code: <b>NEWYEAR20</b>" },
    "TECHDAY20": { title: "Happy Tech Day!", description: "On National Technology Day, dive into the realm of sound visualization. Enjoy 20% off with code: <b>TECHDAY20</b>" },
    "LOVE20": { title: "Share the Love of Sound", description: "Celebrate Valentine's Day with music and visuals. Treat your loved ones (or yourself) to 20% off using code: <b>LOVE20</b>" },
    "HAPPY25": { title: "Spread Joy Through Sound", description: "In honor of International Day of Happiness, immerse yourself in the joy of music. Enjoy 25% off today with code: <b>HAPPY25</b>" },
    "MUSICDAY30": { title: "Let Music Paint Your World", description: "Join the celebration of World Music Day and experience sound in a new light. Save 30% with code: <b>MUSICDAY30</b>" },
    "SWISS20": { title: "Happy Swiss National Day!", description: "On Swiss National Day, discover the precision and quality of our sound visualizer. Enjoy 20% off using code: <b>SWISS20</b>" },
    "SOUNDVISUALISERANNIVERSARY": { title: "Today is Soundvisualiser.com's Birthday!", description: "Celebrate our anniversary with 30% off our sound visualizer using code: <b>SOUNDVISUALISERANNIVERSARY</b>" },
    "READ20": { title: "Read Between the Sounds", description: "In honor of International Literacy Day, explore the language of music with our visualizer. Get 20% off with code: <b>READ20</b>" },
    "SPOOKY20": { title: "Spooky Scary Sounds", description: "Get into the Halloween spirit with eerie sounds and visuals. Enjoy 20% off today using code: <b>SPOOKY20</b>" },
    "BLACKFRIDAY30": { title: "Black Friday Sale!", description: "Score big savings on Black Friday! Take 30% off our sound visualizer with code: <b>BLACKFRIDAY30</b>" },
    "XMAS20": { title: "Jingle All the Way with Sound", description: "Make your holidays merry and bright with sound and visuals. Save 20% throughout the Christmas season using code: <b>XMAS20</b>" }
  }

  if (couponCode !== null) {
    var specialOffer = specialOffers[couponCode];
    if (specialOffer) {
      var specialOfferTitle = document.getElementById("special-offer-title");
      var specialOfferDescription = document.getElementById("special-offer-description");
      specialOfferTitle.innerHTML = specialOffer.title;
      specialOfferDescription.innerHTML = specialOffer.description;
      var specialOfferContainer = document.getElementById("special-offer");
      specialOfferContainer.style.display = "inherit";
    }
  }
}

function getCouponCode() {
  var currentDate = new Date();
  var month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
  var day = currentDate.getDate();

  var couponCodes = {
    "31.12": "NEWYEAR20",
    "1.1": "NEWYEAR20",
    "6.1": "TECHDAY20",
    "14.2": "LOVE20",
    "20.3": "HAPPY25",
    "21.6": "MUSICDAY30",
    "1.8": "SWISS20",
    "18.8": "SOUNDVISUALISERANNIVERSARY",
    "8.9": "READ20",
    "31.10": "SPOOKY20",
    "20.12": "XMAS20",
    "21.12": "XMAS20",
    "22.12": "XMAS20",
    "23.12": "XMAS20",
    "24.12": "XMAS20",
    "25.12": "XMAS20",
    "26.12": "XMAS20",
  };

  // Calculate Black Friday (last Friday of November)
  var blackFriday = new Date(currentDate.getFullYear(), 10, 30); // Month is zero-based (0-11), so 10 represents November
  while (blackFriday.getDay() !== 5) { // 5 represents Friday
    blackFriday.setDate(blackFriday.getDate() - 1); // Move to the previous day
  }
  var bfMonth = blackFriday.getMonth() + 1;
  var bfDay = blackFriday.getDate();
  couponCodes[bfDay + "." + bfMonth] = "BLACKFRIDAY30";

  // Generate key in the format "month/day"
  var key = day + "." + month;

  // Check if coupon code exists for the current date
  if (couponCodes[key]) {
    return couponCodes[key];
  } else {
    return null;
  }
}