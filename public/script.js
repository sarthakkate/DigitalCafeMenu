// JavaScript for the Cafe Menu Web App

document.addEventListener('DOMContentLoaded', () => {
    const tableNumberElement = document.getElementById('table-number');
    const tableInput = document.getElementById('table-input');
    const tableAttentionInput = document.getElementById('table-attention-input');
    const totalElement = document.getElementById('total-price');
    const orderDetailsInput = document.getElementById('order-details-input');
    const finalTotalPriceInput = document.getElementById('final-total-price-input');
    const notesInput = document.getElementById('notes');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const attentionBtn = document.querySelector('.attention-btn');

    // --- Owner's WhatsApp Number ---
    const ownerWhatsAppNumber = '918888749134';

    // --- Get table number from URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const tableNo = urlParams.get('table');
    
    if (tableNo) {
        tableNumberElement.textContent = `Table No: ${tableNo}`;
        tableInput.value = tableNo;
        tableAttentionInput.value = tableNo;
    } else {
        tableNumberElement.textContent = `Table No: (Not Found - Please scan QR)`;
    }

    // --- Handle quantity and price updates ---
    const menuItems = document.querySelectorAll('.menu-item');
    let total = 0;

    function updateTotal() {
        totalElement.textContent = total.toFixed(2);
        finalTotalPriceInput.value = total.toFixed(2);
    }

    function updateOrderDetails() {
        let details = '';
        menuItems.forEach(item => {
            const itemName = item.querySelector('.item-name').textContent.split('(')[0].trim();
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            if (quantity > 0) {
                details += `${itemName} (x${quantity}), `;
            }
        });
        orderDetailsInput.value = details.length > 0 ? details.slice(0, -2) : '';
    }

    menuItems.forEach(item => {
        const plusBtn = item.querySelector('.plus-btn');
        const minusBtn = item.querySelector('.minus-btn');
        const quantitySpan = item.querySelector('.quantity');
        const price = parseFloat(item.getAttribute('data-price'));

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity < 10) {
                quantity++;
                quantitySpan.textContent = quantity;
                total += price;
                updateTotal();
                updateOrderDetails();
            }
        });

        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 0) {
                quantity--;
                quantitySpan.textContent = quantity;
                total -= price;
                updateTotal();
                updateOrderDetails();
            }
        });
    });

    // --- Handle Place Order button click (WhatsApp) ---
    placeOrderBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const currentTableNo = tableInput.value;
        const currentOrderDetails = orderDetailsInput.value;
        const currentTotalPrice = totalElement.textContent;
        const currentNotes = notesInput.value.trim();

        if (!currentOrderDetails && !currentNotes) {
            alert('Please select some items or add notes before placing an order.');
            return;
        }

        let whatsappMessage = `*New Order from Tasty Corner*\n`;
        whatsappMessage += `*Table No:* ${currentTableNo}\n`;
        whatsappMessage += `*Order:* ${currentOrderDetails}\n`;
        whatsappMessage += `*Total:* ₹${currentTotalPrice}\n`;
        if (currentNotes) {
            whatsappMessage += `*Notes:* ${currentNotes}\n`;
        }
        whatsappMessage += `\n_Please confirm this order with the customer._`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    });

    // --- Handle Call for Attention button click (Coming Soon message) ---
    attentionBtn.addEventListener('click', (event) => {
        event.preventDefault();
        alert('The "Call for Attention" feature is currently being worked on and will be unlocked soon! Thank you for your patience.');
    });

    // Initial update
    updateTotal();
    updateOrderDetails();
});
