import pandas as pd
import os 
import shutil

fitz17 = pd.read_csv("fitzpatrick17k.csv")
fitzCleaned = pd.read_excel("fitzpatrick_cleaned_annoted_data.xlsx")

labels = fitz17['label'].unique()

dataframes = {}
for label in labels:
  dataframes[label] = fitz17[fitz17['label'] == label]
  print(f"Total Images Approx for label {label} = {len(dataframes[label])}")
  
  
unexistingImages = []
oldFolderPath = "Copy of fitzpatrick17k/data/finalfitz17k/"
folderPath = "CategorizedFitz/"
for label in labels:
  dataframe = dataframes[label]
  titleColumn = dataframe['md5hash'].to_list()
  newFolderPath = folderPath + label
  os.mkdir(newFolderPath) #Create a directory based on label


  for title in titleColumn:
    nam = title + ".jpg"
    picturePath = oldFolderPath + nam
    if(os.path.exists(picturePath)):
      newPicturePath =  os.path.join(newFolderPath, nam)
      shutil.copy(picturePath, newPicturePath)
    else:
      unexistingImages.append({"name":nam, "label": label})

print(unexistingImages)