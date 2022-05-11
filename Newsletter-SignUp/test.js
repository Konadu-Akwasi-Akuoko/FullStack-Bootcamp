const mailchimp = require("@mailchimp/mailchimp_marketing");
//My API key
const myAPIKey = require("./config.js").configAPI.apiKey;

mailchimp.setConfig({
  apiKey: myAPIKey,
  server: "us2",
});

async function pingHost() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

pingHost();

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: myAPIKey,
    server: "us2",
});

const run = async () => {
  const response = await client.lists.getAllLists();
  console.log(response);
};

run();
