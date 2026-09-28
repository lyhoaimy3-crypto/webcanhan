const themeToggle = document.getElementById("themeToggle");
const body = document.body;


let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
    console.warn("Khong the doc che do giao dien.", error);
}


if (savedTheme === "dark") {
    body.classList.add("dark-mode");
}


function updateThemeButton() {
    const isDark = body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Chuyển sang chế độ sáng"
            : "Chuyển sang chế độ tối"
    );
}

updateThemeButton();


themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    try {
        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );
    } catch (error) {
        console.warn("Khong the luu che do giao dien.", error);
    }

    updateThemeButton();
});




const typingText = document.querySelector(".typing-text");

const words = [
    "Yêu thích thiết kế web",
    "Đam mê công nghệ",
    "Không ngừng học hỏi",
    "Sáng tạo mỗi ngày"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (typingText && !prefersReducedMotion) {

    function typeEffect() {
        const currentWord = words[wordIndex];

        // Tang hoac giam so ky tu
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        // Hien thi chu
        typingText.textContent = currentWord.substring(
            0,
            charIndex
        );

        let delay = isDeleting ? 45 : 85;

        // Dung mot chut khi go xong
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 1500;
        }

        // Chuyen sang cau tiep theo
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;

            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();
}




const avatar = document.querySelector(".avatar");
const avatarWrap = document.querySelector(".avatar-wrap");

if (avatar && avatarWrap) {

    // Neu anh khong tai duoc, hien chu viet tat HM
    avatar.addEventListener("error", function () {
        avatarWrap.classList.add("image-error");
    });

    // Neu anh tai duoc, hien thi anh binh thuong
    avatar.addEventListener("load", function () {
        avatarWrap.classList.remove("image-error");
    });

    // Kiem tra truong hop anh da loi truoc khi gan su kien
    if (avatar.complete && avatar.naturalWidth === 0) {
        avatarWrap.classList.add("image-error");
    }
}




const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Ngung theo doi khi da hien thi
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.08
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {


    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}




const skillSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".skill-progress");

function animateSkills() {

    skillBars.forEach(function (bar) {

        const width = bar.dataset.width;

        bar.style.width = width;

    });

}

if (skillSection) {

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const skillObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateSkills();

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.2
            }
        );

        skillObserver.observe(skillSection);

    } else {

        animateSkills();

    }

}




const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", function (event) {

        // Khong tai lai trang
        event.preventDefault();

        // Kiem tra du lieu
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Lay ho ten
        const name = document
            .getElementById("name")
            .value
            .trim();

        // Hien thi thong bao
        formStatus.textContent =
            "Cảm ơn " + name +
            "! Biểu mẫu đã được kiểm tra thành công. " +
            "Lời nhắn chưa được gửi qua email thật.";

        // Xoa noi dung da nhap
        contactForm.reset();

    });

    // Xoa thong bao khi nguoi dung nhap lai
    contactForm.addEventListener("input", function () {
        formStatus.textContent = "";
    });

}




const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}




console.log(
    "Website cá nhân của Lý Hoài My đã sẵn sàng!"
);