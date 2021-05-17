import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    if (
      (!email ||
        !name ||
        !message ||
        email.trim() === "" ||
        !email.includes("@") ||
        name.trim() === "",
      message.trim() === "")
    ) {
      res.status(422).json({ message: "Invalid data" });
      return;
    }

    const contactData = {
      email: email,
      name: name,
      message: message,
    };

    console.log(contactData);
    let client;
    try {
        client = await MongoClient.connect(
      "mongodb+srv://erasmusantwi:g7diuKBkinuFJhQk@cluster0.uv3ti.mongodb.net/my-site?retryWrites=true&w=majority", {useUnifiedTopology: true}
    );
    } catch( error ) {
        res.status(500).json({message: "Could not connect to database"})
        return
    }

    const db = client.db()

    try {
        const result = await db.collection('messages').insertOne(contactData)
        contactData.id = result.insertedId
    } catch (error) {
        client.close()
        res.status(500).json({message: 'Storing message failed'})
        return
    }

    client.close()
    
    
    
    res.status(201).json({ message: "Message sent successfully" });
  }
};

export default handler;
