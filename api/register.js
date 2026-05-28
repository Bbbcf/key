import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
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

    const client = await clientPromise;
    const db = client.db('app');

    const existingUser = await db.collection('users').findOne({
      username
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Tài khoản đã tồn tại'
      });
    }

    await db.collection('users').insertOne({
      username,
      email,
      password
    });

    return res.status(200).json({
      success: true,
      message: 'Đăng ký thành công'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Lỗi server'
    });
  }
}
