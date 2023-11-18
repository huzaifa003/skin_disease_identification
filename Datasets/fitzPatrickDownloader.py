from sre_constants import MAX_REPEAT
from time import sleep, time
import pandas as pd
import requests
import os
df = pd.read_csv("fitzpatrick17k.csv")
dfannotate = pd.read_csv("image.csv")
df['md5hash'] = df['md5hash'] + ".jpg"


inner_merged = pd.merge(df, dfannotate, left_on='md5hash', right_on='ImageID', how='inner')

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
}
inner_merged = inner_merged[inner_merged['url'].notna()]
# inner_merged.to_excel("fitzpatrick_cleaned_annoted_data.xlsx", index=False) 
print(len(inner_merged))
for i in range(len(inner_merged)):
    print(i)

    row = inner_merged.iloc(axis=0)[i]
    title = row['md5hash'].strip()
    if (os.path.exists("fitzpatrickImages/" + title)):
        continue
    
    url = row['url'].strip()

    print(title)
    print(url)
    print("------")
    
    with open("fitzpatrickImages/" + title, "wb") as handle:
        response = requests.get(url, headers=headers)
        if not response.ok:
            print(response)
        print(response.content)
        handle.write(response.content)
        sleep(0.2)
    