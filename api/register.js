const users = [];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu dữ liệu'
    });
  }

  const exists = users.find(
    u => u.username === username || u.email === email
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

  return res.status(200).json({
    success: true,
    message: 'Đăng ký thành công'
  });
}
