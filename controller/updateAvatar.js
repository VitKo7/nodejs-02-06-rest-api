const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');
const User = require('../schemas/user');

const uploadImageDir = path.join(process.cwd(), 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    const filePath = req.file.path;

    console.log('req.file :>> ', req.file);

    fs.writeFile(filePath, function (error) {
      if (error) throw error;
      fs.readFileSync(filePath, 'utf8');
    });

    const now = new Date();
    const prefix = `${now.getFullYear()}.${
      now.getMonth() + 1
    }.${now.getDate()}_${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`;

    const newAvatarName = `${prefix}_${req.file.originalname}`;

    const img = await Jimp.read(filePath);

    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(path.join(uploadImageDir, newAvatarName));

    const avatarUrl = path.normalize(path.join(uploadImageDir, newAvatarName));

    await User.updateOne({ _id: id }, { avatarUrl });

    return res.json({
      status: 'Success',
      code: 200,
      message: 'The avatar is successfully uploaded!',
      data: {
        avatarUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateAvatar;
