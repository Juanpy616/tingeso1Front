const ListKarts = ({ karts, setSelectedKart }) => {
  return (
    <div className="list-karts">
      {karts.map((kart) => (
        <div
          key={kart.id}
          className="kart-item"
          onClick={() => setSelectedKart(kart)}
        >
          <h3>{kart.name}</h3>
          <p>{kart.description}</p>
        </div>
      ))}
    </div>
  );
}