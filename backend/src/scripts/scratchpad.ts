import { Template } from "../entity/Template.ts";
import { AppDataSource } from "../data-source.ts";

await AppDataSource.initialize();

const manager = AppDataSource.manager;
const template = await manager.findOne(Template, {
  where: {},
});
console.log(template);

// console.log(template);
// var videoId = "video_68f5c7b601648190a7d08852d5ccb4f5009c701f86bb0e7f";
// var { Template } = require("../entity/Template.js");
// var appDataSource = require("./dist/data-source.js");
// var dataSource = appDataSource.initialize();

// console.log(template);
