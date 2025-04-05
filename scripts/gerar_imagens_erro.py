import pandas as pd
import os
from slugify import slugify
from PIL import Image, ImageDraw, ImageFont
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from io import BytesIO
import time
import random
from urllib.parse import quote_plus
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import WebDriverException

# Configurações
csv_path = "racoes_atualizadas_com_imagens.csv"
output_dir = "public/images/produtos"
os.makedirs(output_dir, exist_ok=True)

# Sites para buscar
SITES_BUSCA = [
    "petlove.com.br",
    "petz.com.br",
    "cobasi.com.br",
    "magazineluiza.com.br"
]

def configurar_chrome():
    try:
        # Configurar opções do Chrome
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        
        # Instalar e configurar o ChromeDriver
        driver_path = ChromeDriverManager().install()
        service = Service(driver_path)
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Configurar timeouts
        driver.set_page_load_timeout(30)
        driver.implicitly_wait(10)
        
        return driver
        
    except Exception as e:
        print(f"Erro ao instalar/configurar ChromeDriver: {str(e)}")
        return None

def baixar_imagem(url):
    """Baixa e processa uma imagem da URL"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            
            # Converter para RGB se necessário
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Redimensionar mantendo proporção
            img.thumbnail((800, 800), Image.Resampling.LANCZOS)
            
            # Criar nova imagem com fundo branco
            new_img = Image.new('RGB', (800, 800), 'white')
            
            # Colar imagem centralizada
            x = (800 - img.width) // 2
            y = (800 - img.height) // 2
            new_img.paste(img, (x, y))
            
            return new_img
    except Exception as e:
        print(f"Erro ao baixar imagem: {str(e)}")
    return None

def buscar_imagem_google(driver, produto, marca):
    """Busca imagem no Google Images"""
    try:
        # Termos de busca específicos
        termos_busca = [
            f"{produto} {marca} embalagem site oficial",
            f"{produto} {marca} ração embalagem",
            f"{produto} {marca} pet shop",
        ]
        
        for termo in termos_busca:
            url = f"https://www.google.com/search?q={quote_plus(termo)}&tbm=isch"
            driver.get(url)
            time.sleep(2)  # Aguardar carregamento
            
            # Encontrar imagens
            elementos_img = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "img.rg_i"))
            )
            
            # Filtrar URLs de imagens válidas
            urls_imagens = []
            for img in elementos_img[:5]:  # Tentar as 5 primeiras imagens
                try:
                    url_img = img.get_attribute('src')
                    if url_img and url_img.startswith('http'):
                        urls_imagens.append(url_img)
                except:
                    continue
            
            # Tentar baixar cada imagem
            for url_img in urls_imagens:
                img = baixar_imagem(url_img)
                if img:
                    return img
            
            time.sleep(random.uniform(1, 2))  # Delay aleatório entre tentativas
        
    except Exception as e:
        print(f"Erro na busca do Google: {str(e)}")
    return None

def buscar_imagem_sites(driver, produto, marca):
    """Busca imagem em sites de pet shop"""
    for site in SITES_BUSCA:
        try:
            url = f"https://www.{site}/busca?q={quote_plus(f'{marca} {produto}')}"
            driver.get(url)
            time.sleep(2)
            
            # Tentar diferentes seletores CSS comuns
            seletores = [
                "img.product-image",
                "img.showcase-product-image",
                "img.product-img",
                ".product-image img",
                ".showcase-image img"
            ]
            
            for seletor in seletores:
                try:
                    elementos_img = WebDriverWait(driver, 5).until(
                        EC.presence_of_all_elements_located((By.CSS_SELECTOR, seletor))
                    )
                    
                    for img in elementos_img[:3]:  # Tentar as 3 primeiras imagens
                        url_img = img.get_attribute('src')
                        if url_img and url_img.startswith('http'):
                            img_baixada = baixar_imagem(url_img)
                            if img_baixada:
                                return img_baixada
                except:
                    continue
                    
            time.sleep(random.uniform(1, 2))  # Delay aleatório entre sites
            
        except Exception as e:
            print(f"Erro ao buscar em {site}: {str(e)}")
            continue
    
    return None

def gerar_imagem_erro(produto):
    """Gera uma imagem de erro com o nome do produto"""
    img = Image.new("RGB", (800, 800), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arial.ttf", 32)
    except IOError:
        font = ImageFont.load_default()

    texto = f"Não foi possível encontrar:\n{produto}"
    texto_linhas = texto.split('\n')
    y = 400 - len(texto_linhas) * 20
    
    for linha in texto_linhas:
        bbox = draw.textbbox((0, 0), linha, font=font)
        largura_texto = bbox[2] - bbox[0]
        x = (800 - largura_texto) // 2
        draw.text((x, y), linha, fill=(0, 0, 0), font=font)
        y += 40
    
    return img

def main():
    driver = None
    try:
        # Ler CSV
        df = pd.read_csv(csv_path)
        
        # Inicializar navegador
        driver = configurar_chrome()
        if driver is None:
            print("❌ Não foi possível inicializar o Chrome. Gerando imagens de erro para todos os produtos.")
            for index, row in df.iterrows():
                produto = row['Produto']
                slug = slugify(produto)
                imagem_path = os.path.join(output_dir, f"{slug}.jpg")
                
                print(f"\nProcessando: {produto}")
                img = gerar_imagem_erro(produto)
                img.save(imagem_path, quality=95, optimize=True)
                df.at[index, 'Imagem'] = f"{slug}.jpg"
                
                if index % 10 == 0:
                    df.to_csv("racoes_com_imagens_final.csv", index=False)
            
            df.to_csv("racoes_com_imagens_final.csv", index=False)
            print("\n✅ Processo concluído com sucesso (apenas imagens de erro)!")
            return
        
        # Processar cada produto
        for index, row in df.iterrows():
            try:
                produto = row['Produto']
                marca = row['Marca']
                slug = slugify(produto)
                imagem_path = os.path.join(output_dir, f"{slug}.jpg")
                
                print(f"\nProcessando: {produto}")
                
                # Primeiro tentar sites específicos
                img = buscar_imagem_sites(driver, produto, marca)
                
                # Se não encontrou, tentar Google Images
                if not img:
                    img = buscar_imagem_google(driver, produto, marca)
                
                # Se ainda não encontrou, gerar imagem de erro
                if not img:
                    print(f"❌ Não foi possível encontrar imagem para: {produto}")
                    img = gerar_imagem_erro(produto)
                else:
                    print(f"✅ Imagem encontrada para: {produto}")
                
                # Salvar imagem
                img.save(imagem_path, quality=95, optimize=True)
                
                # Atualizar CSV
                df.at[index, 'Imagem'] = f"{slug}.jpg"
                
                # Salvar progresso parcial
                if index % 10 == 0:
                    df.to_csv("racoes_com_imagens_final.csv", index=False)
                    
            except Exception as e:
                print(f"❌ Erro ao processar produto {produto}: {str(e)}")
                continue
    
    except Exception as e:
        print(f"❌ Erro fatal: {str(e)}")
    
    finally:
        # Fechar navegador
        if driver:
            try:
                driver.quit()
            except:
                pass
        print("\n✅ Processo finalizado!")

if __name__ == "__main__":
    main() 