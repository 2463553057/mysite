// 图片懒加载 - 自动为所有图片添加 loading="lazy" 属性
document.addEventListener("DOMContentLoaded", function() {
    // 获取所有图片元素
    const images = document.querySelectorAll('img');

    // 为每个图片添加 loading="lazy" 属性
    images.forEach(function(img) {
        // 跳过已经有 loading 属性的图片
        if (!img.hasAttribute('loading')) {
            // 首屏可见的图片不延迟加载（前3张）
            const index = Array.from(images).indexOf(img);
            if (index > 2) {
                img.setAttribute('loading', 'lazy');
            }
        }
    });
});
