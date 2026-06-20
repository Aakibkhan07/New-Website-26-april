let billing = 'monthly';

const prices = {
  monthly: { p1:999, p2:2499, p3:7999 },
  annual:  { p1:699, p2:1749, p3:5599 }
};

function setBilling(type) {
  billing = type;
  document.getElementById('monthlyBtn').classList.toggle('active', type==='monthly');
  document.getElementById('annualBtn').classList.toggle('active', type==='annual');
  const p = prices[type];
  document.getElementById('p1').textContent = p.p1.toLocaleString('en-IN');
  document.getElementById('p2').textContent = p.p2.toLocaleString('en-IN');
  document.getElementById('p3').textContent = p.p3.toLocaleString('en-IN');
  const annualTexts = type === 'annual'
    ? [`Billed \u20B9${(p.p1*12).toLocaleString('en-IN')}/year`, `Billed \u20B9${(p.p2*12).toLocaleString('en-IN')}/year`, `Billed \u20B9${(p.p3*12).toLocaleString('en-IN')}/year`]
    : ['', '', ''];
  ['a1','a2','a3'].forEach((id,i) => { document.getElementById(id).textContent = annualTexts[i]; });
}

(function loadRazorpayScript() {
  if (document.getElementById('rzp-script')) return;
  const s = document.createElement('script');
  s.id = 'rzp-script';
  s.src = 'https://checkout.razorpay.com/v1/checkout.js';
  s.async = true;
  document.head.appendChild(s);
})();

const planAmounts = {
  Starter:       { monthly: 99900,  annual: 83880  },
  Pro:           { monthly: 249900, annual: 209880 },
  Institutional: { monthly: 799900, annual: 671880 },
};

async function startTrial(plan) {
  var amount = planAmounts[plan] && planAmounts[plan][billing];
  if (!amount) { showToast('Invalid plan selected.', 'error'); return; }

  var allBtns = document.querySelectorAll('.plan-btn');
  var btn = null;
  for (var i = 0; i < allBtns.length; i++) {
    var oc = allBtns[i].getAttribute('onclick') || '';
    if (oc.indexOf(plan) !== -1) { btn = allBtns[i]; break; }
  }
  var originalText = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Loading...'; }

  try {
    var res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amount,
        currency: 'INR',
        receipt: 'tm_' + plan.toLowerCase() + '_' + Date.now(),
        notes: { plan: plan, billing: billing }
      })
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create order');

    var options = {
      key: 'rzp_test_Sl16kdPPjAeepn',
      amount: data.amount,
      currency: data.currency,
      name: 'Trade Metrix Technologies',
      description: plan + ' Plan - ' + (billing === 'monthly' ? 'Monthly' : 'Annual') + ' Subscription',
      order_id: data.order_id,
      theme: { color: '#00d4aa' },
      handler: async function(response) {
        try {
          var vRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_signature:  response.razorpay_signature
            })
          });
          var vData = await vRes.json();
          if (!vRes.ok) throw new Error(vData.error || 'Verification failed');

          showToast('Payment successful! Welcome to ' + plan + ' plan!', 'success');
          setTimeout(function() {
            window.location.href = 'https://wa.me/917415660385?text=' +
              encodeURIComponent('Hi, I subscribed to ' + plan + ' (' + billing + '). Payment ID: ' + response.razorpay_payment_id + '. Please activate my account.');
          }, 2500);
        } catch(err) {
          showToast('Payment received but verification failed. Contact: info@trademetrix.tech', 'error');
        }
      },
      modal: {
        ondismiss: function() {
          if (btn) { btn.disabled = false; btn.textContent = originalText; }
          showToast('Payment cancelled.', 'info');
        }
      }
    };

    var rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function(resp) {
      if (btn) { btn.disabled = false; btn.textContent = originalText; }
      var msg = (resp && resp.error && resp.error.description) ? resp.error.description : 'Payment failed. Please try again.';
      showToast(msg, 'error');
    });
    rzp.open();

  } catch(err) {
    if (btn) { btn.disabled = false; btn.textContent = originalText; }
    showToast(err.message || 'Something went wrong. Please try again.', 'error');
  }
}

function showToast(msg, type) {
  let t = document.getElementById('rzp-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'rzp-toast';
    t.style.cssText = 'position:fixed;bottom:28px;right:28px;z-index:9999;max-width:380px;' +
      'padding:14px 20px;border-radius:12px;font-size:13.5px;font-weight:600;line-height:1.5;' +
      'backdrop-filter:blur(16px);border:1px solid;box-shadow:0 8px 32px rgba(0,0,0,.4);' +
      'transition:all .35s cubic-bezier(.34,1.56,.64,1);transform:translateY(80px);opacity:0;';
    document.body.appendChild(t);
  }
  const styles = {
    success: { bg:'rgba(0,212,170,.12)', border:'rgba(0,212,170,.4)', color:'#00f0c0' },
    error:   { bg:'rgba(255,77,106,.12)', border:'rgba(255,77,106,.4)', color:'#ff8fa0' },
    info:    { bg:'rgba(79,143,255,.1)',  border:'rgba(79,143,255,.3)', color:'#a0bcff' },
  };
  const s = styles[type] || styles.info;
  t.style.background = s.bg; t.style.borderColor = s.border; t.style.color = s.color;
  t.textContent = msg;
  t.style.transform = 'translateY(0)'; t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform='translateY(80px)'; t.style.opacity='0'; }, type==='success' ? 5000 : 4000);
}

const FAQS = [
  { q: 'Free trial mein credit card chahiye?', a: 'Bilkul nahi. 1-day free trial ke liye koi credit card ya payment information nahi chahiye. Simply sign up karo aur instantly access milega.' },
  { q: 'Kya main plan change kar sakta hoon?', a: 'Haan, kabhi bhi. Upgrade ya downgrade next billing cycle se apply hota hai. Institutional se Pro pe aane pe prorated refund milega.' },
  { q: 'Ye algo trading hai — SEBI registered hai?', a: 'TradeMetrix ek pure software company hai. Hum trading tips ya advisory services nahi dete. Ye ek technical analysis aur charting tool hai. SEBI registration required nahi hai software tools ke liye.' },
  { q: 'Kaunse brokers supported hain?', a: 'Currently Zerodha, Dhan, Fyers, Upstox, 5Paisa, Kotak Neo, Angel One, aur IIFL supported hain. Aur brokers constantly add ho rahe hain.' },
  { q: 'Signals kitni accuracy se aate hain?', a: 'TradeMetrix ek software tool hai jo technical analysis karta hai — ye guaranteed profits nahi deta. Historical backtesting mein win rate 65-70% raha hai lekin past performance future results ki guarantee nahi hai. Always apna risk manage karo.' },
  { q: 'Annual plan ka payment ek baar hota hai?', a: 'Haan. Annual plan mein poora year ka payment upfront hota hai aur 30% discount milta hai monthly ke comparison mein. 7-day money back guarantee annual pe bhi applicable hai.' },
];

const faqList = document.getElementById('faqList');
FAQS.forEach((f, i) => {
  const div = document.createElement('div');
  div.className = 'faq-item';
  div.innerHTML = `<div class="faq-q" onclick="toggleFaq(${i})"><span>${f.q}</span><span class="faq-icon">+</span></div>
    <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>`;
  faqList.appendChild(div);
});

function toggleFaq(i) {
  const items = document.querySelectorAll('.faq-item');
  items[i].classList.toggle('open');
}
