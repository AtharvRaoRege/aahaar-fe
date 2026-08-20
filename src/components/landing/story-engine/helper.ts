/** The four things that happen, in the order the restaurant sees them. */
export const ENGINE_PARTS = [
  { id: 'scan', titleKey: 'landing.story.engine1Title', bodyKey: 'landing.story.engine1Body' },
  { id: 'beep', titleKey: 'landing.story.engine2Title', bodyKey: 'landing.story.engine2Body' },
  { id: 'watch', titleKey: 'landing.story.engine3Title', bodyKey: 'landing.story.engine3Body' },
  {
    id: 'photo',
    titleKey: 'landing.story.engine4Title',
    bodyKey: 'landing.story.engine4Body',
    badgeKey: 'landing.story.engine4Badge',
  },
] as const

/** One order, start to finish. Two columns so it never scrolls sideways. */
export const ENGINE_TRACE = [
  { actorKey: 'landing.story.engineTrace1Actor', eventKey: 'landing.story.engineTrace1Event' },
  { actorKey: 'landing.story.engineTrace2Actor', eventKey: 'landing.story.engineTrace2Event' },
  { actorKey: 'landing.story.engineTrace3Actor', eventKey: 'landing.story.engineTrace3Event' },
  { actorKey: 'landing.story.engineTrace4Actor', eventKey: 'landing.story.engineTrace4Event' },
  { actorKey: 'landing.story.engineTrace5Actor', eventKey: 'landing.story.engineTrace5Event' },
  { actorKey: 'landing.story.engineTrace6Actor', eventKey: 'landing.story.engineTrace6Event' },
] as const
