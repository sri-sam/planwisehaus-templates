// SheetFrame — gold strip + title lockup + sidebar + canvas slot.
// All children render inside the canvas to the right of the sidebar.

const SheetFrame = ({ tab, tabs, onNavigate, children }) => {
  return (
    <div className="workbook" data-screen-label={`PWH · ${tab}`}>
      <div className="accent-strip" />
      <div className="title-block">
        <div className="title-block__title">
          PLANWISE HAUS &nbsp;·&nbsp; <span className="tab">{tab.toUpperCase()}</span>
        </div>
        <div className="title-block__subtitle">EXCEL TEMPLATES FOR LIFE &amp; HOME</div>
      </div>
      <div className="sheet-body">
        <SidebarNav active={tab} onNavigate={onNavigate} />
        <main className="canvas">{children}</main>
      </div>
      <TabStrip active={tab} tabs={tabs} onNavigate={onNavigate} />
    </div>
  );
};

const TabStrip = ({ active, tabs, onNavigate }) => (
  <div className="tab-strip">
    {tabs.map((t) => (
      <div
        key={t}
        className={'tab-strip__tab' + (t === active ? ' is-active' : '')}
        onClick={() => onNavigate && onNavigate(t)}
      >
        {t}
      </div>
    ))}
  </div>
);

window.SheetFrame = SheetFrame;
window.TabStrip = TabStrip;
