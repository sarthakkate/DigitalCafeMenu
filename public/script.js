// function changeQty(btn, delta) {
//   const qtySpan = btn.parentElement.querySelector(".qty");
//   let qty = parseInt(qtySpan.textContent);
//   qty = Math.max(0, Math.min(10, qty + delta)); // Keep between 0–10
//   qtySpan.textContent = qty;
//   updateTotal();
// }

// function updateTotal() {
//   const items = document.querySelectorAll(".item");
//   let total = 0;

//   items.forEach(item => {
//     const price = parseInt(item.dataset.price);
//     const qty = parseInt(item.querySelector(".qty").textContent);
//     total += price * qty;
//   });

//   document.getElementById("totalPrice").textContent = total;
// }

// function placeOrder() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const tableNumber = urlParams.get("table") || "Unknown";

//   const items = document.querySelectorAll(".item");
//   let message = `🧾 *Order - Table ${tableNumber}*\n\n`;
//   let total = 0;
//   let anyItem = false;

//   items.forEach(item => {
//     const name = item.dataset.name;
//     const price = parseInt(item.dataset.price);
//     const qty = parseInt(item.querySelector(".qty").textContent);

//     if (qty > 0) {
//       message += `- ${name} x ${qty} = ₹${price * qty}\n`;
//       total += price * qty;
//       anyItem = true;
//     }
//   });

//   if (!anyItem) {
//     alert("Please select at least one item.");
//     return;
//   }

//   message += `\n💰 *Total: ₹${total}*`;

//   const phone = "918888749134"; // Your WhatsApp number
//  // Replace with owner's WhatsApp number
//   const encoded = encodeURIComponent(message);
//   const link = `https://wa.me/${phone}?text=${encoded}`;

//   window.open(link, "_blank");
// }
