from bs4 import BeautifulSoup
import json

# Load HTML content from file
with open('page.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# Parse HTML using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Find all spans with the specified class
spans = soup.find_all('span', class_='_ap3a')

# Extract text from each span and store in a list
span_texts = [span.get_text() for span in spans]

# Prepare data in dictionary format for saving as JSON
data = {
    "strings": span_texts
}

# Save the extracted texts into a JSON file
with open('subscribers.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("Data has been saved to subscribers.json")
