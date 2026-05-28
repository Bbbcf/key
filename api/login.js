import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false
    });
  }

  try {
    const { username, password } = req.body;

    const client = await clientPromise;
    const db = client.db('app');

    const user = await db.collection('users').findOne({
      username,
      password
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Sai tên đăng nhập hoặc mật khẩu'
      });
    }

    return res.status(200).json({
      success: true,
      username: user.username,
      token: `token_${user.username}`
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
}
