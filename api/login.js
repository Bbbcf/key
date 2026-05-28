let users = global.users || [];
global.users = users;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false
    });
  }

  const { username, password } = req.body;

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
    user
  });
}
