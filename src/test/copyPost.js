 
     // const newUser2 = {
    //     password: "zzz",
    //     alias: "nickName",
    //     publicKey: "654321",
    // };
    // const res2 = await api.post("/api/v1/signup").send(newUser2);

 
 // test("The user dont have posts ", async () => {
        //     const post = {
        //         uid: "xxx",
        //         publicKey: "654321",
        //     };

        //     const res = await api.post("/api/v1/getuserposts").send(post);

        //     expect(res.statusCode).toBe(200);
        //     expect(res.body.success).toEqual(true);
        //     expect(res.body.msg).toEqual("This User do not have Posts");
        // })


      //   async function countlikePost(req, res) {
         // const { _id, publicKey, likes } = req.body;
       
         // console.log(_id)
         // console.log(publicKey)
         // console.log(likes)
       
         // try {
         //   const findPost = await PostModel.findOne({ _id: _id });
       
         //   if (!findPost) {
         //     return res.json(sendError("Post not found"));
         //   }
       
         //   console.log(likes.totalLikes === true)
       
         //   // if (likes.totalLikes === true) {
         //   //   const postId = await PostModel.updateOne({ "_id": _id }, { $set: { "userLiked": publicKey } },
         //   //     { $inc: { "totalLikes": 1 } })
         //   //     return postId
         //   // }
       
         //   return res.json(sendResponse(postId));
         // } catch (error) {
         //   console.log(error);
         //   res.status(500).json(sendError());
         //}
      // }