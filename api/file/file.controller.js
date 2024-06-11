const File = require("./file.model");
/**
 * @swagger
 * /createFile:
 *   post:
 *     summary: Create a new file.
 *     description: Endpoint to create a new file and store its path.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                   description: HTTP status code.
 *                 data:
 *                   type: object
 *                   description: Details of the created file.
 *                   properties:
 *                     path:
 *                       type: string
 *                       description: Path of the created file.
 *                       example: "/uploads/file.txt"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal Server Error"
 */
const createFile = async (req, res, next) => {
  try {
    const path = req.file ? req.file.path : "";

    const file = await File.create({ path });
    res.json({
      status: 201,
      msg: "he creado un file",
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createFile };
