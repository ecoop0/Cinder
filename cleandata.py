import pandas as pd

# Load the CSV using semicolon delimiter
df = pd.read_csv("fra_cleaned.csv", delimiter=';', encoding='latin1')

# --- OPTIONAL CLEANING STEPS --- #

# 1. Rename columns to snake_case (Supabase-friendly)
df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

# 2. Convert rating from comma → dot for decimals
df['rating_value'] = df['rating_value'].astype(str).str.replace(',', '.').astype(float)

# 3. Convert Top, Middle, Base notes from string → Postgres arrays
for note_col in ['top', 'middle', 'base']:
    if note_col in df.columns:
        df[f'{note_col}_notes'] = df[note_col].fillna('').apply(
            lambda x: '{' + ','.join([note.strip() for note in x.split(',') if note.strip()]) + '}'
        )

# 4. Combine mainaccord1–5 into a Postgres array (optional)
main_accord_cols = [col for col in df.columns if col.startswith('mainaccord')]
df['main_accords'] = df[main_accord_cols].values.tolist()
df['main_accords'] = df['main_accords'].apply(
    lambda row: '{' + ','.join([str(item).strip() for item in row if pd.notnull(item)]) + '}'
)

# 5. Save cleaned file with UTF-8 encoding and semicolon delimiter
df.to_csv("fra_cleaned_ready.csv", sep=';', index=False, encoding='utf-8')
print("✅ Cleaned CSV saved as 'fra_cleaned_ready.csv'")
