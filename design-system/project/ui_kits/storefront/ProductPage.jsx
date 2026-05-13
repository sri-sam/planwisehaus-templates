// Product detail page — gallery + info + highlights + reviews + related.
const { useState } = React;

const ProductGallery = () => {
  const [active, setActive] = useState(0);
  // Use the actual banner image + brand thumbnails
  return (
    <div className="gallery">
      <div className="gallery__hero">
        {active === 0 ? <img src="../../assets/etsy-banner.png" alt="Annual Budget template hero" /> :
         active === 1 ? <PlaceholderSVG kind="chart" /> :
         <PlaceholderSVG kind={['fitness','wedding','book','project'][active-2]} />}
      </div>
      <div className="gallery__strip">
        {[0,1,2,3,4].map(i => (
          <div key={i}
               className={'gallery__thumb gallery__thumb--svg' + (active === i ? ' is-active' : '')}
               onClick={() => setActive(i)}>
            {i === 0
              ? <img src="../../assets/logo.png" alt="" />
              : <PlaceholderSVG kind={['chart','fitness','wedding','book'][i-1]} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductInfo = ({ onAddToCart }) => {
  const [qty, setQty] = useState(1);
  return (
    <div className="info">
      <div className="info__eyebrow">★ Best seller · Instant Download</div>
      <h1 className="info__title">Annual Budget Spreadsheet 2025</h1>
      <div className="info__rating">
        <span className="info__stars">★★★★★</span>
        <span><b>4.9</b> · 1,247 reviews</span>
      </div>
      <div className="info__price">
        $24<span className="info__price-strike">$36</span>
        <span className="info__price-tag">33% OFF</span>
      </div>
      <div className="info__buyrow">
        <div className="qty">
          <button onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
          <span className="qty__num">{qty}</span>
          <button onClick={() => setQty(q => q+1)}>+</button>
        </div>
        <button className="btn btn--primary" onClick={onAddToCart}>Add to cart</button>
      </div>
      <button className="btn btn--gold">★ Add to Favourites</button>
      <div className="delivery">
        <div><b>Instant download</b> — files delivered as soon as payment clears.</div>
        <div>One Excel (.xlsx) file · 29 tabs · works in Excel 2016+ and Google Sheets</div>
        <div style={{ color: 'var(--pwh-secondary)', fontWeight: 700 }}>Returns &amp; exchanges — not accepted (digital product)</div>
      </div>
    </div>
  );
};

const Highlights = () => (
  <div className="highlights">
    <div>
      <h2 className="highlights__title">What's inside</h2>
      <ul className="highlights__list">
        <li>29 fully formatted tabs — Dashboard, 12 monthly views, Annual Totals, Setup, Calendar, Sinking Funds, Debt Calculator, Investment Forecast, and more.</li>
        <li>6 KPI cards that update automatically — Net Savings, Savings Rate, Annual Income, Expenses, Total Debt, Net Worth.</li>
        <li>4 charts on the Dashboard with native Excel formatting — Income vs Expenses, Savings Trend, Expense Distribution, Cumulative Savings.</li>
        <li>Yellow input cells make it impossible to overwrite the formulas by accident.</li>
        <li>50/30/20 rule calculator, sinking funds tracker, and a no-spend challenge calendar — included.</li>
        <li>Currency dropdown ($, €, £, ¥, ₹, CAD, AUD) — pick once, it propagates everywhere.</li>
      </ul>
    </div>
    <div className="specs">
      <div className="specs__row"><span>File type</span><span>.xlsx</span></div>
      <div className="specs__row"><span>Tabs</span><span>29</span></div>
      <div className="specs__row"><span>Compatibility</span><span>Excel 2016+, Sheets</span></div>
      <div className="specs__row"><span>Charts</span><span>4 native</span></div>
      <div className="specs__row"><span>Currency</span><span>7 supported</span></div>
      <div className="specs__row"><span>Year</span><span>2025 (rolls over)</span></div>
      <div className="specs__row"><span>Updates</span><span>Free for life</span></div>
    </div>
  </div>
);

const Reviews = () => {
  const data = [
    { who: 'Hannah M.', date: 'Apr 02, 2025', stars: '★★★★★', body: 'Honestly worth every penny. I\'ve tried four budget templates this year and this is the one that finally stuck. The yellow input cells are such a small thing but they make everything feel safe.' },
    { who: 'Jordan T.', date: 'Mar 18, 2025', stars: '★★★★★', body: 'The dashboard alone is gorgeous. My partner and I sit down with a glass of wine every Sunday and update it together. Best $24 I\'ve spent on adulting.' },
    { who: 'Priya S.',  date: 'Feb 27, 2025', stars: '★★★★☆', body: 'Took me about 20 minutes to set up. Everything just works once you fill in Setup. Wish there was a dark mode but otherwise perfect.' },
  ];
  return (
    <section className="reviews">
      <h2 className="reviews__head">Recent reviews · 1,247 total</h2>
      <div className="reviews__grid">
        {data.map(r => (
          <article key={r.who} className="review">
            <div className="review__head">
              <div className="review__avatar">{r.who[0]}</div>
              <div>
                <div className="review__name">{r.who}</div>
                <div className="review__date">{r.date}</div>
              </div>
              <div className="review__stars" style={{ marginLeft: 'auto' }}>{r.stars}</div>
            </div>
            <p className="review__body">"{r.body}"</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const RelatedProducts = () => {
  const items = [
    { title: 'Wedding Planner 2025', price: '$28', stars: '4.9 ★ (412)', kind: 'wedding' },
    { title: 'Fitness Tracker 2025', price: '$18', stars: '4.8 ★ (321)', kind: 'fitness' },
    { title: 'Book Tracker 2025',   price: '$14', stars: '5.0 ★ (208)', kind: 'book' },
    { title: 'Project Manager 2025',price: '$22', stars: '4.9 ★ (164)', kind: 'project' },
  ];
  return (
    <section className="related">
      <h2 className="related__head">More from PlanWiseHaus</h2>
      <div className="related__grid">
        {items.map(it => (
          <div key={it.title} className="related__card">
            <div className="related__img"><PlaceholderSVG kind={it.kind} /></div>
            <div className="related__body">
              <div className="related__title">{it.title}</div>
              <div className="related__price">{it.price}</div>
              <div className="related__rating">{it.stars}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.ProductGallery = ProductGallery;
window.ProductInfo = ProductInfo;
window.Highlights = Highlights;
window.Reviews = Reviews;
window.RelatedProducts = RelatedProducts;
