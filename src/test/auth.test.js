// const { api, connection } = require("./helpers");
const { UserModel } = require("../models");
const { signup } = require("../controllers/user-controler")
beforeAll(async () => {
  await UserModel.deleteMany({});
});


jest.mock("../models/User-model")
describe("Auth Endpoints", () => {
  describe("Auth register endpoints", () => {
    test("should register a new user", async () => {
      const res = {
        status: jest.fn()
      };
      const req = {
        body: {
          password: "xxx310",
          alias: "nickNamexx",
          publicKey: "1433453",
          avatar: ""
        }
      }
      UserModel.create.mockReturnValue({})
      await signup(res, req);

      expect(res.status).toEqual(201);
    // const newUser = {
    //   password: "xxx310",
    //   alias: "nickNamexx",
    //   publicKey: "1433453",
    // };
    // const res = await api.post("/api/v1/signup").send(newUser);
    // expect(res.statusCode).toEqual(201);
    // expect(res.body.success).toEqual(true);
    // expect(res.body.data.uid).toEqual(newUser.password);
    // expect(res.body.data.username).toEqual(newUser.alias);
  });

  // test("should register a exist user", async () => {
  //   const newUser = {
  //     uid: "xxx310",
  //     username: "nickNamexx",
  //     publicKey: "1433453",
  //   };
  //   const res = await api.post("/api/v1/signup").send(newUser);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.success).toEqual(false);
  // });

  // test("should comprove is same public key", async () => {
  //   const newUser = {
  //     uid: "x",
  //   };
  //   const res = await api.post("/api/v1/login").send(newUser);
  //   expect(res.statusCode).toEqual(401);
  //   expect(res.body.success).toEqual(false);
  // });
});

  // describe("Auth login endpoints", () => {
  //   test("should correct login user a login", async () => {
  //     const user = {
  //       uid: "xxx310",
  //     };
  //     const res = await api.post("/api/v1/login").send(user);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body.success).toEqual(true);
  //   });
  //   test("should failed login user a login", async () => {
  //     const newUser = {
  //       uid: "x",
  //     };
  //     const res = await api.post("/api/v1/login").send(newUser);
  //     expect(res.statusCode).toEqual(401);
  //     expect(res.body.success).toEqual(false);
  //   });
  // });
});
