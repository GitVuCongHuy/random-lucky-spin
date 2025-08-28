document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    const resultDisplay = document.getElementById('resultDisplay');
    const itemsGrid = document.querySelector('.items-grid');
    const allItems = Array.from(document.querySelectorAll('.item'));

    // --- CẤU HÌNH QUAN TRỌNG ---
    // ID của món đồ bạn muốn NÓ LUÔN LUÔN RA
    const TARGET_ITEM_ID = 'binh-nuoc-100k'; // Sửa ID này nếu bạn muốn chọn món khác
    // --- HẾT CẤU HÌNH ---

    const targetItemElement = document.querySelector(`[data-id="${TARGET_ITEM_ID}"]`);
    const targetItemName = targetItemElement ? targetItemElement.querySelector('p:nth-child(2)').textContent : "Món đồ không tồn tại!";
    const targetItemPrice = targetItemElement ? targetItemElement.querySelector('.price').textContent : "";

    let isSpinning = false;
    let spinInterval;
    let spinDuration = 3000; // Thời gian "quay" (miligiây) - 3 giây
    let highlightInterval = 100; // Tốc độ đổi item highlight

    spinButton.addEventListener('click', () => {
        if (isSpinning) return;

        isSpinning = true;
        spinButton.disabled = true;
        resultDisplay.textContent = 'Đang quay số...';
        
        // Xóa highlight của item trước đó (nếu có)
        allItems.forEach(item => item.classList.remove('highlight'));

        let lastHighlightedItem = null;

        // Bắt đầu hiệu ứng quay ngẫu nhiên
        spinInterval = setInterval(() => {
            // Xóa highlight của item cũ
            if (lastHighlightedItem) {
                lastHighlightedItem.classList.remove('highlight');
            }

            // Chọn một item ngẫu nhiên để highlight
            const randomIndex = Math.floor(Math.random() * allItems.length);
            const currentHighlightedItem = allItems[randomIndex];
            currentHighlightedItem.classList.add('highlight');
            lastHighlightedItem = currentHighlightedItem;

        }, highlightInterval);

        // Dừng hiệu ứng quay và hiển thị kết quả "bịp" sau một khoảng thời gian
        setTimeout(() => {
            clearInterval(spinInterval); // Dừng việc highlight ngẫu nhiên
            
            // Xóa tất cả highlight
            allItems.forEach(item => item.classList.remove('highlight'));

            // Highlight item MỤC TIÊU CỦA BẠN
            if (targetItemElement) {
                targetItemElement.classList.add('highlight');
                resultDisplay.textContent = `Chúc mừng bạn đã trúng: ${targetItemName} (${targetItemPrice})!`;
            } else {
                resultDisplay.textContent = `Lỗi: Không tìm thấy món đồ mục tiêu với ID "${TARGET_ITEM_ID}"`;
            }

            isSpinning = false;
            spinButton.disabled = false;
        }, spinDuration);
    });
});