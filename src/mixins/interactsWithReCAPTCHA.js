import config from '../config';

const script = document.createElement('script');
script.src = `https://www.google.com/recaptcha/api.js?render=${config.reCAPTCHA.siteKey}`;
document.head.appendChild(script);

export default {
  methods: {
    recaptchaReady() {
      return new Promise((resolve) => window.grecaptcha.ready(resolve));
    },

    async executeRecaptcha() {
      await this.recaptchaReady();
      return window.grecaptcha.execute(config.reCAPTCHA.siteKey, {
        action: 'submit',
      });
    },
  },

  beforeDestroy() {
    const badge = document.querySelector('.grecaptcha-badge');
    badge && badge.parentNode.removeChild(badge);
  },
};
