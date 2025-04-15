function MetricCard({ label, value }) {
    return (
      <div className="bg-black bg-opacity-50 p-4 rounded-xl shadow-md m-2 text-center">
        <h2 className="text-xl font-semibold mb-2">{label}</h2>
        <p className="text-2xl">{value}</p>
      </div>
    );
  }
  
  export default MetricCard;
  