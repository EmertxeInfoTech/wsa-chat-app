## Clerk
1. [Clerk Middleware](https://clerk.com/docs/references/express/overview#clerk-middleware) 

### Clerk Authentication with backend and starting user, to check backend

Steps are as follows:
1. Create 2 users: currentUser and otherUser
2. Copy the clerk public and private key into project .env file
3. clerk dashboard -> configure -> jwt tokens -> create template -> add NAME & EXPIRY DATE 
4. on the currentUser, click on the option to "impersonate user" and this opens a new tab, then Inspect --> console
5. Run the cmd, await.window.Clerk.session.getToken({template:"template_name" }), which gives the JWT token 

6. Create a MongoDb Schema, using the current user clerk id and MongoDb id and other id , using clerk id and MongoDb Id:
{
        "_id": "6814f070efdf4706b26179c2",
        "fromClerkId": "user_2wWqIJmS7S4L7UdiN8SoX8WWwwM",
        "toClerkId": "user_2wWqNAe4vkNNXyQ0Vypx9G17M5H",
        "from": "6814672e29db27718e5537f8",
        "to": "6814675529db27718e5537fb",
        "text": "Message from backend",
        "createdAt": "2025-04-29T09:37:05.309Z",
        "updatedAt": "2025-04-29T09:37:05.309Z",
        "__v": 0
    },

fromClerkid --> current User(ME)
toClerkId --> other user

7. Open POSTMAN to check the api is working or not
 Add a get request with the clerkid to whom you want to send the message as /:id
 `http://localhost:6500/api/messages/user_2wWqNAe4vkNNXyQ0Vypx9G17M5H`

 8. Hit send

 ### Create sendMessage controller with imagekit
 1. Configure the throught the SDK file of imagekit found in:
    [Imagekit developer](https://github.com/imagekit-developer/imagekit-nodejs)
 2. Install imagekit : npm i imagekit
 3.  Initialise imagekit and call the respective public, private and urlEndpoints from .env file of Imagekit:

import ImageKit from "imagekit";

let imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
});

4. Write the Api request for send Messages (inside try-catch block):
   userToChatId: params i.e. other userId
   currentUserId : Aditya's User id 
then,
 request for text as body, toClerkId as params

5. handle the text response and handling the images from imagekit using req.file
6. add the file as a string and add to the base64
7. Configure and install Multer: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
[Multer doc](https://www.npmjs.com/package/multer)




8.  npm i multer

import multer from "multer";

const upload = multer({storage: multer.memoryStorage()})

export {upload};

9. import sendMessages Api and upload in the messageRoutes.js 

messageRoutes.post("/send/:id", requireAuth(), upload.single("image"), sendMessages);

10. Open POSTMAN --> Headers:
  Set key as Authorization and the value as Bearer [token]
11. Body:
    Key as text, value: anything
    Key as file, value: image upload from device
12. Hit send

