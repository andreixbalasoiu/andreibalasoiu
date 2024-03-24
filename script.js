let contactButtonsInitial = document.getElementById('contact-buttons-initial');
let contactButtonsFooterFixed = document.getElementById('contact-buttons-initial-footer-fixed');
let projectsContainer = document.getElementById('projects-container');
let bottomSocials = document.getElementById('bottom-socials');
let sliderElement = document.getElementById('slider')

const slides = [
    {
        img: 'project-1.webp',
        alt: '',
        preloaded: true
    },
    {
        img: 'project-2.webp',
        alt: '',
        preloaded: true
    },
    {
        img: 'project-3.webp',
        alt: '',
        preloaded: true
    },
    {
        img: 'project-4.webp',
        alt: '',
        preloaded: false
    },
    {
        img: 'project-5.webp',
        alt: '',
        preloaded: false
    },
    {
        img: 'project-6.webp',
        alt: '',
        preloaded: false
    },
];

const LAYOUT_TWO_IMAGES_FIRST = 'LAYOUT_TWO_IMAGES_FIRST'
const LAYOUT_WIDE_IMAGE_FIRST = 'LAYOUT_WIDE_IMAGE_FIRST'

const projects = [
    {
        title: 'Pricing model',
        short_desc: 'Pricing modal made simple',
        long_desc: 'Fun with pricing modals. The goal was to make it simple, clean and easy to see the pricing model.',
        images: {
            left: {
                img: 'assets/projects/1/left.webp',
                alt: ''
            },
            right: {
                img: 'assets/projects/1/right.webp',
                alt: ''
            },
            wide: {
                img: 'assets/projects/1/wide.webp',
                alt: ''
            },
            layout: LAYOUT_TWO_IMAGES_FIRST
        }
    },
    {
        title: '4th Corner',
        short_desc: 'Landing page for a studio that does multimedia',
        long_desc: 'A simple website for the 4th Corner Studio',
        images: {
            left: {
                img: 'assets/projects/2/left.svg',
                alt: ''
            },
            right: {
                img: 'assets/projects/2/right.svg',
                alt: ''
            },
            wide: {
                img: 'assets/projects/2/wide.svg',
                alt: ''
            },
            layout: LAYOUT_WIDE_IMAGE_FIRST
        },
    }
];

let indexToClone = 0;
let sliderGrabbed = false;
let sliderEnabled = true;
let startX;
let scrollLeft;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function moveSlider(element) {
    if (sliderEnabled) {
        element.scrollLeft += 1;
    }
    sleep(10).then(() => {
        moveSlider(element)
    });
}

function loopImagesIfNeeded() {
    if (slides.length < 2) {
        return;
    }

    if (sliderEnabled || sliderGrabbed) {
        let currentSliderState = document.getElementById('slider');
        let distanceFromEnteringView = sliderElement.lastElementChild.getBoundingClientRect().right - window.innerWidth;

        if (distanceFromEnteringView < currentSliderState.lastElementChild.width / 2) {
            currentSliderState.appendChild(currentSliderState.children[indexToClone].cloneNode(true));
            indexToClone++;

            if (indexToClone >= slides.length) {
                indexToClone = 0;
            }
        }
    }

    sleep(sliderGrabbed ? 10 : 250).then(() => loopImagesIfNeeded())
}

function sliderWasGrabbed(e, mobile = false) {
    sliderGrabbed = true;
    sliderEnabled = false;
    sliderElement.classList.add('active');
    let pageX = mobile ? e.changedTouches[0].pageX : e.pageX;
    startX = pageX - sliderElement.offsetLeft;
    scrollLeft = sliderElement.scrollLeft;
}

function sliderLetGo() {
    sliderGrabbed = false;
    sliderEnabled = true;
    sliderElement.classList.remove('active');
}

function moveSliderManually(e, mobile = false) {
    if (!sliderGrabbed) return;
    e.preventDefault();
    let pageX = mobile ? e.changedTouches[0].pageX : e.pageX;
    const x = pageX - sliderElement.offsetLeft;
    const walk = (x - startX) * 2;
    sliderElement.scrollLeft = scrollLeft - walk;
}

function loadProjects() {
    let lastIndex = projects.length - 1;
    projects.forEach((project, index) => {
        let wrapper = document.createElement('div');
        if (index !== lastIndex) {
            wrapper.style.marginBottom = '104px';
        }

        let imagesLeftRightContainer = document.createElement('div');
        let imageWideContainer = document.createElement('div');

        let projectInformation = document.createElement('div');
        projectInformation.classList.add('d-flex', 'align-vertical-center', 'align-center', 'flex-column', 'mb-24');

        let title = document.createElement('span');
        title.classList.add('mb-24', 'fs-16', 'text-grey');
        title.innerHTML = project.title;

        let shortDesc = document.createElement('h2');
        shortDesc.classList.add('mb-24', 'text-center');
        shortDesc.innerHTML = project.short_desc;

        let longDesc = document.createElement('p');
        longDesc.classList.add('text-center', 'w-90p')
        longDesc.innerHTML = project.long_desc;

        let imagesContainer = document.createElement('div');
        imagesContainer.classList.add('d-flex', 'align-vertical-center', 'align-center', 'flex-column');
        imagesContainer.style.gap = '12px';

        if (project.images.left.img !== '' && project.images.right.img !== '') {
            imagesLeftRightContainer.classList.add('d-flex', 'align-center', 'align-vertical-center', 'w-100p');
            imagesLeftRightContainer.style.gap = '12px';

            let imageLeft = createSmallImageElement(project.images.left);
            let imageRight = createSmallImageElement(project.images.right);

            imagesLeftRightContainer.appendChild(imageLeft);
            imagesLeftRightContainer.appendChild(imageRight);
        }

        if (project.images.wide.img !== '') {
            imageWideContainer.classList.add('w-100p');

            let imageWide = document.createElement('img');
            imageWide.src = project.images.wide.img;
            imageWide.alt = project.images.wide.alt;
            imageWide.width = 1440;

            imageWideContainer.appendChild(imageWide);
        }

        if (project.images.layout === LAYOUT_TWO_IMAGES_FIRST) {
            imagesContainer.appendChild(imagesLeftRightContainer);
            imagesContainer.appendChild(imageWideContainer);
        }
        else if (project.images.layout === LAYOUT_WIDE_IMAGE_FIRST) {
            imagesContainer.appendChild(imageWideContainer);
            imagesContainer.appendChild(imagesLeftRightContainer);
        }


        projectInformation.appendChild(title);
        projectInformation.appendChild(shortDesc);
        projectInformation.appendChild(longDesc);

        wrapper.appendChild(projectInformation);
        wrapper.appendChild(imagesContainer);

        projectsContainer.appendChild(wrapper);
    })
}

function createSmallImageElement(data) {
    let image = document.createElement('img');
    image.src = data.img;
    image.alt = data.alt;
    image.width = 720;
    image.style.maxWidth = 'calc(50% - 6px)'

    return image;
}

document.addEventListener('DOMContentLoaded', function () {
    loadProjects();

    // Firefox disable drag images on clickable scroll
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });

    slides.forEach(slide => {
        if (slide.preloaded) {
            return;
        }
        let img = document.createElement('img')
        img.src = `assets/slider/${slide.img}`;
        img.alt = slide.alt;

        sliderElement.appendChild(img)
    })

    moveSlider(sliderElement);
    sleep(500).then(() => loopImagesIfNeeded());

    sliderElement.addEventListener('mousedown', (e) => {
        sliderWasGrabbed(e);
    });

    sliderElement.addEventListener('mouseleave', () => {
        sliderLetGo();
    });
    sliderElement.addEventListener('mouseup', () => {
        sliderLetGo();
    });

    sliderElement.addEventListener('mousemove', (e) => {
        moveSliderManually(e)
    });

    sliderElement.addEventListener('touchstart', (e) => {
        sliderWasGrabbed(e, true);
    });

    sliderElement.addEventListener('touchend', () => {
        sliderLetGo();
    });

    sliderElement.addEventListener('touchmove', (e) => {
        moveSliderManually(e, true)
    });
});

document.addEventListener('scroll', () => {
    if ((bottomSocials.getBoundingClientRect().top - window.innerHeight) < 0) {
        contactButtonsFooterFixed.style.position = 'initial'
    }
    else if ((bottomSocials.getBoundingClientRect().top - window.innerHeight) > 160 &&
        contactButtonsFooterFixed.style.position === 'initial') {
        contactButtonsFooterFixed.style.position = 'fixed'
    }

    if (contactButtonsInitial.getBoundingClientRect().bottom < 0) {
        contactButtonsFooterFixed.style.opacity = "1";
    }
    else {
        contactButtonsFooterFixed.style.opacity = "0";
    }

    sliderEnabled = sliderElement.getBoundingClientRect().bottom > 0
});
