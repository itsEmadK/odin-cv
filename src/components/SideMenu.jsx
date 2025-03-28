import '../styles/side-menu.css';

export default function SideMenu({
  preferredHeaderPosition = 'top',
  onClearClicked,
  onLoadSampleClicked,
  onPreferredHeaderPosChanged,
}) {
  return (
    <div className="side-menu">
      <div className="buttons-container">
        <button onClick={onClearClicked} className="clear">
          Clear
        </button>
        <button onClick={onLoadSampleClicked} className="load">
          Load Sample
        </button>
      </div>
      <div className="layouts-container">
        <button
          onClick={() => onPreferredHeaderPosChanged('top')}
          className={`header-on-top ${preferredHeaderPosition === 'top' ? 'selected' : ''}`}
        ></button>
        <button
          onClick={() => onPreferredHeaderPosChanged('left')}
          className={`header-on-left ${preferredHeaderPosition === 'left' ? 'selected' : ''}`}
        ></button>
        <button
          onClick={() => onPreferredHeaderPosChanged('right')}
          className={`header-on-right ${preferredHeaderPosition === 'right' ? 'selected' : ''}`}
        ></button>
      </div>
    </div>
  );
}
