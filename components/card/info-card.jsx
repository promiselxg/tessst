const InfoCard = ({ icon, title, description, highlights = [] }) => {
  const getHighlightedText = (text, highlights) => {
    if (!highlights.length) return text;

    const parts = text.split(new RegExp(`(${highlights.join("|")})`, "gi"));

    return parts.map((part, i) =>
      highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="font-semibold text-[--course-highlight-bg]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-4 rounded-md flex gap-4 items-start max-w-md">
      <div className="text-[--app-primary-color] text-2xl">{icon}</div>
      <div>
        <h3 className="text-[--app-primary-color] font-semibold text-lg">
          {title}
        </h3>
        <p className="text-sm text-slate-700">
          {getHighlightedText(description, highlights)}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
