import pandas as pd
import os 
import shutil
import os
import statistics



dir_path = "H:\Huzaifa\Comsats\Fyp\Datasets\CategorizedFitz\\"
dirs = [(dir_name, len(os.listdir(os.path.join(dir_path, dir_name)))) for dir_name in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, dir_name))]
dirs_sorted = sorted(dirs, key=lambda x: x[1], reverse=True)


# Assuming dirs_sorted is a list of tuples
num_files = [num for _, num in dirs_sorted]
mean = statistics.mean(num_files)
print(f"mean: {mean}")

for dir_name, num_files in dirs_sorted:
    print(f"{dir_name}: {num_files} files")
