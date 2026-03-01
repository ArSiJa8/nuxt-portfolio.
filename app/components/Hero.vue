<template>
<div class="center-screen">
    <!-- LCP Optimierung: Bild direkt im HTML laden statt via CSS Background -->
    <img
        src="/wallpaper.jpg"
        alt="Background Wallpaper"
        class="hero-image"
        fetchpriority="high"
        loading="eager"
        decoding="async"
    />
    <div class="card">
        <h1>ArSiJa</h1>
        <p>👋 Hi! - I make Websites - Vue/Nuxt</p>
    </div>
</div>
</template>

<style scoped>
.hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}
</style>