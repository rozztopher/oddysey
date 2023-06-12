const fetch = require("node-fetch");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.json");
const waitinglist = require("./waitinglist.json");

function buf2hex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

app.post("/api/isallowlist", (req, res) => {
  try {
    let { add } = req.body;
    const leaves = whitelist.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const leaf = keccak256(add);
    const hexproof = tree.getProof(leaf).map((x) => "0x" + buf2hex(x.data));
    const positions = tree
      .getProof(leaf)
      .map((x) => (x.position === "right" ? 1 : 0));

    res.status(200).json({
      status: "confirm",
      data: { hexproof: hexproof, positions: positions },
    });
  } catch (e) {
    console.log("error while retrieving the merkle tree", e);
  }
});

app.post("/api/iswaitinglist", (req, res) => {
  try {
    let { add } = req.body;
    const leaves = waitinglist.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const leaf = keccak256(add);
    const hexproof = tree.getProof(leaf).map((x) => "0x" + buf2hex(x.data));
    const positions = tree
      .getProof(leaf)
      .map((x) => (x.position === "right" ? 1 : 0));

    res.status(200).json({
      status: "confirm",
      data: { hexproof: hexproof, positions: positions },
    });
  } catch (e) {
    console.log("error while retrieving the merkle tree", e);
  }
});

app.post("/api/captureEmail", (req, res) => {
  try {
    let { email } = req.body;
    const JSONString = fs.readFileSync("./emails.json", "utf8");
    const JSData = JSON.parse(JSONString);
    let message = "You are already subscribed";
    if (!JSData.includes(email)) {
      JSData.push(email);
      message = "Successfully subscribed";
    }
    const newJSONString = JSON.stringify(JSData, null, 2);
    fs.writeFileSync("./emails.json", newJSONString);

    res.status(200).json({
      status: "confirm",
      data: { message: message },
    });
  } catch (e) {
    console.log("error while capturing email", e);
  }
});

app.get("/", (req, res) => res.send("ALMA"));

var PORT = process.env.PORT || 80;

let server = app.listen(PORT, () => {
  console.log("Odyssey server running on port ", PORT);
});

//@info server will be closed in case of any unhandledRejection
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
  server.close(() => process.exit(1));
});
