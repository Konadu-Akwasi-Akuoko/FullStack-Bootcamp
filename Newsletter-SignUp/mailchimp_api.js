// Use the mailchimp api client libraries to make calls to the mailchimp api.
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Import the apiKeys and audienceID from the config file
const apiKey = require("./config.js").configAPI.apiKey;
const audienceID = require("./config.js").configAPI.audienceID;

mailchimp.setConfig({
  apiKey: apiKey,
  server: "us2",
});

let mailchimpListQueries = {
  //Add a new member to the audience or newsletter list
  addMemberToList: async function (fName, lName, pNumber, bDay, eAddress) {
    console.log("-----------------------------------" + eAddress);
    const response = await mailchimp.lists.addListMember(
      audienceID,
      {
        email_address: eAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
          PHONE: pNumber,
          BIRTHDAY: bDay,
        },
      },
      { skipMergeValidation: true }
    );
    console.log(response);
    //This returns the response from the mailchimp api in an object form
    return response;
  },
  //A test to see if everything is working fine
  isWorking: true,
};

module.exports = { mailchimpListQueries };
