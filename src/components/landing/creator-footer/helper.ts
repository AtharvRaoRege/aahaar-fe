export const CREATOR_PHOTO = '/me/myself.webp'

export const CREATOR_LINKS = {
  instagram: 'https://www.instagram.com/atharv_lifts/',
  linkedin: 'https://www.linkedin.com/in/atharv-rao-rege/',
  phoneDisplay: '79743 29305',
  phoneHref: 'tel:+917974329305',
  emailDisplay: 'atharvrege722@gmail.com',
  emailHref: 'mailto:atharvrege722@gmail.com',
} as const

export function useCreatorFooter() {
  return {
    year: new Date().getFullYear(),
    links: CREATOR_LINKS,
    photo: CREATOR_PHOTO,
  }
}
