import qrcode
import os

def generate_qr_codes(base_url, start_table, end_table, output_folder="cafe_qrcodes"):
    """
    Generates QR codes for a range of table numbers.

    Args:
        base_url (str): The base URL of your cafe menu website (e.g., "https://yourcafedomain.com/menu/index.html").
        start_table (int): The starting table number.
        end_table (int): The ending table number.
        output_folder (str): The folder where QR code images (PNG files) will be saved.
    """
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"Created output folder: {output_folder}")

    print(f"Generating QR codes from Table {start_table} to {end_table}...")

    for table_num in range(start_table, end_table + 1):
        # Construct the unique URL for each table
        # This URL will be embedded in the QR code
        table_url = f"{base_url}?table={table_num}"
        
        # Configure QR code properties
        qr = qrcode.QRCode(
            version=1, # Controls the size of the QR code (1-40). Higher version means more data.
            error_correction=qrcode.constants.ERROR_CORRECT_L, # Error correction level (L, M, Q, H). L is lowest, H is highest.
            box_size=10, # How many pixels each "box" (segment) of the QR code is.
            border=4, # How many boxes thick the white border around the QR code is.
        )
        qr.add_data(table_url) # Add the URL data to the QR code
        qr.make(fit=True) # Ensure the entire data fits into the QR code

        # Create an image from the QR Code instance
        # fill_color is the color of the QR code modules (the black squares)
        # back_color is the color of the background (the white squares)
        img = qr.make_image(fill_color="black", back_color="white")

        # Define the filename for the QR code image
        filename = os.path.join(output_folder, f"table_{table_num}_qr.png")
        
        # Save the image file
        img.save(filename)
        print(f"Generated QR for Table {table_num}: {filename}")

    print("\nQR code generation complete! Check the 'cafe_qrcodes' folder.")

# --- Configuration Section (IMPORTANT: YOU MUST EDIT THIS) ---

# Replace this with the ACTUAL URL where your index.html is hosted online.
# For example: "https://yourcafedomain.com/menu/index.html"
# If you're testing locally, you might use "file:///C:/Users/YourName/Desktop/CafeWebsite/index.html"
# but for actual use, it must be a public web address.
YOUR_CAFE_MENU_BASE_URL = "https://yourcafedomain.com/menu/index.html" # <<< CHANGE THIS TO YOUR HOSTED URL

# Define the range of table numbers you want to generate QR codes for
START_TABLE_NUMBER = 1
END_TABLE_NUMBER = 1001 # As per your requirement, adjust if needed

# Define the folder where the generated QR code images will be saved
QR_OUTPUT_DIRECTORY = "cafe_qrcodes"

# --- Call the function to generate QR codes ---
if __name__ == "__main__":
    generate_qr_codes(YOUR_CAFE_MENU_BASE_URL, START_TABLE_NUMBER, END_TABLE_NUMBER, QR_OUTPUT_DIRECTORY)
