// THAY THẾ LINK NÀY BẰNG LINK WEB APP CỦA GOOGLE APPS SCRIPT
const scriptURL = 'https://script.google.com/macros/s/AKfycbwB_K2AIrIIPFTo3BLtPUu03hGy2IVxRJI1MpPDy653JVcEv28m0ujAj-c9bWmCF_8/exec';

const form = document.getElementById('duHocForm');
const btn = document.getElementById('submitBtn');
const statusMsg = document.getElementById('statusMessage');

form.addEventListener('submit', e => {
    e.preventDefault();

    btn.disabled = true;
    btn.classList.add('btn-submitting');
    statusMsg.style.display = 'none';
    statusMsg.className = 'status-message';
    statusMsg.innerHTML = '';

    if (scriptURL === 'CHUA_CO_LINK_APPS_SCRIPT') {
        setTimeout(() => {
            btn.disabled = false;
            btn.classList.remove('btn-submitting');
            showStatus('Lỗi: Chưa cài đặt Link Google Apps Script! Tham khảo hướng dẫn của AI.', 'error');
        }, 1000);
        return;
    }

    let requestBody = new FormData(form);

    // Chế độ no-cors giúp tránh lỗi bảo mật chéo domain khi gửi về Google
    fetch(scriptURL, { method: 'POST', body: requestBody, mode: 'no-cors' })
        .then(() => {
            // Khi gửi no-cors, response sẽ là opaque type, ta cứ coi như kết nối OK
            form.reset();
            showStatus('🎉 Đã gửi thông tin! Chuyên viên Hikorean sẽ liên hệ với bạn thật sớm nhé!', 'success');
        })
        .catch(error => {
            console.error('Error!', error.message);
            showStatus('Lỗi mạng. Vui lòng kiểm tra lại kết nối của bạn.', 'error');
        })
        .finally(() => {
            btn.disabled = false;
            btn.classList.remove('btn-submitting');
        });
});

function showStatus(text, type) {
    statusMsg.textContent = text;
    statusMsg.className = `status-message ${type}`;
}
