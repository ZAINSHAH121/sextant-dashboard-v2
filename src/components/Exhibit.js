function Exhibit({ heading, children }) {
    return (
      <div className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-md mb-6 w-full max-w-5xl">
        <h2 className="text-2xl text-white font-semibold mb-4">{heading}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {children}
        </div>
      </div>
    );
  }
  
  export default Exhibit;
  