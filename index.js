const { SMTPServer } = require("smtp-server");
const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,

  onConnect(session, callback) {
    console.log(`onConnect -> ${session.id}`);

    callback(); // Accept
    // callback(new Error("Cannot Accect")); // Reject

    // why reject if you dont want to recieve mail from gmail.com
  },
  onMailFrom(address, session, callback) {
    console.log(`onMailFrom ${address.address} -> ${session.id}`);
    // here ${address.address} is senders email
    // if senders email is spam then reject it
    // callback(new Error("Cannot Accect")); // Reject
    //if not
    callback(); // Accept
  },
  onRcptTo(address, session, callback) {
    console.log(`onRcptTo ${address.address} -> ${session.id}`);
    // check the mail is valid
    // here ${address.address} is recievers address
    // check in db is there any mail exist
    // ex - mailme@abc.com
    // if mailme username not exist reject it
    // callback(new Error("Cannot Accect")); // Reject
    callback(); // Accept
  },
  onData(stream, session, callback) {
    stream.on("data", data => {
      console.log("onData ->", data.toString());
      // store this data to in username account your DB
    });
    stream.on("end", callback);
  },
});

// 25 is smtp mail port
server.listen(25, () => {
  console.log("Mail Server is running on port : 25");
});
