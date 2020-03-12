import { refreshTokenApi } from "@/api/modules";

export function camel(str) {
  const camel = (str || "").replace(/-([^-])/g, g => g[1].toUpperCase());

  return capitalize(camel);
}

export function camelActual(str) {
  return (str || "").replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function kebab(str) {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function capitalize(str) {
  str = str || "";

  return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
}

export function getLongId(id) {
  // btoa() but for node
  return Buffer.from(`gid://shopify/Product/${id}`, "binary").toString(
    "base64"
  );
}

export function findProduct(store, id) {
  return store.state.store.products.find(p => p.id === id);
}

export function isOnSale(variants) {
  return variants.some(variant => {
    return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
  });
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomString(length = 5) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

// Must be called in Vue context
export function goTo(id) {
  this.$vuetify.goTo(id).then(() => {
    if (!id) {
      return (document.location.hash = "");
    }

    if (history.replaceState) {
      history.replaceState(null, null, id);
    } else {
      document.location.hash = id;
    }
  });
}

export function getCardType(number) {
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null) return "Visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return "Mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) return "AMEX";

  // Discover
  re = new RegExp(
    "^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)"
  );
  if (number.match(re) != null) return "Discover";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null) return "Diners";

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null) return "Diners - Carte Blanche";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null) return "JCB";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null) return "Visa Electron";

  return "";
}

export async function refreshToken() {
  const { refresh_token } = localStorage;
  let serviceResponse = await refreshTokenApi(refresh_token);
  console.log(serviceResponse);
  if (serviceResponse.ok) {
    localStorage.access_token = serviceResponse.data.access_token;
  } else {
    const params = { text: serviceResponse.message.text };
    window.getApp.$emit("SHOW_ERROR", params);
  }
}

function getCurrentPosition(options = { timeout: 1000 }) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function isGPSEnabled() {
  return new Promise((resolve, reject) => {
    /* eslint-disable-next-line no-undef */
    cordova.plugins.diagnostic.isLocationEnabled(resolve, reject);
  });
}

export const getLatAndLongGeolocation = async () => {
  try {
    const enabled = await isGPSEnabled();
    if (enabled) {
      const { coords } = await getCurrentPosition();
      const { latitude, longitude } = coords;
      const geolocation = [latitude, longitude];
      localStorage.geolocation = geolocation;
      return geolocation;
    } else return null;
  } catch (error) {
    return null;
  }
};
