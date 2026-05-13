// Page chrome — top nav + shop banner band + bottom footer.

const StorefrontHeader = ({ cartCount = 1 }) => (
  <>
    <header className="shopnav">
      <div className="shopnav__brand">
        <img src="../../assets/logo.png" alt="PlanWiseHaus" />
        <div className="shopnav__name">PlanWise<span className="ac">Haus</span></div>
      </div>
      <div className="shopnav__search">
        <span>⌕</span>
        <span>Search PlanWiseHaus templates…</span>
      </div>
      <div className="shopnav__actions">
        <div className="shopnav__icon">♡ <span>Favourites</span></div>
        <div className="shopnav__icon">🛒 <strong>Cart ({cartCount})</strong></div>
        <button className="shopnav__cta">Sign in</button>
      </div>
    </header>
    <div className="shopbanner">
      <img className="shopbanner__avatar" src="../../assets/logo.png" alt="" />
      <div>
        <div className="shopbanner__title">PlanWiseHaus</div>
        <div className="shopbanner__sub">Excel Templates for Life &amp; Home · Etsy Shop</div>
      </div>
      <div className="shopbanner__meta">
        <div><b>4.9 ★</b> · 1,247 reviews</div>
        <div><b>28</b> templates</div>
        <div><b>Star Seller</b></div>
      </div>
    </div>
  </>
);

const StorefrontFooter = () => (
  <footer className="foot">
    <div>
      <h4>PlanWiseHaus</h4>
      <p>Premium Excel templates that help you budget smarter, plan better, and live with more intention — all from the comfort of home.</p>
      <p className="foot__tag">Excel Templates for Life &amp; Home</p>
    </div>
    <div>
      <h4>Templates</h4>
      <ul>
        <li>Annual Budget</li>
        <li>Wedding Planner</li>
        <li>Fitness Tracker</li>
        <li>Book Tracker</li>
        <li>Project Manager</li>
      </ul>
    </div>
    <div>
      <h4>Help</h4>
      <ul>
        <li>How to download</li>
        <li>Excel compatibility</li>
        <li>Refund policy</li>
        <li>Contact</li>
      </ul>
    </div>
    <div>
      <h4>Follow</h4>
      <ul>
        <li>Instagram · @planwisehaus</li>
        <li>TikTok · @planwisehaus</li>
        <li>Pinterest · planwisehaus</li>
      </ul>
    </div>
  </footer>
);

window.StorefrontHeader = StorefrontHeader;
window.StorefrontFooter = StorefrontFooter;
