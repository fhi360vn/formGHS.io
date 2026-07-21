/* Biểu mẫu báo cáo GHS - chạy hoàn toàn phía trình duyệt */
'use strict';

const STORAGE_KEY = 'ghs-report-data-v1';
const COLORS = {
  navy: '0B2742', blue: '135FA7', blue2: '0F75BD', cyan: 'E9F6FF',
  green: '17845B', orange: 'F59E0B', light: 'F5F8FB', line: 'D8E0EA',
  white: 'FFFFFF', gray: '667085', red: 'B42318'
};

const OPTIONS = {
  provinces: ['An Giang', 'Cần Thơ', 'Đồng Nai', 'TP. Hồ Chí Minh', 'Nghệ An', 'Quảng Ninh', 'Thái Nguyên'],
  mainContents: ['Dự phòng', 'Triệu chứng', 'Điều trị', 'Vắc-xin', 'Xóa bỏ kỳ thị', 'Khác'],
  durations: ['1 ngày', '2-5 ngày', '6+ ngày'],
  eventFormats: ['Trực tiếp', 'Trực tuyến', 'Kết hợp'],
  eventScales: ['<50 người', '50-199 người', '200-499 người', '500-999 người', '1000-4999 người', '5000+ người'],
  eventSmallTypes: ['Họp nhóm cộng đồng', 'Thảo luận nhóm tập trung', 'Phiên/buổi phổ biến kiến thức, truyền thông giáo dục', 'Họp tham vấn / Hoạt động kết nối thanh niên', 'Khác'],
  eventLargeTypes: ['Sự kiện truyền thông đại chúng', 'Sự kiện huy động cộng đồng', 'Hội nghị liên ngành', 'Khác'],
  targetAudiences: ['Công chúng / Thành viên cộng đồng', 'Chính phủ / Các cơ quan, tổ chức', 'Nhân viên y tế', 'Nhân viên thú y', 'Người chăn nuôi', 'Các nhóm yếu thế / Người có nguy cơ cao', 'Khác'],
  materialTypes: ['Ấn phẩm (tờ rơi, áp phích…)', 'Tài liệu kỹ thuật số (video, đồ họa, bài đăng MXH …)', 'Truyền thông đại chúng (TV, đài phát thanh, báo chí…)', 'Các công cụ tương tác (trò chơi, hộp thư góp ý, ứng dụng…)', 'Tài liệu phục vụ sự kiện', 'Khác (ghi rõ trong phần Mô tả)'],
  channels: ['TV', 'Đài phát thanh', 'Trang web (không phải MXH)', 'Điện thoại', 'In ấn', 'Mạng xã hội', 'Không xác định'],
  geographies: ['Toàn quốc', 'Toàn tỉnh', 'Tại Cơ sở / Cộng đồng'],
  domains: ['An toàn và an ninh sinh học phòng xét nghiệm', 'Phòng ngừa lây truyền từ động vật sang người', 'Y tế', 'Thú y / Nông nghiệp', 'Môi trường', 'Khác hoặc liên ngành (ghi rõ vào phần mô tả)'],
  classifications: {
    'An toàn và an ninh sinh học phòng xét nghiệm': ['Quản trị và Giám sát', 'Khung Quản lý Rủi ro', 'Triển khai Chương trình An toàn sinh học', 'Triển khai Chương trình An ninh sinh học', 'Đào tạo, Năng lực và Văn hóa Trách nhiệm', 'Sẵn sàng ứng phó Khẩn cấp và Quản lý Sự cố', 'Cơ sở hạ tầng Phòng xét nghiệm và Kiểm soát Kỹ thuật', 'An ninh Vận chuyển Mẫu bệnh phẩm và Vật liệu', 'Theo dõi, Đánh giá và Cải thiện', 'Các Biện pháp Liên ngành và Bền vững', 'Khác'],
    'Phòng ngừa lây truyền từ động vật sang người': ['Củng cố hệ thống giám sát', 'Đào tạo / Tập huấn', 'Đánh giá nguy cơ', 'Chiến lược Dự phòng', 'Chính sách', 'Nâng cấp cơ sở hạ tầng', 'Khác'],
    'Y tế': ['Đánh giá', 'Đào tạo / Tập huấn', 'Chính sách', 'Hỗ trợ kỹ thuật quản lý, phân tích Dữ liệu', 'Mua sắm trang thiết bị và vật tư', 'Hoạt động thực địa', 'Khác'],
    'Thú y / Nông nghiệp': ['Đánh giá', 'Đào tạo / Tập huấn', 'Chính sách', 'Hỗ trợ kỹ thuật quản lý, phân tích Dữ liệu', 'Mua sắm trang thiết bị và vật tư', 'Hoạt động thực địa', 'Khác'],
    'Môi trường': ['Đánh giá', 'Đào tạo / Tập huấn', 'Chính sách', 'Hỗ trợ kỹ thuật quản lý, phân tích Dữ liệu', 'Mua sắm trang thiết bị và vật tư', 'Hoạt động thực địa', 'Khác'],
    'Khác hoặc liên ngành (ghi rõ vào phần mô tả)': ['Đánh giá', 'Đào tạo / Tập huấn', 'Chính sách', 'Hỗ trợ kỹ thuật quản lý, phân tích Dữ liệu', 'Mua sắm trang thiết bị và vật tư', 'Hoạt động thực địa', 'Khác']
  },
  levels: ['Cấp trung ương', 'Cấp địa phương - Tỉnh/Khu vực', 'Phường/Xã - Cộng Đồng'],
  sites: {
    'An toàn và an ninh sinh học phòng xét nghiệm': ['N/A'],
    'Phòng ngừa lây truyền từ động vật sang người': ['Trang trại (Trồng trọt/Chăn nuôi)', 'Chợ thực phẩm tươi sống', 'Cộng đồng', 'Cơ sở giết mổ tập trung', 'Điểm tập kết, buôn bán, chế biến động vật hoang dã', 'Biên giới, Cửa khẩu', 'Khác'],
    'Y tế': ['Cơ sở y tế / thú y', 'Văn phòng y tế / thú y', 'Phòng xét nghiệm', 'Khác'],
    'Thú y / Nông nghiệp': ['Cơ sở y tế / thú y', 'Văn phòng y tế / thú y', 'Phòng xét nghiệm', 'Khác'],
    'Môi trường': ['Cơ sở y tế / thú y', 'Văn phòng y tế / thú y', 'Phòng xét nghiệm', 'Khác'],
    'Khác hoặc liên ngành (ghi rõ vào phần mô tả)': ['Cơ sở y tế / thú y', 'Văn phòng y tế / thú y', 'Phòng xét nghiệm', 'Khác']
  },
  species: ['Gia cầm', 'Lợn', 'Gia súc lớn (Trâu/Bò)', 'Động vật nhai lại nhỏ (Dê/Cừu)', 'Vật nuôi khác', 'Dơi', 'Động vật hoang dã khác'],
  pathogenGroups: ['Cúm gia cầm', 'Coronavirus', 'Anthrax', 'Bệnh dại', 'Brucella', 'Khác'],
  technicalContents: ['Kháng kháng sinh', 'An toàn và An ninh sinh học', 'Năng lực Chẩn đoán và Xét nghiệm', 'Giải trình tự gen và Tin sinh học', 'Kiểm soát và Phòng ngừa nhiễm khuẩn', 'RCCE - Truyền thông nguy cơ và Huy động cộng đồng', 'Bệnh truyền lây từ động vật sang người', 'Thu thập, phân tích và báo cáo dữ liệu', 'Giám sát (dịch tễ)', 'EMCE - Truyền thông và vận động cộng đồng về sức khỏe dựa trên bằng chứng', 'Sẵn sàng đáp ứng khẩn cấp', 'Khác'],
  alertTypes: ['Chùm ca bệnh', 'Ca bệnh đơn lẻ', 'Trường hợp tử vong bất thường', 'Phát hiện từ PXN', 'Tin đồn', 'Khác'],
  sources: ['Văn phòng đại diện', 'Bang Washington', 'Chính phủ nước sở tại', 'Đối tác trong nước', 'Khác (ghi rõ trong phần Mô tả dấu hiệu)'],
  firstCaseTypes: ['Động vật', 'Con người', 'Cả hai'],
  investigationStatuses: ['Đang chờ thêm thông tin', 'Chưa từng được kiểm chứng hay xác minh', 'Đã xác minh - Không ưu tiên ứng phó', 'Đã xác minh - Cần ứng phó'],
  entryPoints: ['Sân bay', 'Cảng biển', 'Cửa khẩu đường bộ (Biên giới đất liền)', 'Khác', 'Không'],
  pathogens: [
    'Alkhurma hemorrhagic fever virus (AHFV)', 'AMR Pathogens', 'Anthrax (Bacillus anthracis)',
    'Meningitis (bacterial unspecified)', 'Brucellosis (Brucella spp.)', 'Crimean-Congo hemorrhagic fever (CCHFV)',
    'Chapare virus', 'Chikungunya virus', 'Cholera (Vibrio cholerae)', 'Dengue virus',
    'Ebola virus disease (Ebola virus)', 'Hantavirus diseases (HPS/HFRS)', 'Lassa fever (Lassa virus)',
    'Leptospirosis (Leptospira spp.)', 'Lujo virus', 'Malaria (Plasmodium spp.)',
    'Marburg virus disease (Marburg virus)', 'Mayaro virus', 'Measles virus',
    'Melioidosis (Burkholderia pseudomallei)', 'MERS-CoV', 'Mpox (monkeypox virus)',
    'Nipah virus', 'Oropouche virus', 'Pathogen X', 'Plague (Yersinia pestis)',
    'Q fever (Coxiella burnetii)', 'Rabies virus', 'Rift Valley fever (RVFV)', 'SARS-CoV',
    'SARS-CoV-2 / COVID-19', 'Severe fever with thrombocytopenia syndrome (SFTS virus)',
    'Tuberculosis / Bovine TB (Mycobacterium bovis / M. tuberculosis)', 'Tularemia (Francisella tularensis)',
    'Viral meningitis (unspecified)', 'West Nile virus', 'Yellow fever virus', 'Zika virus',
    'Virus khác (ghi rõ)', 'Leishmaniasis'
  ]
};

const PARTICIPANT_CATEGORIES = ['Thành viên cộng đồng', 'Lãnh đạo nhóm cộng đồng', 'Đại diện chính quyền', 'Nhân viên y tế / thú y', 'Khác (ghi rõ trong phần mô tả)', 'Không xác định'];
const GENDERS = ['Nam', 'Nữ', 'Không xác định'];
const STAFF_CATEGORIES = ['Công chức', 'Người trực tiếp cung cấp dịch vụ', 'Khác'];
const STAFF_LEVELS = ['Trung ương', 'Tỉnh / Vùng', 'Xã / Cộng đồng', 'Khác'];
const INITIAL_RESPONSES = [
  ['Dịch tễ học/Giám sát', 'Thực hiện điều tra dịch hoặc triển khai đội điều tra/đáp ứng dịch'],
  ['Dịch tễ học/Giám sát', 'Phân tích dịch tễ học về gánh nặng, mức độ nghiêm trọng và các yếu tố nguy cơ, thực hiện đánh giá nguy cơ ban đầu'],
  ['Xét nghiệm (Lấy mẫu, vận chuyển, thử nghiệm)', 'Xét nghiệm khẳng định tác nhân gây dịch'],
  ['Quản lý ca bệnh và Chăm sóc lâm sàng', 'Tiến hành quản lý ca bệnh và các biện pháp phòng chống nhiễm khuẩn phù hợp tại các cơ sở y tế'],
  ['Phòng ngừa và Kiểm soát nhiễm khuẩn', 'Tiến hành các biện pháp phòng ngừa và kiểm soát nhiễm khuẩn phù hợp'],
  ['Truy vết tiếp xúc/Các biện pháp y tế công cộng', 'Thực hiện các biện pháp ứng phó y tế công cộng phù hợp tại các cộng đồng bị ảnh hưởng'],
  ['Truyền thông nguy cơ/Thông điệp y tế công cộng', 'Thực hiện các hoạt động truyền thông nguy cơ và huy động cộng đồng phù hợp'],
  ['Điều phối và Kết nối các bên liên quan', 'Thiết lập/xây dựng cơ chế phối hợp']
];

let state = loadState();
let currentReport = 'event';
let fieldIdCounter = 0;
function uniqueFieldId(name) { fieldIdCounter += 1; return `${name}-${fieldIdCounter}`; }

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      event: Array.isArray(saved?.event) ? saved.event : [],
      material: Array.isArray(saved?.material) ? saved.material : [],
      intervention: Array.isArray(saved?.intervention) ? saved.intervention : [],
      outbreak: Array.isArray(saved?.outbreak) ? saved.outbreak : []
    };
  } catch (_) {
    return { event: [], material: [], intervention: [], outbreak: [] };
  }
}

function saveState() {
  const status = document.getElementById('autosave-status');
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (status) status.textContent = `Đã lưu nháp lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}.`;
  } catch (_) {
    if (status) status.textContent = 'Trình duyệt không cho phép lưu nháp; dữ liệu vẫn giữ trong phiên đang mở.';
  }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}

function cleanText(value) { return String(value ?? '').trim(); }
function numeric(value) { const n = Number(value); return Number.isFinite(n) ? n : 0; }
function joinList(value) { return Array.isArray(value) ? value.join('; ') : cleanText(value); }
function isTraining(value) { return value === 'Đào tạo / Tập huấn' || value === 'Đào tạo, Năng lực và Văn hóa Trách nhiệm'; }

function inputField(name, label, placeholder, opts = {}) {
  const { type = 'text', span = 4, required = false, min, step, help = '', value = '' } = opts;
  const id = uniqueFieldId(name);
  return `<div class="field span-${span}">
    <label class="${required ? 'required' : ''}" for="${id}">${escapeHtml(label)}</label>
    <input id="${id}" name="${name}" type="${type}" placeholder="${escapeHtml(placeholder)}" ${required ? 'required' : ''} ${min !== undefined ? `min="${min}"` : ''} ${step !== undefined ? `step="${step}"` : ''} value="${escapeHtml(value)}" />
    ${help ? `<small>${escapeHtml(help)}</small>` : ''}
  </div>`;
}

function textareaField(name, label, placeholder, opts = {}) {
  const { span = 12, required = false, help = '' } = opts;
  const id = uniqueFieldId(name);
  return `<div class="field span-${span}">
    <label class="${required ? 'required' : ''}" for="${id}">${escapeHtml(label)}</label>
    <textarea id="${id}" name="${name}" placeholder="${escapeHtml(placeholder)}" ${required ? 'required' : ''}></textarea>
    ${help ? `<small>${escapeHtml(help)}</small>` : ''}
  </div>`;
}

function selectField(name, label, options, placeholder, opts = {}) {
  const { span = 4, required = false, help = '' } = opts;
  const id = uniqueFieldId(name);
  return `<div class="field span-${span}">
    <label class="${required ? 'required' : ''}" for="${id}">${escapeHtml(label)}</label>
    <select id="${id}" name="${name}" ${required ? 'required' : ''}>
      <option value="" selected disabled>${escapeHtml(placeholder)}</option>
      ${options.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('')}
    </select>
    ${help ? `<small>${escapeHtml(help)}</small>` : ''}
  </div>`;
}

function multiField(name, label, options, placeholder, opts = {}) {
  const { span = 6, required = false, help = '' } = opts;
  return `<div class="field span-${span}">
    <label class="${required ? 'required' : ''}">${escapeHtml(label)}</label>
    <div class="multi-select" data-name="${name}" data-required="${required ? '1' : '0'}" data-placeholder="${escapeHtml(placeholder)}">
      <button type="button" class="multi-toggle">${escapeHtml(placeholder)}</button>
      <div class="multi-panel">
        ${options.map(v => `<label class="multi-option"><input type="checkbox" value="${escapeHtml(v)}" /><span>${escapeHtml(v)}</span></label>`).join('')}
      </div>
    </div>
    ${help ? `<small>${escapeHtml(help)}</small>` : ''}
  </div>`;
}

function eventMatrix() {
  return `<div class="matrix-wrap"><table class="matrix">
    <thead><tr><th>Đối tượng</th>${GENDERS.map(g => `<th>${g}</th>`).join('')}<th>Tổng</th></tr></thead>
    <tbody>${PARTICIPANT_CATEGORIES.map((cat, ci) => `<tr>
      <td>${escapeHtml(cat)}</td>
      ${GENDERS.map((gender, gi) => `<td><input type="number" min="0" step="1" value="0" data-event-count data-category="${ci}" data-gender="${gi}" aria-label="${escapeHtml(cat)} - ${escapeHtml(gender)}" /></td>`).join('')}
      <td class="event-row-total">0</td>
    </tr>`).join('')}</tbody>
  </table><div class="matrix-total">Tổng người tham dự: <span id="event-grand-total">0</span></div></div>`;
}

function trainingMatrix() {
  const rows = [];
  STAFF_CATEGORIES.forEach((cat, ci) => {
    GENDERS.forEach((gender, gi) => {
      rows.push(`<tr>
        <td>${escapeHtml(cat)}</td><td>${escapeHtml(gender)}</td>
        ${STAFF_LEVELS.map((level, li) => `<td><input type="number" min="0" step="1" value="0" data-training-count data-category="${ci}" data-gender="${gi}" data-level="${li}" aria-label="${escapeHtml(cat)} - ${escapeHtml(gender)} - ${escapeHtml(level)}" /></td>`).join('')}
        <td class="training-row-total">0</td>
      </tr>`);
    });
  });
  return `<div class="matrix-wrap"><table class="matrix">
    <thead><tr><th>Đối tượng</th><th>Giới tính</th>${STAFF_LEVELS.map(l => `<th>${escapeHtml(l)}</th>`).join('')}<th>Tổng</th></tr></thead>
    <tbody>${rows.join('')}</tbody>
  </table><div class="matrix-total">Tổng nhân sự được đào tạo: <span id="training-grand-total">0</span></div></div>`;
}

function responseRows() {
  return INITIAL_RESPONSES.map((item, i) => `<div class="response-row" data-response-index="${i}">
    <div class="field"><label>Ngày bắt đầu</label><input type="date" name="response_${i}_date" /></div>
    <div><label>Loại can thiệp</label><div class="response-type">${escapeHtml(item[0])}</div></div>
    <div class="field"><label>Mô tả</label><textarea name="response_${i}_description" placeholder="Mô tả hoạt động đáp ứng đã thực hiện">${escapeHtml(item[1])}</textarea></div>
    <div class="field"><label>Phù hợp địa phương?</label><select name="response_${i}_appropriate"><option value="">Chọn Có hoặc Không</option><option>Có</option><option>Không</option></select></div>
  </div>`).join('');
}

function formFooter(type) {
  return `<input type="hidden" name="editIndex" value="-1" />
    <div class="form-actions">
      <button type="button" class="ghost-btn" data-action="reset-form">Làm mới form</button>
      <button type="submit" class="primary-btn">Lưu bản ghi</button>
    </div>`;
}

function recordsCard(type, title) {
  return `<div class="records-card"><h4>${escapeHtml(title)}</h4><div id="records-${type}"></div></div>`;
}

function renderForms() {
  const root = document.getElementById('forms-root');
  root.innerHTML = `
  <section class="report-panel active" data-panel="event">
    <form class="form-card report-form" data-type="event">
      <div class="form-heading"><div><h3>Báo cáo Sự kiện RCCE</h3><p>Mỗi hoạt động sự kiện nhập thành một bản ghi.</p></div><span class="badge">SỰ KIỆN</span></div>
      <div class="form-grid">
        ${selectField('province', 'Tỉnh', OPTIONS.provinces, 'Chọn tỉnh báo cáo', { required: true })}
        ${inputField('ward', 'Phường / Xã', 'Nhập tên phường/xã nơi tổ chức sự kiện', { required: true })}
        ${multiField('mainContents', 'Nội dung chính', OPTIONS.mainContents, 'Chọn một hoặc nhiều nội dung', { required: true })}
        ${inputField('activityName', 'Tên hoạt động', 'Nhập tên gọi chính thức của sự kiện', { span: 6, required: true })}
        ${inputField('startDate', 'Ngày bắt đầu', 'Chọn ngày bắt đầu', { type: 'date', required: true })}
        ${selectField('duration', 'Thời gian', OPTIONS.durations, 'Chọn thời gian kéo dài', { required: true })}
        ${selectField('eventFormat', 'Hình thức', OPTIONS.eventFormats, 'Chọn hình thức tổ chức', { required: true })}
        ${selectField('scale', 'Quy mô', OPTIONS.eventScales, 'Chọn quy mô người tham dự', { required: true })}
        ${selectField('knowCount', 'Biết rõ số lượng người tiếp cận?', ['Có', 'Không'], 'Chọn Có hoặc Không', { required: true })}
        ${selectField('activityType', 'Loại hình hoạt động', [], 'Chọn sau khi trả lời số lượng tiếp cận', { span: 6, required: true })}
        ${multiField('targetAudiences', 'Đối tượng tiếp cận mục tiêu', OPTIONS.targetAudiences, 'Chọn một hoặc nhiều đối tượng', { span: 6, required: true })}
        ${textareaField('description', 'Mô tả', 'Mô tả tổng quan; ghi rõ đối tượng hoặc nội dung “Khác” nếu có', { required: true })}
      </div>
      <div id="event-estimate-section" class="form-section conditional hidden">
        <h4 class="section-title">Ước tính số lượng tiếp cận</h4>
        <div class="form-grid">${inputField('estimatedReach', 'Số lượng tiếp cận ước tính', 'Nhập tổng số người ước tính đã tiếp cận', { type: 'number', min: 0, step: 1, span: 6 })}</div>
      </div>
      <div id="event-count-section" class="form-section conditional hidden">
        <h4 class="section-title">Chi tiết số lượng người tham dự</h4>${eventMatrix()}
      </div>
      ${formFooter('event')}
    </form>
    ${recordsCard('event', 'Danh sách sự kiện đã lưu')}
  </section>

  <section class="report-panel" data-panel="material">
    <form class="form-card report-form" data-type="material">
      <div class="form-heading"><div><h3>Báo cáo Tài liệu RCCE</h3><p>Mỗi tài liệu hoặc sản phẩm truyền thông nhập thành một bản ghi.</p></div><span class="badge">TÀI LIỆU</span></div>
      <div class="form-grid">
        ${inputField('reportingPeriod', 'Kỳ báo cáo', 'Chọn ngày cuối của tháng báo cáo', { type: 'date', required: true })}
        ${multiField('mainContents', 'Nội dung chính', OPTIONS.mainContents, 'Chọn một hoặc nhiều nội dung', { required: true })}
        ${inputField('materialName', 'Tên tài liệu', 'Nhập tên gọi của tài liệu', { span: 6, required: true })}
        ${inputField('completionDate', 'Ngày hoàn thành phát triển tài liệu', 'Chọn ngày tài liệu được hoàn thiện', { type: 'date', required: true })}
        ${selectField('materialType', 'Thể loại', OPTIONS.materialTypes, 'Chọn thể loại tài liệu', { required: true })}
        ${multiField('channels', 'Kênh thông tin', OPTIONS.channels, 'Chọn một hoặc nhiều kênh', { span: 6, required: true })}
        ${selectField('geographicScope', 'Phạm vi địa lý', OPTIONS.geographies, 'Chọn phạm vi phân phối/tiếp cận', { required: true })}
        ${multiField('targetAudiences', 'Đối tượng tiếp cận mục tiêu', OPTIONS.targetAudiences, 'Chọn một hoặc nhiều đối tượng', { span: 6, required: true })}
        ${inputField('printQuantity', 'Số lượng bản in', 'Chỉ nhập nếu là ấn phẩm in', { type: 'number', min: 0, step: 1 })}
        ${inputField('reachQuantity', 'Số lượng phân phối/tiếp cận', 'Nhập số người ước tính tiếp cận được', { type: 'number', min: 0, step: 1, required: true })}
        ${textareaField('description', 'Mô tả', 'Mô tả tài liệu và giải trình cơ sở ước tính số lượng tiếp cận', { required: true })}
      </div>
      ${formFooter('material')}
    </form>
    ${recordsCard('material', 'Danh sách tài liệu đã lưu')}
  </section>

  <section class="report-panel" data-panel="intervention">
    <form class="form-card report-form" data-type="intervention">
      <div class="form-heading"><div><h3>Báo cáo Can thiệp chủ động</h3><p>Danh mục và phần nhập bổ sung sẽ thay đổi theo lĩnh vực, phân loại.</p></div><span class="badge">CAN THIỆP</span></div>
      <div class="form-section">
        <h4 class="section-title">I. Thông tin chung</h4>
        <div class="form-grid">
          ${selectField('province', 'Tỉnh', OPTIONS.provinces, 'Chọn tỉnh báo cáo', { required: true })}
          ${inputField('activityName', 'Tên hoạt động', 'Nhập tên gọi của hoạt động', { span: 6, required: true })}
          ${inputField('startDate', 'Ngày bắt đầu', 'Chọn ngày bắt đầu hoạt động', { type: 'date', required: true })}
          ${selectField('domain', 'Lĩnh vực', OPTIONS.domains, 'Chọn lĩnh vực can thiệp', { span: 6, required: true })}
          ${textareaField('facilities', 'Các cơ sở triển khai', 'Nhập tên các cơ sở tham gia; để trống nếu hoạt động cao hơn cấp cơ sở', { span: 6 })}
          ${selectField('classification', 'Phân loại', [], 'Chọn lĩnh vực trước', { span: 6, required: true })}
          ${selectField('implementationLevel', 'Cấp độ triển khai', [], 'Chọn lĩnh vực trước', { required: true })}
          ${multiField('implementationSites', 'Điểm triển khai', [], 'Chọn lĩnh vực trước', { span: 6 })}
          <div id="sentinel-field" class="field span-4">${selectField('sentinelSurveillance', 'Giám sát trọng điểm', ['Có', 'Không'], 'Chọn Có hoặc Không').replace('<div class="field span-4">','').replace(/<\/div>$/,'')}</div>
          ${textareaField('description', 'Mô tả', 'Mô tả tổng quan; ghi rõ các lựa chọn “Khác” nếu có', { required: true })}
        </div>
      </div>

      <div id="spillover-section" class="form-section conditional hidden">
        <h4 class="section-title">II. Phòng ngừa lây truyền từ động vật sang người</h4>
        <div class="form-grid">
          ${multiField('targetSpecies', 'Loài mục tiêu', OPTIONS.species, 'Chọn tất cả loài mục tiêu', { span: 6 })}
          ${multiField('pathogenGroups', 'Nhóm tác nhân trọng tâm', OPTIONS.pathogenGroups, 'Chọn các nhóm tác nhân trọng tâm', { span: 6 })}
        </div>
      </div>

      <div id="training-section" class="form-section conditional hidden">
        <h4 class="section-title">III. Đào tạo / Tập huấn</h4>
        <div class="form-grid">
          ${selectField('trainingDuration', 'Thời gian khóa tập huấn', OPTIONS.durations, 'Chọn thời gian kéo dài', { span: 4 })}
          ${multiField('technicalContents', 'Nội dung kỹ thuật', OPTIONS.technicalContents, 'Chọn một hoặc nhiều nội dung kỹ thuật', { span: 8 })}
          ${inputField('estimatedStaff', 'Ước tính số nhân sự cần đào tạo', 'Nhập số nhân sự dự kiến cần được đào tạo', { type: 'number', min: 0, step: 1, span: 6 })}
        </div>
        <div style="margin-top:16px">${trainingMatrix()}</div>
      </div>

      <div id="procurement-section" class="form-section conditional hidden">
        <h4 class="section-title">IV. Mua sắm thiết bị, vật tư</h4>
        <div class="form-grid">
          ${selectField('procurementPurpose', 'Mục đích mua sắm', ['Thường quy', 'Ứng phó ổ dịch'], 'Chọn mục đích mua sắm', { span: 4 })}
          ${textareaField('equipmentList', 'Thiết bị, vật tư và số lượng', 'Ví dụ: Găng tay y tế: … hộp; Bộ xét nghiệm chẩn đoán: … bộ', { span: 8 })}
        </div>
      </div>
      ${formFooter('intervention')}
    </form>
    ${recordsCard('intervention', 'Danh sách can thiệp đã lưu')}
  </section>

  <section class="report-panel" data-panel="outbreak">
    <form class="form-card report-form" data-type="outbreak">
      <div class="form-heading"><div><h3>Báo cáo Outbreak</h3><p>Thông tin ổ dịch/dịch bệnh truyền nhiễm trên địa bàn.</p></div><span class="badge">OUTBREAK</span></div>
      <div class="form-section">
        <h4 class="section-title">Thông tin báo cáo</h4>
        <div class="form-grid">
          ${selectField('reportProvince', 'Tỉnh báo cáo', OPTIONS.provinces, 'Chọn tỉnh báo cáo', { required: true })}
          ${inputField('reportCommune', 'Xã báo cáo', 'Nhập tên phường/xã báo cáo', { required: true })}
          ${inputField('reportingPeriod', 'Kỳ báo cáo', 'Chọn kỳ báo cáo', { type: 'date', required: true })}
          ${selectField('reportPathogen', 'Tác nhân gây bệnh', OPTIONS.pathogens, 'Chọn tác nhân gây bệnh', { span: 6, required: true })}
        </div>
      </div>
      <div class="form-section">
        <h4 class="section-title">Thông tin chung</h4>
        <div class="form-grid">
          ${inputField('firstReportDate', '(1) Ngày báo cáo đầu tiên', 'Chọn ngày phát hiện dấu hiệu đầu tiên', { type: 'date', required: true })}
          ${selectField('province', '(2) Tỉnh', OPTIONS.provinces, 'Chọn tỉnh xảy ra sự kiện', { required: true })}
        </div>
      </div>
      <div class="form-section">
        <h4 class="section-title">Dấu hiệu cảnh báo</h4>
        <div class="form-grid">
          ${selectField('alertType', '(3) Loại dấu hiệu', OPTIONS.alertTypes, 'Chọn loại dấu hiệu cảnh báo', { required: true })}
          ${selectField('source', '(4) Nguồn tin', OPTIONS.sources, 'Chọn nguồn cung cấp thông tin', { required: true })}
          ${selectField('firstCaseType', '(5) Loại ca bệnh đầu tiên', OPTIONS.firstCaseTypes, 'Chọn loại ca bệnh đầu tiên', { required: true })}
          ${textareaField('alertDescription', '(6) Mô tả dấu hiệu', 'Mô tả dấu hiệu cảnh báo và thông tin quan trọng liên quan', { required: true })}
          ${inputField('longitude', '(7) Kinh độ', 'Ví dụ: 106.7009', { type: 'number', step: 'any' })}
          ${inputField('latitude', '(8) Vĩ độ', 'Ví dụ: 10.7769', { type: 'number', step: 'any' })}
          ${inputField('googleMapLink', '(9) Link Google Map', 'Dán đường link vị trí Google Maps nếu có', { span: 6, type: 'url' })}
          ${selectField('investigationStatus', '(10) Tình trạng điều tra', OPTIONS.investigationStatuses, 'Chọn tình trạng điều tra', { span: 6, required: true })}
          ${textareaField('investigationDescription', '(11) Mô tả việc điều tra', 'Mô tả công việc điều tra và các kết quả đã ghi nhận', { required: true })}
        </div>
      </div>
      <div class="form-section">
        <h4 class="section-title">Thông tin về đợt bùng phát dịch</h4>
        <div class="form-grid">
          ${textareaField('outbreakDescription', '(12) Mô tả sự kiện', 'Mô tả đợt bùng phát dịch và các thông tin chưa có ở trường khác', { required: true })}
          ${selectField('pathogen', '(13) Tác nhân gây bệnh', OPTIONS.pathogens, 'Chọn tác nhân gây bệnh', { span: 6, required: true })}
          ${selectField('entryPoint', '(14) Liên quan điểm nhập cảnh?', OPTIONS.entryPoints, 'Chọn loại điểm nhập cảnh hoặc Không', { span: 6, required: true })}
          ${selectField('outbreakStatus', '(15) Tình trạng đợt bùng phát', ['Vẫn đang diễn ra', 'Đã kết thúc'], 'Chọn tình trạng hiện tại', { span: 6, required: true })}
          <div id="outbreak-end-date-wrap" class="field span-6 hidden"><label for="endDate">(16) Ngày kết thúc</label><input id="endDate" name="endDate" type="date" /></div>
        </div>
      </div>
      <div class="form-section conditional">
        <h4 class="section-title">Các hoạt động đáp ứng ban đầu</h4>
        <p style="color:var(--muted);margin-top:-5px">Điền ngày bắt đầu, điều chỉnh mô tả nếu cần và đánh giá mức độ phù hợp tại địa phương.</p>
        ${responseRows()}
      </div>
      <div class="form-section">
        <h4 class="section-title">7-1-7 và ghi chú</h4>
        <div class="form-grid">
          ${selectField('postInterventionAssessment', '(21) Đã đánh giá sau can thiệp?', ['Đã thực hiện', 'Chưa thực hiện'], 'Chọn tình trạng thực hiện', { span: 6, required: true })}
          ${selectField('formal717Analysis', '(22) Đã phân tích chính thức theo 7-1-7?', ['Đã thực hiện', 'Chưa thực hiện'], 'Chọn tình trạng thực hiện', { span: 6, required: true })}
          ${inputField('onsetDate', '(23) Ngày phát sinh/Ngày xuất hiện', 'Chọn ngày phát sinh sớm nhất', { type: 'date' })}
          ${inputField('detectionDate', '(24) Ngày phát hiện', 'Chọn ngày sự kiện được ghi nhận lần đầu', { type: 'date' })}
          ${inputField('notificationDate', '(25) Ngày thông báo', 'Chọn ngày thông báo đến cơ quan có thẩm quyền', { type: 'date' })}
          ${inputField('earlyResponseCompletionDate', '(26) Ngày hoàn thành ứng phó sớm', 'Chọn ngày tất cả đáp ứng ban đầu đã bắt đầu', { type: 'date' })}
          ${textareaField('notes', 'Ghi chú', 'Ghi các thông tin liên quan chưa được phản ánh ở các trường trên')}
        </div>
      </div>
      ${formFooter('outbreak')}
    </form>
    ${recordsCard('outbreak', 'Danh sách outbreak đã lưu')}
  </section>`;

  bindDynamicForms();
  renderAllRecords();
  updateCounts();
}

function bindDynamicForms() {
  const eventForm = document.querySelector('form[data-type="event"]');
  eventForm.elements.knowCount.addEventListener('change', () => updateEventConditional(eventForm));
  eventForm.addEventListener('input', e => { if (e.target.matches('[data-event-count]')) updateEventTotals(eventForm); });

  const interventionForm = document.querySelector('form[data-type="intervention"]');
  interventionForm.elements.domain.addEventListener('change', () => updateInterventionConditional(interventionForm, true));
  interventionForm.elements.classification.addEventListener('change', () => updateInterventionConditional(interventionForm, false));
  interventionForm.addEventListener('input', e => { if (e.target.matches('[data-training-count]')) updateTrainingTotals(interventionForm); });

  const outbreakForm = document.querySelector('form[data-type="outbreak"]');
  outbreakForm.elements.outbreakStatus.addEventListener('change', () => updateOutbreakConditional(outbreakForm));

  document.querySelectorAll('.report-form').forEach(form => form.addEventListener('submit', handleSubmit));
}

function setSelectOptions(select, options, placeholder, preserve = false) {
  const current = preserve ? select.value : '';
  select.innerHTML = `<option value="" disabled ${current ? '' : 'selected'}>${escapeHtml(placeholder)}</option>` + options.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('');
  if (current && options.includes(current)) select.value = current;
}

function setMultiOptions(container, options, selected = []) {
  const panel = container.querySelector('.multi-panel');
  panel.innerHTML = options.map(v => `<label class="multi-option"><input type="checkbox" value="${escapeHtml(v)}" ${selected.includes(v) ? 'checked' : ''} /><span>${escapeHtml(v)}</span></label>`).join('');
  updateMultiLabel(container);
}

function updateEventConditional(form) {
  const answer = form.elements.knowCount.value;
  const estimate = document.getElementById('event-estimate-section');
  const counts = document.getElementById('event-count-section');
  const typeSelect = form.elements.activityType;
  estimate.classList.toggle('hidden', answer !== 'Không');
  counts.classList.toggle('hidden', answer !== 'Có');
  form.elements.estimatedReach.required = answer === 'Không';
  const options = answer === 'Có' ? OPTIONS.eventSmallTypes : answer === 'Không' ? OPTIONS.eventLargeTypes : [];
  setSelectOptions(typeSelect, options, answer ? 'Chọn loại hình hoạt động' : 'Chọn sau khi trả lời số lượng tiếp cận', true);
}

function updateEventTotals(form) {
  let grand = 0;
  form.querySelectorAll('#event-count-section tbody tr').forEach(row => {
    const total = [...row.querySelectorAll('input')].reduce((sum, el) => sum + numeric(el.value), 0);
    row.querySelector('.event-row-total').textContent = total.toLocaleString('vi-VN');
    grand += total;
  });
  document.getElementById('event-grand-total').textContent = grand.toLocaleString('vi-VN');
}

function updateInterventionConditional(form, domainChanged = false) {
  const domain = form.elements.domain.value;
  if (domainChanged) setSelectOptions(form.elements.classification, OPTIONS.classifications[domain] || [], domain ? 'Chọn phân loại can thiệp' : 'Chọn lĩnh vực trước');
  const classification = form.elements.classification.value;
  const lab = domain === 'An toàn và an ninh sinh học phòng xét nghiệm';
  const spillover = domain === 'Phòng ngừa lây truyền từ động vật sang người';
  setSelectOptions(form.elements.implementationLevel, (lab || spillover) ? ['N/A'] : OPTIONS.levels, domain ? 'Chọn cấp độ triển khai' : 'Chọn lĩnh vực trước', true);
  const siteBox = form.querySelector('.multi-select[data-name="implementationSites"]');
  const existingSites = getMultiValues(siteBox);
  setMultiOptions(siteBox, OPTIONS.sites[domain] || [], existingSites);
  document.getElementById('sentinel-field').classList.toggle('hidden', lab || spillover);
  form.elements.sentinelSurveillance.required = !(lab || spillover);
  document.getElementById('spillover-section').classList.toggle('hidden', !spillover);
  document.getElementById('training-section').classList.toggle('hidden', !isTraining(classification));
  document.getElementById('procurement-section').classList.toggle('hidden', classification !== 'Mua sắm trang thiết bị và vật tư');
}

function updateTrainingTotals(form) {
  let grand = 0;
  form.querySelectorAll('#training-section tbody tr').forEach(row => {
    const total = [...row.querySelectorAll('input')].reduce((sum, el) => sum + numeric(el.value), 0);
    row.querySelector('.training-row-total').textContent = total.toLocaleString('vi-VN');
    grand += total;
  });
  document.getElementById('training-grand-total').textContent = grand.toLocaleString('vi-VN');
}

function updateOutbreakConditional(form) {
  const ended = form.elements.outbreakStatus.value === 'Đã kết thúc';
  const wrap = document.getElementById('outbreak-end-date-wrap');
  wrap.classList.toggle('hidden', !ended);
  form.elements.endDate.required = ended;
  if (!ended) form.elements.endDate.value = '';
}

function getMultiValues(container) {
  return [...container.querySelectorAll('input[type="checkbox"]:checked')].map(el => el.value);
}

function updateMultiLabel(container) {
  const selected = getMultiValues(container);
  const button = container.querySelector('.multi-toggle');
  button.textContent = selected.length ? selected.join('; ') : container.dataset.placeholder;
  button.classList.toggle('has-value', selected.length > 0);
}

function collectSimple(form) {
  const data = {};
  form.querySelectorAll('input[name], select[name], textarea[name]').forEach(el => {
    if (el.name === 'editIndex') return;
    data[el.name] = cleanText(el.value);
  });
  form.querySelectorAll('.multi-select').forEach(box => { data[box.dataset.name] = getMultiValues(box); });
  return data;
}

function validateMulti(form) {
  for (const box of form.querySelectorAll('.multi-select[data-required="1"]')) {
    if (getMultiValues(box).length === 0) {
      showToast(`Vui lòng chọn: ${box.previousElementSibling?.textContent || 'trường bắt buộc'}`, true);
      box.querySelector('.multi-toggle').focus();
      return false;
    }
  }
  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity() || !validateMulti(form)) return;
  const type = form.dataset.type;
  const data = collectSimple(form);

  if (type === 'event') {
    data.participantCounts = {};
    form.querySelectorAll('[data-event-count]').forEach(el => { data.participantCounts[`${el.dataset.category}|${el.dataset.gender}`] = numeric(el.value); });
    const total = Object.values(data.participantCounts).reduce((a, b) => a + b, 0);
    if (data.knowCount === 'Có' && total === 0) { showToast('Vui lòng nhập ít nhất một người tham dự.', true); return; }
    if (data.knowCount === 'Không' && numeric(data.estimatedReach) <= 0) { showToast('Vui lòng nhập số lượng tiếp cận ước tính.', true); return; }
  }

  if (type === 'intervention') {
    data.trainingCounts = {};
    form.querySelectorAll('[data-training-count]').forEach(el => { data.trainingCounts[`${el.dataset.category}|${el.dataset.gender}|${el.dataset.level}`] = numeric(el.value); });
  }

  if (type === 'outbreak') {
    data.responses = INITIAL_RESPONSES.map((item, i) => ({
      date: cleanText(form.elements[`response_${i}_date`].value),
      type: item[0],
      description: cleanText(form.elements[`response_${i}_description`].value),
      appropriate: cleanText(form.elements[`response_${i}_appropriate`].value)
    }));
  }

  const editIndex = Number(form.elements.editIndex.value);
  if (editIndex >= 0) state[type][editIndex] = data;
  else state[type].push(data);

  saveState();
  renderAllRecords();
  updateCounts();
  resetForm(form);
  showToast(editIndex >= 0 ? 'Đã cập nhật bản ghi.' : 'Đã lưu bản ghi.');
}

function resetForm(form) {
  form.reset();
  form.elements.editIndex.value = '-1';
  form.querySelectorAll('.multi-select input[type="checkbox"]').forEach(el => { el.checked = false; });
  form.querySelectorAll('.multi-select').forEach(updateMultiLabel);
  form.querySelectorAll('[data-event-count], [data-training-count]').forEach(el => { el.value = 0; });
  if (form.dataset.type === 'event') { updateEventConditional(form); updateEventTotals(form); }
  if (form.dataset.type === 'intervention') { updateInterventionConditional(form, true); updateTrainingTotals(form); }
  if (form.dataset.type === 'outbreak') {
    INITIAL_RESPONSES.forEach((item, i) => { form.elements[`response_${i}_description`].value = item[1]; });
    updateOutbreakConditional(form);
  }
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function populateForm(type, index) {
  const record = state[type][index];
  const form = document.querySelector(`form[data-type="${type}"]`);
  switchReport(type);
  form.elements.editIndex.value = String(index);

  if (type === 'intervention') {
    form.elements.domain.value = record.domain || '';
    updateInterventionConditional(form, true);
    form.elements.classification.value = record.classification || '';
    updateInterventionConditional(form, false);
  }

  Object.entries(record).forEach(([key, value]) => {
    if (Array.isArray(value) || typeof value === 'object' || !form.elements[key]) return;
    if (type === 'intervention' && (key === 'domain' || key === 'classification')) return;
    form.elements[key].value = value ?? '';
  });

  if (type === 'event') updateEventConditional(form);
  if (type === 'outbreak') updateOutbreakConditional(form);

  form.querySelectorAll('.multi-select').forEach(box => {
    const values = Array.isArray(record[box.dataset.name]) ? record[box.dataset.name] : [];
    box.querySelectorAll('input[type="checkbox"]').forEach(el => { el.checked = values.includes(el.value); });
    updateMultiLabel(box);
  });

  if (type === 'event') {
    form.querySelectorAll('[data-event-count]').forEach(el => { el.value = record.participantCounts?.[`${el.dataset.category}|${el.dataset.gender}`] ?? 0; });
    updateEventTotals(form);
  }
  if (type === 'intervention') {
    form.querySelectorAll('[data-training-count]').forEach(el => { el.value = record.trainingCounts?.[`${el.dataset.category}|${el.dataset.gender}|${el.dataset.level}`] ?? 0; });
    updateTrainingTotals(form);
  }
  if (type === 'outbreak') {
    (record.responses || []).forEach((response, i) => {
      if (!form.elements[`response_${i}_date`]) return;
      form.elements[`response_${i}_date`].value = response.date || '';
      form.elements[`response_${i}_description`].value = response.description || '';
      form.elements[`response_${i}_appropriate`].value = response.appropriate || '';
    });
  }
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Bản ghi đã được mở để chỉnh sửa.');
}

function deleteRecord(type, index) {
  if (!confirm('Bạn có chắc muốn xóa bản ghi này?')) return;
  state[type].splice(index, 1);
  saveState();
  renderAllRecords();
  updateCounts();
  showToast('Đã xóa bản ghi.');
}

function renderAllRecords() {
  renderRecords('event', [
    ['Tỉnh/Phường xã', r => `${r.province || ''} / ${r.ward || ''}`],
    ['Tên hoạt động', r => r.activityName], ['Ngày', r => formatDateDisplay(r.startDate)],
    ['Tiếp cận', r => r.knowCount === 'Có' ? participantTotal(r).toLocaleString('vi-VN') : numeric(r.estimatedReach).toLocaleString('vi-VN')]
  ]);
  renderRecords('material', [
    ['Tên tài liệu', r => r.materialName], ['Thể loại', r => r.materialType],
    ['Ngày hoàn thành', r => formatDateDisplay(r.completionDate)], ['Tiếp cận', r => numeric(r.reachQuantity).toLocaleString('vi-VN')]
  ]);
  renderRecords('intervention', [
    ['Tỉnh', r => r.province], ['Tên hoạt động', r => r.activityName],
    ['Lĩnh vực', r => r.domain], ['Phân loại', r => r.classification]
  ]);
  renderRecords('outbreak', [
    ['Địa bàn', r => `${r.reportProvince || ''} / ${r.reportCommune || ''}`],
    ['Tác nhân', r => r.pathogen || r.reportPathogen], ['Ngày báo cáo đầu tiên', r => formatDateDisplay(r.firstReportDate)],
    ['Tình trạng', r => r.outbreakStatus]
  ]);
}

function renderRecords(type, columns) {
  const host = document.getElementById(`records-${type}`);
  const records = state[type];
  if (!records.length) { host.innerHTML = '<div class="empty-state">Chưa có bản ghi nào.</div>'; return; }
  host.innerHTML = `<div class="table-scroll"><table class="records-table"><thead><tr>${columns.map(c => `<th>${escapeHtml(c[0])}</th>`).join('')}<th>Thao tác</th></tr></thead><tbody>
    ${records.map((record, index) => `<tr>${columns.map(c => `<td>${escapeHtml(c[1](record) || '')}</td>`).join('')}<td class="action-cell"><button type="button" class="icon-btn edit" data-action="edit-record" data-type="${type}" data-index="${index}">Sửa</button><button type="button" class="icon-btn delete" data-action="delete-record" data-type="${type}" data-index="${index}">Xóa</button></td></tr>`).join('')}
  </tbody></table></div>`;
}

function updateCounts() {
  ['event','material','intervention','outbreak'].forEach(type => { document.getElementById(`count-${type}`).textContent = state[type].length; });
}

function participantTotal(record) {
  return Object.values(record.participantCounts || {}).reduce((sum, value) => sum + numeric(value), 0);
}

function formatDateDisplay(value) {
  if (!value) return '';
  const [y,m,d] = value.split('-');
  return y && m && d ? `${d}/${m}/${y}` : value;
}

function formatDateFile(value) { return formatDateDisplay(value); }
function toExcelDate(value) {
  if (!value) return '';
  const [y,m,d] = value.split('-').map(Number);
  return y && m && d ? new Date(y, m - 1, d) : value;
}

function switchView(view) {
  document.querySelectorAll('.view').forEach(el => el.classList.toggle('active', el.id === `${view}-view`));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchReport(type) {
  currentReport = type;
  switchView('report');
  document.querySelectorAll('.report-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.report === type));
  document.querySelectorAll('.report-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === type));
}

function showToast(message, error = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.toggle('error', error);
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ----------------------------- XUẤT EXCEL ----------------------------- */
function borderStyle() {
  return { top:{style:'thin',color:{argb:COLORS.line}}, left:{style:'thin',color:{argb:COLORS.line}}, bottom:{style:'thin',color:{argb:COLORS.line}}, right:{style:'thin',color:{argb:COLORS.line}} };
}

function applyCellStyle(cell, opts = {}) {
  cell.font = { name: 'Arial', size: opts.size || 10, bold: !!opts.bold, color: { argb: opts.fontColor || '172033' } };
  cell.alignment = { vertical: opts.vertical || 'middle', horizontal: opts.horizontal || 'left', wrapText: true };
  cell.border = borderStyle();
  if (opts.fill) cell.fill = { type:'pattern', pattern:'solid', fgColor:{argb:opts.fill} };
  if (opts.numFmt) cell.numFmt = opts.numFmt;
}

function styleRange(ws, r1, c1, r2, c2, opts = {}) {
  for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) applyCellStyle(ws.getCell(r,c), opts);
}

function setTitle(ws, row, startCol, endCol, text, fill = COLORS.navy) {
  ws.mergeCells(row, startCol, row, endCol);
  const cell = ws.getCell(row, startCol);
  cell.value = text;
  applyCellStyle(cell, { fill, fontColor: COLORS.white, bold: true, size: 14, horizontal: 'center' });
  ws.getRow(row).height = 28;
}

function setHeader(cell, text, fill = COLORS.blue) {
  cell.value = text;
  applyCellStyle(cell, { fill, fontColor: COLORS.white, bold: true, horizontal: 'center' });
}

function mergeVertical(ws, col, start, end, value, opts = {}) {
  ws.mergeCells(start, col, end, col);
  const cell = ws.getCell(start, col);
  cell.value = value;
  applyCellStyle(cell, { vertical: 'top', ...opts });
}

function writeRCCESheet(workbook) {
  const ws = workbook.addWorksheet('RCCE', { properties: { defaultRowHeight: 20 } });
  ws.views = [{ state: 'frozen', ySplit: 3 }];
  ws.pageSetup = { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  const widths = [15,18,24,30,14,13,14,16,18,24,27,38,18,30,12,12,16,13];
  widths.forEach((w,i) => ws.getColumn(i+1).width = w);

  setTitle(ws, 1, 1, 18, 'BÁO CÁO SỰ KIỆN RCCE');
  const eventHeaders = ['Tỉnh','Phường / Xã','Nội dung chính','Tên hoạt động','Ngày bắt đầu','Thời gian','Hình thức','Quy mô','Biết rõ số lượng người tiếp cận?','Loại hình hoạt động','Đối tượng tiếp cận mục tiêu','Mô tả','Ước tính số lượng tiếp cận','Chi tiết số lượng người tham dự','','','','Tổng'];
  eventHeaders.forEach((h,i) => { if (i < 13 || i === 17) setHeader(ws.getCell(2,i+1),h); });
  ws.mergeCells(2,14,2,17); setHeader(ws.getCell(2,14),'Chi tiết số lượng người tham dự (nếu chọn Có)');
  for (let c=1;c<=18;c++) { ws.getCell(3,c).value = c <= 13 ? `(${c})` : c === 18 ? '(14)' : ''; applyCellStyle(ws.getCell(3,c), { fill: COLORS.cyan, bold:true, horizontal:'center' }); }

  let row = 4;
  if (!state.event.length) {
    ws.mergeCells(row,1,row,18); ws.getCell(row,1).value='Chưa có dữ liệu Sự kiện.'; applyCellStyle(ws.getCell(row,1), { fill: COLORS.light, horizontal:'center' }); row += 2;
  } else {
    state.event.forEach((rec, index) => {
      const start = row, end = row + 6;
      const values = [rec.province, rec.ward, joinList(rec.mainContents), rec.activityName, toExcelDate(rec.startDate), rec.duration, rec.eventFormat, rec.scale, rec.knowCount, rec.activityType, joinList(rec.targetAudiences), rec.description, rec.knowCount === 'Không' ? numeric(rec.estimatedReach) : ''];
      values.forEach((value, i) => mergeVertical(ws, i+1, start, end, value, { fill: index % 2 ? 'F8FBFE' : COLORS.white }));
      ws.getCell(start,5).numFmt = 'dd-mm-yyyy';
      ws.getCell(start,14).value='Đối tượng'; ws.getCell(start,15).value='Nam'; ws.getCell(start,16).value='Nữ'; ws.getCell(start,17).value='Không xác định';
      ws.getCell(start,18).value={ formula:`SUM(R${start+1}:R${end})` };
      styleRange(ws,start,14,start,18,{ fill:COLORS.cyan,bold:true,horizontal:'center' });
      PARTICIPANT_CATEGORIES.forEach((cat, ci) => {
        const rr = start + 1 + ci;
        ws.getCell(rr,14).value = cat;
        GENDERS.forEach((g,gi) => ws.getCell(rr,15+gi).value = numeric(rec.participantCounts?.[`${ci}|${gi}`]));
        ws.getCell(rr,18).value={ formula:`SUM(O${rr}:Q${rr})` };
        styleRange(ws,rr,14,rr,18,{ fill:ci%2?'F8FBFE':COLORS.white,horizontal: giSafe(ci) });
        ws.getCell(rr,14).alignment = { vertical:'middle', horizontal:'left', wrapText:true };
      });
      styleRange(ws,start,1,end,18,{});
      ws.getRow(start).height = 34;
      row = end + 1;
    });
  }

  row += 2;
  setTitle(ws, row, 1, 11, 'BÁO CÁO TÀI LIỆU RCCE', COLORS.green);
  const titleRow = row;
  row++;
  const materialHeaders = ['Kỳ báo cáo','Nội dung chính','Tên tài liệu','Ngày hoàn thành phát triển tài liệu','Thể loại','Kênh thông tin','Phạm vi địa lý','Đối tượng tiếp cận mục tiêu','Số lượng bản in','Số lượng phân phối/tiếp cận','Mô tả'];
  materialHeaders.forEach((h,i) => setHeader(ws.getCell(row,i+1),h,COLORS.green));
  row++;
  materialHeaders.forEach((_,i) => { ws.getCell(row,i+1).value=`(${i+1})`; applyCellStyle(ws.getCell(row,i+1),{fill:'EAF7F1',bold:true,horizontal:'center'}); });
  row++;
  if (!state.material.length) {
    ws.mergeCells(row,1,row,11); ws.getCell(row,1).value='Chưa có dữ liệu Tài liệu.'; applyCellStyle(ws.getCell(row,1), { fill: COLORS.light, horizontal:'center' });
  } else {
    state.material.forEach((rec, idx) => {
      const values = [toExcelDate(rec.reportingPeriod), joinList(rec.mainContents), rec.materialName, toExcelDate(rec.completionDate), rec.materialType, joinList(rec.channels), rec.geographicScope, joinList(rec.targetAudiences), rec.printQuantity ? numeric(rec.printQuantity) : '', numeric(rec.reachQuantity), rec.description];
      values.forEach((v,i) => { const cell=ws.getCell(row,i+1); cell.value=v; applyCellStyle(cell,{fill:idx%2?'F8FBFE':COLORS.white,vertical:'top'}); });
      ws.getCell(row,1).numFmt='dd-mm-yyyy'; ws.getCell(row,4).numFmt='dd-mm-yyyy';
      ws.getRow(row).height=42; row++;
    });
  }
  ws.autoFilter = { from:{row:titleRow+1,column:1}, to:{row:Math.max(row-1,titleRow+2),column:11} };
  return ws;
}

function giSafe(index) { return index === -1 ? 'left' : 'center'; }

function writeInterventionSheet(workbook) {
  const ws = workbook.addWorksheet('CAN THIỆP', { properties: { defaultRowHeight: 20 } });
  ws.views = [{ state:'frozen', ySplit:4 }];
  ws.pageSetup = { orientation:'landscape', fitToPage:true, fitToWidth:1, fitToHeight:0 };
  const widths=[15,30,14,28,28,26,22,28,18,38,24,24,17,26,18,22,16,12,13,16,12,18,38];
  widths.forEach((w,i)=>ws.getColumn(i+1).width=w);
  setTitle(ws,1,1,23,'BÁO CÁO CAN THIỆP CHỦ ĐỘNG');

  const direct = ['Tỉnh','Tên hoạt động','Ngày bắt đầu','Lĩnh vực','Các cơ sở triển khai','Phân loại','Cấp độ triển khai','Điểm triển khai','Giám sát trọng điểm','Mô tả'];
  direct.forEach((h,i)=>{ ws.mergeCells(2,i+1,3,i+1); setHeader(ws.getCell(2,i+1),h); });
  ws.mergeCells(2,11,2,12); setHeader(ws.getCell(2,11),'Phòng ngừa lây truyền từ động vật sang người');
  setHeader(ws.getCell(3,11),'Loài mục tiêu'); setHeader(ws.getCell(3,12),'Nhóm tác nhân trọng tâm');
  ws.mergeCells(2,13,2,21); setHeader(ws.getCell(2,13),'Đào tạo / Tập huấn');
  ['Thời gian khóa tập huấn','Nội dung kỹ thuật','Ước tính số nhân sự cần đào tạo','Đối tượng','Giới tính','Trung ương','Tỉnh / Vùng','Xã / Cộng đồng','Khác'].forEach((h,i)=>setHeader(ws.getCell(3,13+i),h));
  ws.mergeCells(2,22,2,23); setHeader(ws.getCell(2,22),'Mua sắm thiết bị, vật tư');
  setHeader(ws.getCell(3,22),'Mục đích mua sắm'); setHeader(ws.getCell(3,23),'Thiết bị, vật tư và số lượng');
  for(let c=1;c<=23;c++){ ws.getCell(4,c).value=`(${c})`; applyCellStyle(ws.getCell(4,c),{fill:COLORS.cyan,bold:true,horizontal:'center'}); }

  let row=5;
  if(!state.intervention.length){ ws.mergeCells(row,1,row,23); ws.getCell(row,1).value='Chưa có dữ liệu Can thiệp.'; applyCellStyle(ws.getCell(row,1),{fill:COLORS.light,horizontal:'center'}); return ws; }

  state.intervention.forEach((rec,idx)=>{
    const start=row,end=row+9;
    const values=[rec.province,rec.activityName,toExcelDate(rec.startDate),rec.domain,rec.facilities,rec.classification,rec.implementationLevel,joinList(rec.implementationSites),rec.sentinelSurveillance,rec.description,joinList(rec.targetSpecies),joinList(rec.pathogenGroups),rec.trainingDuration,joinList(rec.technicalContents),rec.estimatedStaff?numeric(rec.estimatedStaff):''];
    values.forEach((v,i)=>mergeVertical(ws,i+1,start,end,v,{fill:idx%2?'F8FBFE':COLORS.white}));
    ws.getCell(start,3).numFmt='dd-mm-yyyy';
    mergeVertical(ws,22,start,end,rec.procurementPurpose,{fill:idx%2?'F8FBFE':COLORS.white});
    mergeVertical(ws,23,start,end,rec.equipmentList,{fill:idx%2?'F8FBFE':COLORS.white});
    ws.getCell(start,17).value='Cấp cán bộ';
    STAFF_LEVELS.forEach((level,li)=>ws.getCell(start,18+li).value=level);
    styleRange(ws,start,16,start,21,{fill:COLORS.cyan,bold:true,horizontal:'center'});
    let rr=start+1;
    STAFF_CATEGORIES.forEach((cat,ci)=>{
      ws.mergeCells(rr,16,rr+2,16); ws.getCell(rr,16).value=cat; applyCellStyle(ws.getCell(rr,16),{vertical:'middle'});
      GENDERS.forEach((gender,gi)=>{
        const r=rr+gi; ws.getCell(r,17).value=gender;
        STAFF_LEVELS.forEach((level,li)=>ws.getCell(r,18+li).value=numeric(rec.trainingCounts?.[`${ci}|${gi}|${li}`]));
        styleRange(ws,r,17,r,21,{fill:(r-start)%2?'F8FBFE':COLORS.white,horizontal:'center'});
        ws.getCell(r,17).alignment={vertical:'middle',horizontal:'left',wrapText:true};
      }); rr+=3;
    });
    styleRange(ws,start,1,end,23,{}); row=end+1;
  });
  return ws;
}

function outbreakField(ws,row,no,label,value,opts={}){
  ws.getCell(row,1).value=no||''; ws.getCell(row,2).value=label; ws.mergeCells(row,3,row,6); ws.getCell(row,3).value=value;
  styleRange(ws,row,1,row,6,{fill:opts.fill||COLORS.white,vertical:'top'});
  ws.getCell(row,1).font={name:'Arial',size:10,bold:true,color:{argb:COLORS.blue}};
  ws.getCell(row,2).font={name:'Arial',size:10,bold:true,color:{argb:'172033'}};
  if(opts.date) ws.getCell(row,3).numFmt='dd-mm-yyyy';
  ws.getRow(row).height=opts.height||26;
  return row+1;
}

function writeOutbreakSheet(workbook){
  const ws=workbook.addWorksheet('OUTBREAK',{properties:{defaultRowHeight:21}});
  ws.pageSetup={orientation:'portrait',fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:0.25,right:0.25,top:0.5,bottom:0.5,header:0.2,footer:0.2}};
  [8,42,24,18,18,24].forEach((w,i)=>ws.getColumn(i+1).width=w);
  let row=1;
  if(!state.outbreak.length){ setTitle(ws,row,1,6,'BÁO CÁO THÔNG TIN Ổ DỊCH/DỊCH BỆNH TRUYỀN NHIỄM'); row++; ws.mergeCells(row,1,row,6); ws.getCell(row,1).value='Chưa có dữ liệu Outbreak.'; applyCellStyle(ws.getCell(row,1),{fill:COLORS.light,horizontal:'center'}); return ws; }

  state.outbreak.forEach((rec,idx)=>{
    setTitle(ws,row,1,6,`BÁO CÁO THÔNG TIN Ổ DỊCH/DỊCH BỆNH TRUYỀN NHIỄM${state.outbreak.length>1?` - BẢN ${idx+1}`:''}`); row++;
    row=outbreakField(ws,row,'','Tỉnh báo cáo',rec.reportProvince,{fill:'EEF5FB'});
    row=outbreakField(ws,row,'','Xã báo cáo',rec.reportCommune,{fill:'EEF5FB'});
    row=outbreakField(ws,row,'','Kỳ báo cáo',toExcelDate(rec.reportingPeriod),{fill:'EEF5FB',date:true});
    row=outbreakField(ws,row,'','Tác nhân gây bệnh',rec.reportPathogen,{fill:'EEF5FB'});
    row++;
    setTitle(ws,row,1,6,'THÔNG TIN CHUNG',COLORS.blue); row++;
    row=outbreakField(ws,row,'(1)','Ngày báo cáo đầu tiên về đợt bùng phát',toExcelDate(rec.firstReportDate),{date:true});
    row=outbreakField(ws,row,'(2)','Tỉnh',rec.province);
    row++;
    setTitle(ws,row,1,6,'DẤU HIỆU CẢNH BÁO',COLORS.orange); row++;
    row=outbreakField(ws,row,'(3)','Loại dấu hiệu',rec.alertType);
    row=outbreakField(ws,row,'(4)','Nguồn tin',rec.source);
    row=outbreakField(ws,row,'(5)','Loại ca bệnh đầu tiên',rec.firstCaseType);
    row=outbreakField(ws,row,'(6)','Mô tả dấu hiệu',rec.alertDescription,{height:48});
    row=outbreakField(ws,row,'(7)','Kinh độ',rec.longitude);
    row=outbreakField(ws,row,'(8)','Vĩ độ',rec.latitude);
    row=outbreakField(ws,row,'(9)','Link Google Map',rec.googleMapLink);
    row=outbreakField(ws,row,'(10)','Tình trạng điều tra',rec.investigationStatus);
    row=outbreakField(ws,row,'(11)','Mô tả việc điều tra',rec.investigationDescription,{height:48});
    row++;
    setTitle(ws,row,1,6,'THÔNG TIN VỀ ĐỢT BÙNG PHÁT DỊCH',COLORS.green); row++;
    row=outbreakField(ws,row,'(12)','Mô tả sự kiện',rec.outbreakDescription,{height:48});
    row=outbreakField(ws,row,'(13)','Tác nhân gây bệnh',rec.pathogen);
    row=outbreakField(ws,row,'(14)','Liên quan đến điểm nhập cảnh',rec.entryPoint);
    row=outbreakField(ws,row,'(15)','Tình trạng đợt bùng phát dịch',rec.outbreakStatus);
    row=outbreakField(ws,row,'(16)','Ngày kết thúc',toExcelDate(rec.endDate),{date:true});
    row++;
    setTitle(ws,row,1,6,'CÁC HOẠT ĐỘNG ĐÁP ỨNG BAN ĐẦU',COLORS.blue); row++;
    ['Ngày bắt đầu','Loại can thiệp','Mô tả','','','Phù hợp địa phương'].forEach((h,i)=>{ if(i!==3&&i!==4)setHeader(ws.getCell(row,i+1),h); });
    ws.mergeCells(row,3,row,5); setHeader(ws.getCell(row,3),'Mô tả'); row++;
    (rec.responses||[]).forEach((resp,i)=>{
      ws.getCell(row,1).value=toExcelDate(resp.date); ws.getCell(row,1).numFmt='dd-mm-yyyy';
      ws.getCell(row,2).value=resp.type; ws.mergeCells(row,3,row,5); ws.getCell(row,3).value=resp.description; ws.getCell(row,6).value=resp.appropriate;
      styleRange(ws,row,1,row,6,{fill:i%2?'F8FBFE':COLORS.white,vertical:'top'}); ws.getRow(row).height=44; row++;
    });
    row++;
    setTitle(ws,row,1,6,'7-1-7',COLORS.navy); row++;
    row=outbreakField(ws,row,'(21)','Đã tiến hành đánh giá sau can thiệp?',rec.postInterventionAssessment);
    row=outbreakField(ws,row,'(22)','Đã tiến hành phân tích chính thức theo khung 7-1-7?',rec.formal717Analysis);
    row=outbreakField(ws,row,'(23)','Ngày phát sinh/Ngày xuất hiện',toExcelDate(rec.onsetDate),{date:true});
    row=outbreakField(ws,row,'(24)','Ngày phát hiện',toExcelDate(rec.detectionDate),{date:true});
    row=outbreakField(ws,row,'(25)','Ngày thông báo',toExcelDate(rec.notificationDate),{date:true});
    row=outbreakField(ws,row,'(26)','Ngày hoàn thành ứng phó sớm',toExcelDate(rec.earlyResponseCompletionDate),{date:true});
    row=outbreakField(ws,row,'','Ghi chú',rec.notes,{height:56});
    row+=3;
  });
  return ws;
}

async function exportExcel(){
  const total=state.event.length+state.material.length+state.intervention.length+state.outbreak.length;
  if(!total){ showToast('Chưa có bản ghi để xuất Excel.',true); return; }
  if(typeof ExcelJS==='undefined'){ showToast('Không tải được thư viện xuất Excel. Hãy kiểm tra kết nối Internet rồi thử lại.',true); return; }
  const button=document.getElementById('export-btn'); const old=button.textContent; button.disabled=true; button.textContent='Đang tạo file…';
  try{
    const workbook=new ExcelJS.Workbook();
    workbook.creator='Biểu mẫu báo cáo GHS'; workbook.created=new Date(); workbook.modified=new Date();
    workbook.properties.date1904=false;
    writeRCCESheet(workbook); writeInterventionSheet(workbook); writeOutbreakSheet(workbook);
    const buffer=await workbook.xlsx.writeBuffer();
    const blob=new Blob([buffer],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url=URL.createObjectURL(blob); const a=document.createElement('a');
    const now=new Date(); const stamp=`${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
    a.href=url; a.download=`Bao_cao_GHS_${stamp}.xlsx`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast('Đã tạo file Excel gồm 3 sheet: RCCE, CAN THIỆP, OUTBREAK.');
  }catch(error){ console.error(error); showToast(`Không thể tạo file Excel: ${error.message||'lỗi không xác định'}`,true); }
  finally{ button.disabled=false; button.textContent=old; }
}

/* ----------------------------- SỰ KIỆN GIAO DIỆN ----------------------------- */
document.addEventListener('click', event => {
  const nav = event.target.closest('[data-view]');
  if (nav) switchView(nav.dataset.view);
  const tab = event.target.closest('[data-report]');
  if (tab) switchReport(tab.dataset.report);
  const action = event.target.closest('[data-action]');
  if (action?.dataset.action === 'reset-form') resetForm(action.closest('form'));
  if (action?.dataset.action === 'edit-record') populateForm(action.dataset.type, Number(action.dataset.index));
  if (action?.dataset.action === 'delete-record') deleteRecord(action.dataset.type, Number(action.dataset.index));
  const toggle = event.target.closest('.multi-toggle');
  if (toggle) {
    const box = toggle.closest('.multi-select');
    document.querySelectorAll('.multi-select.open').forEach(other => { if (other !== box) other.classList.remove('open'); });
    box.classList.toggle('open');
  } else if (!event.target.closest('.multi-select')) document.querySelectorAll('.multi-select.open').forEach(box => box.classList.remove('open'));
});

document.addEventListener('change', event => {
  if (event.target.matches('.multi-select input[type="checkbox"]')) updateMultiLabel(event.target.closest('.multi-select'));
});

document.getElementById('start-report-btn').addEventListener('click', () => switchReport('event'));
document.getElementById('export-btn').addEventListener('click', exportExcel);
document.getElementById('clear-all-btn').addEventListener('click', () => {
  if (!confirm('Xóa toàn bộ bản ghi Sự kiện, Tài liệu, Can thiệp và Outbreak đã lưu trên trình duyệt?')) return;
  state={event:[],material:[],intervention:[],outbreak:[]}; saveState(); renderAllRecords(); updateCounts(); document.querySelectorAll('.report-form').forEach(resetForm); showToast('Đã xóa toàn bộ dữ liệu.');
});

renderForms();
