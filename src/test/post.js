// const { api } = require("./helpers");
// const { PostModel, UserModel } = require("../models");

// beforeAll(async () => {
//     await UserModel.deleteMany({});
//     await PostModel.deleteMany({});

//     const newUser = {
//         password: "xxx",
//         alias: "nickName",
//         publicKey: "123456",
//     };
//     const res = await api.post("/api/v1/signup").send(newUser);

//     const newUser2 = {
//         password: "zzz",
//         alias: "nickNamezz",
//         publicKey: "654321",
//     };
//     const res2 = await api.post("/api/v1/signup").send(newUser2);

// });

// describe("Posts Endpoints", () => {
//     describe("Add Post ", () => {
//         test("should to create a Post", async () => {
//             const post = {
//                 uid: "xxx",
//                 publicKey: "123456",
//                 author: "xxx",
//                 type: "image",
//                 title: "title test ",
//                 description: "This is a test for recheck functions ",
//                 file: "https://www.sciencenewsforstudents.org/wp-content/uploads/2019/11/860_blue_light_and_sleep.png"
//             };

//             const res = await api.post("/api/v1/createpost").send(post);

//             expect(res.statusCode).toBe(201);
//             expect(res.body.success).toEqual(true);
//             expect(res.body.data.title).toEqual(post.title);
//             expect(res.body.data.description).toEqual(post.description);
//         });

//         test("should to fail to create a Post", async () => {
//             const post = {
//                 uid: "yyy",
//                 publicKey: "123456",
//                 author: "xxx3",
//                 type: "image",
//                 title: "title test ",
//                 description: "This is a test for recheck functions ",
//                 file: "https://www.sciencenewsforstudents.org/wp-content/uploads/2019/11/860_blue_light_and_sleep.png"
//             };

//             const res = await api.post("/api/v1/createpost").send(post);

//             expect(res.statusCode).toBe(401);
//             expect(res.body.success).toEqual(false);
//             expect(res.body.msg).toEqual('Unauthorized');
//         });
//     });

//     describe("Get User Post", () => {
//         test("should get all User Posted", async () => {
//             const post = {
//                 uid: "xxx",
//                 publicKey: "123456",
//             };

//             const res = await api.post("/api/v1/getuserposts").send(post);

//             expect(res.statusCode).toBe(200);
//             expect(res.body.success).toEqual(true);
//             expect(res.body.data[0].title).toEqual("title test ");
//             expect(res.body.data[0].description).toEqual("This is a test for recheck functions ");
//         });

//         test("The user dont have posts ", async () => {
//             const post = {
//                 uid: "zzz",
//                 publicKey: "654321",
//             };

//             const res = await api.post("/api/v1/getuserposts").send(post);

//             expect(res.statusCode).toBe(200);
//             expect(res.body.success).toEqual(true);
//             expect(res.body.msg).toEqual("This User do not have Posts");
//         })


//     })
// })