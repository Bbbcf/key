import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu dữ liệu'
      });
    }

    const filePath = path.join(process.cwd(), 'data', 'users.json');

    let users = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      users = JSON.parse(fileData || '[]');
    }

    const exists = users.find(
      user =>
        user.username === username ||
        user.email === email
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Tài khoản đã tồn tại'
      });
    }

    users.push({
      username,
      email,
      password
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify(users, null, 2)
    );

    return res.status(200).json({
      success: true,
      message: 'Đăng ký thành công'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
}
