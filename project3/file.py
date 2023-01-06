
try:
    a = input()
    with open("./tmp.txt", "w") as f:
        f.truncate()
        f.write(a)
    print(a,end="")

except:
    pass