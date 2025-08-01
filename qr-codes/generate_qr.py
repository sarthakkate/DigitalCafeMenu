import qrcode
import os
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

# Create folders
os.makedirs("raw_qrcodes", exist_ok=True)
os.makedirs("printable_cards", exist_ok=True)

for table in range(1, 1001):
    qr_text = f"Table {table}"
    qr_img = qrcode.make(qr_text)
    qr_path = f"raw_qrcodes/Table_{table}.png"
    qr_img.save(qr_path)

    c = canvas.Canvas(f"printable_cards/Table_{table}.pdf", pagesize=A4)
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(300, 800, f"Table No: {table}")
    c.drawImage(qr_path, 180, 450, width=240, height=240)
    c.setFont("Helvetica", 16)
    c.drawCentredString(300, 420, "Scan to View Menu & Order")
    c.save()

print("All QR codes and PDF cards generated!")
