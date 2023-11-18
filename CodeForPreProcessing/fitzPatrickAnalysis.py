import os
import shutil
import pandas as pd

fitz17 = pd.read_csv("Datasets/fitzpatrick17k.csv")


labels = fitz17['label'].unique()


dataframes = {}
for label in labels:
    dataframes[label] = fitz17[fitz17['label'] == label]
    print(f"Total Images Approx for label {label} = {len(dataframes[label])}")

sorted_dataframes = dict(sorted(dataframes.items(), key=lambda x: len(x[1]), reverse=True))

for sort in sorted_dataframes:
    print(f"Total Images For Label {sort} = {len(sorted_dataframes[sort])}")
    with open("analysis.txt", "a") as f:
        f.write(f"Total Images For Label {sort} = {len(sorted_dataframes[sort])}\n")
    

# for label in labels:
#   print(f"Total Images Approx for label {label} = {len(sortedDicts[label])}")
