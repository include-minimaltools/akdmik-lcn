const renderSearchLabel = (title: string, results?: number) => (
  <span>
    {title}
    {results !== null && <p style={{ float: "right" }}>Resultados {results}</p>}
  </span>
);

export { renderSearchLabel };
