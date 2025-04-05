import pandas as pd

# Lê o CSV
df = pd.read_csv('racoes_atualizadas_com_imagens.csv')

# Mostra as colunas
print("Colunas do CSV:")
print(df.columns.tolist())

# Mostra as primeiras linhas
print("\nPrimeiras linhas:")
print(df.head()) 