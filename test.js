const fs = require("fs");
const ytdl = require("ytdl-core");
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const test = async () => {
  let a = await ytdl.getInfo("https://www.youtube.com/watch?v=xX7xWEh6ujk");
  console.log(a);
};
test();
