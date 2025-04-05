#!/bin/bash

# Criar ambiente virtual Python
python -m venv venv

# Ativar ambiente virtual
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar script Python
python generate_product_images.py

# Desativar ambiente virtual
deactivate 