function Info() {
  return (
    <div className="flex flex-col items-start mb-4">
      <h1 className="text-3xl mb-4">Ausbildunsnachweis-App</h1>
      <p>Legende:</p>
      <p className="text-rose-800">* - required, benötigt</p>
      <p>Mo - Montag, Tu - Dienstag, We - Mittwoch, Th - Donnerstag</p>
      <p>Fr - Freitag, Sa - Samstag, Su - Sonntag</p>
      <details style={{ textAlign: "left" }}>
        <summary style={{ textAlign: "left" }}> Changelog: </summary>
        <ul className="list-disc">
          Version 1.1 (20.06.2024):
          <li>
            - Daten werden im LocalStorage gespeichert, jederzeit anpassbar
          </li>
          <li>- Hintergrund hinzugefügt, damit es nicht langweilig aussieht</li>
        </ul>
        <ul className="list-disc">
          Version 1.0:
          <li>- Viele Funktionen implementiert</li>
          <li>- PDF wird ausgegeben, soweit man was prompt</li>
          <li>- Applikation gestyled mit TailwindCSS</li>
        </ul>
      </details>
    </div>
  );
}

export default Info;
