import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      let userIds = [];
      posts.forEach((item) => {
        userIds.push(item.user_id);
      });

      //Method 1 to user microservice from auth

      // let postwithusers = await Promise.all(
      //   posts.map(async (post) => {
      //     const res = await axios.get(
      //       `${process.env.AUTH_MICRO_URL}/api/fetchuser/${post.user_id}`
      //     );
      //     return {
      //       ...post,
      //       ...res.data,
      //     };
      //   })
      // );

      //*************************************/

      //Method 2 to user microservice from auth
      const response = await axios.post(
        `
      ${process.env.AUTH_MICRO_URL}/api/fetchusers`,
        userIds
      );

      const users = {};
      response.data.users.forEach((item) => {
        users[item.id] = item;
      });

      // const users = response.data.users;
      // const postwithUsers = await Promise.all(
      //   posts.map((post) => {
      //     const user = users.find((item) => item.id == post.user_id);
      //     return {
      //       ...post,
      //       user,
      //     };
      //   })
      // );

      // Methosd-3
      let postwithUsers = await Promise.all(
        posts.map((post) => {
          const user = users[post.user_id];
          return {
            ...post,
            user,
          };
        })
      );

      return res.json({ postwithUsers });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong (:",
      });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          user_id: authUser.id,
          title,
          content,
        },
      });
      return res.status(200).json({
        message: "Post created Successfully",
        post,
      });
    } catch (error) {
      res.status(500).json({
        message: "Somethings wants wrong (:",
      });
    }
  }
}

export default PostController;
