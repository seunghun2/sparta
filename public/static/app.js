// 전역 변수
let map;
let markers = [];
let facilities = [];
let currentCategory = 'all';

// 카테고리 정보
const CATEGORIES = {
  funeral_hall: { name: '장례식장', color: '#3b82f6' },
  crematory: { name: '화장장', color: '#f97316' },
  columbarium: { name: '봉안당', color: '#10b981' },
  natural_burial: { name: '자연장지', color: '#84cc16' }
};

// 지도 초기화
function initMap() {
  if (typeof naver === 'undefined' || typeof naver.maps === 'undefined') {
    console.error('네이버 지도 API 로드 실패');
    return;
  }
  
  try {
    const mapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.9780),
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_CENTER
      }
    };
    
    map = new naver.maps.Map('map', mapOptions);
    console.log('✅ 네이버 지도 초기화 완료');
  } catch (error) {
    console.error('지도 초기화 오류:', error);
  }
}

// 시설 데이터 로드
async function loadFacilities(category = 'all') {
  try {
    const url = category === 'all' 
      ? '/api/facilities' 
      : `/api/facilities?category=${category}`;
    
    const response = await axios.get(url);
    
    if (response.data.success) {
      facilities = response.data.data;
      updateMap();
      updateList();
    }
  } catch (error) {
    console.error('데이터 로드 실패:', error);
  }
}

// 지도 마커 업데이트
function updateMap() {
  if (!map) return;
  
  // 기존 마커 제거
  markers.forEach(marker => marker.setMap(null));
  markers = [];
  
  // 필터링된 시설
  const filtered = currentCategory === 'all' 
    ? facilities 
    : facilities.filter(f => f.category === currentCategory);
  
  // 마커 생성
  filtered.forEach(facility => {
    const position = new naver.maps.LatLng(facility.lat, facility.lng);
    const categoryInfo = CATEGORIES[facility.category];
    
    const marker = new naver.maps.Marker({
      position: position,
      map: map,
      title: facility.name,
      icon: {
        content: `<div style="
          background: ${categoryInfo.color};
          color: white;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 13px;
          font-weight: bold;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          white-space: nowrap;
        ">${facility.name}</div>`,
        anchor: new naver.maps.Point(0, 0)
      }
    });
    
    naver.maps.Event.addListener(marker, 'click', function() {
      map.setCenter(position);
      map.setZoom(15);
    });
    
    markers.push(marker);
  });
  
  // 지도 범위 조정
  if (filtered.length > 0) {
    const bounds = new naver.maps.LatLngBounds();
    filtered.forEach(f => {
      bounds.extend(new naver.maps.LatLng(f.lat, f.lng));
    });
    map.fitBounds(bounds);
  }
}

// 리스트 업데이트
function updateList() {
  const filtered = currentCategory === 'all' 
    ? facilities 
    : facilities.filter(f => f.category === currentCategory);
  
  document.getElementById('facilityCount').textContent = `${filtered.length}개 시설`;
  
  const listHtml = filtered.map(facility => {
    const categoryInfo = CATEGORIES[facility.category];
    const priceInfo = facility.price_info ? JSON.parse(facility.price_info) : null;
    const basicPrice = priceInfo && priceInfo.basic 
      ? (priceInfo.basic === 0 ? '무료' : `${(priceInfo.basic / 10000).toFixed(0)}만원`) 
      : '가격 미정';
    
    return `
      <div class="facility-card" onclick="focusFacility(${facility.id})">
        <span class="facility-category category-${facility.category}">
          ${categoryInfo.name}
        </span>
        <div class="facility-name">${facility.name}</div>
        <div class="facility-info">
          <i class="fas fa-map-marker-alt"></i>
          ${facility.address}
        </div>
        <div class="facility-info">
          <i class="fas fa-phone"></i>
          ${facility.phone || '-'}
        </div>
        <div class="facility-info">
          <i class="fas fa-building"></i>
          ${facility.operator_name} (${facility.operator_type === 'public' ? '공영' : '민영'})
        </div>
        <div class="facility-price">${basicPrice}</div>
      </div>
    `;
  }).join('');
  
  document.getElementById('facilityList').innerHTML = listHtml || '<div style="text-align: center; color: #9ca3af; padding: 40px;">시설이 없습니다</div>';
}

// 시설 포커스
function focusFacility(id) {
  const facility = facilities.find(f => f.id === id);
  if (!facility || !map) return;
  
  map.setCenter(new naver.maps.LatLng(facility.lat, facility.lng));
  map.setZoom(15);
}

// 카테고리 탭 클릭
document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    currentCategory = this.dataset.category;
    updateMap();
    updateList();
  });
});

// 검색
document.getElementById('searchInput').addEventListener('input', function(e) {
  const keyword = e.target.value.toLowerCase();
  
  if (keyword === '') {
    loadFacilities(currentCategory);
    return;
  }
  
  const filtered = facilities.filter(f => 
    f.name.toLowerCase().includes(keyword) || 
    f.address.toLowerCase().includes(keyword)
  );
  
  // 임시 필터링
  const original = facilities;
  facilities = filtered;
  updateMap();
  updateList();
  facilities = original;
});

// 초기화
window.addEventListener('load', function() {
  initMap();
  loadFacilities();
});
