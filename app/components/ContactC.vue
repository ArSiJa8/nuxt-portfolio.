<template>
  <section id="contact" class="reveal section-container" ref="contactSection">
    <div class="container-white mouse-tracking" @mousemove="handleMouseMove">

      <div class="contact-header">
        <span class="badge">Reach Out</span>
        <h1>Contact Me</h1>
        <p class="contact-p">
          Have a question or want to work together?
          Drop me a message or find me on my social networks.
        </p>
      </div>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="info-item">
            <h3 class="info-label">Direct Mail</h3>
            <a href="mailto:silvan@arsija.net" class="info-link">silvan@arsija.net</a>
          </div>

          <div class="info-item">
            <h3 class="info-label">Social Connections</h3>
            <div class="footer-socials">
              <a v-for="link in socialLinks"
                 :key="link.name"
                 :href="link.url"
                 target="_blank"
                 rel="noopener"
                 :class="['social-link-wrapper', link.class]"
                 :aria-label="link.name">
                <Icon :name="link.icon" class="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                @invalid="e => e.target.setCustomValidity('Please enter your full name.')"
                @input="e => e.target.setCustomValidity('')"
            />
          </div>
          <div class="form-group">
            <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                @invalid="e => e.target.setCustomValidity('Please enter a valid email address.')"
                @input="e => e.target.setCustomValidity('')"
            />
          </div>
          <div class="form-group">
            <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows="5"
                required
                @invalid="e => e.target.setCustomValidity('Please enter your message here.')"
                @input="e => e.target.setCustomValidity('')"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const contactSection = ref(null);
const isSubmitting = ref(false);

// DEINE FORMSPREE ID HIER EINTRAGEN
const FORMSPREE_ID = "DEINE_ID_HIER";

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ArSiJa8', icon: 'uil:github', class: 'github' },
  { name: 'YouTube', url: 'https://youtube.com/@aArSiJa', icon: 'uil:youtube', class: 'youtube' },
  { name: 'Discord', url: 'https://discord.gg/Kg7A42bPKz', icon: 'ic:baseline-discord', class: 'discord' },
  { name: 'Email', url: 'mailto:silvan@arsija.net', icon: 'uil:envelope', class: 'email' }
];

const handleMouseMove = (e) => {
  const { currentTarget: target, clientX, clientY } = e;
  const rect = target.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

const handleSubmit = async (e) => {
  isSubmitting.value = true;
  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(`https://formspree.io/f/xkovpvbn`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('Success! Your message has been sent.');
      form.reset();
    } else {
      const data = await response.json();
      alert(data.errors ? data.errors[0].message : 'Oops! There was a problem.');
    }
  } catch (error) {
    alert('Network error. Please try again later.');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view')
    })
  }, { threshold: 0.1 });
  if (contactSection.value) observer.observe(contactSection.value);
});
</script>

<style scoped>
/* Deine bestehenden Styles bleiben identisch */
.section-container { padding: 40px 20px; }
.contact-header { text-align: center; margin-bottom: 50px; }
.contact-p { max-width: 600px; margin: 20px auto 0; opacity: 0.8; color: #fff !important; }
.contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; width: 100%; max-width: 1000px; margin: 0 auto; }
.container-white::before { background: radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.05), transparent 70% ) !important; }
.contact-info { display: flex; flex-direction: column; gap: 40px; }
.info-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: var(--accent) !important; margin-bottom: 12px; text-align: left; }
.info-link { font-size: 1.2rem; font-weight: 600; color: #fff; transition: var(--transition-smooth); text-decoration: none; }
.info-link:hover { color: var(--accent); }
.footer-socials { display: flex; gap: 15px; justify-content: flex-start; }
.social-link-wrapper { color: rgba(255, 255, 255, 0.3); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; align-items: center; }
.social-icon { font-size: 2.2rem; }
.github:hover  { color: #ffffff !important; filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.5)); transform: translateY(-5px); }
.youtube:hover { color: #ff0000 !important; filter: drop-shadow(0 0 12px rgba(255, 0, 0, 0.5)); transform: translateY(-5px); }
.discord:hover { color: #5865F2 !important; filter: drop-shadow(0 0 12px rgba(88, 101, 242, 0.5)); transform: translateY(-5px); }
.email:hover   { color: #facc15 !important; filter: drop-shadow(0 0 12px rgba(250, 204, 21, 0.5)); transform: translateY(-5px); }
.contact-form { display: flex; flex-direction: column; gap: 20px; }
.w-full { width: 100%; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
::placeholder { color: rgba(255, 255, 255, 0.3); }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .contact-info, .contact-header { text-align: center; align-items: center; }
  .info-label { text-align: center; }
  .footer-socials { justify-content: center; }
}
</style>