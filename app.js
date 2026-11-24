/*
  أضف صور أعمالك هنا فقط.
  كل عنصر يحتوي على:
  image: رابط الصورة
  title: اسم العمل
  description: وصف قصير

  يمكنك إضافة أو حذف عناصر من القائمة حسب عدد الصور.
*/

const projects = [
  {
    image: "images/Screenshot 2026-11-24 165924.png",
    title: "Hero Section",
    description: "Hero section"
  },
  {
    image: "images/Screenshot 2026-11-24 165957.png",
    title: "Product section",
    description: "Good user interface"
  },
  {
    image: "images/Screenshot 2026-11-24 170024.png",
    title: "Another section",
    description: "Section for Ordering"
  },
  {
    image: "images/Screenshot 2026-11-24 170104.png",
    title: "Footer section",
    description: "footer for the website"
  }
];

const workGrid = document.getElementById("workGrid");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerCaption = document.getElementById("viewerCaption");
let currentImageIndex = 0;

// إنشاء بطاقات الأعمال من القائمة
projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "work-card";

  card.innerHTML = `
    <button class="work-image-button" type="button" aria-label="عرض ${project.title}">
      <img class="work-image" src="${project.image}" alt="${project.title}" loading="lazy">
    </button>
    <div class="work-info">
      <h2 class="work-title">${project.title}</h2>
      <p class="work-description">${project.description}</p>
    </div>
  `;

  card.querySelector(".work-image-button").addEventListener("click", () => {
    openViewer(index);
  });

  workGrid.appendChild(card);
});

function openViewer(index) {
  currentImageIndex = index;
  updateViewer();
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateViewer() {
  const project = projects[currentImageIndex];
  viewerImage.src = project.image;
  viewerImage.alt = project.title;
  viewerCaption.textContent = project.title;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % projects.length;
  updateViewer();
}

function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + projects.length) % projects.length;
  updateViewer();
}

document.getElementById("viewerClose").addEventListener("click", closeViewer);
document.getElementById("viewerNext").addEventListener("click", showNextImage);
document.getElementById("viewerPrev").addEventListener("click", showPreviousImage);

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) closeViewer();
});

document.addEventListener("keydown", (event) => {
  if (!viewer.classList.contains("open")) return;
  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowRight") showPreviousImage();
  if (event.key === "ArrowLeft") showNextImage();
});
