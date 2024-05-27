import prisma from "../config/db.connect.js";

class UserController {
  static async getUser(req, res) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.json({ user: user });
  }

  static async getUsers(req, res) {
    try {
      const { userIds } = req.body;
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return res.status(200).json({
        message: "Fetch user Successfully",
        users: users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Somethings wants wrong (:",
      });
    }
  }
}

export default UserController;
