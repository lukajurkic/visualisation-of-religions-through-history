import csv

# Adjust index here (Python uses 0-based index, so index 2 = third column)
target_column_index = 2

unique_values = set()

with open('data/WRP_national.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile)
    header = next(reader)  # If there's a header row
    for row in reader:
        if len(row) > target_column_index:
            unique_values.add(row[target_column_index].strip())

print(unique_values)
