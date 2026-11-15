import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
const source = await readFile(new URL('../worker/app.js', import.meta.url), 'utf8');
const nodes = { '#modal-root': { innerHTML: '' }, '#toast-region': { append() {} } };
const store = new Map();
const context = {
  window: { matchMedia: () => ({ matches: true }), addEventListener() {} },
  document: { addEventListener() {}, querySelector: (selector) => nodes[selector] || null, createElement: () => ({ remove() {} }) },
  location: { pathname: '/plans', search: '' }, URLSearchParams, Intl,
  localStorage: { getItem: (key) => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) },
  requestAnimationFrame() {}, setTimeout() {}
};
runInNewContext(source.replace(/\ninit\(\);\s*$/, '') + '\nglobalThis.qa = { state, SUBSCRIPTION_PLANS, subscriptionQuote, normalizeSubscription, renderSubscriptions, renderLanding, openSubscriptionConfirmation, confirmSubscription, openSubscriptionCancellation, cancelSubscription, closeModal, setBillingCycle, canHotelRoute }; render = () => {};', context);
const q = context.qa;
q.state.me = { user: { id: 'qa' }, contexts: [{ id: 'business', permissions: ['ALL'] }] };
q.state.context = 'business';
assert.equal(q.canHotelRoute('/hotel/subscription'), true);
q.state.me.contexts[0].permissions = ['VIEW_ROOMS'];
assert.equal(q.canHotelRoute('/hotel/subscription'), false);
for (const plan of q.SUBSCRIPTION_PLANS) {
  assert.equal(q.subscriptionQuote(plan, 'monthly').total, plan.monthly);
  const quote = q.subscriptionQuote(plan, 'annual');
  assert.equal(quote.total, plan.monthly * 12 * .8);
  assert.equal(quote.saving, plan.monthly * 12 - quote.total);
}
assert.match(q.renderLanding(), /id="plans"/);
assert.match(q.renderSubscriptions(), /без списаний/);
assert.match(q.renderSubscriptions(), /data-subscription-plan="enterprise"/);
q.openSubscriptionConfirmation('pro');
assert.equal(q.state.subscription, null);
assert.equal(store.size, 0);
assert.match(nodes['#modal-root'].innerHTML, /0 ₸/);
q.closeModal(); q.confirmSubscription();
assert.equal(q.state.subscription, null);
q.setBillingCycle('annual'); q.openSubscriptionConfirmation('pro');
// Confirmation must retain the quoted period even if the surrounding state changes.
q.state.billingCycle = 'monthly'; q.confirmSubscription();
assert.equal(q.state.subscription.plan, 'pro');
assert.equal(q.state.subscription.cycle, 'annual');
const saved = JSON.parse(store.get('hotelx:qa:demo-subscription:aspan-city'));
assert.equal(q.normalizeSubscription(saved).cycle, 'annual');
q.state.billingCycle = 'annual';
assert.match(q.renderSubscriptions(), /data-subscription-plan="pro" disabled/);
q.openSubscriptionConfirmation('enterprise'); q.closeModal();
assert.equal(q.state.subscription.plan, 'pro');
q.openSubscriptionConfirmation('starter'); q.confirmSubscription();
assert.equal(q.state.subscription.plan, 'starter');
q.openSubscriptionCancellation();
assert.equal(q.state.subscription.plan, 'starter');
q.closeModal();
assert.equal(q.state.subscription.plan, 'starter');
q.openSubscriptionCancellation(); q.cancelSubscription();
assert.equal(q.state.subscription, null);
assert.equal(JSON.parse(store.get('hotelx:qa:demo-subscription:aspan-city')), null);
for (const bad of [null, {}, 'pro', { plan: '<script>', cycle: 'annual' }, { plan: 'pro', cycle: 'daily' }]) assert.equal(q.normalizeSubscription(bad), null);
q.openSubscriptionConfirmation('invalid');
assert.equal(q.state.pendingSubscription, null);
q.setBillingCycle('invalid'); assert.equal(q.state.billingCycle, 'annual');
context.localStorage.setItem = () => { throw new Error('unavailable'); };
q.openSubscriptionConfirmation('pro'); q.confirmSubscription();
assert.equal(q.state.subscription, null);
assert.equal(q.state.pendingSubscription.plan, 'pro');
console.log('PASS SaaS quotes, annual totals, permission navigation, confirmation, switching, persistence, cancellation and storage failures');
