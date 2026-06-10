const titleZone = document.getElementById("title-zone");
const perspectiveLayer = document.getElementById("title-perspective");
const zhLayer = document.getElementById("title-zh");
const circleMask = document.getElementById("circle-mask");
const profileSection = document.getElementById("profile");
const profileOverview = document.getElementById("profile-overview");
const profileInfoToggle = document.getElementById("profile-info-toggle");
const siteNav = document.getElementById("site-nav");
const siteNavLinks = document.querySelectorAll(".site-nav-link[data-section-target]");
const pageProgressDots = document.querySelectorAll(".page-progress-dot[data-section-target]");
const revealItems = document.querySelectorAll(".reveal-section, .detail-card");
const depthItems = document.querySelectorAll("[data-depth]");
const hoverGlowItems = document.querySelectorAll(".detail-card, .profile-ribbon");
const portraitCards = document.querySelectorAll(".interactive-portrait");
const summonButton = document.getElementById("corner-summon-button");
const cornerCharacterLayer = document.getElementById("corner-character-layer");
const cornerCharacterVideo = document.getElementById("corner-character-video");
const profileBackgroundCanvas = document.getElementById("profile-interactive-bg");
const profileBackgroundContext = profileBackgroundCanvas ? profileBackgroundCanvas.getContext("2d") : null;
const projectPathwayStage = document.getElementById("project-pathway-stage");
const projectNodesContainer = document.getElementById("project-nodes");
const projectPreviewCard = document.getElementById("project-preview-card");
const projectPreviewMedia = document.getElementById("project-preview-media");
const projectRouteLinePath = document.getElementById("project-route-line-path");
const projectFrames = document.querySelectorAll(".project-frame[data-project-index]");
const projectModal = document.getElementById("project-modal");
const projectModalImage = document.getElementById("project-modal-image");
const projectModalCategory = document.getElementById("project-modal-category");
const projectModalYear = document.getElementById("project-modal-year");
const projectModalTitle = document.getElementById("project-modal-title");
const projectModalSummary = document.getElementById("project-modal-summary");
const projectModalRole = document.getElementById("project-modal-role");
const projectModalTags = document.getElementById("project-modal-tags");
const projectModalGallery = document.getElementById("project-modal-gallery");
const projectModalLink = document.getElementById("project-modal-link");
const projectModalCloseButtons = document.querySelectorAll("[data-project-modal-close]");
const projectModalPrevButtons = document.querySelectorAll("[data-project-modal-prev]");
const projectModalNextButtons = document.querySelectorAll("[data-project-modal-next]");
const projectIndexList = document.getElementById("project-index-list");
const projectIndexFilters = document.querySelectorAll(".project-index-filter[data-project-filter]");
const figmaPreviewTiles = document.querySelectorAll(".figma-preview-tile");
const figmaFocusImage = document.getElementById("figma-focus-image");
const figmaFocusKicker = document.getElementById("figma-focus-kicker");
const figmaFocusTitle = document.getElementById("figma-focus-title");
const figmaFocusDesc = document.getElementById("figma-focus-desc");

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let clipRadius = 210;
let activeProjectIndex = 0;
let activeModalProjectIndex = 0;
let projectHideTimer = 0;
let projectFramePulseTimer = 0;
let projectNodePositions = [];
let projectGalleryRevealObserver = null;

const projectItems = [
    {
        progress: 0.5,
        offset: 0,
        category: "爱租机 / App 改版",
        title: "爱租机 App 首屏与项目介绍",
        summary: "根据 Figma 节点 1:6705 还原爱租机 App 第一个展示板块，包含品牌首屏、手机样机、口号和项目介绍。",
        year: "2024",
        role: "UI 视觉 / App 改版 / 页面还原",
        tags: ["爱租机", "App", "Figma 还原"],
        image: "./assets/aizhuji/figma-reference.png",
        page: "./case-aizhuji.html",
        gallery: [
            "./assets/aizhuji/figma-reference.png",
            "./assets/aizhuji/phone-mockup.png"
        ]
    }
];

figmaPreviewTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        figmaPreviewTiles.forEach((item) => item.classList.toggle("is-active", item === tile));

        if (figmaFocusImage && tile.dataset.previewImage) {
            figmaFocusImage.src = tile.dataset.previewImage;
            figmaFocusImage.alt = tile.dataset.previewTitle || "Figma 作品集画面";
        }

        if (figmaFocusKicker) {
            figmaFocusKicker.textContent = tile.dataset.previewKicker || "";
        }

        if (figmaFocusTitle) {
            figmaFocusTitle.textContent = tile.dataset.previewTitle || "";
        }

        if (figmaFocusDesc) {
            figmaFocusDesc.textContent = tile.dataset.previewDesc || "";
        }
    });
});

document.querySelectorAll(".module-notes").forEach((module) => {
    const tabs = module.querySelectorAll(".case-tab[data-case-tab]");
    const panels = module.querySelectorAll(".case-tab-panel[data-case-panel]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.caseTab;

            tabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle("is-active", isActive);
                item.setAttribute("aria-selected", String(isActive));
            });

            panels.forEach((panel) => {
                panel.classList.toggle("is-active", panel.dataset.casePanel === target);
            });
        });
    });
});

function syncAizhujiStageScale() {
    document.querySelectorAll("[data-aizhuji-shell]").forEach((shell) => {
        const stage = shell.querySelector("[data-aizhuji-stage]");
        if (!stage) {
            return;
        }

        const designWidth = Number(stage.dataset.designWidth) || 1280;
        const designHeight = Number(stage.dataset.designHeight) || 1476;
        const scale = Math.min(1, shell.clientWidth / designWidth);
        stage.style.transform = `scale(${scale})`;
        shell.style.height = `${designHeight * scale}px`;
    });
}

document.querySelectorAll("[data-aizhuji-stage]").forEach((stage) => {
    stage.addEventListener("pointermove", (event) => {
        const rect = stage.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        stage.style.setProperty("--az-x", x.toFixed(3));
        stage.style.setProperty("--az-y", y.toFixed(3));
    });

    stage.addEventListener("pointerleave", () => {
        stage.style.setProperty("--az-x", "0");
        stage.style.setProperty("--az-y", "0");
    });
});

const aizhujiRevealItems = document.querySelectorAll(".az-reveal, .az2-reveal, .az3-reveal");

if (aizhujiRevealItems.length) {
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px 12% 0px"
        });

        aizhujiRevealItems.forEach((item) => revealObserver.observe(item));
    } else {
        aizhujiRevealItems.forEach((item) => item.classList.add("is-visible"));
    }
}

document.querySelectorAll(".az2-issue-pill, .az2-problem-card, .az2-direction-card, .az2-process-step, .az3-question, .az3-gender-row, .az3-purpose-item").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("is-active");
    });
});

syncAizhujiStageScale();
window.addEventListener("resize", syncAizhujiStageScale, { passive: true });

if (profileOverview && profileInfoToggle) {
    profileInfoToggle.addEventListener("click", () => {
        const isExpanded = profileOverview.classList.toggle("is-expanded");
        profileInfoToggle.setAttribute("aria-expanded", String(isExpanded));
        profileInfoToggle.setAttribute("aria-label", isExpanded ? "收起个人信息" : "展开个人信息");
    });
}

function setActivePageProgress(sectionId) {
    pageProgressDots.forEach((dot) => {
        dot.classList.toggle("is-active", dot.dataset.sectionTarget === sectionId);
    });

    siteNavLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.sectionTarget === sectionId);
    });
}

if (pageProgressDots.length || siteNavLinks.length) {
    const progressSections = ["top", "profile", "projects"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    function updatePageProgressFromScroll() {
        const anchorY = window.scrollY + window.innerHeight * 0.38;
        let activeId = progressSections[0]?.id;

        progressSections.forEach((section) => {
            if (anchorY >= section.offsetTop) {
                activeId = section.id;
            }
        });

        if (activeId) {
            setActivePageProgress(activeId);
        }
    }

    [...pageProgressDots, ...siteNavLinks].forEach((item) => {
        item.addEventListener("click", () => {
            setActivePageProgress(item.dataset.sectionTarget);
        });
    });

    window.addEventListener("scroll", updatePageProgressFromScroll, { passive: true });
    window.addEventListener("resize", updatePageProgressFromScroll);
    updatePageProgressFromScroll();
}

if (siteNav) {
    const updateSiteNavState = () => {
        siteNav.classList.toggle(
            "is-scrolled",
            document.body.classList.contains("projects-page") || document.body.classList.contains("about-page") || window.scrollY > 24
        );
    };

    window.addEventListener("scroll", updateSiteNavState, { passive: true });
    updateSiteNavState();
}

if (titleZone && perspectiveLayer && zhLayer && circleMask) {
    titleZone.addEventListener("mouseenter", () => {
        titleZone.classList.add("active");
    });

    titleZone.addEventListener("mouseleave", () => {
        titleZone.classList.remove("active");
        perspectiveLayer.style.transform = "";
    });

    titleZone.addEventListener("mousemove", (event) => {
        const rect = titleZone.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = x;
        targetY = y;

        const rotateY = ((x - centerX) / centerX) * 14;
        const rotateX = -((y - centerY) / centerY) * 12;
        const translateX = ((x - centerX) / centerX) * 18;
        const translateY = ((y - centerY) / centerY) * 16;

        perspectiveLayer.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
    });
}

function animateSpotlight() {
    if (titleZone && zhLayer && circleMask) {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        circleMask.style.left = `${currentX}px`;
        circleMask.style.top = `${currentY}px`;

        const zhContent = zhLayer.querySelector(".zh-content");
        if (zhContent) {
            zhContent.style.clipPath = `circle(${clipRadius}px at ${currentX}px ${currentY}px)`;
        }
    }

    requestAnimationFrame(animateSpotlight);
}

function initSpotlight() {
    if (!titleZone) {
        return;
    }

    const rect = titleZone.getBoundingClientRect();
    currentX = rect.width * 0.5;
    currentY = rect.height * 0.5;
    targetX = currentX;
    targetY = currentY;
    clipRadius = window.innerWidth < 640 ? 140 : 210;
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
    }
);

revealItems.forEach((item) => {
    const delay = item.dataset.revealDelay;
    if (delay) {
        item.style.transitionDelay = `${delay}s`;
    }
    revealObserver.observe(item);
});

hoverGlowItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        item.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });

    item.addEventListener("mouseleave", () => {
        item.style.setProperty("--mx", "50%");
        item.style.setProperty("--my", "50%");
    });
});

portraitCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / rect.width) * 6;
        const rotateX = -((y - rect.height / 2) / rect.height) * 5;
        card.style.transform = `translate3d(0, calc(var(--depth-offset) - 6px), 0) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

function renderProjectNodes() {
    if (!projectNodesContainer) {
        return;
    }

    projectNodesContainer.innerHTML = projectItems
        .map(
            (project, index) => `
                <button
                    class="project-node"
                    type="button"
                    data-index="${index}"
                    style="--x:0px; --y:0px; --node-delay:${0.95 + index * 0.12}s"
                    aria-label="${project.title}"
                >
                    <span class="project-node-core"></span>
                    <span class="project-node-index">${String(index + 1).padStart(2, "0")}</span>
                </button>
            `
        )
        .join("");

    projectNodesContainer.querySelectorAll(".project-node").forEach((node) => {
        const nextIndex = Number(node.dataset.index);

        const activate = () => {
            window.clearTimeout(projectHideTimer);
            setActiveProject(nextIndex);
        };

        node.addEventListener("mouseenter", activate);
        node.addEventListener("focus", activate);
        node.addEventListener("click", () => {
            activate();
            navigateToProject(nextIndex);
        });
        node.addEventListener("mouseleave", () => {
            projectHideTimer = window.setTimeout(hideProjectPreview, 70);
        });
        node.addEventListener("blur", hideProjectPreview);
    });

    positionProjectNodes();
}

function updateProjectPreviewPosition() {
    if (!projectPathwayStage || !projectPreviewCard || !projectNodePositions[activeProjectIndex]) {
        return;
    }

    const stageRect = projectPathwayStage.getBoundingClientRect();
    const cardWidth = projectPreviewCard.offsetWidth || 236;
    const cardHeight = projectPreviewCard.offsetHeight || 236;
    const point = projectNodePositions[activeProjectIndex];
    const pointX = point.x;
    const pointY = point.y;

    let left = pointX + 28;
    if (pointX > stageRect.width * 0.62) {
        left = pointX - cardWidth - 28;
    }

    let top = pointY - cardHeight * 0.42;

    left = Math.max(18, Math.min(stageRect.width - cardWidth - 18, left));
    top = Math.max(18, Math.min(stageRect.height - cardHeight - 18, top));

    projectPreviewCard.style.left = `${left}px`;
    projectPreviewCard.style.top = `${top}px`;
}

function hideProjectPreview() {
    projectNodesContainer?.querySelectorAll(".project-node").forEach((node) => {
        node.classList.remove("is-active");
    });

    projectPreviewCard?.classList.remove("is-visible");
}

function setActiveProject(index) {
    activeProjectIndex = index;

    const project = projectItems[index];
    if (!project) {
        return;
    }

    projectNodesContainer?.querySelectorAll(".project-node").forEach((node, nodeIndex) => {
        node.classList.toggle("is-active", nodeIndex === index);
    });

    if (projectPreviewMedia) {
        projectPreviewMedia.style.backgroundImage = `url("${project.image}")`;
    }

    if (projectPreviewCard) {
        projectPreviewCard.classList.add("is-visible");
    }

    updateProjectPreviewPosition();
}

function getProjectFrame(index) {
    return document.querySelector(`.project-frame[data-project-index="${index}"]`);
}

function pulseProjectFrame(index) {
    const frame = getProjectFrame(index);
    if (!frame) {
        return;
    }

    window.clearTimeout(projectFramePulseTimer);
    projectFrames.forEach((item) => item.classList.remove("is-linked", "is-pulsing"));
    frame.classList.add("is-linked", "is-pulsing");
    projectFramePulseTimer = window.setTimeout(() => {
        frame.classList.remove("is-pulsing");
    }, 1300);
}

function scrollToProjectFrame(index) {
    const frame = getProjectFrame(index);
    if (!frame) {
        return;
    }

    pulseProjectFrame(index);
    frame.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    });
}

function navigateToProject(index) {
    const project = projectItems[index];
    if (!project?.page) {
        openProjectModal(index);
        return;
    }

    window.location.href = project.page;
}

function renderProjectModalGallery(project) {
    if (!projectModalGallery) {
        return;
    }

    const gallery = project.gallery?.length ? project.gallery : [project.image];

    projectModalGallery.innerHTML = gallery
        .map(
            (image, imageIndex) => `
                <button
                    class="project-modal-thumb${imageIndex === 0 ? " is-active" : ""}"
                    type="button"
                    data-modal-gallery-image="${image}"
                    aria-label="查看第 ${imageIndex + 1} 张项目画面"
                >
                    <img src="${image}" alt="" loading="lazy">
                </button>
            `
        )
        .join("");

    projectModalGallery.querySelectorAll(".project-modal-thumb").forEach((button) => {
        button.addEventListener("click", () => {
            projectModalGallery.querySelectorAll(".project-modal-thumb").forEach((item) => {
                item.classList.toggle("is-active", item === button);
            });

            if (projectModalImage && button.dataset.modalGalleryImage) {
                projectModalImage.src = button.dataset.modalGalleryImage;
            }
        });
    });
}

function openProjectModal(index) {
    const project = projectItems[index];
    if (!project || !projectModal) {
        return;
    }

    activeModalProjectIndex = index;
    setActiveProject(index);

    if (projectModalImage) {
        projectModalImage.src = project.image;
        projectModalImage.alt = project.title;
    }

    if (projectModalCategory) {
        projectModalCategory.textContent = project.category;
    }

    if (projectModalYear) {
        projectModalYear.textContent = project.year;
    }

    if (projectModalTitle) {
        projectModalTitle.textContent = project.title;
    }

    if (projectModalSummary) {
        projectModalSummary.textContent = project.summary;
    }

    if (projectModalRole) {
        projectModalRole.textContent = project.role;
    }

    if (projectModalTags) {
        projectModalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    }

    renderProjectModalGallery(project);

    if (projectModalLink) {
        projectModalLink.href = project.page || "./projects.html";
        projectModalLink.textContent = "查看详情页面";
    }

    projectModal.classList.add("is-visible");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function showAdjacentProject(direction) {
    if (!projectModal?.classList.contains("is-visible")) {
        return;
    }

    const nextIndex = (activeModalProjectIndex + direction + projectItems.length) % projectItems.length;
    openProjectModal(nextIndex);
}

function closeProjectModal() {
    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("is-visible");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function setProjectIndexPreview(index) {
    const project = projectItems[index];
    if (!project) {
        return;
    }

    projectIndexList?.querySelectorAll("[data-project-index]").forEach((row) => {
        row.classList.toggle("is-active", Number(row.dataset.projectIndex) === index);
    });

}

function renderProjectIndexList() {
    if (!projectIndexList) {
        return;
    }

    projectIndexList.innerHTML = projectItems
        .map((project, index) => `
            <button
                class="project-gallery-item project-gallery-item-${index + 1}${index === 0 ? " is-active" : ""}"
                type="button"
                data-project-index="${index}"
                data-project-category="${project.category}"
                aria-label="${project.title}"
                style="--gallery-delay:${index * 48}ms"
            >
                <span class="project-gallery-media">
                    <img src="${project.image}" alt="" loading="lazy">
                </span>
                <span class="project-gallery-info" aria-hidden="true">
                    <span>${String(index + 1).padStart(2, "0")} / ${project.category.split(" / ")[0]}</span>
                    <strong>${project.title}</strong>
                </span>
            </button>
        `)
        .join("");

    projectIndexList.querySelectorAll(".project-gallery-item").forEach((row) => {
        const index = Number(row.dataset.projectIndex);

        row.addEventListener("mouseenter", () => setProjectIndexPreview(index));
        row.addEventListener("focus", () => setProjectIndexPreview(index));
        row.addEventListener("click", () => navigateToProject(index));
    });

    setProjectIndexPreview(0);
    initProjectGalleryReveal();
}

function initProjectGalleryReveal() {
    if (!projectIndexList) {
        return;
    }

    const galleryItems = projectIndexList.querySelectorAll(".project-gallery-item");

    if (projectGalleryRevealObserver) {
        projectGalleryRevealObserver.disconnect();
        projectGalleryRevealObserver = null;
    }

    if (!("IntersectionObserver" in window)) {
        galleryItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    projectGalleryRevealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    projectGalleryRevealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    galleryItems.forEach((item) => {
        item.classList.remove("is-visible");
        projectGalleryRevealObserver.observe(item);
    });
}

function initProjectIndexFilters() {
    if (!projectIndexList || !projectIndexFilters.length) {
        return;
    }

    projectIndexFilters.forEach((filter) => {
        filter.addEventListener("click", () => {
            const filterValue = filter.dataset.projectFilter;
            projectIndexFilters.forEach((item) => item.classList.toggle("is-active", item === filter));

            let firstVisibleIndex = -1;

            projectIndexList.querySelectorAll(".project-gallery-item").forEach((row) => {
                const rowIndex = Number(row.dataset.projectIndex);
                const isVisible = filterValue === "all" || row.dataset.projectCategory.includes(filterValue);
                row.classList.toggle("is-hidden", !isVisible);
                row.classList.toggle("is-visible", isVisible);

                if (isVisible && firstVisibleIndex < 0) {
                    firstVisibleIndex = rowIndex;
                }
            });

            if (firstVisibleIndex >= 0) {
                setProjectIndexPreview(firstVisibleIndex);
            }
        });
    });
}

function positionProjectNodes() {
    if (!projectRouteLinePath || !projectPathwayStage || !projectNodesContainer) {
        return;
    }

    const nodes = [...projectNodesContainer.querySelectorAll(".project-node")];
    const totalLength = projectRouteLinePath.getTotalLength();
    const scaleX = projectPathwayStage.clientWidth / 1200;
    const scaleY = projectPathwayStage.clientHeight / 560;

    projectNodePositions = projectItems.map((project, index) => {
        const length = totalLength * project.progress;
        const point = projectRouteLinePath.getPointAtLength(length);
        const pointAhead = projectRouteLinePath.getPointAtLength(Math.min(totalLength, length + 1));
        const pointBehind = projectRouteLinePath.getPointAtLength(Math.max(0, length - 1));
        const tangentX = pointAhead.x - pointBehind.x;
        const tangentY = pointAhead.y - pointBehind.y;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const normalX = -tangentY / tangentLength;
        const normalY = tangentX / tangentLength;
        const x = point.x * scaleX + normalX * project.offset;
        const y = point.y * scaleY + normalY * project.offset;

        const node = nodes[index];
        if (node) {
            node.style.setProperty("--x", `${x}px`);
            node.style.setProperty("--y", `${y}px`);
        }

        return { x, y };
    });

    if (projectPreviewCard?.classList.contains("is-visible")) {
        updateProjectPreviewPosition();
    }
}

function initProjectPathway() {
    if (!projectPathwayStage || !projectNodesContainer || !projectPreviewCard) {
        return;
    }

    renderProjectNodes();
    projectPathwayStage.addEventListener("mouseleave", hideProjectPreview);

    const activateProjectPathway = () => {
        projectPathwayStage.classList.add("route-active");
    };

    if (!("IntersectionObserver" in window)) {
        activateProjectPathway();
        return;
    }

    const pathwayObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                activateProjectPathway();
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.28,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    pathwayObserver.observe(projectPathwayStage);
}

projectFrames.forEach((frame) => {
    const index = Number(frame.dataset.projectIndex);
    frame.tabIndex = 0;
    frame.setAttribute("role", "button");

    frame.addEventListener("mouseenter", () => {
        window.clearTimeout(projectHideTimer);
        setActiveProject(index);
        frame.classList.add("is-linked");
    });

    frame.addEventListener("mouseleave", () => {
        frame.classList.remove("is-linked");
    });

    frame.addEventListener("click", () => {
        navigateToProject(index);
    });

    frame.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        navigateToProject(index);
    });
});

projectModalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeProjectModal);
});

projectModalPrevButtons.forEach((button) => {
    button.addEventListener("click", () => showAdjacentProject(-1));
});

projectModalNextButtons.forEach((button) => {
    button.addEventListener("click", () => showAdjacentProject(1));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProjectModal();
    }

    if (event.key === "ArrowLeft") {
        showAdjacentProject(-1);
    }

    if (event.key === "ArrowRight") {
        showAdjacentProject(1);
    }
});

const profileParticles = Array.from({ length: 34 }, (_, index) => ({
    seed: index * 0.41,
    size: 1.9 + (index % 4) * 0.55,
    orbit: 34 + (index % 7) * 24,
    drift: 0.0016 + (index % 5) * 0.00032
}));

const pointerState = {
    inside: false,
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
};

function resizeProfileCanvas() {
    if (!profileSection || !profileBackgroundCanvas || !profileBackgroundContext) {
        return;
    }

    const rect = profileSection.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width - 56));
    const height = Math.max(1, Math.floor(rect.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    profileBackgroundCanvas.width = Math.floor(width * pixelRatio);
    profileBackgroundCanvas.height = Math.floor(height * pixelRatio);
    profileBackgroundCanvas.style.width = `${width}px`;
    profileBackgroundCanvas.style.height = `${height}px`;
    profileBackgroundContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    pointerState.x = width * 0.5;
    pointerState.y = height * 0.36;
    pointerState.targetX = pointerState.x;
    pointerState.targetY = pointerState.y;
}

if (profileSection) {
    profileSection.addEventListener("mousemove", (event) => {
        const rect = profileSection.getBoundingClientRect();
        pointerState.inside = true;
        pointerState.targetX = event.clientX - rect.left - 28;
        pointerState.targetY = event.clientY - rect.top;
    });

    profileSection.addEventListener("mouseleave", () => {
        pointerState.inside = false;
    });
}

function drawProfileBackground(time) {
    if (profileBackgroundContext && profileBackgroundCanvas) {
        const width = profileBackgroundCanvas.clientWidth;
        const height = profileBackgroundCanvas.clientHeight;

        profileBackgroundContext.clearRect(0, 0, width, height);

        const fallbackX = width * 0.52;
        const fallbackY = height * 0.38;

        pointerState.targetX = pointerState.inside ? pointerState.targetX : fallbackX;
        pointerState.targetY = pointerState.inside ? pointerState.targetY : fallbackY;
        pointerState.x += (pointerState.targetX - pointerState.x) * 0.07;
        pointerState.y += (pointerState.targetY - pointerState.y) * 0.07;

        profileParticles.forEach((particle, index) => {
            const angle = time * particle.drift + particle.seed * Math.PI * 2;
            const x = pointerState.x + Math.cos(angle) * particle.orbit;
            const y = pointerState.y + Math.sin(angle * 1.12) * (particle.orbit * 0.54);
            const alpha = 0.07 + (index % 4) * 0.022;

            profileBackgroundContext.beginPath();
            profileBackgroundContext.fillStyle = `rgba(198, 144, 82, ${alpha})`;
            profileBackgroundContext.arc(x, y, particle.size, 0, Math.PI * 2);
            profileBackgroundContext.fill();

            profileBackgroundContext.beginPath();
            profileBackgroundContext.strokeStyle = `rgba(188, 132, 70, ${alpha * 0.68})`;
            profileBackgroundContext.lineWidth = 1.05;
            profileBackgroundContext.moveTo(pointerState.x, pointerState.y);
            profileBackgroundContext.lineTo(x, y);
            profileBackgroundContext.stroke();
        });

        profileBackgroundContext.beginPath();
        profileBackgroundContext.strokeStyle = "rgba(188, 132, 70, 0.16)";
        profileBackgroundContext.lineWidth = 1.05;
        profileBackgroundContext.arc(pointerState.x, pointerState.y, 112, 0, Math.PI * 2);
        profileBackgroundContext.stroke();

        profileBackgroundContext.beginPath();
        profileBackgroundContext.strokeStyle = "rgba(255, 232, 204, 0.1)";
        profileBackgroundContext.lineWidth = 0.65;
        profileBackgroundContext.arc(pointerState.x, pointerState.y, 146, 0, Math.PI * 2);
        profileBackgroundContext.stroke();
    }

    requestAnimationFrame(drawProfileBackground);
}

if (summonButton && cornerCharacterLayer) {
    summonButton.addEventListener("click", () => {
        const isVisible = cornerCharacterLayer.classList.toggle("is-visible");
        summonButton.classList.toggle("is-active", isVisible);
        summonButton.setAttribute("aria-expanded", String(isVisible));
        cornerCharacterLayer.setAttribute("aria-hidden", String(!isVisible));

        if (isVisible && cornerCharacterVideo) {
            cornerCharacterVideo.play().catch(() => {});
        }
    });
}

function animateDepth() {
    if (profileSection) {
        const rect = profileSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        const progress = Math.max(-1, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));

        depthItems.forEach((item) => {
            const depth = Number(item.dataset.depth || 0);
            const offset = (progress - 0.35) * 90 * depth;
            item.style.setProperty("--depth-offset", `${offset}px`);
        });
    }

    requestAnimationFrame(animateDepth);
}

window.addEventListener("resize", () => {
    initSpotlight();
    resizeProfileCanvas();
    positionProjectNodes();
});

window.addEventListener("load", () => {
    initSpotlight();
    resizeProfileCanvas();
    initProjectPathway();
    renderProjectIndexList();
    initProjectIndexFilters();
});

animateSpotlight();
animateDepth();
drawProfileBackground(0);
