// GSAP 动画 - 仅首页使用
(function() {
    'use strict';
    
    // 确保 GSAP 已加载
    if (typeof gsap === 'undefined') {
        return;
    }

    // 快速隐藏 loader
    function hideLoader() {
        const loader = document.querySelector(".loader");
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }

    // 初始化函数
    function initAnimations() {
        // 立即隐藏 loader
        hideLoader();

        // 只在首页执行动画（检查是否有 hero-title）
        const isHomePage = document.querySelector(".hero-title");
        if (!isHomePage) {
            return;
        }

        // 1. Logo 悬浮动画
        if (document.querySelector(".logo")) {
            gsap.to(".logo", {
                y: -5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }

        // 2. 英雄区域主标题 - 掉落动画
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            // 设置初始状态：在上方很远的位置
            gsap.set(heroTitle, { 
                opacity: 0,
                y: -200,
                scale: 0.8,
                rotation: -5
            });
            
            // 掉落动画：带有弹跳效果
            gsap.to(heroTitle, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                delay: 0.3,
                ease: "bounce.out"
            });

            // 添加轻微的晃动效果
            gsap.to(heroTitle, {
                rotation: 2,
                duration: 0.3,
                delay: 1.8,
                yoyo: true,
                repeat: 3,
                ease: "power1.inOut"
            });
        }

        // 3. 英雄区域副标题 - 掉落动画
        const heroSubtitle = document.querySelector(".hero-subtitle");
        if (heroSubtitle) {
            // 设置初始状态：在上方
            gsap.set(heroSubtitle, { 
                opacity: 0,
                y: -150,
                scale: 0.9
            });
            
            // 掉落动画：比主标题稍晚，弹跳更轻
            gsap.to(heroSubtitle, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                delay: 0.8,
                ease: "bounce.out"
            });

            // 字间距扩展效果
            gsap.to(heroSubtitle, {
                letterSpacing: "4px",
                duration: 0.8,
                delay: 2,
                ease: "power2.out"
            });
        }

        // 4. 我们的强项区域入场动画
        if (document.querySelector(".strengths-section")) {
            gsap.from(".strengths-section", {
                opacity: 0,
                y: 100,
                duration: 1,
                delay: 0.9,
                ease: "power3.out"
            });
        }

        if (document.querySelector(".strengths-title")) {
            gsap.from(".strengths-title", {
                opacity: 0,
                x: -50,
                duration: 0.8,
                delay: 1.2,
                ease: "power2.out"
            });
        }

        if (document.querySelectorAll(".strengths-item").length > 0) {
            gsap.from(".strengths-item", {
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: 1.4,
                stagger: 0.15,
                ease: "back.out(1.7)"
            });
        }

        // 5. 导航菜单悬停效果
        const menuItems = document.querySelectorAll(".menu li a");
        menuItems.forEach(item => {
            item.addEventListener("mouseenter", () => {
                gsap.to(item, {
                    y: -2,
                    duration: 0.15,
                    ease: "power1.out"
                });
            });
            item.addEventListener("mouseleave", () => {
                gsap.to(item, {
                    y: 0,
                    duration: 0.15,
                    ease: "power1.inOut"
                });
            });
        });

        // 6. 页面滚动视差效果（仅首页）
        let scrollTicking = false;
        
        function handleScroll() {
            const scrolled = window.pageYOffset;
            const heroTitle = document.querySelector(".hero-title");
            const heroSubtitle = document.querySelector(".hero-subtitle");
            const strengthsSection = document.querySelector(".strengths-section");

            // 背景视差效果
            if (document.querySelector(".background-image")) {
                gsap.to(".background-image", {
                    y: scrolled * 0.5,
                    duration: 0.3,
                    ease: "none"
                });
            }

            // 英雄区域元素随滚动淡出
            const fadeOutOpacity = Math.max(0, 1 - scrolled / 400);
            const fadeOutScale = Math.max(0.8, 1 - scrolled / 800);

            if (heroTitle) {
                gsap.to(heroTitle, {
                    opacity: fadeOutOpacity,
                    scale: fadeOutScale,
                    y: -scrolled * 0.3,
                    duration: 0.2,
                    ease: "none"
                });
            }

            if (heroSubtitle) {
                gsap.to(heroSubtitle, {
                    opacity: fadeOutOpacity * 0.9,
                    y: -scrolled * 0.2,
                    duration: 0.2,
                    ease: "none"
                });
            }

            scrollTicking = false;
        }

        window.addEventListener("scroll", function() {
            if (!scrollTicking) {
                window.requestAnimationFrame(handleScroll);
                scrollTicking = true;
            }
        });
    }

    // 立即执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    // 回到顶部按钮功能
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) return;

        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // 点击回到顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 初始化回到顶部功能
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }
})();
