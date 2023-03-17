import { MetaSwiper, SafariSwiper } from "./meta-settings.js";
import Swiper from "./plugins/swiper-bundle.esm.browser.min.js";

const header = document.getElementsByClassName(`header`)[0];
// Header scroll
const scrollContainer = () => {
	return document.documentElement || document.body;
};

if (header.classList.contains("fixed")) {
	document.addEventListener("scroll", () => {
		if (scrollContainer().scrollTop > 0) {
			header.classList.add("scrolled");
		} else if (scrollContainer().scrollTop == 0) {
			header.classList.remove("scrolled");
		}
	});
}

// menu handlers

///check mobile menu show/hide condition
const mobileMenuStartPoint = +getComputedStyle(
	document.documentElement
).getPropertyValue("--mobile-menu-start-point");
let isMobileMenuEnable =
	$(window).outerWidth() <= mobileMenuStartPoint || $(".header-mobile").length;

$(".dropdown-toggle").click(function (e) {
	if (isMobileMenuEnable) {
		//close all opened sub menu
		$(".menu-item.dropdown.active .dropdown-menu").slideUp({
			complete: function () {
				$(this).closest(".dropdown").removeClass("active");
			},
		});

		//open current submenu
		$(this).closest(".menu-item.dropdown").toggleClass("active");
		if ($(this).closest(".menu-item.dropdown").hasClass("active")) {
			e.preventDefault();
			$(this).next(".dropdown-menu").slideDown();
		}
	}
});

// toggle menu handler
function menuToggle() {
	$(".menu-toggle").toggleClass("active");
	$(".navbar-nav").toggleClass("active");
	$(".header-close-wrapper").toggleClass("active");
	// LockScroll when burger open and enable when closed and enable scroll on menu
	scrollLock.getScrollState()
		? scrollLock.disablePageScroll(document.querySelector(".navbar-nav .menu"))
		: scrollLock.enablePageScroll();
}
//menu update function
function updateMenu() {
	isMobileMenuEnable =
		$(window).outerWidth() <= mobileMenuStartPoint ||
		$(".mobile-header").length;
	if (!isMobileMenuEnable) {
		$(".dropdown-menu").css("display", "");
		$(".header-close-wrapper").removeClass("active");
		$(".menu-item.active").removeClass("active");
		$(".navbar-nav").removeClass("active");
		$(".menu-toggle").removeClass("active");
		// LockScroll when burger open and enable when closed
		scrollLock.enablePageScroll();
	}
}
$(window).on("resize orientationchange", updateMenu);
// end of toggle menu handler

$(".menu-toggle").click(menuToggle); //menu toggles
$(".header-close-wrapper").click(menuToggle); //menu toggles

// Приклад приєднання lottie на проекті (BOLD треба приєднювати тепер просто .gif)
// lottie.loadAnimation({
//   container: document.getElementById(``),
//   renderer: "svg",
//   loop: true,
//   autoplay: true,
//   path: "./js/lottie/name.json",
// });
// test

var elements = document.querySelectorAll(".force-sticky");
Stickyfill.forceSticky();
Stickyfill.add(elements);

gsap.registerPlugin(ScrollTrigger);

if (document.querySelector(".row")) {
	const galleryRow = gsap.utils.toArray(".row");

	galleryRow.forEach((row, i) => {
		const w = row.querySelector(".img-box");
		const [x, xEnd] = i % 2 === 0 ? ["-30%", "-60%"] : ["-60%", "-30%"];
		gsap.fromTo(
			w,
			{ x },
			{
				x: xEnd,
				scrollTrigger: {
					toggleActions: "none",
					trigger: row,
					scrub: 1.5,
				},
			}
		);
	});
}
