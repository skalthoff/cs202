import os
import xml.etree.ElementTree as ET
from datetime import datetime

def generate_sitemap(directory, base_url):
    urlset = ET.Element('urlset', {'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9'})

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.html') or file.endswith('.htm'):
                relative_path = os.path.join(root, file).replace(directory, '').replace('\\', '/')
                url = os.path.join(base_url, relative_path[1:]).replace('\\', '/')
                
                url_element = ET.SubElement(urlset, 'url')
                ET.SubElement(url_element, 'loc').text = url

                file_path = os.path.join(root, file)
                lastmod = datetime.fromtimestamp(os.path.getmtime(file_path)).strftime('%Y-%m-%d')
                ET.SubElement(url_element, 'lastmod').text = lastmod

    tree = ET.ElementTree(urlset)
    tree.write('sitemap.xml', encoding='utf-8', xml_declaration=True)

if __name__ == '__main__':
    directory = './'
    base_url = 'cs202.skalthoff.com'
    generate_sitemap(directory, base_url)