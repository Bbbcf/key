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
    const { username, password } = req.body;

    if (!username || !password) {
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

    const user = users.find(
      u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Sai tên đăng nhập hoặc mật khẩu'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
}
