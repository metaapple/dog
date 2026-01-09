import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

app.use(cors())
app.use(express.json())

// SQLite 데이터베이스 연결
const db = new Database(join(__dirname, 'pets.db'))

// 데이터베이스 초기화
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    breed TEXT,
    age INTEGER NOT NULL,
    weight REAL NOT NULL,
    activity TEXT NOT NULL,
    health TEXT,
    allergies TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    pet_id INTEGER NOT NULL,
    plan_name TEXT NOT NULL,
    plan_id INTEGER NOT NULL,
    frequency TEXT NOT NULL,
    servings INTEGER NOT NULL DEFAULT 2,
    price INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pet_id) REFERENCES pets(id)
  );
`)

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: '인증이 필요합니다.'
    })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: '유효하지 않은 토큰입니다.'
      })
    }
    req.user = user
    next()
  })
}

// 회원가입 API
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: '이메일, 비밀번호, 이름을 모두 입력해주세요.'
      })
    }

    // 이메일 중복 체크
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '이미 사용 중인 이메일입니다.'
      })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 사용자 생성
    const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)')
    const result = stmt.run(email, hashedPassword, name)

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: result.lastInsertRowid, email, name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: result.lastInsertRowid,
        email,
        name
      },
      message: '회원가입이 완료되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 로그인 API
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '이메일과 비밀번호를 입력해주세요.'
      })
    }

    // 사용자 조회
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.'
      })
    }

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.'
      })
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      message: '로그인되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 현재 사용자 정보 조회 API
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').get(req.user.id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 반려동물 등록 API (인증 필요)
app.post('/api/pets', authenticateToken, (req, res) => {
  try {
    const { name, type, breed, age, weight, activity, health, allergies } = req.body
    const userId = req.user.id

    const stmt = db.prepare(`
      INSERT INTO pets (user_id, name, type, breed, age, weight, activity, health, allergies)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(userId, name, type, breed, age, weight, activity, health || '', allergies || '')
    
    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: '반려동물이 등록되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 반려동물 목록 조회 API (인증 필요)
app.get('/api/pets', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id
    const stmt = db.prepare('SELECT * FROM pets WHERE user_id = ? ORDER BY created_at DESC')
    const pets = stmt.all(userId)
    
    res.json({
      success: true,
      data: pets
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 반려동물 상세 조회 API (인증 필요)
app.get('/api/pets/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const stmt = db.prepare('SELECT * FROM pets WHERE id = ? AND user_id = ?')
    const pet = stmt.get(id, userId)
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: '반려동물을 찾을 수 없습니다.'
      })
    }
    
    res.json({
      success: true,
      data: pet
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 구독 등록 API (인증 필요)
app.post('/api/subscriptions', authenticateToken, (req, res) => {
  try {
    const { petId, planName, planId, frequency, servings, price } = req.body
    const userId = req.user.id

    // 반려동물이 해당 사용자의 것인지 확인
    const pet = db.prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?').get(petId, userId)
    if (!pet) {
      return res.status(403).json({
        success: false,
        message: '해당 반려동물에 대한 권한이 없습니다.'
      })
    }

    const stmt = db.prepare(`
      INSERT INTO subscriptions (user_id, pet_id, plan_name, plan_id, frequency, servings, price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
    `)

    const result = stmt.run(userId, petId, planName, planId, frequency, servings || 2, price)
    
    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: '구독이 완료되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 구독 목록 조회 API (인증 필요)
app.get('/api/subscriptions', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id
    const stmt = db.prepare(`
      SELECT 
        s.*,
        p.name as pet_name,
        p.type as pet_type
      FROM subscriptions s
      JOIN pets p ON s.pet_id = p.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC
    `)
    const subscriptions = stmt.all(userId)
    
    res.json({
      success: true,
      data: subscriptions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 구독 취소 API (인증 필요)
app.patch('/api/subscriptions/:id/cancel', authenticateToken, (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    
    // 구독이 해당 사용자의 것인지 확인
    const subscription = db.prepare('SELECT id FROM subscriptions WHERE id = ? AND user_id = ?').get(id, userId)
    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: '해당 구독에 대한 권한이 없습니다.'
      })
    }
    
    const stmt = db.prepare('UPDATE subscriptions SET status = ? WHERE id = ? AND user_id = ?')
    const result = stmt.run('cancelled', id, userId)
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: '구독을 찾을 수 없습니다.'
      })
    }
    
    res.json({
      success: true,
      message: '구독이 취소되었습니다.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`)
})
