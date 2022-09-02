# 最終コード

from bs4 import BeautifulSoup
from urllib.request import urlopen
import requests
import json
import sys
import datetime


def main():
  dt_now = datetime.datetime.now()
  print(dt_now.year)

  yearlist = list(range(2013, dt_now.year + 1, 1))
  print(yearlist)

  year_cool_list = []
  for data in yearlist:
    #print(data)
    for number in range(4):
      #print(data,number+1)
      year_cool_list.append([data,number+1])

  print(year_cool_list)
  #----------------------------------------------------------------
  for data in year_cool_list:
    year = str(data[0])
    cool = str(data[1])
    # GET
    # データがJSONであること指定
    headers = {"content-type": "application/json"}
    # JSONを取得
    response=requests.get('https://api.moemoe.tokyo/anime/v1/master/' + year + '/' + cool, headers=headers)
    # 取得したデータからJSONを取得
    try:
        json_data = response.json()
    except:
        with open(year + '-' + cool + '.json', 'w') as f:
            f.write(json.dumps({'message': 'no_data'}))
            continue
    # print(json_data)
    if(len(json_data) == 0):
        print(json.dumps({'message': 'no_data'}))
        #------------------書き込み------------------
        with open(year + '-' + cool + '.json', 'w') as f:
            f.write(json.dumps({'message': 'no_data'}))
            continue
    # 最後に返すJSON
    json_data_addOGPimage = []
    #print(json_data)
    for data in json_data:
        # 取得したJSONにあるサイトのリンク
        print(data['public_url'])
        print(data['title'].replace('/', '-'))
        data['title'] = data['title'].replace('/', '／')
        data['title'] = data['title'].replace('?', '？')
        try:
            url = data['public_url']
            # サイトのリンクからOGP画像、説明を取得
            html_page = urlopen(url)
            soup = BeautifulSoup(html_page, 'html.parser')
            # ogpの画像のurlを取得する
            og_description = soup.find('meta', attrs={'property': 'og:description', 'content': True})
            # ogpの説明を取得する
            og_img = soup.find('meta', attrs={'property': 'og:image', 'content': True})
            if og_img is not None:
                r = requests.get(og_img['content'])
                print(r.status_code)
                if(r.status_code != 404):
                    # dataにogpの画像のurlを追加
                    data['ogp_image_url'] = og_img['content']
                    # dataにogpの説明を追加
                    data['ogp_description'] = og_description['content']
                    print(og_description['content'])
                    print(og_img['content'])
                else:
                    # 404でogpを取得できなかった時
                    print('!!not found og:image tag!!')
                    data['ogp_image_url'] = 'not_found'
                    data['ogp_description'] = 'not_found'
            else:
                # ogpを取得できなかった時
                print('!!not found og:image tag!!')
                data['ogp_image_url'] = 'not_found'
                data['ogp_description'] = 'not_found'
        except:
            # ogpを取得できなかった時
            print('!!not found og:image tag!!')
            data['ogp_image_url'] = 'not_found'
            data['ogp_description'] = 'not_found'
            pass
        print(data)
        # ogpのデータをそれぞれに追加したdataを配列にする
        json_data_addOGPimage.append(data)

    print(json_data_addOGPimage)

    #-----------------------------書き込み----------------------------------------

    j = json.dumps(json_data_addOGPimage, indent=2, ensure_ascii=False)
    with open(year + '-' + cool + '.json', 'w') as f:
        f.write(j)

if __name__=="__main__":
    main()
