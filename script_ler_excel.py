import pandas as pd

# Ler o arquivo Excel
df = pd.read_excel('produtos_completos_com_descricao_atualizado.xlsx')

# Mostrar as colunas
print("Colunas no arquivo:")
for col in df.columns:
    print(f"- {col}")

# Mostrar as primeiras linhas
print("\nPrimeiras 3 linhas:")
print(df.head(3).to_string())

# Número total de produtos
print(f"\nTotal de produtos: {len(df)}") 