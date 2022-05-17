
// const { api } = require("./helpers");

// describe("User Endpoints", () => {
//     describe("Get User endpoint", () => {
//         test("should get a user", async () => {
//             const findUser = {
//                 uid: "xxx310",
//                 publicKey: "1433453",
//             };

//             const res = await api.post("/api/v1/finduser").send(findUser);

//             expect(res.statusCode).toBe(200);
//             expect(res.body.success).toEqual(true);
//         });
//     });

//     describe("Update User endpoint", () => {
//         test("should update a user", async () => {
//             const updateUser = {
//                 uid: "xxx310",
//                 publicKey: "1433453",
//                 username: "gta310",
//             };

//             const res = await api.patch("/api/v1/users").send(updateUser);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body.success).toEqual(true);
//             expect(res.body.data.username).toEqual(updateUser.username);
//         });
//     });
// });