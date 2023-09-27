var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sum_lambda/index.ts
var sum_lambda_exports = {};
__export(sum_lambda_exports, {
  main: () => main
});
module.exports = __toCommonJS(sum_lambda_exports);
async function main(event) {
  const messages = event.Records.map((record) => {
    const body = JSON.parse(record.body);
    return { subject: body.Subject, message: body.Message };
  });
  console.log("messages \u{1F449}", JSON.stringify(messages, null, 2));
  return {
    body: JSON.stringify({ messages }),
    statusCode: 200
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
