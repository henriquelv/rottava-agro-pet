import os
import time
import logging
import pandas as pd
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote
from datetime import datetime
from slugify import slugify
import re
import traceback

# Configurar logging com mais detalhes
logging.basicConfig(
    level=logging.DEBUG,  # Mudado para DEBUG
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('download_racoes.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

# Mapeamento de marcas para seus sites oficiais
MARCAS_SITES = {
    'GOLDEN': 'https://www.goldenpet.com.br',
    'SPECIAL DOG': 'https://www.specialdog.com.br',
    'MAGNUS': 'https://www.magnuspet.com.br'
}

# Sites de pet shops para busca alternativa
PET_SHOPS = [
    'https://www.petz.com.br',
    'https://www.petlove.com.br',
    'https://www.cobasi.com.br',
    'https://www.peticao.com.br'
]

# Configurações
MAX_RETRIES = 3
RETRY_DELAY = 5  # segundos
MIN_IMAGE_SIZE = 300
DOWNLOAD_DELAY = 2  # segundos entre downloads
IMAGEM_ERRO_WIDTH = 800
IMAGEM_ERRO_HEIGHT = 800
IMAGEM_ERRO_BG_COLOR = (255, 255, 255)  # Branco
IMAGEM_ERRO_TEXT_COLOR = (0, 0, 0)  # Preto

def criar_imagem_erro(nome_produto, slug):
    """Cria uma imagem de erro com fundo branco e o nome do produto"""
    try:
        # Criar imagem branca
        imagem = Image.new('RGB', (IMAGEM_ERRO_WIDTH, IMAGEM_ERRO_HEIGHT), IMAGEM_ERRO_BG_COLOR)
        draw = ImageDraw.Draw(imagem)
        
        # Tentar carregar uma fonte do sistema
        try:
            font = ImageFont.truetype("arial.ttf", 40)
        except:
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 40)
            except:
                font = ImageFont.load_default()
        
        # Calcular posição do texto
        texto = f"Imagem não disponível\n{nome_produto}"
        bbox = draw.textbbox((0, 0), texto, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (IMAGEM_ERRO_WIDTH - text_width) / 2
        y = (IMAGEM_ERRO_HEIGHT - text_height) / 2
        
        # Desenhar texto
        draw.text((x, y), texto, font=font, fill=IMAGEM_ERRO_TEXT_COLOR, align="center")
        
        # Salvar imagem
        caminho_arquivo = os.path.join('public/images/produtos', f"{slug}.jpg")
        imagem.save(caminho_arquivo, 'JPEG', quality=95)
        logging.info(f"Imagem de erro gerada para {nome_produto}")
        return True
    except Exception as e:
        logging.error(f"Erro ao gerar imagem de erro para {nome_produto}: {str(e)}")
        return False

def validar_imagem(imagem_data):
    """Valida se a imagem é adequada para o produto"""
    try:
        img = Image.open(BytesIO(imagem_data))
        # Verificar tamanho mínimo
        if img.size[0] < MIN_IMAGE_SIZE or img.size[1] < MIN_IMAGE_SIZE:
            logging.warning(f"Imagem muito pequena: {img.size}")
            return False
        # Verificar se é uma imagem colorida
        if img.mode in ('L', '1'):  # Imagem em escala de cinza ou preto e branco
            logging.warning(f"Imagem em escala de cinza ou preto e branco: {img.mode}")
            return False
        return True
    except Exception as e:
        logging.error(f"Erro ao validar imagem: {str(e)}")
        return False

def tentar_download(func, *args, **kwargs):
    """Tenta executar uma função com retry"""
    for tentativa in range(MAX_RETRIES):
        try:
            resultado = func(*args, **kwargs)
            if resultado:
                return resultado
            if tentativa < MAX_RETRIES - 1:
                logging.info(f"Tentativa {tentativa + 1} falhou, tentando novamente em {RETRY_DELAY} segundos...")
                time.sleep(RETRY_DELAY)
        except Exception as e:
            if tentativa < MAX_RETRIES - 1:
                logging.warning(f"Erro na tentativa {tentativa + 1}: {str(e)}")
                time.sleep(RETRY_DELAY)
            else:
                logging.error(f"Todas as tentativas falharam: {str(e)}")
    return None

def buscar_imagem_site_oficial(nome_produto, marca):
    """Busca imagem no site oficial da marca"""
    if marca not in MARCAS_SITES:
        return None
    
    site = MARCAS_SITES[marca]
    try:
        # Fazer busca no site
        url = f"{site}/busca?q={quote(nome_produto)}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Procurar por imagens
        for img in soup.find_all('img'):
            img_url = img.get('src')
            if img_url and (img_url.endswith('.jpg') or img_url.endswith('.png')):
                if not img_url.startswith('http'):
                    img_url = f"{site}{img_url}"
                
                try:
                    img_response = requests.get(img_url, headers=headers, timeout=10)
                    if img_response.status_code == 200:
                        imagem_data = img_response.content
                        if validar_imagem(imagem_data):
                            return imagem_data
                except:
                    continue
        
        return None
    except Exception as e:
        logging.error(f"Erro ao buscar no site oficial: {str(e)}")
        return None

def buscar_imagem_pet_shops(nome_produto):
    """Busca imagem em sites de pet shops"""
    for site in PET_SHOPS:
        try:
            url = f"{site}/busca?q={quote(nome_produto)}"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            response = requests.get(url, headers=headers, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Procurar por imagens
            for img in soup.find_all('img'):
                img_url = img.get('src')
                if img_url and (img_url.endswith('.jpg') or img_url.endswith('.png')):
                    if not img_url.startswith('http'):
                        img_url = f"{site}{img_url}"
                    
                    try:
                        img_response = requests.get(img_url, headers=headers, timeout=10)
                        if img_response.status_code == 200:
                            imagem_data = img_response.content
                            if validar_imagem(imagem_data):
                                return imagem_data
                    except:
                        continue
        except Exception as e:
            logging.error(f"Erro ao buscar em {site}: {str(e)}")
            continue
    return None

def buscar_imagem_google(nome_produto):
    """Busca imagem no Google"""
    try:
        url = f"https://www.google.com/search?q={quote(nome_produto)}&tbm=isch"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Procurar por imagens
        for img in soup.find_all('img'):
            img_url = img.get('src')
            if img_url and img_url.startswith('http'):
                try:
                    img_response = requests.get(img_url, headers=headers, timeout=10)
                    if img_response.status_code == 200:
                        imagem_data = img_response.content
                        if validar_imagem(imagem_data):
                            return imagem_data
                except:
                    continue
        
        return None
    except Exception as e:
        logging.error(f"Erro ao buscar no Google: {str(e)}")
        return None

def salvar_imagem(imagem_data, slug):
    """Salva a imagem no diretório de produtos"""
    try:
        img = Image.open(BytesIO(imagem_data))
        
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
        
        # Salvar imagem
        caminho_arquivo = os.path.join('public/images/produtos', f"{slug}.jpg")
        new_img.save(caminho_arquivo, 'JPEG', quality=95, optimize=True)
        return True
    except Exception as e:
        logging.error(f"Erro ao salvar imagem: {str(e)}")
        return False

def main():
    try:
        logging.info("Iniciando o script...")
        
        # Criar diretório para imagens se não existir
        os.makedirs('public/images/produtos', exist_ok=True)
        logging.info("Diretório de imagens verificado/criado")
        
        # Remover todas as imagens existentes
        for arquivo in os.listdir('public/images/produtos'):
            if arquivo.endswith('.jpg'):
                os.remove(os.path.join('public/images/produtos', arquivo))
        logging.info("Imagens antigas removidas")
        
        # Ler o arquivo CSV
        try:
            logging.info("Tentando ler o arquivo CSV...")
            df = pd.read_csv('racoes_atualizadas_com_imagens.csv')
            logging.info(f"Carregados {len(df)} produtos do arquivo CSV")
        except Exception as e:
            logging.error(f"Erro ao ler arquivo CSV: {str(e)}")
            logging.error(f"Traceback completo: {traceback.format_exc()}")
            return

        # Processar cada produto
        produtos_processados = 0
        produtos_com_erro = 0
        produtos_sem_imagem = 0
        
        for index, row in df.iterrows():
            try:
                nome_produto = row['Produto']
                marca = row['Marca'] if 'Marca' in row else ''
                logging.info(f"\nProcessando produto {index + 1}/{len(df)}")
                logging.info(f"Nome do produto: {nome_produto}")
                logging.info(f"Marca: {marca}")
                
                slug = slugify(nome_produto)
                logging.info(f"Slug gerado: {slug}")
                
                # Tentar baixar do site oficial
                if marca:
                    logging.info(f"Tentando baixar do site oficial da marca {marca}...")
                    imagem_data = tentar_download(buscar_imagem_site_oficial, nome_produto, marca)
                else:
                    logging.warning("Marca não encontrada, pulando busca no site oficial")
                    imagem_data = None
                
                # Se não encontrou, tentar pet shops
                if not imagem_data:
                    logging.info("Tentando baixar de sites de pet shops...")
                    imagem_data = tentar_download(buscar_imagem_pet_shops, nome_produto)
                
                # Se ainda não encontrou, tentar Google
                if not imagem_data:
                    logging.info("Tentando baixar do Google...")
                    imagem_data = tentar_download(buscar_imagem_google, nome_produto)
                
                # Se encontrou imagem, salvar
                if imagem_data:
                    if salvar_imagem(imagem_data, slug):
                        logging.info(f"✅ Imagem salva com sucesso para {nome_produto}")
                        produtos_processados += 1
                    else:
                        logging.error(f"❌ Erro ao salvar imagem para {nome_produto}")
                        produtos_com_erro += 1
                else:
                    # Se não encontrou imagem, gerar imagem de erro
                    logging.warning(f"Nenhuma imagem encontrada para {nome_produto}, gerando imagem de erro...")
                    if criar_imagem_erro(nome_produto, slug):
                        logging.warning(f"⚠️ Gerada imagem de erro para {nome_produto}")
                        produtos_sem_imagem += 1
                    else:
                        logging.error(f"❌ Erro ao gerar imagem de erro para {nome_produto}")
                        produtos_com_erro += 1
                
                # Atualizar CSV
                df.at[index, 'Imagem'] = f"{slug}.jpg"
                if index % 10 == 0:
                    logging.info("Salvando CSV intermediário...")
                    df.to_csv("racoes_com_imagens_final.csv", index=False)
                
                # Aguardar entre downloads
                time.sleep(DOWNLOAD_DELAY)
                
            except Exception as e:
                logging.error(f"Erro ao processar {nome_produto}: {str(e)}")
                logging.error(f"Traceback completo: {traceback.format_exc()}")
                produtos_com_erro += 1
        
        # Salvar CSV final
        logging.info("Salvando CSV final...")
        df.to_csv("racoes_com_imagens_final.csv", index=False)
        
        # Relatório final
        logging.info("\n=== Relatório Final ===")
        logging.info(f"Total de produtos: {len(df)}")
        logging.info(f"Produtos processados com sucesso: {produtos_processados}")
        logging.info(f"Produtos sem imagem: {produtos_sem_imagem}")
        logging.info(f"Produtos com erro: {produtos_com_erro}")

    except Exception as e:
        logging.error(f"Erro fatal no script: {str(e)}")
        logging.error(f"Traceback completo: {traceback.format_exc()}")

if __name__ == "__main__":
    main() 