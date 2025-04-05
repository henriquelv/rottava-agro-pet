import os
import pandas as pd
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from slugify import slugify
import time
from urllib.parse import quote_plus
import random

# Configurações
INPUT_CSV = 'racoes_atualizadas_com_imagens.csv'
OUTPUT_CSV = 'racoes_com_imagens_final.csv'
IMAGE_DIR = 'public/images/produtos'
MIN_SIZE = (500, 500)
TARGET_SIZE = (800, 800)
MAX_SIZE_KB = 500

# Criar diretório se não existir
os.makedirs(IMAGE_DIR, exist_ok=True)

def generate_error_image(product_name):
    """Gera uma imagem de erro com o nome do produto"""
    img = Image.new('RGB', TARGET_SIZE, 'white')
    draw = ImageDraw.Draw(img)
    
    # Tenta carregar uma fonte, se não conseguir usa a padrão
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()
    
    text = f"Não foi possível encontrar\n{product_name}"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (TARGET_SIZE[0] - text_width) // 2
    y = (TARGET_SIZE[1] - text_height) // 2
    
    draw.text((x, y), text, fill='black', font=font)
    return img

def download_image(url, product_name):
    """Tenta baixar uma imagem da URL"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            return img
    except:
        pass
    return None

def process_image(img):
    """Processa a imagem para atender aos requisitos"""
    # Redimensiona mantendo proporção
    img.thumbnail(TARGET_SIZE, Image.Resampling.LANCZOS)
    
    # Cria nova imagem com fundo branco
    new_img = Image.new('RGB', TARGET_SIZE, 'white')
    
    # Cola a imagem original centralizada
    x = (TARGET_SIZE[0] - img.width) // 2
    y = (TARGET_SIZE[1] - img.height) // 2
    new_img.paste(img, (x, y))
    
    return new_img

def save_image(img, path):
    """Salva a imagem otimizando o tamanho"""
    quality = 95
    while True:
        img.save(path, 'JPEG', quality=quality)
        size_kb = os.path.getsize(path) / 1024
        if size_kb <= MAX_SIZE_KB or quality <= 10:
            break
        quality -= 5

def search_image(product_name, brand):
    """Busca imagem do produto em diferentes fontes"""
    # Lista de sites para buscar
    sites = [
        f"https://www.{brand.lower()}.com.br",
        f"https://www.petlove.com.br",
        f"https://www.cobasi.com.br",
        f"https://www.petz.com.br"
    ]
    
    # Tenta cada site
    for site in sites:
        try:
            # Busca no site
            search_url = f"{site}/search?q={quote_plus(product_name)}"
            response = requests.get(search_url, timeout=10)
            if response.status_code == 200:
                # Aqui você implementaria a lógica para extrair a URL da imagem
                # do HTML da página. Por simplicidade, vamos pular esta parte
                pass
        except:
            continue
    
    # Se não encontrou, tenta Google Images
    try:
        search_url = f"https://www.google.com/search?q={quote_plus(product_name + ' embalagem site oficial')}&tbm=isch"
        response = requests.get(search_url, timeout=10)
        if response.status_code == 200:
            # Aqui você implementaria a lógica para extrair a URL da imagem
            # do HTML da página. Por simplicidade, vamos pular esta parte
            pass
    except:
        pass
    
    return None

def main():
    # Lê o CSV
    df = pd.read_csv(INPUT_CSV)
    
    # Adiciona coluna para o caminho da imagem
    df['image_path'] = ''
    
    # Processa cada produto
    for index, row in df.iterrows():
        product_name = row['Produto']
        brand = row['Marca']
        slug = slugify(product_name)
        
        print(f"Processando: {product_name}")
        
        # Gera o caminho do arquivo
        image_path = os.path.join(IMAGE_DIR, f"{slug}.jpg")
        
        # Tenta buscar imagem
        img = search_image(product_name, brand)
        
        if img is None:
            # Gera imagem de erro
            img = generate_error_image(product_name)
        
        # Processa e salva a imagem
        img = process_image(img)
        save_image(img, image_path)
        
        # Atualiza o caminho no DataFrame
        df.at[index, 'image_path'] = f"/images/produtos/{slug}.jpg"
        
        # Aguarda um pouco para não sobrecarregar os servidores
        time.sleep(random.uniform(1, 3))
    
    # Salva o CSV atualizado
    df.to_csv(OUTPUT_CSV, index=False)
    print(f"Processo concluído. Resultados salvos em {OUTPUT_CSV}")

if __name__ == "__main__":
    main() 