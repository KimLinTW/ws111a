import sys
from fastapi import FastAPI
from pymongo import MongoClient
from typing import Optional
import hashlib


url = 'mongodb+srv://dbUser:dbuser@magicmirror.xcrmaww.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(url)
# req = sys.argv[1]
# req = sys.stdin.read()

req = input()
# req = "getpost"
# req = 'post$I feel very good today$Zzz$https://i.imgur.com/bLuqfnQ.jpg$"Kim"'

def main(req):
    if "http" in req:
        req = req.split('$')
        pass
    else: req = req.split('.')
    if req[0] == 'isSign':
        all = show('sign')
        if req[1] in all:
            print("already exist") 
            return
        else : 
            # req = "isSign.name.password.mail"
            m = hashlib.md5()
            m.update((req[2]+"salt").encode("utf-8"))
            h = m.hexdigest()

            item={"name":f"{req[1]}","pas":f"{h}","mail":f"{req[3]}"}
            insert("sign",item)
            print("OK")
            return
    elif req[0] == 'login':
        # req = "login.Kim.abc123"
        name = req[1]
        pas = req[2]
        m = hashlib.md5()
        m.update((req[2]+"salt").encode("utf-8"))
        h = m.hexdigest()
        pas = h
        if find_one('sign',item={"name":f"{name}"})["pas"] == pas:
            print("OK pass is right")
            return
        else :
            print("pass or name error")
            return
    elif req[0] == 'post':
        titl = req[1]
        cont = req[2]
        img = req[3]
        aut = req[4]
        item={"titl":f"{titl}","cont":f"{cont}","img":f"{img}", "aut":f"{aut}"}
        print(item)
        insert("post",item)
        print("OK")
        return
    elif req[0] == "getpost":
        all = show('post')
        print(all,end="")
        # for i in all:
        return
        
    else:
        pass
            
        

    



def update_counter(table):
    try:
        c = int(find_one(table, item={"id":"0"})['counter'])
        db = client['web']
        update(table, item={"id":"0"} , new_item = {'counter':c+1})
        return c+1
    except Exception as e:
        db = client['web']
        collection = db[table]
        item={"id":"0", "counter":"0"}
        collection.insert_one(item)
        print(e)
        

def insert(table="func", item={"id":"1", "name":"tstObject"}):
    item["id"] = update_counter(table)
    db = client['web']
    collection = db[table]
    collection.insert_one(item) 
    # result = find_one(table,item)


def delete(table="func", match={'id':'0'}, del_item={'name':'0'}):
    db = client['web']
    collection = db[table]
    result = collection.find_one(match) # 查看
    if result == None: 
        print(f"{match} is not in {table}")
        return
    else: print(f"{result} was deleted")
    collection.delete_one(match)

    # result = find_one(table,match)
    # print(f"was {result} deleted ?")

    # db.games.deleteOne({name:"Snake"})

    pass


def find_one(table="func", item={"id":"1", "name":"tstObject"}):
    db = client['web']
    collection = db[table]
    result = collection.find_one(item) # 查看
    if table == "func" and "code" in item:
        print(result["code"])
        return result["code"]
    return result

    
def update(table="func", item={"id":"1"} , new_item = {'code':""}):
    db = client['web']
    result = find_one(table,item)
    # print(f"{result}\n ^ is already updated to v\n", end="")
    collection = db[table]
    collection.update_one(item, {'$set': new_item})
    result = find_one(table,item)
    # print(f"{result}")


def show(table = "func"):
    db = client['web']
    collection = db[table]
    tmp = ""

    if table == 'sign':
        for x in collection.find():
            try:
                name = x['name']
                pas = x['pas']
                id = x['id']
                mail = x['mail']
                # tmp += f"名稱:{name}, id:{id}, 密碼:{pas}, mail:{mail}" + "\n"
                tmp += name + "\n"
            except Exception as e:
                pass
    elif table == "post":   
        for x in collection.find():
            # print(x)
            try:
                titl = x['titl']
                cont = x['cont']
                img = x['img']
                aut = x['aut']
                tmp += f"{titl},{cont},{img},{aut}$"
                # tmp += f"title:{titl}, content:{cont}, img:{img}, aut:{aut}" + "\n"
            except:
                pass
    return tmp


# a = show('sign')
# req = "isSign.Kim.abc123.linkim0914@gmail.com"
# insert("sign", item={"id":"0", "counter":"0"})
try:
    main(req)
except Exception as e:
    print(e)
# print(a)

# delete(table="post", match={'cont':'Zzz'})