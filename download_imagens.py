import json
import os
import time
import logging
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from icrawler.builtin import GoogleImageCrawler
from urllib.parse import quote
from datetime import datetime

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('download_imagens.log'),
        logging.StreamHandler()
    ]
)

# Mapeamento de marcas para seus sites oficiais
MARCAS_SITES = {
    'ROYAL CANIN': 'https://www.royalcanin.com/br',
    'PEDIGREE': 'https://www.pedigree.com.br',
    'WHISKAS': 'https://www.whiskas.com.br',
    'HILLS': 'https://www.hillspet.com.br',
    'PREMIER': 'https://www.premierpet.com.br',
    'GOLDEN': 'https://www.goldenpet.com.br',
    'FARMINHA': 'https://www.farmina.com.br',
    'NUTRIENCE': 'https://www.nutrience.com.br',
    'PROPLAN': 'https://www.purina.com.br/proplan',
    'FORTICEE': 'https://www.forticee.com.br',
    'VITAMINADOG': 'https://www.vitaminadog.com.br',
    'VITAMINACAT': 'https://www.vitaminacat.com.br'
}

# Sites de pet shops para busca alternativa
PET_SHOPS = [
    'site:petz.com.br',
    'site:petlove.com.br',
    'site:cobasi.com.br',
    'site:peticao.com.br'
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
        # Buscar no Google com site específico
        google_crawler = GoogleImageCrawler(
            storage={'root_dir': 'temp'},
            downloader_threads=1
        )
        
        query = f"{nome_produto} site:{site}"
        logging.info(f"Buscando no site oficial {site}: {query}")
        
        google_crawler.crawl(
            keyword=query,
            max_num=1,
            filters={'size': 'large'}
        )
        
        # Verificar se encontrou imagem
        arquivos = os.listdir('temp')
        for arquivo in arquivos:
            if arquivo.endswith('.jpg'):
                caminho_temp = os.path.join('temp', arquivo)
                with open(caminho_temp, 'rb') as f:
                    imagem_data = f.read()
                os.remove(caminho_temp)
                
                if validar_imagem(imagem_data):
                    return imagem_data
        return None
    except Exception as e:
        logging.error(f"Erro ao buscar no site oficial: {str(e)}")
        return None

def buscar_imagem_pet_shops(nome_produto):
    """Busca imagem em sites de pet shops"""
    for site in PET_SHOPS:
        try:
            google_crawler = GoogleImageCrawler(
                storage={'root_dir': 'temp'},
                downloader_threads=1
            )
            
            query = f"{nome_produto} {site}"
            logging.info(f"Buscando em {site}: {query}")
            
            google_crawler.crawl(
                keyword=query,
                max_num=1,
                filters={'size': 'large'}
            )
            
            arquivos = os.listdir('temp')
            for arquivo in arquivos:
                if arquivo.endswith('.jpg'):
                    caminho_temp = os.path.join('temp', arquivo)
                    with open(caminho_temp, 'rb') as f:
                        imagem_data = f.read()
                    os.remove(caminho_temp)
                    
                    if validar_imagem(imagem_data):
                        return imagem_data
        except Exception as e:
            logging.error(f"Erro ao buscar em {site}: {str(e)}")
            continue
    return None

def buscar_imagem_google(nome_produto):
    """Busca imagem no Google"""
    try:
        google_crawler = GoogleImageCrawler(
            storage={'root_dir': 'temp'},
            downloader_threads=1
        )
        
        logging.info(f"Buscando no Google: {nome_produto}")
        
        google_crawler.crawl(
            keyword=nome_produto,
            max_num=1,
            filters={'size': 'large'}
        )
        
        arquivos = os.listdir('temp')
        for arquivo in arquivos:
            if arquivo.endswith('.jpg'):
                caminho_temp = os.path.join('temp', arquivo)
                with open(caminho_temp, 'rb') as f:
                    imagem_data = f.read()
                os.remove(caminho_temp)
                
                if validar_imagem(imagem_data):
                    return imagem_data
        return None
    except Exception as e:
        logging.error(f"Erro ao buscar no Google: {str(e)}")
        return None

def main():
    # Criar diretório para imagens se não existir
    os.makedirs('public/images/produtos', exist_ok=True)
    os.makedirs('temp', exist_ok=True)
    
    # Ler o arquivo JSON
    try:
        with open('produtos_importados.json', 'r', encoding='utf-8') as f:
            produtos = json.load(f)
        logging.info(f"Carregados {len(produtos)} produtos do arquivo JSON")
    except Exception as e:
        logging.error(f"Erro ao ler arquivo JSON: {str(e)}")
        return

    # Processar cada produto
    produtos_processados = 0
    produtos_com_erro = 0
    produtos_sem_imagem = 0
    
    for produto in produtos:
        try:
            # Usar o slug do produto para o nome do arquivo
            nome_arquivo = f"{produto['slug']}.jpg"
            caminho_arquivo = os.path.join('public/images/produtos', nome_arquivo)
            
            if os.path.exists(caminho_arquivo):
                # Verificar se a imagem é válida
                with open(caminho_arquivo, 'rb') as f:
                    if validar_imagem(f.read()):
                        logging.info(f"Imagem já existe e é válida para {produto['nome']}")
                        produtos_processados += 1
                        continue
                    else:
                        logging.info(f"Imagem existente é inválida para {produto['nome']}, baixando novamente")
                        os.remove(caminho_arquivo)

            logging.info(f"Buscando imagem para: {produto['nome']}")
            
            # Identificar a marca do produto
            marca = None
            for marca_conhecida in MARCAS_SITES.keys():
                if marca_conhecida in produto['nome'].upper():
                    marca = marca_conhecida
                    break
            
            # Tentar diferentes fontes de imagem
            imagem_data = None
            
            # 1. Tentar site oficial
            if marca:
                logging.info(f"Tentando site oficial da marca {marca}")
                imagem_data = tentar_download(buscar_imagem_site_oficial, produto['nome'], marca)
            
            # 2. Tentar sites de pet shops
            if not imagem_data:
                logging.info("Tentando sites de pet shops")
                imagem_data = tentar_download(buscar_imagem_pet_shops, produto['nome'])
            
            # 3. Tentar Google
            if not imagem_data:
                logging.info("Tentando Google")
                imagem_data = tentar_download(buscar_imagem_google, produto['nome'])
            
            # Salvar imagem se encontrada
            if imagem_data:
                with open(caminho_arquivo, 'wb') as f:
                    f.write(imagem_data)
                logging.info(f"Imagem salva com sucesso para {produto['nome']}")
                produtos_processados += 1
            else:
                logging.warning(f"❌ Não foi possível encontrar uma imagem adequada para {produto['nome']} - Gerando imagem de erro")
                if criar_imagem_erro(produto['nome'], produto['slug']):
                    produtos_processados += 1
                else:
                    produtos_sem_imagem += 1

            # Pequena pausa para não sobrecarregar
            time.sleep(DOWNLOAD_DELAY)

        except Exception as e:
            logging.error(f"Erro ao processar {produto['nome']}: {str(e)}")
            produtos_com_erro += 1

    # Limpar diretório temporário
    try:
        for arquivo in os.listdir('temp'):
            os.remove(os.path.join('temp', arquivo))
        os.rmdir('temp')
    except:
        pass

    # Resumo final
    logging.info("\n=== Resumo do Processo ===")
    logging.info(f"Total de produtos: {len(produtos)}")
    logging.info(f"Produtos processados com sucesso: {produtos_processados}")
    logging.info(f"Produtos sem imagem encontrada: {produtos_sem_imagem}")
    logging.info(f"Produtos com erro: {produtos_com_erro}")
    logging.info("Processo de download concluído!")

if __name__ == "__main__":
    main() 