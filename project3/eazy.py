from PIL import Image
from PIL import ImageChops
import requests
from io import BytesIO
import sys

def compareImages(img1, img2):
    img1 = Image.open(BytesIO(requests.get(img1).content))
    img2 = Image.open(BytesIO(requests.get(img2).content))
    try:
        diff = ImageChops.difference(img1, img2)
        if diff.getbbox() is None:
            # 图片间没有任何不同则直接退出
            print(0) 
        else:
            print(1)
    except ValueError as e:
        text = ("表示图片大小和box对应的宽度不一致")
        print(1)

if __name__ == '__main__':
    # compareImages(sys.argv[1], sys.argv[2])
    print(sys.argv[1])

