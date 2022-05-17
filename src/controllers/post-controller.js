const { sendResponse, sendError } = require("../utils/response");
const UserModel = require("../models/User-model");
const PostModel = require("../models/Post-model");
const CommunityModel = require("../models/Communities-model");
//TODO [ 1 ] => for manage error we verify if all parameters to search do exist,
//TODO [ 2 ] => if one parameter do not exists, trow a error,
//TODO [ 3 ] => if all parameters are corrects pass to next step, create, find, delete, update.
//TODO [ 4 ] => after execute return a status and result
//TODO [ R ] => requiments

async function addPost(req, res) {
    //TODO [ R ]
    const { publicKey, type, title, description, file } = req.body;
    //TODO [ 1 ]
    try {
        const user = await UserModel.findOne({ publicKey: publicKey });

        //TODO [ 2 ]
        if (!user) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }

        //TODO [ 3 ]
        const newPost = await PostModel.create({
            author: user._id,
            type: type,
            title: title,
            description: description,
            file: file,
            publicationDate: Date.now(),
        });

        const userPosts = await PostModel.find({ author: user._id });

        const updatePost = await UserModel.updateOne({ _id: user._id }, { $set: { posts: userPosts } });

        //TODO [ 4 ]
        return res.status(201).send(sendResponse(newPost));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function getUserPosts(req, res) {
    //TODO [ R ]
    const { publicKey } = req.body;
    try {
        //TODO [ 1 ]
        const userId = await UserModel.findOne({ publicKey: publicKey });
        //TODO [ 2 ]
        if (!user) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }

        //TODO [ 3 ]
        const userPosts = await PostModel.find({
            author: userId._id,
        }).populate("author");

        if (userPosts.length <= 0) {
            return res.json(sendError("This User do not have Posts"));
        }

        //TODO [ 4 ]
        return res.json(sendResponse(userPosts));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function updateUserPost(req, res) {
    //TODO [ R ]
    const { _id, data } = req.body;

    try {
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 3 ]
        const postId = await PostModel.updateOne({ _id: _id }, { $set: data });

        //TODO [ 4 ]
        return res.json(sendResponse(postId));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function deletePost(req, res) {
    //TODO [ R ]
    const { _id } = req.body;

    try {
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 3 ]
        const postId = await PostModel.deleteOne({ _id: _id });

        const foundPost = await CommunityModel.find({ posts: _id });
        foundPost.forEach(async (element) => {
            await CommunityModel.updateOne(
                { _id: element._id },
                { $pull: { posts: _id } }
            );
        });

        //TODO [ 4 ]
        return res.json(
            sendResponse({
                msg: " the Post have been deleted",
                data: postId._id,
            })
        );
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function likedPost(req, res) {
    //TODO [ R ]
    const { _id, publicKey } = req.body;

    try {
        //TODO [ 1 ]
        const user = await UserModel.findOne({ publicKey: publicKey });

        //TODO [ 2 ]
        if (!user) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }

        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        // //TODO [ 3 ]
        const checkLikes = await PostModel.findOne({
            $and: [{ _id: _id }, { likes: publicKey }],
        });

        if (checkLikes) {
            var result = await PostModel.updateOne(
                { _id: _id },
                { $pull: { likes: publicKey } }
            );
        } else {
            var result = await PostModel.updateOne(
                { _id: _id },
                { $push: { likes: publicKey } }
            );
        }

        const postchange = await PostModel.findOne({
            $and: [{ _id: _id }, { likes: publicKey }],
        });

        dataResult = {
            msg: "Like change",
            checkLike,
            postchange,
        };
        //TODO [ 4 ]
        return res.json(sendResponse(dataResult));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function countLikes(req, res) {
    //TODO [ R ]
    const { _id } = req.body;

    try {
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 4 ]
        return res.json(sendResponse(findPost.likes.length));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function checkLike(req, res) {
    //TODO [ R ]
    const { _id, publicKey } = req.body;

    try {
        //TODO [ 1 ]
        const user = await UserModel.findOne({ publicKey: publicKey });

        //TODO [ 2 ]
        if (!user) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 3 ]
        const checkLikes = await PostModel.findOne({
            $and: [{ _id: _id }, { likes: user._id }],
        });

        if (checkLikes) {
            var likeResult = true;
        } else {
            var likeResult = false;
        }

        //TODO [ 4 ]
        return res.json(sendResponse(likeResult));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function wallPosts(req, res) {
    //TODO [ R ]
    const { publicKey } = req.body;

    try {
        //TODO [ 1  ]
        const userId = await UserModel.findOne({ publicKey: publicKey });
        //TODO [ 2 ]
        if (!userId) {
            return res
                .status(404)
                .json(sendError("this User do not exist, verify your data"));
        }

        const userPosts = await PostModel.find({ author: userId._id });

        const updatePost = await UserModel.updateOne({ _id: userId._id }, { $set: { posts: userPosts } });

        //TODO [ 3 ]
        const userFriends = userId.friends.map((friend) => {
            return friend.user;
        });
        userFriends.push(userId._id);

        //TODO get  all posts, user and friends
        const allFriendsPosts = await friendsPosts(userFriends);

        //TODO sorted all posts bu publication date
        const sortedPostList = allFriendsPosts.sort((a, b) => {
            return b.publicationDate.getTime() - a.publicationDate.getTime();
        });

        var result = {
            NumberPosts: userId.posts.length,
            sortedPostList,
            userFriends: userId.friends,
        };
        //! Avisar a grupo
        const datasorted = await CommunityModel.find({ posts: { $in: sortedPostList } });
        result.sortedPostList = result.sortedPostList.filter(
            (post) => !datasorted.some((element) => element.posts.includes(post._id))
        );

        return res.json(sendResponse(result));

        //TODO [ 4 ]
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function addComments(req, res) {
    //TODO [ R ]
    const { _id, data } = req.body;

    try {
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 3 ]
        await PostModel.updateOne({ _id: _id }, { $push: data });

        //TODO [ 4 ]
        return res.json(sendResponse(" Comment added "));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

async function getPostComments(req, res) {
    //TODO [ R ]
    const { _id } = req.body;

    try {
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 3 ]
        const postComments = findPost.comments;

        //TODO [ 4 ]
        return res.json(sendResponse(postComments));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

//TODO search each friend  all posts they post
//! this function need to receive a object id to work,
//! if pass a publicKey need to add the commented function above
async function friendsPosts(friendsArray) {
    let allPosts = [];

    for (let index = 0; index < friendsArray.length; index++) {
        const element = friendsArray[index];
        const userPosts = await PostModel.find({
            author: element,
        }).populate("author");

        allPosts = [...userPosts, ...allPosts];
    }

    return allPosts;
}

//TODO search a post by ID
//! this function is for test --->
async function findPost(req, res) {
    //TODO [ R ]
    const { _id } = req.body;

    try {
        //TODO [ 1 ]
        const findPost = await PostModel.findOne({ _id: _id });

        //TODO [ 2 ]
        if (!findPost) {
            return res.json(sendError("Post not found"));
        }

        //TODO [ 4 ]
        return res.json(sendResponse(findPost));
    } catch (error) {
        res.status(500).json(sendError());
    }
}

module.exports = {
    addPost,
    getUserPosts,
    getPostComments,
    addComments,
    countLikes,
    likedPost,
    deletePost,
    findPost,
    updateUserPost,
    wallPosts,
    checkLike,
};
