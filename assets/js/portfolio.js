(function () {
	'use strict';

	var body = document.body;
	if (!body || !body.classList.contains('portfolio-home')) {
		return;
	}

	var meter = document.querySelector('.scroll-meter');
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('.mini-nav a'));
	var sections = navLinks
		.map(function (link) {
			return document.querySelector(link.getAttribute('href'));
		})
		.filter(Boolean);

	function updateScrollState() {
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		var max = document.documentElement.scrollHeight - window.innerHeight;
		var progress = max > 0 ? scrollTop / max : 0;

		if (meter) {
			meter.style.transform = 'scaleX(' + progress + ')';
		}

		var current = sections[0];
		sections.forEach(function (section) {
			if (section.getBoundingClientRect().top <= 140) {
				current = section;
			}
		});

		navLinks.forEach(function (link) {
			link.classList.toggle('is-active', current && link.getAttribute('href') === '#' + current.id);
		});
	}

	document.querySelectorAll('[data-accordion] details').forEach(function (item) {
		item.addEventListener('toggle', function () {
			if (!item.open) {
				return;
			}

			item.parentElement.querySelectorAll('details[open]').forEach(function (openItem) {
				if (openItem !== item) {
					openItem.open = false;
				}
			});
		});
	});

	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });

		document.querySelectorAll('#main > section, .job-card, .project-card, .background-card').forEach(function (element) {
			element.classList.add('reveal');
			observer.observe(element);
		});
	}

	window.addEventListener('scroll', updateScrollState, { passive: true });
	window.addEventListener('resize', updateScrollState);
	updateScrollState();
})();
