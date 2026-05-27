const users = [];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false
    });
  }

  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Sai tài khoản hoặc mật khẩu'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Đăng nhập thành công',
    user
  });
}
