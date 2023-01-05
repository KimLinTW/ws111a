import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { MongoClient } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';

const { MongoClient } = require('mongodb');
const client = new MongoClient();
client.connectWithUri('mongodb+srv://dbUser:dbuser@magicmirror.xcrmaww.mongodb.net/?retryWrites=true&w=majority');
const result = await shops.findOne({ id: 3394 });
console.log(result);