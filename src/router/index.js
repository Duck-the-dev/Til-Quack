import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Privacy from '../views/PrivacyView.vue'
import NotFound from '../views/404.vue'
import ContactViewVue from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,

      meta: {
        title: 'Bardi.tech | Your first step Towards starting your Own project',

        // opengraph meta tags

        metaTags: [
          {
            charset: 'UTF-8',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'theme-color',
            content: '#ffffff',
          },
          {
            name: 'author',
            content: '#',
          },
          {
            name: 'keywords',
            content:
              '# keywords',
          },
          {
            name: 'description',
            content:
              'Providing traditional services with modern technology, we are here to help you bring your ideas to life with efficient cost management. Our team of experts is dedicated to delivering high-quality services that meet your needs.',
          },
          {
            property: 'og:description',
            content:
              'Providing traditional services with modern technology, we are here to help you bring your ideas to life with efficient cost management. Our team of experts is dedicated to delivering high-quality services that meet your needs.',
          },

          // twitter meta tags
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:creator',

            content: '@twitter',
          },
          {
            name: 'twitter:description',

            content:
              'Providing traditional services with modern technology, we are here to help you bring your ideas to life with efficient cost management. Our team of experts is dedicated to delivering high-quality services that meet your needs.',
          },
          {
            name: 'twitter:url',

            content: '# twitter url',
          },
          {
            name: 'twitter:title',

            content: 'Your first step Towards starting your Own project',
          },
          {
            name: 'twitter:image',

            content:
              'https://pbs.twimg.com/media/FsGMQ-NXgAE344G?format=jpg&name=900x900',
          },

          // facebook meta tags
          {
            property: 'og:url',
            content: '# ',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:title',
            content: '# ',
          },
          {
            property: 'og:description',
            content:
              'Providing traditional services with modern technology, we are here to help you bring your ideas to life with efficient cost management. Our team of experts is dedicated to delivering high-quality services that meet your needs.',
          },
          {
            property: 'og:image',
            content: '../assets/images/*.png',
          },

          // pinterest meta tags
          {
            name: 'p:domain_verify',
            content: 'p:domain_verify=',
          },

          // yandex meta tags
          {
            name: 'yandex-verification',
            content: 'yandex-verification=',
          },

          // bing meta tags
          {
            name: 'msvalidate.01',
            content: 'msvalidate.01=',
          },

          // alexa meta tags
          {
            name: 'alexaVerifyID',

            content: 'alexaVerifyID=',
          },

          // google meta tags
          {
            name: 'google-site-verification',
            content:
              'google-site-verification=',
          },
          // norton meta tags
          {
            name: 'norton-safeweb-site-verification',
            content: 'norton-safeweb-site-verification=',
          },
        ],
      },
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404',

        metaTags: [
          {
            charset: 'UTF-8',
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
          {
            name: 'theme-color',
            content: '#ffffff',
          },
          {
            name: 'author',
            content: '#',
          },
          {
            name: 'keywords',
            content:
              '# keywords',
          },
          {
            name: 'description',
            content:
              'Providing traditional services with modern technology, we are here to help you bring your ideas to life with efficient cost management. Our team of experts is dedicated to delivering high-quality services that meet your needs.',
          },
          {
            property: 'og:description',
            content:
              'Providing traditional services with modern technology, we are here to help you bring your ideas to life with efficient cost management. Our team of experts is dedicated to delivering high-quality services that meet your needs.',
          },
        ],
      },
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/notfound',
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  // set meta tags
  const metaTags = to.meta.metaTags
  if (metaTags) {
    //@ts-ignore
    metaTags.forEach((tag) => {
      const element = document.querySelector(`meta[name="${tag.name}"]`)
      if (element) {
        element.setAttribute('content', tag.content)
      } else {
        const newElement = document.createElement('meta')
        newElement.setAttribute('name', tag.name)
        newElement.setAttribute('content', tag.content)
        document.head.appendChild(newElement)
      }
    })
  }

  next()
})

export default router

export { router }
