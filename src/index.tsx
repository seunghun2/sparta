import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors())

// API: 시설 리스트
app.get('/api/facilities', async (c) => {
  const { DB } = c.env
  const category = c.req.query('category')
  
  let query = 'SELECT * FROM facilities'
  const params: any[] = []
  
  if (category && category !== 'all') {
    query += ' WHERE category = ?'
    params.push(category)
  }
  
  query += ' ORDER BY created_at DESC'
  
  try {
    const result = await DB.prepare(query).bind(...params).all()
    return c.json({ success: true, data: result.results || [] })
  } catch (error) {
    return c.json({ success: false, data: [] })
  }
})

// 메인 페이지
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>대대손손 - 장지·장례 정보 플랫폼</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qkhan94hdw"></script>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body, html { width: 100%; height: 100vh; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            
            /* 레이아웃 */
            .container { display: flex; height: 100vh; }
            
            /* 좌측 사이드바 */
            .sidebar {
                width: 420px;
                background: white;
                display: flex;
                flex-direction: column;
                border-right: 1px solid #e5e7eb;
                z-index: 10;
            }
            
            /* 헤더 */
            .header {
                padding: 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 4px;
            }
            
            .subtitle {
                font-size: 14px;
                color: #6b7280;
            }
            
            /* 검색 박스 */
            .search-box {
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .search-input-wrapper {
                display: flex;
                align-items: center;
                background: #f3f4f6;
                border-radius: 8px;
                padding: 12px 16px;
            }
            
            .search-input-wrapper i {
                color: #9ca3af;
                margin-right: 8px;
            }
            
            .search-input {
                flex: 1;
                border: none;
                background: transparent;
                outline: none;
                font-size: 14px;
            }
            
            /* 카테고리 탭 */
            .category-tabs {
                padding: 16px 20px;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                gap: 8px;
                overflow-x: auto;
            }
            
            .category-tab {
                padding: 8px 16px;
                border-radius: 20px;
                background: #f3f4f6;
                color: #4b5563;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                white-space: nowrap;
                transition: all 0.2s;
                border: none;
            }
            
            .category-tab:hover {
                background: #e5e7eb;
            }
            
            .category-tab.active {
                background: #3b82f6;
                color: white;
            }
            
            /* 시설 리스트 */
            .facility-list {
                flex: 1;
                overflow-y: auto;
                padding: 16px 20px;
            }
            
            .facility-count {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 16px;
            }
            
            .facility-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .facility-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateY(-2px);
            }
            
            .facility-category {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                color: white;
                margin-bottom: 8px;
            }
            
            .category-funeral_hall { background: #3b82f6; }
            .category-crematory { background: #f97316; }
            .category-columbarium { background: #10b981; }
            .category-natural_burial { background: #84cc16; }
            
            .facility-name {
                font-size: 16px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 8px;
            }
            
            .facility-info {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 4px;
            }
            
            .facility-info i {
                width: 16px;
                margin-right: 4px;
            }
            
            .facility-price {
                font-size: 16px;
                font-weight: bold;
                color: #3b82f6;
                margin-top: 8px;
            }
            
            /* 우측 지도 */
            .map-container {
                flex: 1;
                position: relative;
            }
            
            #map {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- 좌측 사이드바 -->
            <div class="sidebar">
                <!-- 헤더 -->
                <div class="header">
                    <div class="logo">🏔️ 대대손손</div>
                    <div class="subtitle">장지·장례 정보 플랫폼</div>
                </div>
                
                <!-- 검색 -->
                <div class="search-box">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search"></i>
                        <input type="text" class="search-input" placeholder="시설명 또는 지역 검색" id="searchInput">
                    </div>
                </div>
                
                <!-- 카테고리 탭 -->
                <div class="category-tabs">
                    <button class="category-tab active" data-category="all">전체</button>
                    <button class="category-tab" data-category="funeral_hall">장례식장</button>
                    <button class="category-tab" data-category="crematory">화장장</button>
                    <button class="category-tab" data-category="columbarium">봉안당</button>
                    <button class="category-tab" data-category="natural_burial">자연장지</button>
                </div>
                
                <!-- 시설 리스트 -->
                <div class="facility-list">
                    <div class="facility-count" id="facilityCount">0개 시설</div>
                    <div id="facilityList"></div>
                </div>
            </div>
            
            <!-- 우측 지도 -->
            <div class="map-container">
                <div id="map"></div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
