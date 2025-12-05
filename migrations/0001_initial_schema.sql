-- 시설 정보 테이블
CREATE TABLE IF NOT EXISTS facilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  phone TEXT,
  operator_type TEXT,
  operator_name TEXT,
  homepage TEXT,
  price_info TEXT,
  amenities TEXT,
  hours TEXT,
  data_source TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_category ON facilities(category);
CREATE INDEX IF NOT EXISTS idx_location ON facilities(lat, lng);
CREATE INDEX IF NOT EXISTS idx_operator ON facilities(operator_type);
