/** The three pieces of the engine, and the trace that ties them together. */
export const ENGINE_PARTS = [
  { id: 'api', titleKey: 'landing.story.engine1Title', bodyKey: 'landing.story.engine1Body' },
  { id: 'rooms', titleKey: 'landing.story.engine2Title', bodyKey: 'landing.story.engine2Body' },
  { id: 'truth', titleKey: 'landing.story.engine3Title', bodyKey: 'landing.story.engine3Body' },
] as const

/**
 * One order, end to end.
 *
 * Rendered as a two-column grid rather than preformatted text: the project has a
 * single font token and no monospace, and a grid wraps predictably instead of
 * forcing a horizontal scroll on a 320px screen.
 */
export const ENGINE_TRACE = [
  { actorKey: 'landing.story.engineTrace1Actor', eventKey: 'landing.story.engineTrace1Event' },
  { actorKey: 'landing.story.engineTrace2Actor', eventKey: 'landing.story.engineTrace2Event' },
  { actorKey: 'landing.story.engineTrace3Actor', eventKey: 'landing.story.engineTrace3Event' },
  { actorKey: 'landing.story.engineTrace4Actor', eventKey: 'landing.story.engineTrace4Event' },
  { actorKey: 'landing.story.engineTrace5Actor', eventKey: 'landing.story.engineTrace5Event' },
  { actorKey: 'landing.story.engineTrace6Actor', eventKey: 'landing.story.engineTrace6Event' },
] as const
