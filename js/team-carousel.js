// 团队轮播 GSAP 动画
document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.team-carousel-track');
    const items = document.querySelectorAll('.team-carousel-item');
    const prevBtn = document.getElementById('teamCarouselPrev');
    const nextBtn = document.getElementById('teamCarouselNext');
    const dotsContainer = document.getElementById('teamCarouselDots');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    const itemsPerView = window.innerWidth > 992 ? 3 : (window.innerWidth > 576 ? 2 : 1);
    const totalItems = items.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    // 创建指示器点
    function createDots() {
        const totalDots = Math.ceil(totalItems / itemsPerView);
        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i * itemsPerView));
            dotsContainer.appendChild(dot);
        }
    }

    // 更新指示器
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const currentDot = Math.floor(currentIndex / itemsPerView);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentDot);
        });
    }

    // 计算每个item的宽度（包含gap）
    function getItemWidth() {
        const wrapper = document.querySelector('.team-carousel-wrapper');
        const wrapperWidth = wrapper.offsetWidth - 120; // 减去padding
        return (wrapperWidth / itemsPerView);
    }

    // GSAP 滑动动画
    function slideTo(index) {
        const itemWidth = getItemWidth();
        const offset = -index * (itemWidth + 30); // 30是gap

        gsap.to(track, {
            x: offset,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                updateDots();
                updateButtons();
            }
        });
    }

    // 前一张
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            slideTo(currentIndex);
        }
    }

    // 后一张
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            slideTo(currentIndex);
        }
    }

    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = Math.min(index, maxIndex);
        slideTo(currentIndex);
    }

    // 更新按钮状态
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // 鼠标拖拽支持
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        currentTranslate = gsap.getProperty(track, "x");
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walkX = x - startX;
        gsap.set(track, { x: currentTranslate + walkX });
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const x = e.pageX - track.offsetLeft;
        const walkX = x - startX;

        if (Math.abs(walkX) > 50) {
            if (walkX > 0 && currentIndex > 0) {
                prevSlide();
            } else if (walkX < 0 && currentIndex < maxIndex) {
                nextSlide();
            } else {
                slideTo(currentIndex);
            }
        } else {
            slideTo(currentIndex);
        }
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
            slideTo(currentIndex);
        }
    });

    // 触摸支持
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - track.offsetLeft;
        currentTranslate = gsap.getProperty(track, "x");
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walkX = x - startX;
        gsap.set(track, { x: currentTranslate + walkX });
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const x = e.changedTouches[0].pageX - track.offsetLeft;
        const walkX = x - startX;

        if (Math.abs(walkX) > 50) {
            if (walkX > 0 && currentIndex > 0) {
                prevSlide();
            } else if (walkX < 0 && currentIndex < maxIndex) {
                nextSlide();
            } else {
                slideTo(currentIndex);
            }
        } else {
            slideTo(currentIndex);
        }
    });

    // 窗口大小改变时重新计算
    window.addEventListener('resize', () => {
        slideTo(currentIndex);
    });

    // 自动播放（可选）
    let autoPlayInterval;

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                nextSlide();
            } else {
                currentIndex = 0;
                slideTo(0);
            }
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 鼠标悬停时暂停自动播放
    const container = document.querySelector('.team-carousel-container');
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // 初始化
    createDots();
    updateButtons();
    startAutoPlay();

    // 入场动画
    gsap.from(items, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
    });

    // 卡片悬停动画增强
    items.forEach(item => {
        const member = item.querySelector('.team-1-member');
        const img = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.1,
                rotation: 5,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.inOut"
            });
        });
    });
});
