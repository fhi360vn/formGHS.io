'use strict';

const OPTIONS = {
  provinces: ['An Giang', 'Cần Thơ', 'Đồng Nai', 'TP. Hồ Chí Minh', 'Nghệ An', 'Quảng Ninh', 'Thái Nguyên'],
  mainTopics: ['Dự phòng', 'Triệu chứng', 'Điều trị', 'Vắc-xin', 'Xóa bỏ kỳ thị', 'Khác'],
  durations: ['1 ngày', '2-5 ngày', '6+ ngày'],
  formats: ['Trực tiếp', 'Trực tuyến', 'Kết hợp'],
  scales: ['<50 người', '50-199 người', '200-499 người', '500-999 người', '1000-4999 người', '5000+ người'],
  eventTypes: {
    'Có': ['Họp nhóm cộng đồng', 'Thảo luận nhóm tập trung', 'Phiên/buổi phổ biến kiến thức, truyền thông giáo dục', 'Họp tham vấn / Hoạt động kết nối thanh niên', 'Khác'],
    'Không': ['Sự kiện truyền thông đại chúng', 'Sự kiện huy động cộng đồng', 'Hội nghị liên ngành', 'Khác']
  },
  targetAudiences: ['Công chúng / Thành viên cộng đồng', 'Chính phủ / Các cơ quan, tổ chức', 'Nhân viên y tế', 'Nhân viên thú y', 'Người chăn nuôi', 'Các nhóm yếu thế / Người có nguy cơ cao', 'Khác'],
  participantAudiences: ['Thành viên cộng đồng', 'Lãnh đạo nhóm cộng đồng', 'Đại diện chính quyền', 'Nhân viên y tế / thú y', 'Khác (ghi rõ trong phần mô tả)', 'Không xác định'],
  materialTypes: ['Ấn phẩm (tờ rơi, áp phích…)', 'Tài liệu kỹ thuật số (video, đồ họa, bài đăng MXH …)', 'Truyền thông đại chúng (TV, đài phát thanh, báo chí…)', 'Các công cụ tương tác (trò chơi, hộp thư góp ý, ứng dụng…)', 'Tài liệu phục vụ sự kiện', 'Khác (ghi rõ trong phần Mô tả)'],
  channels: ['TV', 'Đài phát thanh', 'Trang web (không phải MXH)', 'Điện thoại', 'In ấn', 'Mạng xã hội', 'Không xác định'],
  geographicScopes: ['Toàn quốc', 'Toàn tỉnh', 'Tại Cơ sở / Cộng đồng'],
  intervention: {
    'An toàn và an ninh sinh học phòng xét nghiệm': {
      classifications: ['Quản trị và Giám sát', 'Khung Quản lý Rủi ro', 'Triển khai Chương trình An toàn sinh học', 'Triển khai Chương trình An ninh sinh học', 'Đào tạo, Năng lực và Văn hóa Trách nhiệm', 'Sẵn sàng ứng phó Khẩn cấp và Quản lý Sự cố', 'Cơ sở hạ tầng Phòng xét nghiệm và Kiểm soát Kỹ thuật', 'An ninh Vận chuyển Mẫu bệnh phẩm và Vật liệu', 'Theo dõi, Đánh giá và Cải thiện', 'Các Biện pháp Liên ngành và Bền vững', 'Khác'],
      levels: ['N/A'], sites: ['N/A'], species: ['N/A'], focus: ['N/A']
    },
    'Phòng ngừa lây truyền từ động vật sang người': {
      classifications: ['Củng cố hệ thống giám sát', 'Đào tạo / Tập huấn', 'Đánh giá nguy cơ', 'Chiến lược Dự phòng', 'Chính sách', 'Nâng cấp cơ sở hạ tầng', 'Khác'],
      levels: ['N/A'],
      sites: ['Trang trại (Trồng trọt/Chăn nuôi)', 'Chợ thực phẩm tươi sống', 'Cộng đồng', 'Cơ sở giết mổ tập trung', 'Điểm tập kết, buôn bán, chế biến động vật hoang dã', 'Biên giới, Cửa khẩu', 'Khác'],
      species: ['Gia cầm', 'Lợn', 'Gia súc lớn (Trâu/Bò)', 'Động vật nhai lại nhỏ (Dê/Cừu)', 'Vật nuôi khác', 'Dơi', 'Động vật hoang dã khác'],
      focus: ['Cúm gia cầm', 'Coronavirus', 'Anthrax', 'Bệnh dại', 'Brucella', 'Khác']
    },
    'Y tế': standardIntervention(),
    'Thú y / Nông nghiệp': standardIntervention(),
    'Môi trường': standardIntervention(),
    'Khác hoặc liên ngành (ghi rõ vào phần mô tả)': standardIntervention()
  },
  technicalTopics: ['Kháng kháng sinh', 'An toàn và An ninh sinh học', 'Năng lực Chẩn đoán và Xét nghiệm', 'Giải trình tự gen và Tin sinh học', 'Kiểm soát và Phòng ngừa nhiễm khuẩn', 'RCCE - Truyền thông nguy cơ và Huy động cộng đồng', 'Bệnh truyền lây từ động vật sang người', 'Thu thập, phân tích và báo cáo dữ liệu', 'Giám sát (dịch tễ)', 'EMCE - Truyền thông và vận động cộng đồng về sức khỏe dựa trên bằng chứng', 'Sẵn sàng đáp ứng khẩn cấp', 'Khác'],
  signalTypes: ['Chùm ca bệnh', 'Ca bệnh đơn lẻ', 'Trường hợp tử vong bất thường', 'Phát hiện từ PXN', 'Tin đồn', 'Khác'],
  sources: ['Văn phòng đại diện', 'Bang Washington', 'Chính phủ nước sở tại', 'Đối tác trong nước', 'Khác (ghi rõ trong phần Mô tả dấu hiệu)'],
  firstCases: ['Động vật', 'Con người', 'Cả hai'],
  investigationStatuses: ['Đang chờ thêm thông tin', 'Chưa từng được kiểm chứng hay xác minh', 'Đã xác minh - Không ưu tiên ứng phó', 'Đã xác minh - Cần ứng phó'],
  pointsOfEntry: ['Không', 'Điểm nhập cảnh', 'Sân bay', 'Cảng biển', 'Cửa khẩu đường bộ (Biên giới đất liền)', 'Khác'],
  pathogens: [
    'Alkhurma hemorrhagic fever virus (AHFV)', 'AMR Pathogens', 'Anthrax (Bacillus anthracis)', 'Meningitis (bacterial unspecified)',
    'Brucellosis (Brucella spp.)', 'Crimean-Congo hemorrhagic fever (CCHFV)', 'Chapare virus', 'Chikungunya virus',
    'Cholera (Vibrio cholerae)', 'Dengue virus', 'Ebola virus disease (Ebola virus)', 'Hantavirus diseases (HPS/HFRS)',
    'Lassa fever (Lassa virus)', 'Leptospirosis (Leptospira spp.)', 'Lujo virus', 'Malaria (Plasmodium spp.)',
    'Marburg virus disease (Marburg virus)', 'Mayaro virus', 'Measles virus', 'Melioidosis (Burkholderia pseudomallei)',
    'MERS-CoV', 'Mpox (monkeypox virus)', 'Nipah virus', 'Oropouche virus', 'Pathogen X', 'Plague (Yersinia pestis)',
    'Q fever (Coxiella burnetii)', 'Rabies virus', 'Rift Valley fever (RVFV)', 'SARS-CoV', 'SARS-CoV-2 / COVID-19',
    'Severe fever with thrombocytopenia syndrome (SFTS virus)', 'Tuberculosis / Bovine TB (Mycobacterium bovis / M. tuberculosis)',
    'Tularemia (Francisella tularensis)', 'Viral meningitis (unspecified)', 'West Nile virus', 'Yellow fever virus',
    'Zika virus', 'Virus khác (ghi rõ)', 'Leishmaniasis'
  ]
};

function standardIntervention() {
  return {
    classifications: ['Đánh giá', 'Đào tạo / Tập huấn', 'Chính sách', 'Hỗ trợ kỹ thuật quản lý, phân tích Dữ liệu', 'Mua sắm trang thiết bị và vật tư', 'Hoạt động thực địa', 'Khác'],
    levels: ['Cấp trung ương', 'Cấp địa phương - Tỉnh/Khu vực', 'Phường/Xã - Cộng Đồng'],
    sites: ['Cơ sở y tế / thú y', 'Văn phòng y tế / thú y', 'Phòng xét nghiệm', 'Khác'],
    species: ['N/A'], focus: ['N/A']
  };
}

const TRAINING_ROLES = ['Công chức', 'Người trực tiếp cung cấp dịch vụ', 'Khác'];
const GENDERS = ['Nam', 'Nữ', 'Không xác định'];
const TRAINING_LEVELS = ['Trung ương', 'Tỉnh / Vùng', 'Xã / Cộng đồng', 'Khác'];
const RESPONSE_PRESETS = [
  ['Dịch tễ học/Giám sát', 'Thực hiện điều tra dịch hoặc triển khai đội điều tra/đáp ứng dịch'],
  ['Dịch tễ học/Giám sát', 'Phân tích dịch tễ học về gánh nặng, mức độ nghiêm trọng và các yếu tố nguy cơ; thực hiện đánh giá nguy cơ ban đầu'],
  ['Xét nghiệm (Lấy mẫu, vận chuyển, thử nghiệm)', 'Xét nghiệm khẳng định tác nhân gây dịch'],
  ['Quản lý ca bệnh và Chăm sóc lâm sàng', 'Tiến hành quản lý ca bệnh và các biện pháp phòng chống nhiễm khuẩn phù hợp tại cơ sở y tế'],
  ['Phòng ngừa và Kiểm soát nhiễm khuẩn', 'Triển khai biện pháp IPC phù hợp tại các cơ sở bị ảnh hưởng'],
  ['Truy vết tiếp xúc/Các biện pháp y tế công cộng', 'Thực hiện các biện pháp ứng phó y tế công cộng phù hợp tại cộng đồng bị ảnh hưởng'],
  ['Truyền thông nguy cơ/Thông điệp y tế công cộng', 'Thực hiện truyền thông nguy cơ và huy động cộng đồng phù hợp'],
  ['Điều phối và Kết nối các bên liên quan', 'Thiết lập hoặc củng cố cơ chế phối hợp']
];

const STORAGE_KEY = 'ghs-report-portal-v1';
const state = loadState();
let toastTimer;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      events: Array.isArray(saved?.events) ? saved.events : [],
      materials: Array.isArray(saved?.materials) ? saved.materials : [],
      interventions: Array.isArray(saved?.interventions) ? saved.interventions : [],
      outbreaks: Array.isArray(saved?.outbreaks) ? saved.outbreaks : []
    };
  } catch {
    return { events: [], materials: [], interventions: [], outbreaks: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAllRecords();
}

function el(id) { return document.getElementById(id); }
function value(id) { return el(id).value.trim(); }
function numberValue(id) { const v = el(id).value; return v === '' ? '' : Number(v); }
function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
function joinValues(values) { return Array.isArray(values) ? values.join('; ') : (values ?? ''); }
function toNumber(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }

function setSelect(id, options, placeholder = 'Chọn một giá trị') {
  const select = el(id);
  const current = select.value;
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>` + options.map(item => `<option value="${escapeAttr(item)}">${escapeHtml(item)}</option>`).join('');
  if (options.includes(current)) select.value = current;
}

function renderChecks(containerId, name, options) {
  const container = el(containerId);
  container.innerHTML = options.map((item, index) => `
    <label class="check-option">
      <input type="checkbox" name="${escapeAttr(name)}" value="${escapeAttr(item)}" id="${escapeAttr(name)}-${index}">
      <span>${escapeHtml(item)}</span>
    </label>`).join('');
}

function checkedValues(containerId) {
  return [...el(containerId).querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
}

function requireChecks(containerId, label) {
  const values = checkedValues(containerId);
  if (!values.length) {
    showToast(`Vui lòng chọn ít nhất một mục: ${label}.`, true);
    el(containerId).scrollIntoView({ behavior: 'smooth', block: 'center' });
    return null;
  }
  return values;
}

function isValidDate(text) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day;
}

function validateDates(entries) {
  for (const [label, text, optional] of entries) {
    if (!text && optional) continue;
    if (!isValidDate(text)) {
      showToast(`${label} phải theo định dạng dd/mm/yyyy.`, true);
      return false;
    }
  }
  return true;
}

function showToast(message, error = false) {
  const toast = el('toast');
  toast.textContent = message;
  toast.classList.toggle('error', error);
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}
function escapeAttr(value) { return escapeHtml(value); }

function initNavigation() {
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
  document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.go)));
  el('mobileMenuBtn').addEventListener('click', () => el('sidebar').classList.toggle('open'));
}

function showView(view) {
  document.querySelectorAll('.view').forEach(section => section.classList.toggle('active', section.id === `view-${view}`));
  document.querySelectorAll('[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === view));
  el('sidebar').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initInputs() {
  ['eventProvince', 'interventionProvince', 'outbreakProvince'].forEach(id => setSelect(id, OPTIONS.provinces, 'Chọn tỉnh'));
  setSelect('eventDuration', OPTIONS.durations, 'Chọn thời gian');
  setSelect('eventFormat', OPTIONS.formats, 'Chọn hình thức');
  setSelect('eventScale', OPTIONS.scales, 'Chọn quy mô');
  renderChecks('eventMainTopics', 'event-main-topic', OPTIONS.mainTopics);
  renderChecks('eventTargetAudiences', 'event-target', OPTIONS.targetAudiences);
  buildEventParticipantTable();

  setSelect('materialType', OPTIONS.materialTypes, 'Chọn thể loại');
  setSelect('materialGeo', OPTIONS.geographicScopes, 'Chọn phạm vi địa lý');
  renderChecks('materialMainTopics', 'material-main-topic', OPTIONS.mainTopics);
  renderChecks('materialChannels', 'material-channel', OPTIONS.channels);
  renderChecks('materialTargetAudiences', 'material-target', OPTIONS.targetAudiences);

  setSelect('interventionField', Object.keys(OPTIONS.intervention), 'Chọn lĩnh vực');
  setSelect('trainingDuration', OPTIONS.durations, 'Chọn thời gian khóa tập huấn');
  renderChecks('trainingTechnical', 'training-technical', OPTIONS.technicalTopics);
  buildTrainingCountTable();

  setSelect('outbreakSuspectedPathogen', OPTIONS.pathogens, 'Chọn tác nhân nghi ngờ');
  setSelect('outbreakConfirmedPathogen', OPTIONS.pathogens, 'Chọn tác nhân đã xác định');
  setSelect('outbreakSignalType', OPTIONS.signalTypes, 'Chọn loại dấu hiệu');
  setSelect('outbreakSource', OPTIONS.sources, 'Chọn nguồn tin');
  setSelect('outbreakFirstCase', OPTIONS.firstCases, 'Chọn loại ca bệnh đầu tiên');
  setSelect('outbreakInvestigationStatus', OPTIONS.investigationStatuses, 'Chọn tình trạng điều tra');
  setSelect('outbreakPointOfEntry', OPTIONS.pointsOfEntry, 'Chọn điểm nhập cảnh hoặc Không');
  buildResponseTable();
}

function buildEventParticipantTable() {
  el('eventParticipantTable').querySelector('tbody').innerHTML = OPTIONS.participantAudiences.map((audience, index) => `
    <tr data-index="${index}">
      <td>${escapeHtml(audience)}</td>
      <td><input class="event-count" data-audience="${index}" data-gender="male" type="number" min="0" placeholder="0"></td>
      <td><input class="event-count" data-audience="${index}" data-gender="female" type="number" min="0" placeholder="0"></td>
      <td><input class="event-count" data-audience="${index}" data-gender="unknown" type="number" min="0" placeholder="0"></td>
      <td class="row-total">0</td>
    </tr>`).join('');
  el('eventParticipantTable').addEventListener('input', updateParticipantTotals);
}

function updateParticipantTotals() {
  el('eventParticipantTable').querySelectorAll('tbody tr').forEach(row => {
    const total = [...row.querySelectorAll('input')].reduce((sum, input) => sum + toNumber(input.value), 0);
    row.querySelector('.row-total').textContent = total;
  });
}

function getEventCounts() {
  const result = {};
  OPTIONS.participantAudiences.forEach((audience, index) => {
    const row = el('eventParticipantTable').querySelector(`tr[data-index="${index}"]`);
    const male = toNumber(row.querySelector('[data-gender="male"]').value);
    const female = toNumber(row.querySelector('[data-gender="female"]').value);
    const unknown = toNumber(row.querySelector('[data-gender="unknown"]').value);
    result[audience] = { male, female, unknown, total: male + female + unknown };
  });
  return result;
}

function buildTrainingCountTable() {
  const rows = [];
  let index = 0;
  TRAINING_ROLES.forEach(role => GENDERS.forEach(gender => {
    rows.push(`<tr data-index="${index}" data-role="${escapeAttr(role)}" data-gender="${escapeAttr(gender)}"><td><b>${escapeHtml(role)}</b><br><small>${escapeHtml(gender)}</small></td>${TRAINING_LEVELS.map((level, col) => `<td><input class="training-count" data-level="${col}" type="number" min="0" placeholder="0"></td>`).join('')}</tr>`);
    index += 1;
  }));
  el('trainingCountTable').querySelector('tbody').innerHTML = rows.join('');
}

function getTrainingCounts() {
  const result = {};
  el('trainingCountTable').querySelectorAll('tbody tr').forEach(row => {
    const role = row.dataset.role;
    const gender = row.dataset.gender;
    TRAINING_LEVELS.forEach((level, index) => {
      result[`${role}|${gender}|${level}`] = toNumber(row.querySelector(`[data-level="${index}"]`).value);
    });
  });
  return result;
}

function buildResponseTable() {
  el('outbreakResponseTable').querySelector('tbody').innerHTML = RESPONSE_PRESETS.map((preset, index) => `
    <tr data-index="${index}">
      <td><input class="response-date" inputmode="numeric" placeholder="dd/mm/yyyy"></td>
      <td><textarea class="response-type" aria-label="Loại can thiệp">${escapeHtml(preset[0])}</textarea></td>
      <td><textarea class="response-description" aria-label="Mô tả">${escapeHtml(preset[1])}</textarea></td>
      <td><select class="response-local"><option value="">Chọn</option><option>Có</option><option>Không</option></select></td>
    </tr>`).join('');
}

function getResponses() {
  return [...el('outbreakResponseTable').querySelectorAll('tbody tr')].map(row => ({
    startDate: row.querySelector('.response-date').value.trim(),
    type: row.querySelector('.response-type').value.trim(),
    description: row.querySelector('.response-description').value.trim(),
    locallyAppropriate: row.querySelector('.response-local').value
  }));
}

function initDynamicBehavior() {
  el('eventKnown').addEventListener('change', updateEventConditional);
  el('interventionField').addEventListener('change', updateInterventionOptions);
  el('interventionClassification').addEventListener('change', updateInterventionSections);
  el('outbreakInvestigationStatus').addEventListener('change', updateOutbreakSections);
  el('outbreakStatus').addEventListener('change', updateOutbreakEndDate);

  ['eventForm', 'interventionForm', 'outbreakForm'].forEach(id => {
    el(id).addEventListener('reset', () => setTimeout(() => {
      if (id === 'eventForm') { updateEventConditional(); updateParticipantTotals(); }
      if (id === 'interventionForm') { resetInterventionDynamic(); }
      if (id === 'outbreakForm') { updateOutbreakSections(); updateOutbreakEndDate(); buildResponseTable(); }
    }, 0));
  });
}

function updateEventConditional() {
  const known = value('eventKnown');
  setSelect('eventActivityType', OPTIONS.eventTypes[known] || [], known ? 'Chọn loại hình hoạt động' : 'Chọn Có hoặc Không trước');
  el('eventParticipantSection').classList.toggle('hidden', known !== 'Có');
  el('eventEstimateSection').classList.toggle('hidden', known !== 'Không');
}

function updateInterventionOptions() {
  const field = value('interventionField');
  const config = OPTIONS.intervention[field];
  setSelect('interventionClassification', config?.classifications || [], config ? 'Chọn phân loại' : 'Chọn lĩnh vực trước');
  setSelect('interventionLevel', config?.levels || [], config ? 'Chọn cấp độ triển khai' : 'Chọn lĩnh vực trước');
  renderChecks('interventionSites', 'intervention-site', config?.sites || []);
  renderChecks('interventionSpecies', 'intervention-species', config?.species || []);
  renderChecks('interventionFocus', 'intervention-focus', config?.focus || []);
  if (config?.levels?.length === 1) el('interventionLevel').value = config.levels[0];
  if (config?.sites?.length === 1 && config.sites[0] === 'N/A') el('interventionSites').querySelector('input').checked = true;
  updateInterventionSections();
}

function resetInterventionDynamic() {
  setSelect('interventionClassification', [], 'Chọn lĩnh vực trước');
  setSelect('interventionLevel', [], 'Chọn lĩnh vực trước');
  renderChecks('interventionSites', 'intervention-site', []);
  renderChecks('interventionSpecies', 'intervention-species', []);
  renderChecks('interventionFocus', 'intervention-focus', []);
  updateInterventionSections();
}

function updateInterventionSections() {
  const field = value('interventionField');
  const classification = value('interventionClassification');
  const isSpillover = field === 'Phòng ngừa lây truyền từ động vật sang người';
  const isTraining = /Đào tạo|Năng lực và Văn hóa Trách nhiệm/i.test(classification);
  const isProcurement = classification === 'Mua sắm trang thiết bị và vật tư';
  el('spilloverSection').classList.toggle('hidden', !isSpillover);
  el('trainingSection').classList.toggle('hidden', !isTraining);
  el('procurementSection').classList.toggle('hidden', !isProcurement);
}

function updateOutbreakSections() {
  const show = value('outbreakInvestigationStatus') === 'Đã xác minh - Cần ứng phó';
  ['outbreakDetailSection', 'outbreakResponseSection', 'outbreak717Section'].forEach(id => el(id).classList.toggle('hidden', !show));
}

function updateOutbreakEndDate() {
  const show = value('outbreakStatus') === 'Đã kết thúc';
  el('outbreakEndDateField').classList.toggle('hidden', !show);
}

function initForms() {
  el('eventForm').addEventListener('submit', saveEvent);
  el('materialForm').addEventListener('submit', saveMaterial);
  el('interventionForm').addEventListener('submit', saveIntervention);
  el('outbreakForm').addEventListener('submit', saveOutbreak);
}

function saveEvent(e) {
  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;
  if (!validateDates([['Ngày bắt đầu', value('eventStartDate'), false]])) return;
  const mainTopics = requireChecks('eventMainTopics', 'Nội dung chính'); if (!mainTopics) return;
  const targetAudiences = requireChecks('eventTargetAudiences', 'Đối tượng tiếp cận mục tiêu'); if (!targetAudiences) return;
  const known = value('eventKnown');
  const participantCounts = getEventCounts();
  const participantTotal = Object.values(participantCounts).reduce((sum, item) => sum + item.total, 0);
  if (known === 'Không' && numberValue('eventEstimate') === '') { showToast('Vui lòng nhập số lượng tiếp cận ước tính.', true); return; }
  if (known === 'Có' && participantTotal === 0) { showToast('Vui lòng nhập chi tiết số người tham dự.', true); return; }
  state.events.push({
    id: makeId(), province: value('eventProvince'), commune: value('eventCommune'), mainTopics, name: value('eventName'),
    startDate: value('eventStartDate'), duration: value('eventDuration'), format: value('eventFormat'), scale: value('eventScale'),
    known, activityType: value('eventActivityType'), targetAudiences, description: value('eventDescription'),
    estimatedReach: known === 'Không' ? numberValue('eventEstimate') : '', participantCounts, participantTotal
  });
  e.currentTarget.reset(); setTimeout(updateEventConditional, 0); saveState(); showToast('Đã lưu sự kiện.');
}

function saveMaterial(e) {
  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;
  if (!validateDates([['Kỳ báo cáo', value('materialPeriod'), false], ['Ngày hoàn thành', value('materialCompletionDate'), false]])) return;
  const mainTopics = requireChecks('materialMainTopics', 'Nội dung chính'); if (!mainTopics) return;
  const channels = requireChecks('materialChannels', 'Kênh thông tin'); if (!channels) return;
  const targetAudiences = requireChecks('materialTargetAudiences', 'Đối tượng tiếp cận mục tiêu'); if (!targetAudiences) return;
  if (value('materialType').startsWith('Ấn phẩm') && numberValue('materialPrintQty') === '') { showToast('Tài liệu là ấn phẩm: vui lòng nhập số lượng bản in.', true); return; }
  state.materials.push({
    id: makeId(), period: value('materialPeriod'), mainTopics, name: value('materialName'), completionDate: value('materialCompletionDate'),
    type: value('materialType'), channels, geographicScope: value('materialGeo'), targetAudiences,
    printQuantity: numberValue('materialPrintQty'), reach: numberValue('materialReach'), description: value('materialDescription')
  });
  e.currentTarget.reset(); saveState(); showToast('Đã lưu tài liệu.');
}

function saveIntervention(e) {
  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;
  if (!validateDates([['Ngày bắt đầu', value('interventionStartDate'), false]])) return;
  const field = value('interventionField');
  const classification = value('interventionClassification');
  const config = OPTIONS.intervention[field];
  let sites = checkedValues('interventionSites');
  if (config?.sites?.length && !sites.length) { showToast('Vui lòng chọn ít nhất một điểm triển khai.', true); return; }
  const isSpillover = field === 'Phòng ngừa lây truyền từ động vật sang người';
  const isTraining = /Đào tạo|Năng lực và Văn hóa Trách nhiệm/i.test(classification);
  const isProcurement = classification === 'Mua sắm trang thiết bị và vật tư';
  let species = [], focus = [], technicalTopics = [];
  if (isSpillover) {
    species = requireChecks('interventionSpecies', 'Loài mục tiêu'); if (!species) return;
    focus = requireChecks('interventionFocus', 'Nhóm tác nhân trọng tâm'); if (!focus) return;
  }
  if (isTraining) {
    if (!value('trainingDuration')) { showToast('Vui lòng chọn thời gian khóa tập huấn.', true); return; }
    technicalTopics = requireChecks('trainingTechnical', 'Nội dung kỹ thuật'); if (!technicalTopics) return;
  }
  if (isProcurement && (!value('procurementPurpose') || !value('procurementItems'))) { showToast('Vui lòng nhập đầy đủ thông tin mua sắm.', true); return; }
  state.interventions.push({
    id: makeId(), province: value('interventionProvince'), name: value('interventionName'), startDate: value('interventionStartDate'), field,
    facilities: value('interventionFacilities'), classification, level: value('interventionLevel'), sites,
    sentinel: value('interventionSentinel'), description: value('interventionDescription'), species, focus,
    trainingDuration: isTraining ? value('trainingDuration') : '', technicalTopics,
    trainingEstimate: isTraining ? numberValue('trainingEstimate') : '', trainingCounts: isTraining ? getTrainingCounts() : {},
    procurementPurpose: isProcurement ? value('procurementPurpose') : '', procurementItems: isProcurement ? value('procurementItems') : ''
  });
  e.currentTarget.reset(); setTimeout(resetInterventionDynamic, 0); saveState(); showToast('Đã lưu can thiệp.');
}

function saveOutbreak(e) {
  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;
  const responseRequired = value('outbreakInvestigationStatus') === 'Đã xác minh - Cần ứng phó';
  const dateEntries = [['Ngày báo cáo đầu tiên', value('outbreakFirstReportDate'), false]];
  if (responseRequired) {
    if (!value('outbreakEventDescription') || !value('outbreakConfirmedPathogen') || !value('outbreakStatus')) { showToast('Vui lòng nhập đầy đủ thông tin đợt bùng phát.', true); return; }
    if (value('outbreakStatus') === 'Đã kết thúc') dateEntries.push(['Ngày kết thúc', value('outbreakEndDate'), false]);
    [['Ngày phát sinh', value('outbreakEmergenceDate')], ['Ngày phát hiện', value('outbreakDetectionDate')], ['Ngày thông báo', value('outbreakNotificationDate')], ['Ngày hoàn thành ứng phó sớm', value('outbreakEarlyResponseDate')]].forEach(item => dateEntries.push([item[0], item[1], true]));
    const invalidResponseDate = getResponses().find(r => r.startDate && !isValidDate(r.startDate));
    if (invalidResponseDate) { showToast('Ngày bắt đầu hoạt động đáp ứng phải theo định dạng dd/mm/yyyy.', true); return; }
  }
  if (!validateDates(dateEntries)) return;
  state.outbreaks.push({
    id: makeId(), province: value('outbreakProvince'), commune: value('outbreakCommune'), period: value('outbreakPeriod'),
    suspectedPathogen: value('outbreakSuspectedPathogen'), firstReportDate: value('outbreakFirstReportDate'), signalType: value('outbreakSignalType'),
    source: value('outbreakSource'), firstCase: value('outbreakFirstCase'), signalDescription: value('outbreakSignalDescription'),
    longitude: value('outbreakLongitude'), latitude: value('outbreakLatitude'), mapLink: value('outbreakMapLink'),
    investigationStatus: value('outbreakInvestigationStatus'), investigationDescription: value('outbreakInvestigationDescription'),
    eventDescription: responseRequired ? value('outbreakEventDescription') : '', confirmedPathogen: responseRequired ? value('outbreakConfirmedPathogen') : '',
    pointOfEntry: responseRequired ? value('outbreakPointOfEntry') : '', outbreakStatus: responseRequired ? value('outbreakStatus') : '',
    endDate: responseRequired && value('outbreakStatus') === 'Đã kết thúc' ? value('outbreakEndDate') : '',
    responses: responseRequired ? getResponses() : [], afterAction: responseRequired ? value('outbreakAfterAction') : '',
    analysis717: responseRequired ? value('outbreak717Analysis') : '', emergenceDate: responseRequired ? value('outbreakEmergenceDate') : '',
    detectionDate: responseRequired ? value('outbreakDetectionDate') : '', notificationDate: responseRequired ? value('outbreakNotificationDate') : '',
    earlyResponseDate: responseRequired ? value('outbreakEarlyResponseDate') : '', notes: value('outbreakNotes')
  });
  e.currentTarget.reset(); setTimeout(() => { updateOutbreakSections(); updateOutbreakEndDate(); buildResponseTable(); }, 0); saveState(); showToast('Đã lưu outbreak.');
}

function renderAllRecords() {
  renderRecords('events', 'eventRecords', item => `${item.province} · ${item.startDate}`, item => item.name);
  renderRecords('materials', 'materialRecords', item => `${item.period} · ${item.type}`, item => item.name);
  renderRecords('interventions', 'interventionRecords', item => `${item.province} · ${item.field}`, item => item.name);
  renderRecords('outbreaks', 'outbreakRecords', item => `${item.province} · ${item.period}`, item => `${item.suspectedPathogen} — ${item.commune}`);
  const counts = { event: state.events.length, material: state.materials.length, intervention: state.interventions.length, outbreak: state.outbreaks.length };
  Object.entries(counts).forEach(([key, count]) => {
    el(`${key}Count`).textContent = count;
    el(`${key}CountHeading`).textContent = count;
  });
}

function renderRecords(type, containerId, metaFn, titleFn) {
  const container = el(containerId);
  const records = state[type];
  if (!records.length) { container.className = 'record-list empty-state'; container.textContent = 'Chưa có bản ghi.'; return; }
  container.className = 'record-list';
  container.innerHTML = records.map(item => `<div class="record-card"><div><strong>${escapeHtml(titleFn(item))}</strong><small>${escapeHtml(metaFn(item))}</small></div><button class="button danger delete-record" data-type="${escapeAttr(type)}" data-id="${escapeAttr(item.id)}">Xóa</button></div>`).join('');
}

function initRecordDeletion() {
  document.addEventListener('click', event => {
    const button = event.target.closest('.delete-record');
    if (!button) return;
    const type = button.dataset.type;
    const index = state[type].findIndex(item => item.id === button.dataset.id);
    if (index >= 0 && confirm('Xóa bản ghi này?')) { state[type].splice(index, 1); saveState(); showToast('Đã xóa bản ghi.'); }
  });
}

function initGlobalActions() {
  el('resetAllBtn').addEventListener('click', () => {
    if (!confirm('Xóa toàn bộ dữ liệu đã lưu trên trình duyệt?')) return;
    state.events = []; state.materials = []; state.interventions = []; state.outbreaks = [];
    saveState(); showToast('Đã xóa toàn bộ dữ liệu.');
  });
  el('exportBtn').addEventListener('click', exportWorkbook);
}

function exportWorkbook() {
  const total = state.events.length + state.materials.length + state.interventions.length + state.outbreaks.length;
  if (!total) { showToast('Chưa có bản ghi để xuất Excel.', true); return; }

  try {
    const eventHeaders = buildEventHeaders();
    const eventRows = state.events.map(eventToRow);
    const materialHeaders = ['Kỳ báo cáo', 'Nội dung chính', 'Tên tài liệu', 'Ngày hoàn thành phát triển tài liệu', 'Thể loại', 'Kênh thông tin', 'Phạm vi địa lý', 'Đối tượng tiếp cận mục tiêu', 'Số lượng bản in', 'Số lượng phân phối/tiếp cận', 'Mô tả'];
    const materialRows = state.materials.map(item => [item.period, joinValues(item.mainTopics), item.name, item.completionDate, item.type, joinValues(item.channels), item.geographicScope, joinValues(item.targetAudiences), item.printQuantity, item.reach, item.description]);
    const interventionHeaders = buildInterventionHeaders();
    const interventionRows = state.interventions.map(interventionToRow);
    const outbreakHeaders = buildOutbreakHeaders();
    const outbreakRows = state.outbreaks.map(outbreakToRow);

    const combinedRows = [['BẢNG CAN THIỆP CHỦ ĐỘNG'], interventionHeaders, ...interventionRows, [], [], ['BẢNG OUTBREAK'], outbreakHeaders, ...outbreakRows];
    const outbreakTitleRow = 2 + interventionRows.length + 2;
    const outbreakHeaderRow = outbreakTitleRow + 1;

    const sheets = [
      {
        name: 'SỰ KIỆN', rows: [eventHeaders, ...eventRows],
        headerRows: [0], titleRows: [], merges: [], freezeRows: 1,
        autoFilter: eventRows.length ? `A1:${excelColumn(eventHeaders.length)}${eventRows.length + 1}` : '',
        widths: calculateWidths([eventHeaders, ...eventRows], eventHeaders.length)
      },
      {
        name: 'TÀI LIỆU', rows: [materialHeaders, ...materialRows],
        headerRows: [0], titleRows: [], merges: [], freezeRows: 1,
        autoFilter: materialRows.length ? `A1:${excelColumn(materialHeaders.length)}${materialRows.length + 1}` : '',
        widths: calculateWidths([materialHeaders, ...materialRows], materialHeaders.length)
      },
      {
        name: 'CAN THIỆP-OUTBREAK', rows: combinedRows,
        headerRows: [1, outbreakHeaderRow], titleRows: [0, outbreakTitleRow], freezeRows: 2,
        merges: [
          `A1:${excelColumn(interventionHeaders.length)}1`,
          `A${outbreakTitleRow + 1}:${excelColumn(outbreakHeaders.length)}${outbreakTitleRow + 1}`
        ],
        autoFilter: '',
        widths: calculateWidths([interventionHeaders, ...interventionRows, outbreakHeaders, ...outbreakRows], Math.max(interventionHeaders.length, outbreakHeaders.length))
      }
    ];

    const bytes = createXlsxBytes(sheets);
    const today = new Date();
    const filename = `GHS_Bao_cao_${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}.xlsx`;
    downloadBytes(bytes, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    showToast('Đã tạo file Excel gồm đúng 3 sheet.');
  } catch (error) {
    console.error(error);
    showToast('Không thể tạo file Excel. Vui lòng kiểm tra dữ liệu và thử lại.', true);
  }
}

function buildEventHeaders() {
  const headers = ['Tỉnh', 'Phường / Xã', 'Nội dung chính', 'Tên hoạt động', 'Ngày bắt đầu', 'Thời gian', 'Hình thức', 'Quy mô', 'Biết rõ số lượng người tiếp cận?', 'Loại hình hoạt động', 'Đối tượng tiếp cận mục tiêu', 'Mô tả', 'Ước tính số lượng tiếp cận'];
  OPTIONS.participantAudiences.forEach(audience => GENDERS.forEach(gender => headers.push(`${audience} - ${gender}`)));
  OPTIONS.participantAudiences.forEach(audience => headers.push(`${audience} - Tổng`));
  headers.push('Tổng số người tham dự');
  return headers;
}

function eventToRow(item) {
  const row = [item.province, item.commune, joinValues(item.mainTopics), item.name, item.startDate, item.duration, item.format, item.scale, item.known, item.activityType, joinValues(item.targetAudiences), item.description, item.estimatedReach];
  OPTIONS.participantAudiences.forEach(audience => {
    const c = item.participantCounts?.[audience] || {};
    row.push(toNumber(c.male), toNumber(c.female), toNumber(c.unknown));
  });
  OPTIONS.participantAudiences.forEach(audience => row.push(toNumber(item.participantCounts?.[audience]?.total)));
  row.push(toNumber(item.participantTotal));
  return row;
}

function buildInterventionHeaders() {
  const headers = ['Tỉnh', 'Tên hoạt động', 'Ngày bắt đầu', 'Lĩnh vực', 'Các cơ sở triển khai', 'Phân loại', 'Cấp độ triển khai', 'Điểm triển khai', 'Giám sát trọng điểm', 'Mô tả', 'Loài mục tiêu', 'Nhóm tác nhân trọng tâm', 'Thời gian khóa tập huấn', 'Nội dung kỹ thuật', 'Ước tính số nhân sự cần đào tạo'];
  TRAINING_ROLES.forEach(role => GENDERS.forEach(gender => TRAINING_LEVELS.forEach(level => headers.push(`${role} - ${gender} - ${level}`))));
  headers.push('Mục đích mua sắm', 'Thiết bị, vật tư và số lượng');
  return headers;
}

function interventionToRow(item) {
  const row = [item.province, item.name, item.startDate, item.field, item.facilities, item.classification, item.level, joinValues(item.sites), item.sentinel, item.description, joinValues(item.species), joinValues(item.focus), item.trainingDuration, joinValues(item.technicalTopics), item.trainingEstimate];
  TRAINING_ROLES.forEach(role => GENDERS.forEach(gender => TRAINING_LEVELS.forEach(level => row.push(toNumber(item.trainingCounts?.[`${role}|${gender}|${level}`])))));
  row.push(item.procurementPurpose, item.procurementItems);
  return row;
}

function buildOutbreakHeaders() {
  const headers = ['Tỉnh báo cáo', 'Xã báo cáo', 'Kỳ báo cáo', 'Tác nhân nghi ngờ', 'Ngày báo cáo đầu tiên', 'Tỉnh (trường 2)', 'Loại dấu hiệu', 'Nguồn tin', 'Loại ca bệnh đầu tiên', 'Mô tả dấu hiệu', 'Kinh độ', 'Vĩ độ', 'Link Google Map', 'Tình trạng điều tra', 'Mô tả việc điều tra', 'Mô tả sự kiện', 'Tác nhân xác định', 'Liên quan điểm nhập cảnh', 'Tình trạng đợt bùng phát', 'Ngày kết thúc'];
  RESPONSE_PRESETS.forEach((_, index) => headers.push(`Đáp ứng ${index + 1} - Ngày bắt đầu`, `Đáp ứng ${index + 1} - Loại can thiệp`, `Đáp ứng ${index + 1} - Mô tả`, `Đáp ứng ${index + 1} - Phù hợp địa phương`));
  headers.push('Đã đánh giá sau can thiệp?', 'Đã phân tích theo 7-1-7?', 'Ngày phát sinh/xuất hiện', 'Ngày phát hiện', 'Ngày thông báo', 'Ngày hoàn thành ứng phó sớm', 'Ghi chú');
  return headers;
}

function outbreakToRow(item) {
  const row = [item.province, item.commune, item.period, item.suspectedPathogen, item.firstReportDate, item.province, item.signalType, item.source, item.firstCase, item.signalDescription, item.longitude, item.latitude, item.mapLink, item.investigationStatus, item.investigationDescription, item.eventDescription, item.confirmedPathogen, item.pointOfEntry, item.outbreakStatus, item.endDate];
  RESPONSE_PRESETS.forEach((_, index) => {
    const response = item.responses?.[index] || {};
    row.push(response.startDate || '', response.type || '', response.description || '', response.locallyAppropriate || '');
  });
  row.push(item.afterAction, item.analysis717, item.emergenceDate, item.detectionDate, item.notificationDate, item.earlyResponseDate, item.notes);
  return row;
}

function calculateWidths(rows, columnCount) {
  const widths = Array.from({ length: columnCount }, () => 12);
  rows.slice(0, 60).forEach(row => {
    for (let col = 0; col < columnCount; col += 1) {
      const text = String(row?.[col] ?? '').replace(/\s+/g, ' ');
      widths[col] = Math.min(Math.max(widths[col], Math.min(text.length + 2, 38)), 38);
    }
  });
  return widths;
}

function excelColumn(number) {
  let value = number;
  let result = '';
  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }
  return result;
}

function xmlEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
}

function worksheetXml(sheet) {
  const maxCols = Math.max(1, ...sheet.rows.map(row => row.length));
  const maxRows = Math.max(1, sheet.rows.length);
  const dimension = `A1:${excelColumn(maxCols)}${maxRows}`;
  const headerSet = new Set(sheet.headerRows || []);
  const titleSet = new Set(sheet.titleRows || []);
  const cols = (sheet.widths || []).map((width, index) => `<col min="${index + 1}" max="${index + 1}" width="${Math.max(8, Math.min(width, 40))}" customWidth="1"/>`).join('');
  const rows = sheet.rows.map((row, rowIndex) => {
    const style = titleSet.has(rowIndex) ? 2 : (headerSet.has(rowIndex) ? 1 : 0);
    const height = titleSet.has(rowIndex) ? 26 : (headerSet.has(rowIndex) ? 42 : 21);
    const cells = row.map((cell, colIndex) => {
      if (cell === '' || cell === null || cell === undefined) return '';
      const ref = `${excelColumn(colIndex + 1)}${rowIndex + 1}`;
      if (typeof cell === 'number' && Number.isFinite(cell)) return `<c r="${ref}" s="${style}"><v>${cell}</v></c>`;
      if (typeof cell === 'boolean') return `<c r="${ref}" t="b" s="${style}"><v>${cell ? 1 : 0}</v></c>`;
      return `<c r="${ref}" t="inlineStr" s="${style}"><is><t xml:space="preserve">${xmlEscape(cell)}</t></is></c>`;
    }).join('');
    return `<row r="${rowIndex + 1}" ht="${height}" customHeight="1">${cells}</row>`;
  }).join('');
  const freeze = sheet.freezeRows ? `<sheetViews><sheetView workbookViewId="0"><pane ySplit="${sheet.freezeRows}" topLeftCell="A${sheet.freezeRows + 1}" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>` : '<sheetViews><sheetView workbookViewId="0"/></sheetViews>';
  const merges = sheet.merges?.length ? `<mergeCells count="${sheet.merges.length}">${sheet.merges.map(ref => `<mergeCell ref="${ref}"/>`).join('')}</mergeCells>` : '';
  const autoFilter = sheet.autoFilter ? `<autoFilter ref="${sheet.autoFilter}"/>` : '';
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${freeze}<dimension ref="${dimension}"/><sheetFormatPr defaultRowHeight="21"/><cols>${cols}</cols><sheetData>${rows}</sheetData>${merges}${autoFilter}</worksheet>`;
}

function createXlsxBytes(sheets) {
  const now = new Date().toISOString();
  const sheetOverrides = sheets.map((_, index) => `<Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('');
  const files = {
    '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheetOverrides}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`,
    '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`,
    'docProps/core.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Báo cáo GHS</dc:title><dc:subject>Sự kiện, Tài liệu, Can thiệp và Outbreak</dc:subject><dc:creator>GHS Reporting Portal</dc:creator><cp:lastModifiedBy>GHS Reporting Portal</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`,
    'docProps/app.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>GHS Reporting Portal</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>${sheets.length}</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="${sheets.length}" baseType="lpstr">${sheets.map(sheet => `<vt:lpstr>${xmlEscape(sheet.name)}</vt:lpstr>`).join('')}</vt:vector></TitlesOfParts><Company></Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>1.0</AppVersion></Properties>`,
    'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="24000" windowHeight="12000"/></bookViews><sheets>${sheets.map((sheet, index) => `<sheet name="${xmlEscape(sheet.name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`).join('')}</sheets><calcPr calcId="191029"/></workbook>`,
    'xl/_rels/workbook.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, index) => `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font><font><b/><sz val="14"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font></fonts><fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF007F78"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF12304A"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFD9E1E8"/></left><right style="thin"><color rgb="FFD9E1E8"/></right><top style="thin"><color rgb="FFD9E1E8"/></top><bottom style="thin"><color rgb="FFD9E1E8"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="3"><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"><alignment vertical="top" wrapText="1"/></xf><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="center"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles><dxfs count="0"/><tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/></styleSheet>`
  };
  sheets.forEach((sheet, index) => { files[`xl/worksheets/sheet${index + 1}.xml`] = worksheetXml(sheet); });
  return zipStore(files);
}

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i += 1) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function littleEndian(value, size) {
  const bytes = new Uint8Array(size);
  const view = new DataView(bytes.buffer);
  if (size === 2) view.setUint16(0, value, true); else view.setUint32(0, value >>> 0, true);
  return bytes;
}

function concatBytes(parts) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  parts.forEach(part => { output.set(part, offset); offset += part.length; });
  return output;
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function zipStore(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const { dosTime, dosDate } = dosDateTime();
  Object.entries(files).forEach(([name, content]) => {
    const nameBytes = encoder.encode(name);
    const dataBytes = typeof content === 'string' ? encoder.encode(content) : content;
    const crc = crc32(dataBytes);
    const localHeader = concatBytes([
      littleEndian(0x04034B50, 4), littleEndian(20, 2), littleEndian(0x0800, 2), littleEndian(0, 2), littleEndian(dosTime, 2), littleEndian(dosDate, 2),
      littleEndian(crc, 4), littleEndian(dataBytes.length, 4), littleEndian(dataBytes.length, 4), littleEndian(nameBytes.length, 2), littleEndian(0, 2), nameBytes
    ]);
    localParts.push(localHeader, dataBytes);
    const centralHeader = concatBytes([
      littleEndian(0x02014B50, 4), littleEndian(20, 2), littleEndian(20, 2), littleEndian(0x0800, 2), littleEndian(0, 2), littleEndian(dosTime, 2), littleEndian(dosDate, 2),
      littleEndian(crc, 4), littleEndian(dataBytes.length, 4), littleEndian(dataBytes.length, 4), littleEndian(nameBytes.length, 2), littleEndian(0, 2), littleEndian(0, 2),
      littleEndian(0, 2), littleEndian(0, 2), littleEndian(0, 4), littleEndian(offset, 4), nameBytes
    ]);
    centralParts.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  });
  const centralDirectory = concatBytes(centralParts);
  const localDirectory = concatBytes(localParts);
  const end = concatBytes([
    littleEndian(0x06054B50, 4), littleEndian(0, 2), littleEndian(0, 2), littleEndian(Object.keys(files).length, 2), littleEndian(Object.keys(files).length, 2),
    littleEndian(centralDirectory.length, 4), littleEndian(localDirectory.length, 4), littleEndian(0, 2)
  ]);
  return concatBytes([localDirectory, centralDirectory, end]);
}

function downloadBytes(bytes, filename, mimeType) {
  const blob = new Blob([bytes], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function init() {
  initNavigation(); initInputs(); initDynamicBehavior(); initForms(); initRecordDeletion(); initGlobalActions(); renderAllRecords(); updateEventConditional(); updateInterventionSections(); updateOutbreakSections(); updateOutbreakEndDate();
}

document.addEventListener('DOMContentLoaded', init);
